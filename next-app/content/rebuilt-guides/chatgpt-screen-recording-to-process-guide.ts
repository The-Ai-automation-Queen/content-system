import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-screen-recording-to-process-guide",
  lumailTag: "guide-chatgpt-screen-recording-to-process-guide",
  title: "How to Turn a Screen Recording Into Step-by-Step Instructions With ChatGPT",
  cover: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
  coverAlt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
  seoDescription: "Turn a screen recording into step-by-step instructions with ChatGPT: record one task, get written steps, then test them on someone new.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Turn a Screen Recording Into Step-by-Step Instructions", accent: "With ChatGPT" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
    alt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
    line: "Record a task once. Get steps someone else can follow.",
  },
  intro: {
    heading: "Your first SOP, from one recording",
    lead: "Some jobs only you know how to do. So you can't hand them over. In this guide you record one job, ChatGPT writes it up as an SOP (written steps for a task), and someone new tests it. Then a VA (virtual assistant) or freelancer can do it without calling you.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **clean screen recording** of one task: under 5 minutes, no client details on screen",
        "A **recording-to-SOP prompt** to use for every task you record",
        "**Your first SOP**: purpose, before you start, numbered steps, checks, who to ask",
        "The SOP **tested by someone new**, with every problem fixed",
        "A **shared SOP folder** your VA or freelancer can open",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. You also need a computer that can record its screen. Any recent Mac or Windows computer can. You can copy and paste every prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "screen recording SOP.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick and record one task", accent: "One task, start to finish.", blocks: [
      { kind: "p", text: "A good recording does most of the work. Pick a task you do often. It should take under 5 minutes. Someone else should be able to do it with the steps." },
      { kind: "table", head: ["Good first tasks", "Leave for later"], rows: [
        ["Sending an invoice from your invoice app", "Tasks where you must decide, like pricing a project"],
        ["Adding a new client to your folders and CRM (client list app)", "Tasks that show bank or card details"],
        ["Booking a call from a new enquiry", "Tasks over 5 minutes: split them first"],
        ["Uploading a finished file to a client folder", "Tasks that change every time"],
      ] },
      { kind: "h3", text: "Before you press record" },
      { kind: "list", ordered: true, items: [
        "Close every window you don't need: email, chat apps, other clients' files.",
        "Turn on Do Not Disturb, so no messages pop up.",
        "Use a test client if you can. If not, pick a client you are allowed to show. Or blur their details later.",
        "Open the screen where the task starts.",
      ] },
      { kind: "h3", text: "How to record" },
      { kind: "list", ordered: true, items: [
        "**On a Mac:** press **Shift+Command+5**. Choose **Record Entire Screen** or **Record Selected Portion**. Open **Options** to turn on your microphone. Click **Record**. To stop, click the stop button in the menu bar. The video saves to your desktop.",
        "**On Windows (Snipping Tool):** open **Snipping Tool**. Click the video camera icon, then **New**. Choose the area and click **Start**. Turn on your microphone if you see the option.",
        "**On Windows (Xbox Game Bar):** press **Win+Alt+R** to start and stop. It records one app window, not the whole screen. It saves to your Videos folder, under **Captures**.",
        "Stuck? Search \"record my screen\" on [Apple Support](https://support.apple.com/) or [Microsoft Support](https://support.microsoft.com/).",
      ] },
      { kind: "h3", text: "While you record" },
      { kind: "list", items: [
        "**Talk as you go.** Say what you click and why: \"I pick the client from this list. The invoice must match their account.\"",
        "**Go a little slower** than usual.",
        "**Show the finished result** at the end, so it is clear what done looks like.",
        "**Keep it under 5 minutes.** Longer task? Record it in parts.",
      ] },
      { kind: "tip", text: "Watch the recording once before you upload it. Can you see a name, email or amount? Record it again, or cut that part out." },
    ] },
    { num: "02", title: "Turn it into steps", accent: "Only what it can see.", blocks: [
      { kind: "p", text: "Now ChatGPT writes the steps from your recording. The prompt tells it to write only what it can see or hear. It must mark every gap." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and start a new chat.",
        "Click **+** (or the paperclip) next to the message box. Choose **Add photos & files** and pick your video.",
        "**Video not accepted?** Take a screenshot of each step instead. On a Mac press **Shift+Command+4**. On Windows press **Win+Shift+S**. Upload them in order. Also paste a few lines of what you say at each step.",
        "Paste the prompt below and send.",
      ] },
      { kind: "prompt", label: "Turn my recording into an SOP", text: `I've attached a screen recording (or numbered screenshots) of me doing a task in my business.
Turn it into an SOP (written steps) for [who will use it, for example: my VA who has never done this task], so they can [finished result, for example: send a client invoice] on their own.

First, tell me if you can really watch the video and hear the sound. If you can't, stop and ask me for screenshots of each step and what I say at each one.

Then write the SOP with these sections:
1. Purpose: what this task is and why it matters, in 2 sentences
2. Before you start: what must be open, logged in or ready
3. Steps: numbered, one action per step, using the exact button and menu names you can see. After each step add "You should see:" and what appears
4. Checks: 3 things to check before the task counts as done
5. Who to ask: write [CHECK: who to ask] for me to fill in

Rules:
- Write only steps you can see or hear in the recording. Never add steps you think are likely.
- Where something is unclear, cut off or too fast to see, write [CHECK] and say what is missing.
- Never make up names, prices, logins or dates. If one is visible, replace it with [client], [amount] or [date].
- Plain English, short sentences, no hard words.` },
      { kind: "p", text: "Read the steps while you watch your recording. Fill in every [CHECK] you can. Fix any button names that are wrong." },
    ] },
    { num: "03", title: "Shape it into an SOP", accent: "The same 5 parts every time.", blocks: [
      { kind: "p", text: "Give every SOP the same 5 parts. Then your VA always knows where to look. Check your SOP against this table." },
      { kind: "table", head: ["Part", "What goes in it", "Example: sending a client invoice"], rows: [
        ["Purpose", "What the task is and why it matters", "Send the invoice the day you deliver, so payment is on time"],
        ["Before you start", "What must be open or ready", "Logged in to [invoicing app], project delivered, amount from the proposal"],
        ["Steps", "One action each, with \"You should see\"", "3. Click **New invoice**. You should see a blank invoice form"],
        ["Checks", "How to know it is done right", "Amount matches the proposal; due date set; sent to the right email"],
        ["Who to ask", "Who to contact when stuck", "[your name], by [email or message app]"],
      ] },
      { kind: "p", text: "Is a part missing? Ask in the same chat: \"Add a [part] section using only what's in the recording. Write [CHECK] where you don't know.\"" },
      { kind: "tip", text: "**Too many steps?** Ask ChatGPT to group them under 2 or 3 short headings. For example: \"Create the invoice\" and \"Send and record it\". Don't let it remove steps." },
    ] },
    { num: "04", title: "Test it on someone new", accent: "The only real test.", blocks: [
      { kind: "p", text: "An SOP only works if someone new can follow it. Find out now, while you are there to help." },
      { kind: "list", ordered: true, items: [
        "Give the SOP to someone who has not seen the recording. This can be your VA, a freelancer, or a friend with a test account.",
        "Ask them to do the task using only the SOP. Watch, but only help if they are fully stuck.",
        "Each time they stop, ask a question or click the wrong thing, write it down. Add the step number.",
        "When they finish, check the result with the Checks section.",
      ] },
      { kind: "table", head: ["Step", "Where they got stuck", "What was missing"], rows: [
        ["[step number]", "[what happened]", "[the missing detail, for example: which client folder to use]"],
      ] },
      { kind: "tip", text: "**No one to test it on?** Follow it yourself a week later. Read only the SOP and do exactly what it says. You will find the gaps you filled from memory." },
    ] },
    { num: "05", title: "Fix it and share it", accent: "Then it's ready to hand over.", blocks: [
      { kind: "p", text: "Fix each problem from step 04. Then save the SOP where your team can find it." },
      { kind: "prompt", label: "Fix my SOP", text: `Here is my SOP:
[paste the SOP]

Someone new tested it. Here is where they got stuck:
[paste your table from the test: step number, what happened, what was missing]

Fix only those steps. Add the missing details I give you, and write [CHECK] where I haven't given you the answer.
Change nothing else. Show me the full updated SOP, then list what you changed.` },
      { kind: "list", ordered: true, items: [
        "Fill in any new [CHECK] marks yourself.",
        "Make a shared folder called **SOPs**. Put it where your team already works: Google Drive, Dropbox, OneDrive or Notion.",
        "Save the SOP as a document named after the task. For example: **SOP: Send a client invoice**. Put the date you last checked it at the top.",
        "Save the recording next to it. Then anyone can watch it if a step is unclear.",
        "Share the folder with your VA or freelancer. If a file has client details, let them view it only.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can miss a click or mishear you. It can't know reasons you did not say out loud. The recording is the proof. The written steps are a first try. The test on someone new makes it a real SOP. You still decide who does the task. Check the first few times they do it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One task recorded: under 5 minutes, no client details on screen",
        "SOP written with the recording-to-SOP prompt",
        "All 5 parts in place, every [CHECK] filled in",
        "Tested by someone new, problems written down",
        "Fixes made, SOP saved in a shared SOPs folder",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your first task is written down.",
    accent: "Now track who does what.",
    body: "In the next guide, AI builds a client tracker in Excel. Every project, next step and invoice gets an owner and a due date.",
    label: "Make your client tracker →",
    href: "/guides/make-work-tracker-with-kimi/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Record one new task each week. Use the same 5 parts every time. Update an SOP on the day the task changes.",
    finishLine: "Record it once. Stop being the only one who knows how.",
  },
};
