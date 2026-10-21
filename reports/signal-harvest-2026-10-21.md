# Signal Harvest Run — 2026-10-21

**Skill:** `skills/signal-harvester/SKILL.md` (current version — reads `AGENTS.md` +
`CURRENT-WORKFLOW.md`). Not registered in the Skill tool this session; read and
followed manually per standing note ([[project-skills-not-registered]]).
**Context version loaded:** `shift-lead-2026-09-12` (`context/current-context.json`),
repo HEAD at run start `250b09bc`. Queen Brain canon unreachable this session
(per the startup hook: "canon: queen-brain NOT in this session") — used this
repository's local context mirror only (`context/positioning.md`,
`context/research-policy.md`), and did not write any price, tier, offer status
or customer-facing copy.
**Run type:** Research only. No content drafted, no queue action, no publish
action. Consistent with `security.md` §3.1 (queue-only, human releases) and
`CURRENT-WORKFLOW.md` (manual publication). Vault state at run start: 37
READY/33 DRAFT/6 STALE/2 KILLED/0 POSTED (per the session's own startup reality
check) — release, not production, is the standing bottleneck; this run adds
evidence only, not new drafts.

**Note on cadence:** this run is interactive (operator-requested). Today's own
scheduled 2026-10-21T22:00 cron attempt had not yet run at the time of this
session.

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

Dedup checked two layers before citing or rejecting anything below: (1) `grep -h
"URL:" reports/signal-harvest-*.md` across all twelve prior dated reports
(2026-07-15, -07-18, 2026-09-19/20/23, 2026-10-02, -10-12, -10-14, -10-16,
-10-18, -10-19, -10-20), and (2) a direct `grep` of each candidate's
source/author/study name against `content-vault.md` and `research-notes.md`.

---

## shift-lead evidence (public-eligible) — 2 new signals

### S1 — RCT: AI assistance improves immediate performance but reduces persistence and hurts independent problem-solving after the AI is removed (pillar 2 — protect what's uniquely yours)

- **Source:** Grace Liu, Brian Christian, Tsvetomira Dumbalska, Michiel A. Bakker,
  Rachit Dubey — "AI Assistance Reduces Persistence and Hurts Independent
  Performance" (Carnegie Mellon / UC Berkeley Center for Human-Compatible AI /
  MIT / Oxford / UCLA)
- **URL:** https://arxiv.org/abs/2604.04721
- **Submitted:** 2026-04-06 | **Latest revision:** 2026-10-13 | **Captured:** 2026-10-21
- **Exact data (direct `WebFetch` on the arXiv abstract page, not a search
  paraphrase):** Three randomized controlled trials, N=1,222 total, on
  arithmetic/fraction problems and SAT-style reading comprehension. Participants
  had ChatGPT access through problem 12, then it was removed. AI assistance
  "boosts immediate task performance," but afterward people "perform
  significantly worse without AI and are more likely to give up" than a
  no-AI-access control group. Authors' framing: persistence is "foundational to
  skill acquisition and ... one of the strongest predictors of long-term
  learning," and constant AI access "conditions people to expect immediate
  answers," denying the struggle that builds independent capability.
  Presented at the 2026 Conference on Language Modeling (COLM).
- **Read as:** a causal, controlled-experiment version of pillar 2's "don't
  let AI quietly erode what's yours" — most prior signals on this theme
  (RESEARCH 052–056, Glean's "botshitting" figures) are observational
  self-report; this is a randomized trial showing the mechanism directly: not
  "people feel less sharp," but "people measurably give up faster and perform
  worse within the same session once the AI crutch is removed." Strong
  standalone hook or supporting data point for a "the cost isn't visible until
  you look away from the tool" angle.
- **Caveat:** task domains are fraction math and reading comprehension — a lab
  setting, not real business tasks; the authors' own framing (persistence/skill
  acquisition) generalizes cautiously to a professional audience, not
  literally. Note the October revision date (v2, Oct 13) is a paper update, not
  a new study — flagging accurately as a 2026-04-06 original with October 2026
  media pickup (Berkeley News, TechXplore, ~Oct 9), not as breaking news.

