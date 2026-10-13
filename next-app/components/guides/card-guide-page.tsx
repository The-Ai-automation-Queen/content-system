"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { getCardGuide, type CardBlock, type CardStep } from "@/content/card-guides";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./card-guide-page.module.css";
import hero from "./batch-guide-page.module.css";

// Inline marks: **bold**, *italic*, [label](href).
function Rich({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.length > 2) return <i key={index}>{part.slice(1, -1)}</i>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith("http");
      return <a key={index} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link[1]}{external ? " ↗" : ""}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  })}</>;
}

function Prompt({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }
  return <div className={styles.prompt}>
    <button type="button" onClick={copy} aria-label={`Copy the prompt: ${label}`}>{state === "copied" ? "Copied" : "Copy prompt"}</button>
    <pre>{text}</pre>
    {state === "error" && <p role="alert" className={styles.copyError}>Copy failed. Select the text above instead.</p>}
  </div>;
}

function Block({ block }: { block: CardBlock }) {
  switch (block.kind) {
    case "p": return <p><Rich value={block.text} /></p>;
    case "h3": return <h3>{block.text}</h3>;
    case "tip": return <p className={styles.tip}><Rich value={block.text} /></p>;
    case "honest": return <p className={styles.honest}><Rich value={block.text} /></p>;
    case "prompt": return <Prompt text={block.text} label={block.label} />;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={styles.list}>{block.items.map((item) => <li key={item}><Rich value={item} /></li>)}</List>;
    }
    case "table": return <div className={styles.tableWrap}><table>
      <thead><tr>{block.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
      <tbody>{block.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => <td key={index}><Rich value={cell} /></td>)}</tr>)}</tbody>
    </table></div>;
    case "requests": return <ul className={styles.requests}>{block.items.map((item) => <li key={item.want}><strong>{item.want}</strong><Prompt text={item.prompt} label={item.want} /></li>)}</ul>;
    case "checklist": return <ul className={styles.checklist}>{block.items.map((item) => <li key={item}><label><input type="checkbox" /> {item}</label></li>)}</ul>;
  }
}

function Step({ step, id }: { step: CardStep; id: string }) {
  return <section className={styles.card} aria-labelledby={id}>
    <div className={styles.sh}>
      <span className={styles.tile} aria-hidden="true">{step.num}</span>
      <h2 id={id}>{step.title} <em>{step.accent}</em></h2>
    </div>
    {step.blocks.map((block, index) => <Block key={index} block={block} />)}
  </section>;
}

export function CardGuidePage({ guide }: { guide: GuidePage }) {
  const card = getCardGuide(guide.slug);
  if (!card) return null;
  const open = card.steps.slice(0, card.openSteps);
  const gated = card.steps.slice(card.openSteps);
  const preview = gated[0];
  const stepId = (index: number) => `${card.slug}-step-${index + 1}`;

  const titleBlock = <>
    <p className={card.hero ? hero.eyebrow : styles.eyebrow}><span aria-hidden="true">✦</span>Free guide · {card.tool} · {card.minutes} minutes</p>
    <h1>{card.h1.title} <em>{card.h1.accent}</em></h1>
  </>;

  return <main className={styles.page}>
    {card.hero && <header className={hero.hero}>
      <div className={hero.heroInner}>
        <div className={hero.heroText}>
          <Link className={hero.back} href="/guides/">← All guides</Link>
          {titleBlock}
          <p className={hero.heroLine}>{card.hero.line}</p>
          <a className={hero.heroButton} href={`#${card.slug}-intro`}>Start the guide ↓</a>
        </div>
        {card.hero.kind === "pose"
          ? <div className={hero.heroPose}><span className={hero.dot} aria-hidden="true" /><Image src={card.hero.src} alt={card.hero.alt} width={760} height={760} priority sizes="(max-width: 760px) 360px, 560px" /></div>
          : <div className={hero.heroScene}><div><Image src={card.hero.src} alt={card.hero.alt} fill priority sizes="(max-width: 760px) 100vw, 600px" /></div></div>}
      </div>
    </header>}
    <div className={styles.column}>
      {!card.hero && <Link className={styles.back} href="/guides/">← All guides</Link>}

      <div className={styles.author}>
        <img src="/fatiha-hero-portrait.webp" alt="" width={46} height={46} />
        <div>
          <div className={styles.name}>Fatiha Chikh <span className={styles.badge}>Free guide</span></div>
          <div className={styles.meta}>Shift &amp; Lead</div>
        </div>
      </div>

      {!card.hero && titleBlock}

      <section className={`${styles.card} ${styles.intro}`} aria-labelledby={`${card.slug}-intro`}>
        <h2 id={`${card.slug}-intro`}>{card.intro.heading}</h2>
        <p className={styles.lead}><Rich value={card.intro.lead} /></p>
        {card.intro.blocks.map((block, index) => <Block key={index} block={block} />)}
      </section>

      {open.map((step, index) => <Step key={step.title} step={step} id={stepId(index)} />)}

      <div className={styles.gateStage}>
        {preview && <div className={styles.preview} aria-hidden="true">
          <section className={styles.card}>
            <div className={styles.sh}><span className={styles.tile}>{preview.num}</span><h2>{preview.title} <em>{preview.accent}</em></h2></div>
            {preview.blocks.slice(0, 4).map((block, index) => block.kind === "prompt"
              ? <div key={index} className={styles.prompt}><pre>{block.text}</pre></div>
              : <Block key={index} block={block} />)}
          </section>
        </div>}

        <GuideAccessBoundary
          guideSlug={card.slug}
          guideTitle={card.title}
          heading={card.gate.heading}
          headingAccent={card.gate.accent}
          guidePromise={card.gate.promise}
          actionLabel={card.gate.action}
          showWorkBridge={false}
        >
          {gated.map((step, index) => <Step key={step.title} step={step} id={stepId(card.openSteps + index)} />)}
        </GuideAccessBoundary>
      </div>

      <section className={styles.cta} aria-labelledby={`${card.slug}-next`}>
        <p className={styles.ctaEyebrow}><span aria-hidden="true">✦</span>{card.cta.eyebrow}</p>
        <h2 id={`${card.slug}-next`}>{card.cta.heading} <em>{card.cta.accent}</em></h2>
        <p>{card.cta.body}</p>
        <Link className={styles.btn} href={card.cta.href}>{card.cta.label}</Link>
      </section>
    </div>

    {guide.related.length > 0 && <section className={styles.related} aria-labelledby={`${card.slug}-related`}>
      <h2 id={`${card.slug}-related`}>Keep reading. <em>One job at a time.</em></h2>
      <div className={styles.relatedGrid}>{guide.related.map((item) => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 760px) 100vw, 380px" /></figure><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p></GuideRelatedLink>)}</div>
    </section>}
  </main>;
}
