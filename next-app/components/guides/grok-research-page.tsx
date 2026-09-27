"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { grokResearchPrompt } from "@/content/grok-research-prompt";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-research-page.module.css";

const initialQuestion = "Grok Bot";

export function GrokResearchPage({ guide }: { guide: GuidePage }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const prompt = grokResearchPrompt(question);
  const validQuestion = question.trim().length > 2 && !question.includes("[") && !question.includes("]");

  async function copyPrompt() {
    if (!validQuestion) return;
    try {
      await navigator.clipboard.writeText(prompt);
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
      <header className={styles.hero}><h1>Can Grok Bot find the X posts <span>worth your attention?</span></h1><p>Ask for one short, source-linked brief on a public topic. Open the posts yourself before you rely on what they say.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.learning} aria-labelledby="research-map-title"><div className={styles.sectionHead}><span>See the distinction</span><h2 id="research-map-title">A post can point you to a fact. It is not the fact.</h2></div><p>Start with a public topic such as “Grok Bot”. Ask for recent X posts, then open the direct link for each one you might use. A post can show a question or reaction; check product claims against an original source.</p><div className={styles.map}><article><span>01</span><h3>Find a post</h3><p>Ask Grok Bot for public posts from the past seven days about your topic.</p></article><article><span>02</span><h3>Open its link</h3><p>Check who posted it, when, and the exact words before summarising it.</p></article><article><span>03</span><h3>Check the claim</h3><p>For a claim about Grok Bot’s X access, compare it with <a href="https://x.ai/news/grok-bot-and-x" target="_blank" rel="noopener noreferrer">xAI’s X-connection announcement ↗</a>.</p></article></div><div className={styles.sourceExample}><strong>For example</strong><p>If a post says Grok Bot can check X mentions, open the post first. Then check the capability in <a href="https://x.ai/news/grok-bot-and-x" target="_blank" rel="noopener noreferrer">xAI’s announcement ↗</a>. You can confirm the capability without treating the post’s opinion as proof of how well it works.</p></div><div className={styles.workedExample}><strong>Before you try it</strong><p>Check that your plan includes <a href="https://x.ai/bot" target="_blank" rel="noopener noreferrer">Grok Bot access ↗</a>. Connect X only if the Bot needs that access for your search.</p></div></section>

      <section className={styles.learning} aria-labelledby="grok-question-title"><div className={styles.sectionHead}><span>Run one read-only check</span><h2 id="grok-question-title">What should the Bot look for?</h2></div><p>Start with “Grok Bot”, or enter a public topic relevant to your work. The Bot will return direct post links for you to review.</p><label className={styles.question}><span>Public X account or topic</span><input value={question} onChange={event => setQuestion(event.target.value)} /></label><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the source-linked X request" guidePromise="Copy the complete request for Grok Bot and keep a link to return to this guide." actionLabel="Show the request"><div className={styles.prompt}><strong>Complete request for Grok Bot</strong><pre>{prompt}</pre><button type="button" onClick={copyPrompt} disabled={!validQuestion} aria-label="Copy the complete Grok Bot X request">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the request text instead.</p>}</GuideAccessBoundary>{!validQuestion && <p className={styles.message}>Enter a public account or topic before copying.</p>}<p className={styles.toolStep}><a href="https://x.ai/bot" target="_blank" rel="noopener noreferrer">Open Grok Bot ↗</a> Paste the request into one Bot. If it asks to connect X, read the requested access before signing in.</p></section>

      <section className={styles.learning} aria-labelledby="research-check-title"><div className={styles.sectionHead}><span>After the brief arrives</span><h2 id="research-check-title">Open two links before you act</h2></div><div className={styles.reviewGrid}><div><strong>Does the post exist?</strong><p>Open the direct X link and compare its date and words with the brief.</p></div><div><strong>Is it a fact or a reaction?</strong><p>A question or opinion can be worth attention. Check factual claims at the original source.</p></div><div><strong>What will you do?</strong><p>Choose which post needs your reply or follow-up. The Bot should not post for you.</p></div></div></section>
    </div>
    <section className={styles.related} aria-labelledby="grok-research-related-title"><div className={styles.relatedInner}><h2 id="grok-research-related-title">Keep the Bot in your control</h2><div className={styles.relatedGrid}>{guide.related.filter(item => ["review-grok-suggestions", "get-better-professional-writing-from-grok"].includes(item.slug)).map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
