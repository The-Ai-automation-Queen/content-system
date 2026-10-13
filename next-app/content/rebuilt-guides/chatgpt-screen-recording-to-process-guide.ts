import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-screen-recording-to-process-guide",
  lumailTag: "guide-chatgpt-screen-recording-to-process-guide",
  title: "How to Turn a Screen Recording Into Step-by-Step Instructions With ChatGPT",
  cover: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
  coverAlt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
  seoDescription: "Turn a screen recording into step-by-step instructions with ChatGPT: record one task, get a written SOP, then test it with someone new.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Turn a Screen Recording Into Step-by-Step Instructions", accent: "With ChatGPT" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
    alt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
    line: "Record a task once and get instructions someone else can follow.",
  },
  intro: {
    heading: "Your first SOP, from one recording",
    lead: "The jobs only you know how to do are the ones you can't hand over. This guide records one of them, has ChatGPT turn the recording into an SOP (standard operating procedure: written steps for a task), then tests it on someone new so a VA or freelancer can follow it without calling you.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **clean screen recording** of one task, under 5 minutes, with no client details on screen",
        "A **recording-to-SOP prompt** you reuse for every task you record",
        "**Your first SOP**: purpose, before you start, numbered steps, checks and who to ask",
        "The SOP **tested by someone new**, with every sticking point fixed",
        "A **shared SOP folder** your VA or freelancer can open",
      ] },
      { kind: "tip", text: "You need a ChatGPT account and a computer that can record its screen (any recent Mac or Windows computer can). Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "screen recording SOP.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick and record one task", accent: "One task, start to finish.", blocks: [
      { kind: "p", text: "A good recording does most of the work. Pick a task you do often, that takes under 5 minutes, and that someone else could do if they had the steps." },
      { kind: "table", head: ["Good first tasks", "Leave for later"], rows: [
        ["Sending an invoice from your invoicing app", "Anything that needs your judgement, like pricing a project"],
        ["Adding a new client to your folders and CRM (client list app)", "Tasks that show bank or card details"],
        ["Scheduling a call from an enquiry", "Tasks longer than 5 minutes: split them first"],
        ["Uploading a finished file to a client folder", "Tasks that change every time"],
      ] },
      { kind: "h3", text: "Before you press record" },
      { kind: "list", ordered: true, items: [
        "Close every window you don't need: email, chat apps, other clients' files.",
        "Switch on Do Not Disturb so no messages pop up on screen.",
        "Use a test or demo client if you can. If not, pick a client whose details you are allowed to share, or blur them later.",
        "Open the screen where the task starts.",
      ] },
      { kind: "h3", text: "How to record" },
      { kind: "list", ordered: true, items: [
        "**On a Mac:** press **Shift+Command+5**. Choose **Record Entire Screen** or **Record Selected Portion**, open **Options** to turn on your microphone, then click **Record**. To stop, click the stop button in the menu bar. The video saves to your desktop.",
        "**On Windows (Snipping Tool):** open **Snipping Tool**, switch to the video camera icon, click **New**, choose the area and click **Start**. Turn on your microphone if you see the option.",
        "**On Windows (Xbox Game Bar):** press **Win+Alt+R** to start and stop. It records one app window, not the whole desktop, and saves to your Videos folder under **Captures**.",
        "If none of these work for you, search \"record my screen\" on [Apple Support](https://support.apple.com/) or [Microsoft Support](https://support.microsoft.com/).",
      ] },
      { kind: "h3", text: "While you record" },
      { kind: "list", items: [
        "**Talk as you go.** Say what you click and why: \"I pick the client from this list because the invoice must match their account.\"",
        "**Go at normal speed,** a little slower than usual.",
        "**Show the finished result** at the end, so it's clear what done looks like.",
        "**Keep it under 5 minutes.** Longer task? Record it in parts.",
      ] },
      { kind: "tip", text: "Watch the recording once before you upload it. If a name, email or amount is visible, record it again or cut that part out." },
    ] },
    { num: "02", title: "Turn it into steps", accent: "Only what it can see.", blocks: [
      { kind: "p", text: "Now ChatGPT drafts the steps from your recording. The prompt tells it to write only what it can see or hear, and to flag every gap." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and start a new chat.",
        "Click **+** (or the paperclip) next to the message box and choose **Add photos & files**. Pick your video.",
        "**If the video isn't accepted:** take a screenshot of each step instead (on a Mac **Shift+Command+4**, on Windows **Win+Shift+S**) and upload them in order. Paste a few lines of what you say at each step, too.",
        "Paste the prompt below and send.",
      ] },
      { kind: "prompt", label: "Turn my recording into an SOP", text: `I've attached a screen recording (or numbered screenshots) of me doing a task in my business.
Turn it into an SOP (written steps) for [who will use it, for example: my VA who has never done this task], so they can [finished result, for example: send a client invoice] on their own.

First, tell me if you can actually watch the video and hear the audio. If you can't, stop and ask me for screenshots of each step and what I say at each one.

Then write the SOP with these sections:
1. Purpose: what this task is and why it matters, in 2 sentences
2. Before you start: what must be open, logged in or ready
3. Steps: numbered, one action per step, using the exact button and menu names you can see. After each step add "You should see:" and what appears
4. Checks: 3 things to check before the task counts as done
5. Who to ask: write [CHECK: who to ask] for me to fill in

Rules:
- Write only steps you can see or hear in the recording. Never add steps you think are likely.
- Where something is unclear, cut off or too fast to see, write [CHECK] and say what is missing.
- Never invent names, prices, logins or dates. If one is visible, replace it with [client], [amount] or [date].
- Plain English, short sentences, no jargon.` },
      { kind: "p", text: "Read the draft while you watch your recording. Fill in every [CHECK] that you can, and correct any button names that are wrong." },
    ] },
    { num: "03", title: "Shape it into an SOP", accent: "The same 5 parts every time.", blocks: [
      { kind: "p", text: "Every SOP you write should have the same 5 parts, so your VA always knows where to look. Check the draft against this table." },
      { kind: "table", head: ["Part", "What goes in it", "Example: sending a client invoice"], rows: [
        ["Purpose", "What the task is and why it matters", "Send the invoice the day the project is delivered, so payment isn't delayed"],
        ["Before you start", "What must be open or ready", "Logged in to [invoicing app], project delivery confirmed, amount from the proposal"],
        ["Steps", "One action each, with \"You should see\"", "3. Click **New invoice**. You should see a blank invoice form"],
        ["Checks", "How to know it's done right", "Amount matches the proposal; due date set; sent to the right email"],
        ["Who to ask", "The person to contact when stuck", "[your name], by [email or message app]"],
      ] },
      { kind: "p", text: "If a part is missing, ask in the same chat: \"Add a [part] section using only what's in the recording. Write [CHECK] where you don't know.\"" },
      { kind: "tip", text: "**Too many steps?** Ask ChatGPT to group them under 2 or 3 short headings, like \"Create the invoice\" and \"Send and record it\". Don't let it remove steps." },
    ] },
    { num: "04", title: "Test it on someone new", accent: "The only real test.", blocks: [
      { kind: "p", text: "An SOP only works if someone who has never done the task can follow it. Find out now, while you're there to help." },
      { kind: "list", ordered: true, items: [
        "Give the SOP to someone who hasn't seen the recording: your VA, a freelancer, or a friend using a test account.",
        "Ask them to do the task using only the SOP. You watch, but don't help unless they're completely stuck.",
        "Every time they pause, ask a question or click the wrong thing, write it down with the step number.",
        "When they finish, check the result with the Checks section.",
      ] },
      { kind: "table", head: ["Step", "Where they got stuck", "What was missing"], rows: [
        ["[step number]", "[what happened]", "[the missing detail, for example: which client folder to use]"],
      ] },
      { kind: "tip", text: "**No one to test it on?** Follow it yourself a week later, reading only the SOP and doing exactly what it says. You'll spot the gaps you filled in from memory." },
    ] },
    { num: "05", title: "Fix it and share it", accent: "Then it's ready to hand over.", blocks: [
      { kind: "p", text: "Turn the sticking points from step 04 into fixes, then save the SOP where your team can find it." },
      { kind: "prompt", label: "Fix my SOP", text: `Here is my SOP:
[paste the SOP]

Someone new tested it. Here is where they got stuck:
[paste your table from the test: step number, what happened, what was missing]

Fix only those steps. Add the missing details I give you, and write [CHECK] where I haven't given you the answer.
Change nothing else. Show me the full updated SOP, then list what you changed.` },
      { kind: "list", ordered: true, items: [
        "Fill in any new [CHECK] marks yourself.",
        "Create a shared folder called **SOPs** in the place your team already uses (Google Drive, Dropbox, OneDrive or Notion).",
        "Save the SOP as a document named after the task, for example **SOP: Send a client invoice**. Add the date you last checked it at the top.",
        "Save the recording next to it, so anyone can watch it if a step is unclear.",
        "Share the folder with your VA or freelancer, with view access only for anything with client details.",
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can miss a click or mishear what you said, and it can't know the reasons you didn't say out loud. The recording is the evidence, the draft is a first version, and the test on someone new is what makes it an SOP. You still decide who does the task and check the first few times they do it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One task picked and recorded, under 5 minutes, no client details on screen",
        "SOP drafted with the recording-to-SOP prompt",
        "All 5 parts in place and every [CHECK] filled in",
        "Tested by someone new, sticking points written down",
        "Fixes made and SOP saved in a shared SOPs folder",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your first task is written down.",
    accent: "Now track who does what.",
    body: "The next guide has AI build a client tracker in Excel, so every project, next action and invoice has an owner and a due date.",
    label: "Make your client tracker →",
    href: "/guides/make-work-tracker-with-kimi/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Record one new task a week, use the same 5 parts every time, and update an SOP the day the task changes.",
    finishLine: "Record it once, and stop being the only one who knows how.",
  },
};
