# Source brief: 1 summary a day: the inbox manager

## Published route

- Slug: `inbox-manager-setup`
- Canonical route: `/guides/inbox-manager-setup.html`
- Level: Intermediate
- Hub: Workflows and automation
- Outcomes: Automate a task, Run business operations

## Source files reviewed

- Existing Shift & Lead page: `main-site/guides/inbox-manager-setup.html`
  - SHA-256: `ad0f18c8bd1f19098294b90dd3b316bea86e112a415e2e2c5ac11483e9f59799`
- Editorial portfolio review: `shift-and-lead-guide-portfolio-review.xlsx`
  - SHA-256: `3f19ce36963d309c6df34c565fd1a9b06f25379468c6230a757ec11ca785c8bb`
- `claude-email-dashboard.json`
  - SHA-256: `5f6ccb3507293372386dad0f09ddd785dd9f14c11f9d4bba800d93257820b11d`
- `email-scam-detector.json`
  - SHA-256: `73796b65cc3a300b0f9b20043225e8ba10e2a9a6e9fee2cb4fdeef47c145a952`
- `email-flows-audit-skill.json`
  - SHA-256: `799f6cb7d964176162f25fda9b2769d91ad864e54ffef6259c047a34fd317340`
- `ai-task-audit-prompt.json`
  - SHA-256: `0708fba2a9fd3753b4d01d26ddde63966939a878aa21d27946cac624377c04a1`
- `agent-guardrails-template.json`
  - SHA-256: `9555ea8a49a4771a174af90c10713d76a7ba07c620a008b09af5e04306d8eef5`

The creator pages and workbook are research inputs. Their sentences, bylines, tool-specific setup, performance claims, benchmark claims and visual branding are not reused.

## Coverage retained

- Keep the tutorial platform-neutral for Gmail or Outlook.
- Define the inbox categories before connecting AI.
- Start with read-only access. Add draft creation only when the connector exposes it without broader compose or send rights.
- If draft creation requires broader rights, keep generated reply text in a separate review queue.
- Fetch only messages inside the named folders and time range.
- Produce 1 daily brief instead of a new stream of alerts.
- Draft only. Never send, delete or archive automatically.
- Keep the original message link or ID beside every item that needs action.
- A person reviews the brief, checks every draft and takes the final action.
- Test normal messages, exceptions and system failures before relying on the brief.

## Categories and direct rules

The published template uses 6 visible categories:

1. Reply now: a reader, lead or customer needs a response today.
2. Review today: Fatiha must check a delivery failure, booking, decision, promise or deadline today.
3. Waiting or follow-up: a promised action, date or open thread may need attention later.
4. Reference or no action: useful context, newsletters, promotions and routine notices that need no action.
5. Risky or sensitive: the message involves money, access, personal data, legal terms or another sensitive decision.
6. Suspected scam: the sender, request, link or attachment shows a scam or phishing warning.

Anything unclear, incomplete or outside the rules goes to Exceptions and failures. It never goes to Reference or no action.

The system must never send, delete or archive. It must not click a link, open an unexpected attachment, promise a price, confirm availability or invent missing context. It prepares reply text and explanations. If the connector cannot create drafts without broader compose or send rights, the reply text stays in a separate review queue. Fatiha decides and acts.

## Expected daily brief

The brief has category counts, a no-action count and 5 fixed sections:

1. Urgent items.
2. Waiting or follow-up items.
3. Delivery or workflow failures.
4. Questions for the human owner.
5. Manual fallback.

Each urgent item shows all 7 fields: sender, subject, reason, recommended action, draft status, deadline and source link. The counts must match the fetched source messages.

## Shift & Lead transformation

The worked example uses the real guide business. The daily brief puts failed guide deliveries, replies from Lumail, bookings, high-intent work messages and anything requiring Fatiha at the top. Routine delivery confirmations and useful notices are summarised. Newsletters and promotions are included in the no-action count without hiding any uncertain message. AI prepares drafts for clear routine replies, but Fatiha reviews and sends.

## Exception and failure test

Run the workflow in shadow mode with a test set that includes:

- a failed guide delivery;
- a Lumail reader reply;
- a booking;
- a high-intent work enquiry;
- a routine question;
- an information-only notice;
- a newsletter;
- a suspicious message;
- a duplicate thread;
- a missing sender or date;
- an unreadable message or attachment;
- a connector or permission failure.

The test passes only when access remains read-only, sample rules pass, every urgent item has the 7 required fields, counts match the source, drafts stay unsent, an empty inbox is handled, the summary arrives and every failure creates a visible alert. Stop for write access, the wrong inbox or window, exposed sensitive data, an attempted scam action, an uncertain category, a missing summary or a stale draft. Record the emergency disable owner and route.

## Practical and downloadable assets

- Inline asset: Inbox triage rules and daily summary template.
- Download: `Inbox triage rules and daily summary template`
- File: `/downloads/inbox-triage-rules-and-daily-summary-template.pdf`
  - SHA-256: `3c7465ce598bc8b37ffd0a1362cb2a57c25e14f5bae75600a39dae45713d3f70`
- Guide ID: `guide.inbox-manager-setup`
- Lumail tag: `guide_inbox_summary_template`
- Capture button: `Send me the inbox template`

## Exactly 3 next guides

1. `follow-up-setup`
2. `first-ai-employee`
3. `24-7-operations-system`

## Artwork and publishing notes

- Final cover: `/images/guides/inbox-manager-setup.webp`
- Alt text: `The small blue robot mascot inspecting a machine that sorts incoming envelopes into labelled trays`
- Focal point: `84% center`
- Keep the title and creator signature as live HTML.
- The recurring character is the exact small blue robot mascot. Never depict a human queen.
- The Build Sprint may appear only after the complete tutorial, operating template and result check.

## Verification notes

- Do not publish benchmark claims from the workbook sources.
- Connector names and permissions can change. Confirm the exact permissions in the Gmail or Outlook connection used for the test. Do not assume draft creation is separate from compose or send access.
- The named PDF must exist at the capture path before the guide is released.
