"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { grokResearchPrompt } from "@/content/grok-research-prompt";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-research-page.module.css";

const initialQuestion = "@SpaceXAI";

export function GrokResearchPage({ guide }: { guide: GuidePage }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
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
      <header className={styles.hero}><h1>Can Grok Bot find the X posts <span>you need to see?</span></h1><p>Give it one public account or topic. Get a brief with original links, then decide what needs your attention.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.learning} aria-labelledby="research-map-title"><div className={styles.sectionHead}><span>Make the brief useful</span><h2 id="research-map-title">Which posts deserve attention?</h2></div><div className={styles.map}><article><span>01</span><h3>Questions</h3><p>Someone asked something you could answer. Keep the original link.</p></article><article><span>02</span><h3>Problems</h3><p>Someone reported an issue you may need to investigate. Check the post before acting.</p></article><article><span>03</span><h3>Other signals</h3><p>Useful requests or changes that do not fit the first two groups.</p></article></div><div className={styles.workedExample}><strong>Start with one search</strong><p>Grok Bot can connect to X to search posts, timelines and mentions. <a href="https://x.ai/news/grok-bot-and-x" target="_blank" rel="noopener noreferrer">See xAI’s X connection ↗</a>. Review the access request yourself.</p></div></section>

      <section className={styles.learning} aria-labelledby="grok-question-title"><div className={styles.sectionHead}><span>Run one read-only check</span><h2 id="grok-question-title">Whose posts should the Bot check?</h2></div><p>Use the public xAI account for practice, or enter a public account or topic relevant to your work.</p><label className={styles.question}><span>Public X account or topic</span><input value={question} onChange={event => setQuestion(event.target.value)} /></label><div className={styles.prompt}><pre>{prompt}</pre><button type="button" onClick={copyPrompt} disabled={!validQuestion} aria-label="Copy the complete Grok Bot X instruction">{copied ? "Copied" : "Copy"}</button></div>{!validQuestion && <p className={styles.message}>Enter a public account or topic before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Select the visible instruction text instead.</p>}<p className={styles.toolStep}><a href="https://x.ai/bot" target="_blank" rel="noopener noreferrer">Open Grok Bot ↗</a> Create one Bot, paste the instruction and review any X connection it requests before signing in.</p></section>

      <section className={styles.learning} aria-labelledby="research-check-title"><div className={styles.sectionHead}><span>After the brief arrives</span><h2 id="research-check-title">Which posts are worth opening?</h2></div><p>Open two original posts. Check the dates, the wording and if they really belong to your topic.</p><div className={styles.checks}>{["I opened two original X posts.", "The dates and descriptions in the brief match those posts.", "The Bot did not post, reply or schedule another search."].map((item, index) => <label key={item}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{item}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "Use the checked posts to decide what needs your attention." : `${checked.filter(Boolean).length} of 3 checks marked. Check the links before using the brief.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="grok-research-related-title"><div className={styles.relatedInner}><h2 id="grok-research-related-title">Use the evidence in your next task</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
