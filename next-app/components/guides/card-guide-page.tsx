import Image from "next/image";
import { GuideImage } from "./guide-image";
import Link from "next/link";
import { Fragment } from "react";
import { Prompt } from "./card-prompt";
import type { GuidePage } from "@/content/guide-page";
import { getCardGuide, type CardBlock, type CardStep } from "@/content/card-guides";
import { batchOneGuides } from "@/content/guide-batch-one";
import { batchToCard } from "@/content/batch-to-card";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./card-guide-page.module.css";
import batch from "./batch-guide-page.module.css";

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

// The first prompt in a guide is free; the rest ask for the email once.
type Gate = { slug: string; freePrompt?: string };

function Block({ block, gate }: { block: CardBlock; gate: Gate }) {
  const lock = (text: string) => ({ locked: text !== gate.freePrompt, guideSlug: gate.slug });
  switch (block.kind) {
    case "p": return <p><Rich value={block.text} /></p>;
    case "h3": return <h3>{block.text}</h3>;
    case "tip": return <p className={styles.tip}><Rich value={block.text} /></p>;
    case "honest": return <p className={styles.honest}><Rich value={block.text} /></p>;
    case "prompt": return <Prompt text={block.text} label={block.label} {...lock(block.text)} />;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={styles.list}>{block.items.map((item) => <li key={item}><Rich value={item} /></li>)}</List>;
    }
    case "table": return <div className={styles.tableWrap}><table>
      <thead><tr>{block.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
      <tbody>{block.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => <td key={index}><Rich value={cell} /></td>)}</tr>)}</tbody>
    </table></div>;
    case "requests": return <ul className={styles.requests}>{block.items.map((item) => <li key={item.want}><strong>{item.want}</strong><Prompt text={item.prompt} label={item.want} {...lock(item.prompt)} /></li>)}</ul>;
    case "checklist": return <ul className={styles.checklist}>{block.items.map((item) => <li key={item}><label><input type="checkbox" /> {item}</label></li>)}</ul>;
    case "fields": return <dl className={batch.fields}>{block.items.map((item) => <div key={item.label}><dt>{item.label}:</dt> <dd><Rich value={item.text} /></dd></div>)}</dl>;
    case "papers": return <div className={batch.papers}>
      <div className={`${batch.paper} ${batch.paperLeft}`}><small>{block.left.label}</small><p><Rich value={block.left.text} /></p></div>
      <span className={batch.arrow} aria-hidden="true">→</span>
      <div className={`${batch.paper} ${batch.paperRight}`}><small>{block.right.label}</small>{block.right.lines.map((line) => <p key={line}><Rich value={line} /></p>)}</div>
    </div>;
    case "example": return <div className={`${batch.paper} ${batch.paperSolo}`}><small>{block.label}</small><p><Rich value={block.text} /></p></div>;
    case "result": return <div className={`${batch.paper} ${batch.paperRight}`}><small>{block.label}</small>{block.lines.map((line) => <p key={line}><Rich value={line} /></p>)}</div>;
    case "contrast": return <div className={batch.contrast} data-count={block.items.length}>{block.items.map((item) => <div key={item.label} className={item.good ? batch.good : undefined}><small>{item.label}</small><p><Rich value={item.text} /></p>{item.note && <span><Rich value={item.note} /></span>}</div>)}</div>;
    case "shot": return <figure className={batch.shot}>
      <a href={block.src} target="_blank" rel="noopener noreferrer" aria-label={`Open the screenshot full size: ${block.alt}`}>
        <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" style={{ maxWidth: `min(100%, ${block.width}px)` }} />
      </a>
      <figcaption>{block.caption}</figcaption>
    </figure>;
    case "image": return <figure className={batch.illustration}><div><GuideImage src={block.src} alt={block.alt} fill sizes="(max-width: 760px) 100vw, 720px" /></div><figcaption>{block.caption}</figcaption></figure>;
    case "teaser": return <a className={batch.teaser} href="#unlock">
      <span className={batch.teaserTitle}>{block.label}</span>
      <span className={batch.teaserCopy}>Copy the prompt ↓</span>
      {block.preview && <span className={batch.teaserText} aria-hidden="true">{block.preview}</span>}
    </a>;
    case "pass": return <p className={batch.pass}><Rich value={block.text} /></p>;
    case "checks": return <div className={batch.checks}><h3>{block.title}</h3>{block.ordered
      ? <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>
      : <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}</div>;
    case "paths": return <div className={batch.paths}>
      <h3>{block.title}</h3>
      {block.intro && <p>{block.intro}</p>}
      <dl>{block.items.map((item) => <div key={item.tool}><dt>{item.tool}</dt><dd><Rich value={item.text} /> <a href={item.href} target="_blank" rel="noopener noreferrer">Official page ↗</a></dd></div>)}</dl>
      {block.note && <p>{block.note}</p>}
    </div>;
  }
}

