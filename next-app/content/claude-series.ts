import type { GuidePage } from "./guide-page";

export const claudeGuide = {
  "sections": [],
  "workshopInvitation": {
    "title": "Workshops for companies",
    "body": "Workshops are available for companies that want to help their teams use AI at work."
  },
  "slug": "claude",
  "title": "Get one useful thing done with Claude",
  "promise": "Not sure how Claude would help in your working day? Choose something already on your to-do list: sorting meeting notes, finding an answer in a document or drafting an email.",
  "cover": "/images/guides/claude-first-task.webp",
  "coverAlt": "A small blue robot princess turning scattered notes into one finished document on an engraved wooden desk",
  "seoDescription": "Try one everyday task with Claude: meeting notes, a document question or an email draft. Complete examples, copyable instructions and simple checks.",
  "lumailTag": "guide-claude",
  "sourceNotes": [
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
        "example": "Your team agreed to run a pilot, but left some details open.",
        "prompt": "Turn these notes into decisions, an action table and open questions. Use only the notes. For each action, show the owner and deadline. Write \"Not agreed\" for missing details. Keep suggestions separate from decisions. Draft only; don't take actions in another app.\n\nNotes: We agreed to run a pilot. Programme lead will draft the invitation by 8 October. Operations lead will check room availability; no deadline agreed. Budget approval is pending. A launch on 22 October was suggested, not confirmed.",
        "result": "Look for the invitation assigned to the programme lead for 8 October; the room-check deadline marked “Not agreed”; the launch date still unconfirmed."
      },
      {
        "id": "document",
        "title": "Answer a document question",
        "outcome": "Find the answer and the words supporting it.",
        "example": "You need to know whether a training recording is included.",
        "prompt": "Answer my question using only the source. Quote the words supporting your answer and flag anything unresolved. Keep it under 100 words. If the source doesn't answer, say so.\n\nQuestion: Is a recording included?\nSource: The training includes 2 live sessions. A recording may be offered later, subject to speaker approval. Pricing has not been agreed.",
        "result": "A recording isn’t confirmed. The source says “may be offered later, subject to speaker approval.”"
      },
      {
        "id": "email",
        "title": "Draft my email",
        "outcome": "Turn rough points into a short message.",
        "example": "You need a supplier’s delivery date before you can plan an event.",
        "prompt": "Write a warm, direct email under 80 words, with a subject line. Use these points only. Don't invent names or commitments. Draft only; don't send.\n\nPoints: Ask the supplier to confirm when the display stands will arrive. Our event is on 12 October. We need delivery by 10 October. Ask them to flag any risk of delay.",
        "result": "Could you confirm when the display stands will arrive? We need them by 10 October for our event on 12 October. Please let us know if there’s any risk of delay."
      }
    ],
    "correction": "Correct this line: [paste it].\nUse this information: [paste the correction].\nKeep the rest unchanged. Show any remaining gap instead of guessing."
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
      "slug": "claude-projects",
      "title": "Stop repeating your instructions to Claude",
      "reason": "Save the context for recurring work.",
      "cover": "/images/guides/claude-projects.webp"
    },
    {
      "slug": "what-is-a-prompt",
      "title": "What is a prompt?",
      "reason": "Adapt an instruction to a different task.",
      "cover": "/images/guides/what-is-a-prompt.webp"
    },
    {
      "slug": "which-ai-tool-for-what",
      "title": "Which AI tool for what?",
      "reason": "Compare tools for the job you need to finish.",
      "cover": "/images/guides/which-ai-tool-for-what.webp"
    }
  ]
} as const satisfies GuidePage;

export const claudeProjectsGuide = {
  "sections": [],
  "workshopInvitation": {
    "title": "Workshops for companies",
    "body": "Workshops are available for companies that want to help their teams use AI at work."
  },
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
      "slug": "claude",
      "title": "Get one useful thing done with Claude",
      "reason": "Try a different everyday task.",
      "cover": "/images/guides/claude-first-task.webp"
    },
    {
      "slug": "what-is-a-prompt",
      "title": "What is a prompt?",
      "reason": "Make your instructions more specific.",
      "cover": "/images/guides/what-is-a-prompt.webp"
    },
    {
      "slug": "teach-claude-a-repeatable-workflow",
      "title": "Teach Claude a repeatable workflow",
      "reason": "Test whether saved instructions work on a second task.",
      "cover": "/images/guides/teach-claude-a-repeatable-workflow.webp"
    }
  ]
} as const satisfies GuidePage;
