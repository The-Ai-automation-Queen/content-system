# The Unblocker — Build Plan (v0)

> Created: 2026-07-06 · Status: PLAN — awaiting operator answers to the open
> questions at the bottom, then architect step by step.
>
> **What it is:** an AI Chief of Staff whose only job is converting
> "everything built, nothing live" into shipped. It reads the estate's own
> status files, finds every human-only blocker, picks the ONE highest-leverage
> action per day, does ~90% of the prep itself, delivers it as a single
> 15-minute execute-only task, and follows up relentlessly until it's done.
>
> **What it is not:** another content generator, another dashboard panel,
> another list. It never serves a list. One task, fully prepped, daily.

---

## 1. Why this exists (the failure mode it attacks)

The estate's own documents establish the pattern:

- `ACTION-PLAN-CASH-MACHINE.md`: *"everything built, nothing live … the only
  thing missing is the 'go' button."*
- `queen-brain/STATUS.md`: 3 products READY TO SELL, no payment links; 11
  ready posts unreleased; brain unseeded; ~3h of raw material unrecorded.
- `fast-forward/CONSOLIDATION-PLAN.md`: 51 lessons written, 0 recorded;
  7 of 21 nurture emails missing.
- `ROADMAP.md` Priority 0: five unblocked actions, all older than a week.

Every revenue milestone is gated on a short list of human actions that arrive
as undifferentiated items in long lists, unprepped. The Unblocker's design
principle: **shrink the task until it fits a coffee break, and remove every
excuse to defer it.**

---

## 2. The core loop

```
scan → ledger → select ONE → prep pack → deliver → follow up → write back
```

1. **Scan (daily, automated).** Read the estate's status sources:
   `queen-brain/STATUS.md` + `GOALS.md`, `content-system/ROADMAP.md` +
   `ACTION-PLAN-CASH-MACHINE.md`, `lead-magnets.csv` (active flags),
   `content-vault.md` (READY TO POST counts), `fast-forward/
   CONSOLIDATION-PLAN.md`. Detect what's verifiably done vs. still blocked.

2. **Ledger.** Maintain `unblocker/ledger.md` — the single registry of every
   human-only action. Each entry carries:
   - `id`, `title`, one-line why-it-matters
   - `revenue_unlocked` (estimate, from the estate's own numbers)
   - `effort_minutes` (must be ≤ 15 after prep; bigger items get split)
   - `depends_on` / `unblocks` (dependency edges)
   - `age_days`, `times_served`, `status` (open / served / done / killed)
   - `verify` — how the agent can detect completion without asking (URL live,
     csv flag flipped, git state, vault status), when possible

3. **Select ONE.** Score = (revenue_unlocked ÷ effort) × dependency weight
   (things that unblock other things go first) × age boost (stale items rise).
   Tie-breaks favor variety (don't serve the same *kind* of task two days
   running). Output exactly one task. Never a list.

4. **Prep pack — the heart of the tool.** The agent does everything that
   doesn't require the operator's hands or identity:
   - Task = "host the TEAM lead magnet" → the GHL page body is written, the
     opt-in copy drafted, the tag name chosen, the click-path enumerated
     step by step, the csv row pre-written for paste.
   - Task = "send the speaker one-pager to 3 contacts" → the 3 names picked
     (from prospecting output), 3 personalized DMs drafted in her voice,
     the one-pager attached/linked.
   - Task = "create the Whop payment link for the $27 founding tier" → the
     listing title, description, price, and checkout settings written out;
     the operator only clicks and pastes.
   The delivered task must be **execute-only**: zero composition, zero
   research, zero decisions beyond yes/edit/no.

5. **Deliver.** One message to the operator's phone (channel: open question
   Q1) at a fixed time (open question Q5). Format:
   > **Today's unblock (12 min):** _title_
   > Why: _one line, with the revenue number_
   > Everything you need: _prep pack inline or linked_
   > Reply ✅ when done · 🔁 to swap · ✂️ to split smaller · ❌ to kill

6. **Follow up.** Next scan checks completion — by detection (`verify` field)
   first, operator reply second. If not done:
   - Serve 2: same task, different angle — shrink it, re-time it, or change
     the frame ("just the first click today").
   - Serve 3: escalate — "this has been served 3×. Kill it, split it, or
     tell me the real blocker?" A task is never silently re-served forever;
     friction is data.
   - Done → log the streak. Streaks are reported weekly, not daily (no
     guilt-tripping noise).

