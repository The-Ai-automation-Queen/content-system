# The Inbox Manager Setup

**Keyword: INBOX** | Pillar: Stop Doing That by Hand | Employee #004 (Nadia) playbook

The complete setup for an AI employee that reads your email, sorts it,
drafts the easy replies, and hands you one summary a day. Works on Gmail
and Outlook. Draft-only by design: she never sends anything.

---

## What you are building

One workflow with four jobs:

1. Every new email gets read and labeled: **Reply needed / Waiting / FYI / Junk**.
2. Every "Reply needed" email gets a **drafted answer in your tone**, saved as a draft. Never sent.
3. Newsletters and receipts get **filed automatically** before you see them.
4. At 8am you get **one summary**: what needs you, what did not.

Time to build: about an hour. Cost: your email + one automation tool
(n8n or Make, free tiers work) + one AI (Claude).

## The safety rules (read these first)

- 🟢 Green: subject lines, sender names, your own drafts. Safe to process.
- 🟠 Orange: email bodies from known contacts. Processed by the AI, never
  stored anywhere else, never used for anything but the label and draft.
- 🔴 Red: attachments from unknown senders, anything with client data,
  passwords, or contracts. The workflow skips these entirely and labels
  them "Needs you". No exceptions.
- The send button is yours. The workflow has no permission to send, only
  to create drafts. Set this at the connection level, not as a prompt
  instruction: when you connect Gmail/Outlook, grant modify + draft
  scopes, do not grant send.

## Part 1 — The filters (10 minutes, no AI)

Do this even if you build nothing else. In Gmail (Settings, Filters) or
Outlook (Rules):

1. `from:(substack.com OR beehiiv.com OR mailchimp)` plus the word
   "unsubscribe" → label **Newsletters**, skip inbox.
2. Subject contains "receipt OR invoice OR order confirmation" → label
   **Receipts**, skip inbox.
3. Emails where you were CC'd but not the direct recipient → label
   **FYI**.

That is 30 percent of the job with zero AI.

## Part 2 — The triage brain (30 minutes)

In n8n (or Make):

1. **Trigger**: Gmail node, "message received" (Outlook: Microsoft
   Outlook trigger). Poll every 5 minutes.
2. **AI step**: send the sender, subject, and body to Claude with this
   job description (copy it exactly, fill the blanks):

```
You are my inbox triage assistant. Label this email as exactly one of:
REPLY_NEEDED, WAITING, FYI, JUNK.

My rules:
- Emails from [YOUR CLIENTS' DOMAINS] are always REPLY_NEEDED.
- Anything asking me for a decision, a meeting, or money: REPLY_NEEDED.
- Automated notifications, "no-reply" senders: FYI.
- Cold pitches selling me services: JUNK.
- If it mentions [YOUR PROJECT NAMES], never JUNK.

If REPLY_NEEDED, also draft a reply in my voice:
- Plain English, short sentences, warm but direct.
- Sign off: [YOUR SIGN-OFF].
- If the email asks for something I have not decided, the draft says
  I will come back by [day], it never invents an answer.

Return JSON: {"label": "...", "draft": "..." }
```

3. **Apply the label** back on the email (Gmail: modify labels node;
   Outlook: move to folder).
4. **If REPLY_NEEDED**: create a draft on that thread with the AI's
   text (Gmail: create draft node). It sits in your drafts folder,
   waiting for you.

## Part 3 — The 8am digest (15 minutes)

Second, tiny workflow:

1. **Trigger**: schedule, weekdays 8:00.
2. **Fetch**: all emails labeled in the last 24 hours.
3. **AI step**: "Summarize in 5 lines max: how many emails came in, how
   many need me (list sender + one-line ask for each), how many were
   filed. Plain English, no fluff."
4. **Deliver**: send it to yourself: email, Telegram, or Slack.

The feeling you are buying: you open your inbox already knowing
nothing in there is a surprise.

## The upgrade path

When the drafts start sounding like you 9 times out of 10, you have
built trust with your first AI employee. The same pattern (read, label,
draft, never send) is how every other AI employee works, from lead
follow-up to customer support. That is the system my paid products
install across a whole business.

---

*From the desk of Employee #004. Nadia is AI, built by one human. The
only job she took was the 90 minutes a day her boss was losing to email.*
