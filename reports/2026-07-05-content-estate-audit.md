# Content Estate Audit — Full Sweep Across All Three Repositories

> Date: 2026-07-05
> Scope: `content-system`, `fast-forward`, `agent-os-company-dashboard` — every folder, every asset
> Purpose: the ground-truth inventory behind `docs/FLAGSHIP-COURSE-STRATEGY.md`
> Method: three parallel deep audits (one per repo) + two focused sub-audits
> (all 18 skills; positioning/products/lead-magnets/site/dashboard/reports),
> synthesized and verified against the source files.

---

## 1. The one-paragraph verdict

You do not have a content problem. You have a **shipping problem wrapped in a
fragmentation problem**. Across three repositories there is a ~95%-written
51-lesson flagship course, a ~85%-built Business OS with 18 skills, a working
dashboard, 9 finished lead magnets, 2 finished paid products, a 10-guide Skool
funnel, a full email/affiliate/bonus offer wrapper, and a functional Agent OS
console prototype — and **not one of them has ever been shipped, sold, posted,
or activated**. Zero vault entries posted. Zero lead magnets live. Zero store
buy-buttons wired. Zero course lessons recorded. The multi-million-dollar asset
already exists; it is currently generating $0 because everything stops one step
before contact with the public.

---

## 2. Inventory — what actually exists, by repo

### 2.1 `content-system` — the Business OS (~85% built, 0% activated)

| Asset | State | Notes |
|---|---|---|
| `positioning/SKILL.md` | ✅ FINISHED | Real, specific, iterated (brand pivot 22/06/2026 documented). Strong teachable artifact. |
| `inspiration-library/` | ✅ FINISHED | 21 fully-profiled creators + **15 named hook/format patterns** + application rules. The single best swipe-file asset in the estate. |
| 18 skills in `skills/` | 11 FINISHED / 5 PARTIAL / 2 inert | See §2.4. The finished ones are portable teaching IP; the partial ones are tool-locked (Blotato/Higgsfield/Reap/GHL). |
| `dashboard/` (Astro) | ✅ FINISHED, runnable | 1,600-line content-pipeline cockpit over the markdown vault. Real app. |
| `deploy/` | ✅ FINISHED (unexecuted) | Complete VPS runbook: install, crons, systemd, Telegram alerts, Doppler secrets, hardening. Never run in production. |
| `lead-magnets/` | ✅ 9 of 12 built, **0 of 12 active** | 8 `.md` guides + 10 designed `chez-*.html` guides. CSV has 12 keyword rows, all `active: no`. **BUILD keyword is already live on Instagram posts with no resource behind it — an active leak.** |
| `products/` | 2 built, 2 phantom | The Judge's Prompts ($27) and AI Time Audit ($47) are finished. Business OS Starter Kit ($97) and "Chez Prompts" ($19) are on the store page but have **no product file anywhere**. |
| `site/` | Design-complete, **commercially inert** | Every product on `store.html` has `url: ""` — nothing is purchasable. Speaking page ($5k/$8k/$15k) is done. |
| `content-vault.md` | 23 entries: 13 READY TO POST, 10 DRAFT, **0 POSTED ever** | The engine writes; nothing publishes. |
| `personal-brain.md` | ❌ **EMPTY (0 entries)** | The file that makes content personal and credible has never been seeded. This is the root cause of "generic content nobody clicks." |
| `research-notes.md` + `reports/` | Real substance | 15 research digests, 14 vault audits, 12 competitor watches — genuinely good. Plus one pathology: see §4.3. |
| `tenants/` | Scaffold only | Template exists, zero real tenants. Multi-client is designed, unproven. |
| `transcripts/` | 2 high-quality transcripts | Thin volume. |
| Secrets scan | ✅ Clean | No real credentials in tracked files (placeholders only). |

### 2.2 `fast-forward` — the course estate (one flagship + two ghosts)

