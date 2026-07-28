# Project design skills

Craft-level design skills available to any Claude session in this repo.
Unlike `skills/` at the repo root, which holds the machines (M00 through M06
and the operator loop), these are review and analysis helpers. They shape how
UI gets built and critiqued. They do not run on a schedule and they produce
no reports.

## Installed

| Skill | What it does |
|---|---|
| `craft` | 12 visual-craft rules for UI code: no gradients, no glow, no `transition: all`, no placeholder text, contained stacking contexts, neutrals off pure black and white, spacing on one scale, a small type scale, one elevation language, every interactive state designed, motion 120 to 250ms. Critique mode reports only violations with pasteable fixes. |
| `design-analysis` | Screenshots a URL at desktop and mobile, samples real pixels, reads computed styles, and returns measured typography, palette (hex plus OKLCH with area shares), spacing, shape, and motion. Needs Playwright and Chromium. Writes to `/tmp/design-analysis/`. |
| `accessibility` | WCAG 2.1 review of screenshots, mockups, and flows. |
| `cognitive-load-conversion` | Finds and cuts extraneous cognitive load in forms, flows, and layouts. |

## Where they came from

Source: https://github.com/tommyjepsen/awesome-ux-skills
Upstream commit: `6992218a492ba70d9fbae071bb3cbed43bdd76ac`
Vendored: 2026-07-28

Vendored rather than installed with the upstream `install.sh` for two reasons.
The upstream script installs all 22 skills globally to `~/.claude/skills/`,
which does not survive a cloud container reset. Committing the four we
actually use puts them on `main`, so every session and every machine gets
them from git like everything else here.

Only four of the 22 are here. The rest are UX research artifacts (personas,
journey maps, empathy maps) and AI product design patterns for teams shipping
AI features in a product UI. Neither matches what this repo does.

## Audit, 2026-07-28

Full repo reviewed before vendoring. No network egress, no credential access,
no hidden Unicode, no prompt injection, no build step, no dependencies. The
only executable code is the two Node and Playwright scripts inside
`design-analysis`, which screenshot a URL you pass them and write output
locally. Author is public and the repo is real, not a typosquat.

Re-audit the diff before pulling any upstream update. These files load
straight into session context, so a future commit is a future prompt.

## These sit under the brand, not over it

`craft` and `design-analysis` work at the CSS and pixel level. They do not
carry brand canon. When output is public facing, `queen-brain/voice.md`,
`positioning/`, and the brand skills still decide voice, and the Constitution
still wins. Worth watching: the upstream text is written with em-dashes
throughout, so if a craft pass ever touches copy instead of CSS, the voice
laws override it.
