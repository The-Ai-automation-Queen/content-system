"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({
  guideSlug,
  guideTitle,
  children,
  variant = "unlock",
}: {
  guideSlug: string;
  guideTitle: string;
  children: ReactNode;
  variant?: "unlock" | "save";
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
      hasAccess = window.localStorage.getItem(variant === "save" ? `${ACCESS_KEY}:${guideSlug}` : ACCESS_KEY) === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted browsing modes.
    }
    setUnlocked(!forceGate && ((variant === "unlock" && review) || hasAccess));
    setReady(true);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.(((variant === "unlock" && review) || hasAccess) ? "guide_open" : "guide_gate_view", { guide_slug: guideSlug, source_page: window.location.pathname });
  }, [guideSlug, variant]);

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
          marketingConsent: form.get("marketingConsent") === "on",
          timestamp: new Date().toISOString(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not open the guide. Please try again.");
      try {
        window.localStorage.setItem(variant === "save" ? `${ACCESS_KEY}:${guideSlug}` : ACCESS_KEY, "true");
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
        <section className={styles.captureBoundary} aria-labelledby={`guide-gate-title-${guideSlug}`}>
          <span className={styles.gateLabel}>{variant === "save" ? "Keep this guide" : "Continue this guide"}</span>
          <h2 id={`guide-gate-title-${guideSlug}`}>{variant === "save" ? "Keep this walkthrough handy" : `Keep reading ${guideTitle}`}</h2>
          <p>{variant === "save" ? "Get the link by email so you can revisit the steps and copyable prompts when you need them." : "You have the main idea and first steps. Add your email to open the full exercise and receive a link you can return to. Your name is optional."}</p>
          <form onSubmit={submit}>
            <label htmlFor={`guide-first-name-${guideSlug}`}>First name (optional)</label>
            <input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" maxLength={100} />
            <label htmlFor={`guide-email-${guideSlug}`}>Email address (required)</label>
            <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.consent}>
              <input name="marketingConsent" type="checkbox" />
              <span>Also send me practical Shift &amp; Lead emails and product updates (optional). I can unsubscribe at any time.</span>
            </label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : variant === "save" ? "Send me the link" : "Open the rest of the guide"}</button>
            <small>We use Lumail to deliver your requested email. Marketing is optional. {variant === "unlock" && "This also unlocks all free guides on this device. "}Read the <a href="/privacy.html">privacy notice</a>.</small>
            {status === "error" && <strong role="alert">{message}</strong>}
          </form>
        </section>
      </div>
      {variant === "save" && ready && unlocked && <p role="status" className={styles.captureSuccess}>Link requested. Check your inbox.</p>}
      {variant === "unlock" && <div
        className="guide-gated-content"
        ref={contentRef}
        tabIndex={-1}
        hidden={!ready || !unlocked}
      >
        {children}
      </div>}
    </>
  );
}
