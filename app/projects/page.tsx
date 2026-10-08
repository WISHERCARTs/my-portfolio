import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import ProjectsPage from "@/components/sketch/pages/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="projects">
      <ProjectsPage />
    </SketchShell>
  );
}
