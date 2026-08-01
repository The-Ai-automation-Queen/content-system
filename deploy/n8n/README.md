# Forms → n8n → GHL (no Formspree)

Every form on all three sites posts to n8n on the VPS. n8n puts the contact
into GHL, tagged with the form's source, and applications also become an
opportunity in a pipeline. Formspree is retired: no per-form IDs, no monthly
submission cap, nothing to maintain.

```
capture forms  → POST https://auto.shiftandlead.com/webhook/lead-capture
application forms → POST https://auto.shiftandlead.com/webhook/apply
```

Both payloads carry `email`, `source` (the per-form tag, e.g.
`guides-library-ribbon`, `www-build-sprint-apply`) and the `_gotcha`
honeypot. Applications add `name`, `business`, `task`, `team`, `timeline`.
The workflows drop any submission where the honeypot is filled.

## Fast path: one script (~5 minutes, Fatiha)

On the VPS, from the repo root:

```
export N8N_API_KEY='...'      # n8n -> Settings -> n8n API -> create key
export GHL_API_KEY='...'      # GHL -> Settings -> Private Integrations
export GHL_LOCATION_ID='...'  # GHL -> Settings -> Business Profile
bash deploy/n8n/setup.sh
```

Prerequisite: a GHL pipeline named "Build Sprint" whose first stage is
"New application" (the GHL public API cannot create pipelines). The script
looks up the pipeline IDs, creates the n8n credential from env, imports both
workflows with everything filled in, activates them, and fires a test
submission. Keys touch only your shell env, per security.md.

## Manual path (~15 minutes, if you prefer clicking)

1. **GHL API key.** GHL → Settings → Private Integrations (or API keys) →
   create a key with contacts + opportunities scopes. Copy it.
2. **n8n credential.** n8n → Credentials → New → *Header Auth*.
   Name: `GHL`. Header name: `Authorization`. Value: `Bearer <the key>`.
   The key lives only here. Never in this repo (see security.md).
3. **Import both workflows.** n8n → Workflows → Import from file →
   `lead-capture.workflow.json`, then `apply.workflow.json`.
   On each HTTP node, pick the `GHL` credential.
4. **Replace the three placeholders** (search REPLACE_WITH in each workflow):
   - `REPLACE_WITH_GHL_LOCATION_ID` — GHL → Settings → Business Profile.
   - `REPLACE_WITH_PIPELINE_ID` and `REPLACE_WITH_NEW_APPLICATION_STAGE_ID` —
     create a pipeline **Build Sprint** with stages
     `New application → Fit call → Building → Done`, then copy the IDs from
     the pipeline settings (or GET /opportunities/pipelines once).
5. **Activate both workflows** (toggle top-right).
6. **Never miss an application:** GHL → Automation → new workflow →
   trigger "Contact tag added: `apply-build-sprint` or `apply-workshop`" →
   action "Send internal notification". That is the whole point of keeping GHL.

## Test

```
curl -X POST https://auto.shiftandlead.com/webhook/lead-capture \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","source":"curl-test","_gotcha":""}'
```

Expect `{"ok":true}` and a new GHL contact tagged `curl-test`. Repeat against
`/webhook/apply` with a `name` field and expect a contact plus an opportunity
in New application. Delete the test contact afterwards.

## Notes

- The board metric "emails captured this week (n8n → GHL, by source tag)"
  reads straight from GHL contacts filtered by tag date now.
- Forms still work with JavaScript off: the form action posts the fields
  natively and n8n answers with a short confirmation.
- If n8n is ever down, submissions fail visibly (button shows "Try again");
  nothing is silently lost to a third party.
