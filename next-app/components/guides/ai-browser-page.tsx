"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { approvedGuideSlugs } from "@/content/guides";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./ai-browser-page.module.css";

export function AiBrowserPage({ guide }: { guide: GuidePage }) {
  const [useCase, setUseCase] = useState(0);
  const [privacyCheck, setPrivacyCheck] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
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
      <header className={styles.hero}><h1>What can an AI browser <span>actually do?</span></h1><p>Use it to read a public page with you. Learn when it can take action, what it may see, and how to check its answer before you rely on it.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#browser-use-title">Read or act?</a><a href="#browser-privacy-title">Check access</a><a href="#browser-test-title">Try it on public pages</a></nav>

      <section className={styles.activity} aria-labelledby="browser-use-title"><div className={styles.sectionHead}><span>01 · Start here</span><h2 id="browser-use-title">Reading a page is different from acting on it</h2></div><p>In Microsoft Edge, the Copilot side pane can help explain the page you have open, if your account and settings allow it. A separate browsing mode can click or type on your behalf, but access varies by account and region. Start with reading.</p><div className={styles.useGrid}>{uses.items.map((item, index) => <div key={item.title} className={styles.useOption}><button type="button" aria-expanded={useCase === index} aria-controls={`browser-use-${index}`} onClick={() => setUseCase(index)}>{item.title}<span aria-hidden="true">{useCase === index ? "−" : "+"}</span></button>{useCase === index && <p id={`browser-use-${index}`}>{item.body}</p>}</div>)}</div><div className={styles.flow} aria-label="How to use an AI browser answer"><span>Open a public page</span><span aria-hidden="true">→</span><span>Ask one question</span><span aria-hidden="true">→</span><span>Check the page yourself</span></div><p className={styles.sourceLink}><a href="https://support.microsoft.com/en-us/microsoft-copilot/using-microsoft-copilot-in-edge-at-work" target="_blank" rel="noopener noreferrer">See Microsoft's current Edge guide ↗</a></p></section>

      <section className={styles.activity} aria-labelledby="browser-privacy-title"><div className={styles.sectionHead}><span>02 · Before you ask</span><h2 id="browser-privacy-title">Check what it can see</h2></div><p>In a work browser, your organisation may allow, limit or block page access. Check these four things before opening a private work page with an assistant.</p><div className={styles.privacyGrid}>{privacy.items.map((item, index) => <div key={item.title} className={styles.privacyOption}><button type="button" aria-expanded={privacyCheck === index} aria-controls={`browser-check-${index}`} onClick={() => setPrivacyCheck(index)}>{item.title}<span aria-hidden="true">{privacyCheck === index ? "−" : "+"}</span></button>{privacyCheck === index && <p id={`browser-check-${index}`}>{item.body}</p>}</div>)}</div><p className={styles.atlasNote}>In Edge for work, page access may require your consent or be set by your organisation. If you cannot tell what is allowed, ask IT before using the assistant on confidential pages. <a href="https://support.microsoft.com/en-us/microsoft-copilot/using-microsoft-copilot-in-edge-at-work" target="_blank" rel="noopener noreferrer">Check Microsoft's work guidance ↗</a></p></section>

      <section className={styles.activity} aria-labelledby="browser-test-title"><div className={styles.sectionHead}><span>03 · Try it</span><h2 id="browser-test-title">Check a decision against two public pages</h2></div><p className={styles.example}><strong>Example:</strong> A venue's pricing page lists a monthly rate. Its terms page says cancellation needs 30 days' notice. If an assistant says “cancel any time”, the terms page changes your decision. The answer is useful only when you can trace both claims to the pages.</p><ol className={styles.steps}><li>Open two public pages about a service you are considering, such as its pricing and cancellation terms.</li><li>In Edge, open Copilot from the toolbar. If your work account allows page access, use the instruction below. If it cannot see both pages, give it the public links or compare the pages yourself.</li><li>Open each cited section. Check the price, any conditions and what the assistant could not find.</li></ol><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the two-page comparison instruction" guidePromise="Copy the full instruction and keep a link to return to this guide." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction</strong><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete AI browser comparison instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary><div className={styles.result}><strong>Before you use the answer:</strong> open the source pages and check every quoted term. If a quote is missing or does not support the claim, leave that claim out of your decision.</div></section>
    </div>
    <section className={styles.related} aria-labelledby="browser-related-title"><div className={styles.relatedInner}><h2 id="browser-related-title">Keep reading</h2><div className={styles.relatedGrid}>{guide.related.filter(item => approvedGuideSlugs.includes(item.slug)).map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
