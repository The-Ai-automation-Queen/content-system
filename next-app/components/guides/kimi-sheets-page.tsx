"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./kimi-sheets-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function KimiSheetsPage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const contentRef = useRef<HTMLDivElement>(null);
  const instructions = guide.sections[0];
  const stopSection = guide.sections[1];
  if (instructions.kind !== "steps" || stopSection.kind !== "cards" || !guide.tryNow) return null;
  const prompt = guide.tryNow.prompt;

  function goTo(next: number) {
    setStep(next);
    window.requestAnimationFrame(() => contentRef.current?.focus());
  }

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
      <header className={styles.hero}><h1>Too many tasks in too many places? <span>Make one tracker with Kimi.</span></h1><p>Give Kimi 3 sample tasks. Leave with an Excel file you can check and reuse.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.stageNav} aria-label="Guide steps">{instructions.steps.map((item, index) => <button key={item.title} type="button" aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setShowAll(false); goTo(index); }}><span>{index + 1}</span>{item.title}</button>)}</nav>
      <button type="button" className={styles.allButton} aria-pressed={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Show one step" : "Read all steps"}</button>
      <div ref={contentRef} tabIndex={-1} className={styles.stageContent}>
        {instructions.steps.map((item, index) => (showAll || step === index) && <section key={item.title} className={styles.activity} aria-labelledby={`kimi-sheets-step-${index}`}><div className={styles.sectionHead}><span>Step {index + 1} / 4</span><h2 id={`kimi-sheets-step-${index}`}>{item.title}</h2></div><p><Text value={item.body} /></p>
          {index === 0 && <><div className={styles.scopeMap} aria-label="What you will make"><div><span>Input</span><strong>3 sample tasks</strong></div><div><span>Kimi makes</span><strong>An editable tracker</strong></div><div><span>You keep</span><strong>An Excel file</strong></div></div><p>For example, put “Send the agenda”, “Check the figures” and “Review the draft” on separate rows, each with a due date and status. Mark one Done and check that it no longer appears overdue.</p><p><a className={styles.toolLink} href="https://www.kimi.com/en/sheets" target="_blank" rel="noopener noreferrer">Open Kimi Sheets ↗</a> This is Kimi's spreadsheet tool in your browser.</p></>}
          {index === 1 && <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} heading="Get the tracker instruction" guidePromise="Copy the full Kimi Sheets instruction for the three sample tasks, then check the file it makes." actionLabel="Show the instruction" variant="unlock"><p>The example is ready to use. Click <strong>Copy</strong>, paste it into Kimi Sheets and send it.</p><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Kimi Sheets instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select and copy the instruction instead.</p>}</GuideAccessBoundary>}
          {index === 2 && <div className={styles.planCheck}><strong>Check these in Kimi's preview:</strong><ul><li>3 sample tasks, each on its own row;</li><li>dates that behave like dates, not plain words;</li><li>status options and an Overdue result that changes when a task is Done.</li></ul><p>If a part is missing, tell Kimi exactly which one to repair.</p></div>}
          {index === 3 && <><div className={styles.stopGrid}>{stopSection.items.map(stop => <article key={stop.title}><strong>{stop.title}</strong><p>{stop.body}</p></article>)}</div><div className={styles.checks}>{["The downloaded file has all 3 sample tasks.", "I can change a task's status.", "A task marked Done is not flagged overdue."].map((label, checkIndex) => <label key={label}><input type="checkbox" checked={checked[checkIndex] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === checkIndex ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "The sample tracker passed your checks. Replace the sample rows only with work data you are allowed to use." : `${checked.filter(Boolean).length} of 3 checks marked. Fix any missing part before using this for work.`}</p></>}
        </section>)}
      </div>
      {!showAll && <div className={styles.nextBar}>{step > 0 && <button type="button" onClick={() => goTo(step - 1)}>← Back</button>}{step < 3 && <button type="button" onClick={() => goTo(step + 1)}>Next: {instructions.steps[step + 1].title} →</button>}</div>}
    </div>
    <section className={styles.related} aria-labelledby="kimi-related-title"><div className={styles.relatedInner}><h2 id="kimi-related-title">Make the tracker useful at work</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
