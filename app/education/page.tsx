import type { Metadata } from "next";
import SketchShell from "@/components/sketch/SketchShell";
import EducationPage from "@/components/sketch/pages/EducationPage";

export const metadata: Metadata = {
  title: "Education | Wish Nakthong",
};

export default function Page() {
  return (
    <SketchShell slug="education">
      <EducationPage />
    </SketchShell>
  );
}
