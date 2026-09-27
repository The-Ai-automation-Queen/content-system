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

const jobInstructions = [
  {
    task: "Turn a rough note into a clear update",
    use: "Open a chat tool you already have, such as ChatGPT, Claude or Gemini.",
    why: "For a non-confidential note, you can test a draft without connecting your work account or buying another plan.",
    steps: ["Choose a non-confidential note you wrote yourself.", "Ask two available chat tools for a five-bullet update: progress, blocker, next action, owner and date.", "Compare both drafts with your note. Keep the clearer one and correct anything it invented."],
    check: "Every fact in the update should be present in your original note.",
    example: "You have a rough note from Monday’s project meeting. Try a chat tool with a short, non-confidential version of the note. Ask for five bullets: progress, blocker, next action, owner and date. Read each bullet against your note before you send the update.",
    result: "A short update you can edit, with no names, dates or promises the note did not contain.",
    resultCheck: "Compare each bullet with your original note. Keep the draft only after correcting missing facts and anything the tool invented.",
    links: [{ label: "Open ChatGPT", href: "https://chatgpt.com/" }, { label: "Open Claude", href: "https://claude.ai/" }, { label: "Open Gemini", href: "https://gemini.google.com/" }],
    testHeading: "Compare two drafts from the same note",
    testSteps: [
      { title: "Choose a note you can share", body: "Use your own non-confidential note, or make up a short example. Keep the original beside you." },
      { title: "Run the same request twice", body: "Paste the same instruction and note into two chat tools you already have. Do not change the request between runs." },
      { title: "Mark the corrections", body: "Check each bullet against your note. Count missing facts, invented owners and wording you would need to rewrite." },
      { title: "Keep the better fit", body: "Use the draft that needs fewer corrections. You can keep using the tool you already have if the difference is small." },
    ],
  },
  {
    task: "Find something in your Microsoft work",
    use: "Check Microsoft Copilot Chat in your work account before trying another service.",
    why: "Full access to work email, meetings, chats and files depends on your Copilot licence and existing permissions. Basic Copilot Chat has more limited work-data access.",
    steps: ["Open Microsoft 365 Copilot with your work account and see which apps and work sources are available.", "Pick one message or document you already have permission to use. Ask for a short summary with a link back to it.", "Open the original and check the dates, names and any action it says you agreed to."],
    check: "If the work source is unavailable, ask your IT team what access your account has. Do not paste private work into a personal chat to get around it.",
    example: "You need the decision from a long email thread you can already access in Outlook. If Copilot is available in your work account, ask for the decision and a link to the message that states it. Open the message and check the decision yourself.",
    result: "The decision and its original message, or a clear sign that this account cannot access it.",
    resultCheck: "Open Copilot’s source link. Use the decision only if the original message or document supports it.",
    links: [{ label: "Open Copilot Chat", href: "https://m365.cloud.microsoft/chat" }, { label: "Check work-data access", href: "https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license" }],
    prompt: `In my work account, find the decision in the Outlook thread or work document called [title or a short description].

Give me the decision in one sentence and a link to the exact message or document section that supports it. Then list any condition or unresolved question attached to that decision.

Use only the work source you can access. If you cannot find or open it, say that plainly. Do not guess the decision or make up a source link. I will open the original before using your answer.`,
    testHeading: "Check Copilot against one work source",
    testSteps: [
      { title: "Check your work access", body: "Sign in with your work account. If Copilot cannot use the mail or document you need, ask your IT team which access your account has." },
      { title: "Ask about one source", body: "Use a thread or document you may already open. Copy the instruction above and replace its bracketed title." },
      { title: "Open the original", body: "Follow Copilot’s source link. Check the decision, date and any condition in the original message or document." },
      { title: "Decide if it helped", body: "Keep this route if it found the right source and saved time. If it could not access the source, do not move the content to a personal chat." },
    ],
  },
  {
    task: "Work with a Google document or email",
    use: "Check whether Gemini is available in the Google Workspace account and app your organisation uses.",
    why: "Gemini can work beside a document or email, but your organisation may restrict the feature or its access to Workspace content.",
    steps: ["Open a document or email in your work account that you are allowed to use.", "If Gemini is available there, ask it for three key points and one unanswered question.", "Read the original yourself and correct any missed condition, number or commitment."],
    check: "If Gemini is not available in that account, check with your administrator before moving the content elsewhere.",
    example: "You are preparing for a meeting from a Google document your team owns. If Gemini is available inside that work account, ask for three key points and one unanswered question. Check each point in the document.",
    result: "Three checked points and one question to take into the meeting.",
    resultCheck: "Read the document or email yourself. Correct any point that lacks support in the original.",
    links: [{ label: "Open Google Docs", href: "https://docs.google.com/" }, { label: "Check Gemini in Workspace", href: "https://support.google.com/a/users/answer/15146419?hl=en" }],
    prompt: `Use the Google document or email I have open in this work account.

Give me three key points I need for my next meeting and one question the source does not answer. For each point, identify the passage or message it came from so I can check it.

Do not add dates, commitments or decisions that are not in the source. If you cannot access the open document or email, tell me instead of guessing.`,
    testHeading: "Check Gemini against the open source",
    testSteps: [
      { title: "Open an approved source", body: "Use a Google document or email you already have permission to read in your work account." },
      { title: "Ask Gemini there", body: "If Ask Gemini appears in that app, copy the instruction above into its panel. If it is unavailable, check with your administrator." },
      { title: "Read the original", body: "Check every key point and the unanswered question against the document or email." },
      { title: "Decide if it helped", body: "Keep this route if the result is accurate and saves time. Do not move private content to another account to work around missing access." },
    ],
  },
  {
    task: "Compare claims you need to verify",
    use: "Try Perplexity for a question about public web pages.",
    why: "The starting result should point you to sources you can open, not just give a confident-sounding answer.",
    steps: ["Write one precise question, such as which of three vendors publicly documents a feature you need.", "Ask for a short table with a link beside every claim and a separate 'not found' row for missing evidence.", "Open each linked page. Check the wording, date and product plan before using the table."],
    check: "A citation is a route to the original. It is not proof until you open it and confirm the claim.",
    example: "You have public product pages from three vendors and a meeting on Friday. Ask a research tool such as Perplexity for a short comparison with a source link beside each claim. Open the vendor pages and check the wording, plan and date yourself.",
    result: "A small table of checked claims, their source pages and anything the pages did not answer.",
    resultCheck: "Open every cited vendor page. Use only claims that the page itself supports, and keep missing evidence marked as missing.",
    links: [{ label: "Open Perplexity", href: "https://www.perplexity.ai/" }, { label: "See how sources work", href: "https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search" }],
    prompt: `Compare the public product pages for [vendor A], [vendor B] and [vendor C] on this one question: [the feature or requirement I need to check].

Make a small table with one row per vendor. Include the exact claim you found, a direct link to the vendor's own page, the product plan if stated, and the page date if available. Add a separate row for anything the pages do not establish.

Do not treat a search snippet or another site's summary as the vendor's claim. If an official page does not answer the question, write "Not found on the official page". I will open every link and check the wording before using the comparison.`,
    testHeading: "Check the source behind every claim",
    testSteps: [
      { title: "Choose one narrow question", body: "Name the feature or condition you need to compare across public product pages." },
      { title: "Run the research request", body: "Replace the bracketed vendors and question in the instruction above. Ask Perplexity for direct source links." },
      { title: "Open every source", body: "Check the exact wording, product plan and date on each vendor page. Mark claims without support as unverified." },
      { title: "Keep only checked claims", body: "Use the table only after the original pages support it. Record what you still need to ask each vendor." },
    ],
  },
] as const;

