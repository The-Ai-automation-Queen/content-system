import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "claude",
  lumailTag: "guide-claude",
  title: "How to Use Claude to Do My Admin",
  cover: "/images/mascot/planning.webp",
  coverAlt: "The blue robot mascot holding a calendar and a checklist",
  seoDescription: "Use Claude to do your admin: one Admin project for call notes to actions, questions about long documents and rough points into emails, with checks.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Use Claude", accent: "to Do My Admin" },
  hero: {
    kind: "pose",
    src: "/images/mascot/planning.webp",
    alt: "The blue robot mascot holding a calendar and a checklist",
    line: "Meeting notes, long documents and emails, one prompt each. Set up once in one Claude project.",
  },
  intro: {
    heading: "One project for the admin that eats your week",
    lead: "Client calls leave messy notes, contracts and reports arrive as long documents, and replies pile up in your inbox. Claude handles all three well, but only if you tell it the same rules every time. This guide saves those rules once, in a Claude project called Admin, then runs each job on your real work.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Claude set up safely, with your chats kept out of model training",
        "**Your Claude Admin project**: one place for all your admin chats",
        "**Admin instructions** that cover 3 jobs: call notes to actions, questions about a long document, rough points to email",
        "Each job run once on your real work, and checked by you",
        "A **correction prompt** for when one line is wrong",
      ] },
      { kind: "tip", text: "You need a Claude account. The free plan works for the 3 jobs; step 02 shows what to do if you don't see Projects. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get your",
    accent: "Claude Admin Project.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Set up Claude safely", accent: "Before anything goes in.", blocks: [
      { kind: "p", text: "Do this once. It keeps your client material out of model training and shows you what each admin job needs from you." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/) and sign in or create a free account.",
        "Click your name or initials (bottom left), then **Settings**.",
        "Open **Privacy** and switch off the setting that lets your chats be used to improve Claude (it may be called **Help improve Claude**).",
        "Menu names change. If you can't find it, search \"model training\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
      { kind: "p", text: "These are the 3 jobs you'll set up. Read them now, so you know what to collect for later steps." },
      { kind: "table", head: ["Job", "What you paste", "What you get", "What you check"], rows: [
        ["**1. Call notes to actions**", "Your rough notes from a client call", "Decisions, actions with owner and deadline, open questions", "Nothing suggested has become decided"],
        ["**2. Questions about a long document**", "A contract, proposal or report, plus your question", "The answer, with the exact quote and where it is", "The quote is really in the document"],
        ["**3. Rough points to email**", "Bullet points of what you want to say", "A short email in your tone", "No promise, date or price you didn't give"],
      ] },
      { kind: "tip", text: "Before you paste anything, remove card and bank details, passwords and personal information about anyone. Swap names for [client] where you can, and put the real ones back in the final version." },
    ] },
    { num: "02", title: "Create the Admin project", accent: "One home for your admin.", blocks: [
      { kind: "p", text: "A Claude project keeps its own instructions, and every chat you start inside it follows them. That way you write your admin rules once." },
      { kind: "list", ordered: true, items: [
        "In Claude, click **Projects** in the left sidebar.",
        "Click **New project** and name it **Admin**.",
        "In the description, write one line, for example: \"My admin: call notes, long documents and client emails.\"",
        "Leave it open. The next step writes its instructions.",
      ] },
      { kind: "tip", text: "**Don't see Projects?** It may not be on your plan, or the menu may have moved. Search \"projects\" on [Anthropic's help pages](https://support.anthropic.com/). If it isn't available, save the instructions from step 03 in your notes and paste them as the first message of any admin chat." },
    ] },
    { num: "03", title: "Write the Admin instructions", accent: "Three jobs, one set of rules.", blocks: [
      { kind: "p", text: "The instructions tell Claude how to do each of the 3 jobs and what it must never do. Let Claude write them from your answers." },
      { kind: "p", text: "Start a chat inside the Admin project and paste this prompt." },
      { kind: "prompt", label: "Write my Admin project instructions", text: `Write instructions for my Admin project. I run a small business: [one line on what you do and who you help].

Ask me these one at a time and wait for each answer:
1. How do I like emails to sound? (for example: warm and direct, short sentences)
2. How do I sign off my emails?
3. What do I never want to say or promise in writing?

Then write the instructions in 4 parts:

Job 1, call notes to actions: when I paste notes, give me Decisions, then an action table (Action | Owner | Deadline), then Open questions. Keep suggestions separate from decisions. Write "Not agreed" where an owner or deadline is missing.

Job 2, questions about a long document: answer only from the attached document. Quote the exact sentence used and give the page or section. If the document doesn't answer it, say so.

Job 3, rough points to email: turn my points into an email under 120 words, in my tone, with my sign-off.

Rules for every job: use only what I give you. Write [CHECK] where information is missing instead of guessing. Never invent names, prices, dates or promises. Plain English, no em dashes.

Keep the instructions under 2,000 characters, written as instructions to you.` },
      { kind: "p", text: "Read the instructions and fix anything that's off. Then save them:" },
      { kind: "list", ordered: true, items: [
        "In the Admin project, find **Instructions** (often on the right of the project page, or under the project's settings).",
        "Paste the instructions in and save.",
        "If you can't find it, search \"project instructions\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
    ] },
    { num: "04", title: "Run job 1 on real notes", accent: "Call notes to actions.", blocks: [
      { kind: "p", text: "Start with the job that comes up most: turning notes from a client call into a clear list of who does what." },
      { kind: "list", ordered: true, items: [
        "Find your notes from a recent client call. Swap names for brackets.",
        "Start a new chat inside the Admin project.",
        "Paste the prompt below with your notes.",
      ] },
      { kind: "prompt", label: "Job 1: call notes to actions", text: `Job 1. Here are my notes from a call with [client]:
[paste your notes]` },
      { kind: "p", text: "Here is an example, so you can see what a good answer looks like." },
      { kind: "table", head: ["Example notes (what you paste)", "What a good answer gives back"], rows: [
        ["\"[Client] wants to go ahead with the website rewrite. I'll send the revised proposal by [date]. They'll send the old brand files, no date given. Price for the extra pages not discussed yet. They mentioned launching in [month], but it's not fixed.\"", "**Decision:** go ahead with the website rewrite. **Actions:** I send the revised proposal, deadline [date] · [Client] sends the old brand files, deadline Not agreed. **Open questions:** price for the extra pages · launch date (suggested [month], not confirmed)."],
      ] },
      { kind: "p", text: "Check your real answer against your notes: every name and date must be in them, and nothing \"mentioned\" or \"suggested\" should appear as decided." },
    ] },
    { num: "05", title: "Run jobs 2 and 3", accent: "Documents and emails.", blocks: [
      { kind: "p", text: "Now try the other two jobs, each in a new chat inside the Admin project." },
      { kind: "h3", text: "Job 2: a question about a long document" },
      { kind: "list", ordered: true, items: [
        "Start a new chat in the Admin project.",
        "Attach a document with the **paperclip** icon (or the **+** button) under the message box: a contract, a proposal, a supplier's terms.",
        "Paste the prompt below with your question.",
      ] },
      { kind: "prompt", label: "Job 2: ask the document", text: `Job 2. My question about the attached document: [your question, for example "What is the notice period if I want to end this contract?"]
Quote the exact sentence you used and give the page or section.` },
      { kind: "p", text: "Find the quote in the document yourself. If you can't find it, don't use the answer." },
      { kind: "h3", text: "Job 3: rough points into an email" },
      { kind: "prompt", label: "Job 3: points to email", text: `Job 3. Write an email to [client] from these points:
[paste your rough points, for example: "thanks for the call, proposal coming by [date], need the brand files, happy to answer questions"]` },
      { kind: "p", text: "Before you send, check the email has no promise, date or price that wasn't in your points, and fill in every [CHECK]." },
    ] },
    { num: "06", title: "Fix one line", accent: "The correction prompt.", blocks: [
      { kind: "p", text: "When one line is wrong, don't start again. Fix that line in the same chat and keep the rest." },
      { kind: "prompt", label: "Correction prompt", text: `Correct this line: "[the wrong line]".
Use this information instead: [the right fact].
Keep everything else unchanged. If anything is still unclear, write [CHECK] instead of guessing.` },
      { kind: "tip", text: "**The same fix twice?** Add it to the Admin project's instructions as a new rule, so Claude gets it right next time." },
      { kind: "honest", text: "**The honest part:** Claude can still get a detail wrong, and it can sound sure while doing it. It drafts; you check the names, dates and anything that sounds decided against your notes or the document, and you decide what gets sent." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Model training switched off in Privacy settings",
        "Admin project created",
        "Admin instructions written and saved",
        "Job 1 run on real call notes and checked",
        "Job 2 run on a real document, quote found",
        "Job 3 email drafted and checked before sending",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude handles your admin.",
    accent: "Now find files in Gemini.",
    body: "If your documents live in Google Drive, the next guide shows how to get Gemini to find the right file when it says it can't.",
    label: "Fix Gemini and your Drive files →",
    href: "/guides/gemini-cannot-find-drive-file/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Use the Admin project for every call, document and reply this week, add every repeated fix to its instructions, and check names, dates and decisions before anything goes to a client.",
    finishLine: "Claude drafts the admin. You make the calls.",
  },
};
