"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
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

function cost(value: string) { return Math.max(0, Number(value) || 0); }
function displayCost(value: number) { return new Intl.NumberFormat("en-AE", { maximumFractionDigits: 2 }).format(value); }

export function MetaMuseSavingPage({ guide }: { guide: GuidePage }) {
  const [focus, setFocus] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [aPrice, setAPrice] = useState("80");
  const [aExtras, setAExtras] = useState("20");
  const [bPrice, setBPrice] = useState("95");
  const [bExtras, setBExtras] = useState("0");
  if (!guide.tryNow) return null;
  const firstTotal = Math.round((cost(aPrice) + cost(aExtras)) * 100) / 100;
  const secondTotal = Math.round((cost(bPrice) + cost(bExtras)) * 100) / 100;
  const related = publicGuides.filter(item => ["what-is-ai", "what-should-you-never-share-with-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>Can Muse find a better price <span>without buying for you?</span></h1><p>Compare the full cost of the same item from different sellers. Keep checkout and the final decision in your hands.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#muse-cost-title">What cheaper means</a><a href="#muse-example-title">Try a price check</a><a href="#muse-shortlist-title">Ask Muse</a><a href="#muse-price-check-title">Check the shortlist</a></nav>

      <section className={styles.activity} aria-labelledby="muse-cost-title"><div className={styles.sectionHead}><span>01 · Compare fairly</span><h2 id="muse-cost-title">What does “cheaper” include?</h2></div><p>The first price you see may leave out delivery, extras or a different return policy. Compare options only when they meet the same must-haves.</p><div className={styles.sourceTabs} aria-label="Choose a cost to check">{costs.map((cost, index) => <button key={cost.title} type="button" aria-pressed={focus === index} onClick={() => setFocus(index)}>{cost.title}</button>)}</div><div className={styles.sourcePanel} aria-live="polite"><h3>{costs[focus].title}</h3><p>{costs[focus].detail}</p></div></section>

      <section className={styles.activity} aria-labelledby="muse-example-title"><div className={styles.sectionHead}><span>02 · A quick example</span><h2 id="muse-example-title">Which offer is really cheaper?</h2></div><p>These are sample prices in AED, not live offers. Add each seller's required charges to the displayed price. You can change the numbers.</p><div className={styles.priceGrid}><div><strong>Seller A</strong><label>Displayed price<input type="number" min="0" step="0.01" inputMode="decimal" value={aPrice} onChange={event => setAPrice(event.target.value)} /></label><label>Required extras<input type="number" min="0" step="0.01" inputMode="decimal" value={aExtras} onChange={event => setAExtras(event.target.value)} /></label><span>Total: AED {displayCost(firstTotal)}</span></div><div><strong>Seller B</strong><label>Displayed price<input type="number" min="0" step="0.01" inputMode="decimal" value={bPrice} onChange={event => setBPrice(event.target.value)} /></label><label>Required extras<input type="number" min="0" step="0.01" inputMode="decimal" value={bExtras} onChange={event => setBExtras(event.target.value)} /></label><span>Total: AED {displayCost(secondTotal)}</span></div></div><p className={styles.resultNote} aria-live="polite">{firstTotal === secondTotal ? "The totals match. Check the return terms and whether both offers meet your needs." : `Seller ${firstTotal < secondTotal ? "A" : "B"} has the lower visible total by AED ${displayCost(Math.abs(firstTotal - secondTotal))}. Check what is still missing before choosing.`}</p></section>

      <section className={styles.activity} aria-labelledby="muse-shortlist-title"><div className={styles.sectionHead}><span>03 · Get a shortlist</span><h2 id="muse-shortlist-title">Ask Muse to compare the full cost</h2></div><p>If Muse is available to your account, open <a href="https://muse.ai/" target="_blank" rel="noopener noreferrer">its official site ↗</a>. The instruction asks you for the item, budget and must-haves before Muse starts. It stops before any login, message, basket or purchase.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the price-comparison instruction" guidePromise="Copy the complete brief and keep a link to the checks below." actionLabel="Show me the instruction"><div className={styles.prompt}><div className={styles.promptTop}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete Muse buying comparison instruction">{copied ? "Copied" : "Copy"}</button></div><pre>{guide.tryNow.prompt}</pre></div>{copyError && <p className={styles.copyError} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="muse-price-check-title"><div className={styles.sectionHead}><span>04 · Check it yourself</span><h2 id="muse-price-check-title">Does the shortlist hold up?</h2></div><p>Use these checks when Muse returns. A lower price is not useful if the item, terms or final cost changed.</p><div className={styles.sourcePanel}>{checks.map((label, index) => <label key={label} className={styles.checkLabel}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.resultNote} aria-live="polite">{checked.every(Boolean) ? "All four checks marked. Decide using the options and costs you verified yourself." : "Leave a missing cost or term unresolved until you can verify it."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="muse-saving-related-title"><div className={styles.relatedInner}><h2 id="muse-saving-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
