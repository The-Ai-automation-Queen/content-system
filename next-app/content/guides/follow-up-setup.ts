import { defineGuideArticle } from "@/content/structured-guide";

export const followUpSetupGuide = defineGuideArticle({
  slug: "follow-up-setup",
  level: "Intermediate",
  hub: "Workflows and automation",
  outcomes: ["Automate a task", "Run business operations"],
  composition: "workflow",
  hero: {
    title: "Send the guide, follow up and stop on reply",
    promise:
      "Deliver the right guide, send 3 useful messages and put every real reply back in a person's hands.",
    illustration: {
      src: "/images/guides/follow-up-setup.webp",
      alt: "The small blue robot mascot holding an envelope beside a connected follow-up pipeline",
      focalPoint: "86% center",
    },
    copyPosition: "left",
  },
  capture: {
    guideSlug: "follow-up-setup",
    guideId: "guide.follow-up-setup",
    lumailTag: "guide_lead_follow_up_builder",
    buttonLabel: "Send me the follow-up builder",
    modalTitle: "Get the lead follow-up builder",
    description:
      "Enter your email to get the lead follow-up map and 3-message builder. Download it immediately and map 1 complete guide journey.",
    deliverable: {
      name: "Lead follow-up map and 3-message builder",
      format: "PDF",
      downloadHref: "/downloads/lead-follow-up-map-and-message-builder.pdf",
      usefulWhen:
        "Use it before you turn on a guide sequence or change the trigger, tag, timing or handoff rule.",
    },
  },
  answer: {
    heading: "Use 1 contact, 1 guide tag and 1 matching workflow",
    paragraphs: [
      "A reliable follow-up starts when 1 clear event adds or updates 1 contact. The correct tag delivers the promised guide and starts only the matching active workflow.",
      "The workflow can handle delivery and timed reminders. A person must own every reply, exception and decision that could affect trust.",
    ],
    keyLine: "Automation delivers and remembers. AI drafts. You send. A person owns replies.",
  },
  framework: {
    kind: "workflow",
    heading: "Build the follow-up in 7 steps",
    outcome:
      "The reader receives the requested guide and 3 relevant messages, while replies and risk events leave automation immediately.",
    trigger:
      "A reader requests a named guide through an approved keyword path or the guide's website popup.",
    requiredInputs: [
      "The guide name, live guide URL, first action and useful follow-up",
      "1 exact trigger, approved entry channels and proof of consent",
      "The guide tag and matching active Lumail workflow",
      "Fatiha's handoff alert, response target and manual fallback",
    ],
    steps: [
      {
        owner: "Human",
        title: "1. Choose 1 trigger",
        action:
          "Name the single event that starts the journey. For Shift & Lead, a guide keyword on a supported Instagram or Facebook channel lets Blotato DM the correct guide link. The website popup is the only email entry point.",
        output: "1 exact trigger, entry channel, guide and start rule.",
      },
      {
        owner: "Automation",
        title: "2. Send an immediate confirmation",
        action:
          "Blotato sends the guide link in the DM. After the reader enters an email in the guide popup, Lumail immediately delivers the promised file and explains the first useful action.",
        output: "The reader gets the correct guide and knows what to do first.",
      },
      {
        owner: "Automation",
        title: "3. Create or update 1 contact",
        action:
          "Lumail creates or updates 1 contact, records the source, applies the label for the requested guide and checks the start and exclusion rules. Do not create a 2nd contact in another system.",
        output: "1 contact with the correct source, owner, next action and guide tag.",
      },
      {
        owner: "AI",
        title: "4. Let AI prepare follow-up",
        action:
          "Use AI to prepare or revise messages from the approved guide, offer and tone rules. Keep facts inside the approved material. For a direct reply, AI drafts and Fatiha sends.",
        output: "A short draft with 1 job, 1 main action and no invented detail.",
        approvalRequired: true,
      },
      {
        owner: "Automation",
        title: "5. Schedule Day 0, Day 2 and Day 5",
        action:
          "Lumail starts only the workflow that matches the guide tag and is active. Day 0 delivers. Day 2 helps the reader use 1 part only when eligible and no reply exists. Day 5 asks permission for a next step only when there is no reply, booking, purchase, unsubscribe or handoff.",
        output: "3 approved messages with timing, send rules, stop rules and fallbacks.",
      },
      {
        owner: "Automation",
        title: "6. Pause, stop or hand off",
        action:
          "Any reply pauses the workflow, stops later messages and assigns the conversation to Fatiha. A booking, unsubscribe, bounce or complaint closes the sequence. Log the event and alert the named owner when recovery is needed.",
        output: "No active sequence continues after a reply or closing event.",
      },
      {
        owner: "Human",
        title: "7. Test before you trust it",
        action:
          "Use a test contact. Run the keyword and popup paths. Check the guide, link, contact, tag, active workflow, Day 0 delivery, Day 2 and Day 5 eligibility, reply pause, Fatiha alert and every closing event. Do not launch while any check fails.",
        output: "A passed end-to-end test and a named manual fallback.",
        approvalRequired: true,
      },
    ],
    finalOutput:
      "A tested guide follow-up that delivers what was requested, continues only while eligible and hands real conversations to Fatiha.",
  },
  example: {
    heading: "The Shift & Lead guide journey",
    situation:
      "A reader comments a guide keyword on a supported Instagram or Facebook post and expects the correct guide without being pushed through several platforms.",
    weakApproach:
      "Store the reader in several contact systems, start a generic sequence and keep sending after the person replies or books.",
    decision:
      "Give Blotato the DM handoff and Lumail the contact, delivery and email workflow. Store the contact once and stop automation when a real conversation begins.",
    action:
      "Blotato DMs the guide link. The reader opens the guide and enters an email in the website popup. Lumail creates or updates 1 contact, applies the matching guide tag, delivers the file and starts only the matching active workflow. The workflow uses the approved Day 0, Day 2 and Day 5 messages. A reply pauses the sequence and assigns it to Fatiha. A booking, unsubscribe, bounce or complaint closes it.",
    result:
      "The reader gets the promised guide and useful help without duplicate contacts, mismatched sequences or automated messages after a human response.",
    lesson:
      "Automate the delivery and memory around the relationship. Keep the relationship with a person.",
  },
  practicalAsset: {
    kind: "worksheet",
    heading: "Map the full journey before you switch it on",
    introduction:
      "Complete the workflow setup, 3 messages, contact record, handoff, failure controls and launch test for 1 guide.",
    instructions:
      "Every message needs 1 job, 1 main action, a send rule, a stop rule and a fallback. Leave the workflow off until the test contact reaches every expected state.",
    workedExample: {
      label: "Use these 3 approved message templates",
      content: `MESSAGE 1: IMMEDIATE
Subject: Your [Guide name] is here

Hi [First name],

Here is the [Guide name] you requested: [Guide URL].

Start with [First action]. It will help you get the first useful result without setting up the full system.

If anything is unclear, reply to this email. A real person will see it.

[Sender name].

MESSAGE 2: DAY 2, ONLY IF ELIGIBLE AND NO REPLY
Subject: Did you try [First action]?

Hi [First name],

The most useful part of [Guide name] is [Useful follow-up].

Try this today: [Short instruction or checklist].

Which part are you working on now: [option 1], [option 2] or [option 3]?

Reply with the closest answer and I will point you to the right next step.

[Sender name].

MESSAGE 3: DAY 5, ONLY IF NO REPLY, BOOKING, PURCHASE, UNSUBSCRIBE OR HANDOFF
Subject: Do you want help setting this up?

Hi [First name],

You now have the guide and the first action.

If you want help turning it into a working system, you can:

Reply and tell me where you are stuck.

Book [Next-step offer]: [Booking URL].

Ignore this email if you have what you need. No pressure and no endless follow-up.

[Sender name].`,
    },
    fields: [
      {
        label: "1. Workflow setup",
        instruction:
          "Record the workflow name or outcome, 1 exact trigger, entry channel, offer or guide, start rule, exclusion, consent proof, deduplication rule and test contact.",
      },
      {
        label: "2. Immediate message",
        instruction:
          "Record its single job, template, 1 main action, send rule, stop rule and fallback.",
      },
      {
        label: "3. Day 2 message",
        instruction:
          "Record its single job, template, 1 main action, eligible and no-reply send rule, stop rule and fallback.",
      },
      {
        label: "4. Day 5 message",
        instruction:
          "Record its single job, template, 1 main action, eligibility send rule, stop rule and fallback.",
      },
      {
        label: "5. Contact record and handoff",
        instruction:
          "Record name, email, source, owner, next action, tags, human owner, alert, response target, actions paused and recovery or manual fallback.",
      },
      {
        label: "6. Failure controls",
        instruction:
          "Test invalid email, duplicate contact, wrong or missing tag, inactive sequence, delivery or link, provider failure, bounce, opt-out or complaint, reply received, personalisation, time zone or weekend, retry policy, failure log, recovery owner and manual fallback.",
      },
      {
        label: "7. Launch pass checks",
        instruction:
          "Confirm the trigger runs once, the guide and link are correct, the contact and tag save, the active sequence matches, Day 2 and Day 5 timing works, replies and opt-outs stop, and the handoff alert works.",
      },
      {
        label: "8. Stop launch if",
        instruction:
          "Stop for a wrong guide or link, duplicate send, missing consent, workflow mismatch, opt-out or complaint, provider failure, or open reply or handoff.",
      },
    ],
    completionRule:
      "A test contact passes the full path, every message has a stop rule, replies pause and assign to Fatiha, closing events end the sequence and a manual fallback has an owner.",
  },
  resultCheck: {
    heading: "Trust the workflow only after every state passes",
    successSignals: [
      "The trigger runs once and opens the correct guide and popup.",
      "Lumail creates or updates 1 contact, applies the correct tag, delivers the file and starts only the matching active workflow.",
      "Day 0, Day 2 and Day 5 follow the approved timing and eligibility rules.",
      "A reply pauses later messages and assigns the conversation to Fatiha.",
      "A booking, unsubscribe, bounce or complaint closes the sequence.",
      "Failures create a visible log, owner alert and manual recovery path.",
    ],
    limitations: [
      "Keyword DM support, account connections and workflow state can change. Confirm them in the live accounts before launch.",
      "AI can prepare a direct reply, but Fatiha checks and sends it.",
    ],
    stopConditions: [
      "The wrong guide, link, tag or workflow is selected.",
      "A duplicate contact or duplicate message is created.",
      "Consent, exclusion or deduplication rules are missing.",
      "A reply, booking, unsubscribe, bounce or complaint does not stop later messages.",
      "A failure or open handoff has no alert, owner or manual fallback.",
    ],
  },
  relatedGuideSlugs: ["inbox-manager-setup", "first-ai-employee", "24-7-operations-system"],
  relatedHeading: "Build the next safe handoff.",
  ending: {
    kind: "commercial",
    eyebrow: "Ready to build the tested version?",
    heading: "Turn the approved map into a working follow-up",
    body:
      "Complete the builder and pass the test contact first. The Shift & Lead Build Sprint can then build the workflow with clear ownership, stop rules and recovery paths.",
    action: {
      label: "Build my follow-up system",
      href: "/work-with-me.html",
    },
  },
});
