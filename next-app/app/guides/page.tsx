import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideLibrary } from "@/components/guides/guide-library";
import { guides, trackDetails, type GuideTrack } from "@/content/guides";

export const metadata: Metadata = {
  title: "Free AI guides for business owners",
  description: "Free, practical guides for understanding AI, choosing the right tools, and deciding what AI can do alone or still needs a person.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    title: "Free AI guides for business owners · Shift & Lead",
    description: "Understand AI clearly, choose what matters, and build useful systems step by step.",
    url: "/guides/",
    type: "website",
    images: [{ url: "/images/guides/learn-master.png", width: 1680, height: 945 }],
  },
};

const paths: Array<{ track: GuideTrack; number: string; action: string }> = [
  { track: "understand", number: "01", action: "Start with the basics" },
  { track: "setup", number: "02", action: "Build something useful" },
  { track: "tools", number: "03", action: "Choose your tools" },
];

export default function GuidesPage() {
  const featured = guides.find((guide) => guide.slug === "what-is-agentic") ?? guides[0];

  return (
    <main>
      <section className="guides-hero">
        <div className="guides-hero__copy">
          <p className="eyebrow">The free library</p>
          <h1>Understand AI.<br /><em>Then use it well.</em></h1>
          <p>Visual, practical guides for making clearer decisions and building with AI step by step.</p>
          <a className="text-link" href="#library">Explore all guides <span aria-hidden="true">↓</span></a>
        </div>
        <div className="guides-hero__feature">
          <GuideCard guide={featured} featured />
        </div>
      </section>

      <section className="pathways" aria-labelledby="pathways-title">
        <h2 id="pathways-title">Choose where you are now.</h2>
        <div className="pathways__grid">
          {paths.map(({ track, number, action }) => (
            <Link href={`#library`} className={`pathway pathway--${track}`} key={track}>
              <span>{number}</span>
              <h3>{trackDetails[track].label}</h3>
              <p>{trackDetails[track].description}</p>
              <b>{action} →</b>
            </Link>
          ))}
        </div>
      </section>

      <GuideLibrary guides={guides} />

      <section className="guides-cta">
        <div>
          <p>Ready to move from reading to building?</p>
          <h2>Choose one task.<br />Build the system around it.</h2>
        </div>
        <Link href="/build-sprint.html">See how we can build together <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
