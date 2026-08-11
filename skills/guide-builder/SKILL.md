---
name: guide-builder
version: 1.1.0
description: Build an explicitly approved Shift & Lead guide and its contextual companion asset from a research-pipeline brief, on a dedicated branch and draft PR, without publishing or merging.
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
---

# Guide Builder

You are the production agent that runs only after an opportunity has been explicitly approved in `automation/research-pipeline/queues/approved.json`.

Read first:

1. `automation/research-pipeline/README.md`
2. `automation/research-pipeline/config/pipeline.json`
3. `automation/research-pipeline/config/status-model.json`
4. `automation/research-pipeline/queues/approved.json`
5. the approved opportunity record in `queues/opportunities.json`
6. its guide brief in `automation/research-pipeline/briefs/`
7. all cited source captures
8. `skills/guide-architect/SKILL.md`
9. `skills/lead-magnet-builder/SKILL.md` when a companion asset is approved
10. `skills/editorial-qa/SKILL.md`
11. the current live guide template/build scripts/assets so the new work fits the existing system

## Entry condition

Do nothing unless the exact approved queue item contains:

- `opportunity_id`
- an explicit approval `action` that includes the artifact you are about to build
- `status: "approved_to_build"`
- `approved_at`

A conversational approval from the operator should first be written into that queue by the active assistant. This skill does not infer approval from a score, a completed brief, a dashboard recommendation or prior conversation.

Before substantive work, transition the approved queue item to `building`.

## Branch and PR convention

Create a dedicated branch:

`research/<opportunity-id>`

If it already exists and is tied to the same approved opportunity, continue on it idempotently.

Open a **draft PR** titled:

`Research guide: <outcome-first title>`

The PR body must reference:

- opportunity id
- guide brief path
- research source ids
- public guide path
- companion lead magnet path when built
- useful visual/motion added
- weak/time-sensitive claims deliberately omitted
- QA status

Never merge the PR yourself.

## Build order

1. Build/modify the guide HTML through the current canonical guide architecture and final build pipeline.
2. Keep the guide fully open; do not insert an email wall into the article.
3. Build the contextual companion asset and accessible email-capture component only when approved.
4. Add/update library metadata/card only if the guide is new.
5. Add one useful visual only when the brief calls for it and it teaches something.
6. Add GSAP interaction only when the brief calls for it; preserve no-JS readability and reduced-motion behaviour.
7. Add SEO/canonical/OG metadata.
8. Wire internal links and one primary CTA.
9. Run editorial QA before requesting human review.

## Guide content law

Use:

`ANSWER → SEE IT → TRY IT → USE IT → GO FURTHER`

The answer must appear early.

All reader-facing titles are outcome-first.

Use one terminology system. If the brief says `AI assistant`, do not drift into `AI worker`, `AI employee` or `agent` unless the distinction is explicitly taught.

Do not add filler for SEO length.

Translate technical research into a recognisable business outcome. Do not expose implementation complexity just because the source is technical.

Keep human review/accountability visible wherever AI takes actions or handles sensitive work.

## Visual law

No decorative hero image.

Allowed visuals explain a relationship, sequence, comparison, decision or transformation.

For Excalidraw-like diagrams, prefer responsive SVG/HTML. Use anchored labels and simple geometry; avoid unanchored stars, checkboxes or doodles that can drift into other elements.

The Shift & Lead visual base is off-white + ink + brand blue, with controlled supporting colours such as teal, violet/lavender and warm amber/coral when they clarify meaning.

## Lead magnet law

The companion asset must be more useful than a copy of the guide.

One form action = one network POST.

Success must wait for a successful response. Provide visible error state and accessible status text.

The email capture should unlock the resource immediately and may start an evergreen delivery/example/next-step email sequence only if that infrastructure is actually connected.

The paused AI Insider Brief must not be used as the generic CTA.

## QA gate

Run `skills/editorial-qa/SKILL.md` and record one verdict:

- `PASS_FOR_HUMAN_REVIEW`
- `FIX_REQUIRED`
- `BLOCKED_EVIDENCE`
- `BLOCKED_PRODUCT_DECISION`

If fixable, repair before notifying the operator.

If blocked, do not work around the blocker by inventing a claim/product decision. Set the approved queue status to `needs_decision` and record the reason.

## State transitions

Use `config/status-model.json`.

Normal path:

`approved_to_build → building → pr_open → pass_for_human_review → merged_by_human → production_verified`

Human merge is mandatory between `pass_for_human_review` and `merged_by_human`.

After opening the PR, store:

- `branch`
- `pr_number`
- `pr_url`
- `qa_verdict`

in the approved queue record.

The Research Build & QA task owns post-merge custom-domain verification.
