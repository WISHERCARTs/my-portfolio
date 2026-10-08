import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import TimelinePage from "@/components/folio/pages/TimelinePage";

export const metadata: Metadata = {
  title: "Timeline | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="timeline">
      <TimelinePage />
    </FolioShell>
  );
}
