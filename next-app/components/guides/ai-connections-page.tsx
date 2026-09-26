"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./ai-connections-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const checks = [
  "I know what the connection can read.",
  "I know if it can create, edit, send, share or delete.",
  "I know where to turn it off and what may remain in chat history.",
] as const;

export function AiConnectionsPage({ guide }: { guide: GuidePage }) {
  const [access, setAccess] = useState(0);
  const [product, setProduct] = useState(0);
  const [permissionText, setPermissionText] = useState("");
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const levels = guide.sections[0];
  const products = guide.sections[1];
  if (levels.kind !== "cards" || products.kind !== "steps" || !guide.tryNow) return null;
  const prompt = guide.tryNow.prompt.replace("[Paste the permission text here]", () => permissionText.trim());
  const ready = permissionText.trim().length >= 20;
  const productSource = guide.sourceNotes?.[product];

  async function copyPrompt() {
    if (!ready) return;
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
        <h1>Should AI connect to <span>your accounts?</span></h1>
        <p>Choose access for one specific task. Review the permission before connecting, and know where you will disconnect it.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.activity} aria-labelledby="connection-choice-title">
        <div className={styles.sectionHead}><span>Choose the access</span><h2 id="connection-choice-title">What does the job need?</h2></div>
        <div className={styles.levels}>{levels.items.map((item, index) => <button key={item.title} type="button" aria-pressed={access === index} onClick={() => setAccess(index)}><span>0{index + 1}</span><strong>{item.title}</strong></button>)}</div>
        <p className={styles.choiceResult} aria-live="polite"><Text value={levels.items[access].body} /></p>
        <p className={styles.hint}>If one file can answer the question, use that instead of connecting an account.</p>
      </section>

      <section className={styles.activity} aria-labelledby="connection-off-title">
        <div className={styles.sectionHead}><span>Review access</span><h2 id="connection-off-title">Which tool are you using?</h2></div>
        <div className={styles.products} role="group" aria-label="Choose an AI tool">{products.steps.map((item, index) => <button key={item.title} type="button" aria-pressed={product === index} onClick={() => setProduct(index)}>{item.title}</button>)}</div>
        <div className={styles.productResult} aria-live="polite"><strong>{products.steps[product].title}</strong><p><Text value={products.steps[product].body} /></p>{productSource && <a href={productSource.url} target="_blank" rel="noopener noreferrer">Check the current help page ↗</a>}</div>
        {product === 0 && <div className={styles.permissionExample}>
          <strong>For example: “Allow read actions” in ChatGPT</strong>
          <div><span>It can read from the connected app without asking each time.</span><span>It still asks before making changes.</span></div>
          <p>This setting does not remove access already granted to the connected account. To stop future access, disconnect the app.</p>
          <a href="https://help.openai.com/en/articles/20001495-managing-app-permissions-in-chatgpt" target="_blank" rel="noopener noreferrer">See OpenAI’s permission options ↗</a>
        </div>}
        {product === 3 && <p className={styles.workNote}><strong>Using Copilot at work?</strong> Microsoft 365 data follows your organisation’s permissions. The personal connector switch above does not replace those controls. <a href="https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy" target="_blank" rel="noopener noreferrer">See Microsoft’s work-account explanation ↗</a></p>}
        <p className={styles.hint}>A conversation switch can be separate from an account connection. Check both the connection and saved activity.</p>
      </section>

      <section className={styles.activity} aria-labelledby="connection-permission-title">
        <div className={styles.sectionHead}><span>Before you approve</span><h2 id="connection-permission-title">What will it be allowed to do?</h2></div>
        <p>Copy the wording from the permission screen. Leave out account details, passwords and private information.</p>
        <label className={styles.permissionField}><span>Permission wording</span><textarea rows={4} value={permissionText} onChange={event => setPermissionText(event.target.value)} placeholder="Paste the permission wording here" /></label>
        <div className={styles.prompt}><details open><summary>Your complete instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete permission-check instruction">{copied ? "Copied" : "Copy"}</button></div>
        {!ready && <p className={styles.message}>Add the permission wording before copying.</p>}
        {copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
        <p className={styles.hint}>Compare any AI explanation with the original permission screen. The screen, not the AI answer, controls your decision.</p>
        <div className={styles.checks}>{checks.map((item, index) => <label key={item}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{item}</span></label>)}</div>
        <p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "You can decide from the actual permissions. Connect only if this repeated job needs them." : `${checked.filter(Boolean).length} of 3 checks marked. Leave the connection off until you can explain the access.`}</p>
      </section>
    </div>
    <section className={styles.related} aria-labelledby="connection-related-title"><div className={styles.relatedInner}><h2 id="connection-related-title">Before your next connected task</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
