import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import ContactPage from "@/components/folio/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="contact">
      <ContactPage />
    </FolioShell>
  );
}
