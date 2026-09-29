// Batch 1 guide copy, approved from docs/copy/guides/batch-01-2026-09-28.md.
// Inline marks: **bold**, *italic*, [label](https://link).

import type { BatchIconName } from "@/components/guides/batch-icons";

export type BatchBlock =
  | { kind: "p"; text: string }
  | { kind: "fields"; items: readonly { label: string; text: string }[] }
  | { kind: "example"; label: string; text: string }
  | { kind: "result"; label: string; lines: readonly string[] }
  | { kind: "list"; ordered?: boolean; items: readonly string[] }
  | { kind: "contrast"; items: readonly { label: string; text: string; note?: string; good?: boolean }[] }
  | { kind: "locked"; label: string; prompt?: number };

export type BatchPrompt = { title: string; text: string };

export type BatchGuide = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  question: string;
  answer: string;
  level: string;
  minutes: number;
  tool: string;
  leaveWith: string;
  howTo: string;
  // Hero: short title with an italic accent ending, one line, and either a
  // standing mascot pose or a full mascot scene card.
  hero: { title: string; accent: string; line: string; tool: string; art: { kind: "pose" | "scene"; src: string; alt: string } };
  flow?: readonly { icon: BatchIconName; label: string; note: string }[];
  illustration?: { src: string; alt: string; caption: string; afterSection: number };
  sections: readonly { title: string; accent?: string; icon: BatchIconName; blocks: readonly BatchBlock[] }[];
  honest: string;
  gate: { promise: string; action: string };
  prompts: readonly BatchPrompt[];
  checks?: { title: string; items: readonly string[]; ordered?: boolean };
  paths?: { title: string; intro?: string; items: readonly { tool: string; text: string; href: string }[]; note?: string };
  pass?: string;
  kit: { name: string; heading: string; body: string };
};

