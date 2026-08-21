import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideMotion } from "@/components/guides/guide-motion";
import { GuideCaptureModal } from "@/components/guides/guide-capture-modal";
import { GuideCard } from "@/components/guides/guide-card";
import { aiJargonGuide } from "@/content/ai-jargon-guide";
import { guides } from "@/content/guides";

export function generateStaticParams() {
  return [{ slug: aiJargonGuide.slug }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== aiJargonGuide.slug) return {};
  const canonical = `/guides/${aiJargonGuide.slug}.html`;
  return {
    title: aiJargonGuide.title,
    description: aiJargonGuide.deck,
    alternates: { canonical },
    openGraph: {
      title: aiJargonGuide.title,
      description: aiJargonGuide.deck,
      url: canonical,
      type: "article",
      images: [{ url: aiJargonGuide.cover, width: 1536, height: 1024 }],
    },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== aiJargonGuide.slug) notFound();
  const related = guides.filter((item) => ["what-is-ai", "what-is-a-prompt", "what-is-agentic"].includes(item.slug));

  return (
    <main className="article-page simple-guide" data-guide-article>
      <GuideMotion />
      <article>
        <div className="article-shell article-topbar"><Link href="/guides/">← All guides</Link></div>

        <header className="simple-guide__hero">
          <div className="article-shell simple-guide__hero-inner" data-guide-hero>
            <figure className="simple-guide__cover" data-guide-image>
              <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="100vw" />
            </figure>
            <div className="simple-guide__hero-copy">
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

      <section className="more-guides article-shell">
        <div><h2>Choose what to learn next.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
    </main>
  );
}
