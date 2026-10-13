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
    line: "Call notes, long documents and client emails. Set up once in Claude, then one short prompt for each.",
  },
  intro: {
    heading: "Hand Claude the admin that eats your week",
    lead: "Here is the problem. You finish a client call with messy notes and no clear list of who does what. A long contract arrives and you need one answer from it. Then five replies wait in your inbox. Claude (an AI assistant made by Anthropic) can do the first draft of all three. You save your rules once, in a Claude project called Admin. Then each job takes one short prompt, and you check the result in a minute.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Claude set up safely**, so your client chats are not used to train it",
        "**One Admin project in Claude**, where every admin chat follows your rules",
        "**Call notes turned into a clear list** of decisions, actions with owners and deadlines, and open questions",
        "**Answers from long documents with the exact sentence**, so you can check them in seconds",
        "**Rough points turned into short emails** that sound like you, plus a quick way to fix one wrong line",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. These steps are for [claude.ai](https://claude.ai/).",
        "A Claude account. The free plan works for the 3 jobs. Projects may not be on every plan. Step 02 tells you what to do if you don't see them.",
        "3 pieces of real work from this week: notes from a client call, one long document (a contract, proposal or supplier's terms), and a reply you need to write.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Set up Claude safely", accent: "10 minutes, done once.", blocks: [
      { kind: "p", text: "Do this before you paste any client work. First you stop Claude learning from your chats. Then you get your 3 pieces of work ready." },
      { kind: "h3", text: "A. Sign in" },
      { kind: "list", ordered: true, items: [
        "Open [claude.ai](https://claude.ai/) in your browser.",
        "Sign in. No account yet? Click the sign up button and make a free account with your work email.",
        "You will see a chat box in the middle of the screen. That means you are in.",
      ] },
      { kind: "h3", text: "B. Switch off training on your chats" },
      { kind: "list", ordered: true, items: [
        "Look at the bottom left corner. Click your name or initials. A small menu opens.",
        "Click **Settings**. A settings page opens.",
        "Click **Privacy**.",
        "Find the switch that lets Claude learn from your chats. On some accounts it is called **Help improve Claude**.",
        "Click the switch so it turns off.",
        "Can't find **Privacy** or the switch? Anthropic moves these menus. Search \"model training\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
      { kind: "h3", text: "C. Know the 3 jobs" },
      { kind: "p", text: "These are the 3 jobs you set up in this guide. Read them now, so you know what to collect." },
      { kind: "table", head: ["Job", "What you paste", "What you get", "What you check"], rows: [
        ["**1. Call notes to actions**", "Your rough notes from a client call", "Decisions, actions with owner and deadline, open questions", "Nothing only suggested is shown as decided"],
        ["**2. Questions about a long document**", "A contract, proposal or report, plus your question", "The answer, with the exact sentence and where it is", "The sentence is really in the document"],
        ["**3. Rough points to email**", "Bullet points of what you want to say", "A short email that sounds like you", "No promise, date or price you didn't give"],
      ] },
      { kind: "h3", text: "D. Get your 3 pieces of work ready" },
      { kind: "list", ordered: true, items: [
        "Find your call notes, your long document and the email you need to reply to.",
        "Copy the call notes and the email into a note. You will clean the copy, not the original.",
        "Delete card and bank details, passwords, and personal details about anyone.",
        "Swap real names for [client]. Put the real names back yourself at the end.",
        "Is the long document private, like a contract with bank details? Pick a less private one for your first test.",
      ] },
      { kind: "contrast", items: [
        { label: "Don't paste", text: "Called Sarah Jones on 07700 900123, card ending 4421, wants to go ahead", good: false },
        { label: "Fine to paste", text: "Called [client], wants to go ahead with the website rewrite", good: true },
      ] },
    ] },
    { num: "02", title: "Create the Admin project", accent: "One home for your admin.", blocks: [
      { kind: "p", text: "A Claude project is a folder in Claude that keeps its own rules and files. Every chat you start inside it follows those rules. So you write your admin rules only once." },
      { kind: "list", ordered: true, items: [
        "Look at the menu on the left side of Claude. On a small window, click the menu button (top left) first.",
        "Click **Projects**. A page opens with your projects. It is empty if you have none yet.",
        "Click **New project**. On some accounts the button is called **Create project**. A form opens.",
        "In the name box, type **Admin**.",
        "In the description box, type one line. For example: \"My admin: call notes, long documents and client emails.\"",
        "Click **Create project**. You will see the Admin project page, with a chat box and a space for instructions and files.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["No **Projects** in the left menu", "The menu moved, or your plan may not have Projects", "Search \"projects\" on [Anthropic's help pages](https://support.anthropic.com/) for today's steps"],
        ["Still no Projects after checking", "Your plan doesn't include them", "Do step 03 anyway. Save the rules in a note. Paste them as the first message of any admin chat"],
      ] },
    ] },
    { num: "03", title: "Write the Admin rules", accent: "Three jobs, one set of rules.", blocks: [
      { kind: "p", text: "The rules tell Claude how to do each job. They also say what it must never do. Claude asks you 3 questions, then writes the rules for you." },
      { kind: "h3", text: "A. Let Claude interview you" },
      { kind: "list", ordered: true, items: [
        "On the Admin project page, click in the chat box. This starts a chat inside the project.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the part in [square brackets] to one line about your business. Press Enter.",
        "Claude asks one question at a time. Type your answer and press Enter. Do this for all 3 questions.",
      ] },
      { kind: "prompt", label: "Write my Admin project instructions", text: `Write instructions for my Admin project. I run a small business: [one line on what you do and who you help].

Ask me these one at a time and wait for each answer:
1. How do I like emails to sound? (for example: warm and direct, short sentences)
2. How do I sign off my emails?
3. What do I never want to say or promise in writing?

Then write the instructions in 4 parts:

Job 1, call notes to actions: when I paste notes, give me Decisions, then an action table (Action | Owner | Deadline), then Open questions. Keep suggestions separate from decisions. Write "Not agreed" where an owner or deadline is missing.

Job 2, questions about a long document: answer only from the attached document. Quote the exact sentence used and give the page or section. If the document doesn't answer it, say so.

Job 3, rough points to email: turn my points into an email under 120 words, in my tone, with my sign-off.

Rules for every job: use only what I give you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises. Plain English, no dashes between phrases.

Keep the instructions under 2,000 characters, written as instructions to you.` },
      { kind: "example", label: "Example answers", text: "1. Warm and direct, short sentences. 2. \"Speak soon, [your name]\". 3. Never promise a start date before the deposit is paid." },
      { kind: "list", ordered: true, items: [
        "Read the rules Claude writes. Check your 3 answers are in them, in your own words.",
        "Something wrong? Type the fix in the chat box, for example \"Change my sign-off to Best wishes\". Press Enter.",
        "When the rules are right, copy them. Select them with your mouse, then press **Ctrl + C** on Windows or **Cmd + C** on a Mac.",
      ] },
      { kind: "h3", text: "B. Save the rules in the project" },
      { kind: "list", ordered: true, items: [
        "Go back to the Admin project page. Click **Admin** at the top, or open it from **Projects** in the left menu.",
        "Look on the right side of the page for **Instructions**. On some accounts it says **Set project instructions**, or it is in the project settings.",
        "Click it. A box opens. Paste your rules.",
        "Click **Save**. The box closes. You now see your rules on the project page.",
        "Can't find it? Search \"project instructions\" on [Anthropic's help pages](https://support.anthropic.com/).",
      ] },
    ] },
    { num: "04", title: "Job 1: turn call notes into actions", accent: "Who does what, by when.", blocks: [
      { kind: "p", text: "Start with the job you do most. Claude turns notes from a client call into a clear list of who does what." },
      { kind: "list", ordered: true, items: [
        "Go to the Admin project page. Click in the chat box to start a new chat inside the project.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace [client] with a placeholder like [client 1]. Replace [paste your notes] with your clean notes from step 01. Press Enter.",
      ] },
      { kind: "prompt", label: "Job 1: call notes to actions", text: `Job 1. Here are my notes from a call with [client]:
[paste your notes]` },
      { kind: "example", label: "Example notes", text: "[Client] wants to go ahead with the website rewrite. I'll send the new proposal by [date]. They'll send the old brand files, no date given. Price for the extra pages not discussed yet. They said they might launch in [month], but it's not fixed." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "**Decisions:** go ahead with the website rewrite.",
        "**Actions:** Send the new proposal | Me | [date]. Send the old brand files | [Client] | Not agreed.",
        "**Open questions:** price for the extra pages. Launch date (suggested [month], not confirmed).",
      ] },
      { kind: "h3", text: "Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Put your notes next to Claude's answer.",
        "Look at each name and date in the answer. Find it in your notes. If it is not there, Claude made it up. Delete it.",
        "Read the **Decisions** list. Was each one really agreed on the call? Anything that was only \"suggested\" or \"maybe\" belongs in **Open questions**.",
        "Every action needs an owner and a deadline. Where it says **Not agreed**, ask the client.",
        "Copy the checked list into your notes or your task app.",
      ] },
      { kind: "contrast", items: [
        { label: "Wrong", text: "Decision: launch in [month].", note: "The client only said they might.", good: false },
        { label: "Right", text: "Open question: launch date (suggested [month], not confirmed).", good: true },
      ] },
    ] },
    { num: "05", title: "Job 2: ask a long document a question", accent: "The answer, with the exact sentence.", blocks: [
      { kind: "p", text: "Claude reads long documents well. It can copy the exact sentence it used, so you can check the answer in seconds." },
      { kind: "h3", text: "A. Attach the document" },
      { kind: "list", ordered: true, items: [
        "Go to the Admin project page and click in the chat box to start a new chat.",
        "Look under or next to the chat box. Click the **paperclip** icon, or the **+** button. A window opens with the files on your computer.",
        "Click your document, then click **Open**.",
        "You will see the file name as a small card in the chat box. That means Claude will read it.",
      ] },
      { kind: "h3", text: "B. Ask your question" },
      { kind: "list", ordered: true, items: [
        "Copy the prompt below and paste it in the chat box.",
        "Replace the part in [square brackets] with your question. Press Enter.",
      ] },
      { kind: "prompt", label: "Job 2: ask the document", text: `Job 2. My question about the attached document: [your question, for example "What is the notice period if I want to end this contract?"]
Quote the exact sentence you used and give the page or section.` },
      { kind: "example", label: "Example question", text: "What is the notice period if I want to end this contract?" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"Either party may end this agreement by giving 30 days' written notice.\"",
        "Section 9, Ending the agreement, page 4.",
        "Answer: you need to give 30 days' notice in writing.",
      ] },
      { kind: "h3", text: "C. Check the sentence is really there" },
      { kind: "list", ordered: true, items: [
        "Copy 4 or 5 words from the sentence Claude quoted.",
        "Open the document on your computer.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Paste the words and press Enter. The words light up in the document.",
        "Read the whole sentence and the lines around it. Does it say what Claude said?",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The words light up and say the same thing", "The answer is right", "Use it"],
        ["The words light up, but the lines around them change the meaning", "Claude took it out of context", "Use what the document says, not what Claude said"],
        ["Nothing lights up", "Claude made up the sentence", "Don't use the answer. Ask again, or read that part yourself"],
        ["Claude says the document doesn't answer it", "It did not guess", "Check the right file is attached, or look for another document"],
      ] },
    ] },
    { num: "06", title: "Job 3: turn rough points into an email", accent: "Then fix any wrong line.", blocks: [
      { kind: "p", text: "You know what you want to say, but not how to say it. Write rough points. Claude turns them into a short email in your tone." },
      { kind: "h3", text: "A. Write the email" },
      { kind: "list", ordered: true, items: [
        "Go to the Admin project page and click in the chat box to start a new chat.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace [client] and [paste your rough points] with your own. Press Enter.",
      ] },
      { kind: "prompt", label: "Job 3: points to email", text: `Job 3. Write an email to [client] from these points:
[paste your rough points, for example: "thanks for the call, proposal coming by [date], need the brand files, happy to answer questions"]` },
      { kind: "example", label: "Example points", text: "thanks for the call, proposal coming by [date], need the brand files, happy to answer questions" },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Hi [client],",
        "Thanks for the call today. I'll send you the new proposal by [date].",
        "Could you send me your old brand files when you have a moment? Then I can get started.",
        "If you have any questions in the meantime, just reply here.",
        "Speak soon, [your name]",
      ] },
      { kind: "h3", text: "B. Check it before you send" },
      { kind: "list", ordered: true, items: [
        "Put your rough points next to the email.",
        "Look for any date, price or promise in the email. Is each one in your points? If not, delete it.",
        "Fill in every [CHECK] yourself.",
        "Put the real client name back in place of [client].",
        "Read it out loud once. Does it sound like you? Then copy it into your email and send it yourself.",
      ] },
      { kind: "h3", text: "C. Fix one wrong line" },
      { kind: "p", text: "Is one line wrong, in any of the 3 jobs? Don't start again. Stay in the same chat, paste the prompt below, and change the two parts in [square brackets]." },
      { kind: "prompt", label: "Correction prompt", text: `Correct this line: "[the wrong line]".
Use this information instead: [the right fact].
Keep everything else the same. If anything is still unclear, write [CHECK] instead of guessing.` },
      { kind: "tip", text: "**Made the same fix twice?** Add it to the Admin project's rules (step 03, part B). Then Claude gets it right next time." },
      { kind: "honest", text: "**The honest part:** Claude can still get a detail wrong, and it can sound sure while it does. Claude writes the first version. You check names, dates and decisions against your notes or the document. You decide what gets sent, and you send it yourself." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Training on your chats switched off in Claude's Privacy settings",
        "Admin project made",
        "Admin rules written, checked and saved in the project",
        "One real set of call notes turned into actions and checked against your notes",
        "One real document question answered, and the sentence found with Ctrl + F (or Cmd + F)",
        "One real email written from your points, checked and sent by you",
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
