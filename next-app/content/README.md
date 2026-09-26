# Editing a structured guide

Before editing any guide, read `../../docs/GUIDE-PRODUCTION-FRAMEWORK.md`, `../../docs/GUIDE-COPY-STRUCTURE.md` and the latest owner instructions. The former `shift-lead-guide-builder` skill is superseded and must not determine the format or capture flow.

The active copy for approved guides lives in structured content records, including:

- `guide-page.ts` and the imported guide-specific records contain the title, promise, sections, prompts, conclusion, Lumail tag and exactly 3 related guides. The Instagram record is `instagram-dashboard-guide.ts`.

Reconcile the current editorial decision with `../../data/guide-rebuild-plan.json` and `../../data/guide-publication.json` before publishing. Neither an old registry entry nor an inventory status alone proves that the latest version is approved. Keep parked and pending guides out of the public library.

`components/guides/guide-reading-page.tsx` is a legacy article renderer for existing routes. Do not use it as the format or layout specification for a new or rebuilt guide. Use a page-specific Next.js composition based on the owner's approved full-page reference. Reuse interaction and form components where they fit without inheriting the legacy article frame.

The approved Instagram page is a reference for interaction quality, colour and visual pacing. Its two build choices and five-step map fit that task; they are not required on other topics. The owner has since replaced the opening email modal with useful public teaching followed by a compact inline Lumail form before the complete copyable prompt. Migrate Instagram's capture to that current rule when revising it. Reuse the original topic-specific cover and inspect desktop and mobile before publishing.

Use the owner's Saadia screenshot for copy hierarchy: clear hero and outcome, contents, concise promise, practical numbered modules, exact actions and worked examples, then the inline email handoff before the complete resource. Adapt the interaction to each guide's job in Shift & Lead colours. The form collects first name, last name and email, with separate optional marketing consent. Do not put these production directions, approval status, testing language or implementation notes on the reader-facing page.

`legacy-guide-slugs.ts` freezes the existing routes still allowed to use `GuideReadingPage` during migration. The route rejects any new guide without an approved interactive Next.js composition, so the old article layout cannot become the default again. Remove each slug from this allowlist when its rebuilt page is ready.

After explicit copy approval, edit and preview the guide from `next-app` with `npm run dev`. After page approval, add the slug to the publication registry. To rebuild the approved guides and copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:guides
```

Run `npm run validate:guides` before any push. Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live pages synchronized with their source.

Run `node --test tests/guide-output-contract.test.mjs` after every guide build. If a legacy shared-layout assertion conflicts with an owner-approved page-specific layout, update the assertion to test the approved result instead.
