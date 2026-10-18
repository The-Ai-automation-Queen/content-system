"use client";

import { type FormEvent, useEffect, useState } from "react";
import { UNLOCK_EVENT, hasGuideAccess, submitGuideSignup } from "./guide-signup";
import styles from "./card-guide-page.module.css";
import form from "./guide-reading-page.module.css";

// The only interactive piece of a card guide; the rest renders on the server.
// A locked prompt shows its first lines and asks for the email once; every
// prompt on every guide then opens on this browser.
export function Prompt({ text, label, locked = false, guideSlug = "" }: { text: string; label: string; locked?: boolean; guideSlug?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const [open, setOpen] = useState(!locked);
  const [asking, setAsking] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!locked) return;
    if (hasGuideAccess()) setOpen(true);
    const onUnlock = () => setOpen(true);
    window.addEventListener(UNLOCK_EVENT, onUnlock);
    return () => window.removeEventListener(UNLOCK_EVENT, onUnlock);
  }, [locked]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      await submitGuideSignup(new FormData(event.currentTarget), guideSlug);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "That did not send. Please try again.");
    }
  }

  if (!open) {
    const preview = text.split("\n").slice(0, 3).join("\n").slice(0, 220);
    return <div className={`${styles.prompt} ${styles.lockedPrompt}`}>
      <pre aria-hidden="true">{preview}</pre>
      {!asking
        ? <button type="button" className={styles.unlockButton} onClick={() => setAsking(true)} aria-label={`Get the prompt free: ${label}`}>Get this prompt free</button>
        : <form className={styles.lockForm} onSubmit={submit}>
          <p><strong>Get every prompt in this guide.</strong> Enter your email once. All prompts open on every guide.</p>
          <div className={form.nameFields}>
            <label>First name<input name="firstName" type="text" autoComplete="given-name" maxLength={100} required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          </div>
          <input className={form.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className={form.consent}>
            <input name="marketingConsent" type="checkbox" required />
            <span>Yes, email me new guides and updates. Unsubscribe anytime.</span>
          </label>
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Open the prompts"}</button>
          {status === "error" && <strong role="alert">{message}</strong>}
        </form>}
    </div>;
  }

  return <div className={styles.prompt}>
    <button type="button" onClick={copy} aria-label={`Copy the prompt: ${label}`}>{state === "copied" ? "Copied" : "Copy prompt"}</button>
    <pre>{text}</pre>
    {state === "error" && <p role="alert" className={styles.copyError}>Copy failed. Select the text above instead.</p>}
  </div>;
}
