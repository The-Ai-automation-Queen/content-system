import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyQuestions } from "@/components/guides/copy-questions";
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
    title: "12 AI Terms Explained Clearly",
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
    <main className="article-page simple-guide">
      <article>
        <div className="article-shell article-topbar"><Link href="/guides/">← All guides</Link></div>

        <header className="simple-guide__hero">
          <div className="article-shell simple-guide__hero-inner">
            <h1>{aiJargonGuide.title}</h1>
            <p className="simple-guide__deck">{aiJargonGuide.deck}</p>
          </div>
        </header>

        <figure className="article-shell simple-guide__cover">
          <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 1240px" />
        </figure>

        <div className="simple-guide__body">
          <section className="simple-guide__opening">
            {aiJargonGuide.opening.map((paragraph, index) => <p className={index === 0 ? "simple-guide__scene" : undefined} key={paragraph}>{paragraph}</p>)}
            <blockquote>{aiJargonGuide.promise}</blockquote>
          </section>

          {aiJargonGuide.sections.map((section, sectionIndex) => {
            let runningIndex = aiJargonGuide.sections.slice(0, sectionIndex).reduce((total, item) => total + item.terms.length, 0);
            return (
              <section className="simple-guide__section" key={section.title}>
                <p className="article-label">{section.label}</p>
                <h2>{section.title}</h2>
                <p className="simple-guide__section-intro">{section.intro}</p>
                <div className="simple-guide__terms">
                  {section.terms.map((entry) => {
                    runningIndex += 1;
                    return (
                      <article className="simple-term" key={entry.term}>
                        <div className="simple-term__heading"><span>{String(runningIndex).padStart(2, "0")}</span><h3>{entry.term}</h3></div>
                        <p>{entry.plain}</p>
                        <div className="simple-term__picture"><strong>Picture it</strong><p>{entry.picture}</p></div>
                        <p className="simple-term__question"><strong>Ask:</strong> {entry.ask}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className="simple-guide__translation">
            <p className="article-label">Put it together</p>
            <h2>1 sentence. No fog.</h2>
            <blockquote>“{aiJargonGuide.example.quote}”</blockquote>
            <div><strong>What it means</strong><p>{aiJargonGuide.example.translation}</p></div>
            <div><strong>What matters next</strong><p>{aiJargonGuide.example.decision}</p></div>
          </section>

          <section className="simple-guide__questions">
            <div>
              <p className="article-label">Keep these nearby</p>
              <h2>{aiJargonGuide.questionsTitle}</h2>
              <p>{aiJargonGuide.questionsIntro}</p>
            </div>
            <ol>{aiJargonGuide.questions.map((question) => <li key={question}>{question}</li>)}</ol>
            <div className="simple-guide__actions">
              <CopyQuestions questions={aiJargonGuide.questions} />
              <a href="/downloads/five-questions-for-ai-meetings.md" download>Download the 5 questions</a>
            </div>
          </section>

          <section className="simple-guide__ending">
            <p>{aiJargonGuide.ending}</p>
          </section>
        </div>
      </article>

      <section className="more-guides article-shell">
        <div><p className="article-label">Read next</p><h2>Build on what you now understand.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
    </main>
  );
}
