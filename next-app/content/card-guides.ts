import type { GuidePage, WalkthroughBlock } from "./guide-page";
import { rebuiltGuides } from "./rebuilt-guides";

/*
 * Card-format guides: numbered step cards, copyable prompts and a sign-up card
 * after the first steps. One object per guide, rendered by
 * components/guides/card-guide-page.tsx. Text fields accept **bold**,
 * *italic* and [label](https://link).
 */
export type CardBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; ordered?: boolean; items: readonly string[] }
  | { kind: "tip"; text: string }
  | { kind: "honest"; text: string }
  | { kind: "prompt"; label: string; text: string }
  | { kind: "table"; head: readonly string[]; rows: readonly (readonly string[])[] }
  | { kind: "requests"; items: readonly { want: string; prompt: string }[] }
  | { kind: "checklist"; items: readonly string[] }
  // Blocks used by guides converted from the earlier layout (batch-to-card.ts).
  | { kind: "fields"; items: readonly { label: string; text: string }[] }
  | { kind: "papers"; left: { label: string; text: string }; right: { label: string; lines: readonly string[] } }
  | { kind: "example"; label: string; text: string }
  | { kind: "result"; label: string; lines: readonly string[] }
  | { kind: "contrast"; items: readonly { label: string; text: string; note?: string; good?: boolean }[] }
  | { kind: "shot"; src: string; alt: string; caption: string; width: number; height: number }
  | { kind: "image"; src: string; alt: string; caption: string }
  | { kind: "teaser"; label: string; preview: string }
  | { kind: "checks"; title: string; items: readonly string[]; ordered?: boolean }
  | { kind: "paths"; title: string; intro?: string; items: readonly { tool: string; text: string; href: string }[]; note?: string }
  | { kind: "pass"; text: string };

export type CardStep = {
  /** Tile text, e.g. "01" or "✓". */
  num: string;
  title: string;
  /** Pink italic subtitle, e.g. "The container." */
  accent: string;
  blocks: readonly CardBlock[];
};

export type CardGuide = {
  slug: string;
  lumailTag: string;
  title: string;
  cover: string;
  coverAlt: string;
  seoDescription: string;
  tool: string;
  minutes: number;
  h1: { title: string; accent: string };
  /**
   * Optional hero banner, same as the other guides: "pose" is a transparent
   * mascot from /images/mascot/, "scene" a 16:9 illustration with the pink offset.
   */
  hero?: { kind: "pose" | "scene"; src: string; alt: string; line: string };
  intro: { heading: string; lead: string; blocks: readonly CardBlock[] };
  /** How many steps stay open before the sign-up card. */
  openSteps: number;
  gate: { heading: string; accent: string; promise: string; action: string };
  steps: readonly CardStep[];
  cta: { eyebrow: string; heading: string; accent: string; body: string; label: string; href: string };
  /** Optional "Next step" card shown after the unlocked steps. */
  kit?: { heading: string; body: string };
  conclusion: { heading: string; paragraph: string; finishLine: string };
};

