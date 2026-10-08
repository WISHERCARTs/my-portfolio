"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Instagram, Linkedin, Youtube } from "@/components/BrandIcons";

const CONTACTS = [
  {
    label: "Email",
    value: "wishercarts@gmail.com",
    href: "mailto:wishercarts@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Wish Nakthong",
    href: "https://www.linkedin.com/in/wish-nakthong/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/WISHERCARTs",
    href: "https://github.com/WISHERCARTs",
    icon: Github,
    external: true,
  },
  {
    label: "Instagram",
    value: "@wishercarts",
    href: "https://www.instagram.com/wishercarts/",
    icon: Instagram,
    external: true,
  },
  {
    label: "YouTube",
    value: "@wishercarts",
    href: "https://www.youtube.com/@wishercarts",
    icon: Youtube,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div>
      <p className="max-w-[52ch] text-[1.0625rem] font-light leading-relaxed">
        I am looking for an internship. Internship and collaboration messages
        get answered first, and email is the fastest way to reach me.
      </p>

      <ul className="mt-10 border-t border-[var(--sk-line-strong)]">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;
          return (
            <li key={contact.label}>
              <a
                href={contact.href}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative flex min-h-24 items-center gap-5 border-b border-[var(--sk-line)] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sk-accent-ink)] md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--sk-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
                <Icon
                  className="h-6 w-6 shrink-0 text-[var(--sk-muted)]"
                  aria-hidden="true"
                />
                <span className="sk-pixel w-24 shrink-0 text-[1.375rem] leading-none text-[var(--sk-muted)] md:w-36">
                  {contact.label}
                </span>
                <span className="min-w-0 flex-1 break-words text-[clamp(1.125rem,3vw,1.875rem)] font-normal leading-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 motion-reduce:transform-none motion-reduce:transition-none">
                  {contact.value}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 shrink-0 text-[var(--sk-muted)] transition-colors duration-300 group-hover:text-[var(--sk-accent-ink)]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
