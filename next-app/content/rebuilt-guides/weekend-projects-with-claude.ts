import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "weekend-projects-with-claude",
  lumailTag: "guide-weekend-projects-with-claude",
  title: "How to Build Simple Tools for My Business With Claude (No Coding)",
  cover: "/images/guides/weekend-projects-with-claude.webp",
  coverAlt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
  seoDescription: "Build simple business tools with Claude, no coding: a client checklist, a price calculator and a post calendar. You can click them and use them again.",
  tool: "Claude",
  minutes: 60,
  h1: { title: "How to Build Simple Tools for My Business", accent: "With Claude (No Coding)" },
  hero: {
    kind: "scene",
    src: "/images/guides/weekend-projects-with-claude.webp",
    alt: "The blue robot mascot building a small machine from gears, a drawer and a horn",
    line: "A client checklist, a price calculator, a post calendar and more. You describe each one, and Claude builds it.",
  },
  intro: {
    heading: "Build the small tools you keep wishing you had",
    lead: "Here is the problem. A new client says yes, and you rush to send the contract. Then you forget the welcome email, or you add up a quote by hand during the call. Claude (Anthropic's AI assistant) can build small tools for jobs like these. You describe the tool in plain words, and you write no code. You get a checklist, a calculator or a calendar you can click and use again.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A checklist for every new client**, so nothing gets missed between the yes and the first session",
        "**A price calculator** that adds up a quote from your own prices",
        "**A calendar for your posts**, so you see this week's posts and drafts on one screen",
        "**A safe way to fix a tool**, one change at a time, without breaking what works",
        "**Four more ready descriptions** for invoices, enquiries, client questions and a launch countdown",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. You can use a phone, but the tools are easier to test on a big screen.",
        "A Claude account at [claude.ai](https://claude.ai/). The free plan can build these tools.",
        "Your real list of steps for a new client, and your real prices. A few words each, on paper or in a note.",
        "One quote you already sent to a client. You use it to test the calculator.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
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
    { num: "01", title: "Build your first tiny tool", accent: "5 minutes, to see how it works.", blocks: [
      { kind: "p", text: "Claude builds each tool as an artifact (a small page inside the chat with real buttons and boxes you can click and type into). First you build a tiny one, just to see where it appears and how to keep it." },
      { kind: "h3", text: "A. Open Claude" },
      { kind: "list", ordered: true, items: [
        "Open [claude.ai](https://claude.ai/) in your browser.",
        "Sign in, or click to make a free account and follow the steps on screen.",
        "Click **New chat** at the top left. On some screens it is a **+** or a pencil icon. An empty chat opens with a box at the bottom.",
      ] },
      { kind: "h3", text: "B. Ask for a tiny tool" },
      { kind: "list", ordered: true, items: [
        "Click in the chat box at the bottom.",
        "Type the line below, or copy and paste it.",
        "Press Enter.",
      ] },
      { kind: "example", label: "What you type", text: "Build a simple tick list as an interactive artifact, with 3 tick boxes: Send contract, Send invoice, Book first call." },
      { kind: "result", label: "What you should see", lines: [
        "Claude writes for a moment. Then a panel opens next to the chat, usually on the right.",
        "In the panel you see your 3 lines, each with a tick box. On a phone, tap the card in the chat to open it.",
        "Click a box. A tick appears. That is your first tool.",
      ] },
      { kind: "tip", text: "**You only see code, or no panel opens?** Type: \"Please show this as an artifact I can click.\" If it still doesn't work, search \"artifacts\" on [Claude's help pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them). Your account may need artifacts switched on in settings." },
      { kind: "h3", text: "C. Keep it" },
      { kind: "list", ordered: true, items: [
        "Look at the top or bottom of the panel. You will see buttons like **Copy**, **Download** or **Publish**.",
        "**Publish** gives you a link. The link opens the tool in any browser. You can save it in your bookmarks.",
        "**No Publish button?** Click **Download** and save the file. Double-click the file to open the tool in your browser.",
        "Claude moves these menus. Can't find these buttons? Search \"artifacts\" on [Claude's help pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them).",
      ] },
      { kind: "h3", text: "D. Three rules before you build" },
      { kind: "list", ordered: true, items: [
        "**Keep private details out.** Use first names or [client], not full names. Never type card details, passwords or home addresses into a tool.",
        "**Anyone with a published link can open it.** Publish the empty tool. Never publish a copy with client details in it.",
        "**Check if it remembers.** Some tools forget what you typed when you close them. Test this once before you rely on it.",
      ] },
      { kind: "p", text: "Here are seven tools a service business can build this way, and where this guide builds each one." },
      { kind: "table", head: ["Tool", "What it does", "Where it's built"], rows: [
        ["Client checklist", "Every step from \"yes\" to first session, each with a tick box", "Step 02"],
        ["Price calculator", "Adds up a quote from your packages and extras", "Step 03"],
        ["Post calendar", "A month of posts by day, topic and stage", "Step 04"],
        ["Invoice tracker", "Invoices sent, due dates, and which are paid", "Step 06"],
        ["Lead tracker", "Every new question from a buyer, with its next step", "Step 06"],
        ["FAQ page", "Your most common client questions, on one page", "Step 06"],
        ["Launch countdown", "Days to a launch, and the jobs for each week", "Step 06"],
      ] },
    ] },
    { num: "02", title: "Build the client checklist", accent: "Tool 1.", blocks: [
      { kind: "p", text: "This tool lists every step you take with a new client. Then nothing gets missed between the first call and the first session." },
      { kind: "h3", text: "A. Write your real steps" },
      { kind: "list", ordered: true, items: [
        "Think of the last client who said yes. What did you do, from that yes to their first session?",
        "Write each step in a few words, in order. One step per line.",
        "Check you didn't miss the small ones, like adding them to your email list or sending a calendar invite.",
      ] },
      { kind: "example", label: "What your list might look like", text: "Send contract. Send invoice. Send welcome email. Send intake form. Book first call. Add to client folder." },
      { kind: "h3", text: "B. Build it" },
      { kind: "list", ordered: true, items: [
        "In Claude, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the parts in [square brackets]. Paste your steps where it says.",
        "Press Enter. Wait for the panel to open.",
      ] },
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
      { kind: "result", label: "What a good tool looks like", lines: [
        "A box at the top for [client A], and \"0 of 6 done\" under it.",
        "Your steps under the 3 headings, in your order, each with a tick box.",
        "A **Start a new client** button at the bottom.",
      ] },
      { kind: "h3", text: "C. Test it" },
      { kind: "list", ordered: true, items: [
        "Type [client A] in the top box.",
        "Tick two steps. Check the progress line now says 2 done.",
        "Read every step. Is each one yours? Is the order right? Did Claude add any step you never gave it?",
        "Click **Start a new client**. Every tick should clear.",
        "Something wrong? Go to step 05 to fix one thing at a time.",
        "When it works, publish it or download it (see step 01, part C). Save the link.",
      ] },
    ] },
    { num: "03", title: "Build the price calculator", accent: "Tool 2.", blocks: [
      { kind: "p", text: "This tool adds up a quote from your own packages and extras. You stop doing sums by hand during a sales call." },
      { kind: "h3", text: "A. Write your prices" },
      { kind: "list", ordered: true, items: [
        "Write down each package with its price.",
        "Write down each extra with its price.",
        "You type the prices in. Claude never picks them for you.",
      ] },
      { kind: "h3", text: "B. Build it" },
      { kind: "list", ordered: true, items: [
        "In Claude, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace each [package name], [extra] and [price] with yours. Delete any lines you don't need.",
        "Replace [your currency] with yours, for example dollars.",
        "Press Enter.",
      ] },
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
      { kind: "h3", text: "C. Check the sums yourself" },
      { kind: "p", text: "A calculator that adds up wrong is worse than no calculator. So test it with a quote where you already know the answer." },
      { kind: "list", ordered: true, items: [
        "Find a quote you already sent to a client.",
        "In the tool, pick the same package and tick the same extras.",
        "Look at the total. Is it the same as the total on your quote, to the cent?",
        "Check each line above the total. Is every price the one you typed?",
        "Try one more: type a discount of 10. Work out 10% off on paper or on your phone's calculator. Do they match?",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The same total as your quote", "The sums work", "Publish or download it and save the link"],
        ["A price you never typed", "Claude changed or made up a price", "Ask for one change: \"Use [price] for [package], exactly as I gave it.\""],
        ["A total that is a bit off", "It may be rounding, or adding the discount the wrong way", "Tell Claude the numbers you picked, the total you expected and the total it shows (step 05)"],
        ["[CHECK] in place of a price", "A price was missing from your list", "Give Claude the price"],
      ] },
      { kind: "tip", text: "The calculator does the sums. You still decide what to charge. Check the total before it goes into a quote." },
    ] },
    { num: "04", title: "Build the post calendar", accent: "Tool 3.", blocks: [
      { kind: "p", text: "This tool shows a month of posts on one screen. You see what goes out, where it goes, and what is still a draft." },
      { kind: "h3", text: "A. Build it" },
      { kind: "list", ordered: true, items: [
        "In Claude, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Fill in where you post, how often, and your main topics. Press Enter.",
      ] },
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
      { kind: "result", label: "What a good tool looks like", lines: [
        "This month as a grid of days, with buttons to go to next month and last month.",
        "Click a day, and a small box opens to add a post.",
        "An empty list under the grid, ready for this week's posts.",
      ] },
      { kind: "h3", text: "B. Test it, and test if it remembers" },
      { kind: "list", ordered: true, items: [
        "Click a day next week. Add one post idea with the status **Idea**.",
        "Click it again and change the status to **Draft**. Check the colour changes.",
        "Check it shows in the list under the grid.",
        "Now close the browser tab. Open the tool again from your link or file.",
        "Is your post still there? Then it remembers. Are your posts gone? Then it doesn't. Use step 05 to ask for a **Download as spreadsheet** button, so you can save your plan.",
      ] },
    ] },
    { num: "05", title: "Fix it one change at a time", accent: "The safe way to change a tool.", blocks: [
      { kind: "p", text: "First versions are rarely perfect. Five changes at once often break something that worked. Ask for one change. Test it. Then ask for the next." },
      { kind: "list", ordered: true, items: [
        "Go back to the same chat as the tool. Find it in the list of chats on the left side.",
        "Copy the prompt below and paste it in the chat box.",
        "Fill in the one change, and why. Say what happens now and what should happen instead.",
        "Press Enter. Claude builds a new version in the panel.",
        "Test the change. Then test one thing that worked before. Is it still working?",
      ] },
      { kind: "prompt", label: "Change one thing", text: `Change one thing in this tool: [describe the change].
Why: [what happens now, and what should happen instead].

Keep everything else exactly the same.
Tell me in one line what you changed.` },
      { kind: "example", label: "What you type", text: "Change one thing in this tool: make all text bigger on small screens. Why: on my phone I can't read the step names." },
      { kind: "table", head: ["What you see", "What it means", "What to ask for"], rows: [
        ["Text too small on your phone", "It was built for a big screen", "Make all text bigger on small screens"],
        ["A wrong total", "A sum is set up wrong", "When I enter [these numbers], the total should be [number]. It shows [number]"],
        ["Your entries are gone after you close it", "The tool doesn't remember", "Add a Download as spreadsheet button"],
        ["Colours that don't match your brand", "It used its own colours", "Use these colours: [your colour codes]"],
        ["A step in the wrong place", "The order is off", "Move [step] so it comes after [step]"],
        ["Something that worked before is now broken", "The last change broke it", "Undo your last change and go back to the version before"],
      ] },
      { kind: "contrast", items: [
        { label: "Too many changes at once", text: "Make it bigger, change the colours, add a search box and move the buttons.", good: false },
        { label: "One change", text: "Make all text bigger on small screens. Keep everything else exactly the same.", good: true },
      ] },
      { kind: "tip", text: "**Stuck after a few changes?** Start a new chat. Paste your first build prompt with the fix written into it. Claude builds a clean new version." },
    ] },
    { num: "06", title: "Build four more", accent: "When you're ready.", blocks: [
      { kind: "p", text: "Build one at a time. For each one, do the same 4 things." },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left in Claude.",
        "Copy one prompt below and paste it in the chat box. Fill in any [square brackets]. Press Enter.",
        "Test it with something you already know the answer to, like an invoice you already sent.",
        "Fix one thing at a time with step 05. Then publish or download it and save the link.",
      ] },
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
      { kind: "tip", text: "**For the FAQ page:** check every answer word for word against what you wrote. For the countdown, count the days left on your own calendar once." },
      { kind: "honest", text: "**The honest part:** these tools are handy for your own use. They are not safe software. They don't replace the app for your accounts or your client system. They can get a sum or a date wrong. Test each one with real numbers you already know. Keep private client details out of anything you publish." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "First tiny tick list built, and you found Publish or Download",
        "Client checklist built with your real steps, tested and saved",
        "Price calculator checked against one real quote, to the cent",
        "Post calendar built, with next week's posts in it",
        "Checked if each tool remembers what you typed after you close it",
        "One change made with the change prompt, and the old parts still work",
        "One of the four extra tools built and tested",
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
