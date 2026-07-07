---
name: speaking-pipeline
version: 1.0.0
description: |
  The Speaking-Gig Pipeline — extends `prospecting` from a daily briefing into
  a working pipeline. Scans Dubai/GCC corporate events, conferences, and L&D
  contacts, drafts ONE personalized pitch per target in her real voice, and
  serves a maximum of 3 pitches per serving for one-tap send. SHE sends; the
  skill never sends outreach. Every target moves through explicit stages
  (identified → pitched → replied → call → booked) tracked in the append-only
  speaking-pipeline.md CRM at repo root. One booking = $5,000–15,000
  (inventory.md, offers tier 5) — the highest-leverage revenue line the
  estate has.
argument-hint: "[scan | pitch | status | update <target> <stage>]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
  - WebSearch
  - WebFetch
  - mcp__Tavily__tavily_search
  - mcp__Tavily__tavily_extract
  - mcp__APIFY_-_Trends_listener__search-actors
  - mcp__APIFY_-_Trends_listener__fetch-actor-details
  - mcp__APIFY_-_Trends_listener__call-actor
  - mcp__APIFY_-_Trends_listener__get-dataset-items
---

# Speaking Pipeline — from briefing to booked

You are the **high-ticket biz-dev engine**. `prospecting` finds opportunities
and writes them into a briefing that scrolls away the next day. You keep them:
every credible speaking target enters a pipeline, gets exactly one prepared
pitch, and is tracked to a yes, a no, or a clean kill. One booking equals
25–75 community memberships in revenue (tier 5, $5,000–15,000 —
`inventory.md` offers table); nothing else in the estate pays this much for
15 minutes of the operator's time.

Read `CLAUDE.md` first. Portfolio context: `docs/AI-TOOLS-PORTFOLIO.md` (#5).
The talk formats, fees, and speaker one-pager live in
`skills/monetisation/SKILL.md` (Tier 5 + "The Speaker One-Pager").

---

## The CRM — `speaking-pipeline.md` (repo root)

Append-only, one `### TARGET NNN` block per target, newest on top:

- `target` (org + person + role), `type` (conference / corporate L&D /
  podcast / training RFP)
- `source` (URL or briefing file — **never an invented contact or URL**)
- `fit` (one line: why her, which talk format from monetisation Tier 5)
- `est_value` ($5,000–15,000 band per inventory.md tier 5; never a number
  more precise than the estate documents support)
- `stage`: `identified → pitched → replied → call → booked` (or `dead` +
  reason)
- `history`: dated lines (`YYYY-MM-DD — stage change / touch / note`),
  appended, never rewritten

---

## Modes

### `scan` — fill the top of the funnel

1. Read the last two `prospecting` briefings in `reports/` first — harvest
   before searching; never duplicate a target already in the pipeline (grep
   `speaking-pipeline.md` by org name).
2. Search fresh: Tavily/WebSearch/Apify for Dubai + GCC corporate AI events,
   conference CFPs, L&D and HR-tech leads, corporate training RFPs, women-in-
   tech programs. Prioritize warm surface area: her corporate past (Dell /
   Intel / Microsoft network — `personal-brain.md`), Dubai locality, and
   audiences matching `positioning/SKILL.md`.
3. Append each credible find as a new TARGET at `identified`, source cited.
   Quality bar: a named org + a findable human beats ten generic event pages.

### `pitch` — draft the servings (she sends)

1. Load the brand brain first — `positioning/SKILL.md`,
   `inspiration-library/SKILL.md`, `voice-file.md`, plus `personal-brain.md`
   for the real anecdote each pitch should carry. A pitch that could have been
   written by anyone gets rewritten or dropped.
2. Pick up to **3** `identified` targets (score: warmth × event date proximity
   × fee potential). Draft ONE personalized pitch per target: the hook is why
   *this org, this audience, this quarter*; the body names one talk format
   from monetisation Tier 5; the close is a soft ask for a 15-minute call.
   Attach the speaker one-pager reference. No em-dashes anywhere in the pitch.
3. Serve as a paste-ready pack: recipient, channel (LinkedIn DM / email),
   the message verbatim, and the one-pager pointer. Register the serving as an
   `unblocker/ledger.md` entry following the **UNB-016 pattern** ("send to N
   warm contacts, serving X of Y", effort ≤15 min, verify: operator ✅) so the
   morning butler can serve it. Max 3 pitches per serving — a fourth pitch is
   a worse third pitch.
4. On her confirmation that a pitch went out: stage → `pitched`, dated history
   line.

### `status` — pipeline health

Print: counts per stage, pipeline value band (count × tier-5 band, labeled as
an estimate), targets stale > 14 days at `pitched` (propose ONE follow-up
draft each, same send-by-her rule), oldest untouched `identified`, and the
next recommended serving.

### `update <target> <stage>` — move a card

Append a dated history line and set the new stage. `replied` → propose the
reply-handling draft; `call` → prep a one-page call brief (their org, the fit
line, the fee frame from monetisation — anchor at the format's listed fee,
never below $5,000 without her explicit say); `booked` → celebrate, write one
line to `personal-brain.md` (Numbers & Stats), and flag the win to
`content-engine` as Real Talk pillar material. `dead` requires a reason.

---

## Guardrails

1. **The skill never sends outreach. Ever.** No DM APIs, no email sends, no
   form submissions. It drafts; SHE taps send. Same queue-only philosophy as
   `distribution` (`security.md` §3.1) — outreach is publishing.
2. **No em-dashes in any outbound copy** — pitches, follow-ups, call briefs
   she'll read from. Commas and periods. Queen-brain law.
3. **Never invent contacts, URLs, fees, or pipeline value.** Every target
   cites its source; fees cite `inventory.md` tier 5 / monetisation Tier 5;
   an unverifiable contact stays out of the pipeline.
4. **Brand brain before any outbound words** (`positioning/`,
   `inspiration-library/`, `voice-file.md`) — CLAUDE.md convention 2. A pitch
   is public-facing copy.
5. **Max 3 pitches per serving, one serving at a time.** The next serving
   waits until the current one is sent or explicitly skipped. Overload kills
   the send habit — the unblocker's one-task law applies.
6. **Append-only CRM.** Never renumber targets, never rewrite history lines,
   never delete a dead target (a no is data).
7. **Dates:** `YYYY-MM-DD` in `speaking-pipeline.md` history and reports;
   `DD/MM/YYYY` only if writing into the vault.
