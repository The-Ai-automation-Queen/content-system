"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./ai-skills-page.module.css";

const problems = [
  "AI misses the brief",
  "The source may be wrong",
  "The answer sounds right",
  "Access feels too broad",
  "The decision is still mine",
] as const;

export function AiSkillsPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [tasks, setTasks] = useState<string[]>(["", "", "", "", ""]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [practiceTaskIndex, setPracticeTaskIndex] = useState<number | null>(null);
  const skills = guide.sections[0];
  if (skills.kind !== "cards" || !guide.tryNow) return null;
  const taskList = tasks.map(task => task.trim()).filter(Boolean);
  const practiceTask = practiceTaskIndex === null ? "" : taskList[practiceTaskIndex] ?? "";
  const prompt = taskList.length >= 5
    ? guide.tryNow.prompt.replace("[Paste 5 to 10 tasks]", taskList.map((task, index) => `${index + 1}. ${task}`).join("\n"))
    : guide.tryNow.prompt;

  async function copyPrompt() {
    if (taskList.length < 5) return;
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
      <header className={styles.hero}><h1>Which AI skill is worth learning <span>for your work?</span></h1><p>Start with the part of a familiar task that slows you down. Practise one skill before learning another tool.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="skills-pick-title"><div className={styles.sectionHead}><span>Find your starting point</span><h2 id="skills-pick-title">What keeps getting in the way?</h2></div><div className={styles.skillGrid}>{skills.items.map((skill, index) => <button key={skill.title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{problems[index] ?? skill.title}</button>)}</div><div className={styles.skillResult} aria-live="polite"><span>Practise this skill</span><h3>{skills.items[selected].title}</h3><p>{skills.items[selected].body}</p></div></section>

      <section className={styles.activity} aria-labelledby="skills-task-title"><div className={styles.sectionHead}><span>Use your own work</span><h2 id="skills-task-title">Name five tasks you already know</h2></div><p className={styles.intro}>Use general descriptions, such as “turn meeting notes into an update”. Leave out names, customer details and confidential information.</p><div className={styles.taskGrid}>{tasks.map((task, index) => <label key={index}><span>Task {index + 1}</span><input value={task} onChange={event => { setTasks(current => current.map((value, i) => i === index ? event.target.value : value)); setPracticeTaskIndex(null); }} placeholder="A task I do regularly" /></label>)}</div>{tasks.length < 10 && taskList.length >= 5 && <button className={styles.addTask} type="button" onClick={() => setTasks(current => [...current, ""])}>Add another task (optional)</button>}<p className={styles.inputNote} aria-live="polite">{taskList.length >= 5 ? `${taskList.length} tasks are now in the instruction below.` : `${taskList.length} of 5 tasks added. Add five to unlock Copy.`}</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={taskList.length < 5} onClick={copyPrompt} aria-label="Copy the complete AI skills instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.inputNote}>Paste the instruction into an AI chat you are allowed to use. Check its advice against what you know about the task.</p></section>

      <section className={styles.activity} aria-labelledby="skills-plan-title"><div className={styles.sectionHead}><span>Your next practice</span><h2 id="skills-plan-title">Make it one task this week</h2></div><label className={styles.practiceLabel}><span>Which task will you try?</span><select value={practiceTaskIndex ?? ""} onChange={event => setPracticeTaskIndex(event.target.value === "" ? null : Number(event.target.value))} disabled={taskList.length === 0}><option value="">{taskList.length ? "Choose from your tasks" : "Add tasks above first"}</option>{taskList.map((task, index) => <option key={`${task}-${index}`} value={index}>{task}</option>)}</select></label><div className={styles.plan} aria-live="polite"><strong>{practiceTask ? `Try: ${practiceTask}` : "Choose one familiar task."}</strong><span>Practise: {skills.items[selected].title}.</span><span>Check: did the result help with that task, and what did you still need to correct?</span></div></section>
    </div>
    <section className={styles.related} aria-labelledby="skills-related-title"><div className={styles.relatedInner}><h2 id="skills-related-title">Keep building the skills that matter</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
