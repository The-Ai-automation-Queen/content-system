# Hermes cron prompt — hiring-campaign Monday trigger

This is the exact, self-contained instruction given to `hermes cron create`
for the weekly 99-campaign run. Hermes cron jobs start with **no memory of
any other conversation** — this file has to say everything, on its own.

Installed by `deploy/install-hermes-hiring-cron.sh`. Edit this file, then
re-run that script to update the live job (`hermes cron edit`), not the
Hermes chat directly — this file is the source of truth, same rule as every
other version-controlled prompt/SOUL in this estate.

---

## The prompt (verbatim, passed to `hermes cron create`)

```
You are running the weekly 99-campaign trigger for content-system. You have
no memory of any earlier conversation — everything you need is below or in
the repo you're sitting in.

Your working directory is the root of the content-system repo. Do the
following, in order, and do not skip a step because an earlier one looked
like it worked — verify each one from real output, never assume.

1. Run this exact command and wait for it to finish:
   bash deploy/run-machine.sh "/hiring-campaign run" 1 120
   This can take a while (it may retry once after a 120-minute wait if the
   first attempt fails) — that's expected, don't kill it early.

2. Check its actual exit code. If it exited non-zero, or you see
   "FAILED after" in its log output, stop here and report failure (step 5) —
   do not proceed to describe made-up results.

3. Find the newest file matching reports/hiring-campaign-*.md. Confirm its
   modification time is from today, not an old run. If no matching file
   exists, or the newest one is old, that means the run did not actually
   produce a report — report failure (step 5), do not invent one.

4. Confirm the tracker really changed: run
   git log -1 --stat -- site/99.html
   If site/99.html is not in that commit's changed files, the tracker was
   not actually updated this run — say so plainly in your report, don't
   claim it updated.

5. Compose your final response as the message that will be sent to
   Telegram verbatim. Write ONLY the message — no preamble, no "here's
   what I found."

   If everything above succeeded, the message must include, in plain
   language:
   - Which 3 employees this wave covered (name + role) and their mode
     (PROOF or PLAYBOOK) — read this from the report and from
     skills/hiring-campaign/schedule.md.
   - What assets were produced (hiring announcement, episodes, carousel,
     reel script, playbook assets if applicable).
   - What's queued vs. still waiting, and the single release action the
     report says the founder owes this week.
   - Whether the report flags last week's episode as unreleased (the
     "bottleneck, not production" line) — if so, lead with that, it's
     the most important line.

   If anything in steps 1-4 failed or came back incomplete, the message
   must instead say plainly what failed (the failed step, the exact
   command or file involved) and that this week's wave did not complete —
   never paper over a failure with a generic success-sounding message.

Never invent numbers, receipts, or a PROOF status that step 3's report
doesn't actually state. If you're unsure whether something succeeded,
say what you're unsure about rather than guessing.
```

## Notes for whoever installs this

- `--deliver telegram` sends your final response text verbatim as the
  Telegram message — write step 5's output as the actual message, not a
  description of one.
- This reuses whichever Telegram bot/chat Hermes' gateway is already
  configured with. If that isn't set up yet, do it first
  (`hermes/ACTIVATION-RUNBOOK.md`, Telegram gateway section) — this cron job
  has nowhere to deliver to otherwise.
- `run-machine.sh` itself still pings Telegram on failure (its own
  `notify()` calls) and is silent on success. That's fine — it's a second,
  independent signal, not a duplicate to suppress. Two pings on a Monday
  morning from two independent paths is the point, not a bug.
- This job needs to actually be able to run `claude` (the Claude Code CLI)
  in this repo, because `run-machine.sh` shells out to it. Before trusting
  this cron job, verify by hand once: from wherever Hermes' cron actually
  executes shell commands, run `bash deploy/run-machine.sh "/hiring-campaign
  run" 1 120` yourself and confirm it completes. If Hermes runs in a
  container that doesn't have this repo cloned or `claude` installed and
  authenticated, this job will fail every time, silently from Hermes' own
  side too — the watchdog only catches "Hermes is dead," not "Hermes is
  alive but can't reach this repo."
