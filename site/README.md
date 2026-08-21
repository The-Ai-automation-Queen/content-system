# Legacy guides redirect host

This directory is **not an active website** and contains no editable guide
source. It exists only to preserve old links from `guides.shiftandlead.com`
after the guide library moved to `www.shiftandlead.com/guides/` on
1 August 2026.

## Source of truth

- Guide article source: `next-app/app/guides/`
- Guide metadata: `next-app/content/guides.json`
- Canonical public URLs: `https://www.shiftandlead.com/guides/`

Do not update guide copy in this directory. `vercel.json` permanently
redirects old URLs to their canonical main-site destinations. Its ignored-build
rule prevents unrelated repository changes from deploying this project.

## Retirement policy

Keep the redirect host online through at least 1 August 2027 so search engines,
bookmarks, and external backlinks can migrate. After that date, review Google
Search Console coverage and inbound links before deciding whether to remove the
subdomain. Keeping the redirects longer is safe and requires no content upkeep.
