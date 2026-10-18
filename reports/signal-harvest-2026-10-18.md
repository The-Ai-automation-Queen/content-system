# Signal Harvest Run — 2026-10-18

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`).
Queen Brain canon unreachable this session (per the startup hook: "canon:
queen-brain NOT in this session") — used this repository's local context mirror
only (`context/positioning.md`, `context/research-policy.md`), and did not write
any price, tier, offer status or customer-facing copy.
**Run type:** Research only. No content drafted, no queue action, no publish action.
Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication). Vault state at run start: 37
READY/33 DRAFT/6 STALE/2 KILLED — release, not production, is the standing
bottleneck; this run adds evidence only, not new drafts.

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

Last run was 2026-10-16 (2 days ago). Checked every URL already logged across
the 2026-09-19/20/23, 2026-10-02, 2026-10-12, 2026-10-14 and 2026-10-16 reports
(`grep -h "URL:" reports/signal-harvest-*.md`), plus `grep`-checked candidate
report/study names against `content-vault.md` and `research-notes.md` directly
(not just the reports/ URL list) before citing anything new below — this caught
one near-miss (see Rejected).

---

## shift-lead evidence (public-eligible)

### S1 — Federal Reserve Bank of New York: small-business AI adopters report a 10-point employment-growth edge over non-adopters, even after controlling for firm characteristics (Starting point 3)
- **Source:** Federal Reserve Bank of New York, Liberty Street Economics — "AI Adoption and Employment Expectations: Evidence from a Survey of Small Business Owners" (Will Aarons and Asani Sarkar)
- **URL:** https://libertystreeteconomics.newyorkfed.org/2026/10/ai-adoption-and-employment-expectations-evidence-from-a-survey-of-small-business-owners/
- **Sample:** 5,248 employer firms (AI module of the 2025 Small Business Credit Survey) | **Field dates:** September–November 2025 | **Published:** 2026-10-08 | **Captured:** 2026-10-18 (10 days old)
- **Exact data:** 46% of firms with employees currently use AI tools; 15% more plan to adopt within 12 months. Among users, 63% say AI is "somewhat or very important to production" and 51% have integrated it partially or fully into business processes — yet 77% report no change in labor costs from using it. AI-using firms show a 33-point net-positive 12-month employment expectation vs 15 points for non-users (48 vs 21 points for revenue expectations); the gap narrows to a still-positive 10 points after controlling for firm/owner characteristics.
- **Read as:** the cleanest pillar-3 fit found this run — a named central-bank research arm, not a vendor, tying "did this firm actually test AI" to a measurable forward-looking business outcome (hiring and revenue expectations) rather than sentiment. The 77%-no-labor-cost-change figure is a useful counter-stat to "AI replaces your team" framing: adopters expect to grow headcount, not cut it, and most aren't even seeing cost savings yet — the value is showing up as production importance, not line-item savings. Good evidence for "choose a first test tied to a measurable outcome," not a diffuse productivity story.
- **Caveat:** field dates (Sep–Nov 2025) predate publication by about a year — this is fresh *analysis*, not fresh *fieldwork*; flag if the point being made depends on current-month AI capability. Employer-firm sample (excludes solo/non-employer founders, a meaningful chunk of this audience).

### S2 — Jabra Research Institute "WorkLife 2026": AI is expanding what work covers, not shrinking it, and the adoption gap by seniority is the open question this audience sits inside (Starting point 1)
- **Source:** Jabra Research Institute, "WorkLife 2026: The New Shape of Work" (press release via GlobeNewswire, corroborated independently by National Law Review, ITBrief Australia and Quasa)
- **URL:** https://www.globenewswire.com/news-release/2026/10/13/3379475/0/en/jabra-worklife-report-unveils-a-productivity-paradox-ai-is-giving-workers-time-back-but-they-re-not-working-any-less.html
- **Sample:** 6,000+ knowledge workers across France, Germany, India, Poland, UK and US | **Field dates:** May 2026 | **Published:** 2026-10-13 | **Captured:** 2026-10-18 (5 days old)
- **Exact data:** 85% of employees report more work in at least one category over the past year despite AI adoption — strategic planning/analysis (+51%), creative work (+50%), admin (+49%) all increased, not decreased. Adoption is sharply uneven by seniority: only 18% of non-managers say their work has changed significantly from AI vs 47% of senior leaders; 40% of non-managers use AI monthly or less vs 14% of top management. Frequent AI users report *more* collaboration, not less (42% collaborate more vs 13% less), and voice-based AI interaction correlates with workers being 24% less likely to associate work with stress than typing-based use.
- **Read as:** directly on pillar 1's "overwhelmed, don't know where to begin" framing — most people in this audience are not light users who've plateaued, they're in the 40%-use-monthly-or-less, 18%-no-significant-change group, while leadership is already at 47%/86%-regular-use. That gap (not AI capability itself) is the actual starting-point problem. The stress/voice-interaction finding is a concrete, low-effort "where to begin" suggestion (talk to it, don't just type) rather than a generic "just start" hook.
- **Caveat:** press-release-stage figures (own-institute research, not yet an independently peer-reviewed report); corroborated by three independent outlets with matching topline numbers, which is the same corroboration standard used for Gartner/marketscale on 2026-10-16.

### S3 — WSJ Intelligence × PMI "Cognition Index": professionals name judgment erosion as the top AI risk, and most don't trust their org's AI fact-checking process (Starting point 2)
- **Source:** WSJ Intelligence, "Cognition Index," fielded in partnership with Philip Morris International
- **URL:** https://www.pmi.com/human-cognition/human-advantage-ai-workplace
- **Sample:** 2,500+ business professionals, entry-level to C-suite, across the US, UK, Italy, South Africa and Brazil | **Field dates:** February–April 2026 | **Published:** 2026-09-10 | **Captured:** 2026-10-18 (~5.5 weeks old)
- **Exact data:** 29% name decline in critical thinking, judgment and creativity as the single biggest AI risk — the largest named category. 62% believe people should lead creative work over AI; roughly half prioritize human intuition in market analysis. Only one in four "strongly agree" their organization has a clear, effective process for fact-checking and verifying AI outputs. Frames cognition as "a muscle: use it or lose it" requiring active cultivation, not passive protection.
- **Read as:** the sharpest pillar-2 number logged since the 2026-10-16 Gartner "cognitive surrender" citation — that source named the organizational mechanism; this one supplies the individual-level self-report that people already rank judgment-erosion as their top fear, ahead of job loss or misinformation framings typically seen in this kind of survey. The 1-in-4 fact-checking-process figure is a concrete, source-attributable version of this repo's own "facts before hooks" rule (`security.md` §3.3) — useful as evidence the problem is general, not specific to this content pipeline.
- **Caveat:** co-branded sponsor content (Philip Morris International, a tobacco/diversified-products company, is an unusual but disclosed sponsor of workplace-cognition research) — cite WSJ Intelligence as the fielding party and the disclosed topline numbers, not PMI's own "human advantage" framing. Field dates given as a range, not exact start/end days.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — New paper: fixing a single reward-function defect in an agent benchmark dropped its measured success rate from 94.3% to 65.5% across the same 4,320 episodes (agent-evaluation integrity)
- **Source:** Junjie Chen, "When Agent Evaluation Becomes Unreliable: An Empirical Study of Oracle Failures and Configuration-Dependent Measurement in an LLM Agent Benchmark" (submitted to Empirical Software Engineering)
- **URL:** https://arxiv.org/abs/2610.16067
- **Submitted:** 2026-10-12 | **Captured:** 2026-10-18 (6 days old)
- **Exact data:** An oracle-integrity audit found a reward-function defect that changed the environment state *before* post-run scoring, inflating results. Correcting it dropped database-pass labels from 4,194 to 2,883 and measured success from 94.3% to 65.5% across 4,320 episodes — on the same benchmark, same agent, same runs. A separate configuration-sensitivity test (3,240 episodes) found swapping tool-description wording alone moved measured success by up to 9.2 percentage points; swapping error-string wording moved it by 5.3 points.
- **Read as:** this is the third consecutive run logging a paper in the exact same theme (2026-10-14 BenchJack: benchmarks gameable; 2026-10-16 LSCBench: functional-pass ≠ secure; this run: functional-pass ≠ correctly-measured at all, and the measurement itself swings on wording that has nothing to do with the agent's actual capability). The new, non-redundant piece: scoring-pipeline bugs (not model or task-design flaws) can be the single largest source of a "95% success rate," and nobody would catch it from the leaderboard alone. Directly relevant to this repo's own practice of validating workflow/agent changes by "did the test pass."
- **Caveat:** single-author paper (Junjie Chen), not yet peer-reviewed (currently a journal submission, not a published/accepted paper); audited one specific benchmark implementation and explicitly reports portability limits applying the same audit method to independently-implemented systems — treat as evidence a failure mode exists, not that it's universal across all agent benchmarks. Flagging the repeated theme explicitly rather than treating it as fresh news three runs running — if a fourth run surfaces a fourth paper in this exact vein, it may be time to treat "benchmark integrity" as an established, logged anchor rather than a new S-slot each time.

---

## Rejected this run (logged, not used)

- **Glean Work AI Institute, "Work AI Index 2026" (botsitting/botshitting, 6.4 hrs/week supervising AI, 69% "botshit")** — surfaced repeatedly in this run's searches (Jabra and WSJ Intelligence queries both resurfaced it) but already logged in detail: `research-notes.md` (RESEARCH entry, full excerpt with the 87%/11-hours/6.4-hours/69% figures) and referenced again in `content-vault.md`. Published 2026-06-10 — over 4 months old. Caught by direct `grep` against `content-vault.md`/`research-notes.md`, not just the reports/ URL list, which is why this is called out as a near-miss: the reports/ dedup grep alone would have missed it since it was logged outside a dated signal-harvest report.
- **Goldman Sachs "10,000 Small Businesses" AI survey (93% positive impact, only 14% fully integrated, 73% want more training)** — genuinely new to this run's logs, named-institution survey (Babson College + David Binder Research fielding, n=1,256, fielded 2026-01-27–02-04), but original press coverage dates to ~March 2026 (Benzinga), making it ~7 months old, not fresh news; and `goldmansachs.com` itself returned HTTP 403 on direct fetch, so it could only be confirmed via Yahoo Finance/Benzinga syndication, not a primary fetch. Flagging as a solid pillar-1/pillar-3 corroborating anchor for a future run if a primary fetch becomes possible, rather than citing from secondary-only this run.
- **Anthropic survey of ~9,700 Claude users (half say AI handles 50%+ of their tasks)** — thematically a repeat of the already-logged Epoch AI/Ipsos delegation data (2026-10-16 S1) and the vendor-is-the-subject problem applies directly: Anthropic surveying its own active users about Anthropic's own product is a narrower, more self-interested sample than the Ipsos probability panel already cited. Published 2026-06-26, four months old. Not cited.
- **TestJack (arXiv 2610.10619, submitted 2026-10-07) "Should you trust the results in coding benchmarks?"** — same agent-benchmark-integrity theme as R1 above and one of the two live candidates for this run's internal-research slot; chose the Junjie Chen paper (2610.16067) instead because its failure mode (oracle/scoring-pipeline defects corrupting measurement, not benchmark gaming by the agent) is the more novel addition to the thread already built across the last three runs. Keeping as a named alternative rather than silently dropping it.
- **Solo-founder "AI stack" ARR statistics (lonelyentrepreneur.com, macmdviewer.com, shipsquad.ai, agentmarketcap.ai)** — same category rejected 2026-10-14 and 2026-10-16: no disclosed survey methodology, sample, or field dates; figures resurfaced verbatim in this run's searches. Dropped again per `research-policy.md`'s source-quality bar.
- **AI-consulting-ROI aggregator claims ($3.70–$10.30 per dollar, "74% of executives," "95% of pilots fail to scale")** — surfaced searching for a pillar-3 consultant-specific candidate; every instance was an SEO/content-marketing roundup citing other roundups, with no traceable named primary survey behind the headline numbers. Rejected per the same source-quality bar as the solo-founder stack sites.

## Source health

- WebFetch: functional for glean.com, financialcontent.com, pmi.com, techtimes.com, libertystreeteconomics.newyorkfed.org, arxiv.org (abs endpoint).
- WebFetch: blocked (HTTP 403) on goldmansachs.com/pressroom — could not independently verify the 10,000 Small Businesses press release primary page; see Rejected list.
- WebSearch: functional throughout; multiple queries resurfaced known-low-quality aggregator content (solo-founder "stack" stats, AI-consulting-ROI roundups) — rejected rather than cited, consistent with prior runs' source-quality bar.
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." All candidates evaluated this run are named-institution survey, central-bank research-note, or arXiv-paper data, not social engagement counts.
- Dedup this run checked two layers: (1) `grep -h "URL:" reports/signal-harvest-*.md` across all six prior dated reports, and (2) a direct `grep` of candidate study/report names against `content-vault.md` and `research-notes.md`, which caught one source (Glean Work AI Index) that the URL-only grep would have missed because it was logged outside a dated signal-harvest report.
- Internal-research theme flag: this is the third consecutive run (2026-10-14, 2026-10-16, 2026-10-18) logging a new paper in the same "agent/benchmark evaluation integrity" thread. Noted explicitly in R1 above rather than silently repeating the pattern a fourth time without comment.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
