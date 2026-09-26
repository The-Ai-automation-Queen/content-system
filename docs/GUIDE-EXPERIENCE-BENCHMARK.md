# Guide experience benchmark — 26 September 2026

## What the live Saadia Karam guide actually does

Observed as a signed-out visitor on [the Upgrade ChatGPT guide](https://www.saadiakaram.ai/guides/5-reglages-chatgpt-setup), [the Human Watermark guide](https://www.saadiakaram.ai/guides/filigrane-humain-anti-slop), and [the library](https://www.saadiakaram.ai/bibliotheque). The browser-rendered state is the relevant evidence; text extraction can include content that is present in page data but not visible to a signed-out visitor.

1. Library presents books/cover art and browsing/search/category options, then opens a chosen guide. Its catalogue is much larger than Shift & Lead's approved 35 guides; the **structure**, not its scale or styling, is the useful reference.
2. Guide opening shows a strong editorial cover, outcome-led title, reading time, authored introduction, and a contents rail. The signed-out visitor can read a meaningful beginning; later contents entries lead to the access boundary.
3. A distinct free-account callout grants access to the complete guide and copyable prompts, then returns members to their selected guide. It also offers saved guides/curriculum across devices. This is an **authentication product**, not simply an email form.
4. Next-guide recommendations sit after the access section. A separate footer email field advertises a recurring newsletter; that is distinct from free-guide account access.

## What Shift & Lead is doing instead (owner-approved scope)

The owner explicitly chose **guide email delivery and an optional marketing checkbox for now**, not account creation. Accordingly:

- Preserve all **35 approved guides** and their current imagery and practical teaching; exclude unpublished guides and retired Chez titles.
- Present each guide's title, cover, author, reading time, actual chapter headings, introduction, and useful opening material before the Lumail step.
- Place an inline Lumail form between the beginning and the complete instructions/exercise/conclusion; unlock the collection on the **current device** after successful delivery. Do not claim cross-device account persistence. The emailed return URL works on another device but may request an email again.
- Distinguish the requested one-to-one guide email from optional marketing subscription. Do not enroll unchecked visitors in subscriber workflows.
- Replace unpublished or duplicate related-guide cards on active guides with links to approved live guides.

## Lumail implementation evidence

- [Create Subscriber API](https://lumail.io/docs/api-reference/api-subscribers-post): `POST /api/v1/subscribers` creates or updates a marketing subscriber; `resubscribe` defaults to **true**, so an unchecked guide request must **not** call this API. Use it only after the optional marketing checkbox is checked.
- [Lumail double opt-in](https://lumail.io/docs/tutorials/enable-double-opt-in): public Subscriber API signups use the organization's DOI setting; never send `skipDoubleOptIn: true` from this public flow. Confirm the organization settings before sending campaigns. Disable “Add transactional recipients to the marketing list” if transactional guide recipients must not be enrolled by delivery alone.
- The existing project uses Lumail's `/api/v2/emails` for the guide return link and `LUMAIL_API_TOKEN` server-side. No live send or subscriber mutation was made during this implementation.

## Deployment constraint

[Next.js static export limitations](https://nextjs.org/docs/app/guides/static-exports): POST guide capture needs a server; the Next app cannot retain `output: "export"` if it owns `/api/guide-capture`. [Vercel monorepo FAQ](https://vercel.com/docs/monorepos/monorepo-faq): an app at `next-app` needs the project Root Directory set accordingly and **Include source files outside Root Directory** if it imports root `data/`. Changes to Vercel dashboard settings apply on the next deployment. Session Vercel connector enablement was not accepted, so live project settings remain unverified and unchanged.
