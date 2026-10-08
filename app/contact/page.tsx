import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import ContactPage from "@/components/sketch/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="contact">
      <ContactPage />
    </SketchShell>
  );
}
