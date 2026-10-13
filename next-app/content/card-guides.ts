import type { GuidePage, WalkthroughBlock } from "./guide-page";

/*
 * Card-format guides: numbered step cards, copyable prompts and a sign-up card
 * after the first steps. One object per guide, rendered by
 * components/guides/card-guide-page.tsx. Text fields accept **bold**,
 * *italic* and [label](https://link).
 */
export type CardBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; ordered?: boolean; items: readonly string[] }
  | { kind: "tip"; text: string }
  | { kind: "honest"; text: string }
  | { kind: "prompt"; label: string; text: string }
  | { kind: "table"; head: readonly string[]; rows: readonly (readonly string[])[] }
  | { kind: "requests"; items: readonly { want: string; prompt: string }[] }
  | { kind: "checklist"; items: readonly string[] };

export type CardStep = {
  /** Tile text, e.g. "01" or "✓". */
  num: string;
  title: string;
  /** Pink italic subtitle, e.g. "The container." */
  accent: string;
  blocks: readonly CardBlock[];
};

export type CardGuide = {
  slug: string;
  lumailTag: string;
  title: string;
  cover: string;
  coverAlt: string;
  seoDescription: string;
  tool: string;
  minutes: number;
  h1: { title: string; accent: string };
  /**
   * Optional hero banner, same as the other guides: "pose" is a transparent
   * mascot from /images/mascot/, "scene" a 16:9 illustration with the pink offset.
   */
  hero?: { kind: "pose" | "scene"; src: string; alt: string; line: string };
  intro: { heading: string; lead: string; blocks: readonly CardBlock[] };
  /** How many steps stay open before the sign-up card. */
  openSteps: number;
  gate: { heading: string; accent: string; promise: string; action: string };
  steps: readonly CardStep[];
  cta: { eyebrow: string; heading: string; accent: string; body: string; label: string; href: string };
  conclusion: { heading: string; paragraph: string; finishLine: string };
};

