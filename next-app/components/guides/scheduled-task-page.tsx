"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./scheduled-task-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function ScheduledTaskPage({ guide }: { guide: GuidePage }) {
  const [url, setUrl] = useState("https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt");
  const [condition, setCondition] = useState("the 'Review scheduled task limits' section changes");
  const [stopRule, setStopRule] = useState("14 days after the task is created");
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const steps = guide.sections[0];
  if (steps.kind !== "steps" || !guide.tryNow) return null;
  let publicUrlReady = false;
  try {
    const page = new URL(url.trim());
    publicUrlReady = ["http:", "https:"].includes(page.protocol) && page.hostname.includes(".");
  } catch {
    // Wait for a complete page URL before enabling Copy.
  }
  const promptReady = publicUrlReady && Boolean(condition.trim()) && Boolean(stopRule.trim());

  const prompt = guide.tryNow.prompt
    .replace("[PUBLIC PAGE URL]", url.trim() || "[PUBLIC PAGE URL]")
    .replace("[EXACT CONDITION]", condition.trim() || "[EXACT CONDITION]")
    .replace("[STOP RULE]", stopRule.trim() || "[STOP RULE]");

  async function copy() {
    if (!promptReady) return;
    try {
      await navigator.clipboard.writeText(prompt);
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
      <header className={styles.hero}>
        <h1>Can ChatGPT tell you <span>when a public page changes?</span></h1>
        <p>Set one public page to check each weekday. Ask for an alert only when the detail you care about changes.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#scheduled-example-title">01 · Choose a useful alert</a><a href="#scheduled-access-title">02 · Write the instruction</a><a href="#scheduled-steps-title">03 · Set and check it</a></nav>
      <p className={styles.promise}>Set up one public-page check, decide what change matters and know where to pause it.</p>

      <section className={styles.example} aria-labelledby="scheduled-example-title"><div className={styles.sectionHead}><span>See one useful check</span><h2 id="scheduled-example-title">Watch one product limit that matters</h2></div><p>Suppose you want to know if scheduled tasks become available on a plan your team uses. The <a href="https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt" target="_blank" rel="noopener noreferrer">official scheduled-tasks guide ↗</a> has a section on plan limits. You can ask ChatGPT to check that section on weekdays.</p><ol><li><strong>Page:</strong> the official scheduled-tasks guide.</li><li><strong>Condition:</strong> its “Review scheduled task limits” section changes.</li><li><strong>Alert:</strong> the changed wording and a link to the page.</li><li><strong>Stop:</strong> end the check after 14 days.</li></ol><p>If nothing changes, you should not get an alert. If one arrives, open the official page before deciding what the new limit means for your team.</p></section>

      <div id="scheduled-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Make your first scheduled check" guidePromise="Get the complete editable instruction, setup steps and a link back to this guide." actionLabel="Show me the instruction">

      <section className={styles.builder} aria-labelledby="scheduled-builder-title">
        <div className={styles.sectionHead}><span>Start with a public page</span><h2 id="scheduled-builder-title">What would be worth an alert?</h2></div>
        <p>Use the official help-page example above, or change these fields for a public page you already trust. Keep private account pages out of this test.</p>
        <div className={styles.fields}>
          <label>Page to check<input type="url" value={url} onChange={event => setUrl(event.target.value)} placeholder="https://example.com/status" /></label>
          <label>Tell me only when<input value={condition} onChange={event => setCondition(event.target.value)} placeholder="a specific public result changes" /></label>
          <label>Stop checking<input value={stopRule} onChange={event => setStopRule(event.target.value)} placeholder="14 days after the task is created" /></label>
        </div>
        <div className={styles.preview}><strong>Your instruction</strong><pre>{prompt}</pre><button type="button" disabled={!promptReady} onClick={copy} aria-label="Copy the complete scheduled task instruction">{copied ? "Copied" : "Copy"}</button></div>
        {!promptReady && <p className={styles.inputHelp}>Add a public page URL, an alert condition and a stop rule before copying.</p>}
        {copyError && <p role="alert">Copy failed. Open the complete instruction and select the text instead.</p>}
      </section>

      <section className={styles.walkthrough} aria-labelledby="scheduled-steps-title">
        <div className={styles.walkthroughHead}><div className={styles.sectionHead}><span>Make it work</span><h2 id="scheduled-steps-title">Set the task, then check it</h2></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Step by step" : "Show all steps"}</button></div>
        <nav className={styles.stepNav} aria-label="Scheduled task steps">{steps.steps.map((item, index) => <button type="button" key={item.title} aria-current={!showAll && step === index ? "step" : undefined} onClick={() => { setStep(index); setShowAll(false); }}><span>{index + 1}</span><strong>{item.title}</strong></button>)}</nav>
        {steps.steps.map((item, index) => <div key={item.title} hidden={!showAll && step !== index}><article className={styles.stage}><span>Step {index + 1} / {steps.steps.length}</span><h3>{item.title}</h3><p><Text value={item.body} /></p>
          {index === 0 && <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a>}
          {index === 2 && <p className={styles.tip}>Turn on email or push alerts under <strong>Settings → Notifications</strong> so you can see when the check finds a change.</p>}
        </article></div>)}
        {!showAll && <div className={styles.actions}><button type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button><button type="button" disabled={step === steps.steps.length - 1} onClick={() => setStep(Math.min(steps.steps.length - 1, step + 1))}>Next step</button></div>}
      </section>
      <div className={styles.finish}><strong>Keep it only if the alerts help.</strong> If it sends noise or cannot show what changed, pause it in Scheduled.</div>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="scheduled-related-title"><div className={styles.relatedInner}><h2 id="scheduled-related-title">Make the next ChatGPT task easier</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
