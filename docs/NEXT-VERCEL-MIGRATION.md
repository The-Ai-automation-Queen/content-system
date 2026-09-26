# Next.js deployment migration — review before switching production

**Status:** repository configuration prepared and locally built; **Vercel dashboard Root Directory has not been changed.** The current live site remains on its existing deployment. This is deliberately not a claim that the new guide gate is already live.

**Live topology check (26 September 2026):** `www.shiftandlead.com` currently responds with `server: Vercel`; `guides.shiftandlead.com` redirects to `www`. The repository README's July 2026 Hostinger/guide-subdomain description is historical and should not be used to choose a production project without checking the actual Vercel dashboard and domain assignment.

## Why the setting change matters

- Current active hosting serves the committed `main-site/` static HTML export. The intended source of truth is `next-app/`.
- The new Lumail guide-delivery endpoint is `next-app/app/api/guide-capture/route.ts` and accepts POST. Next.js `output: "export"` cannot deploy this endpoint, so static export was removed.
- The repository includes `next-app/vercel.json` with `framework: "nextjs"`, build command `npm run build`, and preserved redirects from legacy `.html` guide URLs to approved routes. **Do not set `outputDirectory: "."`** or `main-site` as Vercel root.
- The `prebuild` step (`tools/sync-next-public.mjs`) copies only approved active HTML offer pages and their shared assets to `next-app/public/`; it does not republish old HTML guide files, retired Chez pages or private product/resource source pages. Next.js owns `/`, `/guides/`, all 35 guide routes and `/sitemap.xml`.

## Vercel dashboard settings to review/apply

1. In the existing Shift & Lead Vercel project, **Settings → Build and Deployment → Root Directory**: set `next-app`. Enable **Include source files outside of the Root Directory** (the app imports root `data/` and the build runs `../tools/sync-next-public.mjs`). Save this change on a **preview deployment first**, not an untested production cutover.
2. Framework Preset: **Next.js**. Install Command: `npm ci` (from `next-app/package-lock.json`). Build Command: `npm run build`. Output Directory: **leave blank / default**; do not point to `main-site`, `out` or `.`.
3. Keep `LUMAIL_API_TOKEN` in the Vercel project's encrypted environment variables for Preview and Production. Verify `fatiha@email.shiftandlead.com` is an approved Lumail sending address. Do **not** put the token in public JS or Git.
4. In Lumail, confirm double opt-in for marketing subscribers and ensure transactional recipients are **not automatically added to marketing lists**. The new API only calls Subscribers when the unchecked marketing box is deliberately selected.
5. Deploy the review branch to Preview and test: `/`, `/guides/`, each of the **35** approved guide URLs, `/about.html`, `/workbooks.html`, `/workbooks/find-your-zone-of-genius.html`, `/ai-opportunity-map.html`, `/how-i-can-help.html`, `/contact.html`, `/sitemap.xml`, `/privacy.html` and the legacy `/guides/what-is-ai.html` redirect. Check an unpublished guide returns 404.
6. Use a controlled inbox to request one guide **without** marketing checked: confirm delivery and that no Lumail marketing subscriber/workflow was added. Then test checked marketing consent and Lumail's confirmation/workflow. On another browser/device the emailed link may ask for email again; this is not an account system.
7. Confirm existing workbook waitlist and Where AI Fits forms still post successfully to the new Next API routes. Inspect mobile navigation, image loading, redirects and analytics. Only then switch the main production project to this branch / merge the reviewed PR.

## Rollback

Revert the Vercel Root Directory to `main-site` and its prior static build/output settings, then redeploy the last known-good production commit. Keep `LUMAIL_API_TOKEN` unchanged. Since the repository changes are on a review branch, the live site is not modified by a local build.

## Product/resource page boundary

The three active workbooks and main offers remain available. `/products/judges-prompts.html`, `/products/prompt-menu.html`, `/products/time-audit.html`, and `/resources/ai-assistant-builder.html` are **not linked from active offer pages** and are not copied into the Next.js public directory; temporary redirects send visitors to the relevant live library or Map. `/resources/research-to-content-workflow.html` redirects to Workbooks. Confirm whether any of these are still sold or promised in campaigns before retiring their URLs permanently. The retired Chez series and the five parked guides remain unpromoted and unpublished.
