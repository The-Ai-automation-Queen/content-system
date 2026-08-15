# Shift & Lead Lead Magnets

This folder contains lead-magnet source material accumulated across several versions of the Shift & Lead funnel.

## Current rule — August 2026

The public Guides library stays open. Do **not** put the guide itself behind an email wall.

The current v2 acquisition model is:

```text
OPEN GUIDE
  → EMAIL CAPTURE
  → SEND THE GUIDE OR A STRONGER BUILT COMPANION ASSET
  → RELEVANT FOLLOW-UP
  → PAID QUICK WIN / COURSE / SERVICE WHEN LIVE
```

The canonical live-guide source is `next-app/content/guides.json`. Only entries with `status: "live"` belong in the current lead-magnet guide map.

The companion-asset strategy is stored in `data/guide-lead-magnets.json`. Its `guides` array must mirror the current live guide library 1:1. Funnel routing, GHL tags, campaign IDs and Blotato activation state are stored separately in `automation/lead-funnel/config/guide-funnels.json`.

If a useful companion asset already exists, preserve it because it is a stronger reason to give an email. If no companion exists yet, the v2 form may simply offer `Get this guide in your inbox` and GHL sends the public guide URL.

Do not use the retired `https://auto.shiftandlead.com/webhook/formspree-lead` guide submission mechanism for v2.

## Current live guides

The current guide/lead-magnet map contains these 14 live guide slugs:

- `24-7-operations-system`
- `ai-jargon-guide`
- `chatgpt`
- `claude`
- `copilot`
- `first-ai-employee`
- `follow-up-setup`
- `gemini`
- `inbox-manager-setup`
- `stack-3-tool-ai-stack`
- `research-to-content-workflow`
- `what-is-a-prompt`
- `what-is-agentic`
- `what-is-ai`

Demoted guide records in `next-app/content/guides.json` are not included in the current acquisition map.

## Built companion assets

| Live guide | Companion asset | Status | Public resource |
|---|---|---|---|
| `first-ai-employee` | AI Assistant Builder | **Live build** | `/resources/ai-assistant-builder.html` |
| `research-to-content-workflow` | Research-to-Content Workflow Map | **Live build** | `/resources/research-to-content-workflow.html` |

For the other current live guides, the v2 default is to send the guide itself until a stronger companion asset is actually built and verified.

## Companion asset boundary

A companion asset should help the reader **do** the thing they just learned. Good formats include a worksheet, checklist, scorecard, decision tree, canvas, template or personalised diagnostic result.

A planned companion concept is not automatically a live resource. Future concepts remain in the `futureConcepts` section of `data/guide-lead-magnets.json` until they are built and verified.

## Flagship diagnostic

The existing `What should you build with AI first?` quiz can evolve into the **AI Opportunity Map** acquisition asset. The visible result can remain free; email can unlock/save a useful companion result.

## Legacy files

Files such as `first-ai-employee.md`, `follow-up-setup.md`, `stack-3-tool-ai-stack.md`, `voice-clone-pipeline.md`, older comment-keyword resources and `chez-*.html` are source material, not automatically approved live assets.

Before publishing any legacy resource:

1. rewrite the title outcome-first;
2. remove hype and stale offer language;
3. verify every tool-specific claim;
4. preserve human review and permission boundaries;
5. make the asset materially useful;
6. use the current Shift & Lead visual system;
7. connect it to one relevant next step;
8. verify the v2 email submission, GHL attribution and delivery path.
