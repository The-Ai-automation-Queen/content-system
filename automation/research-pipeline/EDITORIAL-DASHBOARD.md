# Shift & Lead Editorial Control Board

Updated: 2026-08-11

This is the human-readable control surface for the research-to-content pipeline. Machine state remains in `queues/*.json` and `config/status-model.json`.

## Pipeline at a glance

`Research inbox -> triage -> clusters -> opportunities -> brief -> approval -> build branch -> draft PR -> human merge -> production QA`

## Ready for your decision

### 1. Turn saved research into content you can actually publish

- Opportunity: `research-to-content-workflow`
- Score: 92/100
- Category: Think & create better
- Public guide: **Turn saved research into content you can actually publish**
- Companion asset: **Research-to-Content Workflow Map**
- Paid bridge: AI Content Engine Quick Win — concept only, not live
- Brief: `automation/research-pipeline/briefs/research-to-content-workflow.md`
- Evidence: adequate if tool-specific claims remain examples rather than universal facts
- Recommended approval action: `approve_guide_and_lead_magnet`

### 2. Build an AI memory that remembers your business

- Opportunity: `business-brain-memory`
- Score: 90/100
- Category: Build the AI help you need
- Public guide: **Build an AI memory that remembers your business**
- Companion asset: **Business Brain Starter Canvas**
- Paid bridge: AI Business OS — concept only, not live
- Brief: `automation/research-pipeline/briefs/business-brain-memory.md`
- Evidence: adequate for evergreen principles; source-specific performance claims must not be repeated without verification
- Recommended approval action: `approve_guide_and_lead_magnet`

## Research more / hold

### Keep routine work moving while you are offline

- Opportunity: `always-on-assistant-update`
- Score: 72/100
- Existing guide update candidate: `/guides/24-7-operations-system.html`
- Blocker: current evidence is a single commentary source with incomplete implementation detail
- Current action: research more; do not build an evergreen implementation guide yet

### Catch AI mistakes with a separate reviewer

- Opportunity: `independent-ai-reviewer`
- Score: 77/100
- Existing guide update candidate: `/guides/what-is-agentic.html`
- Useful principle: separate the AI that creates from the AI that reviews
- Blocker: the Claude-specific multi-session mechanism is experimental/version-dependent
- Current action: social/existing-guide update after re-verification; do not anchor a new evergreen guide to the experimental feature

## Archived

### OpenWorker library

- Opportunity: `openworker-library`
- Score: 38/100
- Reason: technical, poorly documented and not useful enough for the non-technical reader

## Approved to build

None yet.

Approval is explicit. Add a record to `queues/approved.json` with:

```json
{
  "opportunity_id": "research-to-content-workflow",
  "action": "approve_guide_and_lead_magnet",
  "status": "approved_to_build",
  "approved_at": "YYYY-MM-DDTHH:MM:SSZ",
  "notes": "optional"
}
```

A high score or completed brief is **not** approval.

## Draft PRs

None yet.

## Production verified

No research-derived guide from this new harness has reached production yet.

## Status meanings

- `brief_ready_for_approval` — strategy/evidence/guide brief ready for a human decision
- `approved_to_build` — explicit permission to build on a research branch
- `building` — branch work in progress
- `pr_open` — draft PR exists
- `needs_decision` — evidence, product or brand decision required
- `pass_for_human_review` — QA passed; human should review/merge
- `merged_by_human` — merge happened; production verification pending
- `production_verified` — real custom-domain output passed QA
- `hold` / `research_more` / `archive` — do not build yet

## Safety rules

1. Research inbox is read-only.
2. Open guides stay open; email capture belongs to a contextual companion asset.
3. Research automation never merges its own content PR.
4. Weak or version-sensitive claims are omitted or re-verified before publication.
5. One form action equals one POST.
6. The paused AI Insider Brief is not the generic CTA.
7. No decorative hero image: visuals must teach.
