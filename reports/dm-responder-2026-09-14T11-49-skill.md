# DM Responder (M05) — Monitor Run

**Date:** 2026-09-14T11:49 UTC
**Mode:** end-to-end monitor + registry-integrity + live URL verification (queue-only; no posting, no DMs sent, no writes to the registry or vault)
**Run by:** Claude agent (operator-requested skill invocation, this session)
**Prior run:** `dm-responder-2026-09-14T11-41-skill.md`, 8 minutes earlier. Read for continuity only, never trusted as fact (security §4). Every fact below was re-verified live this run, not copied forward.

---

## Headline finding (new this run): every active resource_url is dead — verified live

This run went one step further than prior monitor passes and actually fetched the
resource URLs the registry hands out, instead of only checking the registry/vault
for internal consistency. Result: **the URL pattern used by all 8 `active=yes`
rows in `lead-magnets.csv` no longer delivers the promised resource.**

**The chain, confirmed with two live HTTP fetches:**

1. Every active row's `resource_url` is `https://guides.shiftandlead.com/opt-in.html?guide=<slug>`.
2. `site/vercel.json` 308-redirects `/opt-in.html` → `https://www.shiftandlead.com/opt-in.html` (query string preserved — confirmed via fetch of `guides.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack`, which returned a 308 to `www.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack`).
3. `main-site/vercel.json` then 308-redirects `/opt-in.html` → `/guides/` **unconditionally** (`main-site/vercel.json`, source `/opt-in.html`, destination `/guides/`) — this rule fires regardless of query string and the destination (`/guides/`) does not read a `?guide=` param. Confirmed by fetching `www.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack` and `?guide=what-is-ai`: both landed on the generic "Free AI guides for real work" directory page listing all 20 guides — not the specific promised resource, no guide-specific copy, no pre-filled gate.
4. The `main-site/opt-in.html` file on disk still contains a full per-guide JS renderer (`GUIDES` lookup, dynamic title/chip/bullets, hidden `guide` field posting to the old n8n Formspree webhook `auto.shiftandlead.com/webhook/formspree-lead`) — but it is **dead code**. Vercel's redirect rule intercepts `/opt-in.html` before that file is ever served in production.

**So every comment-keyword reply currently sends the subscriber to a generic
guide directory, not the specific resource the CTA promised** — for all 7
vault CTA keywords with an `active=yes` row (STACK, FOLLOW UP, TEAM, WHAT,
DIFF, PROMPT, WORDS, INBOX).

**Split by what's actually recoverable, checked per-slug:**

- **WHAT, PROMPT, WORDS** — the real guide page works correctly and already has
  its own live email-capture gate. Confirmed by fetching
  `www.shiftandlead.com/guides/what-is-ai.html` directly: it shows intro
  content, then a "Continue this guide" gate (first name + email + consent,
  button "Open the rest of the guide") — this is the current
  `GuideAccessBoundary` → `/api/guide-capture` → Lumail system per
  `docs/GUIDE-EMAIL-GATE-CONTRACT.md`, and it is live. **Fix is mechanical:**
  point `resource_url` straight at `.../guides/<slug>.html` instead of
  `.../opt-in.html?guide=<slug>`.
- **STACK, FOLLOW UP, TEAM, INBOX** — no live page exists to point to. The
  original pages were archived 2026-07-28 during the site consolidation
  (`_archive/2026-07-28-pre-consolidation/site/guides/`) and never rebuilt
  under `main-site/guides/`. The content exists as unpublished entries in
  `next-app/content/guides.json` (slugs `stack-3-tool-ai-stack`,
  `follow-up-setup`, `first-ai-employee`, `inbox-manager-setup` are all
  defined there) but none of the four are in `data/guide-publication.json`'s
  approved list and none have a built HTML page in `main-site/guides/`. These
  need real publication work, not a URL edit — flagging, not inventing a URL
  (skill rule + CLAUDE.md engine law 2).
- **DIFF** — doubly dead. Beyond the opt-in.html redirect, the guide page
  itself now redirects: fetching `www.shiftandlead.com/guides/chatgpt-vs-ai.html`
  returned only "This guide merged into What AI Is," no gate, no content. The
  registry's DIFF row should probably just be retired in favor of WHAT, since
  that's where the content lives now — operator call, not made here.

**Not fixed in this run.** Editing `lead-magnets.csv` URLs or vault CTAs is an
operator/Codex fulfilment decision per this skill's scope and prior-run
precedent, not this skill's call — same boundary applied to the PIPELINE
finding below. Flagging loudly instead, since this is the core "reach vs
revenue" leak M05 exists to catch (SKILL.md: "a leak — flag it loudly"), and
it is currently live for every active keyword, not a hypothetical.

