import type { GuidePage } from "./guide-page";

// Copy approved by the owner on 13/10/2026. Rendered by components/guides/brand-brain-page.tsx.
export const brandBrainPrompts = {
  designSystem: `Act as a senior brand designer.
Build a complete design system for my business:
[what you sell + who it is for]

Include:
- A logo direction (describe 3 options, then recommend one)
- A colour palette with hex codes and what each colour is for
- Heading and body fonts that are free to use
- Buttons, cards and spacing
- Do and don't rules

Ask me 5 questions before you start.`,
  brandKit: "Turn the final design system into one document called Brand Kit that I can save to this project.",
  voiceRules: `Read everything I have uploaded to this project.
Turn it into a Voice Rules document with these sections:

1. How we sound: 3 to 5 tone words, each with one sentence on what it means for us
2. Words and phrases we use often
3. Words and phrases we would never say
4. Sentence style: length, punctuation, emoji, capitals
5. Three short before-and-after examples: a generic sentence, then the same sentence in our voice

Only use what is in my writing. If something is unclear, ask me.`,
  dnaInterview: `Interview me to write my Brand DNA doc.
Ask one question at a time, 10 questions in total, covering:
who my customer is, what problem I solve, how I solve it,
what makes me different, and what proof I have.
Then write the doc using the six sections:
Who we help, The problem, How we solve it,
Why we are different, Proof, One line.`,
  instructions: `You are the in-house brand team for [business name].
Before you write or design anything, read Brand Kit, Voice Rules and Brand DNA in this project.

Always:
- Use only the colours and fonts in Brand Kit
- Write in the voice set out in Voice Rules, and never use a word on the "never say" list
- Speak to the customer and the problem described in Brand DNA
- If a request is missing something you need, ask one question before you start

Never invent prices, results, reviews or claims. If you need a fact that is not in the project, ask me.`,
} as const;

export const brandBrainRequests = [
  { want: "An ad", prompt: "Write 3 versions of a short ad for [product or offer]. One line on the angle behind each." },
  { want: "A landing page", prompt: "Build a landing page for [product]. Use our colours, fonts and voice. Include a headline, 3 benefits, proof and one call to action." },
  { want: "A social post", prompt: "Write an Instagram post about [topic] in our voice, with a first line that stops the scroll." },
  { want: "An email", prompt: "Write a welcome email for new subscribers. Keep it under 150 words." },
  { want: "A second opinion", prompt: "Here is something I wrote: [paste]. Rewrite it so it matches our voice rules, and tell me what you changed." },
] as const;

export const brandDnaRows = [
  ["Who we help", "We help [customer] who [situation]."],
  ["The problem", "They struggle with [problem]."],
  ["How we solve it", "We [what you do] so they [result]."],
  ["Why we are different", "Unlike [others], we [difference]."],
  ["Proof", "[numbers, results, reviews]"],
  ["One line", "[Brand] helps [customer] get [result]."],
] as const;

export const brandBrainGuide = {
  slug: "brand-brain-guide",
  title: "The Brand Brain Guide: build yours in Claude in 5 steps",
  promise: "One Claude project that holds your brand kit, voice rules and Brand DNA, so everything Claude makes matches your brand.",
  cover: "/images/guides/brand-brain-guide.webp",
  coverAlt: "Three files, Brand Kit, Voice Rules and Brand DNA, inside one Claude project called Brand Brain.",
  seoDescription: "Build a Brand Brain in Claude in 5 steps: one project with your brand kit, voice rules and Brand DNA, so ads, pages, posts and emails come back on brand.",
  lumailTag: "guide-brand-brain",
  answer: {
    paragraphs: [
      "A Brand Brain is one Claude project that holds your brand kit, your voice rules and your Brand DNA, so everything Claude makes for your business matches your brand. It takes five steps and about 30 minutes the first time.",
    ],
  },
  sections: [
    {
      kind: "steps",
      heading: "Build your Brand Brain",
      introduction: "Create the project, add a brand kit, voice rules and a Brand DNA doc, then paste the project instructions.",
      steps: [
        { title: "Create the project", body: "Open Claude, click Projects, then New project, and name it Brand Brain." },
        { title: "Build your brand kit", body: "Upload your logo, colours and fonts, or ask Claude to build a design system and save it as Brand Kit." },
        { title: "Build your brand voice", body: "Upload writing you are proud of and turn it into a Voice Rules document with a never say list." },
        { title: "Write your Brand DNA doc", body: "One page on who you help, the problem, how you solve it, why you are different, proof and one line." },
        { title: "Start creating", body: "Ask for ads, landing pages, social posts and emails inside the project." },
      ],
    },
  ],
  conclusion: {
    heading: "Keep it sharp",
    paragraphs: ["Update Brand DNA when something changes, refresh Voice Rules once a month, and put every repeated fix in a file, not in the chat."],
    finishLine: "Your Brand Brain gets better each time you correct it.",
  },
  related: [],
} as const satisfies GuidePage;
