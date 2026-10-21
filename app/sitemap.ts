import type { MetadataRoute } from "next";
import { FOLIO_ENTRIES } from "@/lib/folio";

const SITE = "https://my-portfolio-wish.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    ...FOLIO_ENTRIES.map((entry) => ({
      url: `${SITE}${entry.href}`,
      priority: 0.7,
    })),
  ];
}
