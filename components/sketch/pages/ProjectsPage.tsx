"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { projects } from "@/components/Projects";
import { SKETCH_EASE } from "@/lib/sketch-entries";

type Project = (typeof projects)[number];

const linkClass =
  "inline-flex min-h-11 items-center gap-2 border-b-2 border-transparent text-[0.9375rem] font-medium text-[var(--sk-ink)] transition-colors duration-200 hover:border-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]";

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
      <ol className="border-t border-[var(--sk-line-strong)]">
        {projects.map((project, i) => (
          <li
            key={project.title}
            className="grid gap-5 border-b border-[var(--sk-line)] py-8 md:grid-cols-[3rem_minmax(0,17rem)_minmax(0,1fr)] md:gap-8 md:py-10"
          >
            <span className="sk-pixel text-[1.5rem] leading-none text-[var(--sk-muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => open(project)}
              aria-label={`Preview ${project.title}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden border-2 border-[var(--sk-ink)] bg-[var(--sk-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 768px) 272px, 100vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            </button>

            <div className="min-w-0">
              <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-normal leading-tight">
                {project.title}
              </h2>
              <p className="mt-3 max-w-[60ch] text-[0.9375rem] font-light leading-relaxed text-[var(--sk-muted)]">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="sk-pixel border border-[var(--sk-line-strong)] px-2 py-0.5 text-[1rem] leading-tight"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-x-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
                {"demo" in project && project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
                <button type="button" onClick={() => open(project)} className={linkClass}>
                  Preview
                  <span className="sk-pixel text-[1rem] text-[var(--sk-muted)]">
                    {project.demoImages.length} shots
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
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} screenshots`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: SKETCH_EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--sk-bg)]/95 p-4 backdrop-blur-sm md:p-8"
            onClick={close}
          >
            <div
              className="flex items-center justify-between gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="sk-pixel text-[1.25rem] leading-none">
                {selected.title}
                <span className="ml-3 text-[var(--sk-muted)]">
                  {imageIndex + 1} / {selected.demoImages.length}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close preview"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-[var(--sk-ink)] text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative mt-4 min-h-0 flex-1"
              onClick={(event) => event.stopPropagation()}
            >
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
                    className="absolute left-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-[var(--sk-ink)] bg-[var(--sk-surface)] text-[var(--sk-ink)] hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next screenshot"
                    className="absolute right-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-[var(--sk-ink)] bg-[var(--sk-surface)] text-[var(--sk-ink)] hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
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
