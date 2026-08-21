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
            <div className="simple-guide__hero-copy">
              <h1>{aiJargonGuide.title}</h1>
              <p className="simple-guide__deck">{aiJargonGuide.deck}</p>
              <div className="simple-guide__hero-action">
                <GuideCaptureModal guideSlug={aiJargonGuide.slug} {...aiJargonGuide.capture} />
                <p>Get the reference in your inbox.</p>
              </div>
            </div>
            <figure className="simple-guide__cover" data-guide-image>
              <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 520px" />
            </figure>
          </div>
        </header>

        <div className="simple-guide__body">
          <section className="simple-guide__opening" data-guide-reveal>
            <p>{aiJargonGuide.intro}</p>
          </section>

          <section className="simple-guide__terms" aria-label="10 AI words">
            {aiJargonGuide.groups.map((group) => (
              <section className="term-group" key={group.id} data-guide-reveal>
                <header className="term-group__header">
                  <span>{group.number}</span>
                  <div><h2>{group.title}</h2><p>{group.description}</p></div>
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
                      <p className="term-brief__conversation">{entry.inConversation}</p>
                      {entry.caution && <p className="term-brief__caution"><strong>Watch:</strong> {entry.caution}</p>}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className="simple-guide__bonus" data-guide-reveal>
            <p className="article-label">You may hear these next</p>
            <h2>{aiJargonGuide.bonusTitle}</h2>
            <div>
              {aiJargonGuide.bonus.map((item) => <article key={item.term}><div><h3>{item.term}</h3>{"fullName" in item && <span>{item.fullName}</span>}</div><p>{item.meaning}</p></article>)}
            </div>
          </section>

          <section className="simple-guide__closing" data-guide-reveal>
            <p className="article-label">When a new term appears</p>
            <h2>{aiJargonGuide.closingTitle}</h2>
            <p>{aiJargonGuide.closingIntro}</p>
            <ol>{aiJargonGuide.closingQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
          </section>
        </div>
      </article>

      <section className="more-guides article-shell">
        <div><p className="article-label">Read next</p><h2>Learn what AI can do next.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
    </main>
  );
}
