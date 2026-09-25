"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./chatgpt-project-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const testMessage = `Draft a two-sentence introduction for the new service page. Say who it is for and name the two kinds of help. Use the facts saved in this Project. Do not add a price, a launch date or a claim that the wording is approved. After the draft, list anything you still need me to confirm. If you cannot find the brief, tell me before writing.`;

export function ChatGptProjectPage({ guide }: { guide: GuidePage }) {
  const [mode, setMode] = useState<"chat" | "project">("project");
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testCopied, setTestCopied] = useState(false);
  const [copyError, setCopyError] = useState<"instruction" | "test" | null>(null);
  const stages = guide.sections[0];
  const facts = guide.sections[1];
  if (stages.kind !== "steps" || facts.kind !== "cards") return null;
  const stageSteps = stages.steps;
  const factItems = facts.items;

  async function copyInstruction() {
    if (!guide.tryNow) return;
    try {
      await navigator.clipboard.writeText(guide.tryNow.prompt);
      setCopied(true);
      setCopyError(null);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError("instruction");
    }
  }

  async function copyTestMessage() {
    try {
      await navigator.clipboard.writeText(testMessage);
      setTestCopied(true);
      setCopyError(null);
      window.setTimeout(() => setTestCopied(false), 1800);
    } catch {
      setCopyError("test");
    }
  }

  function stage(index: number) {
    const item = stageSteps[index];
    return <article className={styles.stage} key={item.title}><span>Step {index + 1} / {stageSteps.length}</span><h3>{item.title}</h3><p><Text value={item.body} /></p>
      {index === 0 && <a className={styles.openChat} href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a>}
      {index === 1 && guide.tryNow && <><div className={styles.facts}>{factItems.map(fact => <div key={fact.title}><strong>{fact.title}</strong><span><Text value={fact.body} /></span></div>)}</div><p className={styles.instructionNote}>Paste this into <strong>Project settings → Instructions</strong>. Keep it visible so you can compare the next answer with it.</p><div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyInstruction} aria-label="Copy the complete Project instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError === "instruction" && <p role="alert">Copy failed. Select the visible instruction text instead.</p>}</>}
      {index === 2 && <><div className={styles.prompt}><pre>{testMessage}</pre><button type="button" onClick={copyTestMessage} aria-label="Copy the test message">{testCopied ? "Copied" : "Copy"}</button></div>{copyError === "test" && <p role="alert">Copy failed. Select the test message instead.</p>}{guide.tryNow && <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>}</>}
    </article>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Why does ChatGPT forget <span>what you told it?</span></h1>
          <p>It may use past chats, but it does not keep every detail as a rule. Give ongoing work a short Project brief, then check the next answer against it.</p>
        </div>
        <figure className={styles.heroImage}><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 500px" /></figure>
      </header>

      <section className={styles.choice} aria-labelledby="project-choice-title"><div className={styles.sectionHead}><span>Find the right fix</span><h2 id="project-choice-title">Will you need these facts again?</h2></div><div className={styles.choiceGrid}><div><button type="button" aria-pressed={mode === "chat"} onClick={() => setMode("chat")}><GuideIcon name="prompt" /><strong>No, this is one question</strong></button>{mode === "chat" && <p className={styles.choiceResult}>Stay in a normal chat. Put the essential facts beside the request you are sending now.</p>}</div><div><button type="button" aria-pressed={mode === "project"} onClick={() => setMode("project")}><GuideIcon name="book" /><strong>Yes, across several chats</strong></button>{mode === "project" && <p className={styles.choiceResult}>Use a Project. Save the facts once as instructions, then check the answer in a new chat inside it.</p>}</div></div></section>

      <section className={styles.walkthrough} aria-labelledby="project-walkthrough-title"><div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Try it yourself</span><h2 id="project-walkthrough-title">Make one brief that carries over</h2></div></div><p className={styles.intro}>The service launch below is an example. Follow it once, then replace the facts with details you are allowed to share.</p><button className={styles.showAll} type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button><div className={styles.stepNav} aria-label="Project steps">{stages.steps.map((item, index) => <button type="button" key={item.title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setShowAll(false); setStep(index); }}><span>{index + 1}</span><strong>{item.title}</strong></button>)}</div>{stages.steps.map((item, index) => <div key={item.title} hidden={!showAll && step !== index}>{stage(index)}</div>)}{!showAll && <div className={styles.stepActions}><button type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button><button type="button" disabled={step === stages.steps.length - 1} onClick={() => setStep(Math.min(stages.steps.length - 1, step + 1))}>Next step</button></div>}</section>

      <p className={styles.finish}><strong>Keep the brief current.</strong> If a price, date or other fact changes, update the Project instructions before the next draft.</p>
    </div>
    <section className={styles.related} aria-labelledby="project-related-title"><div className={styles.relatedInner}><h2 id="project-related-title">Keep the next ChatGPT answer on track</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