const claude: BatchGuide = {
  slug: "claude",
  seoTitle: "How to use Claude at work: 3 jobs to hand off today",
  seoDescription: "How to use Claude at work: three admin jobs to hand off today (meeting notes, long documents and rough emails), with the prompt for each and a 30-second check.",
  title: "3 Admin Jobs to Hand Claude This Week",
  question: "I'm drowning in admin. What can Claude actually take off my plate?",
  answer: "Three jobs you can hand to Claude today: messy meeting notes, a question about a long document, and a rough email. Here's the prompt for each, and the one check that keeps you safe.",
  level: "Beginner",
  minutes: 10,
  tool: "Free Claude account",
  leaveWith: "3 prompts you can reuse every week, a worked example for each, and a 30-second check before you use the answer.",
  howTo: "Pick the job that annoys you most this week. Try it with the example first, so you can see what a good answer looks like. Then swap in your own material. Leave out anything confidential (see [The 3-Question Check Before You Paste Anything Into AI](/guides/what-should-you-never-share-with-ai/)).",
  hero: { title: "3 admin jobs to hand Claude", accent: "this week.", line: "Meeting notes, a long document and a rough email. One prompt for each.", tool: "Claude", art: { kind: "pose", src: "/images/mascot/planning.webp", alt: "The blue robot mascot holding a calendar and a checklist" } },
  flow: [
    { icon: "notes", label: "Your rough material", note: "Notes, a report or bullet points" },
    { icon: "sparkle", label: "Claude drafts", note: "Using only what you gave it" },
    { icon: "check", label: "You check", note: "30 seconds before you use it" },
  ],
  illustration: { src: "/images/guides/claude-first-task.webp", alt: "The blue robot mascot turning scattered notes into one finished, approved document", caption: "The draft is Claude's. The final say is yours.", afterSection: 2 },
  sections: [
    {
      title: "Job 1: Messy notes into clear actions",
      icon: "notes",
      blocks: [
        { kind: "fields", items: [
          { label: "The job", text: "you have notes from a meeting and nobody knows who's doing what." },
          { label: "Why Claude", text: "it's good at keeping the nuance. When something was *suggested*, it tends to keep it as a suggestion rather than turning it into a decision." },
        ] },
        { kind: "example", label: "Try it with this example", text: "The team agreed to run a pilot. The programme lead will draft the invitation by 8 October. Operations will check room availability, but no deadline was set. Budget approval is pending. A launch on 22 October was suggested, not confirmed." },
        { kind: "result", label: "What a good answer looks like", lines: [
          "**Decision:** run a pilot.",
          "**Actions:** programme lead drafts the invitation by 8 October · operations checks the room (deadline not agreed).",
          "**Still open:** budget approval · the launch date.",
        ] },
        { kind: "locked", label: "The prompt", prompt: 0 },
      ],
    },
    {
      title: "Job 2: Find the answer in a long document",
      icon: "doc",
      blocks: [
        { kind: "fields", items: [
          { label: "The job", text: "a 30-page report and one question you need answered." },
          { label: "Why Claude", text: "it reads long documents well and can quote the exact line it used, so you can check it." },
          { label: "Set up", text: "open [Claude](https://claude.ai/), start a new chat and attach the document with the paperclip icon." },
        ] },
        { kind: "locked", label: "The prompt that makes Claude quote its source", prompt: 1 },
      ],
    },
    {
      title: "Job 3: Rough points into a short email",
      icon: "mail",
      blocks: [
        { kind: "fields", items: [
          { label: "The job", text: "you know what you want to say but not how to say it." },
          { label: "Why Claude", text: "it adapts tone well when you show it how you write." },
        ] },
        { kind: "locked", label: "The prompt, plus how to fix one wrong line", prompt: 2 },
      ],
    },
  ],
  honest: "Claude can still get a detail wrong, and it can sound sure while doing it. Before you use any answer, put it side by side with your notes or the document and check the names, dates and anything that sounds decided. If one line is wrong, fix that line (the correction prompt is below) rather than starting again.",
  gate: { promise: "The 3 prompts, the fix-one-line prompt and the 30-second check.", action: "Show me the prompts" },
  prompts: [
    { title: "Prompt 1: Notes into actions", text: "Turn these notes into decisions, an action table and open questions. Use only the notes. For each action, show the owner and deadline. Write \"Not agreed\" where a detail is missing. Keep suggestions separate from decisions.\n\nNotes: [paste your notes]" },
    { title: "Prompt 2: Answer from a document", text: "Answer my question using only the attached document. Quote the exact sentence you used and give the page or section. If the document doesn't answer it, say so instead of guessing.\n\nMy question: [your question]" },
    { title: "Prompt 3: Rough points into an email", text: "Turn these points into a short email to [who]. Keep it under 120 words, friendly and direct. Don't add promises, dates or details that aren't in my points.\n\nMy points: [paste]" },
    { title: "Correction prompt (when one line is wrong)", text: "Correct this line: \"[the wrong line]\". Use this information instead: [the right fact]. Keep everything else unchanged. If anything is still unclear, say so instead of guessing." },
  ],
  checks: { title: "The 30-second check", ordered: true, items: [
    "Every name, date and number is in your original material.",
    "Nothing \"suggested\" has become \"decided\".",
    "No promise you didn't make.",
  ] },
  kit: { name: "AI workflows that save time", heading: "Want 10 of these, ready for your week?", body: "The *AI workflows that save time* kit has 10 workflows with prompts, examples and checks, plus a picker that shows which of your tasks to hand off first." },
};

