# Editing the AI jargon guide

The words users see in the guide live in one file:

- `ai-jargon-guide.ts` — title, direct opening, exactly 10 terms, examples, warnings, and capture copy.

The page layout lives in `app/guides/[slug]/page.tsx`. The copy control lives in
`components/guides/copy-guide-notes.tsx`, and the GSAP scroll behavior lives in
`components/guides/guide-motion.tsx`.

After editing the copy, preview it from `next-app` with `npm run dev`. To rebuild the guide and
copy the deployable files into `main-site`, run this command from the repository root:

```sh
npm run publish:ai-jargon
```

Commit both the editable source and the generated `main-site` files. Vercel publishes
`main-site`, so this step keeps the live page synchronized with its source.
