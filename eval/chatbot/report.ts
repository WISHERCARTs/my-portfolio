import { fails, warns, type QuestionResult, type Verdict } from "./score";

/** Marks the bot's comment so a later run edits it instead of adding another. */
export const MARKER = "<!-- chatbot-eval -->";

const ICONS: Record<Verdict, string> = {
  pass: "✅ pass",
  contradiction: "❌ contradicts",
  missing: "⚠️ not stated",
  error: "⚠️ error",
};

const cell = (text: string) => text.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const clip = (text: string, max = 400) => (text.length > max ? `${text.slice(0, max)}…` : text);

export function renderSkipped(): string {
  return [
    MARKER,
    "### Chatbot fact check: skipped",
    "",
    "`GOOGLE_GENERATIVE_AI_API_KEY` is not set, so the assistant was not asked. Add it under Settings → Secrets and variables → Actions to run this check.",
  ].join("\n");
}

export function renderReport(input: { results: QuestionResult[]; model: string; runs: number; tokens: number }): string {
  const { results, model, runs, tokens } = input;
  const failed = results.filter(fails).length;
  const warned = results.filter(warns).length;
  const passed = results.length - failed - warned;
  const allErrored = results.length > 0 && results.every((r) => r.verdicts.every((v) => v === "error"));
  const headline = allErrored
    ? "❌ could not run, every model call failed"
    : failed > 0
      ? "❌ contradicts the site"
      : warned > 0
        ? "⚠️ passed with warnings"
        : "✅ passed";

  const rows = results.map((r, i) => {
    const result = fails(r) ? "❌ fail" : warns(r) ? "⚠️ warn" : "✅ pass";
    const runs = r.verdicts.map((v) => ICONS[v]).join(", ") + (r.wrongLanguage ? ", not in Thai" : "");
    return `| ${i + 1} | ${cell(r.question.question)} | ${cell(r.question.expected)} | ${runs} | ${result} |`;
  });

  const details = results
    .filter((r) => fails(r) || warns(r))
    .map((r) => {
      const answers = r.answers.map((a, i) => `**Run ${i + 1}** (${ICONS[r.verdicts[i]]})\n\n> ${clip(a).replace(/\n/g, "\n> ")}`);
      return `#### ${cell(r.question.question)}\nExpected: ${cell(r.question.expected)}\n\n${answers.join("\n\n")}`;
    });

  return [
    MARKER,
    `### Chatbot fact check: ${headline}`,
    "",
    `${passed} passed, ${warned} warned, ${failed} failed out of ${results.length} questions. Each question was asked ${runs} times with \`${model}\` and the site's system prompt; ${tokens.toLocaleString("en-US")} tokens in total.`,
    "",
    "A question fails only when every run gives a number that contradicts the site. An answer that does not state it, or a Thai question answered in another language, only warns.",
    "",
    "| # | Question | Expected | Runs | Result |",
    "|---|---|---|---|---|",
    ...rows,
    ...(details.length ? ["", "<details><summary>Answers that failed or warned</summary>", "", ...details, "", "</details>"] : []),
  ].join("\n");
}
