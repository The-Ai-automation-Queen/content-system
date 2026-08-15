# Website v2 Funnel Agent

Mission: implement one reusable v2 capture across eligible public guide pages using the verified GHL integration contract and funnel registry.

Read:
- `automation/lead-funnel/config/guide-funnels.json` for routing/offer configuration;
- `data/guide-lead-magnets.json` for companion strategy;
- actual guide/resource routes for already-built companion assets.

## Legacy boundary

Do not reuse `https://auto.shiftandlead.com/webhook/formspree-lead` for the new guide funnel.

Treat `main-site/assets/guide-lead-magnets.js`, old `data-lead-magnet-form` behavior and legacy companion forms as migration inputs only. Do not blindly modify or delete unrelated legacy pages.

For an eligible guide with an existing useful companion asset, preserve the asset and migrate its form submission to v2. Do not replace a stronger companion offer with a weaker generic email-the-guide offer.

Update the canonical source/build path so future builds preserve the change. Do not patch generated HTML only if a build script would overwrite it.

## UX by offer type

For `offerType=guide_email`:
- heading: `Get this guide in your inbox`;
- short benefit line;
- email field only;
- CTA such as `Send me the guide`.

For `offerType=companion_asset`:
- preserve or improve the specific asset promise/title;
- email remains the only visible data field unless verified consent/legal requirements require an explicit checkbox;
- CTA names the companion asset.

Keep the guide fully public in both cases.

Under the CTA, include concise disclosure that submission sends the requested guide/resource and relevant practical follow-up, with unsubscribe language. Add an explicit checkbox only if the verified GHL/legal configuration requires it.

## Placement

Place after the reader has received meaningful value and optionally repeat near the end. Reuse one underlying v2 capture component/transport; do not hand-code 14 unrelated submission systems.

## Submitted data

At minimum:
- email;
- `capture_version=guide-v2`;
- lead_magnet_id;
- lead_magnet_title;
- lead_magnet_url;
- offer_type;
- offer_title;
- delivery_url;
- dm_keyword;
- campaign_id;
- nurture_track;
- primary_interest;
- page_url;
- utm_source;
- utm_medium;
- utm_campaign;
- utm_content;
- referrer;
- consent_source;
- consent_timestamp.

Preserve incoming UTMs. If absent, derive direct/organic/referral sensibly. Original-vs-latest behavior is owned by GHL.

## Integration

Implement exactly the GHL integration contract returned by the GHL agent:
- native GHL form/embed only when it meets the v2 requirements; otherwise
- new secure server-side endpoint -> GHL.

Never expose CRM credentials in browser code.

If the contract requires a secret environment variable, verify the variable has been securely provisioned before claiming the endpoint is ready. Do not print or read the secret value into logs.

One user submit must cause one intended capture request. Prevent double submits.

## States and tests

Implement:
- email validation;
- loading;
- network/API error;
- success;
- duplicate-contact-safe behavior;
- mobile and desktop layout;
- accessible label/status.

Success stays on the guide and tells the user to check their inbox. A companion asset may additionally remain immediately accessible after successful capture if that is the existing approved UX.

Do not deploy, push or merge in this task.

In `handoff`, return component/source paths, integration mode, preview-test instructions and the list of eligible guides changed.
