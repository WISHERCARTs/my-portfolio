"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FOLIO_EASE } from "@/lib/folio";
import { useMounted } from "@/lib/useMounted";

type Photo = { src: string; alt: string };

const PREVIEW_COUNT = 4;

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--f-line-strong)] bg-[var(--f-bg)] transition-colors duration-200 hover:bg-[var(--f-cream)] hover:text-[var(--f-panel-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

/** A row of thumbnails that opens a full-screen viewer. */
export default function PhotoGallery({
  photos,
  label,
}: {
  photos: Photo[];
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = photos.length;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setIndex((current) =>
        current === null ? null : (current + direction + total) % total,
      ),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  const preview = photos.slice(0, PREVIEW_COUNT);
  const extra = total - PREVIEW_COUNT;

  return (
    <>
      <ul className="mt-5 grid grid-cols-4 gap-2">
        {preview.map((photo, i) => {
          const isLast = i === PREVIEW_COUNT - 1 && extra > 0;
          return (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={
                  isLast ? `Open all ${total} photos` : `Open ${photo.alt}`
                }
                className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 140px, 22vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
                />
                {isLast ? (
                  <span className="f-display absolute inset-0 flex items-center justify-center bg-[rgba(14,14,14,0.62)] text-[1.75rem] text-[var(--f-cream)]">
                    +{extra + 1}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Portalled so transformed timeline cards can't trap the fixed overlay. */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {index !== null ? (
                <motion.div
                  key="photo-viewer"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${label} photos`}
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
                      {label}
                      <span className="ml-3 text-[var(--f-dim)]">
                        {index + 1} / {total}
                      </span>
                    </p>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      aria-label="Close photos"
                      className={iconButton}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div
                    className="relative mt-4 min-h-0 flex-1"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Image
                      key={photos[index].src}
                      src={photos[index].src}
                      alt={photos[index].alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 ${iconButton}`}
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className={`absolute right-0 top-1/2 -translate-y-1/2 ${iconButton}`}
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filmstrip */}
                  <ul
                    className="mt-4 flex gap-2 overflow-x-auto pb-1"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {photos.map((photo, i) => (
                      <li key={photo.src} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Show photo ${i + 1}`}
                          aria-current={i === index ? "true" : undefined}
                          className={`relative block h-14 w-20 overflow-hidden rounded-md transition-opacity ${
                            i === index
                              ? "opacity-100 ring-2 ring-[var(--f-cream)]"
                              : "opacity-50 hover:opacity-90"
                          }`}
                        >
                          <Image
                            src={photo.src}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
