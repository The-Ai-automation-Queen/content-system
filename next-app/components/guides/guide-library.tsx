"use client";

import { useMemo, useState } from "react";
import { GuideCard } from "./guide-card";
import type { Guide, GuideTrack } from "@/content/guides";

const filters: Array<{ label: string; value: "all" | GuideTrack }> = [
  { label: "All guides", value: "all" },
  { label: "Learn", value: "understand" },
  { label: "Build", value: "setup" },
  { label: "Choose tools", value: "tools" },
];

export function GuideLibrary({ guides }: { guides: Guide[] }) {
  const [filter, setFilter] = useState<"all" | GuideTrack>("all");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => guides.filter((guide) => {
    const matchesTrack = filter === "all" || guide.track === filter;
    const text = `${guide.title} ${guide.summary}`.toLowerCase();
    return matchesTrack && text.includes(query.trim().toLowerCase());
  }), [filter, guides, query]);

  return (
    <section className="library" id="library" aria-labelledby="library-title">
      <div className="library__head">
        <div>
          <h2 id="library-title">Browse the library.</h2>
          <p>Find the next useful answer without collecting another pile of noise.</p>
        </div>
        <label className="search">
          <span>Search guides</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try: prompts, inbox, Claude" />
        </label>
      </div>
      <div className="filters" role="group" aria-label="Filter guides">
        {filters.map((item) => (
          <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">{visible.length} {visible.length === 1 ? "guide" : "guides"}</p>
      <div className="guide-grid">
        {visible.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
      </div>
      {visible.length === 0 && <p className="empty-state">No guide matches that search yet.</p>}
    </section>
  );
}
