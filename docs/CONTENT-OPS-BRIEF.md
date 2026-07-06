# Content Ops Brief — Do & Follow

> Created: 2026-07-05 · Status: LIVING CHECKLIST — tick boxes as you go, in
> this file (commit the checkmarks) or work from the rendered version.
>
> **Scope:** this is the day-to-day content-engine operating loop — voice,
> tone, performance, and the daily/weekly cadence. For pricing, launch, and
> course-business decisions, that's `docs/OPERATOR-PLAYBOOK.md` and
> `docs/FLAGSHIP-COURSE-STRATEGY.md` — don't duplicate those here.

---

## Part A — One-time setup still open (do these once, in order)

### A1. Finish seeding the second brain
- [ ] Answer the paused round-2 brain-manager questions whenever you have 10
      real minutes: the corporate-exit story (the specific trigger — this is
      the single highest-value item, it's the exact anecdote the "I left
      corporate" hook needs), the content-OS project's current stage/next
      milestone, your active tool stack, and one recent inspiration.
- [ ] Run `brain-manager update` weekly after that — little and often beats a
      big batch.

### A2. Build the real voice file
- [ ] Drop 10–15 real pieces of your own writing (old LinkedIn/IG posts,
      emails, DMs — anything pre-AI, never a content-engine draft) into
      `voice-corpus/`. This is faster than the interview mode if you have old
      posts sitting around.
- [ ] Run `voice-file compile` to produce the first real `voice-file.md`.
- [ ] Run `voice-file validate` — the blind 3-test. If it fails, add more
      corpus rather than hand-editing the output.
- [ ] If you don't have old posts handy, run `voice-file interview` instead —
      slower, but works from zero.

### A3. Get the AI twin production line running
*(Lives in the sibling `AI-Creator-OS` repo, not this one — same overall
content ops, different repo.)*
- [ ] Drop 20+ real photos + a voice reference + one old 9:16 clip into
      `assets/twin/` there.
- [ ] Fill in `assets/twin/manifest.yaml` — twin name and, non-negotiably,
      the **consent block**. Nothing trains without it.
- [ ] Run `/twin-factory:setup`, then a small test video with
      `/twin-factory:produce` before trusting it for real content.

### A4. Re-validate the performance finding once real posts exist
- [ ] The current "personal story beats generic listicle, ~4–8x engagement"
      finding in `performance-log.md` is **pre-rebrand data** — a real signal,
      but not yet proof the new voice/positioning behaves the same way.
      Once the first rebuilt-brand vault entries go `POSTED`, run
      `performance-tracker` and check whether the Lessons section confirms or
      contradicts this. Don't treat it as settled until then.

---

## Part B — The daily loop (what's automatic vs. what needs you)

| Time (GST) | Skill | Runs itself? | Your action |
|---|---|---|---|
| 20:00 | `brain-manager` | Asks you questions (interactive or Telegram once VPS is set up) | Answer what you can — skip is fine |
| 02:00 | `signal-harvester` | Yes, fully automatic | None |
| 02:30 | `content-engine` (`daily` mode) | Yes — 5 drafts land in the vault | None yet — see Part C |
| 03:00 | `performance-tracker` | Yes, fully automatic | None |

**Your one recurring job in the daily loop:** review the vault most mornings.
5 fresh drafts will be waiting. For each:
1. Read it — does it actually sound like you? (Once `voice-file.md` is real,
   trust the drafts more; until then, expect some editing.)
2. Mark `READY TO POST` if it's good, or leave `DRAFT` with a note on what's
   missing.
3. Publishing itself is queue-only — `distribution` pushes `READY TO POST`
   into the Blotato queue, but **you** release it from the Blotato dashboard
   (per `security.md`). Nothing goes out without that click.

If the backlog of `READY TO POST` pieces is growing faster than you're
publishing them, that's the actual bottleneck — publishing the backlog beats
producing more drafts (see `ROADMAP.md`).

---

## Part C — The weekly loop

- [ ] Run `weekly-ops` (or let the cron do it) — it chains the full
      brain → signal → script → visual → queue → measure loop and writes
      dated reports to `reports/`.
- [ ] Skim the newest `reports/vault-audit-*.md` — which platform is thin,
      what's stale.
- [ ] Skim the newest `reports/competitor-watch-*.md` — what's landing for
      others in the space, to differentiate from, not copy.
- [ ] Check `performance-log.md`'s latest **Lessons** section — does this
      week's winners/losers match last week's? A pattern repeating across
      multiple weeks is worth leaning into harder; a one-week fluke isn't.

---

## Part D — Troubleshooting triggers (when something feels off)

| Symptom | Likely cause | Fix |
|---|---|---|
| Drafts read as "competent AI," not you | `voice-file.md` doesn't exist yet, or is LOW-CONFIDENCE | Go to A2 |
| Content isn't performing, no idea why | `copy-craft`'s Proven-pattern-fit score was neutral (no evidence yet) | Needs more `POSTED` + scraped data — see A4 |
| A draft keeps repeating a pattern that flopped last time | Critic gate should catch this — check the vault entry's Critic score notes | If it shipped anyway, flag it — the gate has a bug |
| Twin video doesn't look/sound right | Resemblance/voice/motion QA hasn't passed | Re-check against the QA gate in the `twin-factory` plugin (AI-Creator-OS repo), fix at the source (better reference photo/audio), don't just re-prompt |
| Nothing's publishing despite drafts piling up | Publishing is manual-release by design | That's expected — go release the backlog from Blotato |

---

## Part E — Where the bigger decisions live (not here)

- **Pricing, launch sequencing, course structure** → `docs/OPERATOR-PLAYBOOK.md`,
  `docs/FLAGSHIP-COURSE-STRATEGY.md`
- **Full system architecture / what every file and skill does** → `CLAUDE.md`
- **What's been built and what's next in the backlog** → `ROADMAP.md`
- **Security/publishing guardrails** → `security.md`
