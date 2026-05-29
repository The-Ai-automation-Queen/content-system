---
name: video-highlights
version: 1.0.0
description: |
  Turns a video into content. Takes a YouTube link, an uploaded audio/video file, or a
  pasted transcript, gets the transcript, and extracts the interesting parts as ready-to-use
  content seeds for this AI Strategic Advisor — hooks, quotable lines, and content-vault
  entries mapped to her positioning and the studied creator patterns. Also returns timestamped
  clip candidates for short-form editing. Use when the user shares a talk, podcast, keynote,
  interview, or any video and wants the best bits pulled out and shaped into content.
argument-hint: a YouTube/video URL, an uploaded media file, or a pasted transcript
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - AskUserQuestion
---

# Video Highlights

Turn a video into content seeds for this creator. The transcript is raw material; the deliverable
is the interesting parts, shaped so she can post them. Lead with content seeds. Clip candidates
and the full transcript are secondary outputs.

Before writing any hook or content seed, load `inspiration-library/SKILL.md` and
`positioning/SKILL.md` as context. The highlights must sound like her and serve her positioning —
not a generic summary.

---

## Step 1 — Get the transcript

Try these in order. Stop at the first one that works.

### A. YouTube via yt-dlp (best when network allows it)

```bash
pip install -q yt-dlp
cd /tmp && yt-dlp --skip-download --write-auto-sub --write-sub \
  --sub-lang "en,en-US,en-GB,en.*" --sub-format "vtt/srt/best" \
  -o "vid.%(ext)s" "<URL>"
```

### B. YouTube via youtube-transcript-api (lighter, often works when yt-dlp is patchy)

```bash
pip install -q youtube-transcript-api
python -c "from youtube_transcript_api import YouTubeTranscriptApi as A; \
print('\n'.join(f\"[{int(x['start'])//60:02d}:{int(x['start'])%60:02d}] {x['text']}\" for x in A.get_transcript('<VIDEO_ID>')))"
```

### C. Uploaded media file → Whisper

If the user uploads an audio/video file:

```bash
pip install -q openai-whisper
whisper "<file>" --model small --output_format vtt --output_dir /tmp
```

### D. Pasted transcript

If the user pastes a transcript (with or without timestamps), use it directly. This is always
the reliable fallback.

### KNOWN CONSTRAINT — Claude Code on the web

In remote/web sessions the egress proxy commonly **blocks YouTube** (`youtube.com`, `youtu.be`,
the timed-text/captions API, `ytimg.com` all return **HTTP 403**). When that happens, methods A,
B, and `WebFetch` will fail at the network layer — this is not a bug to debug. Do not retry in a
loop. Immediately tell the user and offer the fast paths:

1. **YouTube → "..." → "Show transcript" → copy → paste here.** (fastest)
2. Use a free transcript site (e.g. youtubetotranscript.com, tactiq.io, notegpt.io) and paste the result.
3. Upload the audio/video file and this skill will run Whisper locally (method C).
4. Run method B on their own machine and paste the output.

Never claim a video was transcribed if no transcript was actually obtained.

---

## Step 2 — Find the interesting parts

Read the whole transcript first. Then mark a moment as a highlight only if it does real work for
**her** brand. Prioritise, in roughly this order:

1. **Contrarian / provocative claims** — a line that contradicts conventional wisdom about AI,
   especially anything touching her lanes: AI confusion→confidence, data ownership, security,
   ethics ("served by machines, not harvested by them"), capability over dependency.
2. **Quotable one-liners** — short, self-contained, screenshot-able. The kind of sentence that
   works as audio alone (Allie K. Miller test).
3. **Specific numbers / data points** — concrete stats that earn an explanation (Neil Patel /
   Kieran Gilmurray pattern). Capture the exact figure and its source moment.
4. **Story / friction moments** — a personal or vivid example that can open a video with a fear-
   first or vulnerability-before-credentials hook (Brooke Wright pattern).
5. **Before/after or myth/reality** — any "people think X, actually Y" or "used to take X, now Y"
   structure (Adam Digital / Chris Donnelly pattern).
6. **Clip-worthy segments** — 15–60s stretches that stand alone, with a clear in- and out-point.

Skip filler, throat-clearing, logistics, and anything off her six lanes. A short list of strong
highlights beats a long list of weak ones.

For each highlight, note the timestamp (or approximate position if none exists) and, in one line,
**why it works** for her audience of mid-market CEOs / business owners (35+) who are anxious about
getting AI wrong.

---

## Step 3 — Output

Produce these three blocks, in this order.

### 1. Content seeds (primary deliverable)

For each of the 3–6 strongest highlights:

- **Source line** — the quote or moment from the transcript (with timestamp).
- **Angle** — which of her lanes / which creator pattern it activates.
- **Draft hook** — one publish-ready opening line in her voice (non-contracted English, short,
  provocation- or fear-first, no warm-up, no jargon). Apply the inspiration-library hook patterns.
- **Platform** — LinkedIn (CEO/strategic framing), Instagram/TikTok (community/Automation Queen
  framing), or both via the bridge topic (AI safety/ethics). Respect the lane-separation rule:
  never blend the CEO lane and the women's-automation lane in one piece.
- **CTA idea** — a comment-trigger or specific next step where it fits.

### 2. Clip candidates (for editing)

A short table of timestamped 15–60s segments worth cutting for short-form, with in/out points and
a one-line reason each is shareable.

### 3. Transcript

Save the full transcript to `video-highlights/transcripts/<slug>-<YYYY-MM-DD>.md` with the source
URL/title at the top, so it is reusable later. Offer to add the chosen content seeds to
`content-vault.md` as draft entries.

---

## What this skill does not do

- Does not invent quotes, timestamps, or stats — everything traces to the actual transcript.
- Does not produce a neutral, brand-agnostic summary — highlights exist to become her content.
- Does not blend her CEO lane and her women's-automation lane in a single seed.
- Does not pretend a video was transcribed when the transcript could not be obtained.
- Does not retry blocked-network calls in a loop — it surfaces the constraint and the paste/upload paths.
