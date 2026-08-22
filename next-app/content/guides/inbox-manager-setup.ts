import { defineGuideArticle } from "@/content/structured-guide";

export const inboxManagerSetupGuide = defineGuideArticle({
  slug: "inbox-manager-setup",
  level: "Intermediate",
  hub: "Workflows and automation",
  outcomes: ["Automate a task", "Run business operations"],
  composition: "tutorial",
  hero: {
    title: "1 summary a day: the inbox manager",
    promise:
      "Get 1 daily brief showing what needs you, what has a draft and what failed.",
    illustration: {
      src: "/images/guides/inbox-manager-setup.webp",
      alt: "The small blue robot mascot inspecting a machine that sorts incoming envelopes into labelled trays",
      focalPoint: "84% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "inbox-manager-setup",
    guideId: "guide.inbox-manager-setup",
    lumailTag: "guide_inbox_summary_template",
    buttonLabel: "Send me the inbox template",
    modalTitle: "Get the inbox triage template",
    description:
      "Enter your email to get the inbox triage rules and daily summary template. Download it immediately and test it with a small message set.",
    deliverable: {
      name: "Inbox triage rules and daily summary template",
      format: "PDF",
      downloadHref: "/downloads/inbox-triage-rules-and-daily-summary-template.pdf",
      usefulWhen:
        "Use it before you connect an inbox, change a category rule or let AI prepare drafts.",
    },
  },
  answer: {
    heading: "The job is to reduce decisions, not move email for you",
    paragraphs: [
      "A useful inbox manager reads a narrow set of messages, explains how it classified them and prepares 1 daily brief. It does not create another stream of alerts.",
      "Start with read-only access. Add draft creation only when the connector can do it without broader compose or send rights. Otherwise, keep reply text in a separate review queue.",
    ],
    keyLine: "Read narrowly. Summarise once. Draft only. Never send, delete or archive.",
  },
  framework: {
    kind: "tutorial",
    heading: "Build the inbox manager in 7 steps",
    finishedResult:
      "1 daily brief for Gmail or Outlook with clear categories, linked source messages, unsent drafts, visible exceptions and a human review step.",
    requirements: [
      "A Gmail or Outlook inbox and a connector that can start with read-only access",
      "The folders, labels or mailbox and time range the workflow may read",
      "Category rules, Fatiha's review time and examples of approved reply tone",
      "A test message set that includes normal mail, important exceptions and a connector failure",
    ],
    steps: [
      {
        title: "1. Choose the categories",
        instruction:
          "Define Reply now, Review today, Waiting or follow-up, Reference or no action, Risky or sensitive and Suspected scam. Put anything unclear or outside the rules in Exceptions and failures. Require 1 short reason for every category.",
        whyItMatters:
          "AI cannot know what matters in your business until the rules name the people, events and consequences that change priority.",
        completionCheck:
          "Each category has a sender, domain, keyword or VIP routing rule plus an exception that must never be hidden as no action.",
      },
      {
        title: "2. Start with read-only access",
        instruction:
          "Connect Gmail or Outlook with the smallest access available. Allow the system to read only the approved mailbox, folder or label. Confirm the exact connector permissions. If draft creation needs broader compose or send rights, keep the connection read-only and store reply text in a separate review queue.",
        whyItMatters:
          "A copy rule can be ignored by a faulty workflow. Missing permission blocks the action completely.",
        completionCheck:
          "The test account can read the approved messages and cannot send, delete or archive. Any reply text has a safe review location.",
      },
      {
        title: "3. Fetch only the messages you need",
        instruction:
          "Set the folder, labels, last successful run time and current end time. Fetch each message once. Keep its sender, subject, received time and original message link or ID. Do not search the full mailbox when the job needs only new messages.",
        whyItMatters:
          "A narrow fetch reduces duplicate items, missed time windows and unnecessary access to old or unrelated mail.",
        completionCheck:
          "The run has a visible start and end time, no duplicate thread and a source link or ID for every item.",
      },
      {
        title: "4. Turn the messages into 1 daily brief",
        instruction:
          "Show category counts and a no-action count, then Urgent items, Waiting or follow-up items, Delivery or workflow failures, Questions for the human owner and Manual fallback. Give every urgent item the 7 required fields.",
        whyItMatters:
          "The brief should replace inbox scanning. A changing format makes important items harder to spot.",
        completionCheck:
          "Every urgent item shows sender, subject, reason, recommended action, draft status, deadline and source link.",
      },
      {
        title: "5. Prepare drafts, never actions",
        instruction:
          "Prepare reply text only for a clear request with enough approved context. Save it as a draft only when the connector can do that without broader compose or send rights. Otherwise, put it in a separate review queue. Never send, delete or archive automatically.",
        whyItMatters:
          "A draft is easy to correct. A sent promise, deleted message or hidden thread can damage a relationship before Fatiha sees it.",
        completionCheck:
          "Every draft or reply text stays unsent, links to its source and names any fact or decision Fatiha must check.",
      },
      {
        title: "6. Review and take the action yourself",
        instruction:
          "Fatiha reviews Needs Fatiha now first, opens the original message, checks each draft and sends, edits, waits or declines. Record the action so the next brief does not raise the same item without context.",
        whyItMatters:
          "The inbox manager prepares attention. It does not own customer promises, priorities or final communication.",
        completionCheck:
          "Every priority item has a human decision, owner and next action after review.",
      },
      {
        title: "7. Run the exception and failure test",
        instruction:
          "Test a guide delivery failure, Lumail reply, booking, high-intent enquiry, unreadable message, unreadable attachment, missing sender or date, duplicate thread, sensitive data, suspicious message, wrong category, time boundary, empty inbox, stale draft and provider failure. Confirm nothing sends, deletes or archives.",
        whyItMatters:
          "A system that works only on tidy messages cannot be trusted with a real inbox.",
        completionCheck:
          "Important messages appear once, uncertain items stay visible and a failed connection produces an exception instead of an empty all-clear.",
      },
    ],
  },
  example: {
    heading: "The Shift & Lead daily inbox brief",
    situation:
      "The inbox contains guide delivery notices, replies from Lumail, bookings, work enquiries, routine confirmations, newsletters and automatic noise.",
    weakApproach:
      "Show an unread count, draft replies to everything and let routine messages bury a failed guide delivery or a reader waiting for Fatiha.",
    decision:
      "Surface anything that affects guide delivery, a live reader, a booking or a possible client. Summarise routine information and count noise without acting on it.",
    action:
      "Reply now and Review today show failed guide deliveries, Lumail replies, bookings, high-intent messages and any decision only Fatiha can make. Waiting or follow-up holds dated commitments. Reference or no action summarises routine notices and noise. Risky or sensitive and Suspected scam stay visible. Delivery or workflow failures, questions for Fatiha and the manual fallback appear separately.",
    result:
      "Fatiha opens 1 brief, handles the relationship and delivery risks first, reviews useful drafts and leaves routine noise out of the decision queue.",
    lesson:
      "A good inbox manager makes important work harder to miss. It does not take the Send button.",
  },
  practicalAsset: {
    kind: "template",
    heading: "Copy the inbox rules and daily brief format",
    introduction:
      "Replace the bracketed details, then run this in shadow mode with a small test set before connecting a live daily schedule.",
    instructions:
      "Keep the order and the safety rules. Change the category examples to match your customers, offers and deadlines.",
    content: `INBOX TRIAGE RULES

SCOPE AND OWNERSHIP
Inbox or account: [approved account]
Owner: [name]
Review time and time zone: [time and zone]
Date window: [last successful run] to [current run]
Read-only access proof: [test result]
Included folders or labels: [locations]
Excluded data: [locations and data]
Minimum data: sender, subject, received time, message link or ID
Human approver: [name]
Escalation or alert route: [route]
Reply text review location: [mail draft or separate review queue]

TRIAGE RULES
1. REPLY NOW
A reader, lead or customer needs a response today. Include Lumail replies and high-intent work requests.

2. REVIEW TODAY
Fatiha must check a failed guide delivery, booking, decision, promise or deadline today.

3. WAITING OR FOLLOW-UP
A promised action, date or open thread may need attention later.

4. REFERENCE OR NO ACTION
Useful context, newsletters, promotions and routine notices need no action. Count routine noise instead of listing every item.

5. RISKY OR SENSITIVE
The message involves money, access, personal data, legal terms or another sensitive decision.

6. SUSPECTED SCAM
The sender, request, link or attachment shows a phishing or scam warning.

ROUTING RULES
Sender rule: [rule]
Domain rule: [rule]
Keyword rule: [rule]
VIP rule: [rule]
Exceptions: [rule]

DIRECT RULES
- Read only the approved location and time range.
- Give every item 1 category and 1 short reason.
- Keep the original message link or ID beside every action item.
- Draft only when the request and source facts are clear.
- If draft creation needs broader compose or send rights, use a separate review queue.
- Never invent a promise, price, fact, deadline or availability.
- Never send, delete or archive.
- Never click a suspicious link or open an unexpected attachment.
- If the connector fails, report the failure. Never return an empty all-clear.
- Emergency disable owner and route: [owner and route]

DAILY INBOX BRIEF
Date: [date]
Time range: [start] to [end]
Category counts: [Reply now] | [Review today] | [Waiting] | [Reference] | [Risky] | [Suspected scam]
No-action count: [count]

1. URGENT ITEMS [count]
- [Sender] | [Subject]
  Reason: [1 line]
  Recommended action: [what Fatiha should do]
  Draft status: [none or draft link]
  Deadline: [date or none]
  Source link: [message link or ID]

2. WAITING OR FOLLOW-UP ITEMS [count]
- [Thread] | [next date] | [owner] | [source link]

3. DELIVERY OR WORKFLOW FAILURES [count]
- [Reader or system] | [failure] | [impact] | [owner action]

4. QUESTIONS FOR THE HUMAN OWNER [count]
- [Question] | [why the system cannot decide] | [source link]

5. MANUAL FALLBACK
[What Fatiha must do if the summary or connector fails]`,
    qualityBar: [
      "Access is read-only, the correct inbox and date window are used and excluded data stays excluded.",
      "Every urgent item contains sender, subject, reason, recommended action, draft status, deadline and source link.",
      "Category counts match the fetched source and an empty inbox is reported clearly.",
      "Guide delivery failures, Lumail replies, bookings and high-intent requests reach Fatiha at the top.",
      "No message is sent, deleted or archived and no suspicious action is attempted.",
      "The summary is delivered, failures create an alert and the emergency disable route is recorded.",
    ],
  },
  resultCheck: {
    heading: "The inbox manager is ready when the brief can be trusted",
    successSignals: [
      "The workflow reads only the approved mailbox, folders and time range.",
      "Each message appears once with a category, reason and source link or ID.",
      "Guide delivery failures, Lumail replies, bookings and high-intent messages reach Fatiha at the top.",
      "Drafts stay unsent and name what Fatiha must check.",
      "When safe draft creation is unavailable, reply text stays in the separate review queue.",
      "Exceptions and system failures remain visible until a person resolves them.",
    ],
    limitations: [
      "AI can miss relationship context, sarcasm or urgency that is not written in the message.",
      "Gmail and Outlook connectors expose different permission and draft options. Confirm the exact access. Do not assume draft creation is separate from compose or send rights.",
    ],
    stopConditions: [
      "The system can send, delete or archive.",
      "Draft creation requires broader compose or send rights and no separate review queue is used.",
      "Messages outside the approved location or time range are fetched.",
      "An important message is missing, duplicated or placed in Noise.",
      "A draft invents a promise, fact, price, deadline or availability.",
      "A connector failure produces an empty brief or false all-clear.",
    ],
  },
  relatedGuideSlugs: ["follow-up-setup", "first-ai-employee", "24-7-operations-system"],
  relatedHeading: "Build the next safe handoff.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to build the tested version?",
    heading: "Turn the approved inbox rules into a working daily brief",
    body:
      "Complete the template and pass the exception test first. The Shift & Lead Build Sprint can then build the workflow with limited access, visible failures and human review.",
    action: {
      label: "Build my daily inbox brief",
      href: "/work-with-me.html",
    },
  },
});
