# Run a 24/7 Company Without Working 24/7

**Build your AI operations layer in 7 days. No code. Works with Claude Cowork, ChatGPT, Gemini, or Microsoft Copilot.**

A beginner playbook for solo founders and one-person companies.

---

## Why this exists

You already work long hours. You still feel behind. Every morning starts with the same scramble: catching up on messages, remembering where you left off, deciding what matters, and doing all of it before the real work even begins.

That scramble is not a productivity problem. It is a coordination problem. And coordination is the one thing you can hand to a machine.

By the end of this playbook, you will have a working operations layer that runs while you sleep. Not a genius assistant. Not a magic agent. A quiet, reliable system that handles the predictable parts of your business so your brain can go back to the parts only you can do.

You will spend roughly 30 to 60 minutes per day for 7 days. At the end, you will have 5 workflows running on schedule.

---

## What you need before you start

1. A paid subscription to one of the 4 platforms below (see Pick Your Platform).
2. A Google or Microsoft account (for email, calendar, cloud docs).
3. One place where you already store notes or docs (Google Docs, OneDrive, or Notion).
4. 30 to 60 minutes per day for 7 days.
5. A willingness to keep the system small. If you try to automate everything at once, it breaks. Start with 2 workflows. Add more once they run without you.

---

## Pick your platform

This playbook works on any of the 4 major providers. Each one now offers the same 2 ingredients you need: scheduled runs and connectors to your inbox, calendar, and files. Pick one, stick with it for the full 7 days, then decide if you want to switch.

> Prices and feature names below were accurate when this guide was written. They change fast. Check the provider's own page before you pay for anything.

**Option 1: Claude Cowork (Anthropic)**
Best for: writing quality, careful reasoning, nuanced summaries.
Requires: Claude Pro or Max plan with Cowork enabled.
Native connectors: Gmail, Google Calendar, Google Drive, GitHub, Notion, Linear, and more.
Scheduling: built into Cowork.
Where it wins: the drafts feel most human. Least prompt tuning needed.
Where it lags: fewer template galleries than ChatGPT.

**Option 2: ChatGPT with Tasks and Connectors (OpenAI)**
Best for: broadest connector library, biggest template ecosystem.
Requires: ChatGPT Plus, Pro, or Team.
Native connectors: Gmail, Google Calendar, Google Drive, Outlook, OneDrive, SharePoint, GitHub, HubSpot, and more.
Scheduling: ChatGPT Tasks (create recurring or one time runs).
Where it wins: the widest range of pre built Custom GPTs to borrow from.
Where it lags: drafts often need more human editing than Claude.

**Option 3: Gemini with Gems and Workspace (Google)**
Best for: anyone already living inside Gmail, Calendar, Drive, and Docs.
Requires: Gemini Advanced (Google One AI Premium) or Google Workspace with Gemini.
Native connectors: deep native access to Gmail, Calendar, Drive, Docs, Sheets, Slides (no setup, they are already yours).
Scheduling: Gemini Scheduled Actions (in Workspace) and Gems for reusable assistants.
Where it wins: zero friction if your business already runs on Google Workspace.
Where it lags: creative writing and nuance are weaker than Claude.

**Option 4: Microsoft 365 Copilot with Agents (Microsoft)**
Best for: anyone already on Microsoft 365 (Outlook, Teams, OneDrive, SharePoint).
Requires: Microsoft 365 Copilot license.
Native connectors: Outlook, Calendar, OneDrive, SharePoint, Teams, Word, Excel.
Scheduling: Copilot Studio agents with scheduled triggers.
Where it wins: unbeatable if your work already lives in Microsoft.
Where it lags: agent building has a steeper learning curve than the other 3.

**Quick chooser:**
Already on Google Workspace daily: Gemini.
Already on Microsoft 365 daily: Copilot.
Want the best writing quality: Claude Cowork.
Want the biggest ecosystem and templates: ChatGPT.

The rest of this guide uses generic language ("your assistant", "your scheduler") so every instruction works no matter which platform you pick. A translation table at the end gives you the exact button, menu, and feature name for each provider.

---

## What this system will and will not do

**It will:**
Send you a morning briefing before you open your laptop.
Summarise your day and prep tomorrow before you close it.
Route research and reading into short usable notes.
Turn those notes into content drafts.
Prep weekly client and project updates.

