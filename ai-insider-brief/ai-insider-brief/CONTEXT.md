# CONTEXT — ai-insider-brief

Per-build glossary. Cold session entry: read this first. Lazy update during real work.

## Purpose
Dark intelligence dashboard. Scrapes AI/business sources every 12 hours via cron, runs Ollama summarisation locally, surfaces top items via Kit capture. Public-facing dashboard at index.html.

## Architecture
| Component | File | Purpose |
|-----------|------|---------|
| **Frontend** | `index.html` + `app.js` + `styles.css` | Dashboard UI, Shift & Lead blue/white system (legacy `styles-light.css` removed 13/07/2026) |
| **Pipeline** | `pipeline/` | Source fetch → Ollama summarise → JSON output |
| **Sources** | `sources.json` | Curated source list (RSS/URL list) |
| **Prompts** | `prompts.mjs` | Ollama prompt templates per content type |
| **Data** | `data/` | Generated briefs (JSON output of pipeline) |
| **OG Image** | `og-image.png` | Social card |

## Deployment
- Lives on VPS `root@187.77.153.212`
- 12h cron drives pipeline runs
- Public URL serves dashboard

## Key Decisions
- **Ollama local LLM** for summarisation (free, no token spend)
- **Kit (formerly ConvertKit) capture** wired to dashboard for opt-ins
- **Light theme, estate canon** (reset 07/07/2026 — see below; the old
  dark-purple-on-cream theme is retired)

## Data Flow
```
sources.json → pipeline (fetch RSS/URLs) → Ollama (summarise via prompts.mjs) → data/*.json → index.html (renders)
```

## Hard Rules
- No banned phrases in summaries (Ollama prompt enforces voice rules)
- No fabricated stats — must trace to source
- Dashboard is IFP-facing (top of funnel) — accessible language, not ICP-only

## Design reset (07/07/2026)

The page previously ran its own design system (Georgia serif, purple
#6B35C2, cream #F5F2EB background) that shared no visual identity with
the rest of the estate. Reset to the canon used on guides.shiftandlead.com
and www.shiftandlead.com:

- **Type**: Playfair Display (display), Source Serif 4 (body), Inter
  (UI/chrome), Space Mono (labels, verdicts, kickers).
- **Color**: Electric #2C4BE0 on white; ink #1A1A1A; cream #EEF2FC for
  soft surfaces; signal red #E63955 reserved for the IGNORE verdict and
  the Breaking dot only, never decorative.
- **Nav**: the page now carries the same top nav as the other two
  properties (Free Guides / The 99 / The Brief / Store / About), so a
  reader can move between all three surfaces. Previously this page was
  an island with no links back into the estate except two social icons.
- The established feed/card layout remains the public contract. Card content
  uses `.feed-card`, `.verdict-*`, `.category-pill`, and `.shimmer-card`.
  There is no content gate: readers can scan every card before subscribing.

## Population rules reset (07/07/2026)

- **Cadence: every Tuesday, once.** The page and every cross-reference
  to it previously said "twice a week" in several places (meta tags,
  hero copy, FAQ) while the actual operating cadence was Tuesday-only.
  Every string now says "every Tuesday." If the cadence ever genuinely
  changes, this file and every page that mentions the Brief must be
  updated in the same commit (see the estate-wide cadence audit in
  `reports/estate-architecture-blueprint-2026-07-07.md`).
- **Categories and the ACT/WATCH/IGNORE names remain, but the editorial
  contract changed on 15/07/2026.** ACT is rare and must be directly
  supported by source evidence, independently verified, audience-specific,
  low-risk, and time-sensitive. WATCH must name the affected audience and a
  concrete future trigger. IGNORE is rare and must explain why the item is
  safe to skip. Most cards should be WATCH.
- **This is not the guides.** The Brief is a recurring news digest
  (timely, dated, verdict-driven). The guides library is an evergreen
  literacy/tool/setup school (timeless, no expiry). The two were
  visually indistinguishable before this reset; the new FAQ entry
  ("Is this the same as the free guides?") and the cross-link block
  make the distinction explicit to a reader who lands on either
  surface confused about which one they're on.
- The 12h scrape cron is a freshness mechanism for the dashboard feed,
  not the send cadence. It does not need to match "every Tuesday";
  the dashboard can (and should) look current between sends.

## CTA rules reset (07/07/2026)

One primary action, repeated without hiding the evidence:

1. **Primary, everywhere on this page: subscribe.** Hero and footer forms
   remain the capture points. The feed is uninterrupted by promotional cards
   so readers can assess the editorial value before opting in. No other action
   competes with this on the page; per the estate blueprint's "one job per
   page" rule, the Brief's job is capturing the subscribe, not selling anything.
2. **Secondary, one cross-block, two lines, no store link.** A reader
   who is lost (needs the basics first) is pointed at the free guides;
   a reader who wants proof is pointed at the 99 scoreboard. Neither
   line pitches a paid product — that would duplicate the Store's job
   (now at www.shiftandlead.com/store.html) and confuse the "is this a
   sales page" read the estate blueprint flagged as the estate's core
   incoherence problem.
3. **Subscriber visibility**: every subscribe form now also fires the
   estate-wide Formspree + n8n webhook dual-POST (source tags
   `brief-hero` / `brief-footer`) so GHL sees every
   Brief subscriber alongside every other capture surface, while Kit
   (ConvertKit) remains the actual sender. This mirrors the pattern
   already used by every other form across guides.shiftandlead.com and
   www.shiftandlead.com.
- **Removed**: the unused daily/weekly frequency toggle
  (`getSelectedFrequency`) had no UI wired to it and defaulted safely;
  left as dead code in `app.js` rather than risk breaking the subscribe
  handler, but no page should ever add a frequency choice back without
  updating this section first — single cadence is the rule.

## Evidence-based card contract (15/07/2026)

- Contract version is `2`. New cards carry `editorial_contract_version: 2`.
- Article discovery and judgment are separate. RSS finds the story; the
  pipeline fetches up to 10,000 useful article characters before judgment.
- Card creation is three passes: factual evidence extraction, editorial
  judgment, and an independent adversarial verification.
- Deterministic code runs after the models. ACT is demoted unless the full
  article is at least 3,000 characters, source confidence is high, card
  confidence is at least 0.85, the verifier passes it, the action is direct,
  and its meaningful terms appear in the source evidence.
- High-risk actions involving money, law, compliance, privacy, security,
  health, finance, employment, external publishing, deletion, or other
  irreversible changes are not allowed as ACT without independent current
  verification. The automated pipeline therefore demotes them to WATCH.
- Telegram shows the audience, reason, action or trigger, evidence,
  confidence, verification state, warning, and source before approval.
- Telegram refuses to approve cards generated under the old contract. They
  remain an evaluation archive only.
- The public board never presents an old unverified verdict as current
  advice. Legacy cards are labeled ARCHIVE.
- The hard five-card subscription gate is retired. The recent board remains
  readable, with soft signup invitations after cards three and nine.

## When to update this file
Add a glossary entry when a new source type, prompt template, or pipeline stage enters.
