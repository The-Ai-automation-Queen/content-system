"use client";

import { GuideIcon, cleanLabel } from "./guide-icon";
import { useState } from "react";
import styles from "./guide-reading-page.module.css";

export function CopyPrompt({ prompt, label = "Prompt", collapsible = false }: { prompt: string; label?: string; collapsible?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.promptBlock}>
      <div className={styles.promptHeader}>
        <span><GuideIcon name="prompt"/> {cleanLabel(label)}</span>
        <button type="button" onClick={copyPrompt}>Copy</button>
      </div>
      {collapsible ? <details className={styles.collapsedPrompt}><summary>View full {label.toLowerCase().includes("prompt") ? "prompt" : label.toLowerCase().includes("instructions") ? "instructions" : "command"}</summary><pre>{prompt}</pre></details> : <pre>{prompt}</pre>}
      <span className={styles.copyStatus} role="status" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
