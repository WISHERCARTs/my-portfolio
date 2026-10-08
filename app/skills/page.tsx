import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import SkillsPage from "@/components/sketch/pages/SkillsPage";

export const metadata: Metadata = {
  title: "Skills | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="skills">
      <SkillsPage />
    </SketchShell>
  );
}
