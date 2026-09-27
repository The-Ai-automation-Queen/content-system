import type { GuidePage } from "./guide-page";

export const claudeGuide = {
  "sections": [],
  "slug": "claude",
  "title": "What can you actually do with Claude at work?",
  "promise": "Choose meeting notes, a document question or an email. See the sample input and useful result before trying the prompt yourself.",
  "cover": "/images/guides/claude-first-task.webp",
  "coverAlt": "A small blue robot princess turning scattered notes into one finished document on an engraved wooden desk",
  "seoDescription": "See three complete Claude examples for work: sort meeting notes, answer a document question and draft an email. Try one and check the result.",
  "lumailTag": "guide-claude",
  "sourceNotes": [
    { "label": "Anthropic: Get started with Claude", "url": "https://support.claude.com/en/articles/8114491-get-started-with-claude" },
    { "label": "Anthropic: What can I use Claude for?", "url": "https://support.claude.com/en/articles/7996845-what-are-some-things-i-can-use-claude-for" },
    { "label": "Audience research: non-coders asking how to use Claude at work", "url": "https://www.reddit.com/r/ClaudeAI/comments/1vw0m4p/claude_in_your_daily_work_if_your_are_not_a/" },
    { "label": "Audience research: reported meeting, document and email workflows", "url": "https://www.reddit.com/r/ClaudeAI/comments/1w0wcvi/how_i_actually_use_claude_daily_and_none_of_it_is/" },
    { "label": "Audience research: frustration with long, hard-to-follow answers", "url": "https://www.reddit.com/r/ClaudeAI/comments/1vv14nh/is_anyone_else_finding_claude_really_hard_to/" }
  ],
  "answer": {
    "paragraphs": [
      "**Start with one small task, not a new system to learn.** Try a complete example below, then use the same instructions with your own material. No coding or connected apps needed."
    ]
  },
  "series": {
    "part": 1,
    "tasks": [
      {
        "id": "meeting",
        "title": "Sort my meeting notes",
        "outcome": "Find who needs to do what.",
        "example": "Sample notes: The team agreed to run a pilot. The programme lead will draft the invitation by 8 October. Operations will check room availability, but no deadline was set. Budget approval is pending. A launch on 22 October was suggested, not confirmed.",
        "prompt": "Turn these notes into decisions, an action table and open questions. Use only the notes. For each action, show the owner and deadline. Write \"Not agreed\" for missing details. Keep suggestions separate from decisions. Draft only; don't take actions in another app.\n\nNotes: We agreed to run a pilot. Programme lead will draft the invitation by 8 October. Operations lead will check room availability; no deadline agreed. Budget approval is pending. A launch on 22 October was suggested, not confirmed.",
        "result": "Decision: run a pilot. Actions: programme lead to draft the invitation by 8 October; operations to check the room, deadline not agreed. Open: budget approval and the proposed launch date.",
        "wrongLine": "The launch is confirmed for 22 October.",
        "correctionFact": "A launch on 22 October was suggested, not confirmed."
      },
      {
        "id": "document",
        "title": "Answer a document question",
        "outcome": "Find the answer and the words supporting it.",
        "example": "Sample source: “The training includes 2 live sessions. A recording may be offered later, subject to speaker approval. Pricing has not been agreed.” Your question: Is a recording included?",
        "prompt": "Answer my question using only the source. Quote the words supporting your answer and flag anything unresolved. Keep it under 100 words. If the source doesn't answer, say so.\n\nQuestion: Is a recording included?\nSource: The training includes 2 live sessions. A recording may be offered later, subject to speaker approval. Pricing has not been agreed.",
        "result": "No recording is confirmed. The source says it “may be offered later, subject to speaker approval.” Pricing is also still open.",
        "wrongLine": "A recording is included.",
        "correctionFact": "The source says a recording may be offered later, subject to speaker approval."
      },
      {
        "id": "email",
        "title": "Draft my email",
        "outcome": "Turn rough points into a short message.",
        "example": "Sample points: Your event is on 12 October. You need display stands by 10 October, but the supplier has not confirmed delivery. Ask them to flag any risk of delay.",
        "prompt": "Write a warm, direct email under 80 words, with a subject line. Use these points only. Don't invent names or commitments. Draft only; don't send.\n\nPoints: Ask the supplier to confirm when the display stands will arrive. Our event is on 12 October. We need delivery by 10 October. Ask them to flag any risk of delay.",
        "result": "Subject: Display stand delivery. Could you confirm if the stands can arrive by 10 October for our event on 12 October? Please let us know if there is any risk of delay.",
        "wrongLine": "Thank you for confirming delivery on 10 October.",
        "correctionFact": "The supplier has not confirmed delivery. We need to ask if the stands can arrive by 10 October."
      }
    ],
    "correction": "Correct this line: [paste it]\nUse this information: [paste the correction]\nKeep the rest unchanged. Show any remaining gap instead of guessing."
  },
  "conclusion": {
    "heading": "Keep what worked",
    "paragraphs": [
      "Save the instruction if the result was useful. You can now repeat this task with new material."
    ],
    "finishLine": ""
  },
  "related": [
    {
      "slug": "what-should-you-never-share-with-ai",
      "title": "What should you never share with AI?",
      "reason": "Check what belongs in a work chat before you use your own material.",
      "cover": "/images/guides/learn-master.webp"
    },
    {
      "slug": "connect-ai-to-email-files-calendar",
      "title": "Should you let AI connect to your email, files and calendar?",
      "reason": "Know what access you are giving before you connect a work account.",
      "cover": "/images/guides/connect-ai-to-email-files-calendar.webp"
    }
  ]
} as const satisfies GuidePage;

