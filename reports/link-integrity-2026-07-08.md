# Link integrity + retired-store cleanup — 2026-07-08

Scope: `main-site/`, `site/` (incl. `site/guides/`), `ai-insider-brief/`, `site/opt-in.html`
inside `content-system/` only. Nav and footer markup deliberately left alone
(deferred to Phase 4, estate-wide nav/footer unification).

## TASK A — retired links to store.html / products/*.html

### Body links repointed (store.html -> fast-forward.html), with surrounding copy rewritten

| File:line | Old target | New target | Note |
|---|---|---|---|
| `main-site/index.html:324` (ladder card) | `store.html` | `fast-forward.html` | Card retitled "Fast Forward", copy rewritten to say the prompt packs/playbooks now ship inside the course |
| `site/time-audit.html:189` | `https://www.shiftandlead.com/store.html` | `https://www.shiftandlead.com/fast-forward.html` | "paid AI Time Audit is coming to the Store" -> "now ships inside Fast Forward, the course" |
| `site/guides/chez-kimi.html:406` | store.html | fast-forward.html | Judge's Prompts CTA rewritten, "42 verification prompts" (fact sourced from `main-site/fast-forward.html:304`) |
| `site/guides/chez-openai.html:389` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-meta-ai.html:427` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-deepseek.html:416` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-grok.html:458` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-mistral.html:432` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-copilot.html:391` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chez-manus.html:379` | store.html | fast-forward.html | same rewrite pattern |
| `site/guides/chatgpt-vs-ai.html:334` | store.html | fast-forward.html | same rewrite pattern (lead-text + link variant) |
| `site/guides/ai-jargon-guide.html:388` | store.html | fast-forward.html | same |
| `site/guides/what-is-ai.html:351` | store.html | fast-forward.html | same |
| `site/guides/what-is-agentic.html:414` | store.html | fast-forward.html | same |
| `site/guides/chez-claude.html:459` | store.html | fast-forward.html | same |
| `site/guides/chez-gemini.html:404` | store.html | fast-forward.html | same (kept the preceding "Google AI Principles" sentence intact) |
| `site/guides/what-is-a-prompt.html:368` | store.html | fast-forward.html | same |
| `site/free-resources.html:701` (cta-card "Browse the Store") | store.html | fast-forward.html | Card retitled "Fast Forward", copy rewritten (paired with the price-anchor fix in TASK B, same card) |

That is 15 guide files + 3 landing-page cards = 18 body-link repoints, all pointing purchase-style
CTAs at `https://www.shiftandlead.com/fast-forward.html` and rewriting the sentence so it states
the Judge's Prompts / Prompt Menu / Time Audit are no longer sold separately, they ship inside
Fast Forward.

### Nav/footer occurrences — deferred to Phase 4 (not touched)

Every one of these is inside a `<nav class="nav">`/`.nav-links` block or a `.footer-link` block:

- `main-site/index.html:190` (nav), `:387` (footer)
- `main-site/work-with-fatiha.html:69` (nav — the only store.html hit in this file; no body hit, so nothing for TASK A to do here)
- `site/about.html:72`, `site/99.html:121`, `site/privacy.html:42`, `site/free-resources.html:236` (nav), `:729` (footer)
- `site/guides/*.html` nav-links line in all 15 guide files that carry the shared nav (chez-kimi, chez-openai, chez-meta-ai, chez-deepseek, chez-grok, chez-mistral, chez-copilot, chez-manus, chatgpt-vs-ai, ai-jargon-guide, what-is-ai, what-is-agentic, chez-claude, chez-gemini, what-is-a-prompt) plus inbox-manager-setup.html:123, follow-up-setup.html:124, first-ai-employee.html:124, stack-3-tool-ai-stack.html:124 (nav only, no body CTA in these four)
- `ai-insider-brief/ai-insider-brief/index.html:140` (nav)

All left byte-for-byte unchanged, per instructions not to edit nav/footer markup this pass.

### Left alone deliberately (in the "do not touch" list)

- `main-site/store.html:15,18` and `site/store.html:5,6` — store.html itself (og:url/canonical/meta-refresh of the retired store holding pages). Not touched.
- `main-site/products/judges-prompts.html`, `main-site/products/prompt-menu.html`, `main-site/products/time-audit.html`, `site/products/judges-prompts.html`, `site/products/prompt-menu.html`, `site/products/time-audit.html` — the product stub redirects. Confirmed all six already meta-refresh + canonical to `https://www.shiftandlead.com/fast-forward.html`. Not touched.
- `fast-forward.html` itself. Not touched.

