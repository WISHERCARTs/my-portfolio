import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import type { CaseStudy } from "@/lib/caseStudies";

const linkClass =
  "f-mono inline-flex min-h-11 items-center gap-2 border-b border-transparent text-[0.75rem] transition-colors duration-200 hover:border-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article>
      <ul className="grid gap-6 border-t border-[var(--f-line-strong)] py-8 md:grid-cols-3 md:gap-10">
        {study.stats.map((stat) => (
          <li key={stat.label}>
            <p className="f-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] text-[var(--f-accent)]">
              {stat.value}
            </p>
            <p className="mt-2 max-w-[28ch] text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>

      {study.sections.map((section, i) => (
        <section
          key={section.heading}
          aria-labelledby={`case-${i}`}
          className="grid gap-4 border-t border-[var(--f-line-strong)] py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10"
        >
          <div className="flex items-baseline gap-3 md:block">
            <span className="f-mono text-[0.75rem] text-[var(--f-dim)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2
              id={`case-${i}`}
              className="f-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[0.95] md:mt-2"
            >
              {section.heading}
            </h2>
          </div>

          <div className="min-w-0 max-w-[70ch] space-y-4 text-[0.9375rem] leading-relaxed text-[var(--f-cream)]/90">
            {section.paragraphs?.map((text) => (
              <p key={text}>{text}</p>
            ))}

            {section.bullets ? (
              <ul className="space-y-3">
                {section.bullets.map((text) => (
                  <li key={text} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-[var(--f-accent)]"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {section.table ? (
              <div className="overflow-x-auto pt-2">
                <table className="w-full min-w-[22rem] border-collapse text-left text-[0.8125rem]">
                  <caption className="f-mono pb-2 text-left text-[0.6875rem] text-[var(--f-dim)]">
                    {section.table.caption}
                  </caption>
                  <thead>
                    <tr className="border-b border-[var(--f-line-strong)]">
                      {section.table.head.map((cell, c) => (
                        <th key={c} scope="col" className="f-mono py-2 pr-4 text-[0.6875rem] font-normal text-[var(--f-dim)]">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-[var(--f-line)]">
                        {row.map((cell, c) => (
                          <td key={c} className={`py-2 pr-4 ${c === 0 ? "font-medium" : "tabular-nums"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-x-6 border-t border-[var(--f-line-strong)] pt-4">
        {study.github ? (
          <a href={study.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Github className="h-4 w-4" />
            Code and full README
          </a>
        ) : null}
        {study.demo ? (
          <a href={study.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            Live demo
          </a>
        ) : null}
        <Link href="/projects" className={linkClass}>
          <ArrowUpRight className="h-4 w-4 rotate-[225deg]" aria-hidden="true" />
          All projects
        </Link>
      </div>
    </article>
  );
}
