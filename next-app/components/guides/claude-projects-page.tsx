"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./claude-projects-page.module.css";

const stages = ["Create a Project", "Save the instructions", "Try new notes", "Check the follow-up"] as const;
const checks = [
  { title: "Decision", detail: "Try shorter weekly meetings for 2 weeks." },
  { title: "Action", detail: "Alex sends the new agenda by Friday." },
  { title: "Still open", detail: "The feedback owner and deadline are not agreed." },
  { title: "Suggestion", detail: "Recording the meetings is not an agreed decision." },
] as const;

export function ClaudeProjectsPage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(1);
  const [showAll, setShowAll] = useState(true);
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const series = guide.series;
  if (!series || series.part !== 2) return null;

  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setCopyError("");
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopyError(key);
    }
  }

  function prompt(value: string, key: string, label: string) {
    return <><div className={styles.prompt}><pre>{value}</pre><button type="button" onClick={() => copy(value, key)} aria-label={`Copy the complete ${label}`}>{copied === key ? "Copied" : "Copy"}</button></div>{copyError === key && <p role="alert">Copy failed. Select the visible {label} text instead.</p>}</>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Stop repeating your instructions <span>to Claude</span></h1><p>Save the format once in a Project. Give Claude fresh notes each time and check what it calls a decision.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#claude-project-result-title">01 · See the follow-up</a><a href="#claude-project-first-step">02 · Create a Project</a><a href="#claude-project-access-title">03 · Save and test the instruction</a></nav>
      <p className={styles.promise}>You will have a reusable format for meeting follow-ups and a sample you can check against the original notes.</p>

      <section className={styles.preview} aria-labelledby="claude-project-result-title"><div className={styles.sectionHead}><span>The result you are building</span><h2 id="claude-project-result-title">One follow-up you can check</h2></div><p>Imagine a team agrees to test shorter meetings. They assign Alex the agenda, but leave the feedback owner open. The follow-up must keep those differences clear.</p><div className={styles.resultGrid}><div><strong>Decided</strong><p>Test shorter weekly meetings for 2 weeks.</p></div><div><strong>Assigned</strong><p>Alex sends the agenda by Friday.</p></div><div><strong>Not agreed</strong><p>Who collects feedback and when?</p></div></div><p>Recording was only suggested. It must not appear under decisions.</p></section>

      <section className={styles.firstStep} aria-labelledby="claude-project-first-step"><div className={styles.sectionHead}><span>Start in Claude</span><h2 id="claude-project-first-step">Create a test Project</h2></div><p>Open <a href="https://claude.ai/projects" target="_blank" rel="noopener noreferrer">Claude Projects ↗</a>, select <strong>+ New Project</strong> and call it <strong>Meeting follow-ups</strong>. Keep it private for this invented example. You do not need to upload files.</p></section>

      <div id="claude-project-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the reusable meeting instruction" guidePromise="Get the complete Project instruction, practice notes and a link back to this guide." actionLabel="Show me the instructions">

      <section className={styles.walkthrough} aria-labelledby="claude-project-steps-title"><div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Finish the setup</span><h2 id="claude-project-steps-title">Save, try, check</h2></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button></div><nav className={styles.stepNav} aria-label="Claude Project steps">{stages.slice(1).map((title, offset) => { const index = offset + 1; return <button type="button" key={title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setStep(index); setShowAll(false); }}><span>{index + 1}</span><strong>{title}</strong></button>; })}</nav>
        <div hidden={!showAll && step !== 1}><article className={styles.stage}><span>Step 2 / 4</span><h3>Save the instructions</h3><p>Inside the Project, select <strong>Set project instructions</strong>. Paste the instruction below and select <strong>Save instructions</strong>.</p>{prompt(series.instructions, "instructions", "Project instruction")}</article></div>
        <div hidden={!showAll && step !== 2}><article className={styles.stage}><span>Step 3 / 4</span><h3>Try new notes</h3><p>Start a new chat inside the Project. Paste these invented meeting notes, then send them.</p>{prompt(series.exercise, "exercise", "meeting-note example")}</article></div>
        <div hidden={!showAll && step !== 3}><article className={styles.stage}><span>Step 4 / 4</span><h3>Check the follow-up</h3><p>Compare the reply with these four facts from the notes. If any one is wrong, correct the Project instruction before using it again.</p><div className={styles.checks}>{checks.map((item) => <div key={item.title}><span><strong>{item.title}</strong>{item.detail}</span></div>)}</div></article></div>
        {!showAll && <div className={styles.actions}><button type="button" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>Back</button><button type="button" disabled={step === stages.length - 1} onClick={() => setStep(Math.min(stages.length - 1, step + 1))}>Next step</button></div>}
      </section>
      <p className={styles.finish}><strong>Try the next meeting without repeating the format.</strong> If Claude keeps the headings and separates decisions from suggestions, the saved instruction is doing its job.</p>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="claude-project-related-title"><div className={styles.relatedInner}><h2 id="claude-project-related-title">Give Claude another useful job</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
