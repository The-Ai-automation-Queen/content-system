# M00 — Brain Manager (Cerveau Manager)

## Purpose
Keep the operator's personal brain (`personal-brain.md`) current so every
generated post references her real life, real opinions, and real projects.

## When it runs
- **Daily at 20:00** (VPS cron) — evening, so the operator reflects on the day.
- **On demand** — `/brain-manager` in any Claude Code session.

## Inputs
- `personal-brain.md` (current state)
- Latest `research-notes.md` entry (for timely opinion questions)
- Operator's answers (via AskUserQuestion or Telegram)

## Outputs
- Updated `personal-brain.md` with date-stamped entries

## Validation criteria (for AI delegation)
An update is good if:
1. Every new entry has a date stamp `[YYYY-MM-DD]`
2. Nothing was invented — every entry traces to an operator answer
3. Entries are written in quotable form (not "had an issue" but "spent 3 hours
   debugging a webhook — turned out to be a typo")
4. At least 3 of the 11 categories received an update in the last 7 days
5. No category is >14 days stale

## Common failures
- Operator doesn't respond → skill records "no response" and retries tomorrow
- Generic questions → fix by reading the brain first and asking follow-ups
- Brain file grows too large → archive entries older than 6 months to
  `personal-brain-archive.md` (keep the most recent per topic)

## Decision framework
This machine requires no human validation of output — the operator IS the input.
The AI agent's job is to ask good questions and write the answers faithfully.
