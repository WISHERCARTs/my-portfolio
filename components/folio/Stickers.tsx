import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Asterisk, Info, Mail, Plus } from "lucide-react";
import type { FolioEntry } from "@/lib/folio";

const PEEL =
  "shadow-[0_1px_0_rgba(0,0,0,0.22),0_10px_20px_-12px_rgba(0,0,0,0.45)]";

function AboutFace({ color }: { color: string }) {
  return (
    <span
      className={`flex h-[8.5rem] w-[8.5rem] flex-col items-center justify-center rounded-full text-center md:h-[9.5rem] md:w-[9.5rem] ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--f-sticker-ink)] text-[var(--f-cream)]">
        <Info className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span className="mt-1.5 text-[1.375rem] md:text-[1.5rem]">
        About
        <br />
        me
      </span>
      <span className="f-mono mt-1.5 text-[0.5rem] font-medium leading-[1.3] tracking-[0.08em]">
        Student / builder
        <br />
        ambassador
      </span>
    </span>
  );
}

function ProjectsFace({ color, count }: { color: string; count: number }) {
  return (
    <span
      className={`block rounded-[0.7rem] px-5 py-3.5 outline-2 outline-offset-[-7px] outline-[var(--f-cream)] md:px-6 md:py-4 ${PEEL}`}
      style={{ backgroundColor: color, outlineStyle: "solid" }}
    >
      <span className="block text-[1.375rem] md:text-[1.625rem]">
        Selected
        <br />
        proj&mdash;ects
        <span className="ml-1 align-top text-[0.75rem]">
          &copy;{String(count).padStart(2, "0")}
        </span>
      </span>
    </span>
  );
}

function SkillsFace({ color }: { color: string }) {
  return (
    <span
      className={`block rounded-md px-4 py-3 md:px-5 ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <span className="flex items-center gap-2 text-[1.25rem] md:text-[1.5rem]">
        Tech
        <span className="f-mono inline-flex items-center gap-1 rounded-full bg-[var(--f-sticker-ink)] px-2 py-1 text-[0.625rem] tracking-normal text-[var(--f-cream)]">
          &lt;/&gt;
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[1.25rem] md:text-[1.5rem]">
        <Plus
          className="h-5 w-5 rounded-full bg-[var(--f-sticker-ink)] p-0.5 text-[var(--f-cream)]"
          strokeWidth={3}
          aria-hidden="true"
        />
        Stack
      </span>
    </span>
  );
}

function CertificatesFace({ color }: { color: string }) {
  return (
    <span
      className={`block rounded-xl px-5 py-4 ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <span className="block text-[1.25rem] md:text-[1.4375rem]">
        Certifi&mdash;
        <br />
        cates &amp;
        <br />
        <span className="inline-flex items-center gap-1.5">
          <ArrowRight className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
          badges
        </span>
      </span>
    </span>
  );
}

function EducationFace({ color }: { color: string }) {
  return (
    <span
      className={`flex items-start gap-3 rounded-md px-4 py-3.5 md:px-5 ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <span className="block text-[1.25rem] md:text-[1.4375rem]">
        Education
        <br />
        @ Mahidol
        <br />
        <span className="text-[0.875rem]">&copy;&rsquo;24</span>
      </span>
      <Asterisk className="mt-auto h-5 w-5" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

function TimelineFace({ color }: { color: string }) {
  return (
    <span
      className={`block rounded-full px-6 py-3.5 md:px-7 ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <span className="block text-center text-[1.25rem] md:text-[1.4375rem]">
        My time&mdash;line
      </span>
      <span className="f-mono mx-auto mt-1.5 flex w-fit items-center gap-1 rounded-full bg-[var(--f-sticker-ink)] px-2.5 py-1 text-[0.625rem] tracking-normal text-[var(--f-cream)]">
        2019
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
        now
      </span>
    </span>
  );
}

/* Three repeats, stretched by textLength to close the circle exactly. */
const RING_TEXT = "Get in touch • Get in touch • Get in touch • ";

function ContactFace({ color }: { color: string }) {
  return (
    <span
      className={`relative flex h-[8rem] w-[8rem] items-center justify-center rounded-full md:h-[9rem] md:w-[9rem] ${PEEL}`}
      style={{ backgroundColor: color }}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="f-spin absolute inset-0 h-full w-full"
      >
        <defs>
          <path id="contact-ring" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" />
        </defs>
        <text
          className="f-mono"
          fill="currentColor"
          fontSize="7.6"
          fontWeight="700"
          letterSpacing="0.6"
        >
          <textPath href="#contact-ring" textLength="231" lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--f-sticker-ink)]">
        <Mail className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
      </span>
    </span>
  );
}

export function StickerFace({ entry, count }: { entry: FolioEntry; count: number }) {
  switch (entry.slug) {
    case "about":
      return <AboutFace color={entry.color} />;
    case "timeline":
      return <TimelineFace color={entry.color} />;
    case "projects":
      return <ProjectsFace color={entry.color} count={count} />;
    case "skills":
      return <SkillsFace color={entry.color} />;
    case "certificates":
      return <CertificatesFace color={entry.color} />;
    case "education":
      return <EducationFace color={entry.color} />;
    default:
      return <ContactFace color={entry.color} />;
  }
}

export function StickerLink({
  entry,
  rotate,
  children,
}: {
  entry: FolioEntry;
  rotate: number;
  children: ReactNode;
}) {
  return (
    <Link
      href={entry.href}
      aria-label={entry.title}
      className="f-sticker group block focus-visible:outline-none"
    >
      <span
        className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(var(--rot))] group-hover:[transform:rotate(0deg)_scale(1.07)] group-focus-visible:[transform:rotate(0deg)_scale(1.07)] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[var(--f-panel-ink)] motion-reduce:transition-none"
        style={{ "--rot": `${rotate}deg` } as CSSProperties}
      >
        {children}
      </span>
    </Link>
  );
}
