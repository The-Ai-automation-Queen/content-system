"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./copilot-visibility-page.module.css";

const sources = [
  { label: "Email", app: "Outlook", setup: "Send yourself an email with Cobalt orchard 47 in the subject. Use no real work details.", expect: "Its subject and date match the email in Outlook." },
  { label: "File", app: "OneDrive", setup: "Create a demo document you own. Put Cobalt orchard 47 in its title and one sentence inside it.", expect: "Its title and sentence match the document you can open." },
  { label: "Meeting", app: "Calendar", setup: "Make a test event with no guests. Put Cobalt orchard 47 in the title.", expect: "Its title and date match the event in your calendar." },
] as const;

type Outcome = "found" | "missing" | "unavailable" | null;

export function CopilotVisibilityPage({ guide }: { guide: GuidePage }) {
  const [active, setActive] = useState(0);
  const [outcomes, setOutcomes] = useState<Outcome[]>([null, null, null]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (!guide.tryNow) return null;
  const selected = sources[active];
  const prompt = guide.tryNow.prompt.replace("[EMAIL / FILE / MEETING]", selected.label.toUpperCase());

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

  function mark(outcome: Exclude<Outcome, null>) {
    setOutcomes(current => current.map((value, index) => index === active ? outcome : value));
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}><h1>What can Copilot <span>see at work?</span></h1><p>Test an email, a file and a meeting with harmless examples. Open each source yourself before trusting Copilot’s answer.</p><figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure></header>

      <section className={styles.activity} aria-labelledby="copilot-source-title">
        <div className={styles.sectionHead}><span>One source at a time</span><h2 id="copilot-source-title">Pick what to test</h2></div>
        <div className={styles.sourceTabs} role="tablist" aria-label="Source to test">{sources.map((source, index) => <button key={source.label} id={`copilot-source-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="copilot-source-panel" onClick={() => { setActive(index); setCopied(false); }}>{source.label}<small>{outcomes[index] === "found" ? "Found" : outcomes[index] === "missing" ? "Check again" : outcomes[index] === "unavailable" ? "Unavailable" : source.app}</small></button>)}</div>
        <div id="copilot-source-panel" role="tabpanel" aria-labelledby={`copilot-source-tab-${active}`} className={styles.sourcePanel}>
          <div className={styles.number}>0{active + 1} / 03</div>
          <h3>Make a harmless {selected.label.toLowerCase()} example</h3>
          <p>{selected.setup}</p>
          <p className={styles.accountNote}>Use the same work account in Copilot and {selected.app}. Keep the original open for comparison.</p>
          <h3>Ask Copilot for the source</h3>
          <p>Send this for the {selected.label.toLowerCase()} example only:</p>
          <div className={styles.prompt}><details open><summary>Complete instruction</summary><pre>{prompt}</pre></details><button type="button" onClick={copyPrompt} aria-label={`Copy the complete ${selected.label.toLowerCase()} test instruction`}>{copied ? "Copied" : "Copy"}</button></div>
          {copyError && <p className={styles.copyError} role="alert">Copy failed. Open the instruction and select its text instead.</p>}
          <h3>Did it find the right item?</h3>
          <p>Open the source Copilot cites in {selected.app}. {selected.expect}</p>
          <div className={styles.outcomes} role="group" aria-label={`${selected.label} test result`}><button type="button" aria-pressed={outcomes[active] === "found"} onClick={() => mark("found")}>Found and checked</button><button type="button" aria-pressed={outcomes[active] === "missing"} onClick={() => mark("missing")}>Wrong or missing</button><button type="button" aria-pressed={outcomes[active] === "unavailable"} onClick={() => mark("unavailable")}>Not available</button></div>
        </div>
      </section>

      <section className={styles.activity} aria-labelledby="copilot-result-title"><div className={styles.sectionHead}><span>Your result</span><h2 id="copilot-result-title">What did Copilot actually find?</h2></div><div className={styles.resultGrid}>{sources.map((source, index) => <div key={source.label}><strong>{source.label}</strong><span>{outcomes[index] === "found" ? "Source verified" : outcomes[index] === "missing" ? "Wrong or missing" : outcomes[index] === "unavailable" ? "Not available" : "Not tested"}</span></div>)}</div><p className={styles.resultNote} aria-live="polite">{outcomes.every(Boolean) ? "You have checked all 3 examples. Use only the sources you could open and verify yourself." : "A missing result does not prove Copilot has no access. It means this example did not confirm access."}</p><p>Delete the demo email, document and event when you finish.</p></section>
    </div>
    <section className={styles.related} aria-labelledby="copilot-related-title"><div className={styles.relatedInner}><h2 id="copilot-related-title">Check what happens after Copilot finds a source</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></GuideRelatedLink>)}</div></div></section>
  </main>;
}
