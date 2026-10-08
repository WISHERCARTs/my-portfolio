import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import SkillsPage from "@/components/folio/pages/SkillsPage";

export const metadata: Metadata = {
  title: "Skills | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="skills">
      <SkillsPage />
    </FolioShell>
  );
}
