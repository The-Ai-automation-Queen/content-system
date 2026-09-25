"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./meta-muse-saving-page.module.css";

const costs = [
  { title: "Price shown", detail: "The item or plan price on the seller’s page." },
  { title: "Costs added", detail: "Delivery, required extras, tax where shown and recurring charges." },
  { title: "Terms kept", detail: "The same quantity, condition, return or cancellation terms." },
] as const;

const checks = [
  "Each option meets the requirements I said cannot be removed.",
  "I opened the seller’s page and checked every price and extra charge.",
  "Missing costs or terms are marked “Needs checking”, not guessed.",
  "Muse did not sign in, add to a basket, contact a seller or purchase anything.",
] as const;

export function MetaMuseSavingPage({ guide }: { guide: GuidePage }) {
  const [focus, setFocus] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
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
      <header className={styles.hero}><h1>Can Muse find a better price <span>without buying for you?</span></h1><p>Give it your budget and must-haves. Compare the complete cost, then make the decision yourself.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="muse-cost-title"><div className={styles.sectionHead}><span>Define a fair comparison</span><h2 id="muse-cost-title">What does “cheaper” include?</h2></div><div className={styles.sourceTabs} role="tablist" aria-label="Comparison cost">{costs.map((cost, index) => <button key={cost.title} type="button" id={`muse-cost-tab-${index}`} role="tab" aria-selected={focus === index} aria-controls="muse-cost-panel" onClick={() => setFocus(index)}>{cost.title}</button>)}</div><div id="muse-cost-panel" role="tabpanel" aria-labelledby={`muse-cost-tab-${focus}`} className={styles.sourcePanel}><h3>{costs[focus].title}</h3><p>{costs[focus].detail}</p></div></section>

      <section className={styles.activity} aria-labelledby="muse-shortlist-title"><div className={styles.sectionHead}><span>One bounded task</span><h2 id="muse-shortlist-title">Ask Muse for a shortlist</h2></div><p>If your account has access, open <a href="https://muse.ai/" target="_blank" rel="noopener noreferrer">Muse ↗</a>. Replace the brackets with your budget, location and 3 to 5 must-haves. Ask for a comparison only.</p><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Muse buying comparison instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.copyError} role="alert">Copy failed. Open the instruction and select its text instead.</p>}<p className={styles.resultNote}>The prompt stops before login, contact, basket or purchase. Keep that limit when you replace the brackets.</p></section>

      <section className={styles.activity} aria-labelledby="muse-price-check-title"><div className={styles.sectionHead}><span>Before deciding</span><h2 id="muse-price-check-title">Does the shortlist hold up?</h2></div><div className={styles.sourcePanel}>{checks.map((label, index) => <label key={label} className={styles.checkLabel}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.resultNote} aria-live="polite">{checked.every(Boolean) ? "All 4 checks marked. Decide only from the options and costs you verified yourself." : `${checked.filter(Boolean).length} of 4 checks marked. Leave a missing cost or term unresolved until you can verify it.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="muse-saving-related-title"><div className={styles.relatedInner}><h2 id="muse-saving-related-title">Before Muse does more than compare</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
