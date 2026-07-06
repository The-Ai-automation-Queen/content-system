# GHL setup: paste the nurture sequence (UNB-013, ~15 minutes)

Everything is drafted. These steps are execute-only: open GHL, follow top to bottom.
Sequence overview and wiring logic: `00-SEQUENCE.md`. Emails: files `01` to `05` in this folder. In each file, everything below the line `--- PASTE BELOW THIS LINE INTO GHL ---` is the email body; the subject options and preview text sit just above it.

## Step 1: create the workflow

1. GHL > Automation > Workflows > **Create Workflow** > Start from scratch.
2. Name it: `Lead Magnet Nurture (Day 0-10)`.
3. Trigger: **Form Submitted**, select the lead magnet opt-in form. (If magnets each have their own form, add one trigger per form. Alternative trigger: **Tag Added** = `magnet-download` if the delivery automation tags instead.)
4. Workflow settings: set **Allow re-entry = No**.

## Step 2: add the steps in this order

| Step | Action | Detail |
|---|---|---|
| 1 | Add Tag | `nurture-active` |
| 2 | Send Email | Email 1 (file `01`), no wait before it |
| 3 | Wait | 2 days |
| 4 | Send Email | Email 2 (file `02`) |
| 5 | Wait | 3 days |
| 6 | If/Else | If contact has tag `customer` > skip next email |
| 7 | Send Email | Email 3 (file `03`) |
| 8 | Wait | 2 days |
| 9 | If/Else | If contact has tag `community-member` > end workflow |
| 10 | Send Email | Email 4 (file `04`) |
| 11 | Wait | 3 days |
| 12 | If/Else | If tag `community-member` > end workflow |
| 13 | Send Email | Email 5 (file `05`) |
| 14 | Add Tag | `nurture-complete`, then End |

## Step 3: paste each email

For each Send Email step:

1. Subject: copy **option 1** from the file (options 2-3 are for later A/B tests).
2. Preview text: copy the `Preview:` line.
3. Body: copy everything below the paste line, keep the paragraph breaks, bold the lines marked with `**`.
4. From name: `Fatiha` (or `Fatiha Chikh`). From address: her sending domain in GHL.

## Step 4: replace the placeholder tokens (do NOT skip)

- Email 1 `[LINK-TBD]`: the hosted magnet URL from `lead-magnets.csv`. As of 2026-07-06 every magnet URL is empty (that hosting task is UNB-012). If hosting isn't done yet, save Email 1 as a draft step and keep the workflow **unpublished**.
- Email 3 `[STORE_URL]`: the live AI Time Audit ($47) checkout/store page. Leave this email **disabled** (toggle the step off) until the store checkout exists.
- Email 5 `[COMMUNITY_URL]`: the community checkout/landing page. Leave **disabled** until the community is live and the $27 founding offer is confirmed.

Emails 2 and 4 need no URLs (their CTAs are replies) and can run as soon as Email 1 can.

## Step 5: per-magnet delivery (only Email 1 varies)

The sequence is shared. Only the Day 0 download link differs per magnet. Cheapest correct setup: duplicate the Email 1 step per magnet form trigger (or use a per-form custom value for the link), and let all variants flow into the same Step 3 onward.

## Step 6: test, then publish

1. Add your own test contact through the opt-in form.
2. Confirm Email 1 arrives instantly with a working link.
3. Use GHL's "test workflow" / time-skip on the test contact to eyeball Emails 2-5 rendering.
4. Publish the workflow. Reply DONE to the unblocker so UNB-013 gets verified and closed.

## Hard rules that were already enforced in the copy

- No em-dashes anywhere (queen-brain law). If you edit copy in GHL, don't add any.
- One CTA per email. Don't append extra links or upsells.
- No invented URLs, testimonials, member wins, or anecdotes. Any future change to prices or offers goes through `email-ops audit`, which appends a dated `.rev-YYYY-MM-DD.md` file next to the original instead of rewriting it.
