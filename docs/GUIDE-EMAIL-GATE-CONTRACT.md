# Guide email form contract

The Lumail form is intentional lead capture, but its position and whether it gates content are page-specific owner decisions. The `shift-lead-guide-builder` skill and the approved page design take precedence over older gate patterns.

## Published guides

The approved registry in `data/guide-publication.json` is the source of truth. Every approved guide needs an embedded Lumail form and its own `guide-*` tag. A reusable component may handle submission, but it must not impose a generic page layout or form position. The approved Instagram guide places its form after all five steps and remains readable without submitting it.

## Visitor experience

- The guide URL and cover identify the requested guide.
- The form appears at that guide's approved point in the reading journey.
- Do not blur the guide cover or hide the Instagram steps behind an access screen.
- The form asks for email and an optional first name.
- Requested-guide delivery is separate from optional marketing consent.
- A privacy link is visible beside the form.
- A successful submission may unlock guides that are approved as gated. It must not be required to read the Instagram walkthrough.
- The reader is not offered a PDF download as a fallback.

## Submission contract

- Endpoint: `POST /api/guide-capture`
- Required: `email`, `guideSlug`, `source`, `consent`
- Optional: `firstName`, campaign fields
- Honeypot: `website`
- Recorded server-side: guide URL, guide tag, shared guide tag, source, timestamp and campaign fields
- Provider credential: `LUMAIL_API_TOKEN`, server-side only
- For an access-gated guide, unlock only after a successful Lumail response. For an after-guide form, send the return link and show success without claiming to unlock content.

## Persistence and review

- Storage key: `shift-lead-guide-access`
- Stored value: `true`
- `?gate=1` forces the form for testing, including after-guide forms.
- `?review=1` bypasses the gate only on localhost, `127.0.0.1` and Vercel preview hosts.
- Production does not accept the review bypass.

## Failure behaviour

- Invalid email is rejected before submission.
- Provider or network failure shows a generic retry message.
- A gated guide remains locked after a failed request. An after-guide form leaves the guide readable and offers a retry.
- Provider details and credentials are never exposed to the browser.

## Analytics

The gate may emit only:

- `guide_open`
- `guide_gate_view`
- `guide_gate_submit`
- `guide_unlock`

Allowed properties are guide slug, source page and campaign source. Private notes, guide notes, workbook responses and reflection text must never be sent.

## Verification limit

Code, validation, persistence and safe failure behaviour can be tested locally. End-to-end delivery must not be reported as working until a controlled test submission has confirmed the Lumail workflow and email message.
