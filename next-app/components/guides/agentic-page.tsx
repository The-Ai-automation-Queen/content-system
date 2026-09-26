"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./agentic-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const routes = [
  { label: "I need an answer or draft", result: "Start with AI chat", icon: "prompt" as const },
  { label: "The steps stay the same", result: "A fixed automation may fit", icon: "settings" as const },
  { label: "The next step can change", result: "An agent may be useful", icon: "route" as const },
];

export function AgenticPage({ guide }: { guide: GuidePage }) {
  const [choice, setChoice] = useState(0);
  const [copied, setCopied] = useState(false);
  const comparison = guide.sections[0];
  const access = guide.sections[1];
  const levels = guide.sections[2];
  if (comparison.kind !== "cards" || access.kind !== "cards" || levels.kind !== "cards") return null;

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
        <h1>What AI agents <span>actually do</span></h1>
        <p>Does your task need an agent, or would a simpler tool do? Find the right starting point before connecting anything.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 500px" /></figure>
      </header>

      <section className={styles.choice} aria-labelledby="agentic-choice-title">
        <div className={styles.sectionHead}><span>Start with your task</span><h2 id="agentic-choice-title">What needs to happen?</h2></div>
        <div className={styles.choiceGrid}>
          {routes.map((route, index) => <div className={styles.choiceOption} key={route.label}><button type="button" aria-pressed={choice === index} onClick={() => setChoice(index)}><GuideIcon name={route.icon} /><strong>{route.label}</strong></button>{choice === index && <div className={styles.mobileResult} aria-live="polite"><strong>{route.result}</strong><p><Text value={comparison.items[index].body} /></p></div>}</div>)}
        </div>
        <div className={styles.choiceResult} aria-live="polite"><strong>{routes[choice].result}</strong><p><Text value={comparison.items[choice].body} /></p></div>
      </section>

      <section className={styles.answer} aria-label="What an agent is"><GuideIcon name="check" /><p><Text value={guide.answer.paragraphs[0]} /></p></section>

      <section className={styles.example} aria-labelledby="agentic-example-title">
        <div className={styles.sectionHead}><span>A work example</span><h2 id="agentic-example-title">Compare tools without buying one</h2></div>
        <ol><li><span>01</span><strong>Your job</strong><p>Ask for a shortlist from three public pricing pages.</p></li><li><span>02</span><strong>The agent&apos;s work</strong><p>If given web access, it can open the pages, compare plans and flag missing details.</p></li><li><span>03</span><strong>Your decision</strong><p>Check the sources and choose. It does not sign up or spend for you.</p></li></ol>
      </section>

      <section className={styles.access} aria-labelledby="agentic-access-title">
        <div className={styles.sectionHead}><span>Before you connect it</span><h2 id="agentic-access-title">What can the agent touch?</h2></div>
        <div className={styles.accessGrid}>{access.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p><Text value={item.body} /></p></article>)}</div>
        <p className={styles.accessNote}>Check both. A convincing answer does not tell you what the agent can read, change or send.</p>
      </section>

      <section className={styles.control} aria-labelledby="agentic-control-title">
        <div className={styles.sectionHead}><span>Choose a starting level</span><h2 id="agentic-control-title">How much should it do?</h2></div>
        <div className={styles.levels}>{levels.items.map((item, index) => <details key={item.title}><summary><span>0{index + 1}</span>{cleanLabel(item.title).replace(/^\d+\.\s*/, "")}</summary><p><Text value={item.body} /></p></details>)}</div>
        <p className={styles.controlNote}>For a first test, let it prepare a result you can inspect before it changes anything.</p>
      </section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="agentic-action-title">
        <div className={styles.sectionHead}><span>Try it with one task</span><h2 id="agentic-action-title">Does your task need an agent?</h2></div>
        <p>Think of a task you do repeatedly. Open <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a> or another work-approved AI chat, copy the prompt, replace the brackets and send it. Do not include private information.</p>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} heading="Get the task-check prompt" guidePromise="Use this complete prompt to describe your task and see if a chat, fixed automation or agent fits. We’ll email you a link back to the guide." actionLabel="Show me the prompt" variant="unlock">
        <div className={styles.prompt}><details open><summary>Complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>
        <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>
        </GuideAccessBoundary>
      </section>}
    </div>
    <section className={styles.related} aria-labelledby="agentic-related-title"><div className={styles.relatedInner}><h2 id="agentic-related-title">Before you give an agent access</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
