import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import AboutPage from "@/components/folio/pages/AboutPage";

export const metadata: Metadata = {
  title: "About | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="about">
      <AboutPage />
    </FolioShell>
  );
}
