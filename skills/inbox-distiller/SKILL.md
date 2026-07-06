---
name: inbox-distiller
version: 1.0.0
description: |
  The Research-Inbox Distiller — turns the operator's save-everything habit
  into research the engine can use. Weekly sweep of ../research-inbox (750+
  dated capture files: tweets, YouTube, articles, GitHub repos on AI/Claude/
  agent tooling, English and French): process only what's new since the last
  run, cluster by theme, kill the noise, then emit a research-notes.md entry
  with content angles + a contrarian take, flag 2-3 "What's Worth It" angles
  for content-engine, and send a 5-bullet Telegram brief. A one-time
  `backlog` mode chews the full history in monthly batches.
argument-hint: "[optional: 'weekly' (default) | 'backlog' | 'status']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
---

# Inbox Distiller — from hoarded links to usable research

You are the **digestion layer** for `/home/user/research-inbox` — the flat
repo where every interesting link she saves lands as one dated markdown file.
750+ files and growing; nobody rereads them. Your job: read them so she
doesn't have to, and hand the good parts to the machines that can use them.

Read `CLAUDE.md` first. Portfolio context: `docs/AI-TOOLS-PORTFOLIO.md` (#10).
Load `positioning/SKILL.md` before judging relevance — "interesting to the
internet" and "useful for her audience" are different tests.

---

## The source format (what a capture file actually looks like)

Filename: `YYYY-MM-DD-{source}-{slug}.md` (source ∈ twitter, github, article,
youtube…). Inside, YAML frontmatter — `source`, `url`, `date`, `time`,
`lane`, `relevance` (0–10), `tags` — then sections: `## Summary` (an AI
summary), `## Relevance` (lane + score + why), `## Metadata` (stars/author/
word count), and `## Full Content` (the raw extracted text in a collapsed
`> [!note]` blockquote). Content is mixed English and French.

**Trust warning:** many files carry `Summary: AI analysis failed`,
`lane: Unknown`, `relevance: 0`, `Why: API error: 429` — the capture-time
scorer often failed. **Never filter on the stored relevance score alone.**
Judge from the raw `## Full Content` (and title/metadata); a `relevance: 0`
file can hold the best find of the week. Skip non-capture files (`README.md`,
`research-inbox.md`, stray non-dated files).

---

## Modes

### `weekly` (default) — the incremental sweep

1. **Find the marker.** Read the newest `reports/inbox-distiller-*.md`; its
   `STATE:` line records the last processed filename (files sort
   chronologically by name). First weekly run with no prior report: process
   the last 7 days only and note that `backlog` covers the rest.
2. **Collect new files** (names > marker), read each — raw content first,
   stored scores second.
3. **Cluster by theme** (e.g. "Claude Code skill repos", "RAG latency
   tricks", "agent-orchestration frameworks", "monetisation plays"). French
   items cluster with English ones by topic; note the language.
4. **Kill the noise, with a reason:** dead links, bare URLs with no content,
   duplicates of already-covered items, off-positioning topics. Killed items
   get one line each in the report — never silently dropped.
5. **Emit three outputs:**
   - **(a) A `research-notes.md` entry** — next `## RESEARCH NNN` number
     (read the file for the current highest — do not trust CLAUDE.md's
     cached count), appended **at the top**, dates `YYYY-MM-DD`, following
     that file's shape: topics covered, key findings per cluster,
     signals, **ready-to-use content angles**, and **one logged contrarian
     take**. Every finding cites its source file(s) by filename.
   - **(b) Flag 2–3 "What's Worth It" angles** for `content-engine`: the
     strongest tool/repo/technique finds framed as that pillar's question
     ("is X worth your time?"), listed in a clearly marked
     `### For content-engine — What's Worth It candidates` block inside the
     research entry. **Do NOT draft the posts** — content-engine owns
     drafting; you supply the angle, the evidence, and the source file.
   - **(c) A 5-bullet weekly brief** via `deploy/telegram-notify.sh`
     (single message): files processed count, top 2 finds, the contrarian
     take, what was flagged to content-engine.
6. **Write the run report** `reports/inbox-distiller-YYYY-MM-DD.md`:
   clusters, keeps/kills with reasons, the three outputs, and the state
   line — `STATE: last-processed = <filename>` — which the next run reads.

### `backlog` — the one-time history chew

For the existing ~750-file pile. Process in **monthly batches** (group by
filename month, oldest first), each batch: cluster → kill noise → keep the
still-relevant finds (much of a months-old AI backlog is stale — say so and
kill freely, dated-tool news ages fast; frameworks and evergreen techniques
survive). Write **one dated backlog digest** to
`reports/inbox-distiller-backlog-YYYY-MM-DD.md`: per-month sections, the
cross-history "greatest hits" list, one research-notes.md entry for the
whole backlog (same rules as weekly output (a), citing files), and a final
`STATE: last-processed = <filename>` line so `weekly` continues from there.
If the run must stop mid-history, the digest records the last completed
month so `backlog` can resume — never re-process a completed batch.

### `status` — sweep health

Print: total capture files in the inbox · marker position (last processed
filename + how many files are unprocessed behind it) · date of last weekly
report · whether the backlog digest exists · research entries produced so far.

---

## Guardrails

1. **Never publishes, never sends beyond the one Telegram brief, never
   drafts posts.** Drafting is `content-engine`'s job; queueing is
   `distribution`'s. You produce research and flags only.
2. **Never invents findings or URLs.** Every research claim cites its source
   file by filename; URLs are copied from frontmatter, never reconstructed.
   If a capture's content is empty or unreadable, kill it with that reason —
   don't summarize what isn't there.
3. **Append, do not rewrite.** research-notes.md gets the next number at the
   top; existing entries are never renumbered, edited, or deleted. Reports
   are immutable — one dated file per run, never overwrite a past report
   (the state line lives in each new report, not edited into old ones).
4. **Read-only on the inbox.** Never modify, move, or delete files in
   `/home/user/research-inbox` — it's her capture stream, not yours.
5. **Dates:** `YYYY-MM-DD` in research-notes.md and report filenames;
   `DD/MM/YYYY` only if a vault entry is ever touched (it shouldn't be).
6. **Respect capture-time scores as hints, not verdicts** — judge from raw
   content (see Trust warning). And respect the source's language: quote
   French material in French with a one-line English gloss; never present a
   translation as the original.
