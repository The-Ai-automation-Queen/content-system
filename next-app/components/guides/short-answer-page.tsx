"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./short-answer-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function ShortAnswerPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const compare = guide.sections[0];
  const checkSection = guide.sections[1];
  if (compare.kind !== "comparison" || checkSection.kind !== "cards") return null;

  async function copyPrompt() {
    if (!guide.tryNow) return;
    try {
      await navigator.clipboard.writeText(guide.tryNow.prompt);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Why does ChatGPT keep giving you <span>an essay?</span></h1><p>Ask for the exact parts you need and set a length limit. Then check that the shorter answer still has the facts.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#short-compare-title">01 · Set the limit</a><a href="#short-example-title">02 · See the difference</a><a href="#short-access-title">03 · Try the full prompt</a><a href="#short-check-title">04 · Check the answer</a></nav>
      <p className={styles.promise}>See one short meeting update, then use the same approach for your own work.</p>

      <section className={styles.compare} aria-labelledby="short-compare-title"><div className={styles.sectionHead}><span>Start with the request</span><h2 id="short-compare-title">Tell ChatGPT what “short” means here</h2></div><div className={styles.compareGrid}>{compare.rows.map((row, index) => <div className={styles.compareOption} key={row[0]}><button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{row[0]}</span><GuideIcon name="route" /></button>{selected === index && <div className={styles.compareResult} aria-live="polite"><strong>Try this instead</strong><p>{row[1]}</p></div>}</div>)}</div></section>

      <section className={styles.workedExample} aria-labelledby="short-example-title"><div className={styles.sectionHead}><span>See the difference</span><h2 id="short-example-title">Shorter is useful only if it stays true</h2></div><p>You need a quick update on an onboarding checklist. These are the only facts you have:</p><ul className={styles.exampleFacts}><li>The draft is ready.</li><li>Team leads have not reviewed it.</li><li>No publication date has been agreed.</li></ul><div className={styles.exampleContrast}><div><strong>Too confident</strong><p>“The checklist is ready to publish soon.”</p><span>That adds an approval and a timeline you do not have.</span></div><div><strong>Short and accurate</strong><p>“The draft is ready. Team lead review and a publication date are still open.”</p><span>Each statement matches the facts above.</span></div></div><p>The complete prompt asks for three labeled bullets in 60 words or fewer. It also tells ChatGPT not to invent an approval, owner or date.</p></section>

      <div id="short-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the complete ChatGPT prompt" guidePromise="Get a ready-to-copy request, a short check for the answer and a link back to this guide." actionLabel="Show me the prompt and checks">

      {guide.tryNow && <section className={styles.action} aria-labelledby="short-action-title"><div className={styles.sectionHead}><span>Try the worked example</span><h2 id="short-action-title">Ask for a meeting update, not an essay</h2></div><p className={styles.exampleIntro}>Start with the fictional project in this prompt. Once you see the result, replace its facts with a task from your own work.</p><ol className={styles.quickSteps}><li><span className={styles.stepNumber} aria-hidden="true">1</span><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a> and start a new chat.</li><li><span className={styles.stepNumber} aria-hidden="true">2</span>Copy the full prompt below and paste it into the message box.</li><li><span className={styles.stepNumber} aria-hidden="true">3</span>Send it, then check the answer against the three facts.</li></ol><div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p role="alert">Copy failed. Select the visible prompt text instead.</p>}</section>}

      <section className={styles.check} aria-labelledby="short-check-title"><div className={styles.sectionHead}><span>Check the answer yourself</span><h2 id="short-check-title">Did it give you something usable?</h2></div><ol className={styles.checkList}>{checkSection.items.map((item, index) => <li key={item.title}><span className={styles.checkNumber}>{String(index + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><span><Text value={item.body} /></span></span></li>)}</ol></section>

      <p className={styles.finish}><strong>Use this for your next long answer.</strong> Name the parts you need, set a length limit and check the facts before you share it.</p>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="short-related-title"><div className={styles.relatedInner}><h2 id="short-related-title">Make the next answer easier to use</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
