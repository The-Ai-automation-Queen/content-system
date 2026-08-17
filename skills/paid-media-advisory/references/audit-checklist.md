# Mode A reference: client account audit

Loaded when running a client paid-media account audit. Plain English, UK English,
USD, no em dashes. Severity: **Critical** (losing money now or counting
conversions wrong, fix this week), **High** (real efficiency loss, fix this
month), **Medium** (tidy-up that compounds, schedule it).

## A0. Inputs to request (work with whatever arrives, never block)

Ask for: platform (Google Ads / Meta / both); campaign list; search terms report
(Google); conversion actions list; targeting settings; ad creative list;
billing/budget settings; monthly spend in USD (a range is fine); what the
business sells and the conversion that matters; landing page URL; account age.
Anything missing is recorded as "could not verify, flag for client", never
guessed. If read-only API/MCP access exists, pull only. Never write back.

## A1. Condensed audit checklist (46 checks)

### Group 1 - Account structure
1. (Medium) Campaigns named clearly, not "Campaign 1 / Copy of Campaign".
2. (High) Brand and non-brand search in separate campaigns.
3. (High) Search and Display not in one campaign (Display expansion off).
4. (Medium) Ad groups tight, one theme each.
5. (Medium) Performance Max / Advantage+ flagged for client review (ask what it targets, do not assume bad).
6. (High) Geographic targeting matches the real service area.
7. (Medium) Location set to "people in your targeted locations", not "interested in".
8. (Medium) Ad schedule sane (not paying for 3am clicks no one answers).
9. (Medium) Device performance reviewed (a channel converting far worse but still fully funded).

### Group 2 - Targeting and waste
10. (Critical) Search terms report looked at in the last 30 days.
11. (Critical) Negative keyword list exists and is not empty.
12. (High) Match types reviewed (broad with no negatives and no smart bidding = worst case).
13. (High) Run the n-gram waste sub-routine (A2). Headline deliverable.
14. (High) Obvious irrelevant themes spending (free, jobs, DIY, competitor if not deliberate, out-of-area).
15. (Medium) Audiences set to observation, not unintentionally narrowing reach.
16. (Medium) Demographic exclusions sane (not excluding buyers, not funding non-buyers).
17. (Medium) No internal competition (two campaigns bidding on the same keywords).

### Group 3 - Tracking integrity (often the real problem)
18. (Critical) At least one conversion action exists and is primary.
19. (Critical) The counted conversion is the one that matters (real lead/sale, not a pageview or any-click).
20. (Critical) No double counting (duplicate actions, reloading thank-you page).
21. (High) Platform conversion count roughly matches the client's real CRM/inbox count.
22. (High) Google Ads conversions deduplicated ("one" per click for lead gen).
23. (High) GA4 installed and a key event maps to the same conversion; wild disagreement = stop trusting optimisation until fixed.
24. (Medium) Enhanced conversions / Meta CAPI status noted; flag if missing for a real-spend lead-gen account.
25. (Medium) UTMs present and consistent on ad URLs.
26. (High) Meta Pixel firing on the right pages with a standard event (Lead/Purchase), not just PageView.
27. (Medium) Consent banner not silently blocking all tracking.

### Group 4 - Creative
28. (Medium) Each ad group has more than one ad to rotate and learn.
29. (Medium) Google RSAs have enough distinct headlines/descriptions.
30. (Medium) Ad copy matches the landing page (message match).
31. (Medium) Ad extensions/assets in use (sitelinks, callouts, call, location).
32. (Medium) Meta has more than one creative per ad set, not stale.
33. (Medium) Disapproved/limited ads flagged (silent zero = red flag).
34. (Medium) Landing page loads fast on mobile and is the right page for the ad.

### Group 5 - Budget and bidding
35. (High) Bid strategy fits the data (Target CPA/ROAS on under ~15 to 30 conversions/month cannot learn).
36. (High) Learning period respected (not bid/budget changes every few days).
37. (Critical) Daily budget vs spend: capped and missing demand, or a runaway campaign starving others.
38. (Medium) Budget concentrated on campaigns that actually convert.
39. (Medium) Bid adjustments deliberate, not leftovers.
40. (High) Spend on zero-conversion campaigns/ad groups quantified in USD.

### Group 6 - Quick-win flags (fix this week)
41. (Critical) Empty/near-empty negative list with broad/phrase match running.
42. (Critical) No primary conversion action, or the wrong thing counted.
43. (Critical) Display or Search Partners left on inside a Search campaign.
44. (Critical) Location targeting "interested in" or covering unserved regions.
45. (High) Smart bidding running on too little conversion data.
46. (High) Identifiable wasted spend total in USD from the n-gram sub-routine, as one headline number.

## A2. N-gram waste-finder sub-routine (the sellable centrepiece)

Run `scripts/ngram_waste_finder.py <search_terms.csv>`. Inputs: a Google Ads
search terms CSV with columns search term / clicks / cost / conversions.
Optional flags: `--min-cost N` (default 5 USD), `--days N` (label only).

