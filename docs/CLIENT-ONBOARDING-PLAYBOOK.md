# Client Onboarding Playbook — Do & Follow

> Created: 2026-07-05 · Status: LIVING CHECKLIST
> Scope: bringing a **new client** onto this Business OS as a managed
> deployment (the `tenants/` multi-brand path). For your own content ops, see
> `docs/CONTENT-OPS-BRIEF.md` instead — don't duplicate that here.

**The core rule that makes this clean instead of messy: nothing gets typed
into a client's tenant folder that didn't come out of their own mouth first.**
Every step below traces back to the discovery call. If you're ever tempted to
fill in a positioning field with a guess, stop and go ask.

---

## 0. Before the call

- [ ] Confirm the client's slug (lowercase, hyphenated — e.g. `acme-fitness`).
      You'll use it everywhere: `tenants/<slug>/`, `--tenant <slug>`.
- [ ] Have this playbook open — you'll fill answers straight into the sections
      below during the call, then transcribe them into the tenant files after.
- [ ] Ask the client, ahead of time, to gather 10–15 pieces of their own real
      writing (old posts, emails, DMs) if they have any — this saves a whole
      step later (§4).

## 1. Discovery call — the questions

One call, ideally 45–60 minutes. These map directly to `positioning/SKILL.md`
and the first `personal-brain.md` entries — you're gathering both at once.

### Positioning (→ `positioning/SKILL.md`)

1. Who do you actually help — describe the person, not the demographic.
2. What's the transformation you sell? Finish this: "I help [who] do [what] so
   they can [outcome]."
3. What's your edge — why you, not the ten other people doing something similar?
4. How does the business actually make money right now (in priority order)?
   Not "someday" — what's live today.
5. What are the 3–6 content pillars/lanes you keep coming back to? (If they
   don't have a clean answer, listen for the patterns in how they already talk
   about their work and propose 3–6 back to them for confirmation — don't
   invent these unprompted.)
6. Voice: casual or formal? Any words/phrases you always use — or always avoid?
   Is there a competitor or creator whose *tone* (not content) you'd point to
   and say "closer to that"?
7. What does this brand explicitly NOT do — any topic, tone, or angle that's
   off-limits or retired?

### Personal brain seed (→ `personal-brain.md`, first entries)

Same categories `brain-manager` rotates through daily — get a first pass now:

8. Anecdotes: any recent story, win, or fail worth remembering?
9. Opinions: any hot take on your industry most peers would push back on?
10. Current projects: what are you building/shipping right now?
11. Numbers: any real metric worth quoting (followers, revenue, results, years
    in the field)?
12. Life/background: anything about your story that's part of the pitch (a
    career change, a turning point)?
13. Stack & tools: what do you actually use to run the business day to day?

### Channels & offers (→ `inventory.md`)

14. Which platforms are you actually active on — handles for each.
15. What are your current offers, and links, in priority order?
16. Any comment-keyword → lead-magnet setups already running elsewhere? (→ `lead-magnets.csv`)

### The AI-twin question (ask, but set expectations)

17. Do you want AI-avatar/talking-head video as part of this? If yes: flag
    now that (a) it needs its own consent + capture step (photos, voice
    sample, an old clip) and (b) as of today it's a **single-client system**
    in the sibling repo — if you're running more than one client's twin, that
    needs tenant-scoping first (see §5 below) before promising simultaneous
    delivery to two clients.

## 2. Scaffold the tenant

- [ ] `cp -r tenants/_template tenants/<slug>` — this now produces a fully
      working folder (positioning, inventory, vault, research notes, personal
      brain, voice-corpus, voice-file, performance-log all pre-scaffolded).
- [ ] Confirm nothing under `tenants/<slug>/` is a leftover from another
      client — a copy-paste mistake here is a real privacy problem, not just
      a mess.

## 3. Fill the brain from the call notes

- [ ] `tenants/<slug>/positioning/SKILL.md` — transcribe answers 1–7. Write
      it in their words, not a paraphrase that drifts from what they said.
- [ ] `tenants/<slug>/inventory.md` — answers 14–15.
- [ ] `tenants/<slug>/lead-magnets.csv` — answer 16, if any exist yet.

## 4. Seed the personal brain

- [ ] Run `brain-manager seed --tenant <slug>` — feed it answers 8–13 directly
      rather than re-asking; it just needs them written into
      `personal-brain.md` in the right structure.
- [ ] Tell the client `brain-manager update --tenant <slug>` is a recurring
      thing (theirs or yours to run) — the brain goes stale without it, same
      as it does for your own.

## 5. Build their voice file

- [ ] If they brought writing samples (per step 0): drop 10–15 pieces into
      `tenants/<slug>/voice-corpus/`.
- [ ] If not: run `voice-file interview --tenant <slug>` — slower, but works
      from zero.
- [ ] Run `voice-file compile --tenant <slug>`, then `voice-file validate --tenant <slug>`
      (the blind 3-test). Don't hand-edit the output on a fail — add more corpus.

**If they want the AI twin (question 17, answered yes):** this is currently a
manual, single-tenant process in the `AI-Creator-OS` repo — `assets/twin/` is
one global folder, not `assets/twin/<slug>/`. Before taking on a *second*
client who wants this, that repo needs tenant-scoping (mirroring this repo's
`tenants/` pattern) — don't onboard two concurrent AI-twin clients on the
current setup, you will mix their consent records and assets. Flag this as a
build task, not something to work around by being careful.

## 6. Wire their connections

- [ ] `tenants/<slug>/tenant.json` — Blotato workspace, HeyGen avatar/voice
      IDs (after a HeyGen session with them), ManyChat/GHL workspace, Opus
      Clip key. **Env-var names only, never paste actual keys.**
- [ ] Double check the `ai_twin` block stays `"wired": false` unless the
      tenant-scoping work in §5 is actually done.

## 7. Test one piece end-to-end

- [ ] Run `content-engine --tenant <slug>` → `visual-engine --tenant <slug>` →
      `distribution --tenant <slug>`. This is the real smoke test — any
      missing connection or malformed file surfaces here, not three weeks in.
- [ ] Read the draft it produces. Does it sound like the client, not like
      "AI describing the client"? If not, that's the voice file, not a
      one-off prompt problem — go back to §5.

## 8. Schedule their loop

- [ ] Add their cron/`/loop` entry (own settings, or their own scheduled
      session — don't silently fold it into yours).
- [ ] Confirm `performance-tracker --tenant <slug>` is on the schedule too —
      without it, their Lessons section never gets evidence.

## 9. Go-live handoff

Tell the client, explicitly, in writing:

- [ ] Drafts land on a schedule; they (or you, per the service agreement)
      review and mark `READY TO POST`.
- [ ] **Publishing is a manual release from the Blotato dashboard** — the
      machine queues, a human clicks publish. Nothing goes out unattended.
- [ ] The voice file and personal brain get better with use — early drafts
      may need more editing than drafts a month in, once there's more real
      material feeding both.
- [ ] Who owns what happens to their consent records, voice corpus, and (if
      applicable) twin assets if the engagement ends — settle this before
      go-live, not after.
