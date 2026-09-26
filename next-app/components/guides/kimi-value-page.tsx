"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./kimi-value-page.module.css";

const resultChecks = [
  "The downloaded file has the 3 sample tasks.",
  "I can change a task's status.",
  "A task marked Done is not flagged overdue.",
] as const;

const frequencies = [
  { label: "Once a month", runs: 1 },
  { label: "Every week", runs: 4 },
  { label: "Most workdays", runs: 20 },
] as const;

export function KimiValuePage({ guide }: { guide: GuidePage }) {
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const [runs, setRuns] = useState<number | null>(null);
  const [creditUse, setCreditUse] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const decisions = guide.sections[1];
  if (decisions.kind !== "cards" || !guide.tryNow) return null;

  const numberUsed = Number(creditUse);
  const validUsage = creditUse.trim() !== "" && Number.isFinite(numberUsed) && numberUsed > 0 && numberUsed <= 100;
  const estimatedUse = runs !== null && validUsage ? runs * numberUsed : null;
  const filePassed = checks.every(Boolean);
  const result = !filePassed
    ? "Check the file first. More credits will not make an untested result useful."
    : estimatedUse === null
      ? "Now choose how often you would make this file and add the credit use shown in your account."
      : estimatedUse > 100
        ? `About ${estimatedUse.toFixed(2)}% of your current monthly pool for this task alone. Your current allowance is unlikely to cover that frequency. Check the live paid allowance and price before buying.`
        : `About ${estimatedUse.toFixed(2)}% of your current monthly pool for this task alone. Check your other Kimi use before deciding if you need a bigger plan.`;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(guide.tryNow!.prompt);
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
      <header className={styles.hero}><h1>Is Kimi worth paying for <span>your work?</span></h1><p>Test one useful file. See what it used. Then decide if your current plan is enough.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="kimi-test-title"><div className={styles.sectionHead}><span>Try it</span><h2 id="kimi-test-title">Make a file you would actually use</h2></div><p>Already made the tracker in <Link href="/guides/make-work-tracker-with-kimi/">the Kimi Sheets guide</Link>? Use that result. Otherwise, open <a href="https://www.kimi.com/en/sheets" target="_blank" rel="noopener noreferrer">Kimi Sheets</a> and sign in. This test asks for a three-row tracker with fictional tasks, due dates and status. You will check the downloaded file before considering a paid plan.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} heading="Get the Kimi test instruction" guidePromise="Copy the three-task tracker test, then check the file and your credit use before paying." actionLabel="Show the instruction" variant="unlock"><div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete Kimi Sheets test instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select and copy the instruction instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="kimi-check-title"><div className={styles.sectionHead}><span>Check it</span><h2 id="kimi-check-title">Would you keep this file?</h2></div><p>Open the downloaded Excel file and try these 3 checks. Tick only what you saw work.</p><div className={styles.checks}>{resultChecks.map((label, index) => <label key={label}><input type="checkbox" checked={checks[index] ?? false} onChange={() => setChecks(current => current.map((value, i) => i === index ? !value : value))} /><span>{label}</span></label>)}</div></section>

      <section className={styles.activity} aria-labelledby="kimi-usage-title"><div className={styles.sectionHead}><span>Check the allowance</span><h2 id="kimi-usage-title">How often would you need this?</h2></div><p>Kimi features use a shared monthly credit pool. Find this task in <strong>My → Membership Plan → Credits and Invoices → My Credits → Usage Details</strong>. Enter the percentage it used.</p><div className={styles.frequency} role="group" aria-label="How often you would make this file">{frequencies.map(item => <button key={item.runs} type="button" aria-pressed={runs === item.runs} onClick={() => setRuns(item.runs)}>{item.label}</button>)}</div><label className={styles.usageInput}><span>Credit use for this task (%)</span><input type="number" min="0.01" max="100" step="0.01" inputMode="decimal" value={creditUse} onChange={event => setCreditUse(event.target.value)} placeholder="From Kimi usage details" /></label><p className={styles.result} aria-live="polite">{result}</p><p className={styles.finePrint}>This is a rough estimate. Task size varies, and other Kimi features use the same pool.</p></section>

      <section className={styles.activity} aria-labelledby="kimi-decision-title"><div className={styles.sectionHead}><span>Decide</span><h2 id="kimi-decision-title">Pay, stay or wait?</h2></div><div className={styles.decisions}>{decisions.items.map(item => <article key={item.title}><strong>{item.title}</strong><p>{item.body}</p></article>)}</div><p>Before paying, check <a href="https://www.kimi.com/en/help/membership/membership-pricing" target="_blank" rel="noopener noreferrer">Kimi's current plan details</a> and the price shown to you. A bigger plan changes the allowance, so this estimate only describes your current one.</p></section>
    </div>
    <section className={styles.related} aria-labelledby="kimi-related-title"><div className={styles.relatedInner}><h2 id="kimi-related-title">Keep the decision useful</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