const shorter: BatchGuide = {
  slug: "make-chatgpt-answers-shorter",
  seoTitle: "How to make ChatGPT answers shorter (and still accurate)",
  seoDescription: "How to make ChatGPT answers shorter: tell it the parts you need and a word limit, then check it didn't cut the truth. A reusable prompt and a 4-point check.",
  title: "Stop ChatGPT Writing You an Essay",
  question: "ChatGPT's answers are way too long.",
  answer: "\"Make it shorter\" doesn't work because ChatGPT doesn't know what *short* means for you. Tell it the parts you need and a word limit, then check it didn't cut the truth.",
  level: "Beginner",
  minutes: 5,
  tool: "Any ChatGPT account",
  leaveWith: "a short-answer prompt you can reuse, plus a 4-point check.",
  howTo: "Read the example, try the prompt as it is, then swap in facts from your own work.",
  hero: { title: "Stop ChatGPT writing you", accent: "an essay.", line: "Tell it the parts you need and a word limit. Then check it's still true.", tool: "ChatGPT", art: { kind: "pose", src: "/images/mascot/explaining.webp", alt: "The blue robot mascot explaining a chart with a pointer" } },
  flow: [
    { icon: "list", label: "Name the parts", note: "Status, Waiting on, Next action" },
    { icon: "compress", label: "Set the limit", note: "60 words or fewer" },
    { icon: "check", label: "Check the facts", note: "Nothing rounded up" },
  ],
  illustration: { src: "/images/guides/make-chatgpt-answers-shorter.webp", alt: "The blue robot mascot pressing a long paper scroll into short cards", caption: "Shorter is only useful if it stays true.", afterSection: 0 },
  sections: [
    {
      title: "Say what \"short\" means",
      accent: "Name the parts. Set a limit.",
      icon: "target",
      blocks: [
        { kind: "contrast", items: [
          { label: "Instead of", text: "\"Make this shorter.\"" },
          { label: "Try", text: "\"Write a meeting update in 3 bullets, under 60 words.\"", good: true },
        ] },
        { kind: "p", text: "Name the parts (for example Status, Waiting on, Next action) and the limit. That's usually all it takes." },
      ],
    },
    {
      title: "Short is only useful if it's still true",
      accent: "Check what it cut.",
      icon: "check",
      blocks: [
        { kind: "example", label: "Your facts", text: "The onboarding checklist draft is ready. Team leads haven't reviewed it. No publication date has been agreed." },
        { kind: "contrast", items: [
          { label: "Too confident", text: "\"The checklist is ready to publish soon.\"", note: "It added an approval and a timeline you don't have." },
          { label: "Short and accurate", text: "\"The draft is ready. Team lead review and a publication date are still open.\"", good: true },
        ] },
        { kind: "locked", label: "The full prompt", prompt: 0 },
      ],
    },
  ],
  honest: "When AI shortens, it tends to round things up: \"under review\" becomes \"approved\". The shorter the answer, the more carefully you check each word.",
  gate: { promise: "The short-answer prompt and the 4-point check.", action: "Show me the prompt" },
  prompts: [
    { title: "The short-answer prompt", text: "Write a short update using only these facts:\n[paste your facts]\n\nGive me exactly 3 bullets headed Status, Waiting on and Next action. Keep it to 60 words or fewer. No introduction or closing offer. Don't say anything is approved or decided unless my facts say so. If the next action isn't clear, say what still needs to be agreed." },
  ],
  checks: { title: "The 4-point check", ordered: true, items: [
    "Can you find all 3 parts?",
    "Is it 60 words or fewer?",
    "Does every statement match your facts?",
    "Did you delete any intro, repetition or invented detail?",
  ] },
  kit: { name: "AI workflows that save time", heading: "Use the same method on your 10 most common admin jobs", body: "The *AI workflows that save time* kit has 10 workflows with prompts, examples and checks, ready for your week." },
};

