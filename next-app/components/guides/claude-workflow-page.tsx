"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./claude-workflow-page.module.css";

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
  const parts = guide.sections[0];
  if (parts.kind !== "cards" || !guide.tryNow) return null;
  const limit = Number(wordLimit);
  const readyToCopy = wordLimit.trim() !== "" && Number.isInteger(limit) && limit >= 50 && limit <= 500;
  const prompt = guide.tryNow.prompt.replace("[WORD LIMIT]", readyToCopy ? wordLimit.trim() : "150");
  const related = publicGuides.filter(item => ["what-is-ai", "what-should-you-never-share-with-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>Stop explaining the same weekly task to Claude. <span>Save a method that works.</span></h1><p>Build one instruction for a weekly update, test it on two different weeks, then save the working version in a Claude Project.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#workflow-parts-title">Describe the job</a><a href="#workflow-example-title">See an example</a><a href="#workflow-prompt-title">Get the instruction</a><a href="#workflow-test-title">Test and save it</a></nav>

      <section className={styles.activity} aria-labelledby="workflow-parts-title"><div className={styles.sectionHead}><span>01 · Describe the job</span><h2 id="workflow-parts-title">Give Claude the rules once</h2></div><p className={styles.intro}>A reusable instruction says what you will provide, what Claude should do with it, what the answer should look like and what it must leave for you to decide.</p><div className={styles.parts}>{parts.items.map((item, index) => <div key={item.title}><span>{index + 1}</span><strong>{item.title}</strong><p>{item.body}</p></div>)}</div></section>

      <section className={styles.activity} aria-labelledby="workflow-example-title"><div className={styles.sectionHead}><span>02 · See it in action</span><h2 id="workflow-example-title">A weekly update with a missing fact</h2></div><p className={styles.intro}>Here are safe sample notes. The opening hours have no confirmed owner or date. A useful draft keeps that gap visible instead of making up a deadline.</p><div className={styles.practice}><div className={styles.practiceHead}><h3>Sample notes</h3><button type="button" onClick={copyPracticeNotes}>{notesCopied ? "Copied" : "Copy notes"}</button></div><pre>{practiceNotes}</pre></div>{notesCopyError && <p className={styles.message} role="alert">Copy failed. Select the sample notes instead.</p>}<div className={styles.exampleResult}><strong>What the answer should show</strong><p><b>Completed:</b> Booking email rewritten and tested with two colleagues.</p><p><b>Blocker:</b> Opening hours are missing. Owner and date: not provided.</p><p><b>Decision:</b> Should the page go live before the hours are confirmed?</p></div></section>

      <section className={styles.activity} aria-labelledby="workflow-prompt-title"><div className={styles.sectionHead}><span>03 · Try your own version</span><h2 id="workflow-prompt-title">Get the full weekly-update instruction</h2></div><label className={styles.limit}><span>Maximum words in the update</span><input type="number" min="50" max="500" value={wordLimit} onChange={event => setWordLimit(event.target.value)} /></label>{!readyToCopy && <p className={styles.message}>Choose a whole number from 50 to 500.</p>}<p className={styles.intro}>Copy the instruction into Claude, then add the sample notes above. After that, try safe notes from a different week.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Open the weekly-update instruction" guidePromise="Get the full instruction and a link back to this example." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction</strong><button type="button" disabled={!readyToCopy} onClick={copyPrompt} aria-label="Copy the complete weekly update instruction">{copied ? "Copied" : "Copy"}</button><pre>{prompt}</pre></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="workflow-test-title"><div className={styles.sectionHead}><span>04 · Test and save</span><h2 id="workflow-test-title">Will it still work next week?</h2></div><div className={styles.testFlow}><span>Week 1</span><span aria-hidden="true">→</span><span>Fix the instruction</span><span aria-hidden="true">→</span><span>Week 2</span></div><ol className={styles.steps}><li>Run the instruction with the sample notes. Check that it did not invent an owner, date or decision.</li><li>Change any rule that gave you an unhelpful answer. Test with different safe notes in a new chat.</li><li>When both drafts have the structure you need, open <a href="https://claude.ai/projects" target="_blank" rel="noopener noreferrer">Claude Projects ↗</a>, create a project and select <strong>Set project instructions</strong>. Paste your tested instruction and save it.</li></ol><p className={styles.sourceNote}>Keep the latest week’s notes in the chat. Claude Projects keep project instructions across chats; they do not automatically carry every earlier conversation into a new one. <a href="https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" target="_blank" rel="noopener noreferrer">See Claude’s Projects help ↗</a></p></section>
    </div>
    <section className={styles.related} aria-labelledby="workflow-related-title"><div className={styles.relatedInner}><h2 id="workflow-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
