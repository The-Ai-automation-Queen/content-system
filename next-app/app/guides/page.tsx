import type { Metadata } from "next";
import { GuideLibrary } from "@/components/guides/guide-library";
import { publicGuides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Practical AI guides for every level",
  description: "Find clear AI guides by experience level, task or tool. Learn the basics, improve your work and build useful systems.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    title: "Practical AI guides for every level · Shift & Lead",
    description: "Start at your level or go directly to the AI task, tool or system you need.",
    url: "/guides/",
    type: "website",
    images: [{ url: "/images/guides/learn-master.webp", width: 1280, height: 720 }],
  },
};

export default function GuidesPage() {
  return (
    <main>
      <GuideLibrary guides={publicGuides} />

      <section className="guides-cta">
        <div>
          <p>Ready to move from reading to building?</p>
          <h2>Choose one task.<br />Build the system around it.</h2>
        </div>
        <a href="/build-sprint.html">See how we can build together <span aria-hidden="true">→</span></a>
      </section>
    </main>
  );
}
