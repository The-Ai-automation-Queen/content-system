# Speaking Pipeline — scan report

Date: 2026-10-19
Mode: `scan`

## Session guardrails observed

- **Canon guardrail:** this session's reality-check hook flagged `canon: queen-brain NOT in this session. Do not write any price, tier, offer status or customer-facing copy.` No fee figures or tier labels were written. The two new targets and all history lines below carry `est_value: pending` / no fee assertion, consistent with the pricing note already in `speaking-pipeline.md`.
- **Content-OS context (CLAUDE.md):** `archive/` and `reports/` are evidence only; publication/scheduling stays manual; the DM responder stays paused. None of that applies directly to `scan` mode (no outreach sent, no publishing), but it bounds what this run is allowed to do — find and record, nothing more.
- **Vault note:** the reality-check hook also flagged 37 READY TO POST / 0 POSTED in the content vault — release, not production, is that pipeline's bottleneck. This run does not touch the vault; the speaking pipeline is a separate CRM with its own stage model.
- **Queue-only / security.md:** no outreach was sent or drafted. This skill drafts, she sends — same rule as `distribution`'s queue-only publishing (`security.md` §3.1).

## Step 1 — prior briefings

No `*-prospecting.md` files exist anywhere in `reports/` (checked full directory listing). Standing gap since 2026-09-21, 2026-10-05 and 2026-10-12 — still a no-op until the `prospecting` skill actually runs.

## Step 2 — dedupe

Grepped `speaking-pipeline.md` by org name before adding anything. Existing targets (unchanged by this step except where noted below): Experts Live Emirates (001), CognitionX Emirates (002), HRSE (003), GITEX Global (004), Dubai Future Week (005), AINext (006), World AI Technology Expo Dubai (007), Dubai AI Festival (008). None of today's new finds overlap these.

## Step 3 — fresh search (WebSearch + WebFetch; no Tavily/Apify MCP connected this session)

Queries run:
1. Dubai AI conference November 2026 "call for speakers" corporate
2. GCC UAE corporate training RFP 2026 AI upskilling L&D request for proposal
3. Dubai women in tech AI leadership conference December 2026 speaker application
4. AINext Awards Conference Dubai 2026 Anas Jawed speaker (re-verify)
5. dubaiaifestival.com speaker contact programming 2026 (re-verify)
6. "AI Conference Dubai" "Millennium Airport Hotel" November 2026 organizer call for speakers
7. Machines Can See 2026 Dubai summit Women in AI panel dates speaker
8. "Dubai AI Festival" speaker application apply named contact organizer email 2026
9. UAE Saudi corporate training RFP AI workshop facilitator 2026 2027
10. Dubai/Abu Dhabi women in leadership/tech conference 2027 call for speakers corporate
11. GITEX Global 2026 AI track speaker call for speakers contact apply

Plus WebFetch verification on: dubaiaifestival.com/become-a-speaker, planxconf.com/ai-conference-dubai, landing.dmcc.ae/ai-in-dubai-conference-2026, worldaiexpo.io/book-tickets, worldaiexpo.io/ai-events-dubai-uae-middle-east-2, worldaiexpo.io/faqs, globalaishow.com/abu-dhabi, globalaishow.com/abu-dhabi/speakers, atdme.com/certificate-programs, atdksa.com.

## Candidates found and disposition

