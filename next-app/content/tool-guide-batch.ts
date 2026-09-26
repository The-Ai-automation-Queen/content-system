import type { GuidePage } from "./guide-page";

const safePrompt = (job: string) => `Help me with this ${job}.

Use only the information I provide.

Please give me:

1. A short summary of what matters.
2. The next 3 actions in order.
3. Anything missing or uncertain, marked [NEEDS CHECKING].

Do not invent names, dates, numbers or commitments.

Information:

[Paste non-confidential information here]`;

export const copilotGuide = {
  slug: "copilot",
  title: "Should you use Copilot?",
  promise: "Use Copilot when your work already lives in Microsoft tools. The name covers several products, so choose the version that matches your account before you connect anything.",
  cover: "/images/guides/copilot.webp",
  coverAlt: "The small blue robot mascot working beside a vintage Microsoft office machine",
  seoDescription: "A beginner-friendly guide to Microsoft Copilot, Microsoft 365 Copilot, connectors, privacy and the advanced Copilot Studio route.",
  lumailTag: "guide-copilot",
  sourceNotes: [
    { label: "Microsoft: Connect Copilot to other services", url: "https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services" },
    { label: "Microsoft: Data protection for work accounts", url: "https://support.microsoft.com/en-us/privacy/data-protection-when-using-microsoft-365-copilot-chat-for-work-or-school" },
    { label: "Microsoft: Copilot connectors", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/understand-copilot-connectors" },
    { label: "Microsoft: Copilot privacy FAQ", url: "https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot" },
  ],
  answer: { paragraphs: [
    "**Yes, if you already spend your day in Word, Excel, Outlook, Teams or OneDrive.** Copilot is most useful when it can help where the work already happens.",
    "Start with Copilot Chat. Use Microsoft 365 Copilot only when your account includes it and your organisation has approved access to work data.",
  ] },
  sections: [
    { kind: "cards", heading: "Choose the Copilot you mean", items: [
      { title: "Microsoft Copilot", body: "The general assistant at **copilot.microsoft.com** and in the Copilot app. Use it for questions, drafts, web research and simple file work." },
      { title: "Copilot in Microsoft 365", body: "The assistant inside Word, Excel, Outlook, PowerPoint and Teams. Availability depends on your subscription and account." },
      { title: "Microsoft 365 Copilot Chat", body: "The work chat for people signed in with a work or school account. Enterprise data protection applies, but prompts and responses are still logged." },
      { title: "Copilot Studio", body: "The advanced route for building and managing agents. Ignore it unless you have a defined process, approved data and an owner for the result." },
    ] },
    { kind: "cards", heading: "Use it where it saves a real step", items: [
      { title: "Word and PowerPoint", body: "Draft, rewrite or build from a file you already understand. Check facts, meaning and tone before sharing." },
      { title: "Excel", body: "Ask it to explain data, suggest formulas or find a pattern. Check formulas and totals yourself." },
      { title: "Outlook and Teams", body: "Summarise a thread or meeting and draft a reply. Check names, decisions, dates and actions." },
      { title: "Copilot Chat", body: "Research a current question or work through an idea. Open every source that affects a decision." },
    ] },
    { kind: "steps", heading: "Start with the right account", introduction: "Your account changes what Copilot can see and how the data is handled.", steps: [
      { title: "Open Copilot", body: "Go to **copilot.microsoft.com** and sign in with the account you intend to use.", links: [{ label: "Open Copilot", href: "https://copilot.microsoft.com/" }] },
      { title: "Check the account badge", body: "Use a work or school account for approved company work. Do not paste work data into a personal account because it feels easier." },
      { title: "Check your plan", body: "Open the Microsoft 365 app you use and look for Copilot. If it is missing, your plan, administrator or region may not include it." },
      { title: "Start with one simple task", body: "Use non-confidential information and check the result before adding files, email or meetings." },
    ] },
    { kind: "steps", heading: "Connect only what you need", introduction: "Personal Copilot can connect to Microsoft and Google services. Work connectors are normally controlled by your organisation.", steps: [
      { title: "Open Connectors", body: "On Copilot.com select **Profile → Connectors**, or select **+ → Use connectors** inside a conversation." },
      { title: "Read the permission", body: "Select **Connect**, continue to the service and review which files, email, contacts or calendar information Copilot may access." },
      { title: "Use the connector for one conversation", body: "Turn on only the connector needed for the task and ask Copilot to include links to the source." },
      { title: "Turn it off", body: "Return to **Profile → Connectors** and disable the service. Delete the Copilot conversation separately if it contains connected information." },
      { title: "Ask before using work connectors", body: "Microsoft 365 connectors are enabled by administrators and respect existing access. Ask your administrator when a connected source should not be available to Copilot." },
    ] },
    { kind: "prose", heading: "The advanced route", paragraphs: [
      "Copilot Studio is for building agents that use company information or take actions. That creates an access and responsibility problem, not only a prompt-writing task.",
      "Stop before this route unless you can name the job, data sources, permitted actions, failure test and person who approves the result.",
    ], keyLine: "Do not build an agent simply because Copilot Studio makes the button available." },
  ],
  tryNow: { heading: "Try it now", introduction: "Use a short set of non-confidential meeting notes and turn them into a checked follow-up.", prompt: safePrompt("follow-up"), instructions: [
    { title: "Open Copilot", body: "Open **copilot.microsoft.com** and start a new conversation.", links: [{ label: "Open Copilot", href: "https://copilot.microsoft.com/" }] },
    { title: "Copy and paste", body: "Select **Copy**, paste the instruction and replace the bracketed text." },
    { title: "Remove private information", body: "Remove personal details, confidential work, passwords and customer information." },
    { title: "Check the result", body: "Compare every action, person, date and number with your notes before sending anything." },
  ], check: "The result is ready only when every action can be traced back to your original notes." },
  conclusion: { heading: "You now know which Copilot to open", paragraphs: ["Use general Copilot for everyday help, Microsoft 365 Copilot for approved work inside Microsoft apps and Copilot Studio only for a defined agent project."], finishLine: "Keep Copilot if working inside Microsoft saves more time than copying information into another tool." },
  related: [
    { slug: "gemini", title: "Should you use Gemini?", reason: "Compare Microsoft integration with the Google route.", cover: "/images/guides/gemini.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Check the data boundary before connecting work accounts.", cover: "/images/guides/learn-master.webp" },
    { slug: "meta-ai", title: "Should you use Meta AI?", reason: "See how an assistant inside familiar apps changes the choice.", cover: "/images/guides/meta-ai.webp" },
  ],
} as const satisfies GuidePage;

export const metaAiGuide = {
  slug: "meta-ai", title: "What can Meta Muse actually do for you?",
  promise: "See how Muse differs from Meta AI, then try a public research task with a clear stop point.",
  cover: "/images/guides/meta-muse.webp", coverAlt: "The Blue Princess directing a clockwork browser while holding the final approval key", seoDescription: "See how Meta Muse differs from Meta AI and Muse Spark. Try a public meeting-room comparison before connecting any account.", lumailTag: "guide-meta-ai",
  sourceNotes: [
    { label: "Meta: Introducing Muse", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" },
    { label: "Meta: Security and safety for Muse", url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse" },
    { label: "Meta: Meta AI powered by Muse Spark", url: "https://about.fb.com/news/2026/07/meta-ai-muse-spark-doesnt-just-think-it-acts/" },
    { label: "Meta: Introducing Muse Spark", url: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/" },
    { label: "Meta: Meta One subscription", url: "https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/" },
  ],
  answer: { paragraphs: ["**Use Muse when a task needs several browser steps and you can set a clear stop point.** It is a personal agent, which means it can take actions rather than only answer a question.", "Keep it away from private work until you understand the accounts, read and send permissions, approval requests, memory and audit trail involved."] },
  sections: [
    { kind: "cards", heading: "The Meta names are not the same product", items: [
      { title: "Muse", body: "The personal agent at **muse.ai**. It can browse, fill forms, use connected apps and keep working in a dedicated virtual computer." },
      { title: "Meta AI", body: "The assistant in Meta apps and on the web. New action features can use Muse Spark underneath, but Meta AI is not the Muse app." },
      { title: "Muse Spark", body: "The underlying model family. Most readers do not need to use it directly." },
      { title: "Muse Image and Video", body: "Creative models used for images and video. They are separate from giving a personal agent permission to act." },
      { title: "Meta One", body: "A subscription bundle with higher limits and extra tools. It is not another name for the Muse personal agent." },
    ] },
    { kind: "steps", heading: "Know what changes when Muse can act", introduction: "Meta says Muse runs work inside a dedicated virtual computer and uses a separate safety system for outbound actions. Your permissions still matter.", steps: [
      { title: "Choose the connected apps", body: "Connect only the service needed for the task. Read access lets Muse see information. Send or action access can let it change something outside Muse." },
      { title: "Read every approval", body: "Check the exact action, account and destination before approving a message, form, booking or other sensitive step." },
      { title: "Use the audit trail", body: "Review what Muse did instead of judging only the final answer." },
      { title: "Review memory and training", body: "Use the settings to opt out of model training when you want to, and ask Muse to forget a specific memory when it should no longer keep it." },
    ] },
    { kind: "cards", heading: "What the safety claims mean today", items: [
      { title: "Separate credentials", body: "Meta says passwords and payment details are stored separately so Muse does not see them directly." },
      { title: "No ad-system sharing", body: "Meta says Muse conversations and virtual-computer data are not shared with its advertising systems." },
      { title: "Confidential VM is later", body: "Meta says a Confidential VM is planned for later in 2026. Do not treat that planned protection as available now." },
      { title: "Your judgement remains", body: "A technical control cannot decide whether a booking, message, purchase or data use is appropriate for your work." },
    ] },
    { kind: "prose", heading: "If Muse is not available", paragraphs: ["Meta launched Muse first in the United States on iOS, Android and the web. Availability and plans can vary as the rollout continues.", "Use the official Muse site or waitlist for your account. Do not pay a stranger for an invite code or try to bypass a regional rollout."], keyLine: "A missing access button is an availability issue, not a reason to hand account details to someone else." },
  ],
  tryNow: { heading: "Test Muse without giving it an account", introduction: "Use one public comparison that must stop before any login, contact, booking or payment.", prompt: `Help me compare meeting rooms using public pages only. I want a shortlist, not a booking.

GOAL
First ask me for the city or station, date, two-hour time window, number of people and maximum budget. Wait for my answers. Then find 3 publicly listed meeting rooms that fit those details. If no rooms fit, tell me which requirement blocks the search. Do not silently change my requirements.

USE
- Public venue pages.
- Public booking pages that can be read without signing in.
- A public map source for walking distance.

FOR EACH OPTION, RETURN
1. Venue and room name.
2. Full address.
3. Public price for my requested period, including the currency and whether tax is included. If the exact price is not public, write “Price needs checking”.
4. Whether Wi-Fi is included, with the wording from the source.
5. The cancellation policy. If it is not public, write “Cancellation policy needs checking”.
6. Walking distance from the station or place I named.
7. A direct source link for the venue, price and cancellation claim.

OUTPUT
- Start with a table containing the 7 fields above.
- Under the table, add “Best-supported option” and name the option with the fewest missing facts. Explain the choice in 2 sentences without making a booking recommendation.
- Finish with “Completion check” and confirm whether all 3 options, requested fields, dates and source links were checked.

STRICT LIMITS
- Do not log in or ask me to log in.
- Do not connect email, calendar, contacts, payment or another account.
- Do not enter personal details or payment details.
- Do not fill or submit a form.
- Do not contact a venue, hold a room, request a quote or make a booking.
- Do not use a sponsored result as evidence without opening the venue’s own page.
- Do not invent an unavailable price, policy, facility or distance.

If a page requires a login, payment detail or form submission, skip it and find another public option. Stop immediately after the comparison and completion check.`, instructions: [
    { title: "Open Muse", body: "Go to **muse.ai** and sign in only through the official service if Muse is available to your account.", links: [{ label: "Open Muse", href: "https://muse.ai/" }] },
    { title: "Copy the complete test", body: "Paste the instruction without connecting email, calendar, payment or another account." },
    { title: "Open every source", body: "Check the venue, date, price, cancellation wording and walking distance yourself." },
    { title: "Check the stop rule", body: "Confirm that Muse did not open a login, fill a form, contact a venue or attempt a booking." },
  ], check: "The test passes only when all three options trace to public sources and Muse stops after the comparison." },
  conclusion: { heading: "You now know what access Muse deserves", paragraphs: ["Use Muse for a larger task only after it completes the public test, respects the stop point and gives you an audit trail you can understand."], finishLine: "Grant the next permission only when the next action genuinely needs it." },
  related: [
    { slug: "test-meta-business-agent-customer-replies", title: "Should Meta Business Agent answer customers?", reason: "Test the separate WhatsApp Business reply product before using it live.", cover: "/images/guides/test-meta-business-agent-customer-replies.webp", status: "coming-next" },
    { slug: "what-is-an-ai-browser", title: "What is an AI browser?", reason: "Understand what changes when an agent can work inside a browser.", cover: "/images/guides/what-is-an-ai-browser.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Check what stays out before giving Muse more access.", cover: "/images/guides/learn-master.webp" },
  ],
} as const satisfies GuidePage;

export const grokGuide = {
  slug: "grok", title: "Should you use Grok?", promise: "Use Grok when the question depends on what people are saying on X right now. Treat posts as conversation to inspect, not evidence to trust.", cover: "/images/guides/grok.webp", coverAlt: "The small blue robot mascot inspecting a fast-moving stream of messages", seoDescription: "A practical guide to Grok on X, web search, privacy controls, conversation deletion and the xAI developer route.", lumailTag: "guide-grok",
  sourceNotes: [{ label: "X: About Grok", url: "https://help.x.com/en/using-x/about-grok" }, { label: "X: Personalisation and data settings", url: "https://help.x.com/en/personalization-data-settings" }],
  answer: { paragraphs: ["**Yes, when you need to inspect fast-moving public conversation on X.** Grok can search public posts and the web, which makes it useful for seeing what people are discussing now.", "Do not use it as your only source. A popular post, confident answer or repeated rumour can still be wrong."] },
  sections: [
    { kind: "cards", heading: "Choose the part you need", items: [
      { title: "Grok on X", body: "Use it to ask about public posts, current discussion and what different groups are saying." },
      { title: "Grok on the web or app", body: "Use the standalone assistant for general questions, web research, files and creative tasks when available on your plan." },
      { title: "Voice and images", body: "Use voice or image features for convenience and creative work. Check transcriptions, text and small visual details." },
      { title: "xAI API", body: "The developer route is for software teams building with xAI models. Most readers can ignore it." },
    ] },
    { kind: "steps", heading: "Check the X settings first", introduction: "X can share public data and Grok interactions with xAI for training and personalisation unless you change the controls.", steps: [
      { title: "Open the Grok controls", body: "In X open **Settings and privacy → Privacy and safety → Data sharing and personalisation → Grok & Third-party Collaborators**." },
      { title: "Choose the training setting", body: "Turn off **Data Sharing** if you do not want your public data and Grok interactions used for training and fine-tuning." },
      { title: "Choose personalisation", body: "Turn off **Grok Personalisation** if you do not want X data used to personalise Grok." },
      { title: "Delete conversation history", body: "Open **Privacy and safety → Data sharing and personalisation → Grok → Delete Conversation History**. Removal can take up to 30 days, with legal and safety exceptions." },
    ] },
    { kind: "steps", heading: "Use Grok without mistaking noise for truth", introduction: "Use it to find signals, then verify them elsewhere.", steps: [
      { title: "Open Grok", body: "Go to X and select **Grok** in the navigation, or open the standalone Grok service available to you.", links: [{ label: "Open Grok on X", href: "https://x.com/i/grok" }] },
      { title: "Ask for the time period", body: "State the date range, topic and people or market you want to inspect." },
      { title: "Ask for links", body: "Request the original posts and external sources, not only a summary." },
      { title: "Verify outside X", body: "Check important claims against the original organisation, document or first-hand source." },
    ] },
    { kind: "prose", heading: "The advanced route", paragraphs: ["The xAI API lets developers use Grok models inside software. It requires an account, API key, usage controls and technical review.", "Stop before this route if you cannot protect an API key, limit spending and test what the model is allowed to do."], keyLine: "Reading public conversation is a research task. Building with the API is a software and data-governance task." },
  ],
  tryNow: { heading: "Try it now", introduction: "Use a current public topic you already follow.", prompt: `Show me how people on X are discussing this topic: [TOPIC].

Use posts from the last [TIME PERIOD].

Give me:

1. The 3 main viewpoints.
2. One original post that represents each viewpoint.
3. Which claims are supported by an external primary source.
4. Which claims remain unverified.

Do not treat likes, reposts or repetition as proof.`, instructions: [
    { title: "Open Grok", body: "Open Grok on X and start a new conversation.", links: [{ label: "Open Grok", href: "https://x.com/i/grok" }] },
    { title: "Copy and replace", body: "Select **Copy**, paste the instruction and replace the topic and time period." },
    { title: "Open the evidence", body: "Read the original posts and external sources before using the summary." },
  ], check: "A claim is usable only when you can trace it to a reliable original source outside the Grok summary." },
  conclusion: { heading: "You now know what Grok is for", paragraphs: ["Use Grok to inspect current conversation and find leads worth checking. Do not use it to turn social-media repetition into a fact."], finishLine: "Keep it if real-time X context matters to your work and you are willing to verify what you find." },
  related: [
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Protect private information before using social posts or outside sources.", cover: "/images/guides/learn-master.webp" },
    { slug: "meta-ai", title: "Should you use Meta AI?", reason: "Compare another assistant shaped by social platforms.", cover: "/images/guides/meta-ai.webp" },
    { slug: "deepseek", title: "Should you use DeepSeek?", reason: "Compare a social research tool with a technical model family.", cover: "/images/guides/deepseek.webp" },
  ],
} as const satisfies GuidePage;

export const deepSeekGuide = {
  slug: "deepseek", title: "Should you use DeepSeek?", promise: "Use DeepSeek when you want to test its reasoning, coding or open models and you understand where the data goes. Do not place sensitive work in the public app.", cover: "/images/guides/deepseek.webp", coverAlt: "The small blue robot mascot choosing between a public route and a controlled technical route", seoDescription: "A practical guide to the DeepSeek app, privacy, data storage, open models, API use and local deployment.", lumailTag: "guide-deepseek",
  sourceNotes: [
    { label: "DeepSeek: Privacy Policy", url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html" },
    { label: "DeepSeek: Transparency Centre", url: "https://www.deepseek.com/en/transparency/" },
    { label: "DeepSeek: API documentation", url: "https://api-docs.deepseek.com/" },
  ],
  answer: { paragraphs: ["**Yes, for technical comparison, coding and testing an open model family.** The public DeepSeek app is not the right starting point for confidential or regulated work.", "DeepSeek says public-service inputs may be used to improve and train its technology and personal data is processed and stored in the People's Republic of China."] },
  sections: [
    { kind: "cards", heading: "Choose the route", items: [
      { title: "DeepSeek chat", body: "Use the website or app for questions, reasoning, coding and public information. Keep sensitive data out." },
      { title: "DeepSeek API", body: "Developers can call DeepSeek models from software. This gives technical control but still sends data to DeepSeek's service." },
      { title: "Open models", body: "Technical teams can download and run released model weights under their licence. Local control depends on the actual hosting setup." },
      { title: "Third-party hosts", body: "Another provider may offer a DeepSeek model. Its privacy, retention and location rules belong to that provider, not automatically to DeepSeek." },
    ] },
    { kind: "steps", heading: "Make the data decision before the model decision", introduction: "The public service collects prompts, uploaded files, photos, voice input, feedback and chat history.", steps: [
      { title: "Check what you would enter", body: "Remove customer data, employee information, health or identity data, confidential files, credentials and unreleased business information." },
      { title: "Check where it is processed", body: "DeepSeek's current policy states that personal data is directly collected, processed and stored in the People's Republic of China." },
      { title: "Check the training choice", body: "Review DeepSeek's current privacy controls for model-training opt-out before using an account. If the control you need is not available, do not use the public service for that work." },
      { title: "Check your organisation's rules", body: "Use DeepSeek only when your security, legal and procurement requirements allow the chosen service and location." },
    ] },
    { kind: "steps", heading: "Try the public app safely", introduction: "Use a public or invented example first.", steps: [
      { title: "Open DeepSeek", body: "Go to **chat.deepseek.com**, create an account if required and start a new conversation.", links: [{ label: "Open DeepSeek", href: "https://chat.deepseek.com/" }] },
      { title: "Choose a task you can check", body: "Use a small coding problem, public document or invented scenario rather than live business data." },
      { title: "Ask for reasoning and evidence", body: "Request the assumptions, steps and sources needed to check the answer." },
      { title: "Compare the result", body: "Run the same task in your current tool and compare accuracy, effort and checking time." },
    ] },
    { kind: "prose", heading: "The advanced route", paragraphs: ["The API is for developers who can protect keys, control logs and test failures. Running an open model yourself also requires hardware, security, updates and someone responsible for the service.", "Do not call a setup private simply because the model weights are open. The host, logs, access, backups and connected tools still decide the real data boundary."], keyLine: "Open weights create options. They do not create privacy by themselves." },
  ],
  tryNow: { heading: "Try it now", introduction: "Use an invented task that reveals whether DeepSeek's answer is easier to verify than your current tool.", prompt: safePrompt("technical comparison"), instructions: [
    { title: "Open DeepSeek", body: "Start a new conversation at **chat.deepseek.com**.", links: [{ label: "Open DeepSeek", href: "https://chat.deepseek.com/" }] },
    { title: "Use invented information", body: "Select **Copy**, paste the instruction and use a made-up example with no personal or company data." },
    { title: "Compare tools", body: "Run the same instruction in one approved tool and compare what each invented, missed or explained clearly." },
  ], check: "Keep DeepSeek only when its result is better for the task and the chosen data route meets your rules." },
  conclusion: { heading: "You now know the real DeepSeek decision", paragraphs: ["Choose between the public app, API, a third-party host or a controlled deployment. The same model name can sit behind very different data arrangements."], finishLine: "Decide on the data route first, then decide whether the model earns a place in your work." },
  related: [
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Set the information boundary before testing another provider.", cover: "/images/guides/learn-master.webp" },
    { slug: "mistral", title: "Should you use Mistral?", reason: "Compare another model family with deployment and control options.", cover: "/images/guides/mistral.webp" },
    { slug: "kimi", title: "Should you use Kimi?", reason: "Compare another open model family with an agent and coding route.", cover: "/images/guides/kimi.webp" },
  ],
} as const satisfies GuidePage;

export const kimiGuide = {
  slug: "kimi", title: "Should you use Kimi?", promise: "Use Kimi when you want to test long files, agent work or coding from Moonshot AI. Start with the web app and ignore Kimi Code until you are comfortable working with project files and a terminal.", cover: "/images/guides/kimi.webp", coverAlt: "The small blue robot mascot studying a long technical scroll beside a coding machine", seoDescription: "A practical guide to Kimi Chat, Agent mode, Kimi Code CLI and the Kimi API, with a safe first task.", lumailTag: "guide-kimi",
  sourceNotes: [
    { label: "Kimi: Agent overview", url: "https://www.kimi.com/en/help/agent/agent-overview" },
    { label: "Moonshot AI: Kimi Code CLI", url: "https://github.com/MoonshotAI/kimi-cli" },
    { label: "Moonshot AI: Kimi platform", url: "https://platform.moonshot.ai/docs" },
  ],
  answer: { paragraphs: ["**Yes, if long source material, agent tasks or coding are the reason you are looking for another tool.** Do not add Kimi simply because a new model scored well on a test.", "Start at Kimi.com with public or invented information. Use Kimi Code or the API only when a technical task justifies the setup."] },
  sections: [
    { kind: "cards", heading: "Choose the part you need", items: [
      { title: "Kimi Chat", body: "Use the web or app for questions, writing, research and file-based work." },
      { title: "Kimi Agent", body: "Use Agent mode for a longer task that needs tools, planning and several steps. Review the plan and result." },
      { title: "Kimi Code", body: "Use the coding agent in a terminal or supported editor. It can read and edit files and run commands." },
      { title: "Kimi API and open models", body: "Developers can build with Kimi models or run released weights through their own infrastructure." },
    ] },
    { kind: "steps", heading: "Start with the web app", introduction: "Use Kimi like a new provider, not an automatic place for live work data.", steps: [
      { title: "Open Kimi", body: "Go to **kimi.com**, sign in if required and start a new conversation.", links: [{ label: "Open Kimi", href: "https://www.kimi.com/" }] },
      { title: "Use public or invented material", body: "Do not upload confidential files until your organisation has reviewed the current privacy terms, processing location and plan." },
      { title: "Choose Chat or Agent", body: "Use Chat for one answer. Use Agent mode only when the task genuinely needs several steps or tools." },
      { title: "Review the work", body: "Open sources and files, check every claim and confirm that no action occurred outside the task you asked for." },
    ] },
    { kind: "cards", heading: "Give Kimi a job, not a vague test", items: [
      { title: "Long documents", body: "Ask for differences, evidence and missing information across sources you already understand." },
      { title: "Research", body: "Give a narrow question and require original links, dates and a clear list of unverified claims." },
      { title: "Agent work", body: "Ask for a plan before execution and keep logins, purchases, publishing and deletion behind your approval." },
      { title: "Coding", body: "Use a copy of a project, review the diff and run tests before accepting changes." },
    ] },
    { kind: "steps", heading: "Kimi Code is the advanced route", introduction: "Stop here unless you work with code or have technical help.", steps: [
      { title: "Read the official setup", body: "Use the current Moonshot AI Kimi Code documentation. The project is evolving, so do not rely on an old installation video.", links: [{ label: "Open Kimi Code", href: "https://github.com/MoonshotAI/kimi-cli" }] },
      { title: "Open the correct project", body: "Start in a copied or version-controlled project folder and sign in using the supported account or API route." },
      { title: "Keep approvals on", body: "Do not use automatic or approval-skipping modes until you understand every command and file the agent can change." },
      { title: "Review and test", body: "Inspect the file changes, run the project's tests and keep deployment credentials out of the first task." },
    ] },
  ],
  tryNow: { heading: "Try it now", introduction: "Use a short public document and test whether Kimi can show its evidence clearly.", prompt: `Read the source below and help me understand it.

Give me:

1. The main point in one sentence.
2. The 3 details that matter most.
3. One exact quote supporting each detail.
4. Anything unclear, missing or contradictory.

Use only the source. Do not add outside facts.

Source:

[Paste public or non-confidential text here]`, instructions: [
    { title: "Open Kimi", body: "Open **kimi.com** and start a new chat.", links: [{ label: "Open Kimi", href: "https://www.kimi.com/" }] },
    { title: "Copy and paste", body: "Select **Copy**, paste the instruction and replace the source." },
    { title: "Check every quote", body: "Confirm each quotation and conclusion against the original source." },
  ], check: "The summary is useful only when every important point is supported by the source you supplied." },
  conclusion: { heading: "You now know where Kimi fits", paragraphs: ["Use Chat for one task, Agent mode for controlled multi-step work and Kimi Code only for a real software project."], finishLine: "Keep Kimi when one of those jobs is clearly better than the same task in your current tool." },
  related: [
    { slug: "deepseek", title: "Should you use DeepSeek?", reason: "Compare another technical and open-model route.", cover: "/images/guides/deepseek.webp" },
    { slug: "manus", title: "Should you use Manus?", reason: "Compare Kimi Agent with a task-first agent platform.", cover: "/images/guides/manus.webp" },
    { slug: "what-is-agentic", title: "What AI agents actually do", reason: "Understand what changes when a chat tool begins completing several steps.", cover: "/images/guides/what-is-agentic.webp" },
  ],
} as const satisfies GuidePage;

export const manusGuide = {
  slug: "manus", title: "Should you use Manus?", promise: "Use Manus when you want an AI agent to carry a multi-step task through to a finished file, report or result. Start with work that cannot publish, spend, delete or message anyone.", cover: "/images/guides/manus.webp", coverAlt: "The small blue robot mascot supervising a multi-step production line", seoDescription: "A practical guide to Manus Chat, Agent mode, cloud browser, connectors and safe multi-step tasks.", lumailTag: "guide-manus",
  sourceNotes: [
    { label: "Manus: Functions and modes", url: "https://help.manus.im/en/collections/15921195-functions-modes" },
    { label: "Manus: Connectors", url: "https://help.manus.im/en/articles/12231777-how-can-i-use-manus-connectors" },
    { label: "Manus: Stored login information", url: "https://help.manus.im/en/articles/11711226-how-can-i-manage-the-login-information-that-manus-stores" },
  ],
  answer: { paragraphs: ["**Yes, when the value is completing several steps, not producing one answer.** Manus can research, use tools, work in a browser and create deliverables.", "That wider reach creates more ways to make a mistake. Your first task should be reversible and should stop before any external action."] },
  sections: [
    { kind: "cards", heading: "Choose the mode", items: [
      { title: "Chat mode", body: "Use it for questions and quick help when you do not need Manus to act across several tools." },
      { title: "Agent mode", body: "Use it for a defined outcome that needs research, planning, tools and a finished deliverable." },
      { title: "Cloud browser", body: "Manus can use a remote browser and may save login status if you allow it. You can take over when a login or judgement is needed." },
      { title: "Connectors", body: "Connect Gmail, Calendar, GitHub and other services only when the task requires their data or actions." },
    ] },
    { kind: "steps", heading: "Give the agent a safe first job", introduction: "The safest first result is a draft or file you can inspect before anything happens outside Manus.", steps: [
      { title: "Open Manus", body: "Go to **manus.im**, create an account and choose Chat or Agent mode.", links: [{ label: "Open Manus", href: "https://manus.im/" }] },
      { title: "Name one outcome", body: "Ask for one finished report, comparison or plan. State what the agent must not do." },
      { title: "Use public information", body: "Do not connect accounts, upload confidential files or save a login during the first test." },
      { title: "Review the plan", body: "Check the steps, sources, tools and expected output before allowing the task to continue." },
      { title: "Inspect the deliverable", body: "Open the final file, check claims and links and confirm that no external action occurred." },
    ] },
    { kind: "steps", heading: "Connect a service deliberately", introduction: "A connector lets Manus read data or execute workflows through another service.", steps: [
      { title: "Open Connectors", body: "Choose the app in Manus and select **+ Connect**." },
      { title: "Authenticate the correct account", body: "Sign in and review the requested permissions. Some connectors require a personal API token." },
      { title: "Test a read-only task first", body: "Ask Manus to find or summarise information before allowing it to create, update or send anything." },
      { title: "Remove the connector", body: "Open the connector and remove it when finished. Manus says stored login information and credentials are cleared when the connector is removed." },
      { title: "Manage saved browser logins", body: "Open **Settings → Cloud Browser** to disable saved login status or manage individual sites." },
    ] },
    { kind: "prose", heading: "The advanced route", paragraphs: ["Custom API and MCP connectors can give Manus access to business systems. That turns a useful agent into a live operational integration.", "Stop before this route unless you can limit permissions, protect credentials, log actions, test failures and name the person who can stop the system."], keyLine: "A longer task is not automatically a better task for an agent. Start where failure is visible and recoverable." },
  ],
  tryNow: { heading: "Try it now", introduction: "Create a public research brief without connecting an account or letting Manus contact anyone.", prompt: `Create a short research brief about [PUBLIC TOPIC].

Use reliable public sources published within [TIME PERIOD].

Deliver:

1. A one-paragraph summary.
2. The 5 facts that matter most, each with an original source link and date.
3. Conflicting evidence or uncertainty.
4. 3 questions I should investigate next.

Do not log in to any website, contact anyone, publish anything or spend money.`, instructions: [
    { title: "Open Manus", body: "Open **manus.im** and choose Agent mode.", links: [{ label: "Open Manus", href: "https://manus.im/" }] },
    { title: "Copy and replace", body: "Select **Copy**, paste the instruction and replace the topic and time period." },
    { title: "Review the plan", body: "Stop the task if the plan requires a login, message, purchase or private source." },
    { title: "Check the brief", body: "Open every cited source and confirm that it supports the claim beside it." },
  ], check: "The task is complete when the brief is accurate, sourced and no action occurred outside the agreed research boundary." },
  conclusion: { heading: "You now know how to test an agent", paragraphs: ["Use Manus for a multi-step outcome you can inspect. Add browsers, logins and connectors only after the read-only version works."], finishLine: "Keep it when the completed deliverable saves more effort than supervising and checking the task." },
  related: [
    { slug: "what-is-agentic", title: "What AI agents actually do", reason: "Understand the parts of an agent before granting more access.", cover: "/images/guides/what-is-agentic.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Set the data boundary before using connectors or saved logins.", cover: "/images/guides/learn-master.webp" },
    { slug: "kimi", title: "Should you use Kimi?", reason: "Compare another agent route before choosing a platform.", cover: "/images/guides/kimi.webp" },
  ],
} as const satisfies GuidePage;

export const mistralGuide = {
  slug: "mistral", title: "Should you use Mistral?", promise: "Mistral may suit you if you want an AI company based in Europe or need more control over how AI is used at work. This guide shows you which version to open and which parts you can ignore.", cover: "/images/guides/mistral.webp", coverAlt: "The small blue robot mascot choosing between a work desk, coding terminal and model vault", seoDescription: "A beginner-friendly guide to Mistral Vibe, its work and coding tools, connected accounts, memory and privacy controls.", lumailTag: "guide-mistral",
  sourceNotes: [
    { label: "Mistral: Platform overview", url: "https://docs.mistral.ai/getting-started/platform-overview" },
    { label: "Mistral: Disconnect a connector", url: "https://help.mistral.ai/en/articles/316424-what-happens-to-my-data-if-i-disconnect-a-connection" },
    { label: "Mistral: Memory and data", url: "https://help.mistral.ai/en/articles/396497-how-do-you-handle-my-data-when-using-the-memories-feature" },
    { label: "Mistral: Zero Data Retention", url: "https://help.mistral.ai/en/articles/347612-can-i-activate-zero-data-retention-zdr" },
  ],
  answer: { paragraphs: ["**Mistral is worth trying when you have a clear reason to choose it.** That reason might be its European base, its business controls or the option to use its AI models in your own technical setup.", "If you simply want help writing, researching or working through a document, start with **Vibe Chat** or **Vibe Work**. You can ignore the coding and developer tools for now."] },
  sections: [
    { kind: "cards", heading: "Pick the version that matches your job", items: [
      { title: "Vibe Chat", body: "This is the normal chat. Use it to write, summarise, explain something or think through a question." },
      { title: "Vibe Work", body: "Use this for a bigger job, such as researching a topic, reading several documents or working through data." },
      { title: "Vibe Code", body: "This is for people who build software. It can read project files, change code and run commands, so skip it if that is not your work." },
      { title: "Studio and Admin", body: "Studio is where developers test and connect Mistral to other software. Admin is where a company controls users, access, bills and rules." },
    ] },
    { kind: "steps", heading: "Start here if you are new", introduction: "Begin with the normal chat. You can explore the other versions later if you actually need them.", steps: [
      { title: "Open Vibe", body: "Go to Mistral Vibe, create an account and open **Chat**.", links: [{ label: "Open Mistral Vibe", href: "https://vibe.mistral.ai/" }] },
      { title: "Try a simple task", body: "Use public, made-up or non-confidential information for your first test. Do not paste customer details, passwords or private company documents." },
      { title: "Check the privacy setting", body: "Open the privacy settings. Turn off use of your content for model improvement if you do not want your conversations used for that purpose." },
      { title: "Decide whether you want Memory", body: "Memory lets Vibe remember useful details between chats. Open **Memories** to switch it off or delete anything you do not want saved." },
    ] },
    { kind: "steps", heading: "Before you connect an account", introduction: "A connection may give Mistral access to email, calendar entries or files. Add only the account you need for a clear task.", steps: [
      { title: "Open My Connectors", body: "Choose the service you need, select **Connect** and read the permission screen before you agree." },
      { title: "Check what will be copied", body: "Some connections look up information only when you ask. Others make selected files searchable and keep that searchable copy on Mistral's systems." },
      { title: "Start with one source", body: "Connect one source, ask one question and request links back to the original email, event or file so you can check the answer." },
      { title: "Remove access when you are finished", body: "Return to **My Connectors** and disconnect the service. If your company added a shared file collection, an administrator must remove it in **Admin Controls**." },
    ] },
    { kind: "steps", heading: "If you build software", introduction: "Vibe Code and Studio can work with real files and live systems. Use them only when you understand what they can access and change.", steps: [
      { title: "Choose the right tool", body: "Use **Vibe Code** to work inside a software project. Use **Studio** when a developer needs to connect Mistral to an app or business system." },
      { title: "Protect the access key", body: "An API key gives software access to your Mistral account. Treat it like a password, set a spending limit and never put it in public code or a screenshot." },
      { title: "Do not assume nothing is stored", body: "Mistral offers a special no-storage option for some approved API use. It does not automatically cover Vibe Chat, Vibe Work, saved libraries or agents." },
      { title: "Approve important changes yourself", body: "Check code, file changes and outside actions before they reach a live website, customer or business system." },
    ] },
  ],
  tryNow: { heading: "Try Mistral with a real decision", introduction: "Use a public source you already understand. This lets you see whether the answer is useful and easy to check.", prompt: `I need to decide [WRITE THE DECISION].

Use only the source text I paste below.

Give me:

1. The clearest answer in one sentence.
2. The 3 facts from the source that support that answer.
3. What the source does not tell me.
4. The 3 questions I should answer before I decide.

Do not add facts or assumptions that are not in the source.

SOURCE TEXT:
[PASTE PUBLIC OR NON-CONFIDENTIAL TEXT HERE]`, instructions: [
    { title: "Open Vibe Chat", body: "Open Mistral Vibe and start a new chat.", links: [{ label: "Open Vibe", href: "https://vibe.mistral.ai/" }] },
    { title: "Copy the instruction", body: "Select **Copy**, paste it into the chat and replace the 2 parts in square brackets." },
    { title: "Check the answer", body: "Compare each fact with your source. Remove anything the source does not support." },
  ], check: "The test is finished when you can see which parts came from the source and which questions still need a human answer." },
  conclusion: { heading: "You can now decide whether Mistral belongs in your work", paragraphs: ["Start with Vibe Chat for everyday tasks. Move to Work, Code, Studio or connected accounts only when a task genuinely needs them."], finishLine: "Keep Mistral if it makes the work easier and gives you the level of control you need. Otherwise, you do not need another AI tool." },
  related: [
    { slug: "deepseek", title: "Should you use DeepSeek?", reason: "Compare another model family with open and hosted routes.", cover: "/images/guides/deepseek.webp" },
    { slug: "manus", title: "Should you use Manus?", reason: "Compare Vibe Work with a task-first agent platform.", cover: "/images/guides/manus.webp" },
    { slug: "what-should-you-never-share-with-ai", title: "What should you never share with AI?", reason: "Check the data boundary before enabling memory or connectors.", cover: "/images/guides/learn-master.webp" },
  ],
} as const satisfies GuidePage;
