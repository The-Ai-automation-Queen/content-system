# AI Insider Brief — Deploy Notes (2026-07-08 pipeline fix)

This covers the pipeline-only fix landed in `ai-insider-brief/ai-insider-brief/pipeline/`
and the two files above it (`prompts.mjs`, `synthesizer.mjs`, `sources.json`,
now deleted from the top level — see below). It does not touch the frontend
(`index.html`, `app.js`, `styles.css`, `data/`) — that is owned by a separate
pass.

## What changed

1. **Orphaned strict pipeline merged in.** Three files were sitting directly
   under `ai-insider-brief/ai-insider-brief/` (not `pipeline/`) and were never
   imported by `run.mjs` or `approval-bot.mjs`:
   - `prompts.mjs` — had a hard AI-relevance gate on the filter prompt and a
     three-part hard test before a card could carry an ACT verdict.
   - `synthesizer.mjs` — had `enforceActIntegrity()`, a code-level (not just
     prompt-level) check that demotes a fake ACT to WATCH.
   - `sources.json` — 0 bytes, dead.

   These are now **merged into `pipeline/prompts.mjs` and
   `pipeline/synthesizer.mjs`** (the files `run.mjs`/`approval-bot.mjs`
   actually import), keeping the strict rules from the orphaned copies. The
   category name is standardized to `"Healthcare"` everywhere (the orphaned
   copies said `"Health"`; the wired-in copies already said `"Healthcare"`).
   `weekly-audit.mjs`'s expected-category list, `pipeline/sources.json`'s
   `category_affinity` entries, and `newsletter-sender.mjs`'s `categoryColor`
   map were all updated to match.

   The three top-level orphaned files were **deleted** (not converted to a
   pointer stub) — their content now lives entirely in `pipeline/`, and they
   are recoverable from git history if ever needed.

2. **Scraping quality (`pipeline/crawler.mjs`)**:
   - `MAX_CONTENT_CHARS` raised from 500 to 4000. At 500 chars, every card
     was synthesized from a truncated lede, not the article.
   - New `extractArticleText()`: strips `<script>/<style>/<nav>/<header>/<footer>`,
     then prefers `<article>...</article>`, then `<main>...</main>`, then
     falls back to every `<p>` in the document. Dependency-free (regex only,
     same style as the rest of the crawler).
   - Dedupe now also excludes `source_url`s already sitting in
     `cards-pending.json` (previously only checked published `briefs.json`,
     so an unapproved card got re-fetched and re-queued every 12 hours).
   - Cross-source near-duplicate detection: normalizes titles (lowercase,
     strips punctuation/stopwords) and drops later duplicates by
     Jaccard/containment overlap (threshold 0.6) after tier-sorting, so the
     tier-1 source's copy of a wire story survives.
   - Tier now matters at the gate, not just the sort: the AI-keyword gate
     (`AI_PATTERN`) applies to every tier-2 source regardless of its
     `ai_filter` flag, not only to sources explicitly marked `ai_filter: true`.
   - Tier-2 items are capped at 40% of `MAX_CARDS_PER_RUN` per run
     (`capTier2Items()`), so one noisy tier-2 feed cannot crowd out tier-1
     signal.

3. **Provider sanity (`pipeline/config-loader.mjs`, new)**: `run.mjs` and
   `approval-bot.mjs` each used to load exactly one env file — whichever of
   `[ENV_PATH, /root/ai-insider-brief-pipeline/.env, C:\Secrets\..., config.env]`
   existed first — and use only that. On the VPS, the deployment secrets
   file (`.env`) exists and "won," but was never meant to carry
   `LLM_PROVIDER`/`GEMINI_MODEL` (those live in the repo-committed
   `config.env`). Result: silent fallback to Ollama `qwen2.5:3b` even though
   `config.env` says `LLM_PROVIDER=gemini`.

   Fix: `config-loader.mjs` loads `config.env` as the **base layer**, then
   layers the deployment secrets file **on top**. Secrets win key-by-key,
   but any key the secrets file doesn't set falls through from `config.env`.
   Both `run.mjs` and `approval-bot.mjs` call the same
   `loadMergedConfig()` / `resolveLLMConfig()` and log which files were used
   and which provider/model was chosen, at startup.

