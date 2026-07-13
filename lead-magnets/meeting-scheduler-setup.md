# The Meeting Scheduler Setup

**Keyword: SCHEDULE** | Pillar: Stop Doing That by Hand | Employee #006 (Lina) playbook

The complete setup for an AI employee that ends the "does Tuesday work for
you?" email chain. She reads your real calendar, offers real slots, and
books the invite. She never sees the details of your other meetings, only
whether the time is free.

---

## What you are building

One workflow with four jobs:

1. Someone asks for time. She **reads your calendar** and finds what is genuinely open.
2. She **offers 3 real slots** in the same email or message thread.
3. They pick one, she **books it and sends the invite** to both of you.
4. Someone needs to reschedule, she **finds the next slot**. No thread restarts.

Time to build: about 30 minutes. Cost: your calendar (Google Calendar or
Outlook) + one automation tool (n8n or Make, free tiers work) + one AI
(Claude).

## The safety rules (read these first)

- 🟢 Green: free/busy status only. That is all she ever reads from your calendar.
- 🟠 Orange: the meeting titles and guest names on the invites she creates. Used only to send that one invite, stored nowhere else.
- 🔴 Red: the content or attendees of your *other* meetings. The workflow is built so she can never see this: the calendar connection is scoped to free/busy only, not event details. No exceptions.
- The scope decision happens at the connection level. When you connect your calendar, grant free/busy access, not full calendar read access.

## Part 1 — Your real availability (10 minutes, no AI)

Do this even if you build nothing else:

1. Block the hours you never want booked (deep work, family time, whatever
   is non-negotiable). Mark them busy on your calendar.
2. Set a buffer: no meetings booked less than 2 hours from now.
3. Decide your default meeting length (15, 20, or 30 minutes).

That is the boundary Lina works inside from day one. She cannot offer a
slot you have not made available.

## Part 2 — The offer and book brain (20 minutes)

In n8n (or Make):

1. **Trigger**: an email or message arrives asking for time (watch for
   phrases like "when are you free" or "let's find a time").
2. **AI step**: send your free/busy windows for the next 7 days to Claude
   with the job description below. Copy it exactly, fill the blanks.

```
You are my scheduling assistant. Here are my open windows for the next 7
days: [FREE/BUSY LIST]. Suggest exactly 3 specific times, spread across
different days, each [MEETING LENGTH] long.

My rules:
- Never suggest anything inside my blocked hours.
- Never suggest anything less than 2 hours from now.
- Write the offer in plain English, one short paragraph, in my voice.
- Sign off: [YOUR SIGN-OFF].

Return the message text only.
```

3. **Reply is sent** with the 3 slots, same thread.
4. **When they pick one**: a second, simple step books the calendar event
   and sends the invite to both people. No AI needed for this step, it is
   just a booking action.

## Part 3 — Reschedules (no extra build)

The same Part 2 flow handles a reschedule request exactly like a first
request: read what is free now, offer 3 new slots, book the pick. No
special case, no thread restarts.

The feeling you are buying: someone asks for time and gets an answer in
one message, not six.

## The upgrade path

Once the offers sound like you and meetings stop slipping through the
cracks, you have built trust with your third AI employee. The same
pattern, read, offer, confirm, hand off to a human when something is
unclear, is how every AI employee in this system works. That is the system
my paid products install across a whole business.

---

*From the desk of Employee #006. Lina is AI, built by one human. The only
job she took was the six emails it used to take her boss to book one call.*
