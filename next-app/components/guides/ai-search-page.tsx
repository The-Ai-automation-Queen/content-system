"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./ai-search-page.module.css";

const checks = [
  "The page says who the service helps and what it does.",
  "The location or market is clear where it matters.",
  "The main title answers a question a customer would ask.",
  "Important claims have examples or evidence to check.",
  "The contact and offer details agree with public profiles.",
] as const;

export function AiSearchPage({ guide }: { guide: GuidePage }) {
  const [service, setService] = useState("");
  const [customer, setCustomer] = useState("");
  const [market, setMarket] = useState("");
  const [website, setWebsite] = useState("");
  const [copied, setCopied] = useState<"neutral" | "site" | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false]);
  const [found, setFound] = useState<"not-checked" | "yes" | "no">("not-checked");
  const [missing, setMissing] = useState("");
  const facts = guide.sections[0];
  if (facts.kind !== "cards" || !guide.tryNow) return null;
  const neutralReady = [service, customer, market].every((value) => value.trim().length > 0);
  let siteReady = false;
  try {
    const url = new URL(website.trim());
    siteReady = ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
  } catch {
    // A complete public URL is needed before copying the website check.
  }
  const prompt = guide.tryNow.prompt
    .replace("[type of service or product]", service.trim() || "[type of service or product]")
    .replace("[type of customer]", customer.trim() || "[type of customer]")
    .replace("[location or market]", market.trim() || "[location or market]");
  const sitePrompt = `Now check my public website: ${website.trim() || "[paste your public website URL]"}.

Use only pages you can open. Tell me what a customer can verify about:
1. Who this business helps.
2. What it offers.
3. Its location or market, if relevant.
4. How to contact it.

Give the exact page URL for each fact. Write “Not verified” if a page is unavailable or a fact is missing. Do not guess. Name up to 3 important facts a buyer still could not check.`;

  async function copyPrompt(value: string, kind: "neutral" | "site") {
    if ((kind === "neutral" && !neutralReady) || (kind === "site" && !siteReady)) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setCopyError(false);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Why doesn’t AI search mention <span>your business?</span></h1><p>You cannot make every AI tool recommend you. You can make your public facts easier to find and verify, then test what an answer actually shows.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="search-facts-title"><div className={styles.sectionHead}><span>Start with the source</span><h2 id="search-facts-title">Can someone find these facts on your site?</h2></div><div className={styles.factGrid}>{facts.items.map(item => <div key={item.title}><strong>{item.title}</strong><span>{item.body}</span></div>)}</div><p className={styles.note}>A useful page answers a real customer question. More vague pages will not fix a missing or inaccurate fact.</p></section>

      <section className={styles.activity} aria-labelledby="search-test-title">
        <div className={styles.sectionHead}><span>Run a neutral test</span><h2 id="search-test-title">Search without naming your business</h2></div>
        <p className={styles.intro}>Use an AI tool that can search the web. Describe the service, customer and location a buyer would use. Results vary by tool, place and date.</p>
        <div className={styles.fields}>
          <label><span>Service or product</span><input value={service} onChange={event => setService(event.target.value)} placeholder="e.g. payroll software" /></label>
          <label><span>Customer</span><input value={customer} onChange={event => setCustomer(event.target.value)} placeholder="e.g. small design studios" /></label>
          <label><span>Location or market</span><input value={market} onChange={event => setMarket(event.target.value)} placeholder="e.g. UK" /></label>
        </div>
        <div className={styles.prompt}><details><summary>View the search instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!neutralReady} onClick={() => copyPrompt(prompt, "neutral")} aria-label="Copy the neutral search instruction">{copied === "neutral" ? "Copied" : "Copy"}</button></div>
        {!neutralReady && <p className={styles.message}>Fill the three fields to copy a complete search instruction.</p>}
        <label className={styles.siteField}><span>Then check your public website</span><input type="url" value={website} onChange={event => setWebsite(event.target.value)} placeholder="https://your-site.example" /></label>
        <div className={styles.prompt}><details><summary>View the website check instruction</summary><pre>{sitePrompt}</pre></details><button type="button" disabled={!siteReady} onClick={() => copyPrompt(sitePrompt, "site")} aria-label="Copy the website check instruction">{copied === "site" ? "Copied" : "Copy"}</button></div>
        {!siteReady && <p className={styles.message}>Enter your public website URL to copy this check.</p>}
        {copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
        <p className={styles.note}>Run both instructions in the same web-search-capable tool. Open every cited public source yourself.</p>
      </section>

      <section className={styles.activity} aria-labelledby="search-audit-title"><div className={styles.sectionHead}><span>Record what happened</span><h2 id="search-audit-title">What did the answer miss?</h2></div><div className={styles.choice} role="group" aria-label="Was your business mentioned?"><span>Was your business mentioned?</span><button type="button" aria-pressed={found === "yes"} onClick={() => setFound("yes")}>Yes</button><button type="button" aria-pressed={found === "no"} onClick={() => setFound("no")}>No</button></div><label className={styles.missing}><span>One important missing or wrong fact</span><input value={missing} onChange={event => setMissing(event.target.value)} placeholder="Write one fact to check" /></label><div className={styles.checks}>{checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{check}</span></label>)}</div><p className={styles.result} aria-live="polite">{missing.trim() ? `Next: check if “${missing.trim()}” is missing or wrong on your public page. Correct it there if needed, then test again later.` : found === "no" ? "Start with the page that should explain your offer. Check its facts before creating another page." : "Save the date, tool, question and sources. Correct a public fact only if your source check shows it is missing or wrong."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="search-related-title"><div className={styles.relatedInner}><h2 id="search-related-title">Make the next public page more useful</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
