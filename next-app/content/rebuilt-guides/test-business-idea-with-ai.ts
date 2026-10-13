import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-business-idea-with-ai",
  lumailTag: "guide-test-business-idea-with-ai",
  title: "How to Test My Business Idea With ChatGPT Before I Build It",
  cover: "/images/guides/test-business-idea-with-ai.webp",
  coverAlt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
  seoDescription: "Test your business idea with ChatGPT before you build it: a one-page brief, five critics to find the problems, and a one-week test to see if people pay.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Test My Business Idea With ChatGPT", accent: "Before I Build It" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-business-idea-with-ai.webp",
    alt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
    line: "Find the problems early and check if people will pay. All before you spend anything.",
  },
  intro: {
    heading: "Your idea test pack, before you spend anything",
    lead: "Ask ChatGPT \"is this a good idea?\" and it will usually say yes. This guide uses it differently: first to turn your idea into a clear one-page brief, then to attack it from five sides, then to plan a one-week test with real people. You find the problems while changing the idea is still easy.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **one-page brief**: who it's for, the problem, the offer, the price and why you",
        "A **critics' report**: the weak spots found by five critics, with the top 3 ranked",
        "A **one-week demand test plan**: who to ask, what to show them and what counts as a yes",
        "A **go, change or drop decision**, written down before you build anything",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works, and Claude or Gemini work the same way. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Idea Test Pack.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Write the idea down", accent: "Before you open any AI.", blocks: [
      { kind: "p", text: "A vague idea gets vague feedback. Filling in this table first gives the critics later something specific to push against." },
      { kind: "list", ordered: true, items: [
        "Open a new document called **Idea test pack**.",
        "Copy the table below into it.",
        "Fill in the last column in your own words, one or two sentences each.",
        "Leave a box empty if you don't know yet. Step 02 helps you fill it.",
      ] },
      { kind: "table", head: ["Part", "Question", "Your answer"], rows: [
        ["Who", "Who exactly is it for? Their work, their situation, and what's happening for them right now.", "[who]"],
        ["Problem", "What problem do they have, in the words they would use?", "[problem]"],
        ["Offer", "What do they get? What's included, how it's delivered and how long it takes.", "[offer]"],
        ["Price", "What would they pay?", "[price]"],
        ["Why you", "Why buy this from you? Experience, results or contacts you already have.", "[why you]"],
      ] },
      { kind: "p", text: "Here is the difference a specific answer makes. *This is an example.*" },
      { kind: "table", head: ["Vague", "Specific"], rows: [
        ["AI help for small businesses.", "A half-day online session for solo accountants who want to draft client emails with ChatGPT, for a fixed fee of [price]."],
      ] },
      { kind: "tip", text: "**Can't fill in \"Why you\"?** That's useful to know now. Write [CHECK] and come back to it after the critics in step 03." },
    ] },
    { num: "02", title: "Build the brief", accent: "Let ChatGPT interview you.", blocks: [
      { kind: "p", text: "This prompt asks the questions a good business adviser would, one at a time, until every part of your brief is specific." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat.",
        "Paste the prompt below, with your answers from the table.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Interview me for my idea brief", text: `Help me turn my business idea into a one-page brief.

Here is what I have so far:
Who: [who]
Problem: [problem]
Offer: [offer]
Price: [price]
Why me: [why you]

Ask me questions one at a time and wait for each answer, until each part is specific enough that a stranger would understand it. Up to 8 questions.

Then write the brief with these 5 headings: Who it's for, The problem, The offer, The price, Why me. Under 250 words.

Use only what I tell you. Write [CHECK] where information is missing instead of guessing. Don't tell me whether the idea is good yet.` },
      { kind: "p", text: "Read the brief. If it says something you didn't mean, correct it in the same chat. Save the final version in your Idea test pack as **One-page brief**." },
    ] },
    { num: "03", title: "Call in five critics", accent: "Find the weak spots.", blocks: [
      { kind: "p", text: "Each critic has one narrow job, so none of them can hide behind \"overall it looks promising\"." },
      { kind: "table", head: ["Critic", "Their question"], rows: [
        ["The client", "Would I pay this price for this, and what would stop me?"],
        ["The competitor", "What do clients already use or do instead, and why would they switch?"],
        ["The accountant", "Does the price cover your time and costs?"],
        ["The marketer", "Can you explain it in one sentence, and where will the right clients hear about it?"],
        ["The sceptical friend", "What's the question you're avoiding?"],
      ] },
      { kind: "prompt", label: "Five critics", text: `Review my business idea as 5 critics. No encouragement, no compliments.

1. The client: would I pay [price] for this, and what would stop me?
2. The competitor: what do clients already use or do instead, and why would they switch?
3. The accountant: does the price cover my time and costs? How many sales a month would I need for it to be worth it?
4. The marketer: can this be explained in one sentence, and where would the right clients hear about it?
5. The sceptical friend: what is the question I'm avoiding?

Give 2 sharp points from each critic. Then rank the 3 problems that matter most, with one line on how I could test or fix each.

Use only my brief. Where you'd need a fact you don't have, such as competitors' prices or how big the market is, write [CHECK] instead of guessing. Never invent statistics.

My brief: [paste your one-page brief]` },
      { kind: "p", text: "Save the answer as **Critics' report**. Under each of the top 3 problems, write one line: how you'll answer it, or what you'll change in the brief." },
      { kind: "tip", text: "**The critics agree with you too easily?** Reply: \"Be harder. What would make this fail in the first three months?\"" },
    ] },
    { num: "04", title: "Plan a demand test", accent: "One week, real people.", blocks: [
      { kind: "p", text: "AI can only guess what clients will do. A small test with real people shows you whether anyone will commit." },
      { kind: "prompt", label: "Plan my one-week demand test", text: `Design a one-week demand test for my business idea. It must involve real people and cost nothing to run.

My brief: [paste]
The top 3 problems from the critics: [paste]

Give me:
1. Who to ask: the type of person, how many, and where to find them among my past clients, enquiries and contacts
2. What to show them: a 3-line description of the offer, with the price written as [price]
3. The message to send, under 80 words, in plain English
4. What counts as a yes: a real commitment, such as paying a deposit or booking a call. Count interest and compliments separately.
5. A pass mark: how many yeses I need by the end of the week, for me to set before I start
6. A day-by-day plan as a table: Day | What to do | Time needed

Don't suggest building a website, an app or anything else first. Never invent names, results or numbers about my market.` },
      { kind: "list", ordered: true, items: [
        "Decide your pass mark now and write it in your Idea test pack. Don't change it later.",
        "Put your real price in the message before you send it.",
        "Send the messages one to one, and note every reply in a table: who (as [contact 1], [contact 2]), what they said, and whether it was a yes.",
      ] },
      { kind: "tip", text: "**Where do I find people?** Past clients, people who have enquired before, your email list, and contacts on LinkedIn who match your brief. A personal message gets more honest answers than a public post." },
    ] },
    { num: "05", title: "Go, change or drop", accent: "Against your own pass mark.", blocks: [
      { kind: "p", text: "At the end of the week, compare what happened with the pass mark you wrote down. Decide before you start building." },
      { kind: "table", head: ["Result", "Decision", "What to do next"], rows: [
        ["You reached the pass mark", "Go", "Build the smallest version that delivers what you promised the people who said yes"],
        ["Some interest, but under the pass mark", "Change", "Change one thing (who, offer or price) using what people told you, and run the test again for a week"],
        ["No yeses, or only compliments", "Drop", "Write down what you learned, keep it in your Idea test pack, and move on to your next idea"],
      ] },
      { kind: "p", text: "Not sure which row you're in? Paste your results into the same chat:" },
      { kind: "prompt", label: "Read my test results", text: `My pass mark was: [pass mark].

Here is what happened this week:
- How many people I asked: [number]
- How many replied: [number]
- How many said yes, and what they did (deposit, booked call, other): [details]
- What people said, with names removed: [paste replies]

Using only this, tell me whether the result is go, change or drop, and why. If it's change, suggest the one thing to change for next week's test. Don't round up the results or count interest as a yes.` },
      { kind: "p", text: "Write your decision and the reason under the table in your Idea test pack." },
      { kind: "honest", text: "**The honest part:** AI critics have never met your clients or run your business. They help you find the right questions; real people answer them. And if the week goes badly, resist lowering the pass mark to make the idea pass. The decision is yours, so make it against the number you set." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Fill-in brief table done",
        "One-page brief saved",
        "Critics' report saved, top 3 problems answered",
        "Pass mark written down before the test",
        "One-week demand test run",
        "Go, change or drop decision written down",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "People said yes.",
    accent: "Now write the email that sells it.",
    body: "The sales email guide helps you write to one real client, with proof instead of promises, so your launch email sounds like you.",
    label: "Write your sales email →",
    href: "/guides/marketing-emails-that-sell/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Run every new offer through the same pack: brief, critics, a one-week test and a decision against a pass mark you set first.",
    finishLine: "Find the problems early, then let real people decide.",
  },
};
