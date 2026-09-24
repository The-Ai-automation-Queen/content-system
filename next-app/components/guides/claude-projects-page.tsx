"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./claude-projects-page.module.css";

const stages = ["Create a Project", "Save the instructions", "Try new notes", "Check the follow-up"] as const;
const checks = [
  { title: "Decision", detail: "Try shorter weekly meetings for 2 weeks." },
  { title: "Action", detail: "Alex sends the new agenda by Friday." },
  { title: "Still open", detail: "The feedback owner and deadline are not agreed." },
  { title: "Suggestion", detail: "Recording the meetings is not an agreed decision." },
] as const;

export function ClaudeProjectsPage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [marked, setMarked] = useState<boolean[]>([false, false, false, false]);
  const [copied, setCopied] = useState("");
  const series = guide.series;
  if (!series || series.part !== 2) return null;

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 2000);
  }

  function prompt(value: string, key: string, label: string) {
    return <div className={styles.prompt}><details><summary>View the complete {label}</summary><pre>{value}</pre></details><button type="button" onClick={() => copy(value, key)} aria-label={`Copy the complete ${label}`}>{copied === key ? "Copied" : "Copy"}</button></div>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Stop repeating your instructions <span>to Claude</span></h1><p>Save the format once in a Project. Give Claude fresh notes each time and check what it calls a decision.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.preview} aria-labelledby="claude-project-result-title"><div className={styles.sectionHead}><span>The result you are building</span><h2 id="claude-project-result-title">One follow-up you can check</h2></div><div className={styles.resultGrid}><div><strong>Decided</strong><p>Test shorter weekly meetings for 2 weeks.</p></div><div><strong>Assigned</strong><p>Alex sends the agenda by Friday.</p></div><div><strong>Not agreed</strong><p>Who collects feedback and when?</p></div></div></section>

      <section className={styles.walkthrough} aria-labelledby="claude-project-steps-title"><div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Build it in Claude</span><h2 id="claude-project-steps-title">Four short steps</h2></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button></div><nav className={styles.stepNav} aria-label="Claude Project steps">{stages.map((title, index) => <button type="button" key={title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setStep(index); setShowAll(false); }}><span>{index + 1}</span><strong>{title}</strong></button>)}</nav>
        <div hidden={!showAll && step !== 0}><article className={styles.stage}><span>Step 1 / 4</span><h3>Create a Project</h3><p>Open Claude’s Projects page. Select <strong>+ New Project</strong> and name it <strong>Meeting follow-ups</strong>.</p><a href="https://claude.ai/projects" target="_blank" rel="noopener noreferrer">Open Claude Projects ↗</a></article></div>
        <div hidden={!showAll && step !== 1}><article className={styles.stage}><span>Step 2 / 4</span><h3>Save the instructions</h3><p>Inside the Project, select <strong>Set project instructions</strong>. Paste the instruction below and select <strong>Save instructions</strong>.</p>{prompt(series.instructions, "instructions", "Project instruction")}</article></div>
        <div hidden={!showAll && step !== 2}><article className={styles.stage}><span>Step 3 / 4</span><h3>Try new notes</h3><p>Start a new chat inside the Project. Paste these invented meeting notes, then send them.</p>{prompt(series.exercise, "exercise", "meeting-note example")}</article></div>
        <div hidden={!showAll && step !== 3}><article className={styles.stage}><span>Step 4 / 4</span><h3>Check the follow-up</h3><p>Read Claude’s reply and mark only the points it got right.</p><div className={styles.checks}>{checks.map((item, index) => <label key={item.title}><input type="checkbox" checked={marked[index] ?? false} onChange={() => setMarked(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{item.title}</strong>{item.detail}</span></label>)}</div><p className={styles.checkResult} aria-live="polite">{marked.every(Boolean) ? "You marked all four. Keep the Project instruction only if the reply really matches the notes." : `${marked.filter(Boolean).length} of 4 points marked. Compare each one with the notes before relying on it.`}</p></article></div>
        {!showAll && <div className={styles.actions}><button type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button><button type="button" disabled={step === stages.length - 1} onClick={() => setStep(Math.min(stages.length - 1, step + 1))}>Next step</button></div>}
      </section>
      <p className={styles.finish}><strong>Try the next meeting without repeating the format.</strong> If Claude keeps the headings and separates decisions from suggestions, the saved instruction is doing its job.</p>
      {guide.workshopInvitation && <p className={styles.workshop}>{guide.workshopInvitation.body}</p>}
    </div>
    <section className={styles.related} aria-labelledby="claude-project-related-title"><div className={styles.relatedInner}><h2 id="claude-project-related-title">Give Claude another useful job</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