const forgetting: BatchGuide = {
  slug: "stop-chatgpt-forgetting-context",
  seoTitle: "Why ChatGPT forgets what you told it, and how to fix it with Projects",
  seoDescription: "Why does ChatGPT forget what I told it? A new chat starts from zero. Put your brief in a ChatGPT Project once and test that the next chat keeps it.",
  title: "Never Explain Your Project to ChatGPT Twice",
  question: "ChatGPT forgets what I told it.",
  answer: "A new chat starts from zero. If you keep repeating the same brief, put it in a ChatGPT Project once, and every chat inside that Project can use it.",
  level: "Beginner",
  minutes: 15,
  tool: "ChatGPT with Projects",
  leaveWith: "a working Project, the brief to paste into it, and a 2-chat test that proves it remembers.",
  howTo: "Use the example event first, so you can see whether the second chat keeps the brief without being reminded. Then build a Project for your real work.",
  hero: { title: "Never explain your project to ChatGPT", accent: "twice.", line: "Write your brief once in a ChatGPT Project. Every chat can use it.", tool: "ChatGPT", art: { kind: "pose", src: "/images/mascot/lightbulb.webp", alt: "The blue robot mascot celebrating under a lightbulb" } },
  flow: [
    { icon: "notes", label: "Write the brief once", note: "The facts that never change" },
    { icon: "folder", label: "Save it in a Project", note: "Project settings, instructions" },
    { icon: "chat", label: "Every chat uses it", note: "Test it with 2 chats" },
  ],
  illustration: { src: "/images/guides/claude-projects.webp", alt: "The blue robot mascot filing one checked card into a wooden cabinet", caption: "File the brief once. Stop pasting it into every chat.", afterSection: 0 },
  sections: [
    {
      title: "One question, or ongoing work?",
      accent: "Pick the right place.",
      icon: "question",
      blocks: [
        { kind: "list", items: [
          "**One question:** a normal chat is fine.",
          "**Several chats on the same work** (a client, an event, a project): use a Project. It keeps related chats, files and instructions together.",
        ] },
      ],
    },
    {
      title: "The example: an event brief that stays the same",
      icon: "folder",
      blocks: [
        { kind: "p", text: "You're planning a 60-minute online session for first-time managers. You need an event description today and an invitation next week. Both must use the same facts." },
        { kind: "list", ordered: true, items: [
          "Open [ChatGPT](https://chatgpt.com/), click **New project** in the sidebar and call it *Autumn event plan*.",
          "Open the Project's menu, choose **Project settings** and paste the brief into the instructions field.",
        ] },
        { kind: "locked", label: "The brief and the two test messages", prompt: 0 },
      ],
    },
  ],
  honest: "A Project keeps instructions, but it doesn't guarantee every answer follows them. That's why the guide ends with a test: if the second chat misses a fact, check that both chats are inside the same Project and that the instructions were saved.",
  gate: { promise: "The Project brief and the 2 test messages.", action: "Show me the setup" },
  prompts: [
    { title: "The Project brief (paste into Project settings)", text: "Project facts\n- The event is a 60-minute online session for first-time managers.\n- The goal is to help them run a clearer weekly team meeting.\n- The tone is practical and calm.\n- Do not promise a recording.\n\nFor every draft, separate confirmed facts from suggestions. If information is missing, write \"Not decided\"." },
    { title: "Test chat 1", text: "Write an event description in 80 words or fewer. Say who it's for, the format and what people will learn. Use only the Project facts. If a detail is missing, write \"Not decided\"." },
    { title: "Test chat 2 (a new chat in the same Project)", text: "Write a short invitation for the same event. Include who it's for, the format and what people will learn. Don't promise a recording or set a date." },
  ],
  pass: "**Pass if:** the second chat keeps the audience, format and goal, and doesn't invent a date or a recording.",
  kit: { name: "Make AI remember you", heading: "Want AI to know you, not just one project?", body: "The *Make AI remember you* kit has an \"about me\" file, 5 ready-made Projects for ChatGPT and Claude, and a write-like-me setup." },
};

