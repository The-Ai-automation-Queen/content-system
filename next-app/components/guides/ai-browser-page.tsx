"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./ai-browser-page.module.css";

export function AiBrowserPage({ guide }: { guide: GuidePage }) {
  const [useCase, setUseCase] = useState(0);
  const [privacyCheck, setPrivacyCheck] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const uses = guide.sections[0];
  const privacy = guide.sections[1];
  if (uses.kind !== "cards" || privacy.kind !== "cards" || !guide.tryNow) return null;

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
      <header className={styles.hero}><h1>An AI browser can read the page. <span>Should you let it?</span></h1><p>Try it on public pages first. Check what the AI can see and remember before using it for private work.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="browser-use-title"><div className={styles.sectionHead}><span>Where it helps</span><h2 id="browser-use-title">What are you trying to do?</h2></div><div className={styles.useGrid}>{uses.items.map((item, index) => <div key={item.title} className={styles.useOption}><button type="button" aria-expanded={useCase === index} aria-controls={`browser-use-${index}`} onClick={() => setUseCase(index)}>{item.title}<span aria-hidden="true">{useCase === index ? "−" : "+"}</span></button>{useCase === index && <p id={`browser-use-${index}`}>{item.body}</p>}</div>)}</div><div className={styles.flow} aria-label="AI browser reading flow"><span>Public page</span><span aria-hidden="true">→</span><span>AI answer</span><span aria-hidden="true">→</span><span>Your source check</span></div></section>

      <section className={styles.activity} aria-labelledby="browser-privacy-title"><div className={styles.sectionHead}><span>Before private pages</span><h2 id="browser-privacy-title">What can the browser see?</h2></div><div className={styles.privacyGrid}>{privacy.items.map((item, index) => <div key={item.title} className={styles.privacyOption}><button type="button" aria-expanded={privacyCheck === index} aria-controls={`browser-check-${index}`} onClick={() => setPrivacyCheck(index)}>{item.title}<span aria-hidden="true">{privacyCheck === index ? "−" : "+"}</span></button>{privacyCheck === index && <p id={`browser-check-${index}`}>{item.body}</p>}</div>)}</div><p className={styles.atlasNote}><strong>In ChatGPT Atlas:</strong> web-browsing training, chat training, page visibility and browser memories have separate controls. Incognito does not make your activity invisible. <a href="https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy" target="_blank" rel="noopener noreferrer">Check the current Atlas controls ↗</a></p></section>

      <section className={styles.activity} aria-labelledby="browser-test-title"><div className={styles.sectionHead}><span>Try it on public information</span><h2 id="browser-test-title">Compare two pages you can open</h2></div><ol className={styles.steps}><li>Open 2 public pages about the same product or topic. Stay signed out of private accounts.</li><li>Copy the instruction below into the browser’s AI chat or sidebar.</li><li>Open each quoted section and check that it supports the comparison.</li></ol><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete AI browser comparison instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<div className={styles.checks}>{["Both pages are public and contain no private account information.", "I opened each quoted section myself.", "Each quoted section supports the claim beside it."].map((label, index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All checks marked. Keep the comparison only if the original pages support it." : `${checked.filter(Boolean).length} of 3 checks marked. Do not rely on a claim with a missing or inaccurate quote.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="browser-related-title"><div className={styles.relatedInner}><h2 id="browser-related-title">Before AI sees more than one page</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
