"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GuidePage } from "@/content/guide-page";
import { cleanLabel } from "./guide-icon";
import styles from "./copilot-excel-page.module.css";

const rows = [
  { row: 2, item: "Pens", units: 10, price: 2, formula: "=B2*C2", total: 20 },
  { row: 3, item: "Notebooks", units: 5, price: 6, formula: "=B3*C3", total: 30 },
  { row: 4, item: "Folders", units: 8, price: 3, formula: "=B4*C4", total: 24 },
] as const;

const checks = [
  "Only B3 changed, from 5 to 6.",
  "D3 still contains =B3*C3 and now shows 36.",
  "Pens still totals 20; Folders still totals 24.",
] as const;

export function CopilotExcelPage({ guide }: { guide: GuidePage }) {
  const [showAfter, setShowAfter] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [copied, setCopied] = useState(false);
  if (!guide.tryNow) return null;

  async function copyPrompt() {
    await navigator.clipboard.writeText(guide.tryNow!.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <h1>Did Copilot change <span>only one cell?</span></h1>
        <p>Make a tiny practice sheet, request one edit, then compare the cells before trusting the result.</p>
        <figure><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 700px) 100vw, 440px" /></figure>
      </header>

      <section className={styles.activity} aria-labelledby="excel-table-title">
        <div className={styles.sectionHead}><span>Practice workbook</span><h2 id="excel-table-title">Build this four-column sheet</h2></div>
        <p>In Excel, put Item, Units, Price and Total in row 1, across columns A–D. Enter the 3 rows below and type the shown formulas in column D. Save an untouched original, then open a working copy.</p>
        <div className={styles.stateSwitch} role="group" aria-label="Practice workbook view">
          <button type="button" aria-pressed={!showAfter} onClick={() => setShowAfter(false)}>Before Copilot</button>
          <button type="button" aria-pressed={showAfter} onClick={() => setShowAfter(true)}>Expected after</button>
        </div>
        <div className={styles.tableWrap}>
          <table><caption className={styles.srOnly}>{showAfter ? "Expected workbook after changing Notebooks units" : "Original practice workbook"}</caption><thead><tr><th scope="col">Item <small>A1</small></th><th scope="col">Units <small>B1</small></th><th scope="col">Price <small>C1</small></th><th scope="col">Total <small>D1</small></th></tr></thead><tbody>{rows.map(row => {
            const changed = showAfter && row.item === "Notebooks";
            return <tr key={row.item} className={changed ? styles.changed : undefined}><th scope="row">{row.item}{" "}<small>A{row.row} · row {row.row}</small></th><td>{changed ? <><strong>6</strong>{" "}<small>was 5</small></> : row.units}</td><td>{row.price}</td><td><code>{row.formula}</code>{" "}<small>shows {changed ? 36 : row.total}</small></td></tr>;
          })}</tbody></table>
        </div>
        <div className={styles.mobileRows}>{rows.map(row => {
          const changed = showAfter && row.item === "Notebooks";
          return <article key={row.item} className={changed ? styles.changed : undefined}><h3>Row {row.row} · {row.item} <small>A{row.row}</small></h3><dl><div><dt>Units · B{row.row}</dt><dd>{changed ? <><strong>6</strong> <small>was 5</small></> : row.units}</dd></div><div><dt>Price · C{row.row}</dt><dd>{row.price}</dd></div><div><dt>Total · D{row.row}</dt><dd><code>{row.formula}</code><small>shows {changed ? 36 : row.total}</small></dd></div></dl></article>;
        })}</div>
        <p className={styles.sheetNote} aria-live="polite">{showAfter ? "Only B3 changed. D3 still uses =B3*C3, so its displayed total becomes 36." : "In the original, B3 is 5 and D3 shows 30."}</p>
      </section>

      <section className={styles.activity} aria-labelledby="excel-prompt-title"><div className={styles.sectionHead}><span>One edit</span><h2 id="excel-prompt-title">Ask Copilot to change B3</h2></div><p>Open Copilot in Excel with the working copy. Paste this instruction:</p><div className={styles.prompt}><pre>{guide.tryNow.prompt}</pre><button type="button" onClick={copyPrompt} aria-label="Copy the complete Copilot instruction">{copied ? "Copied" : "Copy"}</button></div></section>

      <section className={styles.activity} aria-labelledby="excel-check-title"><div className={styles.sectionHead}><span>Check before using it</span><h2 id="excel-check-title">Compare the working copy</h2></div><p>Use your untouched original as the reference. Tick each point only when you see it in Excel.</p><div className={styles.checks}>{checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked[index] ?? false} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} /><span>{check}</span></label>)}</div><p className={styles.result} aria-live="polite">{checked.every(Boolean) ? "All three checks marked. Keep the edit only if your workbook matches." : `${checked.filter(Boolean).length} of 3 checks marked. If anything else changed, compare with the original before using this workbook.`}</p></section>
    </div>
    <section className={styles.related} aria-labelledby="excel-related-title"><div className={styles.relatedInner}><h2 id="excel-related-title">Keep a useful check in your toolkit</h2><div className={styles.relatedGrid}>{guide.related.map(item => item.status === "coming-next" ? <article key={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div></article> : <Link key={item.slug} href={`/guides/${item.slug}.html`}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 700px) 100vw, 250px" /></figure><div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div></div></section>
  </main>;
}
