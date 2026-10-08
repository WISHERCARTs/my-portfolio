"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { skillLogos, skillsData } from "@/components/Skills";

function SkillMark({ item }: { item: string }) {
  const config = skillLogos[item];
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center">
      {config?.logoUrl && !failed ? (
        // Logos come from external CDNs and fall back to an icon on error,
        // which next/image can't do without a remote loader per host.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={config.logoUrl}
          alt=""
          onError={() => setFailed(true)}
          className={`h-8 w-8 object-contain ${config.isDarkInverted ? "dark:invert" : ""}`}
        />
      ) : (
        config?.fallbackIcon ?? <Terminal className="h-6 w-6 text-[var(--sk-muted)]" />
      )}
    </span>
  );
}

export default function SkillsPage() {
  return (
    <div className="space-y-16">
      {skillsData.map((group, i) => (
        <section key={group.category} aria-labelledby={`skills-${i}`}>
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sk-line-strong)] pb-3">
            <h2
              id={`skills-${i}`}
              className="text-[clamp(1.375rem,3vw,2rem)] font-normal leading-tight"
            >
              {group.category}
            </h2>
            <span className="sk-pixel shrink-0 text-[1.125rem] leading-none text-[var(--sk-muted)]">
              {group.items.length} items
            </span>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-10">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex min-h-14 items-center gap-3 border-b border-[var(--sk-line)] py-2.5"
              >
                <SkillMark item={item} />
                <span className="text-[0.9375rem] font-light leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
