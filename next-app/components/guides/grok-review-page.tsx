"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
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
      <header className={styles.hero}><h1>When should Grok Bot <span>ask you first?</span></h1><p>Give it one job. Decide what it can do on its own and what needs your say-so.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.example} aria-labelledby="grok-example-title">
        <div className={styles.sectionHead}><span>Know the difference</span><h2 id="grok-example-title">Read, draft, act</h2></div>
        <div className={styles.sampleGrid}>
          <div><strong>Read and prepare</strong><p>Find public posts, collect links and draft possible replies.</p></div>
          <div><strong>Act outside the chat</strong><p>Connect an account, post a reply or send a message. Review the exact action first.</p></div>
        </div>
      </section>

      <section className={styles.sort} aria-labelledby="grok-sort-title">
        <div className={styles.sectionHead}><span>Practice with three examples</span><h2 id="grok-sort-title">What would you allow?</h2></div>
        <p className={styles.sortIntro}>This Bot checks public X posts but must not post anything. What would you let it do? The answer appears beside your choice.</p>
        <div className={styles.sortGrid}>{actions.map((action, index) => <article key={action.text}>
          <p>{action.text}</p>
          <div className={styles.sortChoices} role="group" aria-label={`Choose a rule for action ${index + 1}`}>{choices.map(choice => <button key={choice} type="button" aria-pressed={answers[index] === choice} onClick={() => setAnswers(current => current.map((answer, i) => i === index ? choice : answer))}>{choice}</button>)}</div>
          {answers[index] && <p className={styles.sortFeedback} role="status">{answers[index] === action.answer ? "Yes. " : "For this job, choose another rule. "}<strong>{action.answer}:</strong> {action.reason}</p>}
        </article>)}</div>
      </section>

      <section className={styles.action} aria-labelledby="grok-action-title">
        <div className={styles.sectionHead}><span>Set an approval boundary</span><h2 id="grok-action-title">Copy this instruction into Grok Bot</h2></div>
        <p>Open the Bot you created, replace the bracketed job, then copy and paste the full instruction. If this is your first Bot, <GuideRelatedLink slug="get-better-professional-writing-from-grok">start with the setup guide</GuideRelatedLink>. Check <a href="https://docs.x.ai/grok-bot/approvals-security-and-privacy" target="_blank" rel="noopener noreferrer">xAI’s approval settings ↗</a> before connecting an account.</p>
        <div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copy} aria-label="Copy the complete Grok Bot boundaries">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p role="alert">Copy failed. Select the visible instruction text instead.</p>}
      </section>
      <p className={styles.finish}><strong>Start with reading and drafting.</strong> You decide before the Bot connects an account, sends a message or changes anything.</p>
    </div>
    <section className={styles.related} aria-labelledby="grok-related-title"><div className={styles.relatedInner}><h2 id="grok-related-title">Give your Bot a job with a clear finish</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
