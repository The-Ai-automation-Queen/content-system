# VPS Security Hardening — runbook

This locks down the VPS that runs the Content OS, so an exposed server doesn't
become the weak link. It's a thin, faithful adaptation of the affiseo.fr guide
**"Audit Sécurité — VPS & Agents IA" (step-04 VPS hardening)** to this repo.

> **Scope note:** this is *infrastructure* security (the box). It complements
> the repo's `security.md`, which covers *content/brand* security (secrets,
> queue-only publishing, voice safety). Both matter; they don't overlap.

## The golden rule (from the guide): never lock yourself out

The single biggest risk in VPS hardening is locking yourself out of SSH. So the
workflow is **plan → validate → backup → apply → test in a second session**:

1. **Plan first.** `./deploy/harden-vps.sh` (no args) prints exactly what it would
   change and touches nothing.
2. **Read the plan**, then apply: `sudo ./deploy/harden-vps.sh apply`.
3. It **backs up every file** it edits to `~/security-audit/04-vps/backups/<stamp>/`.
4. **Keep your current SSH session open.** After it reloads SSH, open a **second
   terminal** and confirm `ssh <user>@<vps-ip>` still works **before** closing the
   first. If it fails, revert (instructions below) — you're still logged in.

## What the script does

| Area | Change | Why |
|---|---|---|
| **Auto-updates** | `unattended-upgrades`, security only | Patches land without you |
| **fail2ban** | sshd jail · bantime 1h · findtime 10m · maxretry 3 | Bans SSH brute-force |
| **UFW firewall** | `deny incoming` / `allow outgoing`; SSH port only | Closes everything else, incl. dashboard :4321 |
| **SSH** | drop-in `99-content-os-hardening.conf`: root off, key-only*, `MaxAuthTries 3`, `LoginGraceTime 30`, `ClientAliveInterval 300`/`CountMax 2`, `X11Forwarding no`, `AllowTcpForwarding no`, `AllowUsers <you>` | Shrinks the SSH attack surface |

\* **Key-only is auto-guarded:** the script disables password login **only if**
your user already has a key in `~/.ssh/authorized_keys`. No key → it keeps
passwords on and tells you to run `ssh-copy-id` first. This is the anti-lockout
safeguard.

## The dashboard is now private-by-default

With UFW `deny incoming`, port **4321 is not exposed** to the internet. Reach
Mission Control securely with an SSH tunnel:

```bash
ssh -L 4321:localhost:4321 <user>@<vps-ip>
# then open http://localhost:4321 in your local browser
```

(Or put it on a Tailscale tailnet — the script auto-allows `tailscale0` if
Tailscale is installed.) This is **more** secure than the old "reverse proxy +
basic auth" note, so that's the recommended path now.

## Steps the script leaves to you (deliberately)

- **Change the SSH port** (22 → something in 22000–65000). Optional, lockout-risky,
  so it's manual: edit `Port` in `/etc/ssh/sshd_config`, then
  `ufw allow <newport>/tcp`, `sshd -t`, reload, and **test in a second session**
  before removing the old port rule.
- **Disable unused accounts:** list users with `awk -F: '$3>=1000{print $1}' /etc/passwd`
  and sudoers with `getent group sudo`; lock any you don't use with `usermod -L`.
- **Put a real passphrase** on your SSH private key (on your laptop, not the VPS).
- **Update-notifier email:** add your address in
  `/etc/apt/apt.conf.d/50unattended-upgrades` if you want upgrade emails.

## Reverting

- **SSH:** delete `/etc/ssh/sshd_config.d/99-content-os-hardening.conf` and
  `sudo systemctl reload ssh`. (Originals are also in the backup folder.)
- **UFW:** `sudo ufw disable`.
- **fail2ban:** `sudo systemctl stop fail2ban && sudo systemctl disable fail2ban`.
- Everything edited is in `~/security-audit/04-vps/backups/<stamp>/`.

## Where this fits in the install order

Run it **after** `install.sh` and **after** you've confirmed you can SSH in with
a key — but **before** you treat the box as production:

```
1. bash deploy/install.sh           # bootstrap + dashboard service
2. ssh-copy-id <user>@<vps-ip>       # make sure your key is installed
3. ./deploy/harden-vps.sh            # PLAN — read it
4. sudo ./deploy/harden-vps.sh apply # APPLY — then test in a 2nd session
5. crontab deploy/crontab.example    # schedule the loop
```

> Source & credit: affiseo.fr — *Audit Sécurité — VPS & Agents IA*, step-04.
