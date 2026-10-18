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
        kind: "community",
        when: "May",
        title: "Technical Facilitator, Google Cloud AI Live + Labs Bangkok",
        body: "Helped more than 160 attendees through the hands-on labs: building a multi-agent system with the Agent Development Kit, deploying it to Agent Runtime and setting up the A2A protocol.",
        photos: [
          { src: "/images/timeline/ai-live-labs-01.jpg", alt: "The Google Cloud AI Live + Labs Bangkok photo wall" },
          { src: "/images/timeline/ai-live-labs-02.jpg", alt: "Google Student Ambassadors at Google Cloud AI Live + Labs Bangkok" },
          { src: "/images/timeline/ai-live-labs-03.jpg", alt: "Helping attendees during the hands-on labs at Google Cloud AI Live + Labs Bangkok" },
        ],
      },
      {
        kind: "work",
        when: "May - Jul",
        title: "AI Agent Builder Intern, Botnoi Group",
        body: "Built the frontend of a travel app for hidden places in Japan with Supabase Auth, maps and notifications, then connected Botnoi's real-time voice avatar to a Next.js trip planner so the agent can fill in forms and navigate.",
        cert: {
          title: "BOTNOI Trainee 2026 - AI Agent Builder",
          href: "/Certificate_วิชญ์  นาคทอง.pdf",
        },
      },
      {
        kind: "build",
        when: "Jun",
        title: "Local Soul chatbot",
        body: "For our internship team's AI travel companion, built a RAG chatbot: vector search over places, Typhoon writes the recommendations, Botnoi's widget on the page.",
        href: "/projects",
      },
      {
        kind: "build",
        when: "Jul",
        title: "LINE OA AI Chatbot",
        body: "A Thai LINE Official Account bot on FastAPI and the Gemini API. In October I added tests, a Docker image and CI, and deployed it to Google Cloud Run.",
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
        when: "Sep",
        title: "AWS Academy Cloud Foundations",
        body: "The 20-hour AWS Academy course on core cloud concepts, with the training badge issued through Credly.",
        href: "/certificates",
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
      {
        kind: "build",
        when: "Oct",
        title: "Thai RAG with evaluation",
        body: "Question answering over Thai Wikipedia that compares keyword, embedding and hybrid search on 80 questions and checks the answers cite their sources.",
        href: "/projects",
      },
      {
        kind: "build",
        when: "Oct",
        title: "Honorable Mention, MUICT x The Mall Group Hackathon 2026",
        body: "With Team Superstang I built SmartSeat AI, which reads a mall's existing CCTV to show free food court tables and queue lengths in real time, counting people without face recognition. We pitched it to The Mall Group's judges in the Grand Auditorium on 14 October.",
        photos: [
          { src: "/images/timeline/hackathon-2026-01.jpg", alt: "Team Superstang receiving the Honorable Mention on stage at the MUICT x The Mall Group Hackathon 2026" },
          { src: "/images/timeline/hackathon-2026-02.jpg", alt: "Team Superstang pitching SmartSeat AI on stage" },
          { src: "/images/timeline/hackathon-2026-03.jpg", alt: "Team Superstang holding the Honorable Mention board" },
          { src: "/images/timeline/hackathon-2026-04.jpg", alt: "Judges from ICT Mahidol and The Mall Group at the judging table, with the students behind them" },
          { src: "/images/timeline/hackathon-2026-05.jpg", alt: "All the award-winning teams and judges at the MUICT x The Mall Group Hackathon 2026" },
        ],
      },
    ],
  },
];
