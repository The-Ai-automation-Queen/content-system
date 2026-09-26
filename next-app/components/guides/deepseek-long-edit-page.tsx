"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./deepseek-long-edit-page.module.css";

type Brief = { characters: string; facts: string; voice: string; problem: string; passage: string };

const example: Brief = {
  characters: "Mara and Ben. Ben gave Mara the train time.",
  facts: "Mara arrives at 7.15. The last train has gone. Ben copied the Sunday timetable. They have 20 minutes to reach the ferry on foot.",
  voice: "Third-person past tense. Restrained tone.",
  problem: "Make the transition from Mara's line to Ben's timetable mistake easier to follow.",
  passage: "“You said it left at half past,” she told Ben, who checked the silent departure board. He had copied the Sunday timetable by mistake.",
};

const fields: { key: keyof Brief; label: string; rows: number }[] = [
  { key: "characters", label: "Characters and relationships", rows: 2 },
  { key: "facts", label: "Facts that must stay", rows: 3 },
  { key: "voice", label: "Tense, point of view and tone", rows: 2 },
  { key: "problem", label: "One problem to fix", rows: 2 },
  { key: "passage", label: "One passage to edit", rows: 4 },
];

const stageLabels = ["See an example", "Adapt the brief", "Check the edit"] as const;

function fillPrompt(template: string, brief: Brief) {
  return template
    .replace("[NAMES, ROLES AND RELATIONSHIPS]", () => brief.characters)
    .replace("[FACTS]", () => brief.facts)
    .replace("[TENSE, POINT OF VIEW AND TONE]", () => brief.voice)
    .replace("[ONE PROBLEM]", () => brief.problem)
    .replace("[PASTE ONE PASSAGE]", () => brief.passage);
}

export function DeepseekLongEditPage({ guide }: { guide: GuidePage }) {
  const [stage, setStage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [brief, setBrief] = useState<Brief>(example);
  const [copied, setCopied] = useState<"example" | "adapted" | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const contentRef = useRef<HTMLDivElement>(null);
  const checkSection = guide.sections[1];
  if (!guide.tryNow || checkSection.kind !== "comparison") return null;
  const complete = Object.values(brief).every(value => value.trim().length > 0);
  const examplePrompt = fillPrompt(guide.tryNow.prompt, example);
  const adaptedPrompt = fillPrompt(guide.tryNow.prompt, brief);

  function goTo(next: number) {
    setStage(next);
    window.requestAnimationFrame(() => contentRef.current?.focus());
  }

  async function copyPrompt(which: "example" | "adapted") {
    if (which === "adapted" && !complete) return;
    try {
      await navigator.clipboard.writeText(which === "example" ? examplePrompt : adaptedPrompt);
      setCopied(which);
      setCopyError(false);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Keep the story you like. <span>Edit only what is weak.</span></h1><p>Give DeepSeek one passage, the facts to protect and one problem to fix. Check its changes before you keep them.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.stageNav} aria-label="Guide steps">{stageLabels.map((label, index) => <button key={label} type="button" aria-current={!showAll && stage === index ? "step" : undefined} onClick={() => { setShowAll(false); goTo(index); }}><span>{index + 1}</span>{label}</button>)}</nav>
      <button type="button" className={styles.allButton} aria-pressed={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Show one step" : "Read all steps"}</button>
      <div ref={contentRef} tabIndex={-1} className={styles.stageContent}>
        {(showAll || stage === 0) && <section className={styles.activity} aria-labelledby="long-example-title"><div className={styles.sectionHead}><span>Step 1 / 3</span><h2 id="long-example-title">See a filled brief first</h2></div><p>Use the fictional Mara scene to practise naming what must stay true before you request a revision.</p><div className={styles.briefGrid}><article><strong>Characters</strong><p>{example.characters}</p></article><article><strong>Facts</strong><p>{example.facts}</p></article><article><strong>Voice</strong><p>{example.voice}</p></article><article><strong>Edit target</strong><p>{example.problem}</p></article></div><p>Only the selected passage goes to DeepSeek. The rest of the story stays outside this edit.</p><div className={styles.prompt}><details open><summary>Filled example instruction</summary><pre>{examplePrompt}</pre></details><button type="button" onClick={() => copyPrompt("example")} aria-label="Copy the complete filled DeepSeek example">{copied === "example" ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>}

        {(showAll || stage === 1) && <section className={styles.activity} aria-labelledby="long-adapt-title"><div className={styles.sectionHead}><span>Step 2 / 3</span><h2 id="long-adapt-title">Make the brief yours</h2></div><p>Replace the example fields with a passage you are allowed to share. Keep one problem to fix.</p><div className={styles.fields}>{fields.map(field => <label key={field.key}><span>{field.label}</span><textarea rows={field.rows} value={brief[field.key]} onChange={event => setBrief(current => ({ ...current, [field.key]: event.target.value }))} /></label>)}</div><div className={styles.prompt}><details open><summary>Your complete instruction</summary><pre>{adaptedPrompt}</pre></details><button type="button" disabled={!complete} onClick={() => copyPrompt("adapted")} aria-label="Copy your complete DeepSeek editing instruction">{copied === "adapted" ? "Copied" : "Copy"}</button></div>{!complete && <p className={styles.message}>Complete every field before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.toolStep}><a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">Open DeepSeek ↗</a> Start a new chat, paste your instruction and send it.</p></section>}

        {(showAll || stage === 2) && <section className={styles.activity} aria-labelledby="long-check-title"><div className={styles.sectionHead}><span>Step 3 / 3</span><h2 id="long-check-title">Compare before you keep it</h2></div><p>Read the revised passage beside your original. Mark each check only when the result holds up.</p><div className={styles.checks}>{checkSection.rows.map((row, index) => <label key={row[0]}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{row[0]}</strong><span>{row[1]}</span></span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All four checks marked. Keep the passage only if the named problem is fixed too." : `${checked.filter(Boolean).length} of 4 checks marked. Reject changes outside your selected passage or protected brief.`}</p></section>}
      </div>
      {!showAll && <div className={styles.nextBar}>{stage > 0 && <button type="button" onClick={() => goTo(stage - 1)}>← Back</button>}{stage < 2 && <button type="button" onClick={() => goTo(stage + 1)}>Next: {stageLabels[stage + 1]} →</button>}</div>}
    </div>
    <section className={styles.related} aria-labelledby="long-related-title"><div className={styles.relatedInner}><h2 id="long-related-title">What kind of edit comes next?</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