const privacy: BatchGuide = {
  slug: "what-should-you-never-share-with-ai",
  seoTitle: "Is it safe to use ChatGPT at work? What never to paste in",
  seoDescription: "Is it safe to use ChatGPT at work? Run the 3-question paste test, sort what stays out, what needs permission and what is fine, and find the privacy settings.",
  title: "The 3-Question Check Before You Paste Anything Into AI",
  question: "My boss wants us to use AI. What can I safely paste in?",
  answer: "Some things should never go in, some need permission first, and some are fine. Run the 3-question paste test before you share anything.",
  level: "Beginner",
  minutes: 5,
  tool: "Any AI tool",
  leaveWith: "the paste test, a keep-out / ask-first / fine list, and a prompt that checks a task without you sharing the real data.",
  howTo: "Read the 3 questions, sort what you were about to paste, then use the test prompt with categories only, never the real information.",
  hero: { title: "The 3-question check before you paste", accent: "anything into AI.", line: "Three questions to ask before you share anything with AI at work.", tool: "Any AI tool", art: { kind: "pose", src: "/images/mascot/warning.webp", alt: "The blue robot mascot thinking beside a warning sign" } },
  flow: [
    { icon: "question", label: "Do I need it?", note: "Could it work without real details?" },
    { icon: "key", label: "Am I allowed?", note: "Permission comes first" },
    { icon: "shield", label: "Right tool?", note: "An account approved for work" },
  ],
  illustration: { src: "/images/guides/what-can-copilot-see-at-work.webp", alt: "The blue robot mascot looking through a telescope at three locked boxes", caption: "Before you paste, know what's in the box and who it belongs to.", afterSection: 0 },
  sections: [
    {
      title: "The paste test",
      accent: "Before anything goes in.",
      icon: "question",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**Do I need it?** Could the task work without the real details?",
          "**Am I allowed?** Do I have permission to share this?",
          "**Is this the right tool?** Is this account approved for work?",
        ] },
        { kind: "p", text: "If any answer is \"no\" or \"not sure\", replace the real details with an invented example." },
      ],
    },
    {
      title: "Keep out · Ask first · Fine",
      accent: "Sort it first.",
      icon: "lock",
      blocks: [
        { kind: "contrast", items: [
          { label: "Keep out", text: "Passwords, bank details, health information, anything under a confidentiality agreement." },
          { label: "Ask first", text: "Customer emails, colleagues' names, internal documents, contracts." },
          { label: "Usually fine", text: "Public website text, your own rough notes without names, invented examples.", good: true },
        ] },
        { kind: "locked", label: "The safe test prompt and where the privacy settings are", prompt: 0 },
      ],
    },
  ],
  honest: "Turning off \"training\" in a tool's settings gives you more control, but it doesn't give you permission to share confidential work. Permission comes from your company, not from a setting.",
  gate: { promise: "The test prompt and the privacy settings for 4 tools.", action: "Show me the prompt" },
  prompts: [
    { title: "The safe test prompt (describe categories, not real data)", text: "I want to use AI for this task: [describe the task without names, files or private details].\n\nIt may involve these types of information: [categories only, for example customer emails, employee names, public web copy].\n\nDon't ask me to paste the real information. For each category tell me:\n1. Keep it out, ask permission, or fine to use?\n2. Why?\n3. What safer example could I use instead?\n4. Which account or privacy setting should I check?\nIf you can't know whether I have permission, tell me who to ask." },
  ],
  paths: {
    title: "Where the privacy settings are",
    intro: "Menu names change. If yours looks different, open the official page.",
    items: [
      { tool: "ChatGPT", text: "**Profile → Settings → Data Controls**, then switch off **Improve the model for everyone**. Temporary Chat is another option for a one-off conversation.", href: "https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq" },
      { tool: "Claude", text: "**Your name → Settings → Privacy**, then switch off **Help improve our AI models** (personal Free, Pro and Max accounts).", href: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" },
      { tool: "Gemini", text: "**Settings & help → Activity**, then under **Keep Activity** choose **Turn off**. Work or school accounts may be managed by an administrator.", href: "https://support.google.com/gemini/answer/13278892" },
      { tool: "Copilot", text: "Personal account: **Profile → your name → Privacy**, then switch off the training options. Microsoft 365 Copilot at work follows your organisation's settings.", href: "https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls" },
    ],
  },
  kit: { name: "Use AI safely at work", heading: "Rolling AI out to a team?", body: "The *Use AI safely at work* kit includes editable team guidelines, privacy setting cards, an anonymise-before-you-paste prompt and an approved-tools register." },
};