export function ToolChooserPage({ guide }: { guide: GuidePage }) {
  const [step, setStep] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const jobs = guide.sections[0];
  const otherTools = guide.sections[1];
  if (jobs.kind !== "cards" || otherTools.kind !== "accordion") return null;
  const selectedJob = jobInstructions[jobIndex];
  const selectedPrompt = "prompt" in selectedJob ? selectedJob.prompt : guide.tryNow?.prompt ?? "";

  async function copyPrompt() {
    if (!selectedPrompt) return;
    try {
      await navigator.clipboard.writeText(selectedPrompt);
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
        <p>Pick the work you need done. Try the matching tool on a small task before you pay for anything.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <nav className={styles.contents} aria-label="In this guide"><strong>IN THIS GUIDE</strong><a href="#tool-job-title">01 · Find your task</a><a href="#tool-example-title">02 · See a real choice</a><a href="#tool-access-title">03 · Get the instruction</a><a href="#tool-test-title">04 · Check the result</a></nav>
      <p className={styles.orientation}>Find the job closest to yours below. You will get a tool to try, an instruction for it and a way to check the answer.</p>

      <section className={styles.job} aria-labelledby="tool-job-title">
        <div className={styles.sectionHead}><span>Start with the work</span><h2 id="tool-job-title">What do you need help with?</h2></div>
        <div className={styles.jobGrid} role="tablist" aria-label="Choose your work task">{jobs.items.map((item, index) => <button type="button" role="tab" id={`tool-job-tab-${index}`} aria-controls="tool-job-panel" aria-selected={jobIndex === index} className={styles.jobChoice} key={item.title} onClick={() => { setJobIndex(index); setStep(0); setCopied(false); }}>
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

      <div id="tool-access-title"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the instruction for your task" guidePromise="Get an instruction for the task you selected, four steps to test it and a link back to this guide." actionLabel="Show me the instruction">
      {guide.tryNow && <section className={styles.action} aria-labelledby="tool-action-title">
        <div className={styles.sectionHead}><span>Try this task</span><h2 id="tool-action-title">Copy the instruction for your work</h2></div>
        <p>Open the tool for this task. Replace any bracketed details with information you are allowed to use, then check the answer against the original.</p>
        <div className={styles.chatLinks}>{selectedJob.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
        <div className={styles.prompt}><pre>{selectedPrompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete instruction">{copied ? "Copied" : "Copy"}</button></div>
        {copyError && <p role="alert">Copy failed. Select the visible prompt text instead.</p>}
        <div className={styles.check}><GuideIcon name="check" /><p>{selectedJob.resultCheck}</p></div>
      </section>}

      <section className={styles.test} aria-labelledby="tool-test-title">
        <div className={styles.sectionHead}><span>Before you pay or connect files</span><h2 id="tool-test-title">{selectedJob.testHeading}</h2></div>
        <div className={styles.stepNav} aria-label="Test steps">{selectedJob.testSteps.map((item, index) => <button type="button" key={item.title} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{index + 1}</span><strong>{item.title}</strong></button>)}</div>
        <div className={styles.stepBody} aria-live="polite"><span>Step {step + 1} / {selectedJob.testSteps.length}</span><h3>{selectedJob.testSteps[step].title}</h3><p><Text value={selectedJob.testSteps[step].body} /></p></div>
        <div className={styles.stepActions}><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</button><button type="button" onClick={() => setStep(Math.min(selectedJob.testSteps.length - 1, step + 1))} disabled={step === selectedJob.testSteps.length - 1}>Next step</button></div>
      </section>

      <section className={styles.more} aria-labelledby="tool-more-title"><div className={styles.sectionHead}><span>If the first shortlist does not fit</span><h2 id="tool-more-title">What about the other tools?</h2></div><div className={styles.moreGrid}>{otherTools.items.map(item => <details key={item.title}><summary>{item.title}</summary><p><Text value={item.body} /></p>{item.links?.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</details>)}</div></section>
      <p className={styles.finish}><strong>Keep the tool that helps you finish the task</strong> with fewer corrections and without sharing information you should keep private.</p>
      </GuideAccessBoundary></div>
    </div>
    <section className={styles.related} aria-labelledby="tool-related-title"><div className={styles.relatedInner}><h2 id="tool-related-title">Choose what to learn before you connect a tool</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
