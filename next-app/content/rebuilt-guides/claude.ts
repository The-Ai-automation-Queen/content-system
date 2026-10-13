import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "claude",
  lumailTag: "guide-claude",
  title: "How to Use Claude to Do My Admin",
  cover: "/images/mascot/planning.webp",
  coverAlt: "The blue robot mascot holding a calendar and a checklist",
  seoDescription: "Use Claude to do your admin: one Admin project turns call notes into actions, answers questions about long documents and writes emails.",
  tool: "Claude",
  minutes: 30,
  h1: { title: "How to Use Claude", accent: "to Do My Admin" },
  hero: {
    kind: "pose",
    src: "/images/mascot/planning.webp",
    alt: "The blue robot mascot holding a calendar and a checklist",
    line: "Call notes, long documents and emails. One prompt each, set up once in Claude.",
  },
  intro: {
    heading: "One project for the admin that eats your week",
    lead: "Client calls leave messy notes. Long contracts and reports arrive. Replies pile up in your inbox. Claude can help with all three, if you give it the same rules each time. In this guide you save those rules once, in a Claude project (a folder that keeps its own rules) called Admin. Then you try each job on your real work.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "Claude set up safely, so your chats are not used to train it",
        "**Your Claude Admin project**: one place for all your admin chats",
        "**Admin rules** for 3 jobs: call notes to actions, questions about a long document, rough points to email",
        "Each job tried once on your real work, and checked by you",
        "A **correction prompt** for when one line is wrong",
      ] },
      { kind: "tip", text: "You need a Claude account. The free plan works for the 3 jobs. Step 02 shows what to do if you don't see Projects. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get your",
    accent: "Claude Admin Project.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Set up Claude safely", accent: "Before anything goes in.", blocks: [
      { kind: "p", text: "Do this once. It stops Claude learning from your client work. It also shows what each job needs from you." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/). Sign in, or make a free account.",
        "Click your name or initials (bottom left), then **Settings**.",
        "Open **Privacy**. Turn off the setting that lets Claude learn from your chats. It may be called **Help improve Claude**.",
        "Menu names change. Can't find it? Search \"model training\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
      { kind: "p", text: "These are the 3 jobs you will set up. Read them now, so you know what to collect." },
      { kind: "table", head: ["Job", "What you paste", "What you get", "What you check"], rows: [
        ["**1. Call notes to actions**", "Your rough notes from a client call", "Decisions, actions with owner and deadline, open questions", "Nothing only suggested is shown as decided"],
        ["**2. Questions about a long document**", "A contract, proposal or report, plus your question", "The answer, with the exact quote and where it is", "The quote is really in the document"],
        ["**3. Rough points to email**", "Bullet points of what you want to say", "A short email that sounds like you", "No promise, date or price you didn't give"],
      ] },
      { kind: "tip", text: "Before you paste anything, take out card and bank details and passwords. Take out private details about any person. Change names to [client] where you can. Put the real names back at the end." },
    ] },
    { num: "02", title: "Create the Admin project", accent: "One home for your admin.", blocks: [
      { kind: "p", text: "A Claude project keeps its own rules. Every chat you start inside it follows them. So you write your admin rules only once." },
      { kind: "list", ordered: true, items: [
        "In Claude, click **Projects** in the left menu.",
        "Click **New project** and name it **Admin**.",
        "In the description, write one line. For example: \"My admin: call notes, long documents and client emails.\"",
        "Leave it open. In the next step you write its rules.",
      ] },
      { kind: "tip", text: "**Don't see Projects?** It may not be on your plan, or the menu may have moved. Search \"projects\" on [Anthropic's help pages](https://support.anthropic.com/). Still no Projects? Save the rules from step 03 in your notes. Paste them as the first message of any admin chat." },
    ] },
    { num: "03", title: "Write the Admin instructions", accent: "Three jobs, one set of rules.", blocks: [
      { kind: "p", text: "The rules tell Claude how to do each job. They also say what it must never do. Claude writes them from your answers." },
      { kind: "p", text: "Start a chat inside the Admin project. Paste this prompt." },
      { kind: "prompt", label: "Write my Admin project instructions", text: `Write instructions for my Admin project. I run a small business: [one line on what you do and who you help].

Ask me these one at a time and wait for each answer:
1. How do I like emails to sound? (for example: warm and direct, short sentences)
2. How do I sign off my emails?
3. What do I never want to say or promise in writing?

Then write the instructions in 4 parts:

Job 1, call notes to actions: when I paste notes, give me Decisions, then an action table (Action | Owner | Deadline), then Open questions. Keep suggestions separate from decisions. Write "Not agreed" where an owner or deadline is missing.

Job 2, questions about a long document: answer only from the attached document. Quote the exact sentence used and give the page or section. If the document doesn't answer it, say so.

Job 3, rough points to email: turn my points into an email under 120 words, in my tone, with my sign-off.

Rules for every job: use only what I give you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. Plain English, no em dashes.

Keep the instructions under 2,000 characters, written as instructions to you.` },
      { kind: "p", text: "Read the rules. Fix anything that is wrong. Then save them:" },
      { kind: "list", ordered: true, items: [
        "In the Admin project, find **Instructions**. It is often on the right of the project page, or in the project settings.",
        "Paste the rules in and save.",
        "Can't find it? Search \"project instructions\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
    ] },
    { num: "04", title: "Run job 1 on real notes", accent: "Call notes to actions.", blocks: [
      { kind: "p", text: "Start with the job you do most. Turn notes from a client call into a clear list of who does what." },
      { kind: "list", ordered: true, items: [
        "Find your notes from a recent client call. Change names to brackets.",
        "Start a new chat inside the Admin project.",
        "Paste the prompt below with your notes.",
      ] },
      { kind: "prompt", label: "Job 1: call notes to actions", text: `Job 1. Here are my notes from a call with [client]:
[paste your notes]` },
      { kind: "p", text: "Here is an example of a good answer." },
      { kind: "table", head: ["Example notes (what you paste)", "What a good answer gives back"], rows: [
        ["\"[Client] wants to go ahead with the website rewrite. I'll send the new proposal by [date]. They'll send the old brand files, no date given. Price for the extra pages not discussed yet. They said they might launch in [month], but it's not fixed.\"", "**Decision:** go ahead with the website rewrite. **Actions:** I send the new proposal, deadline [date] · [Client] sends the old brand files, deadline Not agreed. **Open questions:** price for the extra pages · launch date (suggested [month], not confirmed)."],
      ] },
      { kind: "p", text: "Check your real answer against your notes. Every name and date must be in your notes. Nothing that was only \"mentioned\" or \"suggested\" should show as decided." },
    ] },
    { num: "05", title: "Run jobs 2 and 3", accent: "Documents and emails.", blocks: [
      { kind: "p", text: "Now try the other two jobs. Use a new chat in the Admin project for each." },
      { kind: "h3", text: "Job 2: a question about a long document" },
      { kind: "list", ordered: true, items: [
        "Start a new chat in the Admin project.",
        "Attach a document with the **paperclip** icon (or the **+** button) under the message box. For example: a contract, a proposal, or a supplier's terms.",
        "Paste the prompt below with your question.",
      ] },
      { kind: "prompt", label: "Job 2: ask the document", text: `Job 2. My question about the attached document: [your question, for example "What is the notice period if I want to end this contract?"]
Quote the exact sentence you used and give the page or section.` },
      { kind: "p", text: "Find the quote in the document yourself. If you can't find it, don't use the answer." },
      { kind: "h3", text: "Job 3: rough points into an email" },
      { kind: "prompt", label: "Job 3: points to email", text: `Job 3. Write an email to [client] from these points:
[paste your rough points, for example: "thanks for the call, proposal coming by [date], need the brand files, happy to answer questions"]` },
      { kind: "p", text: "Before you send, check the email. It must have no promise, date or price that was not in your points. Fill in every [CHECK]." },
    ] },
    { num: "06", title: "Fix one line", accent: "The correction prompt.", blocks: [
      { kind: "p", text: "Is one line wrong? Don't start again. Fix that line in the same chat and keep the rest." },
      { kind: "prompt", label: "Correction prompt", text: `Correct this line: "[the wrong line]".
Use this information instead: [the right fact].
Keep everything else the same. If anything is still unclear, write [CHECK] instead of guessing.` },
      { kind: "tip", text: "**Same fix twice?** Add it to the Admin project's rules. Then Claude gets it right next time." },
      { kind: "honest", text: "**The honest part:** Claude can still get a detail wrong. It can sound sure when it is wrong. Claude writes the first version. You check names, dates and decisions against your notes or the document. You decide what gets sent." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Training on your chats turned off in Privacy settings",
        "Admin project made",
        "Admin rules written and saved",
        "Job 1 tried on real call notes and checked",
        "Job 2 tried on a real document, quote found",
        "Job 3 email written and checked before sending",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Claude handles your admin.",
    accent: "Now find files in Gemini.",
    body: "Are your documents in Google Drive? The next guide shows how to get Gemini to find the right file when it says it can't.",
    label: "Fix Gemini and your Drive files →",
    href: "/guides/gemini-cannot-find-drive-file/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Use the Admin project for every call, document and reply this week. Add each fix you repeat to its rules. Check names, dates and decisions before anything goes to a client.",
    finishLine: "Claude writes the admin. You decide.",
  },
};
