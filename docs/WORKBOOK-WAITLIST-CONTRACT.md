# Workbook waitlist contract

Lumail is the only email destination for the three workbook waitlists.

## Submission

- Browser endpoint: `POST /api/workbook-waitlist`
- Provider: Lumail, called server-side with `LUMAIL_API_TOKEN`
- Required fields: `email`, `firstName`, `product`, `source`, `consent`
- Honeypot: `website`
- Allowed products:
  - `find-your-zone-of-genius`
  - `your-human-evidence`
  - `use-what-is-unique-about-you`

## Lumail tags

Every subscriber receives the shared `book-waitlist-ai-empowerment` tag and one product-specific tag:

- `workbook-find-your-zone-of-genius`
- `workbook-your-human-evidence`
- `workbook-use-what-is-unique-about-you`

The workbook slug and form source are also stored as Lumail fields. The browser never receives or exposes the Lumail credential.

## Verification

The endpoint must reject unknown workbook slugs and submissions without consent. A successful production test may use a controlled address only; never create a subscriber merely to probe the endpoint.
