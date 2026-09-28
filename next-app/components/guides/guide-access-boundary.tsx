"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { BatchIcon } from "./batch-icons";
import styles from "./guide-reading-page.module.css";

const ACCESS_KEY = "shift-lead-guide-access";

export function GuideAccessBoundary({
  guideSlug,
  guideTitle,
  guidePromise,
  heading,
  actionLabel,
  note,
  showWorkBridge = true,
  children,
}: {
  guideSlug: string;
  guideTitle: string;
  guidePromise?: string;
  heading?: string;
  actionLabel?: string;
  note?: string;
  showWorkBridge?: boolean;
  children: ReactNode;
  variant?: "unlock";
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
    tracker?.((review || hasAccess) && !forceGate ? "guide_open" : "guide_gate_view", { guide_slug: guideSlug, source_page: window.location.pathname });
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
          marketingConsent: form.get("marketingConsent") === "on",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error("We could not open the guide. Please try again.");
      try {
        window.localStorage.setItem(ACCESS_KEY, "true");
      } catch {
        // A successful request still grants access for the current page view.
      }
      setUnlocked(true);
      setStatus("idle");
      tracker?.("guide_unlock", { guide_slug: guideSlug, source_page: window.location.pathname });
      window.requestAnimationFrame(() => contentRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("We could not open the guide. Please try again.");
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
          <div>
          <span className={styles.gateLock}><BatchIcon name="lock" size={22} /></span>
          <h2 id={`guide-gate-title-${guideSlug}`}>{heading || "Get the next step"}</h2>
          <p>{guidePromise || `Get the next practical part of ${guideTitle} and a link to return to this guide.`}</p>
          {note && <p className={styles.gateNote}>{note}</p>}
          <form onSubmit={submit}>
            <div className={styles.nameFields}>
              <label htmlFor={`guide-first-name-${guideSlug}`}>First name<input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" maxLength={100} required /></label>
              <label htmlFor={`guide-email-${guideSlug}`}>Email<input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            </div>
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.consent}>
              <input name="marketingConsent" type="checkbox" />
              <span>Also send me new guides and updates (optional, unsubscribe anytime).</span>
            </label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Opening guide..." : (actionLabel || "Open the rest of the guide")}</button>
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
        {showWorkBridge && <aside className={styles.workBridge} aria-labelledby={`guide-work-bridge-${guideSlug}`}>
          <div>
            <h2 id={`guide-work-bridge-${guideSlug}`}>Want your team working like this?</h2>
            <p>I run a practical AI programme for teams, adapted to your industry and built on your own work. I also help leaders decide what AI should change in their business and marketing.</p>
          </div>
          <a href="/work-with-fatiha/" data-track="guide_to_work_with_me">See how we can work together <span aria-hidden="true">→</span></a>
        </aside>}
      </div>
    </>
  );
}
