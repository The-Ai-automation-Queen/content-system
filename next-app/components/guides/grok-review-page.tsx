"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-review-page.module.css";

const actions = [
  { text: "Read five public posts and return their links.", answer: "Read", reason: "This is the job you gave the Bot. Check the links in its result." },
  { text: "Connect your X account to find your mentions.", answer: "Ask first", reason: "You need to review the access request and sign in yourself." },
  { text: "Post a reply to someone who mentioned you.", answer: "Stop", reason: "This Bot may draft a reply for review, but this job does not allow posting." },
] as const;
const choices = ["Read", "Ask first", "Stop"] as const;

export function GrokReviewPage({ guide }: { guide: GuidePage }) {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(guide.tryNow!.prompt);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>When should Grok Bot <span>ask you first?</span></h1><p>Give it one public-post job, set the boundary before it starts, and keep the final decision with you.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#grok-start-title">Set the job</a><a href="#grok-example-title">See the boundary</a><a href="#grok-sort-title">Make three decisions</a><a href="#grok-action-title">Get the instruction</a></nav>

      <section className={styles.start} aria-labelledby="grok-start-title">
        <div className={styles.sectionHead}><span>01 · Start here</span><h2 id="grok-start-title">Choose one job with a clear finish</h2></div>
        <p>Have one public topic ready. Work through the three decisions below, then give your Bot the complete boundary instruction and check its first brief against the original posts.</p>
        <p>Imagine you want to see how people discuss a new workplace policy on X. Ask a Bot to find up to five public posts from the past week and return the original links. You can open the links and decide whether its summary is fair. It does not need your account to prepare that brief.</p>
        <p><strong>Your result:</strong> a short list you can verify, plus draft replies if you ask for them. Nothing gets posted or sent.</p>
      </section>

      <section className={styles.example} aria-labelledby="grok-example-title">
        <div className={styles.sectionHead}><span>02 · Draw the line</span><h2 id="grok-example-title">Read, draft, act</h2></div>
        <div className={styles.sampleGrid}>
          <div><strong>Read and prepare</strong><p>Find those public posts, collect links and draft a possible reply for you to inspect.</p></div>
          <div><strong>Ask before acting</strong><p>If it wants to connect your X account, see the account and reason first. If it proposes a reply, check the exact text and destination. For this job, you send it yourself.</p></div>
        </div>
        <p className={styles.exampleNote}>A clear boundary in the Bot’s instruction helps, but still check any approval request before allowing it. xAI says to review the target, scope and values of a proposed action.</p>
      </section>

      <section className={styles.sort} aria-labelledby="grok-sort-title">
        <div className={styles.sectionHead}><span>03 · Try three decisions</span><h2 id="grok-sort-title">What would you allow?</h2></div>
        <p className={styles.sortIntro}>This Bot checks public X posts but must not post anything. What would you let it do? The answer appears beside your choice.</p>
        <div className={styles.sortGrid}>{actions.map((action, index) => <article key={action.text}>
          <p>{action.text}</p>
          <div className={styles.sortChoices} role="group" aria-label={`Choose a rule for action ${index + 1}`}>{choices.map(choice => <button key={choice} type="button" aria-pressed={answers[index] === choice} onClick={() => setAnswers(current => current.map((answer, i) => i === index ? choice : answer))}>{choice}</button>)}</div>
          {answers[index] && <p className={styles.sortFeedback} role="status">{answers[index] === action.answer ? "Yes. " : "For this job, choose another rule. "}<strong>{action.answer}:</strong> {action.reason}</p>}
        </article>)}</div>
      </section>

      <section className={styles.action} aria-labelledby="grok-action-title">
        <div className={styles.sectionHead}><span>04 · Put it to work</span><h2 id="grok-action-title">Give your Bot the boundary</h2></div>
        <p>Open the Bot you created. If this is your first Bot, <GuideRelatedLink slug="get-better-professional-writing-from-grok">start with the setup guide</GuideRelatedLink>. The complete instruction below tells it what to read, what to return and when to stop. Replace the bracketed job with your public-post topic, then paste it into Grok Bot.</p>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the complete Bot boundary" guidePromise="Copy the full instruction for a read-only Bot, plus a check for its first result. We’ll email you a link back to this guide." actionLabel="Show me the instruction">
          <div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copy} aria-label="Copy the complete Grok Bot boundaries">{copied ? "Copied" : "Copy"}</button></div>
          {copyError && <p role="alert">Copy failed. Select the visible instruction text instead.</p>}
          <div className={styles.resultCheck}><strong>Check the first result</strong><p>Open two original posts. Do the dates and claims match the Bot’s brief? If it asks to connect an account or take another action, inspect the exact request before you decide. For this job, keep posting and sending in your hands.</p><a href="https://docs.x.ai/grok-bot/approvals-security-and-privacy" target="_blank" rel="noopener noreferrer">Read xAI’s approval guidance ↗</a></div>
        </GuideAccessBoundary>
      </section>
      <p className={styles.finish}><strong>Start with reading and drafting.</strong> You decide before the Bot connects an account, sends a message or changes anything.</p>
    </div>
    <section className={styles.related} aria-labelledby="grok-related-title"><div className={styles.relatedInner}><h2 id="grok-related-title">Give your Bot a job with a clear finish</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
