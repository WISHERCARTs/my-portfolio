"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Cpu,
  FolderGit2,
  GraduationCap,
  Mail,
  Undo2,
  User,
} from "lucide-react";

interface SketchEntry {
  id: string;
  index: string;
  label: string;
  subtitle: string;
  note: string;
  icon: React.ElementType;
  swatch: string;
  href: string;
}

const ENTRIES: SketchEntry[] = [
  {
    id: "about",
    index: "01",
    label: "About Me",
    subtitle: "who I am",
    note: "Third-year Digital Science & Technology at ICT Mahidol, working on systems that read data and answer back.",
    icon: User,
    swatch: "#EFCD61",
    href: "#about",
  },
  {
    id: "projects",
    index: "02",
    label: "Projects",
    subtitle: "what I built",
    note: "The Local Soul tourism chatbot, automated AI agents, and the coursework that grew into real builds.",
    icon: FolderGit2,
    swatch: "#788EFF",
    href: "#projects",
  },
  {
    id: "skills",
    index: "03",
    label: "Skills",
    subtitle: "what I use",
    note: "Python, TypeScript, the AI agent stack, and the tools I reach for before I stop to think.",
    icon: Cpu,
    swatch: "#FF5960",
    href: "#skills",
  },
  {
    id: "certificates",
    index: "04",
    label: "Certificates",
    subtitle: "what I earned",
    note: "Google Student Ambassador 2026, BOTNOI Trainee 2026, and the rest of the paper trail.",
    icon: Award,
    swatch: "#FFB0FF",
    href: "#certificates",
  },
  {
    id: "education",
    index: "05",
    label: "Education",
    subtitle: "where I study",
    note: "B.Sc. in Digital Science & Technology, Faculty of ICT, Mahidol University.",
    icon: GraduationCap,
    swatch: "#FFC060",
    href: "#education",
  },
  {
    id: "contact",
    index: "06",
    label: "Contact",
    subtitle: "say hi",
    note: "Email, LinkedIn, GitHub. Internship and collaboration messages get answered first.",
    icon: Mail,
    swatch: "#363636",
    href: "#contact",
  },
];

/** ease-out-quint */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Hand-drawn double-loop pencil stroke, kept from the original sketchbook. */
const PENCIL_OUTER =
  "M 60 12 C 100 8, 140 26, 138 65 C 135 105, 105 138, 62 135 C 22 131, 8 95, 12 55 C 16 16, 48 12, 78 10 C 108 8, 138 20, 134 58";
const PENCIL_INNER =
  "M 68 16 C 108 12, 134 32, 131 70 C 128 108, 96 132, 56 129 C 16 126, 10 88, 14 50 C 18 12, 58 14, 88 16";

interface NotebookSketchMenuProps {
  onSwitchToMain?: () => void;
}