export const cardGuides: readonly CardGuide[] = [
  {
    // Rebuilt 13/10/2026 on the Brand Brain model at the owner's request.
    // Rewritten 13/10/2026 to the lean guide model (LEAN-TEMPLATE-2026-10-13.md).
    slug: "start-using-ai-in-your-business",
    lumailTag: "guide-start-using-ai",
    title: "How to Start Using AI in Your Business When You Don't Know Where to Begin",
    cover: "/images/guides/start-using-ai-in-your-business.webp",
    coverAlt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
    seoDescription: "Don't know where to start with AI? Set ChatGPT up for your business in 6 steps: a Business Profile, a task list and your first AI assistant.",
    tool: "ChatGPT",
    minutes: 45,
    h1: { title: "How to Start Using AI", accent: "in Your Business" },
    hero: {
      kind: "scene",
      src: "/images/guides/start-using-ai-in-your-business.webp",
      alt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
      line: "Set ChatGPT up once. Then let it do one job for you.",
    },
    intro: {
      heading: "ChatGPT that knows your business",
      lead: "ChatGPT gives vague answers when it knows nothing about you. This guide teaches it your business and builds your first AI assistant.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "**ChatGPT set up safely**, with 3 rules for what goes in",
          "**A Business Profile** ChatGPT reads before every answer",
          "**A task list**: 5 jobs worth handing over",
          "**Your first AI assistant** for job number 1",
          "**One real piece of work**, done and checked",
        ] },
        { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
      ],
    },
    openSteps: 1,
    gate: {
      heading: "Get the",
      accent: "AI Starter Kit.",
      promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
      action: "Open the rest of the guide",
    },
    steps: [
      { num: "01", title: "Set up ChatGPT safely", accent: "Before anything goes in.", blocks: [
        { kind: "p", text: "Do this once. It keeps your clients safe in every chat." },
        { kind: "list", ordered: true, items: [
          "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
          "Click your name or picture, then **Settings**.",
          "Open **Data Controls**.",
          "Switch off **Improve the model for everyone**. Your chats no longer train ChatGPT.",
        ] },
        { kind: "p", text: "Then keep these 3 rules every time you paste something in." },
        { kind: "table", head: ["Never paste", "Ask first", "Fine to paste"], rows: [
          ["Passwords, card and bank details", "A client's emails or files", "Your own notes, names removed"],
          ["Health or personal details about anyone", "Contracts with names in them", "Your website text"],
          ["Anything secret by contract", "Details about your team", "Made-up examples"],
        ] },
        { kind: "tip", text: "Can't find it? OpenAI moves this menu. Search \"data controls\" on [OpenAI's help pages](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq)." },
      ] },
      { num: "02", title: "Write your Business Profile", accent: "What ChatGPT needs to know.", blocks: [
        { kind: "p", text: "Your Business Profile tells ChatGPT who you are and who you help. Without it, every answer is vague." },
        { kind: "prompt", label: "Interview me for my Business Profile", text: `Interview me to write my Business Profile.

Ask me these one at a time and wait for each answer:
1. What does my business do, in one sentence?
2. Who are my clients, and what do they usually need help with?
3. What do I sell, and what does a typical project or package include?
4. How do I like to communicate: tone, words I use, words I never use?
5. What do I spend most of my week on?

Then write my Business Profile in two short parts:
Part 1: What you should know about me and my business (under 1,000 characters)
Part 2: How you should respond to me (under 1,000 characters)

Use only what I tell you. Plain English, no em dashes.` },
        { kind: "list", ordered: true, items: [
          "Read it and fix anything wrong.",
          "Click your name or picture, then **Settings**, then **Personalization**.",
          "Open **Custom instructions**.",
          "Paste Part 1 in the box about you. Paste Part 2 in the box about how ChatGPT should respond. Click **Save**.",
          "Start a new chat and ask: \"What do you know about my business?\"",
        ] },
        { kind: "tip", text: "Can't find it? Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com). Or paste your profile as the first message of each chat." },
      ] },
      { num: "03", title: "List your jobs", accent: "Find what to hand over.", blocks: [
        { kind: "p", text: "Don't guess what to use AI for. Let ChatGPT ask about your week first." },
        { kind: "prompt", label: "Build my AI task list", text: `Using my Business Profile, interview me about my working week.

Ask me one question at a time, up to 8 questions, about:
- the tasks I repeat every week
- how long each one takes
- which ones I put off or dread

Then give me a table with these columns:
Task | Hours per week | What AI could draft or prepare | What I must still do myself | Risk if AI gets it wrong (low, medium, high)

Rank the table: most hours saved and lowest risk first.
Under the table, name the one task I should hand over first, and why, in two sentences.` },
        { kind: "table", head: ["Good first jobs", "Leave for later"], rows: [
          ["Follow-up emails after calls", "Anything you sign"],
          ["First drafts of proposals", "Legal, money or health advice"],
          ["Answers to common questions", "Messages sent without you reading them"],
          ["Short notes on long files", "Decisions about people"],
        ] },
        { kind: "p", text: "Save the list in your notes. Hand over one new job each week." },
      ] },
      { num: "04", title: "Build your AI assistant", accent: "Job number 1, set up once.", blocks: [
        { kind: "p", text: "An AI assistant is saved instructions for one job. You write them once and reuse them." },
        { kind: "prompt", label: "Write my AI assistant instructions", text: `Write instructions for an AI assistant that does this task for me: [task number 1 from my task list].

Use my Business Profile. The instructions must say:
1. What I will paste in each time (for example: call notes, a client email, a document)
2. The steps to follow, in order
3. Exactly what to give back: format, length, tone
4. Rules: use only what I paste; write [CHECK] where information is missing instead of guessing; never make up names, prices, dates or promises

Keep it under 1,500 characters, written as instructions to the AI assistant.` },
        { kind: "list", ordered: true, items: [
          "See **Projects** in the left sidebar? Click **New project** and name it after the job.",
          "Open the project's instructions, paste them in and save.",
          "No Projects? Save the instructions in your notes. Paste them as the first message each time.",
        ] },
      ] },
      { num: "05", title: "Run it on real work", accent: "Then check it.", blocks: [
        { kind: "p", text: "Open your project. Paste this week's real notes, with names swapped for [brackets]." },
        { kind: "list", ordered: true, items: [
          "Check every **name, number and date** is in what you pasted.",
          "Delete any **promise** you did not make.",
          "Fill in every **[CHECK]** yourself.",
          "Ask: would you send this with your name on it?",
        ] },
        { kind: "p", text: "One part wrong? Fix it in the same chat." },
        { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
        { kind: "p", text: "Same fix twice? Add it to the AI assistant's instructions as a new rule." },
      ] },
      { num: "06", title: "Add one job a week", accent: "Small and checked.", blocks: [
        { kind: "p", text: "Each week, pick the next job on your list. Build its AI assistant with step 04." },
        { kind: "honest", text: "**The honest part:** AI drafts. You check, decide and send. That is why it works." },
      ] },
      { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
        { kind: "checklist", items: [
          "Training switched off",
          "Business Profile saved",
          "Task list saved in your notes",
          "First AI assistant saved",
          "One real piece of work checked",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Next step",
      heading: "ChatGPT knows your business.",
      accent: "Now teach AI your brand.",
      body: "The Brand Brain guide adds your Brand Kit, Voice Rules and Brand DNA. Then AI writes like you.",
      label: "Build your Brand Brain →",
      href: "/guides/brand-brain-guide/",
    },
    conclusion: {
      heading: "Keep it simple",
      paragraph: "Update your Business Profile when things change. Add every repeated fix as a rule. Hand over one job a week.",
      finishLine: "Set it up once. It gets better every week.",
    },
  },
  {
    // Copy supplied and approved by the owner on 13/10/2026.
    // Rewritten 13/10/2026 to the lean guide model (LEAN-TEMPLATE-2026-10-13.md).
    slug: "brand-brain-guide",
    lumailTag: "guide-brand-brain",
    title: "How to Teach Claude About My Business So I Stop Repeating Myself",
    cover: "/images/guides/brand-brain-guide.webp",
    coverAlt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
    seoDescription: "Build a Brand Brain in Claude in 7 steps: one project with your Brand Kit, Voice Rules and Brand DNA, so ads, pages, posts and emails sound like you.",
    tool: "Claude",
    minutes: 30,
    h1: { title: "How to Teach Claude About My Business", accent: "So I Stop Repeating Myself" },
    hero: {
      kind: "scene",
      src: "/images/guides/brand-brain-guide.webp",
      alt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
      line: "Set it up once, in 7 steps. Claude never asks about your brand again.",
    },
    intro: {
      heading: "One project that knows your brand",
      lead: "A Brand Brain is one Claude project with three files about your brand. Everything Claude makes then matches you.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "**One Claude project** called Brand Brain",
          "**A Brand Kit**: your logo, colours and fonts",
          "**Voice Rules**: how you sound and words you never say",
          "**A Brand DNA** page: who you help and why you",
          "**Ads, pages, posts and emails** that sound like you",
        ] },
        { kind: "tip", text: "You need a Claude plan that includes Projects. Copy each prompt as it is and change the [brackets]." },
      ],
    },
    openSteps: 1,
    gate: {
      heading: "Get the",
      accent: "Brand Brain guide.",
      promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
      action: "Open the rest of the guide",
    },
    steps: [
      { num: "01", title: "Create the project", accent: "The container.", blocks: [
        { kind: "p", text: "Every chat inside the project reads its files." },
        { kind: "list", ordered: true, items: [
          "Open [Claude](https://claude.ai/) and click **Projects** in the left sidebar.",
          "Click **New project**.",
          "Name it **Brand Brain**.",
          "In the description, write one line: “Everything about [business name]: brand, voice and customer.”",
        ] },
        { kind: "tip", text: "Keep the project open. The next three steps each add one file." },
      ] },
      { num: "02", title: "Build your Brand Kit", accent: "What you look like.", blocks: [
        { kind: "p", text: "Your Brand Kit shows Claude your logo, colours and fonts." },
        { kind: "p", text: "**Have a brand already?** Upload your logo, colour codes and font names to the project's files. Then go to step 03." },
        { kind: "p", text: "**No brand yet?** Start a chat inside the project and paste this." },
        { kind: "prompt", label: "Build a design system", text: `Act as a senior brand designer.
Build a complete design system for my business:
[what you sell + who it is for]

Include:
- A logo direction (describe 3 options, then recommend one)
- A colour palette with hex codes and what each colour is for
- Heading and body fonts that are free to use
- Buttons, cards and spacing
- Do and don't rules

Ask me 5 questions before you start.` },
        { kind: "p", text: "Answer the questions. Push back on anything that does not feel like you. Then paste this." },
        { kind: "prompt", label: "Turn it into a Brand Kit", text: "Turn the final design system into one document called Brand Kit that I can save to this project." },
        { kind: "p", text: "Save that document to the project's files." },
      ] },
      { num: "03", title: "Write your Voice Rules", accent: "How you sound.", blocks: [
        { kind: "p", text: "Voice Rules make Claude sound like you, not like a robot." },
        { kind: "list", ordered: true, items: [
          "Upload 5 to 10 things you wrote: web pages, emails, posts.",
          "Pick only writing you are proud of. Claude copies it.",
          "Start a chat inside the project and paste this.",
        ] },
        { kind: "prompt", label: "Write my Voice Rules", text: `Read everything I have uploaded to this project.
Turn it into a Voice Rules document with these sections:

1. How we sound: 3 to 5 tone words, each with one sentence on what it means for us
2. Words and phrases we use often
3. Words and phrases we would never say
4. Sentence style: length, punctuation, emoji, capitals
5. Three short before-and-after examples: a generic sentence, then the same sentence in our voice

Only use what is in my writing. If something is unclear, ask me.` },
        { kind: "p", text: "Fix what comes back. Add every word that makes you cringe to the “never say” list. Save it as **Voice Rules**." },
        { kind: "tip", text: "**No writing yet?** Record yourself talking about your business. Paste the words in and run the same prompt." },
      ] },
      { num: "04", title: "Write your Brand DNA", accent: "The step that matters most.", blocks: [
        { kind: "p", text: "Brand DNA is one page: who you help, their problem and why you. Fill in the brackets and save it as **Brand DNA**." },
        { kind: "table", head: ["#", "Section", "Fill in"], rows: [
          ["1", "Who we help", "We help [customer] who [situation]."],
          ["2", "The problem", "They struggle with [problem]."],
          ["3", "How we solve it", "We [what you do] so they [result]."],
          ["4", "Why we are different", "Unlike [others], we [difference]."],
          ["5", "Proof", "[numbers, results, reviews]"],
          ["6", "One line", "[Brand] helps [customer] get [result]."],
        ] },
        { kind: "h3", text: "Tips for filling it in" },
        { kind: "list", items: [
          "Be exact. “Cafe owners with one shop” beats “small businesses”.",
          "Write the problem the way your customer says it.",
          "Proof: real numbers and real quotes only. Short is fine.",
        ] },
        { kind: "p", text: "**Stuck?** Paste this in a chat inside the project. Claude will ask you questions." },
        { kind: "prompt", label: "Interview me for my Brand DNA", text: `Interview me to write my Brand DNA doc.
Ask one question at a time, 10 questions in total, covering:
who my customer is, what problem I solve, how I solve it,
what makes me different, and what proof I have.
Then write the doc using the six sections:
Who we help, The problem, How we solve it,
Why we are different, Proof, One line.` },
      ] },
      { num: "05", title: "Start creating", accent: "Ask for what you need.", blocks: [
        { kind: "p", text: "Open a new chat inside Brand Brain. Claude reads your three files first. Try these." },
        { kind: "requests", items: [
          { want: "An ad", prompt: "Write 3 versions of a short ad for [product or offer]. One line on the angle behind each." },
          { want: "A landing page", prompt: "Build a landing page for [product]. Use our colours, fonts and voice. Include a headline, 3 benefits, proof and one call to action." },
          { want: "A social post", prompt: "Write an Instagram post about [topic] in our voice, with a first line that stops the scroll." },
          { want: "An email", prompt: "Write a welcome email for new subscribers. Keep it under 150 words." },
          { want: "A second opinion", prompt: "Here is something I wrote: [paste]. Rewrite it so it matches our voice rules, and tell me what you changed." },
        ] },
        { kind: "honest", text: "**Off brand?** Say what is wrong (“too formal”, “we never say ‘unlock’”). Ask Claude to add that note to Voice Rules. It gets better each time." },
      ] },
      { num: "06", title: "Add project instructions", accent: "Paste once.", blocks: [
        { kind: "p", text: "Instructions make Claude check your files every time." },
        { kind: "list", ordered: true, items: [
          "Open the project.",
          "Find **Instructions**.",
          "Paste this and save.",
        ] },
        { kind: "prompt", label: "Project instructions", text: `You are the in-house brand team for [business name].
Before you write or design anything, read Brand Kit, Voice Rules and Brand DNA in this project.

Always:
- Use only the colours and fonts in Brand Kit
- Write in the voice set out in Voice Rules, and never use a word on the "never say" list
- Speak to the customer and the problem described in Brand DNA
- If a request is missing something you need, ask one question before you start

Never invent prices, results, reviews or claims. If you need a fact that is not in the project, ask me.` },
      ] },
      { num: "07", title: "Keep it sharp", accent: "Keep it up to date.", blocks: [
        { kind: "list", items: [
          "**Something changed?** Update Brand DNA the same day.",
          "**Once a month:** add new writing and ask Claude to update Voice Rules.",
          "**Same mistake twice?** Put the fix in a file, not the chat.",
          "**Keep files short.** One or two pages each.",
        ] },
      ] },
      { num: "✓", title: "Checklist", accent: "Six boxes.", blocks: [
        { kind: "checklist", items: [
          "Brand Brain project made",
          "Brand Kit saved",
          "Voice Rules saved",
          "Brand DNA saved",
          "Instructions pasted in",
          "First ad, page or post made",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Free AI guides",
      heading: "Your Brand Brain is set up.",
      accent: "Pick the next job.",
      body: "The free guides page has more guides like this. Each one finishes one job.",
      label: "Browse the free guides →",
      href: "/guides/",
    },
    conclusion: {
      heading: "Keep it sharp",
      paragraph: "Update Brand DNA when things change. Update Voice Rules once a month. Put every repeated fix in a file.",
      finishLine: "Your Brand Brain gets better each time you correct it.",
    },
  },
];

function plain(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function toWalkthrough(block: CardBlock): WalkthroughBlock[] {
  switch (block.kind) {
    case "p": case "tip": case "honest": case "h3": return [{ kind: "paragraph", text: plain(block.text) }];
    case "list": case "checklist": return [{ kind: "list", items: block.items.map(plain) }];
    case "prompt": return [{ kind: "code", label: block.label, text: block.text }];
    case "table": return [{ kind: "table", rows: [block.head, ...block.rows] }];
    case "requests": return [{ kind: "list", items: block.items.map((item) => `${item.want}: ${item.prompt}`) }];
    case "fields": return [{ kind: "list", items: block.items.map((item) => `${item.label}: ${plain(item.text)}`) }];
    case "papers": return [{ kind: "paragraph", text: plain(block.left.text) }, { kind: "list", items: block.right.lines.map(plain) }];
    case "example": case "pass": return [{ kind: "paragraph", text: plain(block.text) }];
    case "result": return [{ kind: "list", items: block.lines.map(plain) }];
    case "contrast": return [{ kind: "list", items: block.items.map((item) => `${item.label}: ${plain(item.text)}`) }];
    case "shot": case "image": return [{ kind: "paragraph", text: block.caption }];
    case "teaser": return [{ kind: "paragraph", text: block.label }];
    case "checks": return [{ kind: "list", items: block.items.map(plain) }];
    case "paths": return [{ kind: "list", items: block.items.map((item) => `${item.tool}: ${plain(item.text)}`) }];
  }
}

/** The shared GuidePage shape used for metadata, search, related cards and email. */
export const cardGuidePages: readonly GuidePage[] = cardGuides.map((card) => ({
  slug: card.slug,
  title: card.title,
  promise: card.seoDescription,
  cover: card.cover,
  coverAlt: card.coverAlt,
  seoDescription: card.seoDescription,
  lumailTag: card.lumailTag,
  answer: { paragraphs: [card.intro.lead] },
  sections: [{
    kind: "walkthrough",
    heading: card.title,
    introduction: card.intro.lead,
    blocks: card.steps.flatMap((step): WalkthroughBlock[] => [{ kind: "heading", text: step.title }, ...step.blocks.flatMap(toWalkthrough)]),
  }],
  conclusion: { heading: card.conclusion.heading, paragraphs: [card.conclusion.paragraph], finishLine: card.conclusion.finishLine },
  related: [],
}));

export function getCardGuide(slug: string): CardGuide | undefined {
  return cardGuides.find((guide) => guide.slug === slug) ?? rebuiltGuides[slug];
}
