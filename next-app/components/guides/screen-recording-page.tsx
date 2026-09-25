"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./screen-recording-page.module.css";

type Route = "agent" | "manual" | null;
const stageLabels = ["Prepare", "Make the draft", "Test the guide"] as const;

function PromptBox({ label, prompt }: { label: string; prompt: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }
  return <div className={styles.prompt}>
    <div className={styles.promptTop}><strong>{label}</strong><button type="button" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>{copied ? "Copied" : "Copy"}</button></div>
    <details open><summary>Complete instruction</summary><pre>{prompt}</pre></details>
    {copyError && <p className={styles.copyError} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
  </div>;
}

export function ScreenRecordingPage({ guide }: { guide: GuidePage }) {
  const preparation = guide.sections.find(section => section.kind === "steps");
  const action = guide.tryNow;
  const [route, setRoute] = useState<Route>(null);
  const [stage, setStage] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const storageKey = `shift-lead-progress:${guide.slug}:v3`;

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "null");
      if (saved?.route === "agent" || saved?.route === "manual") setRoute(saved.route);
      if (Number.isInteger(saved?.stage) && saved.stage >= 0 && saved.stage < 3) setStage(saved.stage);
      if (saved?.checks && typeof saved.checks === "object") setChecks(Object.fromEntries(Object.entries(saved.checks).filter(([, value]) => value === true)) as Record<string, boolean>);
    } catch { /* Browsing without local storage remains possible. */ }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify({ route, stage, checks })); } catch { /* Browsing without local storage remains possible. */ }
  }, [storageKey, loaded, route, stage, checks]);

  if (!preparation || !action) return null;

  const agentPrompt = `Help me make a process guide from a screen recording. Work through one stage at a time and pause when you need something from me.

First ask me to attach a short recording with private and identifying details removed. If you cannot inspect the video, tell me and ask for a corrected transcript and clean screenshots. Do not pretend to have inspected a file you cannot access.

Use this complete instruction once I provide the source:

${action.prompt}

When the draft is ready, ask me to test it with someone who has not seen the recording. Do not publish or share it. List any steps the test shows need correction.`;
  const resultChecks = [
    "Every step matches an action visible in the recording.",
    "Unreadable labels and missing decisions are marked for review, not guessed.",
    "Someone new can finish the practice task using the guide.",
  ];
  function toggle(key: string) { setChecks(current => ({ ...current, [key]: !current[key] })); }
  function go(next: number) {
    setStage(next);
    window.requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link href="/guides/" className={styles.back}>← All guides</Link>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>ChatGPT · Practical guide</span>
        <h1>Turn a screen recording into a guide someone can follow</h1>
        <p>Record one task, ask ChatGPT for steps it can actually see, then test the draft with someone new.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 450px" /></figure>
      </header>

      <section className={styles.flow} aria-label="The three parts of this guide">
        <div><strong>1</strong><span>Clean recording</span></div>
        <div><strong>2</strong><span>Steps you can see</span></div>
        <div><strong>3</strong><span>Someone new tries it</span></div>
      </section>

      <section className={styles.choice} aria-labelledby="recording-choice-title">
        <h2 id="recording-choice-title">How would you like to make it?</h2>
        <p>Choose a route. You can switch at any time.</p>
        <div className={styles.choices}>
          <button type="button" aria-pressed={route === "agent"} aria-controls="recording-agent-route" onClick={() => setRoute("agent")}><strong>Let an agent guide me</strong><span>Paste one complete instruction into Claude Code or Codex.</span></button>
          <button type="button" aria-pressed={route === "manual"} aria-controls="recording-manual-route" onClick={() => setRoute("manual")}><strong>Follow the steps myself</strong><span>Prepare the video, make the draft and test it.</span></button>
        </div>
      </section>

      {route === "agent" && <section id="recording-agent-route" className={styles.work} aria-labelledby="recording-agent-title">
        <div className={styles.sectionHead}><span>Agent route</span><h2 id="recording-agent-title">Give the agent one clear job</h2></div>
        <ol className={styles.shortSteps}><li>Open Claude Code or Codex in a new task.</li><li>Copy and paste the instruction below.</li><li>Attach a clean recording when asked. Handle account access yourself.</li></ol>
        <PromptBox label="Complete agent instruction" prompt={agentPrompt} />
        <button className={styles.routeSwitch} type="button" onClick={() => setRoute("manual")}>See the manual steps →</button>
      </section>}

      {route === "manual" && <div id="recording-manual-route" className={styles.manual}>
        <nav className={styles.stageNav} aria-label="Guide steps">{stageLabels.map((label, index) => <button key={label} type="button" aria-current={stage === index ? "step" : undefined} onClick={() => go(index)}><span>{index + 1}</span>{label}</button>)}</nav>
        <div ref={panel} tabIndex={-1} className={styles.panel}>
          {stage === 0 && <section aria-labelledby="recording-prepare-title"><div className={styles.sectionHead}><span>Step 1 / 3</span><h2 id="recording-prepare-title">Prepare a recording ChatGPT can inspect</h2></div><p>{preparation.introduction}</p><div className={styles.checklist}>{preparation.steps.map((item, index) => <label key={item.title}><input type="checkbox" checked={!!checks[`prepare-${index}`]} onChange={() => toggle(`prepare-${index}`)} /><span><strong>{item.title}</strong><small>{item.body.replace(/\*\*/g, "")}</small></span></label>)}</div></section>}
          {stage === 1 && <section aria-labelledby="recording-draft-title"><div className={styles.sectionHead}><span>Step 2 / 3</span><h2 id="recording-draft-title">Ask for steps the video actually shows</h2></div><p>Attach the clean video in ChatGPT. Replace <strong>[WHO WILL USE IT]</strong> and <strong>[FINISHED RESULT]</strong>, then send the full instruction.</p><PromptBox label="Complete ChatGPT instruction" prompt={action.prompt} /><p className={styles.note}>If ChatGPT cannot inspect the video, use the corrected transcript and clean screenshots from the same recording.</p></section>}
          {stage === 2 && <section aria-labelledby="recording-test-title"><div className={styles.sectionHead}><span>Step 3 / 3</span><h2 id="recording-test-title">Can someone new finish the task?</h2></div><p>Give the draft to someone who has not watched the recording. Keep it only if the written steps and screen checks work.</p><div className={styles.checklist}>{resultChecks.map((item, index) => <label key={item}><input type="checkbox" checked={!!checks[`result-${index}`]} onChange={() => toggle(`result-${index}`)} /><span>{item}</span></label>)}</div><p className={styles.result} aria-live="polite">{resultChecks.every((_, index) => checks[`result-${index}`]) ? "All three checks marked. The draft is ready for your final review." : `${resultChecks.filter((_, index) => checks[`result-${index}`]).length} of 3 checks marked. Fix any missed step before sharing the guide.`}</p></section>}
        </div>
        <div className={styles.stageFooter}><button type="button" onClick={() => go(stage - 1)} disabled={stage === 0}>← Back</button><span>Step {stage + 1} of 3</span><button type="button" onClick={() => go(stage + 1)} disabled={stage === 2}>Next step →</button></div>
      </div>}
    </div>

    <section className={styles.related} aria-labelledby="recording-related-title"><div className={styles.relatedInner}><h2 id="recording-related-title">Try another task you can check</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
