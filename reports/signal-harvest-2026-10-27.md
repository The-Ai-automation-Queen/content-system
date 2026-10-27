# Signal Harvest — 2026-10-27

**Context loaded:** `context_version` shift-lead-2026-09-12 (`context/current-context.json`); content-system commit `7085b0bd`; `queen-brain` canon NOT loaded this session (confirmed by this session's own startup reality-check — "canon: queen-brain NOT in this session"). Not needed: this run is discovery-only and touches no price, tier, offer status or customer-facing copy, per `security.md` §3 and `AGENTS.md`'s non-negotiable operating rules.

**Audience problem worked (`context/positioning.md`):** experienced professionals and founders with useful knowledge and lived experience who feel overwhelmed by AI or struggle to turn that knowledge into visible, valuable work. Three starting points: (1) understand AI and know where to begin, (2) recognise and protect what's uniquely yours, (3) decide where AI belongs in a real business problem and choose a first test.

**Tool availability this run:** checked via `ToolSearch` before starting — no Tavily or Apify MCP tool registered this session; only `WebFetch`/`WebSearch` available, same constraint as every run since the social-scrape slots were dropped from the current harvest shape.

**Engagement note:** no like/view/follower/share counts were used as a signal of truth or priority below — only study design, source authority, disclosed methodology and recency were weighed, per `research-policy.md`.

---

## RSS/blog sweep (`skills/signal-harvester/inventory.md`)

| Source | Result |
|---|---|
| Anthropic News | Reachable. Most recent Oct 27 (today, drug-development acceleration post) through Sep 1 (Enterprise Frontier Safeguards) — S-1 IPO filing, Agent Skills donation, Life Sciences Verification Program, Claude Haiku/Sonnet/Opus 5.5 releases, Singapore MOU, Cyber Mission. All corporate/product/policy announcements — no pillar fit, same non-fit pattern as every run since RESEARCH 050. |
| OpenAI Blog | HTTP 403 — now past **31 consecutive failed runs** (044 through 075, spanning 2026-06 to today). Standing recommendation unchanged and still unactioned: fix the fetch method or drop OpenAI Blog from the High-priority row in `skills/signal-harvester/inventory.md`. |
| Hugging Face Blog | Reachable. All ML-engineering/model-release content (CLI/hub updates, NPU pretraining, world-simulation models, personal-agent context work, financial-services inference placement, retrieval/embedding models, robotics-in-simulation) — no pillar fit. |
| Google DeepMind | Reachable. All Gemini 4 Argon / Genie 4 / SynthID Bio model-release and research content, unchanged in kind since prior runs — no pillar fit. |
| a16z AI | Reachable but still no explicit publish dates exposed on the landing page (same structural limitation as every prior run) — four items marked "new" (Databricks/future-of-the-firm, Andreessen "chaos" essay, a16z Frontier, hardware-design piece), none with a disclosed study or dated primary data — no pillar fit. |
| Lenny's Newsletter | Reachable. Most recent dated post is "How to tell if a startup has a moat" (Oct 13) — 14 days old, outside the ≤7-day freshness window; no AI/automation post newer than that. No candidate this run. |

No RSS/blog source cleared the bar this run — consistent with the pattern since RESEARCH 050.

---

## One new shift-lead signal

### S1 (pillar 1, "understand AI and know where to begin")

**Pre-registered randomized controlled trial: 487 management consultants were given ChatGPT access and training to attempt data-science tasks outside their existing skill set. Treated workers scored higher than controls while using the tool — but post-experiment, with the tool removed, there was no evidence they answered technical questions any better than controls. Demonstrated capability while using AI did not translate into retained understanding.** Emma Wiles, Lisa Krayer, Mohamed Abbadi, Urvi Awasthi, Ryan Kennedy, Pamela Mishkin, Daniel Sack, François Candelon, "GenAI as an Exoskeleton: Experimental Evidence on Knowledge Workers Using GenAI on New Skills," published in *Nature Human Behaviour*, 2026-10-26 (yesterday). This is the sharpest available primary-source statement of this audience's pillar-1 problem to date: confident, improved output while using the tool sits on top of zero measured gain in actual understanding once the tool is taken away — the "exoskeleton" framing names exactly the gap between feeling capable and being capable. It is also a direct experimental complement to the already-logged MIT/NBER patent-drafting RCT (RESEARCH 051, Autor et al.) — same tradeoff (output gain vs. durable skill), different population (consultants vs. patent lawyers) and different task (data science vs. legal drafting), independently arriving at the same structural finding. Caveat on capture method: `nature.com` is paywalled and returned an authentication redirect on direct `WebFetch`; the N=487/RCT design, author list and finding were cross-confirmed via two independent `WebSearch` passes and the paper's own SSRN preprint listing (DOI 10.2139/ssrn.4944588, same author list) rather than a direct full-text fetch — flagging this as `WebSearch`-confirmed, not `WebFetch`-confirmed, per `research-policy.md`'s capture-status honesty requirement.

## One new internal-research signal

### I1 (internal-research only — not for public content)

**Proposes a "contestable governance" framework for AI agents operating on organizational data: specialist agents propose metadata decisions with scored supporting evidence, a human steward reviews with four structured options (accept/reject/modify/add-argument), and the full record of evidence and interventions is preserved — explicitly to prevent both silent error propagation from unreviewed agent proposals and "perfunctory approval" that leaves no record of what a human actually checked.** Humza Akhtar, Brian Freeman, "Contestable Agents for Data Governance: Recording Human Stewardship of AI-Generated Metadata Across Structured and Unstructured Systems," arXiv:2610.31553 (submitted 2026-10-22). Extends the standing agent-governance/assurance thread (Three-Pillar incremental-autonomy framework, RESEARCH 074 I1; Agent Reliability Profiles, RESEARCH 073 I1) with a concrete review-workflow mechanism — directly relevant to this repository's own human-in-the-loop checkpoints (e.g. the review-cockpit card/approval pattern), where the paper's "perfunctory approval leaves no record" failure mode is a real operating risk, not a hypothetical one. Caveat: 5 days old; internal-research only per `positioning.md` — agent-governance mechanics are a private operating subject unless Fatiha requests that exact topic. Directly `WebFetch`-confirmed on the arXiv abstract page.

---

## Rejected this run (named)

- **MIT/NBER patent-drafting RCT, Oct 7, 2026 PDF reissue (Autor, Rodchenko, Martin, Iscenko, Strand, Pearl, Ferere)** — surfaced again via `WebSearch`; confirmed via `grep` as already logged at RESEARCH 051 (2026-09-25, as NBER working paper w35720) and already named as "surfaced again" once before (RESEARCH 068's predecessor report, 2026-10-20). Not re-logged; used only as corroborating context for today's S1.
- **Adaptavist / Attest, "The Human Cost of Digital Transformation" (35% of 4,000 knowledge workers withholding knowledge, 38% reluctant to train colleagues)** — checked directly via `WebFetch` on Adaptavist's own press page: actual publish date is **2025-11-05**, almost a full year old, not the recent date implied by the Fast Company/Black Enterprise secondary write-ups that resurfaced it this week. Also vendor-commissioned self-report survey, not independent/scored. Rejected on age, same "too old to treat as fresh" category as the 2025-11 Adaptavist survey would be regardless of framing.
- **Li, Liao, Tsai, Wu, "From Synergy to Strain: Exploring the Psychological Mechanisms Linking Employee–AI Collaboration and Knowledge Hiding," *Behavioral Sciences*, 2025-12-20** — real peer-reviewed study (348 employees, three-wave time-lagged design, China), disclosed methodology, genuinely unlogged — but at 10+ months old it is well past this ledger's usual corroborating-anchor window, and unlike RESEARCH 074's AISA pick there was no pillar-balance drought to justify stretching the freshness bar this far for pillar 2 (pillar 2 has logged new signals in 069–074 continuously). Rejected on age.
- **BCG Institute, "When Everyone Uses AI, Companies Risk Critical Skills" (Oct 3, 2026, via Business Insider)** — checked via `WebFetch`: secondary write-up discloses no sample size, respondent count or survey design beyond "C-suite leaders and senior executives." Same "no disclosed methodology" rejection category as the already-rejected Enigmatica/Cornerstone pieces.
- **Al-Futtaim GCC AI confidence study (Oct 22, 2026)** — checked via `WebFetch`: disclosed sample (1,143 professionals, six GCC countries, March 2026 field date) and a genuinely relevant confidence-vs-training finding, but vendor-commissioned (Al-Futtaim, a regional conglomerate) and scoped to its own consumer-economy sectors (retail, automotive, hospitality) — a weaker, more commercially-interested fit than S1 for the same pillar-1 slot. Set aside in favor of Wiles et al.
- **Graphite, "AI Now Writes as Many Online Articles as Humans Do" (Common Crawl analysis, 55,400 articles, three-detector methodology)** — checked via `WebFetch` on Graphite's own page: disclosed methodology is strong, but actual publish date is **2026-05-15**, over five months old; search-engine summaries this week were recycling the same underlying tracker without a new data point. Rejected on age.
- **Pillar-3 sweep** ("founders start one AI experiment not overhaul," "how professionals choose first AI pilot business problem") — surfaced only blog/marketing content (nxcode.io, cipherprojects.com, solobuilder.ai, brandywebs.com, padron.sh, aiassemblylines.com, criticaltosuccess.com) repeating generic "start small, one workflow" advice with no named study, sample or methodology. Pillar 3 remains unfilled since RESEARCH 065 (2026-10-13) — today's dedicated sweep again found nothing to add.
- **Agent-governance sweep beyond I1** ("Praxa, an Evidence-Bound Harness," "Sapien: A Stateful Policy Engine," Three-Pillar framework) — Three-Pillar framework confirmed already logged (RESEARCH 074 I1) via `grep`; Praxa and Sapien surfaced only as search-result titles with no accessible abstract content fetched this run — not pursued further once I1 was already found and the internal-research slot filled.
- **thestreet.com** — not retried this run; no candidate depended on it.

---

## Source health this run

- Anthropic News, Hugging Face Blog, Google DeepMind, a16z AI, Lenny's Newsletter: all `WebFetch`-reachable; none surfaced an audience-problem fit, same non-fit pattern as every run since RESEARCH 050.
- OpenAI Blog: still HTTP 403 — now **31 consecutive failed runs**. Unactioned standing recommendation repeated above.
- `nature.com`: paywalled/authentication-redirected on direct `WebFetch` (new observation this run — not previously logged as a source-health item since this is the first time a Nature Human Behaviour article was pursued as a primary source). S1 above was confirmed via `WebSearch` cross-referencing instead; flagged honestly rather than claimed as `WebFetch`-confirmed.
- `papers.ssrn.com`: HTTP 403 on direct `WebFetch` (new observation this run).
- Dedup checked via `grep -rli` (name/author/study-title based, not just URL string matching) across all eighteen prior dated reports plus `research-notes.md` and `content-vault.md` — this is what caught the Autor et al. repeat and confirmed S1 and I1 were genuinely unlogged.

## Pillar balance note

Pillar 1 gets a second consecutive new signal (after RESEARCH 074's AISA report) — two runs in a row now, following the six-run pillar-2-only streak (069–073) that preceded it. Pillar 2 had no new qualifying signal today despite three candidates investigated in depth (patent RCT reissue, Adaptavist, Chinese knowledge-hiding study) — all rejected on dedup or age, not for lack of searching. Pillar 3 remains the standing open gap: last filled at RESEARCH 065 (2026-10-13); today's dedicated pillar-3 sweep again surfaced only unsourced marketing content, now six dated reports running (10-20 through today) with nothing to add there. Flagging pillar 3 for the operator as the one lane that has gone over two weeks without a single disclosed-methodology primary source.

## Historical-audience check

Confirmed nothing above was forced into the retired July corporate-escape framing, lead-magnet keyword system, comment-to-DM mechanic, or any other retired default named in `AGENTS.md`/`CURRENT-WORKFLOW.md`/`positioning.md`. No drafting, scheduling or publishing occurred — discovery only, consistent with `security.md`'s queue-only publishing rule (not implicated, since nothing was published or queued).
