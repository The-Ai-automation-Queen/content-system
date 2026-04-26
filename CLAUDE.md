# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is **not a software project** — it is a content / knowledge management system for Fatiha Chikh, an AI Strategic Advisor (community brand: "AI Automation Queen"). The repo holds long-form markdown vaults, research notes, dated reports, and two `SKILL.md` files that drive content production.

**The repo is a mirror, not the source of truth.** The local Windows machine at `C:\Users\fatih\.claude\builds\content-system` is canonical. `sync-to-github.bat` copies five specific files in from sibling `.claude/builds/` and `.claude/skills/` directories, then commits and pushes to `main`. Do not assume edits made here will survive — they may be overwritten on the next local sync. If asked to make a content change, flag this and confirm whether the user wants the edit here, in the local source, or both.

## Repository Map

- `content-vault.md` — chronological log of every content piece. Each item is an `## ENTRY NNN — DD/MM/YYYY | <platform> | <title> | <STATUS>` block followed by the full script/post body, captions, and production notes. The header table at the top lists recent entries.
- `research-notes.md` — chronological research log. Each item is `## RESEARCH NNN — YYYY-MM-DD | <topics>` with key findings, signals worth acting on, and 3 ready-to-use content angles. Each note links to a long-form digest in `reports/`.
- `inspiration-library/SKILL.md` + `creators.csv` — encoded research from 20+ studied creators. Loaded as **context** before script-writing (see below). Not invoked directly.
- `positioning/SKILL.md` — interactive positioning workshop. Invoked as a standalone skill.
- `reports/` — dated long-form artifacts. Three recurring types, each with a strict naming convention:
  - `research-digest-YYYY-MM-DD.md` (weekly/biweekly)
  - `competitor-watch-YYYY-MM-DD.md`
  - `vault-audit-YYYY-MM-DD.md`
- `sync-to-github.bat` — Windows batch sync script. Documents the five files-of-record and where they originate locally.

There is no build system, no tests, no linter, no package manifest. There is nothing to install or run.

## Status Taxonomy (content-vault.md)

Every entry header ends with one of:

- `DRAFT` — in development, may be a stub (title only) or a near-complete piece
- `READY TO POST` — finalized, awaiting publication
- `POSTED` — published (in practice, **almost no entries are marked POSTED** — vault audits flag this as a tracking gap; do not invent publish dates to "fix" it)

When auditing the vault (the recurring `vault-audit-*` task), an entry is "stale" if it is `DRAFT` and older than 7 days from today's date.

## The Two Skills

Both skill files use YAML frontmatter (`name`, `version`, `description`, `argument-hint`, `allowed-tools`). They behave differently:

- **`inspiration-library/`** — `argument-hint` explicitly says *"loaded as context by other skills, not invoked directly"*. When writing any script, hook, video outline, or caption, read this file first and apply a named pattern from it (Pattern 1–15 + creator-specific signatures). Do not default to generic structures.
- **`positioning/`** — interactive workshop. Runs the 5-step sequence (anchor → differentiator → audience → headline test → outputs) conversationally, one question at a time. Do not dump all questions at once.

## Voice and Brand Rules (non-obvious, enforced)

These are content-production constraints, not stylistic suggestions. They appear across multiple files and must be respected when generating any content:

1. **Non-contracted English.** No "don't", "won't", "can't", "I'm", "you're". Spell them out. This is the user's voice signature.
2. **Two brands, never blended in one piece of content:**
   - **AI Strategic Advisor** (personal brand) — LinkedIn, CEO/mid-market audience, capability-building, governance, data sovereignty.
   - **AI Automation Queen** (community brand) — Instagram, women's productivity / reclaiming time, automation how-to.
   - Bridge topic that works for both: AI safety and ethics (deepfakes, surveillance, brain rot, artificial intimacy).
   - A CEO does not want to hear about reclaiming time for family. A woman automating her business does not need a governance framework. Pick a lane per script.
3. **Hook-first, no warm-up.** First sentence is the provocation, fear, or specific number. No "hey guys", no context-setting, no title restatement.
4. **Banned phrasing:** "leverage", "ecosystem", "digital transformation", "AI journey", "scalable solutions", "thought leader", "passionate about", "helping businesses thrive", engagement bait ("like if you agree", "tag someone").
5. **CTA mechanic:** prefer comment-triggers ("Comment X and I will send you Y") over bio-link CTAs.

## Workflow Patterns

The repo has three recurring deliverables, each with an established format — match the existing examples when producing a new one:

- **Research digest** — top 5 stories with sources + 3 content angles + a contrarian take. Mirror `reports/research-digest-2026-04-24.md`.
- **Vault audit** — status totals, stale-draft list, per-platform coverage gap, prioritized next actions. Mirror `reports/vault-audit-2026-04-26.md`.
- **Competitor watch** — see existing `reports/competitor-watch-*.md` for shape.

Dates in report filenames and headers are `YYYY-MM-DD`. Dates inside `content-vault.md` entry headers are `DD/MM/YYYY`. Do not normalize one to the other — both conventions are intentional.

## Git and Branching

- Remote `origin` is restricted to `the-ai-automation-queen/content-system` (GitHub MCP scope).
- Default branch on remote is `main`. The local sync script pushes to `main`.
- For Claude-driven changes in this environment, develop on the assigned feature branch (currently `claude/add-claude-documentation-9z79n`) and push there — never directly to `main` without explicit permission.
- Commits historically follow a content-led style: `Add vault audit report for 2026-04-26`, `Add research digest 2026-04-24: <topic list>`. The local batch script uses `sync: <date> <time>` for bulk syncs. Match the content-led style for hand-authored commits.
