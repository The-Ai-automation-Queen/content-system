import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "marketing-emails-that-sell",
  lumailTag: "guide-marketing-emails-that-sell",
  title: "How to Write Sales Emails With ChatGPT That Don't Sound Like AI",
  cover: "/images/guides/marketing-emails-that-sell.webp",
  coverAlt: "The blue robot mascot sending envelopes through a line of brass pipes",
  seoDescription: "Write sales emails with ChatGPT that don't sound like AI: write to one real client, collect your real proof, and draft a launch email in your voice.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Write Sales Emails With ChatGPT", accent: "That Don't Sound Like AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/marketing-emails-that-sell.webp",
    alt: "The blue robot mascot sending envelopes through a line of brass pipes",
    line: "Write to one real client. Show proof, not promises. ChatGPT writes the draft. You bring the client and the proof.",
  },
  intro: {
    heading: "Your sales email set, in your own voice",
    lead: "Most sales emails talk to everyone and make big promises. ChatGPT makes this worse when it starts from nothing. So first you give it three things: one real client, your real proof and your voice. Then it writes a launch email you are happy to sign.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **one-reader profile**: the one client you write to, in their own words",
        "A **proof bank**: your real results, client quotes and examples, in one place",
        "A **launch email** written from your profile, your proof and your voice",
        "**Subject lines** that say what is inside",
        "A **sounds-like-me check** to do before you send",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Claude works the same way. Did you write Voice Rules (a short list of how you write) in the [Brand Brain guide](/guides/brand-brain-guide/)? Have them ready. You can copy and paste every prompt below. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Sales Email Set.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 3 rules", accent: "Before you write a word.", blocks: [
      { kind: "p", text: "These three rules decide if people read a sales email. Every prompt in this guide follows them. *The examples are made up to show each rule.*" },
      { kind: "table", head: ["Rule", "Before", "After"], rows: [
        ["Write to one reader", "Dear all, we're excited to announce our new coaching package.", "You told me on our call that Sunday evenings are when the week's admin catches up with you. This is for that."],
        ["Say what's inside", "You won't believe this...", "New: 6 weekly coaching calls for freelance designers"],
        ["Show proof, not promises", "This will transform your business.", "A real client's words, with their permission: \"[quote]\""],
      ] },
      { kind: "list", ordered: true, items: [
        "Pick one offer. Pick one email you will send soon, like the first email of your next launch.",
        "Open a new document. Call it **Sales email set**. Save each part in it as you go.",
        "Read your last sales email. Which of the 3 rules does it break? Write it down. Watch for that one in step 04.",
      ] },
      { kind: "tip", text: "**No sales email to compare?** Use your last post or message about one of your services. The rules work the same way." },
    ] },
    { num: "02", title: "Choose one reader", accent: "One real client.", blocks: [
      { kind: "p", text: "An email to everyone sounds like an advert. An email to one person reads like a note. This prompt helps you describe that one person." },
      { kind: "list", ordered: true, items: [
        "Think of one real client who bought something like this offer, or should have.",
        "Open [ChatGPT](https://chatgpt.com). Start a new chat and paste the prompt below.",
        "Answer each question in a sentence or two. Write [client] instead of their name.",
      ] },
      { kind: "prompt", label: "Interview me for my one-reader profile", text: `Interview me to build a one-reader profile for my sales email.

The offer: [what you're selling, in one line]

Ask me these one at a time and wait for each answer:
1. Think of one real client who bought something like this, or should have. What is their work and situation? (I'll call them [client].)
2. What problem did they have before they came to me, in the words they used?
3. What had they already tried?
4. What nearly stopped them from buying: price, time, doubt, something else?
5. What changed for them afterwards, as they described it?

Then write the profile under these headings: Who they are, Their problem in their words, What they tried, What holds them back, What they want. Under 200 words.

Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent quotes.` },
      { kind: "p", text: "Read it. Fix anything that does not sound like your client. Save it in your Sales email set as **One-reader profile**." },
    ] },
    { num: "03", title: "Build your proof bank", accent: "Only what's real.", blocks: [
      { kind: "p", text: "Proof makes a reader believe you. ChatGPT can't make it up for you. So in this step you collect the proof you already have." },
      { kind: "list", ordered: true, items: [
        "Collect client quotes, reviews and happy messages. Add results you can show and examples of your work.",
        "Ask a client before you use their words with their name.",
        "Paste it all into the prompt below. Swap names for [client] where you don't have a yes yet.",
      ] },
      { kind: "prompt", label: "Build my proof bank", text: `Help me build a proof bank for my sales emails.

Here is everything I have: [paste testimonials, reviews, client messages, results, examples of work, qualifications].

Sort it into a table with these columns:
Proof (word for word) | Type (testimonial, result, example, qualification) | What it proves | Permission to use (yes, no, [CHECK])

Rules:
- Copy every quote word for word. Never shorten a quote in a way that changes its meaning.
- Use only what I give you. Never invent results, numbers, reviews or client names.
- After the table, list any claims I make that have nothing to back them up, under the heading [CHECK], so I can find proof or cut them.` },
      { kind: "p", text: "Save it as **Proof bank**. Is a line marked no or [CHECK]? Keep it out of your emails until you have a yes or proof." },
      { kind: "tip", text: "**Not much proof yet?** Email your last five clients. Ask for one sentence about what changed for them. Ask if you can use it with their name." },
    ] },
    { num: "04", title: "Draft the launch email", accent: "From your profile and proof.", blocks: [
      { kind: "p", text: "Now ChatGPT has what it needs: one reader, real proof and your voice. This prompt puts them together." },
      { kind: "list", ordered: true, items: [
        "**Do you have Voice Rules** from the [Brand Brain guide](/guides/brand-brain-guide/)? Paste them where the prompt asks for your voice.",
        "**No Voice Rules?** Paste two or three emails you wrote that sound like you.",
        "Paste the prompt in the same chat as your profile and proof bank. Or start a new chat and paste them in.",
      ] },
      { kind: "prompt", label: "Draft my launch email", text: `Write a launch email for my offer.

The offer: [what it is, what's included, when it opens, the price]
The one reader: [paste your one-reader profile]
The proof: [paste 1 or 2 items from your proof bank marked yes]
My voice: [paste your Voice Rules, or 2 to 3 emails I wrote]
What I want the reader to do: [for example, book a call]

Rules:
- Write to that one reader, using "you". Under 200 words.
- Open with their problem in their words. Bring in the offer after that.
- Use the proof exactly as given. Never invent results, numbers, quotes, dates or promises.
- One link and one clear ask.
- Plain English, short sentences, no em dashes, no hype words.
- Write [CHECK] where details are missing instead of guessing.` },
      { kind: "p", text: "Fill in every [CHECK] yourself. Is one line wrong? Don't start again. In the same chat, tell it which line and why:" },
      { kind: "prompt", label: "Fix one line", text: `Change this line: [paste the line].
Why it's wrong: [what's actually true, or how I'd say it].
Keep everything else the same.` },
    ] },
    { num: "05", title: "Write the subject line", accent: "Say what's inside.", blocks: [
      { kind: "p", text: "People skip clever subject lines. They open clear ones when they want what is inside." },
      { kind: "prompt", label: "Write my subject lines", text: `Give me 5 subject lines for this email.

Each one must say exactly what's inside. No teasers, no "you won't believe", no false urgency, no capitals for emphasis. Under 50 characters each, with the character count after each one.

Use only what is in the email. Never add a deadline, discount or number that isn't there.

Email: [paste]` },
      { kind: "p", text: "Pick the one your reader would open. Save the email and the subject line in your Sales email set." },
      { kind: "tip", text: "**Test it:** read the subject line on its own. Can your reader guess what is in the email? If not, pick another one." },
    ] },
    { num: "06", title: "Check it sounds like you", accent: "Before you press send.", blocks: [
      { kind: "p", text: "This last check finds lines that sound like AI. It also finds promises your proof does not back up." },
      { kind: "prompt", label: "Sounds-like-me check", text: `Check this email against my voice and my proof.

My voice: [paste Voice Rules, or 2 to 3 of my emails]
My proof bank: [paste]
The email: [paste]

Give me a table with these columns: Line | Problem | Suggested fix

Look for:
1. Words or phrases I would never use, or that sound like AI
2. Any claim not backed by my proof bank
3. Anything written to everyone instead of to one reader
4. More than one link or more than one ask

Don't rewrite the whole email. List only the lines that need fixing.` },
      { kind: "p", text: "Make the fixes you agree with. Then read the email out loud once. Would you trip over a line if you said it to your client? Change it." },
      { kind: "honest", text: "**The honest part:** ChatGPT can write a smooth email. It can't make up your proof. It does not know your clients. Does the draft sound like anyone could have sent it? Go back to your one-reader profile. You decide what goes out with your name on it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Before you press send.", blocks: [
      { kind: "checklist", items: [
        "One-reader profile saved",
        "Proof bank saved, client yes checked",
        "Launch email written to one reader",
        "Every claim backed by your proof bank",
        "Subject line says what is inside",
        "One link, one ask",
        "Sounds-like-me check done",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch email is ready.",
    accent: "Now plan the launch.",
    body: "The 30-day launch guide gives you a checklist with a date on every task. This email goes in the last week.",
    label: "Plan your launch →",
    href: "/guides/launch-your-product-in-30-days/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Add every new client quote to your proof bank. Update your one-reader profile after each launch. Do the sounds-like-me check on every email before you send it.",
    finishLine: "One reader, real proof, your voice.",
  },
};
