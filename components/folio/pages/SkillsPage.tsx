"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { skillLogos, skillsData } from "@/components/Skills";

function SkillMark({ item }: { item: string }) {
  const config = skillLogos[item];
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--f-cream)] text-[var(--f-panel-ink)]">
      {config?.logoUrl && !failed ? (
        // Logos come from external CDNs and fall back to an icon on error,
        // which next/image can't do without a remote loader per host.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={config.logoUrl}
          alt=""
          onError={() => setFailed(true)}
          className="h-6 w-6 object-contain"
        />
      ) : (
        config?.fallbackIcon ?? <Terminal className="h-5 w-5" />
      )}
    </span>
  );
}

export default function SkillsPage() {
  return (
    <div className="space-y-20">
      {skillsData.map((group, i) => (
        <section key={group.category} aria-labelledby={`skills-${i}`}>
          <div className="flex items-end justify-between gap-4 border-b border-[var(--f-line-strong)] pb-4">
            <h2 id={`skills-${i}`} className="f-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95]">
              {group.category}
            </h2>
            <span className="f-mono shrink-0 pb-1 text-[0.6875rem] text-[var(--f-dim)]">
              {String(group.items.length).padStart(2, "0")} items
            </span>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-10">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex min-h-16 items-center gap-4 border-b border-[var(--f-line)] py-2.5"
              >
                <SkillMark item={item} />
                <span className="text-[0.9375rem] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
