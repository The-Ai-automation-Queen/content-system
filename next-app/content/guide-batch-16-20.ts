// Guides 16 to 20, approved from the guides 16 to 20 copy deck (28/09/2026).
// Every hero uses the guide's own full mascot scene card.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

const workflowsKit = { name: "AI workflows that save time" };

const tenMinuteTest: BatchGuide = {
  slug: "what-is-ai",
  seoTitle: "What is AI, and what can it do for my work?",
  seoDescription: "What AI is in plain words: it sorts, suggests and drafts a first pass you check. Run a safe 10-minute test on one task from your week.",
  title: "The 10-Minute Test That Shows What AI Can Do for You",
  question: "Everyone talks about AI. I still don't really get what it would do for me.",
  answer: "AI is software that takes a first pass at work with information: it sorts, suggests or drafts. The catch is that a convincing answer can still be wrong, so you test it on something you can check.",
  level: "Beginner",
  minutes: 10,
  tool: "ChatGPT, Claude or Gemini",
  hero: { title: "The 10-minute test that shows what AI", accent: "can do for you.", line: "Pick one small task from this week, let AI take a first pass, and judge the result yourself.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/what-is-ai.webp", alt: "The blue robot mascot at a loom that turns shapes into an ordered pattern" } },
  leaveWith: "a plain-words picture of what AI does, a safe 10-minute test on your own task, and 3 questions to ask before you use any answer.",
  howTo: "Pick the kind of help you'd like, look at the example, then run the test with a short piece of public or made-up text.",
  sections: [
    {
      title: "What AI can do for you",
      accent: "Four kinds of help.",
      icon: "list",
      blocks: [
        { kind: "contrast", items: [
          { label: "Sort", text: "Group feedback, or mark a message as spam or not. You check the labels make sense." },
          { label: "Predict", text: "Estimate who may need support soon. That's a lead to investigate, not a fact." },
          { label: "Suggest", text: "Propose a next step or option. You decide if it fits the real situation." },
          { label: "Draft", text: "A summary, translation, email or image. You check and edit it before use.", good: true },
        ] },
      ],
    },
    {
      title: "How it works",
      accent: "You · AI · you again.",
      icon: "check",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**You give it material:** a question, a note or a short public text.",
          "**AI gives you a first pass:** it sorts, suggests or drafts.",
          "**You check it** against the original before you use it.",
        ] },
        { kind: "locked", label: "The 10-minute test prompt", prompt: 0 },
      ],
    },
  ],
  honest: "AI sounds sure even when it's wrong. The test is useful only if you can trace each point back to what you gave it.",
  gate: { promise: "The 10-minute test prompt.", action: "Unlock" },
  prompts: [
    { title: "The 10-minute test prompt", text: `I want to test if AI can help with a small part of a task I do at work.

The task: [Describe the task in one sentence. Example: find the key points in a public article before a meeting.]

Here is a small sample: [Paste 3 to 5 lines of public, made-up or approved non-confidential material. Do not paste names, private messages, customer records or confidential work.]

A useful result would be: [Describe what you want to receive. Example: 3 key points, each with the sentence that supports it.]

I will check the result by: [Name the original material or a simple check you can do yourself.]

First, tell me if the sample is enough for a small test. If it is not, ask for the single missing detail and stop. Do not guess or claim to have opened my files or accounts.

If it is enough, do only this small sample. Use only the material above. Give me the requested result in a short list. Show which part of the sample supports each point. Mark anything you are unsure about instead of making it up.

End with two short lines:
- Check: the specific part I should compare with my original material.
- Next step: if this small result is useful enough to test on more material, and what I should still do myself.

Do not treat your answer as a final work decision.` },
  ],
  checks: { title: "Before you use the result, ask", ordered: true, items: [
    "Can I trace this back to the original?",
    "What did AI guess or leave out?",
    "Would a mistake matter here?",
  ] },
  kit: { ...workflowsKit, heading: "Ready for more than one task?", body: "The *AI workflows that save time* kit turns this test into 10 ready workflows for your week." },
};

