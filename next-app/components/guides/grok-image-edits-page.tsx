"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./grok-image-edits-page.module.css";

type Edit = { requested: boolean; locks: boolean; quality: boolean };
const blank = (): Edit => ({ requested: false, locks: false, quality: false });

export function GrokImageEditsPage({ guide }: { guide: GuidePage }) {
  const [masterSaved, setMasterSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [edits, setEdits] = useState<Edit[]>([blank(), blank(), blank()]);
  if (!guide.tryNow) return null;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(guide.tryNow!.prompt);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  function updateEdit(index: number, key: keyof Edit, value: boolean) {
    setEdits(current => current.map((edit, i) => i === index ? { ...edit, [key]: value } : edit));
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>How many Grok edits can your image take <span>before it drifts?</span></h1><p>Keep one approved master. Make three one-detail edits from that same image and check the full frame each time.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="image-master-title"><div className={styles.sectionHead}><span>Before the first edit</span><h2 id="image-master-title">Protect the image you already like</h2></div><div className={styles.master}><label><input type="checkbox" checked={masterSaved} onChange={event => setMasterSaved(event.target.checked)} /><span>I downloaded the approved master.</span></label><p>Write down what must stay: subject, pose, composition, colours, background, objects and style. Use a practice image without identifiable people or private material.</p></div></section>

      <section className={styles.activity} aria-labelledby="image-prompt-title"><div className={styles.sectionHead}><span>One detail at a time</span><h2 id="image-prompt-title">Use the same instruction for each test</h2></div><p className={styles.intro}>Upload the saved master again before each of the three edits. Replace the bracketed change and lock list. Save each result as a new numbered version.</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Grok image edit instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>

      <section className={styles.activity} aria-labelledby="image-track-title"><div className={styles.sectionHead}><span>Check each version</span><h2 id="image-track-title">Did the edit keep the rest intact?</h2></div><div className={styles.editList}>{edits.map((edit, index) => <details key={index}><summary>Edit {index + 1}<span>{edit.requested && edit.locks && edit.quality ? "Pass" : "Check"}</span></summary><div className={styles.editChecks}><label><input type="checkbox" checked={edit.requested} onChange={event => updateEdit(index, "requested", event.target.checked)} /><span>The requested change is correct.</span></label><label><input type="checkbox" checked={edit.locks} onChange={event => updateEdit(index, "locks", event.target.checked)} /><span>Every locked object, colour and position is unchanged.</span></label><label><input type="checkbox" checked={edit.quality} onChange={event => updateEdit(index, "quality", event.target.checked)} /><span>No new blur, distortion, text or marks appeared.</span></label></div><p>{edit.requested && edit.locks && edit.quality ? "Keep this numbered version if it helps your work." : "Compare with the master. Return to it or stop if a locked detail changed."}</p></details>)}</div><p className={styles.result} aria-live="polite">{masterSaved && edits.every(edit => edit.requested && edit.locks && edit.quality) ? "All three edits passed against the master. You now have evidence this workflow held your chosen details." : `${edits.filter(edit => edit.requested && edit.locks && edit.quality).length} of 3 edits passed. An unchecked version is not approved.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="image-related-title"><div className={styles.relatedInner}><h2 id="image-related-title">Keep the same review habit elsewhere</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
