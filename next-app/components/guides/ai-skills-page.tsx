"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./ai-skills-page.module.css";

const problems = [
  "AI misses the brief",
  "I am not sure which source to use",
  "The answer sounds right, but may be wrong",
  "Access feels too broad",
  "The decision still needs me",
] as const;

export function AiSkillsPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(2);
  const [task, setTask] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const skills = guide.sections[0];
  if (skills.kind !== "cards" || !guide.tryNow) return null;

  const chosenSkill = skills.items[selected];
  const prompt = guide.tryNow.prompt
    .replace("[TASK]", task.trim() || "[Describe one familiar work task without private details]")
    .replace("[PROBLEM]", problems[selected] ?? "[Describe what slows you down]")
    .replace("[SKILL]", chosenSkill.title);
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

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>Which AI skill should you practise <span>first?</span></h1>
        <p>Start with one task you already do. Find the part that goes wrong, practise it once and check the result yourself.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#skills-example-title">See an example</a><a href="#skills-pick-title">Choose a skill</a><a href="#skills-task-title">Try it on one task</a></nav>

      <section className={styles.example} aria-labelledby="skills-example-title">
        <div className={styles.sectionHead}><span>One work example</span><h2 id="skills-example-title">Your weekly update adds a decision nobody made</h2></div>
        <p>You give an AI tool non-confidential meeting notes and ask for a short update. It writes that pricing was approved, but the notes say pricing is still open. The skill to practise is <strong>checking the result</strong>: compare every claimed decision with the notes and remove anything unsupported.</p>
        <div className={styles.exampleFlow} aria-label="Practice example"><span>Original notes: pricing is open</span><span aria-hidden="true">→</span><span>AI draft: pricing approved</span><span aria-hidden="true">→</span><span>Your check: correct the claim</span></div>
      </section>

      <section className={styles.activity} aria-labelledby="skills-pick-title">
        <div className={styles.sectionHead}><span>Find your starting point</span><h2 id="skills-pick-title">What keeps getting in the way?</h2></div>
        <div className={styles.skillGrid}>{skills.items.map((skill, index) => <button key={skill.title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{problems[index] ?? skill.title}</button>)}</div>
        <div className={styles.skillResult} aria-live="polite"><span>Practise this</span><h3>{chosenSkill.title}</h3><p>{chosenSkill.body}</p></div>
      </section>

      <section className={styles.activity} aria-labelledby="skills-task-title">
        <div className={styles.sectionHead}><span>Try it on your work</span><h2 id="skills-task-title">Name one task you already know</h2></div>
        <p className={styles.intro}>Use a short, general description. Leave out names, customer details and confidential information. You can leave the field blank and fill in the bracket in the instruction later.</p>
        <label className={styles.taskField}><span>My task</span><input value={task} onChange={event => setTask(event.target.value)} placeholder="For example, turn meeting notes into a weekly update" /></label>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get your practice instruction" guidePromise="Copy one complete exercise for this task and keep a link back to the checks." actionLabel="Show me the exercise">
          <div className={styles.prompt}><strong>Complete instruction</strong><pre>{prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete practice instruction">{copied ? "Copied" : "Copy"}</button></div>
          {copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}
          <div className={styles.result}><strong>Before using the answer at work</strong><p>Try the exercise with safe material. Check the result against your original source and correct anything it invented. Keep the part that helps with your task.</p></div>
        </GuideAccessBoundary>
      </section>
    </div>

    <section className={styles.related} aria-labelledby="skills-related-title"><div className={styles.relatedInner}><h2 id="skills-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
