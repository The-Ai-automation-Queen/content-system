# Signal Harvest Run — 2026-10-23

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`),
repo HEAD at run start `3bcebcd7`. Queen Brain canon not in this session (per the
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
across all fourteen prior dated `reports/signal-harvest-*.md` files plus
`research-notes.md` and `content-vault.md` for each candidate's source name,
author, arXiv ID or study title, not just URL string matching; (2) for two
WebSearch-synthesized claims (the Wharton/TheStreet attribution and the KPMG/UT
Austin numbers), independently re-confirmed against a primary or
publisher-direct page before citing or rejecting, per the standing caution
against laundering a search-answer paraphrase as a verified source (the
"Oaken"/`ivyleagueresume.com` near-misses logged in earlier reports).

---

## shift-lead evidence (public-eligible) — 2 new signals, both pillar 2

### S1 — Academy of Management Review process model: AI use splits into "epistemic de-skilling" (outsourcing thinking under time pressure) vs. "epistemic up-skilling" (AI strengthens judgment when used for reflection, especially under accountability)

- **Source:** Dirk Lindebaum (University of Bath), Natarajan Balasubramanian
  (Ohio State), Mehreen Ashraf (Cardiff), Patrick Haack (Lausanne) — "A Process
  Model of Managerial Phronesis in the Age of Generative AI," *Academy of
  Management Review*, DOI 10.5465/amr.2024.0582.
- **URL:** https://www.eurekalert.org/news-releases/1142738 (press release;
  cross-confirmed against https://phys.org/news/2026-09-ai-undermine-judgment.html
  and the publisher record at https://journals.aom.org/doi/10.5465/amr.2024.0582)
- **Published:** paper dated 2026 in AMR; press release ~2026-09-04 (confirmed via
  WebSearch metadata, "~48-49 days ago" from 2026-10-23) | **Captured:** 2026-10-23
- **Exact data (direct `WebFetch` on the eurekalert release, cross-checked via a
  second `WebSearch` for the press-release date):** Names two named processes —
  "epistemic de-skilling," where managers gradually lose knowledge capabilities
  by outsourcing thinking to generative AI, particularly under time pressure;
  and "epistemic up-skilling," where AI strengthens judgment when used for
  reflection rather than replacement, most effective when managers face
  accountability requirements. Direct quote: "Gen-AI cannot replace the lessons
  learned through first-hand experience. Unlike humans, AI does not experience
  the world, understand consequences of decisions, or grasp social and
  emotional complexities."
- **Read as:** the most actionable framing found yet for pillar 2 — not just
  "AI erodes judgment" (already heavily logged via Blind Overseers,
  Cognitive Commons, IBM CHRO, BCG, Gartner) but a two-path model naming the
  exact behavioral switch that determines which path you're on: time pressure
  + outsourcing vs. accountability + reflection. That is a usable, concrete
  instruction ("build in the accountability step"), not another erosion
  statistic.
- **Caveat:** press release is ~7 weeks old — past this skill's tighter
  freshness bar, but kept with the same "corroborating anchor, distinct
  framing" treatment used for RESEARCH 070's S1 (Cognitive Commons, ~3 months
  old). Peer-reviewed top-tier management journal (AMR), not a vendor survey,
  which raises the evidentiary bar relative to most prior pillar-2 sources.

### S2 — KPMG/UT Austin field study (n=523 early-career professionals): among people with near-identical skill, AI collaboration behavior — not capability — splits outcomes into three groups, 50.1% beating the AI baseline and 24.1% falling below it

- **Source:** Ashish Agarwal, Anitesh Barua, Anu Puvvada, Fangchen Song, Wen Wen
  (UT Austin McCombs, with KPMG US) — "Research: Why Some Junior Employees Work
  Well with AI—and Others Don't," *Harvard Business Review*, published
  2026-07-23.
- **URL:** https://kpmg.com/us/en/media/news/shaping-early-career-success-in-the-age-of-ai.html
  (primary KPMG page; HBR landing page https://hbr.org/2026/07/research-why-some-junior-employees-work-well-with-ai-and-others-dont
  paywalled beyond author/date metadata, used only to confirm authorship and
  date, not findings)
- **Published:** 2026-07-23 | **Captured:** 2026-10-23
- **Exact data (direct `WebFetch` on the KPMG page, cross-confirmed against
  independent numbers in the initial `WebSearch` result before citing — both
  matched exactly):** Field study, 523 US-based early-career KPMG professionals
  (under 18 months' tenure) completed real client-style tasks with an AI agent;
  researchers built an AI-only baseline per task and compared human+AI output
  against it. Three named groups: **AI Amplifiers (50.1%)** — outperformed the
  AI baseline "by orchestrating workflows, framing problems strategically,
  applying domain expertise, and refining results iteratively"; **AI
  Delegators (25.8%)** — matched the AI baseline, "accepted outputs with
  minimal scrutiny or refinement"; **AI Apprentices (24.1%)** — performed
  *below* the AI baseline "despite strong foundational skills," critiquing AI
  output but "often focused on irrelevant issues." Quote — Ashish Agarwal: "We
  weren't simply looking for people who knew how to use AI...we wanted to
  understand what enables some individuals to consistently create value beyond
  what AI can produce on its own." Traditional capability measures did not
  predict which group someone fell into.
- **Read as:** a concrete, named behavioral taxonomy for exactly this
  audience's core anxiety ("will AI replace what I bring, or can I still add
  value on top of it") — and the answer is empirically "depends on *how* you
  work with it, not how skilled you already are," which directly supports
  pillar 2's "what's uniquely yours" framing with specific, actionable
  behaviors (orchestrate, frame strategically, apply domain expertise, refine
  iteratively) rather than a vague erosion warning. Pairs with S1: S1 names the
  *condition* that predicts which path you're on (accountability vs. time
  pressure); S2 names the *behaviors* that distinguish the winning group.
- **Caveat:** published 2026-07-23 — exactly 3 months old, same
  "corroborating-anchor, not breaking news" treatment as S1 above and
  RESEARCH 070's S1. Subjects are KPMG early-career employees (large-firm
  audition task), not solo founders/consultants directly — a proximate, not
  identical, population to this audience; used here for the mechanism
  (behavior over capability), not as a direct population match.

### Rejected this run (named)

- **Wharton judgment-erosion study (via TheStreet)** — `thestreet.com` still
  returns HTTP 403 (confirmed again this run); no primary Wharton source
  located independently. Same unverifiable-secondary rejection as
  2026-10-19's report. Not re-logged as a new finding.
- **IBM CHRO critical-thinking study (Virtualization Review)**, **BCG
  "Companies Risk Losing Critical Skills"**, **Blind Overseers (Berkeley
  Economics Review)**, **Thomson Reuters Future of Professionals Report**,
  **Gartner 40%-of-CIOs stat** — all already logged in prior reports/
  `research-notes.md`/`content-vault.md`; resurfaced again via fresh search
  results. Not re-logged.
- **FreshBooks "Era of the Solopreneur" survey** — already logged repeatedly
  (2026-09-23/-10-02/-10-12/-10-21/-10-22); resurfaced again. Not re-logged.
- **getaibrief.com "65% of Aspiring US Founders" survey** — already rejected
  as a stale redirect in the 2026-10-20/-10-21 reports. Not re-logged.
- **lonelyentrepreneur.com ("AI Made It Possible to Build a Company Alone,"
  "Small Business AI Adoption Hits 75%")** and **macmdviewer.com, crevio.co,
  widejournal.com solo-founder statistics roundups** — same category already
  rejected 2026-10-14/-10-16/-10-18: no disclosed survey methodology, sample
  or field dates; figures resurface verbatim across outlets. Not logged.
- **"AI practice removed → SAT-question performance drops" study (alleged
  COLM 2026 presentation)** — resurfaced in search snippets again; still no
  primary paper, author or session locatable. Same unverifiable rejection as
  2026-10-19. Not logged.
- **DataCamp/YouGov "2026 State of Data and AI Literacy" report** (n=517,
  organizations with 500+ employees) — wrong population (enterprise leaders at
  large orgs, not solo professionals/founders); same pattern as prior
  enterprise-survey rejections (KPMG Q4 2025 Pulse Survey, WRITER, McKinsey
  State of AI). Not logged.
- **"AI Calibracy" competency-framework paper (MDPI)** — a conceptual
  framework paper with no disclosed study, sample or data; considered as a
  second internal-research candidate but SkillForgeBench (below) is the more
  substantive, data-backed addition to the standing benchmark-integrity
  thread. Not logged.
- **Generic AI-automation-for-small-business "case study" content** (HVAC
  "595% ROI," dental-practice booking-rate pieces, and similar vendor-blog
  roundups) — no named primary source, study or disclosed methodology behind
  the headline numbers; same SEO/content-marketing pattern rejected in every
  prior run. Not logged.
- **758-knowledge-worker management-consulting AI study** — this is the
  (older, already extensively covered in `reports/competitor-watch-*.md` and
  `research-notes.md`) BCG/Harvard "jagged frontier" consulting study, not a
  new 2026 finding; resurfaced in a generic search. Not re-logged.

---

## internal-research evidence (private — tooling/build subjects, not for public content) — 1 new signal

### I1 — SkillForgeBench: 842-task sandboxed benchmark grounded in agent "skill specifications" finds a steep capability hierarchy masked by rubric-only scoring — best agent (Opus 4.8) clears only 40.9% strict completion despite 70–86% individual-rubric pass rates

- **Source:** Zhengxi Li, Junyi Zhou, Qiyuan Zhang, Chuhan Wu, Fuyuan Lyu, Le
  Tian, Xiao Zhou, Chen Ma, Yufei Wang — "SkillForgeBench: Evaluating Agent
  Reliability Grounded in Agent Skill Specifications," arXiv:2610.14918.
- **URL:** https://arxiv.org/abs/2610.14918
- **Submitted:** 2026-10-10 | **Captured:** 2026-10-23
- **Exact data (direct `WebFetch` on the arXiv abstract page):** 842 sandboxed
  tasks across five professional domains, built using agent "skill
  specifications" as execution blueprints (resource preparation,
  skill-driven task synthesis, holistic evaluation design) to resolve the
  tradeoff between domain breadth and procedural depth. Opus 4.8 leads with
  40.9% strict-completion rate; individual rubric pass rates across models
  range 70.0%–85.7% versus strict-completion rates of only 12.6%–40.9% — a
  gap the paper says "remains masked under individual rubric pass rates."
  Top-tier agents gain more from skill guidance than weaker ones (Δ19.2% for
  Opus 4.8 vs. Δ5.8% for Haiku 4.5). Process-rubric satisfaction is "under 3%
  for Haiku 4.5."
- **Read as:** directly extends this repo's standing internal-research
  benchmark-integrity thread (behind the 2026-10-14/-16/-18/-19/-20/-22
  reports — rater-drift, oracle-failure and now-cited-synthesis findings).
  This paper's specific contribution: outcome-only/individual-rubric scoring
  systematically overstates reliability versus strict, all-constraints-met
  completion — a quantified version of the "trajectory vs. outcome" blind
  spot the Princeton SAgE survey (RESEARCH 070's I1) named conceptually last
  run.
- **Caveat:** genuinely fresh (13 days old) and independently `WebFetch`-
  confirmed directly on its own abstract page — no secondary-source reliance
  needed this time, unlike RESEARCH 070's I1.

---

## Source health

- WebFetch: functional for anthropic.com/news, huggingface.co/blog,
  deepmind.google/discover/blog, lennysnewsletter.com/archive, arxiv.org (abs
  endpoint), eurekalert.org, kpmg.com, phys.org.
- WebFetch: blocked (HTTP 403) on openai.com/news — now **27 consecutive
  failed runs** since RESEARCH 044; standing recommendation to fix the fetch
  method or drop OpenAI Blog from the High-priority row in
  `skills/signal-harvester/inventory.md` remains open and unactioned.
  thestreet.com also returned HTTP 403 again (Wharton candidate, not logged as
  a result).
- a16z.com/tag/ai: WebFetch succeeded but still exposes no explicit publish
  dates for its podcast/article listing — same structural limitation noted in
  every prior run; content was VC-program/infra/policy, no pillar fit either
  way.
- All 6 `inventory.md` RSS/blog feeds were checked directly; none surfaced an
  audience-problem fit within the 7-day freshness window (Anthropic:
  governance/investment/model-release news; Hugging Face: retrieval/robotics
  infra posts; DeepMind: Gemini 4 Argon releases; Lenny's: newest post is
  Sept 22, a full month outside the window). Same non-fit pattern as every run
  logged in `research-notes.md` since RESEARCH 050.
- HBR's own article page is paywalled beyond author/date metadata; used only
  to corroborate authorship and publish date for S2, not as the basis for any
  cited finding — all S2 findings were drawn from the primary KPMG page
  instead, independently matching the numbers an initial `WebSearch` had
  already surfaced.
- Two WebSearch-synthesized claims were independently re-verified before any
  citation/rejection decision, per the standing "Oaken"/`ivyleagueresume.com`
  caution against laundering a search paraphrase as a confirmed source: the
  Wharton/TheStreet attribution (confirmed unreachable, rejected) and the
  KPMG/UT Austin numbers (confirmed via the primary KPMG page, logged as S2).
- No Apify/Tavily MCP tools available in this session (confirmed via
  `ToolSearch`); no social (Twitter/Instagram/YouTube) scraping attempted —
  outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per
  skill instruction "engagement is not truth." All three logged findings were
  selected on source authority (peer-reviewed AMR journal; named KPMG/UT
  Austin field study; a 13-day-old arXiv benchmark paper) and novelty of
  framing, not share counts.
- Dedup this run checked `grep -rli` (name/author/study-title based) across
  all fourteen prior dated reports plus `research-notes.md` and
  `content-vault.md`. This caught the repeat candidates listed above (Wharton,
  IBM CHRO, BCG, Blind Overseers, Thomson Reuters, Gartner, FreshBooks,
  getaibrief, lonelyentrepreneur-category sites, the alleged COLM/SAT study,
  the 758-knowledge-worker jagged-frontier study) that a URL-only grep would
  have missed for several of them.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report, and a new `research-notes.md` entry
  (RESEARCH 071).
- Files modified: `research-notes.md` (append-only). No Notion write access in
  this session — findings filed here with full source/date/excerpt provenance
  for manual hand-off to Notion Content Library or `content-engine`.
