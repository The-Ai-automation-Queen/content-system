import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyMeetingCard, JargonLab } from "@/components/guides/jargon-lab";
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
    title: "AI Jargon Translator: Understand the Terms That Matter",
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
    <main className="article-page jargon-page">
      <article>
        <div className="article-shell article-topbar"><Link href="/guides/">← All guides</Link></div>

        <header className="jargon-hero article-shell">
          <div className="jargon-hero__copy">
            <p className="article-label">{aiJargonGuide.label}</p>
            <h1>{aiJargonGuide.title}</h1>
            <p>{aiJargonGuide.deck}</p>
            <div className="article-meta"><span>Updated {aiJargonGuide.updated}</span><span>No sign-up required</span></div>
            <a className="jargon-hero__action" href="#translator-title">Decode a sentence ↓</a>
          </div>
          <figure className="jargon-hero__cover">
            <Image src={aiJargonGuide.cover} alt={aiJargonGuide.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 52vw" />
          </figure>
        </header>

        <section className="jargon-story article-shell" aria-label="The story behind the guide">
          <div className="jargon-story__success">
            <p className="article-label">{aiJargonGuide.story.success.label}</p>
            <h2>{aiJargonGuide.story.success.title}</h2>
            <p>{aiJargonGuide.story.success.body}</p>
          </div>
          <div className="jargon-story__gap">
            <p className="article-label">{aiJargonGuide.story.gap.label}</p>
            <h2>{aiJargonGuide.story.gap.title}</h2>
            <p>{aiJargonGuide.story.gap.body}</p>
          </div>
        </section>

        <section className="jargon-proof article-shell">
          <p className="article-label">{aiJargonGuide.story.proof.label}</p>
          <h2>{aiJargonGuide.story.proof.title}</h2>
          <p>{aiJargonGuide.story.proof.body}</p>
        </section>

        <section className="jargon-tool-intro article-shell">
          <p className="article-label">Use it now</p>
          <h2 id="translator-title">{aiJargonGuide.translatorTitle}</h2>
          <p>{aiJargonGuide.translatorIntro}</p>
        </section>
        <div className="article-shell"><JargonLab example={aiJargonGuide.translatorExample} /></div>

        <section className="jargon-reframe article-shell">
          <p className="article-label">{aiJargonGuide.story.realProblem.label}</p>
          <h2>{aiJargonGuide.story.realProblem.title}</h2>
          <p>{aiJargonGuide.story.realProblem.body}</p>
        </section>

        <section className="jargon-system article-shell">
          <div className="jargon-system__heading">
            <p className="article-label">{aiJargonGuide.story.system.label}</p>
            <h2>{aiJargonGuide.story.system.title}</h2>
          </div>
          <ol>
            {aiJargonGuide.story.system.steps.map((step, index) => (
              <li key={step.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.name}</h3><p>{step.detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="meeting-card article-shell">
          <div>
            <p className="article-label">Keep beside your notes</p>
            <h2>{aiJargonGuide.meetingCardTitle}</h2>
            <p>{aiJargonGuide.meetingCardIntro}</p>
            <div className="meeting-card__actions">
              <CopyMeetingCard questions={aiJargonGuide.meetingQuestions} />
              <a href="/downloads/ai-jargon-meeting-card.md" download>Download as Markdown</a>
            </div>
          </div>
          <ol>{aiJargonGuide.meetingQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
        </section>

        <section className="jargon-transformation article-shell">
          <p className="article-label">{aiJargonGuide.story.transformation.label}</p>
          <h2>{aiJargonGuide.story.transformation.title}</h2>
          <div className="jargon-transformation__compare">
            <p>{aiJargonGuide.story.transformation.before}</p>
            <p>{aiJargonGuide.story.transformation.after}</p>
          </div>
          <p>{aiJargonGuide.story.transformation.body}</p>
        </section>
      </article>

      <section className="more-guides article-shell">
        <div><p className="article-label">Keep going</p><h2>Build the foundation behind the words.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
      <section className="article-newsletter">
        <div><p className="article-label">{aiJargonGuide.story.openLoop.label}</p><h2>{aiJargonGuide.story.openLoop.title}</h2><p>{aiJargonGuide.story.openLoop.body}</p></div>
        <Link className="article-newsletter__action" href="/quiz.html">Take the free diagnostic →</Link>
      </section>
    </main>
  );
}
