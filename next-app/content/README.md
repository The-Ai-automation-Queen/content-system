# Editing a structured guide

The active copy for `what-is-ai`, `ai-jargon-guide`, `what-is-agentic` and `what-should-you-never-share-with-ai` lives in one file:

- `guide-page.ts` contains the title, promise, sections, prompt, conclusion, Lumail tag and exactly 3 related guides.

The shared page layout lives in `components/guides/guide-reading-page.tsx`. The access gate lives in
`components/guides/guide-access-boundary.tsx`, and the design rules live in
`components/guides/guide-reading-page.module.css`.

After editing the copy, preview it from `next-app` with `npm run dev`. To rebuild the structured
guides and copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:guides
```

Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live pages synchronized with their source.