| Candidate | Disposition | Reason |
|---|---|---|
| **Global AI Show Abu Dhabi 2026** | **Added — TARGET 009** | 18-19 Nov 2026, Space42 Arena. Dedicated "Become a Speaker" pathway with its own intake email and a stated 24-hour routing commitment, organizer VAP Group / TimeofAI. Includes a "Women in AI: Architecting the Future Talent Workforce" session. Abu Dhabi is in-scope (Dubai/GCC remit). Strongest CFP structure of anything added this scan, but still only a general inbox, not a named person. |
| **ATD Saudi Arabia Conference (ATD KSA)** | **Added — TARGET 010** | Riyadh, organizer QnA International, 2026 theme "CAPABILITY 2030: Building Saudi Capability for an AI-Powered Future" — a direct hit on the L&D/HR-tech audience lane this skill names explicitly, arguably a better thematic fit than most of the AI-vendor conferences already in the pipeline. Added despite a date inconsistency on the organizer's own pages (one section shows Nov 2025 agenda detail, another references Dec 7-8) — flagged for resolution before this is treated as time-sensitive, not held back entirely given the strength of the positioning fit and a working contact. |
| GITEX Global 2026 (existing TARGET 004) | **Updated, not new** | Found an actual open self-serve speaker application form (mktg.gitex.com/GITEX2026SpeakerInterest, organizer DWTC, "AI for Developers" track, Hall 26) — this target moves from "no CFP path found" to "CFP exists, no named contact yet." History line appended; stage unchanged (`identified`). |
| World AI Technology Expo Dubai — "17-19 Nov 2026 Millennium Airport Hotel" variant | **Rejected (reconfirmed)** | Resurfaced in this scan's searches, same confusion flagged in the 2026-10-05 and 2026-10-12 scans. Fetched the organizer's own site directly three times this run (book-tickets, the Dubai-events listing page, and the FAQ) — all three consistently and exclusively state the Dubai edition is 07-09 Apr 2027 ("Series 2") at Millennium Plaza Downtown Hotel. No November 2026 edition exists on the primary source. Treating this as a persistent secondary-source/AI-search artifact, not a real second edition. TARGET 007 unchanged. |
| ATD Middle East Conference (atdme.com, Dubai) | **Held, not added separately** | Same organizing group as ATD KSA (QnA International) but its own page gives no firm 2026 date for a "main conference" (only references "Main Conference 2027" plus scattered Sept 2026 workshops). Noted inside the new TARGET 010 entry as a thing to revisit if its own Dubai date firms up, rather than opened as a separate thin target. |
| PlanX 2026 (Grand Hyatt Dubai, 25-26 Nov) | Rejected | Named organizer (Uncharted Global FZCO) and a contact email exist, but no call-for-speakers or speaker-application process is disclosed anywhere on the event page — "40+ speakers" reads as a curated/invite lineup. Audience is also "founder-first," a weaker fit than the L&D/HR/enterprise-AI lanes this pipeline targets. |
| AI in Dubai Conference (DMCC) | Rejected | Already occurred — 2 February 2026, before today (2026-10-19). |
| Machines Can See 2026 | Rejected | Already occurred — April 2026, before today. |
| WE Convention 2027, Women in Tech Global Conference 2027 | Rejected | Both 12+ months out; WE Convention's 2026 edition was already rejected in the 2026-10-12 scan for a celebrity-circuit speaker tier mismatch, and the Women in Tech conference is virtual-first, which weakens the in-person-booking value this pipeline is built for. Revisit closer to each event if the operator wants a longer-runway lane opened. |

## Escalations and lifecycle actions this scan

- **TARGET 002 (CognitionX Emirates) and TARGET 003 (HRSE) marked `dead` (event passed).** Both events ran 14-15 Oct 2026. Both were flagged contact-complete and near-expired across the 2026-10-05 and 2026-10-12 scans with an explicit instruction to "serve a pitch immediately or mark dead at the next scan if the window closes unused." No pitch was ever served (scan mode cannot draft or send one; that is `pitch` mode's job and nothing in this pipeline's history shows a `pitched` stage change for either). This scan is that next checkpoint — both are now dead with reason "event passed."
- **TARGET 006 (AINext, 22 Oct 2026) is 3 days out from this scan date** — the most time-critical live target in the pipeline. Re-verified this scan: Anas Jawed is confirmed Conference Chair of Next Business Media, giving opening remarks; nothing new to add beyond the existing contact. Stage unchanged (`identified`) — scan mode does not draft pitches, see operator briefing.
- **TARGET 008 (Dubai AI Festival, 26-27 Oct 2026) is 7 days out.** Re-checked for a named contact (become-a-speaker page, general searches) — still only a generic enquiry path, no named person found. Stage unchanged.

## Not done this run

- No pitches drafted (out of scope for `scan`; also `pitch` mode requires loading brand brain and a fee band from canon, which this session doesn't have).
- No outreach sent — the skill never sends; she sends.
- `speaking-pipeline.md` structure (numbering, past history lines) left untouched; only new history lines appended, two targets marked `dead` (an allowed stage-field update, not a history rewrite), and two new targets added, per the append-only rule.
