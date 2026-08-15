# Shift & Lead Lead-Funnel Orchestrator

This folder manages the v2 content-to-lead system:

`Instagram -> Blotato -> tracked public guide -> inline email capture -> GoHighLevel -> guide/companion delivery -> nurture -> conversion/exit`

The guide stays public. For guides without a stronger companion asset, the default offer is `Get this guide in your inbox`.

## Important migration rule

The previous guide capture that posts to:

`https://auto.shiftandlead.com/webhook/formspree-lead`

and the old `main-site/assets/guide-lead-magnets.js` submission behavior are **legacy for this project**. Existing useful companion assets may remain, but their old form mechanism must not be reused by the new guide funnel.

The v2 funnel must integrate with GoHighLevel using one verified method:

1. a native GHL form/embed only if it supports the required dynamic guide/offer metadata, attribution and styling; or
2. a new secure server-side website/Vercel endpoint that talks to GHL without exposing credentials in browser code.

The GHL browser audit decides which supported integration is used. Do not guess.

## Existing companion assets are preserved

This repository already has a separate companion-asset strategy in:

`data/guide-lead-magnets.json`

That remains the source of truth for companion-asset strategy. The new orchestrator does not replace it.

The v2 routing source is:

`automation/lead-funnel/config/guide-funnels.json`

It decides what each guide captures and delivers. If a useful companion asset is already built, the v2 form should preserve that stronger offer and route delivery through GHL. If no companion exists, the form can simply send the public guide to the subscriber's inbox.

Current built companion routes include:
- First AI Employee -> `/resources/ai-assistant-builder.html`
- Research to Content -> `/resources/research-to-content-workflow.html`

The audit must verify these routes rather than trusting stale planning metadata.

## Runtime

- Python 3.10+
- `openai-codex==0.144.4`
- `python-dotenv`
- Codex authentication available to the runtime
- authenticated browser/computer-use capability available to Codex for GHL and Blotato
- GitHub/Vercel access available when release work is requested

The Codex SDK orchestrates threads and turns. Browser actions are performed by the browser/computer-use capability installed in the Codex environment; they are not a dedicated SDK method.

## Install

```bash
cd automation/lead-funnel
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
cp .env.example .env
```

Set a designated test address in `.env`:

```text
FUNNEL_TEST_EMAIL=your-test-address@example.com
```

Optional:

```text
CODEX_MODEL=<model-name>
```

`.env`, `.venv`, caches and local run reports are ignored by Git. Never store GHL, Instagram, Blotato, GitHub or Vercel credentials in this folder.

## Commands

```bash
python orchestrator.py audit
python orchestrator.py bootstrap
python orchestrator.py launch --pr 123
python orchestrator.py campaign --brief briefs/new-campaign.md
python orchestrator.py repair --incident incidents/funnel-failure.md
```

### `audit`

Read-only. Confirms the repository, GHL account/location, Blotato/Instagram account, current/legacy forms, existing companion assets, Vercel project and available browser capabilities.

### `bootstrap`

Builds/prepares the reusable v2 infrastructure and stops after a draft PR plus preview QA. It does **not** merge the PR or publish production by itself.

Sequence:

1. audit;
2. guide-funnel registry validation against guides + companion strategy + real resource routes;
3. GHL v2 architecture and website integration contract;
4. website capture + content assets;
5. approved Blotato automations prepared inactive;
6. dedicated branch + draft PR + Vercel preview;
7. preview/integration QA;
8. stop at `ready_for_human_review`.

### Human gate

Review and merge the draft PR manually after preview QA passes.

The existing repository production policy requires a human merge. The orchestrator must never merge its own content/site PR.

### `launch --pr <number>`

Run only after the reviewed PR was manually merged.

Sequence:

1. verify the PR was human-merged;
2. verify Vercel production is READY;
3. run production guide -> GHL capture/delivery QA;
4. activate only explicitly approved Blotato DM automations;
5. if at least one DM automation is active, run the full Instagram E2E test.

If no DM campaign is approved yet, launch ends with `capture_live_dm_pending`: the website/GHL funnel is live, but DM activation waits for an approved campaign.

### `campaign`

Creates one approved content/lead-magnet campaign using the existing infrastructure. It prepares a draft PR and preview QA, then stops for human review. It does not rebuild the master CRM architecture or merge itself.

### `repair`

Finds the earliest failing point and makes the smallest responsible repair, followed by regression QA.

## Funnel registry

`config/guide-funnels.json` separates:

- `guideStatus`: whether the guide is public/live;
- `captureEnabled`: whether the new email capture should appear;
- `offerType`: `guide_email` or `companion_asset`;
- `offerTitle` and `deliveryUrl`: what GHL actually sends;
- `dmAutomationEnabled`: whether Blotato DM automation may exist;
- `campaignStatus`: `planned`, `approved`, or `active`.

A live guide does **not** automatically mean its Instagram DM automation is approved.

All current guides are seeded with capture enabled and DM automation disabled. DM activation must be explicit per campaign.

## Tracking

Blotato sends the production guide URL with:

```text
?utm_source=instagram&utm_medium=dm&utm_campaign={campaignId}&utm_content={dmKeyword}
```

The website submits guide/offer/campaign metadata and incoming attribution to GHL.

Original attribution is write-once. Latest attribution updates on later requests.

## GHL ownership

GHL owns:

- contact upsert/deduplication;
- consent record;
- first/latest lead magnet;
- original/latest attribution;
- offer/delivery URL;
- delivery email;
- nurture;
- unsubscribe/DND;
- conversion exits.

The v2 workflows must be scoped to the v2 capture source/version so they cannot accidentally enroll contacts from unrelated legacy forms.

If a server-side GHL credential is required, it must be provisioned directly into the Vercel/secret environment. It must never be returned in agent handoffs, logs or client code.

## Safety

Agents must inspect before creating, reuse equivalent objects, and remain idempotent. They must never bulk-message existing contacts, send unsolicited DMs, alter DNS, purchase/upgrade plans, delete production data, expose secrets, or bypass 2FA.

2FA, ambiguous accounts/locations, destructive changes, DNS, billing changes or broad-audience messaging are stop conditions requiring human action.