export const claudeProjectsGuide = {
  "sections": [],
  "slug": "claude-projects",
  "title": "Stop repeating your instructions to Claude",
  "promise": "Meeting over, notes everywhere, and still no clear list of who does what? Save your instructions once so Claude can organise each meeting’s notes the same way.",
  "cover": "/images/guides/claude-projects.webp",
  "coverAlt": "A small blue robot princess arranging reusable instruction cards in an engraved brass filing cabinet",
  "seoDescription": "Turn meeting notes into decisions, assigned actions and unanswered questions. Save the instructions in a Claude Project and reuse them for the next meeting.",
  "lumailTag": "guide-claude-projects",
  "answer": {
    "paragraphs": [
      "**A Project keeps reusable instructions and reference material together.** You’ll still supply the details that change for each task."
    ]
  },
  "sourceNotes": [
    { "label": "Audience research: organising meeting notes and finding missed actions", "url": "https://www.reddit.com/r/ClaudeAI/comments/1w0wcvi/how_i_actually_use_claude_daily_and_none_of_it_is/" },
    {
      "label": "Anthropic: create and manage projects",
      "url": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
    },
    { "label": "Anthropic: redesigned Claude Code Projects beta rollout", "url": "https://claude.com/blog/projects-redesigned" },
    { "label": "Audience research: repeated role and output explanations; one commenter’s experience", "url": "https://www.reddit.com/r/ClaudeAI/comments/1vw0m4p/claude_in_your_daily_work_if_your_are_not_a/" }
  ],
  "series": {
    "part": 2,
    "instructions": "Turn my meeting notes into a short follow-up I can review.\nUse these 3 headings: Decisions, Who does what, Questions to resolve.\nUnder Who does what, show a table with Task, Person and Due date.\nUse only the notes in my current message. Write “Not agreed” where a person or date is missing.\nKeep suggestions separate from agreed decisions. Don’t carry facts over from other meetings.\nUse plain English. Don’t send messages or create tasks in another app.",
    "exercise": "Please organise these meeting notes.\nWe agreed to test a shorter weekly team meeting for 2 weeks. Alex will send the new agenda by Friday. Someone needs to collect feedback, but we didn’t choose who or set a deadline. Recording the meetings was suggested, not agreed."
  },
  "conclusion": {
    "heading": "Ready for the next task",
    "paragraphs": [
      "Keep the saved instructions if the second reply used the headings and action table you wanted without you typing them again. If it didn’t, adjust them and test again."
    ],
    "finishLine": ""
  },
  "related": [
    {
      "slug": "what-should-you-never-share-with-ai",
      "title": "What should you never share with AI?",
      "reason": "Check what belongs in a Project before adding work material.",
      "cover": "/images/guides/learn-master.webp"
    },
    {
      "slug": "connect-ai-to-email-files-calendar",
      "title": "Should you let AI connect to your email, files and calendar?",
      "reason": "Understand the permissions before connecting a work account.",
      "cover": "/images/guides/connect-ai-to-email-files-calendar.webp"
    }
  ]
} as const satisfies GuidePage;
