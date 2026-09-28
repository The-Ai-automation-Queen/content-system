# Guide email form contract

The owner replaced the pre-guide popup with a compact inline Lumail form. Readers see useful teaching and a worked example before the form. Place it where they naturally want the next resource. **If the guide has a copyable prompt, the form must come before the complete prompt and Copy button are revealed.** The exact point and promise depend on the guide; there is no compulsory final-section gate.

## Reader experience

- Show a clear outcome, a concise lesson and an actionable example before asking for an email. Keep the full copyable prompt after capture.
- State exactly what the form unlocks. Keep provider names and delivery notes out of reader-facing copy.
- Do not use a page-load modal, timer, empty teaser or reader account.
- Collect first name and email (owner decision 28/09/2026: no last name). Marketing consent is a separate optional checkbox.
- Reveal gated material only after a confirmed server response. On failure, keep it locked and offer a clear retry.
- Email the clean guide URL for the reader to revisit. Do not build passwords, a reader database or IP-based identity.

## Submission and review

- Submit to `POST /api/guide-capture` with `email`, `firstName`, optional `lastName`, `guideSlug`, `source`, `consent` and optional `marketingConsent`. Include the hidden `website` honeypot.
- The server assigns shared and guide-specific tags and sends the return link through Lumail. Keep `LUMAIL_API_TOKEN` server-side.
- `?gate=1` may force the inline form for testing; `?review=1` may bypass it only on local and preview hosts. Production must not honour the bypass.
- Test the rendered reading order, success/error state, focus, prompt copy, received email and guide tag before release. A successful local message alone does not prove delivery.
- Allowed analytics: `guide_open`, `guide_gate_view`, `guide_gate_submit`, `guide_unlock`. Never send form values or private guide content.

Use `docs/shift-lead-website-and-guides-goal-2026-09-27.md` and the latest owner instructions for editorial and release decisions. The publication registry alone does not prove approval.
