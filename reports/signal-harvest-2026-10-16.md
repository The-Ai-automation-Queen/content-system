# Signal Harvest Run — 2026-10-16

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`).
Queen Brain canon unreachable this session (per the startup hook: "canon:
queen-brain NOT in this session") — used this repository's local context mirror
only, and did not write any price, tier, offer status or customer-facing copy.
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

Last run was 2026-10-14 (2 days ago). Checked every URL already logged across the
2026-09-19/20/23, 2026-10-02, 2026-10-12 and 2026-10-14 reports (`grep -h "URL:"
reports/signal-harvest-*.md`) before citing anything new below.

---

## shift-lead evidence (public-eligible)

### S1 — Named pollster data on exactly which tasks workers hand to AI vs keep for themselves (Starting point 3)
- **Source:** Epoch AI / Ipsos, probability-based KnowledgePanel survey
- **URL:** https://epoch.ai/publications/one-in-five-workers-delegate-work-to-ai
- **Sample:** 1,106 employed U.S. adults | **Field dates:** 2026-07-10 to 2026-07-19 | **Published:** 2026-08-06 | **Captured:** 2026-10-16 (~10 weeks old)
- **Exact data:** 20% of employed adults say AI now handles at least one task they previously handed to a coworker or contractor. Most-reallocated tasks: data analysis (7.1% of respondents), document review (5.7%), record maintenance (5.3%). 66% of AI outputs are used unchanged or with only minor edits; just 5% get heavily reworked or redone. Time savings show up in roughly half of AI-heavy tasks, but about one in six took longer than the human version.
- **Read as:** the sharpest pillar-3 fit found so far — not a general "AI adoption" stat but a direct, probability-sampled answer to "where does AI actually get a first test" at the task level, with an honest counterpoint (one in six tasks were *slower* with AI, 5% needed a full redo). Pairs with the 2026-10-14 Hostinger finding (solo founders won't hand AI pricing or customer relationships) by supplying the task-level texture underneath that boundary: the tasks people do hand over cluster around analysis/review/record-keeping, not judgment calls.
- **Caveat:** general employed-adult sample, not solo-founder/consultant-specific — same audience-skew caveat as other large labor-market surveys logged for this pillar. Ipsos/Epoch AI disclose methodology fully (named pollster, probability panel, field dates), which is stronger than most sources checked this run.

### S2 — Fresh primary survey: professionals rank personal judgment far above AI tools as the driver of their success (Starting point 2)
- **Source:** Pipedrive, "AI and Humanity at Work" / "The AI Paradox: Professionals Want AI as a Thinking Partner, Not an Autopilot"
- **URL:** https://www.pipedrive.com/en/newsroom/pipedrive-report-the-ai-paradox-professionals-want-ai-as-a-thinking-partner-not-an-autopilot
- **Sample:** 1,000 respondents across industries, employment statuses and age groups | **Field dates:** Summer 2026 | **Published:** 2026-08-25 | **Captured:** 2026-10-16 (~7.5 weeks old)
- **Exact data:** 51.1% of respondents say their professional success is driven primarily by personal experience and judgment; only 15.1% point to advanced AI tools. Only 5.6% believe AI should replace most human roles. Nearly 40% use AI daily, yet among non-users 76% say they're unlikely to adopt within 12 months — and more than half of all AI resistance in the survey comes from experienced professionals aged 35-54 (not the oldest or youngest cohort).
- **Read as:** a cleaner, more direct pillar-2 number than anything logged so far — most prior pillar-2 sources (Resume Now's 97%, Microsoft WorkLab) ask what people *trust* or *value*; this one asks what people credit their actual *success* to, and gets a 3.4x margin for judgment over AI tools. The age-35-54 resistance detail is also a useful counter-stereotype: resistance isn't concentrated in the oldest workers, it's concentrated in exactly the experienced-professional band this brand addresses.
- **Caveat:** vendor-commissioned (Pipedrive sells CRM/sales software) — cite the disclosed topline numbers, not Pipedrive's own "thinking partner" framing. Field dates given only as "Summer 2026," not exact start/end.

### S3 — Gartner research: most IT leaders have no plan to stop AI from eroding staff judgment, with a named "cognitive surrender" failure mode (Starting point 2)
- **Source:** Gartner, "Building a Workforce That Doesn't Surrender Its Judgment" — accessed via two independent secondary syndications (not Gartner's own site directly)
- **URL:** https://www.marketscale.com/industries/software-and-technology/gartner-only-40-of-cios-guard-against-ai-dulling-staff-judgment (corroborated by https://finance.biggo.com/news/5d31d715-15bc-4e09-b876-d7d5a5ab67d8)
- **Sample:** 533 CIOs/senior IT leaders, companies with $50M+ annual revenue (250 North America, 150 Europe, 133 Asia-Pacific) | **Field dates:** November-December 2025 | **Published:** 2026-10-12 | **Captured:** 2026-10-16 (4 days old)
- **Exact data:** Only 40% of senior IT leaders have a strategy to stop AI use from wearing down employee capability; 60% do not. Gartner projects 30% of organizations will find AI has weakened independent judgment in at least one core role by 2030. Names the mechanism "cognitive surrender": accepting an AI answer because it looks right, handing over both the reasoning and the accountability with it — the more often results look satisfactory, the less employees feel the need to check them.
- **Read as:** the first source this run with a named *mechanism* for how judgment erodes (not just a stat that it's valued) — useful for pillar 2's "protect" verb specifically: cognitive surrender describes exactly what happens when protection is absent. Complements S2 (people credit judgment for their success) with the organizational-side risk (most orgs aren't guarding the thing their people say matters most).
- **Caveat:** could not independently fetch a Gartner-hosted primary page (newsroom search returned no matching press release — this appears to be a paywalled research report, not a public release); relying on two independently-written secondary outlets reporting identical sample size, field dates and percentages, which is stronger corroboration than a single-secondary citation but still short of a primary fetch. Enterprise IT-leader sample, not solo-founder-specific — flag if used.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — New benchmark: the best coding agent ships functionally-correct AND secure code only ~25% of the time, despite 91% functional pass rates (agent-evaluation integrity)
- **Source:** Wu, Ge, Chen, Zhang, Wu, Xie, Li, Peng, Zhang, Huang, Du, Huang, Zhang, Zhuo, Ng — "Last Secure Code Benchmark (LSCBench): Is the Code You Vibe Secure?" (arXiv, National University of Singapore / Alibaba-Qwen-affiliated authors)
- **URL:** https://arxiv.org/abs/2610.14766
- **Submitted:** 2026-10-10 | **Captured:** 2026-10-16 (6 days old)
- **Exact data:** 450 tasks built from 150 real-world vulnerabilities across 7 languages and 24 CWE categories, three coding scenarios. Six frontier coding agents tested: functional pass rates range 73.6%-91.3%, but the best agent produces code that is both functional AND secure for only 25.1% of tasks; the other five land between 16.4% and 24.7% functional+secure. Across the full vulnerability-scenario set, the best model passes only 12% of vulnerability scenarios in the "vibe coding" setting.
- **Read as:** directly extends this content-system's own build-posture interest logged on 2026-10-14 (BenchJack, arXiv 2605.12673 — benchmarks can be gamed to look solved without solving the task). That source showed benchmarks can be *gamed*; this one shows a benchmark working as intended can still hide a 3-4x gap between "looks done" (passes functional tests) and "is actually safe to ship" — the same failure shape as this run's earlier theme, applied to security instead of task-completion. Relevant any time an internal agent/workflow change is validated only by "tests pass." Internal build interest only, not eligible for public shift-lead content per `positioning.md`'s private-operating-subjects rule.
- **Caveat:** did not independently re-run the benchmark or inspect the 450 task definitions; relying on the paper's self-reported abstract/results as fetched. 15-author paper, no institution list explicitly stated in the fetched excerpt (author affiliations inferred from search context, not confirmed from the paper itself) — treat institutional attribution as unconfirmed.

---

## Rejected this run (logged, not used)

- **Resume Now "AI-whelmed" worker study (44% don't know where to start)** — already logged 2026-09-19 (via `cpapracticeadvisor.com/...190236`); resurfaced by this run's pillar-1 search. Confirmed via `grep` and skipped as a repeat.
- **PwC Global Workforce Hopes and Fears Survey 2026 (49,000 workers; 51% access to AI learning, down from 59%; "four cohorts" front-runners/engine-room/insurgents/indispensables framing)** — same underlying report already logged 2026-10-02 and referenced again 2026-10-14 as the standing pillar-1 citation. The "four cohorts" cut is a different stat from the same source, not a new source; per the dedup rule this run treats it as a repeat rather than a fresh S-slot, consistent with how Thomson Reuters was rejected on 2026-10-14 for the same reason.
- **PwC 2026 Global AI Jobs Barometer (62% AI-skills wage premium, "two-track" professionalised vs democratised labor market, 163% productivity gain for most AI-exposed companies)** — different PwC report from Hopes and Fears, genuinely new, but direct `pwc.com` fetch returned HTTP 403 this run; only reached via secondary aggregation (enterprisedna.co, hrtechedition.com, prnewswire syndication). Flagging as a strong pillar-2/3 candidate for a future run if the primary page becomes fetchable, rather than citing from secondary-only this run.
- **Solo-founder "AI stack" statistics** (macmdviewer.com "26 Verified Numbers," shipsquad.ai "Solo Founder Index," agentmarketcap.ai "$1M ARR stack," lonelyentrepreneur.com) — same category rejected 2026-10-14 ("solo-unicorn trend pieces"): no disclosed survey methodology, sample, or field dates; figures like "$240k median ARR for AI-augmented solo founders" read as unverifiable SEO/content-marketing synthesis rather than checkable primary data. Dropped per `research-policy.md`'s source-quality bar.
- **Forbes contributor piece on AI solopreneurs (2026-10-14, Rahul Dogra)** — contributor (not staff) byline aggregating the same unverified solo-founder stats flagged above; not independently verified, not cited.
- **SHRM "Navigating AI in the Workplace 2026"** — resurfaced again this run; same unverifiable-primary-document issue flagged 2026-10-12 and 2026-10-14 (SHRM's own site not independently fetched). Not cited for a third time.

## Source health

- WebFetch: functional for digitalisationworld.com, marketscale.com, finance.biggo.com, arxiv.org (abs endpoint), epoch.ai, pipedrive.com.
- WebFetch: blocked (HTTP 403) on pwc.com/gx/en/news-room — could not independently verify the 2026 AI Jobs Barometer primary page; see Rejected list.
- WebSearch: functional throughout; several queries again surfaced secondary/aggregator content with no disclosed primary methodology (solo-founder "stack" statistics, SHRM syndication) — rejected rather than cited, consistent with prior runs' source-quality bar.
- No Apify/Tavily MCP tools available in this session; no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." All candidates evaluated this run are named-pollster survey or arXiv-paper data, not social engagement counts.
- Checked every URL already logged in the 2026-09-19, 2026-09-20, 2026-09-23, 2026-10-02, 2026-10-12 and 2026-10-14 reports before citing (via `grep`); two accidental resurfacings (Resume Now, PwC Hopes and Fears) caught and rejected as repeats.
- Pillar 1 ("where to begin") found no new citable source this run beyond the already-logged PwC/Resume Now repeats — still standing on the 2026-10-02 PwC figure and the 2026-10-14 Elon University dread framing. Flagging again for the next sweep.
- Gartner (S3) is the one source this run cited from secondary syndication only, with an explicit caveat — flagged distinctly from the Rejected list because two independent outlets corroborate identical sample size/dates/figures, unlike the single-secondary SHRM case which stays rejected.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report.
- Files modified: none. No Notion write access in this session — findings filed here with full source/date/excerpt provenance for manual hand-off to Notion Content Library or `content-engine`.