export const cardGuides: readonly CardGuide[] = [
  {
    // Copy supplied and approved by the owner on 13/10/2026.
    slug: "brand-brain-guide",
    lumailTag: "guide-brand-brain",
    title: "The Brand Brain Guide: build yours in Claude in 5 steps",
    cover: "/images/guides/brand-brain-guide.webp",
    coverAlt: "Three files, Brand Kit, Voice Rules and Brand DNA, inside one Claude project called Brand Brain.",
    seoDescription: "Build a Brand Brain in Claude in 5 steps: one project with your brand kit, voice rules and Brand DNA, so ads, pages, posts and emails come back on brand.",
    tool: "Claude",
    minutes: 30,
    h1: { title: "The Brand Brain Guide: build yours", accent: "in Claude in 5 steps." },
    hero: {
      kind: "pose",
      src: "/images/mascot/explaining.webp",
      alt: "The Shift & Lead mascot pointing at three cards: an idea, a chart and a graph.",
      line: "One Claude project that holds your brand kit, your voice rules and your Brand DNA.",
    },
    intro: {
      heading: "One project that knows your brand",
      lead: "A Brand Brain is one Claude project that holds your brand kit, your voice rules and your Brand DNA, so everything Claude makes for your business matches your brand. It takes five steps and about 30 minutes the first time.",
      blocks: [
        { kind: "h3", text: "What you end up with" },
        { kind: "list", items: [
          "One Claude project called **Brand Brain**",
          "A **brand kit**: logo, colours and fonts, either your own or a design system Claude builds for you",
          "**Voice rules**: how you sound, the words you use and the words you never say",
          "A one-page **Brand DNA** doc: who you help, the problem you solve and why you are different",
          "A place to ask for ads, landing pages, posts and emails that come back on brand the first time",
        ] },
        { kind: "tip", text: "You need a Claude plan that includes Projects. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
      ],
    },
    openSteps: 1,
    gate: {
      heading: "Get the",
      accent: "Brand Brain Guide.",
      promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
      action: "Open the rest of the guide",
    },
    steps: [
      { num: "01", title: "Create the project", accent: "The container.", blocks: [
        { kind: "p", text: "The project is the container: anything you add to it is read by every chat you start inside it." },
        { kind: "list", ordered: true, items: [
          "Open [Claude](https://claude.ai/) and click **Projects** in the left sidebar.",
          "Click **New project**.",
          "Name it **Brand Brain**.",
          "In the description, write one line about your business, for example: “Everything about [business name]: brand kit, voice and customer.”",
        ] },
        { kind: "tip", text: "Keep the project open. The next three steps each add one file to it." },
      ] },
      { num: "02", title: "Build your brand kit", accent: "What you look like.", blocks: [
        { kind: "p", text: "Your brand kit tells Claude what your business looks like: logo, colours and fonts." },
        { kind: "p", text: "**If you already have a brand:** upload your logo files, your colour codes and your font names to the project's files. A brand guidelines PDF works too. Then skip to Step 3." },
        { kind: "p", text: "**If you do not have one yet:** start a chat inside the project and paste this prompt." },
        { kind: "prompt", label: "Build a design system", text: `Act as a senior brand designer.
Build a complete design system for my business:
[what you sell + who it is for]

Include:
- A logo direction (describe 3 options, then recommend one)
- A colour palette with hex codes and what each colour is for
- Heading and body fonts that are free to use
- Buttons, cards and spacing
- Do and don't rules

Ask me 5 questions before you start.` },
        { kind: "p", text: "Answer the five questions, then push back on anything that does not feel like you. When you are happy, ask:" },
        { kind: "prompt", label: "Turn it into a Brand Kit", text: "Turn the final design system into one document called Brand Kit that I can save to this project." },
        { kind: "p", text: "Save that document to the project's files." },
      ] },
      { num: "03", title: "Build your brand voice", accent: "How you sound.", blocks: [
        { kind: "p", text: "Voice rules are what stop Claude sounding like a generic AI and make it sound like you." },
        { kind: "list", ordered: true, items: [
          "Upload anything your business has ever written to the project: website pages, emails, newsletters, social captions, sales pages. Five to ten pieces is enough; more is better.",
          "Pick writing you are proud of. Claude copies what you give it, so leave out anything that does not sound like you.",
          "Start a chat inside the project and paste this prompt.",
        ] },
        { kind: "prompt", label: "Write my Voice Rules", text: `Read everything I have uploaded to this project.
Turn it into a Voice Rules document with these sections:

1. How we sound: 3 to 5 tone words, each with one sentence on what it means for us
2. Words and phrases we use often
3. Words and phrases we would never say
4. Sentence style: length, punctuation, emoji, capitals
5. Three short before-and-after examples: a generic sentence, then the same sentence in our voice

Only use what is in my writing. If something is unclear, ask me.` },
        { kind: "p", text: "Read what comes back and correct it. The “never say” list is the most useful part, so add every word that makes you cringe. Save the final version to the project's files as **Voice Rules**." },
        { kind: "tip", text: "**No writing yet?** Record yourself explaining your business for two minutes, paste the transcript in, and run the same prompt." },
      ] },
      { num: "04", title: "Write your Brand DNA doc", accent: "The step that matters most.", blocks: [
        { kind: "p", text: "The Brand DNA doc is one page that tells Claude who you sell to, what problem you solve and why you are different. Fill in the brackets and save it to the project as **Brand DNA**." },
        { kind: "table", head: ["#", "Section", "Fill in"], rows: [
          ["1", "Who we help", "We help [customer] who [situation]."],
          ["2", "The problem", "They struggle with [problem]."],
          ["3", "How we solve it", "We [what you do] so they [result]."],
          ["4", "Why we are different", "Unlike [others], we [difference]."],
          ["5", "Proof", "[numbers, results, reviews]"],
          ["6", "One line", "[Brand] helps [customer] get [result]."],
        ] },
        { kind: "h3", text: "Tips for filling it in" },
        { kind: "list", items: [
          "Be specific about the customer. “Busy cafe owners with one location” beats “small businesses”.",
          "Write the problem in your customer's words, the way they would say it to a friend.",
          "For proof, real numbers and real quotes only. Leave it short if you are new.",
        ] },
        { kind: "p", text: "**Stuck?** Paste this prompt into a chat inside the project and let Claude interview you." },
        { kind: "prompt", label: "Interview me for my Brand DNA", text: `Interview me to write my Brand DNA doc.
Ask one question at a time, 10 questions in total, covering:
who my customer is, what problem I solve, how I solve it,
what makes me different, and what proof I have.
Then write the doc using the six sections:
Who we help, The problem, How we solve it,
Why we are different, Proof, One line.` },
      ] },
      { num: "05", title: "Start creating", accent: "Ask for what you need.", blocks: [
        { kind: "p", text: "Open a new chat inside the Brand Brain project and ask for what you need; Claude reads your three files before it answers. Start with requests like these." },
        { kind: "requests", items: [
          { want: "An ad", prompt: "Write 3 versions of a short ad for [product or offer]. One line on the angle behind each." },
          { want: "A landing page", prompt: "Build a landing page for [product]. Use our colours, fonts and voice. Include a headline, 3 benefits, proof and one call to action." },
          { want: "A social post", prompt: "Write an Instagram post about [topic] in our voice, with a first line that stops the scroll." },
          { want: "An email", prompt: "Write a welcome email for new subscribers. Keep it under 150 words." },
          { want: "A second opinion", prompt: "Here is something I wrote: [paste]. Rewrite it so it matches our voice rules, and tell me what you changed." },
        ] },
        { kind: "honest", text: "**When something comes back off brand,** say what is wrong (“too formal”, “we never say ‘unlock’”) and ask Claude to update the Voice Rules file with that note. The Brand Brain gets better each time you correct it." },
      ] },
      { num: "06", title: "Project instructions", accent: "Paste once.", blocks: [
        { kind: "p", text: "Project instructions make Claude check your files every time without being asked. Open the project, find **Instructions**, and paste this." },
        { kind: "prompt", label: "Project instructions", text: `You are the in-house brand team for [business name].
Before you write or design anything, read Brand Kit, Voice Rules and Brand DNA in this project.

Always:
- Use only the colours and fonts in Brand Kit
- Write in the voice set out in Voice Rules, and never use a word on the "never say" list
- Speak to the customer and the problem described in Brand DNA
- If a request is missing something you need, ask one question before you start

Never invent prices, results, reviews or claims. If you need a fact that is not in the project, ask me.` },
      ] },
      { num: "07", title: "Keep it sharp", accent: "Small habits.", blocks: [
        { kind: "list", items: [
          "**When something changes** (new offer, new price, new customer): update Brand DNA the same day.",
          "**Once a month:** add your best new writing to the project and ask Claude to refresh the Voice Rules.",
          "**When Claude gets it wrong twice:** the fix belongs in a file, not in the chat. Add the rule to Voice Rules or Brand Kit.",
          "**Keep the files short.** One to two pages each works better than a 40-page brand book.",
        ] },
      ] },
      { num: "✓", title: "Checklist", accent: "Six boxes.", blocks: [
        { kind: "checklist", items: [
          "Project created and named Brand Brain",
          "Brand Kit saved to the project",
          "Voice Rules saved to the project",
          "Brand DNA saved to the project",
          "Project instructions pasted in",
          "First ad, page or post made",
        ] },
      ] },
    ],
    cta: {
      eyebrow: "Free AI guides",
      heading: "Your Brand Brain is set up.",
      accent: "Pick the next job.",
      body: "The free guides library has more step-by-step guides like this one, each built around one job you can finish in a sitting.",
      label: "Browse the free guides →",
      href: "/guides/",
    },
    conclusion: {
      heading: "Keep it sharp",
      paragraph: "Update Brand DNA when something changes, refresh Voice Rules once a month, and put every repeated fix in a file, not in the chat.",
      finishLine: "Your Brand Brain gets better each time you correct it.",
    },
  },
];

function plain(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function toWalkthrough(block: CardBlock): WalkthroughBlock[] {
  switch (block.kind) {
    case "p": case "tip": case "honest": case "h3": return [{ kind: "paragraph", text: plain(block.text) }];
    case "list": case "checklist": return [{ kind: "list", items: block.items.map(plain) }];
    case "prompt": return [{ kind: "code", label: block.label, text: block.text }];
    case "table": return [{ kind: "table", rows: [block.head, ...block.rows] }];
    case "requests": return [{ kind: "list", items: block.items.map((item) => `${item.want}: ${item.prompt}`) }];
  }
}

/** The shared GuidePage shape used for metadata, search, related cards and email. */
export const cardGuidePages: readonly GuidePage[] = cardGuides.map((card) => ({
  slug: card.slug,
  title: card.title,
  promise: card.seoDescription,
  cover: card.cover,
  coverAlt: card.coverAlt,
  seoDescription: card.seoDescription,
  lumailTag: card.lumailTag,
  answer: { paragraphs: [card.intro.lead] },
  sections: [{
    kind: "walkthrough",
    heading: card.title,
    introduction: card.intro.lead,
    blocks: card.steps.flatMap((step): WalkthroughBlock[] => [{ kind: "heading", text: step.title }, ...step.blocks.flatMap(toWalkthrough)]),
  }],
  conclusion: { heading: card.conclusion.heading, paragraphs: [card.conclusion.paragraph], finishLine: card.conclusion.finishLine },
  related: [],
}));

export function getCardGuide(slug: string): CardGuide | undefined {
  return cardGuides.find((guide) => guide.slug === slug);
}
