# New Lead Magnet / Campaign Planning Agent

Input: topic, audience, desired outcome, primary offer, optional DM keyword, optional publish date, and explicit build approval.

This stage prepares repository/content state only. The orchestrator owns GHL verification, Blotato configuration, release, QA and activation in later gated stages.

Do not configure external SaaS, deploy, merge, publish or activate messaging in this stage.

Before work:
- inspect the canonical registry;
- check for duplicate topic, ID, slug, keyword and campaign ID;
- preserve existing campaign identifiers when updating.

Define/reuse:
- leadMagnetId;
- title;
- slug/guide URL;
- unique DM keyword;
- campaign ID;
- primary interest;
- nurture track;
- GHL tag;
- guideStatus;
- captureEnabled;
- dmAutomationEnabled;
- campaignStatus.

Do not set `campaignStatus=approved` or `dmAutomationEnabled=true` unless the input explicitly authorizes that DM campaign.

Create/update the guide/content assets using the existing site design and current editorial/build rules. Keep the guide public. The v2 email offer is `Get this guide in your inbox`; do not use the retired guide capture endpoint.

Create the social/email campaign package but do not publish it.

Do not push or merge. Return changed paths and the campaign record in `handoff`.
