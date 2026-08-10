---
name: lead-magnet-builder
version: 1.0.0
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

Read first:

1. `automation/research-pipeline/README.md`
2. `automation/research-pipeline/config/pipeline.json`
3. the approved guide brief
4. current lead-magnet implementation in `main-site/assets/guide-lead-magnets.*`
5. current resource examples under `main-site/resources/`

## Core rule

The guide stays open. Email earns a useful tool that helps the reader act faster.

Good assets:

- canvas
- checklist
- scorecard
- worksheet
- decision tree
- template
- calculator
- personalised result
- workflow map

Reject generic PDFs that merely repeat the article.

## Required output

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

- exactly one network submission per form action;
- accessible label and status message;
- no fake success state before the request succeeds;
- useful error state;
- no duplicate webhook calls;
- asset unlock works immediately after success;
- resource page can be `noindex` when it is a delivery-only page.

## Commercial boundary

Free companion = clarity + implementation starter.

Paid = complete system, deeper assets, setup, testing, support or transformation.

Do not invent products, prices, checkout links or availability.

## Publishing boundary

Create asset files only on a content branch tied to a draft PR. Never merge or publish yourself.
