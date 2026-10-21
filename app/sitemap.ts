import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { FOLIO_ENTRIES } from "@/lib/folio";

const SITE = "https://my-portfolio-wish.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    ...FOLIO_ENTRIES.map((entry) => ({
      url: `${SITE}${entry.href}`,
      priority: 0.7,
    })),
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE}/projects/${study.slug}`,
      priority: 0.6,
    })),
  ];
}
