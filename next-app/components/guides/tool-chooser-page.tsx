"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import styles from "./tool-chooser-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const chatLinks = [
  { label: "ChatGPT", href: "https://chatgpt.com/" },
  { label: "Claude", href: "https://claude.ai/" },
  { label: "Gemini", href: "https://gemini.google.com/" },
];

export function ToolChooserPage({ guide }: { guide: GuidePage }) {
  const [job, setJob] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const jobs = guide.sections[0];
  const otherTools = guide.sections[1];
  const test = guide.sections[3];
  if (jobs.kind !== "cards" || otherTools.kind !== "accordion" || test.kind !== "steps") return null;

  async function copyPrompt() {
    if (!guide.tryNow) return;
    try {
      await navigator.clipboard.writeText(guide.tryNow.prompt);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>Which AI tool <span>should you try first?</span></h1>
        <p>Start with the job you need to finish. You can leave with a shortlist of no more than 2 tools to test.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.job} aria-labelledby="tool-job-title">
        <div className={styles.sectionHead}><span>Start with the work</span><h2 id="tool-job-title">What do you need help with?</h2></div>
        <div className={styles.jobGrid}>{jobs.items.map((item, index) => <div className={styles.jobOption} key={item.title}>
          <button type="button" aria-pressed={job === index} onClick={() => setJob(job === index ? null : index)}><GuideIcon name={index === 3 ? "search" : index === 0 ? "prompt" : "settings"} /><strong>{item.title}</strong><span>{job === index ? "−" : "+"}</span></button>
          {job === index && <div className={styles.jobResult} aria-live="polite"><Text value={item.body} /></div>}
        </div>)}</div>
        <p className={styles.jobNote}>A shortlist is a starting point. You still need to test the result and check your account rules.</p>
      </section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="tool-action-title">
        <div className={styles.sectionHead}><span>Build your shortlist</span><h2 id="tool-action-title">Ask one tool to narrow the choice</h2></div>
        <p>Open one AI chat you are allowed to use. Copy the prompt, replace the brackets with a real task but leave private details out, then send it.</p>
        <div className={styles.chatLinks}>{chatLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">Open {link.label} ↗</a>)}</div>
        <div className={styles.prompt}><details><summary>View the complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p role="alert">Copy failed. Open the complete prompt and select the text instead.</p>}
        <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>
      </section>}

      <section className={styles.test} aria-labelledby="tool-test-title">
        <div className={styles.sectionHead}><span>Before you pay or connect files</span><h2 id="tool-test-title">Run the same small test in 2 tools</h2></div>
        <div className={styles.stepNav} aria-label="Test steps">{test.steps.map((item, index) => <button type="button" key={item.title} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{index + 1}</span><strong>{item.title}</strong></button>)}</div>
        <div className={styles.stepBody} aria-live="polite"><span>Step {step + 1} / {test.steps.length}</span><h3>{test.steps[step].title}</h3><p><Text value={test.steps[step].body} /></p>{step === 1 && <p className={styles.sameInput}>Use the same prompt and the same non-confidential material in both tools. The differences will be easier to judge.</p>}</div>
        <div className={styles.stepActions}><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</button><button type="button" onClick={() => setStep(Math.min(test.steps.length - 1, step + 1))} disabled={step === test.steps.length - 1}>Next step</button></div>
      </section>

      <section className={styles.more} aria-labelledby="tool-more-title"><div className={styles.sectionHead}><span>If the first shortlist does not fit</span><h2 id="tool-more-title">What about the other tools?</h2></div><div className={styles.moreGrid}>{otherTools.items.map(item => <details key={item.title}><summary>{item.title}</summary><p><Text value={item.body} /></p>{item.links?.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</details>)}</div></section>
      <p className={styles.finish}><strong>Keep the tool that helps you finish the task</strong> with fewer corrections and without sharing information you should keep private.</p>
    </div>
    <section className={styles.related} aria-labelledby="tool-related-title"><div className={styles.relatedInner}><h2 id="tool-related-title">Choose what to learn before you connect a tool</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
