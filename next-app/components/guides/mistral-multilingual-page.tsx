"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./mistral-multilingual-page.module.css";

const example = {
  question: "Where can a small business in France get help to start using AI?",
  firstLanguage: "English",
  secondLanguage: "French",
};

function dateInputValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function recentYear() {
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1);
  return { start: dateInputValue(start), end: dateInputValue(end) };
}

export function MistralMultilingualPage({ guide }: { guide: GuidePage }) {
  const [question, setQuestion] = useState(example.question);
  const [firstLanguage, setFirstLanguage] = useState(example.firstLanguage);
  const [secondLanguage, setSecondLanguage] = useState(example.secondLanguage);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const stepBodyRef = useRef<HTMLDivElement>(null);
  const setup = guide.sections[0];
  const review = guide.sections[1];

  useEffect(() => {
    const dates = recentYear();
    setStartDate(dates.start);
    setEndDate(dates.end);
  }, []);

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
    const dates = recentYear();
    setStartDate(dates.start);
    setEndDate(dates.end);
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

  function showStep(index: number) {
    setStep(index);
    window.requestAnimationFrame(() => {
      stepBodyRef.current?.scrollIntoView({ block: "nearest" });
      stepBodyRef.current?.focus({ preventScroll: true });
    });
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
        <div className={styles.sourceGrid}>
          <article><span>English page</span><strong>European Digital Innovation Hubs</strong><p>The European Commission says these hubs help businesses test technology and build skills.</p><a href="https://digital-strategy.ec.europa.eu/en/policies/edihs" target="_blank" rel="noopener noreferrer">Open the English page ↗</a></article>
          <article><span>French page</span><strong>Autodiag IA · France Num</strong><p>France Num points to a Bpifrance self-assessment for small businesses. This is a different publisher and a different kind of help.</p><a href="https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/diagnostic-numerique/autodiag-ia-evaluez-la-capacite-de" target="_blank" rel="noopener noreferrer">Open the French page ↗</a></article>
        </div>
        <p className={styles.takeaway}><strong>What changed?</strong> The EU page shows a network where businesses can test technology and build skills. The French page points to a self-assessment. They offer different next steps. A translation of the EU page would still count as the same source.</p>
        <button className={styles.exampleButton} type="button" onClick={useExample}>Reset to this example</button>
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
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="unlock" heading="Get the complete research request" guidePromise="Copy the request for Mistral and keep a link to return to this guide." actionLabel="Show the request">
          <div className={styles.prompt}><strong>Complete request for Mistral</strong><pre>{prompt}</pre><button type="button" disabled={!ready} onClick={copyPrompt} aria-label="Copy the complete bilingual research request">{copied ? "Copied" : "Copy"}</button></div>
        </GuideAccessBoundary>
        {!ready && <p className={styles.message}>Add a question, two different languages and a valid date range before copying.</p>}
        {copyError && <p className={styles.message} role="alert">Copy failed. Open the instruction and select the text instead.</p>}
        <p className={styles.toolStep}><a href="https://chat.mistral.ai/" target="_blank" rel="noopener noreferrer">Open Mistral ↗</a> If your account still shows separate modes, choose <strong>Work</strong>. Select <strong>+</strong> or type <strong>/</strong>, then choose <strong>Tools → Web search</strong>. Paste the request into the chat. <a href="https://docs.mistral.ai/vibe/work/web-search-open-url" target="_blank" rel="noopener noreferrer">See Mistral’s steps ↗</a></p>
      </section>

      <section className={styles.activity} aria-labelledby="bilingual-steps-title">
        <div className={styles.sectionHead}><span>While you research</span><h2 id="bilingual-steps-title">Keep the differences visible</h2></div>
        <nav className={styles.stepNav} aria-label="Research steps">{setup.steps.map((item, index) => <button key={item.title} type="button" aria-current={step === index ? "step" : undefined} onClick={() => showStep(index)}><span>{index + 1}</span>{item.title}</button>)}</nav>
        <div ref={stepBodyRef} tabIndex={-1} className={styles.stepBody} aria-live="polite"><strong>{setup.steps[step].title}</strong><p>{setup.steps[step].body}</p></div>
      </section>

      <section className={styles.activity} aria-labelledby="bilingual-check-title">
        <div className={styles.sectionHead}><span>Before you use a claim</span><h2 id="bilingual-check-title">Open the source and check it</h2></div>
        <div className={styles.checks}>{review.rows.map(([label, check]) => <div key={label}><strong>{label}</strong><p>{check}</p></div>)}</div>
        <p className={styles.result}>A translated version of the same page is still one source. Find another publisher if the decision needs independent confirmation.</p>
      </section>
    </div>
    <section className={styles.related} aria-labelledby="bilingual-related-title"><div className={styles.relatedInner}><h2 id="bilingual-related-title">Keep checking your sources</h2><div className={styles.relatedGrid}>
      <GuideRelatedLink slug="what-is-ai"><figure><Image src="/images/guides/what-is-ai.webp" alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>What AI actually is</h3><p>Try a task and compare the answer with the original.</p><span>Start the guide →</span></div></GuideRelatedLink>
      <GuideRelatedLink slug="what-should-you-never-share-with-ai"><figure><Image src="/images/guides/learn-master.webp" alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>What should you never share with AI?</h3><p>Decide what to leave out before you paste material into a tool.</p><span>Start the guide →</span></div></GuideRelatedLink>
    </div></div></section>
  </main>;
}
