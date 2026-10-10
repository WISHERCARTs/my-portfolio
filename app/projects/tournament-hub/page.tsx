import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import TournamentHubPage from "@/components/folio/pages/TournamentHubPage";

export const metadata: Metadata = {
  title: "Tournament Hub | Wish Nakthong",
  description:
    "A tournament platform for the MU Esports club: five bracket formats, Valorant map pick/ban rooms and live public pages, built on React and Supabase.",
};

export default function Page() {
  return (
    <FolioShell
      slug="projects"
      title="Tournament Hub"
      intro="A tournament platform for the MU Esports club at Mahidol University. Organizers build brackets in five formats and run live Valorant map pick/ban, and anyone can follow results on a public link with no account."
      back={{ href: "/projects", label: "All projects" }}
    >
      <TournamentHubPage />
    </FolioShell>
  );
}
