import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FolioShell from "@/components/folio/FolioShell";
import CaseStudyPage from "@/components/folio/pages/CaseStudyPage";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudies";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title}, case study | Wish Nakthong`,
    description: study.intro,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <FolioShell
      slug="projects"
      title={study.title}
      intro={study.intro}
      back={{ href: "/projects", label: "Back to projects" }}
    >
      <CaseStudyPage study={study} />
    </FolioShell>
  );
}