**It will not:**
Publish anything for you automatically.
Reply to clients on your behalf.
Replace your judgment on strategy, pricing, or hiring.
Run without you ever checking in.

The point is not to remove you from the business. The point is to remove you from the coordination.

---

## One rule before you connect anything: the Traffic Light Rule

You are about to give an assistant a window into your inbox, your calendar, and your client notes. That is real access. Before you do, learn the one habit that keeps you safe. I teach this in everything I make, because it is the difference between using AI and getting burned by it.

Sort every piece of information into three lights:

- 🟢 **Green.** Your own drafts, public info, subject lines, your own calendar. Safe to hand to the assistant freely.
- 🟠 **Amber.** Internal notes, emails from known contacts, half-finished plans. Fine to process, but strip names and numbers you would not want leaving your control. When in doubt, redact first.
- 🔴 **Red.** Passwords, contracts, anything under an NDA, client personal data, payment details. This never goes into a personal AI account. Ever. If a workflow would touch red-level material, it skips it and flags it for you instead.

Every prompt in this guide is built to respect this. When you write your own, keep the rule in your head: green flows, amber gets redacted, red stays out. This is not paranoia. It is the professional way to run AI in a real business.

---

## Day 1: Set up your assistant and connect the essentials

Open your chosen platform. Enable scheduled runs and connectors.

Claude: enable Cowork in settings.
ChatGPT: enable Tasks and Connectors in settings.
Gemini: open Workspace and enable Scheduled Actions.
Copilot: open Copilot Studio and create a new agent.

Connect only 3 things on day 1:
Your email inbox.
Your calendar.
Your main cloud drive (where your notes and docs live).

Do not connect anything else yet. Every connector is a new surface for something to go wrong. You want the smallest possible starting point.

Now write your system prompt. This is the short paragraph that tells the assistant who it is working for and how you want it to behave. Keep it plain.

Example:

> "You are the operations assistant for a solo founder. Your job is to reduce coordination overhead. Always summarise clearly. Flag anything urgent. Never send messages or take irreversible actions. Never store or repeat passwords, contracts, or client personal data. Always leave decisions to me. When in doubt, ask."

Save this. You will reuse it across every workflow.

Claude: save as a Project instruction.
ChatGPT: save as a Custom GPT instruction or Project system prompt.
Gemini: save as a Gem.
Copilot: save as the agent's system message in Copilot Studio.

Day 1 done. You have a working assistant with 3 connectors and a clear role.

---

## Day 2: Build your morning briefing

This is the single workflow that will change your day the most. It runs before you wake up.

Schedule a run for 07:00 in your timezone. Give it this instruction:

> "Read my inbox from the last 24 hours. Read today's calendar. Summarise in 3 sections. Section 1: what needs my attention today, ranked by urgency. Section 2: meetings today with any prep notes I should remember. Section 3: anything I missed yesterday that still needs a reply. Keep it under 300 words. Do not include passwords, full account numbers, or other sensitive details in the summary. Write it to a doc titled Morning Briefing YYYY-MM-DD in my main folder."

Test it once manually before scheduling. Read what it produces. If it feels noisy or wrong, edit the prompt. You will iterate this 3 or 4 times over the first week.

Day 2 done. Tomorrow morning, you will wake up with a briefing waiting.

---

## Day 3: Build your end-of-day review

Same idea. Different job. This one runs at your usual end-of-day time.

Schedule a run for 18:00 or whenever you close your laptop. Give it this instruction:

> "Read the doc titled Morning Briefing YYYY-MM-DD. Read the last 24 hours of email. Read the last 24 hours of calendar events. Summarise what got done, what got dropped, and what should carry into tomorrow. Write it to a doc titled Daily Review YYYY-MM-DD."

Between the morning briefing and the daily review, you now have a continuous thread. You are no longer starting each day from scratch. Your system remembers what happened yesterday even if you do not.

Day 3 done. You have 2 workflows running.

---

## Day 4: Build your research and content workflow

This is where things start to compound. You stop researching manually and you stop writing from a blank page.

Create a doc called Research Inbox. Anytime you find an interesting article, video, or post during the week, paste the link (and a 1-line note if you have time) into this doc. That is your only manual step.

Schedule a run for Friday at 14:00. Give it this instruction:

> "Read the doc titled Research Inbox. For each link, summarise the core insight in 3 sentences. Group insights by theme. At the bottom, propose 5 content ideas I could write about next week based on the themes. Save the output to a doc titled Weekly Research Digest YYYY-MM-DD. Do not empty the Research Inbox. I will archive it manually."

