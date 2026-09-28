"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { batchOneGuides, type BatchBlock, type BatchGuide } from "@/content/guide-batch-one";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import styles from "./batch-guide-page.module.css";

// Inline marks: **bold**, *italic*, [label](href).
function Rich({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith("http");
      return <a key={index} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link[1]}{external ? " ↗" : ""}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  })}</>;
}

function Block({ block, guide }: { block: BatchBlock; guide: BatchGuide }) {
  switch (block.kind) {
    case "p":
      return <p><Rich value={block.text} /></p>;
    case "fields":
      return <dl className={styles.fields}>{block.items.map((item) => <div key={item.label}><dt>{item.label}:</dt><dd><Rich value={item.text} /></dd></div>)}</dl>;
    case "example":
      return <div className={styles.example}><span>{block.label}</span><p><Rich value={block.text} /></p></div>;
    case "result":
      return <div className={styles.result}><span>{block.label}</span>{block.lines.map((line) => <p key={line}><Rich value={line} /></p>)}</div>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={styles.list}>{block.items.map((item) => <li key={item}><Rich value={item} /></li>)}</List>;
    }
    case "contrast":
      return <div className={styles.contrast} data-count={block.items.length}>{block.items.map((item) => <div key={item.label} className={item.good ? styles.good : undefined}><span>{item.label}</span><p><Rich value={item.text} /></p>{item.note && <small><Rich value={item.note} /></small>}</div>)}</div>;
    case "locked": {
      const preview = block.prompt === undefined ? "" : guide.prompts[block.prompt]?.text ?? "";
      return <a className={styles.locked} href="#full-guide">
        <span className={styles.lockLabel}><span aria-hidden="true">🔒</span> {block.label}</span>
        {preview && <span className={styles.lockPreview} aria-hidden="true">{preview.slice(0, 150)}</span>}
        <span className={styles.lockCta}>In the full guide below ↓</span>
      </a>;
    }
  }
}

function PromptBox({ prompt, id }: { prompt: { title: string; text: string }; id: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }
  return <div className={styles.promptItem}>
    <h3 id={id}>{prompt.title}</h3>
    <div className={styles.prompt}>
      <pre>{prompt.text}</pre>
      <button type="button" onClick={copy} aria-describedby={id}>{state === "copied" ? "Copied" : "Copy"}</button>
    </div>
    {state === "error" && <p role="alert" className={styles.copyError}>Copy failed. Select the text above instead.</p>}
  </div>;
}

export function BatchGuidePage({ guide }: { guide: GuidePage }) {
  const content = batchOneGuides[guide.slug];
  if (!content) return null;
  const number = (index: number) => String(index).padStart(2, "0");
  const firstJob = 2;
  const honestNumber = firstJob + content.sections.length;

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 560px" /></figure>
        <h1>{content.title}</h1>
        <p className={styles.question}>“{content.question}”</p>
        <p className={styles.answer}><Rich value={content.answer} /></p>
        <p className={styles.meta}><span>{content.level}</span><span>{content.minutes} minutes</span><span>{content.tool}</span><span>By Fatiha Chikh</span></p>
        <p className={styles.leaveWith}><strong>What you leave with:</strong> <Rich value={content.leaveWith} /></p>
      </header>

      <section className={styles.section} aria-labelledby={`${content.slug}-how`}>
        <h2 id={`${content.slug}-how`}><span>{number(1)}</span>How to use this guide</h2>
        <p><Rich value={content.howTo} /></p>
      </section>

      {content.sections.map((section, index) => <section className={styles.section} key={section.title} aria-labelledby={`${content.slug}-s${index}`}>
        <h2 id={`${content.slug}-s${index}`}><span>{number(firstJob + index)}</span>{section.title}</h2>
        {section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} guide={content} />)}
      </section>)}

      <section className={`${styles.section} ${styles.honest}`} aria-labelledby={`${content.slug}-honest`}>
        <h2 id={`${content.slug}-honest`}><span>{number(honestNumber)}</span>The honest part</h2>
        <p><Rich value={content.honest} /></p>
      </section>

      <div id="full-guide" className={styles.gateWrap}>
        <GuideAccessBoundary guideSlug={guide.slug} guideTitle={content.title} heading="The rest is yours." guidePromise={content.gate.promise} note="Free · no card · we'll email you the link so you can come back." actionLabel={content.gate.action} showWorkBridge={false}>
          <section className={styles.unlocked} aria-labelledby={`${content.slug}-full`}>
            <h2 id={`${content.slug}-full`}>Your full guide</h2>
            {content.prompts.map((prompt, index) => <PromptBox key={prompt.title} prompt={prompt} id={`${content.slug}-p${index}`} />)}
            {content.pass && <p className={styles.pass}><Rich value={content.pass} /></p>}
            {content.checks && <div className={styles.checks}>
              <h3>{content.checks.title}</h3>
              {content.checks.ordered
                ? <ol>{content.checks.items.map((item) => <li key={item}>{item}</li>)}</ol>
                : <ul>{content.checks.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>}
            {content.paths && <div className={styles.paths}>
              <h3>{content.paths.title}</h3>
              {content.paths.intro && <p>{content.paths.intro}</p>}
              <dl>{content.paths.items.map((item) => <div key={item.tool}><dt>{item.tool}</dt><dd><Rich value={item.text} /> <a href={item.href} target="_blank" rel="noopener noreferrer">Official page ↗</a></dd></div>)}</dl>
              {content.paths.note && <p>{content.paths.note}</p>}
            </div>}
          </section>

          <aside className={styles.kit} aria-labelledby={`${content.slug}-kit`}>
            <span className={styles.kitLabel}>Next step · Kit · Coming soon</span>
            <h2 id={`${content.slug}-kit`}>{content.kit.heading}</h2>
            <p><Rich value={content.kit.body} /></p>
          </aside>
        </GuideAccessBoundary>
      </div>
    </div>

    <section className={styles.related} aria-labelledby={`${content.slug}-related`}><div className={styles.relatedInner}><h2 id={`${content.slug}-related`}>Related guides</h2><div className={styles.relatedGrid}>{guide.related.map((item) => item.status === "coming-next" ? null : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
