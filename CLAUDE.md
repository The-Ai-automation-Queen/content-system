# Content System — Operating Manual

This repository is a **Business OS**: a content engine for Fatiha Chikh ("the AI
Automation Queen") that any Claude agent can pick up and run. It is structured
on the 8-step framework from Romain Brunel's *"I Automated My Entire Business
with Claude Code"* ([video](https://youtu.be/RCzvjTgH-Nw)), adapted to a
personal-brand content operation.

If you are an agent working in this repo, **read this file first.** It tells you
what exists, where it lives, and which skill to run for which job.

---

## The 8-step model, mapped to this repo

| # | Step (video) | What it means here | Where it lives |
|---|---|---|---|
| 0 | **Inventory** | What assets, channels, audiences, and tools exist | `inventory.md` |
| 1 | **Second Brain** | The single source of truth for content + research | `content-vault.md`, `research-notes.md` |
| 2 | **Architecture** | How the pieces fit and how an agent navigates them | this file (`CLAUDE.md`) |
| 3 | **AI Engine** | The reusable skills that do the work | `skills/`, `positioning/`, `inspiration-library/` |
| 4 | **API & Security** | Guardrails: secrets, data handling, brand/voice safety | `security.md` |
| 5 | **Incremental Build** | Build log + what to add next, one piece at a time | `ROADMAP.md` |
| 6 | **Hosting** | Where it runs and how it syncs | this file → *Hosting* below |
| 7 | **Deployment & Maintenance** | The recurring cadence that keeps it alive | `skills/weekly-ops/`, `reports/` |
| 8 | **Agentics** | The autonomous loop: research → draft → audit | `skills/weekly-ops/` orchestrates it |

---

## Second Brain (Step 1) — the source of truth

Everything the engine produces or reasons over lives in two files. Treat these as
the database. Never invent content that contradicts them.

- **`content-vault.md`** — every content entry. Newest entries are numbered
  `## ENTRY NNN` at the top, with a quick-reference list of the most recent
  pieces above the first entry. Each entry carries: date, platform, format,
  topic, **Status** (`DRAFT` → `READY TO POST` → `POSTED`), and a **Critic
  score**. The current highest entry is **ENTRY 019**; new drafts continue the
  sequence.
- **`research-notes.md`** — dated research findings (`## RESEARCH NNN`), each with
  topics searched, key findings, signals, ready-to-use content angles, and one
  logged contrarian take. Current highest is **RESEARCH 017**.

---

## AI Engine (Step 3) — the skills

Skills are reusable, version-controlled instructions. Two kinds live here:

**Context skills** (loaded *before* writing, never run standalone):
- **`positioning/SKILL.md`** — brand positioning, voice, audience, the
  confusion→confidence promise. The non-negotiable identity layer.
- **`inspiration-library/SKILL.md`** + `creators.csv` — 21 studied creators,
  15 named hook/format patterns, and the script application rules. Load this
  before writing any script, hook, or outline.

**Action skills** (in `skills/`, each a folder with a `SKILL.md`):
- **`content-engine`** — turns research + signals into ready-to-review drafts in
  the vault, in voice, scored by an internal critic. *The core new automation.*
- **`weekly-ops`** — the orchestrator. Runs the full maintenance loop (Step 7/8).
- **`research-digest`** — last-30-days research sweep → `reports/` + a
  `research-notes.md` entry.
- **`competitor-watch`** — creator/competitor movement scan → `reports/`.
- **`vault-audit`** — pipeline health check → `reports/`.

> The `positioning` and `inspiration-library` skills are the **brand brain**.
> Every word the engine produces must pass through them. If a draft drifts from
> the positioning, the draft is wrong — not the positioning.

---

## Agentics (Step 8) & Maintenance (Step 7) — the loop

The system stays alive through a recurring loop, not one-off prompts:

```
research-digest  →  competitor-watch  →  vault-audit  →  content-engine
   (what's new)      (what others do)     (what's stale)   (new drafts)
```

`skills/weekly-ops` runs this end to end and writes a dated set of reports to
`reports/`. To schedule it autonomously, use the harness `/loop` skill (e.g.
weekly), or run `weekly-ops` manually. See `ROADMAP.md` for cadence targets.

---

## Hosting (Step 6)

- **Runtime:** Claude Code (CLI, desktop, or web). No server, no build step —
  the "app" is this repo plus the skills, executed by an agent.
- **Storage:** the markdown files *are* the database. Git is the version history.
- **Source of truth:** local machine. This GitHub repo is the synced mirror that
  remote agents (like web sessions) work against.
- **Sync:** `sync-to-github.bat` copies the canonical local files into the repo
  and pushes `main`. Local files win on conflict. When a remote agent changes
  files here, those changes must be pulled back into the local copy before the
  next local sync, or they will be overwritten. See `ROADMAP.md` for the
  cross-platform sync note.

---

## Conventions for agents

1. **Dates are `DD/MM/YYYY`** in the vault, `YYYY-MM-DD` in research notes and
   report filenames. Match the file you are writing into.
2. **Never skip the brand brain.** Load `positioning` and `inspiration-library`
   before producing any public-facing words.
3. **Append, do not rewrite.** New vault/research items get the next number and
   go at the top. Do not renumber or delete history.
4. **Reports are immutable records.** One dated file per run in `reports/`;
   never overwrite a past report.
5. **Drafts are drafts.** The engine produces `DRAFT` / `READY TO POST` items
   for human approval. It does not publish, and (for now) does not call external
   posting tools — see `security.md`.
6. **Voice:** non-contracted English, short sentences, experiential authority,
   no corporate jargon. The banned-words list lives in `inspiration-library`.
