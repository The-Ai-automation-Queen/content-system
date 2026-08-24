# Editing a structured guide

Before editing any guide, read `../../docs/GUIDE-PRODUCTION-FRAMEWORK.md`. It is the canonical writing, design, approval and publishing workflow.

The active copy for approved guides lives in one file:

- `guide-page.ts` contains the title, promise, sections, prompt, conclusion, Lumail tag and exactly 3 related guides.

Public visibility is controlled only by `../../data/guide-publication.json`. Do not use an inventory `status` to infer approval.

The shared page layout lives in `components/guides/guide-reading-page.tsx`. The access gate lives in
`components/guides/guide-access-boundary.tsx`, and the design rules live in
`components/guides/guide-reading-page.module.css`.

After explicit copy approval, edit and preview the guide from `next-app` with `npm run dev`. After page approval, add the slug to the publication registry. To rebuild the approved guides and copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:guides
```

Run `npm run validate:guides` before any push. Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live pages synchronized with their source.
