# Brief fix runbook — single-server reality (rewritten 2026-07-14)

> **What changed since the first version of this file:** production turns
> out to be ONE server. `dig` shows www.shiftandlead.com AND
> brief.shiftandlead.com both resolve to 187.77.153.212, and the nightly
> `ops(...)` commits in git prove the machines run there too (they pull
> main before every run via `deploy/run-machine.sh`). The "estate VPS vs
> old VPS" split in MIGRATION.md was a plan, not reality. So there is no
> DNS flip, no certbot, no secret copying between machines. The whole fix
> is: get back into the one box, point the Brief's nginx vhost at the
> repo's copy of the frontend, reload nginx.

The box: `ssh root@187.77.153.212` (root; no other account is known to
exist there).

## Part A. Get SSH access back

The box runs this repo's hardening kit: fail2ban bans an IP for **1 hour**
after **3 failed logins within 10 minutes**, and a ban looks like
`Connection refused`. If you were just banned:

1. Wait 60+ minutes from your last failed attempt, OR test from a truly
   different IP (turn the Mac's WiFi OFF first, then hotspot; if WiFi
   stays on, you are still leaving through your banned home IP).
2. `ssh root@187.77.153.212` — you have 2 careful attempts. The root
   password is from the original server setup (password manager, or the
   provider's "your server credentials" welcome email).
3. If SSH stays refused from every IP even after an hour, sshd itself is
   down. Find the provider with `whois 187.77.153.212 | grep -iE
   "orgname|netname|descr"`, log into their dashboard, and use the web
   console (VNC/serial). Log in as root there and run:
   `systemctl restart ssh || systemctl restart sshd` and
   `ufw allow 22/tcp`. The provider console never touches SSH, so
   fail2ban cannot block it. "Reset root password" in the same dashboard
   solves a lost password.

Once you are in, unban your home IP so you stop tripping over old bans:

```bash
fail2ban-client status sshd          # shows currently banned IPs
fail2ban-client set sshd unbanip YOUR-HOME-IP
```

## Part B. Fix the purple Brief (5 minutes, on the box)

1. Find where the repo lives on this box (the machines run from it):

```bash
crontab -l | grep -o '[^ ]*content-system[^ ]*' | head -3
ls /root/content-system/site/index.html 2>/dev/null && echo "repo at /root/content-system"
```

2. Pull main (this also deploys the motion system + text cuts if the
   machines have not pulled since the merge):

```bash
git -C /root/content-system pull --ff-only    # adjust path from step 1
```

3. See what nginx currently serves for the Brief:

```bash
nginx -T 2>/dev/null | grep -B2 -A8 'brief.shiftandlead.com'
```

Note the `root` line. It will point at the stale copy (something like
`/root/ai-insider-brief-pipeline/...`), which is why the site is purple.

4. Point it at the repo copy instead:

```bash
sed -i 's|root .*;|root /root/content-system/ai-insider-brief/ai-insider-brief;|' /etc/nginx/sites-available/THE-BRIEF-CONF-FILE
nginx -t && systemctl reload nginx
```

(Use the conf filename that step 3's output came from. If the vhost lives
in `/etc/nginx/conf.d/`, same edit there. Adjust the repo path if step 1
found it elsewhere.)

5. Verify from your Mac: hard-refresh https://brief.shiftandlead.com —
   blue. Also check the estate-wide deploy landed:

```bash
curl -sI https://www.shiftandlead.com/motion.js | head -1        # 200
curl -sI https://guides.shiftandlead.com/lib/motion.js | head -1 # 200
```

## Part C. Aftercare (worth 10 minutes while you are in)

- The Brief pipeline (crawler, approval bot, crons) already runs on this
  box against `/root/ai-insider-brief-pipeline/`. It can stay as is for
  now; only the FRONTEND vhost needed repointing. When you want the
  pipeline to run from the repo too (so `git pull` updates everything),
  follow MIGRATION.md steps 4-6 on this box, skipping DNS/certbot.
- While SSHed in, fill the real Umami website IDs (see
  deploy/analytics/README.md) and commit+push, so analytics finally
  records www traffic.
- Optional hands-off deploys: add
  `*/10 * * * * git -C /root/content-system pull --ff-only >> /var/log/site-pull.log 2>&1`
  to `crontab -e`. With the machines already pulling before each run this
  mostly tightens the merge-to-live delay to 10 minutes.

## What this file replaces

MIGRATION.md (and the first version of this runbook) described moving the
Brief from an "old VPS" to a separate "estate VPS". Keep MIGRATION.md only
as a reference for the day a second server actually exists. For today's
production, this file is the accurate procedure.
