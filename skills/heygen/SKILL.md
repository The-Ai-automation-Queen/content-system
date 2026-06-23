---
name: talking-head
version: 2.0.0
description: |
  Talking-head engine — turns an approved video script into a video of HER REAL
  cloned avatar speaking with HER REAL voice clone. Primary engine: Higgsfield
  (paid, MCP-wired). Fallback: HeyGen (API). Both clone her real face + voice.
  Blotato's generic AI avatars are NEVER presented as her (brand-safety rule).
  Pairs with visual-engine + Blotato's ai-avatar-broll template (talking-head
  speaks → Blotato wraps with AI B-roll). Does NOT publish.
argument-hint: "[ENTRY number — e.g. '008'; or 'list-avatars' / 'list-voices' to inspect what's connected]"
allowed-tools:
  - Read
  - Edit
  - Bash
  - Grep
  - AskUserQuestion
---

# Talking-Head Engine (Higgsfield + HeyGen)

You turn an approved spoken script into a **talking video of Fatiha's real
cloned avatar speaking with her real cloned voice**. Read `CLAUDE.md`,
`positioning/SKILL.md`, `security.md`, and the target vault entry before
generating anything.

You produce assets. **You never publish.** (Distribution does that, into a queue.)

---

## Engine priority

| # | Engine | When to use | Status |
|---|---|---|---|
| 1 | **Higgsfield** (MCP) | Primary — paid, MCP-connected in Claude env | Connect MCP server, then use directly |
| 2 | **HeyGen** (API) | Fallback — if Higgsfield is unavailable | Needs `HEYGEN_API_KEY` env var |
| 3 | **Blotato `ai-story-video`** | Faceless narrated video (NO face) | Already wired — use for explainer reels |

Try Higgsfield first. If the MCP tools aren't available in the session, fall
back to HeyGen API. If neither is available, use Blotato faceless video and
flag the entry as `NEEDS HER FACE` for later.

---

## The brand-safety rule

**A generic AI face is never her.** Only Higgsfield or HeyGen (with her real
clone) produce talking-head videos presented as Fatiha. Blotato's
`ai-selfie-video` creates a "consistent AI character" — it is NOT her and must
never be labeled as her.

| Need | Tool | Why |
|---|---|---|
| **Talking video of HER face + voice** | **Higgsfield** or **HeyGen** | Real clone of her avatar + voice |
| Talking video of a generic AI character | Blotato (`ai-selfie-video`) | NOT her — never present as Fatiha |
| Narrated faceless video (script + AI images + AI voice) | Blotato (`ai-story-video`) | Faceless explainer reels. Alice voice for brand consistency. |
| Talking-head + AI B-roll (the Romain stack) | **Higgsfield/HeyGen → Blotato `ai-avatar-broll`** | Talking-head renders her speaking; MP4 goes to Blotato's avatar-broll template for B-roll. Best of both. |

---

## Engine 1 — Higgsfield (MCP, primary)

Higgsfield is connected as an MCP server in the Claude Code environment. The
operator has a paid account.

### Setup (one-time)
1. Add the Higgsfield MCP server to your Claude Code settings (`.claude/settings.json`
   or the web environment's MCP configuration).
2. Record the avatar ID and voice ID in `inventory.md` once the clone is created.

### How to generate
When the Higgsfield MCP tools are available in the session:

1. **Read the vault entry.** Extract the spoken text — strip `(stage directions)`
   and `[ON SCREEN: …]` cues. That stripped text is the input.
2. **List avatars/voices** via the Higgsfield MCP tools to find her cloned
   avatar + voice (match against the IDs in `inventory.md`).
3. **Generate the video** — pass the script text, her avatar ID, her voice ID,
   and 9:16 portrait dimensions.
4. **Poll for completion** and grab the video URL.
5. **Record on the entry** (see "Close the loop" below).

If the Higgsfield MCP tools are not loaded in the current session, fall back
to Engine 2 (HeyGen API).

---

## Engine 2 — HeyGen (API, fallback)

### Setup (one-time)
1. **API key.** HeyGen dashboard → Settings → Subaccount API → create a key.
   Set as `HEYGEN_API_KEY` in env. Never commit it.
2. **Network egress.** Add `api.heygen.com` + `resource.heygen.ai` to
   allowlist (only needed in Claude web sandbox; open on VPS).

### How to generate (HeyGen v2 API)

1. **Read the vault entry.** Extract spoken text (same as above).
2. **List avatars:**
   `curl -sS -H "X-Api-Key: $HEYGEN_API_KEY" https://api.heygen.com/v2/avatars`
3. **List voices:**
   `curl -sS -H "X-Api-Key: $HEYGEN_API_KEY" https://api.heygen.com/v2/voices`
4. **Generate:**
   ```
   POST https://api.heygen.com/v2/video/generate
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
5. **Poll** `GET https://api.heygen.com/v1/video_status.get?video_id=<id>`
   every ~15s until `completed`. On `failed`, log and stop.
6. **Grab `video_url`** from the completed response.

---

## Close the loop (both engines)

Edit the vault entry to add a `**Visual:**` line:

```
**Visual:** Talking-head (<engine>) — avatar <name/id>, voice <name/id>, 9:16, built DD/MM/YYYY.
<video URL>
```

If the entry had a `NEEDS HER FACE` flag, clear it. Update the quick-reference
line at the top of the vault file.

For entries that need the **avatar + AI B-roll** finishing pass, hand the
video URL to `visual-engine`'s Blotato `ai-avatar-broll` template.

---

## `list-avatars` / `list-voices` modes

Fast inspection — print connected avatars / voices from whichever engine is
available. Update `inventory.md` with the chosen IDs.

## After saving

Report: which entry, which engine + avatar + voice used, video URL, whether
it's ready for `distribution` or still needs B-roll wrap.

## What this skill does not do

- Does not present a generic AI avatar as Fatiha (brand-safety rule).
- Does not generate faceless / explainer video — that is Blotato `ai-story-video`.
- Does not publish or schedule — `distribution` does that.
- Does not commit API keys.
- Does not rewrite approved script copy; it only narrates it.
