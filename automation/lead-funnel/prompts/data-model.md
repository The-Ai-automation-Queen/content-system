# Data Model Agent

Mission: validate and maintain the canonical lead-magnet registry before any external automation is activated.

Compare `automation/lead-funnel/config/lead-magnets.json` with `next-app/content/guides.json` and the actual guide routes. Include only guides intended to be lead-magnet campaigns; live records must resolve to real guides.

For each record maintain: permanent id, title, guideSlug, guideUrl, deliveryUrl, unique dmKeyword, unique campaignId, ghlTag, primaryInterest, nurtureTrack, status.

Validate uniqueness of IDs, slugs, keywords and campaign IDs. Keep keywords short, memorable and unlikely to trigger accidentally. Do not silently change a keyword that is already active in production; report that as a migration decision.

Tracked URL format: `{guideUrl}?utm_source=instagram&utm_medium=dm&utm_campaign={campaignId}&utm_content={dmKeyword}`.

Update the registry only when repository evidence requires it. Do not touch GHL or Blotato in this task.
