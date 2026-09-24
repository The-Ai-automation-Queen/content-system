"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./deepseek-document-page.module.css";

type Winner = "deepseek" | "current" | "tie" | null;
const options: { value: Exclude<Winner, null>; label: string }[] = [
  { value: "deepseek", label: "DeepSeek" },
  { value: "current", label: "Current tool" },
  { value: "tie", label: "Similar" },
];

export function DeepseekDocumentPage({ guide }: { guide: GuidePage }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [scores, setScores] = useState<Winner[]>([null, null, null, null]);
  const [deepseekMinutes, setDeepseekMinutes] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [secondDocument, setSecondDocument] = useState(false);
  const criteria = guide.sections[0];
  const test = guide.sections[1];
  if (criteria.kind !== "cards" || test.kind !== "steps" || !guide.tryNow) return null;

  async function copyPrompt() {
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
      <header className={styles.hero}><h1>Could DeepSeek V4.1 do your document work <span>better?</span></h1><p>Run the same safe document and instruction in both tools. Compare the checked result and the time it takes to repair—not the first impression.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="doc-test-title"><div className={styles.sectionHead}><span>Keep the test fair</span><h2 id="doc-test-title">One document, two tools, one instruction</h2></div><ol className={styles.steps}>{test.steps.map(step => <li key={step.title}><strong>{step.title}.</strong> {step.body}</li>)}</ol></section>

      <section className={styles.activity} aria-labelledby="doc-prompt-title"><div className={styles.sectionHead}><span>Copy once, use twice</span><h2 id="doc-prompt-title">Ask for a source-backed decision brief</h2></div><p className={styles.intro}>Use a public or invented document of 2–5 pages. Upload the same file to both tools, then paste this instruction in each.</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete document comparison instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>

      <section className={styles.activity} aria-labelledby="doc-score-title"><div className={styles.sectionHead}><span>Compare the checked work</span><h2 id="doc-score-title">Which result needed less repair?</h2></div><div className={styles.scoreGrid}>{criteria.items.map((item, index) => <fieldset key={item.title}><legend><strong>{item.title}</strong><span>{item.body}</span></legend><div>{options.map(option => <label key={option.value}><input type="radio" name={`document-score-${index}`} checked={scores[index] === option.value} onChange={() => setScores(current => current.map((value, i) => i === index ? option.value : value))} /><span>{option.label}</span></label>)}</div></fieldset>)}</div><div className={styles.timeGrid}><label><span>Minutes to check and repair DeepSeek</span><input type="number" min="0" value={deepseekMinutes} onChange={event => setDeepseekMinutes(event.target.value)} /></label><label><span>Minutes to check and repair your current tool</span><input type="number" min="0" value={currentMinutes} onChange={event => setCurrentMinutes(event.target.value)} /></label></div><label className={styles.second}><input type="checkbox" checked={secondDocument} onChange={event => setSecondDocument(event.target.checked)} /><span>I repeated the same check with a second safe document.</span></label><p className={styles.result} aria-live="polite">{scores.every(Boolean) && secondDocument ? "You have two scored results. Compare the source checks and repair time before changing your regular tool." : `${scores.filter(Boolean).length} of 4 criteria marked. Repeat with a second document before deciding.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="doc-related-title"><div className={styles.relatedInner}><h2 id="doc-related-title">Keep the useful result under your control</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
