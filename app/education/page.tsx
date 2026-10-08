import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import EducationPage from "@/components/folio/pages/EducationPage";

export const metadata: Metadata = {
  title: "Education | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="education">
      <EducationPage />
    </FolioShell>
  );
}
