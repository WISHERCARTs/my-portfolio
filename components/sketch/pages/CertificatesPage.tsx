"use client";

import { useState } from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { certificateData, credlyBadges } from "@/components/Certificates";

const CATEGORIES = [
  "All",
  "Google & AI",
  "Networks & Security",
  "Programming & Tools",
  "Other Achievements",
];

export default function CertificatesPage() {
  const [category, setCategory] = useState("All");

  const certificates =
    category === "All"
      ? certificateData
      : certificateData.filter((cert) => cert.category === category);
  const badges = credlyBadges.filter(
    (badge) => category === "All" || badge.category === category
  );

  return (
    <div>
      {/* Filter */}
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((name) => {
          const isActive = name === category;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={isActive}
              className={`sk-pixel min-h-11 border-2 border-[var(--sk-ink)] px-4 text-[1.125rem] leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)] ${
                isActive
                  ? "bg-[var(--sk-ink)] text-[var(--sk-bg)]"
                  : "text-[var(--sk-ink)] hover:bg-[var(--sk-surface)]"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* List */}
      <ol className="mt-10 border-t border-[var(--sk-line-strong)]">
        {certificates.map((cert, i) => (
          <li key={cert.title}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-1 border-b border-[var(--sk-line)] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sk-accent-ink)] md:grid-cols-[3rem_minmax(0,1fr)_7rem_2rem] md:items-center md:gap-x-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--sk-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
              <span className="sk-pixel text-[1.375rem] leading-none text-[var(--sk-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[clamp(1.125rem,2.4vw,1.5rem)] font-normal leading-snug">
                  {cert.title}
                </span>
                <span className="mt-1 block text-[0.9375rem] font-light text-[var(--sk-muted)]">
                  {cert.issuer}
                </span>
                <span className="mt-2 block max-w-[62ch] text-[0.875rem] font-light leading-relaxed text-[var(--sk-muted)]">
                  {cert.description}
                </span>
              </span>
              <span className="sk-pixel justify-self-end text-[1.25rem] leading-none text-[var(--sk-muted)] md:justify-self-start">
                {cert.date}
              </span>
              <ArrowUpRight
                className="hidden h-6 w-6 text-[var(--sk-muted)] transition-colors duration-300 group-hover:text-[var(--sk-accent-ink)] md:block"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ol>

      {/* Credly verified badges */}
      {badges.length > 0 ? (
        <section className="mt-16" aria-labelledby="badges-heading">
          <Script src="//cdn.credly.com/assets/utilities/embed.js" async />
          <h2
            id="badges-heading"
            className="sk-pixel border-b border-[var(--sk-line-strong)] pb-3 text-[1.125rem] leading-none text-[var(--sk-muted)]"
          >
            verified badges (Credly)
          </h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="border-2 border-[var(--sk-ink)] bg-white p-4"
              >
                <div
                  data-iframe-width="150"
                  data-iframe-height="270"
                  data-share-badge-id={badge.id}
                  data-share-badge-host="https://www.credly.com"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
