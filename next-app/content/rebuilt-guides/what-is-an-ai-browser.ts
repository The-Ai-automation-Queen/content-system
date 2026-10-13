import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-is-an-ai-browser",
  lumailTag: "guide-what-is-an-ai-browser",
  title: "What Is an AI Browser and Should I Use One?",
  cover: "/images/guides/what-is-an-ai-browser.webp",
  coverAlt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
  seoDescription: "What is an AI browser? A web browser with an AI assistant that reads pages and can click and type. Set up a safe test space and try 3 business jobs.",
  tool: "An AI browser (for example ChatGPT Atlas, Comet or Gemini in Chrome)",
  minutes: 30,
  h1: { title: "What Is an AI Browser", accent: "and Should I Use One?" },
  hero: {
    kind: "scene",
    src: "/images/guides/what-is-an-ai-browser.webp",
    alt: "The blue robot mascot at an antique viewing instrument, closing a privacy shutter",
    line: "What it does, and 3 safe ways to try it. First reading, then comparing. You stop before anything is sent.",
  },
  intro: {
    heading: "Try it without risking a client account",
    lead: "Here is the problem. A client asks, \"How are you different from [rival]?\" Today you open their website, read five pages and make notes by hand. An AI browser is a web browser with an AI assistant built in. It reads the page you are on and answers your question, with quotes from the page. Some can also click and type for you, which is risky near your email or bank. This guide sets up a safe space first, then you try 3 real jobs.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A clear idea of what an AI browser does**, and which jobs are safe or risky",
        "**A safe space in your browser** with no saved passwords and no client logins",
        "**A rival's page summed up in 2 minutes**, with quotes you checked yourself",
        "**Two supplier pages side by side** in one table",
        "**One page of rules** on what the AI browser may and may not do for you",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer. Most AI browsers don't work the same way on a phone.",
        "An AI browser, or an AI assistant built into the browser you use. For example ChatGPT Atlas, Comet or Gemini in Chrome. Free plans can read pages. Clicking and typing for you is often on paid plans only. If you see \"upgrade\" when you try it, that is why.",
        "The web address of one rival's services or pricing page.",
        "The web addresses of two suppliers you might use. For example two booking tools or two printers.",
      ] },
      { kind: "tip", text: "Every question below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get the",
    accent: "safe test setup.",
    promise: "Enter your name and email. The rest of the guide opens straight away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Know what it is, then make a safe space", accent: "10 minutes, done once.", blocks: [
      { kind: "h3", text: "A. What an AI browser is" },
      { kind: "p", text: "An AI browser looks like a normal browser. It has a chat panel beside the page. You ask in plain English. It answers from the page you are on." },
      { kind: "p", text: "Some can also act. They click buttons, type into forms and move between pages for you. This is often called **agent mode** (the AI assistant takes steps by itself)." },
      { kind: "p", text: "You may have heard of **ChatGPT Atlas** (from OpenAI), **Comet** (from Perplexity) and **Gemini in Chrome** (from Google). What they can do changes often. It also depends on your country and plan." },
      { kind: "table", head: ["What you ask it to do", "Example", "Risk"], rows: [
        ["Read the page you are on", "Sum up a rival's services page", "Low: nothing is clicked or sent"],
        ["Compare pages you have open", "Put two suppliers' terms side by side", "Low: you check the quotes"],
        ["Type into a form, then stop", "Fill a practice form without sending it", "Medium: you watch every step"],
        ["Act while signed in", "Send an email, book, buy, reply to a client", "High: mistakes are real and hard to undo"],
      ] },
      { kind: "honest", text: "**Why the risk is real:** a web page can hide orders written for the AI, not for you. If the AI assistant is signed in to your email or client tools, a page could push it to do something you didn't ask for. So every job in this guide runs signed out, in a separate space." },
      { kind: "h3", text: "B. Make a test profile" },
      { kind: "p", text: "A profile is a separate space in your browser. It has its own logins, history and saved passwords. Your test profile has none. So the AI assistant can't reach anything that matters." },
      { kind: "list", ordered: true, items: [
        "Open your AI browser.",
        "Look at the top right corner (on some browsers, top left). You will see a small round picture or a letter. Click it. A menu opens.",
        "Click **Add profile**. On some browsers it is called **New profile** or **Add**.",
        "If it asks you to sign in, click **Continue without an account** (or **Skip**). Don't sign in with your main account.",
        "Type the name **AI test**. Click **Done** or **Create**. A new window opens. It looks empty. That is right.",
        "Can't find profiles? The makers move these menus. Search \"profiles\" on your browser's own help pages. For Chrome, use [Google Chrome help](https://support.google.com/chrome). For ChatGPT Atlas, use [OpenAI's help pages](https://help.openai.com).",
      ] },
      { kind: "h3", text: "C. Lock down the test profile" },
      { kind: "list", ordered: true, items: [
        "In the **AI test** window, open **Settings**. It is usually in the menu with three dots or three lines, top right.",
        "Search the settings for **passwords**. Switch off the option to save passwords, if you can.",
        "Search for **payment**. Switch off saving cards, if you can.",
        "Search for **memory** or **history**. Read what each one says. Switch off what you don't want kept.",
        "Close settings. Don't log in to email, banking, payment tools, your website or any client account in this window. Ever.",
      ] },
      { kind: "tip", text: "**Can't make a separate profile?** Use a private or incognito window (a window that saves nothing when you close it). Stay signed out of everything for every job below." },
      { kind: "h3", text: "D. Test your safe space" },
      { kind: "p", text: "In the **AI test** window, open the chat panel of the AI assistant. Type this and press Enter." },
      { kind: "example", label: "What you type", text: "Am I signed in to any email, calendar or other accounts in this browser window? Answer yes or no, and name any you can see." },
      { kind: "result", label: "What you should see", lines: [
        "No, or a list with only the AI browser's own account. Now your safe space is ready.",
        "If it names your email or a client tool, sign out of it in this window. Then ask again.",
      ] },
    ] },
    { num: "02", title: "Job 1: Sum up a rival's page", accent: "The safest job.", blocks: [
      { kind: "p", text: "Reading is the safest job. The AI assistant only looks at the page you are on. Nothing is clicked or sent." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** window, type the web address of a rival's services or pricing page. Press Enter.",
        "Open the AI assistant's chat panel. It is often a button at the top right, or a box at the side of the page. On some browsers it is called **Ask** or **Assistant**.",
        "Copy the prompt below and paste it in the chat panel.",
        "Change the two parts in [brackets]: what you do, and who your clients are.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Sum up this page", text: `Read this page only. I run [what your business does] for [who your clients are].

Give me:
1. What they offer, in 3 bullet points
2. Who it is for, in one sentence
3. What they promise, quoting the exact words from the page
4. Anything they say about price or how to buy, quoting the page

Rules:
- Use only what is on this page. Write "Not on the page" where something is missing.
- Never make up names, prices, dates or promises.
- Don't click anything or open other pages.` },
      { kind: "example", label: "Example of the bracket parts", text: "I run bookkeeping for small cafés." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. Monthly bookkeeping, tax returns, payroll.",
        "2. For small shops and cafés with up to 10 staff.",
        "3. \"Your books done every month, no surprises at tax time.\"",
        "4. Price: Not on the page. How to buy: \"Book a free call.\"",
      ] },
      { kind: "h3", text: "Check it yourself" },
      { kind: "list", ordered: true, items: [
        "In the answer, pick 2 of the quotes. Copy 4 or 5 words from the first one.",
        "Click on the web page itself, outside the chat panel.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Paste the words and press Enter. The words light up on the page.",
        "Do the same for the second quote.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Both quotes light up", "It read the page well", "Save the answer in a Doc called **Rival notes**"],
        ["A quote lights up, but the words around it say something else", "It took the words out of context", "Use what the page says, not the answer"],
        ["Nothing lights up", "The AI assistant made up the quote", "Don't use the answer. Write this down for step 05."],
      ] },
    ] },
    { num: "03", title: "Job 2: Compare two suppliers", accent: "Two pages, one table.", blocks: [
      { kind: "p", text: "Comparing saves you jumping between tabs. You still check the quotes." },
      { kind: "list", ordered: true, items: [
        "In your **AI test** window, open the first supplier's page. It can be a pricing page or a terms page.",
        "Open a new tab with **Ctrl + T** (or **Cmd + T** on a Mac). Open the second supplier's page there.",
        "Open the AI assistant's chat panel. Some AI browsers can only see the tab you are on. If so, look for a button to add another tab to the chat (often a **+** or an **@**).",
        "Copy the prompt below and paste it in the chat panel.",
        "Change the parts in [brackets]: the two supplier names and the 4 details you care about.",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Compare two pages in a table", text: `Compare the two pages I have open.

Make a table with these columns:
Detail | [supplier 1] | [supplier 2] | Exact words from each page

Compare these details: [the 4 details you care about, for example price, what's included, contract length, how to cancel]

Rules:
- Use only what is on the two pages.
- Write "Not on the page" wherever a detail is missing.
- Don't recommend one. Don't click anything or open other pages.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Price | $[amount] a month | Not on the page | \"[words from page 1]\"",
        "Contract length | 12 months | Monthly | \"[words from page 1]\" / \"[words from page 2]\"",
        "How to cancel | Not on the page | \"Cancel any time in your account\" | ...",
      ] },
      { kind: "list", ordered: true, items: [
        "Check 2 quotes with **Ctrl + F** (or **Cmd + F**), the same way as in step 02.",
        "For every \"Not on the page\", look on the supplier's site yourself. It may be on a different page, like **Pricing** or **Terms**.",
        "Copy the table into a Doc. Now you decide. The AI assistant doesn't.",
      ] },
      { kind: "tip", text: "**It only answered about one page?** Your AI browser may read one tab at a time. Ask about each page in turn, then paste both answers into one chat and ask for the table." },
    ] },
    { num: "04", title: "Job 3: Fill a practice form", accent: "Stop before you send.", blocks: [
      { kind: "p", text: "In this job the AI assistant acts for the first time. You use a form you made yourself. So nothing real can happen." },
      { kind: "h3", text: "A. Make the practice form" },
      { kind: "list", ordered: true, items: [
        "In your normal browser (not the test one), go to [forms.google.com](https://forms.google.com).",
        "Click **Blank form**. A new form opens.",
        "Click **Untitled form** at the top. Type **Practice enquiry**.",
        "Make three questions: Name, Email, Message. Click the **+** button on the right side to add each one.",
        "Click the **Preview** icon (an eye) at the top of the form. A new tab opens with the form as a visitor sees it.",
        "Copy the web address of that tab. Can't find Preview? Click **Send**, choose the link icon and copy the link.",
      ] },
      { kind: "h3", text: "B. Let the AI assistant fill it" },
      { kind: "list", ordered: true, items: [
        "Go to your **AI test** window. Paste the form's web address and press Enter.",
        "Check that your AI assistant can act. Look for a button or setting called **Agent mode**, **Agent** or **Assistant can act**. Some only have it on paid plans. No option? Skip to step 05.",
        "Switch it on. Copy the prompt below and paste it in the chat panel.",
        "Press Enter. Watch the page. Don't click anywhere while it works.",
      ] },
      { kind: "prompt", label: "Fill the practice form", text: `Fill in the form on this page with these made-up details:
Name: [made-up name]
Email: [made-up email, for example test@example.com]
Message: I'd like to ask about [made-up service].

Stop before you press Submit, Send or any button that finishes the form.
Tell me what you typed into each field, then wait. Don't submit.` },
      { kind: "result", label: "What a good run looks like", lines: [
        "It types in the three boxes, one by one.",
        "It stops and writes: \"I filled Name, Email and Message. I have not pressed Submit.\"",
      ] },
      { kind: "h3", text: "C. Check what it did" },
      { kind: "list", ordered: true, items: [
        "Did it fill the right boxes? Write yes or no.",
        "Did it stop before **Submit**? Write yes or no.",
        "Did it do anything you didn't ask for, like open another page? Write it down.",
        "Close the tab without sending.",
        "To be sure, go back to your form in your normal browser. Click the **Responses** tab at the top. It should say 0 responses.",
      ] },
      { kind: "tip", text: "**It pressed Submit anyway?** That is why you ran this test. Write it down for step 05. Don't let it act on real pages." },
    ] },
    { num: "05", title: "Write your rules", accent: "One page, kept.", blocks: [
      { kind: "p", text: "Your rules say what the AI browser may do for your business. They come from what you saw in jobs 1 to 3." },
      { kind: "list", ordered: true, items: [
        "Open a new chat with any AI assistant. It can be the one in your AI browser, or ChatGPT, Claude or Gemini.",
        "Copy the prompt below and paste it in. You don't need to change anything.",
        "Press Enter. It asks you 5 questions, one at a time. Answer each one with what you saw.",
      ] },
      { kind: "prompt", label: "Write my AI browser rules", text: `Write my AI browser rules for my business.

Ask me these one at a time and wait for each answer:
1. Which AI browser did I test, and which plan am I on?
2. In job 1 (reading a page), were the quotes right?
3. In job 2 (comparing pages), did it miss or make up anything?
4. In job 3 (practice form), did it stop before Submit?
5. Which accounts must it never be signed in to? (for example email, banking, client tools)

Then write one page with these sections:
- What it may do (reading and comparing jobs)
- What it may do only while I watch
- What it must never do (send, buy, book, delete, reply to clients)
- Where it runs (my AI test profile, signed out)
- What I check before I use any answer

Use only what I tell you. Write [CHECK] where I haven't given an answer. Plain English, under 300 words.` },
      { kind: "result", label: "What a good answer looks like (short)", lines: [
        "May do: read and sum up public pages. Compare two pages in a table.",
        "Only while I watch: fill practice forms.",
        "Never: send, buy, book, delete or reply to a client.",
        "Where: my AI test profile, signed out of everything.",
        "Before I use an answer: check 2 quotes with Ctrl + F.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read the rules. Fix any line that is not true for you. Fill in every [CHECK].",
        "Copy them into a Doc or note called **AI browser rules**.",
        "Read them again before you try anything new with the AI browser.",
      ] },
      { kind: "honest", text: "**The honest part:** an AI browser can misread a page or miss a detail. It can follow orders hidden on a page. It reads and drafts. You check the quotes and make the choices. You press every button that sends, buys or replies." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "AI test profile made, with no saved passwords and no client logins",
        "The safe space test said you are signed out of everything",
        "One real rival page summed up, and 2 quotes found with Ctrl + F (or Cmd + F)",
        "Two supplier pages compared in a table, and every \"Not on the page\" checked",
        "Practice form filled and not sent, or skipped because your plan can't act",
        "AI browser rules saved in a Doc or note",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "You know where AI is safe to help.",
    accent: "Now teach it your brand.",
    body: "The Brand Brain guide sets up one Claude project (a folder that remembers your files). It holds your brand look, voice rules and Brand DNA. Then everything AI writes for you sounds like you.",
    label: "Build your Brand Brain →",
    href: "/guides/brand-brain-guide/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Run every new job in your test profile first. Check 2 quotes before you use an answer. Each time the AI assistant surprises you, add a line to your rules.",
    finishLine: "Let it read. You decide and you press send.",
  },
};