| Folder | What it is | State |
|---|---|---|
| **`course-whop-upload/`** | **"Fast Forward Online Self-Paced" — the flagship.** 10 modules (M0–M9), **51 fully-written lessons** with teaching prose, examples, prompt templates, mistake tables. | ✅ ~95% written · ❌ 0% recorded · ❌ 0% uploaded (INDEX checklist fully unchecked) |
| `course/` | Earlier 7-module Skool draft of the same course | ❌ **Byte-identical subset of course-whop-upload. Zero unique content. Delete.** |
| `fast-forward/` (wrapper) | The offer machine around the flagship: MASTER-MANIFEST, 3-tier pricing, email nurture (14/21 emails written), affiliate program (~90%), bonus stack, 21-day implementation challenge (~95%) | ⚠️ 70–90% — but several folders the manifest claims exist (**sales-page/, policy/PRICING.md, GUARANTEE.md, LIFETIME-UPDATES.md, templates-library/, testimonial-engine/, video-delivery/**) are **not on disk**. Either unsynced from your local machine or never built. |
| `fast-forward/module-1` + `module-2` | **A different product also called "Fast Forward"** — an AI-systems-installation cohort (Sweaney companion), $699→$999. Contains the **L1/L2/L3 agent-governance "BIBLE"** — the deepest, most differentiated material in the estate. | 2 modules complete; product abandoned after module 2 |
| `courses/fast-forward/module-content-factory/` | A **third** "Fast Forward": one finished module (cron-scheduled, Telegram-delivered autonomous content pipeline) referencing prerequisite modules that don't exist | 1 module, orphaned |
| `courses/built-with-claude/` | $99 lifetime Skool course, 10 modules promised | ~10–15% — sales page done, only Module 1 has content. |
| `courses/design-md-*.md` | DESIGN.md brand-memory-for-agents teaching module (credited "Shift & Lead") | Orphaned; topic covered nowhere else |
| `skool-guides/` | 10-guide funnel: 7 free lead magnets → ManyChat/IG DM → 3 paid guides (Playwright, Remotion, Code Audit) | ✅ ~85% — most finished secondary product. Gaps: **no price ever stated for the paid tier**, Loom links unrecorded, referenced downloads missing. |
| `bonus-stack/` detail | HOOKS-100: ✅ all 100 written. AUDIT-CALCULATOR.html: ✅ works. CAROUSELS-50: ❌ 2 of 50. REELS-25: ❌ 3 of 25. Own status flags overstate completion. | Mixed |
| `case-studies/` | Skeleton frames, explicitly `needs user fill` | ~15% — **you have no publishable case study.** |

Git history: 5 bulk "Add files via upload" commits in 34 minutes on 2026-07-05 — the repo is a snapshot of local work, so internal frontmatter dates are the only real timeline (module-1 = early May; flagship + wrapper = 20–22 June, the newest work).

### 2.3 `agent-os-company-dashboard` — the capstone candidate

- **What it is:** a real Next.js 15 agent-execution console — Mission Control,
  live Claude CLI bridge, Obsidian "Memory Galaxy," and the standout: an
  **"AI Company" of 137 generic agent role definitions in 7 departments** with a
  real execution engine (`/api/company/run`) and a SOUL.md constitution.
- **State:** functional prototype. Core wiring is real (live system calls, real
  process spawning, honest empty states). But its own `WHAT-I-HAVENT-DONE.md`
  admits 10+ of ~20 advertised integrations are unconfigured (Hermes, voice,
  music, phone, several agent CLIs).
- **Key property:** the `company/` folder is **brand-agnostic template material**
  — stub second-brain, generic role definitions, demo client. It is already the
  shape of a sellable capstone ("install your company's AI workforce"), and it
  deliberately does not contain your proprietary data.
- **Not a duplicate** of the content-system dashboard: one is a read-only
  content-pipeline viewer, this is an agent-orchestration console. But note both
  claim port 4321, and you now have **three separate "second brain" concepts**
  (`content-system` vault, `queen-brain` repo, this repo's stub) that must be
  reconciled before any of this is taught.

### 2.4 Skills quality split (content-system)

- **Finished + portable (course-grade IP):** content-engine (95%), brain-manager,
  vault-audit, weekly-ops, business-os-kit, monetisation, irl-events,
  competitor-watch, research-digest, video-transcription, performance-tracker.
- **Partial / tool-locked (teach the pattern, not the tool):** distribution
  (Blotato), visual-engine (Blotato IDs decay), heygen (Higgsfield unverified),
  reels-factory (Reap never ran), signal-harvester (Apify flaky per your own logs).
- **Operationally inert:** dm-responder — spec is fine, but it has run ~300 times
  against a system with zero active lead magnets. See §4.3.

---

## 3. Duplicates — the kill list

| # | Duplicate | Decision |
|---|---|---|
| 1 | `fast-forward/course/` vs `course-whop-upload/` | **Delete `course/`.** Every file byte-identical; zero loss. |
| 2 | **Three products named "Fast Forward"** (flagship; module-1/2 Sweaney cohort; module-content-factory) | Flagship keeps the name. **Retire the other two as products**; harvest their unique material (governance BIBLE, content-factory module) into the flagship's advanced tier. A name collision is worse than a file duplicate — it splits your own authority. |
| 3 | Lesson 0.0 conflict: `M0-L00-tour-the-ai-kitchens.md` vs `day-1-lesson/LESSON-0.0-SHOCK-AND-AWE.md` (frontmatter says it *replaces* M0-L00) | **Ship SHOCK-AND-AWE as lesson 0.0** (it was written later, as the replacement); keep the Kitchens tour as lesson 0.1. Decide before recording. |
| 4 | `lead-magnets/chez-*.html` vs `site/guides/chez-*.html` (confirmed drifted, not identical) | Single source in `lead-magnets/`; site copies generated/synced from it. |
| 5 | `research-digest` vs `signal-harvester` | Acknowledged overlap. Keep signal-harvester as primary, research-digest as documented fallback — but in the *course*, teach only one. |
| 6 | Two dashboards, both port 4321 | Not duplicates (viewer vs console) — but rename ports and position them as two distinct lessons. |
| 7 | **Four price lists, three Community prices** ($47/mo in monetisation's table; $97/mo in monetisation's own checklist + CTA map; $197/mo in CLAUDE.md and irl-events; founding $27 vs $97 in the same file) | **Fix before anything ships.** Canonical recommendation in the strategy doc §"Pricing canon." |
| 8 | Three "second brain" concepts across repos | Canonical brain = `content-system` (`personal-brain.md` + vault). Agent OS dashboard reads from it; the in-repo stub stays a template for students. |

## 4. Unfinished — ranked by what it's costing you

### 4.1 Critical (blocking all revenue)
1. **Nothing is purchasable.** `store.html` products all have empty URLs; the $27
   and $47 products are *finished* — wiring two Gumroad/Stripe links is hours of
   work standing between you and first revenue.
2. **Zero lead magnets active** (12 CSV rows, all `active: no`) while the BUILD
   keyword is already live on published Instagram posts — you are collecting
   comments and delivering nothing. This is actively burning trust.
3. **13 READY TO POST vault entries never posted.** Your own vault-audit report
   already said it: "publish, not produce more."
4. **`personal-brain.md` is empty.** Every draft the engine writes is generic
   because the personalization layer has literally nothing in it.
5. **Flagship course: 0 of 51 lessons recorded**, upload checklist untouched.

### 4.2 Important (blocking the offer ladder)
6. Business OS Starter Kit ($97): spec exists in `business-os-kit`, product never built.
7. Skool paid tier has no price anywhere in 40 files.
8. Case studies are empty skeletons — no social proof exists in publishable form.
9. Missing manifest folders (sales-page, policy, templates-library, testimonial-engine,
   video-delivery) — check your local machine; if they exist locally, sync them; if
   not, they must be built or the manifest corrected.
10. Email nurture 14/21 written; CAROUSELS-50 at 2/50 and REELS-25 at 3/25
    (recommend cutting scope honestly to "25 carousels / 10 reels" rather than finishing 75 pieces).

### 4.3 Waste to stop
- **dm-responder runaway loop:** ~300 reports in 4 days (every 5–30 min), each
  re-deriving the same result — 0 active magnets, 0 leads — including a report
  that self-diagnosed "the loop is spinning, not progressing" and then kept
  running. Throttle to daily and gate it on `active=yes` rows existing. Keep 2–3
  sample reports; archive the rest. (This is also a genuinely good cautionary
  lesson for the course: *activate before you automate*.)
- `built-with-claude`: don't finish a fourth course at $99. Fold its Module 1
  voice-over scripts into the flagship and retire it.

## 5. The crown jewels — what a buyer would actually pay serious money for

Ranked by differentiation (what agencies would want to copy, and corporates would pay to install):

1. **The Business OS itself as a method** — the 7-machine loop (brain → signal →
   script → visual → queue → DM/lead → measure) with 18 working skill files, the
   append-only vault, the critic gate, the queue-only safety rule, the deploy
   runbook. Nobody sells this as an installable, inspectable system. This is the
   multi-million-dollar core — *the machine, not the lessons about tools*.
2. **The governance BIBLE** (`fast-forward/module-1/06-governance-and-architecture.md`)
   — L1/L2/L3 agent architecture doctrine. Deepest single artifact in the estate.
3. **Flagship modules M7–M9** (LLMs, agents, skills/sub-agents, MCP, scheduled
   agents, future-proofing) — practitioner depth that generic "learn ChatGPT"
   courses don't have.
4. **The inspiration library** (21 creators, 15 named patterns) + **HOOKS-100** —
   a real, proprietary swipe file.
5. **The Agent OS "AI Company" template** (137 roles, 7 departments, SOUL.md,
   execution engine) — the corporate-workshop capstone.
6. **The content-factory module** (cron + Telegram autonomous pipeline) and the
   **skool-guides technical builds** (Playwright, Remotion, Whisper transcription,
   code audit) — proof-of-craft assets.
7. **Your own activation story** — currently unwritten, and paradoxically the most
   valuable of all: the documented journey of turning this machine on is the case
   study that sells everything else. See the strategy doc.

## 6. What happens next

The decisions this audit feeds — one flagship, tiered IP protection, the
agency-license answer to "training my competition," the credibility/click-through
plan, and the 90-day sequence — live in **`docs/FLAGSHIP-COURSE-STRATEGY.md`**.
This report is the immutable record; the strategy doc is the living plan.
