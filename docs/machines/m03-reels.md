# M03 — Reels Factory

## Purpose
Turn long-form video into multiple short-form clips (Reels/Shorts/TikToks)
with hooks and comment CTAs, landed as vault drafts.

## When it runs
- In the weekly loop, only when a new long video exists
- On demand when a long video is ready to clip

## Tools
- **Reap** (MCP, no key) — primary, returns virality scores
- **Blotato** `combine-clips` — fallback
- **ffmpeg-toolkit** — 9:16 reframe, thumbnails, concat, music beds
- **captions** — karaoke caption burn-in, mandatory before queueing

## Inputs
- A long-form video (YouTube, recorded content)
- `positioning/SKILL.md` for voice/CTA guidelines
- `inspiration-library/SKILL.md` for hook patterns

## Outputs
- Multiple short clips as vault DRAFT entries
- Each clip has: hook, duration, virality score, suggested CTA

## Validation criteria
1. Each clip opens with a hook (first 3 seconds grab attention)
2. Duration is platform-appropriate (15–60s for Reels, 15–60s for Shorts)
3. CTA matches an active lead-magnet keyword
4. Virality score logged for prioritization
5. No clip duplicates another's core message

## Decision framework for AI delegation
An AI validator should:
- Rank clips by virality score
- Select top 3–5 per long video
- Ensure variety in hooks and CTAs across clips
- Reject clips where the hook doesn't match the payoff
