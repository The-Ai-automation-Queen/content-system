"use client";

import { useState } from "react";

export function CopyQuestions({ questions }: { questions: readonly string[] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(
      `5 questions to use when AI jargon makes a meeting unclear\n\n${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <button type="button" onClick={copy}>{copied ? "Copied" : "Copy the 5 questions"}</button>;
}
