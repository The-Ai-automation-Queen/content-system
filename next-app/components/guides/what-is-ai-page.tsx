"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./what-is-ai-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function WhatIsAiPage({ guide }: { guide: GuidePage }) {
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState(0);
  const [readAll, setReadAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [decision, setDecision] = useState<"use" | "correct" | "review" | null>(null);
  const choiceSection = guide.sections[0];
  const sections = guide.sections.slice(1);

  async function copy() {
    if (!guide.tryNow) return;
    await navigator.clipboard.writeText(guide.tryNow.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>What AI <span>actually is</span></h1>
          <p>{guide.promise}</p>
        </div>
        <figure className={styles.heroImage}><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 340px" /></figure>
      </header>

      {choiceSection.kind === "cards" && <section className={styles.quickStart} aria-labelledby="ai-choice-title">
        <div className={styles.quickHead}><span>Start here</span><h2 id="ai-choice-title">{choiceSection.heading}</h2><p>{choiceSection.introduction}</p></div>
        <div className={styles.choiceGrid}>{choiceSection.items.map((item, itemIndex) => <button type="button" key={item.title} onClick={() => setSelected(itemIndex)} aria-pressed={selected === itemIndex}><GuideIcon name={itemIndex === 3 ? "prompt" : itemIndex === 2 ? "route" : "settings"} /><span>{cleanLabel(item.title)}</span></button>)}</div>
        <div className={styles.choiceResult} aria-live="polite"><strong>{cleanLabel(choiceSection.items[selected].title)}</strong><p><Text value={choiceSection.items[selected].body} /></p></div>
        <a className={styles.jump} href="#ai-action-title">Try it with a task from my week →</a>
      </section>}

      <section className={styles.answer} aria-label="The answer">
        <GuideIcon name="check" />
        <div>{guide.answer.paragraphs.map(paragraph => <p key={paragraph}><Text value={paragraph} /></p>)}</div>
      </section>

      <div className={styles.controls}>
        <div><h2>Two things worth knowing</h2><p>Pick one or read both.</p></div>
        <button type="button" onClick={() => setReadAll(!readAll)} aria-pressed={readAll}>{readAll ? "Show one step" : "Read all steps"}</button>
      </div>
      <nav className={styles.map} aria-label="Guide steps">
        {sections.map((section, index) => <button key={section.heading} type="button" onClick={() => { setStage(index); setReadAll(false); }} aria-current={!readAll && stage === index ? "step" : undefined}>
          <span>{String(index + 1).padStart(2, "0")}</span>{section.heading}
        </button>)}
      </nav>

      {sections.map((section, index) => <section key={section.heading} className={styles.stage} hidden={!readAll && stage !== index} aria-labelledby={`ai-step-${index}`}>
        <div className={styles.stageHead}><span>Step {index + 1} / {sections.length}</span><h2 id={`ai-step-${index}`}>{section.heading}</h2></div>
        {section.kind === "diagram" ? <ol className={`${styles.flow} ${section.variant === "checks" ? styles.checkDiagram : ""}`} aria-label={section.heading}>{section.nodes.map((node, nodeIndex) => <li key={node.title}><span className={styles.flowNumber}>{String(nodeIndex + 1).padStart(2, "0")}</span><strong>{node.title}</strong><p>{node.body}</p></li>)}</ol> : section.kind === "cards" ? <>
          {section.introduction && <p>{section.introduction}</p>}
          <div className={styles.choiceGrid}>{section.items.map((item, itemIndex) => <button type="button" key={item.title} onClick={() => setSelected(itemIndex)} aria-pressed={selected === itemIndex}><GuideIcon name={itemIndex === 3 ? "prompt" : itemIndex === 2 ? "route" : "settings"} /><span>{cleanLabel(item.title)}</span></button>)}</div>
          <div className={styles.choiceResult} aria-live="polite"><strong>{cleanLabel(section.items[selected].title)}</strong><p><Text value={section.items[selected].body} /></p></div>
        </> : section.kind === "prose" ? <>
          {section.paragraphs.map(paragraph => <p key={paragraph}><Text value={paragraph} /></p>)}
          {section.keyLine && <div className={styles.takeaway}><GuideIcon name="alert" /><p><Text value={section.keyLine} /></p></div>}
        </> : null}
        {!readAll && <div className={styles.stageNav}>
          <button type="button" onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0}>← Back</button>
          <span>{index + 1} of {sections.length}</span>
          <button type="button" onClick={() => setStage(Math.min(sections.length - 1, stage + 1))} disabled={stage === sections.length - 1}>Next →</button>
        </div>}
      </section>)}

      {guide.tryNow && <section className={styles.action} aria-labelledby="ai-action-title">
        <div className={styles.actionHeading}><GuideIcon name="prompt" /><div><span>Try it at work</span><h2 id="ai-action-title">{guide.tryNow.heading}</h2></div></div>
        {guide.tryNow.workedExample && <div className={styles.example}><strong>Example</strong><p><b>Task:</b> {guide.tryNow.workedExample.task}</p><ol className={styles.exampleFlow}>{guide.tryNow.workedExample.signals.map((line, index) => <li key={line}><span>{String(index + 1).padStart(2, "0")}</span><p>{line}</p></li>)}</ol><p><b>Next:</b> {guide.tryNow.workedExample.decision}</p></div>}
        <p><Text value={guide.tryNow.introduction} /></p>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} heading="Try this with your own task" guidePromise="Get the complete prompt and a short check for your result. We’ll email you a link to return to the guide." actionLabel="Show me the full prompt" variant="unlock">
        <p className={styles.firstUse}>Open <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a> or another AI chat approved for work. Start a new chat, press <strong>Copy</strong>, paste the prompt, replace the brackets and send.</p>
        <div className={styles.promptBlock}><details open><summary>Complete copyable prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button className={styles.promptCopy} type="button" onClick={copy} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button><span className={styles.srOnly} role="status" aria-live="polite">{copied ? "Prompt copied" : ""}</span></div>
        <div className={styles.resultCheck}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>
        <section className={styles.finish} aria-labelledby="ai-finish-title">
          <h2 id="ai-finish-title">What should you do with your result?</h2>
          <p>Compare the answer with your original material. Then choose what happened.</p>
          <div className={styles.decisionChoices} role="group" aria-label="Choose what happened in your AI test">
            <button type="button" aria-pressed={decision === "use"} onClick={() => setDecision("use")}>The details match</button>
            <button type="button" aria-pressed={decision === "correct"} onClick={() => setDecision("correct")}>It guessed or missed something</button>
            <button type="button" aria-pressed={decision === "review"} onClick={() => setDecision("review")}>A mistake could matter</button>
          </div>
          {decision && <p className={styles.decisionResult} role="status">{decision === "use" ? "Good first test. If it saved you time, try a larger piece of approved material. Keep checking the source." : decision === "correct" ? "Correct the answer and try again on the same small sample. Do not use the uncorrected version." : "Have a person review it before anyone acts on it, especially if money, customers, access or rights could be affected."}</p>}
        </section>
        </GuideAccessBoundary>
      </section>}
    </div>
    <section className={styles.related} aria-labelledby="ai-related-title"><div className={styles.relatedInner}><h2 id="ai-related-title">What would you like to know before using AI at work?</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
