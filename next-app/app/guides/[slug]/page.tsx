import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guides/guide-card";
import { JargonTerm } from "@/components/guides/jargon-term";
import { guides } from "@/content/guides";

const firstTerms = [
  ["Token", "A chunk of text, roughly three quarters of a word. It is how the tools count what you send and receive.", "It is how you are billed. Longer conversations cost more."],
  ["Context window", "Everything it can hold in mind at once: your instructions, the conversation and the files.", "When a long session goes strange, this is usually why."],
  ["RAG", "It looks something up in your documents before answering, rather than answering from memory.", "It is the standard way to make a tool that knows about your business."],
  ["Fine-tuning", "Extra training to make a model better at one narrow thing.", "It is expensive and often unnecessary. A good brief solves much of what people fine-tune for."],
  ["Agent", "Software that takes multi-step actions towards a goal rather than answering once.", "It can be useful, and it is the word most likely to be stretched in a sales pitch."],
  ["MCP", "An agreed standard for connecting AI tools to other software and data.", "It is one reason connecting tools is getting easier and cheaper."],
] as const;

const secondTerms = [
  ["Hallucination", "It stated something false as though it were fact.", "This is the most important failure to know about. It does not warn you."],
  ["Prompt", "What you type. The brief.", "The difference between a useless answer and a good one is usually here."],
  ["System prompt", "Standing instructions set by the builder, which you do not see, shaping how the tool behaves.", "It explains why the same model behaves differently in two products."],
  ["Multimodal", "It handles more than text: images, audio and sometimes video.", "You can photograph a document instead of typing it out."],
  ["Open weights", "The model file is published, so you can download and run it on your own hardware.", "It can be the answer when data cannot leave your building."],
  ["Guardrails", "Rules and checks meant to stop the tool doing something unsafe or off-limits.", "Ask what they are before putting anything customer-facing on it."],
] as const;

export function generateStaticParams() {
  return [{ slug: "ai-jargon-guide" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "ai-jargon-guide") return {};
  const canonical = "/guides/ai-jargon-guide.html";
  const description = "Twelve AI terms decoded in plain English, so you can stop nodding through meetings and start asking useful questions.";
  return {
    title: "AI Jargon Decoded: Twelve Words in Plain English",
    description,
    alternates: { canonical },
    openGraph: { title: "The AI words they keep using", description, url: canonical, type: "article", images: [{ url: "/images/guides/learn-master.png", width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", images: ["/images/guides/learn-master.png"] },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "ai-jargon-guide") notFound();
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const related = guides.filter((item) => ["what-is-ai", "what-is-a-prompt", "what-is-agentic"].includes(item.slug));

  return (
    <main className="article-page">
      <article>
        <div className="article-shell article-topbar"><Link href="/guides/">← All guides</Link></div>
        <figure className="article-cover article-shell">
          <Image src={guide.cover} alt="The Blue Princess navigating a machine of confusing AI language" fill priority sizes="(max-width: 1320px) 100vw, 1240px" />
        </figure>

        <header className="article-header article-shell">
          <aside className="author-rail">
            <Image src="/closeUp.jpeg" alt="Fatiha Chikh" width={76} height={76} />
            <p>By <strong>Fatiha Chikh</strong></p>
            <span>Making AI useful, understandable and governable for the people expected to lead with it.</span>
          </aside>
          <div className="article-intro">
            <p className="article-label">Learn · Free guide</p>
            <h1>The AI words they keep using</h1>
            <p className="article-deck">Most AI jargon is one ordinary idea wearing a lab coat. Here it is, in plain English.</p>
            <div className="article-meta">
              <span>Updated 28 July 2026</span><span>{guide.readMinutes} minute read</span>
            </div>
            <div className="mobile-author"><Image src="/closeUp.jpeg" alt="Fatiha Chikh" width={48} height={48} /><span>Written by <strong>Fatiha Chikh</strong></span></div>
            <section className="article-summary" aria-label="Guide summary">
              <div><span>Best for</span><p>Sitting in a meeting and knowing exactly what is being said.</p></div>
              <div><span>Careful with</span><p>Nodding. That is how you end up on the wrong project.</p></div>
              <div><span>What I would do</span><p>Keep this open for a fortnight. After that, you will not need it.</p></div>
            </section>
          </div>
        </header>

        <div className="article-body">
          <h2>The sentence this started with</h2>
          <p>Somebody said this to me, in a real meeting, with a straight face:</p>
          <blockquote>“We’re running a RAG pipeline with a fine-tuned model, but the context window is limiting the agent, so we’re looking at MCP to cut the token spend.”</blockquote>
          <p>Everyone around the table nodded. I would guess two of them followed it. That sentence contains six pieces of jargon and one actual idea. The actual idea is roughly: <strong>our thing is expensive and does not remember enough.</strong></p>
          <p>Here is every word in it, and six more you will meet this week. My translation job is to give you the plain version, not to make you sound clever.</p>

          <h2>The six words in that sentence</h2>
          <div className="term-grid">{firstTerms.map(([term, meaning, why]) => <JargonTerm key={term} term={term} meaning={meaning} why={why} />)}</div>

          <aside className="article-callout"><span>Try this in the room</span><p>“Can you put that in plain English?” At least one other person was waiting for someone to ask. And the person who cannot answer has told you something useful.</p></aside>

          <h2>Six more you will hear this week</h2>
          <div className="term-grid">{secondTerms.map(([term, meaning, why]) => <JargonTerm key={term} term={term} meaning={meaning} why={why} />)}</div>

          <h2>Now read the sentence again</h2>
          <p>In plain English: we built something that looks up our own documents before answering, we paid to train it on our data, it cannot hold enough in mind to do the multi-step job properly, and we are hoping a standard connector will bring the bill down.</p>
          <p>That version invites the useful questions. Why did you fine-tune before trying a better brief? Which multi-step job, specifically? What is the bill? None of those questions are available while jargon is doing its work.</p>

          <h2>What you walk away with</h2>
          <p>Not the ability to use these words. The ability to hear through them. Jargon is not usually there to deceive you; often, the speaker is repeating what they heard. But it can have the same effect because it stops you asking.</p>
          <p>You do not need to be technical to make good decisions here. Be the person who asks: <strong>in plain English, what does this do, what does it cost, and what happens when it is wrong?</strong></p>

          <section className="article-signoff">
            <Image src="/closeUp.jpeg" alt="Fatiha Chikh" width={82} height={82} />
            <div><span>About the author</span><h2>Fatiha Chikh</h2><p>Years inside big corporate tech, now building a human-led business with AI in public. I turn technical noise into decisions people can actually use.</p><Link href="/about.html">Read my story →</Link></div>
          </section>
        </div>
      </article>

      <section className="more-guides article-shell">
        <div><p className="article-label">Keep going</p><h2>Learn the foundations without the fog.</h2></div>
        <div className="more-guides__grid">{related.map((item) => <GuideCard guide={item} key={item.slug} />)}</div>
      </section>
      <section className="article-newsletter">
        <div><p className="article-label">Your next useful step</p><h2>Find the first AI system worth building.</h2><p>Answer eight practical questions and get the most useful place to start for the work you want AI to help with.</p></div>
        <Link className="article-newsletter__action" href="/quiz.html">Take the free diagnostic →</Link>
      </section>
    </main>
  );
}
