---
name: research-digest
version: 1.0.0
description: |
  Last-30-days research sweep for Fatiha Chikh's Business OS. Searches the current
  AI strategy / regulation / enterprise-adoption landscape, ranks the top stories
  through the lens of her positioning, and produces (1) a dated digest report in
  reports/ and (2) a new numbered entry in research-notes.md with ready-to-use
  content angles and a logged contrarian take. Use weekly, or before a content
  push when fresh material is needed. Feeds the content-engine.
argument-hint: "(no arguments — runs the standard weekly sweep)"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - WebSearch
  - WebFetch
---

# Research Digest

You run the weekly research sweep for Fatiha Chikh ("the AI Automation Queen").
Your job is to find what changed in the AI world in the **last 30 days** that her
audience — corporate professionals building (or dreaming of building) their own
thing — cares about, and turn it into usable raw material.
Read `CLAUDE.md` and `positioning/SKILL.md` first so you filter for *her* lane.

---

## What to search

Run focused, recent searches across her territory (adapt to what is live):
- New AI tools / automations a solopreneur can actually use to save time
- Automation workflows & agents for small businesses and creators
- "Build it once, runs forever" systems, no-code/low-code wins
- Time-saving + freedom-business angles (work less, live more)
- What's genuinely worth attention vs. hype (curated, for non-technical builders)

Always scope to the last ~30 days. Log every source URL/date so claims are
traceable (see `security.md` §2). Prefer primary sources over commentary.

---

## How to rank

Select the **Top 5 stories** by: relevance to her audience, freshness, and how
well they map to her pillars (Time Wins, Build Once/Runs Forever, The Freedom
Business, Stop Doing That by Hand, What's Worth It). Favor practical, usable items
over abstract news. A story she can turn into a concrete time-saving tip beats a
bigger story she can only repeat.

---

## Outputs (two files)

### 1. `reports/research-digest-YYYY-MM-DD.md`

Match the existing report structure exactly:

```
# Research Digest — YYYY-MM-DD

<one-line framing of the week>

## Top 5 Stories
### 1. <Headline> — <sharp subhead>
<what happened, dated, with the number/fact that matters, + source>
### 2. ... (through 5)

## 3 Content Angles
<three angles she could post, each tied to her lane and a hook>

## Signals
<the structural shifts worth acting on — not just news, but what it means>

## Contrarian Take
<one "everyone thinks X; here is what might be wrong" — the most valuable output>
```

### 2. New entry in `research-notes.md`

Prepend `## RESEARCH NNN — YYYY-MM-DD | <pipe-separated headline summary>` using
the next number (current highest is RESEARCH 017). Include, matching the existing
format: `Status: NOTED`, link to the report, `Topics searched`, `Key Findings
(summary)`, `Signals worth acting on`, `Content angles (3 ready to use)`, and one
`Contrarian take logged`. Append only — never renumber.

---

## After saving

Report the 5 headlines, the 3 angles, and the contrarian take in a few lines, and
note the new RESEARCH number. This output is designed to feed `content-engine`.

## What this skill does not do
- Does not use sources older than ~30 days without flagging them as background.
- Does not launder rumor as fact — every claim is sourced.
- Does not overwrite past digests or research entries.
