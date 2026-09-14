---
name: inbox-to-content
description: |
  Inbox-as-research-anchor pipeline. User drives the topic from her own judgement
  (story, client work, manifesto layer, pain pattern). Skill pulls matching receipts
  from research-inbox to back the claim, then drafts via /write. Inbox is FOOTNOTE,
  never HEADLINE. Use when the user is writing about a specific topic and wants
  evidence from her own collected research to anchor it.
argument-hint: <topic> [--lane Women_Entrepreneurs|Corporate_Teams] [--since YYYY-MM-DD] [--top N]
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Skill
---

# inbox-to-content — Anchor Mode

**Core principle:** the inbox describes what others are saying. The post comes from her judgement. Bot scrapes are footnotes, never the headline. Reverse this and content turns into AI-creator slop — every post sounding like every other AI creator regurgitating the same Anthropic launch.

## Two modes

### Mode A — Anchor (DEFAULT)

User brings the topic. Script pulls inbox receipts that back it.

```bash
py C:\Users\fatih\.claude\skills\inbox-to-content\anchor.py "data privacy"
py C:\Users\fatih\.claude\skills\inbox-to-content\anchor.py "AI literacy" --lane Corporate_Teams
py C:\Users\fatih\.claude\skills\inbox-to-content\anchor.py "agent risk,phishing" --since 2026-04-01
```

The script:
- searches inbox by keyword (title hits weighted 5x, body hits 1x, capped at 10)
- adds bot relevance score
- includes both READY and USED notes (a receipt can anchor more than one post)
- returns ranked list with title, date, lane, URL

### Mode B — Discovery (legacy `pick.py`)

Only when user explicitly says "what's in the inbox?" or "show me what's worth writing about." DO NOT default to this. Most discovery picks turn into derivative tool-review content.

```bash
py C:\Users\fatih\.claude\skills\inbox-to-content\pick.py --top 15
```

---

## Anchor pipeline (always runs in this order)

### Step 1 — Confirm the topic comes from her, not the inbox

Before running anchor.py, verify the topic source. Acceptable sources (in order of preference):

1. **A story she lived** — pull from `STORIES.md`. The post is the story; the inbox backs the wider claim.
2. **Raw business thinking** — pull from `C:\Users\fatih\OneDrive\Obsidian Mind\thinking\Raw Business Thinking.md`.
3. **A pattern she saw three times this week** — DM, client call, comment thread.
4. **A claim from her manifesto** — locked positioning sentence she wants to prove.

If the topic is "let me see what's in the inbox", redirect: "Inbox is footnote source, not headline source. What did a client say this week? What did you decide in the last 7 days? Pick the topic from there, then we pull receipts."

If the user insists on inbox-led discovery, fall through to Mode B but flag the slop risk.

### Step 2 — Load positioning context

Invoke `positioning` skill (loads voice.md, positioning.md, icp.md, anti-ai-writing-style.md, mandatory feedback memories).

Load `STORIES.md` for personal anchors. Load `inspiration-library` for hook patterns.

### Step 3 — Pull receipts

Run `anchor.py` with the topic + filters. Output is the receipt bundle.

### Step 4 — Curate the bundle (this is where judgement happens)

NOT every returned receipt is usable. Drop receipts that:
- Are tool reviews / product launches with no insight
- Repeat what the post already says
- Were last cited in a vault entry under 14 days old (avoid repetition)
- Lack a verifiable stat, quote, or named source

Keep at most 3 receipts per post. More than 3 = link-soup, no narrative.

### Step 5 — Hand to /write

Construct the brief for `/write`:

```
TOPIC: [user's framed topic]
HER ANCHOR: [story / pattern / claim from Step 1]
PLATFORM: [LinkedIn text / IG Reel / X thread / etc.]
LANE: [Women_Entrepreneurs / Corporate_Teams]
RECEIPTS (max 3):
  - [filename] | [one-line claim from inbox note] | [URL]
  - [filename] | [one-line claim] | [URL]
  - [filename] | [one-line claim] | [URL]
HARD RULES: Sterling 3P, hooks from inspiration-library, anti-AI-writing-style, no fabrication
```

Then invoke `/write` (or skill `write`) with the brief.

### Step 6 — Save draft

`/write` saves to `vault\{platform}\` with frontmatter. Add to frontmatter:

```yaml
anchor_topic: [topic]
anchor_source: [STORIES.md entry / thinking note / DM pattern]
inbox_receipts:
  - [inbox-filename-1.md]
  - [inbox-filename-2.md]
```

NOT `source_note:` (singular) — `inbox_receipts:` (list). The post is not FROM one note. It uses several as footnotes.

### Step 7 — Mark inbox notes cited (do NOT mark USED)

For each receipt in the bundle, append to inbox note frontmatter:

```yaml
cited_in:
  - linkedin/091-02-05-2026-data-privacy-vendors.md
```

Status stays READY. A receipt can be cited many times. Use the `mark-cited.py` helper (build below) or edit the frontmatter directly.

---

## What changed vs the old flow

| Old (Discovery) | New (Anchor) |
|---|---|
| Inbox surfaces "what to write about" | User brings what to write about |
| Bot's content_angles section becomes the hook | Hook comes from her voice + her story |
| Notes marked USED on consumption | Notes marked CITED, can be reused |
| Source: single inbox note (`source_note:`) | Sources: multiple receipts (`inbox_receipts:`) |
| Fast, surface, derivative | Slower, judgement-led, hers |

---

## When to invoke

- User names a topic and says "back this with what we have" / "what evidence do we have on X" / "writing about Y, pull receipts"
- After `/last30days` returns sparse — anchor mode pulls richer inbox material
- Before drafting any post that quotes a stat, names a launch, or references industry news

## When NOT to invoke

- One-off post with no need for external receipts → use `/write` directly
- Repurposing existing draft → use `/repurpose`
- Genuine inbox triage / discovery (rare) → use Mode B

---

## Hard rules (anchor mode)

- **Topic comes from her, not inbox.** If you cannot name the story / pattern / claim before pulling receipts, stop.
- **Max 3 receipts per post.** More = AI-creator listicle vibe.
- **Verbs and hooks from her voice library.** Receipts inform, they do not phrase.
- **Never publish a post that is summarised inbox material.** That is the slop trap.
- **Cite, do not consume.** Notes stay READY after cite.

---

## Maintenance

- `anchor.py` — keyword-weighted search, two constants at top (INBOX path, default top N)
- `pick.py` — kept for legacy Mode B (rarely use)
- `mark-used.py` — kept but downgraded; anchor flow uses `cited_in:` field, not USED status
- TODO: build `mark-cited.py` — appends to `cited_in:` list without flipping status. Until then, edit frontmatter manually or via Claude Edit tool.
