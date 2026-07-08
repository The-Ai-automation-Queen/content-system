# Analytics go-live (Umami, self-hosted)

Owner decision 2026-07-08: analytics ON, privacy-respecting, no third-party
vendor. privacy.html already discloses it. The tracking snippet is already on
every rendered page of www, guides, and the Brief with placeholder website
IDs; nothing is collected until the steps below run (a missing script fails
silently and does not affect visitors).

## One-time setup on the VPS (about 15 minutes)

1. DNS: add an A record `stats.shiftandlead.com` pointing at the VPS.
2. Secrets (Doppler): set `UMAMI_DB_PASSWORD` (random 32 chars) and
   `UMAMI_APP_SECRET` (random 32 chars).
3. `cd deploy/analytics && doppler run -- docker compose up -d`
4. Reverse proxy: route `stats.shiftandlead.com` -> `127.0.0.1:3100`
   (same nginx/caddy pattern as auto.shiftandlead.com), with TLS.
5. Log into Umami (default admin/umami, change the password immediately).
   Create 3 websites: www.shiftandlead.com, guides.shiftandlead.com,
   brief.shiftandlead.com. Copy each website ID.
6. Fill the IDs into the pages (run from the repo root, then commit):

   sed -i "s/UMAMI-WWW-ID/<www-id>/g" main-site/*.html
   sed -i "s/UMAMI-GUIDES-ID/<guides-id>/g" site/*.html site/guides/*.html
   sed -i "s/UMAMI-BRIEF-ID/<brief-id>/g" ai-insider-brief/ai-insider-brief/index.html

## What you get

- Per-page views, referrers, countries, devices for all 3 properties.
- The guide-reader -> buyer journey: cross-domain CTAs already carry
  utm_source=guides / utm_source=brief with per-page utm_content, so the
  www property shows exactly which guide sent each visitor to the money
  pages. Form conversions stay measured first-party via the n8n -> GHL
  source tags (fast-forward-waitlist, workshops-fit-call,
  homepage-time-leak-quiz).
- No cookies, no consent banner needed under GDPR/ePrivacy for
  cookieless, non-identifying analytics; privacy.html discloses it anyway.
