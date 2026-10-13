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
    line: "Record a task once. Get written steps someone else can follow.",
  },
  intro: {
    heading: "Stop being the only one who knows how",
    lead: "Here is the problem. You want help with a job, like sending invoices. But the steps are only in your head. So you explain it on a call, and next week they ask again. ChatGPT can write the steps for you. You record your screen while you do the job once. ChatGPT turns it into numbered steps, and someone new tests them.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A short video of you doing one job**, with no client details on screen",
        "**Written, numbered steps for that job**, with the real button names and what you should see after each click",
        "**Steps you checked against the video**, with every gap filled in",
        "**Proof someone new can follow them**, from one real test",
        "**A shared folder** where your assistant can find the steps and the video",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer that can record its screen. Any recent Mac or Windows computer can. Step 01 shows how.",
        "A ChatGPT account at [chatgpt.com](https://chatgpt.com). Uploading files is on most plans. If you see the **+** button next to the chat box, you can upload.",
        "One job you do often that takes under 5 minutes. For example, sending an invoice or adding a new client to your folders.",
        "A test client, or a client you are allowed to show on screen.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "screen recording steps.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Pick one job and record it", accent: "One job, start to finish.", blocks: [
      { kind: "p", text: "A good recording does most of the work. So pick the right job first, then get your screen ready." },
      { kind: "h3", text: "A. Pick the job" },
      { kind: "table", head: ["Good first jobs", "Leave for later"], rows: [
        ["Sending an invoice from your invoice app", "Jobs where you must decide, like pricing a project"],
        ["Adding a new client to your folders and CRM (the app where you keep your client list)", "Jobs that show bank or card details"],
        ["Booking a call from a new enquiry", "Jobs over 5 minutes: split them into parts first"],
        ["Uploading a finished file to a client folder", "Jobs that change every time"],
      ] },
      { kind: "h3", text: "B. Get your screen ready" },
      { kind: "list", ordered: true, items: [
        "Close every window you don't need: email, chat apps, other clients' files.",
        "Turn on Do Not Disturb, so no messages pop up. On a Mac, click the switches icon at the top right and choose **Focus**. On Windows, click the bell or the clock at the bottom right.",
        "Open a test client if you can. If not, pick a client you are allowed to show.",
        "Open the screen where the job starts.",
      ] },
      { kind: "h3", text: "C. Record on a Mac" },
      { kind: "list", ordered: true, items: [
        "Press **Shift + Command + 5** together. A small bar appears at the bottom of the screen.",
        "Click **Record Entire Screen** or **Record Selected Portion**.",
        "Click **Options** on that bar. Under Microphone, pick your microphone, so your voice is recorded too.",
        "Click **Record**. Do the job.",
        "To stop, click the small stop button in the menu bar at the top of the screen. The video saves to your desktop.",
      ] },
      { kind: "h3", text: "D. Record on Windows" },
      { kind: "list", ordered: true, items: [
        "Click **Start** and type **Snipping Tool**. Open it.",
        "Click the video camera icon. Then click **New**.",
        "Drag a box over the part of the screen you want. Turn on your microphone if you see the option. Click **Start**.",
        "Do the job. Click the stop button at the top when you finish. Then save the video.",
        "Another way: press **Win + Alt + R** to start and stop with Xbox Game Bar. It records one app window, not the whole screen. It saves to your Videos folder, under **Captures**.",
        "Can't find these? Apple and Microsoft change these menus. Search \"record my screen\" on [Apple Support](https://support.apple.com/) or [Microsoft Support](https://support.microsoft.com/).",
      ] },
      { kind: "h3", text: "E. While you record" },
      { kind: "list", items: [
        "**Say what you click and why.** For example: \"I pick the client from this list. The invoice must match their account.\"",
        "**Go a little slower** than usual.",
        "**Show the finished result** at the end, so it is clear what done looks like.",
        "**Keep it under 5 minutes.** Longer job? Record it in parts.",
      ] },
      { kind: "contrast", items: [
        { label: "Hard to use", text: "Click here, then here, and that's it.", good: false },
        { label: "Easy to use", text: "I click New invoice at the top. Now I pick the client from the list, because it fills in their address.", good: true },
      ] },
      { kind: "h3", text: "F. Watch it once" },
      { kind: "list", ordered: true, items: [
        "Open the video and watch it to the end.",
        "Look for any name, email or amount you should not share. If you see one, record again.",
        "Check you can hear your voice. If not, check the microphone setting and record again.",
      ] },
    ] },
    { num: "02", title: "Ask ChatGPT for the steps", accent: "Only what it can see and hear.", blocks: [
      { kind: "p", text: "Now ChatGPT writes the steps from your video. The prompt tells it to write only what it can see or hear. It must mark every gap instead of guessing." },
      { kind: "h3", text: "A. Upload the video" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and click **New chat** at the top left.",
        "Click the **+** button on the left of the chat box. On some screens it is a paperclip.",
        "Click **Add photos & files**. On some accounts it just says **Files**. A window opens with your computer's files.",
        "Find your video (on a Mac, look on the desktop). Click it, then click **Open**.",
        "You will see the video as a small card above the chat box. Wait until it stops loading.",
        "Can't find the **+** button? OpenAI moves these menus. Search \"upload files\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "h3", text: "B. Video not accepted? Use screenshots" },
      { kind: "list", ordered: true, items: [
        "Play your video. Pause it at each step.",
        "Take a screenshot. On a Mac press **Shift + Command + 4** and drag a box. On Windows press **Win + Shift + S**.",
        "Upload the screenshots in order, with the **+** button.",
        "In the chat box, type a few words for each screenshot: what you click and why.",
      ] },
      { kind: "h3", text: "C. Paste the prompt" },
      { kind: "p", text: "Copy the prompt below. Paste it in the same chat box, under the video. Change the 2 parts in [square brackets]. Press Enter." },
      { kind: "prompt", label: "Turn my recording into written steps", text: `I've attached a screen recording (or numbered screenshots) of me doing a task in my business.
Turn it into written steps for [who will use it, for example: my assistant who has never done this task], so they can [finished result, for example: send a client invoice] on their own.

First, tell me if you can really watch the video and hear the sound. If you can't, stop and ask me for screenshots of each step and what I say at each one.

Then write the steps with these sections:
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "I can see the video but I can't hear the sound. I've used what is on screen only.",
        "Purpose: Send the invoice on the day you deliver, so the client pays on time.",
        "3. Click **New invoice** at the top. You should see: a blank invoice form.",
        "4. Pick [client] from the Client list. You should see: their address fill in.",
        "5. [CHECK] The video moves too fast here. Which button did you click?",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the first line. Did ChatGPT say it can't watch the video? Then do part B and send the prompt again.",
        "Copy the steps into a new document. Name it after the job, for example **Steps: Send a client invoice**.",
      ] },
    ] },
    { num: "03", title: "Check the steps against the video", accent: "Every step, with the video open.", blocks: [
      { kind: "p", text: "ChatGPT can miss a click or mishear you. It can even add a step that sounds likely but never happened. So check each step against your video." },
      { kind: "list", ordered: true, items: [
        "Put the document and the video side by side on your screen.",
        "Play the video. Pause it after each click.",
        "Find that click in the steps. Is the button name the same as on screen? If not, fix it.",
        "Is there a step in the document you don't see in the video? Delete it, or mark it [CHECK].",
        "Is there a click in the video with no step? Add it, in the same style.",
        "Fill in every [CHECK] you can answer. Leave the rest for now.",
      ] },
      { kind: "h3", text: "Make sure all 5 parts are there" },
      { kind: "p", text: "Give every set of steps the same 5 parts. Then the person doing the job always knows where to look." },
      { kind: "table", head: ["Part", "What goes in it", "Example: sending a client invoice"], rows: [
        ["Purpose", "What the job is and why it matters", "Send the invoice the day you deliver, so payment is on time"],
        ["Before you start", "What must be open or ready", "Logged in to [invoicing app], project delivered, amount from the proposal"],
        ["Steps", "One action each, with \"You should see\"", "3. Click **New invoice**. You should see a blank invoice form"],
        ["Checks", "How to know it is done right", "Amount matches the proposal; due date set; sent to the right email"],
        ["Who to ask", "Who to contact when stuck", "[your name], by [email or message app]"],
      ] },
      { kind: "p", text: "A part missing? Type in the same ChatGPT chat: \"Add a [part] section using only what's in the recording. Write [CHECK] where you don't know.\"" },
      { kind: "tip", text: "**Too many steps?** Ask ChatGPT to group them under 2 or 3 short headings, like \"Create the invoice\" and \"Send and record it\". Tell it not to remove any steps." },
    ] },
    { num: "04", title: "Test it on someone new", accent: "The only real test.", blocks: [
      { kind: "p", text: "Written steps only work if someone new can follow them. Find out now, while you are there to help." },
      { kind: "list", ordered: true, items: [
        "Pick someone who has not seen the video. This can be a VA (virtual assistant, someone who helps you online), a freelancer, or a friend with a test account.",
        "Give them the document. Ask them to do the job using only the steps.",
        "Watch, but stay quiet. Only help if they are fully stuck.",
        "Each time they stop, ask a question or click the wrong thing, write it down. Add the step number.",
        "When they finish, check the result with the Checks section.",
      ] },
      { kind: "table", head: ["Step", "Where they got stuck", "What was missing"], rows: [
        ["[step number]", "[what happened]", "[the missing detail, for example: which client folder to use]"],
      ] },
      { kind: "tip", text: "**No one to test it on?** Follow the steps yourself a week later. Read only the document and do exactly what it says. You will find the gaps you filled from memory." },
    ] },
    { num: "05", title: "Fix the gaps and share it", accent: "Then it is ready to hand over.", blocks: [
      { kind: "h3", text: "A. Fix the gaps" },
      { kind: "list", ordered: true, items: [
        "Go back to the same ChatGPT chat from step 02. It still has your video.",
        "Copy the prompt below and paste it in the chat box.",
        "Paste your steps and your table from step 04 where the brackets say. Add the answers to any gaps you know. Press Enter.",
      ] },
      { kind: "prompt", label: "Fix my steps", text: `Here are my written steps:
[paste the steps]

Someone new tested them. Here is where they got stuck:
[paste your table from the test: step number, what happened, what was missing]

Fix only those steps. Add the missing details I give you, and write [CHECK] where I haven't given you the answer.
Change nothing else. Show me the full updated steps, then list what you changed.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "The full steps, with the fixed ones changed.",
        "Changed: Step 4 now says which client folder to use. Step 7: [CHECK] You didn't say who to email the invoice to.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the list of changes. Check nothing else moved.",
        "Fill in any new [CHECK] marks yourself.",
        "Paste the new steps into your document, over the old ones.",
      ] },
      { kind: "h3", text: "B. Share it" },
      { kind: "list", ordered: true, items: [
        "Make a shared folder called **How we do things**. Put it where you already work: Google Drive, Dropbox, OneDrive or Notion.",
        "Save the document there. Write the date you last checked it at the top.",
        "Save the video next to it. Then anyone can watch it if a step is unclear.",
        "Share the folder with your VA or freelancer. If a file shows client details, give them view-only access.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["ChatGPT says it can't open the video", "Your account or the file type isn't supported", "Use screenshots (step 02 B)"],
        ["Steps you never did", "ChatGPT guessed", "Delete them, then check the rest against the video"],
        ["Wrong button names", "The video was blurry or too fast", "Fix them by hand, or record that part again slower"],
        ["Lots of [CHECK] marks", "You didn't talk enough while recording", "Fill them in, or record again and say each click"],
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can miss a click or mishear you. It can't know reasons you did not say out loud. The video is the proof. The written steps are a first try. The test on someone new makes them real. You still decide who does the job, and you check the first few times they do it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "One job recorded: under 5 minutes, your voice on it, no client details on screen",
        "Written steps from ChatGPT, saved in a document named after the job",
        "Every step checked against the video, with all 5 parts in place",
        "Tested by someone new, with every place they got stuck written down",
        "Gaps fixed, every [CHECK] filled in",
        "Document and video saved in a shared folder",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your first job is written down.",
    accent: "Now track who does what.",
    body: "In the next guide, AI builds a client tracker in Excel. Every project, next step and invoice gets an owner and a due date.",
    label: "Make your client tracker →",
    href: "/guides/make-work-tracker-with-kimi/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Record one new job each week. Use the same 5 parts every time. Update the steps on the day the job changes.",
    finishLine: "Record it once. Stop being the only one who knows how.",
  },
};