Now add a second scheduled run for Monday at 09:00:

> "Read the latest Weekly Research Digest. Pick the 2 strongest content ideas. For each, write a 300 word first draft in a conversational tone. Save to a doc titled Content Drafts YYYY-MM-DD. Mark them as drafts. Do not publish."

You now have a research pipeline feeding a content pipeline. Every Monday, you open 2 drafts to review. You edit. You publish yourself. The system does the boring 80 percent. You do the 20 percent that matters.

Day 4 done. You have 4 workflows running.

---

## Day 5: Build your client and project weekly update

If you serve clients or run projects, the weekly check-in is where most solo founders leak time. This workflow prepares the leg work.

You need a single doc per client or project, where you drop notes throughout the week (meetings, decisions, blockers). Do not over engineer this. Just one doc per client. Keep passwords, contracts, and personal data out of these docs. This is amber material, so redact anything you would not want leaving your control.

Schedule a run for Sunday at 17:00. Give it this instruction:

> "Read each doc in the folder titled Clients. For each client, write a short weekly update covering: what got done this week, what is blocked, what is next, and any questions I need answered. Save all updates to one doc titled Client Updates Ready to Send YYYY-MM-DD. Do not send anything. I will review and send myself."

Sunday evening, you open one doc, review 5 pre-written updates, tweak the tone, and send them yourself in 20 minutes. Every client feels well managed. You spent almost no time getting there.

Day 5 done. You have 5 workflows running.

---

## Day 6: Make the system reliable

A system that runs 5 times a day but fails silently is worse than no system. Day 6 is about trust.

Do 4 things.

**1. Add a stop rule to every workflow.**
For each schedule, add a line to the prompt: "If any required doc is missing or empty, do not guess. Write a short note to a doc titled System Log YYYY-MM-DD explaining what was missing. Do not continue."

**2. Create a System Log doc.**
This is where every workflow writes its status. You skim it once a day. If something failed, you see it there.

**3. Set a weekly review reminder.**
Sunday morning, spend 10 minutes reading the week of System Logs. Look for patterns. If the same workflow keeps failing on the same input, fix the prompt.

**4. Test what happens when a connector breaks.**
Disconnect your email for a moment. Run your morning briefing manually. Confirm it fails cleanly and writes to the System Log instead of inventing an answer. Reconnect email.

Day 6 done. Your system now tells you when it needs help.

---

## Day 7: Document and prepare to expand

You built 5 workflows in 6 days. Now protect the work.

Create a doc called My Operations System. Add:

1. The platform you chose and why.
2. The system prompt you gave the assistant.
3. The list of connectors you enabled.
4. Every scheduled workflow, with the exact prompt and the schedule time.
5. A short section called What This System Is For, in your own words, one paragraph.
6. A short section called What Broke And How I Fixed It, blank for now. Fill it as things break.

This doc is your recovery plan. If something goes wrong in 3 months and you cannot remember how you built it, this doc is how you rebuild it in 20 minutes.

Then pick one thing to add next week. Not 5. One. Common good next choices: a competitor watcher, a Stripe payment summary, a podcast prep workflow, a follow-up drafting workflow. Only add the next one once the current 5 are running without your attention for a full week.

Day 7 done.

---

## What you now have

A morning briefing waiting for you every day at 07:00.
A daily review closing every day at 18:00.
A weekly research digest every Friday at 14:00.
Two content drafts every Monday at 09:00.
Five client updates every Sunday at 17:00.
A System Log that tells you when anything failed.
A documented system you can rebuild in 20 minutes.

None of this needed code. None of this needed a team. It cost you 30 to 60 minutes per day for one week and the price of one AI subscription.

---

## The 3 things that decide whether this works long term

**1. Small scope.**
Add workflows one at a time. Never try to automate everything in one weekend. The systems that survive are the ones that grew slowly.

**2. Clear stop conditions.**
Every workflow needs to know when to stop and hand back to you. If it does not, it will drift and start producing noise you eventually ignore.

**3. Weekly review.**
10 minutes every Sunday reading the System Log. That is the entire maintenance cost.

Do those 3 things and the system gets more valuable every month instead of more fragile.

---

## Where this system will not save you

Whichever platform you picked, they all share the same ceiling. Scheduled assistants with connectors are powerful for the workflows in this guide. They are not the right tool for:

