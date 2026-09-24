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
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false]);
  const [found, setFound] = useState<"not-checked" | "yes" | "no">("not-checked");
  const [missing, setMissing] = useState("");
  const facts = guide.sections[0];
  if (facts.kind !== "cards" || !guide.tryNow) return null;
  const prompt = guide.tryNow.prompt
    .replace("[type of service or product]", service.trim() || "[type of service or product]")
    .replace("[type of customer]", customer.trim() || "[type of customer]")
    .replace("[location or market]", market.trim() || "[location or market]");

  async function copyPrompt() {
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
      <header className={styles.hero}><h1>Why doesn’t AI search mention <span>your business?</span></h1><p>You cannot make every AI tool recommend you. You can make your public facts easier to find and verify, then test what an answer actually shows.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="search-facts-title"><div className={styles.sectionHead}><span>Start with the source</span><h2 id="search-facts-title">Can someone find these facts on your site?</h2></div><div className={styles.factGrid}>{facts.items.map(item => <div key={item.title}><strong>{item.title}</strong><span>{item.body}</span></div>)}</div><p className={styles.note}>A useful page answers a real customer question. More vague pages will not fix a missing or inaccurate fact.</p></section>

      <section className={styles.activity} aria-labelledby="search-test-title"><div className={styles.sectionHead}><span>Run a neutral test</span><h2 id="search-test-title">Search without naming your business</h2></div><p className={styles.intro}>Use the type of service, customer and location a buyer would use. Results vary by tool, place and date.</p><div className={styles.fields}><label><span>Service or product</span><input value={service} onChange={event => setService(event.target.value)} placeholder="Type your service" /></label><label><span>Customer</span><input value={customer} onChange={event => setCustomer(event.target.value)} placeholder="Type your customer" /></label><label><span>Location or market</span><input value={market} onChange={event => setMarket(event.target.value)} placeholder="Type your market" /></label></div><div className={styles.prompt}><details><summary>View the complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete AI search instruction">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}<p className={styles.note}>After the neutral search, ask the same tool what it can verify about your business. Open every cited public source.</p></section>

      <section className={styles.activity} aria-labelledby="search-audit-title"><div className={styles.sectionHead}><span>Record what happened</span><h2 id="search-audit-title">What did the answer miss?</h2></div><div className={styles.choice} role="group" aria-label="Was your business mentioned?"><span>Was your business mentioned?</span><button type="button" aria-pressed={found === "yes"} onClick={() => setFound("yes")}>Yes</button><button type="button" aria-pressed={found === "no"} onClick={() => setFound("no")}>No</button></div><label className={styles.missing}><span>One important missing or wrong fact</span><input value={missing} onChange={event => setMissing(event.target.value)} placeholder="Write one fact to fix" /></label><div className={styles.checks}>{checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{check}</span></label>)}</div><p className={styles.result} aria-live="polite">{missing.trim() ? `Next: make “${missing.trim()}” clear on the relevant public page, then test again later.` : found === "no" ? "Start with the page that should explain your offer. Check its facts before creating another page." : "Save the date, tool, question and sources. Fix one missing fact before testing again."}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="search-related-title"><div className={styles.relatedInner}><h2 id="search-related-title">Make the next public page more useful</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
