# Operator Playbook — Every Human Step to Make the Machine Truly Automated

> Created: 2026-07-05 · Status: LIVING CHECKLIST — tick boxes as you go
> Companions: `docs/AUTOMATED-DELIVERY-BLUEPRINT.md` (the architecture),
> `docs/FLAGSHIP-COURSE-STRATEGY.md` (the strategy), the 2026-07-05 estate audit.
>
> Your role in an automated business is exactly three jobs: **decide, appear,
> and QA.** Everything in this playbook is one of those three. If a task here
> feels like a fourth kind of work, it belongs to the machine — flag it and
> we'll automate it.

**How to read the phases:** each has DO (your actions), TEST (how you verify it
actually works — never assume), and ITERATE (what to change based on what the
test shows). Do not start a phase before the previous phase's tests pass —
that's how the 300-report dm-responder loop happened.

---

## Phase 0 — Decisions (Day 1, ~1 hour, laptop + coffee)

**DO**
- [ ] 0.1 Sign off the pricing canon (`FLAGSHIP-COURSE-STRATEGY.md` §1.4):
      $47 tripwire · $47/mo community ($27 founding) · $299→$499 flagship ·
      $997→$1,997 cohort · $5k–50k corporate · $5–10k/yr license.
      Tick the decision log in that doc. If you change a number, change it THERE
      first — it is now the only source of truth.
- [ ] 0.2 Confirm the flagship name ("Fast Forward") and the method name
      ("the Business OS" unless you prefer another — choose once, forever).
- [ ] 0.3 Confirm lesson 0.0 = SHOCK-AND-AWE (per `fast-forward/CONSOLIDATION-PLAN.md`).
- [ ] 0.4 Check your LOCAL machine for the phantom folders the manifest claims
      (`sales-page/`, `policy/`, `templates-library/`, `testimonial-engine/`,
      `video-delivery/`). If found → sync to the repo. If not → tell me; I rebuild them.

**TEST** — none; these are decisions. The test is that you never reopen them.

