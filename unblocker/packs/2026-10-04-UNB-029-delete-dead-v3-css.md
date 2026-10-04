# UNB-029 — delete one dead CSS file, 2 minutes

**Fresh task, fully verified, zero research needed.**

## What this is

`main-site/assets/work-with-me-v3.css` (17.5KB) has zero live references
anywhere in the repo. The live `work-with-fatiha` page loads only the v4
files:

```
main-site/work-with-fatiha/index.html:93-94
<link rel="stylesheet" href="/assets/work-with-me-v4.css?v=20260929c">
<script defer src="/assets/work-with-me-v4.js?v=20260929a"></script>
```

I grepped every `.html`/`.css`/`.js` file in the repo for `work-with-me-v3`
just now — the only hit is a changelog line in a docs file describing a past
edit, not a current include. This is a v3→v4 rename that never deleted the
old file. It's harmless today (nothing points at it) but it's a trap for
whoever next edits "the CSS file" and picks the wrong one.

## The click path (copy-paste, ~2 minutes)

```bash
cd ~/content-system
git rm main-site/assets/work-with-me-v3.css
git commit -m "Remove dead work-with-me-v3.css, superseded by v4 (unreferenced)"
git push
```

That's it — one file, one commit, nothing else touches it.

## Reply

- ✅ **Done** — ran it, or already knew and it's fine as-is.
- ❌ **Not doing this one** — if you want to keep it around (e.g. as a
  rollback reference), that's a valid answer too; just say so and I'll mark
  it kept-with-reason instead of open.

## Verify

`main-site/assets/work-with-me-v3.css` no longer exists in the repo, or is
confirmed kept with a documented reason.
