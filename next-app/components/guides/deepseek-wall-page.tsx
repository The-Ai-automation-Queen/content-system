"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./deepseek-wall-page.module.css";

const formattedScene = [
  "Mara reached the station at 7.15. The last train had gone.",
  "“You said it left at half past,” she told Ben, who checked the silent departure board.",
  "He had copied the Sunday timetable by mistake. They had 20 minutes to reach the ferry on foot.",
] as const;

export function DeepseekWallPage({ guide }: { guide: GuidePage }) {
  const [showBreaks, setShowBreaks] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const sceneSection = guide.sections[0];
  const checkSection = guide.sections[1];
  if (sceneSection.kind !== "walkthrough" || checkSection.kind !== "cards" || !guide.tryNow) return null;
  const scene = sceneSection.blocks.find(block => block.kind === "paragraph");
  if (!scene || scene.kind !== "paragraph") return null;
  const prompt = `${guide.tryNow.prompt}\n\nScene:\n${scene.text}`;
  const related = publicGuides.filter(item => ["what-is-a-prompt", "what-is-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>DeepSeek made your scene <span>hard to read?</span></h1><p>Fix the paragraph breaks without letting it change the story you already like.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#wall-example-title">See the difference</a><a href="#wall-prompt-title">Get the instruction</a><a href="#wall-check-title">Check the result</a></nav>

      <section className={styles.activity} aria-labelledby="wall-example-title"><div className={styles.sectionHead}><span>01 · See the difference</span><h2 id="wall-example-title">Same words, clearer breaks</h2></div><p>Switch between the two versions. The words do not change; each action gets room to breathe.</p><div className={styles.switch} role="group" aria-label="Scene formatting"><button type="button" aria-pressed={!showBreaks} onClick={() => setShowBreaks(false)}>Dense scene</button><button type="button" aria-pressed={showBreaks} onClick={() => setShowBreaks(true)}>With breaks</button></div><div className={styles.scene} aria-live="polite">{showBreaks ? formattedScene.map(part => <p key={part}>{part}</p>) : <p>{scene.text}</p>}</div><p className={styles.note}>If DeepSeek changes a word or adds a detail, that is an edit—not just formatting.</p></section>

      <section className={styles.activity} aria-labelledby="wall-prompt-title"><div className={styles.sectionHead}><span>02 · Try it yourself</span><h2 id="wall-prompt-title">Ask for formatting, not a rewrite</h2></div><p>The complete instruction includes the sample scene. Try that first; then replace the scene with a passage you are allowed to share.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Open the formatting instruction" guidePromise="Get the full instruction and the sample scene to copy into DeepSeek." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction and scene</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete DeepSeek scene and instruction">{copied ? "Copied" : "Copy"}</button><pre>{prompt}</pre></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}<p className={styles.toolStep}><a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">Open DeepSeek ↗</a> Start a new chat, paste the instruction and send it.</p></GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="wall-check-title"><div className={styles.sectionHead}><span>03 · Check the result</span><h2 id="wall-check-title">Did it change more than the layout?</h2></div><div className={styles.checks}>{checkSection.items.map(item => <div key={item.title}><strong>{item.title}</strong><p>{item.body}</p></div>)}</div><p className={styles.result}>Keep the formatted version only when the original still says the same thing.</p></section>
    </div>
    <section className={styles.related} aria-labelledby="wall-related-title"><div className={styles.relatedInner}><h2 id="wall-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
