import type { Metadata } from "next";
import FolioShell from "@/components/folio/FolioShell";
import CertificatesPage from "@/components/folio/pages/CertificatesPage";

export const metadata: Metadata = {
  title: "Certificates | Wish Nakthong",
};

export default function Page() {
  return (
    <FolioShell slug="certificates">
      <CertificatesPage />
    </FolioShell>
  );
}
