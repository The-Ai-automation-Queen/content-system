import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-business-idea-with-ai",
  lumailTag: "guide-test-business-idea-with-ai",
  title: "How to Test My Business Idea With ChatGPT Before I Build It",
  cover: "/images/guides/test-business-idea-with-ai.webp",
  coverAlt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
  seoDescription: "Test your business idea with ChatGPT before you build it: write a one-page brief, let five critics find the problems, then test with real people.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "How to Test My Business Idea With ChatGPT", accent: "Before I Build It" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-business-idea-with-ai.webp",
    alt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
    line: "Find the problems early. Check if people will pay. Do it all before you spend anything.",
  },
  intro: {
    heading: "Test your idea before you spend anything",
    lead: "Ask ChatGPT \"is this a good idea?\" and it often says yes. This guide uses it another way. It turns your idea into a one-page brief, finds the problems, and plans a one-week test with real people.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **one-page brief**: who it's for, the problem, the offer, the price, why you",
        "A **critics' report**: weak spots from five critics, top 3 ranked",
        "A **one-week test plan**: who to ask, what to show, what counts as a yes",
        "A **go, change or drop** choice, written down before you build",
      ] },
      { kind: "tip", text: "You need a ChatGPT account. The free plan works. Claude or Gemini work the same way. Copy and paste each prompt below. Change the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "Idea Test Pack.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Write the idea down", accent: "Before you open any AI.", blocks: [
      { kind: "p", text: "A vague idea gets vague feedback. Fill in this table first. Then the critics have something exact to check." },
      { kind: "list", ordered: true, items: [
        "Open a new document called **Idea test pack**.",
        "Copy the table below into it.",
        "Fill in the last column in your own words. One or two sentences each.",
        "Don't know an answer yet? Leave it empty. Step 02 helps you fill it.",
      ] },
      { kind: "table", head: ["Part", "Question", "Your answer"], rows: [
        ["Who", "Who exactly is it for? What work do they do? What is going on for them now?", "[who]"],
        ["Problem", "What problem do they have, in their own words?", "[problem]"],
        ["Offer", "What do they get? What's in it, how they get it, how long it takes.", "[offer]"],
        ["Price", "What would they pay?", "[price]"],
        ["Why you", "Why buy from you? Your experience, results or contacts.", "[why you]"],
      ] },
      { kind: "p", text: "Here is what an exact answer looks like. *This is an example.*" },
      { kind: "table", head: ["Vague", "Exact"], rows: [
        ["AI help for small businesses.", "A half-day online session for solo accountants who want to draft client emails with ChatGPT, for a fixed fee of [price]."],
      ] },
      { kind: "tip", text: "**Can't fill in \"Why you\"?** That's good to know now. Write [CHECK]. Come back to it after the critics in step 03." },
    ] },
    { num: "02", title: "Build the brief", accent: "Let ChatGPT ask you questions.", blocks: [
      { kind: "p", text: "This prompt asks what a good business adviser would ask. It asks one question at a time, until every part is clear." },
      { kind: "list", ordered: true, items: [
        "Open [ChatGPT](https://chatgpt.com) and start a new chat.",
        "Paste the prompt below with your answers from the table.",
        "Answer each question in a sentence or two.",
      ] },
      { kind: "prompt", label: "Interview me for my idea brief", text: `Help me turn my business idea into a one-page brief.

Here is what I have so far:
Who: [who]
Problem: [problem]
Offer: [offer]
Price: [price]
Why me: [why you]

Ask me questions one at a time and wait for each answer, until each part is clear enough that a stranger would understand it. Up to 8 questions.

Then write the brief with these 5 headings: Who it's for, The problem, The offer, The price, Why me. Under 250 words.

Use only what I tell you. Write [CHECK] where details are missing instead of guessing. Don't tell me whether the idea is good yet.` },
      { kind: "p", text: "Read the brief. Does it say something you didn't mean? Fix it in the same chat. Save the final version in your Idea test pack as **One-page brief**." },
    ] },
    { num: "03", title: "Call in five critics", accent: "Find the weak spots.", blocks: [
      { kind: "p", text: "Each critic has one small job. So none of them can just say \"it looks good\"." },
      { kind: "table", head: ["Critic", "Their question"], rows: [
        ["The client", "Would I pay this price? What would stop me?"],
        ["The competitor", "What do clients use now? Why would they switch?"],
        ["The accountant", "Does the price cover your time and costs?"],
        ["The marketer", "Can you say it in one sentence? Where will clients hear about it?"],
        ["The doubting friend", "What question are you avoiding?"],
      ] },
      { kind: "prompt", label: "Five critics", text: `Check my business idea as 5 critics. No encouragement, no compliments.

1. The client: would I pay [price] for this, and what would stop me?
2. The competitor: what do clients already use or do instead, and why would they switch?
3. The accountant: does the price cover my time and costs? How many sales a month would I need for it to be worth it?
4. The marketer: can this be explained in one sentence, and where would the right clients hear about it?
5. The doubting friend: what is the question I'm avoiding?

Give 2 sharp points from each critic. Then rank the 3 problems that matter most, with one line on how I could test or fix each.

Use only my brief. Where you'd need a fact you don't have, such as competitors' prices or how big the market is, write [CHECK] instead of guessing. Never make up numbers.

My brief: [paste your one-page brief]` },
      { kind: "p", text: "Save the answer as **Critics' report**. Under each of the top 3 problems, write one line. Say how you'll answer it, or what you'll change." },
      { kind: "tip", text: "**The critics agree with you too easily?** Reply: \"Be harder. What would make this fail in the first three months?\"" },
    ] },
    { num: "04", title: "Plan a one-week test", accent: "One week, real people.", blocks: [
      { kind: "p", text: "AI can only guess what clients will do. A small test with real people shows if anyone will say yes." },
      { kind: "prompt", label: "Plan my one-week test", text: `Plan a one-week demand test for my business idea. It must involve real people and cost nothing to run.

My brief: [paste]
The top 3 problems from the critics: [paste]

Give me:
1. Who to ask: the type of person, how many, and where to find them among my past clients, enquiries and contacts
2. What to show them: a 3-line description of the offer, with the price written as [price]
3. The message to send, under 80 words, in plain English
4. What counts as a yes: a real commitment, such as paying a deposit or booking a call. Count interest and compliments separately.
5. A pass mark: how many yeses I need by the end of the week, for me to set before I start
6. A day-by-day plan as a table: Day | What to do | Time needed

Don't suggest building a website, an app or anything else first. Never make up names, results or numbers about my market.` },
      { kind: "list", ordered: true, items: [
        "Pick your pass mark now. Write it in your Idea test pack. Don't change it later.",
        "Put your real price in the message before you send it.",
        "Send each message to one person. Write every reply in a table: who ([contact 1], [contact 2]), what they said, yes or no.",
      ] },
      { kind: "tip", text: "**Where do I find people?** Past clients, people who asked about your work before, your email list, and LinkedIn contacts who fit your brief. A private message gets more honest answers than a public post." },
    ] },
    { num: "05", title: "Go, change or drop", accent: "Against your own pass mark.", blocks: [
      { kind: "p", text: "At the end of the week, compare what happened with your pass mark. Decide before you start building." },
      { kind: "table", head: ["Result", "Choice", "What to do next"], rows: [
        ["You reached the pass mark", "Go", "Build the smallest version that gives the people who said yes what you promised"],
        ["Some interest, but under the pass mark", "Change", "Change one thing (who, offer or price), using what people told you. Test again for a week"],
        ["No yeses, or only compliments", "Drop", "Write down what you learned. Keep it in your Idea test pack. Move on to your next idea"],
      ] },
      { kind: "p", text: "Not sure which row you're in? Paste your results into the same chat:" },
      { kind: "prompt", label: "Read my test results", text: `My pass mark was: [pass mark].

Here is what happened this week:
- How many people I asked: [number]
- How many replied: [number]
- How many said yes, and what they did (deposit, booked call, other): [details]
- What people said, with names removed: [paste replies]

Using only this, tell me whether the result is go, change or drop, and why. If it's change, suggest the one thing to change for next week's test. Don't round up the results or count interest as a yes.` },
      { kind: "p", text: "Write your choice and the reason under the table in your Idea test pack." },
      { kind: "honest", text: "**The honest part:** AI critics have never met your clients or run your business. They help you find the right questions. Real people answer them. If the week goes badly, don't lower the pass mark to make the idea pass. The choice is yours. Make it against the number you set." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Idea table filled in",
        "One-page brief saved",
        "Critics' report saved, top 3 problems answered",
        "Pass mark written down before the test",
        "One-week test done",
        "Go, change or drop choice written down",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "People said yes.",
    accent: "Now write the email that sells it.",
    body: "The sales email guide helps you write to one real client. You use proof, not promises. So your launch email sounds like you.",
    label: "Write your sales email →",
    href: "/guides/marketing-emails-that-sell/",
  },
  conclusion: {
    heading: "Keep it working",
    paragraph: "Test every new offer the same way. Write a brief, call the critics, run a one-week test. Then decide against a pass mark you set first.",
    finishLine: "Find the problems early. Then let real people decide.",
  },
};
