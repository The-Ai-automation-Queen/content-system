"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./mistral-multilingual-page.module.css";

const example = {
  question: "What help do EU institutions offer small businesses that want to use AI?",
  firstLanguage: "English",
  secondLanguage: "French",
  startDate: "2026-01-01",
  endDate: "2026-08-31",
};

export function MistralMultilingualPage({ guide }: { guide: GuidePage }) {
  const [question, setQuestion] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("");
  const [secondLanguage, setSecondLanguage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const setup = guide.sections[0];
  const review = guide.sections[1];
  if (setup.kind !== "steps" || review.kind !== "comparison" || !guide.tryNow) return null;

  const ready = Boolean(question.trim() && firstLanguage.trim() && secondLanguage.trim() && startDate && endDate && startDate <= endDate && firstLanguage.trim().toLowerCase() !== secondLanguage.trim().toLowerCase());
  const prompt = guide.tryNow.prompt
    .replace("[QUESTION]", question.trim() || "[QUESTION]")
    .replace("[LANGUAGE 1]", firstLanguage.trim() || "[LANGUAGE 1]")
    .replace("[LANGUAGE 2]", secondLanguage.trim() || "[LANGUAGE 2]")
    .replace("[START DATE]", startDate || "[START DATE]")
    .replace("[END DATE]", endDate || "[END DATE]");

  function useExample() {
    setQuestion(example.question);
    setFirstLanguage(example.firstLanguage);
    setSecondLanguage(example.secondLanguage);
    setStartDate(example.startDate);
    setEndDate(example.endDate);
  }

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
      <header className={styles.hero}>
        <h1>Can Mistral research in two languages <span>without losing the source?</span></h1>
        <p>Keep the original wording, a careful translation and the direct link together. Then check each claim yourself.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.activity} aria-labelledby="bilingual-example-title">
        <div className={styles.sectionHead}><span>See the job first</span><h2 id="bilingual-example-title">One question, two searches</h2></div>
        <p className={styles.exampleQuestion}>{example.question}</p>
        <div className={styles.exampleParts}><span>English + French</span><span>Official sources first</span><span>Original words beside translations</span></div>
        <button className={styles.exampleButton} type="button" onClick={useExample}>Use this example</button>
      </section>

      <section className={styles.activity} aria-labelledby="bilingual-build-title">
        <div className={styles.sectionHead}><span>Make it yours</span><h2 id="bilingual-build-title">What do you need to find out?</h2></div>
        <div className={styles.fields}>
          <label className={styles.full}><span>Your question</span><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask one public question" /></label>
          <label><span>First language</span><input value={firstLanguage} onChange={(event) => setFirstLanguage(event.target.value)} placeholder="e.g. English" /></label>
          <label><span>Second language</span><input value={secondLanguage} onChange={(event) => setSecondLanguage(event.target.value)} placeholder="e.g. French" /></label>
          <label><span>Published after</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label><span>Published before</span><input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></label>
        </div>
        <div className={styles.prompt}><details open><summary>Complete research instruction</summary><pre>{prompt}</pre></details><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete bilingual research instruction">{copied ? "Copied" : "Copy"}</button></div>
        {!ready && <p className={styles.message}>Add a question, two different languages and a valid date range before copying.</p>}
        {copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
        <p className={styles.toolStep}><a href="https://chat.mistral.ai/" target="_blank" rel="noopener noreferrer">Open Mistral ↗</a> Choose Work, then <strong>+ → Tools → Web search</strong>. Paste the instruction into the chat. <a href="https://docs.mistral.ai/vibe/work/web-search-open-url" target="_blank" rel="noopener noreferrer">See Mistral’s current steps ↗</a></p>
      </section>

      <section className={styles.activity} aria-labelledby="bilingual-steps-title">
        <div className={styles.sectionHead}><span>While you research</span><h2 id="bilingual-steps-title">Keep the differences visible</h2></div>
        <nav className={styles.stepNav} aria-label="Research steps">{setup.steps.map((item, index) => <button key={item.title} type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{index + 1}</span>{item.title}</button>)}</nav>
        <div className={styles.stepBody} aria-live="polite"><strong>{setup.steps[step].title}</strong><p>{setup.steps[step].body}</p></div>
      </section>

      <section className={styles.activity} aria-labelledby="bilingual-check-title">
        <div className={styles.sectionHead}><span>Before you use a claim</span><h2 id="bilingual-check-title">Open the source and check it</h2></div>
        <div className={styles.checks}>{review.rows.map(([label, check], index) => <label key={label}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked((current) => current.map((value, i) => i === index ? !value : value))} /><span><strong>{label}</strong>{check}</span></label>)}</div>
        <p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All four checks marked. Keep only the conclusions you can trace to an opened source." : `${checked.filter(Boolean).length} of 4 checks marked. Leave unsupported conclusions out of your notes.`}</p>
      </section>
    </div>
    <section className={styles.related} aria-labelledby="bilingual-related-title"><div className={styles.relatedInner}><h2 id="bilingual-related-title">Take the source-checking habit further</h2><div className={styles.relatedGrid}>{guide.related.map((item) => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