### Flagged for a decision, not edited

- `site/guides/voice-clone-pipeline.html:5-6` — a killed-product guide page (Voice Clone Pipeline, killed 06/07/2026 per `fast-forward/CLAUDE.md`) that meta-refreshes to `https://www.shiftandlead.com/store.html`. It is structurally identical to the `products/*.html` stubs (empty body, redirect-only) but sits in `site/guides/`, not `site/products/` or `main-site/products/`, and was not named as a hotspot in my brief. Since store.html still resolves (now a noindex holding page, not a 404), this is not a broken link, just a stale destination. I left it untouched rather than guess at intent; recommend Phase 4 (or whoever owns killed-SKU cleanup) decide whether it should now point at `fast-forward.html` instead, matching the other stubs.
- `ai-insider-brief/ai-insider-brief/CONTEXT.md:97` — internal markdown documentation mentioning store.html, not customer-facing HTML. Left as historical context, not edited.

## Broken internal links (404 candidates)

Wrote a small script that resolves every `href="*.html"` (relative, non-external) in every
`.html` file under `main-site/` and `site/` against the filesystem. **Result: zero broken
internal links.** Every local `.html` href in both roots resolves to a real file.
`ai-insider-brief/` has no local relative `.html` hrefs (its nav links to the two site roots are
absolute URLs pointing at pages confirmed to exist: `free-resources.html`, `99.html`,
`about.html`, `store.html`).

## TASK B — cheap-coded language and price-anchor cleanup

| File:line | Before (abbrev.) | After (abbrev.) |
|---|---|---|
| `site/free-resources.html:574` | "the dirt-cheap open-source kitchen from China" | "the open-source kitchen from China" |
| `site/free-resources.html:576` | "Check the cheap menu →" | "See the menu →" |
| `site/free-resources.html:700-701` (cta-card) | "starting at $19: prompt packs... Browse the Store" -> store.html | Fast Forward card, no price, links to fast-forward.html (see TASK A table) |
| `site/opt-in.html:356` | "the Paris kitchen, at $14.99/mo" | "the Paris kitchen, mapped clean" |
| `site/opt-in.html:361` | "Where $14.99/mo lands compared to the rest of the menu" | "Where Mistral Pro lands compared to the rest of the menu" |
| `site/opt-in.html:367` | "the dirt-cheap open-source kitchen from China" | "the open-source kitchen from China" |
| `site/guides/chez-deepseek.html:236` | "fast and dirt cheap for everyday orders" | "fast and low cost for everyday orders" |
| `site/guides/chez-deepseek.html:278` | "fast and incredibly cheap" (V4 Flash) + "10 to 100x cheaper per token" | "fast and low cost" + "priced 10 to 100 times lower per token" (extra line, adjacent to the named ~282 hotspot, same register) |
| `site/guides/chez-deepseek.html:282` | "fast, cheap, the default model" | "fast, low cost, the default model" |
| `site/guides/chez-deepseek.html:299` | "extremely cheap, switch in minutes" | "low cost, switch in minutes" |
| `site/guides/chez-deepseek.html:351` | pull-quote "DeepSeek is 10 to 100x cheaper per token" | "DeepSeek costs 10 to 100 times less per token" |
| `site/guides/chez-deepseek.html:391` | "Wholesale ingredients, dirt cheap" | "Wholesale ingredients, low cost" |
| `site/guides/chez-deepseek.html:459` | "the cheapest serious coding API" | "the lowest cost serious coding API" |
| `site/guides/chez-deepseek.html:460` | "the cheapest reasoning and coding API on the market" | "the lowest cost reasoning and coding API on the market" |
| `site/guides/chez-deepseek.html:463` | "Wholesale, very cheap" | "Wholesale, low cost" |
| `site/guides/chez-deepseek.html:464` | "still cheap" / "still dramatically cheaper than Western premium models" | "still low cost" / "still priced well below Western premium models" |
| `site/guides/chez-mistral.html:331` | pull-quote "$14.99 a month is the cheapest premium subscription from any major AI lab" | "Mistral Pro costs less than most premium subscriptions from the major labs, and it is one of the fastest." (no dollar figure) |
| `site/guides/chez-mistral.html:405` | "$14.99/month, the cheapest premium subscription from any major lab" | "$14.99/month, priced below most premium subscriptions from major labs" (price kept as a factual own-product fact, superlative removed) |
| `site/guides/chez-mistral.html:468` | "Compare: ChatGPT Plus $20/mo, Claude Pro $20/mo, Mistral Pro $14.99/mo, the cheapest premium subscription from any major lab." | "Compare: Mistral Pro costs less than ChatGPT Plus or Claude Pro, and it remains one of the lowest priced premium subscriptions from any major lab." (no dollar figures) |
| `site/guides/chez-kimi.html:284` | "paid memberships starting at $19/month" | "a free tier plus several paid membership tiers, detailed below" |
| `site/guides/chez-kimi.html:385` | "DeepSeek wins on the cheapest API" | "DeepSeek wins on the lowest cost API" |

