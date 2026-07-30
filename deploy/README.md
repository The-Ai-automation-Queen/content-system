# Deploy Kit — wiring the Content OS to run itself

This folder turns the Business OS from "skills that exist" into "a machine that
runs on a timer, alerts you when it breaks, and keeps a cockpit live 24/7."

It closes the **4 gaps** between this repo and a fully autonomous content
system. You have a **VPS** and **Telegram** — that's exactly what this kit needs.

> **The big shortcut:** on your own VPS, outbound network access is **open by
> default**. The "allowlist `*.blotato.io` / `api.heygen.com`" steps you saw
> earlier were *only* needed inside Claude's web sandbox. On the VPS, Gap 2 is
> simply "paste your API keys." That removes most of the friction.

| File | What it is |
|---|---|
| `install.sh` | One-shot VPS bootstrap (Node, Claude Code, deps, dashboard service) |
| `.env.example` | Every key/var, no values — copy to `.env` and fill |
| `run-machine.sh` | Runs one skill headless, retries, commits results, alerts |
| `telegram-notify.sh` | Sends a Telegram message (used by `run-machine.sh`) |
| `crontab.example` | The schedule (mirrors `scheduler.config.json`) |
| `content-os-dashboard.service` | systemd unit keeping Mission Control up 24/7 |
| `harden-vps.sh` + `SECURITY.md` | VPS security hardening (SSH/UFW/fail2ban/auto-updates) — plan-first |

---

## Agent Reach — giving the machines eyes

