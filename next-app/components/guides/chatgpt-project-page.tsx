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

const testMessage = "Write an event description in 80 words or fewer. State who it is for, the format and what people will learn. Use only facts available in this chat or Project. If a detail is missing, write ‘Not decided’ instead of guessing.";

export function ChatGptProjectPage({ guide }: { guide: GuidePage }) {
  const [mode, setMode] = useState<"chat" | "project">("project");
  const [step, setStep] = useState(1);
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
      {index === 1 && guide.tryNow && <><p className={styles.instructionNote}>In your Project, open <strong>••• → Project settings</strong>. Copy this instruction into the Project instructions field.</p><div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyInstruction} aria-label="Copy the complete Project instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError === "instruction" && <p role="alert">Copy failed. Select the visible Project instruction instead.</p>}</>}
      {(index === 2 || index === 3) && <><div className={styles.prompt}><pre>{testMessage}</pre><button type="button" onClick={copyTestMessage} aria-label="Copy the test message">{testCopied ? "Copied" : "Copy"}</button></div>{copyError === "test" && <p role="alert">Copy failed. Select the test message instead.</p>}</>}
      {index === 3 && guide.tryNow && <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>}
    </article>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Why does ChatGPT forget <span>what you told it?</span></h1><p>Put the few facts that must stay the same in a Project. Test if a new chat uses them without another reminder.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#project-choice-title">01 · Choose chat or Project</a><a href="#project-example-title">02 · See the sample brief</a><a href="#project-access-title">03 · Build and test it</a></nav>
      <p className={styles.promise}>By the end, you will have a small Project brief and a test to see if ChatGPT keeps the right facts in a new chat.</p>

      <section className={styles.choice} aria-labelledby="project-choice-title"><div className={styles.sectionHead}><span>Choose where to work</span><h2 id="project-choice-title">One question or ongoing work?</h2></div><div className={styles.choiceGrid}><div><button type="button" aria-pressed={mode === "chat"} onClick={() => setMode("chat")}><GuideIcon name="prompt" /><strong>One-off question</strong></button>{mode === "chat" && <p className={styles.choiceResult}>Use a normal chat. Give it the context it needs for this answer.</p>}</div><div><button type="button" aria-pressed={mode === "project"} onClick={() => setMode("project")}><GuideIcon name="book" /><strong>Several related chats</strong></button>{mode === "project" && <p className={styles.choiceResult}>Use a Project to keep related chats, files and instructions together.</p>}</div></div></section>

      <section className={styles.example} aria-labelledby="project-example-title"><div className={styles.sectionHead}><span>One example you can try</span><h2 id="project-example-title">Keep an event brief steady</h2></div><p>Imagine you are planning a short online session. You will draft an event description today and an invitation next week. Both need the same facts. Keep those facts in one Project, then test a fresh chat inside it.</p><div className={styles.facts}>{factItems.map(fact => <div key={fact.title}><strong>{fact.title}</strong><span><Text value={fact.body} /></span></div>)}</div><p>Use this invented event first. It lets you see whether the Project keeps the audience, format and boundary before you add any real work.</p></section>

      <section className={styles.publicStep} aria-labelledby="project-first-step-title"><div className={styles.sectionHead}><span>Start the setup</span><h2 id="project-first-step-title">Create your test Project</h2></div><p>Open <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT ↗</a>, select <strong>New project</strong> in the sidebar and name it <strong>Autumn event plan</strong>. Choose any icon and colour. You do not need to add a file or connect an app for this test.</p></section>

      <div id="project-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the Project instruction" guidePromise="Get the complete instruction, test message and a link back to this guide." actionLabel="Show me the instruction and test">

      <section className={styles.walkthrough} aria-labelledby="project-walkthrough-title"><div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Finish the test</span><h2 id="project-walkthrough-title">Add the brief, then try a new chat</h2></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button></div><p className={styles.intro}>Follow the remaining steps in order. The Project instruction and test message are fully visible where you need them.</p><div className={styles.stepNav} aria-label="Project steps">{stages.steps.slice(1).map((item, offset) => { const index = offset + 1; return <button type="button" key={item.title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setShowAll(false); setStep(index); }}><span>{index + 1}</span><strong>{item.title}</strong></button>; })}</div>{stages.steps.slice(1).map((item, offset) => { const index = offset + 1; return <div key={item.title} hidden={!showAll && step !== index}>{stage(index)}</div>; })}{!showAll && <div className={styles.stepActions}><button type="button" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>Back</button><button type="button" disabled={step === stages.steps.length - 1} onClick={() => setStep(Math.min(stages.steps.length - 1, step + 1))}>Next step</button></div>}</section>

      <p className={styles.finish}><strong>The test is simple:</strong> does a new chat inside the Project keep the four facts and leave undecided details undecided?</p>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="project-related-title"><div className={styles.relatedInner}><h2 id="project-related-title">Keep the next ChatGPT answer on track</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
