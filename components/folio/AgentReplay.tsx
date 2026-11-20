"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ChevronsRight, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { EXAMPLE_QUESTIONS, MAX_QUESTION_CHARS, askAgents } from "@/lib/agentLive";
import {
  AGENT_REPLAYS,
  REPLAY_META,
  buildReplaySteps,
  citedRefs,
  type AgentReplay as Replay,
  type ReplayStep,
} from "@/lib/agentReplays";

const STEP_MS = 1400;

type Actor = "you" | "coordinator" | "researcher" | "tool" | "checker" | "judge";

const ACTORS: Record<Actor, { label: string; className: string }> = {
  you: { label: "Question", className: "border border-[var(--f-line-strong)] text-[var(--f-cream)]" },
  coordinator: { label: "Coordinator", className: "bg-[var(--f-accent)] text-[var(--f-panel-ink)]" },
  researcher: { label: "Researcher", className: "bg-[var(--f-cream)] text-[var(--f-panel-ink)]" },
  tool: { label: "Search", className: "border border-dashed border-[var(--f-line-strong)] text-[var(--f-dim)]" },
  checker: { label: "Fact checker", className: "bg-[var(--f-cream)] text-[var(--f-panel-ink)]" },
  judge: { label: "Eval judge", className: "border border-[var(--f-line-strong)] text-[var(--f-dim)]" },
};

const ACTOR_OF: Record<ReplayStep["kind"], Actor> = {
  question: "you",
  plan: "coordinator",
  search: "researcher",
  sources: "tool",
  factCheck: "checker",
  answer: "coordinator",
  score: "judge",
};

const btn =
  "f-mono inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--f-line-strong)] px-4 text-[0.6875rem] transition-colors duration-200 hover:border-[var(--f-cream)] disabled:opacity-40 disabled:hover:border-[var(--f-line-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

/** Thai answer text with each [S#] group turned into buttons that point at the passage. */
function CitedAnswer({ text, onCite, active }: { text: string; onCite: (ref: string) => void; active: string | null }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <p lang="th" className="text-[1rem] leading-relaxed">
      {parts.map((part, i) => {
        const refs = /^\[[^\]]+\]$/.test(part) ? part.match(/S\d+/g) : null;
        if (!refs) return <Fragment key={i}>{part}</Fragment>;
        return (
          <span key={i} className="whitespace-nowrap">
            {refs.map((ref) => (
              <button
                key={ref}
                type="button"
                onClick={() => onCite(ref)}
                aria-pressed={active === ref}
                aria-label={`Show passage ${ref}`}
                className={`f-mono mx-0.5 rounded px-1.5 py-0.5 align-baseline text-[0.625rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)] ${
                  active === ref
                    ? "bg-[var(--f-accent)] text-[var(--f-panel-ink)]"
                    : "border border-[var(--f-line-strong)] text-[var(--f-cream)] hover:border-[var(--f-cream)]"
                }`}
              >
                {ref}
              </button>
            ))}
          </span>
        );
      })}
    </p>
  );
}