const connections: BatchGuide = {
  slug: "connect-ai-to-email-files-calendar",
  seoTitle: "Is it safe to connect AI to your email, files and calendar?",
  seoDescription: "Is it safe to connect ChatGPT to Gmail? Choose the smallest access, read the permission screen in plain words and know where to switch it off in each tool.",
  title: "Read This Before You Connect AI to Your Email",
  question: "Is it safe to connect ChatGPT to my Gmail?",
  answer: "Only give AI the access the job needs. Often one uploaded file is enough, and you don't need to connect anything.",
  level: "Beginner",
  minutes: 10,
  tool: "ChatGPT, Claude, Gemini or Copilot",
  leaveWith: "a simple way to choose the smallest access, a prompt that explains any permission screen in plain words, and where to switch access off.",
  howTo: "Decide what the job needs, check the permission screen before you approve, and know where to disconnect.",
  hero: { title: "Read this before you connect AI to", accent: "your email.", line: "Give AI only the access the job needs. Often one file is enough.", tool: "ChatGPT, Claude, Gemini, Copilot", art: { kind: "pose", src: "/images/mascot/email-sorting.webp", alt: "The blue robot mascot sorting envelopes into a box" } },
  flow: [
    { icon: "upload", label: "Upload one file", note: "Smallest access" },
    { icon: "plug", label: "Connect one service", note: "Only when you search many items" },
    { icon: "bolt", label: "Allow actions", note: "Last, and only if needed" },
  ],
  illustration: { src: "/images/guides/ai-words-connections.webp", alt: "The blue robot mascot inspecting cables that connect books, chat and a toolbox", caption: "Every cable is access. Plug in only what the job needs.", afterSection: 0 },
  sections: [
    {
      title: "Choose the smallest access",
      accent: "Start small.",
      icon: "upload",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**Upload one file:** best for one document and one task. No connection needed.",
          "**Connect one service** (for example Gmail or Drive): when the AI needs to search across many items.",
          "**Allow actions** (send, edit, delete): only when you really need it, and never as your first step.",
        ] },
      ],
    },
    {
      title: "Read the permission screen before you click",
      accent: "Every word is a permission.",
      icon: "eye",
      blocks: [
        { kind: "p", text: "Look for these words: *read, create, edit, delete, send, share*. Each one is a different level of access." },
        { kind: "p", text: "In ChatGPT, for example, **\"Allow read actions\"** means it can read from the connected app without asking each time, but it still asks before making changes." },
        { kind: "locked", label: "The prompt that explains any permission screen", prompt: 0 },
      ],
    },
    {
      title: "Where to switch it off",
      accent: "Know the way out.",
      icon: "power",
      blocks: [
        { kind: "p", text: "ChatGPT: **Settings → Apps** (or **Plugins**, if shown), then choose the account to disconnect. The paths for Claude, Gemini and Copilot are in the full guide." },
        { kind: "p", text: "Turning a connector off for one chat may leave the account connected. Check the account connection too." },
      ],
    },
  ],
  honest: "Always check the AI's explanation against the real permission screen. The screen decides what the tool can do, not the AI's summary of it.",
  gate: { promise: "The permission prompt, 3 checks and the switch-off path for 4 tools.", action: "Show me the prompt" },
  prompts: [
    { title: "The permission-explainer prompt", text: "Explain these permissions in everyday language. For each one, tell me if the tool can read, create, edit, delete, send or share. Then tell me:\n1. What information this could expose.\n2. Which permission is the riskiest.\n3. Whether I could do my task with less access.\n4. What I should check before approving.\nDon't assume a permission that isn't in the text.\n\nPermission text: [paste the wording from the screen, without account details]" },
  ],
  checks: { title: "Before you approve, can you say yes to all 3?", items: [
    "I know what it can read.",
    "I know whether it can create, edit, send, share or delete.",
    "I know where to turn it off.",
  ] },
  paths: {
    title: "Where to switch it off",
    intro: "Menu names can vary by plan, device or workplace settings.",
    items: [
      { tool: "ChatGPT", text: "**Settings → Apps** (or **Plugins**, if shown). Choose the connected account to review or disconnect it.", href: "https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" },
      { tool: "Claude", text: "**Customize → Connectors**. Choose the service and select disconnect.", href: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
      { tool: "Gemini", text: "**Settings & help → Connected Apps** (or **Personal Intelligence → Connected Apps**). Turn off the app you don't want Gemini to use.", href: "https://support.google.com/gemini/answer/13695044?co=GENIE.Platform%3DDesktop" },
      { tool: "Copilot", text: "On Copilot.com, **+ → Use connectors**. On mobile, **Profile → Connectors**. At work, Microsoft 365 data follows your organisation's permissions.", href: "https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services" },
    ],
    note: "Disconnecting stops future access. It doesn't always remove what's already in a chat or activity history, so review that separately.",
  },
  kit: { name: "Use AI safely at work", heading: "Connecting AI across a team?", body: "The *Use AI safely at work* kit has connection checklists for email, files and calendar, plus team guidelines." },
};

import { batchTwoGuides } from "./guide-batch-two";
import { batchElevenFifteenGuides } from "./guide-batch-11-15";
import { batchSixteenTwentyGuides } from "./guide-batch-16-20";
import { batchTwentyOneTwentyFiveGuides } from "./guide-batch-21-25";
import { batchTwentySixThirtyFiveGuides } from "./guide-batch-26-35";
import { convertedGuides } from "./guide-batch-converted";

export const batchOneGuides: Record<string, BatchGuide> = Object.fromEntries(
  [claude, shorter, forgetting, privacy, connections, ...batchTwoGuides, ...batchElevenFifteenGuides, ...batchSixteenTwentyGuides, ...batchTwentyOneTwentyFiveGuides, ...batchTwentySixThirtyFiveGuides, ...convertedGuides].map((guide) => [guide.slug, guide]),
);
