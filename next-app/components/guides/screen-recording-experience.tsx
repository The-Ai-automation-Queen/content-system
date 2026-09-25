"use client";

import { useEffect, useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { CopyPrompt } from "./copy-prompt";
import styles from "./interactive-walkthrough.module.css";

function InlineEmphasis({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  )}</>;
}

export function ScreenRecordingExperience({ guide }: { guide: GuidePage }) {
  const preparation = guide.sections.find((section) => section.kind === "steps");
  const action = guide.tryNow;
  const [route, setRoute] = useState<"agent" | "manual" | null>(null);
  const [step, setStep] = useState(0);
  const [all, setAll] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const panel = useRef<HTMLDivElement>(null);
  const key = `shift-lead-progress:${guide.slug}:v2`;
  useEffect(() => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || "null");
      if (Number.isInteger(value?.step) && value.step >= 0 && value.step < 3) setStep(value.step);
      if (value?.done && typeof value.done === "object") setDone(Object.fromEntries(Object.entries(value.done).filter(([, checked]) => checked === true)) as Record<string, boolean>);
    } catch { setStorageOk(false); }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(key, JSON.stringify({ step, done })); } catch { setStorageOk(false); }
  }, [key, loaded, step, done]);

  if (!preparation || !action) return null;
  const agentPrompt = `Help me make a process guide from a screen recording. Work through one stage at a time and pause when you need something from me.\n\nFirst ask me to attach a short recording with private and identifying details removed. If you cannot inspect the video, tell me and ask for a corrected transcript and clean screenshots. Do not pretend to have inspected a file you cannot access.\n\nUse this complete instruction once I provide the source:\n\n${action.prompt}\n\nWhen the draft is ready, ask me to test it with someone who has not seen the recording. Do not publish or share it. List any steps the test shows need correction.`;
  const labels = ["Prepare", "Make the draft", "Check it"];
  function go(next: number) {
    setStep(next);
    window.requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: "start" });
    });
  }
  return <div className={styles.walkthrough}>
    <div className={styles.choiceIntro}>
      <h2>How would you like to make your guide?</h2>
      <p>Choose a route. You can switch at any time.</p>
      <div className={styles.choices}>
        <button type="button" aria-pressed={route === "agent"} aria-controls="recording-agent-route" onClick={() => setRoute("agent")}><strong>Let an agent guide me</strong><span>One complete instruction, with the agent asking for each input.</span></button>
        <button type="button" aria-pressed={route === "manual"} aria-controls="recording-manual-route" onClick={() => setRoute("manual")}><strong>Follow the steps myself</strong><span>Prepare the video, make the draft and test the result.</span></button>
      </div>
    </div>
    <section id="recording-agent-route" hidden={route !== "agent"} aria-labelledby="recording-agent-title">
      <h2 id="recording-agent-title">Let an agent guide the work</h2>
      <ol className={styles.agentStart}><li>Open Claude Code or Codex with access to a new task.</li><li>Copy the complete instruction below and paste it into the task.</li><li>Attach the clean recording when asked. Handle any account access yourself.</li></ol>
      <CopyPrompt label="Complete agent instructions" prompt={agentPrompt} />
      <button type="button" onClick={() => setRoute("manual")}>Open the manual route →</button>
    </section>
    <div id="recording-manual-route" hidden={route !== "manual"}>
      <div className={styles.toolbar}><div><strong>Your walkthrough</strong><small>{Object.values(done).filter(Boolean).length} checks marked · {storageOk ? "Saved on this device" : "Available for this visit"}</small></div><button type="button" aria-pressed={all} onClick={() => setAll(!all)}>{all ? "One step at a time" : "Read all steps"}</button></div>
      <nav className={`${styles.navigation} ${styles.navigationThree}`} aria-label="Walkthrough steps">{labels.map((label, index) => <button type="button" key={label} aria-current={!all && step === index ? "step" : undefined} onClick={() => go(index)}><span>{index + 1}</span>{label}</button>)}</nav>
      <div ref={panel} tabIndex={-1}>
        <section hidden={!all && step !== 0} aria-labelledby="recording-prepare"><h2 id="recording-prepare">{preparation.heading}</h2><p>{preparation.introduction}</p><ul className={styles.checklist}>{preparation.steps.map((item, index) => <li key={item.title}><label><input type="checkbox" checked={done[`prepare-${index}`] === true} onChange={event => setDone({ ...done, [`prepare-${index}`]: event.target.checked })}/><span><strong>{item.title}.</strong> <InlineEmphasis text={item.body} /></span></label></li>)}</ul></section>
        <section hidden={!all && step !== 1} aria-labelledby="recording-draft"><h2 id="recording-draft">{action.heading}</h2><p>{action.introduction}</p><CopyPrompt label="Complete instructions" prompt={action.prompt} />{action.instructions && <details className={styles.help}><summary>How do I use this instruction?</summary><ol>{action.instructions.map(item => <li key={item.title}><strong>{item.title}</strong><p><InlineEmphasis text={item.body} /></p></li>)}</ol></details>}</section>
        <section hidden={!all && step !== 2} aria-labelledby="recording-check"><h2 id="recording-check">Check the result</h2><p>{action.check}</p><label className={styles.finished}><input type="checkbox" checked={done.test === true} onChange={event => setDone({ ...done, test: event.target.checked })}/>I tested the guide against the recording and with someone who had not seen it.</label></section>
      </div>
      {!all && <div className={styles.footer}><button type="button" disabled={step === 0} onClick={() => go(step - 1)}>← Back</button><span>Step {step + 1} of {labels.length}</span><button type="button" disabled={step === labels.length - 1} onClick={() => go(step + 1)}>Next step →</button></div>}
      <p className={styles.hint}>Checkmarks save your progress; they do not verify the finished guide.</p>
    </div>
  </div>;
}
