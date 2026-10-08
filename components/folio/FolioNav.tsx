"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { FOLIO_EASE, FOLIO_ENTRIES } from "@/lib/folio";

export default function FolioNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="flex items-center justify-between gap-6 py-5 md:py-7">
      <Link
        href="/"
        className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)]"
      >
        <span
          aria-hidden="true"
          className="h-7 w-11 rounded-r-full bg-[var(--f-cream)] transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-14 motion-reduce:transition-none"
        />
        <span className="text-[0.8125rem] font-medium leading-[1.15]">
          Wish
          <br />
          Nakthong
        </span>
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
        {FOLIO_ENTRIES.map((entry) => {
          const active = pathname === entry.href;
          return (
            <Link
              key={entry.slug}
              href={entry.href}
              aria-current={active ? "page" : undefined}
              className={`border-b py-1 text-[0.875rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] ${
                active
                  ? "border-[var(--f-cream)]"
                  : "border-transparent text-[var(--f-dim)] hover:text-[var(--f-cream)]"
              }`}
            >
              {entry.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="folio-menu"
        className="f-mono min-h-11 border-b border-[var(--f-cream)] px-1 text-[0.75rem] md:hidden"
      >
        Menu
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            id="folio-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: FOLIO_EASE }}
            className="folio fixed inset-0 z-[70] flex flex-col px-5 py-5"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--f-line-strong)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-8 space-y-1">
              {FOLIO_ENTRIES.map((entry, i) => (
                <motion.li
                  key={entry.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * i, ease: FOLIO_EASE }}
                >
                  <Link
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1"
                  >
                    <span className="f-mono text-[0.75rem] text-[var(--f-dim)]">
                      {entry.index}
                    </span>
                    <span className="f-display text-[3.25rem]">{entry.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
