---
name: paid-media-advisory
description: Audits a client's Google Ads or Meta Ads account and produces a sellable client-facing review (Mode A, priority), or sets up Fatiha's own small-budget campaign with hard budget-protection guardrails (Mode B). Use when the user says /paid-media-advisory, "audit this ad account", "audit client paid media", "review this Google Ads account", "review this Meta account", "negative keyword waste", "help me launch a small paid campaign", or "set up tracking for ads". This is a marketing-territory tool, not a parallel decider. marketing-agent stays the sole marketing decider; this skill produces analysis and recommendations only and never applies changes.
---

# Paid Media Advisory

## Overview

Two modes, one skill, scaled to solo and SMB reality, never agency scale.

- **Mode A (priority): client account audit.** Review a client's Google Ads or
  Meta account and produce a client-facing report Fatiha can sell as an
  advisory deliverable. The negative-keyword n-gram waste-finder is the
  headline win and the sellable centrepiece.
- **Mode B: own low-scale launch.** A minimal correct-setup path for Fatiha's
  own small-budget campaigns, tracking-first, with hard budget guardrails
  written for someone anxious about wasting money.

## Hard rules (governance, non-negotiable, apply to both modes)

1. **marketing-agent is the sole marketing decider.** This skill produces analysis, findings, and recommendations. It does NOT decide budget, does NOT auto-deploy changes, does NOT override marketing-agent. End every output with "marketing-agent decision required before action".
2. **UK English everywhere.** Optimise, analyse, behaviour.
3. **No em dashes.** Use commas, periods, or rephrase. Hard gate.
4. **USD not GBP.** All money in USD. Never convert to or quote GBP.
5. **Plain language, no jargon.** Business-owner language. A jargon term may appear once only if defined in plain English in the same sentence.
6. **Client-facing PDF or doc output must pull DESIGN.md tokens** via `/branded-pdf`. Markdown draft first, branded render only on explicit request. Never plain white, never a tool footer.
7. **No fabricated benchmarks or metrics.** Never state a CPA, CTR, conversion rate, ROAS, or industry benchmark as fact unless it comes from the client's own supplied data, or is a stated range with a named source, or is `[PLACEHOLDER]`. If account data is missing, write the finding as conditional.
8. **Never claim a campaign result that did not happen.** Setup steps and clearly-labelled expected-behaviour ranges only, never results.
9. **No auto-deploy.** Never push changes to a live account. Output recommended changes as a copy-paste list for the human to apply. Read and analyse only.

State rules 2, 3, 4, 7, 9 visibly in any client-facing deliverable's internal
notes so the next person knows the constraints the report was built under.

## Mode detection

- "audit this account / review their ads / what is wrong with their Google Ads / negative keyword waste" routes to **Mode A**.
- "I want to run my own ads / launch a campaign / set up tracking for my ads" routes to **Mode B**.
- If unclear, ask exactly one question: "Are we auditing someone else's account, or setting up your own?"

## Mode A workflow (client account audit)

1. Read `references/audit-checklist.md` in full before starting.
2. Gather inputs per checklist section A0. Work with whatever is supplied. Record every gap as "could not verify, flag for client". Never guess a number.
3. Walk the 46-check list (A1) against the supplied data. Tag each finding Critical / High / Medium.
4. Run the centrepiece on the search terms export:
   ```
   python scripts/ngram_waste_finder.py <search_terms.csv> --min-cost 5 --days 60
   ```
   The CSV needs columns search term / clicks / cost / conversions. The script
   degrades gracefully and says so if conversions are missing. Then do the
   human steps the script cannot: conflict check (a negative must not block a
   converting keyword), competitor ask, and level confirmation against the
   real account structure.
5. Assemble the report in the exact A3 structure. Lead the executive summary and a dedicated headline section with the estimated recoverable monthly spend in USD, data window stated, marked an estimate not a guarantee.
6. Save the markdown draft to `C:\Users\fatih\.claude\departments\marketing\3-build\` named `DD-MM-YYYY_paid-audit_<client-slug>_build.md`. Final client report graduates to `4-output/audits/` via the marketing dept process. Branded PDF only on explicit request, via `/branded-pdf` with DESIGN.md tokens.
7. End with the marketing-agent line and (if the client wants implementation) a one-line advisory-options note.

## Mode B workflow (own low-scale launch)

1. Read `references/mode-b-launch.md` in full before starting.
2. Run the B1 tracking gate first. If any of the seven items cannot be confirmed, output "do not launch yet" plus the exact fix list and stop. The gate is non-negotiable.
3. Recommend exactly one channel (B2) with a one-paragraph plain-English reason. Build one campaign skeleton only. No multi-channel, no tiered architecture.
4. Fill in the B3 budget-protection block with the user's real numbers: daily cap in USD, written kill-criteria, the do-not-touch list, the twice-a-week check cadence.
5. Save the runbook to `C:\Users\fatih\.claude\departments\marketing\3-build\` named `DD-MM-YYYY_paid-launch_<campaign-slug>_build.md`. No projected results. Expected-behaviour ranges only if labelled "rough expectation, not a promise" with the basis stated.
6. Always restate budget guardrails 1 and 2 at the end of the output, then the marketing-agent line.

## Scope boundary

Out of scope, deliberately cut as agency-scale: MCC strategy, portfolio bid
strategies, incrementality geo-splits, server-side tagging, CAPI, marketing mix
modelling. If the user asks for one, note it is out of small-budget scope and
hand back to marketing-agent.

## Resources

- `scripts/ngram_waste_finder.py` - deterministic negative-keyword n-gram waste-finder. The Mode A centrepiece. Runs from a search terms CSV, never pushes to a live account, prints an honest recoverable figure that can never exceed total spend.
- `references/audit-checklist.md` - Mode A: A0 inputs, the 46-check list, A2 sub-routine human steps, A3 report structure, waste taxonomy, tracking QA, campaign scaffolds, anti-fabrication impact rule.
- `references/mode-b-launch.md` - Mode B: B1 tracking gate, B2 one-channel structure, B3 budget guardrails, B4 output spec.
