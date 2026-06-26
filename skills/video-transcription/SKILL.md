---
name: video-transcription
version: 1.0.0
description: |
  Transcribes a YouTube (or other platform) video and extracts its full
  transcript. Saves the raw transcript to `transcripts/` and a summarized
  RESEARCH entry to `research-notes.md` with key takeaways, content angles,
  and stack/tool mentions. Use when the operator shares a video URL and wants
  it turned into usable intelligence for the content engine.
argument-hint: "[YouTube URL — e.g. 'https://www.youtube.com/watch?v=abcdef12345']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - WebFetch
  - WebSearch
  - mcp__Tavily__tavily_search
  - mcp__Tavily__tavily_extract
  - AskUserQuestion
---

# Video Transcription

You extract the full transcript from a video URL, save it, and turn it into a
research entry the content engine can draft from. Read `CLAUDE.md` first.

---

## Method — dual path with fallback

### Path A: yt-dlp (preferred — fast, full transcript)

1. Check if `yt-dlp` is installed (`which yt-dlp`). If not, install it:
   `pip install yt-dlp`.
2. Try to download auto-generated or manual subtitles:
   ```
   yt-dlp --write-auto-sub --write-sub --sub-lang fr,en --skip-download \
     --sub-format vtt -o "SCRATCHPAD/transcript" "VIDEO_URL"
   ```
   Use the scratchpad directory for temp files.
3. If the download succeeds, read the `.vtt` file, strip VTT formatting
   (timestamps, duplicate lines, `<c>` tags), and produce clean text.
4. If `yt-dlp` fails (proxy block, geo-restriction, etc.), fall through to
   Path B.

### Path B: Web transcript extraction (fallback)

1. Try `WebFetch` on a transcript service URL, passing the video ID:
   - `https://www.youtubetranscript.com/?v=VIDEO_ID`
   - `https://kome.ai/tools/youtube-transcript-generator` (paste URL)
2. If `WebFetch` returns usable text, extract the transcript.
3. If all services fail, try `mcp__Tavily__tavily_extract` on the video URL.
4. As a last resort, use `mcp__Tavily__tavily_search` to find blog posts,
   articles, or discussions that summarize the video's content, and compile
   findings from those.
5. If nothing works, report clearly what failed and what the operator can do
   (e.g., paste the transcript manually).

### Language handling

- Auto-detect the video language. Most target videos are in **French** or
  **English**.
- Always save the transcript in its **original language** (do not translate).
- The RESEARCH entry summary should be written in **English** (the operating
  language of this repo) but quote key terms/phrases in the original language
  where useful.

---

## Output 1 — Raw transcript file

Save the full transcript to `transcripts/YYYY-MM-DD-slug.md`:

```
# Transcript: <Video Title>

**Source:** <full URL>
**Channel:** <channel name if known>
**Language:** <fr/en/…>
**Duration:** <if known>
**Transcribed:** <date YYYY-MM-DD>
**Method:** <yt-dlp auto-sub | web extraction | tavily | manual>

---

<full transcript text, cleaned of VTT artifacts>
```

Create the `transcripts/` directory if it does not exist.

---

## Output 2 — RESEARCH entry in research-notes.md

Read `research-notes.md` to get the next RESEARCH number. Append a new entry
at the top:

```
## RESEARCH NNN — YYYY-MM-DD | Video transcription: <short title>

**Status:** NOTED
**Source:** <full URL> (<channel name>)
**Language:** <original language>
**Method:** <how the transcript was obtained>

### Key takeaways (5–7 bullets)
- <takeaway>
- …

### Tools & stack mentioned
- <tool/service> — <what role it plays in the video's system>
- …

### Content angles ready to use (3)
- <angle> → pillar: <pillar>
- <angle> → pillar: <pillar>
- <angle> → pillar: <pillar>

### Contrarian take logged
<one "everyone thinks X, but…" from the video>

### Gap analysis vs. our stack
- **We have:** <what overlaps>
- **We're missing:** <what the video shows that we lack>
- **Different approach:** <where our approach differs>
```

---

## After saving

Report:
- Whether the transcript was captured (full / partial / summary-only)
- The RESEARCH number written
- A 3-line summary the operator can scan in 10 seconds
- The gap analysis highlights (what's missing vs. our stack)

## What this skill does not do

- Does not draft content — that is `content-engine`.
- Does not translate the transcript (saves in original language).
- Does not download or store the video file itself.
- Does not use Reap or other video-editing tools for transcription.
