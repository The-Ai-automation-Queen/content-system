"use client";

import { FormEvent, type ReactNode, useEffect, useState } from "react";
import { BatchIcon } from "./batch-icons";
import styles from "./guide-reading-page.module.css";
import { ACCESS_KEY, READER_KEY, UNLOCK_EVENT, submitGuideSignup, taggedKey } from "./guide-signup";

// Readers enter their email once. Later guides open straight away and only add that guide's tag.

function tagReturningReader(guideSlug: string) {
  try {
    const email = window.localStorage.getItem(READER_KEY);
    if (!email || window.localStorage.getItem(taggedKey(guideSlug)) === "true") return;
    fetch("/api/guide-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, guideSlug, returning: true, consent: true }),
    })
      .then((response) => response.json())
      .then((result: { tagged?: boolean }) => {
        if (result.tagged) window.localStorage.setItem(taggedKey(guideSlug), "true");
      })
      .catch(() => {
        // Tagging is a bonus: the guide stays open either way.
      });
  } catch {
    // Storage can be unavailable in privacy-restricted browsing modes.
  }
}

// Each guide ends on the next step of the path: the workbook that fits it best.
const sellGuides = new Set(["show-up-in-ai-search", "chatgpt-customer-research-with-evidence", "test-business-idea-with-ai", "marketing-emails-that-sell", "launch-your-product-in-30-days", "instagram-content-dashboard"]);
const storyGuides = new Set(["brand-brain-guide", "stop-chatgpt-forgetting-context", "teach-claude-a-repeatable-workflow"]);
function workbookFor(slug: string) {
  if (sellGuides.has(slug)) return { title: "Find What You Can Sell", line: "This workbook helps you turn what you know into something to sell.", href: "/workbooks/use-what-is-unique-about-you.html" };
  if (storyGuides.has(slug)) return { title: "Put Your Experience Into Words", line: "This workbook helps you write down your story, so AI can use it.", href: "/workbooks/your-human-evidence.html" };
  return { title: "Find the Strengths You Overlook", line: "This workbook helps you find what you are good at.", href: "/workbooks/find-your-zone-of-genius.html" };
}

export function GuideAccessBoundary({
  guideSlug,
  guideTitle,
  guidePromise,
  heading,
  actionLabel,
  note,
  eyebrow,
  headingAccent,
  variant,
  children,
}: {
  guideSlug: string;
  guideTitle: string;
  guidePromise?: string;
  heading?: string;
  actionLabel?: string;
  note?: string;
  eyebrow?: string;
  headingAccent?: string;
  showWorkBridge?: boolean;
  children: ReactNode;
  variant?: "unlock" | "band";
}) {
  const workbook = workbookFor(guideSlug);
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

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
    if (hasAccess && !review && !forceGate) tagReturningReader(guideSlug);
    setReady(true);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.((review || hasAccess) && !forceGate ? "guide_open" : "guide_gate_view", { guide_slug: guideSlug, source_page: window.location.pathname });
  }, [guideSlug]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      await submitGuideSignup(new FormData(event.currentTarget), guideSlug);
      setUnlocked(true);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "That did not send. Please try again.");
    }
  };

  // A locked prompt elsewhere on the page can unlock the reader too.
  useEffect(() => {
    const onUnlock = () => setUnlocked(true);
    window.addEventListener(UNLOCK_EVENT, onUnlock);
    return () => window.removeEventListener(UNLOCK_EVENT, onUnlock);
  }, []);

  // Owner decision 18/10/2026: every step is readable and the first prompt is free;
  // later prompts ask for the email (see card-prompt.tsx). This form closes the guide.
  const subscribed = ready && unlocked;
  return (
    <>
      <div className="guide-gated-content">
        {children}
      </div>
      <div
        className={variant === "band" ? `${styles.captureTransition} ${styles.bandGate}` : styles.captureTransition}
        data-guide-capture-boundary
      >
        <section className={styles.captureBoundary} aria-labelledby={`guide-gate-title-${guideSlug}`}>
          {subscribed ? <div>
            <h2 id={`guide-gate-title-${guideSlug}`}>You&rsquo;re on the list. <em>The next guide is on its way.</em></h2>
          </div> : <div>
          {eyebrow
            ? <span className={styles.gateEyebrow}><span aria-hidden="true">✦</span>{eyebrow}</span>
            : <span className={styles.gateLock}><BatchIcon name="mail" size={22} /></span>}
          <h2 id={`guide-gate-title-${guideSlug}`}>Did this help? <em>Get the next guide by email.</em></h2>
          <p>One short, practical AI guide at a time. Plain words, no jargon.</p>
          <form onSubmit={submit}>
            <div className={styles.nameFields}>
              <label htmlFor={`guide-first-name-${guideSlug}`}>First name<input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" maxLength={100} required /></label>
              <label htmlFor={`guide-email-${guideSlug}`}>Email<input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            </div>
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.consent}>
              <input name="marketingConsent" type="checkbox" required />
              <span>Yes, email me new guides and updates. Unsubscribe anytime.</span>
            </label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send me the next guide"}</button>
            {status === "error" && <strong role="alert">{message}</strong>}
          </form>
          </div>}
        </section>
      </div>
      <aside className="guide-choice" aria-labelledby={`guide-choice-${guideSlug}`}>
        <h2 id={`guide-choice-${guideSlug}`}>Your next step.</h2>
        <div className="guide-choice__grid guide-choice__grid--one">
          <div className="guide-choice__card">
            <span className="guide-choice__tag">Workbook &middot; $27</span>
            <h3>{workbook.title}</h3>
            <p>AI makes everything look the same. Your strengths, your story and your judgement are what make you different. {workbook.line}</p>
            <a href={workbook.href} data-track="guide_to_workbook">See the workbook <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </aside>
    </>
  );
}
