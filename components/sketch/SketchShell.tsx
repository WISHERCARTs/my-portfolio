"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Undo2 } from "lucide-react";
import { SKETCH_ENTRIES, SKETCH_EASE, getSketchEntry } from "@/lib/sketch-entries";
import ThemeToggle from "./ThemeToggle";

/* Hand-drawn wobble used as the title underline. */
const UNDERLINE =
  "M 3 9 C 38 2, 74 13, 112 6 S 190 11, 236 4 S 292 10, 330 5";

interface SketchShellProps {
  slug: string;
  children: React.ReactNode;
}

export default function SketchShell({ slug, children }: SketchShellProps) {
  const reduceMotion = useReducedMotion();
  const found = getSketchEntry(slug);

  if (!found) return null;
  const { entry, prev, next } = found;

  return (
    <div className="sketch-scope relative min-h-screen w-full overflow-hidden">
      <div className="sk-paper pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Top bar */}
      <header className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pt-6 md:px-12">
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 border-2 border-[var(--sk-ink)] px-4 text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
        >
          <Undo2
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="sk-pixel text-[1.125rem] leading-none">the index</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="sk-pixel text-[1.125rem] leading-none text-[var(--sk-muted)]">
            {entry.index} / {String(SKETCH_ENTRIES.length).padStart(2, "0")}
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Page body. Pops in when you arrive from the index. */}
      <motion.main
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: SKETCH_EASE }}
        className="relative mx-auto max-w-6xl px-6 pb-20 pt-12 md:px-12 md:pt-20"
      >
        <p className="sk-pixel text-[1.0625rem] leading-none text-[var(--sk-muted)]">
          wish nakthong / {entry.slug}
        </p>

        <div className="mt-4 flex items-end gap-4">
          <span
            aria-hidden="true"
            className="mb-3 h-3 w-3 shrink-0 md:mb-5 md:h-4 md:w-4"
            style={{ backgroundColor: entry.swatch }}
          />
          <h1
            className="sk-marker text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.02]"
            style={{ textWrap: "balance" }}
          >
            {entry.label}
          </h1>
        </div>

        <svg
          viewBox="0 0 336 14"
          className="mt-3 h-3 w-48 overflow-visible text-[var(--sk-ink)] md:w-64"
          aria-hidden="true"
        >
          <motion.path
            d={UNDERLINE}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: SKETCH_EASE }}
          />
        </svg>

        <p className="mt-5 max-w-[56ch] text-[1.0625rem] font-light leading-relaxed text-[var(--sk-muted)]">
          {entry.subtitle}
        </p>

        <div className="mt-12 md:mt-16">{children}</div>
      </motion.main>

      {/* Pager */}
      <nav
        aria-label="Other pages"
        className="relative mx-auto grid max-w-6xl grid-cols-2 border-t border-[var(--sk-line-strong)] px-0 md:px-0"
      >
        {prev ? (
          <Link
            href={prev.href}
            className="group flex min-h-24 flex-col items-start justify-center gap-1 px-6 py-6 transition-colors duration-200 hover:bg-[var(--sk-surface)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--sk-accent-ink)] md:px-12"
          >
            <span className="sk-pixel inline-flex items-center gap-2 text-[1.0625rem] leading-none text-[var(--sk-muted)]">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              prev {prev.index}
            </span>
            <span className="text-[clamp(1.25rem,3vw,1.875rem)] font-normal">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex min-h-24 flex-col items-end justify-center gap-1 border-l border-[var(--sk-line)] px-6 py-6 text-right transition-colors duration-200 hover:bg-[var(--sk-surface)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--sk-accent-ink)] md:px-12"
          >
            <span className="sk-pixel inline-flex items-center gap-2 text-[1.0625rem] leading-none text-[var(--sk-muted)]">
              next {next.index}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="text-[clamp(1.25rem,3vw,1.875rem)] font-normal">{next.label}</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="group flex min-h-24 flex-col items-end justify-center gap-1 border-l border-[var(--sk-line)] px-6 py-6 text-right transition-colors duration-200 hover:bg-[var(--sk-surface)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--sk-accent-ink)] md:px-12"
          >
            <span className="sk-pixel inline-flex items-center gap-2 text-[1.0625rem] leading-none text-[var(--sk-muted)]">
              back to
              <Undo2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[clamp(1.25rem,3vw,1.875rem)] font-normal">the index</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
