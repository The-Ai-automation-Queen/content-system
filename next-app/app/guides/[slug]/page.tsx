import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyGuideNotes } from "@/components/guides/copy-guide-notes";
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
            <h1>{aiJargonGuide.title}</h1>
            <p className="simple-guide__deck">{aiJargonGuide.deck}</p>
          </div>
        </header>

        <figure className="article-shell simple-guide__cover" data-guide-image>
          <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 1240px" />
        </figure>

        <div className="simple-guide__body">
          <section className="simple-guide__opening" data-guide-reveal>
            <p>{aiJargonGuide.intro}</p>
          </section>

          <section className="simple-guide__terms" aria-label="10 AI words">
            {aiJargonGuide.terms.map((entry, index) => (
              <div className={index === 4 || index === 6 ? "simple-guide__term-row simple-guide__term-row--illustrated" : "simple-guide__term-row"} key={entry.term}>
                <article className="simple-term" data-guide-reveal>
                  <div className="simple-term__heading">
                    <span>Term {index + 1}</span>
                    <div><h2>{entry.term}</h2>{entry.fullName && <p>{entry.fullName}</p>}</div>
                  </div>
                  <p className="simple-term__meaning">{entry.meaning}</p>
                  <div className="simple-term__picture"><strong>Picture it</strong><p>{entry.example}</p></div>
                  <div className="simple-term__why"><strong>Why it matters</strong><p>{entry.why}</p></div>
                </article>

                {index === 4 && (
                  <figure className="simple-guide__illustration simple-guide__illustration--learning" data-guide-image data-guide-reveal>
                    <Image src="/images/guides/ai-words-learning.webp" alt="The Blue Princess sorting small idea tiles at a library desk" fill sizes="(max-width: 760px) 100vw, 860px" />
                  </figure>
                )}
                {index === 6 && (
                  <figure className="simple-guide__illustration simple-guide__illustration--connections" data-guide-image data-guide-reveal>
                    <Image src="/images/guides/ai-words-connections.webp" alt="The Blue Princess inspecting connections between books, a chat and a toolbox" fill sizes="(max-width: 760px) 100vw, 860px" />
                  </figure>
                )}
              </div>
            ))}
          </section>

          <section className="simple-guide__bonus" data-guide-reveal>
            <p className="article-label">Keep going</p>
            <h2>{aiJargonGuide.bonusTitle}</h2>
            <div>
              {aiJargonGuide.bonus.map((item) => <article key={item.term}><h3>{item.term}</h3><p>{item.meaning}</p></article>)}
            </div>
          </section>

          <section className="simple-guide__save" data-guide-reveal>
            <div><p className="article-label">Use it when you need it</p><h2>Do not let an AI term derail the conversation</h2><p>Email yourself the 10-word reference. Check a definition in seconds when a tool, proposal or meeting uses language you do not know.</p></div>
            <div className="simple-guide__actions">
              <GuideCaptureModal guideSlug={aiJargonGuide.slug} {...aiJargonGuide.capture} />
              <CopyGuideNotes items={aiJargonGuide.terms} />
            </div>
          </section>

          <section className="simple-guide__ending" data-guide-reveal><p>{aiJargonGuide.ending}</p></section>
        </div>
      </article>

      <section className="more-guides article-shell">
        <div><p className="article-label">Read next</p><h2>Learn what AI can do next.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
    </main>
  );
}