4. **Newsletter CTA (`pipeline/newsletter-sender.mjs`)**: one CTA block added
   at the end of the email, after the cards and before the sign-off:
   a line in Fatiha's voice, a "See Fast Forward" button
   (`https://www.shiftandlead.com/fast-forward.html?utm_source=brief&utm_medium=email&utm_campaign=insider-brief`),
   and a smaller secondary line to the free guides
   (`https://guides.shiftandlead.com/?utm_source=brief&utm_medium=email&utm_campaign=insider-brief`).
   Rest of the email template is unchanged.

5. **Human-release send flow (`pipeline/approval-bot.mjs`,
   `pipeline/tuesday-preview.mjs`, new)**: `newsletter-sender.mjs` was
   refactored to export `getConfig`, `selectCards`, `buildSubject`,
   `buildEmailHTML`, `sendBroadcast` (its `main()` only runs when the file is
   executed directly — importing it no longer triggers a CLI run).
   `approval-bot.mjs` now has a `/preview` command and a cron-fired trigger
   file (`tuesday-preview.mjs` writes it, the bot polls for it every ~10s,
   same pattern as its existing pending-card poll) that build the exact
   Tuesday send (subject, card count, first 5 headlines) using
   `newsletter-sender`'s own selection logic, and post it to the authorized
   Telegram chat with two buttons: **Send to subscribers** / **Skip this
   week**. Only tapping Send calls `sendBroadcast()` (the same Kit API call
   `newsletter-sender.mjs weekly` would make); the result (Kit broadcast ID,
   or the error) is reported back into the same Telegram message. Nothing
   sends on its own — this is Constitution Law 11 / Engine Law 1 (agents
   queue, a human releases) applied to the one machine that could otherwise
   email real subscribers unattended.

   Caveat: the Send/Skip button cache is in-memory, keyed by Telegram
   message ID. If the bot process restarts between the preview and the
   button tap, the cache is gone and the button replies "preview expired,
   run /preview again" rather than risk sending stale or wrong data.

6. **Cron** (`deploy/crontab.example`, additive only): a new commented block,
   "AI Insider Brief (runs on the brief VPS, not the estate VPS)," with four
   lines — crawl+synth every 12h, health-check hourly, weekly-audit Sunday
   05:00, tuesday-preview Tuesday 05:30 GST. Nothing existing in that file
   was touched.

   `scheduler.config.json` (repo root) was **not** touched. Its schema is a
   `loops[]` array of `{ name, skill, cron, ... }` entries meant for the
   estate VPS's `/skill-name` machines run through `run-machine.sh`. The
   Insider Brief pipeline runs plain `node` scripts on a **separate** VPS and
   isn't a `/skill`, so there's no field in that schema to hang these cron
   lines on without stretching its meaning. `deploy/crontab.example` is the
   correct and sufficient place for it, per the same file's own comment that
   it's the source of truth for cadence.

## Redeploying on the brief VPS

The brief VPS (`root@187.77.153.212` per `CONTEXT.md`) keeps frontend and
pipeline in separate directories, flattened (no nested `pipeline/` folder on
the VPS itself):

| Repo path | VPS path |
|---|---|
| `ai-insider-brief/ai-insider-brief/index.html`, `app.js`, `styles*.css`, `data/`, images | `/var/www/ai-insider-brief/` |
| `ai-insider-brief/ai-insider-brief/pipeline/*` (contents, flattened) | `/root/ai-insider-brief-pipeline/` |

To redeploy this fix:

