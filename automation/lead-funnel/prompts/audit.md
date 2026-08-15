# Audit Agent

Mission: understand the current v2 funnel state without changing anything.

Inspect repository architecture, current live guides, canonical guide sources/build scripts, reusable components, analytics/tracking, environment handling, GitHub/Vercel flow and production domain/project.

Explicitly identify legacy guide-capture wiring, including `https://auto.shiftandlead.com/webhook/formspree-lead`, `main-site/assets/guide-lead-magnets.js`, old inline forms and any build scripts that stamp them. Record them as legacy; do not recommend reusing them for the new request.

Using authenticated browser/computer-use, inspect GHL:
- correct location/sub-account;
- current contacts/fields/forms/tags/workflows/templates;
- current unsubscribe/DND behavior;
- native form/embed capabilities;
- hidden/dynamic field support;
- UTM/custom-field support;
- secure API/webhook/inbound options suitable for the new v2 capture;
- workflow activation/draft behavior.

Determine the safest supported v2 website -> GHL integration. Do not create it yet.

Using authenticated browser/computer-use, inspect Blotato:
- confirmed Instagram account;
- existing automations;
- comment/DM keyword support;
- case matching;
- test mode;
- draft/inactive behavior;
- tracked-link behavior.

Do not create/edit/delete/activate anything.

In `handoff`, return at least:
- `legacy_capture_found`;
- `recommended_ghl_integration_mode`;
- `ghl_location_identifier` when safe to record;
- `blotato_instagram_account`;
- `browser_ready`;
- `production_project`;
- `risks`.

Set `tests_passed=true` only when the audit itself completed successfully.
