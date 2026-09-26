import type { MetadataRoute } from "next";
import status from "../../data/page-status.json";
import { publicGuides } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.shiftandlead.com";
  const active = Object.values(status).filter((entry) => entry.status === "active" && entry.path !== "/guides/");
  return [
    ...active.map((entry) => ({ url: base + entry.path, changeFrequency: "monthly" as const, priority: entry.path === "/" ? 1 : .6 })),
    { url: `${base}/guides/`, changeFrequency: "weekly" as const, priority: .9 },
    ...publicGuides.map((guide) => ({ url: `${base}/guides/${guide.slug}/`, lastModified: new Date(guide.dateModified), changeFrequency: "monthly" as const, priority: .65 })),
  ];
}