const toolChooser: BatchGuide = {
  slug: "which-ai-tool-for-what",
  seoTitle: "Which AI tool should I use? ChatGPT, Claude, Gemini or Copilot",
  seoDescription: "Which AI tool is worth paying for? Choose by the job, where your work already lives and what the tool may see, then test before you subscribe.",
  title: "Stop Paying for AI Tools You Don't Need",
  question: "ChatGPT, Claude, Gemini, Copilot... which one is actually worth paying for?",
  answer: "You probably need one, not five. Start with the job and the apps you already use, then test the smallest option before paying for another subscription.",
  level: "Beginner",
  minutes: 10,
  tool: "Any AI chat",
  hero: { title: "Stop paying for AI tools", accent: "you don't need.", line: "Choose by the job, where your work already lives and what the tool is allowed to see.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/which-ai-tool-for-what.webp", alt: "The blue robot mascot choosing one tool from a row of brass instruments under glass" } },
  leaveWith: "a simple way to choose by situation, a short guide to the other tools you hear about, and one test task to run before you pay.",
  howTo: "Find your situation below, then run the test task in the tool you already have.",
  sections: [
    {
      title: "Start with the job",
      accent: "Four situations.",
      icon: "target",
      blocks: [
        { kind: "contrast", items: [
          { label: "Everyday writing and thinking", text: "Start with the chat tool you already have.", good: true },
          { label: "Your work lives in Microsoft 365", text: "Check Copilot Chat in your work account. What it can see depends on your licence and permissions." },
          { label: "Your work lives in Google Workspace", text: "Check Gemini in Gmail and Docs. Your organisation may limit it." },
          { label: "Research you need to verify", text: "Try Perplexity, which shows source links you can open." },
        ] },
      ],
    },
    {
      title: "The others you'll hear about",
      accent: "Different jobs, not better or worse.",
      icon: "list",
      blocks: [
        { kind: "list", items: [
          "**Grok:** current web and X conversations.",
          "**DeepSeek:** chat and technical work. Check its privacy terms before using work information.",
          "**Kimi:** long files and multi-step research.",
          "**Manus:** multi-step tasks on websites and files. Review every permission first.",
          "**Meta AI:** inside WhatsApp and Instagram. Everyday questions, not confidential work.",
          "**Mistral Le Chat:** a European assistant, worth a look when provider location matters.",
        ] },
        { kind: "locked", label: "The test task", prompt: 0 },
      ],
    },
  ],
  honest: "The best tool is the one that fits work you already do. A new subscription won't fix a vague request.",
  gate: { promise: "The test task.", action: "Unlock" },
  prompts: [
    { title: "The test task", text: `Turn the following non-confidential project note into a five-bullet update I can edit for my team.

NOTE
[Paste a short note you wrote yourself, or a made-up example. Remove private names, customer details and confidential information.]

Write exactly five bullets: progress, blocker, next action, owner and date. Use only the note. If the note does not name an owner or date, write "Not stated" for that bullet. Do not invent decisions, commitments or completed work.

After the five bullets, add one line headed "Check before sending" that names the facts I should compare with my original note. Keep the language plain and the whole update under 120 words.` },
  ],
  pass: "**Keep the tool if:** the update is right after you check it against your note, and it saved you time.",
  kit: { ...workflowsKit, heading: "Set up the tool you keep", body: "The *AI workflows that save time* kit has setup cards for ChatGPT, Claude, Gemini and Copilot, with where to click in each." },
};

