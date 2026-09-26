"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-writing-page.module.css";

const briefParts = [
  { label: "Job", missing: "Help with my business.", add: "Check one public topic on X and prepare a short brief." },
  { label: "Source", missing: "Find what people think.", add: "Use original public posts from the last seven days and link each one." },
  { label: "Boundary", missing: "Handle it for me.", add: "Do not post, reply, connect accounts or schedule anything." },
  { label: "Result", missing: "Let me know what happened.", add: "Return up to five linked items and three draft follow-ups for my review." },
] as const;

const checks = [
  "I opened two original posts and the dates and descriptions match.",
  "The Bot did not post, send, connect another account or start a routine.",
  "The list saved me time, and I checked how much Grok Bot usage I have left this week.",
] as const;

export function GrokWritingPage({ guide }: { guide: GuidePage }) {
  const [activePart, setActivePart] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
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

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>Can Grok Bot do <span>one useful job</span> for you?</h1>
        <p>Give one Bot a public signal to track. Check its first brief and usage before asking it to work again.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.activity} aria-labelledby="grok-start-title">
        <div className={styles.sectionHead}><span>Start here</span><h2 id="grok-start-title">New to Grok Bot?</h2></div>
        <ol className={styles.setupList}>
          <li><strong>Check access.</strong> Grok Bot needs an eligible paid Cursor plan, or a linked individual SuperGrok or X Premium+ plan. <a href="https://cursor.com/help/grok-bot/plans" target="_blank" rel="noopener noreferrer">See which plans include it ↗</a></li>
          <li><strong>Install the app.</strong> Go to <a href="https://x.ai/bot" target="_blank" rel="noopener noreferrer">x.ai/bot ↗</a>, choose the download for your computer, install it and open Grok Bot.</li>
          <li><strong>Sign in.</strong> Select <strong>Sign in</strong>, finish the Cursor sign-in in your browser, then return to Grok Bot. If you use SuperGrok for access, link that account when the app asks.</li>
          <li><strong>Create one Bot.</strong> After the welcome screens, select <strong>Create your own</strong>. Name it <strong>Signal Scout</strong>. Give it one job: prepare a short brief from public X posts. If you have already passed the welcome screen, choose <strong>New → Create new Bot</strong>.</li>
          <li><strong>Use X only for this task.</strong> Send the instruction below. If the Bot asks to connect X, review that connection and sign in yourself. You do not need to connect email, files or a CRM.</li>
        </ol>
        <p className={styles.setupSource}>The setup path follows <a href="https://docs.x.ai/grok-bot/get-started" target="_blank" rel="noopener noreferrer">xAI’s current Grok Bot guide ↗</a>.</p>
      </section>

      <section className={styles.activity} aria-labelledby="writing-brief-title">
        <div className={styles.sectionHead}><span>Before you build</span><h2 id="writing-brief-title">Give the Bot a real job</h2></div>
        <p>Tap a part to turn “help with my business” into a task you can check.</p>
        <div className={styles.partGrid}>{briefParts.map((part, index) => <div key={part.label} className={styles.partGroup}>
          <button type="button" className={styles.partButton} aria-expanded={activePart === index} aria-controls={`writing-part-${index}`} onClick={() => setActivePart(index)}>{part.label}<span aria-hidden="true">{activePart === index ? "−" : "+"}</span></button>
          {activePart === index && <div id={`writing-part-${index}`} className={styles.partResult}><span>Too vague</span><p>{part.missing}</p><span>Tell the Bot</span><p>{part.add}</p></div>}
        </div>)}</div>
      </section>

      <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} heading="Get the Grok Bot instruction" guidePromise="Get the complete instruction for a source-linked brief, then check the posts it finds." actionLabel="Show the instruction" variant="unlock">
      <section className={styles.activity} aria-labelledby="writing-prompt-title">
        <div className={styles.sectionHead}><span>Run one read-only test</span><h2 id="writing-prompt-title">Ask for a source-linked brief</h2></div>
        <p>In Grok Bot, create one Bot called <strong>Signal Scout</strong>. Give it the public-topic job below. Replace the bracketed topic before sending.</p>
        <div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete Grok Bot instruction">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p className={styles.message} role="alert">Copy failed. Select the visible instruction text instead.</p>}
        <p className={styles.toolStep}>Paste the instruction into Signal Scout. If it asks you to sign in, enter your details yourself.</p>
      </section>

      <section className={styles.activity} aria-labelledby="writing-check-title">
        <div className={styles.sectionHead}><span>Check the result</span><h2 id="writing-check-title">Did it find useful posts?</h2></div>
        <p>Open two posts from the list. Check the dates and what the posts actually say. Then check how much Grok Bot usage you have left this week.</p>
        <div className={styles.checks}>{checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{check}</span></label>)}</div>
        <p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "If this helped, you can ask the Bot to check again when you need it. Decide later if you want automatic updates." : `${checked.filter(Boolean).length} of 3 checks complete. Check the posts before using the list.`}</p>
      </section>
      </GuideAccessBoundary>
    </div>
    <section className={styles.related} aria-labelledby="writing-related-title"><div className={styles.relatedInner}><h2 id="writing-related-title">Keep learning about Grok Bot</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
