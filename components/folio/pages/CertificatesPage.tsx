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
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((name) => {
          const isActive = name === category;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={isActive}
              className={`min-h-11 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)] ${
                isActive
                  ? "f-sticker border-transparent"
                  : "border-[var(--f-line-strong)] text-[var(--f-dim)] hover:border-[var(--f-cream)] hover:text-[var(--f-cream)]"
              }`}
              style={isActive ? { backgroundColor: "var(--f-accent)" } : undefined}
            >
              {name}
            </button>
          );
        })}
      </div>

      <ol className="mt-12 border-t border-[var(--f-line-strong)]">
        {certificates.map((cert, i) => (
          <li key={cert.title}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-1 border-b border-[var(--f-line)] py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:grid-cols-[4rem_minmax(0,1fr)_8rem_2rem] md:items-center md:gap-x-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--f-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
              <span className="f-display text-[1.75rem] text-[var(--f-dim)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[clamp(1.0625rem,2.2vw,1.375rem)] font-medium leading-snug">
                  {cert.title}
                </span>
                <span className="mt-1 block text-[0.875rem] text-[var(--f-cream)]/80">
                  {cert.issuer}
                </span>
                <span className="mt-2 block max-w-[62ch] text-[0.875rem] leading-relaxed text-[var(--f-dim)]">
                  {cert.description}
                </span>
              </span>
              <span className="f-mono justify-self-end text-[0.6875rem] text-[var(--f-dim)] md:justify-self-start">
                {cert.date}
              </span>
              <ArrowUpRight
                className="hidden h-6 w-6 text-[var(--f-dim)] transition-colors duration-300 group-hover:text-[var(--f-cream)] md:block"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ol>

      {badges.length > 0 ? (
        <section className="mt-20" aria-labelledby="badges-heading">
          <Script src="//cdn.credly.com/assets/utilities/embed.js" async />
          <h2
            id="badges-heading"
            className="f-mono border-b border-[var(--f-line-strong)] pb-3 text-[0.75rem] text-[var(--f-dim)]"
          >
            Verified badges (Credly)
          </h2>
          <div className="mt-8 flex flex-wrap gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="rounded-tr-[3rem] bg-white p-4">
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