const fiveSkills: BatchGuide = {
  slug: "ai-skills-worth-learning-for-work",
  seoTitle: "What AI skills should I learn for work?",
  seoDescription: "The AI skills worth learning for work: direct the work, choose the source, check the result, control access and keep responsibility. Pick one and practise it this week.",
  title: "5 AI Skills That Still Matter When the Tools Change",
  question: "Is AI coming for my job? And what should I actually learn?",
  answer: "Don't memorise features. Learn to direct the work, choose the source, check the result, control access and own the final decision. Those skills travel with you from tool to tool.",
  level: "Beginner",
  minutes: 10,
  tool: "Any AI tool",
  hero: { title: "5 AI skills that still matter", accent: "when the tools change.", line: "Menus and features move every month. These five skills don't.", tool: "Any AI", art: { kind: "scene", src: "/images/guides/ai-skills-worth-learning-for-work.webp", alt: "The blue robot mascot carrying a compass, magnifier, key and gauge past changing machines" } },
  leaveWith: "the 5 skills in plain words, a way to pick the one to practise first, and a prompt that builds you a small exercise for this week.",
  howTo: "Read the 5 skills, pick the one that slows you down most on a task you know well, then get a one-week exercise for it.",
  sections: [
    {
      title: "The 5 skills",
      accent: "They outlast any tool.",
      icon: "list",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**Direct the work:** say what's needed, why, what good looks like and what must not happen.",
          "**Choose the source:** know which document is current and which claim needs evidence.",
          "**Check the result:** spot missing details, invented facts and weak reasoning.",
          "**Control access:** know the difference between pasting, uploading one file, connecting an account and letting it act.",
          "**Keep responsibility:** you set the standard and stand behind the decision.",
        ] },
      ],
    },
    {
      title: "Pick your first one",
      accent: "From your real work.",
      icon: "target",
      blocks: [
        { kind: "list", ordered: true, items: [
          "Pick one task you repeat and know well.",
          "Name the hard part: instructions, sources, checking, access or the final call?",
          "Practise that one skill on one example this week.",
        ] },
        { kind: "locked", label: "The one-skill practice prompt", prompt: 0 },
      ],
    },
  ],
  honest: "Nobody can promise which jobs AI will change. What protects you is being the person who knows what good looks like and can prove it.",
  gate: { promise: "The one-skill practice prompt.", action: "Unlock" },
  prompts: [
    { title: "The one-skill practice prompt", text: `I want to practise one AI skill on a task I already know how to do.

Task: [Describe one familiar task]
Skill to practise: [Choose clearer instructions, better sources, checking results, protecting information or keeping the final decision].

Give me one small exercise I can finish this week. Tell me what to prepare, what to ask the tool to do and how to compare the result with the original. Do not invent facts about my work or suggest that I buy a new tool. Use only public, invented or non-confidential material. Keep your answer to one exercise and one check. I will decide if the result is suitable for real work.` },
  ],
  pass: "**It worked if:** the exercise helped with one familiar task and gave you a way to judge the result.",
  kit: { name: "AI for your career and job search", heading: "Want to use these skills for your career?", body: "The *AI for your career and job search* kit (coming soon) has CV, LinkedIn, interview and pay-rise prompts, including the Profile Insight Report." },
};

const customerThemes: BatchGuide = {
  slug: "chatgpt-customer-research-with-evidence",
  seoTitle: "How to analyse customer feedback with ChatGPT",
  seoDescription: "Analyse customer feedback with ChatGPT without losing the evidence: anonymise the notes, then get themes with participant IDs, quotes, disagreements and gaps.",
  title: "Turn Customer Feedback Into Themes You Can Prove",
  question: "I have pages of customer feedback and no time to read it all.",
  answer: "Let ChatGPT group it, but make it show which customers said what for every theme, plus where they disagree. A theme you can't trace back is just a guess.",
  level: "Intermediate",
  minutes: 20,
  tool: "ChatGPT",
  hero: { title: "Turn customer feedback into themes", accent: "you can prove.", line: "Group interview and survey notes with ChatGPT, and keep the evidence behind every theme.", tool: "ChatGPT", art: { kind: "scene", src: "/images/guides/chatgpt-customer-research-with-evidence.webp", alt: "The blue robot mascot sorting customer notes into labelled evidence trays" } },
  leaveWith: "a way to make notes safe and traceable, an evidence-table prompt, and a check before you act on any theme.",
  howTo: "Make an anonymised copy of your notes first. Never upload names or account details.",
  sections: [
    {
      title: "Make the notes safe and traceable",
      accent: "Before any upload.",
      icon: "shield",
      blocks: [
        { kind: "list", ordered: true, items: [
          "**Remove identity:** replace names, companies and emails with IDs like P01, P02.",
          "**Keep the ID on every answer**, so each claim can be checked later.",
          "**One row per answer:** participant, question, answer.",
          "**Name the decision** this research should help with.",
        ] },
      ],
    },
    {
      title: "Keep evidence beside every theme",
      accent: "What to ask for.",
      icon: "check",
      blocks: [
        { kind: "contrast", items: [
          { label: "Participant IDs", text: "How many different people support the theme." },
          { label: "Short extracts", text: "The real words, so you can check them." },
          { label: "Disagreements", text: "So a neat summary doesn't hide them." },
          { label: "One-person signals", text: "Kept apart from repeated themes.", good: true },
        ] },
        { kind: "locked", label: "The evidence-table prompt", prompt: 0 },
      ],
    },
  ],
  honest: "A neat table can still over-claim. A few interviews are not \"all customers\", and similar words don't always mean the same problem.",
  gate: { promise: "The evidence-table prompt.", action: "Unlock" },
  prompts: [
    { title: "The evidence-table prompt", text: `Analyse the uploaded customer research to help with this decision: [DECISION].

Use only the uploaded notes.

Create a table with these columns:
- Theme
- What people are trying to achieve
- Participant IDs supporting it
- 2 short supporting extracts, each from a different participant ID
- Contradicting or different evidence
- Evidence pattern: repeated or mixed
- What we still need to ask

Rules
1. A theme needs support from at least 2 different participant IDs. Show an extract from each of those people. Put one-person findings under "Early signals" after the main table, with the participant ID and extract.
2. Keep complaints, requests and suggested solutions separate.
3. Do not claim that the sample represents all customers.
4. Do not merge responses that describe different problems merely because they use similar words.
5. If an extract cannot be tied to a participant ID, exclude it and report the gap.

After the table, propose 3 next research questions. Do not recommend a product decision that the evidence cannot support.` },
  ],
  pass: "**Before you act:** open the original notes and check every participant ID and extract. Remove any theme you can't trace.",
  kit: { ...workflowsKit, heading: "One of 10 workflows", body: "This is workflow 7 (survey or interview notes into themes with evidence) in the *AI workflows that save time* kit." },
};

