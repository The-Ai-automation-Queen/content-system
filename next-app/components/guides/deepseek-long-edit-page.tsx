"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
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

function fillPrompt(template: string, brief: Brief) {
  return template
    .replace("[NAMES, ROLES AND RELATIONSHIPS]", () => brief.characters)
    .replace("[FACTS]", () => brief.facts)
    .replace("[TENSE, POINT OF VIEW AND TONE]", () => brief.voice)
    .replace("[ONE PROBLEM]", () => brief.problem)
    .replace("[PASTE ONE PASSAGE]", () => brief.passage);
}

export function DeepseekLongEditPage({ guide }: { guide: GuidePage }) {
  const [brief, setBrief] = useState<Brief>(example);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const checkSection = guide.sections[1];
  if (!guide.tryNow || checkSection.kind !== "comparison") return null;
  const complete = Object.values(brief).every(value => value.trim().length > 0);
  const prompt = fillPrompt(guide.tryNow.prompt, brief);
  const related = publicGuides.filter(item => ["what-is-a-prompt", "what-should-you-never-share-with-ai"].includes(item.slug));

  async function copyPrompt() {
    if (!complete) return;
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
      <header className={styles.hero}><h1>Keep the story you like. <span>Edit only what is weak.</span></h1><p>Give DeepSeek one passage, the facts to protect and one problem to fix. Compare its revision with your original before you keep it.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#long-example-title">See a filled brief</a><a href="#long-adapt-title">Make it yours</a><a href="#long-check-title">Check the edit</a></nav>

      <section className={styles.activity} aria-labelledby="long-example-title"><div className={styles.sectionHead}><span>01 · See an example</span><h2 id="long-example-title">Protect what already works</h2></div><p>Here is a brief for one weak transition in a longer story. It names the facts DeepSeek must keep and the only problem it should repair.</p><div className={styles.briefGrid}><article><strong>Characters</strong><p>{example.characters}</p></article><article><strong>Facts</strong><p>{example.facts}</p></article><article><strong>Voice</strong><p>{example.voice}</p></article><article><strong>Edit target</strong><p>{example.problem}</p></article></div><blockquote className={styles.passage}>{example.passage}</blockquote><p>Only this passage goes to DeepSeek. The rest of the story stays outside this edit.</p></section>

      <section className={styles.activity} aria-labelledby="long-adapt-title"><div className={styles.sectionHead}><span>02 · Make it yours</span><h2 id="long-adapt-title">Name one change you want</h2></div><p>The fields start with the example. Replace them with a passage you are allowed to share, or use the example to see the method work.</p><div className={styles.fields}>{fields.map(field => <label key={field.key}><span>{field.label}</span><textarea rows={field.rows} value={brief[field.key]} onChange={event => setBrief(current => ({ ...current, [field.key]: event.target.value }))} /></label>)}</div><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Open the focused-edit instruction" guidePromise="Get the complete instruction built from the brief above and a link back to this guide." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Your complete instruction</strong><button type="button" disabled={!complete} onClick={copyPrompt} aria-label="Copy your complete DeepSeek editing instruction">{copied ? "Copied" : "Copy"}</button><pre>{prompt}</pre></div>{!complete && <p className={styles.message}>Complete every field before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}<p className={styles.toolStep}><a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">Open DeepSeek ↗</a> Start a new chat, paste your instruction and send it.</p></GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="long-check-title"><div className={styles.sectionHead}><span>03 · Check the edit</span><h2 id="long-check-title">Compare before you keep it</h2></div><p>Read the revised passage beside the original. Keep only the changes that solve the problem you named.</p><div className={styles.checks}>{checkSection.rows.map(row => <div key={row[0]}><strong>{row[0]}</strong><p>{row[1]}</p></div>)}</div><p className={styles.result}>If a protected fact changed, correct the instruction and run the passage again.</p></section>
    </div>
    <section className={styles.related} aria-labelledby="long-related-title"><div className={styles.relatedInner}><h2 id="long-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
