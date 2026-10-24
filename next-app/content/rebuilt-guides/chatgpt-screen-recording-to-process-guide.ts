import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "chatgpt-screen-recording-to-process-guide",
  lumailTag: "guide-chatgpt-screen-recording-to-process-guide",
  title: "How to Turn a Screen Recording Into Step-by-Step Instructions With ChatGPT",
  cover: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
  coverAlt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
  seoDescription: "Turn a screen recording into step-by-step instructions with ChatGPT. Record one job, get written steps, test them on someone new. 5 steps.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Turn a Screen Recording Into Step-by-Step Instructions", accent: "With ChatGPT" },
  hero: {
    kind: "scene",
    src: "/images/guides/chatgpt-screen-recording-to-process-guide.webp",
    alt: "The blue robot mascot feeding a film reel into a press that prints numbered instruction cards",
    line: "Record a job once. Get steps someone else can follow.",
  },
  intro: {
    heading: "Get steps someone else can follow",
    lead: "The steps for your jobs live only in your head. This guide turns one screen recording into written steps.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A short video** of you doing one job",
        "**Written, numbered steps** with the real button names",
        "**Steps tested** by someone new, with the gaps fixed",
        "**A shared folder** holding the steps and the video",
      ] },
      { kind: "tip", text: "You need a ChatGPT account that lets you upload files (look for the **+** next to the chat box). Copy each prompt as it is and change the [brackets]." },
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
    { num: "01", title: "Record one job", accent: "Keep it short.", blocks: [
      { kind: "p", text: "Pick a job you do often, like sending an invoice. Say each click out loud as you go." },
      { kind: "list", ordered: true, items: [
        "Close email, chat apps and other clients' files. Use a test client if you can.",
        "On a Mac, press **Shift + Command + 5**, click **Options**, pick your microphone, then click **Record**.",
        "On Windows, open **Snipping Tool**, click the video camera icon, then **New**, then **Start**.",
        "Do the job. Show the finished result. Then stop the recording.",
        "Watch it once. Any name, email or amount you should not share? Record again.",
      ] },
      { kind: "tip", text: "Can't find it? Search \"record my screen\" on [Apple Support](https://support.apple.com/) or [Microsoft Support](https://support.microsoft.com/)." },
    ] },
    { num: "02", title: "Ask ChatGPT for steps", accent: "Only what it sees.", blocks: [
      { kind: "p", text: "ChatGPT writes the steps from your video. It marks gaps instead of guessing." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Click **+**, then **Add photos & files**, and pick your video.",
        "Wait until it stops loading. Paste the prompt below and press Enter.",
      ] },
      { kind: "prompt", label: "Turn my recording into steps", text: `I've attached a screen recording of me doing a job in my business.
Turn it into written steps for [who will use it, for example: my assistant], so they can [finished result, for example: send a client invoice] on their own.

First, tell me if you can really watch the video and hear the sound. If you can't, stop and ask me for screenshots of each step.

Then write:
1. Purpose: what this job is and why it matters, in 2 sentences
2. Before you start: what must be open or ready
3. Steps: numbered, one action each, with the exact button names. After each, add "You should see:" and what appears
4. Checks: 3 things to check before it counts as done
5. Who to ask: write [CHECK: who to ask]

Use only what you can see or hear in the recording.
If something is unclear or missing, write [CHECK].
Never make up names, prices, dates or logins. Replace any you see with [client], [amount] or [date].
Plain English, short sentences.` },
      { kind: "p", text: "Copy the steps into a new document named after the job." },
      { kind: "tip", text: "Video not accepted? Upload screenshots of each step in order instead. Help: [OpenAI's help pages](https://help.openai.com/)." },
    ] },
    { num: "03", title: "Check against the video", accent: "Every click.", blocks: [
      { kind: "p", text: "ChatGPT can miss a click or add one that never happened. Your video is the proof." },
      { kind: "list", ordered: true, items: [
        "Put the document and the video side by side.",
        "Pause after each click. Fix any button name that does not match.",
        "Delete any step you do not see in the video.",
        "Add any click that has no step.",
        "Fill in every **[CHECK]** you can.",
      ] },
    ] },
    { num: "04", title: "Test it on someone new", accent: "The real test.", blocks: [
      { kind: "p", text: "Steps only work if someone new can follow them. Find out while you are there to help." },
      { kind: "list", ordered: true, items: [
        "Give the document to someone who has not seen the video.",
        "Ask them to do the job using only the steps. Stay quiet.",
        "Each time they get stuck, write down the step number and what was missing.",
      ] },
      { kind: "tip", text: "No one to test it? Follow the steps yourself a week later, reading only the document." },
    ] },
    { num: "05", title: "Fix the gaps and share", accent: "Ready to hand over.", blocks: [
      { kind: "p", text: "Go back to the same chat from step 02. It still has your video." },
      { kind: "prompt", label: "Fix my steps", text: `Here are my written steps:
[paste the steps]

Someone new tested them. Here is where they got stuck:
[step number, what happened, what was missing]

Fix only those steps. Use only what I give you. Write [CHECK] where I haven't given you the answer.
Change nothing else. Show me the full updated steps, then list what you changed.` },
      { kind: "list", ordered: true, items: [
        "Check the list of changes. Fill in any new **[CHECK]**.",
        "Make a shared folder called **How we do things** in Google Drive, Dropbox, OneDrive or Notion.",
        "Save the steps and the video there. Share it with your assistant.",
      ] },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "One job recorded, no client details on screen",
        "Written steps from ChatGPT, saved in a document",
        "Every step checked against the video",
        "Tested by someone new",
        "Gaps fixed and saved in a shared folder",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your first job is written down.",
    accent: "Now track who does what.",
    body: "In the next guide, AI builds a client tracker in Excel. Every task gets an owner and a due date.",
    label: "Make your client tracker →",
    href: "/guides/make-work-tracker-with-kimi/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Record one job. Check it against the video. Test it on someone new.",
    finishLine: "Record it once. Hand it over.",
  },
};
