import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import CertificatesPage from "@/components/sketch/pages/CertificatesPage";

export const metadata: Metadata = {
  title: "Certificates | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="certificates">
      <CertificatesPage />
    </SketchShell>
  );
}
