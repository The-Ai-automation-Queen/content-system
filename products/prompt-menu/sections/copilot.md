---
kitchen: Microsoft Copilot
tagline: The whole Microsoft Copilot ecosystem walked through like a restaurant. Door, kitchen, plate.
---

## Starters (4) - first wins, 5 minutes each

### S1. The inbox triage
PROMPT:
```
You're in Copilot Chat or the Copilot pane in Outlook. Summarize my unread emails from this morning into three groups: needs a reply today, can wait, and pure FYI. For each email, give me one line on what it's about and who it's from, using [Client]/[Sender] style labels instead of full names if I paste subject lines directly. End with a suggested order to answer them in.
```
WHEN: First thing in the morning, before you open a single email yourself.

### S2. The meeting you missed
PROMPT:
```
You're in Copilot for Teams. Summarize the meeting titled "[Meeting name]" from [date]. Give me: the three decisions that got made, anything assigned to me by name (use [Me] if my name appears), and any open question nobody answered. Flag anything that sounds like a deadline.
```
WHEN: Whenever a meeting happened without you, or you need the two-minute version before the next one.

### S3. The paragraph that's too long
PROMPT:
```
You're Copilot in Word. Here's a paragraph: "[paste paragraph]". Make it more concise without losing the meaning. Give me two versions: one cut to half the length, one cut to a single sentence. Keep the tone [formal/casual, pick one].
```
WHEN: Any time a draft feels bloated and you want it tightened in seconds, right where you're writing it.

### S4. The chart that explains itself
PROMPT:
```
You're Copilot in Excel. Look at the data in this sheet and chart it by [region/month/category, pick one]. Then write me three sentences underneath explaining what the chart shows in plain English, as if you were telling a colleague who has 30 seconds.
```
WHEN: When a table of numbers needs to become something a non-analyst can glance at and understand.

## Mains (6) - real business work

### M1. The client update, drafted for me
PROMPT:
```
You're Copilot in Outlook. Draft an email to [Client] giving a project status update. Cover: what shipped this week (rounded to the nearest useful detail, no exact figures unless I give them to you), what's in progress, and one thing I need from them to keep moving. Keep it under 150 words, warm but professional, no filler like "I hope this finds you well."
```
WHEN: Weekly or biweekly client check-ins that would otherwise eat 20 minutes of staring at a blank draft.

### M2. The budget sanity check
PROMPT:
```
You're Copilot in Excel with Code Interpreter. I'm giving you a spreadsheet with rounded, non-identifying numbers only (no real client names, no exact contract values). Check the totals, flag any row where a formula looks broken or a number seems out of range compared to the rest, and tell me in plain language if anything looks off before I send this to [Client] or my accountant.
```
WHEN: Before any budget, invoice summary, or financial doc leaves your hands.

### M3. The proposal, built from what I already have
PROMPT:
```
You're Copilot in Word, grounded in my SharePoint files. Pull together a first draft of a proposal for [Client] using our past proposal templates and the notes from our last call (search for anything with "[Client]" or "[project name]" in the file name or content). Structure it as: the problem, what we'd do, rough timeline, and next step. Leave placeholders in [brackets] for anything you can't find, don't guess at numbers.
```
WHEN: Starting a new client proposal without writing the whole skeleton from scratch.

### M4. The competitive snapshot, delegated
PROMPT:
```
You're Copilot Cowork. Prepare a competitive analysis report comparing [my company/product] against [Competitor A] and [Competitor B]. Research publicly available information only, no scraping anything behind a login. Draft it, format it as a short report with a summary at the top, and have it ready for me to review. I'll check back once it's done, don't wait for me to babysit it.
```
WHEN: When you want real research and a real draft to exist by the time you're back at your desk, not just an outline.

### M5. The quarterly plan, laid out
PROMPT:
```
You're Copilot in Word or Copilot Pages. Help me lay out a plan for [Q1/Q2/Q3/Q4] covering three goals for [my business/team]. For each goal, give me: the outcome we want, two or three concrete steps, and a rough timeframe (weeks, not exact dates unless I specify them). Keep the whole thing on one page. Turn it into a Copilot Page so I can share it with [my team/Me] and we can edit it together.
```
WHEN: Quarterly planning sessions, especially when the plan needs to live somewhere shareable, not buried in a chat window.

### M6. The recurring report, made into a skill
PROMPT:
```
You're Copilot Cowork. I do this same task every [week/month]: [describe the recurring task, e.g. "pull last month's numbers, write a one-page summary, and flag anything down more than 10 percent"]. Turn this into a saved Copilot Skill so next time I just tell you to run it, instead of explaining it from scratch. Confirm back to me what you saved as the instructions before we finish.
```
WHEN: Any task you find yourself explaining the same way more than twice. This is Copilot's version of building your own repeatable process, not something the other tools do.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The whole-company answer
PROMPT:
```
You're Copilot Chat, grounded in Microsoft Graph. Answer this using only what's actually in my company's emails, calendar, and files, don't invent a policy or a fact if you can't find it: "[my question, e.g. 'what's our current refund policy' or 'who owns the [project name] account']". If you can't find a real source for the answer, tell me plainly that you couldn't find it instead of guessing. Name the document or email you pulled it from.
```
WHEN: Any question where the honest answer lives somewhere in your own company's files, not in general knowledge. This only works because Copilot reads your actual Graph data, not a generic model.

### C2. The three-app relay
PROMPT:
```
You're Copilot, working across Outlook, Word, and PowerPoint. Take the client feedback in this email thread about [Client]'s project, turn the key points into a short revised project brief in Word, then build three slides from that brief for a five-minute internal update. Keep names as [Client] and rounded figures throughout all three documents. Tell me when each piece is ready.
```
WHEN: When one piece of information needs to travel through your whole toolkit and come out the other side as three different deliverables, without you retyping it three times.

### C3. The overnight delegation
PROMPT:
```
You're Copilot Cowork. Here's the task: "[describe a multi-step task, e.g. 'research three vendors for [service], compare pricing tiers, and draft a one-page recommendation']". Plan it, research it, and produce the finished draft in the background. I'm closing my laptop. Have it waiting for me when I open it back up, and flag anywhere you had to make an assumption instead of finding a real answer.
```
WHEN: Real delegation, not just chat. Cowork keeps working even when your machine is off, which no other kitchen on this menu does yet.

## Verify (2) - make it prove its work

### V1. The grounding check
PROMPT:
```
You're Copilot. For the answer you just gave me about "[topic]", tell me exactly which document, email, or file you pulled each fact from. If any part of your answer wasn't grounded in a real source from my company's files, an it was your own general knowledge, say so directly instead of blending it in as if it were all sourced the same way.
```
WHEN: Any time Copilot states something as company fact. This catches the exact failure the guide calls out: a confident answer that cites a policy that doesn't exist.

### V2. The yes-chef check
PROMPT:
```
You're Copilot. I'm about to share [a plan/budget/document] with you. Before you tell me what you think, give me the three weakest points in it first, the things a skeptical outside reviewer would flag, even if the rest is strong. Only after that, tell me what's working. Don't open with "this looks great."
```
WHEN: Before anything goes out the door, when you specifically don't want a chef who just agrees with you. Guards against the sycophancy the guide warns about.

The full verification system lives in The Judge's Prompts.
