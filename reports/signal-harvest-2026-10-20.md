# Signal Harvest Run — 2026-10-20

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`),
repo HEAD `50e62a87`. Queen Brain canon unreachable this session (per the startup
hook: "canon: queen-brain NOT in this session") — used this repository's local
context mirror only (`context/positioning.md`, `context/research-policy.md`), and
did not write any price, tier, offer status or customer-facing copy.
**Run type:** Research only. No content drafted, no queue action, no publish action.
Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication). Vault state at run start: 37
READY/33 DRAFT/6 STALE/2 KILLED — release, not production, is the standing
bottleneck; this run adds evidence only, not new drafts.

**Note on cadence:** this run is interactive (operator-requested). Today's own
scheduled 2026-10-20T22:00 cron attempt (`deploy/logs/signal-harvester-2026-10-20T22-00-02.log`)
again stopped after `git fetch`/"Current branch main is up to date" with no
report, no commit and no visible error — the same unattended-cron gap flagged
in the 2026-10-19 report and in `research-notes.md` since RESEARCH 057. Flagged
again below under External actions rather than silently repeated.

**Tool availability this run:** no Tavily or Apify MCP tool was registered this
session (checked via `ToolSearch` before starting); only `WebSearch`/`WebFetch`
were available — same constraint as every run since the social-scrape slots
were dropped from the current harvest shape.

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

Dedup checked two layers before citing or rejecting anything below: (1) `grep -h
"URL:" reports/signal-harvest-*.md` across all nine prior dated reports
(2026-09-19/20/23, 2026-10-02, 2026-10-12, 2026-10-14, 2026-10-16, 2026-10-18,
2026-10-19), and (2) a direct `grep` of each candidate's source/author/study name
against `content-vault.md` and `research-notes.md` directly.

---

## shift-lead evidence (public-eligible)

**No new qualifying signal this run.** A full sweep (all 6 `inventory.md` feeds
plus targeted `WebSearch` on all three pillars) found nothing that clears the bar
as a genuinely new, dated, primary-sourced, audience-fit signal beyond what prior
reports and `research-notes.md` (through RESEARCH 067) already have on file. Per
`research-policy.md`, a gap is logged as a gap rather than filled with a weaker
source.

### Rejected this run

- **NBER Working Paper #35720 (Autor, Rodchenko, Martin, Iscenko, Strand, Pearl,
  Ferere), "Does AI Assistance Enhance or Erode Expertise? Evidence from a
  Three-Month Field Experiment in Patent Drafting"** — surfaced again this run
  as a strong pillar-2 fit (133 patent lawyers RCT, AI raises day-10/day-90
  performance 0.34–0.38 SD but senior lawyers retain a 0.45 SD judgment
  advantage without AI while junior lawyers show no average gain and a
  bifurcated distribution). Already cited as RESEARCH 051 and already used in a
  published vault entry — confirmed via direct `grep` of `content-vault.md` and
  `research-notes.md`. Not re-logged.
- **Henley Business School / Prof. Keiichi Nakata "World of Work" overwhelm
  survey** (2,900 UK workers, year-on-year tracker) — retried directly: 58%
  optimism (up from 56%), 61% overwhelmed (unchanged), 60% lack clear employer
  AI guidelines (improved from 68%), 42% fear over-dependence, 63% sometimes
  avoid available AI tools. Published 2026-06-04 (~4.5 months old) and already
  checked and rejected in a prior run per `research-notes.md` ("adds no new
  information beyond RESEARCH 048's Resume Now/Korn Ferry signals"). Not logged.
- **CSC (Corporate Services Company) restructuring-and-AI survey** (210
  professionals in banking/restructuring/legal/private-credit, published
  2026-10-20 — today) — fresh and named-organization, but wrong population:
  enterprise distressed-financing and cross-border SPV administration
  professionals, not solo/founder-stage readers. 82% expect AI to improve
  decision-making; execution gaps are role-clarity and cross-border admin, not
  this audience's where-to-start problem. Not logged.
- **seresa.io, "87% of Small Businesses Aren't Acting on AI Search"** — blends
  four distinct third-party surveys (Bluehost/ListenLabs n=350, Altus Marketing
  n=1,600 accounts, Scribewise/Scrunch n=602, Goodfirms unspecified) into one
  secondary aggregator post with no single primary source fetched directly;
  topic is also narrow AI-search/SEO optimization, not general AI where-to-start.
  Fails `research-policy.md`'s "do not launder a secondary summary as a verified
  primary claim" bar. Not logged.
- **getaibrief.com "AI-assisted entrepreneurship survey 2026"** — redirects to
  `getyourbrief.com/ai/2026-08-20`, a content-marketing aggregator page, dated
  2026-08-20 (~9 weeks old); not pursued further given the domain pattern and age.
- **MBO Partners "5.6 Million Solo Business Owners" (via theusefuldaily.com)** —
  underlying primary source is MBO Partners' 15th Annual State of Independence
  Report, released fall 2025; the secondary write-up republishing it is dated
  2026-04-04. Well outside this run's freshness bar. Not logged.
- **Hostinger solo-founder survey** (640 US side-hustle founders, Sept 2026
  field, published 2026-10-08; 63% of would-be hirers say AI delayed the hire) —
  already cited in a prior dated report (`hostinger.com/blog/solo-founder-digital-habits/`
  is in the master URL dedup list). Not re-logged.
- **Forbes/Rahul Dogra, "How AI Solopreneurs Run Businesses Without Staff"**
  (2026-10-14, citing a Clarify Capital survey) — retried direct `WebFetch`:
  still HTTP 403, now a **third consecutive failed run** (2026-10-14 original,
  2026-10-17 retry per RESEARCH 067, 2026-10-20 retry here). Flagged again for
  retry; worth trying a search-cache mirror instead of the direct URL next time
  rather than retrying the same blocked path a fourth time.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

### R1 — Single-author monograph synthesizing 164 scholarly works, 100 practitioner records, 29 benchmark records and 17 author-run case studies into a 206-item reliability catalog for coding agents, concluding many "model failures" are actually harness/retrieval/state-management failures (agent-systems-engineering, distinct from the memory-reliability and benchmark-integrity threads already logged)

- **Source:** Stephanie Jarmak, "Engineering Reliable Coding Agents: Evaluating and Operating the System Around the Model"
- **URL:** https://arxiv.org/abs/2608.13867
- **Submitted:** 2026-08-14 | **Captured:** 2026-10-20 (~9.5 weeks old)
- **Exact data:** Synthesizes 164 scholarly works, 100 practitioner records, 29 benchmark records and 17 author-system case records. Contributes "206 reliability records: 193 gated practices, including 56 developed in depth, plus 13 research leads." Central claim: "many apparent model failures originate elsewhere in the system" — i.e. capability gains don't automatically translate to end-to-end success because weaknesses in task construction, execution environments, retrieval, state management, verification or observability can invalidate downstream conclusions. The monograph treats the harness, execution state, retrieval, memory/state management, permissions, review interfaces and resource allocation as the actual reliability surface, separate from the underlying model. Deliverables include evaluation protocols, failure-case documentation from operated systems, and five reusable agent skills with evidence mapping.
- **Read as:** a broader systems-engineering companion to the 2026-10-19 report's R1 (the "SIx Harness" single-case memory-reliability study) — where that paper gave one system's operational telemetry, this one is a synthesis across 164+100+29+17 sources arguing the general principle that failure attribution (model vs. harness vs. retrieval vs. state) is itself the diagnostic step most agent builds skip. Directly actionable for this repository's own agent-run pipeline: when a run misfires (e.g. today's cron stopping silently after `git fetch`, flagged below), the paper's framing argues for checking harness/state/observability before assuming a model-capability problem.
- **Caveat:** single-author work (Stephanie Jarmak), not independently peer-reviewed; the "206 reliability records" catalog is the author's own classification scheme, not an externally validated taxonomy. ~9.5 weeks old at capture — older than this skill's typical recency bar for time-sensitive survey data, but treated as acceptable here because it is a synthesis/methodology contribution rather than a dated statistic that decays. Deliberately chosen over the eval-integrity/rater-drift thread (2026-10-14, -16, -18 reports; next candidate arXiv:2610.07003 still open per the 2026-10-19 report's Rejected list) to avoid a fourth consecutive run on that same narrow theme.

---

## Source health

- WebFetch: functional for anthropic.com/news, huggingface.co/blog, deepmind.google/discover/blog, a16z.com/tag/ai, lennysnewsletter.com/archive, nber.org, arxiv.org (abs endpoint), financialcontent.com, seresa.io, theusefuldaily.com, henley.ac.uk, getaibrief.com (redirect followed).
- WebFetch: blocked (HTTP 403) on openai.com/news (now well past 24 consecutive failed runs per `research-notes.md` — standing recommendation to fix the fetch method or drop OpenAI Blog from the High-priority row in `skills/signal-harvester/inventory.md` remains open) and forbes.com/sites/rahuldogra (third consecutive failure).
- All 6 `inventory.md` RSS/blog feeds were checked directly; none surfaced an audience-problem fit — Anthropic/DeepMind/Hugging Face content is model-release/policy/ML-engineering, a16z is infra/VC-program/podcast content with few visible dates, Lenny's is PM/startup-strategy audience. Same non-fit pattern as every run logged in `research-notes.md` since RESEARCH 050.
- WebSearch: functional throughout; no claim was cited from an unverified WebSearch paraphrase alone — every candidate above was either directly `WebFetch`-confirmed or rejected for failing to confirm.
- No Apify/Tavily MCP tools available in this session (confirmed via `ToolSearch`); no social (Twitter/Instagram/YouTube) scraping attempted — outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill instruction "engagement is not truth." The one logged finding is an arXiv monograph selected on methodology/relevance, not engagement.
- Dedup this run checked two layers: (1) `grep -h "URL:" reports/signal-harvest-*.md` across all nine prior dated reports, and (2) a direct `grep` of each candidate's source/author/study name against `content-vault.md` and `research-notes.md`. This caught two sources (NBER patent-drafting paper, Henley survey) that a URL-only grep on report files alone would have missed, because both were previously logged only inside `research-notes.md`, not in a dated `signal-harvest-*.md` report.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report, and a new `research-notes.md` entry (RESEARCH 068).
- Files modified: `research-notes.md` (append-only). No Notion write access in this
  session — findings filed here with full source/date/excerpt provenance for
  manual hand-off to Notion Content Library or `content-engine`.
- **Flagged, not fixed:** today's scheduled 2026-10-20T22:00 cron run
  (`deploy/logs/signal-harvester-2026-10-20T22-00-02.log`) again stopped after
  `git fetch`/"Current branch main is up to date" with no report, no commit and
  no visible error — the same pattern flagged in the 2026-10-19 report and in
  `research-notes.md` since RESEARCH 057. This is now a persistent, repeated
  unattended-cron failure (not a one-off) and is worth a direct look at the
  cron/runner invocation itself rather than continuing to paper over it with
  same-day interactive runs.
