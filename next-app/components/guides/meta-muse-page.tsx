"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./meta-muse-page.module.css";

const products = [
  { name: "Muse", purpose: "A personal agent that can browse and take actions. It can keep working after you close the app." },
  { name: "Meta AI", purpose: "The assistant in Meta apps and on the web. It is separate from the Muse app." },
  { name: "Muse Spark", purpose: "The model behind some of Meta’s AI features. It is not an account you need to connect." },
] as const;

const checks = [
  "I opened the venue, price and cancellation sources myself.",
  "The 3 options have the requested date, time, currency and walking distance, or clearly mark what needs checking.",
  "Muse did not log in, connect an account, fill a form, contact a venue or attempt a booking.",
] as const;

export function MetaMusePage({ guide }: { guide: GuidePage }) {
  const [product, setProduct] = useState(0);
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
      <header className={styles.hero}><h1>Meta Muse can act for you. <span>Should you let it?</span></h1><p>First see what Muse is. Then give it a public research task with a firm stop point.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="muse-name-title"><div className={styles.sectionHead}><span>Know the product</span><h2 id="muse-name-title">Which Meta AI do you mean?</h2></div><div className={styles.sourceTabs} role="tablist" aria-label="Meta AI product">{products.map((item, index) => <button type="button" role="tab" key={item.name} id={`muse-product-tab-${index}`} aria-selected={product === index} aria-controls="muse-product-panel" onClick={() => setProduct(index)}>{item.name}</button>)}</div><div id="muse-product-panel" role="tabpanel" aria-labelledby={`muse-product-tab-${product}`} className={styles.sourcePanel}><h3>{products[product].name}</h3><p>{products[product].purpose}</p></div></section>

      <section className={styles.activity} aria-labelledby="muse-access-title"><div className={styles.sectionHead}><span>Before any account connection</span><h2 id="muse-access-title">What can change if Muse has access?</h2></div><div className={styles.resultGrid}><div><strong>Read</strong><span>Muse can inspect the information a connected service allows.</span></div><div><strong>Send or act</strong><span>Muse may contact someone or change something outside its own app.</span></div><div><strong>You approve</strong><span>Check the account, destination and exact action before allowing a sensitive step.</span></div></div><p className={styles.resultNote}>For this first test, connect no account. Public pages are enough.</p></section>

      <section className={styles.activity} aria-labelledby="muse-test-title"><div className={styles.sectionHead}><span>Try a public-only task</span><h2 id="muse-test-title">Can Muse stop before booking?</h2></div><p>Open <a href="https://muse.ai/" target="_blank" rel="noopener noreferrer">the official Muse site ↗</a> if your account has access. Try the public room comparison below. Muse must not sign in, contact anyone or book.</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete public-only Muse test">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.copyError} role="alert">Copy failed. Open the instruction and select its text instead.</p>}<div className={styles.sourcePanel}><h3>Check what it did</h3>{checks.map((label, index) => <label key={label} className={styles.checkLabel}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))}/><span>{label}</span></label>)}<p className={styles.resultNote} aria-live="polite">{checked.every(Boolean) ? "All 3 checks marked. Keep the result only if the opened sources and Muse’s action trail agree." : `${checked.filter(Boolean).length} of 3 checks marked. Do not grant more access until Muse respects the stop point.`}</p></div></section>
    </div>
    <section className={styles.related} aria-labelledby="muse-related-title"><div className={styles.relatedInner}><h2 id="muse-related-title">Before you give an AI agent more access</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
