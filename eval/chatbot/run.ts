/**
 * Asks the chat assistant every question in questions.ts twice, with the same
 * model and system prompt as the site, and checks the answers against the
 * site's data.
 *
 *   npm run eval:chatbot -- [--out report.md]
 *
 * Needs GOOGLE_GENERATIVE_AI_API_KEY. Without it the run is skipped and exits 0.
 * Exits 1 when a question contradicts the site in both runs, or when every
 * model call failed.
 */
import { writeFileSync } from "node:fs";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { CHAT_MODEL, buildSystemPrompt } from "../../lib/chatPrompt";
import { buildQuestions, type Question } from "./questions";
import { fails, scoreAnswer, summarize, warns, type QuestionResult, type Verdict } from "./score";
import { MARKER, renderReport, renderSkipped } from "./report";

const RUNS = 2;
const PARALLEL = 4;

async function ask(system: string, question: Question) {
  const answers: string[] = [];
  const verdicts: Verdict[] = [];
  let tokens = 0;
  for (let run = 0; run < RUNS; run++) {
    try {
      const result = await generateText({ model: google(CHAT_MODEL), system, prompt: question.question });
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
  for (let i = 0; i < questions.length; i += PARALLEL) {
    const batch = await Promise.all(questions.slice(i, i + PARALLEL).map((q) => ask(system, q)));
    for (const item of batch) {
      results.push(item.result);
      tokens += item.tokens;
    }
  }

  write(renderReport({ results, model: CHAT_MODEL, runs: RUNS, tokens }));

  const allErrored = results.every((r) => r.verdicts.every((v) => v === "error"));
  const failed = results.filter(fails).length;
  console.error(
    `${MARKER} ${failed} failed, ${results.filter(warns).length} warned, ${results.length} questions${allErrored ? ", every model call failed" : ""}`,
  );
  if (failed > 0 || allErrored) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