function Step({ step, id, gate }: { step: CardStep; id: string; gate: Gate }) {
  return <section className={styles.card} aria-labelledby={id}>
    <div className={styles.sh}>
      <span className={styles.tile} aria-hidden="true">{step.num}</span>
      <h2 id={id}>{step.title} <em>{step.accent}</em></h2>
    </div>
    {step.blocks.map((block, index) => <Block key={index} block={block} gate={gate} />)}
  </section>;
}

export function CardGuidePage({ guide }: { guide: GuidePage }) {
  const legacy = batchOneGuides[guide.slug];
  const card = getCardGuide(guide.slug) ?? (legacy ? batchToCard(legacy) : undefined);
  if (!card) return null;
  const open = card.steps.slice(0, card.openSteps);
  const gated = card.steps.slice(card.openSteps);
  const stepId = (index: number) => `${card.slug}-step-${index + 1}`;
  const firstBlock = card.steps.flatMap((step) => step.blocks).find((block) => block.kind === "prompt" || block.kind === "requests");
  const gate: Gate = { slug: card.slug, freePrompt: firstBlock?.kind === "prompt" ? firstBlock.text : firstBlock?.kind === "requests" ? firstBlock.items[0]?.prompt : undefined };

  const titleBlock = <>
    <p className={card.hero ? batch.eyebrow : styles.eyebrow}><span aria-hidden="true">✦</span>Free guide · {card.tool}</p>
    <h1>{card.h1.title} <em>{card.h1.accent}</em></h1>
  </>;

  return <main className={styles.page}>
    {card.hero && <header className={batch.hero}>
      <div className={batch.heroInner}>
        <div className={batch.heroText}>
          <Link className={batch.back} href="/guides/">← All Guides</Link>
          {titleBlock}
          <p className={batch.heroLine}>{card.hero.line}</p>
          <a className={batch.heroButton} href={`#${card.slug}-intro`}>Start the guide ↓</a>
        </div>
        {card.hero.kind === "pose"
          ? <div className={batch.heroPose}><span className={batch.dot} aria-hidden="true" /><Image src={card.hero.src} alt={card.hero.alt} width={760} height={760} priority sizes="(max-width: 760px) 360px, 560px" /></div>
          : <div className={batch.heroScene}><div><GuideImage src={card.hero.src} alt={card.hero.alt} fill priority sizes="(max-width: 760px) 100vw, 600px" /></div></div>}
      </div>
    </header>}
    <div className={styles.column}>
      {!card.hero && <Link className={styles.back} href="/guides/">← All Guides</Link>}

      <div className={styles.author}>
        <img src="/fatiha-avatar-colour-96.webp" alt="" width={46} height={46} />
        <div>
          <div className={styles.name}>Fatiha Chikh <span className={styles.badge}>Free guide</span></div>
          <div className={styles.meta}>Shift &amp; Lead</div>
        </div>
      </div>

      {!card.hero && titleBlock}

      <section className={`${styles.card} ${styles.intro}`} aria-labelledby={`${card.slug}-intro`}>
        <h2 id={`${card.slug}-intro`}>{card.intro.heading}</h2>
        <p className={styles.lead}><Rich value={card.intro.lead} /></p>
        {card.intro.blocks.map((block, index) => <Block key={index} block={block} gate={gate} />)}
      </section>

      {open.map((step, index) => <Step key={step.title} step={step} id={stepId(index)} gate={gate} />)}

      <div className={styles.gateStage} id="unlock">
        <GuideAccessBoundary
          guideSlug={card.slug}
          guideTitle={card.title}
          heading={card.gate.heading}
          headingAccent={card.gate.accent}
          guidePromise={card.gate.promise}
          actionLabel={card.gate.action}
          showWorkBridge={false}
        >
          {gated.map((step, index) => <Step key={step.title} step={step} id={stepId(card.openSteps + index)} gate={gate} />)}
          {card.kit && <aside className={batch.kit} aria-labelledby={`${card.slug}-kit`}>
            <span className={batch.kitLabel}>Next step · Kit · Coming soon</span>
            <h2 id={`${card.slug}-kit`}>{card.kit.heading}</h2>
            <p><Rich value={card.kit.body} /></p>
          </aside>}
        </GuideAccessBoundary>
      </div>

    </div>

  </main>;
}
