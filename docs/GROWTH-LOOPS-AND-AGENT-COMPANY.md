# Growth Loops & the Agent Company — what the winners do that we don't, and how the 137 agents run it

> Created: 2026-07-05 · Status: LIVING DOCUMENT
> Sources: `inspiration-library/creators.csv` (21 tracked creators), the
> 2026-07-05 estate audit, `agent-os-company-dashboard` (the 137-agent company).
> Companions: `docs/OPERATOR-PLAYBOOK.md`, `docs/AUTOMATED-DELIVERY-BLUEPRINT.md`.

---

## 1. The gap table — what top automation creators run that this system doesn't (yet)

Read against your own creator library. Column 4 is what got built or designed today.

| # | What the winners do | Who proves it (your own CSV) | Your state | The fix |
|---|---|---|---|---|
| 1 | **Owned newsletter as the compounding asset** — platform content dies in 48h; the list converts forever | Chris Donnelly (200K newsletter), Jordan Wilson (podcast→newsletter flywheel), Neil Patel (owned channel as source of record), Paul Roetzer | ❌ No newsletter exists anywhere in the estate | ✅ **BUILT: `skills/newsletter-engine`** — weekly issue assembled from what the machine already produced. Loop: weekly. |
| 2 | **Long-form YouTube tutorials** — search-ranked, evergreen, depth-authority; each video births 5–10 shorts | Nate Herk (result-reveal, 826K+ views), Jeff Su (time-claim hooks, 3.8M+), Layla (chaos-to-system), Marina Mogilko (11M) | ❌ Zero long-form; reels-factory has no input to clip | ✅ **BUILT: `skills/youtube-factory`** — full script + twin render brief + SEO kit. The twin does the talking; you record only screen demos. Loop: weekly. |
| 3 | **AI avatar at scale, disclosed** | Sabrina Ramonov (HeyGen for scale, sold startup $10M+) | Designed (blueprint §2), avatar not yet cloned | Playbook Phase 1 — the half-day session unblocks loops 2, 5, 6 |
| 4 | **Named numbered series** — completion urgency, follow-forcing | Harper Carroll ("10 Days of AI Basics": 2K→200K in 3 weeks), Aiman Naqvi ("Day N" mechanic) | The Activation Arc is designed but not framed as a series | Frame it as **"Day N of switching on the machine"** — numbered, named, finite. content-engine adds the series header to every Arc post. |
| 5 | **Show the system RUNNING** — proof is the content, demo before explanation | Angelica Automates (show-and-tell → course funnel), Riley Brown (result-first demo), Sabrina (meta-teaching) | The machine is invisible; you have MORE system than any of them and show none of it | Every Arc episode includes a 20–40s screen capture of the machine actually working (the vault filling, the queue scheduling). Loop: built into content-engine drafts as a shot-list line. |
| 6 | **Carousel volume with a signature look** | Chris Donnelly (carousels = 2× performance, 30/30/30 rule, myth/reality format), Ruben Hassid (volume + number hooks) | visual-engine exists; CAROUSELS-50 sits at 2/50 | Weekly batch loop: visual-engine + Gamma render 3 carousels/week from the week's best vault entries. Adopt one signature color/format (Donnelly's green lesson). |
| 7 | **Fixed daily cadence as authority** | Allie K. Miller (daily 1PM EST, provocation-first) | Crons designed, never running | Playbook Phase 2. Cadence itself is a credibility signal. |
| 8 | **Question-mining → content/course flywheel** — audience questions become tomorrow's content and course patches | Angelica (content → audience question → course), Clare Kitching (one-person resonance, comment replies) | No mechanism | **Loop L6 (design below):** weekly sweep of comments + DM keywords + community posts → FAQ ranking → 3 content angles + course patch list. |
| 9 | **Named framework / institute positioning** | Paul Roetzer (Marketing AI Maturity Model, MAICON), Brooke Wright (STACK method) | Decided ("the Business OS") but not yet stamped on everything | Decision log item — then content-engine puts the framework name in every relevant piece. |
| 10 | **Engagement quality over reach** — replies build evangelists who buy high-ticket | Clare Kitching (~1,147 avg likes on a small account → high-ticket consulting) | N/A yet | Your 5 manual minutes/day in the playbook ritual. Never automated. |

The honest headline: **you are not missing capabilities, you are missing loops.**
Nine of ten gaps are cadence problems, not build problems — and two of the three
real build gaps (newsletter, YouTube) were closed today as skills.

---

## 2. The loop schedule (what runs, when, and who runs it)

| Loop | Cadence | Skill(s) | Human step |
|---|---|---|---|
| L1 Daily content machine | Daily (cron: 20:00 brain, 02:00 signals, 02:30 engine, 03:00 tracker) | brain-manager → signal-harvester → content-engine → performance-tracker | 15-min morning queue approval |
| L2 Weekly creator-gap watch | Weekly Mon | competitor-watch, **extended**: end every report with "what they shipped that we didn't" + 3 concrete actions | Read it in the weekly 60-min review |
| L3 Weekly newsletter | Weekly Fri | **newsletter-engine** (new) | Approve + paste into GHL/LinkedIn (10 min) |
| L4 Weekly long-form video | Weekly | **youtube-factory** (new) → twin renders → reels-factory clips it | Record the screen demos (30–60 min); QA the render |
| L5 Weekly carousel batch | Weekly | visual-engine + Gamma, 3 carousels from the week's best entries | Approve visuals |
| L6 Weekly question-mining | Weekly Sun | New mode for performance-tracker/dm-responder data: rank questions from comments/DMs/community → 3 angles + course patch list | None — feeds L1 and the course factory |
| L7 Monthly revenue & pricing audit | Monthly | monetisation `revenue-audit` | The 2-hour monthly review |

