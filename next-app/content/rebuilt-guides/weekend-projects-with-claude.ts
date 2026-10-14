import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "weekend-projects-with-claude",
  lumailTag: "guide-weekend-projects-with-claude",
  title: "How to Build Simple Tools for My Business With Claude (No Coding)",
  cover: "/images/guides/weekend-projects-with-claude.webp",
  coverAlt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
  seoDescription: "Build simple business tools with Claude, no coding: a client checklist, a price calculator and a post calendar. 6 steps.",
  tool: "Claude",
  minutes: 45,
  h1: { title: "How to Build Simple Tools for My Business", accent: "With Claude (No Coding)" },
  hero: {
    kind: "scene",
    src: "/images/guides/weekend-projects-with-claude.webp",
    alt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
    line: "You describe the tool. Claude builds it. No code.",
  },
  intro: {
    heading: "Build the tools you keep wishing for",
    lead: "Small jobs slip when you do them by hand. Here Claude builds a checklist, a calculator and a calendar, with no code from you. It takes 45 minutes.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A client checklist** for every new yes",
        "**A price calculator** that uses your own prices",
        "**A post calendar** with a month on one screen",
        "**Four more tools**: invoices, enquiries, an FAQ page, a launch countdown",
      ] },
      { kind: "tip", text: "You need a Claude account at claude.ai. The free plan works. Copy each prompt as it is and change the [brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "3 working tools.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Build a tiny test tool", accent: "See how it works.", blocks: [
      { kind: "p", text: "Claude builds each tool as an artifact (a small page in the chat you can click). Try a tiny one first." },
      { kind: "list", ordered: true, items: [
        "Open [Claude](https://claude.ai/) and click **New chat**.",
        "Type: **Build a simple tick list as an interactive artifact, with 3 tick boxes: Send contract, Send invoice, Book first call.**",
        "Press Enter. A panel opens with your tick list.",
        "Click a box. A tick appears.",
        "Click **Publish** to get a link, or **Download** to save the file.",
      ] },
      { kind: "tip", text: "Can't find it? Only code, or no panel? Search \"artifacts\" on [Claude's help pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)." },
    ] },
    { num: "02", title: "Build the client checklist", accent: "Nothing missed after yes.", blocks: [
      { kind: "p", text: "List every step from a client's yes to their first session. Then nothing gets missed." },
      { kind: "prompt", label: "Build my client checklist", text: `Build me a client onboarding checklist as an interactive artifact.

My business: [what you do, in one sentence]
My steps for a new client, in order:
[your steps, one per line]

The tool must:
- Have a box at the top for a code like [client A]
- Show my steps in order, each with a tick box
- Show progress at the top, like "4 of 9 done"
- Have a "Start a new client" button that clears every tick

Use only the steps I give you. If a step is unclear, ask me first.
Easy to read on a phone. Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Tick two steps. Check it says 2 done.",
        "Check every step is yours, in your order.",
        "Click **Start a new client**. Every tick should clear.",
      ] },
    ] },
    { num: "03", title: "Build the price calculator", accent: "Your prices, added up.", blocks: [
      { kind: "p", text: "No more sums by hand on a sales call. You type the prices. Claude never picks them." },
      { kind: "prompt", label: "Build my price calculator", text: `Build me a pricing calculator as an interactive artifact.

My packages (pick one):
- [package name]: [price]
- [package name]: [price]

My extras (tick any):
- [extra]: [price]
- [extra]: [price]

The tool must:
- Let me pick one package and tick any extras
- Have a box for a discount, as a percentage
- Show each line of the sum, then the total
- Show the money in [your currency]

Use only the prices I give you. Never change or round them.
If a price is missing, show [CHECK]. Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Rebuild a quote you already sent.",
        "Check the total matches, to the cent.",
        "Wrong? Use step 05 to fix it.",
      ] },
    ] },
    { num: "04", title: "Build the post calendar", accent: "A month on one screen.", blocks: [
      { kind: "p", text: "See what goes out, where, and what is still a draft." },
      { kind: "prompt", label: "Build my post calendar", text: `Build me a content calendar as an interactive artifact.

Where I post: [for example: LinkedIn, Instagram, my newsletter]
How often: [for example: 3 times a week]
My main topics: [3 to 5 topics]

The tool must:
- Show one month as a grid, with next and last month buttons
- Let me click a day to add a post: platform, topic, one-line idea, status
- Use 3 statuses, each in its own colour: Idea, Draft, Ready
- List this week's posts under the grid

Start it empty. Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Add one post next week.",
        "Close the tab and open the tool again.",
        "Post gone? Ask for a **Download as spreadsheet** button in step 05.",
      ] },
    ] },
    { num: "05", title: "Fix one thing", accent: "Test after each change.", blocks: [
      { kind: "p", text: "Five changes at once can break what works. Ask for one, then test it." },
      { kind: "prompt", label: "Change one thing", text: `Change one thing in this tool: [the change].
Why: [what happens now, and what should happen].

Keep everything else exactly the same.
Tell me in one line what you changed.` },
      { kind: "p", text: "Test the change. Then test one thing that worked before." },
      { kind: "honest", text: "**The honest part:** these tools are for your own use. They can get a sum or a date wrong, so test with numbers you know. Anyone with a published link can open it. Publish only empty tools, never client details." },
    ] },
    { num: "06", title: "Build four more", accent: "When you're ready.", blocks: [
      { kind: "p", text: "Build one at a time, each in a **New chat**. Test it with something you already know." },
      { kind: "prompt", label: "Invoice tracker", text: `Build me an invoice tracker as an interactive artifact.
For each invoice: number, client code like [client A], amount, date sent, date due, paid (tick).
Show unpaid invoices first, overdue ones in red, and the total unpaid at the top.
Start it empty. Do not connect to any outside website.` },
      { kind: "prompt", label: "Lead tracker", text: `Build me a lead tracker as an interactive artifact.
For each enquiry: first name or code, where they found me, what they asked, date, next step, status (New, Call booked, Proposal sent, Won, Not now).
Show leads with a next step due today or earlier first.
Start it empty. Do not connect to any outside website.` },
      { kind: "prompt", label: "FAQ page", text: `Build me an FAQ page as an interactive artifact for my clients.
My business: [what you do, in one sentence]
Questions and my answers:
[each question and your answer]

Each question opens to show the answer when clicked. Add a search box.
Use my answers word for word. Do not add your own.
Do not connect to any outside website.` },
      { kind: "prompt", label: "Launch countdown", text: `Build me a launch countdown as an interactive artifact.
What I'm launching: [offer or event]
Launch date: [date]
My jobs before launch: [one per line]

Show the days left in large numbers. List my jobs by week, each with a tick box.
Use only the jobs I give you. Do not connect to any outside website.` },
    ] },
    { num: "✓", title: "Checklist", accent: "Five boxes.", blocks: [
      { kind: "checklist", items: [
        "Built the tiny tick list and saved it",
        "Client checklist built with your real steps",
        "Calculator matches one real quote",
        "Calendar tested after closing the tab",
        "One extra tool built and tested",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your tools are built.",
    accent: "Now stop paying for tools you don't use.",
    body: "The next guide finds every repeat payment on your business card. Then you cancel what you stopped using.",
    label: "Find your unused subscriptions →",
    href: "/guides/test-meta-muse-money-saving-task/",
  },
  conclusion: {
    heading: "Keep it simple",
    paragraph: "Describe the tool. Test it with numbers you know. Fix one thing at a time.",
    finishLine: "Same job twice? Build a tool for it.",
  },
};
