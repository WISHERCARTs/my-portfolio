/**
 * Asks the chat assistant every question in questions.ts once, with the same
 * model and system prompt as the site, and checks the answers against the
 * site's data.
 *
 *   npm run eval:chatbot -- [--out report.md]
 *
 * Needs GOOGLE_GENERATIVE_AI_API_KEY. Without it the run is skipped and exits 0.
 * Exits 1 when an answer contradicts the site, or when every model call failed
 * for a reason other than the Gemini quota. A used-up quota skips the run.
 */
import { writeFileSync } from "node:fs";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { CHAT_MODEL, buildSystemPrompt } from "../../lib/chatPrompt";
import { buildQuestions, type Question } from "./questions";
import { fails, isRateLimited, runStatus, scoreAnswer, summarize, warns, type QuestionResult, type Verdict } from "./score";
import { MARKER, renderReport, renderSkipped } from "./report";

/**
 * One run per question. The free tier of gemini-2.5-flash allowed only about
 * 20 requests a day for this project when this was written, and two runs per
 * question (24 calls) used it up. Calls go one at a time with a gap, and a
 * per-minute limit waits and tries again.
 */
const RUNS = 1;
const GAP_MS = 7_000;
const RATE_LIMIT_WAIT_MS = 30_000;
const RATE_LIMIT_RETRIES = 3;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generate(system: string, prompt: string) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await generateText({ model: google(CHAT_MODEL), system, prompt, maxRetries: 0 });
    } catch (error) {
      if (!isRateLimited(error) || attempt >= RATE_LIMIT_RETRIES) throw error;
      console.error(`Rate limited, waiting ${RATE_LIMIT_WAIT_MS / 1000} s before trying again`);
      await sleep(RATE_LIMIT_WAIT_MS);
    }
  }
}

async function ask(system: string, question: Question) {
  const answers: string[] = [];
  const verdicts: Verdict[] = [];
  let tokens = 0;
  for (let run = 0; run < RUNS; run++) {
    if (run > 0) await sleep(GAP_MS);
    try {
      const result = await generate(system, question.question);
      answers.push(result.text);
      verdicts.push(scoreAnswer(question.check, result.text));
      tokens += result.usage.totalTokens ?? 0;
    } catch (error) {
      answers.push(error instanceof Error ? error.message : String(error));
      verdicts.push("error");
    }
  }
  return { result: summarize({ question, answers, verdicts }), tokens };
}

async function main() {
  const outIndex = process.argv.indexOf("--out");
  const out = outIndex > -1 ? process.argv[outIndex + 1] : undefined;
  const write = (text: string) => {
    if (out) writeFileSync(out, text);
    console.log(text);
  };

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    write(renderSkipped());
    return;
  }

  const system = buildSystemPrompt();
  const questions = buildQuestions();
  const results: QuestionResult[] = [];
  let tokens = 0;
  for (const [i, question] of questions.entries()) {
    if (i > 0) await sleep(GAP_MS);
    const item = await ask(system, question);
    results.push(item.result);
    tokens += item.tokens;
  }

  write(renderReport({ results, model: CHAT_MODEL, runs: RUNS, tokens }));

  const status = runStatus(results);
  const failed = results.filter(fails).length;
  console.error(`${MARKER} ${status}: ${failed} failed, ${results.filter(warns).length} warned, ${results.length} questions`);
  if (status === "failed" || status === "broken") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
