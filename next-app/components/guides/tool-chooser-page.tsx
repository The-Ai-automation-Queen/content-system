"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./tool-chooser-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

const chatLinks = [
  { label: "ChatGPT", href: "https://chatgpt.com/" },
  { label: "Claude", href: "https://claude.ai/" },
  { label: "Gemini", href: "https://gemini.google.com/" },
];

const jobInstructions = [
  {
    task: "Turn a rough note into a clear update",
    use: "ChatGPT, Claude or Gemini can help you turn your own notes into a draft you can edit.",
    why: "You can try this without connecting a work account. The useful difference is how much editing the result needs.",
    steps: ["Choose a non-confidential note you wrote yourself.", "Ask two available chat tools for a five-bullet update: progress, blocker, next action, owner and date.", "Compare both drafts with your note. Keep the clearer one and correct anything it invented."],
    check: "Every fact in the update should be present in your original note.",
    example: "You have a rough note from Monday’s project meeting. Try a chat tool with a short, non-confidential version of the note. Ask for five bullets: progress, blocker, next action, owner and date. Read each bullet against your note before you send the update.",
    result: "A short update you can edit, with no names, dates or promises the note did not contain.",
  },
  {
    task: "Find something in your Microsoft work",
    use: "Check whether your organisation has given you Microsoft 365 Copilot access to the app and work information you need.",
    why: "A personal AI chat cannot automatically see your Outlook mail, Teams conversations or Word files. Copilot access depends on your account, licence and permissions.",
    steps: ["Open Microsoft 365 Copilot with your work account and see which apps and work sources are available.", "Pick one message or document you already have permission to use. Ask for a short summary with a link back to it.", "Open the original and check the dates, names and any action it says you agreed to."],
    check: "If the work source is unavailable, ask your IT team what access your account has. Do not paste private work into a personal chat to get around it.",
    example: "You need the decision from a long email thread you can already access in Outlook. If Copilot is available in your work account, ask for the decision and a link to the message that states it. Open the message and check the decision yourself.",
    result: "The decision and its original message, or a clear sign that this account cannot access it.",
  },
  {
    task: "Work with a Google document or email",
    use: "Check whether Gemini is available in the Google Workspace account and app your organisation uses.",
    why: "Using the tool where your work already lives can reduce copying between apps, but features and access vary by account.",
    steps: ["Open a document or email in your work account that you are allowed to use.", "If Gemini is available there, ask it for three key points and one unanswered question.", "Read the original yourself and correct any missed condition, number or commitment."],
    check: "If Gemini is not available in that account, check with your administrator before moving the content elsewhere.",
    example: "You are preparing for a meeting from a Google document your team owns. If Gemini is available inside that work account, ask for three key points and one unanswered question. Check each point in the document.",
    result: "Three checked points and one question to take into the meeting.",
  },
  {
    task: "Compare claims you need to verify",
    use: "Try Perplexity for public web pages. For a set of documents you choose yourself, check whether a notebook tool fits better.",
    why: "The starting result should point you to sources you can open, not just give a confident-sounding answer.",
    steps: ["Write one precise question, such as which of three vendors publicly documents a feature you need.", "Ask for a short table with a link beside every claim and a separate 'not found' row for missing evidence.", "Open each linked page. Check the wording, date and product plan before using the table."],
    check: "A citation is a route to the original. It is not proof until you open it and confirm the claim.",
    example: "You have public product pages from three vendors and a meeting on Friday. Ask a research tool such as Perplexity for a short comparison with a source link beside each claim. Open the vendor pages and check the wording, plan and date yourself.",
    result: "A small table of checked claims, their source pages and anything the pages did not answer.",
  },
] as const;

export function ToolChooserPage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const jobs = guide.sections[0];
  const otherTools = guide.sections[1];
  const test = guide.sections[3];
  if (jobs.kind !== "cards" || otherTools.kind !== "accordion" || test.kind !== "steps") return null;
  const selectedJob = jobInstructions[jobIndex];

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
        <p>Choose a tool for one real task, then test your shortlist before you pay for anything.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#tool-job-title">01 · Find your task</a><a href="#tool-example-title">02 · See a real choice</a><a href="#tool-access-title">03 · Get the prompt</a><a href="#tool-test-title">04 · Test two tools</a></nav>
      <p className={styles.orientation}>You will leave with one tool to try, a first task for it and a way to tell if it helped. Find the job closest to yours below.</p>

      <section className={styles.job} aria-labelledby="tool-job-title">
        <div className={styles.sectionHead}><span>Start with the work</span><h2 id="tool-job-title">What do you need help with?</h2></div>
        <div className={styles.jobGrid} role="tablist" aria-label="Choose your work task">{jobs.items.map((item, index) => <button type="button" role="tab" id={`tool-job-tab-${index}`} aria-controls="tool-job-panel" aria-selected={jobIndex === index} className={styles.jobChoice} key={item.title} onClick={() => setJobIndex(index)}>
          <span className={styles.jobNumber}>{String(index + 1).padStart(2, "0")}</span><span>{jobInstructions[index].task}</span>
        </button>)}</div>
        <article className={styles.jobOption} role="tabpanel" id="tool-job-panel" aria-labelledby={`tool-job-tab-${jobIndex}`} key={jobIndex}>
          <h3>{selectedJob.task}</h3>
          <p><strong>Start with:</strong> {selectedJob.use}</p>
          <p><strong>Why this fits:</strong> {selectedJob.why}</p>
          <ol>{selectedJob.steps.map(action => <li key={action}>{action}</li>)}</ol>
          <p className={styles.jobCheck}><strong>Check:</strong> {selectedJob.check}</p>
        </article>
      </section>

      <section className={styles.example} aria-labelledby="tool-example-title"><div className={styles.sectionHead}><span>See the choice in practice</span><h2 id="tool-example-title">{selectedJob.task}</h2></div><p>{selectedJob.example}</p><div className={styles.exampleResult}><strong>What you should have</strong><span>{selectedJob.result}</span></div></section>

      <div id="tool-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Choose a tool for your task" guidePromise="Get the full prompt to narrow your shortlist, four steps to test it and a link back to this guide." actionLabel="Show me the prompt and steps">
      {guide.tryNow && <section className={styles.action} aria-labelledby="tool-action-title">
        <div className={styles.sectionHead}><span>Build your shortlist</span><h2 id="tool-action-title">Ask one tool to narrow the choice</h2></div>
        <p>Open one AI chat you are allowed to use. Copy the prompt, replace the brackets with a real task but leave private details out, then send it.</p>
        <div className={styles.chatLinks}>{chatLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">Open {link.label} ↗</a>)}</div>
        <div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p role="alert">Copy failed. Select the visible prompt text instead.</p>}
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
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="tool-related-title"><div className={styles.relatedInner}><h2 id="tool-related-title">Choose what to learn before you connect a tool</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
