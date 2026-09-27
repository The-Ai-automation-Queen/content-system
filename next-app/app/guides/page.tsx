import type { Metadata } from "next";
import { GuideLibrary } from "@/components/guides/guide-library";
import { publicGuides, reviewGuides } from "@/content/guides";
import { guidePages, type GuidePage } from "@/content/guide-page";

function readingText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(readingText).join(" ");
  if (value && typeof value === "object") return Object.values(value).map(readingText).join(" ");
  return "";
}

export const metadata: Metadata = {
  title: "Free AI guides for real work",
  description: "Choose the right AI tool, use it safely and get one useful piece of work done without losing your judgment.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    title: "Free AI guides for real work · Shift & Lead",
    description: "Pick the task. Find the right guide. Keep the decisions that still need you.",
    url: "/guides/",
    type: "website",
    images: [{ url: "/images/guides/learn-master.webp", width: 1280, height: 720 }],
  },
};

export default function GuidesPage() {
  const previewGuides = process.env.NODE_ENV === "development" ? reviewGuides : undefined;
  const searchIndex = Object.fromEntries((previewGuides ?? publicGuides).map((guide) => {
    const page = guidePages.find((item) => item.slug === guide.slug) as GuidePage | undefined;
    return [guide.slug, page ? readingText({ answer: page.answer, sections: page.sections, tutorial: page.tutorial, tryNow: page.tryNow, series: page.series, conclusion: page.conclusion }) : ""];
  }));
  return (
    <main>
      <GuideLibrary guides={publicGuides} previewGuides={previewGuides} searchIndex={searchIndex} />

    </main>
  );
}
