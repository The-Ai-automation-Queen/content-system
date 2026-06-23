---
name: dm-responder
version: 1.0.0
description: |
  Machine M05 — the monetization engine. Auto-replies to comments and DMs on
  Instagram, Facebook, and YouTube with the matching lead-magnet resource link
  whenever someone comments her CTA keyword (e.g. "STACK", "FOLLOW UP",
  "CLAUDE"). Captures the lead into a logbook. ManyChat handles Instagram;
  Blotato / native APIs handle Facebook + YouTube. This is the difference
  between "reach" and "revenue."
argument-hint: "[setup | list-magnets | log <platform> <keyword> <username>]"
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - AskUserQuestion
---

# DM Responder — Machine M05 (the money engine)

You run the **comment-trigger → DM → resource → email-lead** loop. Reach without
this loop is wasted; every comment-keyword CTA in the vault is a contract with
the audience that the resource will arrive. This skill makes sure it does.

You do not publish content; you reply and capture. Read `CLAUDE.md`,
`positioning/SKILL.md`, and `security.md` first.

---

## The lead-magnet registry (single source of truth)

A registry at `lead-magnets.csv` (repo root) lists every comment-keyword in
play, where it sends them, and which entry/pillar it serves:

```csv
keyword,resource_label,resource_url,pillar,entry_ref,active
STACK,"My 3-tool AI stack short list",https://...,What's Worth It,ENTRY 005,yes
FOLLOW UP,"Lead follow-up setup",https://...,Stop Doing That by Hand,ENTRY 002,yes
TEAM,"How to set up your first AI employee",https://...,The Freedom Business,ENTRY 010,yes
```

Every comment-trigger CTA in `content-vault.md` MUST have a row here. If a
post goes out with a keyword that has no row, this is a leak — flag it loudly.

---

## Operator setup (one-time, per platform)

### Instagram → ManyChat
1. Connect ManyChat to her IG (`@thefatihachikh`).
2. For each active row in `lead-magnets.csv`, create one ManyChat automation:
   - Trigger: "Comment contains exactly `<KEYWORD>`"
   - Action 1: Webhook POST to `https://<her-vps>/dm-webhook` with
     `{username, keyword, ig_post_id}` (the VPS responds with the resource URL)
   - Action 2: DM the user `Voici ta ressource → <resource_url>`
3. Save the ManyChat workspace ID + access token to env (`MANYCHAT_API_KEY`).

(Pattern from Romain's M05: ManyChat handles the IG bot, the webhook into a
small VPS lets you change the resource URL without re-editing every automation.)

### Facebook + YouTube → Blotato or native API
1. Use Blotato's `blotato_list_posts` + comment-poll endpoint (where available),
   OR native APIs:
   - Facebook Pages API: `/{page-id}/feed` comments + `/{comment-id}` reply
   - YouTube Data API v3: `commentThreads.list` + `comments.insert`
2. Set `FB_PAGE_TOKEN` and `YOUTUBE_API_KEY` in env.
3. A cron polls every 5 minutes for new comments matching any active keyword.

### LinkedIn / TikTok / Threads / X
Manual until APIs catch up. The skill logs the missed lead with platform =
`<platform>:manual` so they can be handled by the operator in batch.

---

## The reply protocol

When a comment-keyword fires:

1. **Match** the keyword (case-insensitive, whitespace-trimmed) against active
   rows in `lead-magnets.csv`. If no match, log to `reports/dm-misses-YYYY-MM-DD.md`
   and skip (a typo, or an inactive magnet).
2. **Reply** with the resource URL using the platform's API. Keep the reply
   short and in her voice: e.g. `Voici → <url>` or `Sent! → <url>`.
3. **Capture the lead** by appending to `reports/leads-YYYY-MM.md`:
   ```
   2026-06-23T14:32 | instagram | @username | keyword=STACK | entry=005 | url=...
   ```
4. **Mark the entry** in `content-vault.md` with a `**Leads:**` running count
   on the entry block, so `vault-audit` can report which posts actually converted.

---

## Modes

- `setup` — walk the operator through connecting one platform at a time.
- `list-magnets` — print the active registry as a table.
- `log <platform> <keyword> <username>` — manual logging for platforms without
  API access (so the lead is still captured even when the reply was manual).

---

## After running
- New leads count today.
- Top-converting keyword.
- Any keyword in the vault without a registry row (leak).
- Any platform currently disconnected (needs operator action).

## What this skill does not do
- Does not invent resource URLs — they live in `lead-magnets.csv`.
- Does not store API keys in the repo.
- Does not auto-DM cold (only in response to her published CTA keyword).
- Does not engage in conversation beyond the resource delivery; that is human work.
