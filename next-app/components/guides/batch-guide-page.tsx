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

// "Job 1: Messy notes into clear actions" → heading "Job 1", accent "Messy notes into clear actions."
function splitTitle(title: string, accent?: string) {
  const colon = title.indexOf(": ");
  if (colon > 0) return { head: title.slice(0, colon), accent: `${title.slice(colon + 2)}.` };
  return { head: title, accent };
}

function Heading({ id, num, title, accent }: { id: string; num: string; title: string; accent?: string }) {
  return <div className={styles.sh}>
    <span className={styles.tile} aria-hidden="true">{num}</span>
    <h2 id={id}>{title}{accent && <em>{accent}</em>}</h2>
  </div>;
}

function Blocks({ blocks, guide }: { blocks: readonly BatchBlock[]; guide: BatchGuide }) {
  const out = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const next = blocks[index + 1];
    if (block.kind === "example" && next?.kind === "result") {
      out.push(<div className={styles.papers} key={index}>
        <div className={`${styles.paper} ${styles.paperLeft}`}><small>{block.label}</small><p><Rich value={block.text} /></p></div>
        <span className={styles.arrow} aria-hidden="true">→</span>
        <div className={`${styles.paper} ${styles.paperRight}`}><small>{next.label}</small>{next.lines.map((line) => <p key={line}><Rich value={line} /></p>)}</div>
      </div>);
      index++;
      continue;
    }
    out.push(<Block key={index} block={block} guide={guide} />);
  }
  return <>{out}</>;
}

