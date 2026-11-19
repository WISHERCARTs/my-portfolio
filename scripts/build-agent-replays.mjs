// Copies a few recorded runs from the thai-rag-agents evaluation into
// lib/agentReplays.data.json, for the replay demo on the case study page.
//
//   node scripts/build-agent-replays.mjs ../thai-rag-agents
//
// Only fields the evaluation saved are copied. Nothing is invented here: the
// English translations and notes live in lib/agentReplays.ts.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repo = process.argv[2] ?? "../thai-rag-agents";
const RUN = "2026-10-11-run2";
const IDS = ["c02", "s04", "u03", "c07", "p01"];
// Passages the answer cites are kept whole; the rest are cut to a preview.
const PREVIEW = 160;

const readJsonl = (path) =>
  readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));

const cases = new Map(readJsonl(join(repo, "evals/cases.jsonl")).map((c) => [c.id, c]));
const results = new Map(
  readJsonl(join(repo, "evals/results", RUN, "results.jsonl")).map((r) => [r.id, r]),
);

const cited = (answer) => {
  const ids = new Set();
  for (const group of answer.matchAll(/\[([^\]]+)\]/g)) {
    for (const id of group[1].matchAll(/S\d+/g)) ids.add(id[0]);
  }
  return ids;
};

const runs = IDS.map((id) => {
  const r = results.get(id);
  const c = cases.get(id);
  if (!r || !c) throw new Error(`missing ${id} in ${RUN}`);
  const used = cited(r.answer);
  return {
    id,
    type: r.type,
    question: r.question,
    reference: c.reference,
    answer: r.answer,
    correct: r.correct,
    abstained: r.abstained,
    researcherCalls: r.researcher_calls,
    usedFactChecker: r.used_fact_checker,
    modelCalls: r.model_calls,
    tokens: r.tokens,
    seconds: r.seconds,
    searchQueries: r.search_queries,
    sources: Object.entries(r.sources).map(([ref, s]) => ({
      ref,
      title: s.title,
      section: s.section,
      text: used.has(ref) || s.text.length <= PREVIEW ? s.text : `${s.text.slice(0, PREVIEW).trimEnd()}…`,
      cited: used.has(ref),
    })),
  };
});

const out = { run: RUN, model: "gemini-2.5-flash", recordedOn: "2026-10-11", runs };
writeFileSync(new URL("../lib/agentReplays.data.json", import.meta.url), `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${runs.length} runs from ${RUN}`);
