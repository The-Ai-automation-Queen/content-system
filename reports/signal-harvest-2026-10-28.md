# Signal Harvest — 2026-10-28

**Context loaded:** `context_version` shift-lead-2026-09-12 (`context/current-context.json`); content-system commit `40cd5b57`; `queen-brain` canon NOT loaded this session (confirmed by this session's own startup reality-check — "canon: queen-brain NOT in this session"). Not needed: this run is discovery-only and touches no price, tier, offer status or customer-facing copy, per `security.md` §3 and `AGENTS.md`'s non-negotiable operating rules.

**Audience problem worked (`context/positioning.md`):** experienced professionals and founders with useful knowledge and lived experience who feel overwhelmed by AI or struggle to turn that knowledge into visible, valuable work. Three starting points: (1) understand AI and know where to begin, (2) recognise and protect what's uniquely yours, (3) decide where AI belongs in a real business problem and choose a first test.

**Tool availability this run:** checked via `ToolSearch` before starting — no Tavily or Apify MCP tool registered this session; only `WebFetch`/`WebSearch` available, same constraint as every run since the social-scrape slots were dropped from the current harvest shape.

**Engagement note:** no like/view/follower/share counts were used as a signal of truth or priority below — only study design, source authority, disclosed methodology and recency were weighed, per `research-policy.md`.

---

## RSS/blog sweep (`skills/signal-harvester/inventory.md`)

| Source | Result |
|---|---|
| Anthropic News | Reachable. Most recent Oct 28 (today, "AI for Science expands to foundations and research institutions") through Sep 28 (Claude Sonnet 5.5) — drug-development, S-1 IPO filing, Agent Skills donation, Cyber Mission, Haiku 5.5, Singapore MOU, $100M engineer-training investment. All corporate/product/policy announcements — no pillar fit, same non-fit pattern as every run since RESEARCH 050. |
| OpenAI Blog | HTTP 403 — now **32 consecutive failed runs** (044 through 076, spanning 2026-06 to today). Standing recommendation unchanged and still unactioned: fix the fetch method or drop OpenAI Blog from the High-priority row in `skills/signal-harvester/inventory.md`. |
| Hugging Face Blog | Reachable. All ML-engineering/model-release content (multilingual transcription, multimodal models, AWS Trainium profiling, RL post-training, time-series forecasting) — no pillar fit. |
| Google DeepMind | Reachable. All Genie 4 / Gemini 4 Carbon model-release, forest-mapping and scam-detection research content — no pillar fit, same pattern as every prior run. |
| a16z AI | Reachable but still no explicit publish dates exposed on the landing page (same structural limitation as every prior run) — new items ("The New Security Agenda," "The Evolving Landscape of Venture Capital Mindsets," "Databricks & the Future of the Firm," Andreessen's "Let Chaos Reign" essay) are all opinion/essay or enterprise-finance content, no disclosed study or dated primary data — no pillar fit. |
| Lenny's Newsletter | Reachable. Most recent dated post is still "How to tell if a startup has a moat" (Oct 13) — 15 days old, outside the ≤7-day freshness window; no newer AI/automation post. No candidate this run. |

No RSS/blog source cleared the bar this run — consistent with the pattern since RESEARCH 050.

---

## One new shift-lead signal

### S1 (pillar 3, "decide where AI belongs in a real business problem and choose a first test")

**Survey of 72 leaders across 30+ industries (54% founders/CEOs/presidents/sole operators) recruited via PR-quote-aggregation platforms (MentionMatch, Featured), self-reported, not independently audited: 61% named rebuilding workflows around AI — not model choice, not data, not budget — as the #1 factor that moved their first AI pilot into production; the leading blocker was data-quality cleanup (58%), and 96% kept a human-in-the-loop review step for anything customer-facing, compliance-sensitive or financially significant.** SumatoSoft, "AI Readiness: How Companies Move from AI Pilots to Production in 2026," fielded over 21 days, published 2026-04-29 (last reviewed by the publisher 2026-10-07). This is the first candidate with any disclosed sample size, respondent composition and inclusion methodology to clear the bar for pillar 3 since RESEARCH 065 (2026-10-13, Kim/Kang/Song Product Hunt study) — a gap that has now run 15 days and six dated reports (10-20 through 10-27) with every sweep finding only unsourced marketing-blog "start small" advice. **Caveats stated plainly:** (1) ~6 months old at capture, older than the usual corroborating-anchor window and older than the AISA report RESEARCH 074 accepted under the same "first-to-clear-the-bar-after-a-long-drought" logic; (2) self-report, not independently audited; (3) recruitment via PR-quote-aggregation platforms selects for people willing to go on record with a named company and a "measurable baseline result" — a structural tilt toward success stories, not a representative draw, so the 61%/58%/96% figures should be read as what works *among those who got far enough to have a story to tell*, not a population-wide base rate. Flagging this candidly rather than presenting it as equivalent in rigor to the Wiles RCT (RESEARCH 075 S1) or the Kim/Kang/Song platform-behavior study (RESEARCH 065 S1) — it is the best pillar-3 evidence found in 15 days, not a strong source in absolute terms. Directly `WebFetch`-confirmed on SumatoSoft's own report page.

### S2 (pillar 2, "recognise and protect what's uniquely yours")

**Think-aloud study, 20 professionals with varying data-science expertise, all using the same AI agent on an identical hiring-assessment task: participants who delegated more to the agent finished more work but produced significantly more flawed solutions, while the more expert participants more often resisted that tradeoff — sacrificing completion speed to decompose the task and scrutinize the agent's output themselves.** Qianou Ma, Pranav Khape, Rock Pang, Ken Koedinger, Tongshuang Wu, Siddarth Suri, Shamsi Iqbal, "Impact of Expertise and Trust on AI-assisted Work," arXiv:2610.14660 (submitted 2026-10-10). Names the exact mechanism behind pillar 2's "protect what's uniquely yours" problem: it is a professional's own expertise and judgement, not a tool setting, that catches AI's flawed output before it ships — and the study shows directly that people without that expertise can't substitute for it, they just produce more work that is wrong. A natural companion to the already-logged exoskeleton RCT (RESEARCH 075 S1, Wiles et al.): that paper showed capability-while-using doesn't transfer to retained understanding; this one shows existing expertise is what lets someone catch the AI's mistakes in the moment, independent of whether retained understanding improves afterward. Caveat: small N (20), qualitative think-aloud design — directional, not a population estimate; authors are CMU/Microsoft-affiliated (academic, not vendor-commissioned). Directly `WebFetch`-confirmed on the arXiv abstract page.

## One new internal-research signal

### I1 (internal-research only — not for public content)

**Systematic review of 63 research/engineering artifacts on agentic AI oversight finds a sharp documentation gap: tool-mediation and monitoring traces appear clearly in 40+ sources, but the accountability mechanisms that actually matter — checkpoint placement, validator independence, contestability — are documented in fewer than 6 sources each. Core argument: "observability can become a substitute for accountability when it shifts verification onto users after meaningful intervention is no longer possible."** Hanjing Shi, Dominic DiFranzo, "When Agents Act Unwatched: The Reduced-Supervision Paradox in Agentic AI," arXiv:2609.29547 (submitted 2026-08-28). Extends the standing agent-governance/assurance thread (Three-Pillar framework, RESEARCH 074 I1; Contestable Agents, RESEARCH 075 I1) with a sharper distinction than either: being able to *see* what an agent did (monitoring/logs) is not the same as having a real *checkpoint* where a human's "no" still changes the outcome. This is a direct, named risk check against this repository's own review-cockpit pattern — a card or approval that gets logged and reviewed after the fact, with no earlier point where disapproval would have stopped anything, is exactly the "observability substituting for accountability" failure this paper describes, not a hypothetical one. Caveat: ~2 months old at capture, older than the ~5-day-old papers the two prior internal-research entries used — logged anyway because it names a mechanism (observability ≠ accountability) that the two prior, fresher entries didn't, rather than just restating the governance theme again. Directly `WebFetch`-confirmed on the arXiv abstract page.

---

## Rejected this run (named)

- **Stack Overflow 2026 Developer Survey (30,903 respondents), via Entrepreneur.com write-up** — checked via `WebFetch`: real disclosed sample size but wrong population (software developers specifically) and the article's disclosed findings (job satisfaction, burnout-driven complacency, AI-tool-adoption rates) do not address felt-overwhelm, expertise-protection or first-test-decision questions for this audience. Rejected on population/no pillar fit.
- **Nielsen survey commissioned by Monday.com, via TechCrunch** (1,700 directors/senior managers, 7 countries) — checked via `WebFetch`: finding is real (senior leaders report difficulty evaluating employee work once AI polish masks individual contribution) but field dates, respondent selection and question wording are undisclosed beyond the basic sample parameters, and the population is team managers evaluating *others'* AI-assisted work, not a solo professional/founder's own felt overwhelm or first-test choice. Rejected on undisclosed methodology plus wrong level of analysis — same category as the already-rejected BCG Institute piece (RESEARCH 075).
- **Hubstaff/Pollfish research, via PR Newswire** (1,068 US workers, Oct 2026, ±3pp margin of error at 95% confidence — genuinely well-disclosed methodology) — checked via `WebFetch`: strong disclosure, but the finding (AI time savings aren't becoming organizational capacity; 45% spend 1hr+/week correcting colleagues' AI output) is an org-level productivity/capacity-economics finding, not a felt-overwhelm, expertise-protection, or first-test-decision finding for this audience. Noted as the best-disclosed source rejected this run — set aside on pillar fit, not on rigor.
- **Axios, "Executives are more likely to trust AI over themselves"** — HTTP 403 on direct `WebFetch`; not pursued further, no other primary page found. Logged as a source-health item below, same unpursued-lead treatment as prior 403s.
- **Resume Now "AI-Whelmed Worker" 44% report, Henley World of Work Institute survey, CPA Practice Advisor's restatement of the same Resume Now figure** — all confirmed via `grep` as already logged in prior dated reports (the 44%/61%-overwhelmed figures are the same standing pillar-1 evidence cited since RESEARCH 063–065). Not re-logged.
- **arXiv:2610.09608 (Tianqi Song et al., "When My Skill Becomes Agent Skill")** — confirmed via `grep` as already logged at RESEARCH 073. Not re-logged.
- **Creativeboom "state of the creative industry 2026" burnout/AI survey** — surfaced by `WebSearch` but not independently fetched this run after three other candidates from the same search batch (Stack Overflow, Monday.com/Nielsen, Hubstaff) were already checked and resolved; no time spent chasing a fourth near-duplicate "workers are stressed about AI" angle once pillar 1 remained adequately evidenced by already-logged sources.
- **Thomson Reuters "Future of Professionals Report 2026," SHRM AI Aptitude Test survey** — confirmed via `grep` as already logged and previously assessed in multiple prior reports (2026-10-12 through 2026-10-24). Not re-logged.
- **Fan, "Toward Measuring AI's Effects on Skill Formation: The Stock-Formation Gap," arXiv:2605.16283** — checked via `WebFetch`: a measurement-methodology critique (argues current AI-usage data can't actually distinguish skill-building from skill-substitution), not a new empirical finding about the audience's lived problem, and not an internal-tooling/agent-governance subject either — doesn't fit either lane. Also ~3 months old at the paper's last revision (Aug 9). Rejected as out-of-lane rather than on age or rigor.

---

## Source health this run

- Anthropic News, Hugging Face Blog, Google DeepMind, a16z AI, Lenny's Newsletter: all `WebFetch`-reachable; none surfaced an audience-problem fit, same non-fit pattern as every run since RESEARCH 050.
- OpenAI Blog: still HTTP 403 — now **32 consecutive failed runs**. Unactioned standing recommendation repeated above.
- `axios.com`: HTTP 403 on direct `WebFetch` — new observation this run (not previously logged as a source-health item).
- Dedup checked via `grep -rli` (name/author/study-title based, not just URL string matching) across all nineteen prior dated reports plus `research-notes.md` and `content-vault.md` — confirmed SumatoSoft, Ma et al. and Shi/DiFranzo were genuinely unlogged, and caught the Tianqi Song et al. and Thomson Reuters/SHRM repeats before they were re-logged.

## Pillar balance note

Pillar 3 finally gets a new signal after 15 days and six dated reports (10-20 through 10-27) of nothing but unsourced marketing content — flagged above with its rigor caveats intact rather than presented as equivalent to the ledger's stronger entries. Pillar 2 gets its first new signal since RESEARCH 074 (2026-10-26), a small-N but academically clean study that names the mechanism (expertise as the thing that catches AI's mistakes) behind the pillar's "protect what's uniquely yours" framing. Pillar 1 ("understand AI and know where to begin") gets no new signal today — every candidate searched (Stack Overflow, Henley, Resume Now, CPA Practice Advisor) was either wrong-population or already logged; pillar 1 last filled at RESEARCH 075 (2026-10-27), so this is a one-run gap, not yet a standing one.

## Historical-audience check

Confirmed nothing above was forced into the retired July corporate-escape framing, lead-magnet keyword system, comment-to-DM mechanic, or any other retired default named in `AGENTS.md`/`CURRENT-WORKFLOW.md`/`positioning.md`. No drafting, scheduling or publishing occurred — discovery only, consistent with `security.md`'s queue-only publishing rule (not implicated, since nothing was published or queued).
