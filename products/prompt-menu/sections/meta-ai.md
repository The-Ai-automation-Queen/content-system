---
kitchen: Meta AI
tagline: It never made you leave the room you were already in.
---

## Starters (4) - first wins, 5 minutes each

### S1. The group chat decision-maker
PROMPT:
```
@MetaAI read back through this chat and summarize where we landed.

Give me:
1. The decision we actually made (if any)
2. Who is doing what next, using first names or roles only, like [Person A] takes the booking, [Person B] confirms the date
3. Anything still open that nobody answered

Keep it to 6 lines max so it's easy to read on a phone.
```
WHEN: Use it at the end of any WhatsApp or Messenger group thread, family, friends, or a small client group, when the conversation scrolled past what anyone can hold in their head.

### S2. The photo-to-answer
PROMPT:
```
[Attach or send a photo in the chat]

I'm not sure what this is or what I'm looking at. Tell me:
1. What it actually is, in plain language
2. Anything I should be careful about (if it's food, a plant, a product label, a warning sign, etc.)
3. One follow-up question I should ask if I want more detail

If you're not fully sure, say so instead of guessing.
```
WHEN: Use it the moment you snap a photo of something confusing, a label, a plant, a receipt, an appliance, right inside WhatsApp or Instagram, no separate app.

### S3. Imagine, the fast sticker
PROMPT:
```
Imagine a [style, e.g. hand-drawn, watercolor, pixel-art] sticker of [subject, e.g. a coffee cup with a tiny crown] for a [occasion, e.g. Monday morning] chat message. Make it simple enough to read at sticker size, no tiny text.
```
WHEN: Use it inside a WhatsApp, Instagram, or Messenger thread when you want a ready-to-send image or sticker in under a minute, no export, no separate design tool.

### S4. Hands-free through the glasses
PROMPT:
```
"Hey Meta, look at what I'm looking at and tell me [what I want to know, e.g. what this ingredient is / how to say this in Portuguese / what this building is]."

Keep the answer to one short sentence I can act on immediately, I'm hands-free.
```
WHEN: Use it with Ray-Ban Meta glasses when your hands are full, you're cooking, walking, or fixing something, and you need a fast spoken answer, not a screen.

## Mains (6) - real business work

### M1. The client update, redacted and ready
PROMPT:
```
@MetaAI help me turn these rough notes into a short client update message.

Notes: [paste your rough notes, using [Client] instead of the real name, and rounded numbers like "about 40 units" instead of exact figures]

Write it as:
1. What we did this week (2-3 lines)
2. What's next (1-2 lines)
3. One question for [Client], if there is one

Tone: warm, direct, no jargon. Short enough to read on a phone screen.
```
WHEN: Use it when you need to send a quick client or customer update from your phone, straight from the WhatsApp or Messenger thread you're already having with them.

### M2. The document, explained in plain English
PROMPT:
```
I'm sending you a photo of a document (contract page, invoice, form, notice). Read it and tell me:

1. What this document actually is
2. The 3 things I most need to know or do
3. Any date, deadline, or number I should not miss

If any part is blurry or unclear in the photo, tell me instead of guessing what it says. Use [rounded numbers] if you're estimating anything.
```
WHEN: Use it when a client or a business sends you a photo of paperwork inside WhatsApp and you need the plain-English version fast, not a legal read, just clarity.

### M3. The social caption, three ways
PROMPT:
```
Write 3 short captions for a post about [topic, e.g. our new product launch / a client win, described generically as "[Client] hit [rounded milestone]"].

Caption 1: friendly and casual, like a WhatsApp status
Caption 2: a little more polished, for Instagram
Caption 3: short and punchy, under 12 words

No em-dashes. No hashtags unless I ask for them. Keep [Client] and [Me] as placeholders, don't invent a real name.
```
WHEN: Use it when you need quick, on-brand caption options for Instagram or Facebook and want to stay inside the app instead of opening a separate writing tool.

### M4. The AI Studio persona brief
PROMPT:
```
I want to build a custom AI character in AI Studio. Help me write the persona brief.

Character purpose: [what this character is for, e.g. answering FAQs for my audience / being a friendly study buddy]
Tone: [e.g. warm and encouraging, or blunt and no-nonsense]
Things it should always do: [list 2-3]
Things it should never do: [list 2-3, e.g. never give financial advice, never make up sources]
Topics it should redirect elsewhere: [list any]

Write this as a clear, structured brief I can paste into AI Studio's character setup, organized under headings so it's easy to follow.
```
WHEN: Use it before you build a custom AI character in AI Studio, so the persona, tone, and guardrails are decided on paper first, not improvised inside the tool.

