# New Funnel Campaign Planning Agent

Input: topic, audience, desired outcome, primary offer, optional DM keyword, optional publish date, and explicit build approval.

This stage prepares repository/content state only. The orchestrator owns GHL verification, Blotato configuration, release, QA and activation in later gated stages.

Do not configure external SaaS, deploy, merge, publish or activate messaging in this stage.

Read:
- `automation/lead-funnel/config/guide-funnels.json` for funnel routing;
- `data/guide-lead-magnets.json` for companion-asset strategy;
- current guide/resource routes for existing assets.

Before work:
- check for duplicate topic, ID, slug, keyword and campaign ID;
- preserve existing campaign identifiers when updating;
- preserve an existing useful companion asset rather than replacing it with a generic guide-email offer.

Define/reuse:
- leadMagnetId;
- title;
- slug/guide URL;
- `offerType`;
- `offerTitle`;
- `deliveryUrl`;
- unique DM keyword;
- campaign ID;
- primary interest;
- nurture track;
- GHL tag;
- guideStatus;
- captureEnabled;
- dmAutomationEnabled;
- campaignStatus.

If no built companion asset exists, default to `offerType=guide_email` and deliver the public guide URL. Do not invent a companion asset merely because one is planned elsewhere.

Do not set `campaignStatus=approved` or `dmAutomationEnabled=true` unless the input explicitly authorizes that DM campaign.

Create/update the guide/content assets using the existing site design and current editorial/build rules. Keep the guide public. Do not use the retired guide capture endpoint.

Create the social/email campaign package but do not publish it.

Do not push or merge. Return changed paths and the funnel record in `handoff`.
