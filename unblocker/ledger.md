# Unblocker Ledger — the blocker registry

> Maintained by `skills/unblocker/`. Seeded 2026-07-06 from the full estate.
> One entry per human-only action. Append, never renumber. Killed entries stay.
> Queue order below reflects current scoring (revenue ÷ effort × dependency × age).

## Queue (next up, in order)

1. UNB-025 — Queue 1 clean READY TO POST entry into Blotato yourself *(serve 2, 16/09 — shrunk from 3 posts to 1)*

> UNB-001 through UNB-024 (below) are the original 06/07/2026 seed batch, built
> entirely from the pre-pivot offer model (Whop SKU checkouts, Fast Forward
> course, founding-tier community, raw-identity capture). `context/GOALS.md`
> (refreshed 11–12/09/2026, current authority) states: "The old membership
> target, Fast Forward launch and forced single-SKU rule are archived" and
> "Do not repeatedly assign obsolete tasks to Fatiha." They are left in place
> as evidence per `CLAUDE.md` ("historical schedules and offers... are
> evidence only") but are not eligible for selection until re-grounded in a
> current source (live website / Notion Product Hub / Content Factory Brand
> Strategy) — see the 15/09/2026 superseded-batch note before Entries.

---

## Entries

### Superseded batch — 15/09/2026 scan

UNB-001 through UNB-024 (all entries below, added 06/07/2026) score on
revenue/effort/dependency figures pulled from `queen-brain/STATUS.md` and
`ROADMAP.md` as they read on 06/07/2026 — a repo/context version that
predates both the 24/08/2026 strategic pivot (`AGENTS.md` §Current strategic
decision — Zone of Genius / Human Evidence / Use What Is Unique, replacing
the Whop-SKU-ladder model) and the 12/09/2026 context refresh
(`context/current-context.json`, `context/GOALS.md`: "the old membership
target, Fast Forward launch and forced single-SKU rule are archived").
`queen-brain` is not present in this session (see session reality-check
banner: "canon: queen-brain NOT in this session... ask for the repo instead
of reconstructing it from this one's copies") and this run has no Notion
access, so none of these entries' revenue figures, SKU/price claims, or
offer statuses can be re-verified from a current source today. Per
`context/GOALS.md` ("do not repeatedly assign obsolete tasks to Fatiha")
none of UNB-001–024 were eligible for selection this run. Bodies kept
below unedited as evidence, not as an active queue. Re-activate only after
re-grounding a given item in a current source (live website / Notion
Product Hub / Brand Strategy) and re-adding it as a fresh, dated entry.

---

### UNB-001 — Create the Telegram butler bot + install the VPS crons
- **why:** unblocks daily delivery of this system AND the 20:00 brain-manager cron; the whole autonomous loop is waiting on this one token
- **revenue_unlocked:** indirect (enables everything daily) · **effort_min:** 12
- **depends_on:** — · **unblocks:** UNB-006/007 (brain via Telegram), all daily serves
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 6; inventory.md missing checklist ("Brain Manager Telegram")
- **verify:** first successful `telegram-notify.sh` send (operator ✅ or bot reply)
- **status:** served · served_count: 1 · added: 2026-07-06 · pack: `packs/2026-07-06-UNB-001-telegram-bot.md`

### UNB-002 — Create the Whop checkout for The Judge's Prompts ($27) and paste the link into store.html
- **why:** first live checkout on the estate; 3 products are READY TO SELL with $0 flowing, and the standing rule is "no new SKUs until one existing SKU has a live checkout"
- **revenue_unlocked:** $27/sale, first-dollar proof · **effort_min:** 15
- **depends_on:** — · **unblocks:** UNB-003 (store worth pulling live), UNB-004/005 (warm flow), launch content
- **source:** queen-brain/STATUS.md §Products ("Remaining before money: SHE creates Whop/Stripe products and pastes links") + §ONLY FATIHA item 1
- **verify:** `site/store.html` PRODUCTS entry for The Judge's Prompts has a non-empty `url`
- **status:** open · served_count: 0 · added: 2026-07-06 · pack: `packs/2026-07-07-UNB-002-whop-judges-prompts.md`

### UNB-003 — VPS pull to take the new site + store live
- **why:** 16 guides, the store, and the reframed opt-in are in the repo but not deployed; after UNB-002 the store goes live with a working Buy button
- **revenue_unlocked:** activates the whole site funnel · **effort_min:** 10
- **depends_on:** UNB-002 (nicer with a checkout live) · **unblocks:** analytics, opt-ins, store sales
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 7
- **verify:** guides.shiftandlead.com/store.html serves the new PRODUCTS config (URL check)
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-004 — Whop checkout: The Prompt Menu ($19), paste link
- **why:** second SKU live while the Whop flow is warm from UNB-002
- **revenue_unlocked:** $19/sale · **effort_min:** 10
- **depends_on:** UNB-002 · **unblocks:** —
- **source:** queen-brain/STATUS.md §Products (READY TO SELL)
- **verify:** store.html PRODUCTS url non-empty for The Prompt Menu
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-005 — Whop checkout: The AI Time Audit ($47), paste link
- **why:** third SKU live, completes the money rails hour
- **revenue_unlocked:** $47/sale · **effort_min:** 10
- **depends_on:** UNB-002 · **unblocks:** nurture sequence upsell (email 3-4)
- **source:** queen-brain/STATUS.md §Products (READY TO SELL); ACTION-PLAN Phase 5
- **verify:** store.html PRODUCTS url non-empty for The AI Time Audit
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-006 — Seed personal-brain, part 1 (15 min of the interview)
- **why:** the brain has 2 entries; every draft the engine writes is generic until this exists; fixes output quality across ALL machines
- **revenue_unlocked:** indirect (content quality → conversion) · **effort_min:** 15
- **depends_on:** UNB-001 (nicer via Telegram; can run in-session) · **unblocks:** UNB-007, better daily drafts
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 3; ACTION-PLAN Phase 1; personal-brain.md header ("round 2 paused by operator")
- **verify:** personal-brain.md ≥6 categories populated
- **status:** open · served_count: 0 · added: 2026-07-06 · note: she paused the seed once — serve as 15-min halves, voice-note friendly

### UNB-007 — Seed personal-brain, part 2 (finish the interview)
- **why:** completes the living-memory layer; the corporate-exit story (flagged highest-value follow-up in the brain itself) lands here
- **revenue_unlocked:** indirect · **effort_min:** 15
- **depends_on:** UNB-006 · **unblocks:** storytelling drafts with real anecdotes
- **source:** personal-brain.md §Background ("single highest-value follow-up")
- **verify:** personal-brain.md ≥9 categories populated + exit story recorded
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-008 — Release the 11 READY posts via Blotato
- **why:** 11 finished pieces are invisible; content is the top of the entire funnel and it has never fired at volume
- **revenue_unlocked:** funnel top · **effort_min:** 15
- **depends_on:** — (keyword-CTA posts land better after UNB-009+) · **unblocks:** performance data, DM keywords
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 5; ACTION-PLAN Phase 3
- **verify:** content-vault.md statuses flip to SCHEDULED/POSTED
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-009 — Host the TEAM lead magnet on GHL, flip active=yes
- **why:** "First AI Employee" is the highest-overlap magnet; first live keyword makes comment-CTAs real
- **revenue_unlocked:** email list start · **effort_min:** 15
- **depends_on:** — · **unblocks:** UNB-010, keyword CTAs on posts
- **source:** ROADMAP Priority-0 Action 1; ACTION-PLAN Phase 2; lead-magnets.csv row TEAM
- **verify:** lead-magnets.csv TEAM row has URL + active=yes
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-010 — Build the GHL comment→DM workflow for TEAM
- **why:** turns comments into captured leads automatically; the money engine's first live wire
- **revenue_unlocked:** lead capture on autopilot · **effort_min:** 15
- **depends_on:** UNB-009 · **unblocks:** dm-responder going live for IG
- **source:** ACTION-PLAN Phase 4
- **verify:** operator ✅ (test comment from second account)
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-011 — Host the STACK lead magnet on GHL, flip active=yes
- **source:** ROADMAP Priority-0 Action 1; lead-magnets.csv row STACK
- **depends_on:** UNB-009 (warm flow) · **effort_min:** 10 · **verify:** csv row live
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-012 — Host the PROMPT lead magnet on GHL, flip active=yes
- **source:** ROADMAP Priority-0 Action 1; lead-magnets.csv row PROMPT
- **depends_on:** UNB-009 (warm flow) · **effort_min:** 10 · **verify:** csv row live
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-013 — Paste the 5-email nurture sequence into GHL
- **why:** downloads currently go cold by design; this converts them. Agent drafts the emails first (agent-side prep, not a human blocker)
- **revenue_unlocked:** download → member conversion · **effort_min:** 15 (paste + wire trigger)
- **depends_on:** UNB-009 + agent-drafted emails · **unblocks:** the full funnel
- **source:** ROADMAP Priority-0 Action 2 + backlog 13
- **verify:** operator ✅
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-014 — Set up the Whop community space (founding tier)
- **why:** the FOUNDING keyword + founding post are blocked until the offer exists (ENTRY 015 PREP flag); Skool is sunset, Whop is the home
- **revenue_unlocked:** recurring MRR rail · **effort_min:** 15 (create space; agent preps sections + seed content)
- **depends_on:** UNB-002 (Whop account warm) · **unblocks:** UNB-015, FOUNDING keyword
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 1; lead-magnets.csv FOUNDING row
- **verify:** operator ✅ (community URL exists)
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-015 — Post the founding-member call on LinkedIn
- **why:** 20 founding spots; the estate's own math says this single post can start recurring revenue
- **revenue_unlocked:** ~$540+/month at 20 members · **effort_min:** 10
- **depends_on:** UNB-014 · **unblocks:** community growth
- **source:** ROADMAP Priority-0 Action 4; STATUS Money Path ("Launch = founding post")
- **verify:** operator ✅ or performance-tracker sees the post
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-016 — Send the speaker one-sheet to 3 warm contacts (serving 1 of ~3)
- **why:** one booking = $5,000–15,000; the one-pager has been "send to 10 contacts" on the roadmap for 2+ weeks. Split into 3-contact servings; agent picks names + drafts each DM
- **revenue_unlocked:** $5–15k/booking · **effort_min:** 15
- **depends_on:** — · **unblocks:** speaking pipeline
- **source:** ROADMAP Priority-0 Action 5; STATUS §ONLY FATIHA item 5
- **verify:** operator ✅ per serving
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-017 — Record the W.1 welcome video (5 min, phone)
- **why:** the one human lesson in the $499 course; everything else is producible without her
- **revenue_unlocked:** course launch path · **effort_min:** 5
- **depends_on:** — · **unblocks:** Fast Forward assembly
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 4
- **verify:** operator ✅
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-018 — Raw identity, part 1: record the 2-minute clean voice memo
- **why:** first slice of the "afternoon of raw identity" that unlocks the twin + course production line. Files stay OUT of git (red-tier data)
- **revenue_unlocked:** unlocks $499 course production · **effort_min:** 5
- **depends_on:** — · **unblocks:** UNB-019/020, course production line
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 2
- **verify:** operator ✅
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-019 — Raw identity, part 2: 15–30 photos (varied light/angles)
- **source:** STATUS §ONLY FATIHA item 2 · **effort_min:** 15 · **depends_on:** — · **verify:** operator ✅
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-020 — Raw identity, part 3: desk scenario clip + sign the consent block
- **source:** STATUS §ONLY FATIHA item 2 · **effort_min:** 10 · **depends_on:** — · **verify:** operator ✅
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-021 — Confirm the DECISION NEEDED block in queen-brain/offers.md
- **why:** open decisions block agent work downstream; deciding is shipping
- **effort_min:** 10 · **depends_on:** — · **unblocks:** agent tasks gated on those decisions
- **source:** queen-brain/STATUS.md §ONLY FATIHA item 8
- **verify:** offers.md DECISION NEEDED block resolved
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-022 — Pick the analytics tool (Plausible or Umami) — one reply
- **why:** one script tag is waiting on this choice; without it the live site is flying blind
- **effort_min:** 2 · **depends_on:** UNB-003 · **unblocks:** agent installs analytics
- **source:** queen-brain/STATUS.md §MISSING table ("her account pick")
- **verify:** choice recorded (reply or STATUS edit)
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-023 — API keys batch (serve individually, only when blocking): Kit API · ElevenLabs · Higgsfield/HeyGen · image-gen · Meta tokens · Unipile · Opus Clip · DNS access for apex domain
- **why:** each key unblocks a named machine (see inventory.md missing checklist); served one at a time when its machine is next
- **effort_min:** 5–10 each · **source:** STATUS §ONLY FATIHA item 6; inventory.md MISSING table
- **verify:** key present in deploy/.env (operator ✅; keys never pasted in chat or git)
- **status:** open · served_count: 0 · added: 2026-07-06

### UNB-024 — Connect a TikTok account to Blotato
- **why:** the plan wants TikTok; it's the only unconnected planned channel
- **effort_min:** 10 · **depends_on:** — · **source:** inventory.md §Channels + MISSING
- **verify:** operator ✅ (then update inventory.md channels table)
- **status:** open · served_count: 0 · added: 2026-07-06

---

### UNB-025 — Queue 3 clean READY TO POST vault entries into Blotato, manually
- **why:** the estate's actual current bottleneck (confirmed this run): 37
  READY TO POST entries sit in the vault, all 63+ days old, and nothing has
  moved into Blotato since 20/07/2026 (57+ days). `skills/distribution/
  SKILL.md` lost its Blotato write scope in the 14/09/2026 context refresh
  (PR #131) and was never on a cron — no agent can queue anything right now,
  only Fatiha, manually, inside Blotato itself
- **revenue_unlocked:** unblocks the entire content funnel's top (0 posts
  have gone out since the 22/06/2026 vault reset) · **effort_min:** 15 (3
  posts, copy pre-pasted, click-path enumerated)
- **depends_on:** — · **unblocks:** performance-tracker data, review-cockpit's
  shelf actually clearing, future unblocker serves in this lane
- **source:** `skills/distribution/SKILL.md:6-8` ("prepare a handoff... do
  not create a Blotato job"); `reports/distribution-2026-07-20.md` (last
  distribution report, SCHEDULED=0 POSTED=0); `deploy/crontab.example` (no
  `/distribution` line); `review-cockpit/state.md` 15/09/2026 digest ("Ready
  shelf... 37 READY TO POST entries, all 63+ days old... shelf cap of
  3/digest"); `content-vault.md` ENTRY 093/092/091 (verified clean: no
  VERIFY/PREP flag, active CTA)
- **verify:** `content-vault.md` ENTRY 093/092/091 status lines flip to
  `SCHEDULED`, or operator ✅
- **status:** served · served_count: 3 · added: 2026-09-15 · pack:
  `packs/2026-09-15-UNB-025-queue-three-ready-posts.md`,
  `packs/2026-09-16-UNB-025-queue-one-ready-post.md`
- **note:** this does not fix the systemic gap — `distribution` still can't
  queue on its own. The systemic fix (reconnect Blotato + re-authorize
  `distribution` to queue per `security.md` §5) is a bigger decision for
  Fatiha, flagged in today's briefing, not folded into this 15-minute task.
- **16/09/2026 follow-up:** checked `content-vault.md` ENTRY 093/092/091 —
  all three still `READY TO POST`; `review-cockpit/state.md` confirms
  `getUpdates` returned no unblocker replies since the 15/09 serve. Not
  done. Per the skill's serve-2 rule, re-served today shrunk to just 1 post
  (ENTRY 093 only) instead of 3, same task, smaller ask.
- **17/09/2026 follow-up (serve 3):** checked `content-vault.md` ENTRY
  093/092/091 — all three still `READY TO POST`, unchanged.
  `review-cockpit/state.md` confirms `getUpdates` has returned empty on
  every sweep 14/09 through 17/09 — no unblocker reply, no card reply, no
  voice note in three days. Not done, third morning running. Per the
  skill's serve-3 rule this is not re-served as the same ask a fourth time;
  sent the gentle-confrontation message instead (kill / shrink further /
  name a real blocker), Telegram send confirmed. Awaiting operator reply
  before next action on this entry.

---

## Done

*(nothing yet — the first ✅ goes here)*

## Killed

*(deliberate no's live here; a decision is a ship too)*
