"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { projects } from "@/components/Projects";
import { FOLIO_EASE } from "@/lib/folio";

type Project = (typeof projects)[number];

const linkClass =
  "f-mono inline-flex min-h-11 items-center gap-2 border-b border-transparent text-[0.75rem] transition-colors duration-200 hover:border-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--f-line-strong)] bg-[var(--f-bg)] transition-colors duration-200 hover:bg-[var(--f-cream)] hover:text-[var(--f-panel-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

export default function ProjectsPage() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (project: Project) => {
    setSelected(project);
    setImageIndex(0);
  };
  const close = useCallback(() => setSelected(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (!selected) return;
      const total = selected.demoImages.length;
      setImageIndex((current) => (current + direction + total) % total);
    },
    [selected]
  );

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, step]);

  return (
    <>
      <ol className="grid border-t border-[var(--f-line-strong)] lg:grid-cols-2 lg:gap-x-10">
        {projects.map((project, i) => (
          <li
            key={project.title}
            className="grid gap-4 border-b border-[var(--f-line)] py-5 md:grid-cols-[2rem_minmax(0,11rem)_minmax(0,1fr)] md:gap-5"
          >
            <span className="f-display text-[1.5rem] text-[var(--f-dim)]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => open(project)}
              aria-label={`Preview ${project.title}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-tr-[2.5rem] bg-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)]"
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 768px) 176px, 100vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            </button>

            <div className="min-w-0">
              <h2 className="f-display text-[clamp(1.375rem,2vw,1.75rem)] leading-[0.95]">{project.title}</h2>
              <p className="mt-2 line-clamp-3 max-w-[70ch] text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
                {project.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag, t) => (
                  <li
                    key={tag}
                    className="f-sticker rounded-full px-2.5 py-1 text-[0.625rem] tracking-[0.02em]"
                    style={{
                      backgroundColor: t === 0 ? "var(--f-accent)" : "var(--f-cream)",
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-x-6">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Github className="h-4 w-4" />
                  Code
                </a>
                {"demo" in project && project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
                <button type="button" onClick={() => open(project)} className={linkClass}>
                  Preview
                  <span className="text-[var(--f-dim)]">
                    ({project.demoImages.length})
                  </span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Screenshot viewer */}
      <AnimatePresence>
        {selected ? (
          <motion.div
            key="project-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} screenshots`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: FOLIO_EASE }}
            className="folio fixed inset-0 z-[60] flex flex-col bg-[rgba(14,14,14,0.96)] p-4 md:p-8"
            onClick={close}
          >
            <div
              className="flex items-center justify-between gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="f-mono text-[0.75rem]">
                {selected.title}
                <span className="ml-3 text-[var(--f-dim)]">
                  {imageIndex + 1} / {selected.demoImages.length}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close preview"
                className={iconButton}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-4 min-h-0 flex-1" onClick={(event) => event.stopPropagation()}>
              <Image
                key={selected.demoImages[imageIndex]}
                src={selected.demoImages[imageIndex]}
                alt={`${selected.title} screenshot ${imageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
              {selected.demoImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous screenshot"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 ${iconButton}`}
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next screenshot"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 ${iconButton}`}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
