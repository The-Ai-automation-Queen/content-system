"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./gemini-drive-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function GeminiDrivePage({ guide }: { guide: GuidePage }) {
  const [open, setOpen] = useState(0);
  const [copied, setCopied] = useState("");
  const checks = guide.sections[0];
  if (checks.kind !== "steps" || !guide.tryNow) return null;
  const [demoPart, requestPart] = guide.tryNow.prompt.split("\n\nGemini request:\n");
  const demo = demoPart.replace(/^Demo document text:\n/, "");
  const request = requestPart ?? "";

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 2000);
  }

  function copyBox(value: string, key: string, label: string) {
    return <div className={styles.copyBox}><details><summary>View the complete {label}</summary><pre>{value}</pre></details><button type="button" onClick={() => copy(value, key)} aria-label={`Copy the complete ${label}`}>{copied === key ? "Copied" : "Copy"}</button></div>;
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>Why can’t Gemini see the file <span>in your Drive?</span></h1><p>Test one made-up document. Find out if the problem is your account, the connection, the search or the file.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.demo} aria-labelledby="gemini-demo-title"><div className={styles.sectionHead}><span>Set up a safe test</span><h2 id="gemini-demo-title">Make one document Gemini should find</h2></div><p>Open Google Docs with the same account you use for Gemini. Create a document called <strong>Autumn launch brief demo</strong> and paste in this invented text.</p><a href="https://docs.google.com/" target="_blank" rel="noopener noreferrer">Open Google Docs ↗</a>{copyBox(demo, "demo", "demo document text")}</section>

      <section className={styles.checks} aria-labelledby="gemini-checks-title"><div className={styles.sectionHead}><span>Find the blocker</span><h2 id="gemini-checks-title">Check these 5 things in order</h2></div><div className={styles.checkList}>{checks.steps.map((item, index) => <div className={styles.checkItem} key={item.title}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{index + 1}</span><strong>{item.title}</strong><b aria-hidden="true">{open === index ? "−" : "+"}</b></button>{open === index && <div className={styles.checkBody}><p><Text value={item.body} /></p>{index === 0 && <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Open Gemini ↗</a>}{index === 2 && <><p>Once you select <strong>@Google Drive</strong>, send this request. The demo text belongs in the document; only this request goes into Gemini.</p>{copyBox(request, "request", "Gemini request")}</>}{index === 3 && <p>If Gemini gives no source, open the document yourself. Do not rely on an answer you cannot compare with the file.</p>}</div>}</div>)}</div></section>

      <div className={styles.finish}><strong>If Drive still does not appear:</strong> for a work or school account, ask your administrator to check whether Gemini and connected apps are enabled for your account. If Gemini finds the demo file, compare its decision, owner and review date with the document before trying a real file.</div>
    </div>
    <section className={styles.related} aria-labelledby="gemini-related-title"><div className={styles.relatedInner}><h2 id="gemini-related-title">Keep working with the right access</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
