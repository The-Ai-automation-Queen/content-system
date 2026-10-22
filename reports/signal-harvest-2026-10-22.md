# Signal Harvest Run — 2026-10-22

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`),
repo HEAD at run start `b092917f`. Queen Brain canon not in this session (per the
startup hook: "canon: queen-brain NOT in this session") — used this repository's
local context mirror only (`context/positioning.md`, `context/research-policy.md`),
and did not write any price, tier, offer status or customer-facing copy.
**Run type:** Research only. No content drafted, no queue action, no publish
action. Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication). Vault state at run start: 37
READY/33 DRAFT/6 STALE/2 KILLED/0 POSTED (per the session's own startup reality
check) — release, not production, is the standing bottleneck; this run adds
evidence only, not new drafts.

**Note on cadence:** this run is interactive (operator-requested).

**Tool availability this run:** no Tavily or Apify MCP tool was registered
this session (confirmed via `ToolSearch` before starting); only
`WebSearch`/`WebFetch` were available — same constraint as every run since the
social-scrape slots were dropped from the current harvest shape.

---

## Approved audience problem (source: `context/positioning.md`)

Experienced professionals and founders with useful knowledge and lived experience
who feel overwhelmed by AI, or who struggle to turn that knowledge into visible,
valuable work. Three live starting points: (1) understand AI and know where to
begin, (2) recognise and protect what's uniquely theirs, (3) decide where AI
belongs in a real business problem and choose a first test.

Split by project per `CURRENT-WORKFLOW.md`'s research/project separation:
**shift-lead** (public-eligible) vs **internal-research** (private tooling, not
for public content unless Fatiha requests that exact subject).

Dedup checked two layers before citing or rejecting anything below: (1) `grep -rli`
across all thirteen prior dated `reports/signal-harvest-*.md` files plus
`research-notes.md` and `content-vault.md` for each candidate's source name,
author, arXiv ID or study title, not just URL string matching.

---

## shift-lead evidence (public-eligible) — 1 new signal

### S1 — Conceptual framework: AI adoption can deplete the shared "cognitive commons" professions need to keep producing experts who can oversee AI at all (pillar 2 — protect what's uniquely yours)

- **Source:** Nolan Lovett — "The Tragedy of the Cognitive Commons: How AI Could
  Disrupt the Regeneration of Professional Expertise"
- **URL:** https://arxiv.org/abs/2607.29380
- **Submitted:** 2026-07-31 | **Captured:** 2026-10-22
- **Exact data (direct `WebFetch` on the arXiv abstract page):** Conceptual HRD
  (Human Resource Development) paper. Introduces the "Cognitive Commons"
  framework (commons theory + HRD + distributed cognition) to argue that
  individually rational AI-adoption decisions can "deplete the shared expertise
  pool professions require for renewal." Distinguishes **Internalized Mastery**
  (deep domain knowledge from sustained practice) from **Distributed Mastery**
  (orchestrating human-AI systems), and introduces the **Validation Tether**:
  "effective AI oversight depends on the expertise AI adoption may undermine."
  States five factors determine occupational vulnerability and that governance
  must form at organizational, professional-association and policy levels.
  Author flags this is conceptual, with "early" and sector-specific supporting
  evidence, not a completed empirical study.
- **Read as:** a different unit of analysis from the individual-judgment thread
  already on file (RESEARCH 052–057, and 2026-10-21's S1 RCT / S2 panel): those
  are about *one person's* judgment eroding. This is a systems/generational
  framing — if everyone individually delegates to AI, the pipeline that produces
  the next generation of experts able to *judge* AI's output degrades too, which
  is a recursive oversight problem no single company or professional fixes alone.
  The "Validation Tether" name is a usable, citable hook for "the oversight you
  rely on is made of the exact expertise you're currently automating away."
- **Caveat:** submitted 2026-07-31 — nearly 3 months old, same corroborating-anchor
  treatment as RESEARCH 050/054/057's older citations, not breaking news. It is a
  conceptual/argument paper, not new data; its "early evidence" claims about
  labor-market and clinical disruption are asserted, not independently verified
  in this run. Given how saturated the judgment-erosion theme already is on file,
  use this for its distinct framing (the commons/pipeline angle), not as a
  sixth repetition of "AI erodes individual judgment."

### Rejected this run

- **Chapman University 2026 Fear Study** (released 2026-10-20, genuinely fresh,
  WebFetch-confirmed via phys.org after GlobeNewswire returned 403) — AI ranked
  in Americans' top-10 fears (AI harming the political process, 51.9%, #3; AI
  hurting the economy, 49.7%, #7). Wrong angle for this audience: it measures
  general-population political/economic dread, not professionals'/founders'
  relationship to using AI in their own work. One notable nugget — "people who
  use AI more frequently tend to report less fear" — is interesting but belongs
  to a different argument than this project's positioning. Not logged.
- **CNBC / IBM chief talent officer piece** ("skill erosion from AI," 2026-10-06)
  — cites the same IBM CHRO survey (1,500 CHROs / 8,800 employees) already
  logged in RESEARCH 050 and the 2026-10-14/-10-19/-10-21 reports. Not re-logged.
- **Boston Consulting Group, "When Everyone Uses AI, Companies Risk Losing
  Critical Skills"** — already logged verbatim in `research-notes.md` (70
  C-suite leaders; "half already observing de-skilling," "only 1 in 10 have a
  strategy"). Not re-logged.
- **Gartner "only 40% of CIOs guard against AI dulling staff judgment"** —
  already logged in the 2026-10-16/-10-18/-10-19 reports and `research-notes.md`/
  `content-vault.md`. Not re-logged.
- **Thomson Reuters "Future of Professionals Report 2026"** — already logged in
  the 2026-09-19/-10-14/-10-16 reports and `research-notes.md`/`content-vault.md`.
  Not re-logged.
- **FreshBooks/Wakefield solopreneur survey** ("86% try AI first") — resurfaced
  again in a pillar-3 search; already on file (`content-vault.md`,
  `research-notes.md`, 2026-09-23/-10-02/-10-12/-10-21 reports). Not re-logged.
- **Advisor Perspectives, "The Skill That Fades When AI Does the Prep"**
  (2026-09-23) — WebFetch returned HTTP 403, could not independently confirm
  primary content; outlet is a financial-advisor trade blog (narrow audience),
  and the piece reads as secondary commentary rather than a primary study. Not
  logged per `research-policy.md`'s bar against citing unverified/unreachable
  secondary summaries.
- **system7.ai, "AI Dependency and the Risk of Cognitive Atrophy"** — vendor
  blog post with no named study, dataset or methodology disclosed in search
  results; same treatment as prior runs' rejection of unsourced vendor-content
  aggregators (e.g. 2026-10-21's launchready.ai rejection). Not logged.
- **Generic "first AI pilot" blog posts** (dev.to, flexnetllc.com, modernagentic
  solutions.com, assistloop.ai, techicy.com) surfaced on a pillar-3 search — all
  are SEO/content-marketing posts with no named source, study or dated evidence,
  just generic 30/90-day pilot advice repeated across outlets. Fails the
  "traceable to a logged source" bar in `security.md` §3.3. Not logged.
- **getaibrief.com, Rikunabi/HBS case study** — resurfaced; already assessed and
  rejected in the 2026-10-20/-10-21 reports (stale redirect; not dated to any
  run's window respectively). Not re-logged.

---

## internal-research evidence (private — tooling/build subjects, not for public content) — 1 new signal

### I1 — "Emerging Trends in AI Agent Evaluation" — 33-trend survey from Princeton's SAgE group, naming cost, trajectory-vs-outcome, and lab-to-field transfer as the discipline's open problems

- **Source:** Felix Chen, Stephan Rabanser, Peter Kirgis, Nitya Nadgir, Rishi
  Bommasani, Magda Dubois, Elham Tabassi, Cozmin Ududec, Anka Reuel, Sanmi
  Koyejo, Sayash Kapoor, Arvind Narayanan (Princeton / Stanford / UK AI Security
  Institute / Brookings)
- **URL:** https://sage.cs.princeton.edu/trends/ (paper PDF at
  https://sage.cs.princeton.edu/trends/emerging-trends-paper.pdf — PDF binary,
  not independently text-fetchable this run; confirmed instead via the authors'
  own announcement post and a secondary write-up, both named below)
- **Published:** 2026-10-19 | **Captured:** 2026-10-22
- **Exact data (WebSearch + WebFetch on normaltech.ai's summary of the paper,
  cross-referenced against the authors' own X/Twitter announcement thread):**
  Surveys 33 shifts/practices/open questions across the "How," "What," and "Who"
  of AI agent evaluation. Named claims: (1) frontier-agent evaluation now costs
  "tens of thousands of dollars in credits" for benchmarks like ExploitBench,
  pricing out independent evaluators; (2) evaluation must shift from
  outcome-only scoring to examining trajectories, since tool-using agents can
  take "problematic shortcuts" invisible to output-only grading; (3) a cited
  METR study found agent tools *increased* software-development time in a real
  deployment despite lab capability demonstrations — lab performance did not
  transfer; (4) framing agents as "automation" vs. "augmentation" changes what
  gets measured and found; (5) frontier labs restricting model access and
  shifting from raw to summarized chain-of-thought traces is reducing
  independent evaluators' ability to assess true agent capability.
- **Read as:** directly extends this repo's standing internal-research
  benchmark-integrity thread (RESEARCH entries behind the 2026-10-14/-16/-18/-19/
  -20 reports — single-study reliability findings like arXiv:2610.07003's
  rater-drift result and arXiv:2610.16067's unreliable-evaluation finding). This
  is the field's own synthesis of *why* those single-study problems keep
  recurring: cost barriers concentrate evaluation power in a few well-funded
  labs, trajectory-blindness lets agents game outcome metrics, and shrinking
  access to raw reasoning traces makes independent verification structurally
  harder over time — a system-level explanation, not one more individual
  reliability data point.
- **Caveat:** could not `WebFetch` the primary PDF directly this run (binary/
  compressed stream, not text-extractable by the tool); relied on the authors'
  own announcement thread and one secondary write-up (normaltech.ai) rather than
  the paper's own abstract text. The five claims above are consistent across
  both sources, which raises confidence, but this should be flagged as
  not-yet-independently-primary-verified if used for anything beyond internal
  orientation.

---

## Source health

- WebFetch: functional for anthropic.com/news, huggingface.co/blog,
  deepmind.google/discover/blog, a16z.com/tag/ai, lennysnewsletter.com/archive,
  arxiv.org (abs endpoint), phys.org, normaltech.ai.
- WebFetch: blocked (HTTP 403) on openai.com/news (now 26 consecutive failed
  runs since RESEARCH 044 — standing recommendation to fix the fetch method or
  drop OpenAI Blog from the High-priority row in
  `skills/signal-harvester/inventory.md` remains open, unactioned),
  globenewswire.com (Chapman Fear Study press release — worked around via
  phys.org's independent write-up), advisorperspectives.com (could not work
  around; candidate not logged as a result), and the Princeton paper's own PDF
  (binary/compressed stream — worked around via the authors' announcement
  thread and a secondary summary; flagged as a caveat on I1 above).
- All 6 `inventory.md` RSS/blog feeds were checked directly; none surfaced an
  audience-problem fit (Anthropic: Skills-foundation donation, Long-Term Benefit
  Trust appointment, public-benefit investment, evaluator-access update,
  midterms prep, Singapore MOU — governance/model-release news; Hugging Face:
  model-release/infra posts; DeepMind: Gemini 4 Argon releases; a16z:
  podcasts/market-state content, no dates visible; Lenny's: most recent post
  Oct 13, outside the 7-day freshness window). Same non-fit pattern as every run
  logged in `research-notes.md` since RESEARCH 050.
- WebSearch: functional throughout; no claim was cited from an unverified
  WebSearch paraphrase alone — S1 was independently `WebFetch`-confirmed on its
  arXiv abstract page; I1 was cross-confirmed across two independent sources
  (see its caveat) since its primary PDF could not be text-fetched.
- No Apify/Tavily MCP tools available in this session (confirmed via
  `ToolSearch`); no social (Twitter/Instagram/YouTube) scraping attempted —
  outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill
  instruction "engagement is not truth." Both logged findings were selected on
  source authority and novelty of framing (S1: a named conceptual framework not
  previously on file; I1: a 12-author Princeton/Stanford/Brookings survey
  published 3 days ago), not share counts.
- Dedup this run checked `grep -rli` (name/author/study-title based, not just
  URL string matching) across all thirteen prior dated reports plus
  `research-notes.md` and `content-vault.md`. This caught six repeat candidates
  (CNBC/IBM, BCG, Gartner, Thomson Reuters, FreshBooks, getaibrief/Rikunabi) that
  surfaced again via fresh search results or republishes.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report, and a new `research-notes.md` entry
  (RESEARCH 070).
- Files modified: `research-notes.md` (append-only). No Notion write access in
  this session — findings filed here with full source/date/excerpt provenance
  for manual hand-off to Notion Content Library or `content-engine`.
