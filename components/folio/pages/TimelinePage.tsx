"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { FOLIO_EASE } from "@/lib/folio";
import { certPreviewSrc } from "@/lib/certPreview";
import { KIND_STYLE, TIMELINE, type TimelineEvent } from "@/lib/timeline";
import PhotoGallery from "../PhotoGallery";

/*
 * Layout: one thin spine down the left edge of the events. Each year is a
 * short header, and each event is a compact row hanging off the spine, so
 * the whole path reads at a glance instead of one big card per screen.
 */
const SPINE_X = "left-[0.3125rem] md:left-[9.3125rem]";

function Row({ event }: { event: TimelineEvent }) {
  const reduceMotion = useReducedMotion();
  const kind = KIND_STYLE[event.kind];

  return (
    <motion.li
      className="relative pl-7 md:ml-36 md:pl-9"
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, ease: FOLIO_EASE }}
    >
      {/* Joint dot on the spine, coloured by kind */}
      <span
        aria-hidden="true"
        className="absolute left-[0.3125rem] top-[0.6rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-[var(--f-bg)]"
        style={{ backgroundColor: kind.color }}
      />

      <article className="group border-b border-[var(--f-line)] pb-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {event.when ? (
            <span className="f-mono shrink-0 text-[0.6875rem] text-[var(--f-dim)] md:w-[5.5rem]">
              {event.when}
            </span>
          ) : (
            <span className="hidden w-[5.5rem] shrink-0 md:block" aria-hidden="true" />
          )}
          <span
            className="f-sticker rounded-full px-2 py-0.5 text-[0.5625rem] tracking-[0.04em]"
            style={{ backgroundColor: kind.color }}
          >
            {kind.label}
          </span>
          <h3 className="text-[0.9375rem] font-medium leading-snug md:text-[1rem]">
            {event.href ? (
              <Link
                href={event.href}
                className="inline-flex items-center gap-1.5 hover:underline hover:underline-offset-4"
              >
                {event.title}
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--f-dim)] transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              event.title
            )}
          </h3>
        </div>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--f-dim)] md:pl-[6.25rem]">
          {event.body}
        </p>

        {event.cert || event.photos ? (
          <div className="mt-2 flex flex-wrap items-start gap-4 md:pl-[6.25rem]">
            {event.cert ? (
              <a
                href={event.cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cert flex items-center gap-3 rounded-md border border-[var(--f-line)] p-1.5 pr-3 transition-colors hover:border-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]"
              >
                <span className="relative block aspect-[1100/777] w-20 overflow-hidden rounded-sm bg-white">
                  <Image
                    src={certPreviewSrc(event.cert.title)}
                    alt={`Preview of the ${event.cert.title} certificate`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </span>
                <span className="f-mono flex items-center gap-1.5 text-[0.625rem]">
                  Certificate
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </a>
            ) : null}
            {event.photos ? (
              <div className="w-full max-w-[17rem] [&>ul]:mt-0">
                <PhotoGallery photos={event.photos} label={event.title} />
              </div>
            ) : null}
          </div>
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
    offset: ["start 80%", "end 80%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <div ref={spineRef} className="relative">
      {/* Spine track and its scroll fill */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 top-2 w-px -translate-x-1/2 bg-[var(--f-line-strong)] ${SPINE_X}`}
      />
      <motion.span
        aria-hidden="true"
        className={`absolute bottom-0 top-2 w-[2px] -translate-x-1/2 origin-top bg-[var(--f-accent)] ${SPINE_X}`}
        style={{ scaleY: reduceMotion ? 1 : fill }}
      />

      <ol className="relative space-y-7">
        {TIMELINE.map((year) => {
          const isOpen = !collapsed[year.year];
          const listId = `year-${year.year}`;
          return (
            <li key={year.year} className="md:grid md:grid-cols-[9.3125rem_minmax(0,1fr)]">
              {/* Year header: on md+ it sits in the left gutter beside its rows */}
              <div className="relative z-10 pl-7 md:col-start-1 md:row-start-1 md:pl-0 md:pr-6">
                <span
                  aria-hidden="true"
                  className="absolute left-[0.3125rem] top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--f-cream)] ring-4 ring-[var(--f-bg)] md:left-auto md:right-0 md:translate-x-1/2"
                />
                <button
                  type="button"
                  onClick={() =>
                    setCollapsed((current) => ({ ...current, [year.year]: isOpen }))
                  }
                  aria-expanded={isOpen}
                  aria-controls={listId}
                  className="group flex items-center gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:w-full md:justify-end"
                >
                  <span className="f-display text-[2rem] leading-none md:text-[2.25rem]">
                    {year.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--f-accent)] text-[var(--f-panel-ink)] transition-transform duration-300 group-hover:scale-110"
                  >
                    {isOpen ? (
                      <Minus className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      <Plus className="h-3 w-3" strokeWidth={3} />
                    )}
                  </span>
                  <span className="sr-only">
                    {isOpen ? `Collapse ${year.year}` : `Expand ${year.year}`}
                  </span>
                </button>
                <p className="mt-1 text-[0.8125rem] font-medium md:text-right">{year.headline}</p>
                <p className="f-mono mt-0.5 text-[0.625rem] text-[var(--f-dim)] md:text-right">
                  {String(year.events.length).padStart(2, "0")}{" "}
                  {year.events.length === 1 ? "thing" : "things"}
                </p>
              </div>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={listId}
                    key="events"
                    className="overflow-hidden md:col-span-2 md:col-start-1 md:row-start-1"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: FOLIO_EASE }}
                  >
                    <ol className="space-y-3 pt-4 md:pt-1.5">
                      {year.events.map((event) => (
                        <Row key={event.title} event={event} />
                      ))}
                    </ol>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}

        {/* Where the line ends today */}
        <li className="relative pl-7 md:pl-[11.5rem]">
          <span
            aria-hidden="true"
            className={`absolute top-2 h-3.5 w-3.5 -translate-x-1/2 ${SPINE_X}`}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--f-accent)] opacity-40 motion-reduce:animate-none" />
            <span className="absolute inset-0 rounded-full bg-[var(--f-accent)] ring-4 ring-[var(--f-bg)]" />
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="f-display text-[2rem] leading-none">Now</p>
            <p className="max-w-[48ch] text-[0.875rem] leading-relaxed text-[var(--f-dim)]">
              Third year at ICT Mahidol, looking for an AI Engineer or Solutions
              Architect internship.
            </p>
            <Link
              href="/contact"
              className="f-sticker inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.8125rem]"
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
