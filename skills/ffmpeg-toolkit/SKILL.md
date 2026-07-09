---
name: ffmpeg-toolkit
version: 1.0.0
description: |
  Tested ffmpeg recipes for the video machines: 9:16 reframe, thumbnails,
  caption burn-in, concat, and music bed mixing. The glue between HeyGen /
  Higgsfield renders, HyperFrames output, and what M04 queues into Blotato.
  All commands below were verified on ffmpeg 6.1.
argument-hint: "[recipe name]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
---

# ffmpeg toolkit

Recipes verified 2026-07-06 on ffmpeg 6.1.1. Copy them, change filenames,
do not improvise flags. Always `-y -v error` in scripts so runs are quiet
and idempotent. Inspect one frame of every output before handing it on.

## Install (once per machine)

- Cloud session / VPS (Ubuntu): `apt-get update && apt-get install -y ffmpeg`
  (run `update` first; a stale index 404s on ffmpeg's driver dependencies).
- Never download ffmpeg binaries from random URLs. Package manager only.

## 1. Reframe landscape to 9:16 (Reels/Shorts/TikTok)

Center crop, then scale to exactly 1080x1920:

```bash
ffmpeg -y -v error -i in.mp4 \
  -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy out-vertical.mp4
```

If the subject is off-center (talking head sitting left/right), shift the
crop window: `crop=ih*9/16:ih:x=(iw-ih*9/16)*0.3:y=0` (0 = left edge,
1.0 = right edge; default is centered).

## 2. Thumbnail / frame check

```bash
ffmpeg -y -v error -ss 2 -i in.mp4 -frames:v 1 thumb.jpg
```

Use this to eyeball any output with the Read tool. Cheap, always do it.

## 3. Burn in captions (ASS)

```bash
ffmpeg -y -v error -i in.mp4 -vf "ass=captions.ass" -c:a copy out.mp4
```

The `captions` skill generates brand-styled karaoke `.ass` files from
whisper word timestamps. Style lives there, not here.

## 4. Concat clips (same codec/resolution)

```bash
printf "file 'a.mp4'\nfile 'b.mp4'\n" > list.txt
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy out.mp4
```

Stream copy only works when clips share codec, resolution, and fps.
If they differ, re-encode each to a common format first (recipe 1's
output settings work).

## 5. Music bed under a voice track

Duck the music to 20 percent and end with the voice:

```bash
ffmpeg -y -v error -i voice-video.mp4 -i music.mp3 \
  -filter_complex "[1:a]volume=0.2[bg];[0:a][bg]amix=inputs=2:duration=first[mix]" \
  -map 0:v -map "[mix]" -c:v copy -c:a aac out.mp4
```

Music files come from licensed sources only (HeyGen catalog via
`skills/hyperframes/media-use`, or Blotato's library). No YouTube rips.

## 6. Test asset (for pipeline dry runs)

```bash
ffmpeg -y -v error -f lavfi -i testsrc2=size=1920x1080:rate=30 \
  -f lavfi -i sine=frequency=440:sample_rate=44100 -t 4 \
  -c:v libx264 -pix_fmt yuv420p -c:a aac test.mp4
```

## Rules

- Output is DRAFT material for the queue. Queue, never publish.
- Keep intermediates in a scratch folder, never in git. Only final
  deliverables get referenced from vault entries.
