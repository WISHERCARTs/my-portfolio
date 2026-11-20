import type { AgentReplay, RecordedRun } from "./agentReplays";

/**
 * The live "ask it yourself" demo: thai-rag-agents on Cloud Run, which sends
 * every model call and embedding through thai-llm-gateway. It returns the
 * RecordedRun shape, so the replay component plays it like a recorded run.
 */
export const AGENTS_URL =
  process.env.NEXT_PUBLIC_AGENTS_URL ?? "https://thai-rag-agents-85542351836.asia-southeast1.run.app";

export const MAX_QUESTION_CHARS = 300;

/** Questions the corpus can answer, to start from. */
export const EXAMPLE_QUESTIONS = [
  "ดอยอินทนนท์สูงกี่เมตร",
  "ดอกไม้ประจำจังหวัดน่านกับจังหวัดภูเก็ตต่างกันอย่างไร",
  "จังหวัดกระบี่มีพื้นที่เท่าไร",
];

export type AskResult = { ok: true; replay: AgentReplay } | { ok: false; message: string };

function isRecordedRun(value: unknown): value is RecordedRun {
  const run = value as RecordedRun;
  return (
    typeof run === "object" &&
    run !== null &&
    typeof run.id === "string" &&
    typeof run.answer === "string" &&
    Array.isArray(run.searchQueries) &&
    Array.isArray(run.sources) &&
    typeof run.modelCalls === "number"
  );
}

export function liveReplay(run: RecordedRun): AgentReplay {
  return { run: { ...run, correct: null }, notes: { label: "Your question", questionEn: "", answerEn: "", verdict: "" } };
}

/** Ask the live agents. Never throws: failures come back as a message to show. */
export async function askAgents(question: string, signal?: AbortSignal): Promise<AskResult> {
  let response: Response;
  try {
    response = await fetch(`${AGENTS_URL}/ask`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question }),
      signal,
    });
  } catch {
    return { ok: false, message: "Could not reach the agents. Check your connection and try again." };
  }
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // an empty or non-JSON body is handled below
  }
  if (response.ok && isRecordedRun(body)) return { ok: true, replay: liveReplay(body) };
  const message = (body as { error?: { message?: unknown } } | null)?.error?.message;
  return {
    ok: false,
    message: typeof message === "string" ? message : `The agents could not answer (HTTP ${response.status}).`,
  };
}