export default function NotebookSketchMenu({
  onSwitchToMain,
}: NotebookSketchMenuProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const active = ENTRIES.find((entry) => entry.id === activeId) ?? null;

  const goToSection = (href: string) => {
    const scrollTo = () => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    if (onSwitchToMain) {
      onSwitchToMain();
      window.setTimeout(scrollTo, 350);
    } else {
      scrollTo();
    }
  };

  return (
    <section className="sketch-scope relative min-h-screen w-full overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Graph paper field */}
      <div className="sk-paper pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-14 gap-y-14 px-6 md:px-12 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
        {/* ------------------------------------------------------------------
            Left: identity + live preview of the hovered entry
           ------------------------------------------------------------------ */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="sk-pixel text-[1.0625rem] leading-none text-[var(--sk-muted)]">
            wish nakthong / sketchbook
          </p>

          <h1
            className="mt-3 text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            the index
          </h1>

          <p className="mt-4 max-w-[42ch] text-[0.9375rem] font-light leading-relaxed text-[var(--sk-muted)]">
            Six entries. Open one and it takes you to that section on the main
            portfolio page.
          </p>

          {/* Preview screen */}
          <div
            className="relative mt-9 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-[var(--sk-line-strong)] bg-[var(--sk-surface)]"
            aria-hidden="true"
          >
            <div className="sk-paper absolute inset-0 opacity-80" />

            <AnimatePresence initial={false}>
              <motion.div
                key={active ? active.id : "idle"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.26, ease: EASE }}
                className="absolute inset-0 grid place-items-center pb-8"
              >
                <div className="relative h-36 w-36">
                  {active ? (
                    <div
                      className="absolute inset-6 rounded-full blur-xl"
                      style={{ backgroundColor: `${active.swatch}66` }}
                    />
                  ) : null}

                  <svg
                    viewBox="0 0 150 150"
                    className="absolute inset-0 h-full w-full overflow-visible text-[var(--sk-ink)]"
                  >
                    <motion.path
                      d={PENCIL_OUTER}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    />
                    <motion.path
                      d={PENCIL_INNER}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.5}
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                    />
                  </svg>

                  <div className="absolute inset-0 grid place-items-center">
                    {active ? (
                      <active.icon className="h-9 w-9" strokeWidth={1.6} />
                    ) : (
                      <span className="sk-pixel sk-caret text-4xl leading-none">
                        _
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Status bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-[var(--sk-line)] bg-[var(--sk-surface)] px-3 py-1.5">
              <span className="sk-pixel text-[1rem] leading-none text-[var(--sk-accent-ink)]">
                {active ? active.index : "--"}
              </span>
              <span className="sk-pixel truncate text-[1rem] leading-none text-[var(--sk-muted)]">
                {active ? active.note : "hover an entry to preview it"}
              </span>
            </div>
          </div>

          {onSwitchToMain && (
            <button
              type="button"
              onClick={onSwitchToMain}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-none border-2 border-[var(--sk-ink)] px-4 py-2.5 text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
            >
              <Undo2
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={2}
              />
              <span className="sk-pixel text-[1.125rem] leading-none">
                back to main portfolio
              </span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------------
            Right: the index list
           ------------------------------------------------------------------ */}
        <nav aria-label="Portfolio index" className="lg:pt-2">
          <div className="flex items-baseline justify-between border-b border-[var(--sk-line-strong)] pb-3">
            <span className="sk-pixel text-[1.125rem] leading-none text-[var(--sk-muted)]">
              contents
            </span>
            <span className="sk-pixel text-[1.125rem] leading-none text-[var(--sk-muted)]">
              {ENTRIES.length} entries
            </span>
          </div>

          <ol className="mt-1">
            {ENTRIES.map((entry, i) => {
              const Icon = entry.icon;

              return (
                <motion.li
                  key={entry.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : 0.05 * i,
                    ease: EASE,
                  }}
                >
                  <a
                    href={entry.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(entry.href);
                    }}
                    onMouseEnter={() => setActiveId(entry.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(entry.id)}
                    onBlur={() => setActiveId(null)}
                    className="group relative block border-b border-[var(--sk-line)] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sk-accent-ink)] md:py-8"
                  >
                    {/* Accent rule sweeping in from the left on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--sk-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                    />

                    <div className="flex items-center gap-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transform-none motion-reduce:transition-none md:gap-8">
                      {/* Number + colour chip */}
                      <span className="flex w-14 shrink-0 flex-col items-start gap-2 md:w-16">
                        <span className="sk-pixel text-[1.5rem] leading-none text-[var(--sk-muted)] transition-colors duration-300 group-hover:text-[var(--sk-accent-ink)] group-focus-visible:text-[var(--sk-accent-ink)]">
                          {entry.index}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[2.75] group-focus-visible:scale-x-[2.75] motion-reduce:transform-none motion-reduce:transition-none"
                          style={{ backgroundColor: entry.swatch }}
                        />
                      </span>

                      {/* Label */}
                      <span className="min-w-0 flex-1">
                        <span className="block text-[clamp(1.5rem,3.2vw,2.375rem)] font-normal leading-[1.15] tracking-[-0.015em]">
                          {entry.label}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] font-light text-[var(--sk-muted)]">
                          {entry.subtitle}
                        </span>
                        <span className="sr-only">. {entry.note}</span>
                      </span>

                      {/* Trailing mark */}
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                        <Icon
                          className="absolute h-5 w-5 text-[var(--sk-muted)] opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <ArrowUpRight
                          className="absolute h-6 w-6 text-[var(--sk-accent-ink)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </a>
                </motion.li>
              );
            })}
          </ol>

          <p className="sk-pixel mt-6 text-[1.0625rem] leading-none text-[var(--sk-muted)]">
            ICT Mahidol University / DST
          </p>
        </nav>
      </div>
    </section>
  );
}
