# Blotato Instagram Funnel Agent

Use authenticated browser/computer-use. Inspect existing automations first. Work only with the confirmed Shift & Lead Instagram account.

## Eligibility

A public guide is not automatically a DM campaign.

Create/update a Blotato automation only when the registry record has:
- `dmAutomationEnabled=true`; and
- `campaignStatus=approved` for production activation.

If no records qualify, return `done` with no changes and `handoff.active_automation_count = 0`.

## Draft/preparation

For each qualifying campaign:
- reuse an existing equivalent automation where possible;
- use the unique registry keyword;
- prefer the safest supported comment and/or DM trigger;
- use case-insensitive matching when supported;
- avoid generic accidental triggers;
- prepare inactive/draft when supported.

Private reply:
`Here you go — here's the {guide title}:\n\n{tracked production URL}\n\nHope it helps.`

Tracked URL must include:
- `utm_source=instagram`;
- `utm_medium=dm`;
- registry campaign ID;
- registry DM keyword.

Optional public acknowledgement: `Sent it to your DMs.`

Never send unsolicited DMs.

## Activation

Activate only when the orchestrator explicitly says production guide -> GHL QA passed.

Before activation re-check:
- Instagram account;
- keyword;
- production guide URL;
- UTM values;
- duplicate active automations;
- registry still says `dmAutomationEnabled=true` and `campaignStatus=approved`.

Activate one approved automation first, run one authorized test interaction, verify exactly one DM and the correct tracked link, then activate additional approved automations.

In `handoff`, return:
- `draft_automation_count`;
- `active_automation_count`;
- automation IDs/keywords;
- test result.

If none are approved, do not fabricate an E2E success.
