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
    // Rewritten 13/10/2026 to the explicit rewrite brief (every click spelled out).
    slug: "start-using-ai-in-your-business",
    lumailTag: "guide-start-using-ai",
    title: "How to Start Using AI in Your Business When You Don't Know Where to Begin",
    cover: "/images/guides/start-using-ai-in-your-business.webp",
    coverAlt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
    seoDescription: "Don't know where to start with AI? Set ChatGPT up for your business in 6 steps: a Business Profile, a list of jobs to hand over and your first AI assistant.",
    tool: "ChatGPT",
    minutes: 60,
    h1: { title: "How to Start Using AI", accent: "in Your Business" },
    hero: {
      kind: "scene",
      src: "/images/guides/start-using-ai-in-your-business.webp",
      alt: "The Shift & Lead mascot laying blocks across a gap to build a bridge, one block at a time.",
      line: "Set ChatGPT up for your business once. Find the jobs worth handing over. Then build your first AI assistant.",
    },
    intro: {
      heading: "Set up AI for your business in about an hour",
      lead: "Here is what happens to most people. A client sends an enquiry, and you open ChatGPT (an AI chat app) to help you reply. You type a question and get a vague, general answer. So you write the reply yourself and decide AI is not for you. The problem is not you. ChatGPT knows nothing about your business yet. This guide fixes that, step by step. You tell ChatGPT about your business once, pick the jobs worth handing over, and set up your first AI assistant.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "**ChatGPT set up safely**: your chats kept out of AI training, and 3 clear rules for what never goes in",
          "**A Business Profile** (a short note about your business) that ChatGPT reads before every answer, so its advice fits you",
          "**Your AI task list**: the 5 jobs in your week worth handing over, ranked by time saved and risk",
          "**Your first AI assistant**: saved rules for job number 1 that you use again every week",
          "**One real piece of work done with it**, and checked by you",
        ] },
        { kind: "h3", text: "Before you start" },
        { kind: "list", items: [
          "A computer with a web browser, like Chrome. The steps are written for the website, not the phone app.",
          "A ChatGPT account. The free plan works for every step. If you don't have one, step 01 shows you how to make one.",
          "About an hour. You can stop after any step and come back.",
          "One real job from this week to test it on, like a follow-up email after a call or a reply to an enquiry.",
        ] },
        { kind: "tip", text: "You can copy and paste every prompt (the message you type to the AI) below. Change the parts in [square brackets] to your own details." },
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
        { kind: "p", text: "Do this once. It protects your clients and your business in every chat after it. First you sign in. Then you switch off training. Then you learn 3 rules for what you paste in." },
        { kind: "h3", text: "A. Sign in" },
        { kind: "list", ordered: true, items: [
          "Open [chatgpt.com](https://chatgpt.com) in your browser.",
          "If you see a chat box and your name or picture on the screen, you are signed in. Go to B.",
          "If you see **Log in** and **Sign up** buttons, click **Log in** if you have an account. If not, click **Sign up** and follow the steps. Use the email you use for your business.",
        ] },
        { kind: "h3", text: "B. Switch off training" },
        { kind: "p", text: "Training means OpenAI (the company behind ChatGPT) can use your chats to improve its AI. You don't want your client work used for that. So switch it off." },
        { kind: "list", ordered: true, items: [
          "Click your name or profile picture. On most screens it is in the bottom left corner. On some screens it is in the top right corner.",
          "A small menu opens. Click **Settings**. A settings window opens.",
          "On the left of that window, click **Data controls**.",
          "Find **Improve the model for everyone**. Click it, or click the switch next to it.",
          "Turn it off. If you see a **Done** button, click it. The setting now says **Off**, or the switch turns grey.",
          "Can't find **Data controls**? OpenAI moves these menus. Search \"data controls\" on [OpenAI's help pages](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq) for today's steps.",
        ] },
        { kind: "result", label: "What you should see", lines: [
          "Improve the model for everyone: Off",
          "If it still says On, click it again and check you clicked Done.",
        ] },
        { kind: "h3", text: "C. Learn the 3 rules for what you paste" },
        { kind: "p", text: "Even with training off, be careful what you paste in. Use this table every time." },
        { kind: "table", head: ["Never paste", "Ask first", "Fine to paste"], rows: [
          ["Passwords, card and bank details", "A client's emails or documents", "Your own notes, with names taken out"],
          ["Health or personal details about anyone", "Contracts and proposals with names in them", "Your website and sales page text"],
          ["Anything you signed to keep secret (an NDA)", "Details about your team or freelancers", "Made-up examples"],
        ] },
        { kind: "p", text: "Before you paste, swap real details for words in square brackets. Put the real details back in the final version yourself." },
        { kind: "contrast", items: [
          { label: "Don't paste this", text: "Call notes with the client's full name, phone number and the price you agreed", good: false },
          { label: "Paste this instead", text: "The same call notes with [client], [phone] and [price] in place of the real details", good: true },
        ] },
        { kind: "tip", text: "**First win:** training is off, and you know what is safe to paste. Write the 3 rules on a sticky note next to your screen until they are a habit." },
      ] },
      { num: "02", title: "Write your Business Profile", accent: "What ChatGPT needs to know.", blocks: [
        { kind: "p", text: "Your Business Profile tells ChatGPT who you are, who you help and how you like to work. Without it, every answer is vague. ChatGPT will interview you and write it for you." },
        { kind: "h3", text: "A. Let ChatGPT interview you" },
        { kind: "list", ordered: true, items: [
          "Start a new chat. Click **New chat** at the top left. You will see an empty chat box.",
          "Copy the prompt below and paste it in the chat box. You don't need to change anything in it.",
          "Press Enter. ChatGPT asks you the first question.",
          "Answer each question in a sentence or two, then press Enter. It asks the next one.",
        ] },
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
        { kind: "example", label: "Example answer to question 1", text: "I help [type of client] with [what you do], mostly through [your main offer]." },
        { kind: "result", label: "What a good answer looks like", lines: [
          "Part 1: I run [business name]. I help [type of client] who need [problem solved]. My main offer is [offer]. Most of my week goes on [tasks].",
          "Part 2: Reply in plain, friendly English. Keep answers short. Use UK spelling. Never use [words you hate].",
        ] },
        { kind: "h3", text: "B. Check it" },
        { kind: "list", ordered: true, items: [
          "Read Part 1 and Part 2 slowly.",
          "Is every fact true? ChatGPT may fill gaps with guesses. Delete anything you didn't say.",
          "If something is wrong, type the fix in the chat, for example: \"I don't sell coaching. Remove that.\" Press Enter. It writes a new version.",
          "When it is right, copy both parts into a note on your computer. Call the note **Business Profile**.",
        ] },
        { kind: "h3", text: "C. Save it where ChatGPT reads it every time" },
        { kind: "p", text: "Custom instructions (boxes where you tell ChatGPT about you) are read before every chat. Put your profile there." },
        { kind: "list", ordered: true, items: [
          "Click your name or profile picture (bottom left on most screens). Click **Settings**.",
          "On the left of the settings window, click **Personalization**.",
          "Click **Custom instructions**. On some accounts the boxes show straight away, with no extra click.",
          "Find the box about you. On some accounts it is called **More about you**, or it asks what ChatGPT should know about you. Paste Part 1 there.",
          "Find the box about how ChatGPT should reply. On some accounts it is called **Custom instructions**, or it asks how ChatGPT should respond. Paste Part 2 there.",
          "Click **Save**. The window closes or shows a short saved message.",
          "Can't find **Personalization** or these boxes? OpenAI moves these menus. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt).",
        ] },
        { kind: "h3", text: "D. Test it" },
        { kind: "list", ordered: true, items: [
          "Click **New chat** at the top left.",
          "Type the question below and press Enter.",
        ] },
        { kind: "example", label: "What you type", text: "What do you know about my business? Answer in 3 short lines." },
        { kind: "result", label: "What you should see", lines: [
          "3 lines that match your Business Profile: what you do, who you help and how you like replies.",
          "If it says it knows nothing, go back to C and check you clicked Save.",
        ] },
        { kind: "tip", text: "**Still no Custom instructions?** Keep the Business Profile note. Paste it as the first message of any chat about your business." },
      ] },
      { num: "03", title: "Look at your week", accent: "Find the jobs worth handing over.", blocks: [
        { kind: "p", text: "Don't guess what to use AI for. Let ChatGPT ask you about your week. Then it ranks your jobs by time taken and by how risky a mistake would be." },
        { kind: "list", ordered: true, items: [
          "Click **New chat** at the top left.",
          "Copy the prompt below and paste it in the chat box. You don't need to change anything.",
          "Press Enter. Answer each question honestly. Rough times are fine, like \"about 2 hours\".",
        ] },
        { kind: "prompt", label: "Build my AI task list", text: `Using my Business Profile, interview me about my working week.

Ask me one question at a time, up to 8 questions, about:
- the tasks I repeat every week
- how long each one takes
- which ones I put off or dread

Then give me a table with these columns:
Task | Hours per week | What AI could draft or prepare | What I must still do myself | Risk if AI gets it wrong (low, medium, high)

Rank the table: most hours saved and lowest risk first.
Under the table, name the one task I should hand over first, and why, in two sentences.` },
        { kind: "result", label: "What a good answer looks like", lines: [
          "Follow-up emails after calls | [hours] | First draft from my call notes | Check and send | Low",
          "Replies to enquiries | [hours] | Draft from my common answers | Add prices and send | Low",
          "Start with follow-up emails: you do them every week and a mistake is easy to spot before you send.",
        ] },
        { kind: "p", text: "Look at the risk column. Does it match the table below? If ChatGPT says a high-risk job is low risk, move it down the list yourself." },
        { kind: "table", head: ["Good first tasks (low risk)", "Leave for later (higher risk)"], rows: [
          ["Follow-up emails after calls", "Anything you sign: contracts, invoices"],
          ["First drafts of proposals from your notes", "Advice to a client on law, money or health"],
          ["Answers to your most common questions", "Messages sent without you reading them"],
          ["Short versions of long documents", "Choices about people: hiring, pricing a client"],
        ] },
        { kind: "list", ordered: true, items: [
          "Copy the table from ChatGPT. Hover over it and click the copy button, or select it with your mouse and press **Ctrl + C** (Windows) or **Cmd + C** (Mac).",
          "Paste it into a new note on your computer. Call the note **AI task list**.",
          "Circle or bold task number 1. You build its AI assistant in step 04.",
        ] },
        { kind: "tip", text: "This list is your plan for the next few weeks: one new task per week." },
      ] },
      { num: "04", title: "Build your first AI assistant", accent: "Task number 1, set up once.", blocks: [
        { kind: "p", text: "An AI assistant is a set of rules for one job. You write them once. Then you use them every time the job comes up, so you never start from an empty chat." },
        { kind: "h3", text: "A. Get ChatGPT to write the rules" },
        { kind: "list", ordered: true, items: [
          "Click **New chat** at the top left.",
          "Copy the prompt below and paste it in the chat box.",
          "Change [task number 1 from my task list] to your real task, for example \"follow-up emails after sales calls\".",
          "Press Enter.",
        ] },
        { kind: "prompt", label: "Write my assistant's instructions", text: `Write instructions for an assistant that does this task for me: [task number 1 from my task list].

Use my Business Profile. The instructions must say:
1. What I will paste in each time (for example: call notes, a client email, a document)
2. The steps to follow, in order
3. Exactly what to give back: format, length, tone
4. Rules: use only what I paste; write [CHECK] where information is missing instead of guessing; never make up names, prices, dates or promises

Keep it under 1,500 characters, written as instructions to the assistant.` },
        { kind: "result", label: "What a good answer looks like", lines: [
          "You write follow-up emails for [business name] after sales calls.",
          "Each time, I paste my call notes. Read them, then write one email under 150 words.",
          "Thank [client] for the call, list what we agreed, and give one clear next step.",
          "Use only what is in my notes. Write [CHECK] where a detail is missing.",
        ] },
        { kind: "p", text: "Read the rules. Fix anything that is not how you do the job. Then save them in one of the two ways below." },
        { kind: "h3", text: "B. Save it in a Project (if you see Projects)" },
        { kind: "p", text: "A Project is a folder in ChatGPT that keeps your rules. Every chat inside it follows them." },
        { kind: "list", ordered: true, items: [
          "Look at the menu on the left. Find **Projects**. If you can't see it, go to C.",
          "Click **New project**. A box opens.",
          "Type a name for the task, for example **Follow-up emails**. Click **Create project**.",
          "You are now inside the project. Find **Instructions** (on some accounts it is under the three dots **...** at the top, or it says **Add instructions**).",
          "Paste the rules ChatGPT wrote. Click **Save**.",
          "Can't find **Projects** or **Instructions**? OpenAI moves these menus. Search \"projects\" on [OpenAI's help pages](https://help.openai.com/en/articles/10169521-projects-in-chatgpt).",
        ] },
        { kind: "h3", text: "C. Save it in a note (if you don't see Projects)" },
        { kind: "list", ordered: true, items: [
          "Make a new note on your computer. Name it after the task, for example **Follow-up emails assistant**.",
          "Paste the rules in it.",
          "Each time you do this job, open a new chat and paste the rules as your first message. Then paste your work under them.",
        ] },
      ] },
      { num: "05", title: "Run it on real work", accent: "Then check it.", blocks: [
        { kind: "p", text: "Now use your AI assistant on one real job from this week. Then check every line before it goes anywhere." },
        { kind: "h3", text: "A. Run it" },
        { kind: "list", ordered: true, items: [
          "Open your project and click in its chat box. Or open a new chat and paste your rules first.",
          "Take this week's real material for the task, like your notes from a call.",
          "Swap names, phone numbers and prices for [client], [phone] and [price], as you learned in step 01.",
          "Paste it in the chat box and press Enter.",
        ] },
        { kind: "h3", text: "B. Check it yourself" },
        { kind: "p", text: "AI can sound sure and still be wrong. Before you use the answer, check these 4 things, one at a time." },
        { kind: "list", ordered: true, items: [
          "**Names, numbers and dates.** Find each one in what you pasted. If it is not there, ChatGPT made it up. Fix it or delete it.",
          "**Promises.** Read every sentence that says \"we will\" or \"I will\". Delete anything you didn't agree to.",
          "**[CHECK] marks.** Fill in every one yourself with the real detail.",
          "**Your voice.** Read it out loud. Would you send this with your name on it?",
        ] },
        { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
          ["A date or price that is not in your notes", "ChatGPT guessed", "Delete it, or put in the real one"],
          ["Lots of [CHECK] marks", "Your notes were missing details", "Fill them in, and add those details to your notes next time"],
          ["It sounds stiff or not like you", "The tone rules are too vague", "Add a tone rule to the assistant's instructions"],
          ["It ignores your rules", "The rules were not loaded", "Check you are inside the project, or paste the rules again"],
        ] },
        { kind: "h3", text: "C. Fix one part" },
        { kind: "p", text: "If one part is wrong, don't start again. Stay in the same chat. Paste the prompt below and fill in the brackets." },
        { kind: "prompt", label: "Fix one part", text: `Change this part: [paste the line].
Why it's wrong: [what's actually true].
Keep everything else the same.` },
        { kind: "example", label: "What you type", text: "Change this part: \"We'll start next Monday.\" Why it's wrong: we agreed to start after the deposit is paid. Keep everything else the same." },
        { kind: "p", text: "When it is right, put the real names and details back. Then copy it into your email and send it yourself." },
        { kind: "tip", text: "**Same fix twice?** Add it to the assistant's instructions as a new rule. Then you never have to fix it again." },
      ] },
      { num: "06", title: "Add one task a week", accent: "Small, checked, repeated.", blocks: [
        { kind: "p", text: "One AI assistant is a start. The time saved grows when you add one more each week." },
        { kind: "list", ordered: true, items: [
          "Once a week, open your **AI task list** note.",
          "Pick the next task on the list.",
          "Build its AI assistant with step 04.",
          "Run it on real work and check it with step 05.",
        ] },
        { kind: "p", text: "In five weeks, your five biggest weekly jobs will each have an AI assistant." },
        { kind: "honest", text: "**The honest part:** AI won't run your business. It won't know your clients the way you do. It writes first drafts. You check, decide and send. That is why it works." },
      ] },
      { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
        { kind: "checklist", items: [
          "Improve the model for everyone switched off in Data controls",
          "Business Profile saved in Custom instructions, and the test question answered correctly",
          "AI task list saved in a note, with task number 1 marked",
          "First AI assistant saved in a project or in a note",
          "One real piece of work done, every name, number and date checked, then sent by you",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Next step",
      heading: "ChatGPT knows your business.",
      accent: "Now teach AI your brand.",
      body: "The Brand Brain guide is the next step. It sets up your Brand Kit, your Voice Rules and your Brand DNA. Then everything AI writes for you sounds like you.",
      label: "Build your Brand Brain →",
      href: "/guides/brand-brain-guide/",
    },
    conclusion: {
      heading: "Keep it working",
      paragraph: "Update your Business Profile when something changes. Add every repeated fix to your assistant's instructions. Build one new AI assistant a week from your task list.",
      finishLine: "Set it up once, then let it get better every week.",
    },
  },
  {
    // Copy supplied and approved by the owner on 13/10/2026.
    // Rewritten 13/10/2026 to the explicit rewrite brief (every click spelled out).
    slug: "brand-brain-guide",
    lumailTag: "guide-brand-brain",
    title: "How to Teach Claude About My Business So I Stop Repeating Myself",
    cover: "/images/guides/brand-brain-guide.webp",
    coverAlt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
    seoDescription: "Build a Brand Brain in Claude in 7 steps: one project with your Brand Kit, Voice Rules and Brand DNA, so ads, pages, posts and emails match your brand.",
    tool: "Claude",
    minutes: 30,
    h1: { title: "How to Teach Claude About My Business", accent: "So I Stop Repeating Myself" },
    hero: {
      kind: "scene",
      src: "/images/guides/brand-brain-guide.webp",
      alt: "The Shift & Lead mascot beside a pen, compass, brush and a stack of pages: the tools of a brand kit.",
      line: "Set it up once, in 7 steps. One Claude project holds your Brand Kit, your Voice Rules and your Brand DNA.",
    },
    intro: {
      heading: "One project that knows your brand",
      lead: "You need a post for a launch, so you open Claude (an AI chat app). Then you explain your business again: who you help, how you talk, your colours. You did the same last week, and the week before. The answer still sounds like any other AI. A Brand Brain fixes this. It is one Claude project (a space that keeps your files for every chat) with three files about your brand. You set it up once. After that, every ad, page, post and email Claude makes for you starts from your brand.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "**One Claude project called Brand Brain**, where every chat already knows your business",
          "**A Brand Kit file**: logo, colours and fonts, your own or a new look Claude designs for you",
          "**A Voice Rules file**: how you sound, the words you use and the words you never say",
          "**A one-page Brand DNA file**: who you help, the problem you solve and why you are different",
          "**A list of ready requests** for ads, landing pages, posts and emails that match your brand the first time",
        ] },
        { kind: "h3", text: "Before you start" },
        { kind: "list", items: [
          "A computer with a web browser, like Chrome. The steps are written for the Claude website.",
          "A Claude account at [claude.ai](https://claude.ai/). You need a plan that includes Projects. If you see **Projects** in the menu on the left, your plan has it. If you don't, you may see an offer to upgrade instead.",
          "About 30 minutes for the first setup.",
          "Your brand files if you have them: logo, colour codes, font names. If you don't have a brand yet, that is fine. Claude can design one in step 02.",
          "5 to 10 pieces of your own writing you are proud of, like website pages, emails or posts.",
        ] },
        { kind: "tip", text: "You can copy and paste every prompt (the message you type to the AI) below. Change the parts in [square brackets] to your own details." },
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
        { kind: "p", text: "The project holds all your brand files. Every chat you start inside it reads what you add. In this step you make the project and give it a name and a short description." },
        { kind: "h3", text: "A. Find Projects" },
        { kind: "list", ordered: true, items: [
          "Open [claude.ai](https://claude.ai/) in your browser and sign in.",
          "Look at the menu on the left side of the screen. If the menu is hidden, click the menu button at the top left to open it.",
          "Click **Projects**. You will see a page with your projects. If it is your first one, the page is empty.",
          "Can't find **Projects**? Anthropic (the company behind Claude) moves these menus. Search \"projects\" on [Claude's help pages](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) for today's steps.",
        ] },
        { kind: "h3", text: "B. Make the project" },
        { kind: "list", ordered: true, items: [
          "Click **New project** (on some accounts it says **Create project**). It is near the top right of the Projects page. A box opens.",
          "In the name box, type **Brand Brain**.",
          "In the description box, type one line about your business. Use the example below.",
          "Click **Create project**. The project page opens. You will see a chat box in the middle, and **Instructions** and **Files** on the right side.",
        ] },
        { kind: "example", label: "What you type in the description", text: "Everything about [business name]: Brand Kit, Voice Rules and Brand DNA." },
        { kind: "result", label: "What you should see", lines: [
          "A project page with the title Brand Brain at the top.",
          "Your one-line description under the title.",
          "A Files area on the right that is still empty. You fill it in steps 02, 03 and 04.",
        ] },
        { kind: "tip", text: "**On some accounts, Files is called Project knowledge.** It is the same place. Keep the project open. In each of the next three steps, you add one file to it." },
      ] },
      { num: "02", title: "Build your Brand Kit", accent: "What you look like.", blocks: [
        { kind: "p", text: "Your Brand Kit file tells Claude what your business looks like: logo, colours and fonts. Do A if you already have a brand. Do B if you don't." },
        { kind: "h3", text: "A. If you already have a brand: upload it" },
        { kind: "list", ordered: true, items: [
          "On the project page, find **Files** on the right side.",
          "Click the **+** button next to **Files**. A small menu opens.",
          "Click **Upload from device**. A window opens with the files on your computer.",
          "Pick your logo file, your brand guidelines PDF if you have one, and a document with your colour codes and font names. Click **Open**.",
          "You will see each file listed under **Files**.",
          "Go to step 03. You can skip B and C.",
        ] },
        { kind: "tip", text: "**Colour codes** are short codes like #1A2B3C that tell a computer the exact colour. You find them in your brand guidelines, or ask the person who made your logo." },
        { kind: "h3", text: "B. If you don't have a brand yet: let Claude design one" },
        { kind: "p", text: "Claude will design a full look for you (a design system: the logo idea, colours, fonts and how they are used)." },
        { kind: "list", ordered: true, items: [
          "On the project page, click in the chat box in the middle. This starts a chat inside the project.",
          "Copy the prompt below and paste it in the chat box.",
          "Change [what you sell + who it is for] to your business, for example \"bookkeeping for small cafes\".",
          "Press Enter. Claude asks you 5 questions first.",
          "Answer each one in a sentence or two.",
        ] },
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
        { kind: "p", text: "Read what Claude makes. Tell it about anything that doesn't feel like you, for example: \"The colours are too dark. Make them warmer.\" Press Enter. Repeat until you are happy." },
        { kind: "h3", text: "C. Turn it into a file and save it" },
        { kind: "list", ordered: true, items: [
          "In the same chat, paste the prompt below and press Enter.",
        ] },
        { kind: "prompt", label: "Turn it into a Brand Kit file", text: "Turn the final design system into one document called Brand Kit that I can save to this project." },
        { kind: "list", ordered: true, items: [
          "Claude writes the document. On many screens it opens in a panel on the right.",
          "Look for **Add to project** on that panel (on some accounts it is under the three dots **...**). Click it. The file appears under **Files**.",
          "No **Add to project** button? Copy the whole document. Go back to the project page. Click the **+** next to **Files**, then **Add text content**. Type the title **Brand Kit**, paste the text and click **Add** or **Save**.",
          "Can't find these buttons? Search \"project knowledge\" on [Claude's help pages](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects).",
        ] },
        { kind: "result", label: "What you should see", lines: [
          "A file called Brand Kit under Files on the project page.",
        ] },
      ] },
      { num: "03", title: "Build your Voice Rules", accent: "How you sound.", blocks: [
        { kind: "p", text: "Voice Rules stop Claude sounding like any other AI. They make it sound like you. Claude reads your best writing and turns it into rules." },
        { kind: "h3", text: "A. Upload your writing" },
        { kind: "list", ordered: true, items: [
          "Pick 5 to 10 pieces of writing from your business: website pages, emails, newsletters, social posts, sales pages. More is better.",
          "Pick writing you are proud of. Claude copies what you give it. So leave out anything that doesn't sound like you.",
          "Take out client names and private details first.",
          "On the project page, click the **+** next to **Files**. Click **Upload from device** for files, or **Add text content** to paste text, like a post.",
          "Check each piece is listed under **Files**.",
        ] },
        { kind: "tip", text: "**No writing yet?** Record yourself talking about your business for two minutes on your phone. Get the transcript (the written-out words). Many phones and video call apps can make one. Add it with **Add text content** and run the same prompt." },
        { kind: "h3", text: "B. Ask Claude to write your Voice Rules" },
        { kind: "list", ordered: true, items: [
          "On the project page, click in the chat box to start a new chat inside the project.",
          "Copy the prompt below, paste it and press Enter. You don't need to change anything.",
        ] },
        { kind: "prompt", label: "Write my Voice Rules", text: `Read everything I have uploaded to this project.
Turn it into a Voice Rules document with these sections:

1. How we sound: 3 to 5 tone words, each with one sentence on what it means for us
2. Words and phrases we use often
3. Words and phrases we would never say
4. Sentence style: length, punctuation, emoji, capitals
5. Three short before-and-after examples: a plain sentence, then the same sentence in our voice

Only use what is in my writing. If something is unclear, ask me.` },
        { kind: "result", label: "What a good answer looks like", lines: [
          "1. How we sound: Warm. We talk to clients like a friend who knows the work.",
          "3. Never say: \"unlock\", \"game-changer\", \"leverage\"",
          "5. Before: \"We offer a range of services.\" After: \"[Your service], done for you, so you can [result].\"",
        ] },
        { kind: "h3", text: "C. Fix it and save it" },
        { kind: "list", ordered: true, items: [
          "Read every section. Is this really how you talk? Type any fix in the chat and press Enter.",
          "The \"never say\" list is the most useful part. Add every word you hate to see.",
          "When it is right, save it as a file called **Voice Rules**. Use the same way as step 02 C: **Add to project**, or **+** next to **Files** then **Add text content**.",
        ] },
        { kind: "contrast", items: [
          { label: "Too vague", text: "Never say: boring words", good: false },
          { label: "Clear", text: "Never say: \"unlock\", \"elevate\", \"in today's fast-paced world\"", good: true },
        ] },
      ] },
      { num: "04", title: "Write your Brand DNA", accent: "The step that matters most.", blocks: [
        { kind: "p", text: "The Brand DNA file is one page. It tells Claude who you sell to, what problem you solve and why you are different. You can fill it in yourself (A), or let Claude interview you (B)." },
        { kind: "h3", text: "A. Fill it in yourself" },
        { kind: "p", text: "Copy the 6 lines below into a new document. Fill in the brackets." },
        { kind: "table", head: ["#", "Section", "Fill in"], rows: [
          ["1", "Who we help", "We help [customer] who [situation]."],
          ["2", "The problem", "They struggle with [problem]."],
          ["3", "How we solve it", "We [what you do] so they [result]."],
          ["4", "Why we are different", "Unlike [others], we [difference]."],
          ["5", "Proof", "[numbers, results, reviews]"],
          ["6", "One line", "[Brand] helps [customer] get [result]."],
        ] },
        { kind: "list", items: [
          "Be exact about the customer. \"Busy cafe owners with one location\" is better than \"small businesses\".",
          "Write the problem in your customer's words, the way they would say it to a friend.",
          "For proof, use real numbers and real quotes only. If you are new, keep it short.",
        ] },
        { kind: "contrast", items: [
          { label: "Too wide", text: "We help small businesses grow.", good: false },
          { label: "Exact", text: "We help busy cafe owners with one location who [situation].", good: true },
        ] },
        { kind: "h3", text: "B. Stuck? Let Claude interview you" },
        { kind: "list", ordered: true, items: [
          "On the project page, click in the chat box to start a new chat inside the project.",
          "Copy the prompt below, paste it and press Enter.",
          "Answer the 10 questions one at a time. Claude then writes the page.",
        ] },
        { kind: "prompt", label: "Interview me for my Brand DNA", text: `Interview me to write my Brand DNA doc.
Ask one question at a time, 10 questions in total, covering:
who my customer is, what problem I solve, how I solve it,
what makes me different, and what proof I have.
Then write the doc using the six sections:
Who we help, The problem, How we solve it,
Why we are different, Proof, One line.` },
        { kind: "h3", text: "C. Check the proof, then save" },
        { kind: "list", ordered: true, items: [
          "Read the Proof section line by line.",
          "Every number, result and review must be one you gave it. If you don't recognise one, Claude made it up. Delete it.",
          "Save the page as a file called **Brand DNA**, the same way as step 02 C.",
          "Look under **Files**. You should now see 3 files: **Brand Kit**, **Voice Rules** and **Brand DNA**.",
        ] },
      ] },
      { num: "05", title: "Add project instructions", accent: "Paste once.", blocks: [
        { kind: "p", text: "Project instructions are rules Claude follows in every chat in this project. They make Claude check your three files every time, without you asking." },
        { kind: "list", ordered: true, items: [
          "On the project page, find **Instructions** on the right side.",
          "Click it, or click the pencil or **Set project instructions** next to it. A text box opens.",
          "Copy the instructions below and paste them in the box.",
          "Change [business name] to your business name.",
          "Click **Save instructions** (on some accounts just **Save**). The box closes and you see the start of your text under **Instructions**.",
          "Can't find **Instructions**? Anthropic moves these menus. Search \"project instructions\" on [Claude's help pages](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects).",
        ] },
        { kind: "prompt", label: "Project instructions", text: `You are the in-house brand team for [business name].
Before you write or design anything, read Brand Kit, Voice Rules and Brand DNA in this project.

Always:
- Use only the colours and fonts in Brand Kit
- Write in the voice set out in Voice Rules, and never use a word on the "never say" list
- Speak to the customer and the problem described in Brand DNA
- If a request is missing something you need, ask one question before you start

Never make up prices, results, reviews or claims. If you need a fact that is not in the project, ask me.` },
        { kind: "h3", text: "Test it" },
        { kind: "p", text: "Start a new chat inside the project. Type the question below and press Enter." },
        { kind: "example", label: "What you type", text: "Before we start: name my three brand files, and tell me in one line who my customer is." },
        { kind: "result", label: "What you should see", lines: [
          "Brand Kit, Voice Rules and Brand DNA.",
          "One line about your customer that matches your Brand DNA.",
          "If it can't name the files, check they are listed under Files on the project page.",
        ] },
      ] },
      { num: "06", title: "Start creating", accent: "Ask for what you need.", blocks: [
        { kind: "p", text: "Now use it. Claude reads your three files before it answers." },
        { kind: "list", ordered: true, items: [
          "Open the **Brand Brain** project. Always start inside the project, not from the main Claude page.",
          "Click in the chat box to start a new chat.",
          "Copy one of the requests below. Change the parts in [square brackets].",
          "Press Enter.",
        ] },
        { kind: "requests", items: [
          { want: "An ad", prompt: "Write 3 versions of a short ad for [product or offer]. Add one line on the idea behind each." },
          { want: "A landing page", prompt: "Build a landing page for [product]. Use our colours, fonts and voice. Include a headline, 3 benefits, proof and one call to action." },
          { want: "A social post", prompt: "Write an Instagram post about [topic] in our voice, with a first line that makes people stop and read." },
          { want: "An email", prompt: "Write a welcome email for new subscribers. Keep it under 150 words." },
          { want: "A second opinion", prompt: "Here is something I wrote: [paste]. Rewrite it so it matches our voice rules, and tell me what you changed." },
        ] },
        { kind: "h3", text: "Check it yourself" },
        { kind: "p", text: "Before you use anything, check it against your files. It takes 2 minutes." },
        { kind: "list", ordered: true, items: [
          "**Never-say words.** Open your Voice Rules file. Press **Ctrl + F** (Windows) or **Cmd + F** (Mac) on Claude's answer and search for each word on the list. If one lights up, ask Claude to remove it.",
          "**Facts.** Every price, result and review must be in your Brand DNA. If you don't recognise one, delete it.",
          "**Colours and fonts.** For a page or design, check the colour codes match your Brand Kit.",
          "**Customer.** Read the first line. Is it written to the customer in your Brand DNA?",
        ] },
        { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
          ["It sounds like any other AI", "The chat is outside the project", "Open the Brand Brain project and start the chat there"],
          ["A word from your never-say list", "The rule was missed", "Ask Claude to rewrite without it"],
          ["A result or review you don't know", "Claude made it up", "Delete it. Only use proof from Brand DNA"],
          ["Wrong colours", "Brand Kit has no colour codes, or it was not saved", "Check Brand Kit is under Files and lists your codes"],
        ] },
        { kind: "honest", text: "**When something doesn't match your brand,** say what is wrong (\"too formal\", \"we never say 'unlock'\"). Ask Claude to add that note to the Voice Rules file. Your Brand Brain gets better each time you correct it. Claude drafts. You still check every fact and decide what goes out with your name on it." },
      ] },
      { num: "07", title: "Keep it up to date", accent: "Small habits.", blocks: [
        { kind: "p", text: "Your Brand Brain is only as good as its three files. Keep them current with these habits." },
        { kind: "list", items: [
          "**When something changes** (new offer, new price, new customer): update Brand DNA the same day.",
          "**Once a month:** add your best new writing to the project. Ask Claude to update the Voice Rules.",
          "**When Claude gets it wrong twice:** put the fix in a file, not in the chat. Add the rule to Voice Rules or Brand Kit.",
          "**Keep the files short.** One to two pages each works better than a 40-page brand book.",
        ] },
        { kind: "h3", text: "How to update a file" },
        { kind: "list", ordered: true, items: [
          "Start a chat inside the project. Ask: \"Update Brand DNA: our new offer is [offer]. Give me the full new version.\"",
          "Check the new version.",
          "Save it as a new file with the same name, the same way as step 02 C.",
          "Under **Files**, find the old version. Click it, or hover over it, and click the bin icon or **Remove** to delete it. Then Claude only reads the new one.",
        ] },
      ] },
      { num: "✓", title: "Checklist", accent: "Tick as you go.", blocks: [
        { kind: "checklist", items: [
          "Project made and named Brand Brain, with a one-line description",
          "Brand Kit saved under Files, with your logo, colour codes and fonts",
          "Voice Rules saved under Files, with a never-say list you checked",
          "Brand DNA saved under Files, with only real proof in it",
          "Project instructions pasted in, and the test named all 3 files",
          "First ad, page or post made inside the project and checked against your files",
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