Multi step content pipelines with strict brand voice control.
Automated publishing to your social platforms.
Complex research pulling from dozens of sources with citations.
Anything that needs to read and write your own files directly.
Custom logic that chains multiple specialised assistants together.

This is the exact line between a helpful assistant and a real operations team. The first one you just built. The second one is what I teach inside **Fast Forward**, my step-by-step system for building the AI employees that run the parts of your business this playbook only prepped. If this week showed you what is possible, that is where you go deeper.

The founding waitlist is open. Details at the end.

---

## Get the next piece

Two ways to keep going.

**1. Want this playbook as a file you can keep?**
Comment **MORNING** on the post that sent you here, or send me a DM with the word **MORNING**, and I will send you the full guide plus the prompt pack so you are not copying from a doc.

**2. Ready to build the system that actually runs your business, not just your mornings?**
Join the **Fast Forward founding waitlist**. It is the same plain-language, no-code approach you just used, taken all the way to a business that runs without running your life. Founding members get first access and founding pricing. Link in the same place you found this.

You do not need a team to run a real company. You need a small set of reliable workflows that handle the predictable parts of your week so your best hours go to the work that actually grows the business.

Build the 5 workflows in this guide. Give it 2 weeks. Then decide what to add next.

That is how a one person company becomes a 24/7 operation without becoming a 24/7 job.

---

## Appendix: Platform translation table

Every instruction in this guide uses generic language. Use this table to translate the generic terms into what your platform actually calls them.

**Assistant role prompt:**
Claude: Project instructions or Cowork agent system prompt.
ChatGPT: Custom GPT instructions or Project system prompt.
Gemini: Gem instructions.
Copilot: Agent system message in Copilot Studio.

**Scheduled run:**
Claude: Cowork schedule.
ChatGPT: Task (create task with recurrence).
Gemini: Scheduled Action in Workspace.
Copilot: Trigger on a schedule in Copilot Studio.

**Email connector:**
Claude: Gmail connector.
ChatGPT: Gmail connector (or Outlook connector).
Gemini: native Gmail access (no setup).
Copilot: native Outlook access.

**Calendar connector:**
Claude: Google Calendar connector.
ChatGPT: Google Calendar connector (or Outlook Calendar).
Gemini: native Google Calendar.
Copilot: native Outlook Calendar.

**File storage connector:**
Claude: Google Drive or Notion connector.
ChatGPT: Google Drive, OneDrive, or SharePoint connector.
Gemini: native Google Drive and Docs.
Copilot: native OneDrive and SharePoint.

**Output document format:**
Claude: Google Doc (via Drive connector).
ChatGPT: Google Doc, OneDrive Word doc, or in chat with copy button.
Gemini: Google Doc (native).
Copilot: Word doc in OneDrive (native).

**Where to view scheduled run results:**
Claude: your Cowork task inbox.
ChatGPT: your Tasks tab in ChatGPT.
Gemini: your Gmail (results are emailed to you).
Copilot: your Copilot chat feed or Teams notifications.

---

## Appendix: Cost snapshot

Rough monthly cost for the paid tier needed to run this guide, at the time of writing. Prices change. Check the provider before you commit.

Claude Cowork: Claude Pro at about 20 USD/month, or Claude Max for heavier usage.
ChatGPT Tasks: ChatGPT Plus at about 20 USD/month, Team at about 25 USD per user/month.
Gemini Advanced: Google One AI Premium at about 20 USD/month, or Workspace with Gemini add on.
Microsoft 365 Copilot: about 30 USD per user/month on top of your existing Microsoft 365 subscription.

All 4 sit in the same 20 to 30 USD range for solo use. Cost is not the deciding factor. Fit with your existing tools is.

---

## Appendix: How to switch platforms later without losing your work

The whole point of writing your system down in the My Operations System doc is that you can rebuild it on a different platform in about an hour. Every prompt in this guide is written in plain language, not platform specific syntax. So if you start on Gemini and later decide Claude writes better drafts, you take your 5 prompts, paste them into Claude Cowork, reconnect the same 3 connectors, and you are running again by lunchtime.

The system is not the platform. The system is the 5 prompts and the schedule. The platform is just where you run them.

---

*Built by Fatiha Chikh, The AI Automation Queen. I help everyday entrepreneurs use AI and automation to win back their time, so their business runs without running their life. I already did the building. Now I hand you the systems.*
