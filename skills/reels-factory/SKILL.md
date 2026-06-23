---
name: reels-factory
version: 1.0.0
description: |
  Machine M03 — long-video → many-shorts repurposer, modeled on Romain Brunel's
  Opus Clip stage. Takes a long-form video URL (YouTube, recorded keynote,
  podcast clip), generates 5–15 short clips with hooks and comment-keyword CTAs,
  and lands them in content-vault.md as DRAFT entries scored by content-engine's
  critic gate. Auto-triggers after a new long video is published; can also run
  on-demand. Default engine is Blotato (no extra subscription); Reap.video is the
  preferred dedicated clipper when wired; Opus Clip is an optional alternative.
argument-hint: "[long video URL, or 'next' to scan inventory.md for unprocessed long videos]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - AskUserQuestion
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

## Three engines (use what's wired — no paid tool required)

Pick the first one that's available. **No Opus Clip subscription is needed** —
Blotato (already wired) and Reap (the operator has it) both do the job.

### Default — Blotato `combine-clips` template (already wired, free to us)
The zero-extra-cost path, and the one to use unless a dedicated clipper is wired:

1. Pull the long video's transcript with the Apify YouTube-transcript actor.
2. **Pick the best moments with judgment, not a black box:** read the transcript
   and select the 5–10 strongest ~30–60s spans (a clean hook + one complete idea
   + a payoff). This *is* the "virality scoring" Opus Clip sells — done by the
   content-engine critic instead of a paid model.
3. Feed each chosen span's timecodes to Blotato's `combine-clips` template
   (`blotato_create_visual`) with captions enabled; poll with
   `blotato_get_visual_status`.

> **This is how Blotato replaces Opus Clip:** transcript → smart segment pick →
> captioned vertical export. The only thing Opus Clip added was auto-ranking the
> moments; we do that with the critic, for free.

### Preferred dedicated clipper — Reap (app.reap.video), when wired
Reap auto-clips a long video into captioned vertical shorts (Opus-Clip-class) and
the operator already has access. Use it ahead of Blotato when its key is set.

1. Set `REAP_API_KEY` in env (from the Reap dashboard → API/settings). Never commit.
2. Submit the long video and retrieve the rendered clips. Confirm the exact
   endpoint shape in the operator's Reap dashboard, then call over Bash + curl:

```bash
# Submit (verify path/fields against your Reap dashboard's API reference)
curl -sS -X POST https://api.reap.video/v1/clips \
  -H "Authorization: Bearer $REAP_API_KEY" -H "content-type: application/json" \
  -d '{"video_url":"<LONG_URL>","aspect_ratio":"9:16","captions":true}'

# Poll status / fetch resulting clip URLs
curl -sS https://api.reap.video/v1/clips/$JOB_ID \
  -H "Authorization: Bearer $REAP_API_KEY"
```

If Reap has no public API on the operator's plan, use it **manually** (upload in
the Reap UI, download the clips) and feed the resulting MP4s into the vault via
the steps below — the rest of the pipeline is identical.

### Optional alternative — Opus Clip API
Only if the operator ever subscribes. Set `OPUS_CLIP_API_KEY`, then
`POST https://api.opus.pro/v1/clips` with `{video_url, aspect_ratio:"9:16",
clip_count, add_captions:true}` and poll `…/v1/clips/$JOB_ID`. Not required.

---

## How to process one long video

1. **Read the source** — title, description, transcript (Apify
   `starvibe/youtube-video-transcript` for YouTube).
2. **Generate the clips** — whichever engine is wired (Blotato / Reap / Opus
   Clip) returns N clips with a `start`, `end`, `mp4_url`, and caption text.
   With Blotato, *you* choose the spans from the transcript (the smart pick).
3. **For each clip** (top 5–10 by score):
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
   - **Visual:** the Opus Clip `mp4_url` already includes captions; record it.
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
