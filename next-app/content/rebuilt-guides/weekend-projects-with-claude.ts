import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "weekend-projects-with-claude",
  lumailTag: "guide-weekend-projects-with-claude",
  title: "How to Build Simple Tools for My Business With Claude (No Coding)",
  cover: "/images/guides/weekend-projects-with-claude.webp",
  coverAlt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
  seoDescription: "Build simple business tools with Claude, no coding: a client onboarding checklist, a pricing calculator and a content calendar you can click and reuse.",
  tool: "Claude",
  minutes: 45,
  h1: { title: "How to Build Simple Tools for My Business", accent: "With Claude (No Coding)" },
  hero: {
    kind: "scene",
    src: "/images/guides/weekend-projects-with-claude.webp",
    alt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
    line: "A client checklist, a price calculator, a content calendar and more. Each one built from a single description.",
  },
  intro: {
    heading: "Three working tools, built in one sitting",
    lead: "Claude can build small tools you click and type into, straight from a plain description. You don't write any code. This guide builds three tools for a service business, shows you how to fix them one change at a time, and gives you four more to build when you're ready.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **client onboarding checklist** you tick through for every new client",
        "A **pricing calculator** that adds up a quote from your own prices",
        "A **content calendar** that shows what you're posting this week and what's still a draft",
        "The **change prompt** that fixes a first version one thing at a time",
        "**Four more build prompts**: invoice tracker, lead tracker, FAQ page and launch countdown",
      ] },
      { kind: "tip", text: "You need a Claude account. The free plan can build these tools. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "3 working tools.",
    promise: "Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know what an artifact is", accent: "Where your tool appears.", blocks: [
      { kind: "p", text: "An artifact is a small interactive page Claude builds inside the chat. It has real buttons, boxes and lists you can click and type into. Every tool in this guide is an artifact." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/) and sign in or create a free account.",
        "Start a new chat and describe the tool you want. In step 02 you'll paste a ready description.",
        "Claude writes for a moment, then the tool opens in a panel next to the chat (on a phone, tap the card in the chat to open it). Click around and type into it to test it.",
        "To keep it, look for the buttons at the top or bottom of the panel: **Copy**, **Download** or **Publish**. Publish gives you a link that opens the tool in any browser, so you can bookmark it or share it.",
        "Menu names change. If you can't find these buttons, search \"artifacts\" on [Claude's help pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them).",
      ] },
      { kind: "p", text: "Here are seven tools a service business can build this way, and what each one does." },
      { kind: "table", head: ["Tool", "What it does", "Where it's built"], rows: [
        ["Client onboarding checklist", "Lists every step from \"yes\" to first session, with a tick box for each", "Step 02"],
        ["Pricing calculator", "Adds up a quote from your packages and extras", "Step 03"],
        ["Content calendar", "Shows a month of posts by day, topic and status", "Step 04"],
        ["Invoice tracker", "Lists invoices sent, due dates and which are paid", "Step 06"],
        ["Lead tracker", "Keeps every enquiry in one place with its next step", "Step 06"],
        ["FAQ page", "Turns your most common client questions into a clickable page", "Step 06"],
        ["Launch countdown", "Counts the days to a launch and lists the jobs for each week", "Step 06"],
      ] },
      { kind: "h3", text: "Three rules before you build" },
      { kind: "list", ordered: true, items: [
        "**No private details inside.** Use first names or [client] in place of full names. Never type card details, passwords or anyone's address into a tool.",
        "**A published link can be opened by anyone who has it.** Publish the empty tool, never a copy with client details in it.",
        "**Check whether it remembers.** Some tools forget what you typed when you close them. Test it once before you rely on it.",
      ] },
      { kind: "tip", text: "**No Publish button?** Click **Download** and save the file. Double-click it any time to open the tool in your browser." },
    ] },
    { num: "02", title: "Build the onboarding checklist", accent: "Tool 1.", blocks: [
      { kind: "p", text: "This tool lists every step you take with a new client, so nothing gets missed between the first call and the first session." },
      { kind: "p", text: "First, jot down your real onboarding steps in a few words each: contract, invoice, welcome email, intake form, booking the kick-off call. Then start a new chat and paste this prompt." },
      { kind: "prompt", label: "Build my client onboarding checklist", text: `Build me a client onboarding checklist as an interactive artifact.

My business: [what you do, in one sentence]
My onboarding steps, in order:
[paste your steps, one per line]

The tool must:
- Have a box at the top to type the client's first name or a code like [client A]
- Show my steps in order, each with a tick box and a short note field
- Group the steps under 3 headings: Before we start, First week, First session
- Show progress at the top, for example "4 of 9 done"
- Have a "Start a new client" button that clears every tick

Use only the steps I gave you. If a step is unclear, ask me before you build.
Plain English labels, clean layout, easy to read on a phone.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Wait for the tool to open in the panel.",
        "Run through it with one real client in mind. Does every step make sense, in the right order?",
        "If something is missing or wrong, go to step 05 for the change prompt. Fix one thing at a time.",
        "Publish or download it (step 01) and bookmark it.",
      ] },
    ] },
    { num: "03", title: "Build the pricing calculator", accent: "Tool 2.", blocks: [
      { kind: "p", text: "This tool adds up a quote from your own packages and extras, so you stop working out sums on the back of an envelope during a sales call." },
      { kind: "p", text: "Write down your packages and extras with your prices. You type the prices in; Claude never picks them for you." },
      { kind: "prompt", label: "Build my pricing calculator", text: `Build me a pricing calculator as an interactive artifact.

My packages (pick one):
- [package name]: [price]
- [package name]: [price]
- [package name]: [price]

My extras (tick any):
- [extra]: [price]
- [extra]: [price]

The tool must:
- Let me pick one package and tick any extras
- Have a quantity box for extras that can be bought more than once
- Have an optional discount box, as a percentage
- Show the total clearly, with a line-by-line breakdown above it
- Show the currency as [your currency]

Use only the prices I gave you. Never suggest, change or round my prices.
If a price is missing, show [CHECK] in its place.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Test it with a quote you've already sent. The total must match what you worked out yourself.",
        "If the sum is wrong, tell Claude the exact numbers you entered and the total you expected (step 05).",
      ] },
      { kind: "tip", text: "The calculator does the sums. You still decide what to charge each client, and you check the total before it goes in a proposal." },
    ] },
    { num: "04", title: "Build the content calendar", accent: "Tool 3.", blocks: [
      { kind: "p", text: "This tool shows a month of posts at a glance: what's going out, where, and what's still a draft." },
      { kind: "prompt", label: "Build my content calendar", text: `Build me a content calendar as an interactive artifact.

Where I post: [for example: LinkedIn, Instagram, my newsletter]
How often: [for example: 3 times a week]
My main topics: [3 to 5 topics, one per line]

The tool must:
- Show one month as a grid, with a "next month" and "last month" button
- Let me click a day to add a post: platform, topic, a one-line idea, status
- Use 3 statuses, each in its own colour: Idea, Draft, Ready
- Have a list view underneath showing this week's posts, soonest first
- Filter by platform

Start it empty. Do not add example posts with real-sounding names or dates.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Add next week's posts and click through each status.",
        "Close the tool and open it again. If your posts are gone, it doesn't remember. Use the change prompt to ask for a **Download as spreadsheet** button so you can save your plan.",
      ] },
    ] },
    { num: "05", title: "Fix it one change at a time", accent: "The change prompt.", blocks: [
      { kind: "p", text: "First versions are rarely perfect. Asking for five changes at once often breaks something that already worked. Ask for one change, test it, then ask for the next." },
      { kind: "p", text: "Stay in the same chat as the tool and paste this." },
      { kind: "prompt", label: "Change one thing", text: `Change one thing in this tool: [describe the change].
Why: [what happens now, and what should happen instead].

Keep everything else exactly the same.
Tell me in one line what you changed.` },
      { kind: "table", head: ["What you see", "What to ask for"], rows: [
        ["Text too small on your phone", "Make all text larger on small screens"],
        ["A total that's wrong", "When I enter [these numbers], the total should be [number], it shows [number]"],
        ["Your entries disappear when you close it", "Add a Download as spreadsheet button"],
        ["Colours that don't match your brand", "Use these colours: [your colour codes]"],
        ["A step in the wrong place", "Move [step] so it comes after [step]"],
      ] },
      { kind: "tip", text: "**Stuck after a few changes?** Start a new chat, paste your original build prompt with the fix written into it, and build a clean version." },
    ] },
    { num: "06", title: "Build four more", accent: "When you're ready.", blocks: [
      { kind: "p", text: "Each of these starts a new chat. Build one, test it with step 05, then move to the next." },
      { kind: "prompt", label: "Invoice tracker", text: `Build me an invoice tracker as an interactive artifact.
For each invoice I can add: invoice number, client code like [client A], amount, date sent, date due, paid (tick).
Show unpaid invoices at the top, with anything past its due date in red.
Show the total unpaid at the top.
Start it empty. Do not connect to any outside website.` },
      { kind: "prompt", label: "Lead tracker", text: `Build me a lead tracker as an interactive artifact.
For each enquiry I can add: first name or code, where they found me, what they asked about, date, next step, status (New, Call booked, Proposal sent, Won, Not now).
Show leads with a next step due today or earlier at the top.
Show a count for each status.
Start it empty. Do not connect to any outside website.` },
      { kind: "prompt", label: "FAQ page", text: `Build me an FAQ page as an interactive artifact for my clients.
My business: [what you do, in one sentence]
Questions and my answers:
[paste each question and your answer]

Show each question as a line that opens to show the answer when clicked.
Add a search box at the top.
Use my answers word for word. Do not add questions or answers of your own.
Do not connect to any outside website.` },
      { kind: "prompt", label: "Launch countdown", text: `Build me a launch countdown as an interactive artifact.
What I'm launching: [offer or event]
Launch date: [date]
My jobs before launch: [paste your jobs, one per line]

Show the days left in large numbers at the top.
Below it, list my jobs grouped by week, each with a tick box.
Show how many jobs are done.
Use only the jobs I gave you. Do not connect to any outside website.` },
      { kind: "honest", text: "**The honest part:** these are handy tools for your own use, not secure software. They don't replace your accounting software or your client system, and they can get a sum or a date wrong. Test each one with real numbers you already know, and keep private client details out of anything you publish." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Onboarding checklist built, tested and saved",
        "Pricing calculator built and checked against a real quote",
        "Content calendar built, with next week's posts in it",
        "Tested whether each tool remembers what you typed",
        "One of the four extra tools built",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your tools are built.",
    accent: "Now cut the ones you pay for and don't use.",
    body: "The next guide uses AI to find every repeat payment on your business card, so you can see what each tool really costs you and cancel the ones you've stopped using.",
    label: "Find your unused subscriptions →",
    href: "/guides/test-meta-muse-money-saving-task/",
  },
  conclusion: {
    heading: "Keep them working",
    paragraph: "Add a step to your onboarding checklist each time you catch something you missed, update the calculator the day your prices change, and build one new tool when the same job annoys you twice.",
    finishLine: "Describe it, test it, fix one thing at a time.",
  },
};
