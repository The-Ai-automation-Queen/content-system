# Research → Content Automation Harness

This is the operating layer between the private `The-Ai-automation-Queen/research-inbox` repository and the public/content-facing `content-system` repository.

## Purpose

Turn raw saved research into deliberate editorial and commercial decisions without turning every interesting link into content.

The pipeline is:

`research-inbox → triage → cluster → route → evidence check → brief → draft → QA → draft PR → human approval → merge → production QA`

The research inbox is read-only. Never edit, delete, move or rename source captures from this harness.

## Core rule

The router asks **"What is the highest-value use of this research?"**, not **"Can this become a guide?"**.

Valid routes are:

- `guide_open`
- `lead_magnet`
- `linkedin`
- `carousel`
- `paid_quick_win`
- `specialist_product`
- `ai_business_os`
- `workshop`
- `corporate`
- `research_more`
- `archive`

`archive` and `research_more` are successful outcomes. The system is allowed to do nothing publicly.

## Safety boundary

The automation may:

- read new research commits and capture files;
- write/update internal queue/state/report files;
- create content architecture briefs;
- create branches and **draft pull requests** for guides, lead magnets and site changes;
- run QA against a draft/PR;
- verify production after a human-approved merge.

The automation may **not**:

- merge its own guide/product PRs;
- publish directly to production;
- invent claims, numbers, URLs, quotes or product availability;
- create a paid product/price/checkout link that is not already approved and live;
- turn a single weak or experimental source into a definitive guide;
- change the research inbox.

## State model

`state/research-cursor.json` is the source of truth for incremental runs.

During bootstrap, the system analyses only recent high-signal research from `bootstrap_since`; it does not chew the full historical inbox. After bootstrap, the watcher processes commits newer than `last_seen_commit`.

All operations must be idempotent. A source commit/file already listed in `processed_source_ids` must not be re-added to the triage queue.

## Queues

- `queues/triage.json` — new items waiting for editorial triage.
- `queues/clusters.json` — durable topic clusters with evidence/source references.
- `queues/opportunities.json` — scored opportunities and their proposed routes.
- `queues/approved.json` — human-approved briefs ready for draft production.

Do not use queue position as editorial priority. Use the score, hard blockers, source quality and active business priorities.

## Scoring

See `config/pipeline.json`. Scores are guidance, not permission to publish.

A high score cannot override a hard blocker such as weak evidence, unsupported claims, duplicate coverage, stale version-specific instructions, pure tool hype or poor audience fit.

## Guide funnel model

Public education remains open:

`OPEN GUIDE → CONTEXTUAL COMPANION ASSET (EMAIL) → RELEVANT NEXT STEP → PAID IMPLEMENTATION`

The guide itself is not email-gated. The email exchange must unlock something genuinely useful: a canvas, checklist, scorecard, template, calculator, worksheet or personalised result.

The AI Insider Brief is currently paused and must not be used as the generic acquisition CTA.

## Editorial guide law

Every guide follows:

`ANSWER → SEE IT → TRY IT → USE IT → GO FURTHER`

Titles are outcome-first. The reader should understand the benefit in under 3 seconds.

Visuals must explain a relationship, sequence, comparison, decision or transformation. Decorative hero images are rejected.

GSAP is progressive enhancement. Three.js is allowed only when spatial interaction materially improves understanding.

## Bootstrap

Initial bootstrap date: `2026-08-06`.

The first Daily Editorial Factory run should process recent commits from that date through the current `last_seen_commit`, cluster them and mark `bootstrap_status` complete. The hourly watcher only handles commits newer than `last_seen_commit` so it does not duplicate bootstrap work.

## Human approval

A full guide or commercial asset is delivered as a **draft PR**. Human review is the gate. The automation can fix QA failures on its branch, but it does not merge itself.

## Deployment discipline

Internal automation commits should not burn Vercel build quota. Vercel project configs use an ignored-build step so changes limited to internal automation/skills/reports are skipped. Site, build-script, shared design/data and actual public-content changes still build normally.
