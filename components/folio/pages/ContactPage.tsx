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
    value: "WISHERCARTs",
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
    <ul className="border-t border-[var(--f-line-strong)]">
      {CONTACTS.map((contact) => {
        const Icon = contact.icon;
        return (
          <li key={contact.label}>
            <a
              href={contact.href}
              {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex min-h-28 items-center gap-5 border-b border-[var(--f-line)] py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)] md:gap-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-[var(--f-accent)] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--f-cream)] text-[var(--f-panel-ink)] transition-colors duration-300 group-hover:bg-[var(--f-accent)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="f-mono hidden w-28 shrink-0 text-[0.75rem] text-[var(--f-dim)] sm:block">
                {contact.label}
              </span>
              <span className="f-display min-w-0 flex-1 break-words text-[clamp(1.75rem,5vw,3.75rem)] normal-case transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 motion-reduce:transform-none motion-reduce:transition-none">
                <span className="sr-only sm:hidden">{contact.label}: </span>
                {contact.value}
              </span>
              <ArrowUpRight
                className="h-7 w-7 shrink-0 text-[var(--f-dim)] transition-colors duration-300 group-hover:text-[var(--f-cream)]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