## Finding (carried over, still open): ENTRY 084 CTA points at a retired keyword

`content-vault.md:486` — ENTRY 084 ("How to Build a Content System That Posts
for You Every Week," LinkedIn, READY TO POST) tells readers to "Comment
PIPELINE," but `lead-magnets.csv` row 8 marks PIPELINE `active=no`, retired
05/07/2026 (blank `active` value, not `yes`). No URL exists and none is
invented here (skill rule + CLAUDE.md engine law 2). Unresolved since at
least 2026-09-14T11:30. Options unchanged: (a) repoint the CTA to TEAM or
STACK (note: STACK itself is currently dead per the finding above — WHAT or
PROMPT are the only active keywords with a genuinely working resource_url
right now), or (b) restore the pipeline resource and flip the registry row.

## Registry / vault cross-check (routine)

- `lead-magnets.csv` fresh read: 15 keyword rows, 8 marked `active=yes`
  (STACK, FOLLOW UP, TEAM, WHAT, DIFF, PROMPT, WORDS, INBOX), 7 `active=no`
  or blank. Unchanged from prior run.
- Every `comment <KEYWORD>` CTA in `content-vault.md` still maps to a
  registry row: CLAUDE, DINNER (substituted with TEAM in-entry, known gap),
  FOUNDING, FREEDOM, PIPELINE, PROMPT, STACK, TEAM, WHAT, WORDS, INBOX. No
  new unregistered keyword this run.
- `active=no` rows re-checked against their entries' post-readiness: CLAUDE
  (ENTRY 011, DRAFT — safe), FOUNDING (ENTRY 015, DRAFT — safe), FREEDOM
  (ENTRY 012, DRAFT — safe). No new leak of this kind.

## Platform connection status (routine)

No `GHL_API_KEY` / `FB_PAGE_TOKEN` / `YOUTUBE_API_KEY` / `UNIPILE_API_KEY` /
`UNIPILE_DSN` in this session's environment. No GHL or Blotato integration
reachable from this session's tools. No comment/DM stream is monitorable and
no reply/DM can be sent from this session by any method — unchanged from
every prior run.

## Leads

**0 leads captured this run.** `reports/leads-*.md` and
`reports/dm-misses-*.md` still do not exist anywhere in the repo — 0 leads
captured, ever, across this skill's history. No comment stream is reachable
from this session regardless of registry/URL state.

## What this run did not touch

`lead-magnets.csv`, `content-vault.md`, `main-site/vercel.json`,
`main-site/opt-in.html` — none edited. Two read-only `WebFetch` calls hit
live production URLs (`guides.shiftandlead.com/opt-in.html?guide=...`,
`www.shiftandlead.com/opt-in.html?guide=...`, `www.shiftandlead.com/guides/what-is-ai.html`,
`www.shiftandlead.com/guides/chatgpt-vs-ai.html`) — GET requests only, no
forms submitted, no data written to Lumail or any CRM.

---

## Operator briefing

**New leads today:** 0.

**Top-converting keyword:** none — 0 leads have ever been captured across
every dm-responder run in this repo's history.

**Vault keyword without a registry row:** none new. DINNER remains a known,
already-substituted gap (`content-vault.md:1646`).

**Platform connection status:** unchanged — no GHL / Facebook / YouTube /
Unipile keys anywhere this session can reach. Comment streams cannot be
monitored and no DM can be sent from here regardless of the finding below;
this loop needs operator setup before it runs live at all.

**The one thing to act on — and it's bigger than a monitoring note:** every
active DM-responder resource link is currently broken in production. A
subscriber commenting STACK, FOLLOW UP, TEAM, WHAT, DIFF, PROMPT, WORDS, or
INBOX today and clicking the DM link lands on the generic 20-guide directory,
not the resource promised in the post. This was verified live via WebFetch
against `guides.shiftandlead.com` and `www.shiftandlead.com`, not inferred
from stale registry notes. Two different fixes are needed:
1. **Quick win:** repoint WHAT, PROMPT, WORDS `resource_url`s in
   `lead-magnets.csv` from `.../opt-in.html?guide=<slug>` to
   `.../guides/<slug>.html` — those pages are live and gated correctly today.
2. **Real work:** STACK, FOLLOW UP, TEAM, INBOX have no live page at all
   (archived 2026-07-28, unpublished in `next-app/content/guides.json`) —
   these need actual (re)publication before their keyword can honestly stay
   `active=yes`. Until then, every published post carrying those four CTAs is
   making a promise the funnel can't currently keep — a bigger version of the
   already-flagged PIPELINE leak.

No comments were replied to, no leads captured, no messages sent, no forms
submitted, and nothing was posted, queued, or edited this run — audit-only,
consistent with the skill's boundaries and the queue-only/human-in-the-loop
engine law.
