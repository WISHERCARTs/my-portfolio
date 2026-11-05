import { test } from "node:test";
import assert from "node:assert/strict";
import { numbersIn, type Question } from "../eval/chatbot/questions";
import { fails, isRateLimited, scoreAnswer, statedNumbers, summarize, warns } from "../eval/chatbot/score";
import { MARKER, renderReport } from "../eval/chatbot/report";

const prs: Question = {
  id: "prs",
  lang: "th",
  question: "Tournament Hub มี PR ที่ merge แล้วกี่อัน",
  expected: "71",
  check: { kind: "numbers", numbers: ["71"] },
};

test("numbersIn reads the numbers in a stat value", () => {
  assert.deepEqual(numbersIn("17 / 20"), ["17", "20"]);
  assert.deepEqual(numbersIn("55%"), ["55"]);
  assert.deepEqual(numbersIn("1,698 chunks"), ["1698"]);
});

test("statedNumbers ignores links, list markers and years", () => {
  const answer = [
    "1. [C++ Essentials 1](/C--_Essentials_1_certificate_26db587d.pdf)",
    "2. See https://example.com/a/42",
    "Counted on 19 October 2026: 71 pull requests.",
  ].join("\n");
  assert.deepEqual(statedNumbers(answer), ["1", "19", "71"]);
});

test("the stale 24 pull requests is a contradiction", () => {
  assert.equal(scoreAnswer(prs.check, "Tournament Hub มี 24 PR ที่ merge แล้ว"), "contradiction");
});

test("the right number passes, even next to other numbers", () => {
  assert.equal(scoreAnswer(prs.check, "มี 71 PR ที่ merge แล้ว และ migration 25 ไฟล์"), "pass");
  assert.equal(scoreAnswer(prs.check, "1,071 is not 71? It has 71."), "pass");
});

test("an answer without a number only counts as missing", () => {
  assert.equal(scoreAnswer(prs.check, "ดูได้ในหน้า case study ครับ"), "missing");
});

test("a two-number stat needs both numbers", () => {
  const check = { kind: "numbers" as const, numbers: ["17", "20"] };
  assert.equal(scoreAnswer(check, "ตอบถูก 17 ข้อ จาก 20 ข้อ"), "pass");
  assert.equal(scoreAnswer(check, "ตอบถูก 17 ข้อ"), "missing");
  assert.equal(scoreAnswer(check, "ตอบถูก 18 ข้อ จาก 20 ข้อ"), "contradiction");
});

test("mention checks ignore case", () => {
  const check = { kind: "mentions" as const, text: "Fuwari Time" };
  assert.equal(scoreAnswer(check, "มีครับ ชื่อ fuwari time"), "pass");
  assert.equal(scoreAnswer(check, "ไม่มีครับ"), "missing");
});

test("a question fails only when every run contradicts", () => {
  const once = summarize({ question: prs, answers: ["มี 24 PR", "มี 71 PR"], verdicts: ["contradiction", "pass"] });
  assert.equal(fails(once), false);
  assert.equal(warns(once), true);
  const twice = summarize({ question: prs, answers: ["มี 24 PR", "มี 24 PR"], verdicts: ["contradiction", "contradiction"] });
  assert.equal(fails(twice), true);
  const errors = summarize({ question: prs, answers: ["quota", "quota"], verdicts: ["error", "error"] });
  assert.equal(fails(errors), false);
  assert.equal(warns(errors), true);
});

test("a Thai question answered in English warns", () => {
  const result = summarize({ question: prs, answers: ["It has 71.", "มี 71 PR"], verdicts: ["pass", "pass"] });
  assert.equal(result.wrongLanguage, true);
  assert.equal(warns(result), true);
});

test("the report carries the marker and a row per question", () => {
  const ok = summarize({ question: prs, answers: ["มี 71 PR", "มี 71 PR"], verdicts: ["pass", "pass"] });
  const bad = summarize({ question: { ...prs, id: "b" }, answers: ["มี 24 PR", "มี 24 PR"], verdicts: ["contradiction", "contradiction"] });
  const report = renderReport({ results: [ok, bad], model: "test-model", runs: 2, tokens: 1234 });
  assert.ok(report.startsWith(MARKER));
  assert.ok(report.includes("contradicts the site"));
  assert.ok(report.includes("1 passed, 0 warned, 1 failed out of 2 questions"));
  assert.ok(report.includes("1,234 tokens"));
});

test("a run where every call failed says so in the headline", () => {
  const errors = summarize({ question: prs, answers: ["API key not valid", "API key not valid"], verdicts: ["error", "error"] });
  const report = renderReport({ results: [errors], model: "test-model", runs: 2, tokens: 0 });
  assert.ok(report.includes("could not run, every model call failed"));
});

test("a per-minute quota error is worth retrying, a daily one is not", () => {
  const perMinute = new Error(
    "You exceeded your current quota, please check your plan and billing details. Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 10, quotaId: GenerateRequestsPerMinutePerProjectPerModel-FreeTier",
  );
  const perDay = new Error(
    "You exceeded your current quota. quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier",
  );
  assert.equal(isRateLimited(perMinute), true);
  assert.equal(isRateLimited(perDay), false);
  assert.equal(isRateLimited(new Error("API key not valid. Please pass a valid API key.")), false);
});
