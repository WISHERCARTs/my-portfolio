"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { FOLIO_EASE } from "@/lib/folio";
import { KIND_STYLE, TIMELINE, type TimelineEvent } from "@/lib/timeline";
import PhotoGallery from "../PhotoGallery";

/*
 * Layout: one vertical spine. On phones it sits at the left and every branch
 * grows to the right; from md up it runs down the middle and branches
 * alternate sides.
 */
const SPINE_X = "left-[1.375rem] md:left-1/2";

/* Running branch count before each year, so sides keep alternating across years. */
const OFFSETS = TIMELINE.map((_, y) =>
  TIMELINE.slice(0, y).reduce((total, year) => total + year.events.length, 0)
);

function Branch({ event, side }: { event: TimelineEvent; side: "left" | "right" }) {
  const reduceMotion = useReducedMotion();
  const kind = KIND_STYLE[event.kind];
  const isLeft = side === "left";

  return (
    <motion.li
      className={`relative pl-14 md:w-1/2 md:pl-0 ${
        isLeft ? "md:pr-16" : "md:ml-auto md:pl-16"
      }`}
      initial={reduceMotion ? false : { opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: FOLIO_EASE }}
    >
      {/* Branch: a short arm from the spine to the card, with a joint dot. */}
      <span
        aria-hidden="true"
        className={`absolute top-7 h-px w-8 bg-[var(--f-line-strong)] left-[1.375rem] md:w-16 ${
          isLeft ? "md:left-auto md:right-0" : "md:left-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-7 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[var(--f-bg)] left-[1.375rem] ${
          isLeft ? "md:left-full" : "md:left-0"
        }`}
        style={{ backgroundColor: kind.color }}
      />

      <article className="rounded-tr-[2.25rem] border border-[var(--f-line)] bg-[#161615] p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="f-sticker rounded-full px-2.5 py-1 text-[0.625rem] tracking-[0.04em]"
            style={{ backgroundColor: kind.color }}
          >
            {kind.label}
          </span>
          {event.when ? (
            <span className="f-mono text-[0.6875rem] text-[var(--f-dim)]">{event.when}</span>
          ) : null}
        </div>
        <h3 className="f-display mt-4 text-[clamp(1.625rem,2.6vw,2.125rem)] leading-[0.95]">{event.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">{event.body}</p>
        {event.photos ? <PhotoGallery photos={event.photos} label={event.title} /> : null}
        {event.href ? (
          <Link
            href={event.href}
            className="f-mono group mt-4 inline-flex min-h-11 items-center gap-2 text-[0.6875rem] md:min-h-0"
          >
            <span className="border-b border-[var(--f-cream)] pb-0.5">More</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </article>
    </motion.li>
  );
}

export default function TimelinePage() {
  const reduceMotion = useReducedMotion();
  const spineRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // The spine fills in as you scroll down through the years.
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 75%", "end 75%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <div ref={spineRef} className="relative pb-6">
      {/* Spine track and its scroll fill */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 top-0 w-px -translate-x-1/2 bg-[var(--f-line-strong)] ${SPINE_X}`}
      />
      <motion.span
        aria-hidden="true"
        className={`absolute bottom-0 top-0 w-[3px] -translate-x-1/2 origin-top bg-[var(--f-accent)] ${SPINE_X}`}
        style={{ scaleY: reduceMotion ? 1 : fill }}
      />

      <ol className="relative space-y-16 md:space-y-24">
        {TIMELINE.map((year, y) => {
          const isOpen = !collapsed[year.year];
          const listId = `year-${year.year}`;
          return (
            <li key={year.year}>
              {/* Year node: a round button sitting on the spine */}
              <div className="relative flex items-center gap-5 md:flex-col md:items-center md:gap-4 md:text-center">
                <button
                  type="button"
                  onClick={() =>
                    setCollapsed((current) => ({ ...current, [year.year]: isOpen }))
                  }
                  aria-expanded={isOpen}
                  aria-controls={listId}
                  className="f-display group relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--f-cream)] text-[var(--f-panel-ink)] ring-[6px] ring-[var(--f-bg)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:h-28 md:w-28 md:text-[2.25rem]"
                >
                  <span className="hidden md:inline">{year.year}</span>
                  <span className="md:hidden">
                    {isOpen ? (
                      <Minus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    )}
                  </span>
                  <span className="sr-only">
                    {isOpen ? `Collapse ${year.year}` : `Expand ${year.year}`}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 hidden h-8 w-8 items-center justify-center rounded-full bg-[var(--f-accent)] text-[var(--f-panel-ink)] md:flex"
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={3} />
                    )}
                  </span>
                </button>
                <div className="relative z-10 md:max-w-md md:bg-[var(--f-bg)] md:px-4 md:py-1.5">
                  <p className="f-display text-[2.5rem] md:hidden">{year.year}</p>
                  <p className="text-[1rem] font-medium md:text-[1.125rem]">{year.headline}</p>
                  <p className="f-mono mt-1 text-[0.6875rem] text-[var(--f-dim)]">
                    {String(year.events.length).padStart(2, "0")}{" "}
                    {year.events.length === 1 ? "thing" : "things"}
                  </p>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={listId}
                    key="events"
                    className="overflow-hidden"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: FOLIO_EASE }}
                  >
                    <ol className="space-y-8 pt-10 md:space-y-4 md:pt-12">
                      {year.events.map((event, i) => (
                        <Branch
                          key={event.title}
                          event={event}
                          side={(OFFSETS[y] + i) % 2 === 0 ? "left" : "right"}
                        />
                      ))}
                    </ol>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}

        {/* Where the line ends today */}
        <li className="relative flex items-center gap-5 md:flex-col md:items-center md:gap-4 md:text-center">
          <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center md:h-16 md:w-16">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full bg-[var(--f-accent)] opacity-40 motion-reduce:animate-none"
            />
            <span className="relative h-5 w-5 rounded-full bg-[var(--f-accent)] ring-[6px] ring-[var(--f-bg)] md:h-7 md:w-7" />
          </span>
          <div className="relative z-10 md:bg-[var(--f-bg)] md:px-4 md:pb-2">
            <p className="f-display text-[2.5rem] md:text-[3.5rem]">Now</p>
            <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">
              Third year at ICT Mahidol, looking for an AI Engineer or Solutions
              Architect internship.
            </p>
            <Link
              href="/contact"
              className="f-sticker mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.875rem]"
              style={{ backgroundColor: "var(--f-accent)" }}
            >
              Get in touch
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
            </Link>
          </div>
        </li>
      </ol>
    </div>
  );
}
