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
    slug: "start-using-ai-in-your-business",
    lumailTag: "guide-start-using-ai",
    title: "How to Start Using AI in Your Business When You Don't Know Where to Begin",
    cover: "/images/guides/start-using-ai-in-your-business.webp",
    coverAlt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
    seoDescription: "Don't know where to start with AI? Set ChatGPT up for your business in 6 steps: a business profile, a list of jobs to hand over and your first AI helper.",
    tool: "ChatGPT",
    minutes: 60,
    h1: { title: "How to Start Using AI", accent: "in Your Business" },
    hero: {
      kind: "scene",
      src: "/images/guides/start-using-ai-in-your-business.webp",
      alt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
      line: "Set ChatGPT up for your business once. Find the jobs worth handing over. Then build your first AI helper.",
    },
    intro: {
      heading: "Set up AI for your business in about an hour",
      lead: "Most people try AI once, get a vague answer and give up. That happens because the AI knows nothing about their business. This guide sets ChatGPT up for you, finds the jobs to hand over, and builds your first helper.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "ChatGPT set up safely: your chats kept out of training, and 3 rules for what never goes in",
          "A **Business Profile** (a short note about your business) that ChatGPT reads before every answer, so its advice fits you",
          "Your **AI task list**: the 5 jobs in your week worth handing over, ranked by time saved and risk",
          "Your **first AI helper**: saved rules for job number 1 that you use again every week",
          "One real piece of work done with it, and checked by you",
        ] },
        { kind: "tip", text: "You need a ChatGPT account. The free plan works. You can copy and paste every prompt below. Change the parts in [square brackets]." },
      ],
    },
    openSteps: 1,
    gate: {
      heading: "Get the",
      accent: "AI Starter Kit.",
      promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back to it later.",
      action: "Open the rest of the guide",
    },
    steps: [
      { num: "01", title: "Set up ChatGPT safely", accent: "Before anything goes in.", blocks: [
        { kind: "p", text: "Do this once. It protects your clients and your business in every chat after it." },
        { kind: "list", ordered: true, items: [
          "Go to [chatgpt.com](https://chatgpt.com). Sign in, or make a free account.",
          "Click your name or profile picture, then **Settings**.",
          "Open **Data Controls**. Turn off **Improve the model for everyone**. Now your chats are not used to train the AI.",
          "Menu names change. If you can't find it, search \"data controls\" on [OpenAI's help pages](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq).",
        ] },
        { kind: "p", text: "Then follow these 3 rules every time you paste something in." },
        { kind: "table", head: ["Never paste", "Ask first", "Fine to paste"], rows: [
          ["Passwords, card and bank details", "A client's emails or documents", "Your own notes, with names taken out"],
          ["Health or personal details about anyone", "Contracts and proposals with names in them", "Your website and sales page text"],
          ["Anything you signed to keep secret (an NDA)", "Details about your team or freelancers", "Made-up examples"],
        ] },
        { kind: "tip", text: "Swap real details for brackets before you paste: [client], [price], [date]. Put the real ones back in the final version yourself." },
      ] },
      { num: "02", title: "Write your Business Profile", accent: "What ChatGPT needs to know.", blocks: [
        { kind: "p", text: "Your Business Profile tells ChatGPT who you are, who you help and how you like to work. Without it, every answer is vague." },
        { kind: "p", text: "Start a new chat and paste this prompt. Answer each question in a sentence or two." },
        { kind: "prompt", label: "Interview me for my Business Profile", text: `Interview me to write my Business Profile.

Ask me these one at a time and wait for each answer:
1. What does my business do, in one sentence?
2. Who are my clients, and what do they usually need help with?
3. What do I sell, and what does a normal project or package include?
4. How do I like to talk: tone, words I use, words I never use?
5. What do I spend most of my week on?

Then write my Business Profile in two short parts:
Part 1: What you should know about me and my business (under 1,000 characters)
Part 2: How you should reply to me (under 1,000 characters)

Use only what I tell you. Plain English, no em dashes.` },
        { kind: "p", text: "Read it and fix anything that's wrong. Then save it where ChatGPT reads it before every chat:" },
        { kind: "list", ordered: true, items: [
          "Click your name or profile picture, then **Settings**, then **Personalization**.",
          "Open **Custom instructions** (the boxes where you tell ChatGPT about you).",
          "Paste Part 1 into the box about you. Paste Part 2 into the box about how ChatGPT should reply. Click Save.",
        ] },
        { kind: "p", text: "**Test it:** start a new chat and ask \"What do you know about my business?\" If the answer matches your profile, it worked." },
        { kind: "tip", text: "**Can't find Custom instructions?** Keep the profile in your notes. Paste it as the first message of any chat about your business." },
      ] },
      { num: "03", title: "Look at your week", accent: "Find the jobs worth handing over.", blocks: [
        { kind: "p", text: "Don't guess what to use AI for. Let it ask you about your week. Then it ranks your jobs by time taken and by how risky a mistake would be." },
        { kind: "prompt", label: "Build my AI task list", text: `Using my Business Profile, interview me about my working week.

Ask me one question at a time, up to 8 questions, about:
- the tasks I repeat every week
- how long each one takes
- which ones I put off or dread

Then give me a table with these columns:
Task | Hours per week | What AI could draft or prepare | What I must still do myself | Risk if AI gets it wrong (low, medium, high)

Rank the table: most hours saved and lowest risk first.
Under the table, name the one task I should hand over first, and why, in two sentences.` },
        { kind: "table", head: ["Good first tasks (low risk)", "Leave for later (higher risk)"], rows: [
          ["Follow-up emails after calls", "Anything you sign: contracts, invoices"],
          ["First drafts of proposals from your notes", "Advice to a client on law, money or health"],
          ["Answers to your most common questions", "Messages sent without you reading them"],
          ["Short versions of long documents", "Choices about people: hiring, pricing a client"],
        ] },
        { kind: "p", text: "Save the table in your notes. It is your plan for the next few weeks: one new task per week." },
      ] },
      { num: "04", title: "Build your first AI helper", accent: "Task number 1, set up once.", blocks: [
        { kind: "p", text: "An AI helper is a set of rules for one job. You write them once. Then you use them every time the job comes up, so you never start from an empty chat." },
        { kind: "prompt", label: "Write my helper's instructions", text: `Write instructions for an assistant that does this task for me: [task number 1 from my task list].

Use my Business Profile. The instructions must say:
1. What I will paste in each time (for example: call notes, a client email, a document)
2. The steps to follow, in order
3. Exactly what to give back: format, length, tone
4. Rules: use only what I paste; write [CHECK] where information is missing instead of guessing; never make up names, prices, dates or promises

Keep it under 1,500 characters, written as instructions to the assistant.` },
        { kind: "p", text: "Now save the instructions so you can use them again:" },
        { kind: "list", ordered: true, items: [
          "**If you see Projects in the menu on the left:** click **New project**. A project is a folder in ChatGPT that remembers your rules. Name it after the task, for example **Follow-up emails**. Open the project's instructions and paste them in. Every chat in the project uses them.",
          "**If you don't:** save the instructions in your notes with the task name. Paste them as the first message whenever you do this job.",
        ] },
      ] },
      { num: "05", title: "Run it on real work", accent: "Then check it.", blocks: [
        { kind: "p", text: "Open your project, or a new chat with the instructions pasted in. Paste this week's real material for the task, with names swapped for brackets." },
        { kind: "p", text: "Before you use the answer, check these 4 things:" },
        { kind: "list", ordered: true, items: [
          "**Names, numbers and dates.** Each one must be in what you pasted. If not, fix it or delete it.",
          "**Promises.** Delete anything you didn't agree to.",
          "**[CHECK] marks.** Fill in every one yourself.",
          "**Your voice.** Would you send this with your name on it?",
        ] },
        { kind: "p", text: "If one part is wrong, don't start again. In the same chat, tell it what to change:" },
        { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
        { kind: "tip", text: "**Same fix twice?** Add it to the helper's instructions as a new rule. Then you never have to fix it again." },
      ] },
      { num: "06", title: "Add one task a week", accent: "Small, checked, repeated.", blocks: [
        { kind: "p", text: "Each week, go back to your task list. Build the next helper with step 04. In five weeks, your five biggest weekly jobs will each have a helper." },
        { kind: "honest", text: "**The honest part:** AI won't run your business. It won't know your clients the way you do. It writes first drafts. You check, decide and send. That is why it works." },
      ] },
      { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
        { kind: "checklist", items: [
          "Training turned off in Data Controls",
          "Business Profile saved in Custom instructions",
          "AI task list saved in your notes",
          "First helper saved in a project or in your notes",
          "One real piece of work done and checked",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Next step",
      heading: "ChatGPT knows your business.",
      accent: "Now teach AI your brand.",
      body: "The Brand Brain guide is the next step. It sets up your brand kit, your voice rules and your Brand DNA. Then everything AI writes for you sounds like you.",
      label: "Build your Brand Brain →",
      href: "/guides/brand-brain-guide/",
    },
    conclusion: {
      heading: "Keep it working",
      paragraph: "Update your Business Profile when something changes. Add every repeated fix to your helper's instructions. Build one new helper a week from your task list.",
      finishLine: "Set it up once, then let it get better every week.",
    },
  },
  {
    // Copy supplied and approved by the owner on 13/10/2026.
    slug: "brand-brain-guide",
    lumailTag: "guide-brand-brain",
    title: "How to Teach Claude About My Business So I Stop Repeating Myself",
    cover: "/images/guides/brand-brain-guide.webp",
    coverAlt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
    seoDescription: "Build a Brand Brain in Claude in 5 steps: one project with your brand kit, voice rules and Brand DNA, so ads, pages, posts and emails match your brand.",
    tool: "Claude",
    minutes: 30,
    h1: { title: "How to Teach Claude About My Business", accent: "So I Stop Repeating Myself" },
    hero: {
      kind: "scene",
      src: "/images/guides/brand-brain-guide.webp",
      alt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
      line: "Set it up once, in 5 steps. One Claude project holds your brand kit, your voice rules and your Brand DNA.",
    },
    intro: {
      heading: "One project that knows your brand",
      lead: "A Brand Brain is one Claude project (a space that keeps your files for every chat). It holds your brand kit, voice rules and Brand DNA, so everything Claude makes matches your brand. It takes five steps and about 30 minutes the first time.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "One Claude project called **Brand Brain**",
          "A **Brand Kit** file: logo, colours and fonts, your own or a new look Claude designs for you",
          "**Voice rules**: how you sound, the words you use and the words you never say",
          "A one-page **Brand DNA** doc: who you help, the problem you solve and why you are different",
          "A place to ask for ads, landing pages, posts and emails that match your brand the first time",
        ] },
        { kind: "tip", text: "You need a Claude plan that includes Projects. You can copy and paste every prompt below. Change the parts in [square brackets]." },
      ],
    },
    openSteps: 1,
    gate: {
      heading: "Get the",
      accent: "Brand Brain Guide.",
      promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back to it later.",
      action: "Open the rest of the guide",
    },
    steps: [
      { num: "01", title: "Create the project", accent: "The home for your files.", blocks: [
        { kind: "p", text: "The project holds all your brand files. Every chat you start inside it reads what you add." },
        { kind: "list", ordered: true, items: [
          "Open [Claude](https://claude.ai/). Click **Projects** in the menu on the left.",
          "Click **New project**.",
          "Name it **Brand Brain**.",
          "In the description, write one line about your business. For example: “Everything about [business name]: brand kit, voice and customer.”",
        ] },
        { kind: "tip", text: "Keep the project open. In each of the next three steps, you add one file to it." },
      ] },
      { num: "02", title: "Build your brand kit", accent: "What you look like.", blocks: [
        { kind: "p", text: "Your Brand Kit file tells Claude what your business looks like: logo, colours and fonts." },
        { kind: "p", text: "**If you already have a brand:** upload your logo files, colour codes and font names to the project's files. A brand guidelines PDF works too. Then skip to Step 3." },
        { kind: "p", text: "**If you do not have one yet:** start a chat inside the project and paste this prompt. Claude will design a full look for you (a design system)." },
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
        { kind: "p", text: "Answer the five questions. Then tell Claude about anything that does not feel like you. When you are happy, ask:" },
        { kind: "prompt", label: "Turn it into a Brand Kit file", text: "Turn the final design system into one document called Brand Kit that I can save to this project." },
        { kind: "p", text: "Save that document to the project's files." },
      ] },
      { num: "03", title: "Build your brand voice", accent: "How you sound.", blocks: [
        { kind: "p", text: "Voice rules stop Claude sounding like any other AI. They make it sound like you." },
        { kind: "list", ordered: true, items: [
          "Upload writing from your business to the project: website pages, emails, newsletters, social posts, sales pages. Five to ten pieces is enough. More is better.",
          "Pick writing you are proud of. Claude copies what you give it. So leave out anything that does not sound like you.",
          "Start a chat inside the project and paste this prompt.",
        ] },
        { kind: "prompt", label: "Write my Voice Rules", text: `Read everything I have uploaded to this project.
Turn it into a Voice Rules document with these sections:

1. How we sound: 3 to 5 tone words, each with one sentence on what it means for us
2. Words and phrases we use often
3. Words and phrases we would never say
4. Sentence style: length, punctuation, emoji, capitals
5. Three short before-and-after examples: a plain sentence, then the same sentence in our voice

Only use what is in my writing. If something is unclear, ask me.` },
        { kind: "p", text: "Read the answer and fix it. The “never say” list is the most useful part. Add every word you hate to see. Save the final version to the project's files as **Voice Rules**." },
        { kind: "tip", text: "**No writing yet?** Record yourself talking about your business for two minutes. Paste the transcript (the written-out words) in, and run the same prompt." },
      ] },
      { num: "04", title: "Write your Brand DNA doc", accent: "The step that matters most.", blocks: [
        { kind: "p", text: "The Brand DNA doc is one page. It tells Claude who you sell to, what problem you solve and why you are different. Fill in the brackets and save it to the project as **Brand DNA**." },
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
          "Be exact about the customer. “Busy cafe owners with one location” is better than “small businesses”.",
          "Write the problem in your customer's words, the way they would say it to a friend.",
          "For proof, use real numbers and real quotes only. If you are new, keep it short.",
        ] },
        { kind: "p", text: "**Stuck?** Paste this prompt into a chat inside the project. Claude will ask you questions and write it for you." },
        { kind: "prompt", label: "Interview me for my Brand DNA", text: `Interview me to write my Brand DNA doc.
Ask one question at a time, 10 questions in total, covering:
who my customer is, what problem I solve, how I solve it,
what makes me different, and what proof I have.
Then write the doc using the six sections:
Who we help, The problem, How we solve it,
Why we are different, Proof, One line.` },
      ] },
      { num: "05", title: "Start creating", accent: "Ask for what you need.", blocks: [
        { kind: "p", text: "Open a new chat inside the Brand Brain project and ask for what you need. Claude reads your three files before it answers. Start with requests like these." },
        { kind: "requests", items: [
          { want: "An ad", prompt: "Write 3 versions of a short ad for [product or offer]. Add one line on the idea behind each." },
          { want: "A landing page", prompt: "Build a landing page for [product]. Use our colours, fonts and voice. Include a headline, 3 benefits, proof and one call to action." },
          { want: "A social post", prompt: "Write an Instagram post about [topic] in our voice, with a first line that makes people stop and read." },
          { want: "An email", prompt: "Write a welcome email for new subscribers. Keep it under 150 words." },
          { want: "A second opinion", prompt: "Here is something I wrote: [paste]. Rewrite it so it matches our voice rules, and tell me what you changed." },
        ] },
        { kind: "honest", text: "**When something does not match your brand,** say what is wrong (“too formal”, “we never say ‘unlock’”). Ask Claude to add that note to the Voice Rules file. Your Brand Brain gets better each time you correct it." },
      ] },
      { num: "06", title: "Project instructions", accent: "Paste once.", blocks: [
        { kind: "p", text: "Project instructions are rules Claude follows in every chat. They make Claude check your files every time, without you asking. Open the project, find **Instructions**, and paste this." },
        { kind: "prompt", label: "Project instructions", text: `You are the in-house brand team for [business name].
Before you write or design anything, read Brand Kit, Voice Rules and Brand DNA in this project.

Always:
- Use only the colours and fonts in Brand Kit
- Write in the voice set out in Voice Rules, and never use a word on the "never say" list
- Speak to the customer and the problem described in Brand DNA
- If a request is missing something you need, ask one question before you start

Never make up prices, results, reviews or claims. If you need a fact that is not in the project, ask me.` },
      ] },
      { num: "07", title: "Keep it up to date", accent: "Small habits.", blocks: [
        { kind: "list", items: [
          "**When something changes** (new offer, new price, new customer): update Brand DNA the same day.",
          "**Once a month:** add your best new writing to the project. Ask Claude to update the Voice Rules.",
          "**When Claude gets it wrong twice:** put the fix in a file, not in the chat. Add the rule to Voice Rules or Brand Kit.",
          "**Keep the files short.** One to two pages each works better than a 40-page brand book.",
        ] },
      ] },
      { num: "✓", title: "Checklist", accent: "Six boxes.", blocks: [
        { kind: "checklist", items: [
          "Project made and named Brand Brain",
          "Brand Kit saved to the project",
          "Voice Rules saved to the project",
          "Brand DNA saved to the project",
          "Project instructions pasted in",
          "First ad, page or post made",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Free AI guides",
      heading: "Your Brand Brain is set up.",
      accent: "Pick the next job.",
      body: "The free guides page has more step-by-step guides like this one. Each guide helps you finish one job, start to end.",
      label: "Browse the free guides →",
      href: "/guides/",
    },
    conclusion: {
      heading: "Keep it up to date",
      paragraph: "Update Brand DNA when something changes. Update Voice Rules once a month. Put every repeated fix in a file, not in the chat.",
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