function StepBody({
  step,
  replay,
  activeRef,
  onCite,
}: {
  step: ReplayStep;
  replay: Replay;
  activeRef: string | null;
  onCite: (ref: string) => void;
}) {
  const { run, notes } = replay;
  const activeSource = run.sources.find((source) => source.ref === activeRef);
  switch (step.kind) {
    case "question":
      return (
        <div>
          <p lang="th" className="text-[1rem] leading-relaxed">
            {run.question}
          </p>
          {notes.questionEn ? <p className="mt-1 text-[0.8125rem] text-[var(--f-dim)]">{notes.questionEn}</p> : null}
        </div>
      );
    case "plan":
      return (
        <p>
          {step.researcherCalls === 0
            ? "Answers without calling the researcher."
            : step.researcherCalls === 1
              ? "Sends the question to the researcher as one lookup."
              : `Splits the question into ${step.researcherCalls} researcher calls, one per place.`}
        </p>
      );
    case "search":
      return (
        <p>
          <span className="f-mono mr-2 text-[0.625rem] text-[var(--f-dim)]">
            search_thai_wikipedia {step.index + 1}/{step.total}
          </span>
          <span lang="th" className="rounded bg-black/40 px-1.5 py-0.5">
            {step.query}
          </span>
        </p>
      );
    case "sources":
      return (
        <div>
          <p>
            {step.count} passages collected in the shared session state, with stable ids. Hybrid search (BM25 plus
            embeddings) over 40 Thai Wikipedia articles.
          </p>
          <ul className="mt-3 space-y-1.5">
            {run.sources.map((source) => {
              const isActive = activeRef === source.ref;
              return (
                <li
                  key={source.ref}
                  className={`rounded-tr-[1rem] border px-3 py-2 text-[0.8125rem] transition-colors duration-200 ${
                    isActive
                      ? "border-[var(--f-accent)] bg-black/50"
                      : source.cited
                        ? "border-[var(--f-line-strong)] bg-black/30"
                        : "border-[var(--f-line)]"
                  }`}
                >
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="f-mono text-[0.625rem] text-[var(--f-accent)]">{source.ref}</span>
                    <span lang="th" className="font-medium">
                      {source.title}
                    </span>
                    {source.section ? (
                      <span lang="th" className="text-[var(--f-dim)]">
                        · {source.section}
                      </span>
                    ) : null}
                    {source.cited ? (
                      <span className="f-mono text-[0.5625rem] text-[var(--f-dim)]">cited</span>
                    ) : null}
                  </p>
                  {source.cited || isActive ? (
                    <p lang="th" className="mt-1 whitespace-pre-line leading-relaxed text-[var(--f-cream)]/80">
                      {source.text}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      );
    case "factCheck":
      return (
        <p>
          {step.ran
            ? `Reads the draft and all ${step.count} collected passages, and checks every claim against them.`
            : run.abstained
              ? "Not called: the draft states no fact, only that the answer is not in the documents."
              : "Not called on this run."}
        </p>
      );
    case "answer":
      return (
        <div>
          <CitedAnswer text={run.answer} onCite={onCite} active={activeRef} />
          {replay.notes.answerEn ? (
            <p className="mt-1 text-[0.8125rem] text-[var(--f-dim)]">{replay.notes.answerEn}</p>
          ) : null}
          {activeSource ? (
            <blockquote className="mt-3 border-l-2 border-[var(--f-accent)] pl-3 text-[0.8125rem]">
              <p className="f-mono text-[0.625rem] text-[var(--f-dim)]">
                {activeSource.ref} · <span lang="th">{activeSource.title}</span>
              </p>
              <p lang="th" className="mt-1 whitespace-pre-line leading-relaxed text-[var(--f-cream)]/80">
                {activeSource.text}
              </p>
            </blockquote>
          ) : citedRefs(run.answer).length > 0 ? (
            <p className="f-mono mt-2 text-[0.625rem] text-[var(--f-dim)]">Press a citation to read its passage</p>
          ) : null}
        </div>
      );
    case "score":
      return (
        <div>
          <p className="flex items-center gap-2">
            <span
              className={`f-mono rounded-full px-2 py-0.5 text-[0.625rem] ${
                run.correct ? "bg-[var(--f-accent)] text-[var(--f-panel-ink)]" : "border border-[var(--f-cream)]"
              }`}
            >
              {run.correct ? "Judged correct" : "Judged wrong"}
            </span>
          </p>
          {run.reference ? (
            <p className="mt-2 text-[0.8125rem]">
              <span className="text-[var(--f-dim)]">Reference: </span>
              <span lang="th">{run.reference}</span>
            </p>
          ) : null}
          <p className="mt-2">{replay.notes.verdict}</p>
        </div>
      );
  }
}

const LIVE = -1;

export default function AgentReplay() {
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [liveReplay, setLiveReplay] = useState<Replay | null>(null);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [askError, setAskError] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isLive = selected === LIVE;
  const replay = isLive ? liveReplay : AGENT_REPLAYS[selected];
  const steps = useMemo(() => (replay ? buildReplaySteps(replay.run) : []), [replay]);
  const done = shown >= steps.length;

  const running = playing && !done;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setShown((n) => n + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, shown]);

  // Keep the newest step in view inside the scrolling stage, not the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !playing) return;
    list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [shown, playing]);

  useEffect(() => {
    if (!asking) return;
    const started = Date.now();
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => window.clearInterval(timer);
  }, [asking]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function choose(i: number) {
    setSelected(i);
    setShown(1);
    setActiveRef(null);
    setPlaying(i !== LIVE || liveReplay !== null);
  }

  function cite(ref: string) {
    setActiveRef((current) => (current === ref ? null : ref));
  }

  async function ask(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (text.length < 3 || asking) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setAsking(true);
    setElapsed(0);
    setAskError(null);
    const result = await askAgents(text, controller.signal);
    if (controller.signal.aborted) return;
    setAsking(false);
    if (!result.ok) {
      setAskError(result.message);
      return;
    }
    setLiveReplay(result.replay);
    setShown(1);
    setActiveRef(null);
    setPlaying(true);
  }

  const current = steps[shown - 1];

  return (
    <div className="pt-2">
      <div role="group" aria-label="Recorded questions" className="flex flex-wrap gap-2">
        {AGENT_REPLAYS.map((item, i) => (
          <button
            key={item.run.id}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={i === selected}
            className={`f-mono inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.6875rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)] ${
              i === selected
                ? "bg-[var(--f-cream)] text-[var(--f-panel-ink)]"
                : "border border-[var(--f-line-strong)] hover:border-[var(--f-cream)]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${item.run.correct ? "bg-[var(--f-accent)]" : "border border-current"}`}
            />
            {item.notes.label}
            <span className="sr-only">{item.run.correct ? ", judged correct" : ", judged wrong"}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => choose(LIVE)}
          aria-pressed={isLive}
          className={`f-mono inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.6875rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)] ${
            isLive
              ? "bg-[var(--f-accent)] text-[var(--f-panel-ink)]"
              : "border border-dashed border-[var(--f-accent)] hover:border-solid"
          }`}
        >
          Ask it yourself
        </button>
      </div>
      <p className="f-mono mt-2 text-[0.625rem] text-[var(--f-dim)]" aria-hidden="true">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[var(--f-accent)]" /> judged correct
        <span className="ml-4 mr-1 inline-block h-2 w-2 rounded-full border border-current" /> judged wrong
      </p>

      {isLive ? (
        <form onSubmit={ask} className="mt-4 rounded-tr-[2rem] border border-[var(--f-line-strong)] bg-black/30 p-4 sm:p-5">
          <label htmlFor="agent-question" className="f-mono text-[0.6875rem] text-[var(--f-dim)]">
            Ask in Thai about the provinces, temples and parks in the 40 articles
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            <input
              id="agent-question"
              lang="th"
              value={question}
              maxLength={MAX_QUESTION_CHARS}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="ดอยอินทนนท์สูงกี่เมตร"
              disabled={asking}
              className="min-h-11 min-w-0 flex-1 rounded-full border border-[var(--f-line-strong)] bg-black/40 px-4 text-[0.9375rem] text-[var(--f-cream)] placeholder:text-[var(--f-dim)] focus-visible:border-[var(--f-cream)] focus-visible:outline-none disabled:opacity-60"
            />
            <button type="submit" className={btn} disabled={asking || question.trim().length < 3}>
              {asking ? `Working… ${elapsed} s` : "Ask"}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Example questions">
            {EXAMPLE_QUESTIONS.map((example) => (
              <button
                key={example}
                type="button"
                lang="th"
                disabled={asking}
                onClick={() => setQuestion(example)}
                className="min-h-11 rounded-full border border-[var(--f-line)] px-3 text-[0.8125rem] text-[var(--f-dim)] transition-colors duration-200 hover:border-[var(--f-cream)] hover:text-[var(--f-cream)] disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]"
              >
                {example}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--f-dim)]" aria-live="polite">
            {askError ??
              (asking
                ? "The coordinator, researcher and fact checker are working. A question takes about 20 seconds and 8 Gemini calls."
                : "This one is live: about 20 seconds and 8 Gemini calls, each through my LLM gateway (rate limits, PII redaction, injection checks, cost log). 5 questions an hour per visitor.")}
          </p>
        </form>
      ) : null}

      {replay ? (
      <div className="mt-4 rounded-tr-[2rem] border border-[var(--f-line-strong)] bg-black/30">
        <ol
          ref={listRef}
          aria-label={`Replay of ${replay.notes.questionEn || replay.run.question}`}
          className="max-h-[34rem] space-y-1 overflow-y-auto p-4 sm:p-5"
        >
          {steps.slice(0, shown).map((step, i) => {
            const actor = ACTORS[ACTOR_OF[step.kind]];
            return (
              <li
                key={`${replay.run.id}-${i}`}
                className="grid gap-1 py-2 motion-safe:animate-[f-rise_400ms_ease-out] sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4"
              >
                <span
                  className={`f-mono inline-block h-fit w-fit rounded-full px-2 py-0.5 text-[0.625rem] ${actor.className}`}
                >
                  {actor.label}
                </span>
                <div className="min-w-0 text-[0.875rem] leading-relaxed">
                  <StepBody step={step} replay={replay} activeRef={activeRef} onCite={cite} />
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--f-line)] p-3 sm:px-5">
          <button
            type="button"
            className={btn}
            onClick={() => {
              if (done) {
                setShown(1);
                setActiveRef(null);
                setPlaying(true);
              } else {
                setPlaying(!running);
              }
            }}
          >
            {running ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            {running ? "Pause" : done ? "Replay" : "Play"}
          </button>
          <button
            type="button"
            className={btn}
            aria-label="Previous step"
            disabled={shown <= 1}
            onClick={() => {
              setPlaying(false);
              setShown((n) => Math.max(1, n - 1));
            }}
          >
            <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={btn}
            aria-label="Next step"
            disabled={done}
            onClick={() => {
              setPlaying(false);
              setShown((n) => Math.min(steps.length, n + 1));
            }}
          >
            <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={btn}
            aria-label="Show every step"
            disabled={done}
            onClick={() => {
              setPlaying(false);
              setShown(steps.length);
            }}
          >
            <ChevronsRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">All</span>
          </button>
          <p className="f-mono ml-auto text-[0.625rem] text-[var(--f-dim)]" aria-live="polite">
            Step {shown} of {steps.length}
            <span className="sr-only">: {current ? ACTORS[ACTOR_OF[current.kind]].label : ""}</span>
          </p>
        </div>
      </div>

      ) : null}

      {replay ? (
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
          {replay.run.modelCalls} model calls, {replay.run.tokens.toLocaleString("en-US")} tokens,{" "}
          {replay.run.seconds.toFixed(1)} s on this run.{" "}
          {isLive
            ? "Answered live with Gemini 2.5 Flash through thai-llm-gateway, then played back step by step. There is no reference answer, so no verdict."
            : `${REPLAY_META.label}, played back from the saved results: nothing here calls a model.`}{" "}
          Passages are from Thai Wikipedia (CC BY-SA 4.0).
        </p>
      ) : null}
    </div>
  );
}
