import { test } from "node:test";
import assert from "node:assert/strict";
import { AGENT_REPLAYS, buildReplaySteps, citedRefs } from "../lib/agentReplays";
import { CASE_STUDIES } from "../lib/caseStudies";

test("every citation in a replayed answer points at a recorded passage", () => {
  for (const { run } of AGENT_REPLAYS) {
    const refs = new Set(run.sources.map((s) => s.ref));
    for (const ref of citedRefs(run.answer)) assert.ok(refs.has(ref), `${run.id} cites ${ref}, which was not recorded`);
    for (const source of run.sources) {
      assert.equal(source.cited, citedRefs(run.answer).includes(source.ref), `${run.id} ${source.ref} cited flag`);
    }
  }
});

test("citation groups like [S1, S2] and [S1][S5] are both read", () => {
  assert.deepEqual(citedRefs("a [S1, S2] b [S5][S1]"), ["S1", "S2", "S5"]);
});

test("each replay plays every recorded search, then the answer and the verdict", () => {
  for (const { run } of AGENT_REPLAYS) {
    const steps = buildReplaySteps(run);
    const searches = steps.flatMap((s) => (s.kind === "search" ? [s.query] : []));
    assert.deepEqual(searches, run.searchQueries, run.id);
    assert.equal(steps[0].kind, "question");
    assert.deepEqual(steps.slice(-2).map((s) => s.kind), ["answer", "score"]);
  }
});

test("the replay shows both hits and misses", () => {
  assert.ok(AGENT_REPLAYS.some((r) => r.run.correct));
  assert.ok(AGENT_REPLAYS.some((r) => !r.run.correct));
});

test("the thai-rag-agents case study shows the replay", () => {
  const study = CASE_STUDIES.find((s) => s.slug === "thai-rag-agents");
  assert.ok(study?.sections.some((s) => s.demo === "agent-replay"));
});
