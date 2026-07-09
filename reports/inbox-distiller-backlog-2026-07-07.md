# Inbox Distiller — Backlog Digest — 2026-07-07

**Mode:** `backlog` (first-ever run — the inbox has never been swept before).
**Scope:** all 758 capture files in `/home/user/research-inbox`, 2026-04-09
through 2026-07-06.
**Method note:** processed in 10 chronological batches of ~76 files each
(index-based, not strict calendar months — the file count per month is
uneven: 310 in April, 224 in May, 193 in June, 31 in July so far). Every
batch boundary is listed below so nothing is double-counted or skipped;
batches overlap month boundaries in a couple of places, called out inline.

---

## Batch-by-batch (clusters kept / items killed)

| # | Range | Clusters kept | Killed |
|---|---|---|---|
| 1 | `2026-04-09-github-anthropicsclaude-code.md` → `2026-04-13-article-title-creative-strategy-engine-by-alyshafrommotion.md` | 7 | 36 |
| 2 | `2026-04-13-article-title-creative-strategy-skills-by-motion.md` → `2026-04-13-twitter-hooeem-httpstcokw3rqbdbjt.md` | 8 | 42 |
| 3 | `2026-04-13-twitter-ihtesham2005-...md` → `2026-04-17-article-instagram.md` | 4 | 41 |
| 4 | `2026-04-17-article-title-comment-rduire-ta-consommation-de-tokens...md` → `2026-04-29-article-title-notion-where-teams-and-agents-work-together.md` | 10 | 27 |
| 5 | `2026-04-29-github-mattpocockskills.md` → `2026-05-11-article-instagram.md` (crosses Apr/May) | 6 | 41 |
| 6 | `2026-05-11-article-title-notion-where-teams-and-agents-work-together.md` → `2026-05-21-twitter-historyshorts24-...md` | 8 | 30 |
| 7 | `2026-05-21-youtube-go-high-level-is-dead...md` → `2026-05-31-github-virgiliojr94book-to-skill.md` | 11 | 30 |
| 8 | `2026-05-31-twitter-damidefi-...md` → `2026-06-10-twitter-thinkingslow-...md` (crosses May/Jun) | 6 | 25 |
| 9 | `2026-06-10-twitter-thisguyknowsai-...md` → `2026-06-23-article-title-ai-twin-prompt-engine...md` | 6 | 27 |
| 10 | `2026-06-23-article-title-le-stack-dun-solo-founder...md` → `2026-07-06-gdocs-vocable-high-impact-campaign-prompts.md` | 6 | 34 |

**Totals: 10 batches, 0 failed, ~333 items killed** (dead links, empty
captures, duplicates, off-positioning noise — mostly dated tool-news that
aged out). The rest cluster into the 10 master topics below.

---

## Master pattern map (merged across all 10 batches)

| Topic | Count | Trend (Apr→Jul) |
|---|---|---|
| Claude Code / agent-skills ecosystem, meta-tooling & governance patterns | 136 | rising |
| Creator monetisation case studies & offer-ladder pricing intelligence | 90 | rising |
| AI avatar, faceless-video & visual-production tooling | 83 | rising |
| Personal-brand strategy & LinkedIn/content-funnel playbooks | 45 | steady |
| French-market AI-education & creator competitor intel | 35 | steady |
| Second-brain / personal-memory architecture (comparative validation) | 28 | steady |
| AI-agent security, supply-chain risk & skill-safety awareness | 15 | steady |
| "AI agent runs your whole business" hype vs. real-cost skepticism | 10 | rising |
| Direct "packaged Business OS" competitors | 9 | rising |
| MCP (Model Context Protocol) | 6 | rising |

**What this says about the saving habit:** the inbox skews heavily toward
build material (skills, agent governance, avatar/visual tooling — 219 of
roughly 425 kept items) and monetisation proof-of-concept (90 items), with
personal-brand/content-funnel material a distant third. The six content
pillars are fed unevenly — Time Wins and Build Once Runs Forever get the
most raw material; Real Talk gets the least (see pillar mapping below).

---

## Greatest hits (15 best finds, evergreen preferred over dated)

