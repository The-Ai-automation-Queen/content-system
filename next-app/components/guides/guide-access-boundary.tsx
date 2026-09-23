"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({
  guideSlug,
  guideTitle,
  guideCover,
  guideCoverAlt,
  children,
  variant = "unlock",
}: {
  guideSlug: string;
  guideTitle: string;
  guideCover?: string;
  guideCoverAlt?: string;
  children: ReactNode;
  variant?: "unlock" | "entry";
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
      hasAccess = window.localStorage.getItem(variant === "unlock" ? ACCESS_KEY : `${ACCESS_KEY}:${guideSlug}`) === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted browsing modes.
    }
    setUnlocked(!forceGate && (review || hasAccess));
    setReady(true);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.((review || hasAccess) && !forceGate ? "guide_open" : "guide_gate_view", { guide_slug: guideSlug, source_page: window.location.pathname });
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
          lastName: form.get("lastName"),
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
        window.localStorage.setItem(variant === "unlock" ? ACCESS_KEY : `${ACCESS_KEY}:${guideSlug}`, "true");
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
        className={`${styles.captureTransition} ${variant === "entry" ? styles.captureEntryTransition : ""}`}
        data-guide-capture-boundary
        hidden={ready && unlocked}
      >
        <section className={`${styles.captureBoundary} ${variant === "entry" ? styles.captureEntry : ""}`} role={variant === "entry" ? "dialog" : undefined} aria-modal={variant === "entry" ? true : undefined} aria-labelledby={`guide-gate-title-${guideSlug}`}>
          {variant === "entry" && guideCover && <div className={styles.entryCover}><img src={guideCover} alt={guideCoverAlt || ""} /></div>}
          <div className={variant === "entry" ? styles.entryContent : undefined}>
          <span className={styles.gateLabel}>{variant === "entry" ? "Free practical guide" : "Continue this guide"}</span>
          <h2 id={`guide-gate-title-${guideSlug}`}>{variant === "entry" ? guideTitle : `Keep reading ${guideTitle}`}</h2>
          <p>{variant === "entry" ? "Build a working Instagram dashboard with five practical steps, screenshots and copyable prompts. Enter your email to open the guide." : "You have the main idea and first steps. Add your email to open the full exercise and receive a link you can return to. Your name is optional."}</p>
          <form onSubmit={submit}>
            <>
              <label htmlFor={`guide-first-name-${guideSlug}`}>First name {variant === "unlock" ? "(optional)" : ""}</label>
              <input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" maxLength={100} required={variant === "entry"} />
            </>
            {variant === "entry" && <>
              <label htmlFor={`guide-last-name-${guideSlug}`}>Last name</label>
              <input id={`guide-last-name-${guideSlug}`} name="lastName" type="text" autoComplete="family-name" maxLength={100} required />
            </>}
            <label htmlFor={`guide-email-${guideSlug}`}>Email address (required)</label>
            <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.consent}>
              <input name="marketingConsent" type="checkbox" />
              <span>Also send me practical Shift &amp; Lead emails and product updates (optional). I can unsubscribe at any time.</span>
            </label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Opening guide..." : variant === "entry" ? "Open the free guide" : "Open the rest of the guide"}</button>
            {variant === "unlock" && <small>This also unlocks all free guides on this device. Read the <a href="/privacy.html">privacy notice</a>.</small>}
            {status === "error" && <strong role="alert">{message}</strong>}
          </form>
          </div>
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
