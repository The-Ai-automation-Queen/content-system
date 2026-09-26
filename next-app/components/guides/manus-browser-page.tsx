"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./manus-browser-page.module.css";

const routeDetails = [
  { label: "Cloud browser", access: "Public pages", next: "Keep account connectors off. Ask Manus to read one public page and show the source URL." },
  { label: "Connector", access: "One supported service", next: "Check what the connector can read or change before connecting the one service needed for your job." },
  { label: "Browser Operator", access: "Your signed-in browser", next: "Use this only if the job needs your existing browser session. Start with a read-only page and watch the task tab." },
] as const;

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function ManusBrowserPage({ guide }: { guide: GuidePage }) {
  const [route, setRoute] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [page, setPage] = useState("");
  const [fields, setFields] = useState(["", "", ""]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const comparison = guide.sections[0];
  const steps = guide.sections[1];
  if (comparison.kind !== "comparison" || steps.kind !== "steps" || !guide.tryNow) return null;
  const ready = page.trim().length > 2 && fields.every(value => value.trim().length > 0);
  const prompt = guide.tryNow.prompt
    .replace("[PAGE]", () => page.trim())
    .replace("[FIELD 1]", () => fields[0].trim())
    .replace("[FIELD 2]", () => fields[1].trim())
    .replace("[FIELD 3]", () => fields[2].trim());

  async function copyPrompt() {
    if (!ready) return;
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
      <header className={styles.hero}><h1>Does Manus need <span>your browser at all?</span></h1><p>Pick the narrowest access route that can complete one defined task. Use your signed-in browser only when a public page or one supported connector cannot provide what the task needs.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="manus-route-title"><div className={styles.sectionHead}><span>Choose the access</span><h2 id="manus-route-title">Where does the job live?</h2></div><div className={styles.routeGrid}>{comparison.rows.map((row, index) => <div key={row[0]} className={styles.routeOption}><button type="button" aria-pressed={route === index} onClick={() => setRoute(index)}><strong>{row[0]}</strong><small>{routeDetails[index].access}</small></button>{route === index && <div className={styles.routeResult}><p>{row[1]}</p><p>{routeDetails[index].next}</p></div>}</div>)}</div></section>

      {route === 1 && <section className={styles.activity} aria-labelledby="manus-connector-title"><div className={styles.sectionHead}><span>If one service is enough</span><h2 id="manus-connector-title">Check the connector first</h2></div><p>Confirm the exact service, account and permissions. <a href="https://help.manus.im/en/articles/12231777-how-can-i-use-manus-connectors" target="_blank" rel="noopener noreferrer">See Manus’s connector instructions ↗</a></p></section>}

      <section className={styles.activity} aria-labelledby="manus-local-title" hidden={route !== 2}><div className={styles.sectionHead}><span>Only for a signed-in page</span><h2 id="manus-local-title">Test Browser Operator with control</h2></div><p>Start with one harmless read-only job. Do not use this first test to submit, buy, message or delete.</p><div className={styles.stepList}>{steps.steps.map((item, index) => <div key={item.title} className={styles.stepItem}><button type="button" aria-expanded={activeStep === index} aria-controls={`manus-local-step-${index}`} onClick={() => setActiveStep(index)}><span>{index + 1}. {item.title}</span><span aria-hidden="true">{activeStep === index ? "−" : "+"}</span></button>{activeStep === index && <div id={`manus-local-step-${index}`}><Text value={item.body} /></div>}</div>)}</div><div className={styles.builder}><h3>Set a read-only boundary</h3><p>For example, on your own account overview, you might check the plan name, renewal date and seat count. Enter the page and 3 fields that matter for your task.</p><label><span>Page to open</span><input value={page} onChange={event => setPage(event.target.value)} placeholder="Your account's Overview page" /></label><div className={styles.fieldGrid}>{fields.map((value, index) => <label key={index}><span>Field {index + 1}</span><input value={value} onChange={event => setFields(current => current.map((old, i) => i === index ? event.target.value : old))} placeholder={["Plan name", "Renewal date", "Seat count"][index]} /></label>)}</div><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete Manus browser instruction">{copied ? "Copied" : "Copy"}</button></div>{!ready && <p className={styles.message}>Add one page and 3 fields before copying.</p>}{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}</div><div className={styles.checks}>{["Manus opened only the intended account page.", "It returned only the 3 requested fields and the page URL.", "It stopped without taking another action."].map((label, index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All checks marked. Remove browser access when the test is over." : `${checked.filter(Boolean).length} of 3 checks marked. Keep control of the task tab until Manus stops.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="manus-related-title"><div className={styles.relatedInner}><h2 id="manus-related-title">Before you give an agent more access</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
