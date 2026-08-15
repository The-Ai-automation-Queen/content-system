# Shift & Lead Lead-Funnel Orchestrator

This folder manages the reusable content-to-lead system:

Instagram content -> Blotato DM/comment automation -> Shift & Lead guide -> inline email capture -> GoHighLevel contact + attribution -> guide delivery -> nurture -> conversion/exit.

The public guides stay public. Email capture is an inline "Get this guide in your inbox" offer, not a hard content gate.

## Runtime

- Python 3.10+
- `openai-codex==0.144.4`
- Codex authentication available to the runtime
- Authenticated browser/computer-use capability available to Codex for GoHighLevel and Blotato
- GitHub/Vercel access available to the runtime when deployment is requested

The Codex SDK orchestrates threads and turns. Browser actions are performed by whatever browser/computer-use tool is installed in the Codex environment; they are not a dedicated Codex SDK method.

## Commands

```bash
cd automation/lead-funnel
python -m venv .venv
source .venv/bin/activate
pip install -e .

python orchestrator.py audit
python orchestrator.py bootstrap
python orchestrator.py campaign --brief briefs/new-campaign.md
python orchestrator.py repair --incident incidents/funnel-failure.md
```

Set a designated test address before any integration QA:

```bash
export FUNNEL_TEST_EMAIL="your-test-address@example.com"
```

Optional:

```bash
export CODEX_MODEL="<model-name>"
```

Do not store credentials in this folder. GHL, Blotato, Instagram, GitHub and Vercel authentication should remain in their normal authenticated environments or secret stores.

## Execution order

Bootstrap uses hard gates:

1. Audit only.
2. Validate/update canonical lead-magnet registry.
3. Configure reusable GHL fields/tags/workflows.
4. Build the reusable website capture and content campaign assets.
5. Prepare Blotato automations in draft/inactive state.
6. Preview QA.
7. Production deployment.
8. Production QA.
9. Activate approved Blotato automations.
10. Full Instagram-to-email end-to-end test.

The orchestrator stops on a failed/blocked gate. It must not report complete until final E2E QA passes.

## Folder map

- `orchestrator.py` — AsyncCodex dependency graph and CLI.
- `config/settings.example.json` — non-secret operating settings.
- `config/lead-magnets.json` — canonical current lead-magnet IDs, keywords and campaign metadata.
- `schemas/agent-result.schema.json` — structured handoff contract for every subagent.
- `prompts/` — durable developer instructions for each specialized thread.
- `state/` — local run reports; intentionally ignored by Git.

## Ownership boundaries

**Codex/repository:** content, registry, campaign metadata, social assets, orchestration.

**Shift & Lead website:** public guide experience, email capture, UTM/referrer capture, secure subscriber submission.

**GoHighLevel:** CRM, consent, original/latest attribution, tags, delivery, nurture, booking/purchase exits, unsubscribe/DND.

**Blotato:** Instagram publishing/DM handoff and tracked-link delivery. Blotato is not the CRM.

## Safety rules

Agents must inspect before creating, reuse equivalent objects, and be idempotent. They must never bulk-message existing contacts, DM users who did not trigger an automation, alter DNS, purchase/upgrade plans, delete production workflows/contacts, or expose secrets. 2FA, ambiguous accounts, paid-plan changes, DNS, destructive changes, or broad-audience messaging are stop conditions requiring human input.

## Canonical tracking

Tracked DM URLs follow:

```text
{guideUrl}?utm_source=instagram&utm_medium=dm&utm_campaign={campaignId}&utm_content={dmKeyword}
```

Original attribution fields are write-once. Latest attribution fields update on subsequent requests.

## Current guide registry

The registry is seeded from the live guides in `next-app/content/guides.json`. The audit/data-model agent must verify it against the repository before any external automation is activated.
