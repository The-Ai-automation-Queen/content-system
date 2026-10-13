import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "what-should-you-never-share-with-ai",
  lumailTag: "guide-what-not-to-share-with-ai",
  title: "Is It Safe to Put Client Information Into ChatGPT?",
  cover: "/images/mascot/warning.webp",
  coverAlt: "The blue robot mascot thinking beside a warning sign",
  seoDescription: "Is it safe to put client information into ChatGPT? Turn off training, swap names for brackets and write a one-page AI data policy to show clients.",
  tool: "ChatGPT",
  minutes: 30,
  h1: { title: "Is It Safe to Put", accent: "Client Information Into ChatGPT?" },
  hero: {
    kind: "pose",
    src: "/images/mascot/warning.webp",
    alt: "The blue robot mascot thinking beside a warning sign",
    line: "Switch off one setting. Swap real names for brackets. Then write one page that tells clients how you use AI.",
  },
  intro: {
    heading: "Use AI on client work and keep your clients safe",
    lead: "Here is the moment. A client sends you their call notes and asks for a proposal by Friday. You want to paste the notes into ChatGPT. Then you stop and think: is this safe? This guide shows you the one setting to switch off, and how to swap real names for brackets before you paste. You end with a one-page policy that tells clients how you use AI.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**Your chats kept out of AI training**, in every AI tool you use",
        "**A clear list of what you never paste**, what you ask about first, and what is fine",
        "**A simple way to hide client names, prices and dates** before anything goes into AI",
        "**A one-page AI data policy** in plain English, written about your business",
        "**The policy where clients see it**: your website, your proposals and your welcome email",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. The steps are for the website, not the phone app.",
        "Your login for each AI tool you use: ChatGPT, Claude, Gemini or Copilot. The free plans work.",
        "A blank document open, in Google Docs, Word or your notes app.",
        "One real piece of client work you want help with this week, like call notes or a proposal.",
      ] },
      { kind: "tip", text: "This guide is a simple safety check for small businesses. It is not legal advice. Every prompt below can be copied and pasted. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get",
    accent: "your AI data policy.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back to it later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Switch off training", accent: "10 minutes, done once per tool.", blocks: [
      { kind: "p", text: "Most AI tools can learn from your chats unless you switch this off. This is called training (the company uses chats to improve its AI). Do it once in every tool you use. Do it before any client work goes in." },
      { kind: "h3", text: "A. In ChatGPT" },
      { kind: "list", ordered: true, items: [
        "Open [chatgpt.com](https://chatgpt.com) and sign in.",
        "Find your name or your small round profile picture. On most screens it is at the bottom left, in the sidebar. On some screens it is at the top right.",
        "Click it. A small menu opens. Click **Settings**. A settings window opens.",
        "On the left of that window, click **Data Controls**.",
        "Find **Improve the model for everyone**. Click it, then click the switch so it turns off. Click **Done** if you see it.",
        "Can't find **Data Controls**? OpenAI moves these menus. Search \"data controls\" on [OpenAI's help page](https://help.openai.com/en/articles/7730893-chatgpt-data-controls-faq) for today's steps.",
      ] },
      { kind: "tip", text: "**One-off chat?** ChatGPT also has **Temporary Chat**. It is a chat that is not saved to your history. On most screens you start one from the top of a new chat. It is useful for one quick question." },
      { kind: "h3", text: "B. In your other AI tools" },
      { kind: "p", text: "Only do the tools you use. Skip the rest." },
      { kind: "p", text: "**Claude:**" },
      { kind: "list", ordered: true, items: [
        "Open [claude.ai](https://claude.ai). Click your name at the bottom left.",
        "Click **Settings**, then **Privacy**.",
        "Find **Help improve our AI models** and switch it off. This is for personal Free, Pro and Max accounts.",
        "Can't find it? Anthropic moves these menus. Follow the steps on [Anthropic's privacy help page](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings).",
      ] },
      { kind: "p", text: "**Gemini:**" },
      { kind: "list", ordered: true, items: [
        "Open [gemini.google.com](https://gemini.google.com). On the left, near the bottom, click **Settings & help**.",
        "Click **Activity**. A new page opens.",
        "Under **Keep Activity**, click **Turn off** and choose it in the box that opens.",
        "Can't find it? Google moves these menus. Search \"Gemini activity\" on [Google's Gemini help page](https://support.google.com/gemini/answer/13278892).",
      ] },
      { kind: "p", text: "**Copilot (personal account):**" },
      { kind: "list", ordered: true, items: [
        "Open Copilot and click your profile picture.",
        "Click your name, then **Privacy**.",
        "Switch off the training options you see there.",
        "Can't find it? Microsoft moves these menus. Follow [Microsoft's Copilot privacy help page](https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls).",
      ] },
      { kind: "tip", text: "**On a work or team account?** The person who runs it may control these settings for you. Ask them what is switched on. Don't look for a way round it." },
      { kind: "h3", text: "C. Check it worked" },
      { kind: "list", ordered: true, items: [
        "Close the settings window. Then open it again the same way.",
        "Look at the switch. Is it still off? Then the setting saved.",
        "If it turned back on, switch it off again and look for a **Save** or **Done** button.",
      ] },
      { kind: "h3", text: "D. Know what to keep out" },
      { kind: "p", text: "Switching off training does not make a chat private. The company can still keep it. And it does not give you permission to share a client's work. So sort what you paste with this table." },
      { kind: "table", head: ["Never paste", "Ask first", "Fine to paste"], rows: [
        ["Passwords, logins, card and bank details", "A client's emails, files or documents", "Your own notes, with names taken out"],
        ["Health or personal details about anyone", "Contracts and proposals with names or prices", "Your website, sales page and public posts"],
        ["Anything you signed to keep secret (an NDA, a promise to keep it private)", "Details about your freelancers or team", "Made-up examples"],
        ["Client lists with contact details", "Money figures from a client's business", "Questions about how to do a task"],
      ] },
      { kind: "p", text: "**Ask first** means ask the client before it goes into any AI tool. Or check your contract with them." },
      { kind: "list", ordered: true, items: [
        "Copy the table above into your blank document.",
        "Name the document **AI safety rules**. Click the title at the top left and type the name.",
        "Keep it open. You add to it in the next steps.",
      ] },
    ] },
    { num: "02", title: "Swap real details for brackets", accent: "Before anything goes into the chat.", blocks: [
      { kind: "p", text: "The swap lets AI help with client work without seeing who the client is. You do it in a blank document first. Nothing goes into the chat until the swap is done." },
      { kind: "h3", text: "A. Make the bracket version" },
      { kind: "list", ordered: true, items: [
        "Open a new blank document. Do not open the AI yet.",
        "Paste the client text you want help with into it.",
        "Find every name. Swap it for a bracket: **[client]**, **[client company]**, **[contact]**.",
        "Swap every price for **[price]**, every date for **[date]** and every place for **[city]**.",
        "If there are several of one kind, number them: **[client 1]**, **[client 2]**, **[price A]**.",
      ] },
      { kind: "contrast", items: [
        { label: "Before (do not paste this)", text: "Hi Sarah, following our call on 4 March, here is the proposal for Brightside Dental at $3,200.", good: false },
        { label: "After (safe to paste)", text: "Hi [contact], following our call on [date], here is the proposal for [client company] at [price].", good: true },
      ] },
      { kind: "p", text: "The names and figures in this example are made up." },
      { kind: "h3", text: "B. Write your key" },
      { kind: "p", text: "Your key is a short note that says what each bracket really means. It never goes into the AI." },
      { kind: "list", ordered: true, items: [
        "Open a second document or a note. Call it **Key, do not paste**.",
        "Write one line for each bracket. For example: [client company] = the real company name.",
        "Save it next to your client file, not in your AI tool.",
      ] },
      { kind: "h3", text: "C. Put the real details back" },
      { kind: "list", ordered: true, items: [
        "Paste the bracket version into the AI, with your request.",
        "When the answer comes back, copy it into your document.",
        "Click into the document and press **Ctrl + H** on Windows, or **Cmd + Shift + H** in Google Docs on a Mac. A **Find and replace** box opens.",
        "Type **[client company]** in the first box. Type the real name in the second box. Click **Replace all**.",
        "Do the same for each bracket in your key. In Word on a Mac, open **Edit**, then **Find**, then **Replace**.",
      ] },
      { kind: "tip", text: "**Too slow?** Ask the AI to use brackets from the start: \"Write a follow-up email to [contact] about [project]. Use brackets for every name, price and date.\" Then fill them in yourself." },
    ] },
    { num: "03", title: "Check a task before you start", accent: "Describe it. Don't paste it.", blocks: [
      { kind: "p", text: "Before you give a new kind of job to AI, find out which details are risky. You only describe the kinds of details. Nothing real goes in." },
      { kind: "list", ordered: true, items: [
        "Open your AI tool and start a new chat. In ChatGPT, click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Change the parts in [square brackets]. Describe the kinds of details only, like \"client name\" or \"prices\".",
        "Press Enter.",
      ] },
      { kind: "prompt", label: "Check if this task is safe for AI", text: `I run a small business that sells [what you sell] to [who your clients are].
I want to use AI for this task: [describe the task, for example "turn my call notes into a proposal"].

The material has these kinds of details (I am describing them, not pasting them):
[for example: client name, company name, prices, project dates, notes about their team]

Give me a table with these columns:
Kind of detail | Risk if it is shared (low, medium, high) | What to do (paste as it is, replace with a bracket, or leave out) | A safer made-up example I could use instead

Then tell me in two sentences whether this task is safe to do with AI after the swaps, and what I should check with the client first.

Do not ask me to paste any real details. If you need more details, ask me to describe them.
If you can't know whether I have permission, tell me who to ask.` },
      { kind: "example", label: "What you type in the brackets", text: "I sell bookkeeping to small shops. Task: turn my call notes into a proposal. Kinds of details: client name, shop name, monthly sales, price, start date." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Client name | medium | replace with [client] | \"Jo\"",
        "Monthly sales | high | leave out | \"sales of about [amount]\"",
        "Price | medium | replace with [price] | \"$[price] per month\"",
        "Safe after the swaps. Check with [client] that they are happy for AI to help with their proposal.",
      ] },
      { kind: "list", ordered: true, items: [
        "Copy the table into your **AI safety rules** document, under the task name.",
        "Anything marked **leave out** stays out, even with brackets.",
        "Not sure about a line? Treat it as **Ask first** from step 01.",
      ] },
    ] },
    { num: "04", title: "Check it yourself before you paste", accent: "2 minutes. Catch what you missed.", blocks: [
      { kind: "p", text: "It is easy to miss one name in a long email. And AI can give unsafe advice too. So check two things yourself: your bracket version, and the AI's answer." },
      { kind: "h3", text: "A. Search your bracket version for leaks" },
      { kind: "list", ordered: true, items: [
        "Open your bracket version.",
        "Press **Ctrl + F** on Windows, or **Cmd + F** on a Mac. A small search box opens.",
        "Type **@** and press Enter. Any email address lights up. Swap it for **[email]**.",
        "Search for **www** and **.com**. Any website lights up. Swap it for **[website]**.",
        "Search for **$**. Any price lights up. Swap it for **[price]**.",
        "Search for the client's first name and their company name. Nothing should light up.",
        "Read the whole thing once more. Could a stranger guess who the client is? If yes, swap that part too.",
      ] },
      { kind: "h3", text: "B. Check the AI's advice" },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["The AI asks you to paste the real document", "It forgot your rule", "Say no. Describe the details instead, or use the bracket version"],
        ["It says passwords or bank details are fine with brackets", "The advice is wrong", "Ignore it. These stay out, always"],
        ["It says \"you have permission\"", "It can't know that", "Only your client or contract can tell you"],
        ["It says a task is safe, but you feel unsure", "Your doubt counts", "Treat it as Ask first and check with the client"],
      ] },
      { kind: "honest", text: "**The honest part:** AI can't know what your client agreed to. It can't see your contract. It can only help with what you describe. You decide what goes in. You ask the client when you are not sure." },
    ] },
    { num: "05", title: "Write your AI data policy", accent: "One page, in your words.", blocks: [
      { kind: "p", text: "Clients are starting to ask how you use AI. A one-page policy answers them before they ask. It also reminds you of your own rules." },
      { kind: "list", ordered: true, items: [
        "Start a new chat in your AI tool.",
        "Copy the prompt below and paste it in the chat box. You don't need to change anything in it.",
        "Press Enter. The AI asks you 7 questions, one at a time.",
        "Answer each one in a sentence or two. Press Enter after each answer.",
      ] },
      { kind: "prompt", label: "Interview me for my AI data policy", text: `Interview me to write a one-page AI data policy for my business.

Ask me these one at a time and wait for each answer:
1. What is my business name, and what do I sell?
2. Which AI tools do I use, and for which jobs (for example writing emails, summarising notes, first drafts of proposals)?
3. What do I never put into AI tools?
4. How do I handle client details before they go into AI (for example, replacing names with brackets)?
5. Have I turned off training in the tools I use?
6. Does a person always check AI work before it reaches a client?
7. Who should a client contact with questions, and how?

Then write the policy with these sections:
1. How we use AI (2 to 3 sentences)
2. What never goes into AI tools (a short list)
3. How we handle your details (3 to 5 short points)
4. A person checks everything (1 to 2 sentences)
5. Questions (who to contact)

Rules:
- Use only what I tell you. Write [CHECK] where information is missing instead of guessing.
- Never promise anything I have not told you I do.
- Plain English, short sentences, no legal language, no dashes.
- Under 400 words.` },
      { kind: "result", label: "What a good answer looks like (one section)", lines: [
        "How we handle your details",
        "We remove your name, prices and dates before we use any AI tool.",
        "We never put passwords, bank details or health details into AI.",
        "We have turned off training in every AI tool we use.",
        "If you ask us not to use AI on your work, we won't.",
      ] },
      { kind: "h3", text: "Check every line" },
      { kind: "list", ordered: true, items: [
        "Copy the policy into a new document. Name it **AI data policy**.",
        "Read it one line at a time. For each line ask: do I really do this today?",
        "Delete any line that is not true. A promise you don't keep is worse than no policy.",
        "Press **Ctrl + F** (or **Cmd + F**) and search for **[CHECK]**. Fill in or delete each one.",
      ] },
      { kind: "honest", text: "**The honest part:** this is a simple safety check, not legal advice. Do you work in health, money or law? Do your client contracts have rules about data? Then ask a qualified adviser to read your policy before you publish it." },
    ] },
    { num: "06", title: "Put the policy where clients see it", accent: "Three places, 15 minutes.", blocks: [
      { kind: "p", text: "A policy only helps if clients can find it. Put it in three places." },
      { kind: "h3", text: "A. Your website" },
      { kind: "list", ordered: true, items: [
        "Sign in to the tool you use to edit your website.",
        "Add a new page. Call it **How we use AI**.",
        "Paste your policy in and publish the page.",
        "Add a link to it at the bottom of your site, next to your privacy policy.",
        "Open your website in a new tab. Click the link. Check the page opens.",
      ] },
      { kind: "h3", text: "B. Your proposals and welcome email" },
      { kind: "list", ordered: true, items: [
        "Open the proposal you send most often. Near the end, add this line: \"We use AI tools to help with drafts. We handle your details as our AI data policy says: [link].\"",
        "Open the welcome email new clients get when they sign. Add the same line and link.",
        "Swap [link] for the address of your **How we use AI** page.",
      ] },
      { kind: "h3", text: "C. Set a reminder" },
      { kind: "list", ordered: true, items: [
        "Open your calendar. Make an event 6 months from today.",
        "Call it **Read my AI data policy**.",
        "When it comes up, read the policy again. Also read it when you start using a new AI tool.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["A client asks you not to use AI on their work", "They have said no", "Write it in their client file. Keep their work out of every AI tool"],
        ["A client asks which AI tools you use", "They want detail", "Send the link to your policy. Name the tools in it"],
        ["You start using a new AI tool", "Your policy is out of date", "Do step 01 for that tool, then update the policy"],
      ] },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Training switched off in every AI tool you use, and checked again after closing settings",
        "AI safety rules document saved with the Never / Ask first / Fine table",
        "One real piece of client work swapped for brackets, searched for leaks and put back",
        "Your key saved outside the AI tool",
        "One task checked with the task prompt, and its table saved",
        "AI data policy written and checked line by line, with no [CHECK] left",
        "Policy on your website, in your proposal and in your welcome email",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your client details are safe.",
    accent: "Now check what AI writes.",
    body: "AI can get names, numbers and facts wrong. The next guide gives you a 2-minute check. Run it before anything reaches a client.",
    label: "Build your fact-check routine →",
    href: "/guides/catch-ai-making-things-up/",
  },
  conclusion: {
    heading: "Keep it safe",
    paragraph: "Check the training setting when you add a new AI tool. Swap real details for brackets on every piece of client work. Read your policy every 6 months.",
    finishLine: "You put the brackets in. You put the real details back.",
  },
};