What it does deterministically:
1. Breaks every search term into 1-grams and 2-grams.
2. Aggregates USD cost and conversions per n-gram.
3. Surfaces high-cost, near-zero-conversion n-grams as recurring waste.
4. Classifies each into a waste category (taxonomy C1).
5. Prints a ranked waste table, the honest recoverable figure (sum of unique
   flagged search terms, counted once, never exceeds total spend), and a
   ready-to-paste negative list grouped by suggested level.

Graceful degradation: if the conversions column is missing the script falls
back to a clicks-with-cost proxy and says so. Treat that figure as a rough
upper estimate and ask the client for a fuller export.

Always do the human steps the script cannot:
- **Conflict check.** Before recommending a negative, confirm it does not block
  a keyword the account is actively and successfully bidding on. A negative
  that blocks a converting keyword is worse than the waste. Flag conflicts.
- **Competitor ask.** Competitor brand n-grams are only waste if conquest is
  not a deliberate funded strategy. Always ask before negating.
- **Level judgement.** The script suggests account/campaign/ad-group level;
  confirm against the real account structure.
- The script never pushes anything. The human applies the list.

## A3. Client-facing report structure

Markdown first. Branded PDF only on explicit request via `/branded-pdf` with
DESIGN.md tokens (Playfair headings, Source Serif 4 body, Space Mono eyebrows,
cream `#F5F2EB`, powder lilac `#C2B6E0` single accent, `#1C1C1C` text on lilac).
Never plain white. Never a tool footer.

1. Cover: client name, "Paid Media Account Review", date DD/MM/YYYY, prepared by Fatiha Chikh / Shift & Lead.
2. Executive summary, one page max, non-technical: what we reviewed, the single biggest finding, estimated recoverable monthly spend USD, top 3 actions.
3. The headline number: estimated wasted spend per month USD with the data window stated, marked an estimate not a guarantee.
4. Findings by group in this order: Tracking integrity, Targeting and waste, Budget and bidding, Account structure, Creative. Each finding: plain title, severity, what we found, why it costs money, the specific fix, and a conservative impact range only where the client's own data supports it (else `[PLACEHOLDER]` or a direction, never an invented benchmark).
5. Quick wins (fix this week): Critical and top High as a numbered list.
6. Recommended negative keyword list: the A2 output, grouped by level, with reasons.
7. 30-day roadmap: week 1 quick wins, weeks 2 to 4 structural fixes, what to measure.
8. What we could not verify: honest gap list, framed "needs account access / ask the client", never guessed.
9. Next step: one line, marketing-agent decision required before any change is applied; advisory options if the client wants implementation.

Tone: practitioner, calm, plain. Never alarmist for effect.

## C1. Negative-keyword waste taxonomy

- **Freebie-seeker:** free, gratis, no cost, free trial/template/download. Usually account-level negatives.
- **DIY / self-serve:** diy, do it yourself, how to, tutorial, guide, learn to.
- **Jobs / career:** job, jobs, career, salary, hiring, vacancy, internship, recruitment.
- **Research / informational:** what is, meaning, definition, examples, vs, comparison, reddit, forum.
- **Wrong product or service:** adjacent terms for things the business does not sell. Build with the client.
- **Wrong location:** place names outside the service area.
- **Competitor:** competitor brand names. Waste only if conquest is not deliberate and funded. Always ask.
- **Cheap-intent:** cheap, cheapest, discount, lowest price (only if the business is not a discount play).

## C2. Tracking QA checklist (minimum bar, both modes)

1. One clearly defined conversion mapped to real business value.
2. That conversion set as the single primary conversion in the ad platform.
3. Fires once per real action, verified end to end.
4. Platform count roughly matches the client's real-world count.
5. GA4 present, its key event agrees within a sane margin; large disagreement = stop trusting the data.
6. UTMs consistent on all ad URLs.
7. Consent banner does not silently kill the tag.
8. No double counting (no thank-you reload, no duplicate tags, dedup on for lead gen).

## C3. Campaign-structure scaffolds (audit lens)

**SMB Google Search starter:** 1 Search-only campaign, Display and Search
Partners off; precise location, "people in your targeted locations"; 1 to 2
themed ad groups; exact + phrase only to start; shared negative list seeded
from C1; 2 to 3 RSAs message-matched to the landing page; Maximise Clicks or
manual until ~15 to 30 conversions/month, never Target CPA/ROAS on day one.

**SMB Paid Social starter (Meta):** 1 campaign; start with 1 retargeting ad set
(warm engagers/site visitors) before any cold prospecting; 2 to 3 native
creatives; broad-ish audience, let the platform optimise, do not micro-slice at
small budget; one standard event (Lead/Purchase), Pixel verified before launch.

Audit application: if a client account is materially more complex than the
scaffold with no reason that pays for itself, the complexity itself is a
finding for a small account.

## C5. Impact estimation rule (anti-fabrication, hard)

Quantify impact only from the client's own supplied data (for example summed
zero-conversion spend). Otherwise state a direction ("this should reduce
wasted clicks") with no invented percentage, or a range with the source
named, or `[PLACEHOLDER]`. Never present an industry benchmark as this
client's expected result. Never present a projection as a result.
