import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import ProjectsPage from "@/components/folio/pages/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="projects">
      <ProjectsPage />
    </FolioShell>
  );
}
