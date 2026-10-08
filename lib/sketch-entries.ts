import type { ElementType } from "react";
import {
  Award,
  Cpu,
  FolderGit2,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";

export interface SketchEntry {
  slug: string;
  index: string;
  label: string;
  subtitle: string;
  note: string;
  icon: ElementType;
  swatch: string;
  href: string;
}

export const SKETCH_ENTRIES: SketchEntry[] = [
  {
    slug: "about",
    index: "01",
    label: "About Me",
    subtitle: "who I am",
    note: "Third-year Digital Science & Technology at ICT Mahidol, working on systems that read data and answer back.",
    icon: User,
    swatch: "#EFCD61",
    href: "/about",
  },
  {
    slug: "projects",
    index: "02",
    label: "Projects",
    subtitle: "what I built",
    note: "The Local Soul tourism chatbot, automated AI agents, and the coursework that grew into real builds.",
    icon: FolderGit2,
    swatch: "#788EFF",
    href: "/projects",
  },
  {
    slug: "skills",
    index: "03",
    label: "Skills",
    subtitle: "what I use",
    note: "Python, TypeScript, the AI agent stack, and the tools I reach for before I stop to think.",
    icon: Cpu,
    swatch: "#FF5960",
    href: "/skills",
  },
  {
    slug: "certificates",
    index: "04",
    label: "Certificates",
    subtitle: "what I earned",
    note: "Google Student Ambassador 2026, BOTNOI Trainee 2026, and the rest of the paper trail.",
    icon: Award,
    swatch: "#FFB0FF",
    href: "/certificates",
  },
  {
    slug: "education",
    index: "05",
    label: "Education",
    subtitle: "where I study",
    note: "B.Sc. in Digital Science & Technology, Faculty of ICT, Mahidol University.",
    icon: GraduationCap,
    swatch: "#FFC060",
    href: "/education",
  },
  {
    slug: "contact",
    index: "06",
    label: "Contact",
    subtitle: "say hi",
    note: "Email, LinkedIn, GitHub. Internship and collaboration messages get answered first.",
    icon: Mail,
    swatch: "#7BE495",
    href: "/contact",
  },
];

export function getSketchEntry(slug: string) {
  const position = SKETCH_ENTRIES.findIndex((entry) => entry.slug === slug);
  if (position === -1) return null;
  return {
    entry: SKETCH_ENTRIES[position],
    prev: SKETCH_ENTRIES[position - 1] ?? null,
    next: SKETCH_ENTRIES[position + 1] ?? null,
  };
}

/** ease-out-quint */
export const SKETCH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