1. **`2026-04-12-youtube-i-built-an-instagram-carousel-generator-with-claude-code.md`** — a full working Claude Code pipeline: research → Tavily image search with local-screenshot fallback → slide-layout rules → GIF-to-MP4 for IG's video minimum. Near-identical to what `visual-engine` is meant to build — a concrete blueprint to benchmark or adapt directly.
2. **`2026-04-13-article-i-built-a-claude-skill-that-audits-your-linkedin-for-you-it-does-in-2-minutes-wh.md`** — Chris Donnelly's viral post: a Claude Skill that audits a LinkedIn profile in 2 minutes, "what a brand strategist charges thousands for." Proof at real scale that "Claude Skill as free lead magnet" converts.
3. **`2026-04-12-github-thoughtbottopsecret.md`** — an open-source NER-based PII redactor for text before it reaches an external LLM. A concrete, citable reference implementation of queen-brain's redaction-in-every-prompt law.
4. **`2026-04-16-article-instagram.md`** — Dr Nici Sweaney, a directly comparable AI-automation creator/keynote speaker, runs her business on 10 Claude skills and gates the library behind a "Comment LEVELUP" DM funnel. A live peer validating `dm-responder`'s comment-keyword mechanic.
5. **`2026-04-13-article-title-homegrown-uae.md`** — Homegrown UAE, a 2,582+ business directory explicitly credited "Designed by The AI Automation Queen @fati_chic_." Verifiable, non-invented proof-of-work for Real Talk / Build Once Runs Forever content.
6. **`2026-04-13-github-garrytangstack.md`** — Garry Tan's `gstack`: 23 subagent tools playing CEO, Designer, Eng Manager, Release Manager, Doc Engineer, QA. A high-profile blueprint for expanding `skills/` with role-shaped subagents.
7. **`2026-04-29-article-title-notion-where-teams-and-agents-work-together.md`** — "AI Executive Board": 7 frontier models review a draft independently, a chairman model synthesizes disagreements, ~$0.30 per 34 seconds. A cheap upgrade path for `content-engine`'s single-model critic.
8. **`2026-05-08-article-title-structurer-ton-projet-ia-le-guide-universel-peu-importe-loutil.md`** — a universal 3-pillar AI-project governance guide (constitution / project memory / agent contracts) plus a reusable master prompt. Near-identical in shape to this repo's own CLAUDE.md/Second Brain model — external validation and a repackageable teaching piece.
9. **`2026-05-08-article-title-inside-the-ai-second-brain.md`** — a 5-layer AI second-brain system the author credits with running their company on under 2 hours a day. A near-verbatim proof point for the "win back your time" promise.
10. **`2026-05-08-article-title-agent-auditeur-la-4e-couche-de-gouvernance-template-4-champs.md`** — a 4-field template (ROLE/INPUT/VERDICT/ESCALATION) for one agent judging another's output. Directly usable to formalize `content-engine`'s critic and the dormant `taste-clone` gate.
11. **`2026-05-24-article-the-malware-finder-free-claude-skill-that-audits-every-skill-before-you-install.md`** — a free Claude skill auditing other skills for hidden instructions/data-exfiltration/code-execution risk, citing 36% of public-marketplace skills have flaws. Genuinely relevant now that the estate runs 20+ skills.
12. **`2026-05-30-article-title-custom-dashboard-walkthrough.md`** — a Claude Code + Node.js + Meta Developer App private IG/TikTok analytics dashboard walkthrough. Three separate captures converge on this exact build — worth folding into `performance-tracker`.
13. **`2026-06-23-article-title-le-stack-dun-solo-founder-21-skills-mcp-et-outils-branchs-sur-claude.md`** — a solo founder's public breakdown of a 21-skill/MCP Claude stack replacing his freelancers, with a lead-magnet CTA. Mirrors her own Business OS pitch and doubles as a content-angle template that is itself a sales funnel.
14. **`2026-06-23-gdocs-ai-avatar-character-sheet-prompt-paste-this-prompt-your-own-photos-or-your-exist.md`** — a reusable prompt generating a 6-view AI character-consistency sheet from real reference photos, captured twice two weeks apart. The missing pre-step for identity-consistent avatar generation that `heygen` needs.
15. **`2026-07-02-article-title-skilltree-build-a-complete-ai-workforce.md`** — SkillTree, a $49/mo platform selling "137 AI agents across 7 departments" — structurally identical language to queen-brain's own framing. Direct-competitor intel, not a build lead.

---

## Content pillar mapping

