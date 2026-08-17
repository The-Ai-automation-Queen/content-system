# Mode B reference: own low-scale launch (budget-protected)

For Fatiha's own small-budget campaigns. Paid ads is a stated fear-zone, so
this mode is deliberately conservative and leads with what NOT to do. Plain
English, UK English, USD, no em dashes. No projected results, ever.

## B1. Tracking gate (non-negotiable, run first)

Hard rule: no campaign goes live until every item passes. "If it is not
tracked correctly, it did not happen." No server-side, no CAPI, no offline
import unless explicitly asked for.

1. GA4 installed and receiving data (confirm in GA4 Realtime).
2. Exactly one conversion that matters defined (lead form submit, booking confirmed, or purchase). Not page views. Not any-click.
3. That conversion set as a GA4 key event and imported as the single primary conversion in the ad platform.
4. One pixel/tag for the chosen channel only (Google Ads tag OR Meta Pixel, not a pile).
5. The conversion fires once per real action. Test end to end before launch (submit the form, confirm exactly one conversion appears, not zero, not three).
6. UTM discipline: every ad URL tagged with consistent source / medium / campaign.
7. Consent banner does not silently block the conversion tag (test with the banner present).

If any item cannot be confirmed: output "do not launch yet" and the exact fix
list. This gate is the main protection against spending money blind.

## B2. First-campaign structure (one channel only)

Recommend a single channel and explain why in plain English. Default options
for Fatiha's ICP/IFP:
- **Google Search:** high intent, people already searching for the solution.
- **Meta / Instagram:** warm audience, retargeting people who already engaged.

Pick the one where the audience already is and a creative asset already
exists. Never run several at once.

**Google Search default:** 1 campaign, Search only, Display and Search Partners
off; precise service-area location; 1 ad group, one theme; exact + phrase
match only (never unguarded broad at this scale); starter negative list (free,
jobs, diy, course-for-free, salary, cheap if not a discount play); 2 to 3 RSAs
with distinct headlines message-matched to the landing page; Maximise Clicks
or manual bidding (never Target CPA on day one, there is no data to learn from).

**Meta default:** 1 campaign; one retargeting ad set (warm engagers, site
visitors) before any cold prospecting, lower risk for an anxious budget; 2 to 3
native creatives, content-first; broad-ish audience, let the platform
optimise, do not micro-slice; one standard event (Lead/Purchase), Pixel
verified before launch.

Landing page matches the ad and hosts the tracked conversion.

## B3. Budget-protection guardrails (firm rules, framed reassuringly)

1. **Daily cap you would not mind losing entirely.** Decide the monthly USD amount you are genuinely fine treating as a learning cost. Divide by 30. That is the daily cap. Start at the low end. You can always raise it, you cannot un-spend it.
2. **Hard kill-criteria, written down before launch.** Template to fill in with the user: "If after [USD spend threshold, for example one full week of the daily cap] there are zero tracked conversions AND the search terms or audience look clearly irrelevant, pause and review. Do not give it more time past this line."
3. **Learning-phase patience (equal and opposite guardrail).** First 7 to 14 days, if tracking is correct and traffic looks relevant, do NOT touch bids, budget, targeting, or creative daily. Daily fiddling resets learning and is itself a way to waste money. Change one thing, then wait at least a week.
4. **What NOT to touch in the first two weeks:** bid strategy, daily budget, audience size, the conversion action, the landing page. The only allowed first-week action is pausing on a kill-criterion or adding a negative for clearly irrelevant spend.
5. **Check, do not optimise, on a fixed cadence.** Look twice a week at a set time, not continuously. Two-line check: spend on track vs cap; any tracked conversions yet; any obviously irrelevant search terms or placements. Looking more often does not make it work better.
6. **No scaling until proof.** Do not increase budget until there is a stable, repeatable, tracked result over at least two to three weeks. "It feels like it is working" is not proof. A tracked conversion at an acceptable cost, repeated, is proof.
7. **One channel until it works.** Do not add a second channel out of impatience. Master one small thing first.

Always restate guardrails 1 and 2 at the end of any Mode B output.

## B4. Mode B output

A short setup runbook saved to the marketing workspace `3-build/`: the tracking
gate result (pass/fail per item), the recommended single channel with a
one-paragraph reason, the campaign skeleton, the negative starter list, and the
filled-in budget-protection block with the user's actual daily cap and
kill-criteria in USD. No projected results. No fabricated benchmarks.
Expected-behaviour ranges only if clearly labelled "rough expectation, not a
promise" with the basis stated.

## Out of scope (hand back to marketing-agent if asked)

MCC strategy, portfolio bid strategies, incrementality geo-splits, server-side
tagging, CAPI, marketing mix modelling. Deliberately cut as agency-scale. Note
it is out of small-budget scope and escalate to marketing-agent.
