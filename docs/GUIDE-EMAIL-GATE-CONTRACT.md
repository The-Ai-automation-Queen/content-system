# Free-guide email access contract

The email gate is intentional lead capture. It must not be removed while a guide is public and free.

## Gated guides

The approved registry in `data/guide-publication.json` is the source of truth. Every approved guide must render through `GuideAccessBoundary`, submit to `/api/guide-capture`, and have its own `guide-*` tag in Lumail. The current public set contains 20 guides.

## Visitor experience

- The guide URL and cover identify the requested guide.
- The access screen appears before the guide body.
- The access screen uses the guide cover as a blurred background.
- The form asks for email and an optional first name.
- The copy says that access also includes occasional practical guides and product updates.
- A privacy link is visible beside the form.
- One successful submission unlocks all free guides on that device.
- The reader is not offered a PDF download as a fallback.

## Submission contract

- Endpoint: `POST /api/guide-capture`
- Required: `email`, `guideSlug`, `source`, `consent`
- Optional: `firstName`, campaign fields
- Honeypot: `website`
- Recorded server-side: guide URL, guide tag, shared guide tag, source, timestamp and campaign fields
- Provider credential: `LUMAIL_API_TOKEN`, server-side only
- The guide unlocks only after a successful Lumail response.

## Persistence and review

- Storage key: `shift-lead-guide-access`
- Stored value: `true`
- `?gate=1` forces the access screen for testing.
- `?review=1` bypasses the gate only on localhost, `127.0.0.1` and Vercel preview hosts.
- Production does not accept the review bypass.

## Failure behaviour

- Invalid email is rejected before submission.
- Provider or network failure shows a generic retry message.
- The guide remains locked after a failed request.
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
