---
name: review-cockpit
version: 1.0.0
description: |
  The Morning Review Cockpit — turns the operator's daily review duty into a
  5-minute phone ritual. Every morning it sends the overnight drafts to
  Telegram as numbered cards (hook, pillar, platform, critic score) for
  one-tap approve / edit-by-voice-note / kill. Replies are processed twice a
  day and written back to the vault (READY TO POST / KILLED), with every
  decision logged as future training data for the Taste Clone. Also acts as
  the estate's Telegram inbox router: unblocker replies and brain-material
  voice notes get routed to their machines.
argument-hint: "[optional: 'digest' (default) | 'process' | 'status']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
---

# Review Cockpit — the 5-minute morning ritual

You are the **human interface of the content machine**. The engine drafts 5
scripts overnight; nothing moves until Fatiha reviews them. Before this skill,
review meant opening a repo and a dashboard. Now it means reading a Telegram
thread over coffee and tapping replies.

Read `CLAUDE.md` first. Portfolio context: `docs/AI-TOOLS-PORTFOLIO.md` (#2).

**Locked config:** Telegram (shared bot, `deploy/.env`) · digest @ 07:30 GST ·
process @ 12:30 + 20:30 GST · decisions logged for the Taste Clone (#7).

---

## Modes

### `digest` (default) — the morning cards, 07:30

1. First run a `process` sweep (catch overnight replies).
2. Collect reviewables from `content-vault.md`:
   - all entries at `DRAFT` (newest first — the 02:30 batch leads)
   - a one-line footer on queue state: counts of READY TO POST / SCHEDULED,
     from the vault + latest `reports/distribution-*.md`
3. Send ONE Telegram thread (direct API `sendMessage`, HTML mode — not
   `telegram-notify.sh`, which is single-line): a header message, then one
   compact card per entry:

   > **#1 · LinkedIn · Time Wins · critic 8.2**
   > "You don't need 10 AI tools. You need one that runs while you sleep."
   > _Story post: the 2am webhook typo anecdote → first-automation CTA (STACK)_

   Card = number, platform, pillar, critic score, the hook verbatim, one-line
   summary + CTA keyword. Max 6 cards per day; older DRAFTs rotate in as
   slots free up (never dump the backlog on her).
4. Footer with the reply protocol:
   > Reply: `1✅ 3✅` approve · `2❌` kill (add a word why, it teaches me) ·
   > reply to a card with a 🎙 voice note or text to edit it · `all✅`
5. Record the served card list + message ids in `review-cockpit/state.md`
   (card number → vault ENTRY NNN mapping, current getUpdates offset).

### `process` — apply the replies, 12:30 + 20:30

1. Fetch new bot updates (`getUpdates` with the stored offset; update the
   offset in `review-cockpit/state.md` after consuming).
2. **Route each message** (this skill is the estate's single inbox consumer):
   - Card decisions (`1✅`, `all✅`, `2❌`, reply-to-card edits) → handle here.
   - Unblocker replies (✅/🔁/✂️/❌ with no card number, or replying to the
     08:00 butler message) → apply to `unblocker/ledger.md` per that skill's
     rules (done → write-back; swap/split/kill → update status + note).
   - Voice notes / free text that isn't a review decision → brain material:
     run the `brain-manager listen` procedure on it.
3. **Apply decisions to the vault** (`content-vault.md`, conventions apply —
   dates DD/MM/YYYY, append don't rewrite history):
   - ✅ → Status `READY TO POST`. Run the monetisation CTA check (keyword
     present + lead magnet live in `lead-magnets.csv`?) — if the keyword's
     magnet isn't live, keep the approval but add a `CTA-BLOCKED` note so
     `distribution` skips it (never queue a dead keyword).
   - ❌ → Status `KILLED` + her reason verbatim if given.
   - 🎙/text edit → transcribe voice (see Transcription below), apply the
     edit to the entry **preserving her words wherever possible** (her edit
     text outranks the draft), re-score with the content-engine critic,
     Status `READY TO POST`.
4. **Log every decision** to `review-cockpit/decisions-log.md` (append-only —
   this is the Taste Clone's training data):
   `[YYYY-MM-DD] ENTRY NNN · {approved|edited|killed} · pillar · hook-pattern ·
   critic-score · {edit diff summary | kill reason | –}`
5. Confirm back in ONE short line: "Done: 3 ready, 1 killed, 1 edited and
   ready. 2 waiting on you." Gentle, no nagging.

### `status`

Print: DRAFTs awaiting review (+ age), decisions this week by type, approval
rate, oldest unreviewed entry, decisions-log size (Taste Clone readiness).

---

## Transcription (voice notes)

Dual-path, same as the estate's style:
1. **Local (VPS):** `getFile` → download the `.oga` → transcribe with a local
   whisper (`faster-whisper` or `whisper` CLI; one-time
   `pipx install faster-whisper` on the VPS).
2. **Fallback:** if no transcriber is available, reply kindly: "Got your voice
   note but I can't transcribe here yet — mind sending it as text this once?"
   Never guess at audio content.

---

## Guardrails

1. **Queue-only publishing stands** (`security.md` §3.1) — approve makes an
   entry READY TO POST; `distribution` queues it; she releases in Blotato.
   The cockpit never publishes.
2. **Never invent an edit.** Her voice note is the instruction; ambiguity →
   ask in the confirmation line, don't guess.
3. **Decisions log is append-only** and stays in the repo (it's brand data,
   not secrets).
4. **Max 6 cards per digest.** Overload is how review habits die.
5. **One confirmation message per process run.** No chattiness.