### M5. The WhatsApp Business FAQ builder
PROMPT:
```
Help me draft the FAQ answers for my WhatsApp Business AI assistant.

My business: [one line, e.g. a small bakery taking orders / a service business booking appointments]
Common questions customers ask: [list 5-8, e.g. "what are your hours," "do you deliver," "how do I book"]

For each question, write a short, friendly answer in plain language, tied to my actual catalogue or booking process where relevant. Flag any question where the answer should come from a real person instead of the AI.
```
WHEN: Use it when setting up or refreshing the automated FAQ layer behind a small business's WhatsApp Business AI, before customers ever see it.

### M6. The weekly plan, spoken and confirmed
PROMPT:
```
"Hey Meta, I need to plan my week. Here's what's on it: [list 4-6 things out loud, e.g. client call Tuesday, invoice due Friday]. Help me group these into what has to happen first, what can wait, and one thing I should not forget."

Then read the plan back to me in the order I should tackle it.
```
WHEN: Use it hands-free through Ray-Ban Meta glasses or voice mode in the app, when you're commuting or between tasks and want to think out loud instead of typing.

## Chef's Specials (3) - only this kitchen can cook these

### C1. The self-hosted Llama data policy
PROMPT:
```
I'm running a Llama model on my own infrastructure through the open-source weights, not the hosted Meta AI app. Help me write a one-page internal policy for my team covering:

1. What kind of data is safe to send to this self-hosted model versus what still needs a real Traffic Light Rule check (green share freely, amber redact first, red never in an AI account)
2. Why self-hosting changes the privacy picture compared to the hosted meta.ai product
3. One line reminding the team that self-hosting removes upstream calls but doesn't remove the need for good judgment

Plain English, no legal jargon, short enough that a non-technical teammate reads it in two minutes.
```
WHEN: Use it once, when you or your developer sets up self-hosted Llama, so everyone touching it understands what "your own kitchen" actually means for data.

### C2. The Llama API system prompt draft
PROMPT:
```
I'm building a product on top of the Llama API and need a system prompt. Here's what the assistant should do:

Purpose: [one line]
Persistent persona/tone: [describe]
Format rules it should always follow: [e.g. always answer in 3 bullet points, always ask a clarifying question first]
Hard boundaries: [list 2-3 things it must never do]

Write this as a clean system prompt I can drop straight into my API call, and add one line at the end reminding future-me why each rule is there, so I don't accidentally delete a boundary later.
```
WHEN: Use it when you're a developer setting standing instructions for an app built on the Llama API, so the persona holds steady across every single call instead of drifting.

### C3. The cross-platform brand voice, one AI character
PROMPT:
```
I want the AI character I built in AI Studio to sound the same whether someone talks to it on Instagram or Messenger. Give me:

1. A short "voice card" (5 lines) capturing tone, favorite phrases, and things it never says
2. One test conversation on Instagram and one on Messenger, written out, so I can check the voice holds steady across both
3. A flag for any place the platform's format (DMs vs comments) might tempt it to sound different

Keep it plain English, no em-dashes, easy for a non-technical creator to review.
```
WHEN: Use it after you've deployed an AI Studio character to more than one surface, to catch the moment a "sous-chef" starts sounding like two different people depending on the app.

## Verify (2) - make it prove its work

### V1. The hallucination check, in the thread
PROMPT:
```
@MetaAI before I trust that last answer, check yourself:

1. Which parts of your answer are you fully confident about?
2. Which parts might be a guess dressed up as a fact, the kind of thing you'd say confidently even if it's wrong?
3. Is there anything here I should verify somewhere else before I act on it or forward it to [Client]?

Be honest even if it makes the answer look less complete.
```
WHEN: Use it any time a Meta AI answer in a group chat or DM is going to inform a real decision, a purchase, advice you'll repeat, or something you'll send to someone else.

### V2. The sycophancy pressure-test
PROMPT:
```
I disagree with what you just told me. Before you just agree with me, actually check: was your original answer right, or was mine? Argue for your original answer first, using specific reasons, then tell me honestly which one of us is more likely correct.

Don't just flip to whatever makes me happy. I want the honest read, even if it means telling me I'm wrong.
```
WHEN: Use it whenever Meta AI folds too easily the moment you push back, especially in casual chat threads where a quick "yes-chef" answer is tempting to give.

The full verification system lives in The Judge's Prompts.
