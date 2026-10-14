import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-business-idea-with-ai",
  lumailTag: "guide-test-business-idea-with-ai",
  title: "How to Test My Business Idea With ChatGPT Before I Build It",
  cover: "/images/guides/test-business-idea-with-ai.webp",
  coverAlt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
  seoDescription: "How to test my business idea with ChatGPT before I build it: write a brief, let five critics find problems, test with real people. 5 steps.",
  tool: "ChatGPT",
  minutes: 40,
  h1: { title: "How to Test My Business Idea With ChatGPT", accent: "Before I Build It" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-business-idea-with-ai.webp",
    alt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
    line: "Find out if people will pay before you build.",
  },
  intro: {
    heading: "Test your idea before you build",
    lead: "Ask ChatGPT if your idea is good and it says yes. This guide makes it find the weak spots instead. It takes 40 minutes, then one week.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A one-page brief** of your idea",
        "**The 3 biggest problems**, found by five critics",
        "**A one-week test** with real people and a pass mark",
        "**A go, change or drop choice**, written down",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "idea test pack.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Write the idea down", accent: "Five parts, no AI yet.", blocks: [
      { kind: "p", text: "A vague idea gets vague feedback. Write it in five short parts first." },
      { kind: "list", ordered: true, items: [
        "Open [Google Docs](https://docs.google.com) and click **Blank document**. Call it **Idea test pack**.",
        "Answer each question below in one or two sentences.",
        "Don't know an answer? Write [CHECK] and move on.",
      ] },
      { kind: "table", head: ["Part", "Question"], rows: [
        ["Who", "Who exactly is it for, and what is going on for them?"],
        ["Problem", "What problem do they have, in their words?"],
        ["Offer", "What do they get, and how long does it take?"],
        ["Price", "What would they pay, in dollars?"],
        ["Why you", "Why buy from you?"],
      ] },
    ] },
    { num: "02", title: "Get a one-page brief", accent: "ChatGPT asks, you answer.", blocks: [
      { kind: "p", text: "ChatGPT asks what a good adviser would ask. Then it writes the brief." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and click **New chat**.",
        "Paste the prompt below with your five answers.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Interview me for my idea brief", text: `Help me turn my business idea into a one-page brief.

Who: [who]
Problem: [problem]
Offer: [offer]
Price: [price]
Why me: [why you]

Ask me questions one at a time and wait for each answer. Ask no more than 8.

Then write the brief with 5 headings: Who it's for, The problem, The offer, The price, Why me. Under 250 words.

Use only what I tell you. If something is missing, write [CHECK]. Don't tell me if the idea is good yet.` },
      { kind: "p", text: "Fix anything you did not mean. Paste the brief into your Idea test pack." },
    ] },
    { num: "03", title: "Call in five critics", accent: "Find the weak spots.", blocks: [
      { kind: "p", text: "Each critic has one job. None of them can just say \"looks good\"." },
      { kind: "list", ordered: true, items: [
        "Click **New chat**, so the last chat does not make it kind.",
        "Paste the prompt below with your price and brief.",
      ] },
      { kind: "prompt", label: "Five critics", text: `Check my business idea as 5 critics. No compliments.

1. The client: would I pay [price], and what would stop me?
2. The competitor: what do clients use now, and why would they switch?
3. The accountant: does the price cover my time and costs?
4. The marketer: can this be said in one sentence, and where would clients hear about it?
5. The doubting friend: what question am I avoiding?

Give 2 sharp points from each. Then rank the 3 biggest problems, with one line on how to test or fix each.

Use only my brief. If you need a fact you don't have, write [CHECK]. Never make up numbers.

My brief: [paste your brief]` },
      { kind: "list", ordered: true, items: [
        "Paste the answer into your Idea test pack.",
        "Press **Ctrl + F** (or **Cmd + F** on a Mac) and find each **[CHECK]**.",
        "Check every [CHECK], number and company name on [Google](https://www.google.com) yourself.",
        "Under each top problem, write how you will fix it.",
      ] },
    ] },
    { num: "04", title: "Plan a one-week test", accent: "Real people, set the bar first.", blocks: [
      { kind: "p", text: "AI can only guess. Real people show if anyone will say yes." },
      { kind: "prompt", label: "Plan my one-week test", text: `Plan a one-week test for my business idea. It must use real people and cost nothing.

My brief: [paste]
The top 3 problems: [paste]

Give me:
1. Who to ask, how many, and where to find them among my past clients and contacts
2. A 3-line description of the offer, with the price as [price]
3. A message to send, under 80 words, plain English
4. What counts as a yes: a booked call or a deposit. Compliments do not count.
5. A pass mark: how many yeses I need by the end of the week
6. A day-by-day plan

Don't suggest building anything first. Use only what I give you. If something is missing, write [CHECK]. Never make up names, prices, dates or promises.` },
      { kind: "list", ordered: true, items: [
        "Write your pass mark at the top of your Idea test pack. Don't change it later.",
        "Put your real price in the message.",
        "Send it to one person at a time, by email or private message.",
        "Write every reply down the day it comes in.",
      ] },
    ] },
    { num: "05", title: "Go, change or drop", accent: "Against your pass mark.", blocks: [
      { kind: "p", text: "Count your real yeses. Compare them with the pass mark you set." },
      { kind: "prompt", label: "Read my test results", text: `My pass mark was: [pass mark].

This week:
- People I asked: [number]
- People who replied: [number]
- Who said yes, and what they did: [details]
- What people said: [paste replies]

Using only this, tell me go, change or drop, and why. If change, suggest one thing to change for next week. Don't count interest as a yes.` },
      { kind: "list", items: [
        "**Go**: you hit the pass mark. Build the smallest version.",
        "**Change**: some yeses. Change one thing and test another week.",
        "**Drop**: no yeses. Write what you learned and move on.",
      ] },
      { kind: "tip", text: "Swap real names for [contact 1], [contact 2] before you paste replies." },
      { kind: "honest", text: "**The honest part:** AI critics have never met your clients. Real people decide. If the week goes badly, don't lower the pass mark. Don't spend money until you hit it." },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Wrote the idea in five parts",
        "Saved a one-page brief",
        "Checked every [CHECK] from the critics",
        "Set a pass mark before sending anything",
        "Wrote down go, change or drop",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "People said yes.",
    accent: "Now write the email that sells it.",
    body: "The next guide helps you write a sales email to one real client, with real proof.",
    label: "Write your sales email →",
    href: "/guides/marketing-emails-that-sell/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Write the idea down. Let the critics find the problems. Let real people decide.",
    finishLine: "Test first. Build second.",
  },
};
