"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import type { GuideSection } from "@/content/guide-page";
import { buildGuideAgentPrompt } from "@/content/guide-agent-prompt";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { CopyPrompt } from "./copy-prompt";
import styles from "./interactive-walkthrough.module.css";

type Step = Extract<GuideSection, { kind: "walkthrough" }>;
const labels = ["Meta setup", "Project", "Dashboard", "Auto-refresh", "Run it"];
const shots: Record<string, { src: string; caption: string }> = {
  "1.4 — Get your short-lived token": { src: "/images/guides/instagram-steps/meta-generate-token.png", caption: "Generate token control in the current Meta interface. Account name, photo and identifiers excluded." },
  "1.2 — Add Instagram Basic Display": { src: "/images/guides/instagram-steps/meta-instagram-use-case.png", caption: "Current Instagram use-case panel. This is a current interface reference, not the older Basic Display screen described in the source." },
  "1.1 — Create the App": { src: "/images/guides/instagram-steps/meta-app-setup.png", caption: "Current Meta app setup. Personal details removed. The interface may differ from the original instructions." },
};

export function InteractiveWalkthrough({ sections, slug, conclusion }: { sections: readonly Step[]; slug: string; conclusion: ReactNode }) {
  const key = `shift-lead-progress:${slug}:source-v1`;
  const [mode, setMode] = useState<"agent" | "manual" | null>(null);
  const masterPrompt = buildGuideAgentPrompt(sections);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [photo, setPhoto] = useState<{ src: string; caption: string } | null>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && Number.isInteger(saved.active) && saved.active >= 0 && saved.active < sections.length) setActive(saved.active);
      if (saved?.done && typeof saved.done === "object" && !Array.isArray(saved.done)) setDone(Object.fromEntries(Object.entries(saved.done).filter(([, v]) => v === true)) as Record<string, boolean>);
    } catch { setStorageOk(false); }
    setReady(true);
  }, [key, sections.length]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify({ active, done })); } catch { setStorageOk(false); }
  }, [active, done, key, ready]);
  useEffect(() => { if (photo) dialog.current?.showModal(); }, [photo]);
  function go(index: number) {
    setActive(index);
    requestAnimationFrame(() => { anchor.current?.scrollIntoView({ block: "start" }); anchor.current?.focus({ preventScroll: true }); });
  }
  const complete = sections.filter((_, i) => done[`step-${i}`]).length;
  return <div className={styles.walkthrough} ref={anchor} tabIndex={-1}>
    <div className={styles.choiceIntro}>
      <h2>How would you like to build it?</h2>
      <p>Choose the support you want. You can switch at any time.</p>
      <div className={styles.choices}>
        <button aria-pressed={mode === "agent"} aria-controls="agent-build-path" onClick={() => setMode("agent")}><strong>Let an agent guide me</strong><span>One prompt for Claude Code or Codex. Get help one action at a time.</span></button>
        <button aria-pressed={mode === "manual"} aria-controls="manual-build-path" onClick={() => setMode("manual")}><strong>Follow the steps myself</strong><span>Work through the five steps with checklists and individual prompts.</span></button>
      </div>
    </div>
    <section id="agent-build-path" hidden={mode !== "agent"} aria-labelledby="agent-build-title">
      <h2 id="agent-build-title">Let your agent handle the build</h2>
      <ol className={styles.agentStart}>
        <li>Open Claude Code or Codex with access to an empty project folder on your computer.</li>
        <li>Click <strong>Copy</strong> below and paste the whole prompt into a new task.</li>
        <li>Send it, then follow the agent’s short requests when it needs your help.</li>
      </ol>
      <aside className={styles.note}><p>You will still handle account login, permissions and entering credentials privately. Browser assistance depends on the tools available to your agent.</p></aside>
      <CopyPrompt label="Master prompt — Claude Code or Codex" prompt={masterPrompt} collapsible />
      <p className={styles.hint}>Includes all five steps and their prompts. The agent is instructed to flag outdated steps and ask before changing the method.</p>
      <button onClick={() => setMode("manual")}>Open the manual walkthrough →</button>
    </section>
    <div id="manual-build-path" hidden={mode !== "manual"}>
    <div className={styles.toolbar}>
      <div><strong>Your walkthrough</strong><small>{complete} of {sections.length} steps marked complete · {storageOk ? "Saved on this device" : "Progress available for this visit"}</small></div>
      <button onClick={() => setExpanded(!expanded)} aria-pressed={expanded}>{expanded ? "One step at a time" : "Expand all steps"}</button>
    </div>
    <progress value={complete} max={sections.length} aria-label="Self-reported step completion" />
    <nav className={styles.navigation} aria-label="Walkthrough steps">{sections.map((s, i) => <button key={s.heading} onClick={() => go(i)} aria-current={active === i ? "step" : undefined}><span aria-hidden="true">{done[`step-${i}`] ? "✓" : i + 1}</span>{labels[i] ?? s.heading}</button>)}</nav>
    <p className={styles.hint}>Tick actions as you go. Checkmarks record your progress; they do not verify your setup.</p>
    {sections.map((section, i) => <section key={section.heading} hidden={!expanded && active !== i} aria-labelledby={`walkthrough-step-${i}`}>
      <h2 id={`walkthrough-step-${i}`}>{section.heading}</h2><p>{section.introduction}</p>
      {i === 2 && <details className={styles.demo}><summary>See a dashboard layout example</summary><p>Illustrative layout with sample data. This is not a connected Instagram account or a verified build result.</p><div className={styles.demoStats}>{[["Avg likes", "128"], ["Avg comments", "12"], ["Avg reach", "2,400"], ["Avg saves", "24"]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><h3>Engagement over time</h3><div className={styles.bars} role="img" aria-label="Example chart showing engagement counts of 44, 70, 55, 92, 68 and 110"><span style={{height:"40%"}}>44</span><span style={{height:"64%"}}>70</span><span style={{height:"50%"}}>55</span><span style={{height:"84%"}}>92</span><span style={{height:"62%"}}>68</span><span style={{height:"100%"}}>110</span></div></details>}
      {section.blocks.map((block, b) => {
        if (block.kind === "heading") return <div key={b}><h3>{block.text}</h3>{shots[block.text] && <button className={styles.photoButton} onClick={() => setPhoto(shots[block.text])}><img src={shots[block.text].src} alt={shots[block.text].caption} /><span>View screenshot ↗</span><small>{shots[block.text].caption}</small></button>}</div>;
        if (block.kind === "paragraph") return <p key={b}>{cleanLabel(block.text)}</p>;
        if (block.kind === "note") return <aside key={b} className={styles.note}><GuideIcon name={block.icon.includes("⚠") ? "alert" : "check"}/><p>{block.text}</p></aside>;
        if (block.kind === "code") return <CopyPrompt key={b} label={block.label} prompt={block.text} collapsible />;
        if (block.kind === "list") return <ul key={b} className={styles.checklist}>{block.items.map((item, n) => {
          const id = `${i}-${b}-${n}`;
          return <li key={id}><label><input type="checkbox" checked={done[id] === true} onChange={e => setDone({ ...done, [id]: e.target.checked })} /><span>{item}</span></label></li>;
        })}</ul>;
        if (block.kind === "table") return <details key={b} className={styles.help}><summary>Something not working? View fixes</summary>{block.rows.map(([error, fix]) => <div key={error}><strong>{error}</strong><p>{fix}</p></div>)}</details>;
        return null;
      })}
      <label className={styles.finished}><input type="checkbox" checked={done[`step-${i}`] === true} onChange={e => setDone({ ...done, [`step-${i}`]: e.target.checked })} />I’ve completed this step</label>
      {!expanded && <div className={styles.footer}><button disabled={i === 0} onClick={() => go(i - 1)}>← Back</button><span>Step {i + 1} of {sections.length}</span><button disabled={i === sections.length - 1} onClick={() => go(i + 1)}>Next step →</button></div>}
    </section>)}
    {(expanded || active === sections.length - 1) && conclusion}
    </div>
    <dialog ref={dialog} className={styles.lightbox} onClose={() => setPhoto(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button onClick={() => dialog.current?.close()} autoFocus>Close screenshot ×</button>
      {photo && <><img src={photo.src} alt={photo.caption} /><p>{photo.caption}</p></>}
    </dialog>
  </div>;
}
