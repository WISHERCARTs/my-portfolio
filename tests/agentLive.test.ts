import { test } from "node:test";
import assert from "node:assert/strict";
import { askAgents, liveReplay } from "../lib/agentLive";
import { AGENT_REPLAYS, buildReplaySteps } from "../lib/agentReplays";

const recorded = AGENT_REPLAYS[0].run;
// What thai-rag-agents POST /ask returns: the recorded shape, no reference and no verdict.
const live = { ...recorded, id: "abc123", type: "live", reference: "", correct: null };

function mockFetch(status: number, body: unknown, calls: Array<{ url: string; init?: RequestInit }> = []) {
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  return calls;
}

test("a live run plays every step except the judge's verdict", () => {
  const steps = buildReplaySteps(liveReplay(live).run);
  assert.equal(steps.at(-1)?.kind, "answer");
  assert.ok(!steps.some((s) => s.kind === "score"));
  assert.deepEqual(
    steps.flatMap((s) => (s.kind === "search" ? [s.query] : [])),
    live.searchQueries,
  );
});

test("askAgents posts the question and wraps the run for the replay", async () => {
  const calls = mockFetch(200, live);
  const result = await askAgents("ดอยอินทนนท์สูงกี่เมตร");
  assert.ok(result.ok);
  assert.equal(result.replay.run.id, "abc123");
  assert.equal(result.replay.run.correct, null);
  assert.ok(calls[0].url.endsWith("/ask"));
  assert.deepEqual(JSON.parse(String(calls[0].init?.body)), { question: "ดอยอินทนนท์สูงกี่เมตร" });
});

test("askAgents shows the server's message on a refusal", async () => {
  mockFetch(429, { error: { code: "rate_limited", message: "You can ask 5 questions an hour. Try again later." } });
  const result = await askAgents("ดอยอินทนนท์สูงกี่เมตร");
  assert.deepEqual(result, { ok: false, message: "You can ask 5 questions an hour. Try again later." });
});

test("askAgents never throws, even on a network error or a wrong shape", async () => {
  globalThis.fetch = (async () => {
    throw new TypeError("network");
  }) as typeof fetch;
  assert.equal((await askAgents("x")).ok, false);
  mockFetch(200, { hello: "world" });
  const wrong = await askAgents("x");
  assert.equal(wrong.ok, false);
});
