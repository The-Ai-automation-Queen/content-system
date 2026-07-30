# Brief migration runbook, fully explicit

Companion to MIGRATION.md. Same 7 steps, but every command written out,
with a check after each step so you always know it worked before moving on.
Total time about 30 minutes, most of it waiting for DNS.

Two machines are involved:

| Name in this doc | What it is | How you reach it |
|---|---|---|
| OLD VPS | Serves brief.shiftandlead.com today (the purple site) | `ssh root@187.77.153.212` (root, always: this box predates the estate setup and has no other account) |
| ESTATE VPS | Serves www + guides, runs the machines, has this repo at `$HOME/content-system` | `ssh YOUR-USER@YOUR-ESTATE-IP` |

`YOUR-USER` is the normal account you created when you first set up the
estate VPS (SETUP-GUIDE.md step 1; bootstrap-vps.sh runs as that user, not
root, and there is no user named "deploy" unless you happened to create
one). If you forgot the name: it is the one that works in
`ssh -L 4322:localhost:4322 YOUR-USER@YOUR-ESTATE-IP`, the tunnel you use
for the dashboard.

Placeholders you replace while typing: `YOUR-USER`, `YOUR-ESTATE-IP`, and
the four secret values in step 2. Every command below that mentions a path
uses `$HOME`/`$USER`, so once you are logged in as the right user they are
copy-paste as written.

## Step 0. Pre-flight (2 min, from your Mac)

```bash
dig +short brief.shiftandlead.com
dig +short www.shiftandlead.com
```

Write both IPs down. Expected: brief shows 187.77.153.212 (the OLD VPS),
www shows the ESTATE VPS. If brief already shows the estate IP, stop: the
DNS is already moved and only steps 2, 4, 5, 6 apply.

Then confirm the repo path on the ESTATE VPS:

```bash
ssh YOUR-USER@YOUR-ESTATE-IP
ls $HOME/content-system/ai-insider-brief/ai-insider-brief/index.html
```

If that file is missing, run `git -C $HOME/content-system pull` first.

## Step 1. Copy the secrets off the OLD VPS (3 min)

```bash
ssh root@187.77.153.212
cat /root/ai-insider-brief-pipeline/.env
```

Copy the values of these four lines somewhere safe for step 2:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `GEMINI_API_KEY`
- `KIT_API_KEY` and/or `KIT_API_SECRET` (whichever are present)

Stay logged in or note anything else in that .env that looks custom; the
non-secret settings (crawl interval, model name, file paths) do NOT need
copying, they live in the repo's `pipeline/config.env`.

## Step 2. Put the secrets in Doppler on the ESTATE VPS (3 min)

```bash
ssh YOUR-USER@YOUR-ESTATE-IP
cd $HOME/content-system
doppler secrets set TELEGRAM_BOT_TOKEN='PASTE-VALUE'
doppler secrets set TELEGRAM_CHAT_ID='PASTE-VALUE'
doppler secrets set GEMINI_API_KEY='PASTE-VALUE'
doppler secrets set KIT_API_KEY='PASTE-VALUE'
doppler secrets set KIT_API_SECRET='PASTE-VALUE'
```

Check: `doppler secrets get TELEGRAM_CHAT_ID --plain` prints the value.

(If `doppler setup` was never run in this folder, run it once first and pick
the project/config you created during the estate bootstrap.)

## Step 3. Install the nginx site on the ESTATE VPS (5 min)

Still on the ESTATE VPS:

The shipped config file contains an example path (`/home/deploy/...`);
the sed below rewrites it to YOUR real home directory automatically:

