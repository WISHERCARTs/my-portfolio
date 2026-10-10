import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const FACTS = [
  { label: "Role", value: "Solo developer: design, frontend, database and deployment" },
  { label: "Built", value: "2026, for the MU Esports club at Mahidol University" },
  { label: "Stack", value: "React 18, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL), Vercel" },
  { label: "Source", value: "Private repository. The live demo is a public bracket page." },
];

const NUMBERS = [
  { value: "24", label: "merged pull requests" },
  { value: "5", label: "tournament formats" },
  { value: "14", label: "SQL migrations" },
  { value: "3,150", label: "lines of SQL" },
  { value: "6,500", label: "lines of TypeScript" },
  { value: "69", label: "commits" },
];

const BUILT: { title: string; body: ReactNode }[] = [
  {
    title: "Organizations and roles",
    body: "Each customer, such as a faculty, gets its own organization with owner, admin and viewer roles. The rules are enforced in the database with Row Level Security, not only in the interface.",
  },
  {
    title: "Five tournament formats",
    body: "Single elimination, double elimination, round robin, Swiss and free-for-all. Admins pick a format and set its options, such as a third-place match, number of Swiss rounds, group size and how many advance.",
  },
  {
    title: "Bracket tools",
    body: "Seeding with automatic byes, a best-of setting per round (BO1, BO3, BO5), match scheduling, event status from not started to finished, swapping teams with the bracket following along, and result corrections that refuse to break later matches.",
  },
  {
    title: "Valorant map pick/ban rooms",
    body: "Rooms for BO1, BO3 and BO5. Each team captain acts from a private link, the server enforces whose turn it is, sides are chosen by the team that did not pick the map, and a broadcast graphic can be downloaded. Rooms appear only for Valorant brackets.",
  },
  {
    title: "Public event pages",
    body: "A short link such as /e/eg-game shows the bracket and pick/ban rooms, updating over Supabase Realtime. Viewers need no account and cannot change anything.",
  },
  {
    title: "Sign-in",
    body: "Members sign in with Google. Event staff can join with an access code instead of an account, and signing back in with the same name returns the same person. Google can be linked to an existing account, passwords can be reset by email, and organizers see who has signed in.",
  },
];

const HIGHLIGHTS: { title: string; body: string }[] = [
  {
    title: "Game logic lives in the database",
    body: "Advancing winners, moving losers into the losers side, byes, Swiss pairing and free-for-all grouping are PL/pgSQL functions. The rules hold no matter which client calls them.",
  },
  {
    title: "Brackets that repair themselves",
    body: "Correcting an early result in double elimination clears every automatic bye that depended on it, then rebuilds them. If a later match that depends on the result has already been played, the change is refused with a clear message.",
  },
  {
    title: "Swiss, one round at a time",
    body: "Swiss and free-for-all draw one round only after every match of the current round is done. Swiss pairs teams with the same record and avoids rematches where possible.",
  },
  {
    title: "Security by default",
    body: "Writes go through SECURITY DEFINER functions that check the caller's role, internal helper functions cannot be called from outside, and public pages read only what Row Level Security lets anonymous visitors see.",
  },
  {
    title: "Real tournaments",
    body: "The schedule for the EG faculty's Valorant and ROV tournaments is set up in the app: 7 teams each, a qualifying round with a bye, a best-of per round, and match times on 7 and 8 November.",
  },
];

const LEARNED = [
  "Designing one data model that serves several tournament formats without breaking existing data.",
  "Writing a multi-tenant backend with Row Level Security and database functions.",
  "Shipping in small pull requests while running migrations on a live production database.",
];

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-[var(--f-line-strong)] py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:py-10">
      <h2 className="f-mono pt-1 text-[0.75rem] text-[var(--f-dim)]">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

function Entries({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-7 lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.title}>
          <h3 className="f-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[0.98]">{item.title}</h3>
          <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function TournamentHubPage() {
  return (
    <article>
      <dl className="grid gap-x-10 gap-y-5 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="f-mono text-[0.6875rem] text-[var(--f-dim)]">{fact.label}</dt>
            <dd className="mt-1.5 text-[0.9375rem] leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <Block label="The problem">
        <p className="max-w-[66ch] text-[1.0625rem] leading-relaxed">
          The club runs university tournaments, such as MU GAME, and events for other faculties that hire it. Brackets
          lived in spreadsheets, map vetoes happened over chat, and every update had to be posted by hand. I wanted one
          place where staff manage everything and players and viewers watch it update live.
        </p>
      </Block>

      <Block label="What I built">
        <p className="mb-7 max-w-[66ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">
          It started as a single-purpose Valorant pick/ban page and grew into a multi-organization platform.
        </p>
        <Entries items={BUILT} />
      </Block>

      <Block label="Technical highlights">
        <Entries items={HIGHLIGHTS} />
      </Block>

      <Block label="By the numbers">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((n) => (
            <li key={n.label}>
              <p className="f-display text-[clamp(2rem,3.5vw,3rem)] leading-none text-[var(--f-accent)]">{n.value}</p>
              <p className="f-mono mt-2 text-[0.6875rem] text-[var(--f-dim)]">{n.label}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="What I learned">
        <ul className="max-w-[66ch] space-y-3 text-[0.9375rem] leading-relaxed">
          {LEARNED.map((line) => (
            <li key={line} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--f-accent)]" />
              {line}
            </li>
          ))}
        </ul>
      </Block>

      <Block label="See it">
        <a
          href="https://tournamenthubth.vercel.app/e/eg-game"
          target="_blank"
          rel="noopener noreferrer"
          className="f-mono inline-flex min-h-11 items-center gap-2 border-b border-[var(--f-cream)] text-[0.8125rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-cream)]"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          Open the public bracket page
        </a>
        <p className="mt-3 max-w-[60ch] text-[0.8125rem] leading-relaxed text-[var(--f-dim)]">
          The organizer app needs a sign-in, and the source code is private.
        </p>
      </Block>
    </article>
  );
}
