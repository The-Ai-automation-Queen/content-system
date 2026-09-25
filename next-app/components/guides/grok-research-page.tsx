"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { grokResearchPrompt } from "@/content/grok-research-prompt";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-research-page.module.css";

const initialQuestion = "What did Meta officially announce about Muse?";

export function GrokResearchPage({ guide }: { guide: GuidePage }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const prompt = grokResearchPrompt(question);
  const validQuestion = question.trim().length > 12 && !question.includes("[") && !question.includes("]");

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
      <header className={styles.hero}><h1>Can you trust Grok’s <span>current research?</span></h1><p>Ask one public question. Then separate what people are saying from what an opened source confirms.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.learning} aria-labelledby="research-map-title"><div className={styles.sectionHead}><span>The three evidence boxes</span><h2 id="research-map-title">Where does each claim belong?</h2></div><div className={styles.map}><article><span>01</span><h3>Conversation</h3><p>A public post or reply says it. Useful for finding a question, not proving the answer.</p></article><article><span>02</span><h3>Confirmed</h3><p>You opened an official or first-hand source and found the exact claim there.</p></article><article><span>03</span><h3>Unverified</h3><p>No opened primary source supports it yet, even if many posts repeat it.</p></article></div><div className={styles.workedExample}><strong>One checked claim</strong><p>Meta introduced Muse as a personal AI agent. Its <a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" target="_blank" rel="noopener noreferrer">8 September announcement ↗</a> confirms that. It does not prove your account has access today.</p></div></section>

      <section className={styles.learning} aria-labelledby="grok-question-title"><div className={styles.sectionHead}><span>Try it on a public question</span><h2 id="grok-question-title">What are you checking?</h2></div><p>Use the example about Muse, or replace it with a public product update, announcement or deadline that matters to you.</p><label className={styles.question}><span>Your question</span><input value={question} onChange={event => setQuestion(event.target.value)} /></label><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} disabled={!validQuestion} aria-label="Copy the complete Grok research instruction">{copied ? "Copied" : "Copy"}</button></div>{!validQuestion && <p className={styles.message}>Write one complete public question before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.toolStep}><a href="https://grok.com/" target="_blank" rel="noopener noreferrer">Open Grok ↗</a> Start a new chat, paste the instruction and send it. Do not include private account details.</p></section>

      <section className={styles.learning} aria-labelledby="research-check-title"><div className={styles.sectionHead}><span>After Grok replies</span><h2 id="research-check-title">Check one important claim</h2></div><p>Pick the claim you might use at work. Open its cited source yourself, then mark these checks.</p><div className={styles.checks}>{["I opened the original source, not just a post or search snippet.", "The source date and exact wording support the claim.", "I moved anything without an opened primary source to Unverified."].map((item, index) => <label key={item}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{item}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All checks marked. Use the claim only if the opened source really supports it." : `${checked.filter(Boolean).length} of 3 checks marked. Keep the claim out of Confirmed until you have checked its source.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="grok-research-related-title"><div className={styles.relatedInner}><h2 id="grok-research-related-title">Use the evidence in your next task</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
