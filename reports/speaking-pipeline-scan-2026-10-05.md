# Speaking Pipeline — scan report

Date: 2026-10-05
Mode: `scan`

## Session guardrails observed

- **Canon guardrail:** this session's reality-check hook flagged `canon: queen-brain NOT in this session. Do not write any price, tier, offer status or customer-facing copy.` No fee figures or tier labels were written. The new target and the two contact updates below carry `est_value: pending` / no fee assertion, consistent with the pricing note already in `speaking-pipeline.md` and the prior scan's handling.
- **Content-OS context (CLAUDE.md):** `archive/` and `reports/` are evidence only; publication/scheduling stays manual; the DM responder stays paused. None of that applies directly to `scan` mode (no outreach sent, no publishing), but it bounds what this run is allowed to do — find and record, nothing more.
- **Vault note:** the reality-check hook also flagged 37 READY TO POST / 0 POSTED in the content vault — release, not production, is that pipeline's bottleneck. This run does not add to that backlog; the speaking pipeline is a separate CRM (biz-dev targets, not vault drafts) with its own stage model.

## Step 1 — prior briefings

No `prospecting-*.md` briefings exist anywhere in `reports/` (checked full directory listing). This is a standing gap, not new today — the 2026-09-21 scan hit the same no-op. Step 1 of the skill's scan mode remains a no-op until the `prospecting` skill actually runs and produces a briefing.

## Step 2 — dedupe

Grepped `speaking-pipeline.md` by org name before adding anything. Existing targets (unchanged by this step): GITEX Global 2026 (004), HRSE 2026 (003), CognitionX Emirates 2026 (002), Experts Live Emirates 2026 (001).

## Step 3 — fresh search (WebSearch; no Tavily/Apify MCP connected this session)

Queries run:
1. Dubai AI conference November December 2026 call for speakers corporate
2. GCC UAE corporate AI training workshop RFP 2026 request for speaker
3. Dubai women in tech leadership conference 2026 speaker application
4. `"World AI Technology Expo" Dubai 2026 "become a speaker" November`
5. HRSE "HR Summit & Expo" Dubai 2026 Informa Connect producer programme contact
6. CognitionX Emirates 2026 Sessionize organizer track chair contact

Plus WebFetch verification on: sessionize.com/aicd-dubai-2026, worldaiexpo.io (two pages), week.dub.ai → dubaifutureweek.com.

## Candidates found and disposition

| Candidate | Disposition | Reason |
|---|---|---|
| **Dubai Future Week 2026** (Dubai Future Foundation) | **Added — TARGET 005** | Government-backed, 18-21 Nov 2026, open "register to speak" portal. Theme (human experience, not vendor AI) is a strong positioning fit. Only a general inbox found, no named contact yet — flagged as next step. |
| AICD – Dubai 2026 (AI Community Days) | Rejected | Event date was 7 Feb 2026 — already in the past relative to today; CFP closed Dec 2025 anyway. |
| World AI Technology Expo Dubai | Rejected | Conflicting dates across sources: aggregator sites say 17-19 Nov 2026, but the organizer's own site (worldaiexpo.io) lists the actual Dubai edition as 07-09 April 2027. Not adding until the organizer's own page gives one consistent date — don't want a stale/wrong date in the CRM. Worth a follow-up scan closer to that window. |
| Women's leadership/tech events (WLEC, 21st Century Women's Leadership, WomenTech Global, TIWLC) | Rejected | All dated Feb-May 2026 — already past relative to today (2026-10-05), or virtual/global rather than Dubai-GCC. |

## Contact research on stalled existing targets (bonus — not a new target, but unblocks two)

TARGET 003 (HRSE) and TARGET 002 (CognitionX Emirates) are both dated 14-15 Oct 2026 — **9 days from this scan** — and have sat at `identified` with no named contact since 2026-09-21. Since both events are time-critical, this scan looked for named contacts rather than only searching for brand-new targets:

- **HRSE:** Natalie Diaz, Speakers and Content, Informa Connect — natalie.diaz@informa.com / +971 4 407 2601. Appended to TARGET 003 history, stage left at `identified` (scan mode does not draft or send pitches).
- **CognitionX Emirates:** Hazem Ali, founder/organizer, Microsoft AI MVP — reachable via LinkedIn (linkedin.com/in/drhazemali). Appended to TARGET 002 history, stage left at `identified`.

Both are now contact-complete and could move to `pitch` mode, but the 9-day runway makes them time-critical — see operator briefing.

## Not done this run

- No pitches drafted (out of scope for `scan`; also `pitch` mode requires loading brand brain and a fee band from canon, which this session doesn't have).
- No outreach sent — the skill never sends; she sends.
- `speaking-pipeline.md` structure (numbering, past history lines) left untouched; only new history lines appended and one new target added, per the append-only rule.
