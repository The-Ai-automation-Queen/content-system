"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./copilot-visibility-page.module.css";

const stages = [
  { label: "Set up", short: "Your brief" },
  { label: "Try it", short: "Check today" },
  { label: "Schedule", short: "If available" },
] as const;

const replyPrompt = `Help me with the email thread I select below. First give me the issue, any decision already made, who owns the next action, and what I need to answer. Cite the original message for each point.

Then draft a message for me to review. If I owe a reply, give me two versions: one under 100 words and one with more detail but under 150 words. If I am waiting for someone else, write a polite follow-up under 80 words. Keep it professional and direct. If a date, owner or commitment is missing, leave a bracketed question instead of inventing one. Do not send the email.

[Select or link the email here]`;

export function CopilotVisibilityPage({ guide }: { guide: GuidePage }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;
  const stage = stages[active];
  const prompt = active === 1 ? replyPrompt : guide.tryNow.prompt;
  const related = publicGuides.filter(item => ["check-copilot-excel-edits", "what-should-you-never-share-with-ai"].includes(item.slug));

  async function copyPrompt() {
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(prompt);
        } catch {
          copyWithSelection();
        }
      } else {
        copyWithSelection();
      }
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  function copyWithSelection() {
    const field = document.createElement("textarea");
    field.value = prompt;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    if (!copied) throw new Error("Copy unavailable");
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Get through your inbox <span>with Copilot</span></h1><p>Build a morning email brief you can check, then schedule it if your work account supports it. Copilot drafts; you decide and send.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#copilot-example-title">See a morning brief</a><a href="#copilot-tab-0" onClick={() => setActive(0)}>Set up your instruction</a><a href="#copilot-tab-1" onClick={() => setActive(1)}>Test the result</a><a href="#copilot-tab-2" onClick={() => setActive(2)}>Schedule if available</a></nav>

      <section className={styles.activity} aria-labelledby="copilot-example-title"><div className={styles.sectionHead}><span>Before you begin</span><h2 id="copilot-example-title">What should a morning brief show?</h2></div><p>Imagine three messages in your Outlook inbox. The useful result is a short list of what needs you, with a link back to each original email. This example shows the kind of judgment you still make.</p><div className={styles.exampleGrid}><div><strong>Client asks for approval by Friday</strong><span>Check now: a stated deadline and a decision you own.</span></div><div><strong>Team sends a weekly update</strong><span>Read when useful: no request to answer.</span></div><div><strong>Colleague asks for an update</strong><span>Reply after checking the project status. Do not invent a date.</span></div></div><p className={styles.exampleNote}>A suggested reply is only a draft. Open the source message, check the facts and send it yourself.</p></section>

      <section className={styles.activity} aria-labelledby="copilot-source-title">
        <div className={styles.sectionHead}><h2 id="copilot-source-title">Make your inbox easier to face</h2></div>
        <div className={styles.sourceTabs} aria-label="Inbox setup step">{stages.map((item, index) => <button key={item.label} id={`copilot-tab-${index}`} type="button" aria-pressed={active === index} onClick={() => { setActive(index); setCopied(false); }}>{item.label}<small>{item.short}</small></button>)}</div>
        <div className={styles.sourcePanel} aria-live="polite">
          <div className={styles.number}>0{active + 1} / 03</div>
          {active === 0 && <><h3>Tell Copilot how you work</h3><p>Open Outlook with your work or school account and select Copilot near the top. Microsoft says Copilot Chat in Outlook can answer questions about your inbox even without the add-on licence, but what it can see depends on your account.</p><p>First ask: <strong>“Find the most recent email in my inbox and show its subject.”</strong> If that works, fill in your role, tone and regular email tasks in the complete instruction, then save it in your notes.</p><p className={styles.accountNote}>Use work information only as your organisation permits. Paste the saved instruction in each new chat; it is not a permanent setting. <a href="https://support.microsoft.com/en-us/outlook/copilot-outlook/chat-with-copilot-in-outlook" target="_blank" rel="noopener noreferrer">See Microsoft's Outlook instructions ↗</a></p></>}
          {active === 1 && <><h3>Run it once before automating</h3><p>Paste your completed morning instruction into Copilot Chat in Outlook. Open the cited emails and check each request, date and reply status. If a message needs your answer, select it and use the reply instruction below.</p><p className={styles.accountNote}>A missing result does not prove the email is absent. Search Outlook yourself before deciding it was missed. Read and edit every draft before sending.</p></>}
          {active === 2 && <><h3>Schedule the instruction you tested</h3><ol className={styles.scheduleSteps}><li>Open <a href="https://m365.cloud.microsoft/chat" target="_blank" rel="noreferrer">Copilot Chat</a> with your work account. Find the complete morning instruction you ran in Step 2.</li><li>Hover over that prompt and select <strong>Schedule this prompt</strong>.</li><li>Choose your workdays, time and number of runs. Choose whether you want an email notification when the answer is ready, then select <strong>Save</strong>.</li></ol><p className={styles.accountNote}>Scheduling needs a Microsoft Copilot licence and may be disabled by your organisation. If the option is missing, keep the instruction in your notes and run it manually.</p></>}
          {active !== 2 && <><h3>{active === 1 ? "Draft a reply or follow-up you choose" : "Copy the complete morning instruction"}</h3>
            <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading={active === 1 ? "Get the reply instruction" : "Get the morning brief instruction"} guidePromise={active === 1 ? "Copy a reply you can check before sending." : "Copy the full morning brief and keep a link to this walkthrough."} actionLabel="Show me the instruction"><div className={styles.prompt}><div className={styles.promptTop}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label={`Copy the complete ${stage.label.toLowerCase()} instruction`}>{copied ? "Copied" : "Copy"}</button></div><pre>{prompt}</pre></div>{copyError && <p className={styles.copyError} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></>}
          <div className={styles.nextStep}><p>{active === 0 ? "If Copilot cannot use your inbox, ask your IT team which Copilot access your work account has. Keep using Outlook directly until that is clear." : active === 1 ? "Keep only the messages and drafts that match the originals. If the brief misses something, edit your instruction and run it again." : <>In Copilot Chat, open <strong>Settings and more → Scheduled prompts</strong> and check that your prompt appears under <strong>Active</strong>. If it is unavailable, run your saved instruction manually.</>}</p>{active < stages.length - 1 && <button type="button" onClick={() => { setActive(active + 1); setCopied(false); }}>Next: {stages[active + 1].label} →</button>}</div>
        </div>
      </section>

    </div>
    <section className={styles.related} aria-labelledby="copilot-related-title"><div className={styles.relatedInner}><h2 id="copilot-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
