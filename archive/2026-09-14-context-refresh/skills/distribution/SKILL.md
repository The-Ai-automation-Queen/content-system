---
name: distribution
version: 1.0.0
description: |
  The publishing back-half of Fatiha Chikh's Business OS — the layer the system
  was missing. Takes READY TO POST entries from the content vault and pushes them
  into the Blotato SCHEDULING QUEUE across her connected platforms (LinkedIn,
  Instagram, Facebook, YouTube, Threads, Twitter/X), then records the result back
  in the vault. It does NOT publish instantly: every post is scheduled into the
  Blotato queue for the operator to review and release in the Blotato dashboard.
  Use after content-engine + visual-engine have produced post-ready entries, or
  when the operator says "queue the backlog."
argument-hint: "[optional: an ENTRY number, a platform, or 'backlog' (default: queue all READY TO POST)]"
allowed-tools:
  - Read
  - Edit
  - Grep
  - AskUserQuestion
  - mcp__Blotato__blotato_get_user
  - mcp__Blotato__blotato_list_accounts
  - mcp__Blotato__blotato_create_post
  - mcp__Blotato__blotato_create_visual
  - mcp__Blotato__blotato_create_presigned_upload_url
  - mcp__Blotato__blotato_get_post_status
  - mcp__Blotato__blotato_list_schedules
  - mcp__Blotato__blotato_get_schedule
  - mcp__Blotato__blotato_update_schedule
---

# Distribution — the publishing queue

You are the distribution layer. You move finished content out of the vault and into
the **Blotato scheduling queue**, then write the outcome back into the vault so the
loop is closed and auditable. Read `CLAUDE.md` and `security.md` first.

> **Autonomy policy (set by the operator):** *schedule to the Blotato queue.* You
> **never** publish instantly. Every post is created with a future `scheduledTime`
> (or added to a Blotato schedule) so it lands in the queue. The operator reviews
> and releases it inside Blotato. If you cannot set a scheduled time, **stop and
> ask** — do not fall back to immediate posting.

---

## Before you queue anything

1. **Read `security.md`** — brand-safety gate. A bad post under her name is the real
   incident. If an entry is still flagged `⚠️ PERSONALIZE`, `[VERIFY]`, or `PREP`
   in the vault, **do not queue it.** List it as blocked and move on.
2. **Verify the connection:** call `blotato_get_user` (subscription active?) then
   `blotato_list_accounts` to get the live `accountId` + `requiredFields` for each
   platform. Never hardcode account IDs — they can change.
3. **Read `content-vault.md`** to select what to queue (see Inputs).
4. Confirm there is a brand brain match: the entry must already carry a Critic score
   ≥ 8.0 and a `READY TO POST` status. You distribute; you do not re-edit voice.

---

## Inputs

- **`backlog`** (default): queue every `READY TO POST` entry that has **no blocking
  flag** (`PERSONALIZE` / `VERIFY` / `PREP`).
- **An ENTRY number** (e.g. `008`): queue just that one.
- **A platform** (e.g. `linkedin`): queue ready entries targeted at that platform.

**Hard status rule (added 14/07/2026):** only the literal status `READY TO POST`
is queueable. Entries at `KILLED`, `SUPERSEDED BY ENTRY NNN`, `BLOCKED`, or
`STALE` are operator declines or expiries — never queue them, even when named
explicitly by ENTRY number; report the status instead. If the operator kills a
`SCHEDULED` entry (via review-cockpit or directly), remove it from the Blotato
queue the same run and log the removal in the distribution report.

If more than ~5 entries are ready and unblocked, ask the operator once (with
`AskUserQuestion`) how many to queue and the scheduling window, then proceed.

---

## Connected platforms (live as of 2026-06-23 — always re-check with list_accounts)

| Platform | accountId | Required fields | Vault format that maps here |
|---|---|---|---|
| LinkedIn | 16438 | optional `pageId` for company page | LinkedIn text / carousel |
| Instagram | 52579 | `mediaType`: `reel` or `story` | Short-form video / carousel |
| Facebook | 24785 | `pageId` 482165944989431 | repurpose of LinkedIn/IG |
| YouTube | 31843 | `title`, `privacyStatus`, `shouldNotifySubscribers` | Short-form video (Shorts) |
| Threads | 5509 | — | short text / repurpose |
| Twitter/X | 15654 | — | short text / repurpose |

> **Known gaps (flag, don't fix silently):** there is **no TikTok account
> connected** even though the positioning wants TikTok — note this in the run
> report.

---

## How to queue one entry

1. **Map the entry to platform(s).** Each vault entry names its platform. For
   short-form video, the primary is Instagram Reels / YouTube Shorts; you may also
   queue a repurposed text version to Threads/Twitter/LinkedIn if the entry has a
   companion caption. One `create_post` call per platform.
2. **Handle media.** If the entry needs an image/video/carousel asset:
   - If `visual-engine` already produced the asset and left a path/URL in the entry,
     upload it via `blotato_create_presigned_upload_url` (then attach the returned
     media URL), or use `blotato_create_visual` where appropriate.
   - If no asset exists yet and the platform requires media (Instagram, YouTube),
     **do not queue** — mark the entry `NEEDS VISUAL` and report it. Text-only
     platforms (LinkedIn, Threads, Twitter, Facebook) can queue without media.
3. **Set the schedule.** Always pass a future `scheduledTime`. Default spacing:
   one post per platform per day, starting next business day, 1 PM in the
   operator's timezone (Dubai, GST) unless told otherwise — this mirrors the
   Allie K. Miller fixed-time cadence in the inspiration library. Stagger
   multi-platform versions of the same piece by a few hours, do not fire them
   simultaneously.
4. **Call `blotato_create_post`** with the account's required fields, the caption/
   body, any media, and the `scheduledTime`.
5. **Confirm** with `blotato_get_post_status` (or `list_schedules`) that it landed
   in the queue.

Never strip hashtags, CTAs, or the comment-trigger lines — they are part of the
approved draft. Adapt only the per-platform mechanics (mediaType, title, pageId).

---

## Write the outcome back to the vault (closes the loop)

For each entry you queued, edit its block in `content-vault.md`:

- Change **Status** from `READY TO POST` to `SCHEDULED` (queued, awaiting operator
  release in Blotato) — or `POSTED` only once the operator confirms release.
- Append a `**Distribution:**` line: `Queued to Blotato <DD/MM/YYYY HH:MM GST> →
  [platforms] | Blotato post id(s): … | status: scheduled`.
- Update the quick-reference line at the top of the file to the new status.

Do **not** renumber or delete entries. Add the new status flow value `SCHEDULED`
between `READY TO POST` and `POSTED`.

---

## Audit trail (required by security.md §5)

Write one dated record per run to `reports/distribution-YYYY-MM-DD.md` listing:
every entry queued, the platforms, the scheduled times, the Blotato post IDs, and
anything blocked (and why). This is the external-action log — never skip it.

---

## The operator briefing

End with a tight summary:
- what was queued, to which platforms, scheduled for when
- what was **blocked** and why (PERSONALIZE/VERIFY/PREP/NEEDS VISUAL)
- the TikTok gap / IG handle mismatch if still unresolved
- the one next action (usually: "open Blotato, review the queue, release")

## What this skill does not do

- Does not publish instantly — queue/schedule only, operator releases.
- Does not queue entries with unresolved PERSONALIZE / VERIFY / PREP flags.
- Does not edit the voice or content of an approved draft.
- Does not invent media; if a required visual is missing it marks NEEDS VISUAL.
- Does not hardcode account IDs — always reads them live from Blotato.
