# UNB-027 — one-word reply closes this (serve 2, shrunk)

**Execute-only. Zero terminal commands today — just reply with one word.**

## Where this stands

Yesterday's pack gave you three terminal-command options for
`/home/fatiha/content-system-DUPLICATE` (a stale second checkout, 55+ days
behind `main`, nothing unique in it — full detail in
`packs/2026-09-23-UNB-027-delete-duplicate-checkout.md`). It's still sitting
there unchanged this morning. Rather than repeat the same commands, today's
ask is smaller: just tell me which way to go and I'll run it for you.

## Reply with one word

- **delete** — I run `rm -rf /home/fatiha/content-system-DUPLICATE` next
  session and confirm back to you.
- **archive** — I rename it to
  `/home/fatiha/archive-content-system-DUPLICATE-2026-07-30` instead (kept,
  just labeled and out of the way).
- **keep** — tell me why in the same reply; that's a valid answer, it just
  needs to be a decision on record.

## Verify

Next run checks `ls -ld ~/content-system-DUPLICATE` — gone or renamed
closes this out; a "keep" reply with a reason also closes it.
