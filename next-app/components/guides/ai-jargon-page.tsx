"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { GuideIcon, cleanLabel } from "./guide-icon";
import styles from "./ai-jargon-page.module.css";

function Text({ value }: { value: string }) {
  return <>{value.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

function TermChoices({ items, selected, onSelect }: { items: readonly { title: string; body: string }[]; selected: number; onSelect: (index: number) => void }) {
  const term = items[selected];
  return <div className={styles.termArea}>
    <div className={styles.termList} role="group" aria-label="Choose an AI term">
      {items.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)}>{cleanLabel(item.title)}</button>)}
    </div>
    <article className={styles.definition} aria-live="polite"><span>{String(selected + 1).padStart(2, "0")} / {items.length}</span><h3>{cleanLabel(term.title)}</h3><p><Text value={term.body} /></p></article>
  </div>;
}

function MobileTermChoices({ items }: { items: readonly { title: string; body: string }[] }) {
  return <div className={styles.mobileTermList} aria-label="AI words in this part">
    {items.map((item) => <details key={item.title}>
      <summary>{cleanLabel(item.title)}</summary>
      <p><Text value={item.body} /></p>
    </details>)}
  </div>;
}

const mapStages = [
  { title: "What powers it?", detail: "The AI model" },
  { title: "What does it know?", detail: "Your prompt + context" },
  { title: "What can it do?", detail: "Connected tools + permissions" },
];

export function AiJargonPage({ guide }: { guide: GuidePage }) {
  const groups = guide.sections.slice(1, 4).filter((section) => section.kind === "cards");
  const [groupIndex, setGroupIndex] = useState(0);
  const [termIndex, setTermIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const group = groups[groupIndex];
  if (group.kind !== "cards") return null;

  async function copyPrompt() {
    if (!guide.tryNow) return;
    await navigator.clipboard.writeText(guide.tryNow.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function chooseGroup(index: number) {
    setGroupIndex(index);
    setTermIndex(0);
    window.requestAnimationFrame(() => {
      const target = window.matchMedia("(max-width: 480px)").matches
        ? document.getElementById(`jargon-stage-${index}`)
        : document.getElementById("jargon-explore-title");
      target?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>12 AI words <span>you need to know</span></h1>
        <p>Hear an AI term in a meeting or sales pitch? Find out what it means and what to ask next.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 500px" /></figure>
      </header>

      <section className={styles.map} aria-labelledby="jargon-map-title">
        <div className={styles.sectionHead}><span>See the moving parts</span><h2 id="jargon-map-title">What happens when you use an AI tool?</h2></div>
        <div className={styles.mapFlow} role="group" aria-label="Explore the parts of an AI tool">
          {mapStages.map((stage, index) => <div className={styles.mapStage} key={stage.title}>
            <button id={`jargon-stage-${index}`} type="button" className={styles.mapNode} aria-pressed={groupIndex === index} onClick={() => chooseGroup(index)}><span>0{index + 1}</span><strong>{stage.title}</strong><small>{stage.detail}</small></button>
            {groupIndex === index && <div className={styles.mapMobileTerms}><MobileTermChoices items={group.items} /></div>}
          </div>).flatMap((stage, index) => index < mapStages.length - 1 ? [stage, <span className={styles.mapArrow} aria-hidden="true" key={`arrow-${index}`}>→</span>] : [stage])}
        </div>
        <p>Choose a part to explore its words.</p>
      </section>

      <section className={styles.explorer} aria-labelledby="jargon-explore-title">
        <div className={styles.sectionHead}><span>Explore the words</span><h2 id="jargon-explore-title">{cleanLabel(group.heading)}</h2></div>
        <TermChoices items={group.items} selected={termIndex} onSelect={setTermIndex} />
      </section>

      {guide.tryNow && <section className={styles.action} aria-labelledby="jargon-action-title">
        <div className={styles.sectionHead}><span>See it in a real tool</span><h2 id="jargon-action-title">{guide.tryNow.heading}</h2></div>
        <div className={styles.practiceFlow}><div><span>1</span><strong>Ask</strong><small>Paste the prompt in a new <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a> chat.</small></div><div><span>2</span><strong>Inspect</strong><small>Open Memory or Personalization in your account settings.</small></div><div><span>3</span><strong>Decide</strong><small>Correct anything wrong or outdated.</small></div></div>
        <div className={styles.prompt}><details><summary>View the complete prompt</summary><pre>{guide.tryNow.prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label="Copy the complete prompt">{copied ? "Copied" : "Copy"}</button></div>
        <div className={styles.wordStrip}><span><strong>Prompt</strong> what you paste</span><span><strong>Context</strong> what this chat can use</span><span><strong>Memory</strong> what may carry over</span></div>
        <div className={styles.check}><GuideIcon name="check" /><p><Text value={guide.tryNow.check} /></p></div>
      </section>}
    </div>
    <section className={styles.related} aria-labelledby="jargon-related-title"><div className={styles.relatedInner}><h2 id="jargon-related-title">Put these words to use</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
