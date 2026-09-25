"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-writing-page.module.css";

const briefParts = [
  { label: "Reader", missing: "Write a professional update.", add: "Write for the operations director." },
  { label: "Decision", missing: "Explain the pilot.", add: "Recommend whether to continue it for one month." },
  { label: "Evidence", missing: "Make it convincing.", add: "Use the 4 facts provided and name the main risk." },
  { label: "Structure", missing: "Make it clear.", add: "Use recommendation, evidence, risk and next step." },
] as const;

const checks = [
  "The recommendation says whether to continue the pilot for one month.",
  "The four supplied facts are accurate, with no invented benefits.",
  "Late pre-reading is named as the risk, followed by a clear next step.",
] as const;

export function GrokWritingPage({ guide }: { guide: GuidePage }) {
  const [activePart, setActivePart] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  if (!guide.tryNow) return null;

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
      <header className={styles.hero}>
        <h1>Grok gave you a thin draft. <span>What was missing?</span></h1>
        <p>Give it a reader, a decision, the facts and a structure. Then see if the draft is worth keeping.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.activity} aria-labelledby="writing-brief-title">
        <div className={styles.sectionHead}><span>Fix the brief first</span><h2 id="writing-brief-title">What would you add?</h2></div>
        <p>“Write a professional update” gives Grok little to work with. Tap each part to see a clearer instruction.</p>
        <div className={styles.partGrid}>{briefParts.map((part, index) => <div key={part.label} className={styles.partGroup}>
          <button type="button" className={styles.partButton} aria-expanded={activePart === index} aria-controls={`writing-part-${index}`} onClick={() => setActivePart(index)}>{part.label}<span aria-hidden="true">{activePart === index ? "−" : "+"}</span></button>
          {activePart === index && <div id={`writing-part-${index}`} className={styles.partResult}><span>Too vague</span><p>{part.missing}</p><span>Give Grok this instead</span><p>{part.add}</p></div>}
        </div>)}</div>
      </section>

      <section className={styles.activity} aria-labelledby="writing-prompt-title">
        <div className={styles.sectionHead}><span>Try the complete example</span><h2 id="writing-prompt-title">Ask for a recommendation you can check</h2></div>
        <p>Use the meeting-pilot example. The instruction includes the reader, decision, evidence and structure.</p>
        <div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Grok writing instruction">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
        <p className={styles.toolStep}><a href="https://grok.com/" target="_blank" rel="noopener noreferrer">Open Grok ↗</a> Start a new chat, paste the instruction and send it.</p>
      </section>

      <section className={styles.activity} aria-labelledby="writing-check-title">
        <div className={styles.sectionHead}><span>Check the result</span><h2 id="writing-check-title">Would you use this draft?</h2></div>
        <p>Compare Grok’s reply with the four facts in the instruction. Tick only what you can see in its answer.</p>
        <div className={styles.checks}>{checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{check}</span></label>)}</div>
        <p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All three checks marked. Keep the draft only if it matches the four facts." : `${checked.filter(Boolean).length} of 3 checks marked. Repair or reject anything Grok invented.`}</p>
      </section>
    </div>
    <section className={styles.related} aria-labelledby="writing-related-title"><div className={styles.relatedInner}><h2 id="writing-related-title">Make the next Grok answer easier to trust</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
