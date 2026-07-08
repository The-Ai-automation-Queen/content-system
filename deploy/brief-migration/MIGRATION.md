# Move brief.shiftandlead.com onto the estate VPS

Goal: one VPS, one repo, one pull deploys everything. The Brief's frontend
source already lives in this repo (ai-insider-brief/ai-insider-brief/), so
after this migration a normal `git pull` updates the Brief exactly like the
other sites, and the old VPS (187.77.153.212) retires.

## Steps (about 30 minutes, in order)

1. SECRETS into Doppler on the estate VPS (from the old VPS's
   /root/ai-insider-brief-pipeline/.env): TELEGRAM_BOT_TOKEN, CHAT_ID,
   GEMINI_API_KEY, KIT_API_SECRET (plus the Kit tag ids if set).
2. NGINX: install deploy/brief-migration/brief.shiftandlead.com.nginx.conf
   (adjust the repo path), symlink to sites-enabled, `nginx -t`, reload.
3. TLS + DNS: point the brief.shiftandlead.com A record at the ESTATE VPS
   IP, wait for propagation, then `certbot --nginx -d brief.shiftandlead.com`.
   (Order matters: certbot needs the DNS to resolve here first. Expect a few
   minutes of downtime during propagation; the old VPS keeps serving until
   DNS flips.)
4. BOT: install deploy/brief-migration/insider-brief-bot.service, enable it,
   check `systemctl status insider-brief-bot` and send the bot a test URL on
   Telegram.
5. CRON on the estate VPS (crontab -e), the Brief block from
   deploy/crontab.example: 12h crawl, hourly health-check, Sunday audit,
   Tuesday preview.
6. VERIFY: https://brief.shiftandlead.com loads over TLS, robots.txt and
   llms.txt resolve, the bot answers, one manual `node pipeline/run.mjs`
   produces pending cards to your Telegram.
7. RETIRE the old VPS: stop its pm2/cron, keep it a week as fallback, then
   decommission. Nothing on it is unique anymore: code is in git, cards
   data lives in this repo path, secrets are in Doppler.

## What changes day to day

- Deploys: `git -C ~/content-system pull` updates www, guides, AND the Brief.
- The pipeline writes pending cards and published cards inside the repo
  working copy; the machines' existing pull-before-run flow already
  handles committing outputs back.
