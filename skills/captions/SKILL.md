---
name: captions
version: 1.0.0
description: |
  The finishing pass for every talking-head and faceless video: whisper
  word timestamps in, brand-styled karaoke captions burned in, 9:16
  deliverable out. Raw HeyGen/Higgsfield renders never enter the queue
  without this pass; uncaptioned talking heads underperform badly.
argument-hint: "[video file]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---

# Captions

Every spoken-word video gets bold word-by-word captions before M04 sees
it. Style is fixed here so all clips look like one brand: white fill,
electric #2C4BE0 pre-highlight, heavy outline, bottom third of a
1080x1920 frame, uppercase.

## Pipeline (verified 2026-07-06)

1. **Transcribe with word timestamps** using the `video-transcription`
   skill (whisper). You need JSON with `segments[].words[]` carrying
   `word`, `start`, `end` (openai-whisper `--word_timestamps True`,
   faster-whisper, or whisper.cpp all produce this shape).
2. **Generate the ASS file**:
   `node skills/captions/gen-ass.mjs whisper.json captions.ass 3`
   (third arg = words per caption line; 3 is the reels default, use 4-5
   for slower, denser delivery).
3. **Reframe to 9:16 first if needed** (`ffmpeg-toolkit` recipe 1); the
   style is tuned for 1080x1920.
4. **Burn in**:
   `ffmpeg -y -v error -i in.mp4 -vf "ass=captions.ass" -c:a copy out.mp4`
5. **Check a frame** (`ffmpeg-toolkit` recipe 2) and read the whole
   transcript once: whisper mishears product names. Fix the text in the
   `.ass` file directly, never re-guess timings.

## Quality gates

- Transcript proofread against the script in the vault entry. Names,
  prices, and keywords must be exact; a wrong price on screen is a Law 7
  violation.
- No em-dashes in caption text (voice law; whisper does not emit them,
  do not add them while editing).
- Captions never cover the speaker's mouth: default MarginV 320 keeps
  them in the lower third. Adjust per video if framing differs.
- The CTA keyword, when spoken, must match an ACTIVE `lead-magnets.csv`
  row, same as any A-post.

## Style notes

The style block lives in `gen-ass.mjs` (single source). Font is Inter
with system fallback; install Inter on the VPS for exact rendering
(`fonts-inter` package or drop the TTF in `~/.fonts`). ASS colors are
BGR: electric #2C4BE0 is written `&H00E04B2C`.

For heavier motion (bouncing words, emoji pops), use
`skills/hyperframes/embedded-captions` instead; this skill is the fast
deterministic default.

## Rules

- Output is DRAFT for the queue. Queue, never publish.
- Keep `.ass` and intermediates in scratch; only the final MP4 path is
  referenced from the vault entry.
