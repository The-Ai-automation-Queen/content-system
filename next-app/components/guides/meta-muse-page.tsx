"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./meta-muse-page.module.css";

const products = [
  { name: "Muse", purpose: "Meta's personal agent. It can use a browser, work through a task and ask for approval before sensitive actions." },
  { name: "Meta AI", purpose: "The assistant in Meta's apps and at meta.ai. It has its own action features, but it is not the Muse app." },
  { name: "Muse Spark", purpose: "The model behind Muse and some Meta AI features. You do not need a separate Muse Spark account." },
] as const;

const checks = [
  "The three options link to public venue pages I can open myself.",
  "The date, price and cancellation terms are shown or marked as missing.",
  "Muse stopped before a login, form, message or booking.",
] as const;

export function MetaMusePage({ guide }: { guide: GuidePage }) {
  const [product, setProduct] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  if (!guide.tryNow) return null;
  const related = publicGuides.filter(item => ["what-is-agentic", "what-should-you-never-share-with-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>What can Meta Muse <span>actually do for you?</span></h1><p>See the difference between Muse and Meta AI. Then try one public research task and check that Muse stops before it acts for you.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#muse-name-title">Know what you are opening</a><a href="#muse-example-title">See a task</a><a href="#muse-access-title">Choose the limit</a><a href="#muse-test-title">Try Muse</a></nav>

      <section className={styles.activity} aria-labelledby="muse-name-title"><div className={styles.sectionHead}><span>01 · The names</span><h2 id="muse-name-title">Muse, Meta AI or Muse Spark?</h2></div><p>You can use an assistant to get an answer. Muse goes further: it can open pages and work through a task. These names tell you which product you are giving the job to.</p><div className={styles.sourceTabs} aria-label="Choose a Meta product">{products.map((item, index) => <button type="button" key={item.name} aria-pressed={product === index} onClick={() => setProduct(index)}>{item.name}</button>)}</div><div className={styles.sourcePanel} aria-live="polite"><h3>{products[product].name}</h3><p>{products[product].purpose}</p></div></section>

      <section className={styles.activity} aria-labelledby="muse-example-title"><div className={styles.sectionHead}><span>02 · A first job</span><h2 id="muse-example-title">Find a meeting room. Stop before booking.</h2></div><p>Suppose you need a room near a station for four people. Muse can look across public venue pages and bring the options together. Your first test ends with a comparison, before it signs in, contacts a venue or holds a room.</p><div className={styles.exampleFlow} aria-label="Example Muse task"><div><strong>Your brief</strong><span>Three rooms, one date, public prices and source links.</span></div><div><strong>Muse's work</strong><span>Open public pages and list what each one actually says.</span></div><div><strong>Your decision</strong><span>Check missing costs and policies yourself before choosing.</span></div></div><p className={styles.exampleNote}>For example, if a venue lists an hourly price but hides the cancellation terms, the comparison should say “Cancellation needs checking”. It should not guess or send an enquiry for you.</p></section>

      <section className={styles.activity} aria-labelledby="muse-access-title"><div className={styles.sectionHead}><span>03 · Your limit</span><h2 id="muse-access-title">What changes when you connect an account?</h2></div><div className={styles.resultGrid}><div><strong>Read</strong><span>Muse may see what that service lets it read.</span></div><div><strong>Send or change</strong><span>More access can let it act outside Muse.</span></div><div><strong>Approve</strong><span>Check the action, destination and account before saying yes.</span></div></div><p className={styles.resultNote}>Start with public pages. You do not need to connect email, calendar or payment for this task.</p></section>

      <section className={styles.activity} aria-labelledby="muse-test-title"><div className={styles.sectionHead}><span>04 · Try it</span><h2 id="muse-test-title">Give Muse a job it can finish safely</h2></div><p>Open <a href="https://muse.ai/" target="_blank" rel="noopener noreferrer">Muse's official site ↗</a> if it is available to your account. Meta says Muse is rolling out first in the US, so access may vary. Give it a public comparison with a clear stop point.</p>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the meeting-room instruction" guidePromise="Copy the complete brief and keep a link to these checks." actionLabel="Show me the instruction">
          <div className={styles.prompt}><div className={styles.promptTop}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete Muse instruction">{copied ? "Copied" : "Copy"}</button></div><pre>{guide.tryNow.prompt}</pre></div>
          {copyError && <p className={styles.copyError} role="alert">Copy failed. Select the instruction text instead.</p>}
          <div className={styles.sourcePanel}><h3>Check the result before you use it</h3>{checks.map((label, index) => <label key={label} className={styles.checkLabel}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))}/><span>{label}</span></label>)}<p className={styles.resultNote} aria-live="polite">{checked.every(Boolean) ? "All three checks marked. Choose from the options you verified yourself." : "Open the sources and check the stop point before trusting the comparison."}</p></div>
        </GuideAccessBoundary>
      </section>
    </div>
    <section className={styles.related} aria-labelledby="muse-related-title"><div className={styles.relatedInner}><h2 id="muse-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