24 edits total across 6 files.

### Reviewed and deliberately left unchanged (factual third-party pricing, not cheap-coded register)

- `site/guides/chez-kimi.html` tier tags/table (`Moderato $19`, `Allegretto $39`, `Allegro $99`,
  `Vivace $199`, line 424 narrative, line 440/444 comparison rows) — Kimi's own real pricing
  tiers, plain digits, no "cheap"/"cheapest" framing. Only the ~284 anchor sentence was named as
  a hotspot; left the rest per "leave other factual third-party tool prices alone."
- `site/guides/chez-mistral.html` lines 272, 289, 292, 408, 450, 460 — plain `$14.99/mo` /
  `$14.99/month` mentions describing Mistral's actual product tiers (no "cheapest"/"dirt cheap"),
  left untouched.
- `site/guides/chez-deepseek.html:435` — "10-100x cheaper API... no $20/month for the hosted
  product" is a plain comparative claim with no intensifier and wasn't in the named ~459-464
  range; left as a factual comparison.
- `site/guides/chez-gemini.html:224,267` — plain "cheap"/"cheaper" describing Gemini Flash
  (not "cheapest"/"dirt cheap", no dollar figure). chez-gemini.html was not named in TASK B; left
  untouched.
- `site/free-resources.html:565` — "The Paris kitchen at $14.99/mo" (Mistral row teaser). Same
  register as the deepseek line that was fixed, but not named as a TASK B hotspot for this file.
  **Flagged below**, not edited, to stay inside assigned scope.

## Out-of-scope pricing findings (flagged, not edited)

These are not in my assigned file/line list for this pass, but they conflict with the
estate-wide pricing policy ("nothing outside fast-forward.html shows a number") and should go to
whichever phase owns full pricing-policy enforcement:

- `main-site/work-with-fatiha.html:90,98,106` — "from $5,000" / "from $8,000" / "from $15,000" for
  Workshops & Keynotes. Policy calls for "Investment shared after a short fit conversation," no
  number.
- `site/about.html:131` — "$27/mo founding, 20 spots, locked for life. $47/mo after." for
  Community. Policy calls for "founding spots, locked for life," no number.
- `site/free-resources.html:565` — see above.
- The full set of factual competitor prices left in place in chez-mistral.html and chez-kimi.html
  (listed above) technically conflict with a maximally strict reading of "strip every $19/$14.99
  outside fast-forward.html," but my brief for this phase explicitly said to keep factual
  third-party tool comparisons and only kill the cheap-coded register plus the named anchors.
  Flagging the tension so the pricing-policy owner can decide whether third-party comparison
  prices in the guides are an intended exception or need a dedicated pass.

## Confirmation

Grep run after all edits, from `content-system/`:

```
grep -rn "store\.html\|products/judges-prompts\|products/prompt-menu\|products/time-audit" main-site site ai-insider-brief
```

