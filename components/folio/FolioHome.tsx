"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FOLIO_EASE, FOLIO_ENTRIES } from "@/lib/folio";
import { projects } from "@/components/Projects";
import FolioNav from "./FolioNav";
import FolioFooter from "./FolioFooter";
import { StickerFace, StickerLink } from "./Stickers";

/* Where each sticker sits on the panel on wide screens, plus its tilt. */
const PLACEMENT: Record<string, { className: string; rotate: number }> = {
  about: { className: "md:left-[9%] md:top-[7%]", rotate: -8 },
  skills: { className: "md:left-[2.5%] md:top-[50%]", rotate: -6 },
  certificates: { className: "md:left-[12%] md:bottom-[6%]", rotate: 7 },
  projects: { className: "md:left-[64%] md:top-[9%]", rotate: 5 },
  education: { className: "md:right-[9%] md:top-[36%]", rotate: -9 },
  contact: { className: "md:left-[63%] md:bottom-[5%]", rotate: 0 },
  timeline: { className: "md:left-[77%] md:bottom-[7%]", rotate: -6 },
};

export default function FolioHome() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: FOLIO_EASE },
        };

  return (
    <div className="folio min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <FolioNav />

        <h1 className="f-display mt-4 text-[clamp(3.75rem,21vw,7.5rem)] md:mt-3 md:whitespace-nowrap md:text-[min(calc((100vw-5rem)/6.45),15svh,12.85rem)]">
          <span className="sr-only">Wish Nakthong, </span>
          <motion.span className="block md:inline-block" {...rise(0.05)}>
            AI Agent
          </motion.span>{" "}
          <motion.span className="block md:inline-block" {...rise(0.15)}>
            Builder
          </motion.span>
        </h1>

        <motion.div
          className="mt-5 grid gap-5 text-[0.9375rem] leading-relaxed text-[var(--f-dim)] md:mt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-10"
          {...rise(0.3)}
        >
          <p className="max-w-[44ch]">
            I&apos;m <span className="text-[var(--f-cream)]">Wish Nakthong</span>,
            a third-year Digital Science &amp; Technology student at ICT
            Mahidol, building AI agents, RAG pipelines and automations.
          </p>
          <p className="max-w-[44ch]">
            Ex-AI Agent Builder Intern at Botnoi Group and Google Student
            Ambassador 2026. Looking for an AI Engineer or Solutions Architect
            internship.
          </p>
          <div className="flex gap-6 md:flex-col md:items-end md:gap-3">
            <Link
              href="/contact"
              className="f-mono group inline-flex min-h-11 items-center gap-2 border-b border-[var(--f-cream)] text-[0.75rem] text-[var(--f-cream)] md:min-h-0 md:pb-1"
            >
              Get in touch
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href="/CV_Wish_Nakthong.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="f-mono group inline-flex min-h-11 items-center gap-2 border-b border-transparent text-[0.75rem] transition-colors hover:border-[var(--f-dim)] md:min-h-0 md:pb-1"
            >
              CV
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* The panel bleeds off the left edge and rounds off on the right. */}
      <div className="mt-8 pr-5 md:mt-8 md:pr-10 xl:pr-[calc((100vw-88rem)/2+2.5rem)]">
        <motion.div
          className="f-grid relative rounded-br-[9rem] text-[var(--f-panel-ink)] md:h-[clamp(19rem,calc(85svh-13rem),34rem)] md:rounded-r-full"
          initial={reduceMotion ? false : { opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: FOLIO_EASE }}
        >
          <div className="relative h-[24rem] md:static md:h-auto">
            {/* Cover photo. Only the top-left corner rounds, so the hair on the right stays in frame. */}
            <div className="absolute bottom-0 left-1/2 aspect-[0.835] h-[94%] -translate-x-1/2 overflow-hidden rounded-tl-[9rem] rounded-tr-2xl md:left-[44%] md:rounded-tl-[12rem]">
              <Image
                src="/images/wish-hero.jpg"
                alt="Wish Nakthong at a Google Student Ambassador event"
                fill
                priority
                sizes="(min-width: 768px) 28vw, 70vw"
                className="object-cover"
              />
            </div>
          </div>

          <nav
            aria-label="Sections"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-6 px-5 pb-28 pt-8 md:contents"
          >
            {FOLIO_ENTRIES.map((entry, i) => {
              const place = PLACEMENT[entry.slug];
              return (
                <motion.div
                  key={entry.slug}
                  className={`relative md:absolute ${place.className}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.6 + i * 0.08, ease: FOLIO_EASE }}
                >
                  <div className="md:scale-[0.9] lg:scale-[1.1] [@media(min-width:768px)_and_(max-height:820px)]:scale-[0.8]">
                    <StickerLink entry={entry} rotate={place.rotate}>
                      <StickerFace entry={entry} count={projects.length} />
                    </StickerLink>
                  </div>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <FolioFooter />
      </div>
    </div>
  );
}
