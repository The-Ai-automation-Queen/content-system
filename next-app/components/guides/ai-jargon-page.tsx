"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import styles from "./ai-jargon-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const questions = ["What is behind it?", "What shapes its answer?", "What can it access or do?"];

export function AiJargonPage({ guide }: { guide: GuidePage }) {
  const groups = guide.sections.slice(1, 4).filter((section) => section.kind === "cards");
  const [groupIndex, setGroupIndex] = useState(0);
  const [termIndex, setTermIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const group = groups[groupIndex];
  if (group.kind !== "cards") return null;
  const term = group.items[termIndex];

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
        <h1>12 AI words <span>you need to know</span></h1>
        <p>Hear an AI term in a meeting or sales pitch? Find out what it means and what to ask next.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 500px" /></figure>
      </header>

      <section className={styles.intro} aria-labelledby="jargon-start-title">
        <GuideIcon name="search" />
        <div><h2 id="jargon-start-title">You do not need to learn a new language.</h2><p>Most AI terms help answer one of three questions. Pick the one you want to understand.</p></div>
      </section>

      <section className={styles.explorer} aria-labelledby="jargon-explore-title">
        <div className={styles.sectionHead}><span>Explore the words</span><h2 id="jargon-explore-title">What are you trying to understand?</h2></div>
        <div className={styles.questionNav} role="group" aria-label="Choose a question">
          {questions.map((question, index) => <button key={question} type="button" aria-pressed={groupIndex === index} onClick={() => { setGroupIndex(index); setTermIndex(0); }}><span>0{index + 1}</span>{question}</button>)}
        </div>
        <div className={styles.termArea}>
          <div className={styles.termList} role="group" aria-label="Choose an AI term">
            {group.items.map((item, index) => <button key={item.title} type="button" aria-pressed={termIndex === index} onClick={() => setTermIndex(index)}>{cleanLabel(item.title)}</button>)}
          </div>
          <article className={styles.definition} aria-live="polite"><span>{String(termIndex + 1).padStart(2, "0")} / {group.items.length}</span><h3>{cleanLabel(term.title)}</h3><p><Text value={term.body} /></p></article>
        </div>
        <p className={styles.explorerHint}>You can switch questions or words at any time.</p>
      </section>

      <section className={styles.example} aria-labelledby="jargon-example-title">
        <div className={styles.sectionHead}><span>Put the words to work</span><h2 id="jargon-example-title">What would you ask about this claim?</h2></div>
        <blockquote>“An AI assistant with secure integrations can automate your follow-ups.”</blockquote>
        <div className={styles.exampleGrid}>
          <div><strong>Behind it</strong><p>Which model or service is doing the work?</p></div>
          <div><strong>Shapes the answer</strong><p>What instructions and information does it use?</p></div>
          <div><strong>Access and actions</strong><p>Which apps can it read, and can it send anything?</p></div>
        </div>
        <p>The claim does not answer those questions. Ask before connecting a work account.</p>
      </section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="jargon-action-title">
        <div className={styles.sectionHead}><span>Try it yourself</span><h2 id="jargon-action-title">Decode one sentence you have seen</h2></div>
        <p>Choose a public product description or non-confidential note. Copy the prompt, replace the bracketed text, and paste it into an AI chat you are allowed to use.</p>
        <div className={styles.prompt}><details><summary>View the complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>
        <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>
      </section>}

      <section className={styles.finish} aria-labelledby="jargon-finish-title"><h2 id="jargon-finish-title">Now you can ask the useful question</h2><p>When a tool sounds impressive, find out what is behind it, what shapes its answer, and what it can actually access or do. You do not need to know every term to make a better decision.</p></section>
    </div>
    <section className={styles.related} aria-labelledby="jargon-related-title"><div className={styles.relatedInner}><h2 id="jargon-related-title">Where would you like to use this next?</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
