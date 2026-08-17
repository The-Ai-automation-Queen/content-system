---
name: podcast-guesting-orchestrator
description: The conductor for the podcast-guesting pipeline. Chains discovery, RSS scraping, prefilter, fit research, pitch building, and the pipeline writer in sequence, then builds a review digest. Holds no business logic itself. Use when the user wants to find podcasts to be a guest on, says "run the podcast pipeline", "find shows to pitch me on", or "podcast guesting".
---

# Podcast Guesting Orchestrator

The conductor. It only sequences the worker skills. It contains zero business
logic, zero scoring, zero copy. All judgment lives in the workers and the
context files. If you find yourself making a tiering or pitch decision here,
stop. That belongs in `podcast-pitch-builder`.

## Hard rule (top of mind, every run)

This pipeline NEVER sends a pitch. It produces a reviewed shortlist with
drafted pitches and a digest. Fatiha reads it and sends by hand. There is no
auto-send step anywhere. Do not add one.

## Paths

- Context files: `departments/product/3-build/podcast-guesting/context/`
- Output substrate: `departments/product/3-build/podcast-guesting/speaking-pipeline.md`
- State sidecar (auto): `...speaking-pipeline.data.json`

## The spine is now ONE command

Steps 1 to 3 (discovery, RSS, merge, prefilter) are collapsed into a single
deterministic call. No manual six-step run:

```
py "C:\Users\fatih\.claude\skills\podcast-guesting-orchestrator\scripts\run_chain.py" --mode topic --value "<phrase>" --limit 15
```

It writes `_run/research_queue.json` (survivors needing judgment) and
`_run/run_meta.json` (counts + dropped reasons). Then only the two judgment
steps and the write remain.

## Two run modes (the source post's "two jobs")

### Mode A — discover-fresh
Input: a seed. Either a topic phrase, or a peer name for reverse lookup.

1. **run_chain.py** with `--mode topic --value "<phrase>"`, or for
   peer-reverse first web-search which shows the peer guested on, then
   `--mode peer-reverse --shows '["Show A",...]'`. This does discovery +
   RSS + prefilter in one call and leaves survivors in
   `_run/research_queue.json`.
2. **podcast-fit-researcher** — research every show in
   `_run/research_queue.json` against the two context files.
3. **podcast-pitch-builder** on every researched, non-disqualified show
   (reads `pitch-anchors.md`, `pitch-angles.md`, `show-tiering-rubric.md`;
   runs `pitch_guard.py` on every draft; rewrites until it passes)
4. **podcast-pipeline-writer** — write all rows (T1/T2 with drafted pitch,
   T3 recorded without) to `speaking-pipeline.md`

### Mode B — score-existing-list
Skip step 1. Input is a hand-supplied list of show names or feeds. Resolve to
feeds if needed, then run steps 2 to 5 exactly as above.

## After the chain — digest to Telegram, then stop

```
py "...\scripts\build_digest.py" --data "...\speaking-pipeline.data.json" --telegram > "...\_run\digest.txt"
py "C:\Users\fatih\.claude\skills\regulation-watcher\scripts\send_telegram.py" --file "...\_run\digest.txt"
```

Reuses the proven regulation-watcher Telegram sender (same bot env:
TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID). If those env vars are absent wherever
this runs, the send exits cleanly and the digest still lives in
`_run/digest.txt` plus the full shortlist in `speaking-pipeline.md`. File
delivery is guaranteed; Telegram is best-effort on top.

Then STOP. Approval gate. Nothing is pitched. Fatiha reviews
`speaking-pipeline.md`, edits the `status` column or the draft, and sends the
pitches she approves herself. There is no auto-send anywhere. Do not add one.

## Automated weekly loop

This skill is scheduled to run itself weekly (see the routine created via the
`schedule` skill). The scheduled run executes Mode A end to end with a topic
seed, writes the shortlist, and pushes the digest to Telegram. Fatiha's only
action is reviewing the shortlist and sending what she approves. That single
remaining manual step is intentional: publish-gate + pitching fear-zone +
reputation. The source post's pipeline stops at the same place.

## Run summary to report

shows discovered, dropped at prefilter (with reasons), researched,
disqualified, T1 / T2 / T3 counts, shortlist path. Plus the explicit line:
"0 pitches sent - all queued for manual review".
