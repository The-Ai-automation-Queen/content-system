"use client";

import { useState } from "react";

export function CopyGuideNotes({ items }: { items: readonly { readonly term: string; readonly definition: string }[] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(
      `10 AI words you need to know\n\n${items.map((item, index) => `${index + 1}. ${item.term}: ${item.definition}`).join("\n")}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <button type="button" onClick={copy}>{copied ? "Copied" : "Copy the 10 words"}</button>;
}