| Pillar | Fed by | Sample ready-to-use angle |
|---|---|---|
| Time Wins | quick Claude Skill demos, voice dictation, spreadsheet automation, 1-minute lead magnets, 2-minute decks | "A free Claude Skill replaced a $1,000s brand-strategist audit in 2 minutes" |
| Build Once, Runs Forever | carousel/visual-engine architecture, cron-driven second brain, 21-skill business stack | "My second brain updates itself every Sunday at 3am while I sleep" |
| The Freedom Business | ambient/zero-employee narratives, portfolio-over-one-startup, done-for-you ladders | "One person, five products, $1M/month — why a portfolio beats one big startup" |
| Stop Doing That by Hand | agency-replacement threads, manual LinkedIn/IG audits | "Most small businesses pay $5-10K/month for an agency — one Claude Code session replaces the whole stack" |
| What's Worth It | tool-hype skepticism, AI supply-chain security, faceless-avatar course pitches | "Your whole business for $8/month? Here's what that pitch actually leaves out" |
| Real Talk | corporate-to-entrepreneur bridge stories, confidence-blocker case studies | "The woman who made $20M for other people's launches and is terrified to show her own face" |

**Gap flagged:** Real Talk is the thinnest-fed pillar in the whole backlog —
only two strong candidates surfaced across 758 files. Worth a deliberate
save-more-of-this note, not a build fix.

---

## Unused build opportunities (what the inbox suggests, honestly checked against the existing estate)

1. **Pre-install skill security auditor.** `estate-janitor` does weekly hygiene (duplicates/drift/stale branches) but never audits new skill code for security risk before merge, and `security.md` states guardrails as prose only, no automated gate. Evidence: `2026-05-24-article-the-malware-finder-free-claude-skill-that-audits-every-skill-before-you-install.md`, `2026-05-13-article-title-5-cyber-safe-claude-skills---free-guide-by-aishelest.md`. First step: add a "skill review" checklist to `estate-janitor`'s scan, baseline it against every existing skill, then require it on new additions.
2. **Multi-model critic cross-check.** `content-engine`'s critic and the dormant `taste-clone` gate both rely on one model's judgment; nothing in the pipeline does cross-model consensus. Evidence: `2026-04-29-article-title-notion-where-teams-and-agents-work-together.md`, `2026-05-08-article-title-agent-auditeur-la-4e-couche-de-gouvernance-template-4-champs.md`. First step: prototype a 3-model parallel pass on one week's drafts and check if disagreement correlates with low review-cockpit scores before building further.
3. **SEO/GEO discoverability skill.** No skill in the CLAUDE.md roster or the 14-tool portfolio owns "can people find this page at all" for her site or lead-magnet pages. Evidence: `2026-07-04-github-aminforoumcp-gsc.md`, `2026-04-17-article-title-the-ai-seo-playbook-3-files-to-page-one-of-google.md`. First step: connect `mcp-gsc` to one existing lead-magnet page, pull baseline impressions/clicks, decide if it earns a standing skill or a one-off `vault-audit` check.
4. **"System as an installable skill" delivery format.** `business-os-kit` packages the Starter Kit as PDF/course only; several inbox items show buyers respond to "install the system itself." Evidence: `2026-05-31-github-virgiliojr94book-to-skill.md`, `2026-06-16-article-about-me-my-name.md`. First step: run the book-to-skill pattern against one already-written Fast Forward module as a test conversion.
5. **Auto-caption/motion-graphics layer for shorts.** `reels-factory` uses Opus Clip/Blotato for cuts but neither does word-by-word captioning or motion-graphic overlays. Evidence: `2026-06-11-article-title-claude-can-now-edit-your-videos.md`, `2026-06-05-article-title-claude-video-editor-comment-jai-remplac-mon-logiciel-de-montage-300an-par.md`. First step: trial the Remotion/HyperFrames approach on one already-recorded piece of footage and compare against the current Opus Clip path.

*(Note: second-brain/PKM architecture — Obsidian, Notion, NotebookLM, Claude-Mem
— was the other candidate cluster but is deliberately **not** listed as a
build opportunity: it validates the existing content-vault/research-notes/
personal-brain design rather than suggesting a new one, and per the
contrarian take below, it isn't a "win back your time" fit for her audience
anyway.)*

---

## Contrarian take (logged)

