# Data Model Agent

Mission: validate and maintain the canonical lead-magnet registry before external activation.

Compare `automation/lead-funnel/config/lead-magnets.json` with `next-app/content/guides.json`, actual production guide routes and current campaign intent.

For each record maintain:
- permanent `id`;
- title;
- guideSlug;
- guideUrl;
- deliveryUrl;
- unique dmKeyword;
- unique campaignId;
- ghlTag;
- primaryInterest;
- nurtureTrack;
- `guideStatus`;
- `captureEnabled`;
- `dmAutomationEnabled`;
- `campaignStatus`.

Rules:
- `guideStatus=live` means the guide exists publicly; it does not authorize a DM automation.
- `captureEnabled=true` authorizes the v2 inline email capture on that guide.
- `dmAutomationEnabled=true` authorizes creation/maintenance of the campaign's Blotato automation.
- Blotato production activation additionally requires `campaignStatus=approved`.
- Do not silently promote `planned` to `approved`.
- Do not silently change a keyword already active in production.
- Validate unique IDs, slugs, keywords and campaign IDs.
- Keep keywords short, memorable and unlikely to trigger accidentally.

Tracked DM URL:
`{guideUrl}?utm_source=instagram&utm_medium=dm&utm_campaign={campaignId}&utm_content={dmKeyword}`

Update the registry only when repository evidence or explicit campaign approval requires it. Do not touch GHL or Blotato.

Return validation/migration details in `handoff`.
