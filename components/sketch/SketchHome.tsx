"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import {
  SKETCH_ENTRIES,
  SKETCH_EASE,
  type SketchEntry,
} from "@/lib/sketch-entries";
import ThemeToggle from "./ThemeToggle";

/* Two hand-drawn pencil loops, alternated so the tags don't all match. */
const LOOPS = [
  "M 38 20 C 80 2, 170 4, 202 34 C 226 60, 190 98, 120 102 C 52 106, 8 84, 14 50 C 20 22, 70 8, 118 6 C 150 5, 176 10, 196 22",
  "M 20 40 C 30 12, 120 0, 186 16 C 224 28, 214 78, 170 96 C 120 112, 40 104, 14 72 C 2 54, 20 30, 52 18 C 90 6, 150 4, 205 14",
];

/* Where each tag floats around the name on wide screens, plus its tilt. */
const PLACEMENT: Record<string, { className: string; rotate: number }> = {
  about: { className: "md:left-[8%] md:top-[8%]", rotate: -6 },
  projects: { className: "md:right-[10%] md:top-[5%]", rotate: 5 },
  skills: { className: "md:left-[4%] md:bottom-[22%]", rotate: 7 },
  certificates: { className: "md:left-[31%] md:bottom-[2%]", rotate: -3 },
  education: { className: "md:right-[5%] md:bottom-[20%]", rotate: -6 },
  contact: { className: "md:left-[61%] md:bottom-[4%]", rotate: 4 },
};

const DEFAULT_CAPTION =
  "Third-year DST student at ICT Mahidol. I build AI agents, data tools and automations. Pick a tag.";

function SketchTag({
  entry,
  order,
  onActive,
}: {
  entry: SketchEntry;
  order: number;
  onActive: (id: string | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const placement = PLACEMENT[entry.slug];

  return (
    <motion.div
      className={`relative md:absolute md:z-20 ${placement.className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35 + order * 0.09, ease: SKETCH_EASE }}
    >
      <Link
        href={entry.href}
        onMouseEnter={() => onActive(entry.slug)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(entry.slug)}
        onBlur={() => onActive(null)}
        className="group relative block px-9 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
      >
        {/* Red pencil loop drawn around the tag */}
        <svg
          viewBox="0 0 220 110"
          preserveAspectRatio="none"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[var(--sk-pen)] ${
            order % 2 ? "-scale-x-100" : ""
          }`}
        >
          <motion.path
            d={LOOPS[order % 2]}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 + order * 0.1, ease: SKETCH_EASE }}
          />
        </svg>

        {/* The sticker itself */}
        <span
          className="relative inline-flex items-center gap-3 border-2 border-[#0b0b0c] px-5 py-2.5 text-[1.25rem] font-medium leading-none text-[#0b0b0c] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(var(--rot))] group-hover:scale-[1.07] group-hover:[transform:rotate(0deg)_scale(1.07)] group-focus-visible:[transform:rotate(0deg)_scale(1.07)] motion-reduce:transition-none md:px-6 md:py-3 md:text-[1.75rem]"
          style={
            {
              backgroundColor: entry.swatch,
              "--rot": `${placement.rotate}deg`,
            } as React.CSSProperties
          }
        >
          {entry.label}
          <span className="sk-pixel text-[1.125rem] leading-none opacity-70">
            {entry.index}
          </span>
        </span>
        <span className="sr-only">. {entry.note}</span>
      </Link>
    </motion.div>
  );
}

export default function SketchHome() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SKETCH_ENTRIES.find((entry) => entry.slug === activeId) ?? null;

  return (
    <section className="sketch-scope relative min-h-screen w-full overflow-hidden">
      <div className="sk-paper pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Top bar */}
      <header className="relative mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-6 pt-6 md:px-12">
        <p className="sk-pixel text-[1.125rem] leading-none text-[var(--sk-muted)]">
          wish nakthong / sketchbook
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/classic"
            className="hidden min-h-11 items-center border-2 border-[var(--sk-ink)] px-4 text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)] sm:inline-flex"
          >
            <span className="sk-pixel text-[1.125rem] leading-none">classic view</span>
          </Link>
          <a
            href="/CV_Wish_Nakthong.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border-2 border-[var(--sk-ink)] px-4 text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
          >
            <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            <span className="sk-pixel text-[1.125rem] leading-none">CV</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Stage: the name sits in the middle, topic tags float around it */}
      <div className="relative mx-auto max-w-[88rem] px-6 pb-16 md:px-12">
        <div className="relative md:h-[calc(100vh-7rem)] md:max-h-[50rem] md:min-h-[34rem]">
          {/* Name block */}
          <div className="relative z-10 flex flex-col items-center pt-14 text-center md:absolute md:inset-0 md:justify-center md:pt-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: SKETCH_EASE }}
              className="relative px-5 py-3 md:px-9 md:py-5"
              style={{
                border: "1.5px solid var(--sk-accent-ink)",
                backgroundColor:
                  "color-mix(in srgb, var(--sk-accent) 14%, transparent)",
              }}
            >
              {/* Selection handles, like a layer picked in a design tool */}
              {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map(
                (pos) => (
                  <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute h-2.5 w-2.5 border-[1.5px] border-[var(--sk-accent-ink)] bg-[var(--sk-surface)] ${pos}`}
                  />
                )
              )}

              <h1 className="sk-marker text-[clamp(2.75rem,13vw,4.5rem)] leading-[1.02] md:text-[clamp(3rem,7.2vw,7.25rem)]">
                Wish
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                Nakthong
              </h1>

              {/* Margin note in red pencil */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[4.5rem] right-0 hidden text-[var(--sk-pen)] md:block"
              >
                <span className="sk-marker block -rotate-6 text-[1.75rem] normal-case leading-none">
                  hi, that&apos;s me
                </span>
                <svg viewBox="0 0 100 70" className="mt-1 h-12 w-16 overflow-visible">
                  <motion.path
                    d="M 62 4 C 56 34, 36 52, 10 58 M 24 44 L 8 58 L 28 66"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: SKETCH_EASE }}
                  />
                </svg>
              </div>
            </motion.div>

            <p className="mt-6 min-h-[4.5rem] max-w-[46ch] text-[1.0625rem] font-light leading-relaxed md:mt-8">
              {active ? active.note : DEFAULT_CAPTION}
            </p>
          </div>

          {/* Topic tags */}
          <nav
            aria-label="Portfolio sections"
            className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-10 md:contents"
          >
            {SKETCH_ENTRIES.map((entry, i) => (
              <SketchTag key={entry.slug} entry={entry} order={i} onActive={setActiveId} />
            ))}
          </nav>
        </div>

        <p className="sk-pixel mt-14 text-center text-[1.0625rem] leading-none text-[var(--sk-muted)] md:mt-4">
          ICT Mahidol University / DST
        </p>
      </div>
    </section>
  );
}
