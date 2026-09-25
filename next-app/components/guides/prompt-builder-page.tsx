"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { buildPrompt, promptExample, type PromptBrief } from "@/content/prompt-builder-example";
import { cleanLabel } from "./guide-icon";
import { relatedGuideHref } from "./guide-preview-href";
import styles from "./prompt-builder-page.module.css";

const stages = ["See an example", "Make it yours", "Use and check"] as const;

const fields: readonly { key: keyof PromptBrief; label: string; hint: string; rows: number }[] = [
  { key: "task", label: "What do you want done?", hint: "One specific job, not a broad topic.", rows: 2 },
  { key: "material", label: "What can AI use?", hint: "Paste public, made-up or approved non-confidential material.", rows: 4 },
  { key: "result", label: "What should the answer look like?", hint: "Name the format, length and useful parts.", rows: 3 },
  { key: "checks", label: "What must stay accurate?", hint: "Name facts to check and assumptions to avoid.", rows: 3 },
];

export function PromptBuilderPage({ guide }: { guide: GuidePage }) {
  const [stage, setStage] = useState(0);
  const [brief, setBrief] = useState<PromptBrief>(promptExample);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const prompt = buildPrompt(brief);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
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
      <header className={styles.hero}><h1>What should you actually <span>type into AI?</span></h1><p>See a complete example first. Then change four parts to make a prompt for your own task.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>
      <section className={styles.learning} aria-labelledby="prompt-learning-title">
        <div className={styles.sectionHead}><span>One practical prompt</span><h2 id="prompt-learning-title">From rough note to useful answer</h2></div>
        <nav className={styles.stageNav} aria-label="Prompt guide stages">{stages.map((label, index) => <button type="button" key={label} aria-current={stage === index ? "step" : undefined} onClick={() => setStage(index)}><span>{index + 1}</span>{label}</button>)}</nav>

        {stage === 0 && <div className={styles.stage}>
          <h3>Start with this made-up project note</h3>
          <div className={styles.exampleNote}><p>{promptExample.material}</p></div>
          <div className={styles.flow}><div><strong>The job</strong><span>Make a 15-minute meeting agenda.</span></div><div><strong>The result</strong><span>Three agenda items and one decision.</span></div><div><strong>The check</strong><span>Pricing is still waiting for approval.</span></div></div>
          <div className={styles.exampleResult}><strong>A useful answer would show</strong><ul><li>The approved landing page and graphics update.</li><li>Pricing approval as an open item.</li><li>A decision about launch timing, with no invented owner.</li></ul></div>
          <PromptBox title="Copy the complete worked example" text={guide.tryNow?.prompt ?? buildPrompt(promptExample)} copied={copied} error={copyError} onCopy={copy} />
          <button className={styles.next} type="button" onClick={() => setStage(1)}>Make it yours →</button>
        </div>}

        {stage === 1 && <div className={styles.stage}>
          <h3>Change the parts that make this yours</h3><p className={styles.stageIntro}>The example is already filled in. Replace it with a task from your work, leaving out private details. Check that all four parts still agree.</p>
          <div className={styles.fields}>{fields.map(field => <label key={field.key}><strong>{field.label}</strong><span>{field.hint}</span><textarea value={brief[field.key]} rows={field.rows} onChange={event => setBrief(current => ({ ...current, [field.key]: event.target.value }))} /></label>)}</div>
          <div className={styles.builderActions}><button type="button" onClick={() => setBrief(promptExample)}>Restore example</button><button className={styles.next} type="button" onClick={() => setStage(2)}>Use this prompt →</button></div>
        </div>}

        {stage === 2 && <div className={styles.stage}>
          <h3>Your instruction is ready to copy</h3><p className={styles.stageIntro}>Check that the job, result and checks agree. Remove any names, customer information or confidential work, then choose an AI chat you are allowed to use.</p>
          <PromptBox title="View your complete instruction" text={prompt} copied={copied} error={copyError} onCopy={copy} />
          <div className={styles.toolLinks}><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a><a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Open Claude ↗</a><a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Open Gemini ↗</a></div>
          <p className={styles.useNote}>Start a new chat, paste the copied instruction into its message box, then send it.</p>
          <div className={styles.checks}><strong>Before you use the answer, check:</strong>{["Does it follow the format and length you asked for?", "Can you trace every fact to your original material?", "Did it mark missing details instead of guessing?"].map((item, index) => <label key={item}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{item}</span></label>)}</div>
          <p className={styles.checkResult} aria-live="polite">{checked.every(Boolean) ? "All three checks marked. Keep the answer only if the result itself passes." : `${checked.filter(Boolean).length} of 3 checks marked. Fix the instruction or ask a follow-up if the answer misses something.`}</p>
        </div>}
      </section>
    </div>
    <section className={styles.related} aria-labelledby="prompt-related-title"><div className={styles.relatedInner}><h2 id="prompt-related-title">Get more from your next AI answer</h2><div className={styles.relatedGrid}>{guide.related.map(item => <Link key={item.slug} href={relatedGuideHref(item.slug)}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}

function PromptBox({ title, text, copied, error, onCopy }: { title: string; text: string; copied: boolean; error: boolean; onCopy: (text: string) => void }) {
  return <div className={styles.promptBox}><details><summary>{title}</summary><pre>{text}</pre></details><button type="button" onClick={() => onCopy(text)} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button>{error && <p role="alert">Copy failed. Open the instruction and select the text instead.</p>}</div>;
}
