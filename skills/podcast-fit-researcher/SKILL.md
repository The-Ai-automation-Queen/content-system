---
name: podcast-fit-researcher
description: The moat step of the podcast-guesting pipeline. Takes prefiltered shows and researches each one (host, audience size, cross-platform reach, ICP overlap, booking route) against the target listening profile. Produces the structured fit data the pitch-builder needs. Use after rss-scraper, before pitch-builder.
---

# Podcast Fit Researcher

The highest-value skill in the pipeline. The scrape and the write are
commodity. This is where judgment lives. Do this well or the whole pipeline
is noise.

## Read first (every run)

- `departments/product/3-build/podcast-guesting/context/target-listening-profile.md`
- `departments/product/3-build/podcast-guesting/context/show-qualification-criteria.md`

These define who counts and what the bar is. Do not infer it from memory.

## Step 1 — cheap prefilter (deterministic, no research)

Merge each discovery row with its rss-scraper facts, then:

```
echo '<merged json list>' | py scripts\prefilter.py
```

Survivors only proceed. Dropped shows are recorded with a reason and never
researched. Filter early, research little.

## Step 2 — research each survivor (judgment + web tools)

For each survivor, use web search / tavily / browse to establish:

| Field | How to get it |
|-------|---------------|
| `host` | show page, about page, LinkedIn |
| `audience_estimate` | downloads-per-episode if public, else YouTube subs, else newsletter size, else "unknown - low confidence" |
| `reach_platforms` | which of LinkedIn / Instagram / X / YouTube / newsletter the host is genuinely strong on |
| `icp_overlap` | judge against target-listening-profile.md: HIGH (clearly her women-in-business / founder / women's-leadership / faith-meets-business / multilingual audience), MEDIUM (mixed), LOW (wrong audience) |
| `host_stance` | practitioner who does the work, or performer / hype / tool-demo |
| `booking_route` | guest form URL, host email, agency, or a warm path; "none found" if none |
| `language` | EN / FR / ES / AR |

Never invent a number. If audience size is not findable, say
`"unknown - low confidence"`. The pitch-builder is allowed to tier on
unknowns; it is not allowed to receive a fabricated number.

## Step 3 — apply automatic disqualifiers

Drop (do not pass on) any show that hits an automatic disqualifier in
`show-qualification-criteria.md` (audience mostly men / technical / under 30,
tutorial format, hype framing, no contact route). Record the reason.

## Output

JSON list, one object per surviving researched show:

```
{
  "show_name", "rss_url", "host", "audience_estimate",
  "reach_platforms": [...], "icp_overlap": "HIGH|MEDIUM|LOW",
  "host_stance": "practitioner|performer", "booking_route",
  "language", "research_notes": "1-2 lines, sourced",
  "disqualified": false
}
```

Hand to `podcast-pitch-builder`. This skill never writes copy and never
contacts anyone. It produces facts only.
