"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({
  guideSlug,
  guideTitle,
  teaser,
  children,
}: {
  guideSlug: string;
  guideTitle: string;
  teaser: ReactNode;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reviewHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".vercel.app");
    const review = reviewHost && params.get("review") === "1";
    const forceGate = params.get("gate") === "1";
    let hasAccess = false;
    try {
      hasAccess = window.localStorage.getItem(ACCESS_KEY) === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted browsing modes.
    }
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
          consent: form.get("consent") === "on",
          timestamp: new Date().toISOString(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not open the guide. Please try again.");
      try {
        window.localStorage.setItem(ACCESS_KEY, "true");
      } catch {
        // A successful request still grants access for the current page view.
      }
      setUnlocked(true);
      setStatus("idle");
      tracker?.("guide_unlock", { guide_slug: guideSlug, source_page: window.location.pathname });
      window.requestAnimationFrame(() => contentRef.current?.focus());
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not open the guide. Please try again.");
    }
  };

  return (
    <>
      <div
        className={styles.captureTransition}
        data-guide-capture-boundary
        hidden={ready && unlocked}
      >
        <div className={styles.gateTeaser} data-guide-gate-teaser aria-hidden="true">
          {teaser}
        </div>
        <section className={styles.captureBoundary} aria-labelledby={`guide-gate-title-${guideSlug}`}>
          <span className={styles.gateLabel}>Continue this guide</span>
          <h2 id={`guide-gate-title-${guideSlug}`}>Keep reading {guideTitle}</h2>
          <p>Enter your details to open the rest of this guide now.</p>
          <form onSubmit={submit}>
            <label htmlFor={`guide-first-name-${guideSlug}`}>First name</label>
            <input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" required />
            <label htmlFor={`guide-email-${guideSlug}`}>Email address</label>
            <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.consent}>
              <input name="consent" type="checkbox" required />
              <span>I agree to receive this guide and practical Shift &amp; Lead emails. I can unsubscribe at any time.</span>
            </label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Opening..." : "Open the rest of the guide"}</button>
            <small>This also unlocks all free guides on this device. Read the <a href="/privacy.html">privacy notice</a>.</small>
            {status === "error" && <strong role="alert">{message}</strong>}
          </form>
        </section>
      </div>
      <div
        className="guide-gated-content"
        ref={contentRef}
        tabIndex={-1}
        hidden={!ready || !unlocked}
      >
        {children}
      </div>
    </>
  );
}
