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
  const reviewMode = process.env.NODE_ENV === "development";
  const listedGuides = reviewMode ? reviewGuides : publicGuides;
  const searchIndex = Object.fromEntries(listedGuides.map((guide) => {
    const page = guidePages.find((item) => item.slug === guide.slug) as GuidePage | undefined;
    return [guide.slug, page ? readingText({ answer: page.answer, sections: page.sections, tutorial: page.tutorial, tryNow: page.tryNow, series: page.series, conclusion: page.conclusion }) : ""];
  }));
  return (
    <main>
      <GuideLibrary guides={listedGuides} searchIndex={searchIndex} reviewMode={reviewMode} />

      <section className="guides-cta" aria-labelledby="guides-cta-title">
        <div>
          <p>From understanding to decision</p>
          <h2 id="guides-cta-title">Know enough to ask the next question?</h2>
          <span>Use Where AI Fits to decide where AI belongs in your business, what should remain human and what to test first.</span>
        </div>
        <div className="guides-cta__actions">
          <a href="/ai-opportunity-map.html">Explore Where AI Fits <span aria-hidden="true">→</span></a>
          <a href="/workbooks.html">Looking for a personal starting point? <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}
