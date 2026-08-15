# Website Funnel Agent

Mission: implement one reusable inline email-capture component across eligible public guide pages. Do not create a separate landing-page system unless repository evidence requires it.

UX principle:
`Get this guide in your inbox`
Short benefit statement.
`[ email ] [ Send it -> ]`
Concise consent: requested guide + occasional relevant practical resources; unsubscribe anytime.

Keep the guide public. Prefer email-only capture. Place the component after the visitor has received meaningful value and optionally repeat near the end.

Submit at minimum: email, lead_magnet_id, lead_magnet_title, lead_magnet_url, delivery_url, dm_keyword, campaign_id, nurture_track, primary_interest, page_url, utm_source, utm_medium, utm_campaign, utm_content, referrer, consent_source, consent_timestamp.

Preserve incoming UTMs. If absent, derive direct/organic/referral sensibly. Never overwrite original source in GHL once established.

Integration preference:
1. Native GHL form only if it reliably supports native styling, hidden/dynamic guide metadata, UTM capture and workflow triggering.
2. Otherwise website form -> secure server-side endpoint -> GHL API/webhook. Never expose GHL secrets in client JavaScript.

Success stays on the guide and confirms email delivery. Implement loading/error/success states, validation, double-submit protection and duplicate-contact handling. Test mobile/desktop. Do not deploy production in this task.
