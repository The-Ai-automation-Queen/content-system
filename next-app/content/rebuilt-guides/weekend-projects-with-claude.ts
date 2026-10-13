import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "weekend-projects-with-claude",
  lumailTag: "guide-weekend-projects-with-claude",
  title: "How to Build Simple Tools for My Business With Claude (No Coding)",
  cover: "/images/guides/weekend-projects-with-claude.webp",
  coverAlt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
  seoDescription: "Build simple business tools with Claude, no coding: a client checklist, a price calculator and a post calendar. You can click them and use them again.",
  tool: "Claude",
  minutes: 45,
  h1: { title: "How to Build Simple Tools for My Business", accent: "With Claude (No Coding)" },
  hero: {
    kind: "scene",
    src: "/images/guides/weekend-projects-with-claude.webp",
    alt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
    line: "A client checklist, a price calculator, a post calendar and more. You describe each one, and Claude builds it.",
  },
  intro: {
    heading: "Three working tools, built in one sitting",
    lead: "Claude can build small tools you can click and type into. You describe the tool in plain words. You don't write any code. This guide builds three tools for a service business. Then it shows you how to fix them, one change at a time. It also gives you four more to build later.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "A **client checklist** to tick through for each new client",
        "A **price calculator** that adds up a quote from your prices",
        "A **post calendar** that shows this week's posts and drafts",
        "The **change prompt** to fix a tool one thing at a time",
        "**Four more build prompts**: invoices, leads, FAQ page, launch countdown",
      ] },
      { kind: "tip", text: "You need a Claude account. The free plan can build these tools. You can copy and paste every prompt below as it is. Replace the parts in [square brackets]." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "3 working tools.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know what an artifact is", accent: "Where your tool appears.", blocks: [
      { kind: "p", text: "An artifact is a small page Claude builds inside the chat. It has real buttons, boxes and lists. You can click them and type into them. Every tool in this guide is an artifact." },
      { kind: "list", ordered: true, items: [
        "Go to [claude.ai](https://claude.ai/). Sign in or make a free account.",
        "Start a new chat. Describe the tool you want. In step 02 you paste a ready description.",
        "Claude writes for a moment. Then the tool opens in a panel next to the chat. On a phone, tap the card in the chat to open it. Click and type in it to test it.",
        "To keep it, look at the top or bottom of the panel. Find **Copy**, **Download** or **Publish**. Publish gives you a link. The link opens the tool in any browser. You can save it or share it.",
        "Menu names change. Can't find these buttons? Search \"artifacts\" on [Claude's help pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them).",
      ] },
      { kind: "p", text: "Here are seven tools a service business can build this way. The table shows what each one does." },
      { kind: "table", head: ["Tool", "What it does", "Where it's built"], rows: [
        ["Client checklist", "Every step from \"yes\" to first session, each with a tick box", "Step 02"],
        ["Price calculator", "Adds up a quote from your packages and extras", "Step 03"],
        ["Post calendar", "A month of posts by day, topic and stage", "Step 04"],
        ["Invoice tracker", "Invoices sent, due dates, and which are paid", "Step 06"],
        ["Lead tracker", "Every new question from a buyer, with its next step", "Step 06"],
        ["FAQ page", "Your most common client questions, on one page", "Step 06"],
        ["Launch countdown", "Days to a launch, and the jobs for each week", "Step 06"],
      ] },
      { kind: "h3", text: "Three rules before you build" },
      { kind: "list", ordered: true, items: [
        "**Keep private details out.** Use first names or [client], not full names. Never type card details, passwords or home addresses into a tool.",
        "**Anyone with a published link can open it.** Publish the empty tool. Never publish a copy with client details in it.",
        "**Check if it remembers.** Some tools forget what you typed when you close them. Test this once before you rely on it.",
      ] },
      { kind: "tip", text: "**No Publish button?** Click **Download** and save the file. Double-click the file to open the tool in your browser." },
    ] },
    { num: "02", title: "Build the client checklist", accent: "Tool 1.", blocks: [
      { kind: "p", text: "This tool lists every step you take with a new client. Then nothing gets missed between the first call and the first session." },
      { kind: "p", text: "First, write down your real steps for a new client. Use a few words each. For example: contract, invoice, welcome email, intake form, book the first call. Then start a new chat and paste this prompt." },
      { kind: "prompt", label: "Build my client checklist", text: `Build me a client onboarding checklist as an interactive artifact.

My business: [what you do, in one sentence]
My steps for a new client, in order:
[paste your steps, one per line]

The tool must:
- Have a box at the top to type the client's first name or a code like [client A]
- Show my steps in order, each with a tick box and a short note box
- Group the steps under 3 headings: Before we start, First week, First session
- Show progress at the top, for example "4 of 9 done"
- Have a "Start a new client" button that clears every tick

Use only the steps I gave you. If a step is unclear, ask me before you build.
Plain English labels, clean layout, easy to read on a phone.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Wait for the tool to open in the panel.",
        "Go through it with one real client in mind. Does each step make sense? Is the order right?",
        "Is something missing or wrong? Go to step 05 for the change prompt. Fix one thing at a time.",
        "Publish it or download it (see step 01). Save the link.",
      ] },
    ] },
    { num: "03", title: "Build the price calculator", accent: "Tool 2.", blocks: [
      { kind: "p", text: "This tool adds up a quote from your own packages and extras. You stop doing sums by hand during a sales call." },
      { kind: "p", text: "Write down your packages and extras with your prices. You type the prices in. Claude never picks them for you." },
      { kind: "prompt", label: "Build my price calculator", text: `Build me a pricing calculator as an interactive artifact.

My packages (pick one):
- [package name]: [price]
- [package name]: [price]
- [package name]: [price]

My extras (tick any):
- [extra]: [price]
- [extra]: [price]

The tool must:
- Let me pick one package and tick any extras
- Have a number box for extras that can be bought more than once
- Have a box for a discount, as a percentage (it can stay empty)
- Show the total clearly, with each line of the sum above it
- Show the money as [your currency]

Use only the prices I gave you. Never suggest, change or round my prices.
If a price is missing, show [CHECK] in its place.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Test it with a quote you already sent. The total must match your own sum.",
        "Is the sum wrong? Tell Claude the numbers you typed and the total you expected (step 05).",
      ] },
      { kind: "tip", text: "The calculator does the sums. You still decide what to charge. Check the total before it goes into a quote." },
    ] },
    { num: "04", title: "Build the post calendar", accent: "Tool 3.", blocks: [
      { kind: "p", text: "This tool shows a month of posts on one screen. You see what goes out, where it goes, and what is still a draft." },
      { kind: "prompt", label: "Build my post calendar", text: `Build me a content calendar as an interactive artifact.

Where I post: [for example: LinkedIn, Instagram, my newsletter]
How often: [for example: 3 times a week]
My main topics: [3 to 5 topics, one per line]

The tool must:
- Show one month as a grid, with a "next month" and "last month" button
- Let me click a day to add a post: platform, topic, a one-line idea, status
- Use 3 statuses, each in its own colour: Idea, Draft, Ready
- Have a list underneath with this week's posts, soonest first
- Let me show one platform at a time

Start it empty. Do not add example posts with real-sounding names or dates.
Do not connect to any outside website.` },
      { kind: "list", ordered: true, items: [
        "Add next week's posts. Click through each stage.",
        "Close the tool and open it again. Are your posts gone? Then it doesn't remember. Use the change prompt to ask for a **Download as spreadsheet** button. Then you can save your plan.",
      ] },
    ] },
    { num: "05", title: "Fix it one change at a time", accent: "The change prompt.", blocks: [
      { kind: "p", text: "First versions are rarely perfect. Five changes at once often break something that worked. Ask for one change. Test it. Then ask for the next." },
      { kind: "p", text: "Stay in the same chat as the tool. Paste this." },
      { kind: "prompt", label: "Change one thing", text: `Change one thing in this tool: [describe the change].
Why: [what happens now, and what should happen instead].

Keep everything else exactly the same.
Tell me in one line what you changed.` },
      { kind: "table", head: ["What you see", "What to ask for"], rows: [
        ["Text too small on your phone", "Make all text bigger on small screens"],
        ["A wrong total", "When I enter [these numbers], the total should be [number]. It shows [number]"],
        ["Your entries are gone after you close it", "Add a Download as spreadsheet button"],
        ["Colours that don't match your brand", "Use these colours: [your colour codes]"],
        ["A step in the wrong place", "Move [step] so it comes after [step]"],
      ] },
      { kind: "tip", text: "**Stuck after a few changes?** Start a new chat. Paste your first build prompt with the fix written into it. Claude builds a clean new version." },
    ] },
    { num: "06", title: "Build four more", accent: "When you're ready.", blocks: [
      { kind: "p", text: "Start a new chat for each one. Build one and test it with step 05. Then move to the next." },
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
      { kind: "honest", text: "**The honest part:** these tools are handy for your own use. They are not safe software. They don't replace the app for your accounts or your client system. They can get a sum or a date wrong. Test each one with real numbers you already know. Keep private client details out of anything you publish." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Client checklist built, tested and saved",
        "Price calculator built and checked against a real quote",
        "Post calendar built, with next week's posts in it",
        "Checked if each tool remembers what you typed",
        "One of the four extra tools built",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your tools are built.",
    accent: "Now stop paying for tools you don't use.",
    body: "The next guide uses AI to find every repeat payment on your business card. You see what each tool really costs. Then you cancel the ones you stopped using.",
    label: "Find your unused subscriptions →",
    href: "/guides/test-meta-muse-money-saving-task/",
  },
  conclusion: {
    heading: "Keep them working",
    paragraph: "Did you miss a step with a client? Add it to your checklist. Did your prices change? Update the calculator that day. Does the same job annoy you twice? Build a new tool for it.",
    finishLine: "Describe it, test it, fix one thing at a time.",
  },
};
