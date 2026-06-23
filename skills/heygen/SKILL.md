---
name: heygen
version: 1.0.0
description: |
  HeyGen engine — turns an approved video script into a talking-head video of
  HER REAL cloned avatar speaking with HER REAL voice clone. This is the
  on-brand talking-head pipeline (the alternative to Blotato's generic AI
  characters). Calls HeyGen v2 API: list avatars/voices, generate from text,
  poll until done, return the MP4 URL. Records the asset on the vault entry.
  Pairs with visual-engine + Blotato's ai-avatar-broll template (HeyGen makes
  her speak; Blotato wraps with AI B-roll and queues). Does NOT publish.
argument-hint: "[ENTRY number — e.g. '008'; or 'list-avatars' / 'list-voices' to inspect what's connected]"
allowed-tools:
  - Read
  - Edit
  - Bash
  - Grep
  - AskUserQuestion
---

# HeyGen — talking-head engine

You turn an approved spoken script into a **talking video of Fatiha's real
cloned avatar speaking with her real cloned voice**. Read `CLAUDE.md`,
`positioning/SKILL.md`, `security.md`, and the target vault entry before
generating anything.

You produce assets. **You never publish.** (Distribution does that, into a queue.)

---

## Why HeyGen, not Blotato, for talking-head

| Need | Tool | Why |
|---|---|---|
| **Talking video of HER face + voice** | **HeyGen** | The only tool here that clones her real avatar + voice. The on-brand way to ship talking-head without filming. |
| Talking video of a generic AI character | Blotato (`ai-selfie-video`) | Cheap "consistent character" but it is NOT her — never present it as Fatiha. |
| Narrated faceless video (script + AI images + AI voice) | Blotato (`ai-story-video`) | Faceless explainer reels. Use Alice voice for brand consistency. |
| Talking-head + AI B-roll (the Romain stack) | **HeyGen → Blotato `ai-avatar-broll`** | HeyGen renders her talking; the MP4 URL is fed into Blotato's avatar-broll template which adds AI B-roll. Best of both. |

This is the brand-safety rule: **a generic AI face is never her**. HeyGen is the
only engine that has been licensed her face/voice; route every "her talking"
piece through it.

---

## What this skill needs (operator setup — one-time)

The HeyGen API is reached over HTTPS. Two operator actions before this skill
runs:

1. **API key.** In HeyGen dashboard → Settings → Subaccount API → create a
   key. Set it in the environment as `HEYGEN_API_KEY`. Never commit it
   (see `security.md` §1).
2. **Network egress allowlist.** Add `api.heygen.com` (and `resource.heygen.ai`
   for video download URLs) to the environment's network access settings, the
   same way Blotato is being allowlisted. Without this, the curl calls fail
   with "Host not in allowlist".

After both: `bash -c 'curl -sS -H "X-Api-Key: $HEYGEN_API_KEY" https://api.heygen.com/v2/avatars | head -c 200'` should return a JSON list.

---

## How to generate a talking video (the happy path)

For a given vault entry that has a `### SPOKEN SCRIPT` block:

1. **Read the entry** in `content-vault.md`. Extract the spoken text only —
   strip stage directions in `(parentheses)` and `[ON SCREEN: …]` cues. That
   stripped text is the HeyGen `input_text`.
2. **Pick the avatar.** List avatars once with
   `curl -sS -H "X-Api-Key: $HEYGEN_API_KEY" https://api.heygen.com/v2/avatars`,
   pick the one she has tagged as the brand default (look ID in
   `inventory.md` once recorded). If multiple, rotate or ask once via
   `AskUserQuestion`.
3. **Pick the voice.** List voices with
   `curl -sS -H "X-Api-Key: $HEYGEN_API_KEY" https://api.heygen.com/v2/voices`,
   pick her cloned voice (the one named after her). Fall back to a brand-spec
   voice from the inventory only if the clone is unavailable.
4. **Generate.** POST to `https://api.heygen.com/v2/video/generate` with:
   ```
   {
     "video_inputs": [{
       "character":   {"type":"avatar","avatar_id":"<HER_AVATAR_ID>","avatar_style":"normal"},
       "voice":       {"type":"text","input_text":"<STRIPPED_SCRIPT>","voice_id":"<HER_VOICE_ID>"},
       "background":  {"type":"color","value":"#FFFFFF"}
     }],
     "dimension": {"width":720,"height":1280},
     "test": false
   }
   ```
   The response includes `data.video_id`.
5. **Poll** `GET https://api.heygen.com/v1/video_status.get?video_id=<id>` every
   ~15s until `status` is `completed`. On `failed`, log the error and stop —
   do not retry blindly.
6. **Grab `video_url`** from the completed response.

For an entry that needs the **avatar + AI B-roll** finishing pass, hand the
resulting `video_url` straight to `visual-engine`'s Blotato `ai-avatar-broll`
template; do not duplicate work.

---

## Record on the entry (close the loop)

Edit the vault entry to add a `**Visual:**` line:

```
**Visual:** HeyGen talking-head — avatar <name/id>, voice <name/id>, 9:16, built DD/MM/YYYY.
<MP4 URL>
```

If the entry was waiting on `NEEDS HER FACE`, clear that flag once the asset is
recorded. Update the quick-reference line at the top of the vault file too.

---

## `list-avatars` / `list-voices` modes

Fast inspection — print the connected avatars / voices in a small table so the
operator can confirm which one is "the brand default" (and update the
`inventory.md` HeyGen section with the chosen IDs). No vault changes.

## After saving

Report: which entry, which avatar + voice used, MP4 URL, whether it's now ready
for `distribution` or still blocked (e.g. needs B-roll wrap via `visual-engine`).

## What this skill does not do

- Does not present a generic AI avatar as Fatiha (brand-safety rule).
- Does not generate faceless / explainer video — that is Blotato `ai-story-video`
  (see `visual-engine`).
- Does not publish or schedule — `distribution` does that.
- Does not commit the API key — environment variable only.
- Does not rewrite approved script copy; it only narrates it.
