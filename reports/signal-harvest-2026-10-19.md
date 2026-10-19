# Signal Harvest Run — 2026-10-19

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`,
repo HEAD `1bb27ca5`). Queen Brain canon unreachable this session (per the startup
hook: "canon: queen-brain NOT in this session") — used this repository's local
context mirror only (`context/positioning.md`, `context/research-policy.md`), and
did not write any price, tier, offer status or customer-facing copy.
**Run type:** Research only. No content drafted, no queue action, no publish action.
Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication). Vault state at run start: 37
READY/33 DRAFT/6 STALE/2 KILLED — release, not production, is the standing
bottleneck; this run adds evidence only, not new drafts.

**Note on cadence:** this run is interactive (operator-requested), one day after
the last completed run (2026-10-18). The scheduled 2026-10-19T22:00 cron attempt
(`deploy/logs/signal-harvester-2026-10-19T22-00-01.log`) stopped after the git
fetch step with no report, no commit and no error — worth a separate look at the
cron/runner, flagged under External actions below rather than silently ignored.

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

Dedup checked two layers before citing anything below: (1) `grep -h "URL:"
reports/signal-harvest-*.md` across all seven prior dated reports
(2026-09-19/20/23, 2026-10-02, 2026-10-12, 2026-10-14, 2026-10-16, 2026-10-18),
and (2) a direct `grep` of each candidate's source name/author against
`content-vault.md` and `research-notes.md` directly. All four sources below are
clean on both passes.

---

## shift-lead evidence (public-eligible)

### S1 — Meta/YouGov survey of 3,983 APAC small-business owners: 86% say small businesses need more guidance to get full AI benefit, even though 76% already report a productivity gain (Starting point 1)
- **Source:** Meta Newsroom, "More Than Three Quarters of Small Business Owners Say AI Makes Them More Productive, But Most Need More Guidance" (survey fielded via YouGov)
- **URL:** https://about.fb.com/news/2026/10/more-than-three-quarters-of-small-business-owners-say-ai-makes-them-more-productive-but-most-need-more-guidance/
- **Sample:** 3,983 small-business owners, 9 APAC markets (Australia, Singapore, Vietnam, Indonesia, Taiwan, India, Thailand, Japan, Hong Kong), quota'd by business size (1–9, 10–19, 20–49 employees) | **Field dates:** 2026-08-06 to 2026-09-02 | **Published:** 2026-10-14 | **Captured:** 2026-10-19 (5 days old)
- **Exact data:** 84% of surveyed owners currently use AI; 76% report a positive productivity impact and 71% a positive revenue/sales impact over the past 12 months. 80% agree AI helps small businesses compete with larger companies; 83% agree it lets them do tasks that previously needed "significantly more money or resources." Despite that: **86% say small businesses need more guidance** to get the full benefit, 51% cite cost as the leading barrier to training, and owners specifically want clearer cost/ROI information and guidance on data privacy/security. Top uses: content creation/editing (51%), local ads/marketing (43%), translation (38%), customer support (37%).
- **Read as:** a clean pillar-1 fit that cuts against a lazy "adoption solved, guidance unnecessary" reading — the same owners reporting gains are the ones asking for more structure, specifically on cost/ROI framing and privacy, not raw capability. Useful counter to "just start using it" messaging: even people already using AI productively say they're missing a guide, not a tool.
- **Caveat:** APAC-only sample (nine markets, none in North America/Europe) — do not generalise the exact percentages to a US/UK audience without flagging the geography; platform-run research (Meta surveying small-business AI use, not fully independent of Meta's own ad/business tools) should be named as such if cited publicly.

### S2 — Homebase "2026 Main Street AI Gap Report": AI adoption among small businesses is now 74% overall, but ranges from 54% at under-$500K revenue to 81% at $5M+ — a 27-point gap that tracks resources, not need (Starting point 3)
- **Source:** Homebase, "2026 Main Street AI Gap Report: Who's Adopting AI (and Who's Not)" (survey fielded by Propeller Insights)
- **URL:** https://www.joinhomebase.com/blog/small-business-ai-gap-report
- **Sample:** 750 US small-business decision-makers (owners, executives, directors, managers involved in payroll/scheduling/timekeeping/HR) at firms with 5–499 employees; comparison baseline is Homebase's own 2025 survey (n=828, fielded 2025-05-30 to 2025-06-11) | **Published:** 2026-09-22 | **Captured:** 2026-10-19 (27 days old)
- **Exact data:** Overall small-business AI adoption/piloting rose from 64% (2025) to 74% (2026). But adoption is 54% among businesses under $500K revenue vs 81% among businesses at $5M+ revenue — a 27-point gap. Homebase frames the smaller, lower-revenue businesses as "getting left behind," despite having the most to gain from time savings.
- **Read as:** the sharpest pillar-3 number logged this run — "decide where AI belongs and choose a first test" is a resourcing problem as much as a knowledge problem for the smallest businesses in this audience. Useful as a counter to one-size-fits-all "just pick a tool" advice: the gap correlates with revenue/resources, not motivation or need, which argues for a cheap, low-effort first test as the actual unlock for the under-$500K segment rather than a bigger tool stack.
- **Caveat:** US-only, and the 5–499 employee frame skews slightly larger than this audience's typical solo/small-team reader — still directionally solid for founder-stage readers near the lower end of that range. Propeller Insights is a named panel/market-research vendor, not an independent academic source; treat as a solid industry survey, not peer-reviewed research.

### S3 — WSU Vancouver (Occupational Health Science): workers who fear AI will make them obsolete show measurably more counterproductive workplace behaviour via moral disengagement, and the effect is strongest in the most AI-exposed industries (Starting point 2)
- **Source:** Tahira M. Probst (Washington State University Vancouver) with Rebecca Lindgren (WSU Vancouver) and co-authors in Italy and Belgium, published in *Occupational Health Science*
- **URL:** https://phys.org/news/2026-10-workers-ai-worse-workplace-behavior.html
- **Sample:** workers surveyed across 18 industries, cross-referenced against the AI Industry Exposure index (an objective industry-level AI-disruption database); finance/insurance scored highest exposure, agriculture/forestry lowest | **Published:** 2026-10-14 | **Captured:** 2026-10-19 (5 days old)
- **Exact data:** Workers anxious about occupational obsolescence from AI showed heightened moral disengagement — a self-justification mechanism — which in turn predicted self-reported counterproductive behaviour (web surfing on the clock, tardiness). The effect was stronger in high-AI-exposure industries (finance, insurance) and weaker in low-exposure ones (forestry, construction). Probst, quoted: "Moral disengagement is basically a way of justifying bad behavior."
- **Read as:** a genuinely different pillar-2 angle from the judgment-erosion cluster this repo has logged repeatedly (Gartner/marketscale 2026-10-16, WSJ/PMI 2026-10-18, IBM CHRO study). This is not "AI dulls your judgment" — it's "fear of AI replacement predicts you disengaging and behaving worse at work," a named psychological mechanism (moral disengagement) with an industry-exposure gradient. Useful for reframing "protect what's uniquely yours" away from pure skill-erosion into the self-fulfilling trap of fear-driven disengagement: the behaviour the fear produces (checking out) is the opposite of what would actually protect someone's value.
- **Caveat:** phys.org is a secondary science-news aggregator; the primary *Occupational Health Science* paper itself was not directly fetched (no open-access full text located this run) — cite Probst/WSU Vancouver and the journal by name, and flag that exact sample size per industry was not disclosed in the secondary writeup.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — "SIx Harness": eight months of production telemetry (78,933 hook invocations) on a persistent-memory system for long-running coding-agent sessions found 85 failures total, 84 of them in the first three weeks, and zero silent failures (agent-memory reliability, deliberately not a 4th benchmark-integrity paper)
- **Source:** Mike Helwig, "Memory as Infrastructure: Reliability Engineering for Persistent Agent Memory in Months-Long LLM-Assisted Development"
- **URL:** https://arxiv.org/abs/2609.05510
- **Submitted:** 2026-08-31 | **Captured:** 2026-10-19 (7 weeks old)
- **Exact data:** "SIx Harness" is an open-source persistent-memory system for LLM coding agents (hybrid lexical-vector retrieval over local SQLite, SRE-style reliability instrumentation). Operational data from one continuous Claude Code session, January–August 2026: 78,933 total memory-subsystem hook invocations, 85 recorded failures — none silent — with 84 of the 85 occurring in the first three weeks and only 1 failure in the following five-plus months (0 in the final 20 days). The injection layer's precision instrument logged zero false positives over a 10-day measurement window. Three production incidents were traced via telemetry to structural fixes.
- **Read as:** directly relevant to this repository's own practice — it runs a comparable long-horizon, file-based persistent-memory system (this session's `/home/fatiha/.claude/projects/.../memory/`) across months of agent sessions. The "front-loaded failure, then near-zero" curve is a useful sanity check: if this repo's own memory system is still throwing frequent errors well past its first few weeks of use, that is itself a signal worth investigating rather than normal noise. Deliberately picked over a fourth consecutive agent-benchmark-integrity paper (a strong new candidate exists — arXiv:2610.07003, "Reliability of AI Agents: Rater Effects, Drift, and the Return to an Evaluation Program," submitted 2026-10-04 — see Rejected) per the explicit flag in the 2026-10-18 report that a fourth same-theme S-slot would be redundant without comment.
- **Caveat:** single-author paper (Mike Helwig), one case study (one continuous session, one toolchain) — a sample size of one system, not a cross-system benchmark. "None silent" is the author's own system-design claim, not independently audited. Treat as a useful operational data point and a prompt for this repo's own housekeeping, not as a general law of agent-memory reliability.

---

## Rejected this run (logged, not used)

- **arXiv:2610.07003, "Reliability of AI Agents: Rater Effects, Drift, and the Return to an Evaluation Program"** (submitted 2026-10-04) — strong, novel angle on the agent-evaluation-integrity thread (human-rater drift/disagreement, not an oracle-code bug like the three prior entries) and genuinely new to this run's logs. Not used as R1 specifically *because* it is the same theme as 2026-10-14, 2026-10-16 and 2026-10-18's internal-research slots — a fourth run in a row on agent-benchmark/evaluation integrity would be the exact "treat as fresh each time" pattern the 2026-10-18 report flagged as worth stopping. Keeping it named here as the next candidate if this thread gets promoted to a standing tracked theme rather than a new S-slot.
- **GoTo/Workplace Intelligence, "Pulse of Work in 2026"** (39% say AI overreliance is making them less intelligent, 46% of Gen Z, 28% trust AI over own judgment) — thematically strong pillar-2 fit but published 2026-05-19, fielded Nov 2025–Jan 2026: over 5 months old, stale relative to this run's other candidates and to the skill's established recency bar (prior reports have gone out to ~5–6 weeks, not 5+ months). Logged here in case no fresher judgment-erosion data surfaces in a future run.
- **PwC "2026 Global AI Jobs Barometer"** (62% AI-skills wage premium, AI-exposed entry-level roles 7x more likely to require senior-level judgment/leadership skills, 1B+ job ads across 27 countries) — excellent named-institution dataset and a strong pillar-2/3 crossover (the labour market itself pricing judgment as scarce), but published 2026-06-15 — about 18 weeks old, well outside this run's freshness bar, and `pwc.com` itself returned HTTP 403 on direct fetch (confirmed via PRNewswire syndication only). Flagged as a strong future anchor citation, not a fresh signal this run.
- **Wharton judgment-erosion study (via TheStreet)** — `thestreet.com` returned HTTP 403 on direct fetch and no primary Wharton source (paper, working-paper page, or Wharton press release) could be independently located this run; per `research-policy.md`'s source-quality bar (do not launder a secondary summary as a verified primary claim), not cited.
- **"AI practice removed → SAT-question performance drops" study, allegedly presented at COLM 2026 (Oct 8, San Francisco)** — surfaced in search snippets referencing cognitive dependency on AI during practice problems, but no primary paper, author name or COLM session could be located after three search attempts (COLM's own schedule/blog pages did not surface a matching title). Not cited — unverified claim, consistent with the "do not launder a WebSearch summary as a primary source" rule.

## Source health

- WebFetch: functional for about.fb.com, workplaceintelligence.com, joinhomebase.com, phys.org, arxiv.org (abs endpoint), prnewswire.com.
- WebFetch: blocked (HTTP 403) on pwc.com/gx/en/news-room and thestreet.com — both findings held to secondary-source/rejected status rather than cited as primary.
- WebSearch: functional throughout; one query (COLM/SAT study) returned a plausible-sounding but unverifiable claim with no locatable primary source — rejected rather than cited, per research-policy.md.
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." All four cited sources are a platform-run named survey (Meta/YouGov), a named-panel industry survey (Homebase/Propeller Insights), a peer-reviewed-journal study (Occupational Health Science, WSU Vancouver), and an arXiv paper — not social engagement counts.
- Dedup this run checked two layers: (1) `grep -h "URL:" reports/signal-harvest-*.md` across all seven prior dated reports, and (2) a direct `grep` of each candidate's source/author name against `content-vault.md` and `research-notes.md`. No matches found for any of the four cited sources.
- Internal-research theme flag: the agent-benchmark/evaluation-integrity thread (2026-10-14, 2026-10-16, 2026-10-18) was deliberately *not* extended to a fourth run this time, per that thread's own stated risk of becoming "fresh news" by repetition. R1 instead covers a different internal-tooling subject (agent-memory reliability) directly relevant to this repo's own long-running persistent-memory practice. The next strong benchmark-integrity candidate (arXiv:2610.07003) is named in Rejected, not discarded, in case Fatiha wants that thread picked back up as a standing tracked theme rather than a new S-slot each time.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
- **Flagged, not fixed:** today's scheduled 2026-10-19T22:00 cron run (`deploy/logs/signal-harvester-2026-10-19T22-00-01.log`) stopped after `git fetch`/"Already up to date" with no report, no commit, and no visible error in the log — unlike every prior dated log reviewed (which all show the full skill run through to `pushed.`/`done`). This interactive run fills today's research gap but does not explain or fix why the unattended run produced nothing; worth a direct look at the signal-harvester cron invocation itself before assuming tonight's scheduled run will behave differently.
