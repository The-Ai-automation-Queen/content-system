"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import s from "./claude-series-experience.module.css";

const projectLabels = ["Create a Project", "Save the rules", "Organise the notes", "Try a new chat"];

export function ProjectWalkthrough({ children, labels = projectLabels, storageKey = "shift-lead-claude-projects-step-v3", project = true }: { children: ReactNode; labels?: string[]; storageKey?: string; project?: boolean }) {
  const [step, setStep] = useState(0);
  const [all, setAll] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (Number.isInteger(saved) && saved >= 0 && saved < labels.length) setStep(saved);
    } catch { /* The walkthrough also works without browser storage. */ }
  }, [storageKey, labels.length]);
  function go(next: number) {
    setStep(next);
    try { localStorage.setItem(storageKey, String(next)); } catch { /* Optional convenience only. */ }
    requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: "start" });
    });
  }
  return <div className={s.walkthrough}>
    <div className={s.walkthroughBar}>
      <p>Try this alongside Claude. Follow one step at a time.</p>
      <button className={s.textButton} aria-pressed={all} onClick={() => setAll(!all)}>{all ? "One step at a time" : "Read all steps"}</button>
    </div>
    {!all && <nav className={s.stepNav} aria-label={project ? "Project walkthrough steps" : "Task walkthrough steps"}>{labels.map((label, i) => <button key={label} aria-current={step === i ? "step" : undefined} onClick={() => go(i)}>{i + 1}. {label}</button>)}</nav>}
    <div ref={panel} tabIndex={-1} className={s.stepPanel} aria-label={all ? "All walkthrough steps" : `Step ${step + 1}: ${labels[step]}`}>
      {!all && <p className={s.note}>Step {step + 1} of {labels.length}</p>}
      {Children.toArray(children).map((child, i) => <div key={i} hidden={!all && step !== i}>
        {child}
        {project && i === 2 && <div className={s.resultCheck} role="group" aria-labelledby="meeting-result-check">
          <h3 id="meeting-result-check">Check your follow-up</h3>
          <p className={s.checkIntro}>Compare Claude’s reply with these 3 points. Tick each one that matches.</p>
          {["Alex’s task is to send the new agenda by Friday.", "The person and deadline for collecting feedback both say “Not agreed”.", "Recording the meetings is a suggestion, not an agreed decision."].map((label, index) => <label className={s.checkRow} key={label}><input type="checkbox" checked={checks[index]} onChange={event => setChecks(previous => previous.map((value, n) => n === index ? event.target.checked : value))}/><span>{label}</span></label>)}
          <p role="status" className={s.checkStatus}>{checks.every(Boolean) ? "All 3 points match? Go to step 4 to try a different meeting without repeating the instructions." : `${checks.filter(Boolean).length} of 3 checked`}</p>
          <details><summary>One of these is wrong?</summary><p>Tell Claude what to fix. For example:</p><blockquote>We didn’t agree who would collect feedback or when. Mark both as “Not agreed”.</blockquote></details>
        </div>}
      </div>)}
    </div>
    {!all && <div className={s.walkthroughBar}>
      <button className={s.stepButton} disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
      {step < labels.length - 1 ? <button className={s.stepButton} onClick={() => go(step + 1)}>Next: {labels[step + 1]}</button> : <button className={s.textButton} onClick={() => go(0)}>Start again</button>}
    </div>}
    <p className={s.note}>Your place is saved in this browser when storage is available. Your checkmarks stay only while this page is open.</p>
  </div>;
}
