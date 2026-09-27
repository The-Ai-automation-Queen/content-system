"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { publicGuides } from "@/content/guides";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./deepseek-document-page.module.css";

type Winner = "deepseek" | "current" | "tie" | null;
const options: { value: Exclude<Winner, null>; label: string }[] = [
  { value: "deepseek", label: "DeepSeek" },
  { value: "current", label: "Current tool" },
  { value: "tie", label: "Similar" },
];

const sample = `Pilot starts 12 October. Operations will set up the trial. No customer data may be added until the security review is complete. The proposed budget is $2,000; Finance has not approved it. The go/no-go decision is due 26 October. The owner for the Support handover has not been named.`;

export function DeepseekDocumentPage({ guide }: { guide: GuidePage }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [documentIndex, setDocumentIndex] = useState(0);
  const [scoresByDocument, setScoresByDocument] = useState<Winner[][]>([
    [null, null, null],
    [null, null, null],
  ]);
  const [minutesByDocument, setMinutesByDocument] = useState<string[][]>([["", ""], ["", ""]]);
  const criteria = guide.sections[0];
  const test = guide.sections[1];
  if (criteria.kind !== "cards" || test.kind !== "steps" || !guide.tryNow) return null;
  const scores = scoresByDocument[documentIndex];
  const minutes = minutesByDocument[documentIndex];
  const documentComplete = (index: number) => scoresByDocument[index].every(Boolean) && minutesByDocument[index].every(value => value.trim() !== "" && Number.isFinite(Number(value)) && Number(value) >= 0);
  const completedCount = [0, 1].filter(documentComplete).length;
  const allScores = scoresByDocument.flat();
  const deepseekWins = allScores.filter(value => value === "deepseek").length;
  const currentWins = allScores.filter(value => value === "current").length;
  const ties = allScores.filter(value => value === "tie").length;
  const totalMinutes = [0, 1].map(toolIndex => minutesByDocument.reduce((total, documentMinutes) => total + Number(documentMinutes[toolIndex] || 0), 0));
  const related = publicGuides.filter(item => ["what-is-ai", "what-should-you-never-share-with-ai"].includes(item.slug));

  function setScore(criterionIndex: number, winner: Exclude<Winner, null>) {
    setScoresByDocument(current => current.map((documentScores, index) => index === documentIndex
      ? documentScores.map((value, i) => i === criterionIndex ? winner : value)
      : documentScores));
  }

  function setMinutes(toolIndex: number, value: string) {
    setMinutesByDocument(current => current.map((documentMinutes, index) => index === documentIndex
      ? documentMinutes.map((minutes, i) => i === toolIndex ? value : minutes)
      : documentMinutes));
  }

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
      <header className={styles.hero}><h1>Can DeepSeek handle your document work <span>as well as your current tool?</span></h1><p>Give both tools the same document and instruction. Check the facts, missing details and time spent fixing each result.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#doc-example-title">See an example</a><a href="#doc-test-title">Set up the test</a><a href="#doc-prompt-title">Get the instruction</a><a href="#doc-score-title">Compare the results</a></nav>

      <section className={styles.activity} aria-labelledby="doc-example-title"><div className={styles.sectionHead}><span>01 · What a good answer catches</span><h2 id="doc-example-title">A small brief with one easy trap</h2></div><p className={styles.intro}>Use this sample to see what you will check later. The budget is proposed, not approved, and the Support owner is missing.</p><blockquote className={styles.sample}>{sample}</blockquote><div className={styles.exampleResult}><div><strong>Confirmed</strong><p>Operations sets up the trial. No customer data goes in before the security review.</p></div><div><strong>Not approved</strong><p>The $2,000 budget is only proposed.</p></div><div><strong>Missing</strong><p>No owner is named for the Support handover.</p></div></div></section>

      <section className={styles.activity} aria-labelledby="doc-test-title"><div className={styles.sectionHead}><span>02 · Keep the test fair</span><h2 id="doc-test-title">Use the same input twice</h2></div><ol className={styles.steps}>{test.steps.map(step => <li key={step.title}><strong>{step.title}.</strong> {step.body}</li>)}</ol><p className={styles.sourceNote}>Use the DeepSeek version you can actually access. DeepSeek lists V4.1 Flash as an API release; the model in its chat product may differ. <a href="https://api-docs.deepseek.com/updates/" target="_blank" rel="noopener noreferrer">See DeepSeek’s updates ↗</a></p></section>

      <section className={styles.activity} aria-labelledby="doc-prompt-title"><div className={styles.sectionHead}><span>03 · Run the test</span><h2 id="doc-prompt-title">Get the complete comparison instruction</h2></div><p className={styles.intro}>Start with the sample above or another document you are allowed to share. Add the same text or file to both tools, then use the exact same instruction.</p><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Open the comparison instruction" guidePromise="Get the full document-test instruction and a link back to this example." actionLabel="Show me the instruction"><div className={styles.prompt}><strong>Complete instruction</strong><button type="button" onClick={copyPrompt} aria-label="Copy the complete document comparison instruction">{copied ? "Copied" : "Copy"}</button><pre>{guide.tryNow.prompt}</pre></div>{copyError && <p className={styles.message} role="alert">Copy failed. Select the instruction text instead.</p>}</GuideAccessBoundary></section>

      <section className={styles.activity} aria-labelledby="doc-score-title"><div className={styles.sectionHead}><span>04 · Check the work</span><h2 id="doc-score-title">Which result needed less repair?</h2></div><div className={styles.documentTabs} role="group" aria-label="Document to score">{[0, 1].map(index => <button key={index} type="button" aria-pressed={documentIndex === index} onClick={() => setDocumentIndex(index)}>Document {index + 1}{documentComplete(index) ? " · scored" : ""}</button>)}</div><p className={styles.scoreIntro}>Score both tools against document {documentIndex + 1}. Use a different safe document for the second test.</p><div className={styles.scoreGrid}>{criteria.items.map((item, index) => <fieldset key={`${documentIndex}-${item.title}`}><legend><strong>{item.title}</strong><span>{item.body}</span></legend><div>{options.map(option => <label key={option.value}><input type="radio" name={`document-${documentIndex}-score-${index}`} checked={scores[index] === option.value} onChange={() => setScore(index, option.value)} /><span>{option.label}</span></label>)}</div></fieldset>)}</div><div className={styles.timeGrid}><label><span>Minutes to check and repair DeepSeek</span><input type="number" min="0" value={minutes[0]} onChange={event => setMinutes(0, event.target.value)} /></label><label><span>Minutes to check and repair your current tool</span><input type="number" min="0" value={minutes[1]} onChange={event => setMinutes(1, event.target.value)} /></label></div><p className={styles.result} aria-live="polite">{completedCount === 2 ? "Here is what happened across your two documents. Check the differences that matter for your work before changing tools." : `${completedCount} of 2 documents scored. Score accuracy, coverage and restraint, then add both checking times for each document.`}</p>{completedCount === 2 && <div className={styles.comparison} aria-label="Your two-document comparison"><div><strong>DeepSeek</strong><span>{deepseekWins} of 6 checks better</span><span>{totalMinutes[0]} minutes to check and repair</span></div><div><strong>Current tool</strong><span>{currentWins} of 6 checks better</span><span>{totalMinutes[1]} minutes to check and repair</span></div><p>{ties > 0 ? `${ties} ${ties === 1 ? "check was" : "checks were"} similar. ` : ""}This comparison covers only the two documents you tested.</p></div>}</section>
    </div>
    <section className={styles.related} aria-labelledby="doc-related-title"><div className={styles.relatedInner}><h2 id="doc-related-title">Keep reading</h2><div className={styles.relatedGrid}>{related.map(item => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{item.title}</h3><p>{item.summary}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
