# Guide email form contract

The Lumail form is intentional lead capture, but its position and whether it gates content are page-specific owner decisions. The `shift-lead-guide-builder` skill and the approved page design take precedence over older gate patterns.

## Published guides

The approved registry in `data/guide-publication.json` is the source of truth. Every approved guide needs an embedded Lumail form and its own `guide-*` tag. A reusable component may handle submission, but it must not impose a generic page layout or form position. The Instagram guide shows its compact email modal before any walkthrough content. The full guide opens only after a successful submission.

## Visitor experience

- The guide URL and cover identify the requested guide.
- The form appears at that guide's approved point in the reading journey.
- For Instagram, show the complete cover artwork and email form in a compact modal; keep all walkthrough steps hidden until successful capture.
- The Instagram gate requires first name, last name, and email. Other guide forms keep their own approved fields.
- Requested-guide delivery is separate from optional marketing consent.
- Do not expose provider names or implementation notes in the reader-facing form. The site footer retains the Privacy link.
- A successful Lumail submission unlocks the Instagram walkthrough in place.
- The reader is not offered a PDF download as a fallback.

## Submission contract

- Endpoint: `POST /api/guide-capture`
- Required: `email`, `guideSlug`, `source`, `consent`
- Instagram required: `firstName`, `lastName`. Other guide forms may omit these fields. Campaign fields are optional.
- Honeypot: `website`
- Recorded server-side: guide URL, guide tag, shared guide tag, source, timestamp and campaign fields
- Provider credential: `LUMAIL_API_TOKEN`, server-side only
- For an access-gated guide, unlock only after a successful Lumail response.

## Persistence and review

- Instagram storage key: `shift-lead-guide-access:instagram-content-dashboard`. Other gated guides currently use the shared `shift-lead-guide-access` key.
- Stored value: `true`
- `?gate=1` forces the Instagram entry form for testing.
- `?review=1` bypasses the gate only on localhost, `127.0.0.1` and Vercel preview hosts.
- Production does not accept the review bypass.

## Failure behaviour

- Invalid email is rejected before submission.
- Provider or network failure shows a generic retry message.
- A gated guide remains locked after a failed request.
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
