"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./customer-research-page.module.css";

const readyChecks = [
  "I removed names, emails, company names and account details from a copy.",
  "Each response has a participant ID such as P01 or P02.",
  "Each row has a participant, question and answer.",
  "I know which decision this research should inform.",
] as const;

const resultChecks = [
  "Every main theme has at least two participant IDs and one extract from each person.",
  "I can find every short extract under the right participant ID in the original notes.",
  "Disagreement and one-person signals stay visible.",
  "The answer does not claim this sample represents all customers.",
] as const;

export function CustomerResearchPage({ guide }: { guide: GuidePage }) {
  const [ready, setReady] = useState<boolean[]>([false, false, false, false]);
  const [decision, setDecision] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  if (!guide.tryNow) return null;
  const prompt = guide.tryNow.prompt.replace("[DECISION]", decision.trim() || "[DECISION]");

  async function copyPrompt() {
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
      <header className={styles.hero}><h1>Can ChatGPT find customer themes <span>without inventing them?</span></h1><p>Only if each theme leads back to the people and words behind it. Prepare the notes, ask for an evidence table, then check the original.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="research-ready-title"><div className={styles.sectionHead}><span>Before uploading</span><h2 id="research-ready-title">Can you trace each response?</h2></div><div className={styles.flow} aria-label="From source response to supported theme"><span>Participant ID</span><span aria-hidden="true">→</span><span>Original answer</span><span aria-hidden="true">→</span><span>Supported theme</span></div><div className={styles.checks}>{readyChecks.map((label, index) => <label key={label}><input type="checkbox" checked={ready[index] ?? false} onChange={() => setReady(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{ready.every(Boolean) ? "Your notes are ready for a first pass. Keep the original copy for checking." : `${ready.filter(Boolean).length} of 4 preparation checks marked. Use a copy of the notes, not your only original.`}</p></section>

      <section className={styles.activity} aria-labelledby="research-prompt-title"><div className={styles.sectionHead}><span>One evidence table</span><h2 id="research-prompt-title">Tell ChatGPT which decision matters</h2></div><label className={styles.decision}><span>Decision this research should inform</span><input value={decision} onChange={event => setDecision(event.target.value)} placeholder="Name the decision" /></label><p className={styles.intro}>Upload the anonymised copy, then paste this complete instruction. It asks for participant IDs, supporting extracts, contradictions and gaps beside each theme.</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete customer research instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>

      <section className={styles.activity} aria-labelledby="research-check-title"><div className={styles.sectionHead}><span>Check the answer</span><h2 id="research-check-title">Would each theme survive a source check?</h2></div><div className={styles.checks}>{resultChecks.map((label, index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All checks marked. Keep only themes you can still trace to the original notes." : "Open the original notes. Remove or revise any theme whose IDs or extracts do not match."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="research-related-title"><div className={styles.relatedInner}><h2 id="research-related-title">Keep the evidence attached to the work</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
