import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GuideMotion } from "@/components/guides/guide-motion";
import { GuideCaptureModal } from "@/components/guides/guide-capture-modal";
import { RelatedGuides } from "@/components/guides/related-guides";
import { StructuredGuideArticle } from "@/components/guides/structured-guide-article";
import { aiJargonGuide } from "@/content/ai-jargon-guide";
import { guides, type Guide } from "@/content/guides";
import { getStructuredGuide, structuredGuides } from "@/content/structured-guides";

export function generateStaticParams() {
  return [
    { slug: aiJargonGuide.slug },
    ...structuredGuides.map((guide) => ({ slug: guide.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const structuredGuide = getStructuredGuide(slug);
  const catalogueGuide = guides.find((guide) => guide.slug === slug);
  if (slug !== aiJargonGuide.slug && !structuredGuide) return {};

  const pageTitle = structuredGuide?.hero.title ?? aiJargonGuide.title;
  const title = structuredGuide?.seo?.title
    ? { absolute: structuredGuide.seo.title }
    : pageTitle;
  const description = structuredGuide?.seo?.description ?? structuredGuide?.hero.promise ?? aiJargonGuide.deck;
  const image = structuredGuide?.hero.illustration.src ?? aiJargonGuide.cover;
  const imageSize = structuredGuide ? { width: 1280, height: 720 } : { width: 1536, height: 1024 };
  const canonical = `/guides/${slug}.html`;

  return {
    title,
    description,
    authors: [{ name: "The AI Automation Queen · Shift & Lead", url: "https://www.shiftandlead.com/about.html" }],
    creator: "The AI Automation Queen · Shift & Lead",
    publisher: "Shift & Lead",
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      type: "article",
      publishedTime: catalogueGuide?.datePublished,
      modifiedTime: catalogueGuide?.dateModified,
      authors: ["The AI Automation Queen · Shift & Lead"],
      images: [{ url: image, ...imageSize }],
    },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structuredGuide = getStructuredGuide(slug);

  if (structuredGuide) {
    const relatedGuides = structuredGuide.relatedGuideSlugs.map((relatedSlug) =>
      guides.find((guide) => guide.slug === relatedSlug),
    );
    if (relatedGuides.some((guide) => !guide)) {
      throw new Error(`Structured guide ${slug} refers to a guide that is not in the live catalogue.`);
    }
    return (
      <StructuredGuideArticle
        guide={structuredGuide}
        relatedGuides={relatedGuides as [Guide, Guide, Guide]}
      />
    );
  }

  if (slug !== aiJargonGuide.slug) notFound();
  const related = guides.filter((item) => ["what-is-ai", "what-is-a-prompt", "what-is-agentic"].includes(item.slug));

  return (
    <main className="article-page simple-guide" data-guide-article>
      <GuideMotion />
      <article>
        <div className="article-shell article-topbar"><a href="/guides/">← All guides</a></div>

        <header className="simple-guide__hero">
          <div className="article-shell simple-guide__hero-inner" data-guide-hero>
            <figure className="simple-guide__cover" data-guide-image>
              <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="100vw" />
            </figure>
            <div className="simple-guide__hero-copy" data-guide-hero-copy>
              <p className="guide-brand-mark">The AI Automation Queen</p>
              <h1>{aiJargonGuide.title}</h1>
              <p className="simple-guide__deck">{aiJargonGuide.deck}</p>
              <div className="simple-guide__hero-action">
                <GuideCaptureModal guideSlug={aiJargonGuide.slug} {...aiJargonGuide.capture} />
              </div>
            </div>
          </div>
        </header>

        <div className="simple-guide__body">
          <section className="simple-guide__terms" aria-label="10 AI words">
            {aiJargonGuide.groups.map((group) => (
              <section className="term-group" key={group.id} data-guide-reveal>
                <header className="term-group__header">
                  <span>{group.number}</span>
                  <div><h2>{group.title}</h2></div>
                  {"image" in group && (
                    <figure data-guide-image>
                      <Image src={group.image} alt={group.imageAlt} fill sizes="(max-width: 760px) 42vw, 180px" />
                    </figure>
                  )}
                </header>
                <div className="term-group__grid">
                  {aiJargonGuide.terms.filter((entry) => entry.group === group.id).map((entry) => (
                    <article className="term-brief" key={entry.term} data-guide-reveal>
                      <div className="term-brief__title">
                        <span>{String(aiJargonGuide.terms.indexOf(entry) + 1).padStart(2, "0")}</span>
                        <div><h3>{entry.term}</h3>{entry.fullName && <p>{entry.fullName}</p>}</div>
                      </div>
                      <p className="term-brief__definition">{entry.definition}</p>
                      <p className="term-brief__example">{entry.example}</p>
                      <p className="term-brief__action">{entry.action}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </section>

        </div>
      </article>

      <section className="simple-guide__ending article-shell" data-guide-reveal>
        <p>You now know the 10 AI words that come up most often. Use the definition you need, then get back to the decision in front of you.</p>
      </section>

      <RelatedGuides guides={related} />
      <p className="article-credit article-shell">Created by The AI Automation Queen · Shift &amp; Lead</p>
    </main>
  );
}
