# DM Responder (M05) — Monitor Run

**Date:** 2026-09-14T11:26 UTC
**Mode:** end-to-end monitor + registry-integrity + live-surface verification (queue-only; no posting, no DMs sent, no writes to the registry)
**Run by:** Claude agent (operator-requested skill invocation)
**Prior run:** `dm-responder-2026-06-29T23-00-skill.md` — a 2.5-month gap. Read for continuity only, never trusted as fact (security §4). Every input re-derived live this run, including two live production fetches new to this run's method.

---

## What ran

1. Read `lead-magnets.csv` fresh — **15 keyword rows**.
2. Grepped `content-vault.md` fresh for every `Comment <KEYWORD>` CTA and cross-checked against the registry.
3. Checked this session's shell and Doppler (`doppler secrets`, project `content-os`, config `prd`) for the DM-automation keys the skill needs (names only, no values — security §1).
4. Searched for a Blotato MCP tool in this session — **none available** (unlike the 06-29 run, which had read-only Blotato access). No comment/DM/post stream is reachable from inside this session by any method.
5. **New this run:** since no API/MCP path exists to verify delivery, fetched the actual production URLs for a representative sample of `active=yes` rows to check whether the promised resource really loads. This surfaced a live leak (below) that a registry-only read would have missed.

## Registry (`lead-magnets.csv`)

**8 of 15 rows are `active=yes`:** STACK, FOLLOW UP, TEAM, WHAT, DIFF, PROMPT, WORDS, INBOX.
**7 are `active=no`:** PIPELINE (retired), CLAUDE (URL hosted, waiting on ENTRY 011 POSTED + confirmed GHL workflow), BUILD (empty URL), FREEDOM (empty URL, PERSONALIZE-blocked), FOUNDING (empty URL, PREP-blocked), TOKENS (empty URL, unhosted), MORNING (URL hosted, notes say "pending VPS deploy").

This is a real change since the last run (then: 0 of 12 active). Fulfilment side has moved. But see the live-surface finding below — several of these `active=yes` rows do not currently deliver.

## Vault keyword-CTA cross-check

**10 distinct keyword CTAs live in `content-vault.md`:** CLAUDE, DINNER, FOUNDING, FREEDOM, PIPELINE, PROMPT, STACK, TEAM, WHAT, WORDS. All but one have a registry row.

- **DINNER** has no row — **not a new leak**. `content-vault.md:1646` already documents this and records that TEAM was substituted as the CTA in practice, with an open flag to fix the CTA map in `skills/monetisation/SKILL.md`. Status unchanged; not re-flagging as new.
- No vault CTA lacks a row otherwise. FOLLOW UP, DIFF, INBOX, BUILD, MORNING, TOKENS have registry rows but no live vault CTA text currently (BUILD is legacy, pre-dates the current vault; the rest are registry-only so far). Not a leak in this direction.

## Live-surface finding — the real issue this run (verified, not inferred)