### S2 — Panel synthesis: AI expands what founders can execute while eroding two distinct forms of judgment needed to oversee it (pillar 2 — protect what's uniquely yours)

- **Source:** Matthew Grimes (Cambridge Judge Business School), Dev Jennings
  (University of Alberta), Jennifer S. Mueller (University of San Diego),
  Yen-Ting (Daniel) Lin (University of San Diego) — "Blind Overseers: AI and
  the Erosion of Judgment," Berkeley Economics Review
- **URL:** https://cmr.berkeley.edu/2026/10/blind-overseers-ai-and-the-erosion-of-judgment/
- **Published:** 2026-10-21 (today) | **Captured:** 2026-10-21
- **Exact data (direct `WebFetch` confirmed):** Drawn from a 2026 "Reversing
  the Arrow" conference panel of entrepreneurship/creativity scholars. Names
  two risks: (1) **evaluative judgment erosion** — workers accept AI outputs
  without inspection, accumulating "cognitive debt"; cites an MIT Media Lab
  study finding people who wrote essays with an AI assistant showed "weaker
  neural connectivity, weaker recall of what they had just written, and less
  originality" than unaided writers; (2) **generative judgment erosion** —
  organizations converge on similar AI-suggested solutions, losing collective
  diversity; cites AI-assisted student essays converging in vocabulary/structure
  "until graders suspected collaboration." Also notes disclosing AI involvement
  "lowers trust by lowering perceived legitimacy, independent of quality."
- **Read as:** a same-day, directly-citable synthesis piece that pairs well
  with S1 — S1 is the controlled-experiment mechanism (persistence drops once
  AI is removed); this is the academic panel's framing of the oversight
  problem it creates (founders execute more, judge less, and their AI-assisted
  output converges with everyone else's). Useful for a "two separate ways AI
  quietly takes your edge" structure, or to corroborate/extend the existing
  "own your judgment" pillar-2 thread (RESEARCH 052–056, Glean Work AI Index)
  with fresh, named academic sourcing rather than survey self-report.
- **Caveat:** this is a panel/opinion synthesis citing other researchers' work
  (MIT Media Lab essay study, unnamed convergence studies) rather than the
  panel authors' own primary data — treat the headline framing as the authors'
  and the cited statistics as one level removed; did not independently
  `WebFetch`-verify the underlying MIT Media Lab study separately this run.

### Rejected this run

- **Frontiers in Digital Health, "Augmentation or erosion? Artificial
  intelligence and the transformation of clinical reasoning"** (published
  2026-10-21, today) — same erosion-of-judgment theme as S1/S2 and genuinely
  fresh, but wrong population per `CURRENT-WORKFLOW.md`'s audience-fit bar:
  the review is about clinicians' diagnostic reasoning in healthcare settings,
  not this audience's AI-adoption decision. Same treatment as the 2026-10-20
  report's CSC restructuring-survey rejection (right theme, wrong population).
  Not logged as a citable signal; noted here in case a future clinician-adjacent
  content item wants it.
- **launchready.ai, "AI Keeps Getting More Useful for Small Businesses, and You
  Don't Have to Rush It"** — blends three distinct secondary citations (U.S.
  Chamber of Commerce generative-AI survey with no specific date given, U.S.
  Census Bureau Business Trends and Outlook Survey referenced to a May 2026
  data point, and a 2024 Salesforce survey) into one aggregator post with no
  single primary source fetched directly. Fails `research-policy.md`'s "do not
  launder a secondary summary as a verified primary claim" bar, same pattern as
  the 2026-10-20 report's seresa.io rejection. Not logged.
- **getaibrief.com, "65% of Aspiring US Founders to Use AI in 2026"** —
  resurfaced in a pillar-1 search; already identified and rejected in the
  2026-10-20 report (redirects to a `getyourbrief.com` content-marketing page
  dated 2026-08-20, ~9 weeks old). Not re-logged.
