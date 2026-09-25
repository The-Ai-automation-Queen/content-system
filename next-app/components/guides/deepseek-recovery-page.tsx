"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./deepseek-recovery-page.module.css";

const restartChecks = [
  "The new chat knows the goal and the latest approved work.",
  "It can tell approved decisions from open questions.",
  "It can take the next step without reading the old conversation.",
] as const;

export function DeepseekRecoveryPage({ guide }: { guide: GuidePage }) {
  const [saved, setSaved] = useState<boolean[]>([false, false, false, false, false]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const files = guide.sections[0];
  if (files.kind !== "cards" || !guide.tryNow) return null;

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

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>If this DeepSeek chat vanished, <span>could you continue?</span></h1><p>The chat history is not your project. Save the parts you need to restart, then test them in a clean conversation.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="recovery-pack-title"><div className={styles.sectionHead}><span>Your recovery pack</span><h2 id="recovery-pack-title">Keep these five files under your control</h2></div><p className={styles.intro}>Create a Project restart folder in a location approved for this work. Save each item as its own file; keep the approved work in its original format.</p><div className={styles.fileGrid}>{files.items.map((file, index) => <label key={file.title}><input type="checkbox" checked={saved[index] ?? false} onChange={() => setSaved(current => current.map((value, i) => i === index ? !value : value))} /><span><strong>{file.title}</strong><small>{file.body}</small></span></label>)}</div><p className={styles.result} aria-live="polite">{saved.every(Boolean) ? "All five files marked. Test the pack before you depend on it." : `${saved.filter(Boolean).length} of 5 files marked. Store the latest approved work outside the chat.`}</p></section>

      <section className={styles.activity} aria-labelledby="recovery-prompt-title"><div className={styles.sectionHead}><span>Make the restart brief</span><h2 id="recovery-prompt-title">Ask the current chat for a draft</h2></div><p className={styles.intro}>Copy this into the existing project. Check every fact and decision before saving the brief and decision log. Save item 10 separately as your Restart prompt.</p><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete DeepSeek recovery instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.sourceNote}>Save the source files and latest approved work from their originals. A chat summary is not a backup of those files.</p></section>

      <section className={styles.activity} aria-labelledby="recovery-test-title"><div className={styles.sectionHead}><span>Test the backup</span><h2 id="recovery-test-title">Start again without the old chat</h2></div><div className={styles.testFlow}><span>Clean chat</span><span aria-hidden="true">→</span><span>Needed files only</span><span aria-hidden="true">→</span><span>Restart instruction</span></div><p className={styles.intro}>Open a new conversation in DeepSeek or another approved tool. Add only the files needed for the next step, then paste the Restart prompt you saved from item 10.</p><div className={styles.checks}>{restartChecks.map((label, index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "The recovery pack passed your restart test. Keep it updated as the project changes." : "If the new chat is missing context, repair the relevant file and test again."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="recovery-related-title"><div className={styles.relatedInner}><h2 id="recovery-related-title">Keep control of the next step</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
