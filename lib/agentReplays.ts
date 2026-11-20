import data from "./agentReplays.data.json";

/**
 * Recorded runs of the thai-rag-agents evaluation, played back on the case
 * study page. The recorded fields come from agentReplays.data.json, which
 * scripts/build-agent-replays.mjs copies from the evaluation's saved results.
 * The English text below is mine: translations and notes, not model output.
 *
 * The live "ask it yourself" backend (thai-rag-agents POST /ask) returns the
 * same RecordedRun shape, so buildReplaySteps and the AgentReplay component
 * play both. A live run has no reference answer and no verdict.
 */

export interface RecordedSource {
  ref: string;
  title: string;
  section: string;
  text: string;
  cited: boolean;
}

export interface RecordedRun {
  id: string;
  type: string;
  question: string;
  /** Empty for a live run. */
  reference: string;
  answer: string;
  /** The eval judge's verdict; null for a live run, which has no judge. */
  correct: boolean | null;
  abstained: boolean;
  researcherCalls: number;
  usedFactChecker: boolean;
  modelCalls: number;
  tokens: number;
  seconds: number;
  searchQueries: string[];
  sources: RecordedSource[];
}

export interface ReplayNotes {
  /** Short label for the picker. */
  label: string;
  questionEn: string;
  answerEn: string;
  /** Why the judge's verdict came out the way it did. */
  verdict: string;
}

export interface AgentReplay {
  run: RecordedRun;
  notes: ReplayNotes;
}

export const REPLAY_META = {
  run: data.run,
  model: data.model,
  recordedOn: data.recordedOn,
  label: "Recorded on 11 October 2026 in evaluation run 2 with Gemini 2.5 Flash",
};

const NOTES: Record<string, ReplayNotes> = {
  c02: {
    label: "Comparison",
    questionEn: "Which is closer to Bangkok, Ayutthaya or Kanchanaburi?",
    answerEn:
      "Ayutthaya is about 75 km from Bangkok [S2], while Kanchanaburi is about 130 km [S5], so Ayutthaya is closer.",
    verdict: "Matches the reference. One researcher call per province, and both distances come from the cited passages.",
  },
  s04: {
    label: "Single fact",
    questionEn: "How large is Krabi province?",
    answerEn: "Krabi has an area of 4,708 square kilometres [S1].",
    verdict: "Matches the reference. One search was enough.",
  },
  u03: {
    label: "Not in the corpus",
    questionEn: "How large is Ranong province?",
    answerEn: "Not found in the documents.",
    verdict:
      "Correct refusal. Ranong has no article in the corpus. The researcher searched twice, found other provinces' areas, and did not use them.",
  },
  c07: {
    label: "A real miss",
    questionEn: "Which is farther from Bangkok, Udon Thani or Nong Khai, and by how many kilometres?",
    answerEn:
      "Udon Thani is about 564 km from Bangkok [S1, S2]. Nong Khai's distance from Bangkok was not found in the documents, so the two cannot be compared.",
    verdict:
      "Wrong: a retrieval failure. The Nong Khai article says 615 km, but none of the three queries the researcher wrote reached that passage. The agent did the honest thing with what it found and said so.",
  },
  p01: {
    label: "Half answerable",
    questionEn: "Which has the larger area, Nan or Yala?",
    answerEn:
      "Nan has a total area of 7,170,045 rai, or 11,472.07 square kilometres [S5, S6]. Yala's area was not found in the documents.",
    verdict:
      "Judged wrong, but this is the intended behaviour: answer Nan, refuse Yala. The article says 11,472.076, so the judge's exact-number rule most likely counted the rounding against it.",
  },
};

export const AGENT_REPLAYS: AgentReplay[] = (data.runs as RecordedRun[]).map((run) => {
  const notes = NOTES[run.id];
  if (!notes) throw new Error(`no notes for replay ${run.id}`);
  return { run, notes };
});

/** The [S1] / [S1, S2] references in an answer, in order of first use. */
export function citedRefs(answer: string): string[] {
  const refs: string[] = [];
  for (const group of answer.matchAll(/\[([^\]]+)\]/g)) {
    for (const ref of group[1].matchAll(/S\d+/g)) {
      if (!refs.includes(ref[0])) refs.push(ref[0]);
    }
  }
  return refs;
}

export type ReplayStep =
  | { kind: "question" }
  | { kind: "plan"; researcherCalls: number }
  | { kind: "search"; query: string; index: number; total: number }
  | { kind: "sources"; count: number }
  | { kind: "factCheck"; ran: boolean; count: number }
  | { kind: "answer" }
  | { kind: "score" };

/**
 * The steps of one recorded run, in the order they happened. Only recorded
 * facts go in: the saved results hold the searches in order and the pooled
 * passages, but not which search returned which passage, so the passages are
 * shown together once the searches are done.
 */
export function buildReplaySteps(run: RecordedRun): ReplayStep[] {
  const steps: ReplayStep[] = [{ kind: "question" }, { kind: "plan", researcherCalls: run.researcherCalls }];
  run.searchQueries.forEach((query, index) =>
    steps.push({ kind: "search", query, index, total: run.searchQueries.length }),
  );
  if (run.sources.length > 0) steps.push({ kind: "sources", count: run.sources.length });
  steps.push({ kind: "factCheck", ran: run.usedFactChecker, count: run.sources.length });
  steps.push({ kind: "answer" });
  if (run.correct !== null) steps.push({ kind: "score" });
  return steps;
}
