"use client";

import { useState } from "react";

export function CopyBlock({ content, label = "Copy this prompt" }: { content: string; label?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="guide-copy-block">
      <button type="button" onClick={copy}>{status === "copied" ? "Copied" : label}</button>
      <pre><code>{content}</code></pre>
      <span className="guide-copy-block__status" aria-live="polite">
        {status === "copied" ? "Prompt copied to your clipboard." : status === "error" ? "Copy failed. Select the text and copy it manually." : ""}
      </span>
    </div>
  );
}
