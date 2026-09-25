"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./kimi-code-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function KimiCodePage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [file, setFile] = useState("index.html");
  const [before, setBefore] = useState("Welcome");
  const [after, setAfter] = useState("Start here");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const contentRef = useRef<HTMLDivElement>(null);
  const instructions = guide.sections[0];
  const stopSection = guide.sections[1];
  if (instructions.kind !== "steps" || stopSection.kind !== "cards" || !guide.tryNow) return null;
  const prompt = guide.tryNow.prompt
    .replace("[FILE PATH]", () => file.trim())
    .replace("[CURRENT VISIBLE WORDING]", () => before.trim())
    .replace("[NEW VISIBLE WORDING]", () => after.trim());
  const ready = [file, before, after].every(value => value.trim().length > 0) && before.trim() !== after.trim();

  function goTo(next: number) {
    setStep(next);
    window.requestAnimationFrame(() => contentRef.current?.focus());
  }

  async function copyPrompt() {
    if (!ready) return;
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
      <header className={styles.hero}><h1>Asked Kimi for one change? <span>Keep it to one file.</span></h1><p>Plan first. Check the diff before you keep what the coding agent changed.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.stageNav} aria-label="Guide steps">{instructions.steps.map((item, index) => <button key={item.title} type="button" aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setShowAll(false); goTo(index); }}><span>{index + 1}</span>{item.title}</button>)}</nav>
      <button type="button" className={styles.allButton} aria-pressed={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Show one step" : "Read all steps"}</button>
      <div ref={contentRef} tabIndex={-1} className={styles.stageContent}>
        {instructions.steps.map((item, index) => (showAll || step === index) && <section key={item.title} className={styles.activity} aria-labelledby={`kimi-code-step-${index}`}><div className={styles.sectionHead}><span>Step {index + 1} / 4</span><h2 id={`kimi-code-step-${index}`}>{item.title}</h2></div><p><Text value={item.body} /></p>
          {index === 0 && <><div className={styles.scopeMap} aria-label="One-file practice example"><div><span>Practice file</span><strong>index.html</strong></div><div><span>Visible wording</span><strong>Welcome → Start here</strong></div><div><span>Keep out</span><strong>Every other file</strong></div></div><p><a className={styles.toolLink} href="https://www.kimi.com/code/" target="_blank" rel="noopener noreferrer">Open Kimi Code ↗</a> Start with a project you can restore.</p></>}
          {index === 1 && <><p>Try the same small example or replace the three fields for a practice project. The complete instruction is ready to copy.</p><div className={styles.fields}><label><span>File path</span><input value={file} onChange={event => setFile(event.target.value)} /></label><label><span>Current wording</span><input value={before} onChange={event => setBefore(event.target.value)} /></label><label><span>New wording</span><input value={after} onChange={event => setAfter(event.target.value)} /></label></div><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete Kimi Code instruction">{copied ? "Copied" : "Copy"}</button></div>{!ready && <p className={styles.message}>Add a file and two different wordings before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</>}
          {index === 2 && <div className={styles.planCheck}><strong>Approve only if the plan says:</strong><ul><li>one named file;</li><li>one visible wording change;</li><li>one way to check the result.</li></ul></div>}
          {index === 3 && <><div className={styles.stopGrid}>{stopSection.items.map(stop => <article key={stop.title}><strong>{stop.title}</strong><p>{stop.body}</p></article>)}</div><div className={styles.checks}>{["Only the requested file changed.", "The visible wording matches the request.", "No unrequested command or dependency was added."].map((label, checkIndex) => <label key={label}><input type="checkbox" checked={checked[checkIndex] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === checkIndex ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All checks marked. Keep the change only if the diff shows exactly this." : `${checked.filter(Boolean).length} of 3 checks marked. Undo or revise anything outside the one-file request.`}</p></>}
        </section>)}
      </div>
      {!showAll && <div className={styles.nextBar}>{step > 0 && <button type="button" onClick={() => goTo(step - 1)}>← Back</button>}{step < 3 && <button type="button" onClick={() => goTo(step + 1)}>Next: {instructions.steps[step + 1].title} →</button>}</div>}
    </div>
    <section className={styles.related} aria-labelledby="kimi-code-related-title"><div className={styles.relatedInner}><h2 id="kimi-code-related-title">Keep the next AI change under control</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
