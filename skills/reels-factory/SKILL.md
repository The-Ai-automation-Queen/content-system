---
name: reels-factory
version: 1.0.0
description: |
  Machine M03 — long-video → many-shorts repurposer, modeled on Romain Brunel's
  Opus Clip stage. Takes a long-form video URL (YouTube, recorded keynote,
  podcast clip), generates 5–15 short clips with hooks and comment-keyword CTAs,
  and lands them in content-vault.md as DRAFT entries scored by content-engine's
  critic gate. Auto-triggers after a new long video is published; can also run
  on-demand. Preferred engine is Reap (MCP-wired, virality-scored, no API key
  needed); Blotato is the free fallback. No Opus Clip subscription required.
argument-hint: "[long video URL, or 'next' to scan inventory.md for unprocessed long videos]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - AskUserQuestion
  - mcp__Reap__create_clips
  - mcp__Reap__get_status
  - mcp__Reap__get_results
  - mcp__Reap__get_clip
  - mcp__Reap__get_caption_styles
  - mcp__Reap__request_upload_url
  - mcp__Reap__list_videos
  - mcp__Blotato__blotato_list_visual_templates
  - mcp__Blotato__blotato_create_visual
  - mcp__Blotato__blotato_get_visual_status
  - mcp__APIFY_-_Trends_listener__call-actor
  - mcp__APIFY_-_Trends_listener__get-dataset-items
---

# Reels Factory — Machine M03

You turn a long-form video into many short reels at once. This is the leverage
move: one keynote or YouTube upload becomes a week of shorts across all
platforms. Read `CLAUDE.md`, `positioning/SKILL.md`, and
`inspiration-library/SKILL.md` (Patterns 4 + 10 — named series, result-first
demo) before generating.

You produce DRAFTs in the vault. **You never publish.**

---

## Two engines (both free to us — no Opus Clip needed)

Use **Reap** by default; fall back to **Blotato** only if Reap is unavailable.

### Preferred — Reap (MCP-wired, virality-scored, no API key)
Reap is connected as an MCP server in the Claude env (like Blotato), so there's
**nothing to put in `.env`** — and it returns a per-clip **virality score**, the
one thing Opus Clip charged for. This is the real replacement.

The clip job runs through these MCP tools:

1. **`get_caption_styles`** — pick a caption style id (e.g. `system_zen`) once;
   reuse it. (Optional: the operator can build a branded template at
   app.reap.video/branding for logo + intro/outro + her caption look.)
2. **`create_clips`** — ONE call per source video (one job returns many clips).
   - Pass `sourceUrl` (a YouTube/public link) **or** a prior `uploadId` (from
     `request_upload_url` if you must upload an `.mp4`/`.mov`).
   - For social shorts: `exportOrientation: "portrait"` (9:16), `centerStage:
     true` (track her face), `enableCaptions: true`, `captionsPreset: "<style>"`.
   - Leave `prompt` **absent** for plain "make engaging clips" — Reap auto-selects
     stronger moments without a generic prompt. Only pass `prompt` for concrete
     editorial direction (specific topics/counts).
   - **Confirmation flow:** the first `create_clips` call (no `confirm`) returns a
     `confirmation_required` with `plannedSettings` + a `confirmationToken`. In an
     unattended cron run, immediately call again with `confirm: true` and that
     token using the same settings. When a human is present, relay the planned
     settings first.
3. **`get_status`** — poll until `completed` (it also emails on completion).
4. **`get_results`** / **`get_clip`** — fetch each clip's download URL, transcript,
   caption metadata, and **virality score**. Use the score to rank.

### Fallback — Blotato `combine-clips` (if Reap is ever down)
1. Pull the transcript via the Apify YouTube-transcript actor.
2. Read it and pick the 5–10 strongest ~30–60s spans (clean hook + one idea +
   payoff) — the content-engine critic does the ranking Reap's score gives you.
3. Feed each span's timecodes to Blotato's `combine-clips` template
   (`blotato_create_visual`) with captions on; poll `blotato_get_visual_status`.

> **Opus Clip is not needed.** Reap gives you virality-scored auto-clipping with
> no key; Blotato covers you if Reap is unavailable. Skip the Opus subscription.

---

## How to process one long video

1. **Read the source** — title, description, transcript (Apify
   `starvibe/youtube-video-transcript` for YouTube).
2. **Generate the clips** — Reap (`create_clips` → `get_results`) returns N clips
   each with a download URL, transcript, captions, and a **virality score**. (On
   the Blotato fallback, *you* pick the spans from the transcript.)
3. **For each clip** (top 5–10 by virality score):
   - Write a hook line in her voice (use Pattern 10, Result-First Demo, or
     Pattern 14, Contrarian Operational, from `inspiration-library`).
   - Add a comment-keyword CTA tied to the original long video's lead magnet
     (so the short funnels back to the source resource).
   - Score the draft through `content-engine`'s critic gate (≥8.0 → READY,
     6–7.9 → DRAFT with a note, <6 → revise once).
4. **Append to vault** as new entries, lowest free ENTRY number upward, with:
   - Status: `DRAFT` (operator picks the best 3–5 to promote to READY)
   - Platform: Instagram Reels / TikTok / YouTube Shorts (one entry per
     platform if the operator wants; default to one entry that targets all
     three short-form platforms)
   - **Visual:** the Reap clip URL already includes burned-in captions; record it.
   - **Source:** `Repurposed from <long video URL> via Reels Factory`

---

## Cron expectation

Romain's M03 auto-fires on a new YouTube publish. For us:
- **Manual mode** — operator passes a video URL.
- **Auto mode** — `weekly-ops` or a dedicated cron checks the operator's
  YouTube channel for new long videos and runs this skill on each new upload.
  See `.claude/settings.json` for the schedule.

---

## After saving
- Count of clips landed in the vault, their entry numbers, virality scores.
- Top 3 by Critic score (the ones to publish first).
- Anything skipped (low score, no transcript, etc.).

## What this skill does not do
- Does not publish or schedule — `distribution` does that.
- Does not generate clips above the Critic gate; weak clips stay DRAFT.
- Does not commit API keys.
- Does not invent transcripts; if the source is unreadable, it stops and reports.
