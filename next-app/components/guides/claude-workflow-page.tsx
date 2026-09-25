"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./claude-workflow-page.module.css";

const testChecks = [
  "I tried the instruction with one completed week of safe notes.",
  "I changed the instruction to fix anything Claude guessed or omitted.",
  "I tried a different week in a new conversation.",
  "Both results kept the same useful structure and left missing facts visible.",
] as const;

const practiceNotes = `Completed: Rewrote the booking confirmation email and tested it with 2 colleagues.
In progress: Updating the booking page.
Blocker: Waiting for the venue's opening hours. No owner or date has been agreed.
Decision needed: Should the booking page go live before the hours are confirmed?
Next week: Test the booking flow after the hours arrive.`;

export function ClaudeWorkflowPage({ guide }: { guide: GuidePage }) {
  const [wordLimit, setWordLimit] = useState("150");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [notesCopied, setNotesCopied] = useState(false);
  const [notesCopyError, setNotesCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const parts = guide.sections[0];
  if (parts.kind !== "cards" || !guide.tryNow) return null;
  const limit = Number(wordLimit);
  const readyToCopy = wordLimit.trim() !== "" && Number.isInteger(limit) && limit >= 50 && limit <= 500;
  const prompt = guide.tryNow.prompt.replace("[WORD LIMIT]", readyToCopy ? wordLimit.trim() : "[WORD LIMIT]");

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

  async function copyPracticeNotes() {
    try {
      await navigator.clipboard.writeText(practiceNotes);
      setNotesCopied(true);
      setNotesCopyError(false);
      window.setTimeout(() => setNotesCopied(false), 2000);
    } catch {
      setNotesCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Stop teaching Claude the same job <span>every week.</span></h1><p>Give it a repeatable method, test that method on two different weeks, then save the version that works.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="workflow-parts-title"><div className={styles.sectionHead}><span>One reusable method</span><h2 id="workflow-parts-title">Tell Claude four things</h2></div><div className={styles.parts}>{parts.items.map((item, index) => <div key={item.title}><span>{index + 1}</span><strong>{item.title}</strong><p>{item.body}</p></div>)}</div></section>

      <section className={styles.activity} aria-labelledby="workflow-prompt-title"><div className={styles.sectionHead}><span>Try a weekly update</span><h2 id="workflow-prompt-title">Copy the full instruction</h2></div><div className={styles.practice}><div className={styles.practiceHead}><h3>A completed week to practise with</h3><button type="button" onClick={copyPracticeNotes}>{notesCopied ? "Copied" : "Copy notes"}</button></div><pre>{practiceNotes}</pre><p>Claude should leave the missing owner and date under “Details to check”, not make them up.</p></div>{notesCopyError && <p className={styles.message} role="alert">Copy failed. Select the practice notes above instead.</p>}<label className={styles.limit}><span>Maximum words in the update</span><input type="number" min="50" max="500" value={wordLimit} onChange={event => setWordLimit(event.target.value)} /></label><p className={styles.intro}>Copy the instruction below, paste it into Claude, then add the practice notes. Later, replace them with safe notes from your own completed week.</p><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!readyToCopy} onClick={copyPrompt} aria-label="Copy the complete weekly update instruction">{copied ? "Copied" : "Copy"}</button></div>{!readyToCopy && <p className={styles.message}>Enter a whole-number limit from 50 to 500 words to unlock Copy.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>

      <section className={styles.activity} aria-labelledby="workflow-test-title"><div className={styles.sectionHead}><span>Before saving it</span><h2 id="workflow-test-title">Does it work a second time?</h2></div><div className={styles.testFlow}><span>Week 1</span><span aria-hidden="true">→</span><span>Repair the rule</span><span aria-hidden="true">→</span><span>Week 2</span></div><div className={styles.checks}>{testChecks.map((label, index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "The method passed two examples. Save the stable instruction in a Claude Project for this work, or as a Skill if you use that feature." : "Save the method after a second test, not after one good-looking answer."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="workflow-related-title"><div className={styles.relatedInner}><h2 id="workflow-related-title">Put the next repeatable job in place</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
