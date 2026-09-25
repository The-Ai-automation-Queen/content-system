"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { GuideCard } from "./guide-card";
import { guideHref } from "@/content/guide-url";
import {
  guideLevels,
  guideOutcomes,
  type Guide,
  type GuideLevel,
  type GuideOutcome,
} from "@/content/guides";

type LevelFilter = "all" | GuideLevel;
type OutcomeFilter = "all" | GuideOutcome;

const outcomeDescriptions: Record<GuideOutcome, string> = {
  "Understand AI": "Get the few ideas and words that make the rest easier.",
  "Use AI safely": "Know what stays out, which settings matter and what to check.",
  "Choose an AI tool": "Match the job to a tool before you add another subscription.",
  "Get better answers": "Give clearer instructions and judge what comes back.",
  "Create content": "Use AI without losing your facts, point of view or final say.",
  "Automate a task": "Connect repeatable steps and remove avoidable manual work.",
  "Build an agent": "Set the job, limits and approvals before you automate.",
  "Run business operations": "Keep routine work moving without giving up control.",
};

const foundationSlugs = ["what-is-ai", "ai-jargon-guide"];

function scrollToLibrary() {
  window.requestAnimationFrame(() => {
    document.getElementById("all-guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function track(name: string, detail: Record<string, string>) {
  (window as Window & { slTrack?: (event: string, data?: Record<string, string>) => void }).slTrack?.(name, detail);
}

function normalise(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function GuideLibrary({ guides, previewGuides, searchIndex }: { guides: Guide[]; previewGuides?: Guide[]; searchIndex: Record<string, string> }) {
  const [reviewMode, setReviewMode] = useState(false);
  const [level, setLevel] = useState<LevelFilter>("all");
  const [outcome, setOutcome] = useState<OutcomeFilter>("all");
  const [query, setQuery] = useState("");
  const listedGuides = reviewMode && previewGuides ? previewGuides : guides;

  useEffect(() => {
    setReviewMode(Boolean(previewGuides) && new URLSearchParams(window.location.search).get("review") === "1");
  }, [previewGuides]);

  const featured = listedGuides.find((guide) => guide.slug === "what-should-you-never-share-with-ai") ?? listedGuides[0];
  const foundations = foundationSlugs
    .map((slug) => listedGuides.find((guide) => guide.slug === slug))
    .filter((guide): guide is Guide => Boolean(guide));
  const availableOutcomes = guideOutcomes.filter((item) =>
    listedGuides.some((guide) => guide.outcomes.includes(item)),
  );

  const visible = useMemo(() => {
    const terms = normalise(query).split(" ").filter(Boolean);
    return listedGuides.map((guide, order) => {
      const title = normalise(guide.title);
      const tags = normalise([guide.hub, guide.level, ...guide.outcomes, ...guide.tags].join(" "));
      const summary = normalise(guide.summary);
      const body = normalise(searchIndex[guide.slug] ?? "");
      const searchable = `${title} ${tags} ${summary} ${body}`;
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 8 : 0) + (tags.includes(term) ? 5 : 0) + (summary.includes(term) ? 3 : 0) + (body.includes(term) ? 1 : 0), 0);
      return { guide, order, matchesSearch: terms.every((term) => searchable.includes(term)), score };
    }).filter(({ guide, matchesSearch }) => {
      const matchesLevel = level === "all" || guide.level === level;
      const matchesOutcome = outcome === "all" || guide.outcomes.includes(outcome);
      return matchesLevel && matchesOutcome && matchesSearch;
    }).sort((a, b) => b.score - a.score || a.order - b.order).map(({ guide }) => guide);
  }, [listedGuides, searchIndex, level, outcome, query]);

  const resultLabel = query.trim() ? `Search results for “${query.trim()}”` : outcome !== "all"
    ? outcome
    : level !== "all" ? `${level} guides` : "All guides";

  function chooseOutcome(value: OutcomeFilter) {
    setOutcome(value);
    setLevel("all");
    setQuery("");
    track("guide_outcome", { outcome: value });
    scrollToLibrary();
  }

  function chooseLevel(value: LevelFilter) {
    setLevel(value);
    track("guide_level", { level: value });
  }

  function resetFilters() {
    setLevel("all");
    setOutcome("all");
    setQuery("");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("guide_search_submit", { query: query.trim(), results: String(visible.length) });
    scrollToLibrary();
  }

  return (
    <>
      <section className="guides-hero" aria-labelledby="guides-title">
        <div className="guides-hero__copy">
          <p className="eyebrow">Free AI guides</p>
          <h1 id="guides-title">Use AI for real work. Keep the decisions that need <em>you.</em></h1>
          <p>Pick the task you want done. I will show you which tool fits, what to give it, what to keep private and what you still need to check.</p>
          {reviewMode && <p className="review-banner">Review mode · Approved and unpublished guide pages are shown together.</p>}
          <form className="hero-search" role="search" onSubmit={submitSearch}>
            <label htmlFor="guide-search">What do you need help with?</label>
            <span className="hero-search__field">
              <input id="guide-search" name="guide-search" type="search" value={query} onChange={(event) => {
                setQuery(event.target.value);
                setLevel("all");
                setOutcome("all");
              }} placeholder="Try privacy or a task at work" autoComplete="off" />
              <button type="submit">Search guides</button>
            </span>
            <span className="hero-search__status" role="status" aria-live="polite">{query.trim() ? `${visible.length} matching ${visible.length === 1 ? "guide" : "guides"}` : "Search titles, topics and guide instructions."}</span>
          </form>
        </div>
        {featured && (
          <div className="guides-hero__feature" aria-label="Featured guide">
            <GuideCard guide={featured} featured reviewMode={reviewMode} />
          </div>
        )}
      </section>

      <section className="outcome-nav" aria-labelledby="outcome-title">
        <div className="outcome-nav__head">
          <p className="eyebrow">Start with the result</p>
          <h2 id="outcome-title">What are you trying to do?</h2>
          <p>Choose one. You will see only the guides that help with that job.</p>
        </div>
        <div className="outcome-nav__grid" role="group" aria-label="Filter guides by outcome">
          {availableOutcomes.map((item) => {
            const count = listedGuides.filter((guide) => guide.outcomes.includes(item)).length;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={outcome === item}
                onClick={() => chooseOutcome(item)}
              >
                <span className="outcome-nav__title">{item}</span>
                <span>{outcomeDescriptions[item]}</span>
                <strong>{count} {count === 1 ? "guide" : "guides"} <span aria-hidden="true">→</span></strong>
              </button>
            );
          })}
        </div>
      </section>

      {foundations.length > 0 && (
        <section className="foundation-links" aria-labelledby="foundation-title">
          <div>
            <p className="eyebrow">New to AI?</p>
            <h2 id="foundation-title">Start with the essentials.</h2>
          </div>
          <ol>
            {foundations.map((guide, index) => (
              <li key={guide.slug}>
                <a href={guideHref(guide.slug, reviewMode)}>
                  <span>0{index + 1}</span>
                  <strong>{guide.title}</strong>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="library" id="all-guides" aria-labelledby="library-title">
        <div className="library__head">
          <div>
            <p className="eyebrow">Browse when you need to</p>
            <h2 id="library-title">{resultLabel}</h2>
            <p>Open any card. Every guide answers one question and gives you a useful next step.</p>
          </div>
          <button
            className="library__reset"
            type="button"
            onClick={resetFilters}
            disabled={level === "all" && outcome === "all" && !query}
          >
            Show all guides
          </button>
        </div>

        <div className="library__active-filters" aria-label="Filter guides by level">
          <button type="button" aria-pressed={level === "all"} onClick={() => chooseLevel("all")}>All levels</button>
          {guideLevels.map((item) => (
            <button key={item} type="button" aria-pressed={level === item} onClick={() => chooseLevel(item)}>
              {item}
            </button>
          ))}
        </div>

        <p className="result-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? "guide" : "guides"}
        </p>
        <div className="guide-grid">
          {visible.map((guide) => <GuideCard key={guide.slug} guide={guide} reviewMode={reviewMode} />)}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <p>{query.trim() ? `No guide matches “${query.trim()}”. Try another word or browse by outcome.` : level === "Expert" && outcome === "all"
              ? "Expert guides are being reviewed before they return. Choose Intermediate for the most advanced guides available now."
              : "No guide matches those filters yet."}</p>
            <button type="button" onClick={resetFilters}>Show all guides</button>
          </div>
        )}
      </section>
    </>
  );
}