The backlog contains its own rebuttal to the "run your whole business for
$8/month" genre of hype (Hermes Agent, "AI employee from scratch," "full
AI-powered YouTube channel in 90 days"). Every time a real dollar figure
shows up in the same inbox, it contradicts the free/cheap pitch: Higgsfield
+ Claude replacing a "$10k/month agency" still takes real prompt engineering
and ~3 hours of skilled work per campaign (`2026-06-04-gdocs-how-higgsfield-claude.md`);
CAM charges $500/month for done-for-you avatar content
(`2026-05-17-article-title-cam-your-face-your-voice-posted-across-5-platforms-on-autopilot.md`);
Content Lab charges $3,500+$998/mo and is "sold out"
(`2026-05-24-gdocs-content-lab-case-study-group.md`); someone sold their own
DM-agent architecture for €7,000
(`2026-06-20-article-title-le-systme-agentique-derrire-mon-agent-dm-instagram-celui-que-jai-vendu-700.md`);
and CEOs are quietly discovering agent token costs now exceed the salaries
of the humans they replaced, with agents simply halting when the budget
runs out (`2026-05-29-twitter-escanorreloaded-ceos-are-quietly-realizing-the-ai-replacement-plan-has-a-problem.md`).

**Logged take:** "Free-agent-runs-your-business" claims are lead-gen copy,
not operating reality — every verified case study in this same backlog
shows real infrastructure cost, skilled setup time, and ongoing maintenance.
The gap between the $8/month pitch and the $500-$10,000/month reality is
itself a Real Talk / What's Worth It content angle.

---

## For content-engine — What's Worth It candidates

1. **Is the "$8/month runs your whole business" genre (Hermes Agent etc.) worth your time?** Evidence: repeated hype claims sit against hard-cost case studies (Higgsfield ~3hrs/campaign, CAM $500/mo, CEOs finding token costs exceed replaced salaries). Sources: `2026-06-10-twitter-ibuzovskyi-hermes-agent-now-runs-a-full-business-for-8month-content-code-inbox-a.md`, `2026-06-04-gdocs-how-higgsfield-claude.md`, `2026-05-17-article-title-cam-your-face-your-voice-posted-across-5-platforms-on-autopilot.md`, `2026-05-29-twitter-escanorreloaded-ceos-are-quietly-realizing-the-ai-replacement-plan-has-a-problem.md`.
2. **Is building a multi-model "AI Executive Board" critic worth the engineering time over the current single-model critic?** Evidence: cheap in isolation (~$0.30/34s across 7 models), formalizable via the agent-auditor 4-field template, but adds real pipeline complexity on top of the already-planned taste-clone gate. Sources: `2026-04-29-article-title-notion-where-teams-and-agents-work-together.md`, `2026-05-08-article-title-agent-auditeur-la-4e-couche-de-gouvernance-template-4-champs.md`.
3. **Are the faceless-AI-avatar "build a whole AI influencer channel" courses worth engaging with at all, given the brand is built on her real face and voice?** Evidence: multiple courses (AvatarPrime, AI Creator Course, AI Video Bootcamp) sell the exact opposite of her positioning. Sources: `2026-06-28-article-title-opt-in-avatarprime.md`, `2026-06-24-article-title-create-and-earn-with-ai.md`, `2026-07-04-article-title-ai-video-bootcamp.md`.

*(Angles only — content-engine owns drafting.)*

---

## Telegram brief (5 bullets)

1. Processed all 758 saved links (Apr 9 – Jul 6); ~333 killed as empty captures, duplicates, or off-positioning noise, leaving a strong core of reusable finds across 10 chronological batches.
2. Top find #1: the Instagram carousel generator built entirely in Claude Code (2026-04-12) — the closest thing to a direct build spec in the whole backlog, for visual-engine.
3. Top find #2: SkillTree, a $49/mo competitor platform selling "137 AI agents across 7 departments" (2026-07-02) — the exact framing of queen-brain's own estate, worth knowing exists.
4. Contrarian take logged: the "$8/month AI runs your whole business" hype is contradicted by every real-dollar case study in the same inbox (CAM $500/mo, Content Lab $3,500+$998/mo, a €7,000 DM-agent sale) — a ready What's Worth It / Real Talk angle.
5. Flagged to content-engine: 3 What's Worth It candidates plus 6 pillar-mapped angles spanning Time Wins through Real Talk.

*(Send via `deploy/telegram-notify.sh` when Telegram is wired up in this
environment — not sent from this session.)*

---

STATE: last-processed = 2026-07-06-gdocs-vocable-high-impact-campaign-prompts.md
