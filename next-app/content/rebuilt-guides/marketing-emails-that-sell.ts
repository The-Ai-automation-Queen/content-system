import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "marketing-emails-that-sell",
  lumailTag: "guide-marketing-emails-that-sell",
  title: "How to Write Sales Emails With ChatGPT That Don't Sound Like AI",
  cover: "/images/guides/marketing-emails-that-sell.webp",
  coverAlt: "The blue robot mascot sending envelopes through a line of brass pipes",
  seoDescription: "Write sales emails with ChatGPT that don't sound like AI: write to one real client, build a bank of real proof, and draft a launch email in your voice.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Write Sales Emails With ChatGPT", accent: "That Don't Sound Like AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/marketing-emails-that-sell.webp",
    alt: "The blue robot mascot sending envelopes through a line of brass pipes",
    line: "Write to one real client, with proof instead of promises. ChatGPT drafts; you bring the client and the proof.",
  },
  intro: {
    heading: "Your sales email kit, in your own voice",
    lead: "Most sales emails talk to everyone, hide what they're about and make big promises. ChatGPT makes that worse when it writes from nothing. This guide builds what it needs first: a profile of one real client, a bank of the proof you actually have, and your voice. Then it drafts a launch email you'd be happy to send with your name on it.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **one-reader profile**: the one client you're writing to, in their own words",
        "A **proof bank**: your real results, testimonials and examples, ready to use",
        "A **launch email** drafted from your profile, your proof and your voice",
        "**Subject lines** that say what's inside",
        "A **sounds-like-me check** to run before you press send",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works, and Claude works the same way. If you've written Voice Rules in the [Brand Brain guide](/guides/brand-brain-guide/), have them ready. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Sales Email Kit.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Learn the 3 rules", accent: "Before you write a word.", blocks: [
      { kind: "p", text: "These three rules decide whether a sales email gets read. Every prompt in this guide follows them. *The examples are made up to show each rule.*" },
      { kind: "table", head: ["Rule", "Before", "After"], rows: [
        ["Write to one reader", "Dear all, we're excited to announce our new coaching package.", "You told me on our call that Sunday evenings are when the week's admin catches up with you. This is for that."],
        ["Say what's inside", "You won't believe this...", "New: 6 weekly coaching calls for freelance designers"],
        ["Show proof instead of promises", "This will transform your business.", "A real client's words, with their permission: \"[quote]\""],
      ] },
      { kind: "list", ordered: true, items: [
        "Pick one offer and one email you're about to send, such as the email that opens your next launch.",
        "Open a new document called **Sales email kit**. You'll save each part in it as you go.",
        "Read your last sales email against the 3 rules and note which one it breaks. That's the one to watch in step 04.",
      ] },
      { kind: "tip", text: "**No sales email to compare?** Use the last post or message you wrote about one of your services. The rules apply the same way." },
    ] },
    { num: "02", title: "Choose one reader", accent: "One real client.", blocks: [
      { kind: "p", text: "An email written to everyone sounds like an advert. Written to one person, it reads like a note. This prompt builds a profile of that one person." },
      { kind: "list", ordered: true, items: [
        "Think of one real client who bought something like this offer, or should have.",
        "Open [ChatGPT](https://chatgpt.com), start a new chat and paste the prompt below.",
        "Answer each question in a sentence or two. Use [client] instead of their name.",
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

Use only what I tell you. Write [CHECK] where information is missing instead of guessing. Never invent quotes.` },
      { kind: "p", text: "Read it and correct anything that doesn't sound like your client. Save it in your Sales email kit as **One-reader profile**." },
    ] },
    { num: "03", title: "Build your proof bank", accent: "Only what's real.", blocks: [
      { kind: "p", text: "Proof is what makes a reader believe you. ChatGPT can't create it, so this step gathers what you already have." },
      { kind: "list", ordered: true, items: [
        "Collect testimonials, reviews, messages from happy clients, results you can show, and examples of your work.",
        "Ask permission before you use a client's words with their name.",
        "Paste everything into the prompt below, with names swapped for [client] where you don't have permission yet.",
      ] },
      { kind: "prompt", label: "Build my proof bank", text: `Help me build a proof bank for my sales emails.

Here is everything I have: [paste testimonials, reviews, client messages, results, examples of work, qualifications].

Sort it into a table with these columns:
Proof (word for word) | Type (testimonial, result, example, qualification) | What it proves | Permission to use (yes, no, [CHECK])

Rules:
- Copy every quote word for word. Never shorten a quote in a way that changes its meaning.
- Use only what I give you. Never invent results, numbers, reviews or client names.
- After the table, list any claims I make that have nothing to back them up, under the heading [CHECK], so I can find proof or cut them.` },
      { kind: "p", text: "Save it as **Proof bank**. Anything marked no or [CHECK] stays out of your emails until you have permission or proof." },
      { kind: "tip", text: "**Not much proof yet?** Email your last five clients and ask for one sentence about what changed for them, and whether you can use it with their name." },
    ] },
    { num: "04", title: "Draft the launch email", accent: "From your profile and proof.", blocks: [
      { kind: "p", text: "Now ChatGPT has what it needs: one reader, real proof and your voice. This prompt puts them together." },
      { kind: "list", ordered: true, items: [
        "**If you have Voice Rules** from the [Brand Brain guide](/guides/brand-brain-guide/), paste them in where the prompt asks for your voice.",
        "**If you don't,** paste two or three emails you've written that sound like you.",
        "Paste the prompt in the same chat as your profile and proof bank, or start a new chat and paste them in.",
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
- Write [CHECK] where information is missing instead of guessing.` },
      { kind: "p", text: "Fill in every [CHECK] yourself. If one line is off, don't start again. Tell it which line and why, in the same chat:" },
      { kind: "prompt", label: "Fix one line", text: `Change this line: [paste the line].
Why it's wrong: [what's actually true, or how I'd say it].
Keep everything else the same.` },
    ] },
    { num: "05", title: "Write the subject line", accent: "Say what's inside.", blocks: [
      { kind: "p", text: "Clever subject lines get skipped. A clear one gets opened by the people who want what's inside." },
      { kind: "prompt", label: "Write my subject lines", text: `Give me 5 subject lines for this email.

Each one must say exactly what's inside. No teasers, no "you won't believe", no false urgency, no capitals for emphasis. Under 50 characters each, with the character count after each one.

Use only what is in the email. Never add a deadline, discount or number that isn't there.

Email: [paste]` },
      { kind: "p", text: "Pick the one you'd open if you were the reader in your profile. Save the email and the subject line in your Sales email kit." },
      { kind: "tip", text: "**Test it:** read the subject line on its own. Could your reader guess what's in the email? If not, pick another one." },
    ] },
    { num: "06", title: "Check it sounds like you", accent: "Before you press send.", blocks: [
      { kind: "p", text: "The last check catches anything that sounds like AI, or promises more than your proof shows." },
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
      { kind: "p", text: "Make the fixes you agree with. Then read the email out loud once. If you'd stumble saying a line to your client, change it." },
      { kind: "honest", text: "**The honest part:** ChatGPT can write a smooth email, but it can't make up your proof, and it doesn't know your clients. If the draft reads like anyone could have sent it, go back to your one-reader profile. What goes out with your name on it is your call." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Before you press send.", blocks: [
      { kind: "checklist", items: [
        "One-reader profile saved",
        "Proof bank saved, permissions checked",
        "Launch email written to one reader",
        "Every claim backed by your proof bank",
        "Subject line says what's inside",
        "One link, one ask",
        "Sounds-like-me check done",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your launch email is ready.",
    accent: "Now plan the launch.",
    body: "The 30-day launch guide turns your launch date into a day-by-day checklist, with this email in the final week.",
    label: "Plan your launch →",
    href: "/guides/launch-your-product-in-30-days/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Add every new testimonial to your proof bank, update your one-reader profile after each launch, and run the sounds-like-me check on every email before it goes out.",
    finishLine: "One reader, real proof, your voice.",
  },
};
