# research-bot

Telegram → research-inbox capture & analysis bot. Runs on the VPS at
`/root/research-bot/` (entry: `bot.mjs`, config loader: `config.mjs`).

This folder is the **version-controlled home** for that bot so it can be
reviewed, fixed, and recovered — instead of living only on the VPS.

## What it does
1. Listens on Telegram (`@fati_research_bot`) for links the operator forwards.
2. Scrapes the link (Supadata API; X/Twitter via saved `bird` cookies).
3. Analyses it through a provider chain: **Agent OS → Groq → Anthropic Haiku**.
4. Writes a dated `.md` note and commits it to the `research-inbox` repo.

## Config (via `.env` — never committed; see `.gitignore`)
`TELEGRAM_BOT_TOKEN` · `TELEGRAM_CHAT_ID` · `GROQ_API_KEY` ·
`ANTHROPIC_API_KEY` · `SUPADATA_API_KEY` · `GITHUB_TOKEN` · `GITHUB_REPO` ·
`BIRD_COOKIE_PATH` · `REPO_LOCAL_PATH`

## Known issues to fix (2026-07-28)
- **Credit drain:** the `Anthropic Haiku` fallback calls the paid API directly.
  When the free layers (Agent OS / Groq) fail, every link silently bills the
  `sk-ant-` key until the balance is drained. Needs a hard opt-in gate + spend
  cap so it can never silently use paid.
- **`t.co` links:** link-only tweets are scraped as the bare `t.co/…` shortlink
  and never expanded, producing empty "content not provided" notes. Expand the
  redirect before scraping.

## Deploy
Pull this folder onto the VPS and restart the service:
`sudo systemctl restart research-bot` (or however `bot.mjs` is supervised).

## Status of the two known bugs
- ✅ **Credit drain** — FIXED in `analyzer.mjs` + `config.mjs`. The paid Anthropic
  (Haiku) fallback now runs only when `RESEARCH_ALLOW_PAID=1` is set in `.env`
  (default off). With it off, a free-tier outage saves a quiet stub instead of
  billing the `sk-ant-` key.
- ✅ **`t.co` links** — FIXED in `extractors/twitter.mjs` via `expandTco()`, which
  resolves shortlink redirects before analysis.

## Still to add from the VPS (not in this snapshot)
- `context/positioning.mjs` — imported by `analyzer.mjs` (`CONTEXT_VERSION`,
  `POSITIONING_CONTEXT`). Copy it from `/root/research-bot/context/`.
- `package.json` / `package-lock.json` — declares the `simple-git` dependency.
- **Never** commit `.env` or `bird-cookies.json` (already blocked by `.gitignore`).

## Related drain source (separate service)
The `hermes-autonomous-bridge` systemd timer (every 5 min) runs the research
inbox through an Anthropic-powered chain and was the primary credit drain on
2026-07-28. It lives outside this folder and needs the same free-first gate
before being re-enabled.
