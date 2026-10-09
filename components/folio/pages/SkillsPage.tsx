"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { skillLogos, skillsData } from "@/components/Skills";

function SkillMark({ item }: { item: string }) {
  const config = skillLogos[item];
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--f-cream)] text-[var(--f-panel-ink)] [&>svg]:h-4 [&>svg]:w-4">
      {config?.logoUrl && !failed ? (
        // Logos are self-hosted SVGs in /icons/skills; a missing file falls
        // back to the item's icon, which next/image can't do on its own.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={config.logoUrl}
          alt=""
          onError={() => setFailed(true)}
          className="h-[1.125rem] w-[1.125rem] object-contain"
        />
      ) : (
        config?.fallbackIcon ?? <Terminal className="h-4 w-4" />
      )}
    </span>
  );
}

export default function SkillsPage() {
  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
      {skillsData.map((group, i) => (
        <section key={group.category} aria-labelledby={`skills-${i}`}>
          <div className="flex items-end justify-between gap-4 border-b border-[var(--f-line-strong)] pb-2">
            <h2 id={`skills-${i}`} className="f-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-[0.95]">
              {group.category}
            </h2>
            <span className="f-mono shrink-0 pb-1 text-[0.6875rem] text-[var(--f-dim)]">
              {String(group.items.length).padStart(2, "0")} items
            </span>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] gap-x-6">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex min-h-11 items-center gap-3 border-b border-[var(--f-line)] py-1.5"
              >
                <SkillMark item={item} />
                <span className="text-[0.8125rem] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
