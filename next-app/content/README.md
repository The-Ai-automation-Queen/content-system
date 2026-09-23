# Editing a structured guide

Before editing any guide, read the `shift-lead-guide-builder` skill. It is the current writing, design, approval and publishing workflow. `../../docs/GUIDE-PRODUCTION-FRAMEWORK.md` records repository-specific production details and must agree with that skill.

The active copy for approved guides lives in structured content records, including:

- `guide-page.ts` and the imported guide-specific records contain the title, promise, sections, prompts, conclusion, Lumail tag and exactly 3 related guides. The Instagram record is `instagram-dashboard-guide.ts`.

Public visibility is controlled only by `../../data/guide-publication.json`. Do not use an inventory `status` to infer approval.

`components/guides/guide-reading-page.tsx` is a legacy article renderer for existing routes. Do not use it as the format or layout specification for a new or rebuilt guide. Use a page-specific Next.js composition based on the owner's approved full-page reference. Reuse interaction and form components where they fit without inheriting the legacy article frame.

The approved Instagram page uses a dedicated compact, sectioned walkthrough modeled on the owner's Tenfold reference in Shift & Lead colours. It keeps the two build choices, five-step map, screenshots, checklists, complete prompts, and one Lumail email modal before the walkthrough opens. The agent choice and Meta setup tab are selected by default; completed checkmarks persist, but reopening starts at the first tab. Other guides need their own approved interaction and form position. Use the original topic-specific WebP cover and inspect the rendered desktop and mobile layout before publishing.

Approved target for the rest of the library: use the Instagram page's compact, interactive visual language and updated white/cobalt/deep-blue/pale-blue palette, not the legacy static article layout or cream panels. Adapt the interaction to each guide's task rather than copying Instagram's tabs. Every rebuilt guide opens with a compact, guide-specific email modal before content, collecting first name, last name, and email with optional marketing consent. Existing guides remain in their current implementation until migrated and verified.

`legacy-guide-slugs.ts` freezes the existing routes still allowed to use `GuideReadingPage` during migration. The route rejects any new guide without an approved interactive Next.js composition, so the old article layout cannot become the default again. Remove each slug from this allowlist when its rebuilt page is ready.

After explicit copy approval, edit and preview the guide from `next-app` with `npm run dev`. After page approval, add the slug to the publication registry. To rebuild the approved guides and copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:guides
```

Run `npm run validate:guides` before any push. Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live pages synchronized with their source.

Run `node --test tests/guide-output-contract.test.mjs` after every guide build. If a legacy shared-layout assertion conflicts with an owner-approved page-specific layout, update the assertion to test the approved result instead.
