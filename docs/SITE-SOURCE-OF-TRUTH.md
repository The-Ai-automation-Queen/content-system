# Website source of truth

`main-site/` is the exact website Vercel publishes for `www.shiftandlead.com`.

## Rules

1. Edit the final HTML, CSS and assets in `main-site/`.
2. Do not rewrite public pages during a Vercel deployment.
3. Record active, planned, unlisted and retired routes in `data/page-status.json`.
4. A retired route must not appear on the homepage, in navigation, in the footer, in the sitemap or in `llms.txt`.
5. Keep experiments outside `main-site/`. Use a feature branch or an `experiments/` folder.
6. Review the Vercel preview before merging a branch into `main`.

## Workflow

```text
feature branch
    -> edit main-site
    -> run node tools/verify-publish-source.mjs
    -> review the Vercel preview
    -> merge to main
    -> Vercel publishes the committed files unchanged
```

The old patch scripts remain only as build history. They are not part of the Vercel build and must not be added back to `main-site/vercel.json`.