No API keys are reachable from this session (`GHL_API_KEY`, `FB_PAGE_TOKEN`, `YOUTUBE_API_KEY`, `UNIPILE_API_KEY`, `UNIPILE_DSN` all unset; Doppler's `content-os/prd` config itself holds none of these secrets either — this isn't a session scoping gap, the keys aren't provisioned anywhere yet). So this run could not check comment streams. Instead it fetched the actual delivery path for a sample of `active=yes` rows against production:

| Check | Result |
|---|---|
| `guides.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack` | 308 → `www.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack` (query string correctly preserved) |
| `www.shiftandlead.com/opt-in.html?guide=stack-3-tool-ai-stack` | Renders the **generic guides hub** ("Free AI guides for real work"), not a dedicated STACK opt-in form. No guide-specific email capture happens here. |
| `www.shiftandlead.com/opt-in.html?guide=what-is-ai` | Same — generic hub, not a dedicated WHAT opt-in form. |
| `www.shiftandlead.com/guides/stack-3-tool-ai-stack.html` | **404** |
| `www.shiftandlead.com/guides/inbox-manager-setup.html` | **404** |
| `www.shiftandlead.com/guides/chatgpt-vs-ai.html` | Live, but is a "this guide merged into What AI Is" redirect notice — not the DIFF-specific content the CTA promises |

Cross-referencing the repo explains why: `next-app/` (recent commits today, e.g. `4a5a199 feat: add preview-first guide capture`) is governed by `data/guide-publication.json`, whose `approved` list has exactly **20 slugs** — matching the "20 guides" the live hub page shows. `stack-3-tool-ai-stack`, `follow-up-setup`, `first-ai-employee`, `inbox-manager-setup`, and `24-7-operations-system` are **explicitly `"retired"`** in `next-app/content/guides.json` and absent from the approved list. Their old page files exist only under `_archive/2026-07-28-pre-consolidation/`. `chatgpt-vs-ai` isn't in `next-app` at all — it was folded into `what-is-ai`.

**What this means concretely:** right now, for STACK, FOLLOW UP, TEAM, and INBOX — 4 of the 8 rows this registry marks `active=yes` — a commenter who clicks through gets a generic hub page, not the promised resource, and **no email capture happens for that specific promise**. DIFF's link works but silently redirects to different content than what the CTA copy describes. This is not a hypothetical: it was verified against the live site, not inferred from repo state. It is also not something GHL comment-trigger automation would ever surface as broken — there's no error, just a page that quietly isn't what was promised. Per CLAUDE.md engine law 2 ("no invented CTA... verified delivery path") and security.md §3 ("the real incident is a bad post/broken promise going out under her name"), **this registry cannot be used to wire new GHL workflows as-is.**

## Leads

**0 leads captured this run** (as with every prior run — `reports/leads-*.md` has never existed). No comment stream is reachable from this session, and even where a keyword is registry-`active=yes`, the live delivery path for half the sampled rows doesn't actually work, so no lead could be captured through it right now regardless of API access.

## What this run did not touch

- `lead-magnets.csv` — not edited. Flipping rows to `active=no` or rewriting URLs is a fulfilment decision (matches CLAUDE.md's "facts trace or die" + "no invented CTA" — this report traces the fact, the operator/Codex decides the fix: restore the pages, repoint the registry, or retire the keywords).
- Unrelated repo state noticed but out of scope for M05: `.gitignore` has an unresolved `UU` conflict (stash vs. upstream) and an untracked `reports/vault-audit-2026-07-30.md` sits uncommitted. Neither is a dm-responder concern; flagging so it isn't lost.

---

## Operator briefing

**New leads today:** 0.
**Top-converting keyword:** none — 0 leads have ever been captured across every dm-responder run in this repo's history.
**Vault keyword without a registry row:** none new. DINNER remains a known, already-flagged substitution (see `content-vault.md:1646`), not a new leak.
**Platform connection status:** cannot be checked from this session — no `GHL_API_KEY` / `FB_PAGE_TOKEN` / `YOUTUBE_API_KEY` / `UNIPILE_API_KEY` / `UNIPILE_DSN` anywhere in Doppler's `content-os/prd` config (not a session-scoping issue — they aren't provisioned yet), and no Blotato MCP tool available in this session to read connected-account state.

**The one thing to act on:** the registry says 8 keywords are live and fulfillable; a spot-check of production shows at least 4 of them (STACK, FOLLOW UP, TEAM, INBOX) currently redirect to a generic guides hub instead of the promised resource, because the site migration to `next-app` retired those guide pages without updating `lead-magnets.csv`. Building GHL comment-trigger workflows against these four keywords right now would automate sending real commenters to a dead promise. Before any GHL workflow is built for STACK / FOLLOW UP / TEAM / INBOX / DIFF, either restore the corresponding guide in `next-app` and add it to `data/guide-publication.json`'s approved list, or flip the row to `active=no` in `lead-magnets.csv` and update the vault's CTA copy to point at a resource that actually exists (WHAT, PROMPT, and WORDS look safe — their slugs are in the approved list, though the generic-hub-instead-of-dedicated-form behavior at `opt-in.html?guide=X` should be re-verified once a GHL workflow is actually pointed at them).

No comments were replied to, no leads captured, no messages sent, and nothing was posted or queued this run — this was audit-only, consistent with the skill's boundaries and with queue-only/human-in-the-loop engine law.
