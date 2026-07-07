---
name: hiring-campaign
version: 1.0.0
description: |
  The weekly end-to-end campaign run for The 99. Fires once a week on a
  trigger. Picks the next employee from the schedule, writes the full
  week of assets (hiring announcement, episode post, carousel, playbook
  if PLAYBOOK mode), updates the tracker page, files vault entries,
  commits and pushes. Fatiha's only touch: releasing the queue.
argument-hint: "[run | status]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Hiring Campaign (weekly wave)

One run = THREE employees = one complete week of campaign assets (the
"hiring wave"). The run is autonomous end to end EXCEPT the two things
the Constitution reserves for Fatiha: releasing the queue (Law 11) and
merging to main (VPS deploys main). Everything else happens without her.

Weekly slot map the wave fills:
- Monday: wave announcement (one post introducing the week's 3 openings)
- Tuesday: episode 1 (+ its carousel)
- Wednesday: episode 2 (+ its carousel) and the reel of the week
- Thursday: episode 3 (+ its carousel)
- Friday: Friday Receipts carries the tracker delta (badges earned)

Wave composition rule: the 3 employees come from 3 different
departments, mixing pain points (money, time, attention) so the week
never repeats itself.

## Read first

- `skills/employee-stories/SKILL.md`: format, naming rules, job-fear
  stance, free/paid line, the playbook law. All of it binds this run.
- `skills/hiring-campaign/schedule.md`: who is next, what is done.
- `queen-brain/voice.md` + `brand.md` if in session; the carousel
  template carries the visual canon either way.

## The weekly run

1. **Pick.** Take the next THREE `planned` rows from schedule.md. Read
   each employee's real job description in
   `agent-os-company-dashboard/company/departments/<dept>/<file>.md`
   (if the repo is in session; otherwise use the role summary column in
   schedule.md and note the source gap in the report).
2. **Mode check.** PROOF only if a real instance ran in the last 7 days
   with a linkable receipt (check reports/, performance-log.md, board
   pages). Otherwise PLAYBOOK. Never fake PROOF.
3. **Write the week's set** (all voice laws apply, no em-dashes):
   - Hiring announcement (job-ad parody, Monday slot).
   - Episode post (the skeleton from employee-stories, Wednesday slot).
   - Carousel: 6-7 slides via carousel-factory, rendered and inspected.
   - Reel script (30-45s) for the talking-head machine, with the
     captions pass noted as required.
4. **Playbook law** (PLAYBOOK mode): build all four assets the same
   run: `lead-magnets/<slug>.md`, `site/guides/<slug>.html` (standard
   template), opt-in catalog entry, ACTIVE row in lead-magnets.csv with
   the episode keyword. The inbox-manager-setup set is the model.
5. **Tracker.** Update `site/99.html`: announced employee gets an
   "interviewing" slot; a badge (hired state + receipt) ONLY with a
   real receipt. Update the name table in employee-stories/SKILL.md and
   schedule.md the same run.
6. **File.** Vault entries for each asset (next numbers, top, DD/MM/YYYY;
   ACP ratio holds; every A-post CTA keyword verified ACTIVE).
7. **Queue.** If Blotato/distribution is reachable from this session,
   queue per M04 (queue-only). If not, mark entries READY TO POST and
   list them in the report for the VPS distribution machine to pick up.
8. **Ship.** Commit and push to the designated working branch. Write
   `reports/hiring-campaign-YYYY-MM-DD.md`: employee, mode, assets
   produced, what is queued vs waiting, and the single release action
   Fatiha owes this week.

## Interconnections (how this run feeds the other machines)

- **Board meeting (Nour, Mondays 08:07)** runs 3 hours after this one
  and reads reports/hiring-campaign-*.md: waves produced vs released is
  a standing board metric. Unreleased waves get named at the board.
- **Website loop (Mondays 09:07)** deploys/refreshes site work; tracker
  and guide pages from this run ride the same branch.
- **M04 distribution (VPS)** picks up the READY TO POST vault entries;
  this run never queues to Blotato directly if the VPS machine is
  healthy (one queue owner, no double-scheduling).
- **M06 performance-tracker** numbers feed next wave's choices: if an
  episode format outperforms, the report says which and the next wave
  leans into it.
- **Insider Brief (Tuesdays)** gets a one-line "this week's openings"
  cross-mention drafted by this run for the newsletter engine to use.
- Every playbook's keyword lands in the same n8n -> GHL capture rail as
  all other magnets; source tags make each employee's episode
  measurable on its own.

## Hard rules

- Three employees per run, one wave per week. Never more than one wave
  ahead.
- The counter never runs ahead of receipts (tracker law).
- If the previous week's episode was never released, this run still
  produces, but the report says so in the first line: unreleased work
  is the bottleneck, not production.
- If anything blocks an asset (missing repo, dead render), produce the
  rest, log the gap, never invent.
