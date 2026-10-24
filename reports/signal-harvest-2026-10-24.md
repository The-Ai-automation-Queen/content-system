# Signal Harvest — 2026-10-24

**Context loaded:** `context_version` shift-lead-2026-09-12 (`context/current-context.json`); `queen-brain` canon NOT loaded this session (confirmed by this session's own startup reality-check — "canon: queen-brain NOT in this session"). Not needed: this run is discovery-only and touches no price, tier, offer status or customer-facing copy, per `security.md` §3 and `AGENTS.md`'s non-negotiable operating rules.

**Audience problem worked (`context/positioning.md`):** experienced professionals and founders with useful knowledge and lived experience who feel overwhelmed by AI or struggle to turn that knowledge into visible, valuable work. Three starting points: (1) understand AI and know where to begin, (2) recognise and protect what's uniquely yours, (3) decide where AI belongs in a real business problem and choose a first test.

**Tool availability this run:** checked via `ToolSearch` before starting — no Tavily or Apify MCP tool registered this session; only `WebFetch`/`WebSearch` available, same constraint as every run since the social-scrape slots were dropped from the current harvest shape.

**Engagement note:** no like/view/follower/share counts were used as a signal of truth or priority below — only study design, source authority and recency were weighed, per `research-policy.md`.

---

## RSS/blog sweep (`skills/signal-harvester/inventory.md`)

| Source | Result |
|---|---|
| Anthropic News | Reachable. Most recent Oct 22 (2 days old, within 7-day window) through Oct 1. All product/policy/safety announcements (Agent Skills donation, Long-Term Benefit Trust, Singapore office, Haiku 5.5, Cyber Mission) — no pillar fit, same non-fit pattern as every run since RESEARCH 050. |
| OpenAI Blog | HTTP 403 — now past **28 consecutive failed runs** (044 through 072, spanning 2026-06 to today). Standing recommendation unchanged and still unactioned: fix the fetch method or drop OpenAI Blog from the High-priority row in `skills/signal-harvester/inventory.md`. |
| Hugging Face Blog | Reachable. All ML-engineering/model-release content (retrieval models, embeddings, robotics sim) — no pillar fit. |
| Google DeepMind | Reachable. All Gemini 4 Argon model-release/robotics/safety content — no pillar fit. |
| a16z AI | Reachable. All podcast episodes/VC content — no pillar fit, still no explicit publish dates exposed. |
| Lenny's Newsletter | Reachable. Most recent AI-tagged pieces ("Advanced evals," Sep 22; "AI as world-class designer," Sep 1) are both outside the 7-day freshness window and product/eval-tooling focused, not this audience's problem. |

No RSS/blog source cleared the bar this run — consistent with the pattern since RESEARCH 050.

---

## Two new signals found via targeted WebSearch

### S1 (shift-lead, pillar 2 — "protect what's uniquely yours")

**Interview study: generative AI is "absorbing" the entry-level tasks junior software engineers used to learn from, erasing the "productive struggle" that built senior-level judgment.** Sumin Yu, Taesup Moon, "Who Will Become the Next Senior? How Generative AI Erodes the Development Pathway in Software Engineering," arXiv:2607.17067 (submitted 2026-07-19, revised 2026-08-25). Interviews with early-career and experienced engineers in South Korea identify three mechanisms: **"Absorption"** (GenAI redirects junior-level tasks into senior workflows, so juniors stop doing the reps that build expertise); universities normalizing AI use in ways that structurally perpetuate the loss; and a **"perceptual asymmetry"** between experience levels that prevents self-correction (juniors and seniors don't see the gap forming the same way). Concrete, named, domain-specific complement to the more abstract/systems-level framing already on file (Lovett's "Tragedy of the Cognitive Commons," RESEARCH 070 I1→S1) — this one gives a specific occupational mechanism ("Absorption") rather than a generational-pipeline abstraction, and is directly usable as a "here's exactly how it happens" angle. Caveat: ~3 months old (corroborating-anchor treatment, not breaking news); South Korean software-engineer interview sample — a proximate, not identical, population to this audience, and qualitative (interviews), not measured/causal. Directly `WebFetch`-confirmed on the arXiv abstract page.

### I1 (internal-research only — not for public content)

**Bayesian variance-decomposition analysis of 22 agent benchmarks finds that simply adding more evaluation tasks does not reliably fix noisy agent leaderboards — scaffold/harness choice often matters more than task count.** Michael Hardy, Ruhana Azam, Anka Reuel, Mykel Kochenderfer, Sanmi Koyejo, "Agent Evaluation Reliability: More Tasks Won't (Always) Fix An Agent Leaderboard," arXiv:2610.00651 (submitted 2026-09-30). Four findings: (1) reliability depends on what's being measured — fixed-system rankings are far more reliable than underlying-model rankings; (2) scaffold/harness choice significantly swings conclusions; (3) adding tasks has diminishing returns when scaffold coverage is thin; (4) pooling diverse benchmarks improves cross-task reliability and cuts cost. Directly extends this repo's own standing benchmark-integrity thread (SkillForgeBench — RESEARCH 071 I1; the Princeton/Stanford/UK AISI/Brookings 33-trend survey — RESEARCH 070 I1 on 2026-10-22's log) with a quantitative mechanism for *why* leaderboards are noisy, and is directly relevant to how this repository's own agent-run pipeline should be evaluated. Caveat: ~3.5 weeks old (corroborating-anchor, not breaking); internal-research only per `positioning.md` — Content Factory mechanics/agent evaluation are private operating subjects unless Fatiha requests that exact topic. Directly `WebFetch`-confirmed on the arXiv abstract page.

---

## Rejected this run (named)

- **IBM CHRO study** ("71% of CHROs want AI-output evaluation skills, 38% of employees rank it important", "60% fear skill atrophy") — already logged repeatedly across prior reports; resurfaced via a fresh `virtualizationreview.com` republish, not a new primary source.
- **TheStreet / Wharton judgment-erosion study** — still HTTP 403 on direct `WebFetch`, same unverifiable-secondary rejection as every run since 2026-10-19.
- **Thomson Reuters Future of Professionals Report 2026** — already logged, resurfaced via fresh search.
- **Gartner 40%-of-CIOs stat** — already logged, resurfaced via fresh search.
- **"Blind Overseers" (Berkeley)** and **Lovett's "Tragedy of the Cognitive Commons"** — both already logged (RESEARCH 069 S2, RESEARCH 070 S1).
- **digidai.github.io "Workers Fear Skill Erosion as CHROs Ask for More Judgment"** — unsourced aggregator repackaging the same IBM study; no independent primary content.
- **arXiv:2608.04276, "The Fallback as Signal" (Andreas Bauer)** — pure game-theoretic/market-signaling economics paper (credence-good markets, liability pledges), no empirical data and no practical instruction for this audience; same category as the previously-rejected "AI Calibracy" MDPI conceptual framework (RESEARCH 071's rejected list). Directly `WebFetch`-confirmed, assessed and set aside, not just skipped.
- **arXiv:2606.29111, "Managing the Human Fallback" (skill-investment economics theory)** — same author-cluster, same conceptual/no-data category as above; checked, not cited.
- **Skeptic.com, "When AI Builds Skill, and When It Erodes It" (Gleb Tsipursky, 2026-10-20)** — genuinely fresh (4 days old) but is a secondary blog synthesis of a PNAS RCT on **high-school math students** (Hamsa Bastani et al.) — wrong population for this audience (students, not working professionals/founders), and the primary PNAS source was not independently fetched. Same "wrong population" rejection category as the Annals of Internal Medicine clinical-deskilling study below.
- **"The Deskilling Effect: Is Artificial Intelligence Eroding Clinical Competence?" (Annals of Internal Medicine)** — wrong population, clinicians not this audience; same rejection pattern as the earlier Frontiers in Digital Health clinical-reasoning review (RESEARCH 071's rejected list).
- **FreshBooks solopreneur survey, lonelyentrepreneur.com, Forbes/Rahul Dogra, getaibrief.com, widejournal.com, 500k.io/autofaceless.ai solopreneur-statistics roundups** — all already logged/rejected in multiple prior reports (same aggregator-survey category, no new primary methodology).
- **arXiv:2610.16067 ("When Agent Evaluation Becomes Unreliable")** and **arXiv:2610.07003 ("Reliability of AI Agents: Rater Effects, Drift...")** — both already logged in prior reports (confirmed via direct `grep` before being set aside, per `research-policy.md`'s reanalysis rule against re-citing as new).

---

## Source health this run

- Anthropic News, Hugging Face Blog, Google DeepMind, a16z AI, Lenny's Newsletter: all `WebFetch`-reachable; none surfaced an audience-problem fit, same non-fit pattern as every run since RESEARCH 050.
- OpenAI Blog: still HTTP 403 — now **28 consecutive failed runs**. Unactioned standing recommendation repeated above.
- thestreet.com: HTTP 403 again, same as every check since 2026-10-19.
- Dedup checked via `grep -rli` (name/author/study-title based, not just URL string matching) across all fifteen prior dated reports plus `research-notes.md` and `content-vault.md` — this is what caught the arXiv:2610.16067/2610.07003 repeats and confirmed the two new finds were genuinely unlogged.

## Historical-audience check

Confirmed nothing above was forced into the retired July corporate-escape framing, lead-magnet keyword system, comment-to-DM mechanic, or any other retired default named in `AGENTS.md`/`CURRENT-WORKFLOW.md`/`context/positioning.md`. No drafting, scheduling or publishing occurred — discovery only, consistent with `security.md`'s queue-only publishing rule (not implicated, since nothing was published or queued).
