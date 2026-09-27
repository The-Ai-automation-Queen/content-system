"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./grok-image-edits-page.module.css";

export function GrokImageEditsPage({ guide }: { guide: GuidePage }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [change, setChange] = useState("Replace the white background with a soft blue background.");
  const [locks, setLocks] = useState("Keep the blue notebook, its logo, position, camera angle, lighting and shadow unchanged.");
  if (!guide.tryNow) return null;
  const prompt = guide.tryNow.prompt.replace("[ONE VISIBLE CHANGE]", change.trim()).replace("[LOCKED DETAILS]", locks.trim());

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
      <header className={styles.hero}><h1>Can Grok edit one detail <span>without changing the rest?</span></h1><p>Save the original, request one clear change and compare the whole result before using it.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="image-master-title"><div className={styles.sectionHead}><span>See the test</span><h2 id="image-master-title">Change the background. Keep the product.</h2></div><p className={styles.intro}>Imagine a product photo of a blue notebook on a white desk. You want a softer blue background for a campaign, while the notebook, logo and lighting stay the same.</p><div className={styles.exampleFlow}><div><strong>Master image</strong><p>Blue notebook, white background, readable logo.</p></div><span aria-hidden="true">→</span><div><strong>One requested edit</strong><p>Change the background to soft blue.</p></div><span aria-hidden="true">→</span><div><strong>Check the result</strong><p>Compare the notebook, logo, angle and shadow with the master.</p></div></div><p className={styles.exampleNote}>If the logo or notebook changes, go back to the saved master. Do not build the next edit on a version that has already drifted.</p></section>

      <section className={styles.activity} aria-labelledby="image-prompt-title"><div className={styles.sectionHead}><span>Try it in Grok Imagine</span><h2 id="image-prompt-title">Make one edit from your saved master</h2></div><ol className={styles.steps}><li>Open <a href="https://grok.com/imagine" target="_blank" rel="noopener noreferrer">Grok Imagine ↗</a> and upload a public, invented or work-approved image you can edit.</li><li>Save the original before changing it. Describe one change and list what must stay.</li><li>Compare the full result with the original before you use it or make another version.</li></ol><div className={styles.fields}><label><span>Change only</span><textarea value={change} onChange={event => setChange(event.target.value)} rows={2} /></label><label><span>Keep unchanged</span><textarea value={locks} onChange={event => setLocks(event.target.value)} rows={2} /></label></div><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the image-edit request" guidePromise="Copy the complete request for your image and keep a link to return to this guide." actionLabel="Show the request"><div className={styles.prompt}><strong>Complete request for Grok Imagine</strong><pre>{prompt}</pre><button type="button" disabled={!change.trim() || !locks.trim()} onClick={copyPrompt} aria-label="Copy the complete Grok image edit request">{copied ? "Copied" : "Copy"}</button></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the request text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="image-track-title"><div className={styles.sectionHead}><span>Before you use the image</span><h2 id="image-track-title">Put the original and edit side by side</h2></div><div className={styles.reviewGrid}><div><strong>Did your change happen?</strong><p>Check the exact detail you requested.</p></div><div><strong>What else changed?</strong><p>Look at logos, faces, objects, edges, text, lighting and crop.</p></div><div><strong>Keep or retry?</strong><p>If a locked part changed, restart from the original. Save only the version you have checked.</p></div></div></section>
    </div>
    <section className={styles.related} aria-labelledby="image-related-title"><div className={styles.relatedInner}><h2 id="image-related-title">Keep the same review habit elsewhere</h2><div className={styles.relatedGrid}>{guide.related.filter(item => ["review-grok-suggestions", "get-better-professional-writing-from-grok"].includes(item.slug)).map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
