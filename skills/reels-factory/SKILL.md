---
name: reels-factory
version: 1.0.0
description: |
  Machine M03 — long-video → many-shorts repurposer, modeled on Romain Brunel's
  Opus Clip stage. Takes a long-form video URL (YouTube, recorded keynote,
  podcast clip), generates 5–15 short clips with hooks and comment-keyword CTAs,
  and lands them in content-vault.md as DRAFT entries scored by content-engine's
  critic gate. Auto-triggers after a new long video is published; can also run
  on-demand. Uses Opus Clip API (preferred) or Blotato's combine-clips template
  as a fallback.
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

## Two engines

### Preferred — Opus Clip API
Opus Clip auto-detects the best moments in a long video (virality score per
clip) and exports vertical 9:16 shorts with captions. Operator setup (one-time):

1. Subscribe to Opus Clip API (Business plan or higher).
2. Set `OPUS_CLIP_API_KEY` in env. Never commit.
3. Allowlist `api.opus.pro` in the environment's network egress.

Then this skill runs over Bash + curl:

```bash
# Submit
curl -sS -X POST https://api.opus.pro/v1/clips \
  -H "Authorization: Bearer $OPUS_CLIP_API_KEY" -H "content-type: application/json" \
  -d '{"video_url":"<LONG_URL>","aspect_ratio":"9:16","clip_count":10,"add_captions":true}'

# Poll status
curl -sS https://api.opus.pro/v1/clips/$JOB_ID \
  -H "Authorization: Bearer $OPUS_CLIP_API_KEY"
```

(Endpoint shape may evolve — check the operator's Opus Clip dashboard for the
current API reference and adjust here.)

### Fallback — Blotato `combine-clips` template
If Opus Clip is unavailable, scrape the long video's transcript (via Apify's
YouTube-transcript actor) → segment into ~30-60s spans → feed each span's
timecodes to Blotato's `combine-clips` template with captions enabled. Less
intelligent than Opus Clip's virality scoring, but it works.

---

## How to process one long video

1. **Read the source** — title, description, transcript (Apify
   `starvibe/youtube-video-transcript` for YouTube).
2. **Generate the clips** — Opus Clip API call returns N clips with `start`,
   `end`, `virality_score`, `mp4_url`, `caption_text`.
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
