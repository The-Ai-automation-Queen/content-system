"use client";

import { FormEvent, type ReactNode, useEffect, useState } from "react";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({ guideSlug, children }: { guideSlug: string; children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reviewHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".vercel.app");
    const review = reviewHost && params.get("review") === "1";
    const forceGate = params.get("gate") === "1";
    const hasAccess = window.localStorage.getItem(ACCESS_KEY) === "true";
    setUnlocked(!forceGate && (review || hasAccess));
    setReady(true);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/guide-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          website: form.get("website"),
          guideSlug,
          source: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not open the guide. Please try again.");
      window.localStorage.setItem(ACCESS_KEY, "true");
      setUnlocked(true);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not open the guide. Please try again.");
    }
  };

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main className={styles.gatePage}>
      <section className={styles.gate} role="dialog" aria-modal="true" aria-labelledby="guide-gate-title">
        <div className={styles.gateIcon} aria-hidden="true">↗</div>
        <h1 id="guide-gate-title">Access the guide</h1>
        <p>Enter your email to open the guide. We will also send it to your inbox so you can find it later.</p>
        <form onSubmit={submit}>
          <label htmlFor={`guide-email-${guideSlug}`}>Email address</label>
          <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Opening..." : "Access the guide"}</button>
          <small>You will receive practical Shift & Lead emails. Unsubscribe at any time.</small>
          {status === "error" && <strong role="alert">{message}</strong>}
        </form>
      </section>
    </main>
  );
}
