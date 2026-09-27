"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./gemini-tasks-page.module.css";

const demoTasks = [
  { title: "Review demo budget", list: "Demo project North" },
  { title: "Confirm demo venue", list: "Demo project North" },
  { title: "Approve demo headline", list: "Demo project South" },
] as const;

export function GeminiTasksPage({ guide }: { guide: GuidePage }) {
  const [open, setOpen] = useState<number[]>([0, 1, 2]);
  const [result, setResult] = useState<"all" | "missing-list" | "wrong-task" | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;

  async function copy() {
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
      <header className={styles.hero}><h1>Can Gemini see which Google Tasks list <span>a task is in?</span></h1><p>Use 3 pretend tasks in 2 lists. Ask Gemini for the list names, then compare its reply with Google Tasks.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>
      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#gemini-tasks-exercise-title">01 · Make two demo lists</a><a href="#gemini-tasks-request-title">02 · Ask Gemini</a><a href="#gemini-tasks-check-title">03 · Check the result</a></nav>
      <p className={styles.promise}>You will see if Gemini returns each task with the right project list, or if you should keep organising directly in Google Tasks.</p>

      <section className={styles.exercise} aria-labelledby="gemini-tasks-exercise-title"><div className={styles.sectionHead}><span>Try it without real work data</span><h2 id="gemini-tasks-exercise-title">See if the lists survive</h2></div><div className={styles.steps}>
        <div className={styles.step}><button type="button" aria-expanded={open.includes(0)} onClick={() => setOpen(current => current.includes(0) ? current.filter(value => value !== 0) : [...current, 0])}><span>1</span><strong>Make 2 lists and 3 tasks</strong><b aria-hidden="true">{open.includes(0) ? "−" : "+"}</b></button>{open.includes(0) && <div className={styles.stepBody}><p>Open Google Tasks. Create <strong>Demo project North</strong> and <strong>Demo project South</strong>, then add these tasks:</p><div className={styles.listDiagram}><div><strong>Demo project North</strong><span>Review demo budget</span><span>Confirm demo venue</span></div><div><strong>Demo project South</strong><span>Approve demo headline</span></div></div><a href="https://tasks.google.com/" target="_blank" rel="noopener noreferrer">Open Google Tasks ↗</a></div>}</div>
        <div className={styles.step}><button type="button" aria-expanded={open.includes(1)} onClick={() => setOpen(current => current.includes(1) ? current.filter(value => value !== 1) : [...current, 1])}><span>2</span><strong>Ask Gemini for the list</strong><b aria-hidden="true">{open.includes(1) ? "−" : "+"}</b></button>{open.includes(1) && <div className={styles.stepBody} id="gemini-tasks-request-title"><p>Open Gemini with the same Google account. Start a new chat and ask for your Google Tasks. If prompted, connect Google Workspace first. The request below asks for each task title, its list and any due date.</p><a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Open Gemini ↗</a><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the Google Tasks test request" guidePromise="Copy the exact request for your demo tasks and keep a link to this guide." actionLabel="Show me the request"><div className={styles.prompt}><strong>Complete instruction</strong><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copy} aria-label="Copy the complete Google Tasks instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></div>}</div>
        <div className={styles.step}><button type="button" aria-expanded={open.includes(2)} onClick={() => setOpen(current => current.includes(2) ? current.filter(value => value !== 2) : [...current, 2])}><span>3</span><strong>Compare all 3 rows</strong><b aria-hidden="true">{open.includes(2) ? "−" : "+"}</b></button>{open.includes(2) && <div className={styles.stepBody} id="gemini-tasks-check-title"><p>Keep Google Tasks open beside Gemini. Compare the titles, list names and any due dates with these three rows.</p><div className={styles.checks}>{demoTasks.map((task) => <div key={task.title}><span><strong>{task.title}</strong>{task.list}</span></div>)}</div><fieldset className={styles.resultChoices}><legend>What did Gemini show?</legend><button type="button" aria-pressed={result === "all"} onClick={() => setResult("all")}>All 3 match</button><button type="button" aria-pressed={result === "missing-list"} onClick={() => setResult("missing-list")}>A list is missing</button><button type="button" aria-pressed={result === "wrong-task"} onClick={() => setResult("wrong-task")}>A task is wrong</button></fieldset>{result && <p className={styles.checkResult} aria-live="polite">{result === "all" ? "The demo worked. Try a second set before using Gemini for real project tasks." : result === "missing-list" ? "Keep project organisation in Google Tasks. Gemini may find the task without giving you its list." : "Use Google Tasks to check and change the task. Do not move or delete real tasks from this reply."}</p>}</div>}</div>
      </div></section>
      <p className={styles.finish}><strong>What did you learn?</strong> If the lists are missing or a task is wrong, use Google Tasks itself to organise your projects. Delete the two demo lists and their tasks when you finish.</p>
    </div>
    <section className={styles.related} aria-labelledby="gemini-tasks-related-title"><div className={styles.relatedInner}><h2 id="gemini-tasks-related-title">Check the next connected task</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
