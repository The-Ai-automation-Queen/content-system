import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "stop-chatgpt-forgetting-context",
  lumailTag: "guide-stop-chatgpt-forgetting-context",
  title: "How to Stop Explaining My Business to ChatGPT Every Time",
  cover: "/images/mascot/lightbulb.webp",
  coverAlt: "The blue robot mascot celebrating under a lightbulb",
  seoDescription: "Stop explaining your business to ChatGPT every time: save a short brief and files in one Project per client or offer. Then test it with 2 chats.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Stop Explaining My Business", accent: "to ChatGPT Every Time" },
  hero: {
    kind: "pose",
    src: "/images/mascot/lightbulb.webp",
    alt: "The blue robot mascot celebrating under a lightbulb",
    line: "Save your client details once in a ChatGPT Project. Every new chat inside it already knows them.",
  },
  intro: {
    heading: "Explain each client once, not every day",
    lead: "Here is the problem. You open ChatGPT to write a client update. First you explain who the client is, what you are delivering and the deadline. Tomorrow you open a new chat and explain it all again. ChatGPT can keep those details for you in a Project (a folder in ChatGPT that keeps your chats, files and rules together). You write the details once, and every new chat in that Project starts with them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A clear rule for where to save details**: a new chat, a Project or your settings",
        "**One Project for your busiest client or offer**, set up and named",
        "**A short brief saved inside it**: who it is for, the goal, what you deliver, dates, tone and rules",
        "**Your 2 or 3 main files added**, with private details taken out",
        "**Proof that it remembers**, from a test with 2 new chats",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. These steps are for [chatgpt.com](https://chatgpt.com).",
        "A ChatGPT account. Projects may not be on every plan. If you don't see **New project** in step 02, the step tells you what to do instead.",
        "One real client or offer you work on every week, and its proposal or call notes.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Project Brief.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick the right place and the first client", accent: "10 minutes, no AI needed.", blocks: [
      { kind: "p", text: "ChatGPT has three places to keep details. Each one remembers something different. Pick the right one first, so you don't save details in the wrong place." },
      { kind: "h3", text: "A. Learn the three places" },
      { kind: "table", head: ["Place", "What it remembers", "Use it for"], rows: [
        ["**New chat**", "Only that chat. The next new chat knows nothing.", "Quick, one-time questions"],
        ["**Project**", "Its own rules and files, in every chat inside it", "One client or one offer, over many chats"],
        ["**Custom instructions** (a setting ChatGPT reads before every chat)", "A short note about you, in every chat", "Things true for all your work: your business, tone, rules"],
      ] },
      { kind: "p", text: "This guide is about Projects. They are for work you come back to again and again." },
      { kind: "h3", text: "B. Pick your first client or offer" },
      { kind: "list", ordered: true, items: [
        "Open a note on your phone or computer.",
        "Write down every client or offer you will work on again this month.",
        "Put a star next to the one you explain to ChatGPT most often. That is your first Project.",
      ] },
      { kind: "example", label: "What you write down", text: "[Client 1] website rewrite *. [Client 2] monthly newsletter. [Offer name] launch in [month]." },
      { kind: "h3", text: "C. Collect and clean the files" },
      { kind: "list", ordered: true, items: [
        "For your starred client, find 2 or 3 files: the proposal, call notes, and the list of what you'll deliver.",
        "Save a copy of each one. You will clean the copy, not the original.",
        "Open each copy. Delete card and bank details, passwords, and personal details about anyone.",
        "Swap real names for [client] where you can.",
        "Put the clean copies in one folder on your computer. You upload them in step 04.",
      ] },
      { kind: "contrast", items: [
        { label: "Don't upload", text: "Invoice with the client's bank details, home address and phone number", good: false },
        { label: "Fine to upload", text: "Proposal with [client] in place of the name, and the prices you quoted", good: true },
      ] },
    ] },
    { num: "02", title: "Make the Project", accent: "One per client or offer.", blocks: [
      { kind: "p", text: "The Project holds everything. Every chat you start inside it uses what you add." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "Look at the sidebar on the left. On a small window, click the menu button (top left) first to open it.",
        "Click **New project**. On some accounts you first click **Projects**, then **New project**. A small box opens.",
        "Type a name for the Project. Name it after the client or offer, for example **[Client] website rewrite** or **[Offer name] launch**.",
        "Click **Create project**. You will see an empty page with the Project name at the top and a chat box.",
        "Leave this page open. The next two steps add the brief and the files.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["No **New project** or **Projects** in the sidebar", "The menu moved, or your plan may not have Projects", "Search \"projects\" on [OpenAI's help pages](https://help.openai.com/) for today's steps"],
        ["Still no Projects after checking", "Your plan doesn't include them", "Do step 03 anyway. Save the brief in a note. Paste it as the first message of each chat about that client"],
        ["You made the Project in the wrong account", "You have more than one ChatGPT account", "Click your name or picture, check the email, and switch account"],
      ] },
    ] },
    { num: "03", title: "Write the Project brief", accent: "Everything you keep repeating.", blocks: [
      { kind: "p", text: "The brief holds the facts you keep explaining. ChatGPT asks you questions, so you don't miss anything." },
      { kind: "h3", text: "A. Let ChatGPT interview you" },
      { kind: "list", ordered: true, items: [
        "On the Project page, click in the chat box. This starts a chat inside the Project.",
        "Copy the prompt below and paste it in the chat box. Press Enter.",
        "ChatGPT asks one question. Type your answer in a sentence or two. Press Enter.",
        "Keep going until it has asked all 6 questions and written the brief.",
      ] },
      { kind: "prompt", label: "Interview me for my Project brief", text: `Interview me to write a Project brief for one client or offer.

Ask me these one at a time and wait for each answer:
1. Who is this for? (Use [client] instead of a real name if I prefer.)
2. What is the goal: what does a good result look like for them?
3. What am I delivering, exactly?
4. What are the deadlines? (I'll give dates as [date] if they aren't fixed yet.)
5. What tone should everything have?
6. What are the rules: things to always do, things to never say or promise?

Then write the brief with these sections:
Who it's for | Goal | Deliverables | Deadlines | Tone | Rules

Keep it under 1,500 characters.
Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never make up names, prices, dates or promises.
End the brief with this line: "If something you need is not in this brief or the files, ask me before you write."` },
      { kind: "example", label: "Example answer to question 3", text: "A new home page and 4 service pages, written and ready to add to their website." },
      { kind: "result", label: "What a good brief looks like", lines: [
        "**Who it's for:** [client], a small accounting firm.",
        "**Goal:** a website that explains their services clearly and brings in enquiries.",
        "**Deliverables:** new home page and 4 service pages.",
        "**Deadlines:** first draft by [date]. Launch date [CHECK].",
        "**Tone:** warm, plain English, no jargon.",
        "**Rules:** never promise a launch date. Never mention prices on the website.",
        "If something you need is not in this brief or the files, ask me before you write.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the brief line by line. Is every fact right?",
        "Fill in every [CHECK] yourself, or leave it as [CHECK] if you don't know yet.",
        "Copy the whole brief. Select it with your mouse, then press **Ctrl + C** on Windows or **Cmd + C** on a Mac.",
      ] },
      { kind: "h3", text: "B. Save the brief as the Project's rules" },
      { kind: "list", ordered: true, items: [
        "Go to the Project page. Click the Project name at the top, or the three dots next to it.",
        "Click **Project settings**. On some accounts you see **Instructions** or **Add instructions** on the Project page instead.",
        "Click in the instructions box and paste the brief.",
        "Click **Save**. The box closes and you are back on the Project page.",
        "Can't find it? OpenAI moves these menus. Search \"project instructions\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
    ] },
    { num: "04", title: "Add your files", accent: "The proposal and the notes.", blocks: [
      { kind: "p", text: "Files give ChatGPT the details the brief leaves out. For example, what you offered and what you agreed on the call." },
      { kind: "list", ordered: true, items: [
        "Go to the Project page.",
        "Click **Add files**. On some screens it is a paperclip or a **+** button. A window opens with the files on your computer.",
        "Go to the folder of clean copies from step 01. Click a file, then click **Open**.",
        "You will see the file name appear on the Project page. That means it was added.",
        "Add the other 1 or 2 files the same way.",
      ] },
      { kind: "tip", text: "**Give each file a clear name before you upload it**, like **Proposal** or **Kick-off call notes**. A few clear files work better than many. **Can't upload files?** Paste the main parts into the brief instead, under a heading like \"From the proposal\"." },
    ] },
    { num: "05", title: "Test it with 2 new chats", accent: "Proof it remembers.", blocks: [
      { kind: "p", text: "A Project only helps if a new chat inside it uses the brief. This test checks that." },
      { kind: "h3", text: "A. Test chat 1: write something" },
      { kind: "list", ordered: true, items: [
        "On the Project page, click in the chat box to start a new chat inside the Project.",
        "Check the Project name shows at the top. If it doesn't, you are in a normal chat. Go back to the Project page.",
        "Copy test 1 below, change [client], and paste it. Press Enter.",
      ] },
      { kind: "prompt", label: "Test chat 1", text: `Using only this Project's instructions and files, write a short update email to [client] about where the work stands.
Under 120 words. Use the tone in the brief.
Write [CHECK] where something isn't in the brief or files instead of guessing.` },
      { kind: "h3", text: "B. Test chat 2: ask what it knows" },
      { kind: "list", ordered: true, items: [
        "Go back to the Project page. Click in the chat box again to start a second new chat.",
        "Copy test 2 below and paste it. Don't explain anything else. Press Enter.",
      ] },
      { kind: "prompt", label: "Test chat 2 (a new chat in the same Project)", text: `Without me explaining anything, tell me in 5 bullets:
who this work is for, the goal, what I'm delivering, the next deadline, and one rule I gave you.
If any of these is missing from the Project, say "Not in the brief".` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "For: [client], a small accounting firm",
        "Goal: a clear website that brings in enquiries",
        "Delivering: new home page and 4 service pages",
        "Next deadline: first draft by [date]",
        "One rule: never promise a launch date",
      ] },
      { kind: "h3", text: "C. Check it yourself" },
      { kind: "list", ordered: true, items: [
        "Open your brief next to the two answers.",
        "Check the client, goal and deliverables match the brief.",
        "Check every date. Each date must be in the brief or a file. A date that is in neither was made up.",
        "Check for a price or promise that is not in your brief. Test 1 must not promise a launch date if your rules say not to.",
        "It passed if both chats got the facts right and made nothing up.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["It asks who the client is", "The chat is outside the Project, or the brief was not saved", "Check the Project name is at the top. Open Project settings and check the brief is there"],
        ["One fact keeps going missing", "It is buried in the middle of the brief", "Move that fact to the top of the brief"],
        ["It gives a date or price you never gave", "It made it up", "Add a rule to the brief: \"Never give a date or price that is not in this brief or the files\""],
        ["It uses details from another client", "Two clients are mixed in one Project", "Keep one client per Project. Move the other files out"],
      ] },
    ] },
    { num: "06", title: "One Project per client", accent: "Repeat, then keep it up to date.", blocks: [
      { kind: "p", text: "Now do the same for every active client or offer. Then you never explain them again." },
      { kind: "list", ordered: true, items: [
        "Go back to your list from step 01.",
        "For the next client, do steps 02 to 05 again.",
        "From now on, start every chat about that client inside its Project.",
        "Something changed, like a new date? Open Project settings and update the brief the same day.",
        "When the work ends, open the Project menu and archive or delete it. Then old details don't get mixed into new work.",
      ] },
      { kind: "honest", text: "**The honest part:** a Project keeps your rules, but not every answer will follow them. ChatGPT can still miss a detail. It can sound sure and still be wrong. It writes the first draft. You read every draft and decide what goes to a client." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "First client or offer picked, and 2 or 3 files cleaned of private details",
        "Project made and named after that client or offer",
        "Brief written, checked line by line and saved in the Project",
        "Clean files added to the Project",
        "2-chat test passed, with every date and fact checked against the brief",
        "One Project for each active client or offer",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "ChatGPT remembers your work.",
    accent: "Now make it get to the point.",
    body: "The next guide saves one set of length rules. Then every answer comes back short and useful.",
    label: "Make ChatGPT answers shorter →",
    href: "/guides/make-chatgpt-answers-shorter/",
  },
  conclusion: {
    heading: "Keep it up to date",
    paragraph: "Start every chat about a client inside its Project. Update the brief when something changes. Keep only the few files that matter. Close the Project when the work ends.",
    finishLine: "Explain it once. Then get on with the work.",
  },
};
