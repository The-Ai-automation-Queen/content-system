"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideAccessBoundary } from "./guide-access-boundary";
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
  const [publicPage, setPublicPage] = useState("https://manus.im/blog/manus-browser-operator");
  const [service, setService] = useState("Google Calendar");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const comparison = guide.sections[0];
  const steps = guide.sections[1];
  if (comparison.kind !== "comparison" || steps.kind !== "steps" || !guide.tryNow) return null;
  const ready = route === 0 ? /^https:\/\//.test(publicPage.trim()) : route === 1 ? service.trim().length > 1 : page.trim().length > 2 && fields.every(value => value.trim().length > 0);
  const browserPrompt = guide.tryNow.prompt
    .replace("[PAGE]", () => page.trim())
    .replace("[FIELD 1]", () => fields[0].trim())
    .replace("[FIELD 2]", () => fields[1].trim())
    .replace("[FIELD 3]", () => fields[2].trim());
  const prompt = route === 0
    ? `Use the cloud browser to open this public page: ${publicPage.trim()}\n\nDo not sign in or connect an account. Find the publication date, what Browser Operator can access, and how a person can stop its work. For each answer, give the exact part of the page that supports it and the page URL. If a detail is missing, say "Not found on this page". Stop after those three answers.`
    : route === 1
      ? `I may connect ${service.trim()} to Manus. Before I connect anything, tell me what this connector is meant to do and what permission questions I should check on the actual authorisation screen. Separate what you know from what only the screen can confirm. Do not connect, read or change the account. Stop after the short checklist.`
      : browserPrompt;

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
      <header className={styles.hero}><h1>Does Manus need <span>your browser at all?</span></h1><p>Choose the smallest route that can finish the job. Use your signed-in browser only when public pages or a connector cannot do it.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="manus-example-title"><div className={styles.sectionHead}><span>See the choice</span><h2 id="manus-example-title">A public page does not need your login</h2></div><p>Suppose you want three facts from Manus’s public <a href="https://manus.im/blog/manus-browser-operator" target="_blank" rel="noopener noreferrer">Browser Operator announcement ↗</a>: its date, what it can access and how you stop a task. The cloud browser can read that page. Your own signed-in browser adds no value to this job.</p><div className={styles.exampleFlow}><span>Public page</span><span aria-hidden="true">→</span><span>Cloud browser</span><span aria-hidden="true">→</span><span>Three linked facts</span></div></section>

      <section className={styles.activity} aria-labelledby="manus-route-title"><div className={styles.sectionHead}><span>Choose the access</span><h2 id="manus-route-title">Where does the job live?</h2></div><div className={styles.routeGrid}>{comparison.rows.map((row, index) => <div key={row[0]} className={styles.routeOption}><button type="button" aria-pressed={route === index} onClick={() => setRoute(index)}><strong>{row[0]}</strong><small>{routeDetails[index].access}</small></button>{route === index && <div className={styles.routeResult}><p>{row[1]}</p><p>{routeDetails[index].next}</p></div>}</div>)}</div></section>

      {route === 1 && <section className={styles.activity} aria-labelledby="manus-connector-title"><div className={styles.sectionHead}><span>If one service is enough</span><h2 id="manus-connector-title">Check the connector first</h2></div><p>Confirm the exact service, account and permissions. <a href="https://help.manus.im/en/articles/12231777-how-can-i-use-manus-connectors" target="_blank" rel="noopener noreferrer">See Manus’s connector instructions ↗</a></p></section>}

      {route === 2 && <section className={styles.activity} aria-labelledby="manus-local-title"><div className={styles.sectionHead}><span>Only for a signed-in page</span><h2 id="manus-local-title">Keep control of Browser Operator</h2></div><p>Use this route only when a public page or narrow connector cannot do the job. Start with one read-only task and watch the dedicated tab.</p><div className={styles.stepList}>{steps.steps.map((item, index) => <div key={item.title} className={styles.stepItem}><button type="button" aria-expanded={activeStep === index} aria-controls={`manus-local-step-${index}`} onClick={() => setActiveStep(index)}><span>{index + 1}. {item.title}</span><span aria-hidden="true">{activeStep === index ? "−" : "+"}</span></button>{activeStep === index && <div id={`manus-local-step-${index}`}><Text value={item.body} /></div>}</div>)}</div><p><a href="https://manus.im/blog/manus-browser-operator" target="_blank" rel="noopener noreferrer">See Manus’s Browser Operator instructions ↗</a></p></section>}

      <section className={styles.activity} aria-labelledby="manus-request-title"><div className={styles.sectionHead}><span>Try the route you chose</span><h2 id="manus-request-title">Get a request with a clear stopping point</h2></div><div className={styles.builder}>
        {route === 0 && <><p>Start with the public Manus announcement. Change the URL if you have another public page to check.</p><label><span>Public page URL</span><input value={publicPage} onChange={event => setPublicPage(event.target.value)} /></label></>}
        {route === 1 && <><p>Choose one service. The actual authorisation screen tells you what access you would grant; read it before connecting.</p><label><span>Service you are considering</span><input value={service} onChange={event => setService(event.target.value)} /></label></>}
        {route === 2 && <><p>Use an account you may access. Name one overview page and three non-confidential fields. Authorise the browser only when Manus asks for it.</p><label><span>Page to open</span><input value={page} onChange={event => setPage(event.target.value)} placeholder="Your account's Overview page" /></label><div className={styles.fieldGrid}>{fields.map((value, index) => <label key={index}><span>Field {index + 1}</span><input value={value} onChange={event => setFields(current => current.map((old, i) => i === index ? event.target.value : old))} placeholder={["Plan name", "Renewal date", "Seat count"][index]} /></label>)}</div></>}
        {!ready && <p className={styles.message}>{route === 0 ? "Enter a public https:// page." : route === 1 ? "Name the service you want to check." : "Add one page and three fields before copying."}</p>}
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get your Manus request" guidePromise="Copy the complete request for the route you chose and keep a link to return to this guide." actionLabel="Show the request"><div className={styles.prompt}><strong>Complete request for Manus</strong><pre>{prompt}</pre><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete Manus request">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the request text instead.</p>}</GuideAccessBoundary>
      </div></section>
    </div>
    <section className={styles.related} aria-labelledby="manus-related-title"><div className={styles.relatedInner}><h2 id="manus-related-title">Before you connect more</h2><div className={styles.relatedGrid}>
      <GuideRelatedLink slug="connect-ai-to-email-files-calendar"><figure><Image src="/images/guides/connect-ai-to-email-files-calendar.webp" alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>Should you connect AI to your email, files and calendar?</h3><p>Check what a connection can see or change.</p><span>Start the guide →</span></div></GuideRelatedLink>
      <GuideRelatedLink slug="what-should-you-never-share-with-ai"><figure><Image src="/images/guides/learn-master.webp" alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>What should you never share with AI?</h3><p>Know what stays out before you give a tool access.</p><span>Start the guide →</span></div></GuideRelatedLink>
    </div></div></section>
  </main>;
}
