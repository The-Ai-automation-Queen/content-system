"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
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
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const sceneSection = guide.sections[0];
  const checkSection = guide.sections[1];
  if (sceneSection.kind !== "walkthrough" || checkSection.kind !== "cards" || !guide.tryNow) return null;
  const scene = sceneSection.blocks.find(block => block.kind === "paragraph");
  if (!scene || scene.kind !== "paragraph") return null;
  const prompt = `${guide.tryNow.prompt}\n\nScene:\n${scene.text}`;

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

      <section className={styles.activity} aria-labelledby="wall-example-title"><div className={styles.sectionHead}><span>See the difference</span><h2 id="wall-example-title">Same words, clearer breaks</h2></div><div className={styles.switch} role="group" aria-label="Scene formatting"><button type="button" aria-pressed={!showBreaks} onClick={() => setShowBreaks(false)}>Dense scene</button><button type="button" aria-pressed={showBreaks} onClick={() => setShowBreaks(true)}>With breaks</button></div><div className={styles.scene} aria-live="polite">{showBreaks ? formattedScene.map(part => <p key={part}>{part}</p>) : <p>{scene.text}</p>}</div><p className={styles.note}>Only the spacing changed. Check that the meaning, dialogue and tone stay the same when DeepSeek does this for you.</p></section>

      <section className={styles.activity} aria-labelledby="wall-prompt-title"><div className={styles.sectionHead}><span>Try it in DeepSeek</span><h2 id="wall-prompt-title">Ask for formatting, not a rewrite</h2></div><p>Use the complete scene and instruction below. You can replace the sample later with a passage of your own.</p><div className={styles.prompt}><details><summary>View the complete instruction and scene</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete DeepSeek scene and instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.toolStep}><a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">Open DeepSeek ↗</a> Start a new chat, paste the instruction and send it.</p></section>

      <section className={styles.activity} aria-labelledby="wall-check-title"><div className={styles.sectionHead}><span>Before you keep it</span><h2 id="wall-check-title">Did it change more than the layout?</h2></div><div className={styles.checks}>{checkSection.items.map((item, index) => <label key={item.title}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{item.title}</strong>{item.body}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All four checks marked. Keep the formatting only if the original scene still says the same thing." : `${checked.filter(Boolean).length} of 4 checks marked. Compare the result with the original before keeping it.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="wall-related-title"><div className={styles.relatedInner}><h2 id="wall-related-title">Keep control of the next edit</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
