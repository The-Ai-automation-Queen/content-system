---
name: supadata-transcript
description: Pull full transcripts from any video URL (YouTube, TikTok, Instagram, X, Facebook) using the SupaData API. Use when user pastes a video URL and wants the transcript, or asks to transcribe/analyze a video.
---

# SupaData Transcript Skill

## When to use
- User pastes a video URL (YouTube, TikTok, Instagram Reel, X/Twitter, Facebook)
- User asks to "transcribe", "pull transcript", "get transcript", or "analyze this video"
- User wants to reverse-engineer viral content from a video

## How to use

Run the Python script with the video URL:

```
python skills/supadata-transcript/transcript.py "<VIDEO_URL>"
```

### Options
- `--text` — return plain text instead of timestamped chunks (default)
- `--chunks` — return timestamped chunks with offsets
- `--lang XX` — request a specific language (ISO 639-1 code, e.g. `en`, `es`, `ar`)

### Examples
```
python skills/supadata-transcript/transcript.py "https://youtu.be/abc123"
python skills/supadata-transcript/transcript.py "https://www.tiktok.com/@user/video/123" --chunks
python skills/supadata-transcript/transcript.py "https://youtu.be/abc123" --lang es
```

## After getting the transcript
- Summarize key points if user asks
- Break down hooks, structure, CTAs for content analysis
- Use for competitor research, repurposing, or script writing
- Combine with /last30days research for deeper topic coverage

## Config
- API key via env var: `SUPADATA_API_KEY`
- Or stored in: `.config/supadata/.env` (repo-local)