1. `git pull` this repo path on the VPS (wherever it's checked out), or `scp`
   the changed files directly. Changed/added files, all under
   `ai-insider-brief/ai-insider-brief/pipeline/`:
   `prompts.mjs`, `synthesizer.mjs`, `crawler.mjs`, `run.mjs`,
   `approval-bot.mjs`, `newsletter-sender.mjs`, `weekly-audit.mjs`,
   `config.env`, `config-loader.mjs` (new), `tuesday-preview.mjs` (new).
   Copy each into `/root/ai-insider-brief-pipeline/` (flattened, replacing
   the old copy of the same name).
2. Confirm `/root/ai-insider-brief-pipeline/.env` (the deployment secrets
   file, never in git) has `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
   `GEMINI_API_KEY`, `KIT_API_SECRET`, `KIT_DAILY_TAG_ID` /
   `KIT_WEEKLY_TAG_ID`. It does NOT need to set `LLM_PROVIDER` or
   `GEMINI_MODEL` — those now come from `config.env` unless you deliberately
   override them here.
3. Install the updated cron block from `deploy/crontab.example` (the "AI
   Insider Brief" section near the end) into the brief VPS's crontab —
   adjust the `cd /root/ai-insider-brief-pipeline` paths only if you deploy
   somewhere else:
   ```
   0 */12 * * *  cd /root/ai-insider-brief-pipeline && node run.mjs >> /var/log/insider-brief-pipeline.log 2>&1
   0 * * * *     cd /root/ai-insider-brief-pipeline && node health-check.mjs >> /var/log/insider-brief-health.log 2>&1
   0 5 * * 0     cd /root/ai-insider-brief-pipeline && node weekly-audit.mjs >> /var/log/insider-brief-audit.log 2>&1
   30 5 * * 2    cd /root/ai-insider-brief-pipeline && node tuesday-preview.mjs >> /var/log/insider-brief-preview.log 2>&1
   ```
4. Restart the persistent approval bot process (`pm2 restart insider-brief-bot`
   or equivalent) so it picks up the new `approval-bot.mjs`,
   `newsletter-sender.mjs`, and `config-loader.mjs`. Confirm the startup log
   shows `[BOT] LLM: Gemini (gemini-2.0-flash)` — if it still says Ollama,
   `GEMINI_API_KEY` is missing from the secrets file.
5. Run `node run.mjs` once by hand and check the log for `[LLM] Using
   Gemini (...)`, then send `/preview` to the bot's Telegram chat by hand to
   confirm the Send/Skip buttons appear before trusting the Tuesday cron.

## Required environment (VPS secrets file, never committed)

| Variable | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Approval bot auth + the authorized chat that can approve cards and tap Send/Skip. |
| `GEMINI_API_KEY` | Required whenever `LLM_PROVIDER=gemini` (set in `config.env`). |
| `KIT_API_SECRET` | Kit (ConvertKit) broadcast API — required for any send, including the Tuesday button. |
| `KIT_DAILY_TAG_ID`, `KIT_WEEKLY_TAG_ID` | Kit subscriber tag IDs. Created by `node setup-kit.mjs` once, then pasted into the secrets file. |
| `OLLAMA_URL`, `OLLAMA_MODEL` | Only read if Gemini is genuinely unconfigured (fallback path). |

`config.env` (committed, VPS-facing defaults) already sets `LLM_PROVIDER=gemini`,
`GEMINI_MODEL=gemini-2.0-flash`, and the absolute VPS paths for briefs/state/
sources/pending/preview-trigger. Do not duplicate those in the secrets file
unless intentionally overriding one.

## 5-step relaunch checklist

1. Confirm `config.env` and the VPS secrets file are both in place, and a
   manual `node run.mjs` logs `[LLM] Using Gemini (gemini-2.0-flash)`.
2. Confirm `node weekly-audit.mjs` runs clean (no dead feeds beyond what's
   expected, filler percentage sane, no empty verticals worth worrying about).
3. Approve a small batch of cards by hand through the existing Telegram
   approve/edit/reject flow until `briefs.json` has real cards for this week.
4. Install the four cron lines above and restart the approval bot (pm2), and
   confirm `/preview` in Telegram returns a correct subject line and card
   count before the real Tuesday.
5. **The first Tuesday send happens only via the Telegram Send button.** Do
   not run `node newsletter-sender.mjs weekly` by hand for the relaunch —
   let `tuesday-preview.mjs` (cron) → the bot's preview message → your own
   tap on "Send to subscribers" be the actual release, so the human-release
   law is exercised end to end before it becomes routine.
