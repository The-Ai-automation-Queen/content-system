# Signal Harvest Run — 2026-09-20

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

Prior run (2026-09-19) flagged starting point 3 as thin. This run targeted
that gap directly.

---

## shift-lead evidence (public-eligible)

### S1 — Barriers are human, not technical (Starting point 1)
- **Source:** SmarterX, "2026 State of AI for Business Report" (6th annual edition)
- **URL:** https://smarterx.ai/reports/2026-state-of-ai-for-business
- **Field period:** Feb–Apr 2026, 2,100+ professionals surveyed | **Published:** May 2026 | **Captured:** 2026-09-20
- **Exact data:** Barriers to adoption — lack of education/training 38%, lack of awareness/understanding 35%, lack of time 30%, fear or mistrust of AI 29%.
- **Exact quote:** "Professionals aren't struggling with access to AI tools or budget to buy them. They're struggling with the pace and volume of what they need to learn and integrate."
- **Read as:** direct match for "understand AI and know where to begin" — names the barrier as learning capacity, not tooling or budget. ~4 months old — durable/educational angle, not a this-week hook.

### S2 — Experts' role is interpretation, not information (Starting point 2)
- **Source:** Cambridge Judge Business School, "Why human expertise still matters in the age of AI certainty"
- **URL:** https://www.jbs.cam.ac.uk/2026/why-human-expertise-still-matters-in-the-age-of-ai-certainty/
- **Published:** 2026-02-24 | **Captured:** 2026-09-20
- **Exact quotes:** "The research focuses not on whether AI will replace experts, but on the representation strategies that experts can and arguably should adopt in order to maintain their authority as interpreters and mediators between what is knowable and unknowable." (Dr Virginia Leavell) / "Smart humans who cede too much authority to AI may threaten their own positions while leaving audiences with misplaced certainty."
- **Read as:** strong, citable academic match for pillar 2 — reframes "what's uniquely yours" as the interpretive/mediating role, not just raw experience. Good supporting citation per `CURRENT-WORKFLOW.md` step 5 (write the explanation first, credit as evidence, not a borrowed hook).

### S3 — Why most first AI tests fail (Starting point 3 — gap-fill)
- **Source:** MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (primary report), via Virtualization Review coverage (direct fetch of the MIT report page returned no stable public URL in this session)
- **URL:** https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx
- **Report published:** July 2025 (research window Jan–Jun 2025: 300+ public AI deployments reviewed, 52 structured interviews, 153 survey responses) | **Captured:** 2026-09-20
- **Exact data:** 95% of enterprise generative-AI pilots showed no measurable P&L return; the 5% that succeeded were narrow, well-integrated pilots rather than broad rollouts.
- **Read as:** directly answers pillar 3's "choose a first test" — the failure mode isn't the technology, it's picking too broad a test. Usable as a teaching contrast ("here's why most first tests fail, and what the 5% did differently").
- **Caveat — flag before using:** this report is 14 months old, not fresh, and has drawn public methodology criticism (noted across secondary coverage). Cite as a well-known, still-referenced data point, not as new news. This is the best gap-fill found for pillar 3 this run; a fresher, less-contested source is still worth another pass.

### S4 — Experienced operators spot AI's shallow tells (Starting points 1 + 2)
- **Source:** Brafton, "The 4 Biggest Challenges in AI Content Creation"
- **URL:** https://www.brafton.com/blog/content-marketing/the-4-biggest-challenges-in-ai-content-creation/
- **Published:** 2026-06-02 | **Captured:** 2026-09-20 | Survey of 132 marketers
- **Exact data:** "The content is thin or generic-sounding" — top concern, 87/132 respondents. "It doesn't reflect our expertise" — 43/132.
- **Exact quote:** "Experienced marketers know what differentiated content looks like... They're also more likely to recognize when content sounds polished on the surface but ultimately says very little."
- **Read as:** corroborates S1's "doesn't sound like them" finding (from the 2026-09-19 run's Flashpoint Global source) with a different, independently-sourced survey — safe to use without repeating the same citation two runs in a row. Frames experience as a detector of shallow AI output, which supports pillar 2.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — Frontier-lab pace transparency (RSS slot, `inventory.md`)
- **Source:** Anthropic News — "Measurements for understanding the pace of AI development inside frontier labs"
- **URL:** https://www.anthropic.com/institute/measuring-pace-of-ai-development
- **Published:** 2026-09-17 | **Captured:** 2026-09-20
- Freshest qualifying post (≤7 days) on the highest-priority feed in `inventory.md` — no fallback needed. Anthropic shares three metrics (AI-on-AI R&D share, agent-action oversight, compute allocation) meant to give outside parties visibility into frontier development pace. General AI-industry awareness, not an audience-problem match. Keep internal.

### R2 — Agent/model build patterns (Hugging Face Blog, last 24h)
- **Source:** Hugging Face Blog — "Layer-Feedback Transformer (LFT)" (~15h old)
- **URL:** https://huggingface.co/blog/Banaxi-Tech/layer-feedback-transformer-lft
- **Captured:** 2026-09-20
- Freshest post on a second High-priority feed. Developer-facing model-architecture post — internal build interest only (relevant to how this content-system's own agents/models work), not eligible for public shift-lead content per `positioning.md`'s private-operating-subjects rule.
- **Note:** Did not independently verify claims inside this post (internal-research only, no public claim depends on it).

---

## Source health

- WebFetch: functional for Anthropic News, Hugging Face Blog, Cambridge Judge Business School, SmarterX, Brafton. Blocked on OpenAI's blog (403, same as 2026-09-19) and on Forbes (403) and Wilbur Labs/Morningstar (403) — dropped rather than cited from a search snippet, per research-policy (no invented sourcing; only exact fetched URLs).
- WebSearch: functional throughout; used to locate exact article URLs before fetching (per `inventory.md`: "do not hallucinate article URLs").
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." S1/S3/S4 figures are survey/research data, not social engagement counts.
- Pillar 3 gap from 2026-09-19 addressed with S3, but flagged with an explicit staleness/controversy caveat rather than presented as fresh — worth a follow-up pass for a newer source.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
