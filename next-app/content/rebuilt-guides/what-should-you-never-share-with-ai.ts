import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-should-you-never-share-with-ai",
  lumailTag: "guide-what-not-to-share-with-ai",
  title: "Is It Safe to Put Client Information Into ChatGPT?",
  cover: "/images/mascot/warning.webp",
  coverAlt: "The blue robot mascot thinking beside a warning sign",
  seoDescription: "Is it safe to put client information into ChatGPT? Turn off training, swap names for brackets and write a one-page AI data policy to show clients.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Is It Safe to Put", accent: "Client Information Into ChatGPT?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/warning.webp",
    alt: "The blue robot mascot thinking beside a warning sign",
    line: "What you can paste, what you can't, and the one setting to turn off. Then a one-page policy to show your clients.",
  },
  intro: {
    heading: "Use AI on client work and keep your clients safe",
    lead: "Most of the risk comes from two things: one setting, and real names in your chats. This guide fixes both. Then you write a one-page policy that shows clients how you use AI.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Training turned off in every AI tool you use, plus a **Never / Ask first / Fine** table for what you paste",
        "A **swap routine**: client names, prices and dates swapped for brackets before you paste, and put back after",
        "A saved **task check** prompt that tells you if a job is safe for AI, without pasting real details",
        "**Your AI data policy**: one page about your business, in plain English, ready to show clients",
        "The policy on your website, in your proposals and in your welcome email",
      ] },
      { kind: "tip", text: "You need an account with the AI tool you use: ChatGPT, Claude, Gemini or Copilot. The free plans work. This guide is a simple safety check for small businesses, not legal advice. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your AI data policy.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch off training", accent: "One setting per tool.", blocks: [
      { kind: "p", text: "Most AI tools can learn from your chats unless you turn this off. Do it once in every tool you use. Do it before any client work goes in." },
      { kind: "table", head: ["Tool", "Where to find it", "Official help page"], rows: [
        ["ChatGPT", "Click your name or profile picture. Click **Settings**, then **Data Controls**. Turn off **Improve the model for everyone**.", "[OpenAI: data controls](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq)"],
        ["Claude", "Click your name. Click **Settings**, then **Privacy**. Turn off **Help improve our AI models** (personal Free, Pro and Max accounts).", "[Anthropic: privacy settings](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings)"],
        ["Gemini", "Open **Settings & help**, then **Activity**. Under **Keep Activity**, choose **Turn off**.", "[Google: Gemini activity](https://support.google.com/gemini/answer/13278892)"],
        ["Copilot", "On a personal account, click your profile, then your name, then **Privacy**. Turn off the training options.", "[Microsoft: Copilot privacy controls](https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls)"],
      ] },
      { kind: "tip", text: "Menu names change. Can't find the setting? Open the official help page for your tool and follow the steps there. On a work or team account, the person who runs it may control these settings. Ask them what is turned on." },
      { kind: "p", text: "Turning off training does not make a chat private. The company can still keep it. So follow these rules every time you paste something in." },
      { kind: "table", head: ["Never paste", "Ask first", "Fine to paste"], rows: [
        ["Passwords, logins, card and bank details", "A client's emails, files or documents", "Your own notes, with names taken out"],
        ["Health or personal details about anyone", "Contracts and proposals with names or prices", "Your website, sales page and public posts"],
        ["Anything you signed to keep secret (an NDA)", "Details about your freelancers or team", "Made-up examples"],
        ["Client lists with contact details", "Money figures from a client's business", "Questions about how to do a task"],
      ] },
      { kind: "p", text: "**Ask first** means ask the client before it goes into any AI tool. Or check your contract with them." },
    ] },
    { num: "02", title: "Learn the swap routine", accent: "Real details out, brackets in.", blocks: [
      { kind: "p", text: "The swap routine lets AI help with client work. The AI never sees who the client is. You do it in a blank document first, before anything goes into the chat." },
      { kind: "list", ordered: true, items: [
        "Open a blank document (Google Docs, Word or your notes app). Do not paste into the AI yet.",
        "Paste the text you want help with into the blank document.",
        "Swap every name for a bracket: **[client]**, **[client company]**, **[contact]**. Swap prices for **[price]**, dates for **[date]** and places for **[city]**.",
        "If there are several, number them: **[client 1]**, **[client 2]**, **[price A]**.",
        "Make a separate note that never goes into the AI. This is your key. Write **[client] = the real name**, **[price] = the real figure**.",
        "Read the document again. Delete anything that could still show who the client is, like a website, an email address or a project name.",
        "Now paste the bracket version into the AI.",
        "When the answer comes back, copy it into your document. Use your key to put the real details back.",
      ] },
      { kind: "h3", text: "Example" },
      { kind: "table", head: ["Before (do not paste this)", "After (safe to paste)"], rows: [
        ["Hi Sarah, following our call on 4 March, here is the proposal for Brightside Dental at $3,200.", "Hi [contact], following our call on [date], here is the proposal for [client company] at [price]."],
        ["The launch in Leeds is planned for the week of 12 May.", "The launch in [city] is planned for the week of [date 2]."],
      ] },
      { kind: "p", text: "The names and figures in this example are made up." },
      { kind: "tip", text: "**Too slow?** Ask the AI to use brackets from the start: \"Write a follow-up email to [contact] about [project]. Use brackets for every name, price and date.\" Then fill them in yourself." },
    ] },
    { num: "03", title: "Check a task first", accent: "Describe it, don't paste it.", blocks: [
      { kind: "p", text: "Before you give a new kind of job to AI, check what details it needs. You only describe the kinds of details. Nothing real goes in." },
      { kind: "prompt", label: "Check if this task is safe for AI", text: `I run a small business that sells [what you sell] to [who your clients are].
I want to use AI for this task: [describe the task, for example "turn my call notes into a proposal"].

The material has these kinds of details (I am describing them, not pasting them):
[for example: client name, company name, prices, project dates, notes about their team]

Give me a table with these columns:
Kind of detail | Risk if it is shared (low, medium, high) | What to do (paste as it is, replace with a bracket, or leave out)

Then tell me in two sentences whether this task is safe to do with AI after the swaps, and what I should check with the client first.

Do not ask me to paste any real details. If you need more details, ask me to describe them.` },
      { kind: "p", text: "Follow the table. Anything marked **leave out** stays out, even with brackets. Not sure about something? Put it in the **Ask first** column from step 01." },
      { kind: "tip", text: "Save this prompt in your notes. Run it each time you start using AI for a new kind of job." },
    ] },
    { num: "04", title: "Write your AI data policy", accent: "One page, in your words.", blocks: [
      { kind: "p", text: "Clients are starting to ask how you use AI. A one-page policy answers them before they ask. It also reminds you of your own rules." },
      { kind: "p", text: "Start a new chat and paste this prompt. Answer each question in a sentence or two." },
      { kind: "prompt", label: "Interview me for my AI data policy", text: `Interview me to write a one-page AI data policy for my business.

Ask me these one at a time and wait for each answer:
1. What is my business name, and what do I sell?
2. Which AI tools do I use, and for which jobs (for example writing emails, summarising notes, first drafts of proposals)?
3. What do I never put into AI tools?
4. How do I handle client details before they go into AI (for example, replacing names with brackets)?
5. Have I turned off training in the tools I use?
6. Does a person always check AI work before it reaches a client?
7. Who should a client contact with questions, and how?

Then write the policy with these sections:
1. How we use AI (2 to 3 sentences)
2. What never goes into AI tools (a short list)
3. How we handle your details (3 to 5 short points)
4. A person checks everything (1 to 2 sentences)
5. Questions (who to contact)

Rules:
- Use only what I tell you. Write [CHECK] where information is missing instead of guessing.
- Never promise anything I have not told you I do.
- Plain English, short sentences, no legal language, no em dashes.
- Under 400 words.` },
      { kind: "p", text: "Read it slowly. Delete any line that is not true for you today. A promise you don't keep is worse than no policy." },
      { kind: "honest", text: "**The honest part:** this is a simple safety check, not legal advice. Do you work in health, money or law? Do your client contracts have rules about data? Then ask a qualified adviser to read your policy before you publish it." },
    ] },
    { num: "05", title: "Put the policy to work", accent: "Where clients will see it.", blocks: [
      { kind: "p", text: "A policy only helps if clients can find it. Put it in three places." },
      { kind: "list", ordered: true, items: [
        "**Your website:** add a page called **How we use AI**. Link to it at the bottom of your site, next to your privacy policy.",
        "**Your proposals:** add one line near the end. For example: \"We use AI tools to help with drafts. We handle your details as our AI data policy says: [link].\"",
        "**Your welcome email:** add the same line and link to the email new clients get when they sign.",
      ] },
      { kind: "p", text: "Then set a reminder in your calendar. Read the policy every 6 months, or when you start using a new AI tool." },
      { kind: "tip", text: "**A client asks you not to use AI on their work?** Write it in your client file. Keep their work out of every AI tool. Your policy can say you will always respect that." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Training turned off in every AI tool you use",
        "Never / Ask first / Fine table saved in your notes",
        "Swap routine used on one real piece of client work",
        "Task check prompt saved in your notes",
        "AI data policy written and checked line by line",
        "Policy added to your website, proposals and welcome email",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client details are safe.",
    accent: "Now check what AI writes.",
    body: "AI can get names, numbers and facts wrong. The next guide gives you a 2-minute check. Run it before anything reaches a client.",
    label: "Build your fact-check routine →",
    href: "/guides/catch-ai-making-things-up/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Check the training setting when you add a new AI tool. Use the swap routine on every piece of client work. Read your policy every 6 months.",
    finishLine: "You put the brackets in. You put the real details back.",
  },
};
