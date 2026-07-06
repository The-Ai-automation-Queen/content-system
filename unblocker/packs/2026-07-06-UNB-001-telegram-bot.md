# Today's unblock — UNB-001 (12 min)

## Create your Telegram butler bot + switch on the VPS crons

**Why today:** one bot token unblocks the entire daily loop — the Unblocker's
08:00 morning task, the brain-manager's 20:00 evening questions, and every
machine notification. It is the highest-dependency item on the ledger: nothing
else delivers to your phone until this exists.

Everything below is execute-only. No writing, no decisions.

---

### Part A — Create the bot (4 min, on your phone)

1. Open Telegram → search **@BotFather** → tap Start.
2. Send: `/newbot`
3. When asked for a **name**, paste: `Queen OS Butler`
4. When asked for a **username**, paste: `queen_os_butler_bot`
   (if taken, try `fatiha_queen_os_bot` — it just has to end in `bot`)
5. BotFather replies with a token like `7612345678:AAH...`. **Copy it.**
6. Tap the link to your new bot and send it any message (e.g. `hello`) —
   this is required so we can read your chat id in Part B.

### Part B — Wire it on the VPS (5 min, terminal)

SSH into the VPS, then run these four blocks (replace `<TOKEN>` with the
token from step 5, and the repo path if yours differs):

```bash
# 1. Get your chat id (needs the 'hello' you sent in step A6)
curl -s "https://api.telegram.org/bot<TOKEN>/getUpdates" | grep -o '"chat":{"id":[0-9]*' | head -1
# → the number after "id": is your TELEGRAM_CHAT_ID
```

```bash
# 2. Save both into the deploy env
cd ~/content-system   # adjust if the repo lives elsewhere
cat >> deploy/.env <<'EOF'
TELEGRAM_BOT_TOKEN=<TOKEN>
TELEGRAM_CHAT_ID=<CHAT_ID>
EOF
```

```bash
# 3. Test — you should get "👑 [Content OS] Butler online" on your phone
./deploy/telegram-notify.sh "Butler online. First morning briefing tomorrow at 08:00."
```

```bash
# 4. Install the crons (includes the new 08:00 Unblocker + 20:00 brain-manager)
sed "s|__REPO__|$HOME/content-system|g" deploy/crontab.example | crontab -
crontab -l   # confirm the lines are in
```

### Part C — Tell me (30 sec)

Reply **✅** in Telegram (or here) once step 3's message arrives on your phone.

---

**What happens next:** tomorrow at 08:00 the butler delivers UNB-002 — your
first live checkout (The Judge's Prompts, $27). The pack is already written:
`unblocker/packs/2026-07-07-UNB-002-whop-judges-prompts.md`.

*Security note (per `security.md` §1): the token goes in `deploy/.env` only —
never in git, never in chat.*
