"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { GuideCard } from "./guide-card";
import type { Guide } from "@/content/guides";

// The library follows a business owner's journey: each stage is a question they
// already have, in the order they usually have it. Every approved guide sits in one stage.
const journey = [
  { id: "new-to-ai", label: "I'm new to AI", heading: "I'm new to AI. Where do I start?", intro: "Start here if you have barely used AI. Plain words, one first task, nothing to install.", slugs: ["what-is-ai", "ai-jargon-guide", "what-is-a-prompt", "ai-skills-worth-learning-for-work"] },
  { id: "safe", label: "Is it safe?", heading: "Is it safe? Can I trust what it says?", intro: "What you can share with AI, what you can't, and how to check its answers before a client sees them.", slugs: ["what-should-you-never-share-with-ai", "catch-ai-making-things-up", "connect-ai-to-email-files-calendar", "stop-ai-agreeing-with-you"] },
  { id: "tools", label: "Pick and set up my tools", heading: "Which tool should I use, and how do I set it up?", intro: "Choose one tool, then set it up so it knows your business and stops wasting your time.", slugs: ["which-ai-tool-for-what", "brand-brain-guide", "stop-chatgpt-forgetting-context", "make-chatgpt-answers-shorter", "claude", "gemini-cannot-find-drive-file", "gemini-google-tasks-limits", "what-is-an-ai-browser"] },
  { id: "grow", label: "Get clients and grow", heading: "How do I use AI to get clients and grow?", intro: "Get found, understand what your clients want, test ideas and sell without sounding like a robot.", slugs: ["show-up-in-ai-search", "chatgpt-customer-research-with-evidence", "test-business-idea-with-ai", "marketing-emails-that-sell", "launch-your-product-in-30-days", "instagram-content-dashboard"] },
  { id: "save-time", label: "Save time on repeat work", heading: "How do I get AI to do the work I repeat?", intro: "Hand over weekly tasks, write down how you work, and decide if you need an agent at all.", slugs: ["chatgpt-scheduled-tasks", "teach-claude-a-repeatable-workflow", "chatgpt-screen-recording-to-process-guide", "make-work-tracker-with-kimi", "weekend-projects-with-claude", "test-meta-muse-money-saving-task", "what-is-agentic"] },
] as const;

const startHereSlug = "what-is-ai";

function track(name: string, detail: Record<string, string>) {
  (window as Window & { slTrack?: (event: string, data?: Record<string, string>) => void }).slTrack?.(name, detail);
}

function normalise(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function GuideLibrary({ guides, previewGuides, searchIndex }: { guides: Guide[]; previewGuides?: Guide[]; searchIndex: Record<string, string> }) {
  const [reviewMode, setReviewMode] = useState(false);
  const [query, setQuery] = useState("");
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

  const results = useMemo(() => {
    const terms = normalise(query).split(" ").filter(Boolean);
    if (!terms.length) return [];
    return listedGuides.map((guide, order) => {
      const title = normalise(guide.title);
      const tags = normalise([guide.hub, guide.level, ...guide.outcomes, ...guide.tags].join(" "));
      const summary = normalise(guide.summary);
      const body = normalise(searchIndex[guide.slug] ?? "");
      const searchable = `${title} ${tags} ${summary} ${body}`;
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 8 : 0) + (tags.includes(term) ? 5 : 0) + (summary.includes(term) ? 3 : 0) + (body.includes(term) ? 1 : 0), 0);
      return { guide, order, matches: terms.every((term) => searchable.includes(term)), score };
    }).filter(({ matches }) => matches).sort((a, b) => b.score - a.score || a.order - b.order).map(({ guide }) => guide);
  }, [listedGuides, searchIndex, query]);
  const searching = query.trim().length > 0;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("guide_search_submit", { query: query.trim(), results: String(results.length) });
    window.requestAnimationFrame(() => document.getElementById("all-guides")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      <section className="guides-hero" aria-labelledby="guides-title">
        <div className="guides-hero__copy">
          <p className="eyebrow">Free AI guides for business owners</p>
          <h1 id="guides-title">Use AI for real work. Keep the decisions that need <em>you.</em></h1>
          <p>Find your question below. Every guide gives you the steps to follow and the prompts to copy.</p>
          <form className="hero-search" role="search" onSubmit={submitSearch}>
            <label htmlFor="guide-search">Looking for something specific?</label>
            <span className="hero-search__field">
              <input id="guide-search" name="guide-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try proposal, client data or Gemini" autoComplete="off" />
              <button type="submit">Search guides</button>
            </span>
            <span className="hero-search__status" role="status" aria-live="polite">{searching ? `${results.length} matching ${results.length === 1 ? "guide" : "guides"}` : "Search titles, topics and guide instructions."}</span>
          </form>
        </div>
        {startHere && (
          <div className="guides-hero__feature" aria-label="Start here">
            <p className="eyebrow">New to AI? Start here</p>
            <GuideCard guide={startHere} featured reviewMode={reviewMode} />
          </div>
        )}
      </section>

      <nav className="outcome-nav journey-nav" aria-labelledby="journey-title">
        <div className="outcome-nav__head">
          <p className="eyebrow">{listedGuides.length} guides, grouped by where you are</p>
          <h2 id="journey-title">Where are you right now?</h2>
          <p>Pick the one that sounds like you. You can come back for the next one later.</p>
        </div>
        <div className="outcome-nav__grid">
          {stages.map((stage, index) => (
            <a key={stage.id} href={`#${stage.id}`} onClick={() => { setQuery(""); track("guide_stage", { stage: stage.id }); }}>
              <span className="outcome-nav__title">{stage.label}</span>
              <span>Step {index + 1} of {stages.length}</span>
              <strong>{stage.guides.length} {stage.guides.length === 1 ? "guide" : "guides"} <span aria-hidden="true">↓</span></strong>
            </a>
          ))}
        </div>
      </nav>

      <div id="all-guides">
        {searching ? (
          <section className="library" aria-labelledby="results-title">
            <div className="library__head">
              <div>
                <p className="eyebrow">Search</p>
                <h2 id="results-title">Guides about “{query.trim()}”</h2>
              </div>
              <button className="library__reset" type="button" onClick={() => setQuery("")}>Show all guides</button>
            </div>
            <div className="guide-grid">{results.map((guide) => <GuideCard key={guide.slug} guide={guide} reviewMode={reviewMode} />)}</div>
            {results.length === 0 && (
              <div className="empty-state">
                <p>No guide matches “{query.trim()}”. Try another word, or pick where you are above.</p>
                <button type="button" onClick={() => setQuery("")}>Show all guides</button>
              </div>
            )}
          </section>
        ) : (
          <>
            {stages.filter((stage) => stage.guides.length > 0).map((stage, index) => (
              <section key={stage.id} id={stage.id} className="library journey-stage" aria-labelledby={`${stage.id}-title`}>
                <div className="library__head">
                  <div>
                    <p className="eyebrow">Step {index + 1}</p>
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
        )}
      </div>
    </>
  );
}
