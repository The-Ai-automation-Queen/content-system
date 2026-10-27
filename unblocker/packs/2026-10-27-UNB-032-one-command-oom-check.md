# UNB-032 — just this one command, 1 minute

**Shrunk from yesterday's 7-step diagnostic — no reply landed on that, so here is the single highest-signal line instead.**

## What's new since yesterday

Today's 04:00 GST cron (`deploy/logs/unblocker daily-2026-10-27T04-00-03.log`) truncated again — 4 lines, file timestamp **6 seconds** after the cron fired. Same near-instant-kill shape as every prior truncation. The fault is still live; nothing needs to change about the diagnosis, only the size of today's ask.

## The one line

SSH into the VPS and run only this:

```bash
dmesg -T 2>/dev/null | grep -i "killed process\|out of memory\|oom" | tail -40; free -h
```

That's it. No file edits, no decisions — just paste back whatever it prints (even if it's empty).

- **Output with an "oom" / "killed process" line** → confirms the kill is memory pressure; next step is a swap file or lowering what else runs at 04:00/23:00/02:30 UTC.
- **Empty output, `free -h` shows plenty of headroom** → rules out OOM; next step is checking for a systemd/cron timeout wrapper instead (that's a different one-liner for tomorrow).

## Reply

- ✅ **Done** — pasted the output.
- 🔁 **Swap** — something more urgent should take today's slot.
- ❌ **Not doing this one** — no VPS access right now; I'll keep flagging it, it's silently costing three machines their unattended runs.

## Verify

A future dated log for `/performance-tracker`, `/estate-janitor scan`, or `/unblocker daily` shows the full skill body running (its own report/ledger write, `== done ...==` trailer) from the automated cron fire itself, not from an interactive session standing in for it.