- **FreshBooks/Wakefield Research solopreneur survey** ("86% of solopreneurs
  try AI first") — resurfaced via a fresh `intelligentsme.tech` republish
  (2026-10-13) in a pillar-3 search, but the underlying survey is already on
  file (`content-vault.md`, `research-notes.md`, and the 2026-09-23/-10-02/
  -10-12 reports). Not re-logged.
- **IBM CHRO study** ("AI Puts Critical Thinking at the Center of Workforce
  Priorities") — resurfaced in a pillar-2 search; already logged (RESEARCH
  threads per `research-notes.md`, and the 2026-10-14/-10-19 reports). Not
  re-logged.
- **Rikunabi / Recruit Holdings HBS case study** (algorithmic job-acceptance
  prediction scandal) — surfaced on a "first AI pilot, wrong problem" search;
  real case but not dated to this run's window and not a fresh primary source
  (the HBS case write-up has no 2026-10 publish date). Not logged.

---

## internal-research evidence (private — tooling/build subjects, not for public content)

**No new internal-research finding this run.** The one fresh-looking candidate
found (arXiv:2610.16067, "When Agent Evaluation Becomes Unreliable...") is
already logged in the 2026-10-18 report (confirmed via direct `grep`). Per
`research-policy.md`, a gap is logged as a gap rather than re-citing an
already-filed source as if new. The standing benchmark-integrity
(2026-10-14/-16/-18) and memory-reliability/agent-systems-engineering
(2026-10-19/-20) threads remain the most recent internal-research entries on
file; nothing distinct from either surfaced this run.

---

## Source health

- WebFetch: functional for anthropic.com/news, huggingface.co/blog,
  deepmind.google/discover/blog, a16z.com/tag/ai, lennysnewsletter.com/archive,
  arxiv.org (abs endpoint), cmr.berkeley.edu, launchready.ai.
- WebFetch: blocked (HTTP 403) on openai.com/news (now past 25 consecutive
  failed runs since RESEARCH 044 — standing recommendation to fix the fetch
  method or drop OpenAI Blog from the High-priority row in
  `skills/signal-harvester/inventory.md` remains open, unactioned) and
  news.berkeley.edu (the S1 paper's own university press release — worked
  around by fetching the arXiv abstract page directly instead, which gave a
  cleaner primary-source read anyway).
- All 6 `inventory.md` RSS/blog feeds were checked directly; none surfaced an
  audience-problem fit (Anthropic: Long-Term Benefit Trust/public-benefit
  fund/evaluator access/midterms/Singapore/Cyber Mission — governance and
  model-safety news; Hugging Face: model-release/infra posts; DeepMind: Gemini
  4 Argon model releases; a16z: infra/hardware/policy; Lenny's: no post within
  7 days, most recent Oct 13 is startup-moat strategy content). Same non-fit
  pattern as every run logged in `research-notes.md` since RESEARCH 050.
- WebSearch: functional throughout; no claim was cited from an unverified
  WebSearch paraphrase alone — both S1 and S2 were independently
  `WebFetch`-confirmed on their primary pages (arXiv abstract, Berkeley
  Economics Review article) before being logged, not taken from the WebSearch
  summary text.
- No Apify/Tavily MCP tools available in this session (confirmed via
  `ToolSearch`); no social (Twitter/Instagram/YouTube) scraping attempted —
  outside this skill's current mandate, consistent with prior runs.
- Engagement/virality numbers were not used as a selection criterion, per skill
  instruction "engagement is not truth." Both logged findings were selected on
  study design (S1: randomized controlled trial) and source authority/dated
  freshness (S2: named academic panel, published today), not share counts.
- Dedup this run checked two layers: (1) `grep -h "URL:" reports/signal-harvest-*.md`
  across all twelve prior dated reports, and (2) a direct `grep` of each
  candidate's source/author/study name against `content-vault.md` and
  `research-notes.md`. This caught three repeat candidates (FreshBooks, IBM
  CHRO, arXiv:2610.16067) that a URL-only grep on report files alone would have
  missed for the first two, because both were logged only inside
  `content-vault.md`/`research-notes.md`, not in a dated
  `signal-harvest-*.md` report.

## External actions taken

- No posts drafted. No queue action. No publish action. Research-only run.
- Files created: this report, and a new `research-notes.md` entry
  (RESEARCH 069).
- Files modified: `research-notes.md` (append-only). No Notion write access in
  this session — findings filed here with full source/date/excerpt provenance
  for manual hand-off to Notion Content Library or `content-engine`.
