"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import styles from "./privacy-guide-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const categoryLabels = ["Keep it out", "Ask first", "Safer to test"];

export function PrivacyGuidePage({ guide }: { guide: GuidePage }) {
  const [category, setCategory] = useState<number | null>(null);
  const [tool, setTool] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const sort = guide.sections[0];
  const tools = guide.sections[1];
  if (sort.kind !== "cards" || tools.kind !== "accordion") return null;

  async function copyPrompt() {
    if (!guide.tryNow) return;
    await navigator.clipboard.writeText(guide.tryNow.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>Before you paste it into AI, <span>check this</span></h1>
        <p>Some details should stay out. Others need permission. Sort what you have, then check the tool you use.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.sort} aria-labelledby="privacy-sort-title">
        <div className={styles.sectionHead}><span>1. Sort the information</span><h2 id="privacy-sort-title">What are you about to share?</h2></div>
        <div className={styles.sortGrid}>{sort.items.map((item, index) => <div className={styles.sortOption} key={item.title}>
          <button type="button" aria-pressed={category === index} onClick={() => setCategory(category === index ? null : index)}><span className={styles.number}>0{index + 1}</span><strong>{categoryLabels[index]}</strong><span className={styles.chevron}>{category === index ? "−" : "+"}</span></button>
          {category === index && <div className={styles.sortResult} aria-live="polite"><Text value={item.body} /></div>}
        </div>)}</div>
        <p className={styles.sortNote}>If you are unsure, remove the real details and use an invented example.</p>
      </section>

      <section className={styles.flow} aria-label="Three checks before using AI"><div><GuideIcon name="alert" /><strong>Need it?</strong><span>Can you do the task without the real details?</span></div><div><GuideIcon name="check" /><strong>Allowed?</strong><span>Do you have permission to share them?</span></div><div><GuideIcon name="settings" /><strong>Right tool?</strong><span>Is this account approved for the task?</span></div></section>

      <section className={styles.tools} aria-labelledby="privacy-tools-title">
        <div className={styles.sectionHead}><span>2. Check the tool</span><h2 id="privacy-tools-title">Where is the privacy setting?</h2></div>
        <p>Pick the tool you use. Turning off training gives you more control, but it does not give you permission to share confidential work.</p>
        <div className={styles.toolGrid}>{tools.items.map((item, index) => <div className={styles.toolOption} key={item.title}>
          <button type="button" aria-pressed={tool === index} onClick={() => setTool(tool === index ? null : index)}><strong>{item.title}</strong><span>{tool === index ? "−" : "+"}</span></button>
          {tool === index && <div className={styles.toolResult} aria-live="polite"><p><Text value={item.body} /></p>{item.links?.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>}
        </div>)}</div>
      </section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="privacy-action-title"><div className={styles.sectionHead}><span>3. Test without sharing it</span><h2 id="privacy-action-title">Check one task before you paste anything</h2></div><p>Open a work-approved AI chat. Copy this prompt and replace the brackets with <strong>types of information only</strong>, such as “customer emails”. Do not paste real names or files.</p><div className={styles.prompt}><details><summary>View the complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div><div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div></section>}

      <p className={styles.finish}><strong>Still unsure?</strong> Leave the information out until you have permission and an approved tool.</p>
    </div>
    <section className={styles.related} aria-labelledby="privacy-related-title"><div className={styles.relatedInner}><h2 id="privacy-related-title">Know what your AI tool can see</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
