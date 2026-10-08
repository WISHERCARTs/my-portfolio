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
    <ol className="border-t border-[var(--sk-line-strong)]">
      {SCHOOLS.map((school) => (
        <li
          key={school.name}
          className="grid gap-4 border-b border-[var(--sk-line)] py-8 md:grid-cols-[12rem_minmax(0,1fr)_8rem] md:gap-10 md:py-10"
        >
          <p className="sk-pixel text-[1.375rem] leading-none text-[var(--sk-muted)]">
            {school.years}
          </p>
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-normal leading-tight">
              {school.name}
            </h2>
            <p className="mt-2 text-[1.0625rem] font-light">{school.program}</p>
            <p className="mt-2 max-w-[52ch] text-[0.9375rem] font-light leading-relaxed text-[var(--sk-muted)]">
              {school.place}
            </p>
          </div>
          <div className="md:text-right">
            <p className="sk-pixel text-[1.0625rem] leading-none text-[var(--sk-muted)]">
              gpa
            </p>
            <p className="sk-pixel mt-1 text-[2.25rem] leading-none">{school.gpa}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
