"use client";

const SCHOOLS = [
  {
    years: "2024 - now",
    name: "Mahidol University",
    program: "B.Sc. in Digital Science & Technology (DST major)",
    gpa: "2.76",
    place: "Faculty of Information and Communication Technology, Salaya Campus, Thailand",
  },
  {
    years: "2019 - 2024",
    name: "Sukhondheerawidh School",
    program: "High school",
    gpa: "3.51",
    place: "Nakhon Pathom, Thailand",
  },
];

export default function EducationPage() {
  return (
    <ol className="border-t border-[var(--f-line-strong)]">
      {SCHOOLS.map((school) => (
        <li
          key={school.name}
          className="grid gap-5 border-b border-[var(--f-line)] py-10 md:grid-cols-[11rem_minmax(0,1fr)_9rem] md:gap-10 md:py-14"
        >
          <p className="f-mono pt-2 text-[0.75rem] text-[var(--f-dim)]">{school.years}</p>
          <div>
            <h2 className="f-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">{school.name}</h2>
            <p className="mt-4 text-[1.0625rem]">{school.program}</p>
            <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-[var(--f-dim)]">
              {school.place}
            </p>
          </div>
          <div className="md:text-right">
            <p className="f-mono text-[0.6875rem] text-[var(--f-dim)]">GPA</p>
            <p className="f-display mt-2 text-[3.5rem] text-[var(--f-accent)]">{school.gpa}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
