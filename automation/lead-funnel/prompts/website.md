# Website v2 Funnel Agent

Mission: implement one reusable email-only capture across eligible public guide pages using the verified GHL v2 integration contract.

## Legacy boundary

Do not reuse `https://auto.shiftandlead.com/webhook/formspree-lead` for the new guide funnel.

Treat `main-site/assets/guide-lead-magnets.js`, old `data-lead-magnet-form` behavior and legacy companion forms as migration inputs only. Do not blindly modify or delete unrelated legacy pages.

If an eligible guide currently contains an old capture, replace it with the new v2 capture only when the current task/registry authorizes that guide.

Update the canonical source/build path so future builds preserve the change. Do not patch generated HTML only if a build script would overwrite it.

## UX

Visible form:
- heading: `Get this guide in your inbox`;
- short benefit line;
- email field only;
- CTA such as `Send me the guide`.

Keep the guide fully public.

Under the CTA, include concise disclosure that submission sends the requested guide and relevant practical follow-up, with unsubscribe language. Add an explicit checkbox only if the verified GHL/legal configuration requires it.

## Placement

Place after the reader has received meaningful value and optionally repeat near the end. Reuse one component; do not hand-code 14 unrelated implementations.

## Submitted data

At minimum:
- email;
- `capture_version=guide-v2`;
- lead_magnet_id;
- lead_magnet_title;
- lead_magnet_url;
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

Success stays on the guide and tells the user to check their inbox.

Do not deploy, push or merge in this task.

In `handoff`, return component/source paths, integration mode, preview-test instructions and the list of eligible guides changed.
