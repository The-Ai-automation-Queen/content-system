# UNB-026 — Just the one click today

**Effort: ~2 minutes. One setting, no reading required.**

## Why today (same blocker, day 2)

Yesterday's pack laid out four things. None of them landed — `git
ls-remote` on all five repos still returns the identical `403 Write access
to repository not granted` this morning, unchanged from 20/09. So today
this is smaller: just the one setting that actually clears the block.
Everything else from yesterday's pack (the `agent-os-dashboard` 404
question, the `LinkedinAudit2` judgment call) can wait — they're not
stopping anything.

## The one click

1. Open `github.com/settings/tokens?type=beta`.
2. Open the fine-grained token already scoped to `content-system` (it's
   the only one).
3. Under "Repository access," add these 5:
   `queen-brain` · `fast-forward` · `agent-os-company-dashboard` ·
   `research-inbox` · `AI-Creator-OS`
4. Read-only is enough. Click **Update token**.

That's it. If GitHub issues a new token string on save, just reply with
"new token" and I'll swap it into this session's git credentials myself.

## Still parked (no reply needed today)

- `agent-os-dashboard` returns 404, not 403 — different problem, a
  one-word answer whenever it's convenient, not blocking anything.
- `LinkedinAudit2` — your call whether it's still in scope.

## Verify

Next run, I re-run `git ls-remote` on the 5 repos myself. No reply needed
to close this out, only to unblock it.
