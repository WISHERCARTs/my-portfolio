import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import AboutPage from "@/components/sketch/pages/AboutPage";

export const metadata: Metadata = {
  title: "About | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="about">
      <AboutPage />
    </SketchShell>
  );
}
