"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./gemini-tasks-page.module.css";

const demoTasks = [
  { title: "Review demo budget", list: "Demo project North" },
  { title: "Confirm demo venue", list: "Demo project North" },
  { title: "Approve demo headline", list: "Demo project South" },
] as const;

export function GeminiTasksPage({ guide }: { guide: GuidePage }) {
  const [open, setOpen] = useState(0);
  const [marked, setMarked] = useState<boolean[]>([false, false, false]);
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
      <header className={styles.hero}><h1>Can Gemini organise Google Tasks <span>by project?</span></h1><p>Use 3 pretend tasks in 2 lists. Ask Gemini for the list names, then compare its reply with Google Tasks.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.exercise} aria-labelledby="gemini-tasks-exercise-title"><div className={styles.sectionHead}><span>Try it without real work data</span><h2 id="gemini-tasks-exercise-title">See if the lists survive</h2></div><div className={styles.steps}>
        <div className={styles.step}><button type="button" aria-expanded={open === 0} onClick={() => setOpen(open === 0 ? -1 : 0)}><span>1</span><strong>Make 2 lists and 3 tasks</strong><b aria-hidden="true">{open === 0 ? "−" : "+"}</b></button>{open === 0 && <div className={styles.stepBody}><p>Open Google Tasks. Create <strong>Demo project North</strong> and <strong>Demo project South</strong>, then add these tasks:</p><div className={styles.listDiagram}><div><strong>Demo project North</strong><span>Review demo budget</span><span>Confirm demo venue</span></div><div><strong>Demo project South</strong><span>Approve demo headline</span></div></div><a href="https://tasks.google.com/" target="_blank" rel="noopener noreferrer">Open Google Tasks ↗</a></div>}</div>
        <div className={styles.step}><button type="button" aria-expanded={open === 1} onClick={() => setOpen(open === 1 ? -1 : 1)}><span>2</span><strong>Ask Gemini for the list</strong><b aria-hidden="true">{open === 1 ? "−" : "+"}</b></button>{open === 1 && <div className={styles.stepBody}><p>Open Gemini with the same Google account. Start a new chat, select <strong>@Google Tasks</strong>, then paste and send this instruction. If prompted, connect Google Workspace first.</p><a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Open Gemini ↗</a><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copy} aria-label="Copy the complete Google Tasks instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p role="alert">Copy failed. Open the instruction and select the text instead.</p>}</div>}</div>
        <div className={styles.step}><button type="button" aria-expanded={open === 2} onClick={() => setOpen(open === 2 ? -1 : 2)}><span>3</span><strong>Compare all 3 rows</strong><b aria-hidden="true">{open === 2 ? "−" : "+"}</b></button>{open === 2 && <div className={styles.stepBody}><p>Keep Google Tasks open beside Gemini. Mark each row only if the task title and list both match. Check any due date too.</p><div className={styles.checks}>{demoTasks.map((task, index) => <label key={task.title}><input type="checkbox" checked={marked[index] ?? false} onChange={() => setMarked(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{task.title}</strong>{task.list}</span></label>)}</div><p className={styles.checkResult} aria-live="polite">{marked.every(Boolean) ? "You marked all 3 rows. Use Gemini for this only if its reply really shows the right lists." : `${marked.filter(Boolean).length} of 3 rows marked. If a list is missing, keep project organisation in Google Tasks.`}</p></div>}</div>
      </div></section>
      <p className={styles.finish}><strong>What did you learn?</strong> If the lists are missing or a task is wrong, use Google Tasks itself to organise your projects. Delete the two demo lists and their tasks when you finish.</p>
    </div>
    <section className={styles.related} aria-labelledby="gemini-tasks-related-title"><div className={styles.relatedInner}><h2 id="gemini-tasks-related-title">Check the next connected task</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
