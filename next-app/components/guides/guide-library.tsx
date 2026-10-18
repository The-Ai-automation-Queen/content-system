"use client";

import { useEffect, useMemo, useState } from "react";
import { GuideCard } from "./guide-card";
import type { Guide } from "@/content/guides";

// The library follows a business owner's journey: each stage is a question they
// already have, in the order they usually have it. Every approved guide sits in one stage.
const journey = [
  { id: "new-to-ai", label: "I'm new to AI", heading: "I'm new to AI. Where do I start?", intro: "Start here if you have barely used AI. Plain words, one first task, nothing to install.", slugs: ["start-using-ai-in-your-business", "what-is-ai", "ai-jargon-guide", "what-is-a-prompt", "ai-skills-worth-learning-for-work"] },
  { id: "safe", label: "Is it safe?", heading: "Is it safe? Can I trust what it says?", intro: "What you can share with AI, what you can't, and how to check its answers before a client sees them.", slugs: ["what-should-you-never-share-with-ai", "catch-ai-making-things-up", "connect-ai-to-email-files-calendar", "stop-ai-agreeing-with-you"] },
  { id: "tools", label: "Pick and set up my tools", heading: "Which tool should I use, and how do I set it up?", intro: "Choose one tool, then set it up so it knows your business and stops wasting your time.", slugs: ["which-ai-tool-for-what", "brand-brain-guide", "stop-chatgpt-forgetting-context", "make-chatgpt-answers-shorter", "claude", "gemini-cannot-find-drive-file", "gemini-google-tasks-limits", "what-is-an-ai-browser"] },
  { id: "grow", label: "Get clients and grow", heading: "How do I use AI to get clients and grow?", intro: "Get found, understand what your clients want, test ideas and sell without sounding like a robot.", slugs: ["show-up-in-ai-search", "chatgpt-customer-research-with-evidence", "test-business-idea-with-ai", "marketing-emails-that-sell", "launch-your-product-in-30-days", "instagram-content-dashboard"] },
  { id: "save-time", label: "Save time on repeat work", heading: "How do I get AI to do the work I repeat?", intro: "Hand over weekly tasks, write down how you work, and decide if you need an agent at all.", slugs: ["chatgpt-scheduled-tasks", "teach-claude-a-repeatable-workflow", "chatgpt-screen-recording-to-process-guide", "make-work-tracker-with-kimi", "weekend-projects-with-claude", "test-meta-muse-money-saving-task", "what-is-agentic"] },
] as const;

const startHereSlug = "start-using-ai-in-your-business";

function track(name: string, detail: Record<string, string>) {
  (window as Window & { slTrack?: (event: string, data?: Record<string, string>) => void }).slTrack?.(name, detail);
}


export function GuideLibrary({ guides, previewGuides }: { guides: Guide[]; previewGuides?: Guide[] }) {
  const [reviewMode, setReviewMode] = useState(false);
  const listedGuides = reviewMode && previewGuides ? previewGuides : guides;

  useEffect(() => {
    setReviewMode(Boolean(previewGuides) && new URLSearchParams(window.location.search).get("review") === "1");
  }, [previewGuides]);

  const bySlug = useMemo(() => new Map(listedGuides.map((guide) => [guide.slug, guide])), [listedGuides]);
  const startHere = bySlug.get(startHereSlug) ?? listedGuides[0];
  const stages = journey.map((stage) => ({ ...stage, guides: stage.slugs.map((slug) => bySlug.get(slug)).filter((guide): guide is Guide => Boolean(guide)) }));
  // Anything approved but not yet placed in a stage still shows, at the end.
  const placed = new Set<string>(journey.flatMap((stage) => [...stage.slugs]));
  const unplaced = listedGuides.filter((guide) => !placed.has(guide.slug));


  return (
    <>
      <section className="guides-hero" aria-labelledby="guides-title">
        <div className="guides-hero__copy">
          <h1 id="guides-title">Learn to use AI in your business, <em>step by step.</em></h1>
          <p>Pick a guide. Follow the steps one by one. Copy the prompts into ChatGPT, Claude, or your preferred AI.</p>
        </div>
        {startHere && (
          <div className="guides-hero__feature" aria-label="Start here">
            <GuideCard guide={startHere} featured reviewMode={reviewMode} />
          </div>
        )}
      </section>

      <nav className="outcome-nav journey-nav" aria-labelledby="journey-title">
        <div className="outcome-nav__head">
          <h2 id="journey-title">Where are you right now?</h2>
          <p>{listedGuides.length} guides, grouped by where you are. New to AI? Start at step 1 and go in order. Already using it? Jump to the step you need. Every guide ends with your next step.</p>
        </div>
        <div className="outcome-nav__grid">
          {stages.map((stage, index) => (
            <a key={stage.id} href={`#${stage.id}`} onClick={() => track("guide_stage", { stage: stage.id })}>
              <span className="outcome-nav__title">{stage.label}</span>
              <span>Step {index + 1} of {stages.length}</span>
              <strong>{stage.guides.length} {stage.guides.length === 1 ? "guide" : "guides"} <span aria-hidden="true">↓</span></strong>
            </a>
          ))}
        </div>
      </nav>

      <div id="all-guides">
        <>
            {stages.filter((stage) => stage.guides.length > 0).map((stage, index) => (
              <section key={stage.id} id={stage.id} className="library journey-stage" aria-labelledby={`${stage.id}-title`}>
                <div className="library__head">
                  <div>
                    <h2 id={`${stage.id}-title`}>{stage.heading}</h2>
                    <p>{stage.intro}</p>
                  </div>
                </div>
                <div className="guide-grid">{stage.guides.map((guide) => <GuideCard key={guide.slug} guide={guide} reviewMode={reviewMode} />)}</div>
              </section>
            ))}
            {unplaced.length > 0 && (
              <section className="library journey-stage" aria-labelledby="more-title">
                <div className="library__head"><div><h2 id="more-title">More guides</h2></div></div>
                <div className="guide-grid">{unplaced.map((guide) => <GuideCard key={guide.slug} guide={guide} reviewMode={reviewMode} />)}</div>
              </section>
            )}
        </>
      </div>
      <section className="library-close" aria-labelledby="library-close-title">
        <img src="/assets/mascot/waving-720.webp" alt="" width="575" height="720" loading="lazy" />
        <div>
          <h2 id="library-close-title">Want help with the next step? <em>Pick your way in.</em></h2>
          <div className="library-close__actions">
            <a href="https://www.skool.com/simple-ai-for-non-tech-8652" target="_blank" rel="noopener noreferrer">Join the community (free)</a>
            <a href="/work-with-fatiha/#apply">Work with me 1:1</a>
          </div>
        </div>
      </section>
    </>
  );
}
