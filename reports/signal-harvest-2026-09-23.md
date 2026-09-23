# Signal Harvest Run — 2026-09-23

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`).
**Run type:** Research only. No content drafted, no queue action, no publish action.
Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication).

---

## Approved audience problem (source: `context/positioning.md`)

Experienced professionals and founders with useful knowledge and lived experience
who feel overwhelmed by AI, or who struggle to turn that knowledge into visible,
valuable work. Three live starting points: (1) understand AI and know where to
begin, (2) recognise and protect what's uniquely theirs, (3) decide where AI
belongs in a real business problem and choose a first test.

Findings below are tagged to these three starting points and split by project
per `CURRENT-WORKFLOW.md`'s research/project separation: **shift-lead**
(public-eligible) vs **internal-research** (private tooling, not for public
content unless Fatiha requests that exact subject).

Prior run (2026-09-20) filled starting point 3 with a 14-month-old, contested
MIT NANDA figure and explicitly flagged it as due for a fresher replacement.
This run targeted that gap directly.

---

## shift-lead evidence (public-eligible)

### S1 — No clear path to start (Starting point 1)
- **Source:** Resume Now, "AI-Whelmed Worker Report"
- **URL:** https://www.cpapracticeadvisor.com/2026/09/17/44-of-skilled-workers-feel-overwhelmed-by-the-pressure-to-learn-and-use-ai-at-work/190236/
- **Published:** 2026-09-17 | **Captured:** 2026-09-23 (6 days old)
- **Exact data:** 44% of skilled workers feel overwhelmed by the pressure to learn and use AI at work (breakdown: 9% extremely, 17% somewhat, 18% a little). 44% say they do not have a clear path for where to start building AI skills. 42% are not confident integrating AI into their workflow.
- **Exact quote:** "Being AI-whelmed does not mean workers are against AI. It means they are trying to keep up with a fast-changing workplace while feeling unsure of where to start or how to build confidence in their AI skills." — Keith Spencer, career expert at Resume Now.
- **Read as:** near-verbatim match for pillar 1 ("understand AI and know where to begin") — names the barrier as a missing starting point, not resistance to AI. Fresher and more precisely worded than the 2026-09-20 SmarterX figure (barriers = lack of education/awareness); safe to use without repeating that citation.
- **Caveat:** sample size and field dates not disclosed in this coverage; treat as directionally strong, not a methodologically airtight figure.

### S2 — Task-triggered AI adoption, not strategy-first (Starting point 3 — gap-fill)
- **Source:** FreshBooks, "The Era of the Solopreneur" (Wakefield Research survey)
- **URL:** https://www.globenewswire.com/news-release/2026/09/15/3362093/0/en/before-they-hire-86-of-solopreneurs-try-ai-first-freshbooks-survey-finds.html
- **Field period:** 2026-06-22 to 2026-07-01, 500 solopreneurs/microbusiness owners | **Published:** 2026-09-15 | **Captured:** 2026-09-23 (8 days old)
- **Exact data:** 86% of solopreneurs and microbusiness owners say that when they hit a business task they can't complete entirely alone, they try AI before hiring someone. 90% say AI makes it easier for one person to start and run a business. 98% of AI users say it helped them hit objectives that wouldn't otherwise have been achievable.
- **Read as:** directly answers pillar 3's "decide where AI belongs in a real business problem and choose a first test" — the decision trigger in the data is a specific stuck task, not an AI strategy exercise. Much fresher (8 days vs. 14 months) and undisputed vs. the 2026-09-20 MIT NANDA figure; closes the gap flagged in that run's source health note.
- **Caveat:** methodology is disclosed and credible (named research firm, dated field window, n=500), but it's a vendor-commissioned survey (FreshBooks sells to this audience) — usable as evidence of a pattern, flag the commercial sponsor if citing the number directly.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — Frontier-lab model release cadence (RSS slot, `inventory.md`)
- **Source:** Anthropic News — "Introducing Claude Opus 5.5"
- **URL:** https://www.anthropic.com/claude-opus-5-5
- **Published:** 2026-09-22 | **Captured:** 2026-09-23
- Freshest qualifying post (≤7 days) on the highest-priority feed in `inventory.md`. Opus 5.5 positioned at Fable 5.1-level performance for most work at 40% lower cost than Opus 5. General AI-industry/pricing awareness relevant to this content-system's own model choices, not an audience-problem match. Keep internal.

### R2 — Coding-agent memory patterns (Hugging Face Blog, last 24h)
- **Source:** Hugging Face Blog — "relore: repository memory for coding agents"
- **URL:** https://huggingface.co/blog/huggingface/relore-repository-memory
- **Captured:** 2026-09-23 (published ~1 day prior)
- Freshest post on the second high-priority feed. Developer-facing agent-memory pattern — internal build interest only (how this content-system's own agents/tooling could work), not eligible for public shift-lead content per `positioning.md`'s private-operating-subjects rule.
- **Note:** did not independently verify claims inside this post (internal-research only; no public claim depends on it).

---

## Rejected this run (logged, not used)

- **The Deerborne Group / PRNewswire, "As AI Reshapes Consulting..."** (2026-09-22) — on-topic for pillar 2 (expertise/judgment over raw analysis) but self-published by a boutique niche consulting firm (life-sciences/genomics), undisclosed sample size, PR-release framing. Dropped rather than cited as independent research, per research-policy source-quality check.
- **Goldman Sachs small-business AI training press release** — WebFetch returned 403, same pattern as OpenAI Blog in prior runs. Not cited from a search snippet; dropped per research-policy (no invented sourcing).
- **MIT Sloan Review URL surfaced by search for "rethinking expertise"** — page content published 2025-10-20 (11 months old) and read like a contributed/guest piece rather than MIT Sloan's own reporting; not fresh enough to justify displacing existing pillar-2 sources from 2026-09-20, so not added.

---

## Source health

- WebFetch: functional for CPA Practice Advisor, GlobeNewswire, Anthropic News, Hugging Face Blog, PRNewswire, MIT Sloan Review. Blocked on Goldman Sachs pressroom (403) — consistent with prior 403s on OpenAI Blog/Forbes/Wilbur Labs.
- WebSearch: functional throughout.
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." Both S1 and S2 are survey data, not social engagement counts.
- Pillar 3 gap flagged on 2026-09-19 and partially filled (with caveats) on 2026-09-20 is now closed with a fresh (8-day-old), dated, disclosed-methodology source.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
