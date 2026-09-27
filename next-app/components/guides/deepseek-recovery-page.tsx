"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./deepseek-recovery-page.module.css";

const example = [
  { label: "Brief", value: "Goal: prepare a customer welcome sequence. Audience: new customers. Keep the approved tone." },
  { label: "Sources", value: "The approved FAQ and current pricing document. Keep both originals." },
  { label: "Decisions", value: "The first email has no discount. Sales has not approved any price claim." },
  { label: "Approved work", value: "Welcome email version 2, saved outside the chat." },
  { label: "Restart prompt", value: "Using the approved FAQ and welcome email version 2, draft email 2 for new customers in the same tone. Leave out prices and discounts. Ask me if a needed fact is missing." },
] as const;

export function DeepseekRecoveryPage({ guide }: { guide: GuidePage }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const files = guide.sections[0];
  if (files.kind !== "cards" || !guide.tryNow) return null;
  const related = publicGuides.filter(item => ["what-should-you-never-share-with-ai", "what-is-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>Could you continue a DeepSeek project <span>without its chat?</span></h1><p>Save the decisions, source material and latest approved work you would need to pick up where you left off.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#recovery-pack-title">What to keep</a><a href="#recovery-example-title">See an example</a><a href="#recovery-prompt-title">Get the restart instruction</a><a href="#recovery-test-title">Test the handover</a></nav>

      <section className={styles.activity} aria-labelledby="recovery-pack-title"><div className={styles.sectionHead}><span>01 · Save the work</span><h2 id="recovery-pack-title">Keep five things outside the chat</h2></div><p className={styles.intro}>Use a folder you are allowed to use for this project. The brief and decision log can be short; keep source files and approved work in their original format.</p><div className={styles.fileGrid}>{files.items.map((file, index) => <div key={file.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{file.title}</strong><p>{file.body}</p></div>)}</div></section>

      <section className={styles.activity} aria-labelledby="recovery-example-title"><div className={styles.sectionHead}><span>02 · See an example</span><h2 id="recovery-example-title">If the chat was about a welcome email</h2></div><p className={styles.intro}>A new conversation would need the facts below. A long transcript alone makes it hard to tell what was actually approved.</p><div className={styles.example}>{example.map(item => <div key={item.label}><strong>{item.label}</strong><p>{item.value}</p></div>)}</div><p className={styles.sourceNote}>The approved email and pricing document stay in their original files. A summary from DeepSeek is only a starting point for the brief.</p></section>

      <section className={styles.activity} aria-labelledby="recovery-prompt-title"><div className={styles.sectionHead}><span>03 · Make the restart brief</span><h2 id="recovery-prompt-title">Get the full instruction</h2></div><p className={styles.intro}>Use this in your current DeepSeek chat. Check its answer against your files and decisions before saving anything. It will give you a short instruction to use in the next chat.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Open the restart instruction" guidePromise="Get the complete instruction and a link back to this guide." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete DeepSeek restart instruction">{copied ? "Copied" : "Copy"}</button><pre>{guide.tryNow.prompt}</pre></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="recovery-test-title"><div className={styles.sectionHead}><span>04 · Test the handover</span><h2 id="recovery-test-title">Can a new chat take the next step?</h2></div><div className={styles.testFlow}><span>New chat</span><span aria-hidden="true">→</span><span>Relevant files</span><span aria-hidden="true">→</span><span>Restart instruction</span></div><ol className={styles.steps}><li>Open a new conversation in DeepSeek or another tool approved for this work.</li><li>Add only the files needed for the next task and paste the restart instruction you checked.</li><li>Ask it to list approved decisions and open questions before doing new work. If it guesses or misses something, correct the saved brief and try again.</li></ol></section>
    </div>
    <section className={styles.related} aria-labelledby="recovery-related-title"><div className={styles.relatedInner}><h2 id="recovery-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
