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

      <section className="guides-cta" aria-labelledby="guides-cta-title">
        <div>
          <p>Continue when you are ready</p>
          <h2 id="guides-cta-title">Choose what would help you next.</h2>
          <span>Keep learning with a free guide, or go deeper with a guided workbook.</span>
        </div>
        <div className="guides-cta__actions">
          <a href="/workbooks.html">Explore the workbooks <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}