L1 and L7 exist. L3 and L4 were built today. L2, L5, L6 are prompt-level
extensions I can add on request (small edits to existing skills).

**Where the loops physically run:** the VPS crons (playbook Phase 2) are the
permanent home. Until the VPS is up, the weekly loops (L2–L5) can run as
scheduled Claude web sessions — say the word and I arm them; each firing costs
tokens, so this is your call, not mine.

---

## 3. The 137-agent company: how it runs this end-to-end (the honest version)

### 3.1 What's actually true today

- The **company engine works**: `/api/company/run` genuinely executes any of the
  137 role agents (role.md + SOUL.md + second brain → OpenRouter), logs runs,
  writes to the vault. The latest commit added **scheduling any of the 137
  agents** (scheduler `company` job type) — the loop infrastructure exists.
- The **roles already match the loops**: `marketing-content-engine`,
  `marketing-carousel-designer`, `marketing-email-nurture`,
  `marketing-case-study-writer`, `marketing-brand-voice-guard`,
  `marketing-analytics-digest`, plus sales/deals (corporate outreach),
  intelligence (judging), customer (onboarding/testimonials), backoffice
  (invoicing). The org chart was built for exactly this work.
- **Hermes is the biggest gap, by your own audit** (`WHAT-I-HAVENT-DONE.md`):
  installed but no model on the main profile, no SOUL, no skills, gateway not
  running, 12,636 commits behind, no MCPs. Today Hermes can do nothing.

### 3.2 The target architecture (division of labor)

```
YOU (decide · appear · QA — 25 min/day)
  │
HERMES — the 24/7 dispatcher (once configured)
  │  listens: Telegram, webhooks (n8n), cron
  │  routes jobs to departments · enforces SOUL approval gates
  │  (anything money/legal/client-facing → pauses for you)
  │
THE 137 — cheap specialist executors (OpenRouter, per-role prompts)
  │  Marketing dept → drafts, carousels, emails, case studies   (Loops L1,L3,L5)
  │  Intelligence dept → critic/judge pass on everything         (the quality gate)
  │  Sales/Deals → corporate one-pagers, follow-ups              (Phase 7 support)
  │  Customer → onboarding, testimonial asks                     (n8n triggers)
  │  Operations/Backoffice → scheduling, invoicing               (admin loops)
  │
CLAUDE CODE (me) — the architect & senior engineer
  │  builds/repairs skills, workflows, the course factory; audits the fleet
  │
THE TWIN — the face (renders every [TWIN] block the factory produces)
```

This matches the cost design already in `GUIDE-FOR-HUMANS.md` (cheap engine /
writer engine / judge engine): **the 137 do volume cheaply, the judge layer
gates quality, I do the hard builds, the twin does the appearing, you do the
deciding.** For the course specifically, end-to-end looks like:
youtube-factory/course-production writes scripts → twin renders → intelligence
agents + brand-voice-guard judge against `positioning/` → carousel-designer +
email-nurture agents build the launch assets per lesson → scheduler queues →
**you QA and release** (Standing Rule 4 survives every architecture).

### 3.3 The pragmatic path (do NOT block on Hermes)

- **Phase A (now):** VPS crons run L1–L7 via this repo's skills. Zero Hermes
  dependency. This is the playbook as written.
- **Phase B (cheap win, ~1 evening):** use the dashboard's own scheduler to run
  marketing + intelligence agents nightly against the second brain — point the
  dashboard's brain at this repo (one `queen-brain` path decision) so the 137
  read the SAME vault/positioning the skills do. One brain, two engines.
- **Phase C (Hermes activation — your checklist, ~half a day):**
  1. Update Hermes (12k commits behind) · 2. Set a model on the `main` profile
  · 3. Write its SOUL.md (I draft it from `company/SOUL.md` + `security.md`)
  · 4. Start the gateway and keep it running (launchd/systemd)
  · 5. Connect Telegram so it's reachable from your phone
  · 6. Grant it the scheduler + company/run endpoints.
  From then on, Hermes replaces raw cron as the dispatcher: same loops, but
  now interruptible, routable, and conversational from your pocket.

The sequencing rule from the estate audit applies here with full force:
**Hermes is Phase C because it multiplies a running machine — it cannot
resurrect a dormant one.** Loops first, dispatcher second.

---

## 4. Build queue (what I do next, on request)

- [x] `skills/newsletter-engine` — built 2026-07-05
- [x] `skills/youtube-factory` — built 2026-07-05
- [ ] Extend competitor-watch with the "gap + 3 actions" closing section (L2)
- [ ] Weekly carousel-batch mode for visual-engine (L5)
- [ ] Question-mining mode (L6) — needs GHL live first (playbook Phase 3)
- [ ] Series-header rule for the Activation Arc in content-engine (gap #4)
- [ ] Draft Hermes SOUL.md + the Phase-C runbook
- [ ] `course-production` skill (blueprint §2 — waiting on avatar IDs)
- [ ] Arm L2–L5 as scheduled sessions until the VPS is live (operator's call — token cost)
