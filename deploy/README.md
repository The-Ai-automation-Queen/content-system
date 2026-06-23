# Deploy Kit — wiring the Content OS to run itself

This folder turns the Business OS from "skills that exist" into "a machine that
runs on a timer, alerts you when it breaks, and keeps a cockpit live 24/7."

It closes the **4 real gaps** between this repo and Romain Brunel's always-on
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

---

## TL;DR — the whole thing in 7 commands

```bash
# on the VPS, as a sudo-capable user
git clone https://github.com/the-ai-automation-queen/content-system.git ~/content-system
cd ~/content-system
git checkout main                       # run the synced mirror, not a feature branch
bash deploy/install.sh                  # installs everything + starts the dashboard
nano deploy/.env                        # paste keys (Telegram + the machine APIs you use)
./deploy/telegram-notify.sh "OS online" # you should get a Telegram ping
sed -i "s|__REPO__|$PWD|g" deploy/crontab.example && crontab deploy/crontab.example
crontab -l                              # confirm the 3 schedules are installed
```

That's the system live. The sections below explain each gap so you know what
each command actually did.

---

## Gap 1 — Always-on host + crons + Telegram alerts

**What Romain has:** a VPS running crons (02:00 write scripts, retry at 04:00 on
failure, every-5-min responder) with **Telegram failure alerts**.
**What this kit gives you:** the same, driven by `run-machine.sh` + cron.

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
You now have: daily signal harvest @ 02:00 (1 retry), the full weekly loop Monday
@ 06:00 (1 retry), and the DM responder every 5 min. Each one alerts Telegram on
failure (and on success). Edit times/timezone in `crontab.example` to taste.

> **Why this mirrors Romain exactly:** `run-machine.sh` *is* the cron-with-retry-
> and-Telegram layer that `scheduler.config.json` only describes. Flip
> `scheduler.config.json`'s `alerts.telegram.wired` to `true` once 1a is done, so
> the doc matches reality.

---

## Gap 2 — Live API keys (paste, don't allowlist)

**On the VPS there is nothing to allowlist.** Just paste the keys for the
machines you want live, in `deploy/.env`. Each is independent — wire them as you
get to them.

| Key in `.env` | Unlocks | Where to get it |
|---|---|---|
| `HEYGEN_API_KEY` | M02 talking-head of *you* (`skills/heygen`) | HeyGen → Settings → API. After your first clone, paste the **avatar_id + voice_id** into `inventory.md`. |
| `OPUS_CLIP_API_KEY` | M03 long-video → many shorts (`skills/reels-factory`) | Opus Clip → API. (Blotato is the built-in fallback if you skip this.) |
| `MANYCHAT_API_KEY` | M05 IG comment→DM→lead (`skills/dm-responder`) | ManyChat → Settings → API. Also build the IG automations per `lead-magnets.csv`. |
| `X_API_KEY` | M01 X/Grok signals (`skills/signal-harvester`) | X developer portal. (Apify + Tavily are already MCP-wired in the Claude env.) |

The dashboard's machine panel flips a machine from **needs-key** (red) to
**live** (green) automatically once its env var is present — so you get instant
visual confirmation each key landed.

> **Verify a key end to end:** run that machine alone, e.g.
> `./deploy/run-machine.sh "/heygen" 0 0`, and watch `deploy/logs/`.

---

## Gap 3 — Finer M02 craft (a decision, not a missing wire)

Romain hand-crafts B-roll: per-segment **motion design (Hyperframe, 3 variants)**
and **image→video** cinematic clips (Magnifique/Seedance-class), assembled by a
**human editor** from Dropbox. You deliberately took the *more automated, fewer-
moving-parts* path — **Blotato** generates AI images + narrated video + assembly,
no human editor.

**You are not missing the output — you're missing his bespoke polish.** Decide:

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
  `content-vault.md` via `/api/update`. That's Romain's "validate this script"
  action.
- ✅ **Editorial calendar** — a 14-day calendar (gold = scheduled, purple =
  posted) is now on the dashboard, matching his green/purple calendar.

The remaining sub-items are **operator data** only you can supply:

1. **Lead-magnet URLs** (`lead-magnets.csv` — currently 0/3 active). For each row,
   paste the real resource link into `resource_url` and set `active` to `yes`.
   The DM responder won't hand out a link until its row is active.
   ```
   STACK,"My 3-tool AI stack short list",https://your.link/stack,What's Worth It,ENTRY 005,yes,
   ```
2. **Connect TikTok to Blotato** (the one missing publishing channel). Do it in
   the Blotato dashboard; no code change needed.

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
