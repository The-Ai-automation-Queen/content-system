# Forms → n8n → GHL (no Formspree)

Every form on all three sites posts to n8n on the VPS. n8n puts the contact
into GHL, tagged with the form's source, and applications also become an
opportunity in a pipeline. Formspree is retired: no per-form IDs, no monthly
submission cap, nothing to maintain.

```
every form → POST https://auto.shiftandlead.com/webhook/formspree-lead
```

That webhook has been live in n8n all along (the path name is a relic of the
retired Formspree era) and already hands submissions to GHL by source tag.
Nothing needs importing or configuring for capture to work.

Both payloads carry `email`, `source` (the per-form tag, e.g.
`guides-library-ribbon`, `www-build-sprint-apply`) and the `_gotcha`
honeypot. Applications add `name`, `business`, `task`, `team`, `timeline`.
The workflows drop any submission where the honeypot is filled.

## Optional upgrade: pipeline + notifications (whenever, not urgent)

Applications currently land in GHL as contacts tagged with their source
(`www-build-sprint-apply`, workshops). If you want each application to also
become an opportunity in a Build Sprint pipeline with a notification, run the
one-shot script below on the VPS. It is an upgrade, not a requirement; no
lead is lost without it.

```
export N8N_API_KEY='...'      # n8n -> Settings -> n8n API
export GHL_API_KEY='...'      # GHL -> Settings -> Private Integrations
export GHL_LOCATION_ID='...'  # GHL -> Settings -> Business Profile
bash deploy/n8n/setup.sh
```

Prerequisite for the script: a GHL pipeline named "Build Sprint" whose first
stage is "New application". After it runs, point the application forms at
/webhook/apply (one sed, or ask the agent).

## Health check

n8n -> Executions -> filter by the formspree-lead workflow. Every form
submission on the sites should appear there within seconds of submitting.