Every remaining hit is one of: nav/footer markup (deferred to Phase 4), `main-site/store.html` /
`site/store.html` self-references (do-not-touch), the six `products/*.html` stubs (already
redirecting to fast-forward.html, do-not-touch), `site/guides/voice-clone-pipeline.html` (flagged
above, not a body link), or `ai-insider-brief/.../CONTEXT.md` (internal doc, not HTML). **Zero
remaining in-body links to store.html or products/*.html.**

```
grep -rni "dirt.cheap|cheap menu" main-site site ai-insider-brief
```

Result: empty. **Zero remaining "dirt-cheap"/"dirt cheap"/"cheap menu" strings.**

Targeted price-anchor check (the exact anchors named in the brief):

```
grep -n '\$14\.99|\$19/month|starting at \$19|starting at.*\$14' main-site/index.html \
  site/free-resources.html site/opt-in.html site/guides/chez-mistral.html site/guides/chez-kimi.html
```

The named anchors (opt-in.html:356/361/367, free-resources.html:700, chez-mistral.html:331/468,
chez-kimi.html:284) are gone. Remaining hits are the factual third-party prices intentionally
left in place (see table above) plus `free-resources.html:565`, which is flagged, not fixed, per
scope.

Broken-link sweep (script resolving every local `.html` href in both roots against the
filesystem): zero broken internal links found.

Voice-gate self-check on every line I wrote (grepped for em-dash, banned hype words, and
contractions across the inserted text): clean, no hits.

## Files changed (19)

- `main-site/index.html`
- `site/time-audit.html`
- `site/free-resources.html`
- `site/opt-in.html`
- `site/guides/chez-kimi.html`
- `site/guides/chez-openai.html`
- `site/guides/chez-meta-ai.html`
- `site/guides/chez-deepseek.html`
- `site/guides/chez-grok.html`
- `site/guides/chez-mistral.html`
- `site/guides/chez-copilot.html`
- `site/guides/chez-manus.html`
- `site/guides/chatgpt-vs-ai.html`
- `site/guides/ai-jargon-guide.html`
- `site/guides/what-is-ai.html`
- `site/guides/what-is-agentic.html`
- `site/guides/chez-claude.html`
- `site/guides/chez-gemini.html`
- `site/guides/what-is-a-prompt.html`

No nav/footer markup touched. No files outside `content-system/` touched. Nothing committed;
changes are in the working tree on `claude/shift-lead-web-overhaul-gc1ew1` for the orchestrator
to review.

## Rule self-check (GLOBAL-RULES.md)

- Scope: only edited inside `content-system/main-site/`, `content-system/site/` (incl.
  `site/guides/`), `content-system/site/opt-in.html`. Did not touch `ai-insider-brief/` files
  (found its only in-scope hit was a nav link, deferred). PASS.
- Branch/commit discipline: worked on `claude/shift-lead-web-overhaul-gc1ew1`, did not switch
  branches, did not commit, did not push. PASS.
- Voice gate: no em-dashes, no contractions, digits as numbers, no banned hype words in any text
  I wrote. Verified with grep across every edited line. PASS.
- Facts and numbers: "42 verification prompts" is sourced from `main-site/fast-forward.html:304`
  (already-canonical copy stating "42 verification prompts... Inside Modules 1 and 7"), not
  invented. No other new numbers introduced. Did not touch "99 AI employees" or "137" strings.
  PASS.
- Pricing policy: removed the named cheap-coded/price-anchor instances (see table). Did not
  strip factual third-party competitor prices per this phase's specific brief; flagged the
  tension with the stricter estate-wide policy for the pricing-policy owner. PARTIAL BY DESIGN,
  documented above, not silently skipped.
- Brand naming: did not introduce or touch "The AI Automation Queen" anywhere. PASS.
- Design system: no visual/CSS changes made, only text and href edits. N/A.
- Money path: no buy buttons touched or created; the repointed CTAs link to
  `fast-forward.html` (the sales page itself), not a checkout URL, no `href="#"` introduced.
  PASS.
- Process: no nav/footer markup edited (all deferred to Phase 4, listed above). No files deleted.
  No `products/*.html` source stubs touched. Every change stayed inside assigned scope; nothing
  committed. PASS.

Report path: `/home/user/content-system/reports/link-integrity-2026-07-08.md`

## Orchestrator addendum (same run, post-review)

Three fixes applied by the orchestrator after reviewing this report:

1. `site/free-resources.html:565` — Mistral library card summary "The Paris kitchen at
   $14.99/mo." rewritten to "The Paris kitchen, mapped clean." (price anchor on a
   promotional index surface).
2. `site/guides/chez-mistral.html:405` — verdict paragraph "It wins on price: $14.99/month,
   priced below..." rewritten to "the Pro tier sits below most premium subscriptions from
   major labs." (price used as a selling verdict; the factual tier table below keeps the
   real figures).
3. `site/guides/voice-clone-pipeline.html` — killed-product redirect stub repointed from
   store.html (now a noindex holding page) to fast-forward.html, matching the other
   product stubs. Title updated.

Standing decision recorded: factual third-party tool pricing inside guide reference
sections (tier tables, entrance descriptions, workbench chips in chez-kimi/chez-mistral)
STAYS. The pricing policy targets Shift & Lead offer prices and cheap-register framing,
not competitor reference data. Cheap-register framing itself is gone estate-wide.
