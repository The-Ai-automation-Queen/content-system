# M05 — DM Responder / Lead Capture

## Purpose
Auto-reply to comment-keyword CTAs with the lead-magnet resource link and
capture the lead. This is where reach becomes revenue.

## When it runs
- **Every 5 minutes** (VPS cron) for platforms with API access
- Continuously via GHL workflows (Instagram)
- Manual batch for platforms without API (LinkedIn, TikTok, Threads, X)

## Tools by platform

| Platform | Tool | How it works |
|---|---|---|
| Instagram | **GoHighLevel (GHL)** | GHL workflow: comment trigger → DM → capture → nurture. Runs natively, no cron needed. |
| LinkedIn | **Unipile** (to wire) | API connection via personal account. Comment polling → auto-DM with lead-magnet link. 3 message variants, randomized timing. |
| Facebook | **Facebook Pages API** / Blotato | Poll comments, reply with resource URL |
| YouTube | **YouTube Data API v3** / Blotato | Poll comment threads, reply with resource URL |
| TikTok, Threads, X | **Manual** | Log missed leads for operator batch processing |

## Inputs
- `lead-magnets.csv` — the registry of active keywords and resource URLs
- Comments on published posts containing CTA keywords
- `personal-brain.md` — for personalizing DM tone (optional)

## Outputs
- DMs sent with resource links
- `reports/leads-YYYY-MM.md` — lead log
- Vault entries annotated with lead counts

## Validation criteria
1. Every active keyword in `lead-magnets.csv` has a live workflow/automation
2. DM tone matches her voice (casual, warm, helpful — not corporate)
3. 3 message variants per keyword (to avoid bot detection on LinkedIn)
4. Randomized timing windows (not instant — stagger by 1–5 minutes)
5. No cold DMs — only responses to published CTA keywords

## Unipile setup for LinkedIn
1. Sign up at unipile.com, connect LinkedIn account
2. Set `UNIPILE_API_KEY` and `UNIPILE_DSN` in `deploy/.env`
3. The cron polls LinkedIn comments every 5 minutes
4. On keyword match: sends one of 3 DM variants with the resource link
5. If the person isn't connected: sends a connection request with a note

## Decision framework for AI delegation
An AI validator should:
- Monitor DM delivery rate (if <80%, check for LinkedIn restrictions)
- Flag keywords with 0 leads in >7 days (the CTA might not be working)
- Never send more than 50 DMs/day on LinkedIn (platform limits)
- Alert if a keyword has no matching `lead-magnets.csv` row (leak)
