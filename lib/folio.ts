export interface FolioEntry {
  slug: string;
  index: string;
  label: string;
  /** Giant display title on the section page. */
  title: string;
  intro: string;
  /** Sticker colour for this section. */
  color: string;
  href: string;
}

export const FOLIO_ENTRIES: FolioEntry[] = [
  {
    slug: "about",
    index: "01",
    label: "About",
    title: "About me",
    intro:
      "Third-year Digital Science & Technology student at ICT Mahidol, building systems that read data and answer back.",
    color: "#4FD1C5",
    href: "/about",
  },
  {
    slug: "timeline",
    index: "02",
    label: "Timeline",
    title: "My timeline",
    intro:
      "From high school in 2019 to now, year by year. Tap a year to fold its branches away.",
    color: "#C4A1FF",
    href: "/timeline",
  },
  {
    slug: "projects",
    index: "03",
    label: "Work",
    title: "Projects",
    intro:
      "Chatbots, AI agents, data tools and automations. Some from internships, some from coursework that grew into real builds.",
    color: "#FF4D7D",
    href: "/projects",
  },
  {
    slug: "skills",
    index: "04",
    label: "Skills",
    title: "Tech stack",
    intro:
      "The languages, frameworks and AI tooling I reach for, grouped by what they are for.",
    color: "#FFD93D",
    href: "/skills",
  },
  {
    slug: "certificates",
    index: "05",
    label: "Certificates",
    title: "Certificates",
    intro:
      "The BOTNOI internship, Google Student Ambassador, courses at Mahidol and Cisco networking, grouped by where they came from.",
    color: "#FF7A21",
    href: "/certificates",
  },
  {
    slug: "education",
    index: "06",
    label: "Education",
    title: "Education",
    intro: "Where I studied and what I am studying now.",
    color: "#7FB8FF",
    href: "/education",
  },
  {
    slug: "contact",
    index: "07",
    label: "Contact",
    title: "Get in touch",
    intro:
      "I am looking for an internship. Internship and collaboration messages get answered first, and email is the fastest way to reach me.",
    color: "#9BE564",
    href: "/contact",
  },
];

export function getFolioEntry(slug: string) {
  const position = FOLIO_ENTRIES.findIndex((entry) => entry.slug === slug);
  if (position === -1) return null;
  return {
    entry: FOLIO_ENTRIES[position],
    next: FOLIO_ENTRIES[(position + 1) % FOLIO_ENTRIES.length],
  };
}

/** ease-out-quint */
export const FOLIO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