```bash
sudo cp $HOME/content-system/deploy/brief-migration/brief.shiftandlead.com.nginx.conf /etc/nginx/sites-available/brief.shiftandlead.com
sudo sed -i "s|/home/deploy|$HOME|" /etc/nginx/sites-available/brief.shiftandlead.com
sudo ln -s /etc/nginx/sites-available/brief.shiftandlead.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Check, from the ESTATE VPS itself (DNS has not moved yet, so trick curl
into hitting this box):

```bash
curl -s -H "Host: brief.shiftandlead.com" http://localhost/ | grep -o '<title>[^<]*'
```

Expected: the Insider Brief title. If you get 404, the `root` path in the
nginx file is wrong; fix it and reload.

## Step 4. Flip DNS, then get the certificate (5 min + propagation)

1. In your DNS provider (wherever shiftandlead.com is managed), edit the
   A record for `brief` from `187.77.153.212` to `YOUR-ESTATE-IP`.
   TTL 300 if it lets you choose.
2. From your Mac, repeat until it shows the new IP (can take 5 to 30 min):

```bash
dig +short brief.shiftandlead.com
```

3. The moment it flips, on the ESTATE VPS:

```bash
sudo certbot --nginx -d brief.shiftandlead.com
```

Answer the prompts (redirect HTTP to HTTPS: yes).

Check, from your Mac: open https://brief.shiftandlead.com in a private
window. It should load over TLS and be BLUE, because it is now serving the
repo's styles.css. If it is still purple, your browser or DNS is cached;
try `curl -sI https://brief.shiftandlead.com | head -3` and hard-refresh.

## Step 5. Verify the approval bot service

The Git deployment installs and supervises the approval bot automatically.
Its private configuration and mutable queue remain under
`/root/ai-insider-brief-pipeline/`; reviewed code comes from this repository.
Verify it with:

```bash
systemctl status insider-brief-bot --no-pager
```

Expected: `active (running)`. The pipeline is plain Node with no npm
dependencies. Do not install a second pm2 or Doppler-managed copy; it would
compete for the same Telegram updates.

Check: send any URL to the bot in Telegram; it should reply with an
approval card. If the service is crash-looping, inspect it with
`journalctl -u insider-brief-bot -n 50`.

## Step 6. Install the crons (2 min)

On the ESTATE VPS, `crontab -e` and add the Brief block from
`deploy/crontab.example` (lines under "AI Insider Brief"), which is:

```
0 */12 * * *  cd $HOME/content-system/ai-insider-brief/ai-insider-brief/pipeline && node run.mjs >> /var/log/insider-brief-pipeline.log 2>&1
0 * * * *     cd $HOME/content-system/ai-insider-brief/ai-insider-brief/pipeline && node health-check.mjs >> /var/log/insider-brief-health.log 2>&1
0 5 * * 0     cd $HOME/content-system/ai-insider-brief/ai-insider-brief/pipeline && node weekly-audit.mjs >> /var/log/insider-brief-audit.log 2>&1
30 5 * * 2    cd $HOME/content-system/ai-insider-brief/ai-insider-brief/pipeline && node tuesday-preview.mjs >> /var/log/insider-brief-preview.log 2>&1
```

If the crons need the secrets, prefix each command with `doppler run --`
the same way the systemd unit does.

Check: run one crawl by hand and watch your Telegram for pending cards:

```bash
cd $HOME/content-system/ai-insider-brief/ai-insider-brief/pipeline
doppler run -- node run.mjs
```

## Step 7. Full verification, then retire the OLD VPS

All of these from your Mac:

- https://brief.shiftandlead.com loads, blue, over TLS
- https://brief.shiftandlead.com/robots.txt and /llms.txt resolve
- The Telegram bot answers
- The manual run in step 6 produced cards

Then on the OLD VPS: `pm2 stop insider-brief-bot && crontab -r` (stops its
bot and crons but leaves everything on disk). Keep the box for one week as
a fallback, then decommission it at your host. After that, one
`git -C ~/content-system pull` on the estate VPS deploys www, guides, and
the Brief together.

## If something goes wrong

- DNS flipped but the site is broken: point the A record back at
  187.77.153.212. The old VPS is untouched until step 7, so this rolls
  everything back in one edit.
- certbot fails with "challenge failed": DNS has not fully propagated,
  wait ten minutes and rerun the exact same command.
- Bot silent: `journalctl -u insider-brief-bot -n 50`; nine times out of
  ten it is a secret name typo in Doppler (compare against step 2's list).
