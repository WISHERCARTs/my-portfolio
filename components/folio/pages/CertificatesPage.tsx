"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { CERT_CATEGORIES, certificateData, credlyBadges } from "@/components/Certificates";
import { certPreviewSrc } from "@/lib/certPreview";

const CATEGORIES = ["All", ...CERT_CATEGORIES];

export default function CertificatesPage() {
  const [category, setCategory] = useState("All");

  const groups = CERT_CATEGORIES.filter((name) => category === "All" || name === category)
    .map((name) => ({
      name,
      certs: certificateData.filter((cert) => cert.category === name),
    }))
    .filter((group) => group.certs.length > 0);
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
              className={`min-h-10 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)] ${
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

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.name} aria-labelledby={`certs-${group.name}`}>
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--f-line-strong)] pb-2">
              <h2
                id={`certs-${group.name}`}
                className="f-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[0.95]"
              >
                {group.name}
              </h2>
              <span className="f-mono text-[0.6875rem] text-[var(--f-dim)]">
                {String(group.certs.length).padStart(2, "0")}
              </span>
            </div>
            <ol>
              {group.certs.map((cert) => (
                <li key={cert.title}>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-3 border-b border-[var(--f-line)] py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:grid-cols-[7.5rem_minmax(0,1fr)_4rem_1.25rem] md:gap-x-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--f-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                    />
                    {/* Preview of page one of the certificate */}
                    <span className="relative col-span-2 block aspect-[1100/777] w-full max-w-[12rem] overflow-hidden rounded bg-white shadow-[0_8px_18px_-12px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-2 group-hover:scale-[1.06] motion-reduce:transition-none md:col-span-1">
                      <Image
                        src={certPreviewSrc(cert.title)}
                        alt={`Preview of the ${cert.title} certificate`}
                        fill
                        sizes="(min-width: 768px) 120px, 50vw"
                        className="object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[1rem] font-medium leading-snug">{cert.title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-[var(--f-cream)]/80">
                        {cert.issuer}
                      </span>
                      <span className="mt-1 line-clamp-2 max-w-[70ch] text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
                        {cert.description}
                      </span>
                    </span>
                    <span className="f-mono self-start text-[0.6875rem] text-[var(--f-dim)] md:self-center">
                      {cert.date}
                    </span>
                    <ArrowUpRight
                      className="hidden h-5 w-5 text-[var(--f-dim)] transition-colors duration-300 group-hover:text-[var(--f-cream)] md:block"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {badges.length > 0 ? (
        <section className="mt-12" aria-labelledby="badges-heading">
          <Script src="//cdn.credly.com/assets/utilities/embed.js" async />
          <h2
            id="badges-heading"
            className="f-mono border-b border-[var(--f-line-strong)] pb-3 text-[0.75rem] text-[var(--f-dim)]"
          >
            Verified badges (Credly)
          </h2>
          <div className="mt-6 flex flex-wrap gap-6">
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
