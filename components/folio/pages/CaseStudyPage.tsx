import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import type { CaseStudy, CaseStudyActor, CaseStudyFlow } from "@/lib/caseStudies";

const linkClass =
  "f-mono inline-flex min-h-11 items-center gap-2 border-b border-transparent text-[0.75rem] transition-colors duration-200 hover:border-[var(--f-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--f-cream)]";

const ACTORS: Record<CaseStudyActor, { label: string; className: string }> = {
  me: {
    label: "Me",
    className: "bg-[var(--f-accent)] text-[var(--f-panel-ink)]",
  },
  agent: {
    label: "Claude Code",
    className: "bg-[var(--f-cream)] text-[var(--f-panel-ink)]",
  },
  ci: {
    label: "CI",
    className: "border border-[var(--f-line-strong)] text-[var(--f-cream)]",
  },
  auto: {
    label: "Automatic",
    className: "border border-dashed border-[var(--f-line-strong)] text-[var(--f-dim)]",
  },
};

function Flow({ flow }: { flow: CaseStudyFlow }) {
  return (
    <figure className="pt-2">
      <figcaption className="f-mono pb-3 text-[0.6875rem] text-[var(--f-dim)]">{flow.caption}</figcaption>
      <ol>
        {flow.steps.map((step, i) => {
          const actor = ACTORS[step.actor];
          return (
            <li key={i} className="relative grid grid-cols-[1.375rem_minmax(0,1fr)] gap-3 py-2">
              {i < flow.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-0.5rem] left-[0.6875rem] top-[1.875rem] w-px bg-[var(--f-line-strong)]"
                />
              ) : null}
              <span className="f-mono flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border border-[var(--f-line-strong)] text-[0.625rem] text-[var(--f-dim)]">
                {i + 1}
              </span>
              <p className="flex flex-col items-start gap-1 sm:grid sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-3">
                <span
                  className={`f-mono inline-block w-fit rounded-full px-2 py-0.5 text-[0.625rem] ${actor.className}`}
                >
                  {actor.label}
                </span>
                <span>{step.text}</span>
              </p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

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

            {section.flow ? <Flow flow={section.flow} /> : null}

            {section.code?.map((block) => (
              <figure key={block.caption} className="pt-2">
                <figcaption className="f-mono pb-2 text-[0.6875rem] text-[var(--f-dim)]">{block.caption}</figcaption>
                <pre className="whitespace-pre-wrap break-words rounded-tr-[1.5rem] border border-[var(--f-line)] bg-black/40 p-4 text-[0.75rem] leading-relaxed text-[var(--f-cream)]/90">
                  <code>{block.text}</code>
                </pre>
              </figure>
            ))}

            {section.figures?.map((figure) => (
              <figure key={figure.src} className="pt-2">
                <Image
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.width}
                  height={figure.height}
                  sizes="(min-width: 768px) 70ch, 100vw"
                  className="h-auto w-full rounded-tr-[2rem] border border-[var(--f-line)]"
                />
                <figcaption className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
                  {figure.caption}
                </figcaption>
              </figure>
            ))}
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
        {study.related?.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`} className={linkClass}>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        ))}
        <Link href="/projects" className={linkClass}>
          <ArrowUpRight className="h-4 w-4 rotate-[225deg]" aria-hidden="true" />
          All projects
        </Link>
      </div>
    </article>
  );
}
