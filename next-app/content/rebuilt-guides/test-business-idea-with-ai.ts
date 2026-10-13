import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "test-business-idea-with-ai",
  lumailTag: "guide-test-business-idea-with-ai",
  title: "How to Test My Business Idea With ChatGPT Before I Build It",
  cover: "/images/guides/test-business-idea-with-ai.webp",
  coverAlt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
  seoDescription: "Test your business idea with ChatGPT before you build it: write a one-page brief, let five critics find the problems, then test with real people.",
  tool: "ChatGPT",
  minutes: 45,
  h1: { title: "How to Test My Business Idea With ChatGPT", accent: "Before I Build It" },
  hero: {
    kind: "scene",
    src: "/images/guides/test-business-idea-with-ai.webp",
    alt: "The blue robot mascot stamping a row of idea cards with ticks and crosses",
    line: "Find the problems early. Check if people will pay. Do it all before you spend anything.",
  },
  intro: {
    heading: "Find out if people will pay before you build",
    lead: "Here is the problem. You have an idea for a new offer, and you are excited about it. You ask ChatGPT \"Is this a good idea?\" and it says yes. Then you spend weeks building it, and nobody buys. In this guide ChatGPT does a different job. It finds the weak spots in your idea and plans a one-week test with real people. You get a clear go, change or drop, before you spend anything.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Your idea on one page**: who it's for, the problem, the offer, the price, why you",
        "**The 3 biggest problems with your idea**, found by five critics with different jobs",
        "**A one-week test with real people**: who to ask, what to send, what counts as a yes",
        "**A number you set before the test**, so you can't fool yourself after",
        "**A written go, change or drop choice**, before you build anything",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. These steps are for a web browser, like Chrome.",
        "A ChatGPT account. The free plan works. Claude or Gemini work the same way.",
        "A list of people you can message: past clients, people who made an enquiry, your email list or LinkedIn contacts.",
        "One real idea to test, like a new package, a workshop or a new service for clients.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Write the idea down", accent: "15 minutes, before you open any AI.", blocks: [
      { kind: "p", text: "A vague idea gets vague feedback. So first you write your idea in 5 short parts. Then the critics have something exact to check. You do this step on your own." },
      { kind: "h3", text: "A. Make your document" },
      { kind: "list", ordered: true, items: [
        "Open [docs.google.com](https://docs.google.com) in your browser. Or open Word, if you use that.",
        "Click **Blank document**. A new empty page opens.",
        "Click **Untitled document** at the top left. Type **Idea test pack** and press Enter.",
        "Copy the table below and paste it into the page.",
      ] },
      { kind: "table", head: ["Part", "Question", "Your answer"], rows: [
        ["Who", "Who exactly is it for? What work do they do? What is going on for them now?", "[who]"],
        ["Problem", "What problem do they have, in their own words?", "[problem]"],
        ["Offer", "What do they get? What's in it, how they get it, how long it takes.", "[offer]"],
        ["Price", "What would they pay, in dollars?", "[price]"],
        ["Why you", "Why buy from you? Your experience, results or contacts.", "[why you]"],
      ] },
      { kind: "h3", text: "B. Fill it in" },
      { kind: "list", ordered: true, items: [
        "Click in the last column of the first row.",
        "Write one or two sentences in your own words. Delete the part in [brackets].",
        "Do the same for each row.",
        "Don't know an answer yet? Leave it empty. Step 02 helps you fill it.",
      ] },
      { kind: "h3", text: "C. Test your answers" },
      { kind: "p", text: "Read each answer. Could a stranger tell exactly who it is for and what they get? If not, make it more exact. Here is the difference." },
      { kind: "contrast", items: [
        { label: "Vague (example)", text: "AI help for small businesses.", good: false },
        { label: "Exact (example)", text: "A half-day online session for solo accountants who want to draft client emails with ChatGPT, for a fixed fee of [price].", good: true },
      ] },
      { kind: "example", label: "What a filled-in row looks like", text: "Who | Who exactly is it for? | Solo accountants who write every client email by hand and run out of time in tax season." },
      { kind: "tip", text: "**Can't fill in \"Why you\"?** That's good to know now. Write [CHECK]. Come back to it after the critics in step 03." },
    ] },
    { num: "02", title: "Turn it into a one-page brief", accent: "ChatGPT asks, you answer.", blocks: [
      { kind: "p", text: "A brief is a short page that explains your idea. This prompt makes ChatGPT ask what a good business adviser would ask. It asks one question at a time, until every part is clear." },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click **New chat** at the top left. You will see an empty chat box at the bottom.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace each part in [brackets] with your answer from the table in step 01.",
        "Press Enter. ChatGPT asks you a question. Answer it in a sentence or two, and press Enter. Keep going until it writes the brief.",
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
      { kind: "result", label: "What a good answer looks like", lines: [
        "First, a question: \"How many clients does a typical solo accountant you work with have?\"",
        "At the end, a brief with 5 headings: Who it's for, The problem, The offer, The price, Why me.",
        "A [CHECK] wherever you didn't give a detail.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the brief. Does it say something you didn't mean? Tell ChatGPT in the same chat, for example: \"Change the price line. It is a fixed fee, not per hour.\"",
        "When it is right, select the brief and copy it with **Ctrl + C** (or **Cmd + C** on a Mac).",
        "Paste it into your Idea test pack under a heading: **One-page brief**.",
      ] },
    ] },
    { num: "03", title: "Call in five critics", accent: "Find the weak spots.", blocks: [
      { kind: "p", text: "Ask ChatGPT \"is this good?\" and it often says yes. So here it plays five critics. Each one has one small job. That way none of them can just say \"it looks good\"." },
      { kind: "table", head: ["Critic", "Their question"], rows: [
        ["The client", "Would I pay this price? What would stop me?"],
        ["The competitor", "What do clients use now? Why would they switch?"],
        ["The accountant", "Does the price cover your time and costs?"],
        ["The marketer", "Can you say it in one sentence? Where will clients hear about it?"],
        ["The doubting friend", "What question are you avoiding?"],
      ] },
      { kind: "list", ordered: true, items: [
        "In ChatGPT, click **New chat**. A fresh chat stops the critics being kind because of the last chat.",
        "Copy the prompt below and paste it in the chat box.",
        "Change [price] to your price.",
        "Paste your one-page brief at the end, where it says [paste your one-page brief]. Press Enter.",
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
      { kind: "result", label: "What a good answer looks like (made-up example)", lines: [
        "The client: \"Half a day is a lot of time in tax season. Would I book it in March?\"",
        "The competitor: \"Many accountants already watch free videos on this. [CHECK]\"",
        "Top problem 1: the timing clashes with the busiest months. Test: ask when they would book.",
      ] },
      { kind: "list", ordered: true, items: [
        "Copy the whole answer. Paste it into your Idea test pack under a heading: **Critics' report**.",
        "Under each of the top 3 problems, write one line. Say how you'll answer it, or what you'll change.",
      ] },
      { kind: "tip", text: "**The critics agree with you too easily?** Reply in the same chat: \"Be harder. What would make this fail in the first three months?\"" },
    ] },
    { num: "04", title: "Check the critics yourself", accent: "5 minutes.", blocks: [
      { kind: "p", text: "AI can be wrong, even when it sounds sure. The critics can invent a competitor, a price or a number. Before you trust the report, check it like this." },
      { kind: "list", ordered: true, items: [
        "Open your Critics' report in your Idea test pack.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Type **[CHECK]** and press Enter. Each one lights up. These are facts the AI did not have. Write each one on a list called **Facts to find**.",
        "Now look for any number, price or company name in the report. Did it come from your brief? If not, add it to Facts to find too.",
        "For each fact, search it on [google.com](https://www.google.com), or ask a past client. Write what you find next to it.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["A [CHECK] in the report", "The AI didn't have that fact, and said so", "Find the fact yourself, or ask a client in your test"],
        ["A number that is not in your brief", "The AI may have made it up", "Don't use it until you find a real source"],
        ["A competitor you can't find online", "The AI may have invented it", "Delete that point"],
        ["Only praise, no problems", "The critics went easy on you", "Use the \"Be harder\" reply from step 03"],
      ] },
    ] },
    { num: "05", title: "Plan a one-week test", accent: "One week, real people.", blocks: [
      { kind: "p", text: "AI can only guess what clients will do. A small test with real people shows if anyone will say yes. A pass mark is the number of yeses you need for the idea to pass. You set it before you start." },
      { kind: "h3", text: "A. Get the plan" },
      { kind: "list", ordered: true, items: [
        "Go back to the chat with your critics. Or click **New chat** and paste your brief first.",
        "Paste the prompt below. Paste your brief and the top 3 problems where it says [paste].",
        "Press Enter.",
      ] },
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
      { kind: "result", label: "What a good answer looks like (made-up example)", lines: [
        "Who to ask: 20 solo accountants from your past clients and LinkedIn contacts.",
        "What counts as a yes: they book a date or pay a deposit. \"Sounds great\" is not a yes.",
        "Pass mark: for example, 3 people say yes and agree a date.",
      ] },
      { kind: "h3", text: "B. Set your pass mark and send" },
      { kind: "list", ordered: true, items: [
        "Pick your pass mark now. Write it at the top of your Idea test pack. Don't change it later.",
        "Copy the message ChatGPT wrote. Put your real price in it, in dollars.",
        "Send the message to one person at a time, by email or private message.",
        "In your Idea test pack, make a table: **Who** ([contact 1], [contact 2]) | **What they said** | **Yes or no**.",
        "Write every reply in the table the same day it comes in.",
      ] },
      { kind: "tip", text: "**Where do I find people?** Past clients, people who asked about your work before, your email list, and LinkedIn contacts who fit your brief. A private message gets more honest answers than a public post." },
    ] },
    { num: "06", title: "Go, change or drop", accent: "Against your own pass mark.", blocks: [
      { kind: "p", text: "At the end of the week, count your real yeses. Compare them with your pass mark. Decide before you start building." },
      { kind: "table", head: ["What happened", "Choice", "What to do next"], rows: [
        ["You reached the pass mark", "Go", "Build the smallest version that gives the people who said yes what you promised"],
        ["Some interest, but under the pass mark", "Change", "Change one thing (who, offer or price), using what people told you. Test again for a week"],
        ["No yeses, or only compliments", "Drop", "Write down what you learned. Keep it in your Idea test pack. Move on to your next idea"],
      ] },
      { kind: "p", text: "Not sure which row you are in? Paste your results into the same chat with this prompt. Remove names first: use [contact 1], [contact 2]." },
      { kind: "prompt", label: "Read my test results", text: `My pass mark was: [pass mark].

Here is what happened this week:
- How many people I asked: [number]
- How many replied: [number]
- How many said yes, and what they did (deposit, booked call, other): [details]
- What people said, with names removed: [paste replies]

Using only this, tell me whether the result is go, change or drop, and why. If it's change, suggest the one thing to change for next week's test. Don't round up the results or count interest as a yes.` },
      { kind: "result", label: "What a good answer looks like (made-up example)", lines: [
        "Change. 2 people booked a date, and your pass mark was 3.",
        "4 people said \"interesting\" but did not book. That is not a yes.",
        "One thing to change: 3 people said March is too busy. Offer it in May instead.",
      ] },
      { kind: "list", ordered: true, items: [
        "Check the numbers in the answer against your own reply table. Do they match?",
        "Write your choice and the reason under the table in your Idea test pack.",
      ] },
      { kind: "honest", text: "**The honest part:** AI critics have never met your clients or run your business. They help you find the right questions. Real people answer them. AI won't decide for you, and it can't promise anyone will buy. If the week goes badly, don't lower the pass mark to make the idea pass. The choice is yours. Make it against the number you set." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Idea table filled in, every answer exact enough for a stranger",
        "One-page brief saved in your Idea test pack",
        "Critics' report saved, with one line under each of the top 3 problems",
        "Every [CHECK] and every new number checked by you",
        "Pass mark written down before you sent a single message",
        "One-week test done, every reply in your table",
        "Go, change or drop choice written down, with the reason",
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
    paragraph: "Test every new offer the same way. Write a brief, call the critics, check what they said, run a one-week test. Then decide against a pass mark you set first.",
    finishLine: "Find the problems early. Then let real people decide.",
  },
};
