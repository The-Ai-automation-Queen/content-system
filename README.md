# Content System

A **Business OS** for Fatiha Chikh's content operation — a Claude-Code-run engine
structured on the 8-step framework from
[*"I Automated My Entire Business with Claude Code"*](https://youtu.be/RCzvjTgH-Nw).

> **Agents start here:** read [`CLAUDE.md`](CLAUDE.md) — it is the operating
> manual (what exists, where it lives, which skill to run).

## Structure

| File / folder | Step | Purpose |
|---|---|---|
| `CLAUDE.md` | 2 | Operating manual / architecture — **read first** |
| `inventory.md` | 0 | Asset map: brand, audience, channels, tools |
| `content-vault.md` | 1 | All content entries (draft → ready → posted) |
| `research-notes.md` | 1 | Research findings from last-30-days sweeps |
| `positioning/` | 3 | Brand positioning and voice (the brand brain) |
| `inspiration-library/` | 3 | Creator patterns, hooks, script rules |
| `skills/` | 3,7,8 | Action skills — see below |
| `security.md` | 4 | Secrets, data, and brand guardrails |
| `ROADMAP.md` | 5 | Build log, maintenance cadence, backlog |
| `reports/` | 8 | Dated outputs of the agentic loop |

## Skills (`skills/`)

- **`content-engine`** — research/signals → in-voice drafts in the vault (core automation)
- **`weekly-ops`** — orchestrates the full maintenance loop
- **`research-digest`** — last-30-days research sweep → report + research note
- **`competitor-watch`** — creator/competitor movement scan → report
- **`vault-audit`** — pipeline health check → report

## The agentic loop (Steps 7–8)

```
research-digest → competitor-watch → vault-audit → content-engine
```

Run `weekly-ops` to execute it end to end (schedule it with the `/loop` skill).

## Sync

**GitHub `main` is the source of truth** (since 2026-07-08). The VPS pulls
before every autonomous run and pushes its output back to `main`. Any other
copy (operator's local machine, web/agent sessions) is a normal git client:
`git pull origin main` before editing, push or PR when done.

`sync-to-github.bat` (the old "local wins" one-way sync) was retired and
deleted from the repo on 14/07/2026. If a copy still exists on the operator's
Windows machine, do not run it; it would overwrite the machine's autonomous
commits. Delete any local copy too.
