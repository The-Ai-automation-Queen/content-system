"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./claude-task-page.module.css";

export function ClaudeTaskPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState("");
  const series = guide.series;
  if (!series || series.part !== 1) return null;

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 2000);
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Get one useful thing <span>done with Claude</span></h1><p>Pick a task from your working day. Start with the complete example, then swap in your own details.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.tasks} aria-labelledby="claude-task-title"><div className={styles.sectionHead}><span>Choose one task</span><h2 id="claude-task-title">What would help you today?</h2></div><div className={styles.taskList}>{series.tasks.map((task, index) => <div className={styles.taskItem} key={task.id}><button type="button" aria-expanded={selected === index} onClick={() => setSelected(index)}><span className={styles.taskNumber}>{index + 1}</span><span><strong>{task.title}</strong><small>{task.outcome}</small></span><span className={styles.chevron} aria-hidden="true">{selected === index ? "−" : "+"}</span></button>{selected === index && <div className={styles.taskContent}><p><strong>The example:</strong> {task.example}</p><ol><li><a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Open Claude ↗</a> and start a new chat.</li><li>Copy the complete instruction below, paste it into Claude and send it.</li><li>Compare Claude’s reply with the check below before using it.</li></ol><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{task.prompt}</pre></details><button type="button" onClick={() => copy(task.prompt, task.id)} aria-label={`Copy the complete instruction for ${task.title}`}>{copied === task.id ? "Copied" : "Copy"}</button></div><div className={styles.result}><strong>Check the reply</strong><p>{task.result}</p></div></div>}</div>)}</div></section>

      <section className={styles.fix} aria-labelledby="claude-fix-title"><div className={styles.sectionHead}><span>If Claude missed something</span><h2 id="claude-fix-title">Correct one line, not the whole answer</h2></div><p>Point to the line and give the missing fact. Keep the rest of the answer.</p><div className={styles.prompt}><details><summary>View the correction instruction</summary><pre>{series.correction}</pre></details><button type="button" onClick={() => copy(series.correction, "correction")} aria-label="Copy the correction instruction">{copied === "correction" ? "Copied" : "Copy"}</button></div></section>

      <p className={styles.finish}><strong>Keep the instruction that helped.</strong> Next time, replace the example with your own non-confidential material and check the same result.</p>
      {guide.workshopInvitation && <p className={styles.workshop}>{guide.workshopInvitation.body}</p>}
    </div>
    <section className={styles.related} aria-labelledby="claude-related-title"><div className={styles.relatedInner}><h2 id="claude-related-title">Keep the task moving</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
