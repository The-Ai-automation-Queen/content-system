# One deploy for everything: all three sites on Vercel

Today guides deploys on merge (Vercel) while www and the Brief wait for the
VPS cron to pull. Two speeds, one repo: that split is where every "why is it
not live yet" moment has come from. The fix is three Vercel projects, one per
site, all watching this repo. After this, `git push` deploys everything, and
the VPS only runs the crawler and bots — which already push
their output to main, so the Brief redeploys itself when new issues land.

## One-time setup (~10 minutes, then never again)

In Vercel (vercel.com/new, pick the content-system repo each time):

1. Project `shiftandlead-www`   → Root Directory: `main-site`   → Deploy.
2. Project `shiftandlead-brief` → Root Directory: `ai-insider-brief/ai-insider-brief` → Deploy.
   (The existing project already serves `site/` for guides.)
3. Domains: in `shiftandlead-www` add `www.shiftandlead.com` (+ apex redirect);
   in `shiftandlead-brief` add `brief.shiftandlead.com`.
4. DNS (where shiftandlead.com is managed): change the two records Vercel
   shows you — CNAME `www` and CNAME `brief` → `cname.vercel-dns.com`.
   `stats.` does not change; it stays on the VPS.

Nothing breaks during the switch: the VPS keeps serving until DNS flips. Email capture is handled by server-side Vercel functions that write to Lumail.

## After the flip

- Deploy everything: `git push` (or merge a PR). That is the whole pipeline.
- Ship local edits in one command: `MSG="what changed" npm run ship`
  (runs the validator, the build, commits, pushes; Vercel does the rest).
- VPS cleanup, whenever convenient: remove the nginx server blocks for
  www/brief and the site-pull cron. Keep the crawler, bots and analytics.
