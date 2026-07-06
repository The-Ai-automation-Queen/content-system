# AI Tools Portfolio — the ranked build roadmap

> Created: 2026-07-06 · Owner decision: build ALL 14, in waves, one at a time
> (the estate's own law: ship one thing before starting the next).
> Rubric: Impact ×2 + Week-change ×1.5 + Effort ×1 (Effort 10 = easiest,
> given existing infra). Full reasoning in the session that produced this;
> per-tool mini-specs below.

## The ranking (locked by operator, 06/07/2026)

| Rank | Tool | Impact | Effort | Week-change | Score | Status |
|---|---|---|---|---|---|---|
| 1 | The Unblocker (Chief of Staff) | 10 | 8 | 10 | 43 | ✅ **BUILT 06/07** — `skills/unblocker/` |
| 2 | Morning Review Cockpit | 9 | 7 | 10 | 40 | ✅ **BUILT 06/07** — `skills/review-cockpit/` |
| 3 | Voice-Note Brain Feeder | 9 | 8 | 8 | 38 | ✅ **BUILT 06/07** — `brain-manager` v1.1 `listen`/`prefill` |
| 4 | Launch Conductor | 9 | 6 | 8 | 36 | wave 2 |
| 5 | Speaking-Gig Pipeline | 8 | 7 | 7 | 33.5 | wave 2 |
| 6 | Nurture Completer & Email Ops | 8 | 8 | 6 | 33 | wave 2 |
| 7 | Taste Clone | 7 | 6 | 8 | 32 | wave 3 (needs Cockpit history) |
| 8 | Course Production Producer | 8 | 6 | 6 | 31 | wave 3 (needs raw identity, UNB-018/19/20) |
| 9 | Revenue Watchdog | 7 | 8 | 6 | 31 | wave 3 (needs live checkout, UNB-002) |
| 10 | Research-Inbox Distiller | 6 | 8 | 6 | 29 | wave 3 |
| 11 | Community Concierge | 8 | 4 | 5 | 27.5 | wave 4 (needs members, UNB-014/015) |
| 12 | Client-Tenant Onboarder | 7 | 5 | 4 | 25 | wave 4 |
| 13 | Estate Janitor | 5 | 7 | 4 | 23 | wave 4 |
| 14 | French-Market Mirror | 6 | 5 | 3 | 21.5 | wave 4 (needs English funnel live) |

## Build waves — why this order

**Wave 1 — the human interface (✅ built 06/07, activates with UNB-001).**
#1 ✅, #2 ✅, #3 ✅. All three ride the same Telegram bot (UNB-001). Morning: the Unblocker serves the ship task and the
Cockpit serves the drafts for one-tap review. Anytime: voice notes feed the
brain. After wave 1, Fatiha's *entire* required daily contribution to the
machine is ~15 minutes on her phone.

**Wave 2 — the money engines.** #4, #5, #6. Each converts existing assets to
cash but lands on ground the Unblocker is clearing (payment links, hosted
magnets, live funnel). Build while week-one unblocks complete, activate as
their dependencies flip to done in `unblocker/ledger.md`.

**Wave 3 — the compounding layer.** #7 needs weeks of Cockpit approve/kill
history as training data. #8 needs the raw-identity assets (UNB-018/019/020).
#9 needs a live checkout to watch (UNB-002). #10 is independent — slot it
anywhere as a light build.

**Wave 4 — the expansion layer.** #11 the day the community has 20 members
(it jumps to top-3 priority that day), #12 when the first client conversation
happens, #13 as background hygiene, #14 once the English funnel converts.

---

## Mini-specs

### 2. Morning Review Cockpit
One daily Telegram digest (after the 02:30 content-engine run): the 5 drafts,
each as a compact card with hook + pillar + critic score, with one-tap
✅ approve / 🎙 edit-by-voice-note / ❌ kill. Replies write statuses back to
`content-vault.md` (approve → READY TO POST) and queue via `distribution`.
Also surfaces the Blotato queue state. Shares the UNB-001 bot; a `cockpit`
skill run processes replies (getUpdates) on a short cron.
**Effort:** 1–2 sessions. **Depends:** UNB-001. **Feeds:** Taste Clone (#7).

### 3. Voice-Note Brain Feeder
brain-manager upgrade: accept voice notes sent to the bot anytime; transcribe,
extract anecdotes/opinions/numbers/life-events into `personal-brain.md`
categories, date-stamped, with a one-line confirmation back. Plus a one-off
**pre-fill pass**: mine existing corpus (LinkedIn history, transcripts,
voice-corpus) into proposed brain entries she confirms instead of composes.
**Effort:** 1 session. **Depends:** UNB-001. **Fixes:** generic-content root cause.

### 4. Launch Conductor
Input: one offer + date. Output: the full campaign as ONE reviewable arc —
posts (via content-engine), emails (GHL), DM keyword flows (lead-magnets.csv
rows), countdown timing — scheduled through existing machines with approval
gates, then monitored mid-launch (soft day 3 → urgency piece proposed).
First use: the founding-member community launch (UNB-014/015).
**Effort:** 2 sessions. **Depends:** funnel pieces from week-one unblocks.

### 5. Speaking-Gig Pipeline
Extends `prospecting` from briefing → pipeline: scrape Dubai/GCC corporate
events + L&D contacts, draft one personalized pitch per target (one-pager
attached), serve 3/day for one-tap send, track replies → follow-ups in a
`speaking-pipeline.md` CRM file. One booking = $5–15k.
**Effort:** 1–2 sessions. **Depends:** speaker one-sheet (exists).

### 6. Nurture Completer & Email Ops
Drafts the 5-email GHL sequence (ROADMAP Action 2) + the 7 missing
fast-forward nurture emails; maintains sequences as offers change; drafts
launch broadcasts on Conductor's request. Human pastes into GHL (UNB-013).
**Effort:** 1 session. **Depends:** lead magnets hosted (UNB-009+).

### 7. Taste Clone
Learns from every Cockpit decision: approved-untouched vs edited (diff = the
lesson) vs killed. Maintains `taste-file.md` (ranked patterns with evidence);
content-engine's critic loads it; once precision proves out, only top-2 of 5
drafts get served, rest auto-archived with reasons.
**Effort:** 2 sessions + weeks of data. **Depends:** #2 running daily.

### 8. Course Production Producer
Turns the 54 written lessons into a recording factory: teleprompter scripts
(exist in the Whop kit) → Gamma slide decks → 3 batch recording sprints
scheduled → post-production metadata (chapters, descriptions, upload order).
Respects the killed voice-clone decision: her real recordings, just made
frictionless.
**Effort:** 2 sessions. **Depends:** UNB-017/018/019/020.

### 9. Revenue Watchdog
Daily reconciliation: Whop/Stripe/GHL → `revenue-log.md` + queen-brain
`proof.md` + dashboard panel. Push notification on the FIRST sale, then
anomaly alerts only. Weekly one-paragraph money narrative in the Sunday
butler message.
**Effort:** 1 session. **Depends:** UNB-002 (something to watch).

### 10. Research-Inbox Distiller
Weekly sweep of new `research-inbox` files (750+ backlog, then incremental):
cluster, kill noise, emit 2–3 "What's Worth It" vault drafts + a research-notes
entry + a 5-bullet weekly brief. Backlog handled in one big first pass.
**Effort:** 1 session. **Depends:** nothing.

### 11. Community Concierge
Whop community assistant (clearly labeled as her AI, never impersonating):
welcomes members, answers from course + lead-magnet corpus, flags churn risk,
escalates real questions to her, harvests wins → proof log + testimonial
drafts. **Activation trigger: 20 members.**
**Effort:** 2–3 sessions. **Depends:** UNB-014/015 + members.

### 12. Client-Tenant Onboarder
Discovery-call transcript → fully configured `tenants/<slug>/` (brain,
positioning, connections checklist) + kickoff report. Makes "I run my
Business OS for your brand" deliverable in a day. The productized-agency line.
**Effort:** 2 sessions. **Depends:** first client conversation.

### 13. Estate Janitor
Weekly 8-repo hygiene scan: duplicates, phantom manifest claims, STATUS
contradictions, stale branches, drifted product copy. Output: small PRs +
a janitor report. Feeds kills/consolidations into the Unblocker ledger.
**Effort:** 1 session. **Depends:** nothing.

### 14. French-Market Mirror
Repurposes proven winners (performance-log evidence only) into native French
for the francophone MENA/France market: separate vault section, FR voice-file
variant, Blotato-queued to FR-targeted channels when they exist.
**Activation trigger: English funnel converting.**
**Effort:** 2 sessions. **Depends:** performance data + funnel live.

---

## Operating rule

One tool ships at a time. A wave doesn't start until the previous wave's
tools are *running in the daily loop*, not just merged. The Unblocker's
ledger tracks the human-side dependencies; this file tracks the build order.
Update the Status column as tools ship — this file is the record.
