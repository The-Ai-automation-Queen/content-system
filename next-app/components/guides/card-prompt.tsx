"use client";

import { useState } from "react";
import styles from "./card-guide-page.module.css";

// The only interactive piece of a card guide; the rest renders on the server.
export function Prompt({ text, label }: { text: string; label: string }) {
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