function Block({ block, guide }: { block: BatchBlock; guide: BatchGuide }) {
  switch (block.kind) {
    case "p":
      return <p><Rich value={block.text} /></p>;
    case "fields":
      return <dl className={styles.fields}>{block.items.map((item) => <div key={item.label}><dt>{item.label}:</dt> <dd><Rich value={item.text} /></dd></div>)}</dl>;
    case "example":
      return <div className={`${styles.paper} ${styles.paperSolo}`}><small>{block.label}</small><p><Rich value={block.text} /></p></div>;
    case "result":
      return <div className={`${styles.paper} ${styles.paperRight}`}><small>{block.label}</small>{block.lines.map((line) => <p key={line}><Rich value={line} /></p>)}</div>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={styles.list}>{block.items.map((item) => <li key={item}><Rich value={item} /></li>)}</List>;
    }
    case "contrast":
      return <div className={styles.contrast} data-count={block.items.length}>{block.items.map((item) => <div key={item.label} className={item.good ? styles.good : undefined}><small>{item.label}</small><p><Rich value={item.text} /></p>{item.note && <span><Rich value={item.note} /></span>}</div>)}</div>;
    case "locked": {
      const preview = block.prompt === undefined ? "" : guide.prompts[block.prompt]?.text ?? "";
      return <a className={styles.teaser} href="#unlock">
        <span className={styles.teaserTitle}>{block.label}</span>
        <span className={styles.teaserCopy}>Copy the prompt ↓</span>
        {preview && <span className={styles.teaserText} aria-hidden="true">{preview.slice(0, 180)}</span>}
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
      <button type="button" onClick={copy} aria-describedby={id}>{state === "copied" ? "Copied" : "Copy the prompt"}</button>
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
  const promptWord = content.prompts.length > 1 ? `${content.prompts.length} prompts.` : "prompt.";
  const toc = [
    { id: `${content.slug}-how`, label: "How to use it" },
    ...content.sections.map((section, index) => ({ id: `${content.slug}-s${index}`, label: splitTitle(section.title).head })),
    { id: `${content.slug}-honest`, label: "The honest part" },
    { id: "unlock", label: "The prompts" },
  ];

  return <main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <Link className={styles.back} href="/guides/">← All guides</Link>
          <p className={styles.eyebrow}><span aria-hidden="true">✦</span>Free guide · {content.hero.tool} · {content.minutes} minutes</p>
          <h1>{content.hero.title} <em>{content.hero.accent}</em></h1>
          <p className={styles.heroLine}>{content.hero.line}</p>
          <a className={styles.heroButton} href={`#${content.slug}-intro`}>Start the guide ↓</a>
        </div>
        {content.hero.art.kind === "pose"
          ? <div className={styles.heroPose}><span className={styles.dot} aria-hidden="true" /><Image src={content.hero.art.src} alt={content.hero.art.alt} width={760} height={760} priority sizes="(max-width: 760px) 360px, 560px" /></div>
          : <div className={styles.heroScene}><div><Image src={content.hero.art.src} alt={content.hero.art.alt} fill priority sizes="(max-width: 760px) 100vw, 600px" /></div></div>}
      </div>
    </header>

    <div className={styles.body}>
      <nav className={styles.toc} aria-label="In this guide">
        <span>In this guide</span>
        <ol>{toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>
      </nav>

      <div className={styles.main}>
        <section className={styles.intro} id={`${content.slug}-intro`} aria-labelledby={`${content.slug}-intro-title`}>
          <h2 id={`${content.slug}-intro-title`}>Introduction</h2>
          <p className={styles.meta}>{content.hero.tool} · {content.minutes} min read · {content.level}</p>
          <p className={styles.lead}><Rich value={content.answer} /></p>
          <p className={styles.byline}>A guide by <strong>Fatiha Chikh</strong> | The AI Automation Queen</p>
          <p className={styles.leaveWith}><strong>What you leave with:</strong> <Rich value={content.leaveWith} /></p>
        </section>

        <section className={styles.section} aria-labelledby={`${content.slug}-how`}>
          <Heading id={`${content.slug}-how`} num={number(1)} title="How to use this guide" accent="In 30 seconds." />
          <p><Rich value={content.howTo} /></p>
        </section>

        {content.sections.map((section, index) => {
          const title = splitTitle(section.title, section.accent);
          return <Fragment key={section.title}>
            <section className={styles.section} aria-labelledby={`${content.slug}-s${index}`}>
              <Heading id={`${content.slug}-s${index}`} num={number(firstJob + index)} title={title.head} accent={title.accent} />
              <Blocks blocks={section.blocks} guide={content} />
            </section>
            {content.illustration.afterSection === index && <figure className={styles.illustration}><div><Image src={content.illustration.src} alt={content.illustration.alt} fill sizes="(max-width: 760px) 100vw, 720px" /></div><figcaption>{content.illustration.caption}</figcaption></figure>}
          </Fragment>;
        })}

        <section className={styles.honest} aria-labelledby={`${content.slug}-honest`}>
          <Heading id={`${content.slug}-honest`} num={number(honestNumber)} title="The honest part" accent="Check before you use it." />
          <p><Rich value={content.honest} /></p>
        </section>
      </div>
    </div>

    <div id="unlock" className={styles.gateWrap}>
      <GuideAccessBoundary guideSlug={guide.slug} guideTitle={content.title} variant="band" eyebrow="Your turn" heading="Unlock the" headingAccent={promptWord} guidePromise="" actionLabel="Unlock" showWorkBridge={false}>
        <div className={styles.unlockedWrap}>
          <section className={styles.unlocked} aria-labelledby={`${content.slug}-full`}>
            <h2 id={`${content.slug}-full`}>Your prompts <em>ready to copy.</em></h2>
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
        </div>
      </GuideAccessBoundary>
    </div>

    <section className={styles.related} aria-labelledby={`${content.slug}-related`}>
      <h2 id={`${content.slug}-related`}>Keep reading. <em>One job at a time.</em></h2>
      <div className={styles.relatedGrid}>{guide.related.map((item) => item.status === "coming-next" ? null : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 760px) 100vw, 380px" /></figure><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p></GuideRelatedLink>)}</div>
    </section>
  </main>;
}
