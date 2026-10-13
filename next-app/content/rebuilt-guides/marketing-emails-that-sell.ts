import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "marketing-emails-that-sell",
  lumailTag: "guide-marketing-emails-that-sell",
  title: "How to Write Sales Emails With ChatGPT That Don't Sound Like AI",
  cover: "/images/guides/marketing-emails-that-sell.webp",
  coverAlt: "The blue robot mascot sending envelopes through a line of brass pipes",
  seoDescription: "Write sales emails with ChatGPT that don't sound like AI: write to one real client, collect your real proof, and draft a launch email in your voice.",
  tool: "ChatGPT",
  minutes: 40,
  h1: { title: "How to Write Sales Emails With ChatGPT", accent: "That Don't Sound Like AI" },
  hero: {
    kind: "scene",
    src: "/images/guides/marketing-emails-that-sell.webp",
    alt: "The blue robot mascot sending envelopes through a line of brass pipes",
    line: "Write to one real client. Show proof, not promises. ChatGPT writes the draft. You bring the client and the proof.",
  },
  intro: {
    heading: "Write a sales email that sounds like you",
    lead: "Here is the problem. Your new offer is ready, and you need to tell your list. You open a blank email and write \"Dear all, we are excited to announce...\". It reads like every advert in their inbox. ChatGPT (OpenAI's AI assistant) can write a much better draft. But only if you give it one real client, your real proof and your way of writing. Then you get an email that reads like a note to one person, ready for you to check and send.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A short picture of one real client**, in their own words, so every email talks to one person",
        "**All your real proof in one list**: client quotes, results and examples you are allowed to use",
        "**A launch email in your own voice**, written from that client and that proof",
        "**A subject line that says what is inside**, so the right people open it",
        "**A quick check before you send**, so nothing sounds like AI and every claim is true",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. A phone works, but copying and pasting is harder.",
        "A ChatGPT account. The free plan works for every step. Claude works the same way if you prefer it.",
        "One offer you will sell soon, like a new package or the next round of a service.",
        "Your last sales email, or your last post about one of your services. You use it as a test in step 01.",
        "Optional: your Voice Rules (a short list of how you write) from the [Brand Brain guide](/guides/brand-brain-guide/). No Voice Rules? Two or three emails you wrote yourself work too.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "sales email prompts.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Test your last email against 3 rules", accent: "10 minutes, no AI needed yet.", blocks: [
      { kind: "p", text: "Three rules decide if people read a sales email. Every prompt in this guide follows them. First you learn them. Then you test your own last email, so you know what to fix." },
      { kind: "h3", text: "A. Make one document for everything" },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com) in your browser. Or open Word if you use that.",
        "Click **Blank document** at the top of the page. A new empty page opens.",
        "Click **Untitled document** at the top left. Type **Sales email set** and press Enter.",
        "You will save every part of this guide in this document. Keep it open in its own tab.",
      ] },
      { kind: "h3", text: "B. Learn the 3 rules" },
      { kind: "p", text: "Read each rule and its two examples. *The examples are made up to show each rule.*" },
      { kind: "table", head: ["Rule", "Breaks the rule", "Follows the rule"], rows: [
        ["1. Write to one reader", "Dear all, we're excited to announce our new coaching package.", "You told me on our call that Sunday evenings are when the week's admin catches up with you. This is for that."],
        ["2. Say what's inside", "You won't believe this...", "New: 6 weekly coaching calls for freelance designers"],
        ["3. Show proof, not promises", "This will transform your business.", "A real client's words, with their permission: \"[quote]\""],
      ] },
      { kind: "h3", text: "C. Test your last email" },
      { kind: "list", ordered: true, items: [
        "Open your last sales email. In Gmail, click **Sent** on the left side. Click the email to open it.",
        "Copy the whole email. Select it with your mouse, then press **Ctrl + C** on Windows or **Cmd + C** on a Mac.",
        "Go to your Sales email set document. Click on the page and press **Ctrl + V** (or **Cmd + V**) to paste it.",
        "Read the first line. Does it say \"you\" to one person, or does it talk to everyone? Write **Rule 1: yes** or **Rule 1: no** under the email.",
        "Read the subject line on its own. Could a reader guess what is inside? Write **Rule 2: yes** or **no**.",
        "Find every big claim, like \"the best\" or \"life-changing\". Is there a real client quote or result next to it? Write **Rule 3: yes** or **no**.",
      ] },
      { kind: "example", label: "What your notes might look like", text: "Rule 1: no, it starts with \"Hi everyone\". Rule 2: no, the subject was \"Big news!\". Rule 3: yes, it has one client quote." },
      { kind: "h3", text: "D. Fix one line yourself" },
      { kind: "list", ordered: true, items: [
        "Pick the rule your email broke first.",
        "Rewrite just that one line by hand, under your notes. Write it to one real client you know.",
        "Read the old line and the new line out loud. The new one should sound like you talking to that client.",
      ] },
      { kind: "contrast", items: [
        { label: "Old first line", text: "Hi everyone, I'm excited to share something new with you!", good: false },
        { label: "New first line", text: "You said on our call that proposals eat your Friday afternoons. I made something for that.", good: true },
      ] },
      { kind: "tip", text: "**No sales email to test?** Use your last post or message about one of your services. The 3 rules work the same way." },
    ] },
    { num: "02", title: "Describe your one reader", accent: "One real client, in their words.", blocks: [
      { kind: "p", text: "An email to everyone sounds like an advert. An email to one person reads like a note. In this step ChatGPT asks you questions about one real client. Then it writes a short description of them for you to keep." },
      { kind: "h3", text: "A. Pick the client" },
      { kind: "list", ordered: true, items: [
        "Think of one real client who bought something like this offer, or should have.",
        "In your answers, write [client] instead of their name. Their name never needs to go into ChatGPT.",
      ] },
      { kind: "h3", text: "B. Start the chat" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) in a new browser tab. Sign in with **Log in** at the top right if you need to.",
        "Click **New chat** at the top left. On some screens it is a pencil icon. A new empty chat opens.",
        "Copy the prompt below. Click in the chat box at the bottom of the screen and paste it.",
        "Change the part in [square brackets] to your offer, in one line.",
        "Press Enter. ChatGPT asks you the first question.",
        "Answer each question in one or two sentences. Press Enter after each answer. It then asks the next one.",
        "Can't find **New chat**? OpenAI moves these menus. Search \"start a new chat\" on [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "prompt", label: "Ask me about my one reader", text: `Interview me so you can describe the one reader of my sales email.

The offer: [what you're selling, in one line]

Ask me these one at a time and wait for each answer:
1. Think of one real client who bought something like this, or should have. What is their work and situation? (I'll call them [client].)
2. What problem did they have before they came to me, in the words they used?
3. What had they already tried?
4. What nearly stopped them from buying: price, time, doubt, something else?
5. What changed for them afterwards, as they described it?

Then write the description under these headings: Who they are, Their problem in their words, What they tried, What holds them back, What they want. Under 200 words.

Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Never invent quotes.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "**Who they are:** [client] runs a small design studio on her own.",
        "**Their problem in their words:** \"Proposals eat my Friday afternoons.\"",
        "**What they tried:** a proposal app, but she stopped using it after a month.",
        "**What holds them back:** she is not sure she has time to learn something new.",
        "**What they want:** [CHECK]",
      ] },
      { kind: "h3", text: "C. Check it and save it" },
      { kind: "list", ordered: true, items: [
        "Read every line. Does it sound like your client? Change any word that doesn't.",
        "Is there a [CHECK]? Fill it in yourself, or leave the line out.",
        "Under the answer, click the **Copy** button (two small squares). Paste it into your Sales email set.",
        "Above it, type the heading **One reader**.",
      ] },
    ] },
    { num: "03", title: "Collect your real proof", accent: "Only what's true and allowed.", blocks: [
      { kind: "p", text: "Proof makes a reader believe you. ChatGPT can't make it up for you, and it must not try. So in this step you collect the proof you already have. ChatGPT sorts it into one neat table." },
      { kind: "h3", text: "A. Gather what you have" },
      { kind: "list", ordered: true, items: [
        "Search your email and messages for thank-you notes from clients. Search words like \"thank you\" or \"so helpful\".",
        "Copy each one into your Sales email set, under the heading **Raw proof**.",
        "Add reviews from your website or Google profile, results you can show, and examples of your work.",
        "Next to each one, write if the client said yes to you using it. If you don't know, write **not asked**.",
        "In each quote, swap the client's name for [client 1], [client 2] and so on.",
      ] },
      { kind: "h3", text: "B. Let ChatGPT sort it" },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat as step 02. Or click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace [paste ...] with everything under **Raw proof** in your document.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Sort my proof", text: `Help me sort the proof I can use in my sales emails.

Here is everything I have: [paste testimonials, reviews, client messages, results, examples of work, qualifications].

Sort it into a table with these columns:
Proof (word for word) | Type (testimonial, result, example, qualification) | What it proves | Permission to use (yes, no, [CHECK])

Rules:
- Copy every quote word for word. Never shorten a quote in a way that changes its meaning.
- Use only what I give you. Never invent results, numbers, reviews or client names.
- After the table, list any claims I make that have nothing to back them up, under the heading [CHECK], so I can find proof or cut them.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"[quote from client 1, word for word]\" | Testimonial | [what it proves] | yes",
        "\"[result for client 2]\" | Result | [what it proves] | [CHECK]",
        "[CHECK]: You say \"the fastest way to win clients\". Nothing in your proof backs this up.",
      ] },
      { kind: "h3", text: "C. Check the quotes yourself" },
      { kind: "list", ordered: true, items: [
        "Pick one quote from the table. Copy 4 or 5 words from it.",
        "Go to your **Raw proof** list. Press **Ctrl + F** (or **Cmd + F**) and paste the words. They light up in yellow.",
        "Is the quote the same, word for word? If ChatGPT changed even one word, put back the real words.",
        "Do this for every quote you plan to use.",
        "Copy the checked table into your Sales email set. Add the heading **Proof list**.",
      ] },
      { kind: "tip", text: "**Not much proof yet?** Email your last five clients. Ask for one sentence about what changed for them. Ask if you can use it with their name. Until they say yes, keep the line marked no." },
    ] },
    { num: "04", title: "Draft the launch email", accent: "From your reader and your proof.", blocks: [
      { kind: "p", text: "Now ChatGPT has what it needs: one reader, real proof and your voice. This step puts them together into one email." },
      { kind: "h3", text: "A. Get your pieces ready" },
      { kind: "list", ordered: true, items: [
        "In your Sales email set, find your **One reader** text and your **Proof list**.",
        "Pick 1 or 2 pieces of proof marked **yes**. Only yes.",
        "Find your voice. **Have Voice Rules** from the [Brand Brain guide](/guides/brand-brain-guide/)? Copy them. **No Voice Rules?** Copy two or three emails you wrote that sound like you.",
        "Write down your offer in one or two lines: what it is, what is included, when it opens, the price.",
        "Write down the one thing you want the reader to do, like book a call.",
      ] },
      { kind: "h3", text: "B. Paste the prompt" },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace each part in [square brackets] with the pieces from A.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Write my launch email", text: `Write a launch email for my offer.

The offer: [what it is, what's included, when it opens, the price]
The one reader: [paste your One reader text]
The proof: [paste 1 or 2 items from your proof list marked yes]
My voice: [paste your Voice Rules, or 2 to 3 emails I wrote]
What I want the reader to do: [for example, book a call]

Rules:
- Write to that one reader, using "you". Under 200 words.
- Open with their problem in their words. Bring in the offer after that.
- Use the proof exactly as given. Never invent results, numbers, quotes, dates or promises.
- One link and one clear ask.
- Plain English, short sentences, no dashes, no hype words.
- Write [CHECK] where details are missing instead of guessing.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "You told me proposals eat your Friday afternoons. So I built something for that.",
        "It is [offer]: [what is included]. It opens on [CHECK].",
        "[client 1] said: \"[their quote, word for word]\"",
        "Want to see if it fits you? Book a call here: [link]",
      ] },
      { kind: "h3", text: "C. Fix the lines that are wrong" },
      { kind: "list", ordered: true, items: [
        "Fill in every [CHECK] yourself, with the real detail.",
        "Is one line wrong or not like you? Don't start again. Copy that line.",
        "In the same chat, paste the short prompt below. Put in the line and why it is wrong. Press Enter.",
        "When the email is right, click **Copy** under the answer. Paste it into your Sales email set under the heading **Launch email**.",
      ] },
      { kind: "prompt", label: "Fix one line", text: `Change this line: [paste the line].
Why it's wrong: [what's actually true, or how I'd say it].
Keep everything else the same.` },
    ] },
    { num: "05", title: "Write the subject line", accent: "Say what's inside.", blocks: [
      { kind: "p", text: "People skip clever subject lines. They open clear ones when they want what is inside. ChatGPT gives you 5 to choose from." },
      { kind: "list", ordered: true, items: [
        "Stay in the same chat as your email.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace [paste] with your finished launch email from your Sales email set. Press Enter.",
      ] },
      { kind: "prompt", label: "Write my subject lines", text: `Give me 5 subject lines for this email.

Each one must say exactly what's inside. No teasers, no "you won't believe", no false urgency, no capitals for emphasis. Under 50 characters each, with the character count after each one.

Use only what is in the email. Never add a deadline, discount or number that isn't there.

Email: [paste]` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. New: [offer] for freelance designers (36)",
        "2. Proposals done before Friday lunch (34)",
        "3. [offer] opens on [date] (23)",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each subject line on its own, without the email.",
        "Ask yourself: could my reader guess what is in the email? Cross out any that fail.",
        "Check each one has no deadline, discount or number that is not in your email.",
        "Pick the one your reader would open. Paste it above your launch email in your Sales email set.",
      ] },
      { kind: "contrast", items: [
        { label: "Clever, gets skipped", text: "You won't believe this...", good: false },
        { label: "Clear, gets opened by the right people", text: "New: 6 weekly coaching calls for freelance designers", good: true },
      ] },
    ] },
    { num: "06", title: "Check it before you send", accent: "Sounds like you, and every claim is true.", blocks: [
      { kind: "p", text: "This last check finds lines that sound like AI. It also finds promises your proof does not back up. First ChatGPT checks it. Then you check it yourself." },
      { kind: "h3", text: "A. Let ChatGPT find the weak lines" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left. A fresh chat checks the email with fresh eyes.",
        "Copy the prompt below and paste it in the chat box.",
        "Paste your voice, your Proof list and your email where it asks. Press Enter.",
      ] },
      { kind: "prompt", label: "Check my email", text: `Check this email against my voice and my proof.

My voice: [paste Voice Rules, or 2 to 3 of my emails]
My proof list: [paste]
The email: [paste]

Give me a table with these columns: Line | Problem | Suggested fix

Look for:
1. Words or phrases I would never use, or that sound like AI
2. Any claim not backed by my proof list
3. Anything written to everyone instead of to one reader
4. More than one link or more than one ask

Don't rewrite the whole email. List only the lines that need fixing.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "\"Unlock your full potential\" | Sounds like AI, not in your voice | \"Get your Fridays back\"",
        "\"Clients love it\" | No proof in your list | Use the quote from [client 1], or cut it",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each row. Make the fixes you agree with in your Sales email set.",
        "Skip any fix that doesn't sound like you. You decide.",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "p", text: "ChatGPT can miss things. These 4 checks take 3 minutes." },
      { kind: "list", ordered: true, items: [
        "**Every claim:** put your finger on each claim in the email. Find it in your Proof list. Can't find it? Cut the claim.",
        "**Every quote:** check it word for word against your Raw proof, with **Ctrl + F** (or **Cmd + F**).",
        "**Every fact:** check the price, the date and the link yourself. Click the link to see it opens the right page.",
        "**Out loud:** read the whole email out loud once. Would you trip over a line if you said it to your client? Change it.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["A quote with different words from your Raw proof", "ChatGPT changed the quote", "Put the client's real words back"],
        ["A number, result or deadline you never gave it", "ChatGPT made it up", "Delete it"],
        ["Words like \"unlock\", \"game-changer\" or \"elevate\"", "It sounds like AI", "Swap them for the words you would say on a call"],
        ["The email starts with your offer, not their problem", "It talks about you, not the reader", "Ask: \"Start with the problem from my One reader text.\""],
        ["Two links or two asks", "The reader won't know what to do", "Keep the one ask that matters most"],
      ] },
      { kind: "honest", text: "**The honest part:** ChatGPT can write a smooth email. It can't make up your proof. It does not know your clients. Does the draft sound like anyone could have sent it? Go back to your One reader text. You decide what goes out with your name on it, and you press send." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Before you press send.", blocks: [
      { kind: "checklist", items: [
        "Your last email tested against the 3 rules, and one line fixed by hand",
        "One reader text saved, with every [CHECK] filled in or cut",
        "Proof list saved, and every quote checked word for word",
        "Only proof marked yes used in the email",
        "One real launch email written, checked and saved",
        "A subject line a reader could guess the email from",
        "Price, date and link checked by you, with one link and one ask",
        "Email read out loud once before you send it",
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
    paragraph: "Add every new client quote to your Proof list. Update your One reader text after each launch. Do the check in step 06 on every email before you send it.",
    finishLine: "One reader, real proof, your voice.",
  },
};
