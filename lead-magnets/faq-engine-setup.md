# The FAQ Engine Setup

**Keyword: FAQ** | Pillar: Stop Doing That by Hand | Employee #007 (Karim) playbook

The complete setup for an AI employee that answers the questions you have
already answered a hundred times, instantly, and honestly hands off
anything it does not recognize. He never improvises an answer.

---

## What you are building

One workflow with four jobs:

1. You give him **your 10 most-asked questions**, written in your own words.
2. A customer messages, he **checks the list**: is this one of the 10?
3. If yes, he **answers instantly**, in your words, from your approved list.
4. If no, he **says so honestly** and hands it straight to you. No guessing.

Time to build: about 25 minutes. Cost: your FAQ list + one AI (Claude) +
your messaging inbox (website chat, Instagram DMs, or email all work).

## The safety rules (read these first)

- 🟢 Green: the 10 approved questions and answers you gave him. Safe to repeat, word for word.
- 🟠 Orange: the customer's exact wording of their question. Read once to match against your list, never stored or used for anything else.
- 🔴 Red: any question outside your approved list. He never invents an answer, guesses at pricing, or promises something you have not confirmed. That is the one rule that matters most.
- The escalation message is fixed and honest: "Let me get you a real answer" every time, never a guess dressed up as confidence.

## Part 1 — The approved list (10 minutes, no AI)

Do this even if you build nothing else:

1. Write down the 10 questions you answer most. Be specific: "what are your
   hours" not "general questions".
2. Write your real answer to each, in your own words, the way you would
   actually say it.
3. Keep the list somewhere he can read it (a simple document works fine).

That list is his entire job description. Nothing he says comes from
anywhere else.

## Part 2 — The matching brain (15 minutes)

In your automation tool (n8n, Make, or your chat platform's built-in
automation):

1. **Trigger**: a new message arrives.
2. **AI step**: send the message and your approved list to Claude with the
   job description below. Copy it exactly, fill the blanks.

```
You are my FAQ assistant. Here is my approved list of questions and
answers: [YOUR 10 Q&A PAIRS].

A customer just asked: [THEIR MESSAGE].

My rules:
- If their question clearly matches one on my list, answer using my exact
  wording, adjusted only for grammar to fit their question.
- If it does not clearly match, do not guess. Reply exactly: "Great
  question, let me get you a real answer, I'll be with you shortly."
- Never invent pricing, availability, or policy that is not on my list.

Return the reply text only.
```

3. **Send the reply** automatically for matched questions.
4. **Flag the rest** to you, with the customer's original message attached,
   so you never see a duplicate of your own answer, only the ones that
   actually need you.

## Part 3 — Keep the list honest (5 minutes a week)

Once a week, scan what got escalated. If the same new question shows up
twice, add it to the approved list. The list gets smarter, he never does
the guessing himself.

The feeling you are buying: the same 10 questions stop landing on your
desk, and the ones that do actually need you.

## The upgrade path

Once his answers sound like you and the escalations drop, you have built
trust with your fourth AI employee. The same pattern, match, answer,
escalate honestly, is how every AI employee in this system works. That is
the system my paid products install across a whole business.

---

*From the desk of Employee #007. Karim is AI, built by one human. The only
job he took was the fifty times a week his boss typed the same answer by
hand.*
