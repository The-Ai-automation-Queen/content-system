"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./kimi-value-page.module.css";

const jobs = [
  { label: "Long document", check: "Use the same public document in Kimi and your current tool. Compare what each finishes and what you must correct." },
  { label: "Small code change", check: "Use the same disposable practice project in both tools. Compare the finished diff and the time needed to check it." },
  { label: "Five-slide draft", check: "Use the same public source and five-slide brief in both tools. Compare finished slides and corrections." },
] as const;

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function KimiValuePage({ guide }: { guide: GuidePage }) {
  const [job, setJob] = useState(0);
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const steps = guide.sections[0];
  const decisions = guide.sections[1];
  if (steps.kind !== "steps" || decisions.kind !== "cards" || !guide.tryNow) return null;
  const decisionPrompt = guide.tryNow.prompt.replace("[ONE REPEATED JOB]", jobs[job].label);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(decisionPrompt);
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
      <header className={styles.hero}><h1>Would paying for Kimi <span>finish more work?</span></h1><p>Test one repeated job. Check the result, the effort and the credit limit before you decide.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="kimi-job-title"><div className={styles.sectionHead}><span>Start with the work</span><h2 id="kimi-job-title">Which job would you repeat?</h2></div><div className={styles.jobGrid}>{jobs.map((item, index) => <div key={item.label} className={styles.jobOption}><button type="button" aria-pressed={job === index} onClick={() => setJob(index)}>{item.label}</button>{job === index && <p>{item.check}</p>}</div>)}</div><p className={styles.jobNote}>Use a public or invented input for the test. Do not combine several jobs into one result.</p></section>

      <section className={styles.activity} aria-labelledby="kimi-test-title"><div className={styles.sectionHead}><span>Four things to record</span><h2 id="kimi-test-title">Run the same test in both tools</h2></div><div className={styles.stepList}>{steps.steps.map((item, index) => <div key={item.title} className={styles.stepItem}><button type="button" aria-expanded={step === index} aria-controls={`kimi-step-${index}`} onClick={() => setStep(index)}><span>{index + 1}. {item.title}</span><span aria-hidden="true">{step === index ? "−" : "+"}</span></button>{step === index && <div id={`kimi-step-${index}`}><Text value={item.body} /></div>}</div>)}</div><p className={styles.sourceLink}>Check <a href="https://www.kimi.com/en/help/membership/membership-overview" target="_blank" rel="noopener noreferrer">Kimi’s current plan and usage details ↗</a> when you record the offer.</p></section>

      <section className={styles.activity} aria-labelledby="kimi-decision-title"><div className={styles.sectionHead}><span>Decide from your result</span><h2 id="kimi-decision-title">Pay, retest or skip?</h2></div><p>A usable draft is not enough by itself. For example, if a weekly five-slide draft works but you have not checked the credit use or current price, choose <strong>Retest</strong> first.</p><div className={styles.decisions}>{decisions.items.map(item => <div key={item.title} className={styles.decision}><button type="button" aria-expanded={choice === item.title} aria-controls={`kimi-decision-${item.title}`} onClick={() => setChoice(item.title)}>{item.title}<span aria-hidden="true">{choice === item.title ? "−" : "+"}</span></button>{choice === item.title && <p id={`kimi-decision-${item.title}`}>{item.body}</p>}</div>)}</div><p>The job you chose is already in this instruction. Copy it, then replace the remaining brackets in your chat with what your test showed.</p><div className={styles.prompt}><details><summary>View the complete decision instruction</summary><pre>{decisionPrompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Kimi decision instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</section>
    </div>
    <section className={styles.related} aria-labelledby="kimi-related-title"><div className={styles.relatedInner}><h2 id="kimi-related-title">Test the next tool against a real job</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
