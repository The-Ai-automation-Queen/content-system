"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./grok-review-page.module.css";

export function GrokReviewPage({ guide }: { guide: GuidePage }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const sample = guide.sections[0];
  const labels = guide.sections[1];
  if (sample.kind !== "walkthrough" || labels.kind !== "cards" || !guide.tryNow) return null;
  const paragraph = sample.blocks.find(block => block.kind === "paragraph");
  const facts = sample.blocks.find(block => block.kind === "list");
  if (!paragraph || paragraph.kind !== "paragraph" || !facts || facts.kind !== "list") return null;

  const prompt = `Paragraph to review:\n${paragraph.text.replace(/^Paragraph:\s*/, "")}\n\nFact sheet:\n${facts.items.map(item => `- ${item}`).join("\n")}\n\n${guide.tryNow.prompt}`;

  async function copy() {
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
      <header className={styles.hero}><h1>Did Grok spot an error or <span>rewrite your point?</span></h1><p>Give Grok a paragraph and a fact sheet. Keep the corrections; decide for yourself about style changes.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.example} aria-labelledby="grok-example-title"><div className={styles.sectionHead}><span>Spot the problem first</span><h2 id="grok-example-title">One sentence cannot stay as written</h2></div><div className={styles.sampleGrid}><div><strong>In the paragraph</strong><p>“A recording was promised to every participant.”</p></div><div><strong>In the fact sheet</strong><p>“Recording: discussed, not promised.”</p></div></div><button className={styles.reveal} type="button" aria-expanded={revealed} onClick={() => setRevealed(!revealed)}>{revealed ? "Hide the correction" : "Show the correction"}</button>{revealed && <p className={styles.revealResult}>Change the claim to “A recording was discussed but not promised.” This is a factual correction, not a style choice.</p>}</section>

      <section className={styles.action} aria-labelledby="grok-action-title"><div className={styles.sectionHead}><span>Try the complete example</span><h2 id="grok-action-title">Ask Grok for the smallest useful review</h2></div><ol><li><a href="https://grok.com/" target="_blank" rel="noopener noreferrer">Open Grok ↗</a> and start a new chat.</li><li>Copy and send the paragraph, fact sheet and review instruction together.</li><li>Compare every suggested factual change with the fact sheet before you keep it.</li></ol><div className={styles.prompt}><details><summary>View the complete instruction and example</summary><pre>{prompt}</pre></details><button type="button" onClick={copy} aria-label="Copy the complete Grok review example">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p role="alert">Copy failed. Open the complete example and select the text instead.</p>}</section>

      <section className={styles.sort} aria-labelledby="grok-sort-title"><div className={styles.sectionHead}><span>Review each suggestion</span><h2 id="grok-sort-title">Correction, option or reject?</h2></div><div className={styles.sortGrid}>{labels.items.map(item => <article key={item.title}><strong>{cleanLabel(item.title)}</strong><p>{item.body}</p></article>)}</div></section>
      <p className={styles.finish}><strong>Keep only what you can defend.</strong> The recording claim must match the fact sheet. A clearer sentence is optional; an invented fact is out.</p>
    </div>
    <section className={styles.related} aria-labelledby="grok-related-title"><div className={styles.relatedInner}><h2 id="grok-related-title">Put the next Grok answer to work</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
