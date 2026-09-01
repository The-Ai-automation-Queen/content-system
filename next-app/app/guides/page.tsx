import type { Metadata } from "next";
import { GuideLibrary } from "@/components/guides/guide-library";
import { publicGuides } from "@/content/guides";

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
  return (
    <main>
      <GuideLibrary guides={publicGuides} />

      <section className="zone-genius-card" data-zone-genius-card="true" aria-labelledby="zone-genius-card-title">
        <p>Private reflection workbook</p>
        <h2 id="zone-genius-card-title">Find Your Zone of Genius</h2>
        <span>Use your own life as evidence. Let AI find the patterns. Leave with a direction you can explain and test.</span>
        <a href="/workbooks/find-your-zone-of-genius.html">Start my private reflection <span aria-hidden="true">→</span></a>
      </section>

      <section className="guides-cta" aria-labelledby="guides-cta-title">
        <div>
          <p>When a guide is not enough</p>
          <h2 id="guides-cta-title">Find the next useful thing to build.</h2>
          <span>Start with the result you want. Then decide what AI should handle and what still needs you.</span>
        </div>
        <div className="guides-cta__actions">
          <a href="/workbooks.html">Explore the workbooks <span aria-hidden="true">→</span></a>
          <a href="/build-sprint.html">Build with me <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}
