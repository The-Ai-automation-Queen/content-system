"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./claude-task-page.module.css";

export function ClaudeTaskPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [correctionMode, setCorrectionMode] = useState<"example" | "own">("example");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const series = guide.series;
  if (!series || series.part !== 1) return null;
  const activeTask = series.tasks[selected];
  const workedCorrection = series.correction
    .replace("[paste it]", `“${activeTask.wrongLine}”`)
    .replace("[paste the correction]", activeTask.correctionFact);
  const correctionText = correctionMode === "example" ? workedCorrection : series.correction;

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

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Get one useful thing <span>done with Claude</span></h1><p>Pick a task from your working day. Start with the complete example, then swap in your own details.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#claude-task-title">01 · Pick a task</a><a href="#claude-example-title">02 · See the example</a><a href="#claude-access-title">03 · Copy and check</a></nav>
      <p className={styles.promise}>You will finish one small task in Claude and know exactly what to check before using its answer.</p>

      <section className={styles.tasks} aria-labelledby="claude-task-title"><div className={styles.sectionHead}><span>Choose one task</span><h2 id="claude-task-title">What would help you today?</h2></div><div className={styles.taskList}>{series.tasks.map((task, index) => <div className={styles.taskItem} key={task.id}><button type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); setCorrectionMode("example"); setCopied(""); setCopyError(""); }}><span className={styles.taskNumber}>{index + 1}</span><span><strong>{task.title}</strong><small>{task.outcome}</small></span><span className={styles.chevron} aria-hidden="true">{selected === index ? "✓" : "+"}</span></button></div>)}</div></section>

      <section className={styles.publicExample} aria-labelledby="claude-example-title"><div className={styles.sectionHead}><span>See the result first</span><h2 id="claude-example-title">{activeTask.title}</h2></div><p>{activeTask.example}</p><div className={styles.result}><strong>What to look for</strong><p>{activeTask.result}</p></div><p>That is your check. The instruction below shows Claude the facts and the format; you still compare its answer with the original.</p></section>

      <div id="claude-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the complete Claude example" guidePromise="Get the full instruction for your selected task, a correction prompt and a link back to this guide." actionLabel="Show me the instruction">

      <section className={styles.taskContent} aria-labelledby="claude-instruction-title"><div className={styles.sectionHead}><span>Try it in Claude</span><h2 id="claude-instruction-title">Use the complete example</h2></div><ol><li><a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Open Claude ↗</a> and start a new chat.</li><li>Copy the instruction below, paste it into Claude and send it.</li><li>Check Claude’s reply against the result above before using it.</li></ol><div className={styles.prompt}><pre>{activeTask.prompt}</pre><button type="button" onClick={() => copy(activeTask.prompt, activeTask.id)} aria-label={`Copy the complete instruction for ${activeTask.title}`}>{copied === activeTask.id ? "Copied" : "Copy"}</button></div>{copyError === activeTask.id && <p role="alert">Copy failed. Select the visible instruction text instead.</p>}</section>

      <section className={styles.fix} aria-labelledby="claude-fix-title"><div className={styles.sectionHead}><span>If Claude missed something</span><h2 id="claude-fix-title">Correct one line, not the whole answer</h2></div><p>Start with the worked example for the selected task. Then replace the wrong line and the correct fact with yours.</p><div className={styles.correctionSwitch} role="group" aria-label="Correction instruction view"><button type="button" aria-pressed={correctionMode === "example"} onClick={() => { setCorrectionMode("example"); setCopied(""); setCopyError(""); }}>Worked example</button><button type="button" aria-pressed={correctionMode === "own"} onClick={() => { setCorrectionMode("own"); setCopied(""); setCopyError(""); }}>Make it mine</button></div><div className={styles.prompt}><pre>{correctionText}</pre><button type="button" onClick={() => copy(correctionText, "correction")} aria-label="Copy the correction instruction">{copied === "correction" ? "Copied" : "Copy"}</button></div>{copyError === "correction" && <p role="alert">Copy failed. Select the visible correction instruction instead.</p>}<p className={styles.recheck}>Compare the revised reply with the original. Keep it only if the corrected line is right and the other facts still match.</p></section>

      <p className={styles.finish}><strong>Keep the instruction that helped.</strong> Next time, replace the example with your own non-confidential material and check the same result.</p>
      {guide.workshopInvitation && <p className={styles.workshop}>{guide.workshopInvitation.body}</p>}
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="claude-related-title"><div className={styles.relatedInner}><h2 id="claude-related-title">Keep the task moving</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
