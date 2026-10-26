# Speaking Pipeline — scan report

Date: 2026-10-26
Mode: `scan`

## Session guardrails observed

- **Canon guardrail:** this session's reality-check hook flagged `canon: queen-brain NOT in this session. Do not write any price, tier, offer status or customer-facing copy.` No fee figures or tier labels were written. The new target and all history lines below carry `est_value: pending` / no fee assertion, consistent with the pricing note already in `speaking-pipeline.md`.
- **Content-OS context (CLAUDE.md / AGENTS.md / CURRENT-WORKFLOW.md):** archive/reports are evidence only; publication and scheduling stay manual; DM responder stays paused. None of that applies directly to `scan` mode (no outreach sent, no publishing), but it bounds what this run is allowed to do — find and record, nothing more.
- **Vault note:** the reality-check hook also flagged 37 READY TO POST / 0 POSTED in the content vault — release, not production, is that pipeline's bottleneck. This run does not touch the vault; the speaking pipeline is a separate CRM with its own stage model.
- **Queue-only / security.md §3.1:** no outreach was sent or drafted. This skill drafts, she sends — same rule as `distribution`'s queue-only publishing.

## Step 1 — prior briefings

No `*-prospecting.md` files exist anywhere in `reports/` (checked full directory listing again). Standing gap since 2026-09-21 — still a no-op until the `prospecting` skill actually runs.

## Step 2 — dedupe

Grepped `speaking-pipeline.md` by org name before adding anything. Existing targets unchanged by this step: Experts Live Emirates (001), CognitionX Emirates (002, dead), HRSE (003, dead), GITEX Global (004), Dubai Future Week (005), AINext (006), World AI Technology Expo Dubai (007), Dubai AI Festival (008), Global AI Show Abu Dhabi (009), ATD KSA (010). The new find (HR Transformation MENA Summit) does not overlap any existing target.

## Step 3 — fresh search (WebSearch + WebFetch; no Tavily/Apify MCP connected this session)

Queries run:
1. Dubai AI conference December 2026 "call for speakers" corporate
2. UAE GCC corporate training RFP AI upskilling L&D request for proposal 2026 2027
3. Dubai Abu Dhabi women in AI leadership conference early 2027 speaker application
4. ATD Saudi Arabia Conference 2026 ATD KSA Riyadh exact dates December (re-verify, resolve prior date conflict)
5. Dubai AI Festival 2026 speaker programming contact named organizer (re-verify)
6. GCC HR tech L&D conference Q1 2027 AI talent development call for speakers
7. "Global AI Show" Abu Dhabi "Space42 Arena" 2026 OR 2027 dates (re-verify TARGET 009)
8. Dubai AI Festival 2026 "become a speaker" apply named contact email (re-verify)
9. AINext Awards Conference Dubai 22 October 2026 recap (re-verify event passed)
10. Experts Live Emirates 2026 Dubai organizing committee named contact Sessionize
11. HR Transformation MENA Summit Pronovea "become a speaker" registration form

Plus WebFetch verification on: hr-mena.com, aidubaiconference.com/speakers, worldsummitai.org, atdksa.com/agenda, globalaishow.com/abu-dhabi, globalaishow.com/abu-dhabi/speakers, expertslive.ae/our-team.

## Candidates found and disposition

| Candidate | Disposition | Reason |
|---|---|---|
| **HR Transformation MENA Summit 2027 (Pronovea Events LLC-FZ)** | **Added — TARGET 011** | 19-20 Jan 2027, Dubai. Direct hit on the L&D/HR-tech audience lane this skill names explicitly — CHROs, Talent Acquisition, L&D and People Strategy leaders, AI-driven HR transformation theme. Open speaker-registration form (not just a general inbox). Contact is a first name only (Ashish, ashish@pronovea.com) — needs a fuller name/role before `pitch`. |
| AI Dubai Conference 2027 (Zayed University, 19 Jan 2027) | Rejected | Page states "Speakers will be announced soon" — no open CFP, no named organizing entity. Too thin per this pipeline's quality bar; revisit once a speaker process opens. |
| Worlds AI Summit Dubai 2026 (29 Nov-1 Dec 2026, InterContinental Dubai Festival City) | Rejected | Only contact found is a personal Gmail/WhatsApp (rakeshshukl@gmail.com), no disclosed CFP process. Doesn't clear the quality bar; flag for revisit only if the event professionalizes its contact channel. |
| Global AI Show Abu Dhabi 2027 edition (23-24 Mar 2027) | **Held, not added separately** | Confirmed via organizer's own site as a genuine second edition (not a date-confusion artifact like World AI Expo's phantom Nov 2026 date) — same organizer, same speaker@globalaishow.com contact as the existing 18-19 Nov 2026 edition (TARGET 009). Noted inside TARGET 009 as a longer-runway backup rather than opened as a separate thin target. |
| GITEX Global 2026 (existing TARGET 004) | No change | Dates reconfirmed (7-11 Dec 2026, DWTC/Expo City); no new named contact found beyond the existing self-serve speaker form. Not touched this scan. |

## Escalations and lifecycle actions this scan

- **TARGET 006 (AINext) marked `dead` (event passed).** The 22 Oct 2026 event ran as scheduled. This was the pipeline's strongest contact-complete target — named CEO (Anas Jawed), direct email and phone — flagged time-critical across the 10-12 and 10-19 scans, and no pitch was ever served. A no is data.
- **TARGET 008 (Dubai AI Festival) marked `dead` (event passed/underway).** The 26-27 Oct 2026 event starts today. Across three scans only a media-enquiries contact ever surfaced (Burson/DIFC); no speaker-programming contact was ever found, and no pitch was served.
- **TARGET 010 (ATD KSA) date conflict resolved.** Organizer's own agenda page now confirms Conference & Expo is 7-8 Dec 2026, Riyadh (AI Workshop 6 Dec, Certificate Program 9-10 Dec). ~6 weeks out, not yet time-critical.
- **TARGET 001 (Experts Live Emirates) gained a named contact.** Mahmoud A. Atallah, Founder & Community Lead (Microsoft MVP), identified via the team page as the most likely programming-adjacent contact, alongside four other named team members. Event is 11-12 Nov 2026 — 17 days out. This target is now contact-complete enough to be a `pitch` candidate.
- **TARGET 009 (Global AI Show Abu Dhabi, 18-19 Nov 2026) is 23 days out.** No stage change; a second 2027 edition was logged as a future backup (see table above).

## Pipeline snapshot after this scan

11 targets total. `identified`: 001, 004, 005, 007, 009, 010, 011 (7). `dead`: 002, 003, 006, 008 (4). `pitched`/`replied`/`call`/`booked`: none — **zero pitches have ever been served across six scans (09-21 through 10-26) spanning five weeks**, and four targets have now expired unused.

## Not done this run

- No pitches drafted (out of scope for `scan`; also `pitch` mode requires loading brand brain and a fee band from canon, which this session doesn't have).
- No outreach sent — the skill never sends; she sends.
- `speaking-pipeline.md` structure (numbering, past history lines) left untouched; only new history lines appended, two targets marked `dead` (an allowed stage-field update, not a history rewrite), and one new target added, per the append-only rule.
