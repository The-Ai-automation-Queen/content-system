import type { CardGuide } from "../card-guides";

export const guide: CardGuide = {
  slug: "make-chatgpt-answers-shorter",
  lumailTag: "guide-make-chatgpt-answers-shorter",
  title: "How to Make ChatGPT Give Shorter Answers",
  cover: "/images/mascot/explaining.webp",
  coverAlt: "The blue robot mascot explaining a chart with a pointer",
  seoDescription: "Make ChatGPT give shorter answers: save your length rules once in Custom instructions, add 3 short lines, and check nothing true was cut.",
  tool: "ChatGPT",
  minutes: 20,
  h1: { title: "How to Make ChatGPT Give", accent: "Shorter Answers" },
  hero: {
    kind: "pose",
    src: "/images/mascot/explaining.webp",
    alt: "The blue robot mascot explaining a chart with a pointer",
    line: "Save your length rules once. Then ChatGPT gives you short answers without being asked.",
  },
  intro: {
    heading: "Short answers, every time, without asking",
    lead: "Here is the problem. You ask ChatGPT for a quick reply to a client. It gives you a long answer, with an opening line and an offer of more help at the end. You type \"make it shorter\", and it is still too long. ChatGPT doesn't know what short means for you. So you tell it once, for each job you do, and save that in your settings. Then every answer comes back the length you want.",
    blocks: [
      { kind: "h3", text: "What you end up with" },
      { kind: "list", items: [
        "**A length for each job you do**, like client replies, call notes and posts",
        "**Your length rules saved in ChatGPT**, so you never ask for short again",
        "**3 short lines you can add to any prompt** when you need it even shorter",
        "**A way to check a short answer didn't drop a fact**, like a deadline or a condition",
      ] },
      { kind: "h3", text: "Before you start" },
      { kind: "list", items: [
        "A computer with a web browser, like Chrome. These steps are for [chatgpt.com](https://chatgpt.com).",
        "A ChatGPT account. The free plan works.",
        "One real thing to test with, like a client email you need to reply to this week.",
      ] },
      { kind: "tip", text: "Every prompt below can be copied and pasted as it is. Change the parts in [square brackets] to your own details." },
    ],
  },
  openSteps: 1,
  gate: {
    heading: "Get your",
    accent: "Answer-Length Rules.",
    promise: "Enter your name and email. The rest of the guide opens right away. I'll also email you the link, so you can come back later.",
    action: "Open the rest of the guide",
  },
  steps: [
    { num: "01", title: "Decide what short means", accent: "10 minutes, no AI needed.", blocks: [
      { kind: "p", text: "ChatGPT writes long when it doesn't know what you need. So it covers everything, just in case. The fix is to give it two things: a length, and a shape (bullets, short paragraphs or one line)." },
      { kind: "contrast", items: [
        { label: "Doesn't work", text: "\"Make this shorter.\"", note: "ChatGPT has to guess how short.", good: false },
        { label: "Works", text: "\"Write this client update in 3 bullets, under 60 words.\"", good: true },
      ] },
      { kind: "h3", text: "A. List your jobs" },
      { kind: "list", ordered: true, items: [
        "Open a note on your phone or computer.",
        "Write down the 4 or 5 things you ask ChatGPT for most. For example: client email replies, call notes, social posts, parts of a proposal.",
      ] },
      { kind: "h3", text: "B. Give each job a length and a shape" },
      { kind: "list", ordered: true, items: [
        "Find each of your jobs in the table below.",
        "Next to each job in your note, write a length and a shape. Start from the table, then change it to fit how you work.",
        "Got a job that isn't in the table? Pick the closest one and change it.",
      ] },
      { kind: "table", head: ["Job", "Suggested length", "Shape"], rows: [
        ["Reply to a client email", "Under 120 words", "Short paragraphs, answer in the first line"],
        ["Summary of call notes", "3 bullets", "Decisions, actions, open questions"],
        ["Social post", "Under 60 words", "One idea, one thing to do next"],
        ["Proposal section", "Under 150 words", "Short paragraphs, no extra words"],
        ["Quick question", "2 or 3 sentences", "Answer first, then why"],
      ] },
      { kind: "example", label: "What you write down", text: "Client email reply: under 120 words, answer in the first line. Call notes: 3 bullets, decisions, actions, open questions. Instagram caption: under 60 words, one idea." },
      { kind: "tip", text: "These lengths are ideas, not rules from ChatGPT. Your own list is what counts. You use it in step 02." },
    ] },
    { num: "02", title: "Write your length rules", accent: "ChatGPT turns your list into rules.", blocks: [
      { kind: "p", text: "Your length rules are a short list of instructions to ChatGPT. They say how long each answer should be, and what shape." },
      { kind: "list", ordered: true, items: [
        "Go to [chatgpt.com](https://chatgpt.com) and sign in.",
        "Click **New chat** at the top left.",
        "Copy the prompt below and paste it in the chat box.",
        "Replace the part in [square brackets] with your list from step 01. Press Enter.",
      ] },
      { kind: "prompt", label: "Write my answer-length rules", text: `Write answer-length rules for me to save in my ChatGPT Custom instructions.

Here are the jobs I ask you for most often, with the length and shape I want:
[paste your list from step 01, for example: "Client email reply: under 120 words, answer in the first line"]

Write the rules as instructions to you, in this format:
1. One line of general rules that apply to every answer: answer first, no introduction, no closing offer of more help, no repeating my question.
2. One line per job: the job, the length, the shape.
3. One line saying: if a job isn't listed, keep it under 100 words unless I ask for more.
4. One line saying: never drop a fact, a deadline or a condition to make an answer shorter; if something important doesn't fit, say what you left out.

Keep the whole thing under 1,000 characters. Use only the jobs and lengths I gave you. Plain English, no dashes between phrases.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Answer first. No introduction, no closing offer of more help, no repeating my question.",
        "Client email reply: under 120 words, answer in the first line.",
        "Call notes: 3 bullets, decisions, actions, open questions.",
        "Instagram caption: under 60 words, one idea.",
        "Any other job: under 100 words unless I ask for more.",
        "Never drop a fact, deadline or condition to save words. If something doesn't fit, say what you left out.",
      ] },
      { kind: "list", ordered: true, items: [
        "Read each line. Is every job from your list there?",
        "Does a length look wrong for how you work? Change the number now, in the chat box or in your note.",
        "Copy the final rules into your note. You paste them in step 03.",
      ] },
    ] },
    { num: "03", title: "Save the rules once", accent: "So every new chat follows them.", blocks: [
      { kind: "p", text: "Custom instructions is a setting ChatGPT reads before every chat. Save your rules there, and you never have to ask for short answers again." },
      { kind: "h3", text: "A. Open Custom instructions" },
      { kind: "list", ordered: true, items: [
        "Click your name or profile picture. It is in the bottom left corner, or the top right on some screens.",
        "Click **Settings**. A window opens.",
        "Click **Personalization** on the left of that window.",
        "Click **Custom instructions**. You will see one or more text boxes.",
        "Can't find **Personalization** or **Custom instructions**? OpenAI moves these menus. Search \"custom instructions\" on [OpenAI's help pages](https://help.openai.com/).",
      ] },
      { kind: "h3", text: "B. Paste your rules" },
      { kind: "list", ordered: true, items: [
        "Find the box about how ChatGPT should reply. On some accounts it is called **What traits should ChatGPT have?** or **How would you like ChatGPT to respond?**",
        "Is there already text in the box? Click at the end of it and press Enter twice. Your rules go below it.",
        "Paste your length rules.",
        "Click **Save**. The window may close, or show a short message that it was saved.",
      ] },
      { kind: "h3", text: "C. Test it in 1 minute" },
      { kind: "list", ordered: true, items: [
        "Click **New chat** at the top left.",
        "Ask a normal question for one of your jobs, like the example below. Press Enter.",
        "Look at the answer. Does it follow your length and shape? Then it worked.",
      ] },
      { kind: "example", label: "What you type", text: "A client asked if we can move our call from Tuesday to Thursday. Write a reply saying yes, any time after 2pm." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Hi [client], yes, Thursday works. Any time after 2pm is fine for me. Just send me the time that suits you.",
        "Best, [your name]",
      ] },
      { kind: "tip", text: "**Still long?** Check the rules were saved: open Custom instructions again and look. **No Custom instructions on your account?** Keep the rules in your note and paste them as the first message of a chat. Using a ChatGPT Project (a folder in ChatGPT that keeps your files and rules together)? You can also paste the rules into the Project's instructions." },
    ] },
    { num: "04", title: "Keep 3 shortcut lines", accent: "For when you need it even shorter.", blocks: [
      { kind: "p", text: "Sometimes you need one answer shorter than your rules. Add one of these lines to the end of any prompt." },
      { kind: "table", head: ["Add this line", "Use it when"], rows: [
        ["**3 bullets only.**", "You need the main points of a document, an email chain or call notes"],
        ["**Under 100 words.**", "You need a reply or a draft to send fast"],
        ["**Answer first, then one line of why.**", "You asked a question and only want the answer"],
      ] },
      { kind: "h3", text: "Try one now" },
      { kind: "list", ordered: true, items: [
        "Find a real client email you need to answer. Copy it.",
        "Swap names and private details for brackets, like [client] and [price].",
        "Click **New chat**. Copy the prompt below, paste it, and replace the two parts in [square brackets]. Press Enter.",
      ] },
      { kind: "prompt", label: "A shortcut line in use", text: `Here is a client email: [paste the email, with names swapped for brackets].
Draft my reply. Use only what's in the email and my notes: [your notes].
Write [CHECK] where details are missing instead of guessing.
Under 100 words.` },
      { kind: "example", label: "Example notes", text: "Yes to the extra page. Price is [price]. Need their photos first." },
      { kind: "result", label: "What a good answer looks like", lines: [
        "Hi [client], yes, we can add the extra page. The price is [price]. Could you send me the photos for it first? Then I can start.",
        "Best, [your name]",
      ] },
      { kind: "tip", text: "**Save the 3 lines where you can find them fast.** Put them at the top of your note, or make a text shortcut on your phone. Then you can paste them in a second." },
    ] },
    { num: "05", title: "Check it didn't cut the truth", accent: "Short and still right.", blocks: [
      { kind: "p", text: "When AI makes an answer shorter, it can make things sound more certain. \"Waiting for the client to confirm\" can become \"confirmed\". This step catches that." },
      { kind: "example", label: "Your facts", text: "The proposal draft is ready. [Client] hasn't read it yet. No start date has been agreed." },
      { kind: "contrast", items: [
        { label: "Too confident", text: "\"The proposal is ready and we start soon.\"", note: "It added a start date you don't have.", good: false },
        { label: "Short and right", text: "\"The draft is ready. [Client] still needs to read it, and the start date is open.\"", good: true },
      ] },
      { kind: "h3", text: "A. Ask ChatGPT what it left out" },
      { kind: "list", ordered: true, items: [
        "You have a short answer you plan to send. Stay in the same chat.",
        "Copy the prompt below and paste it in the chat box. Press Enter.",
        "Read what it says it left out, changed or added.",
      ] },
      { kind: "prompt", label: "What did you leave out?", text: `Look at your last answer and the material I gave you.
What did you leave out that matters? List:
1. Any fact, deadline, price or condition you dropped
2. Anything you made sound more certain or more agreed than it is in my material
3. Anything you added that wasn't in my material

If nothing important was left out, say "Nothing important left out". Do not rewrite the answer.` },
      { kind: "result", label: "What a good answer looks like", lines: [
        "1. Dropped: you need their photos before you start.",
        "2. Nothing made more certain.",
        "3. Nothing added.",
      ] },
      { kind: "h3", text: "B. Check it yourself" },
      { kind: "p", text: "ChatGPT can miss its own mistakes. So check the short answer against your notes before you send it." },
      { kind: "list", ordered: true, items: [
        "Put your notes next to the short answer.",
        "Find every date, price and deadline in your notes. Is each one in the answer, and the same?",
        "Find every condition, like \"once we have\" or \"if they agree\". Is it still there?",
        "Look for words that sound final: agreed, confirmed, done, ready. Do your notes really say that?",
        "Something missing or wrong? Add it back in your own words before you send.",
      ] },
      { kind: "table", head: ["What you see", "What it means", "What to do"], rows: [
        ["Answers are still long in new chats", "The rules are not saved, or the box is full", "Open Custom instructions and check. Make the rules shorter"],
        ["A short answer dropped a deadline", "It cut a fact to save words", "Run the \"What did you leave out?\" prompt. Add the deadline back"],
        ["\"Waiting for\" became \"done\"", "It made something sound more certain", "Change it back in your own words"],
        ["One job is always too long", "That job is not in your rules", "Add that job and its length to your rules"],
      ] },
      { kind: "honest", text: "**The honest part:** shorter is not always better. A short answer can drop a deadline. It can make something sound agreed when it is not. That can cost you more than a long answer. ChatGPT writes it short. You check every word before a client sees it." },
    ] },
    { num: "✓", title: "Your checklist", accent: "Tick as you go.", blocks: [
      { kind: "checklist", items: [
        "Your 4 or 5 main jobs listed, each with a length and a shape",
        "Length rules written and checked",
        "Rules saved in Custom instructions, and tested in a new chat",
        "3 shortcut lines saved where you can find them",
        "One real client reply written with a shortcut line",
        "That reply checked against your notes before sending",
      ] },
    ] },
  ],
  cta: {
    eyebrow: "Next step",
    heading: "Your answers come back short.",
    accent: "Now hand over the admin.",
    body: "The Claude guide sets up one Admin project for three jobs. It turns call notes into actions. It answers questions about long documents. It turns rough points into emails.",
    label: "Use Claude for your admin →",
    href: "/guides/claude/",
  },
  conclusion: {
    heading: "Keep it tight",
    paragraph: "Is an answer still too long? Add that job and its length to your rules. Did a short answer drop something important? Run the check. Then add a rule so it does not happen again.",
    finishLine: "Say what short means once, and stop asking for it.",
  },
};
