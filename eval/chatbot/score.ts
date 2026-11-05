import type { Check, Question } from "./questions";

/**
 * - pass: the answer contains what the site says.
 * - contradiction: the question asks for a number and the answer gives a
 *   different one. Two contradictions in a row fail the check.
 * - missing: the answer does not say, which only warns.
 * - error: the model call failed.
 */
export type Verdict = "pass" | "contradiction" | "missing" | "error";

/**
 * Numbers that the answer states, leaving out what is not a claim: link
 * targets and URLs (certificate file names hold digits), list markers such as
 * "3." at the start of a line, and years.
 */
export function statedNumbers(answer: string): string[] {
  const text = answer
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^\s*\d+[.)]\s/gm, " ");
  const found = text.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  return found
    .map((n) => n.replace(/,/g, ""))
    .filter((n) => !/^(19|20)\d\d$/.test(n));
}

export function hasThai(text: string): boolean {
  return /[฀-๿]/.test(text);
}

export function scoreAnswer(check: Check, answer: string): Verdict {
  if (check.kind === "mentions") {
    return answer.toLowerCase().includes(check.text.toLowerCase()) ? "pass" : "missing";
  }
  const stated = statedNumbers(answer);
  if (check.numbers.every((n) => stated.includes(n))) return "pass";
  return stated.some((n) => !check.numbers.includes(n)) ? "contradiction" : "missing";
}

export interface QuestionResult {
  question: Question;
  answers: string[];
  verdicts: Verdict[];
  /** Thai questions answered in another language. */
  wrongLanguage: boolean;
}

export function summarize(result: Omit<QuestionResult, "wrongLanguage">): QuestionResult {
  const wrongLanguage =
    result.question.lang === "th" &&
    result.answers.some((answer, i) => result.verdicts[i] !== "error" && !hasThai(answer));
  return { ...result, wrongLanguage };
}

/** A question fails only when every run contradicts the site. */
export function fails(result: QuestionResult): boolean {
  return result.verdicts.length > 0 && result.verdicts.every((v) => v === "contradiction");
}

export function warns(result: QuestionResult): boolean {
  return !fails(result) && (result.wrongLanguage || result.verdicts.some((v) => v !== "pass"));
}

/**
 * A per-minute rate limit, worth waiting out. A daily quota is not: waiting
 * 30 seconds will not bring it back, so those calls fail at once.
 */
export function isRateLimited(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  if (/per.?day/i.test(message)) return false;
  return /quota|rate.?limit|resource.?exhausted|\b429\b/i.test(message);
}
