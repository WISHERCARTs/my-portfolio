export type TimelineKind = "study" | "work" | "build" | "cert" | "community";

export const KIND_STYLE: Record<TimelineKind, { label: string; color: string }> = {
  study: { label: "Study", color: "#7FB8FF" },
  work: { label: "Work", color: "#FF4D7D" },
  build: { label: "Build", color: "#FFD93D" },
  cert: { label: "Cert", color: "#FF7A21" },
  community: { label: "Community", color: "#4FD1C5" },
};

export interface TimelineEvent {
  kind: TimelineKind;
  /** Month or range, shown as a small label. Omit when unknown. */
  when?: string;
  title: string;
  body: string;
  href?: string;
  photos?: { src: string; alt: string }[];
  /** A certificate earned from this event, shown as a small preview. */
  cert?: { title: string; href: string };
}

export interface TimelineYear {
  year: string;
  headline: string;
  events: TimelineEvent[];
}

/* Oldest first: the line runs from the top of the page down to now. */
export const TIMELINE: TimelineYear[] = [
  {
    year: "2019",
    headline: "Where it starts",
    events: [
      {
        kind: "study",
        when: "2019 - 2024",
        title: "Sukhondheerawidh School",
        body: "Five years of high school in Nakhon Pathom.",
        href: "/education",
      },
    ],
  },
  {
    year: "2024",
    headline: "Into ICT Mahidol",
    events: [
      {
        kind: "study",
        title: "Finished high school",
        body: "Graduated from Sukhondheerawidh with a GPA of 3.51.",
      },
      {
        kind: "study",
        title: "B.Sc. Digital Science & Technology",
        body: "Started at the Faculty of ICT, Mahidol University, Salaya Campus.",
        href: "/education",
      },
      {
        kind: "cert",
        when: "Jun",
        title: "Digital Awareness",
        body: "Mahidol University course on digital literacy, cybersecurity and privacy.",
        href: "/certificates",
      },
    ],
  },
  {
    year: "2025",
    headline: "Learning the stack",
    events: [
      {
        kind: "cert",
        when: "Aug - Dec",
        title: "Cisco networking",
        body: "Packet Tracer in August, then CCNA: Introduction to Networks and the updated ITN course.",
        href: "/certificates",
      },
      {
        kind: "cert",
        when: "Dec",
        title: "Generative AI, GitHub and Notion",
        body: "Generative AI certificate, plus GitHub for Developer and Notion Database from borntodev.",
        href: "/certificates",
      },
      {
        kind: "build",
        when: "Dec",
        title: "This portfolio and an AI news bot",
        body: "Started this site with its own AI chatbot, and an n8n bot that summarises tech news on its own.",
        href: "/projects",
      },
      {
        kind: "build",
        when: "Dec",
        title: "CD Keys website and R labs",
        body: "A game-key storefront and a set of R data science labs.",
        href: "/projects",
      },
    ],
  },
  {
    year: "2026",
    headline: "Agents, ambassadors and an internship",
    events: [
      {
        kind: "cert",
        when: "Jan",
        title: "Solana Certificate",
        body: "Modern systems and AI integration with Rust, building on Solana.",
        href: "/certificates",
      },
      {
        kind: "build",
        when: "Feb",
        title: "Face recognition, MLP digits, Fuwari Time",
        body: "Two computer vision projects and a time-management app built for ITDS283.",
        href: "/projects",
      },
      {
        kind: "cert",
        when: "Feb",
        title: "Gemini Academy",
        body: "Google for Education and The S Curve training on Gemini and Google AI tools.",
        cert: { title: "Gemini Academy", href: "/Gemini-Academy-GSA.pdf" },
      },
      {
        kind: "cert",
        when: "Mar",
        title: "C++ Essentials 1",
        body: "Cisco Networking Academy course, taken through ICT Mahidol.",
        href: "/certificates",
      },
      {
        kind: "community",
        when: "Apr",
        title: "Google Student Ambassador, Batch 1",
        body: "Graduated from the first GSA batch, one of 1,700 students selected nationwide, and earned the Creator Playground certificate.",
        href: "/certificates",
        cert: {
          title: "Google Student Ambassador Class of 2026",
          href: "/GSA-Certificate-Portfolio.pdf",
        },
        photos: Array.from({ length: 24 }, (_, i) => ({
          src: `/images/timeline/gsa-2026-${String(i + 1).padStart(2, "0")}.jpg`,
          alt: `Google Student Ambassador 2026, Batch 1, photo ${i + 1}`,
        })),
      },
      {
        kind: "work",
        when: "May - Jul",
        title: "AI Agent Builder Intern, Botnoi Group",
        body: "Built chatbot workflows, multi-agent RAG pipelines and the Local Soul tourism chatbot.",
        cert: {
          title: "BOTNOI Trainee 2026 - AI Agent Builder",
          href: "/Certificate_วิชญ์  นาคทอง.pdf",
        },
      },
      {
        kind: "build",
        when: "Jul",
        title: "LINE OA AI Chatbot",
        body: "A Thai LINE Official Account bot on FastAPI and the Gemini API.",
        href: "/projects",
      },
      {
        kind: "work",
        when: "Aug",
        title: "Internship poster session",
        body: "Presented the AI Agent Builder internship work as a poster.",
      },
      {
        kind: "cert",
        when: "Oct",
        title: "Google Cloud Fundamentals",
        body: "Core Infrastructure course from Google Cloud on Coursera.",
        cert: {
          title: "Google Cloud Fundamentals: Core Infrastructure",
          href: "/Coursera-Google-Cloud-Fundamentals.pdf",
        },
      },
    ],
  },
];
