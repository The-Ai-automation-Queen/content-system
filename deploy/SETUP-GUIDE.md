# Content OS — Full Setup Guide (VPS)

Everything you need to go from a fresh VPS to a fully autonomous content machine.
Follow in order. Each step says how long it takes.

---

## Prerequisites

- A **VPS** running Ubuntu/Debian (any provider — Hostinger, Hetzner, DigitalOcean, etc.)
- **SSH access** to the VPS (terminal or PuTTY)
- A **Telegram** account (for alerts + brain-manager)
- A **Claude Max subscription** ($180/mo) OR an Anthropic API key
- A **Doppler** account (free — [doppler.com](https://doppler.com))

---

## Phase 1 — Bootstrap the VPS (15 minutes)

### Step 1: SSH into your VPS

```bash
ssh your-user@your-vps-ip
```

### Step 2: Clone the repo

```bash
git clone https://github.com/the-ai-automation-queen/content-system.git ~/content-system
cd ~/content-system
git checkout main
```

### Step 3: Run the installer

```bash
bash deploy/install.sh
```

This installs: system packages, **Doppler CLI**, Node.js 20, Claude Code CLI,
dashboard dependencies, and starts the dashboard as a systemd service.

Wait for `✅ Bootstrap complete.`

### Step 4: Make the scripts executable (if not already)

```bash
chmod +x deploy/*.sh
```

---

## Phase 2 — Create your Telegram bot (2 minutes)

You need this for: failure/success alerts on every cron run + the daily
brain-manager questions.

### Step 5: Create the bot

1. Open **Telegram** on your phone
2. Search for **@BotFather**, start a chat
3. Send `/newbot`
4. Follow the prompts — give it a name (e.g. "Content OS Bot")
5. **Copy the bot token** (looks like `123456789:ABCdefGHI...`)

### Step 6: Get your chat ID

1. Search for **@userinfobot** in Telegram, start a chat
2. It replies with your user info — **copy the numeric ID** (e.g. `987654321`)

Keep both values — you'll paste them into Doppler in Step 9.

---

## Phase 3 — Set up Doppler (5 minutes)

Doppler stores all your API keys encrypted. No plain-text `.env` file on disk.

### Step 7: Create a Doppler account

1. Go to [doppler.com](https://doppler.com)
2. Sign up (free plan — unlimited secrets, 5 projects)
3. Create a **project** called `content-os`
4. It auto-creates configs: `dev`, `stg`, `prd` — you'll use **`prd`**

### Step 8: Authenticate Doppler on the VPS

```bash
doppler login
```

It gives you a URL to open in your browser. Click the link, authorize, done.

Then select your project:

```bash
doppler setup
```

Choose: project = `content-os`, config = `prd`.

### Step 9: Add your secrets

```bash
doppler secrets set \
  TELEGRAM_BOT_TOKEN="your-bot-token-from-step-5" \
  TELEGRAM_CHAT_ID="your-chat-id-from-step-6"
```

That's the minimum to get alerts working. You'll add more keys in later phases.

### Step 10: Verify Doppler works

```bash
doppler secrets
```

Should list your keys with masked values. Then test Telegram:

```bash
./deploy/telegram-notify.sh "Hello from the Content OS!"
```

You should get a Telegram message on your phone. If yes, alerts are live.

---

## Phase 4 — Authenticate Claude Code (2 minutes)

### Step 11: Pick your auth method

**Option A — Claude Max subscription ($180/mo, recommended):**

```bash
claude login
```

Follow the browser link to authenticate. This is what Romain uses — all
script generation is "free" with the subscription, no per-token billing.

**Option B — API key:**

```bash
doppler secrets set ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

### Step 12: Smoke-test Claude

```bash
./deploy/run-machine.sh "/vault-audit" 0 0
```

This runs the lightest skill. Check `deploy/logs/` for the output. If it
completes and you get a Telegram ping, Claude is working.

---

## Phase 5 — Add your machine API keys (5 minutes)

Add only the keys you're ready to use. You can come back and add more later —
just `doppler secrets set KEY=value`.

### Step 13: Talking-head video (HeyGen / Higgsfield)

If you already have a HeyGen API key:

```bash
doppler secrets set HEYGEN_API_KEY="your-heygen-api-key"
```

If you haven't done a clone session yet (to create your avatar), do it first:

1. Go to [heygen.com](https://heygen.com) → **Avatars** → **Create Avatar**
2. Record a 2-minute video of yourself (well-lit, looking at camera)
3. Wait for the avatar to be created (takes ~30 min)
4. Copy your **avatar ID** and **voice ID** from the avatar settings
5. Edit `inventory.md` on the VPS — replace the `____` placeholders:
   ```
   **HeyGen IDs:** avatar_id = `your-avatar-id`, voice_id = `your-voice-id`
   ```

### Step 14: GoHighLevel (optional — GHL handles IG natively)

Only needed if you want the OS skill to push leads into GHL directly. GHL
already catches IG comments, sends DMs, and captures leads on its own.

```bash
doppler secrets set GHL_API_KEY="your-ghl-api-key"
```

### Step 15: Unipile for LinkedIn DMs (optional — €49/mo)

Only when you want automated LinkedIn DM responses to comment keywords.

1. Sign up at [unipile.com](https://unipile.com) (7-day free trial, no card)
2. Connect your LinkedIn account (Fatiha Chikh)
3. Copy your API key and DSN from the Unipile dashboard
4. Add them:
   ```bash
   doppler secrets set \
     UNIPILE_API_KEY="your-unipile-key" \
     UNIPILE_DSN="your-unipile-dsn"
   ```

### Step 16: Meta Graph API (optional — richer IG/FB analytics)

Only needed for detailed Instagram/Facebook engagement data in
`performance-tracker`. Without it, Apify scrapers work as fallback.

```bash
doppler secrets set \
  META_ACCESS_TOKEN="your-meta-token" \
  IG_BUSINESS_ID="your-ig-business-id" \
  FB_PAGE_ID="your-fb-page-id"
```

---

## Phase 6 — Harden the VPS (10 minutes)

Do this BEFORE treating the box as production.

### Step 17: Ensure your SSH key is installed

From your **local machine** (not the VPS):

```bash
ssh-copy-id your-user@your-vps-ip
```

### Step 18: Plan the hardening (read what it would do)

Back on the VPS:

```bash
./deploy/harden-vps.sh
```

This is **PLAN mode** — it prints what it would change but touches nothing.
Read the output. It covers:
- SSH: disable root login, key-only auth
- UFW firewall: only SSH open (dashboard is private via tunnel)
- fail2ban: brute-force protection
- Automatic security updates

### Step 19: Apply the hardening

```bash
sudo ./deploy/harden-vps.sh apply
```

**CRITICAL:** before closing this SSH session, open a **second terminal** and
test that SSH still works:

```bash
ssh your-user@your-vps-ip
```

If it works, you're good. If not, the apply script made backups — revert from
the first terminal (see `deploy/SECURITY.md`).

### Step 20: Access the dashboard via SSH tunnel

UFW closes port 4321, so the dashboard is private. Access it through a tunnel:

```bash
ssh -L 4321:localhost:4321 your-user@your-vps-ip
```

Then open `http://localhost:4321` in your browser. You should see Mission
Control with the machine status panels.

---

## Phase 7 — Install the cron schedule (2 minutes)

### Step 21: Set the repo path in the crontab

```bash
cd ~/content-system
sed -i "s|__REPO__|$PWD|g" deploy/crontab.example
```

### Step 22: Review the schedule

```bash
cat deploy/crontab.example
```

The default schedule (all times GST / Dubai):

| Time | Machine | What happens |
|---|---|---|
| 20:00 daily | M00 brain-manager | Asks you questions via Telegram |
| 02:00 daily | M01 signal-harvester | Harvests 7 fresh signals from the web |
| 02:30 daily | M01 content-engine | Generates 5 scripts from brain + signals |
| 03:00 daily | M06 performance-tracker | Scrapes engagement metrics |
| Every 5 min | M05 dm-responder | Polls comments, sends DMs (GHL + Unipile) |
| Mon 06:00 | weekly-ops | Full loop with visuals + distribution |

Edit times if needed: `nano deploy/crontab.example`

### Step 23: Install the crontab

```bash
crontab deploy/crontab.example
crontab -l    # confirm the schedules are installed
```

The system is now **live and autonomous.**

---

## Phase 8 — Seed your personal brain (10 minutes)

This is the most important step for content quality. Without it, the content
engine writes generic AI posts. With it, posts reference your real life.

### Step 24: Run the brain-manager seed

```bash
./deploy/run-machine.sh "/brain-manager seed" 0 0
```

OR in any Claude Code session:

```
/brain-manager seed
```

It asks you 15–20 foundational questions about:
- Your career story (Dell, Intel, Microsoft → entrepreneurship)
- What you're building right now
- Your strong opinions on AI and automation
- Personal stories and anecdotes you're OK sharing
- Your current lead magnets and their URLs
- Your tool stack
- Upcoming plans (travel, launches, events)

Answer honestly and in detail — this becomes the memory layer that makes your
content sound like YOU. You can always update it later with `/brain-manager`.

### Step 25: Verify the brain

```bash
cat personal-brain.md
```

Should show your answers organized by category, date-stamped.

---

## Phase 9 — Set up GHL workflows for Instagram DMs (15 minutes)

GHL handles Instagram comment→DM→capture natively. You need one workflow per
active lead magnet.

### Step 26: Connect Instagram to GHL

1. In GHL: **Settings → Integrations → Facebook/Instagram**
2. Connect the `@thefatihachikh` Instagram account
3. This unlocks IG DMs inside GHL Conversations + Workflows

### Step 27: Create one workflow per lead-magnet keyword

For each active row in `lead-magnets.csv` (e.g. STACK, TEAM, FOLLOW UP):

1. **GHL → Automation → Workflows → Create Workflow**
2. **Trigger:** Social → Instagram comment contains `KEYWORD` (case-insensitive)
3. **Action 1 — DM:** Send IG DM in your voice:
   ```
   Here you go! 👉 <resource_url> — let me know what you build with it!
   ```
4. **Action 2 — Capture:** When they opt in on the resource page:
   - Create/update the GHL contact
   - Apply tag `lm-keyword` (e.g. `lm-stack`)
   - Drop into your existing nurture flow

### Step 28: Test one workflow

Post a test comment with the keyword on one of your posts. Verify the DM
arrives and the contact is created in GHL.

---

## Phase 10 — Connect TikTok to Blotato (2 minutes)

### Step 29: Add TikTok in Blotato

1. Blotato dashboard → **Accounts → Add/Connect → TikTok**
2. Log in to your TikTok account and authorize
3. No code change needed — `distribution` will include TikTok on the next run

---

## Phase 11 — Verify everything works end to end (5 minutes)

### Step 30: Run a full loop manually

```bash
./deploy/run-machine.sh "/weekly-ops produce-only" 0 0
```

This runs: signal-harvester → competitor-watch → vault-audit → content-engine.
Check the output:
- `deploy/logs/` for the full transcript
- `research-notes.md` for new signals
- `content-vault.md` for new drafts
- Telegram for the success/failure ping

### Step 31: Check the dashboard

```bash
ssh -L 4321:localhost:4321 your-user@your-vps-ip
```

Open `http://localhost:4321`:
- Machine status panels should show green/live
- Pipeline should show your vault entries
- Calendar should show any scheduled posts

### Step 32: Verify Doppler health

```bash
doppler secrets          # all keys present?
crontab -l               # schedules installed?
systemctl status content-os-dashboard   # dashboard running?
ls -lt deploy/logs | head               # recent run logs?
```

---

## Daily operation (once it's all live)

Your day looks like this:

1. **Morning (scripts ready by ~03:00):**
   - Open the dashboard (via SSH tunnel) or check the vault
   - 5 new scripts waiting — pick 1–3 to post today
   - Validate → visuals auto-generate → Blotato queue

2. **Evening (20:00 — brain-manager pings you on Telegram):**
   - Answer 5–7 questions about your day, projects, opinions
   - Takes 2–3 minutes on your phone
   - Answers feed tomorrow's scripts

3. **Weekly (Monday — full loop runs at 06:00):**
   - Check the weekly-ops report in Telegram
   - Review the Blotato queue — release what's ready
   - Glance at the performance dashboard

4. **When something breaks:**
   - Telegram alerts you immediately
   - Check `deploy/logs/` for the transcript
   - Fix and re-run: `./deploy/run-machine.sh "/skill-name" 0 0`

---

## Quick reference — all your secrets in one place

These are the keys you'll add to Doppler over time. Only Telegram + Claude
auth are required to start:

| Secret | Required? | What it unlocks |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | **Yes** | Alerts + brain-manager |
| `TELEGRAM_CHAT_ID` | **Yes** | Your Telegram user ID |
| `ANTHROPIC_API_KEY` | Only if not using `claude login` | Claude API billing |
| `HEYGEN_API_KEY` | When ready for talking-head video | M02 avatar of YOU |
| `GHL_API_KEY` | Optional | Push leads into GHL from the skill |
| `UNIPILE_API_KEY` | When ready for LinkedIn auto-DMs | M05 LinkedIn DMs |
| `UNIPILE_DSN` | With Unipile | Unipile data source |
| `META_ACCESS_TOKEN` | Optional | Richer IG/FB analytics |
| `IG_BUSINESS_ID` | With Meta token | Instagram Business ID |
| `FB_PAGE_ID` | With Meta token | Facebook Page ID |

---

## Troubleshooting

**Telegram not sending:**
```bash
./deploy/telegram-notify.sh "test"
# Check: doppler secrets | grep TELEGRAM
```

**Claude not running:**
```bash
claude --version         # installed?
claude login             # authenticated?
doppler secrets | grep ANTHROPIC   # key present?
```

**Crons not firing:**
```bash
crontab -l               # schedules listed?
ls -lt deploy/logs       # any recent logs?
journalctl -u cron -n 20 # cron daemon running?
```

**Dashboard not loading:**
```bash
systemctl status content-os-dashboard
journalctl -u content-os-dashboard -n 50
# Remember: access via SSH tunnel, not direct IP (UFW blocks :4321)
```

**A machine fails:**
```bash
cat deploy/logs/<latest-log-file>    # read the transcript
./deploy/run-machine.sh "/skill-name" 0 0   # re-run manually
```

**Need to pause everything:**
```bash
crontab -r                              # remove all schedules
systemctl stop content-os-dashboard     # stop dashboard
```

**Need to resume:**
```bash
crontab deploy/crontab.example          # re-install schedules
systemctl start content-os-dashboard    # restart dashboard
```
