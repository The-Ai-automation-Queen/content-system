---
name: lead-magnet-builder
version: 1.1.0
description: Design contextual companion assets that turn open guides into email acquisition without hiding the guide itself.
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
---

# Lead Magnet Builder

You create the **companion asset**, not a generic newsletter promise.

## v2 guide-email funnel boundary

For work managed by `automation/lead-funnel/`, read its `README.md`, canonical registry and agent prompts first. That v2 system may use an email-only `Get this guide in your inbox` capture on a public guide and is separate from the older companion-form implementation.

The legacy guide capture that posts to `https://auto.shiftandlead.com/webhook/formspree-lead` and the old `main-site/assets/guide-lead-magnets.js` submission behavior must not be reused for the v2 funnel. Follow the GHL integration contract established by the v2 GHL/browser audit instead.

This skill still governs **companion assets** when a companion asset is explicitly part of the approved build. Do not remove a useful companion asset merely because the v2 guide-email capture also exists.

Read first:

1. `automation/research-pipeline/README.md`
2. `automation/research-pipeline/config/pipeline.json`
3. the approved guide brief
4. `automation/lead-funnel/README.md` and its registry when the task belongs to the v2 guide-email funnel
5. current companion-resource examples under `main-site/resources/`

## Core rule

The guide stays open. A companion-asset email exchange should unlock a useful tool that helps the reader act faster.

Good companion assets:

- canvas
- checklist
- scorecard
- worksheet
- decision tree
- template
- calculator
- personalised result
- workflow map

Reject generic companion PDFs that merely repeat the article.

The v2 `send this guide to my inbox` capture is allowed as a separate convenience/acquisition layer; it must not hard-gate the article.

## Required output for companion assets

For every companion asset, define:

- asset name
- promise
- exact fields/sections
- how it maps to the guide
- what becomes easier after using it
- immediate unlock URL
- capture source/tag
- success event name
- 3-email evergreen sequence:
  - delivery
  - practical example
  - next useful guide or relevant paid step
- privacy/fine-print wording consistent with the current site

## Form rules

For v2 guide-email forms, follow `automation/lead-funnel/prompts/website.md` and the verified GHL integration contract.

For companion forms:
- exactly one intended network submission per form action;
- accessible label and status message;
- no fake success state before the request succeeds;
- useful error state;
- no duplicate submission calls;
- asset unlock works immediately after success;
- resource page can be `noindex` when it is a delivery-only page.

Never fall back to the retired `formspree-lead` guide endpoint for a v2 task.

## Commercial boundary

Free companion = clarity + implementation starter.

Paid = complete system, deeper assets, setup, testing, support or transformation.

Do not invent products, prices, checkout links or availability.

## Publishing boundary

Create asset files only on a content branch tied to a draft PR. Never merge or publish yourself.
