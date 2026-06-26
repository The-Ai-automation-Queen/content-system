# M01 — Signal Harvest + Script Generation

## Purpose
Two-stage machine: (1) harvest fresh signals from the live web, (2) turn them
into ready-to-review scripts in the operator's voice.

## When it runs
- **Signal harvest:** daily at 02:00 (VPS cron)
- **Script generation:** daily at 02:30 (after signals land)
- **Full weekly loop:** Monday 06:00 runs both via `weekly-ops`

## Stage 1: Signal Harvest (`signal-harvester`)

### Inputs
- Apify MCP (Instagram, X/Twitter scrapers)
- Tavily MCP (web + news search)
- YouTube (Apify or Tavily)
- RSS feeds (WebFetch on blog URLs in `inventory.md`)

### Outputs
- `research-notes.md` entry (RESEARCH NNN) with 7 signals
- Source mix: 2 Twitter, 2 Instagram, 1 YouTube, 1 RSS, 1 News
- ≥2 must be lead-magnet shaped

### Validation criteria
1. Exactly 7 signals, distributed per the source-mix rule
2. ≥2 flagged as lead-magnet shaped
3. All URLs are real (not hallucinated)
4. Contrarian take is specific and ownable
5. Content angles map to real pillars

## Stage 2: Script Generation (`content-engine`)

### Inputs
- `personal-brain.md` (the living memory — makes posts personal)
- `positioning/SKILL.md` (voice, pillars, audience)
- `inspiration-library/SKILL.md` (hook patterns, format rules)
- `research-notes.md` (latest signals and angles)
- `content-vault.md` (existing entries, gaps)

### Outputs
- 5 new vault entries per day:
  - 1 storytelling (from personal-brain anecdotes)
  - 2 AI news (from signal-harvester)
  - 1 opinion (from personal-brain opinions + research)
  - 1 educational (from pillars)
- Each entry critic-scored, status DRAFT or READY TO POST

### Validation criteria
1. Hook stops the scroll (Critic hook score ≥8)
2. Voice matches positioning (casual, warm, provocative edge)
3. Storytelling posts reference real personal-brain entries
4. News posts cite real, dated sources
5. Every post maps to exactly one pillar
6. CTA is earned and specific (not "follow for more")
7. Overall Critic score ≥6 (≥8 for READY TO POST)

### Decision framework for AI delegation
An AI validator should:
- Reject any post that scores <6 on any single criterion
- Flag posts that reference personal-brain entries older than 30 days
- Prefer posts that use underrepresented pillars (check vault-audit)
- Never approve a post with an unverified factual claim
