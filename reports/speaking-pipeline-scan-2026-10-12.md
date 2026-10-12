# Speaking Pipeline — scan report

Date: 2026-10-12
Mode: `scan`

## Session guardrails observed

- **Canon guardrail:** this session's reality-check hook flagged `canon: queen-brain NOT in this session. Do not write any price, tier, offer status or customer-facing copy.` No fee figures or tier labels were written. The three new targets and the two escalation notes below carry `est_value: pending` / no fee assertion, consistent with the pricing note already in `speaking-pipeline.md`.
- **Content-OS context (CLAUDE.md):** `archive/` and `reports/` are evidence only; publication/scheduling stays manual; the DM responder stays paused. None of that applies directly to `scan` mode (no outreach sent, no publishing), but it bounds what this run is allowed to do — find and record, nothing more.
- **Vault note:** the reality-check hook also flagged 37 READY TO POST / 0 POSTED in the content vault — release, not production, is that pipeline's bottleneck. This run does not touch the vault; the speaking pipeline is a separate CRM with its own stage model.
- **Queue-only / security.md:** no outreach was sent or drafted. This skill drafts, she sends — same rule as `distribution`'s queue-only publishing (`security.md` §3.1).

## Step 1 — prior briefings

No `*-prospecting.md` files exist anywhere in `reports/` (checked full directory listing again). Standing gap since 2026-09-21 and 2026-10-05 — still a no-op until the `prospecting` skill actually runs.

## Step 2 — dedupe

Grepped `speaking-pipeline.md` by org name before adding anything. Existing targets (unchanged by this step): Dubai Future Week 2026 (005), GITEX Global 2026 (004), HRSE 2026 (003), CognitionX Emirates 2026 (002), Experts Live Emirates 2026 (001). None of today's new finds overlap.

## Step 3 — fresh search (WebSearch + WebFetch; no Tavily/Apify MCP connected this session)

Queries run:
1. Dubai AI conference November December 2026 call for speakers corporate
2. GCC UAE corporate AI training workshop RFP 2026 request for speaker
3. Dubai women in tech leadership conference 2026 speaker application
4. Dubai HR L&D AI upskilling corporate training RFP 2026
5. `"call for speakers" Dubai AI 2026 corporate training women leadership -sessionize`
6. AINext Awards Conference Dubai 2026 dates organizer speaker

Plus WebFetch verification on: zawya.com (Communicate AI Conference), dubaiaifestival.com, worldaiexpo.io/virtual-ai-conference, dubai.stepconference.com → stepconference.com/dubai/2027, ainextconference.com (+ its dubai.* redirect), yourdubaiguide.com (WE Convention).

## Candidates found and disposition

| Candidate | Disposition | Reason |
|---|---|---|
| **AINext Awards & Conference Dubai 2026** | **Added — TARGET 006** | Active "Apply to speak" CFP, named organizer (Anas Jawed, CEO, Next Business Media) + email, strong AI-governance/enterprise-transformation fit. Event is 22 Oct 2026 — 10 days out, highly time-critical. |
| **World AI Technology Expo Dubai / AI Conference Dubai** | **Added — TARGET 007** | Resolves the date conflict flagged in the 2026-10-05 scan: the organizer's own site (worldaiexpo.io) confirms the Dubai edition is 07-09 Apr 2027, not Nov 2026 as some aggregators claimed. Active speaker-registration page, general org contact (Golden Tree Events LLC). Long runway (~6 months), low urgency. |
| **Dubai AI Festival 2026** | **Added — TARGET 008** | Government-backed (Dubai AI Campus / DIFC, under HH Sheikh Hamdan's directives), 26-27 Oct 2026, 2 weeks out. No open CFP found, only a general enquiry form — same contact gap as TARGET 005 (Dubai Future Week). Added on strength of audience/positioning fit; needs a named contact before `pitch`. |
| Communicate AI Conference 2026 | Rejected | Already occurred (29 Sep 2026, before today); no CFP — curated industry-leader speaker lineup only. |
| Step Dubai Conference | Rejected | Redirects to the 2027 edition (3-4 Feb 2027) — too far out, no CFP open ("speaker lineup being curated"), no named contact, only a "Refer a Speaker" link. |
| WE Convention (Women's Empowerment Convention) Dubai 2026 | Rejected | 28-29 Nov 2026, but no organizer name, no CFP process found, and the speaker tier (Anna Wintour, Maye Musk in past editions) is a celebrity-circuit mismatch for a cold pitch. |
| AICD – Dubai 2026, Dubai Summit Microsoft D365 AI ERP Conference | Rejected (re-confirmed) | Both CFPs closed; same disposition as prior scans. |
| WLEC, Middle East Women Leaders Summit & Awards, Global Women Leaders Conference | Rejected | All dated before or essentially concurrent with today (2026-10-12) relative to this scan, or insufficiently AI/L&D-specific — same pattern as prior scans' rejections. |

## Escalation — two existing targets are now 2-3 days from their event

TARGET 003 (HRSE, Natalie Diaz, Informa Connect) and TARGET 002 (CognitionX Emirates, Hazem Ali) were both contact-complete as of the 2026-10-05 scan, with their event dated 14-15 Oct 2026. Seven days have now passed with no pitch sent. Both are flagged in `speaking-pipeline.md` with a dated history line: they are 2-3 days from the event and will need a pitch in the next day or two, or should be marked `dead` (event-passed) at the next scan if the window closes unused.

## Not done this run

- No pitches drafted (out of scope for `scan`; also `pitch` mode requires loading brand brain and a fee band from canon, which this session doesn't have).
- No outreach sent — the skill never sends; she sends.
- `speaking-pipeline.md` structure (numbering, past history lines) left untouched; only new history lines appended and three new targets added, per the append-only rule.
