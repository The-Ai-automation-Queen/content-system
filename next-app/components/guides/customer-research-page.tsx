"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./customer-research-page.module.css";

export function CustomerResearchPage({ guide }: { guide: GuidePage }) {
  const [decision, setDecision] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;
  const prompt = guide.tryNow.prompt.replace("[DECISION]", decision.trim() || "[THE DECISION YOU WANT TO MAKE]");
  const related = publicGuides.filter(item => ["what-should-you-never-share-with-ai", "what-is-ai"].includes(item.slug));

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
      <header className={styles.hero}><h1>Find patterns in customer feedback. <span>Keep the proof.</span></h1><p>Turn interview or survey notes into a table of themes, quotes and disagreements you can check before you make a decision.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#research-example-title">See an example</a><a href="#research-ready-title">Prepare your notes</a><a href="#research-prompt-title">Get the instruction</a><a href="#research-check-title">Check the result</a></nav>

      <section className={styles.activity} aria-labelledby="research-example-title"><div className={styles.sectionHead}><span>01 · See the method</span><h2 id="research-example-title">What counts as a theme?</h2></div><p>Two people can describe the same problem in different words. Keep the exact responses beside your interpretation.</p><div className={styles.example} aria-label="Illustrative customer research example"><p className={styles.exampleTitle}>Example: two people left before signing up</p><p className={styles.exampleQuestion}><strong>Question:</strong> What stopped you signing up?</p><div className={styles.exampleResponses}><blockquote><strong>P01</strong><p>“I couldn’t find the price before sign-up.”</p></blockquote><blockquote><strong>P02</strong><p>“I had to give my email before I could see the cost.”</p></blockquote></div><p className={styles.exampleTheme}><strong>Possible theme:</strong> The price appears too late. Both responses support this; two people do not tell you what all customers want.</p></div><p>That is the standard for the table you will ask ChatGPT to make: every theme must point back to participant IDs and short extracts.</p></section>

      <section className={styles.activity} aria-labelledby="research-ready-title"><div className={styles.sectionHead}><span>02 · Prepare the material</span><h2 id="research-ready-title">Make a copy you can trace</h2></div><ol className={styles.preparation}><li>Use research you have permission to upload. Remove names, email addresses, account details and sensitive business information. A participant ID such as P01 should replace each name.</li><li>Put each answer in its own row with the participant ID, question and response. Keep your original notes separately for checking.</li><li>Name the product or service decision you want the research to inform. The table should help you see evidence, not decide for you.</li></ol><p className={styles.sourceNote}>ChatGPT supports document and spreadsheet uploads, subject to your plan and workspace settings. Check your organisation’s rules first. <a href="https://help.openai.com/en/articles/8555545-file-uploads-faq" target="_blank" rel="noopener noreferrer">See OpenAI’s file-upload guidance ↗</a></p></section>

      <section className={styles.activity} aria-labelledby="research-prompt-title"><div className={styles.sectionHead}><span>03 · Build the evidence table</span><h2 id="research-prompt-title">What decision are you trying to make?</h2></div><label className={styles.decision}><span>Write it in your own words</span><input value={decision} onChange={event => setDecision(event.target.value)} placeholder="For example: Should we show the price before sign-up?" /></label><p className={styles.intro}>The instruction below adds your decision to a table request. It asks ChatGPT to show the people and extracts behind each theme, plus disagreements and gaps.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the customer-research instruction" guidePromise="Copy the full evidence-table instruction and keep a link back to this example." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete customer research instruction">{copied ? "Copied" : "Copy"}</button><pre>{prompt}</pre></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="research-check-title"><div className={styles.sectionHead}><span>04 · Check the answer</span><h2 id="research-check-title">Would the themes hold up in your notes?</h2></div><ul className={styles.reviewList}><li>Find each participant ID and extract in the original notes. Remove any line you cannot trace.</li><li>Keep disagreement and one-person signals visible. Do not turn two interviews into a claim about all customers.</li><li>Use the table to decide what to ask next. You still make the product decision.</li></ul></section>
    </div>
    <section className={styles.related} aria-labelledby="research-related-title"><div className={styles.relatedInner}><h2 id="research-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
