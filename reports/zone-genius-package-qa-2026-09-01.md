# Zone of Genius package QA — 2026-09-01

**Result: PASS** for the requested package checks. No release blocker was found in the inspected PDF or ZIP.

## Artifacts inspected

- `/opt/data/workspace/zone-genius-release/find-your-zone-of-genius-workbook-v2.pdf`
- `/opt/data/workspace/zone-genius-release/find-your-zone-of-genius-private-agent.zip`

## Workbook PDF

- **Integrity:** Opened in strict mode and all pages were traversed and extracted without error. The document is not encrypted.
- **Page count:** Exactly **40 pages**.
- **Page size:** All pages are A4: **594.96 × 841.92 pt** (approximately **209.889 × 297.011 mm**) with rotation 0.
- **Selectable text:** Text extraction succeeded on **40/40 pages**. No page had an empty text layer.
- **Investigations:** Pages 11–21 contain Investigations 1–11 in canonical order and match the private-agent questions.

## Private-agent ZIP

- **Integrity:** Python `zipfile.testzip()` returned no corrupt member.
- **ZIP SHA-256:** `7cf7ee4788c57cb8872c32cb60f576da50f34cd84a2e4a88f71c91a81f19766b`
- **Contents:** Exactly one Markdown file: `Find-Your-Zone-of-Genius-Private-Agent.md`.
- **Markdown SHA-256:** `9bb53b3f1d2a9fd9402e88c1200903e94ccc29997becfc6454a8f007c4d6026c`
- **Source match:** The archived Markdown is byte-identical to the staged source.
- **Investigations:** Exactly 11 sections, numbered 1 through 11 with no gaps or reordering.

## Agent behavior audit

The packaged instructions explicitly require:

- one main question at a time;
- support for `skip`, `private`, `keep this private`, `I do not know`, and partial answers;
- a numbered evidence review and explicit `Analyse my evidence` approval before analysis;
- exactly three genuinely different hypotheses;
- short, exact evidence quotes labelled by investigation number;
- contradictions, boundaries, missing evidence, and uncertainty;
- exactly five follow-up questions asked one at a time;
- reader-controlled keep, edit, combine, reject, or `None yet` decisions;
- the exact eleven-field `My Zone of Genius Hypothesis` artifact;
- reader permission before private memories or exact quotes enter printable fields;
- a small, reversible, ethical 30-day test with observable strengthening and weakening evidence.

## Limits

- This is a static package and instruction audit. It does not prove model compliance in a live ChatGPT Project.
- The supplied independent QA history reports that the 40-page workbook passed contact-sheet and detailed visual checks. This package audit did not repeat that visual inspection.
