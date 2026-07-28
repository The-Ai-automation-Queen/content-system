# CONTEXT — ai-insider-brief

Per-build glossary. Cold session entry: read this first. Lazy update during real work.

## Purpose
Open intelligence briefing. Scrapes AI/business sources every 12 hours via cron, runs Ollama summarisation, and publishes reviewed cards for non-technical business readers. Public-facing briefing at `index.html`.

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
- **No email collection on the Brief.** Reader acquisition and email capture live on the Free Guides website.
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
  There is no content gate or signup form: readers can scan every card freely.

## Population rules reset (07/07/2026)

- **Public briefing cadence: twice daily.** The crawler runs at 10:00 and
  22:00 Dubai time. It prepares up to five reviewed cards per run, capped
  at eight per day, and cards enter the public state after editorial approval.
  The separate Tuesday email-preview workflow remains human-gated and does
  not control access to the public briefing.
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

## CTA rules reset (28/07/2026)

- The Brief is an open briefing, not an email-capture surface. It has no
  signup form, email field, subscription API, frequency selector, or gate.
- Its one job is to help readers understand current AI developments quickly.
- The header action and beginner FAQ point to the Free Guides library, which
  is the acquisition and email-collection path for this part of the estate.
- The card layout and ACT/WATCH/IGNORE editorial system remain unchanged.
- Do not reintroduce Kit/ConvertKit credentials or signup code into public
  frontend files.

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
- The hard five-card subscription gate and soft signup invitations are retired.
  The full recent board remains readable without registration.

## When to update this file
Add a glossary entry when a new source type, prompt template, or pipeline stage enters.
