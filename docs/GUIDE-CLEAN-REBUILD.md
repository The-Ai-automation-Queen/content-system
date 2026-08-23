# Guide library clean rebuild

This branch starts from `main` and intentionally excludes PR #112 and its generated guide system.

## What remains

- The existing `/guides` library cover is the visual starting point.
- The approved Shift & Lead fonts, colours and blue robot mascot remain.
- Existing public URLs and redirects remain stable.
- The AI jargon guide merged in PR #111 remains until it is deliberately revised.

## What is rebuilt

- The inside-guide reading template.
- The writing structure for each guide.
- The email access wall and review bypass.
- The shared practical components used for steps, checklists, examples and copyable tools.

## Release sequence

1. Build and approve one inside-guide template using one real guide.
2. Add automated checks for structure, access behaviour, related-guide count and prohibited copy patterns.
3. Migrate guides individually in the approved learning order.
4. Review every guide in the browser before adding it to this PR.

No batch generation is allowed before step 1 is approved.
