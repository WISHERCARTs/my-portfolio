"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FOLIO_EASE, FOLIO_ENTRIES, getFolioEntry } from "@/lib/folio";
import FolioNav from "./FolioNav";
import FolioFooter from "./FolioFooter";

export default function FolioShell({ slug, children }: { slug: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const found = getFolioEntry(slug);
  if (!found) return null;
  const { entry, next } = found;

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: FOLIO_EASE },
        };

  return (
    <div
      className="folio min-h-screen overflow-x-hidden"
      style={{ "--f-accent": entry.color } as CSSProperties}
    >
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <FolioNav />

        <motion.div
          className="f-mono mt-6 flex items-center gap-3 text-[0.75rem] text-[var(--f-dim)] md:mt-8"
          {...rise(0)}
        >
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.index} / {String(FOLIO_ENTRIES.length).padStart(2, "0")}
        </motion.div>

        <motion.h1
          className="f-display mt-3 text-[clamp(3rem,11vw,4rem)] md:text-[clamp(3.5rem,min(6.5vw,11svh),6rem)]"
          style={{ textWrap: "balance" }}
          {...rise(0.08)}
        >
          {entry.title}
        </motion.h1>

        <motion.div
          className="mt-4 grid gap-4 md:mt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          {...rise(0.2)}
        >
          <p className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">
            {entry.intro}
          </p>
          <Link
            href="/"
            className="f-mono group inline-flex min-h-11 items-center gap-2 self-start text-[0.75rem] md:min-h-0 md:self-auto"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span className="border-b border-[var(--f-cream)] pb-0.5">Back to index</span>
          </Link>
        </motion.div>

        <motion.main className="mt-10 md:mt-12" {...rise(0.3)}>
          {children}
        </motion.main>
      </div>

      {/* Next section: the cream panel again, bleeding off the left edge. */}
      <div className="mt-16 pr-5 md:mt-20 md:pr-10 xl:pr-[calc((100vw-88rem)/2+2.5rem)]">
        <Link
          href={next.href}
          className="f-grid group relative block rounded-r-full py-7 pl-5 pr-24 text-[var(--f-panel-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:py-9 md:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] md:pr-40"
        >
          <span className="f-mono flex items-center gap-3 text-[0.75rem]">
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: next.color }}
            />
            Next / {next.index}
          </span>
          <span className="f-display mt-2 flex items-center gap-4 text-[clamp(2.25rem,5.5vw,4.5rem)]">
            {next.title}
            <ArrowRight
              className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 motion-reduce:transition-none"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </span>
        </Link>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <FolioFooter />
      </div>
    </div>
  );
}
