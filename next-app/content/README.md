# Editing a structured guide

Before editing any guide, read `../../docs/GUIDE-PRODUCTION-FRAMEWORK.md`. It is the canonical writing, design, approval and publishing workflow.

The active copy for approved guides lives in one file:

- `guide-page.ts` contains the title, promise, sections, prompt, conclusion, Lumail tag and exactly 3 related guides.

Public visibility is controlled only by `../../data/guide-publication.json`. Do not use an inventory `status` to infer approval.

The shared page layout lives in `components/guides/guide-reading-page.tsx`. The access gate lives in
`components/guides/guide-access-boundary.tsx`, and the design rules live in
`components/guides/guide-reading-page.module.css`.

Every new guide inherits that shared production template. Do not add per-guide layout or spacing overrides. Its production cover must be `public/images/guides/<slug>.webp`, 16:9, no more than 1280px wide and no more than 200 KB. The template keeps the hero aligned to the 920px reading column, uses compact section spacing, shows all explanatory sections before the gate, and fades the real “Try it now” section beneath the inline capture form.

After explicit copy approval, edit and preview the guide from `next-app` with `npm run dev`. After page approval, add the slug to the publication registry. To rebuild the approved guides and copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:guides
```

Run `npm run validate:guides` before any push. Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live pages synchronized with their source.

Run `node --test tests/guide-output-contract.test.mjs` after every guide build. It checks current and upcoming structured cover assets as well as the shared layout, gate and generated-page contracts.
