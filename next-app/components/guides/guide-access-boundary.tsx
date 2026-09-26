"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import editorial from "@/content/guide-lessons.json";
import styles from "./guide-access-preview.module.css";

const ACCESS_KEY = "shift-lead-guide-access";
type PublicLesson = { heading: string; lead: string; practice: string; check: string };
type EditorialEntry = { public_lesson: PublicLesson; verdict: string };
const editorialBySlug = editorial as Record<string, EditorialEntry>;

type CaptureState = "idle" | "sending" | "error";

export function GuideAccessBoundary({ guideSlug, guideTitle, guideCover, guideCoverAlt, guidePromise, chapters = [], readingMinutes, previewAnswer = [], previewSections = [], children }: {
  guideSlug: string;
  guideTitle: string;
  guideCover?: string;
  guideCoverAlt?: string;
  guidePromise?: string;
  chapters?: readonly string[];
  readingMinutes?: number;
  previewAnswer?: readonly string[];
  previewSections?: readonly { heading: string; excerpt: string }[];
  children: ReactNode;
  variant?: "unlock" | "entry";
}) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<CaptureState>("idle");
  const [message, setMessage] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const lesson = editorialBySlug[guideSlug]?.public_lesson;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const localReview = ["localhost", "127.0.0.1"].includes(window.location.hostname) && params.get("review") === "1";
    const forceGate = params.get("gate") === "1";
    let pass = false;
    try { pass = window.localStorage.getItem(ACCESS_KEY) === "true"; } catch { /* Browser storage may be unavailable. */ }
    setUnlocked(!forceGate && (localReview || pass));
    setReady(true);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.((pass || localReview) && !forceGate ? "guide_open" : "guide_preview_view", { guide_slug: guideSlug, source_page: window.location.pathname });
  }, [guideSlug]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const tracker = (window as Window & { slTrack?: (name: string, data?: Record<string, string>) => void }).slTrack;
    tracker?.("guide_gate_submit", { guide_slug: guideSlug, source_page: window.location.pathname });
    try {
      const response = await fetch("/api/guide-capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        email: form.get("email"), firstName: form.get("firstName"), website: form.get("website"), guideSlug,
        consent: true, marketingConsent: form.get("marketingConsent") === "on", source: window.location.pathname,
      }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof payload.error === "string" ? payload.error : "We could not open the guide. Please try again.");
      try { window.localStorage.setItem(ACCESS_KEY, "true"); } catch { /* Access still works for this page view. */ }
      setUnlocked(true);
      setStatus("idle");
      tracker?.("guide_unlock", { guide_slug: guideSlug, source_page: window.location.pathname });
      window.requestAnimationFrame(() => contentRef.current?.focus());
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not open the guide. Please try again.");
    }
  }

  if (guideSlug === "instagram-content-dashboard" && editorialBySlug[guideSlug]?.verdict === "factual-hold") {
    return <main className={styles.guidePreview}>
      <div className={styles.previewShell}>
        <Link className={styles.previewBack} href="/guides/">← All free guides</Link>
        <div className={styles.previewLayout}>
          <div className={styles.previewImage}>{guideCover && <img src={guideCover} alt={guideCoverAlt || `Cover of ${guideTitle}`} />}</div>
          <div className={styles.previewCopy}>
            <p className={styles.previewKicker}>AI Automation Queen · Technical review</p>
            <h1>{guideTitle}</h1>
            <p className={styles.previewPromise}>The previous setup used an Instagram API that Meta retired. The build instructions are paused until the current connection and metrics can be tested. Please do not follow screenshots or token steps from the older version.</p>
            <p className={styles.previewAuthor}>No email required while the walkthrough is under review.</p>
            <Link className={styles.previewBack} href="/guides/which-ai-tool-for-what/">Choose a smaller AI task instead →</Link>
          </div>
        </div>
        {lesson && <article className={styles.readingPreview}><div className={styles.readingNote}><span>OPEN TO EVERYONE</span><p>A useful first decision while the API walkthrough is being rebuilt.</p></div><div className={styles.readingBody}><h2>{lesson.heading}</h2><div className={styles.editorialLesson}><p>{lesson.lead}</p><div><strong>Try this</strong><p>{lesson.practice}</p></div><div><strong>Check your result</strong><p>{lesson.check}</p></div></div></div></article>}
      </div>
    </main>;
  }

  return <>
    <div className={styles.guidePreview} data-guide-capture-boundary hidden={ready && unlocked}>
      <div className={styles.previewShell}>
        <Link className={styles.previewBack} href="/guides/">← All free guides</Link>
        <div className={styles.previewLayout}>
          <div className={styles.previewImage}>{guideCover && <img src={guideCover} alt={guideCoverAlt || `Cover of ${guideTitle}`} />}</div>
          <div className={styles.previewCopy}>
            <p className={styles.previewKicker}>An AI Automation Queen guide {readingMinutes ? `· ${readingMinutes} min read` : ""}</p>
            <h1>{guideTitle}</h1>
            <p className={styles.previewPromise}>{guidePromise || "One practical task, a clear next step and a way to check the result."}</p>
            <p className={styles.previewAuthor}>By <Link href="/guides/">AI Automation Queen</Link> <span aria-hidden="true">·</span> Practical AI field guides</p>
            <div className={styles.previewIncludes}><span>Inside this guide</span><ol>{(chapters.length ? chapters.slice(0, 4) : ["Understand the decision", "Try it on one real task", "Check the result yourself"]).map((chapter) => <li key={chapter}>{chapter}</li>)}</ol></div>
          </div>
        </div>
        <article className={styles.readingPreview} aria-label="Free beginning of this guide">
          <div className={styles.readingNote}><span>OPEN TO EVERYONE</span><p>Try this first step. The complete interactive exercise continues after the email form.</p></div>
          <div className={styles.readingBody}><h2>{lesson?.heading || "Start with the useful part."}</h2>
            {lesson && <div className={styles.editorialLesson}>
              <p>{lesson.lead}</p>
              <div><strong>Try this</strong><p>{lesson.practice}</p></div>
              <div><strong>Check your result</strong><p>{lesson.check}</p></div>
            </div>}
            {previewAnswer.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph.replaceAll("**", "")}</p>)}
            {previewSections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.excerpt.replaceAll("**", "")}</p></section>)}
          </div>
        </article>
        <section className={styles.captureInline} aria-labelledby={`guide-gate-title-${guideSlug}`}>
          <div className={styles.capturePitch}><span>01 / YOUR LIBRARY PASS</span><h2 id={`guide-gate-title-${guideSlug}`}>Get the full guide. <em>Keep the link.</em></h2><p>You have seen the opening. Add your email to read the complete exercise and conclusion. We’ll send a return link, and your library pass will unlock all 35 guides on this device. No account or card.</p></div>
          <form onSubmit={submit} className={styles.captureForm}>
            <label htmlFor={`guide-email-${guideSlug}`}>Your email address <span>(required)</span></label>
            <input id={`guide-email-${guideSlug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <label htmlFor={`guide-first-name-${guideSlug}`}>First name <span>(optional)</span></label>
            <input id={`guide-first-name-${guideSlug}`} name="firstName" type="text" autoComplete="given-name" maxLength={100} placeholder="What should we call you?" />
            <input className={styles.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className={styles.captureOptIn}><input name="marketingConsent" type="checkbox" /><span>Also send me practical AI notes and product updates from AI Automation Queen. Optional; unsubscribe at any time.</span></label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending your link…" : "Open my free guide ↗"}</button>
            <small>The guide email is for delivery only. Marketing is optional. Read the <a href="/privacy.html">privacy notice</a>.</small>
            {status === "error" && <p role="alert" className={styles.captureError}>{message}</p>}
          </form>
        </section>
      </div>
    </div>
    <div className="guide-gated-content" ref={contentRef} tabIndex={-1} hidden={!ready || !unlocked}>{children}</div>
  </>;
}
