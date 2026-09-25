"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./short-answer-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function ShortAnswerPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
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
      <header className={styles.hero}><h1>Why does ChatGPT keep giving you <span>an essay?</span></h1><p>Give it a finish line you can count. Try the example, then check if the shorter answer still contains what you need.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.compare} aria-labelledby="short-compare-title"><div className={styles.sectionHead}><span>Start with the instruction</span><h2 id="short-compare-title">Make “short” something you can check</h2></div><div className={styles.compareGrid}>{compare.rows.map((row, index) => <div className={styles.compareOption} key={row[0]}><button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{row[0]}</span><GuideIcon name="route" /></button>{selected === index && <div className={styles.compareResult} aria-live="polite"><strong>Try this instead</strong><p>{row[1]}</p></div>}</div>)}</div></section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="short-action-title"><div className={styles.sectionHead}><span>Try the worked example</span><h2 id="short-action-title">Ask for a meeting brief, not an essay</h2></div><p className={styles.exampleIntro}>Start with the fictional project in this prompt. Once you see the result, replace its facts with a task from your own work.</p><ol className={styles.quickSteps}><li><span className={styles.stepNumber} aria-hidden="true">1</span><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a> and start a new chat.</li><li><span className={styles.stepNumber} aria-hidden="true">2</span>Copy the full prompt below and paste it into the message box.</li><li><span className={styles.stepNumber} aria-hidden="true">3</span>Send it, then check the answer against the limits.</li></ol><div className={styles.prompt}><details><summary>View the complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p role="alert">Copy failed. Open the complete prompt and select the text instead.</p>}</section>}

      <section className={styles.check} aria-labelledby="short-check-title"><div className={styles.sectionHead}><span>Check the answer yourself</span><h2 id="short-check-title">Did it give you something usable?</h2></div><div className={styles.checkList}>{checkSection.items.map((item, index) => <label key={item.title}><input type="checkbox" checked={checks[index] ?? false} onChange={() => setChecks(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{item.title}</strong><span><Text value={item.body} /></span></span></label>)}</div><p className={styles.checkResult} aria-live="polite">{checks.every(Boolean) ? "You marked all four checks. Keep the rule only if the ChatGPT answer really meets them." : `${checks.filter(Boolean).length} of 4 checks marked. Compare the answer with the prompt before you use it.`}</p></section>

      <p className={styles.finish}><strong>Reuse the limit, not the topic.</strong> Tell ChatGPT how many parts you need, how long the whole answer can be and what it should leave out.</p>
    </div>
    <section className={styles.related} aria-labelledby="short-related-title"><div className={styles.relatedInner}><h2 id="short-related-title">Make the next answer easier to use</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
