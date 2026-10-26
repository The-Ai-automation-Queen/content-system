# UNB-032 — find out why 3 different crons are dying right after `git pull`, ~10 minutes

**Fresh task, as prepped as it can be without VPS access — I can't SSH in from
this session, so this is a one-paste diagnostic instead of a one-paste fix.**

## What this is

Three different scheduled machines have now shown the exact same shape of
failure on different days:

| Machine | Documented GST time | Cron line (UTC) | First truncated |
|---|---|---|---|
| `/performance-tracker` | 03:00 | `0 23 * * *` | 2026-10-02 (12+ days running) |
| `/estate-janitor scan` | 06:30 Sun | `30 2 * * 0` | 2026-10-25 (first time) |
| `/unblocker daily` | 08:00 | `0 4 * * *` | **2026-10-26 (today, first time)** |

Every truncated log looks identical: `run-machine.sh`'s own `git pull
--rebase --autostash` output (a few lines, written via `tee`), then **nothing
else** — no output from the `claude -p ...` call that should run next, no
retry notice, no `== done ==` trailer. Today's log
(`deploy/logs/unblocker daily-2026-10-26T04-00-02.log`) is 4 lines and its
file timestamp is **5 seconds** after the cron fired — whatever kills it
happens almost immediately, not after a long hang.

This is **not** the rate-limit issue from 26-28 September (those logs show a
clean one-line `You've hit your weekly limit...` message and exit — an error
that got printed and flushed). I checked every October log for that same
string — zero hits. This is a different, newer fault: `claude -p` is dying
(or never starting) so fast and so silently it can't even flush "command not
found" or an auth error to the log, which usually means something is killing
the process outright (OOM, a timeout wrapper, a resource limit) rather than
`claude` printing an error and exiting cleanly.

I read `deploy/run-machine.sh` in full — there's no explicit `timeout` around
the `claude -p` call, so if something is capping it, it's coming from outside
this script (systemd, cron's own environment, a cgroup limit, or the VPS
itself).

## The paste-ready diagnostic (SSH into the VPS, run this block, ~10 minutes)

```bash
# 1. Confirm claude itself still runs and is authenticated, outside of cron
#    (run this interactively — if it also hangs/fails here, that's the smoking gun)
which claude && claude --version

# 2. Was the process OOM-killed? Check dmesg/journalctl around all 3 failure times:
#    2026-10-02 23:00 UTC, 2026-10-25 02:30 UTC, 2026-10-26 04:00 UTC
sudo journalctl --since "2026-10-26 03:58" --until "2026-10-26 04:05" | tail -100
sudo journalctl --since "2026-10-25 02:28" --until "2026-10-25 02:35" | tail -100
dmesg -T 2>/dev/null | grep -i "killed process\|out of memory\|oom" | tail -40

# 3. Is memory actually tight at these hours? (if this is consistently near 0,
#    that's a strong lead even without an explicit OOM log line)
free -h

# 4. Any systemd unit wrapping cron jobs with its own timeout/memory cap?
systemctl list-units --type=service | grep -i cron
systemctl show cron --property=MemoryMax,TimeoutStartUSec 2>/dev/null

# 5. Confirm the live crontab actually matches deploy/crontab.example (no drift
#    since the 05/10 UNB-030 timezone fix — this file is the backup taken
#    *before* that fix, for reference only, not what should be live now):
crontab -l | grep -E "unblocker|performance-tracker|estate-janitor"
diff <(crontab -l) <(sed "s#__REPO__#$HOME/content-system#" ~/content-system/deploy/crontab.example) | head -40

# 6. Any stuck/zombie claude processes left running from a previous cron fire
#    that never exited (would explain a resource squeeze at the next job's start)?
ps aux | grep -i claude | grep -v grep

# 7. Disk space — a full disk can make a process die immediately on first write
df -h /
```

## What to send back

Paste the output of all 7 steps into this chat (or the next session) — whatever
it shows (an OOM line, a systemd timeout, a stale crontab, a stuck process, low
disk) tells us exactly what to fix next. No decision needed from you beyond
running the block and pasting the result; I'll turn whatever comes back into
the actual fix.

## Reply

- ✅ **Done** — pasted the output (here or next session).
- 🔁 **Swap** — if something more urgent should take today's slot instead.
- ❌ **Not doing this one** — if VPS access isn't available right now; I'll
  keep flagging it since it's silently degrading 3 machines' automation.

## Verify

A future dated log for `/performance-tracker`, `/estate-janitor scan`, or
`/unblocker daily` shows the full skill body running (its own report/ledger
write, `== done ... ==` trailer) without an interactive re-run forcing it.