const aiSearch: BatchGuide = {
  slug: "show-up-in-ai-search",
  seoTitle: "How to show up in ChatGPT and AI search results",
  seoDescription: "How to show up in AI search: make who you help, what you do and why it's true clear and consistent, then run a repeatable visibility test in ChatGPT, Gemini or Perplexity.",
  title: "Make Your Business Easy for AI Search to Find",
  question: "When people ask ChatGPT for someone like me, I don't show up.",
  answer: "You can't force an AI tool to recommend you. You can make who you help, what you do and why it's true clear and consistent everywhere it's published, then test what's visible.",
  level: "Beginner",
  minutes: 15,
  tool: "ChatGPT, Gemini or Perplexity",
  hero: { title: "Make your business easy for", accent: "AI search to find.", line: "There's no button that puts you in AI answers. There is a way to make your facts clear, public and easy to check.", tool: "AI search", art: { kind: "scene", src: "/images/guides/show-up-in-ai-search.webp", alt: "The blue robot mascot placing a clearly labelled sign where a searchlight can find it" } },
  leaveWith: "the 4 facts to make public, 5 ways to make claims checkable, and a visibility test you can repeat every month.",
  howTo: "Run the visibility test first, without naming your business. Then fix the one fact that was missing or wrong.",
  sections: [
    {
      title: "Give search something to find",
      accent: "Four facts.",
      icon: "target",
      blocks: [
        { kind: "contrast", items: [
          { label: "Who you help", text: "The type of person or business." },
          { label: "What you do", text: "Each service in everyday words." },
          { label: "Where you work", text: "Locations or markets, where they matter." },
          { label: "Why it's true", text: "Examples, evidence and clear contact details.", good: true },
        ] },
      ],
    },
    {
      title: "Make claims easy to check",
      accent: "Five habits.",
      icon: "check",
      blocks: [
        { kind: "list", ordered: true, items: [
          "One clear title per page that matches its answer.",
          "State the facts people need to decide: services, people, places.",
          "Link to the evidence: examples, sources, proof.",
          "Keep your profiles consistent everywhere.",
          "Earn outside mentions: interviews, references, credible listings.",
        ] },
        { kind: "locked", label: "The visibility test", prompt: 0 },
      ],
    },
  ],
  honest: "More AI-written pages won't get you found. Thin, repeated pages add noise. Publish when a page answers a real question or makes an important fact easier to check.",
  gate: { promise: "The visibility test.", action: "Unlock" },
  prompts: [
    { title: "The visibility test (run it without naming your business)", text: `I am researching [type of service or product] for [type of customer] in [location or market].

Which providers should I compare?

For each provider:
1. Explain what they appear to offer.
2. Cite the public sources supporting the answer.
3. State which important details could not be verified.
4. Do not invent prices, services, reviews or claims.` },
  ],
  checks: { title: "Then, every month", ordered: true, items: [
    "Ask what the tool can verify about your business, with a source for every fact.",
    "Save the date, tool, question, sources and anything missing or wrong.",
    "Fix the public page with the missing or wrong fact, then test again.",
  ] },
  kit: { name: "AI for small business owners", heading: "Running a small business?", body: "The *AI for small business owners* kit (coming soon) covers the 10 business jobs to hand off first, including your public profile." },
};

export const batchSixteenTwentyGuides: readonly BatchGuide[] = [tenMinuteTest, toolChooser, fiveSkills, customerThemes, aiSearch];
