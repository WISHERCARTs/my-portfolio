import type { Check, Question } from "./questions";

/**
 * - pass: the answer contains what the site says.
 * - contradiction: the question asks for a number and the answer gives a
 *   different one, which fails the check.
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
  const text = thaiDigitsToAscii(answer)
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^\s*\d+[.)]\s/gm, " ");
  const found = text.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  return found
    .map((n) => n.replace(/,/g, ""))
    .filter((n) => !/^(19|20)\d\d$/.test(n));
}

function thaiDigitsToAscii(text: string): string {
  return text.replace(/[๐-๙]/g, (d) => String(d.charCodeAt(0) - 0x0e50));
}

const UNITS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/**
 * Numbers from 0 to 99 written as English words ("five", "twenty-one").
 * They only count towards a pass: words such as "one" are too common in
 * ordinary sentences ("one of his projects") to count as a contradiction.
 * Thai number words are left out for the same reason ("สาม" is inside "สามารถ").
 */
export function numberWords(answer: string): string[] {
  const words = answer.toLowerCase().match(/[a-z]+(?:-[a-z]+)?/g) ?? [];
  const found: string[] = [];
  for (const word of words) {
    const [first, second] = word.split("-");
    const tens = TENS.indexOf(first);
    if (tens >= 2) {
      const unit = second === undefined ? 0 : UNITS.indexOf(second);
      if (unit >= 0 && unit <= 9 && (second === undefined || unit > 0)) found.push(String(tens * 10 + unit));
    } else if (second === undefined && UNITS.includes(first)) {
      found.push(String(UNITS.indexOf(first)));
    }
  }
  return found;
}

export function hasThai(text: string): boolean {
  return /[฀-๿]/.test(text);
}

export function scoreAnswer(check: Check, answer: string): Verdict {
  if (check.kind === "mentions") {
    return answer.toLowerCase().includes(check.text.toLowerCase()) ? "pass" : "missing";
  }
  const stated = statedNumbers(answer);
  const inWords = numberWords(answer);
  if (check.numbers.every((n) => stated.includes(n) || inWords.includes(n))) return "pass";
  return stated.some((n) => !check.numbers.includes(n)) ? "contradiction" : "missing";
}

export interface QuestionResult {
  question: Question;
  answers: string[];
  verdicts: Verdict[];
  /** A Thai question answered without Thai, or an English one answered with Thai. */
  wrongLanguage: boolean;
}

export function summarize(result: Omit<QuestionResult, "wrongLanguage">): QuestionResult {
  const wrongLanguage = result.answers.some(
    (answer, i) => result.verdicts[i] !== "error" && hasThai(answer) !== (result.question.lang === "th"),
  );
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

/** Any quota or rate-limit error, per minute or per day. */
export function isQuotaError(message: string): boolean {
  return /quota|rate.?limit|resource.?exhausted|\b429\b/i.test(message);
}

/**
 * - failed: an answer contradicts the site.
 * - broken: every call failed for another reason, such as a bad key.
 * - quota: every call failed on the Gemini quota, so nothing was checked.
 * - ok: otherwise, possibly with warnings.
 */
export type RunStatus = "ok" | "failed" | "broken" | "quota";

export function runStatus(results: QuestionResult[]): RunStatus {
  if (results.some(fails)) return "failed";
  const allErrored = results.length > 0 && results.every((r) => r.verdicts.every((v) => v === "error"));
  if (!allErrored) return "ok";
  return results.every((r) => r.answers.every(isQuotaError)) ? "quota" : "broken";
}
