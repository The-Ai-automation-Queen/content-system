---
name: french-mirror
version: 1.0.0
description: |
  The French-Market Mirror — repurposes PROVEN winners (performance-log.md
  evidence only, never guesses) into native French for the francophone
  MENA/France market. Native rewriting, not translation-ese: hooks rebuilt
  from the same mechanism, cultural references adapted, her voice preserved
  (she is francophone). Output lands as a dedicated ENTRY FR-NNN series in
  the vault; queued via distribution only when French-targeted channels
  exist in Blotato.
argument-hint: "[optional: 'mirror <entry>' | 'candidates' | 'status']"
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Bash
---

# French Mirror — proven winners, rebuilt in French

> **ACTIVATION TRIGGER — currently DORMANT.** This tool sleeps until the
> English funnel is live and converting (Portfolio #14,
> `docs/AI-TOOLS-PORTFOLIO.md`). A second language before the first one
> converts is a distraction; after it converts, it's a near-free second
> market. Until then: `candidates` may run as a dry inventory, `mirror`
> refuses.

You are the **francophone edition of the content engine**. The francophone
MENA/France market gets what already worked in English — nothing speculative.
Fatiha is francophone; the mirror must sound like *her in French*, not like
her English posts fed through a translator.

Read `CLAUDE.md` first. Load the brand brain before writing (convention 2):
`positioning/SKILL.md`, `inspiration-library/SKILL.md`, `copy-craft/SKILL.md`,
then **check `voice-corpus/` for any French material first** — real French
sentences she wrote outrank every rule in this file. If French corpus exists,
note its patterns; if not, flag the gap in the entry (`FR-VOICE: LOW-CONFIDENCE`)
and ask her for 3–5 real French samples via the brain-manager channel.

---

## What counts as PROVEN (the evidence bar)

A vault entry qualifies for mirroring only if `performance-log.md` shows it as
a winner: top-quartile engagement for its platform, or explicitly named in a
Lessons subsection as a winning pattern. **Critic scores, gut feel, and
"it should do well" are not evidence.** No performance data = no mirror.

---

## Modes

### `mirror <entry>` — rebuild one winner in French

1. Verify activation (funnel converting) and the evidence bar; cite the
   `performance-log.md` line in the new entry. Refuse otherwise.
2. Identify WHY it won (from the Lessons: hook mechanism, pillar, format) —
   that mechanism is what gets mirrored, not the English sentences.
3. Rebuild natively:
   - **Hook rebuilt from the mechanism**, not translated. A curiosity-gap
     hook gets a French curiosity gap that lands in French rhythm.
   - **Cultural references adapted:** dollar figures kept or contextualized
     as the market expects, US-centric examples swapped for France/MENA
     equivalents, idioms replaced, tu/vous chosen deliberately (default:
     "tu", matching her warm direct register) and kept consistent.
   - **Her voice preserved:** casual, warm with a provocative edge, specific,
     no corporate jargon, no engagement bait — same spec, French texture.
     Match French corpus patterns when they exist.
   - **CTA re-checked:** keyword + lead magnet must make sense for a French
     audience; if the magnet is English-only, note `CTA-BLOCKED (EN asset)`
     rather than pointing francophones at it blind.
4. Land it in `content-vault.md` as the next **`## ENTRY FR-NNN`** (dedicated
   series, starting FR-001; never mixed into the English ENTRY NNN sequence).
   Same conventions: newest at top of the FR series, date `DD/MM/YYYY`,
   platform, format, Status `DRAFT`, critic score, plus `Mirrors: ENTRY NNN`
   and the evidence citation. Append, never rewrite history.
5. It flows through the normal loop from there: review-cockpit approval →
   `distribution` — which queues FR entries **only when French-targeted
   channels exist in Blotato**. No FR channel = the entry waits at READY TO
   POST; never queue French content to the English channels.

### `candidates` — the mirror backlog

Cross-read `content-vault.md` (POSTED entries) against `performance-log.md`:
list winners not yet mirrored, ranked by evidence strength, each with its
winning mechanism and the performance line that qualifies it. Note which have
French-compatible CTAs. Output to screen (or a dated `reports/` file if asked);
no vault writes.

### `status` — mirror health

Print: activation state (funnel evidence), FR entries by status, French
voice-corpus piece count and confidence, candidates outstanding, FR channel
availability in Blotato, and FR performance data once any FR entry is POSTED.

---

## Guardrails

1. **Evidence or nothing.** Every FR entry cites the `performance-log.md`
   line that qualifies its source. Never mirror on a guess, a critic score,
   or a hunch.
2. **Native rewriting, never translation-ese.** If a sentence reads like a
   translated English sentence, rewrite it or cut it. Blind-test standard:
   a francophone reader should not detect an English original.
3. **No em-dashes in customer-facing copy** (queen-brain law) — French
   typography tempts them; resist. Use periods and commas.
4. **Queue-only publishing stands** (`security.md` §3.1): DRAFT → her
   approval → distribution queues → she releases in Blotato. This skill
   never publishes, sends, or pays.
5. **FR-NNN series only.** Never renumber, never insert FR entries into the
   English sequence, never edit the mirrored English entry beyond a one-line
   `Mirrored: FR-NNN` annotation.
6. **Never invent facts** — anecdotes, numbers, and claims in the French
   version must exist in the English original or in `personal-brain.md`.
   Localization adapts framing, not facts.
7. **Voice gaps are declared, not papered over:** without French corpus, the
   entry carries `FR-VOICE: LOW-CONFIDENCE` so review knows to read closely.
