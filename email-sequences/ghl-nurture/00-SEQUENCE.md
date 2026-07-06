# ghl-nurture: the Day 0-10 lead magnet nurture sequence

> Drafted 2026-07-06 by `email-ops nurture`. Paste-ready for GoHighLevel.
> This is the sequence UNB-013 pastes. The execute-only setup steps live in `README.md` in this folder.
> Template: the conversion flow in `skills/monetisation/SKILL.md`. Prices and offer states: `/home/user/queen-brain/offers.md` + `STATUS.md` (05/07/2026, canonical).

## The arc

| # | File | Day | Wait from previous | Job | CTA |
|---|------|-----|--------------------|-----|-----|
| 1 | `01-day-0-here-is-your-guide.md` | 0 | immediate on opt-in | Deliver the magnet + one action today | Download link `[LINK-TBD]` |
| 2 | `02-day-2-written-while-i-slept.md` | 2 | 2 days | Her real quick-win story, start the reply loop | Reply with the task you hate |
| 3 | `03-day-5-time-audit.md` | 5 | 3 days | First paid step: The AI Time Audit, $47 | Buy at `[STORE_URL]` |
| 4 | `04-day-7-community-story.md` | 7 | 2 days | Community story (honest pre-launch version) | Reply FOUNDING |
| 5 | `05-day-10-founding-invite.md` | 10 | 3 days | Direct founding invite: $27/month locked, 20 spots | Join at `[COMMUNITY_URL]` |

One CTA per email. Day 0-2 give, Day 5+ ask. No em-dashes anywhere in the copy (queen-brain law).

## GHL wiring (summary)

- **Workflow trigger:** lead magnet opt-in form submitted (or tag `magnet-<keyword>` added by the delivery automation).
- **Sequence is magnet-agnostic:** it works for any literacy-chain magnet (WHAT, DIFF, PROMPT, WORDS) and for STACK / FOLLOW UP / TEAM. Only Email 1's download link differs per magnet: clone Email 1 per keyword workflow, share Emails 2-5.
- **Tags:** `nurture-active` on entry, `nurture-complete` on Email 5 send. `founding-interest` on FOUNDING replies (manual or reply-trigger).
- **Stop-on-purchase:** any purchase (tag `customer`) skips Email 3; community join (tag `community-member`) exits the workflow. Configure "allow re-entry: no."

## Placeholder tokens (never guess URLs)

| Token | What goes there | Blocked by |
|---|---|---|
| `[LINK-TBD]` (Email 1) | The hosted magnet URL from `lead-magnets.csv` resource_url | UNB-012 (all magnet URLs empty as of 2026-07-06) |
| `[STORE_URL]` (Email 3) | The live store/checkout page for The AI Time Audit ($47) | Money rails: STATUS "ONLY FATIHA" item 1 |
| `[COMMUNITY_URL]` (Email 5) | The community landing/checkout | Community not launched; founding mechanic to confirm (offers.md DECISION NEEDED) |

## Activation gates

1. Emails 1-2 can go live as soon as one magnet is hosted (UNB-012).
2. Email 3 stays OFF until a store checkout is live. It sells The AI Time Audit ($47, READY TO SELL per STATUS) because the Starter Kit ($97) in the monetisation template is still spec-only. When the Starter Kit ships, issue a dated revision file (`03-day-5-time-audit.rev-YYYY-MM-DD.md`), never a silent rewrite.
3. Emails 4-5 stay half-armed until the community exists: Email 4 works today (its CTA is a reply, which builds the first-access list), Email 5 stays OFF until the checkout is live and the $27 founding mechanic is confirmed.

## Honesty constraints baked into the copy

- Day 2 uses only documented facts from `personal-brain.md`: long corporate tech career (kept vague per positioning rule), sudden exit, systems builder, the content OS that drafts overnight.
- Day 7 admits the community is new. Zero member wins are cited because zero members exist (skill guardrail 7).
- Free = understand + one first win; paid = system + speed (queen-brain triage law) is stated plainly in Email 3.
- Urgency in Email 5 is real: 20 founding spots is the documented mechanic, nothing invented.
