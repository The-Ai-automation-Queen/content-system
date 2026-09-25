"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./copilot-visibility-page.module.css";

const stages = [
  { label: "Set up", short: "Your brief", done: "Ready to try", retry: "Edit it", unavailable: "No work access" },
  { label: "Try it", short: "Check today", done: "Useful and checked", retry: "Missed something", unavailable: "No email access" },
  { label: "Schedule", short: "If available", done: "Saved in Active", retry: "Not listed", unavailable: "No schedule option" },
] as const;

const nextActions = [
  {
    done: "Copilot can use your work email. Open Try it and check the brief against Outlook.",
    retry: "Edit the instruction above, then run it again before moving on.",
    unavailable: "Stop here. Ask your IT team which Copilot access can use Outlook. Do not paste work email into a web-only chat.",
  },
  {
    done: "You checked the brief against the original emails. You can use it manually or see if scheduling is available.",
    retry: "Change the instruction and run it again. Check the revised brief against Outlook.",
    unavailable: "Use Outlook directly until your work account can give Copilot access to email.",
  },
  {
    done: "Done. When the first brief is ready, open it in Copilot Chat, check its claims against Outlook and send only replies you approve.",
    retry: "Open Settings and more → Scheduled prompts again. If the brief is still missing, run your saved instruction manually and try scheduling it later.",
    unavailable: "Keep your complete instruction in your notes and paste it into Copilot Chat when you need a brief. Ask your IT team if scheduled prompts are available on your account.",
  },
] as const;

const replyPrompt = `Help me with the email thread I select below. First give me the issue, any decision already made, who owns the next action, and what I need to answer. Cite the original message for each point.

Then draft one message for me to review. If I owe a reply, answer the request in under 100 words. If I am waiting for someone else, write a polite follow-up under 80 words. Keep it professional and direct. If a date, owner or commitment is missing, leave a bracketed question instead of inventing one. Do not send the email.

[Select or link the email here]`;

type Outcome = "done" | "retry" | "unavailable" | null;

export function CopilotVisibilityPage({ guide }: { guide: GuidePage }) {
  const [active, setActive] = useState(0);
  const [outcomes, setOutcomes] = useState<Outcome[]>([null, null, null]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;
  const stage = stages[active];
  const prompt = active === 1 ? replyPrompt : guide.tryNow.prompt;

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

  function mark(outcome: Exclude<Outcome, null>) {
    setOutcomes(current => current.map((value, index) => index === active ? outcome : value));
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Get through your inbox <span>with Copilot</span></h1><p>Build a morning email brief you can check, then schedule it if your work account supports it. Copilot drafts; you decide and send.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="copilot-source-title">
        <div className={styles.sectionHead}><h2 id="copilot-source-title">Make your inbox easier to face</h2></div>
        <div className={styles.sourceTabs} role="tablist" aria-label="Inbox setup step">{stages.map((item, index) => <button key={item.label} id={`copilot-source-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="copilot-source-panel" onClick={() => { setActive(index); setCopied(false); }}>{item.label}<small>{outcomes[index] === "done" ? item.done : item.short}</small></button>)}</div>
        <div id="copilot-source-panel" role="tabpanel" aria-labelledby={`copilot-source-tab-${active}`} className={styles.sourcePanel}>
          <div className={styles.number}>0{active + 1} / 03</div>
          {active === 0 && <><h3>Tell Copilot how you work</h3><p>Open <a href="https://m365copilot.com/" target="_blank" rel="noreferrer">Copilot Chat</a> with your work account, or open Copilot in Outlook. Check that it can use your work email. A web-only chat cannot inspect your inbox.</p><p>Fill in the bracketed details below and save the complete instruction in your notes. It covers your usual email tasks and today's morning brief in one prompt, so you can reuse it without rebuilding it each time.</p><p className={styles.accountNote}>Use work information only as your organisation permits. Paste the saved instruction again in each new chat; it does not become a permanent setting.</p></>}
          {active === 1 && <><h3>Run it once before automating</h3><p>Paste your completed morning instruction into Copilot Chat. Compare the result with Outlook: open the cited emails and check requests, dates and whether you already replied.</p><p>If one message needs a response, select it and use the follow-up instruction below. Read and edit the draft yourself.</p><p className={styles.accountNote}>A missing result does not prove Copilot cannot access an email. Search Outlook directly before deciding it was missed.</p></>}
          {active === 2 && <><h3>Schedule the instruction you tested</h3><ol className={styles.scheduleSteps}><li>Open <a href="https://m365.cloud.microsoft/chat" target="_blank" rel="noreferrer">Copilot Chat</a> with your work account. Find the complete morning instruction you ran in Step 2.</li><li>Hover over that prompt and select <strong>Schedule this prompt</strong>.</li><li>Choose your workdays, time and number of runs. Choose whether you want an email notification when the answer is ready, then select <strong>Save</strong>.</li></ol><p className={styles.accountNote}>Scheduling needs a Microsoft Copilot licence and may be disabled by your organisation. If the option is missing, keep the instruction in your notes and run it manually.</p></>}
          {active !== 2 && <><h3>{active === 1 ? "Draft a reply or follow-up you choose" : "Copy the complete morning instruction"}</h3>
            <div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label={`Copy the complete ${stage.label.toLowerCase()} instruction`}>{copied ? "Copied" : "Copy"}</button></div>
            {copyError && <p className={styles.copyError} role="alert">Copy failed. Select the instruction text instead.</p>}</>}
          <h3>{active === 0 ? "Can Copilot use your work email?" : active === 1 ? "Did the brief help?" : "Check that it saved"}</h3>
          <p>{active === 0 ? "Check the result in Copilot, then choose what happened below." : active === 1 ? "Check the brief against the original emails, then choose what happened below." : <>In Copilot Chat, open <strong>Settings and more → Scheduled prompts</strong>. Is your morning brief listed under <strong>Active</strong>?</>}</p>
          <div className={styles.outcomes} role="group" aria-label={`${stage.label} result`}><button type="button" aria-pressed={outcomes[active] === "done"} onClick={() => mark("done")}>{stage.done}</button><button type="button" aria-pressed={outcomes[active] === "retry"} onClick={() => mark("retry")}>{stage.retry}</button><button type="button" aria-pressed={outcomes[active] === "unavailable"} onClick={() => mark("unavailable")}>{stage.unavailable}</button></div>
          {outcomes[active] && <div className={styles.outcomeFeedback} role="status"><p>{nextActions[active][outcomes[active]]}</p>{outcomes[active] === "done" && active < stages.length - 1 && <button type="button" onClick={() => { setActive(active + 1); setCopied(false); }}>Next: {stages[active + 1].label} →</button>}</div>}
        </div>
      </section>

    </div>
    <section className={styles.related} aria-labelledby="copilot-related-title"><div className={styles.relatedInner}><h2 id="copilot-related-title">Keep making Copilot useful at work</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
