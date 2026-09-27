"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./ai-skills-page.module.css";

const skills = [
  { snag: "The answer misses what I asked for", title: "Give a clearer brief", habit: "State the job, the audience, the source material and what the answer must include.", focus: "Help me write a precise instruction for this task. Ask for any missing audience, source or output detail before drafting it.", check: "Could a colleague follow the instruction without guessing what you meant?" },
  { snag: "I am not sure which information to use", title: "Choose the right source", habit: "Name the document or person with the latest facts before asking for an answer.", focus: "Tell me which original documents or people I need to check for this task. Separate facts I have from facts I still need.", check: "Can you point to the original for each important fact?" },
  { snag: "The answer sounds right, but might be wrong", title: "Check the result", habit: "Compare names, numbers, dates and claims against the originals.", focus: "Give me a short check I can apply to the result of this task. Flag details that must be compared with the original material.", check: "What did the answer add, leave out or change?" },
  { snag: "I do not know what is safe to share", title: "Protect the information", habit: "Use a public or made-up example first, then check your organisation's rules before adding work data.", focus: "Help me create a safe practice version of this task. Identify details I should remove or replace before using an AI tool.", check: "Would this practice example expose a customer, colleague, account or confidential plan?" },
  { snag: "I still need to approve the outcome", title: "Keep the final decision", habit: "Decide what needs a person's approval before anyone acts on the answer.", focus: "Separate the draft work AI could help with from the decision or action a person must approve for this task.", check: "Who checks the result, and what happens before it is used?" },
] as const;

const sampleTask = "Turn a short, non-confidential project note into a status update.";

export function AiSkillsPage({ guide }: { guide: GuidePage }) {
  const [selected, setSelected] = useState(0);
  const [task, setTask] = useState(sampleTask);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const current = skills[selected];
  const prompt = `I want to practise one AI skill on a task I already know how to do.\n\nTask: ${task.trim()}\nSkill to practise: ${current.title}.\n\n${current.focus}\n\nGive me one small exercise I can finish this week. Use only public, invented or non-confidential material. Tell me what to prepare, what to ask the tool to do, and how to check the result against the original. Do not invent facts about my work or suggest that I buy a new tool. If you need an example, make it clearly fictional. Keep your answer to one exercise and one check. I will decide if the result is suitable for real work.`;
  const related = publicGuides.filter(item => ["what-is-ai", "what-should-you-never-share-with-ai", "what-is-agentic"].includes(item.slug));

  async function copyPrompt() {
    if (!task.trim()) return;
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
      <header className={styles.hero}><h1>Which AI skill is worth learning <span>for your work?</span></h1><p>You do not need to learn every tool. Find the part of a task that slows you down, then practise one skill on work you already understand.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#skills-example-title">See a real task</a><a href="#skills-pick-title">Find your skill</a><a href="#skills-task-title">Try one exercise</a></nav>

      <section className={styles.activity} aria-labelledby="skills-example-title"><div className={styles.sectionHead}><span>01 · See a real task</span><h2 id="skills-example-title">See what a useful check looks like</h2></div><p className={styles.intro}>Suppose you have a few safe project notes and need to send a short update. AI can draft it, but the useful skill is knowing what to give it and what to check.</p><div className={styles.example}><div><strong>Original note</strong><p>Draft ready. Team review still pending. Launch date not agreed.</p></div><span aria-hidden="true">→</span><div><strong>Useful update</strong><p>The draft is ready for team review. The launch date has not been agreed.</p></div></div><p className={styles.exampleCheck}>Before sending: check that the draft really is ready, the review is still pending and no date has been added.</p></section>

      <section className={styles.activity} aria-labelledby="skills-pick-title"><div className={styles.sectionHead}><span>02 · Find your skill</span><h2 id="skills-pick-title">What tends to slow you down?</h2></div><div className={styles.skillGrid} role="group" aria-label="Choose a work snag">{skills.map((skill, index) => <button key={skill.title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{skill.snag}</button>)}</div><div className={styles.skillResult} aria-live="polite"><span>Practise this</span><h3>{current.title}</h3><p>{current.habit}</p><strong>Check: {current.check}</strong></div></section>

      <section className={styles.activity} aria-labelledby="skills-task-title"><div className={styles.sectionHead}><span>03 · Try one exercise</span><h2 id="skills-task-title">Use a task you know well</h2></div><p className={styles.intro}>Start with the example, or replace it with one familiar task. Keep names, customer details and confidential information out.</p><label className={styles.taskField}><span>Your task</span><textarea rows={3} value={task} onChange={event => setTask(event.target.value)} /></label><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get your practice instruction" guidePromise="Open the complete instruction for your task and chosen skill, then copy it into an AI chat." actionLabel="Show the instruction"><div className={styles.prompt}><strong>Your complete instruction</strong><button type="button" disabled={!task.trim()} onClick={copyPrompt} aria-label="Copy your AI skills practice instruction">{copied ? "Copied" : "Copy"}</button><pre>{prompt}</pre></div>{!task.trim() && <p className={styles.message}>Add a task before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}<p className={styles.inputNote}>Paste it into an AI chat you are allowed to use. Check the suggested exercise against your own task before trying it.</p></GuideAccessBoundary></section>
    </div>
    <section className={styles.related} aria-labelledby="skills-related-title"><div className={styles.relatedInner}><h2 id="skills-related-title">Keep learning through practice</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