`install.sh` step 8 installs [Agent Reach](https://github.com/Panniantong/agent-reach),
a CLI that lets the machines read the open web: any page (via Jina Reader),
YouTube transcripts, RSS, GitHub, and — once configured — Twitter/X, Reddit,
LinkedIn and others. `signal-harvester` (M01) is the obvious consumer.

It lives in `~/.agent-reach-venv`, symlinked to `~/.local/bin/agent-reach`.
**Crons get a bare PATH — call it by absolute path** in `crontab`:

```bash
$HOME/.agent-reach-venv/bin/agent-reach doctor
```

### How the machines actually reach it

Installing the binary is not enough — the agent has to know the commands exist.
Step 8 registers Agent Reach's own skill into `~/.claude/skills/agent-reach/`,
which is where Claude Code looks for user-level skills. That is what makes it
available to the `claude -p` call inside `run-machine.sh`.

Note this is a **user-level** skill, deliberately outside this repo. Our 42
machines live in `skills/` and are found by convention, via `CLAUDE.md`. Agent
Reach is vendored third-party content, so it stays out of git rather than
drifting from upstream inside our tree. The consequence: it exists on the VPS
and on any machine where `install.sh` has run, but **not** in cloud agent
sessions. Those should use the Apify/Blotato connectors instead.

Two upstream behaviours the bootstrap works around, both silent if missed:

- The skill installer targets `~/.claude/skills` **only when that directory
  already exists**. Otherwise it falls back to `~/.agents/skills`, which Claude
  Code never reads — you get a successful-looking install that does nothing.
  Step 8 creates the directory first.
- It ships a Chinese `SKILL.md` and only selects the English one when the locale
  agrees. Step 8 sets `AGENT_REACH_LANG=en`.

Re-running `install.sh` overwrites the skill, so bumping `AGENT_REACH_COMMIT`
refreshes the docs along with the code.

### Routing

The skill dispatches by intent to `references/{search,social,career,dev,web,video}.md`,
and instructs the agent to run `agent-reach doctor --json` first to see which
backend currently serves each platform. Backends change when a platform breaks
something — read `active_backend`, don't assume:

```bash
$HOME/.agent-reach-venv/bin/agent-reach doctor --json
```

Three things to know before you extend it:

- **Pinned, not floating.** `AGENT_REACH_COMMIT` in `install.sh` pins an audited
  commit. Upstream's own docs tell you to install from `archive/main.zip` —
  whatever is on `main` at that moment, unsigned. Bump the SHA deliberately,
  after reading the diff.
- **Installed in `--safe` mode.** Left to itself, `agent-reach install --env=auto`
  writes to `/etc/apt/sources.list.d/`, runs `apt-get install`, and executes
  NodeSource's setup script as root. We don't let it — step 3 already provides
  Node. If you want the GitHub CLI, install `gh` yourself.
- **Cookie channels are an account-risk decision, not a config step.** Twitter,
  Reddit, XiaoHongShu and friends authenticate with exported session cookies,
  which are full-account bearer credentials stored in `~/.agent-reach/config.yaml`
  (mode 0600). Use a secondary account, never the Shift & Lead primaries. Do not
  put these cookies in Doppler-backed `.env` or anywhere in this repo — see
  `security.md`.

The `opencli` channel is deliberately **not** installed: it adds a third-party
Chrome extension plus a local daemon driving a real logged-in browser, from a
different maintainer. That is a much larger blast radius than a Python package
and needs its own decision.

---

## TL;DR — the whole thing in 7 commands

```bash
# on the VPS, as a sudo-capable user
git clone https://github.com/the-ai-automation-queen/content-system.git ~/content-system
cd ~/content-system
git checkout main                       # run the synced mirror, not a feature branch
bash deploy/install.sh                  # installs everything (incl. Doppler CLI) + starts dashboard

# Secrets — pick one:
doppler login && doppler setup          # Option A: Doppler (recommended — encrypted + auditable)
doppler secrets set TELEGRAM_BOT_TOKEN=xxx TELEGRAM_CHAT_ID=xxx ANTHROPIC_API_KEY=xxx
# OR: nano deploy/.env                 # Option B: plain .env fallback

./deploy/telegram-notify.sh "OS online" # you should get a Telegram ping
ssh-copy-id $USER@<vps-ip>              # ensure your SSH key is installed, then harden:
./deploy/harden-vps.sh                   # PLAN the hardening (changes nothing) — read it
sudo ./deploy/harden-vps.sh apply        # APPLY, then TEST ssh in a 2nd session (SECURITY.md)
sed -i "s|__REPO__|$PWD|g" deploy/crontab.example && crontab deploy/crontab.example
crontab -l                              # confirm the schedules are installed
```

That's the system live. The sections below explain each gap so you know what
each command actually did.

---

## Gap 1 — Always-on host + crons + Telegram alerts

**What you need:** a VPS running crons (02:00 write scripts, retry at 04:00 on
failure, every-5-min responder) with **Telegram failure alerts**.
**What this kit gives you:** exactly that, driven by `run-machine.sh` + cron.

### 1a. Create the Telegram bot (2 minutes)
1. In Telegram, message **@BotFather** → `/newbot` → follow prompts → copy the
   **bot token**.
2. Message **@userinfobot** (or your new bot, then visit
   `https://api.telegram.org/bot<TOKEN>/getUpdates`) to get your numeric
   **chat id**.
3. Put both in `deploy/.env`:
   ```
   TELEGRAM_BOT_TOKEN=123456:ABC...
   TELEGRAM_CHAT_ID=987654321
   ```
4. Test: `./deploy/telegram-notify.sh "hello from the OS"` → you get a message.

### 1b. Bootstrap the VPS
Run `bash deploy/install.sh`. It installs Node 20, the Claude Code CLI, the
dashboard's dependencies, writes `deploy/.env`, and registers the dashboard as a
systemd service that **auto-starts on boot and restarts on crash**.

### 1c. Authenticate Claude Code
Pick one (in `.env` or interactively):
- **API key:** set `ANTHROPIC_API_KEY=` in `deploy/.env`, **or**
- **Subscription (Max/Pro):** leave it blank and run `claude login` once.

### 1d. Smoke-test one machine before scheduling
```bash
./deploy/run-machine.sh "/vault-audit" 0 0
```
This runs the lightest skill headless, commits any output, and pings Telegram on
finish. Check `deploy/logs/` for the transcript. If this works, the loop works.

### 1e. Install the schedule
```bash
sed -i "s|__REPO__|$PWD|g" deploy/crontab.example
crontab deploy/crontab.example
```
You now have: brain-manager @ 20:00 (evening brain update), signal-harvester @
02:00, content-engine daily @ 02:30 (5 scripts ready by morning), performance-
tracker @ 03:00, the full weekly loop Monday @ 06:00, and the DM responder every
5 min. Each one alerts Telegram on failure (and on success). Edit times/timezone
in `crontab.example` to taste.

> `run-machine.sh` *is* the cron-with-retry-and-Telegram layer that
> `scheduler.config.json` only describes. Flip `scheduler.config.json`'s
> `alerts.telegram.wired` to `true` once 1a is done, so the doc matches reality.

### 1f. Harden the VPS (do this before treating the box as production)

A server that runs your brand unattended must be locked down. `deploy/harden-vps.sh`
does base hardening — SSH (root off, key-only, sane limits), **UFW** firewall,
**fail2ban**, and **automatic security updates** — adapted from the affiseo.fr
*"Audit Sécurité — VPS & Agents IA"* guide. It's **plan-first** so it can't
surprise-lock you out:

```bash
ssh-copy-id $USER@<vps-ip>            # make sure your key is installed FIRST
./deploy/harden-vps.sh                # PLAN — prints what it would do, changes nothing
sudo ./deploy/harden-vps.sh apply     # APPLY — backs up every file it edits
# then, in a SECOND terminal, confirm `ssh $USER@<vps-ip>` still works before logging out
```

A useful side effect: UFW closes everything except SSH, so the **dashboard
(:4321) becomes private** — reach it through a tunnel:
`ssh -L 4321:localhost:4321 $USER@<vps-ip>`. Full details, the manual extras
(SSH port change, disabling unused users), and how to revert are in
**`deploy/SECURITY.md`**.

---

## Gap 2 — Secrets management (Doppler) + API keys

**On the VPS there is nothing to allowlist.** Secrets are managed by **Doppler**
(encrypted, auditable, rotatable) instead of a plain `.env` file.

### 2a. Set up Doppler (one time, 3 minutes)

1. **Create a free account** at [doppler.com](https://doppler.com) — the free
   plan covers unlimited secrets and 5 projects (more than enough).
2. **On the VPS** (already installed by `install.sh`):
   ```bash
   doppler login                      # opens a browser link to authenticate
   doppler setup                      # select project: content-os, config: prd
   ```
3. **Add your secrets:**
   ```bash
   doppler secrets set \
     TELEGRAM_BOT_TOKEN=123456:ABC... \
     TELEGRAM_CHAT_ID=987654321 \
     ANTHROPIC_API_KEY=sk-ant-... \
     HEYGEN_API_KEY=... \
     UNIPILE_API_KEY=... \
     UNIPILE_DSN=...
   ```
   Add only the keys you actually use. You can also add them via the Doppler
   web dashboard (easier for copy-paste).

4. **Verify:** `doppler secrets` — should list your keys (values masked).

That's it. `run-machine.sh` auto-detects Doppler and injects secrets at runtime
via `doppler run`. No `.env` file needed — but `deploy/.env` still works as a
fallback if Doppler isn't configured.

### Why Doppler instead of `.env`

| | `.env` file | Doppler |
|---|---|---|
| Storage | Plain text on disk | Encrypted at rest + in transit |
| Rotation | SSH in, edit file, restart | One command or web UI, instant |
| Audit trail | None | Full history: who changed what, when |
| Team access | Share the file | Role-based access, no file sharing |
| Cost | Free | Free (up to 5 projects) |

### 2b. API keys

| Key in `.env` | Unlocks | Notes |
|---|---|---|
| `HEYGEN_API_KEY` | M02 talking-head of *you* (`skills/heygen`) | **The one paid tool worth it.** HeyGen → Settings → API. After your first clone, paste the **avatar_id + voice_id** into `inventory.md`. |
| `GHL_API_KEY` *(optional)* | M05 lead writes into GoHighLevel (`skills/dm-responder`) | Only if you want the skill to push leads into GHL directly. GHL already does comment→DM→capture→nurture **natively** — no key strictly required. |
| `UNIPILE_API_KEY` + `UNIPILE_DSN` | M05 LinkedIn DM automation (`skills/dm-responder`) | Auto-DM on LinkedIn comment keywords. Sign up at unipile.com, connect your LinkedIn account. |

### Tools you can SKIP (don't pay for these)
- **ManyChat** → **GoHighLevel** does it. You already run GHL; it catches the
  comment, sends the DM, captures the email, and runs your nurture flow. One tool.
- **Opus Clip** → **Reap** is MCP-wired (no key) and returns virality scores —
  the one thing Opus Clip charged for. **Blotato** is the free fallback. Skip Opus.
- **X / Twitter API** → **Apify** already scrapes X inside `signal-harvester`
  (`apidojo/twitter-scraper`). No paid X developer account.

> Apify / Tavily / Blotato / Canva / Gamma are MCP servers in the Claude env —
> not keys in this file.

The dashboard's machine panel reflects each machine's status automatically.

> **Verify end to end:** run a machine alone, e.g.
> `./deploy/run-machine.sh "/heygen" 0 0`, and watch `deploy/logs/`.

---

## Gap 3 — Finer M02 craft (a decision, not a missing wire)

The most polished content creators hand-craft B-roll: per-segment **motion
design** and **image→video** cinematic clips, assembled by a **human editor**.
This system takes the *more automated, fewer-moving-parts* path — **Blotato**
generates AI images + narrated video + assembly, no human editor.

**You are not missing the output — you're missing bespoke polish.** Decide:

- **Keep it lean (recommended to start):** stay on Blotato. To push quality, turn
  on Blotato's image-animation / story-video options inside `skills/visual-engine`
  (`blotato_create_visual`). Zero new vendors.
- **Add cinematic B-roll later:** if you want Hyperframe/Seedance-class clips,
  treat it as a *new machine* — add the API key to `.env`, write a small
  `skills/broll-engine/SKILL.md`, and have `visual-engine` call it per segment.
  Only worth it once the lean pipeline is consistently shipping.

No action is required to "fix" Gap 3 — it's a quality dial, not a broken wire.

---

## Gap 4 — Cockpit depth + live resources

Two of three sub-items are **already done in this repo**:

- ✅ **Approve / move a script through the pipeline** — the dashboard's status
  buttons (`DRAFT → READY → SCHEDULED → POSTED`) write straight back to
  `content-vault.md` via `/api/update`.
- ✅ **Editorial calendar** — a 14-day calendar (gold = scheduled, purple =
  posted) is now on the dashboard.

The remaining sub-items are **operator data** only you can supply:

1. **Lead-magnet URLs.** The three resources are now **written** (in
   `lead-magnets/`). You just need to host each and paste its URL. Easiest:
   host in **GoHighLevel** (page + opt-in + nurture, all in one) — full steps in
   `lead-magnets/README.md`. Then in `lead-magnets.csv`, paste the URL into
   `resource_url` and set `active` to `yes`. The DM responder won't hand out a
   link until its row is active.
   ```
   STACK,"The 3-Tool AI Stack I Actually Use",https://your.ghl/stack,What's Worth It,ENTRY 005,yes,...
   ```
2. **Connect TikTok to Blotato** (you have the account, it's not linked yet):
   Blotato dashboard → **Accounts → Add/Connect → TikTok** → log in and authorize.
   No code change — `distribution` will include it on the next run.

After editing `lead-magnets.csv`, the dashboard's "lead magnets active" count
updates on the next page refresh.

---

## Daily operation, once it's live

- **The machine runs itself** on the cron schedule and pushes its output to git.
- **You review in two places:** the **dashboard** (pipeline + calendar + what
  needs your input) and the **Blotato queue** (release scheduled posts — the
  system never auto-publishes; that's the `security.md` §3.1 checkpoint).
- **Telegram** pings you on every run's success/failure, so you only open the
  laptop when something needs you.

### Health checks
```bash
systemctl status content-os-dashboard     # cockpit up?
crontab -l                                 # schedules installed?
ls -lt deploy/logs | head                  # recent run transcripts
journalctl -u content-os-dashboard -n 50   # dashboard logs
```

### Safety / rollback
- Every run is a git commit — `git revert <sha>` undoes any bad pass.
- Skills are **queue-only**; nothing posts to a live channel without you
  releasing it in Blotato (`security.md` §3.1).
- Secrets live only in `deploy/.env`, which is git-ignored. Never commit it.
- Pause everything: `crontab -r` (removes schedules) and
  `systemctl stop content-os-dashboard`.
