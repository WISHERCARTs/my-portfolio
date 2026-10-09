"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const FACTS = [
  { term: "Now", value: "3rd-year DST, ICT Mahidol" },
  { term: "Before", value: "AI Agent Builder Intern, Botnoi Group" },
  { term: "Also", value: "Google Student Ambassador 2026, Batch 1" },
];

const FOCUS = [
  {
    mark: "A",
    title: "AI and chatbots",
    body: "RAG systems, multi-agent architecture, agentic design, prompt engineering and speech AI.",
  },
  {
    mark: "B",
    title: "Full stack and database",
    body: "Next.js, React, Node.js, Express.js, TypeScript, Python, SQL and REST API design.",
  },
  {
    mark: "C",
    title: "Automation and integration",
    body: "API integration, n8n workflows, LINE OA automation and automated system design.",
  },
];

export default function AboutPage() {
  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
      <aside>
        <div className="f-grid relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-tr-[7rem]">
          <Image
            src="/images/wish-cutout.png"
            alt="Portrait of Wish Nakthong"
            fill
            sizes="320px"
            className="object-contain object-bottom"
            priority
          />
        </div>

        <dl className="mt-6 border-t border-[var(--f-line-strong)]">
          {FACTS.map((fact) => (
            <div
              key={fact.term}
              className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-[var(--f-line)] py-2"
            >
              <dt className="f-mono pt-0.5 text-[0.6875rem] text-[var(--f-dim)]">{fact.term}</dt>
              <dd className="text-[0.9375rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href="/CV_Wish_Nakthong.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="f-sticker mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] transition-transform duration-300 hover:-rotate-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] motion-reduce:transition-none"
          style={{ backgroundColor: "var(--f-accent)" }}
        >
          Open my CV
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
        </a>
      </aside>

      <div>
        <div className="max-w-[68ch] space-y-4 text-[0.9375rem] leading-[1.7] text-[var(--f-dim)] md:text-[1rem]">
          <p>
            I am a third-year Digital Science and Technology student at Mahidol
            University (Faculty of ICT) and a{" "}
            <strong className="font-medium text-[var(--f-cream)]">
              Google Student Ambassador 2026, Batch 1
            </strong>
            . AI, data and automation are what I spend most of my time on.
          </p>
          <p>
            As an{" "}
            <strong className="font-medium text-[var(--f-cream)]">
              AI Agent Builder Intern at Botnoi Group
            </strong>{" "}
            I built automated AI systems and a tourism chatbot called{" "}
            <strong className="font-medium text-[var(--f-cream)]">
              &quot;Local Soul&quot;
            </strong>
            . The work was agentic workflows, multi-agent RAG pipelines and API
            automation.
          </p>
          <p>
            I like hard problems, and I am looking to meet people in tech and
            find my way toward an{" "}
            <strong className="font-medium text-[var(--f-cream)]">AI Engineer</strong> or{" "}
            <strong className="font-medium text-[var(--f-cream)]">
              Solutions Architect
            </strong>{" "}
            role.
          </p>
        </div>

        <h2 className="f-mono mt-10 border-b border-[var(--f-line-strong)] pb-3 text-[0.75rem] text-[var(--f-dim)]">
          What I work on
        </h2>
        <ul>
          {FOCUS.map((item) => (
            <li
              key={item.mark}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-[var(--f-line)] py-4 md:grid-cols-[2.5rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-6"
            >
              <span className="f-display text-[1.5rem] text-[var(--f-accent)]">{item.mark}</span>
              <h3 className="f-display text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[0.95]">{item.title}</h3>
              <p className="col-start-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)] md:col-start-auto">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
