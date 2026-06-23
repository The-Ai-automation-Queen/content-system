# Clone your voice. Generate Reels overnight. Cost: $0 per audio.

*From Fatiha — the AI Automation Queen*

This is the pipeline I use to generate voiceovers in my own voice, in 30 languages, overnight, for free — and turn them into finished Reels without recording a single new clip.

It's not magic. It's a 45-minute setup that then runs without you.

---

## What you'll have at the end

- Your voice cloned from a 30-second sample, usable in any language
- A Colab notebook that batches voiceovers to your Google Drive overnight
- A Remotion pipeline that turns those voiceovers into finished 9:16 Reels
- $0 per audio generation after setup — no ElevenLabs subscription needed

---

## What you need before you start

| Item | Why | Cost |
|---|---|---|
| Google account | Colab free tier + Drive output | Free |
| 30 seconds of clean voice WAV | Reference for cloning | Free |
| ReelStack license | Reel scaffolding + render | One-time |
| Remotion on your laptop | Where Reels render | Free |
| Google Drive for Desktop | Sync Colab output to laptop | Free |

No local GPU. Colab handles all the generation in the cloud. Your laptop only renders the final video.

---

## Step 1 — Record your voice sample

Open Voice Memos, Audacity, or any recorder. Record 20–30 seconds of yourself speaking naturally. Read a paragraph from a book, describe your day, doesn't matter.

**Rules:**
- Clean room. No fan, traffic, or music behind you.
- Normal pace. Don't perform. The clone copies how you *actually* talk.
- Save as WAV at 44kHz or 48kHz, mono. If your recorder only exports MP3, convert it in Audacity.
- Name it `my-voice-ref.wav`. You'll reuse this file forever.

---

## Step 2 — Open the Colab notebook

The notebook ships with this guide. It installs VoxCPM, loads the 2B multilingual model, mounts your Google Drive, and runs voice cloning in batch.

1. Go to colab.research.google.com
2. File → Upload notebook → select `VoxCPM_Reels_Pipeline.ipynb`
3. Runtime → Change runtime type → **T4 GPU** (free tier)
4. Runtime → Run all

First run takes 5–10 minutes while VoxCPM downloads the model weights (around 5GB). They cache for the rest of your session. After that: 30–60 seconds per Reel.

---

## Step 3 — Upload your voice + generate in batch

When the notebook hits Cell 5, an upload button appears. Drop `my-voice-ref.wav`. Colab caches it for the session.

In Cell 7, edit the `BATCH` list with your Reel scripts. Each item generates one WAV:

```python
BATCH = [
    {
        'slug': 'ai-plan-actually-use',
        'text': 'Most AI plans collect dust. The one you actually use starts with one problem worth solving this week.',
    },
    {
        'slug': 'tech-bff-test',
        'text': 'A tech BFF answers your stupid AI questions without making you feel stupid. That is the standard.',
    },
]
```

Run Cell 7. WAVs land in your Google Drive at `MyDrive/voxcpm-output/` with filenames like `2026-06-18_ai-plan-actually-use.wav`.

---

## Step 4 — Sync WAVs to your laptop

Install Google Drive for Desktop. Pick **Stream files** mode (not Mirror — nothing eats your local disk). Files download on demand.

After install, your Drive mounts as a folder. Browse to `voxcpm-output/`. The WAVs are there. Move them into your Remotion project:

```
mkdir public\audio
copy "G:\My Drive\voxcpm-output\2026-06-18_ai-plan-actually-use.wav" public\audio\myreel.wav
```

---

## Step 5 — Lock motion to voice

From your Remotion project root:

```
/reelstack-beats public/audio/myreel.wav
```

ReelStack pipes the WAV through ffmpeg, runs whisper-cli, and prints frame-accurate `BEAT` constants. Copy them. They lock every scene cut to the words you actually said.

**Why this matters:** eyeballing scene cuts on a 90-second Reel drifts 6 seconds by the end. Whisper-locked beats stay in sync to the frame.

---

## Step 6 — Scaffold the Reel

Pick a ReelStack family that fits the message. 5 ship: Glass Iridescent, Cream Paper, Dark Cinematic, Warm Signature, Forbidden.

```
/reelstack-glass --preset=graphify --name=MyReel --vo=public/audio/myreel.wav
```

ReelStack writes the full `.tsx` file with palette, primitives, and BEAT skeleton. Paste your beats from Step 5. Open Remotion Studio (`npm run dev`) to preview.

---

## Step 7 — Render

```
/reelstack-render MyReel --platform=ig
```

ReelStack runs the lint (safe zones, motion floors, hero text fit), then encodes H.264 at IG-optimal bitrate. Output: MP4 ready to upload.

For TikTok: `--platform=tiktok`. For YouTube Shorts: `--platform=shorts`.

---

## What this replaces

| Tool | Old cost | New cost |
|---|---|---|
| ElevenLabs voice clone subscription | $22–99/month | $0 (Colab free) or $10/month (Pro) |
| CapCut Pro auto-caption sync | $8/month | $0 (whisper-cli) |
| Stock B-roll subscription | $20–40/month | $0 (ReelStack primitives) |

The savings only matter if you publish. The point of this stack is to ship more Reels with less friction — not to optimise a tool budget.

---

## Troubleshooting

**Colab disconnects mid-batch:** Free tier sessions cap around 12 hours. Keep the tab open. For batches over 20 Reels, upgrade to Colab Pro (~$10/month).

**The cloned voice sounds robotic:** the reference WAV is too short, too noisy, or too performed. Re-record 30 seconds of natural speech in a quiet room. Clone quality equals reference quality.

**Whisper picks up the wrong words:** speak the script exactly as written during recording. Test Cell 7 with one short script before batching 20.

**ReelStack rejects the render:** the lint failed. Run `/reelstack-lint MyReel.tsx` for the exact violations. Common causes: hero text overflows the IG safe band, opener missing motion layers.

---

This is one pipeline. The bigger shift is when every repeatable task in your content business works this way — built once, running while you sleep.

Comment **TEAM** and I'll send the guide on setting up your first AI employee — the 5-step hire that takes a task off your plate for good.

👑 *Build it once. Let it run. Your voice, your Reels, zero friction.*