**ITERATE** — prices move only UP, only on proof (after cohort #1's testimonials).

---

## Phase 1 — Seed & Clone (Week 1: 30 min + one half-day)

**DO**
- [ ] 1.1 **Seed the brain (30 min, do this before anything else).** Open a
      Claude session in this repo, run `/brain-manager seed`, answer the 15–20
      questions with real specifics: anecdotes, opinions, numbers (years, tools,
      hours saved), current projects, life events. Vague answers = generic content.
- [ ] 1.2 **The recording session (half day — the only filming you ever do).**
      Book a quiet room, good light, neutral background. Record: (a) ~15 min of
      you talking naturally to camera (varied expressions, hand gestures),
      (b) ~15 min of clean voice reading a provided script (I can generate the
      calibration script), (c) 3–4 short "connector" clips: greeting, "let's
      look at the screen," lesson close. 1080p minimum, external mic if possible.
- [ ] 1.3 Create the avatar + voice clone: Higgsfield (primary, paid) or HeyGen
      (Creator plan is enough to start). Upload the footage, follow their clone
      flow, approve the result.
- [ ] 1.4 Paste the avatar_id and voice_id into `inventory.md` (the blank slots
      exist at line ~137).

**TEST**
- [ ] T1.a Render ONE 60-second test clip from a real lesson script. Watch it
      with someone who knows you. Pass = they say "that's you" without wincing.
      Check: lip sync, pacing, pronunciation of "Fatiha," "Claude," tool names.
- [ ] T1.b Ask me to generate one content draft after the brain seed. Pass =
      the draft references at least 2 real details from your life without you
      prompting them.

**ITERATE** — if the clip fails: re-record the voice sample in a quieter room /
slower pace (voice quality is 80% of clone quality). If drafts still feel
generic: the brain answers were too abstract — redo the weakest categories with
numbers and named anecdotes.

---

## Phase 2 — Accounts, Keys & the Always-On Host (Week 1–2, ~4–6 hours total)

Work through this table top to bottom. Every key goes into the VPS environment
via Doppler (per `deploy/SECURITY.md`) — never pasted into repo files.

| # | Service | What you do | Time |
|---|---|---|---|
| 2.1 | **VPS** (Hetzner/DigitalOcean, ~$10/mo) | Create Ubuntu server → run `deploy/install.sh` then `deploy/harden-vps.sh` → follow `deploy/SETUP-GUIDE.md` phases in order | 2 h |
| 2.2 | **Telegram bot** | @BotFather → create bot → set `TELEGRAM_BOT_TOKEN` + your `TELEGRAM_CHAT_ID` | 15 min |
| 2.3 | **Blotato** | Confirm subscription active; allowlist `*.blotato.io` egress in the environment; confirm the 6 connected accounts still valid; connect TikTok (currently missing) | 30 min |
| 2.4 | **GHL** | Connect Instagram `@thefatihachikh` (Settings → Integrations); create API key | 30 min |
| 2.5 | **Apify + Tavily** | Confirm both API keys valid and funded (Apify needs ~$20/mo credit) | 15 min |
| 2.6 | **Whop** | Create account → you'll add products in Phase 3 | 20 min |
| 2.7 | **Whop** | Create the course space (flagship home) + the community space (3 sections: Resources / Live Calls / Community) — Skool was the earlier plan, sunset in favor of one platform | 30 min |
| 2.8 | **Unipile** (LinkedIn DM — optional until Phase 4) | Account + `UNIPILE_API_KEY` + connect LinkedIn | 30 min |
| 2.9 | **n8n** | Confirm instance reachable; I build the workflows, you just approve credentials it uses | 15 min |

**TEST**
- [ ] T2.a From the VPS: `deploy/run-machine.sh` manual run → you receive a
      Telegram message. Pass = message arrives.
- [ ] T2.b Crons installed (`crontab.example`) → next morning you wake up to:
      fresh signals in `research-notes.md` + 5 new drafts in the vault +
      a Telegram digest. Pass = all three, two mornings in a row.
- [ ] T2.c brain-manager pings you at 20:00 via Telegram with 5 questions.
      Pass = you can answer from your phone and see `personal-brain.md` updated.

**ITERATE** — any cron that fails twice: check its report in `reports/` (each
skill logs failures honestly), fix the one key it names, re-run manually. Do NOT
add new automations while any Phase-2 test is red.

---

## Phase 3 — Money Wiring (Week 2, ~4 hours) → first dollars possible

**DO**
- [ ] 3.1 Create the $47 **AI Time Audit** on Whop (content exists:
      `products/ai-time-audit-template.md`; Judge's Prompts + one Chez guide
      attach as bonuses). Copy the buy URL.
- [ ] 3.2 Paste the URL into `site/store.html` (or ask me to). Remove the other
      sub-$100 SKUs from the store (they're bonuses now).
- [ ] 3.3 Host the top 3 lead magnets on GHL pages (TEAM, STACK, PROMPT), each
      with an email opt-in → tag (`lm-team` etc.) → nurture trigger. **Also fix
      the live BUILD leak**: either build a quick BUILD resource page or edit
      the Instagram captions that promise it.
- [ ] 3.4 Paste the 3 live URLs into `lead-magnets.csv`, set `active=yes`.
- [ ] 3.5 In GHL, build the 3 keyword workflows: IG comment contains keyword →
      DM with link → tag → nurture sequence. (The 5-email nurture copy exists;
      I can finalize it for paste-in.)

**TEST** (use a second Instagram account + a personal email you don't use)
- [ ] T3.a Comment "TEAM" on your latest post. Pass = DM with working link
      arrives < 5 min, email captured in GHL with correct tag, Day-0 nurture
      email lands (check spam folder — if spam, fix GHL domain records first).
- [ ] T3.b Buy your own $47 product with a real card. Pass = payment clears,
      delivery email arrives, files download, you can refund yourself.
- [ ] T3.c Only now re-enable dm-responder, **daily cadence**, gated on
      `active=yes` rows. Pass = ONE report per day in `reports/`, listing real
      keyword hits.

**ITERATE** — weekly, read the GHL numbers: opt-in rate per magnet (< 25% of DM
clicks → landing page problem), nurture open rate (< 40% → subject lines; I
rewrite), tripwire conversion (< 3% of nurture completers → offer framing; we
test a new angle). Swap the 3 active magnets monthly — keep the best two, trial
one new keyword.

---

## Phase 4 — The Content Loop Goes Public (Week 2–3, then 15 min/day forever)

**DO**
- [ ] 4.1 Release the first of the 13 READY TO POST entries via the Blotato
      queue — this is **Day 1 of the Activation Arc** ("I built a machine and
      never pressed GO. Watch me press it.").
- [ ] 4.2 Approve the queue daily. Your 15-minute morning ritual:
      ① open Telegram digest → ② approve/edit the day's queued posts in Blotato
      (edit ruthlessly — you are the taste layer) → ③ reply to real comments for
      5 minutes (the machine must never do this — engagement is trust).
- [ ] 4.3 Answer the brain-manager's evening questions (5 min, phone).

**TEST**
- [ ] T4.a After 7 days: 7 posts live, each with a keyword CTA, zero posts
      published without your approval. Pass = all three true.
- [ ] T4.b performance-tracker writes real numbers into `performance-log.md`
      nightly and annotates POSTED entries. Pass = numbers match what you see
      in the apps (spot-check 2 posts).

**ITERATE** — the weekly loop (see §Operating Rhythm): kill the worst pillar,
double the best hook pattern. Rules of thumb: hooks with a number outperform →
use Pattern 11 more; LinkedIn beats IG for DM keywords → shift CTA posts there.
Let `performance-log.md` decide, not mood.

---

## Phase 5 — The Course Factory (Weeks 3–6, your role = QA only)

**DO**
- [ ] 5.1 Approve the `course-production` skill's output for Module 0: teleprompter
      scripts + deck briefs + shot lists (I generate; you red-pen once).
- [ ] 5.2 Batch-record the screen demos for M0–M2 (2–3 hours: you drive the
      screen, no face, no performance — the twin's voice narrates over it).
- [ ] 5.3 **QA gate — one evening per module:** watch every rendered lesson at
      1.5×. Checklist per lesson: names/tools pronounced right · no visual
      glitches · claims accurate · CTA correct. Reject ruthlessly; re-renders
      are cheap.
- [ ] 5.4 Upload approved modules to Whop; set drip schedule.
- [ ] 5.5 Record ONE lesson yourself on camera (lesson 0.0). The first thing
      buyers see should be the real you; the twin carries the rest — and you
      disclose that proudly in lesson 0.0 itself.

**TEST**
- [ ] T5.a Buy the course yourself (founding price, real card). Pass = checkout
      → n8n → welcome email → access works → lesson 1 plays, on your phone too.
- [ ] T5.b Give 3 founding community members free access in exchange for
      completing M0–M2 in one week + a voice-note review. Pass = all 3 finish;
      their confusion points become your edit list.

**ITERATE** — lesson completion analytics on Whop: any lesson where > 40% drop
off gets re-cut shorter. Collect every student question — questions are missing
lessons; feed them back to me and the factory renders patches monthly.

---

## Phase 6 — Community & Cohort (Weeks 3–8)

**DO**
- [ ] 6.1 Open the 20 founding spots at $27/mo (one LinkedIn post: "Comment
      FOUNDING"). Their explicit job: testimonials + ICP research panel.
- [ ] 6.2 Your permanent live commitment — **2 hours/week, non-negotiable and
      non-automatable:** one "Build with me" session + one Q&A. Recordings feed
      the searchable library AND become reels-factory input (one live hour =
      5–10 shorts, automatically).
- [ ] 6.3 Onboarding survey (I draft): current role, dream business, #1 time
      sink, what they tried. This is your living ICP data.
- [ ] 6.4 Week 6–8: open the cohort waitlist inside the community ($997 founding
      cohort #1, 20 seats).

**TEST**
- [ ] T6.a Founding fills in ≤ 14 days from ≤ 5 posts. If not → the offer
      framing is off, not the price; we rework the post, not the ladder.
- [ ] T6.b After 30 days: ≥ 50% of founders attended a live or posted. Below
      that = churn incoming → fix the weekly rhythm before scaling members.

**ITERATE** — raise community to $47 the day founder seats fill. Every
member win → C-post content (the machine drafts it from your brain notes) →
next member. That flywheel is the entire community growth strategy.

---

## Phase 7 — Corporate Track (parallel, from Week 1 — highest $ per hour of your time)

**DO**
- [ ] 7.1 Send the speaker one-pager (exists in `skills/monetisation`; I can
      render it as a Gamma deck) to 10 warm contacts. Personal note, no pitch:
      "Sharing what I'm doing now — know anyone whose team needs this?"
- [ ] 7.2 Take the calls yourself. High-ticket sales is a human job, forever.
- [ ] 7.3 Book the first AI & Freedom Dinner in Dubai (`skills/irl-events` has
      the full runbook: venue, invites, agenda, follow-up).
- [ ] 7.4 Read the daily `prospecting` briefing (Telegram) and do its ONE
      15-minute action.

**TEST** — 10 one-pagers → expect 3–4 replies, 1–2 calls, ~1 booking per
quarter. Zero replies from 10 warm contacts = the one-pager or the warmth is
wrong; we fix the artifact and re-send to a new 10.

**ITERATE** — after workshop #1: capture stage photos/clips (authority content),
a written testimonial, and the attendee → community funnel. Raise the fee every
2 bookings.

---

## Your Permanent Operating Rhythm (once Phases 0–6 are green)

**Daily — 20 min:** morning: Telegram digest → approve queue → 5 min real
replies. Evening: brain-manager questions from your phone.

**Weekly — 60 min (the machine drafts this meeting for you):**
- Read `weekly-ops`' briefing + `performance-log.md`.
- Decide 3 things only: ① which pillar/hook to double next week, ② which to
  kill, ③ one funnel number to fix (worst of: opt-in rate, nurture opens,
  tripwire %, community joins).
- Check the ACP ratio held (7A/2C/1P) and every A-post had a keyword.

**Monthly — 2 hours:** revenue audit (`monetisation revenue-audit` produces the
table; you read it) · rotate lead magnets · course patch list to the factory ·
one pricing/offer experiment maximum · update the decision log.

**Quarterly:** raise one price on proof · one new corporate push · re-read the
ICP against the onboarding surveys and update it.

---

## The 10 Standing Rules (print this part)

1. **Queue-only forever.** The machine schedules; only you release.
2. **Never automate a loop whose upstream is inactive** (the dm-responder lesson).
3. Every automation gets a **daily cap and a Telegram heartbeat**; silence for
   48h = investigate, don't assume.
4. You **QA every rendered lesson** before a buyer sees it. No exceptions.
5. **2 live hours/week** in the community. Trust is the one manual dependency.
6. High-ticket calls are **yours**. The machine books them; it never takes them.
7. One experiment at a time per funnel stage — otherwise you can't read results.
8. Prices move up on proof, never down on fear.
9. If a week gets busy, the machine keeps running — your only untouchable
   15 minutes is the morning queue approval.
10. When something feels broken, read its report in `reports/` first. The
    system tells the truth about itself — that's why it's built this way.

---

## Bottleneck summary — the critical path is only 4 things

Everything above compresses to: **① seed the brain (30 min) → ② record the
half-day → ③ open the accounts/keys (one weekend) → ④ keep the 20-min daily +
2-hour weekly rhythm.** Every other step is either mine to build or the
machine's to run. The distance between today's $0 and a functioning automated
business is roughly **one focused week of your time, then 25 minutes a day.**
