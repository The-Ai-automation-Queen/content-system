# GoHighLevel v2 Funnel Architect Agent

Use authenticated browser/computer-use. Inspect first, reuse equivalents, and never duplicate blindly.

The previous guide capture through `https://auto.shiftandlead.com/webhook/formspree-lead` is legacy and invalid for this v2 request. Do not route the new guide forms through it.

## Mission

Create or verify the minimum reusable GHL architecture for the new public-guide email funnel.

### Integration decision

Choose only after inspecting current GHL capabilities:

1. Prefer a native GHL form/embed if it can reliably support:
   - email-only visible UX;
   - dynamic/hidden guide metadata;
   - custom fields;
   - UTM attribution;
   - required styling/embedding;
   - workflow triggering without creating one form per guide.

2. Otherwise define a new secure website/Vercel server-side endpoint that upserts/submits to GHL. The browser must never receive a GHL secret.

Do not use the legacy n8n/formspree-lead endpoint as fallback.

Return a concrete website integration contract in `handoff`, including:
- `integration_mode`;
- form/embed identifier or server-side API/webhook requirements;
- required field names/IDs;
- workflow trigger contract;
- success/error expectations;
- any required secret environment variable names, never their values.

## Data model

Reuse equivalent existing fields where possible. Recommended:
- Funnel Capture Version;
- First Lead Magnet;
- Latest Lead Magnet;
- Latest Lead Magnet Title;
- Latest Lead Magnet URL;
- Lead Magnet Count if reliable;
- Original Lead Source;
- Latest Lead Source;
- Original Campaign;
- Latest Campaign;
- Instagram DM Keyword;
- Primary Interest;
- Nurture Track;
- UTM Source;
- UTM Medium;
- UTM Campaign;
- UTM Content;
- Consent Source;
- Consent Timestamp.

Original fields are write-once. Latest fields update on later requests.

Use a constant capture version such as `guide-v2` so workflows can be scoped only to the new funnel.

## Tags

Use a small taxonomy:
- `LEAD_MAGNET`;
- optional `SOURCE_INSTAGRAM_DM`;
- registry guide-specific `ghlTag`.

Do not create tags for data better stored as fields.

## Workflows

Build/reuse scoped v2 master workflows:

1. `LM V2 | Capture + Attribution`
   - trigger only from the v2 integration contract;
   - upsert/dedupe by email;
   - record consent;
   - set original values only if empty;
   - update latest lead magnet/campaign/UTMs;
   - apply base/guide/source tags;
   - route to delivery.

2. `LM V2 | Delivery`
   - immediately send the requested public guide link using tested dynamic fields;
   - test all merge fields with the designated test contact;
   - if dynamic delivery is not reliable, use the smallest maintainable routing structure.

3. `LM V2 | Nurture`
   - route by Nurture Track;
   - provide useful follow-up;
   - check exits before sales-oriented sends.

Required exits: unsubscribe/DND, relevant purchase, relevant booking or explicit conversion goal.

Keep new workflows isolated from unrelated legacy forms/contacts. Never bulk-enroll existing contacts. Use only the designated test contact during QA.

Return object IDs, browser evidence and the full integration contract in `handoff`.
