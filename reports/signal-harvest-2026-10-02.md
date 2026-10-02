# Signal Harvest Run — 2026-10-02

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

Last run was 2026-09-23 (9 days ago). This run targets fresher sources and
avoids repeating sources already logged in the 2026-09-19/20/23 reports.

---

## shift-lead evidence (public-eligible)

### S1 — The "engine room" has no path to the AI skills it needs (Starting point 1)
- **Source:** PwC, "Global Workforce Hopes and Fears Survey 2026" (press release: "Companies risk losing their most AI-savvy employees while leaving majority behind")
- **URL:** https://www.pwc.com/gx/en/news-room/press-releases/2026/companies-risk-losing-ai-savvy-employees.html
- **Field period:** May–June 2026, 49,364 workers across 48 countries/regions and 29 sectors | **Published:** 2026-09-29 | **Captured:** 2026-10-02 (3 days old)
- **Exact data:** Only 51% of workers say they can access the learning and development resources they need (down from 59% the prior year). The "engine room" — workers with neither scarce skills nor significant AI experience — is the largest segment at 56% of the workforce; only two in five of them said they could access the learning they need. Daily generative-AI use rose from 14% to 22% year-over-year; overall AI use reached 64% (up 10 points).
- **Exact quote:** "They're not getting the same access to learning. They're not getting the opportunity to innovate." — Peter Brown, PwC global workforce leader.
- **Read as:** the largest, freshest, most rigorously sampled source yet for pillar 1 — it names the barrier as access to a learning path, not motivation or awareness, and quantifies it declining year-over-year (59%→51%). Stronger than the 2026-09-17 Resume Now "AI-whelmed" figure (self-reported feeling) and the 2026-09-20 SmarterX figure (smaller, less current sample) — this one is both larger and more recent than both.
- **Caveat:** PwC's own press release doesn't disclose a margin of error; treat the headline percentages as directionally reliable given sample size, not as a precision instrument.

### S2 — Workers default to human judgment over AI, especially under pressure (Starting point 2)
- **Source:** Resume Now (via Pollfish), "Workplace Trust in AI" report
- **URL:** https://www.tradeandindustrydev.com/industry/all-industries/workplace-trust-ai-97-workers-still-put-human-judgment-first/586182
- **Field period:** June 2026, 1,006 employed U.S. adults | **Published:** 2026-08-17 | **Captured:** 2026-10-02
- **Exact data:** 97% rely on their own judgment or input from coworkers/managers as their first step in a work decision. Default decision-making split: own judgment 74%, human input 23%, AI 3%. Under high-stakes pressure the human share holds even higher: own judgment 60%, human input 33%, AI 7%. 72% would follow a coworker's judgment over AI output when the two conflict. 91% expect disclosure when AI is used in work content.
- **Exact quote:** "AI is quickly becoming part of how work gets done, but these findings show workers do not want it to have the final say in workplace decisions."
- **Read as:** directly quantifies pillar 2 ("recognise and protect what's uniquely yours") — the data shows this isn't nostalgia, it's current, measured behavior: people actively choose human judgment over AI even when AI is available, and choose it *more* under pressure, not less. Named pollster (Pollfish) and disclosed sample/field dates give it a firmer quality footing than the 2026-09-19 Conscious Leadership opinion piece used for the same pillar.
- **Caveat:** single-country (U.S.) sample; do not generalize to other markets without flagging that.

### S3 — No fresh qualifying source this run (Starting point 3 — gap, logged not filled)
No new source matched pillar 3 ("decide where AI belongs in a real business problem
and choose a first test") at an acceptable quality bar this run. Candidates checked
and rejected or blocked — see "Rejected this run" and "Source health" below. The
2026-09-23 FreshBooks/Wakefield Research source (86% of solopreneurs try AI before
hiring, n=500) remains the current best-standing evidence for this pillar; it is
9 days old but still within usable range per `research-policy.md` (no forced
numeric freshness cutoff). Flagging the gap rather than filling it with a
weaker source, per research-policy's source-quality separation from relevance.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — Frontier-lab enterprise deployment (RSS slot, `inventory.md`)
- **Source:** Anthropic News — "Barclays scales Claude to upgrade operations and improve client experience"
- **URL:** https://www.anthropic.com/news/barclays-scales-claude
- **Published:** 2026-10-01 | **Captured:** 2026-10-02 (1 day old)
- Freshest post on the highest-priority feed in `inventory.md`, within the 7-day window. Enterprise deployment case study; general AI-industry awareness, not an audience-problem match. Keep internal.

### R2 — Agent build pattern (Hugging Face Blog, 3 days old)
- **Source:** Hugging Face Blog — "Anatomy of a bug-fixing agent"
- **URL:** https://huggingface.co/blog/huggingface/anatomy-of-a-bug-fixing-agent
- **Captured:** 2026-10-02 (posted ~3 days prior)
- Developer-facing agent-architecture post — internal build interest only (how this content-system's own agents/tooling could work), not eligible for public shift-lead content per `positioning.md`'s private-operating-subjects rule.
- **Note:** did not independently verify claims inside this post (internal-research only; no public claim depends on it).

---

## Rejected this run (logged, not used)

- **The Deerborne Group / PRNewswire, "As AI Reshapes Consulting..."** — same source already rejected in the 2026-09-23 run (self-published by a boutique niche life-sciences consulting firm, undisclosed sample size, PR-release framing). Re-surfaced by search this run; rejected again for the same reason.
- **Simplilearn, "2026 Professional Sentiment Survey"** (1 in 4 professionals feel ready) — published 2026-04-23, no sample size, field dates, or third-party pollster disclosed in the release. Too old and too thin on methodology to displace the PwC source for pillar 1.
- **Preply/Fortune, "Gen Z uses AI to learn the most, but 57% struggle to apply it"** (2026-10-01, n=5,000+ across 9 countries) — strong methodology, but the survey is about using AI as a learning tool for general career skills, not about starting to use AI at work; too tangential a match to pillar 1 to cite as direct evidence. Noted for future runs if a tighter angle is needed.
- **U.S. Chamber of Commerce Foundation / Ipsos small-business AI survey** (published 2026-07-14, n=750, solid methodology) — checked specifically for pillar-3 "where owners first applied AI" framing; the report covers current impact (time savings, work quality) but contains no data on how owners chose their starting point. Not used.
- **Clockwork, "The AI pilot was never the problem"** — checked for pillar 3; confirmed as an opinion/consulting-experience piece (published 2026-06-08), not survey data. Dropped per research-policy's source-quality bar rather than cited as research.

## Source health

- WebFetch: functional for PwC (pwc.com), Trade and Industry Development, Anthropic News, Hugging Face Blog, Fortune, Clockwork, U.S. Chamber Foundation, The Deerborne Group's PRNewswire page. Blocked on Goldman Sachs pressroom (403, same pattern as prior runs) and Bluevine's 2026 Small Business AI Trends Report (500 error, two attempts) — neither cited from search snippets alone, per research-policy's no-invented-sourcing rule.
- WebSearch: functional throughout.
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." All three shift-lead candidates evaluated this run are survey/press-release data, not social engagement counts.
- Pillar 3 is an open gap after this run — flagging for the next sweep rather than forcing a weak source in.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
