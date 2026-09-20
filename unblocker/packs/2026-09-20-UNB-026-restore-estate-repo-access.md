# UNB-026 — Restore estate-repo access for this session

**Effort: ~5 minutes. Execute-only — nothing to compose or decide, just click through GitHub settings.**

## Why today

`estate-janitor`'s top-ranked check (class 5 — price/offer/customer-copy
drift, "a customer can see it") and two cross-repo checks have been fully
blocked for at least 3 days running because this session can only see
`content-system`. `queen-brain`, `fast-forward`, and 4 other estate repos
are invisible to every skill that runs here. See
`reports/janitor-2026-09-20.md` JAN-01 and `unblocker/ledger.md` UNB-026.

## What I just verified (this run, read-only, nothing pushed)

I re-ran the actual git checks instead of re-stating the ledger's summary,
and found something more specific than "access is missing":

```
$ git ls-remote https://github.com/The-Ai-automation-Queen/queen-brain.git
remote: Write access to repository not granted.
fatal: ... 403
```

Same `403 — Write access to repository not granted` for `fast-forward`,
`agent-os-company-dashboard`, `research-inbox`, and `AI-Creator-OS`. That
specific message (not a plain 404) is what GitHub returns when a
**stored credential can see the repo exists but isn't scoped to read it** —
consistent with the fine-grained PAT on this machine being scoped to only
`content-system` (per this repo's own auth notes).

One repo is different and needs a separate look, not just an access grant:

```
$ git ls-remote https://github.com/The-Ai-automation-Queen/agent-os-dashboard.git
remote: Repository not found.
fatal: ... 404
```

`agent-os-dashboard` (distinct from `agent-os-company-dashboard`, which
*is* reachable) comes back **404 — not found**, not 403. That means either
it's been renamed/deleted, or it lives under a different account. Don't
spend the same "add access" click on it — see step 3 below instead.

## The click path (execute-only)

**Step 1 — find the token.**
Go to `github.com/settings/tokens?type=beta` (Settings → Developer settings
→ Personal access tokens → Fine-grained tokens). Open the token this
machine uses (the one already scoped to `content-system` — it'll be the
only one).

**Step 2 — widen its repository access.**
Under "Repository access," switch from "Only select repositories" (or add
to the existing selection) to include these 5 confirmed-existing repos:
- `queen-brain`
- `fast-forward`
- `agent-os-company-dashboard`
- `research-inbox`
- `AI-Creator-OS`

Leave permissions at whatever read-level content-system already has
(Contents: Read-only is enough for scanning — no write needed for any of
these). Click **Update token** / re-generate if GitHub forces that on scope
changes (it sometimes issues a new token string on save — if so, that new
value needs to replace whatever's stored in this session's git credentials,
which I can do myself once you confirm the token changed).

**Step 3 — `agent-os-dashboard` (separate, 1 line).**
Just check whether it still exists and under which account/name — reply
with the correct owner/repo, or tell me it's retired and I'll strike it
from the estate list instead of re-flagging it every scan.

**Step 4 — LinkedinAudit2.**
Same 403 pattern as the other four — include it in Step 2's list too if you
want it back in scope (I left it out of the "5" above only because I
wasn't sure it's still an active part of the estate rather than a one-off
audit artifact; your call, one word either way).

## Verify

Once done, reply here or drop a note — I'll re-run
`git ls-remote https://github.com/The-Ai-automation-Queen/<repo>.git` for
each and confirm before closing this out. That's also the exact check the
next `estate-janitor scan` will run to clear JAN-01 automatically.
