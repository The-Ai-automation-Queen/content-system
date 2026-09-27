"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./chatgpt-project-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const firstMessage = "Write an event description in 80 words or fewer. State who it is for, the format and what people will learn. Use only the confirmed Project facts. If a detail is missing, write ‘Not decided’ instead of guessing.";
const secondMessage = "Write a short invitation for the same event. Include who it is for, the format and what people will learn. Keep any recording or date unconfirmed unless the Project facts confirm it. Do not ask me to paste the brief again.";

export function ChatGptProjectPage({ guide }: { guide: GuidePage }) {
  const [mode, setMode] = useState<"chat" | "project">("project");
  const [step, setStep] = useState(1);
  const [showAll, setShowAll] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedTest, setCopiedTest] = useState<"first" | "second" | null>(null);
  const [copyError, setCopyError] = useState<"instruction" | "first" | "second" | null>(null);
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

  async function copyTestMessage(kind: "first" | "second", message: string) {
    try {
      await navigator.clipboard.writeText(message);
      setCopiedTest(kind);
      setCopyError(null);
      window.setTimeout(() => setCopiedTest(null), 1800);
    } catch {
      setCopyError(kind);
    }
  }

  function stage(index: number) {
    const item = stageSteps[index];
    return <article className={styles.stage} key={item.title}><span>Step {index + 1} / {stageSteps.length}</span><h3>{item.title}</h3><p><Text value={item.body} /></p>
      {index === 0 && <a className={styles.openChat} href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a>}
      {index === 1 && guide.tryNow && <><div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyInstruction} aria-label="Copy the complete Project instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError === "instruction" && <p role="alert">Copy failed. Select the visible Project instruction instead.</p>}</>}
      {index === 2 && <><div className={styles.prompt}><pre>{firstMessage}</pre><button type="button" onClick={() => copyTestMessage("first", firstMessage)} aria-label="Copy the event-description message">{copiedTest === "first" ? "Copied" : "Copy"}</button></div>{copyError === "first" && <p role="alert">Copy failed. Select the visible message instead.</p>}</>}
      {index === 3 && <><div className={styles.prompt}><pre>{secondMessage}</pre><button type="button" onClick={() => copyTestMessage("second", secondMessage)} aria-label="Copy the invitation message">{copiedTest === "second" ? "Copied" : "Copy"}</button></div>{copyError === "second" && <p role="alert">Copy failed. Select the visible message instead.</p>}</>}
      {index === 3 && guide.tryNow && <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>}
    </article>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Why does ChatGPT forget <span>what you told it?</span></h1><p>Put the few facts that must stay the same in a Project. Test if a new chat uses them without another reminder.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#project-choice-title">01 · Choose chat or Project</a><a href="#project-example-title">02 · See the sample brief</a><a href="#project-access-title">03 · Build and test it</a></nav>
      <p className={styles.promise}>A new chat may not have the brief you gave in another conversation. A Project keeps related chats and instructions together. You still need to check what each answer actually used.</p>

      <section className={styles.choice} aria-labelledby="project-choice-title"><div className={styles.sectionHead}><span>Choose where to work</span><h2 id="project-choice-title">One question or ongoing work?</h2></div><div className={styles.choiceGrid}><div><button type="button" aria-pressed={mode === "chat"} onClick={() => setMode("chat")}><GuideIcon name="prompt" /><strong>One-off question</strong></button>{mode === "chat" && <p className={styles.choiceResult}>Use a normal chat. Give it the context it needs for this answer.</p>}</div><div><button type="button" aria-pressed={mode === "project"} onClick={() => setMode("project")}><GuideIcon name="book" /><strong>Several related chats</strong></button>{mode === "project" && <p className={styles.choiceResult}>Use a Project to keep related chats, files and instructions together.</p>}</div></div></section>

      <section className={styles.example} aria-labelledby="project-example-title"><div className={styles.sectionHead}><span>One example you can try</span><h2 id="project-example-title">Keep an event brief steady</h2></div><p>Imagine you are planning a short online session. You need an event description today and an invitation next week. Both must use the same facts. Put those facts in one Project, then start a separate chat for each draft.</p><div className={styles.facts}>{factItems.map(fact => <div key={fact.title}><strong>{fact.title}</strong><span><Text value={fact.body} /></span></div>)}</div><p>Use this invented event first. It lets you see if the second chat keeps the brief without you repeating it.</p></section>

      <section className={styles.publicStep} aria-labelledby="project-first-step-title"><div className={styles.sectionHead}><span>Start the setup</span><h2 id="project-first-step-title">Create your test Project</h2></div><p>Open <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT ↗</a>, select <strong>New project</strong> in the sidebar and name it <strong>Autumn event plan</strong>. Choose any icon and colour. You do not need to add a file or connect an app for this test.</p></section>

      <div id="project-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the Project instruction" guidePromise="Get the complete instruction, test message and a link back to this guide." actionLabel="Show me the instruction and test">

      <section className={styles.walkthrough} aria-labelledby="project-walkthrough-title"><div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Finish the test</span><h2 id="project-walkthrough-title">Add the brief, then try two chats</h2></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button></div><p className={styles.intro}>Follow the remaining steps in order. The Project instruction and both test messages are visible where you need them.</p><div className={styles.stepNav} aria-label="Project steps">{stages.steps.slice(1).map((item, offset) => { const index = offset + 1; return <button type="button" key={item.title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setShowAll(false); setStep(index); }}><span>{index + 1}</span><strong>{item.title}</strong></button>; })}</div>{stages.steps.slice(1).map((item, offset) => { const index = offset + 1; return <div key={item.title} hidden={!showAll && step !== index}>{stage(index)}</div>; })}{!showAll && <div className={styles.stepActions}><button type="button" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>Back</button><button type="button" disabled={step === stages.steps.length - 1} onClick={() => setStep(Math.min(stages.steps.length - 1, step + 1))}>Next step</button></div>}</section>

      <p className={styles.finish}><strong>Check the invitation:</strong> did the second chat keep the four facts and leave the date and recording unconfirmed?</p>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="project-related-title"><div className={styles.relatedInner}><h2 id="project-related-title">Keep the next ChatGPT answer on track</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
