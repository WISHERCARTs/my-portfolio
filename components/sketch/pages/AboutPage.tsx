"use client";

import Image from "next/image";
import { FileText } from "lucide-react";

const FOCUS = [
  {
    mark: "a",
    title: "AI and chatbots",
    body: "RAG systems, multi-agent architecture, agentic design, prompt engineering and speech AI.",
  },
  {
    mark: "b",
    title: "Full stack and database",
    body: "Next.js, React, Node.js, Express.js, TypeScript, Python, SQL and REST API design.",
  },
  {
    mark: "c",
    title: "Automation and integration",
    body: "API integration, n8n workflows, LINE OA automation and automated system design.",
  },
];

export default function AboutPage() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
      {/* Portrait + facts */}
      <aside>
        <div className="relative aspect-square w-full max-w-[17rem] border-2 border-[var(--sk-ink)] bg-[var(--sk-surface)]">
          <Image
            src="/avatar.jpg"
            alt="Wish Nakthong"
            fill
            sizes="272px"
            className="object-cover"
            priority
          />
        </div>

        <dl className="sk-pixel mt-6 space-y-2 text-[1.125rem] leading-tight">
          <div>
            <dt className="text-[var(--sk-muted)]">now</dt>
            <dd>3rd-year DST, ICT Mahidol</dd>
          </div>
          <div>
            <dt className="text-[var(--sk-muted)]">before</dt>
            <dd>AI Agent Builder Intern, Botnoi Group</dd>
          </div>
          <div>
            <dt className="text-[var(--sk-muted)]">also</dt>
            <dd>Google Student Ambassador 2026, Batch 1</dd>
          </div>
        </dl>

        <a
          href="/CV_Wish_Nakthong.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex min-h-11 items-center gap-2.5 border-2 border-[var(--sk-ink)] px-4 text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
        >
          <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          <span className="sk-pixel text-[1.125rem] leading-none">open my CV</span>
        </a>
      </aside>

      {/* Story */}
      <div>
        <div className="max-w-[62ch] space-y-6 text-[1.0625rem] font-light leading-[1.75]">
          <p>
            I am a third-year Digital Science and Technology student at Mahidol
            University (Faculty of ICT) and a{" "}
            <strong className="font-medium">
              Google Student Ambassador 2026, Batch 1
            </strong>
            . AI, data and automation are what I spend most of my time on.
          </p>
          <p>
            As an{" "}
            <strong className="font-medium">
              AI Agent Builder Intern at Botnoi Group
            </strong>{" "}
            I built automated AI systems and a tourism chatbot called{" "}
            <strong className="font-medium">&quot;Local Soul&quot;</strong>. The
            work was agentic workflows, multi-agent RAG pipelines and API
            automation.
          </p>
          <p>
            I like hard problems, and I am looking to meet people in tech and
            find my way toward an{" "}
            <strong className="font-medium">AI Engineer</strong> or{" "}
            <strong className="font-medium">Solutions Architect</strong> role.
          </p>
        </div>

        <h2 className="sk-pixel mt-14 border-b border-[var(--sk-line-strong)] pb-3 text-[1.125rem] leading-none text-[var(--sk-muted)]">
          what I work on
        </h2>
        <ul>
          {FOCUS.map((item) => (
            <li
              key={item.mark}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-[var(--sk-line)] py-6 md:grid-cols-[3rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-8"
            >
              <span className="sk-pixel text-[1.5rem] leading-none text-[var(--sk-muted)]">
                {item.mark}
              </span>
              <h3 className="text-[1.25rem] font-normal leading-snug">{item.title}</h3>
              <p className="col-start-2 max-w-[48ch] text-[0.9375rem] font-light leading-relaxed text-[var(--sk-muted)] md:col-start-auto">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
