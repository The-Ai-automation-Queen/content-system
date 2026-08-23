"use client";

import { useState } from "react";
import styles from "./guide-reading-page.module.css";

export function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.promptBlock}>
      <div className={styles.promptHeader}>
        <span>Prompt</span>
        <button type="button" onClick={copyPrompt}>Copy</button>
      </div>
      <pre>{prompt}</pre>
      <span className={styles.copyStatus} role="status" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
