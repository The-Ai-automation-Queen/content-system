"use client";

import { type CSSProperties, FormEvent, type ReactNode, useEffect, useState } from "react";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({
  guideSlug,
  cover,
  children,
}: {
  guideSlug: string;
  cover: string;
  children: ReactNode;
}) {
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
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.(review || hasAccess ? "guide_open" : "guide_gate_view", { guide_slug: guideSlug, source_page: window.location.pathname });
  }, [guideSlug]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.("guide_gate_submit", { guide_slug: guideSlug, source_page: window.location.pathname });

    try {
      const response = await fetch("/api/guide-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          firstName: form.get("firstName"),
          website: form.get("website"),
          guideSlug,
          source: window.location.pathname,
          consent: true,
          timestamp: new Date().toISOString(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not open the guide. Please try again.");
      window.localStorage.setItem(ACCESS_KEY, "true");
      setUnlocked(true);
      tracker?.("guide_unlock", { guide_slug: guideSlug, source_page: window.location.pathname });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not open the guide. Please try again.");
    }
  };

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main
      className={styles.gatePage}
      style={{ "--guide-gate-cover": `url("${cover}")` } as CSSProperties}
    >
      <section className={styles.gate} aria-labelledby="guide-gate-title">
        <div className={styles.gateIcon} aria-hidden="true">↗</div>
        <h1 id="guide-gate-title">Access the guide</h1>
        <p>Enter your email to read the guide. I will also send occasional practical guides and product updates. You can leave at any time.</p>
        <form onSubmit={submit}>
          <label htmlFor={`guide-first-name-${guideSlug}`}>First name <span>(optional)</span></label>
          <input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" />
          <label htmlFor={`guide-email-${guideSlug}`}>Email address</label>
          <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Opening..." : "Access the guide"}</button>
          <small>One email unlocks all free guides on this device. <a href="/privacy.html">Privacy</a>.</small>
          {status === "error" && <strong role="alert">{message}</strong>}
        </form>
      </section>
    </main>
  );
}