7. **Write back.** Done items: tick the corresponding checkbox in ROADMAP /
   ACTION-PLAN / STATUS.md, update the ledger, and append a line to
   `personal-brain.md` → *Current Projects / Numbers* (shipped things are
   exactly the anecdotes and numbers the content engine needs — the flywheel).

---

## 3. Architecture

- **Form:** a skill — `content-system/skills/unblocker/SKILL.md` — consistent
  with every other machine in this repo. Modes:
  - `scan` — rebuild/refresh the ledger from the estate (also the seed mode)
  - `daily` — full loop: scan → select → prep → deliver (the cron mode)
  - `status` — show ledger health, streaks, stale items
  - `done <id>` / `kill <id>` / `split <id>` — manual overrides
- **State:** `content-system/unblocker/ledger.md` (append-friendly markdown,
  matching estate conventions) + `unblocker/packs/` for prep-pack artifacts
  (drafted emails, page copy) so nothing is lost if a message is missed.
- **Scope:** full 8-repo estate read access, write-back to content-system and
  queen-brain status files (pending Q4/Q6).
- **Delivery:** Telegram bot is the default assumption — it's already on the
  missing-infrastructure list for `brain-manager`, so one bot serves both
  (the Unblocker in the morning, brain-manager in the evening: ship by day,
  reflect by night). Pending Q1.
- **Runtime:** daily cron. Options: the planned VPS, or a Claude scheduled
  session/Routine firing `unblocker daily`. Pending Q2.

## 4. Build phases

| Phase | Deliverable | Effort | Proves |
|---|---|---|---|
| **1 — Ledger + first pick (manual)** | SKILL.md, seeded ledger from all estate docs, first Daily One with full prep pack, delivered in-session | 1 session | The selection logic and prep-pack quality — the whole value prop, no infra needed |
| **2 — Delivery + capture** | Telegram (or chosen channel) bot wired, ✅/🔁/✂️/❌ replies captured, daily cron live | 1 session + operator: bot token | It reaches her phone and closes the loop |
| **3 — Detection + escalation** | `verify` auto-detection (URLs, csv flags, git state), 3-serve escalation ladder, write-back to STATUS/ROADMAP | 1 session | It notices completion without being told, and never nags dumbly |
| **4 — Flywheel** | Done items → personal-brain entries + "build in public" draft prompts for content-engine; weekly streak report | 1 session | Shipping feeds the content machine |

Phase 1 has zero external dependencies and can be built immediately after the
open questions are answered. Each phase is independently useful — the system
delivers value from day one even if later phases wait.

## 5. Guardrails

- **Never publishes, never sends, never pays.** Prep packs draft outreach and
  listings; the operator sends and clicks. Same queue-only philosophy as
  `distribution` (security.md §3.1).
- **Never invents blockers or revenue numbers** — everything traces to a line
  in an estate document; the ledger cites its source.
- **One task per day, hard cap.** Extra capacity goes into better prep, not
  more tasks.
- **Kill is a first-class outcome.** A deliberately killed task is a shipped
  decision, and the ledger records it (feeds the Estate Janitor's future work).

## 6. Open questions (answer these, then we architect)

- **Q1 — Channel:** Telegram bot (recommended — shared with brain-manager's
  planned bot), WhatsApp, email, or file-only to start?
- **Q2 — Runtime:** do you have the VPS yet, or should this run as a Claude
  scheduled session/Routine? (Phase 1 needs neither.)
- **Q3 — Tone:** gentle butler, drill sergeant, or wry chief-of-staff? And how
  hard may it push on serve 2–3?
- **Q4 — Scope:** full 8-repo estate ledger from day one (recommended), or
  content-system's revenue blockers only for v1?
- **Q5 — Timing:** what time (GST) does the daily task land, and when is your
  realistic 15-minute execution window?
- **Q6 — Write authority:** may it tick checkboxes / update STATUS.md and
  ROADMAP.md directly when it verifies completion, or propose-only at first?
- **Q7 — First target:** seed the ledger from everything, or start it aimed at
  ROADMAP Priority 0 (the five cash-machine actions) so week one = funnel on?
