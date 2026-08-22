"use client";

import { useMemo, useState } from "react";
import { GuideCard } from "./guide-card";
import {
  guideHubs,
  guideLevels,
  guideOutcomes,
  type Guide,
  type GuideLevel,
  type GuideOutcome,
} from "@/content/guides";

type LevelFilter = "all" | GuideLevel;
type OutcomeFilter = "all" | GuideOutcome;

const levelDescriptions: Record<GuideLevel, string> = {
  Beginner: "Understand the basics, choose a tool and get your first useful result.",
  Intermediate: "Improve your work, connect repeatable steps and build reliable workflows.",
  Expert: "Design advanced agents and operating systems with clear human control.",
};

const outcomeDescriptions: Record<GuideOutcome, string> = {
  "Understand AI": "Learn the ideas and language without technical detours.",
  "Choose an AI tool": "Compare the tools and pick the right one for the work.",
  "Get better answers": "Ask clearly, add context and improve what AI gives you.",
  "Create content": "Turn ideas and research into work you can publish.",
  "Automate a task": "Connect repeatable steps and remove avoidable manual work.",
  "Build an agent": "Give AI a goal, tools and clear limits for multi-step work.",
  "Run business operations": "Keep routine business work moving with less supervision.",
};

const outcomeHubs: Record<GuideOutcome, (typeof guideHubs)[number]> = {
  "Understand AI": "AI essentials",
  "Choose an AI tool": "AI tools",
  "Get better answers": "Better prompts and answers",
  "Create content": "Content and creative work",
  "Automate a task": "Workflows and automation",
  "Build an agent": "AI agents",
  "Run business operations": "Business operations",
};

const startHereSlugs = ["what-is-ai", "ai-jargon-guide", "what-is-a-prompt", "what-is-agentic"];

function scrollToLibrary() {
  window.requestAnimationFrame(() => {
    document.getElementById("all-guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function GuideLibrary({ guides }: { guides: Guide[] }) {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [outcome, setOutcome] = useState<OutcomeFilter>("all");
  const [query, setQuery] = useState("");

  const featured = guides.find((guide) => guide.slug === "which-ai-tool-for-what") ?? guides[0];
  const startHere = startHereSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is Guide => Boolean(guide));

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesLevel = level === "all" || guide.level === level;
      const matchesOutcome = outcome === "all" || guide.outcomes.includes(outcome);
      const searchableText = [
        guide.title,
        guide.summary,
        guide.level,
        guide.hub,
        ...guide.outcomes,
        ...guide.tags,
      ].join(" ").toLowerCase();

      return matchesLevel && matchesOutcome && (!search || searchableText.includes(search));
    });
  }, [guides, level, outcome, query]);

  const resultLabel = level !== "all"
    ? `${level} guides`
    : outcome !== "all"
      ? outcome
      : query.trim()
        ? "Search results"
        : "All guides";

  function chooseLevel(value: LevelFilter) {
    setLevel(value);
    setOutcome("all");
    scrollToLibrary();
  }

  function chooseOutcome(value: OutcomeFilter) {
    setOutcome(value);
    setLevel("all");
    scrollToLibrary();
  }

  return (
    <>
      <section className="guides-hero" aria-labelledby="guides-title">
        <div className="guides-hero__copy">
          <p className="eyebrow">The guide library</p>
          <h1 id="guides-title">Learn AI at your level. <em>Get something done.</em></h1>
          <p>Start with the basics or go straight to the task, tool or system you need today.</p>
          <div className="hero-search">
            <label htmlFor="guide-search">What do you want help with?</label>
            <span className="hero-search__field">
              <input
                id="guide-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => {
                  setLevel("all");
                  setOutcome("all");
                }}
                type="search"
                placeholder="Try prompts, Claude, inbox or agents"
                autoComplete="off"
              />
              <a href="#all-guides" aria-label="See matching guides">Search</a>
            </span>
          </div>
        </div>
        {featured && (
          <div className="guides-hero__feature" aria-label="Featured guide">
            <GuideCard guide={featured} featured />
          </div>
        )}
      </section>

      <section className="level-nav" aria-labelledby="level-title">
        <div className="level-nav__head">
          <p className="eyebrow">Choose your level</p>
          <h2 id="level-title">Start where you are.</h2>
          <p>You do not need to follow every guide. Pick the level that matches the work you are ready to do.</p>
        </div>
        <div className="level-nav__grid" role="group" aria-label="Filter guides by experience level">
          {guideLevels.map((item, index) => {
            const count = guides.filter((guide) => guide.level === item).length;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={level === item}
                onClick={() => chooseLevel(item)}
              >
                <span className="level-nav__number">0{index + 1}</span>
                <span className="level-nav__name">{item}</span>
                <span className="level-nav__description">{levelDescriptions[item]}</span>
                <span className="level-nav__action">See {count} {count === 1 ? "guide" : "guides"} <span aria-hidden="true">→</span></span>
              </button>
            );
          })}
        </div>
      </section>

      {startHere.length > 0 && (
        <section className="start-here" aria-labelledby="start-here-title">
          <div className="start-here__head">
            <p className="eyebrow">New to AI?</p>
            <h2 id="start-here-title">Start here.</h2>
            <p>Four short guides in the order that makes the rest easier.</p>
          </div>
          <ol className="start-here__steps">
            {startHere.map((guide, index) => (
              <li key={guide.slug}>
                <a href={`/guides/${guide.slug}.html`}>
                  <span>0{index + 1}</span>
                  <strong>{guide.title}</strong>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="hub-nav" aria-labelledby="hub-title">
        <div className="hub-nav__head">
          <p className="eyebrow">Go straight to the result</p>
          <h2 id="hub-title">What do you need to do?</h2>
          <p>Choose an outcome and see only the guides that help you reach it.</p>
        </div>
        <div className="hub-nav__grid" role="group" aria-label="Filter guides by outcome">
          {guideOutcomes.map((item) => {
            const count = guides.filter((guide) => guide.outcomes.includes(item)).length;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={outcome === item}
                onClick={() => chooseOutcome(item)}
              >
                <span className="hub-nav__hub">{outcomeHubs[item]}</span>
                <span className="hub-nav__title">{item}</span>
                <span>{outcomeDescriptions[item]}</span>
                <strong>{count} {count === 1 ? "guide" : "guides"} <span aria-hidden="true">→</span></strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className="library" id="all-guides" aria-labelledby="library-title">
        <div className="library__head">
          <div>
            <p className="eyebrow">Browse the library</p>
            <h2 id="library-title">{resultLabel}</h2>
            <p>Open any card to read the guide. Use the filters to change direction at any time.</p>
          </div>
          <button
            className="library__reset"
            type="button"
            onClick={() => {
              setLevel("all");
              setOutcome("all");
              setQuery("");
            }}
            disabled={level === "all" && outcome === "all" && !query}
          >
            Show all guides
          </button>
        </div>

        <div className="library__active-filters" aria-label="Current guide filter">
          <button type="button" aria-pressed={level === "all" && outcome === "all"} onClick={() => chooseLevel("all")}>All guides</button>
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
          {visible.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <p>No guide matches that search yet.</p>
            <button
              type="button"
              onClick={() => {
                setLevel("all");
                setOutcome("all");
                setQuery("");
              }}
            >
              Show all guides
            </button>
          </div>
        )}
      </section>
    </>
  );
}
