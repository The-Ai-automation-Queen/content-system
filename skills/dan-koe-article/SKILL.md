---
name: dan-koe-article
deprecated: true
status: DEPRECATED — folded into Sterling 3P (29/04/2026)
description: |
  DEPRECATED 29/04/2026. The Dan Koe 5-part framework has been folded into the Sterling 3P framework
  (mandatory across all Fatiha content per `feedback_sterling_framework_mandatory.md`). For long-form
  articles (X article, Substack, LinkedIn long-form), use `/write` with platform set to `linkedin-long`,
  or invoke `content-factory` directly. The Sterling 3P shape (Outcome → Personal Story → Solution → CTA)
  preserves the anchoring strengths of the Dan Koe pattern while staying consistent with the rest of
  the content pipeline. This skill file is preserved for reference only — not invoked.
argument-hint: (deprecated — use /write linkedin-long instead)
---

# Dan Koe Article Writer — DEPRECATED (29/04/2026)

**This skill is deprecated.** Use `/write` with platform `linkedin-long` for long-form articles.

The Dan Koe 5-part framework (Personal Confession → Named Problem → Counterintuitive Reframe → Prescribe From Experience → Philosophical Expansion) had a competing structure with the mandatory Sterling 3P (Outcome → Personal Story → Solution → CTA). Two competing frameworks produced inconsistent voice across the library. As of 29/04/2026, Sterling 3P is the only framework. Long-form pieces use the same shape with more space per section.

**Migration path for what this skill used to do:**

| Old need | Replaced by |
|---|---|
| Long-form X article | `/write "topic" linkedin-long` (similar length, Sterling 3P shape) |
| Substack edition | `/newsletter` (uses Sterling 3P at edition level) |
| LinkedIn long-form | `/write "topic" linkedin-long` |
| 5-part essay structure | content-factory with `linkedin-long` automatically applies Sterling 3P expanded |

The rest of this file is preserved for reference. Do NOT invoke this skill.

---

# Dan Koe Article Writer

Write long-form articles (800-1500 words) for Twitter/X articles and Substack, using Dan Koe's newsletter framework adapted to the voice of an AI Strategic Advisor who helps senior leaders understand and implement AI.

---

## Workflow

### Step 1 — Collect Topic

If the user did not provide a topic, ask:

1. **Topic** — what is this article about?
2. **Seed moment** — what specific thing happened recently (client conversation, workshop moment, something you read, a frustration) that sparked this? If none provided, the skill will craft a plausible practitioner moment as a starting point for the user to edit.

If the user already provided both, proceed.

### Step 2 — Load Context

Read these files in parallel:

1. `C:\Users\fatih\.claude\skills\positioning\SKILL.md` — voice, brand, audience
2. `C:\Users\fatih\.claude\skills\inspiration-library\SKILL.md` — hook patterns and structural frameworks
3. `C:\Users\fatih\.claude\builds\outputs\content\vault\` — recursively glob `vault\**\*.md` and read existing entries (avoid duplicates, get next entry number by counting files)
4. `C:\Users\fatih\OneDrive\Obsidian Mind\wiki\research-notes.md` — recent findings to weave in
5. `C:\Users\fatih\.claude\skills\dan-koe-article\references\writing-framework.md` — the 5-part structure and voice rules

After reading, silently check:
- Has this topic been covered before? If yes, warn and ask whether to proceed with a fresh angle.
- Are there research notes relevant to the topic? If yes, weave those signals into the content.

### Step 3 — Generate 3 Opening Confessions

Using the writing framework's Part 1 rules, generate **3 distinct confession openings** for the article. Each must be:

- A specific, dated practitioner moment (real or plausible for the user to edit)
- 2-3 sentences maximum
- First sentence IS the confession — no preamble
- Grounded in the AI advisory / workshop / client context

Present the 3 openings numbered. Ask the user to pick one, edit one, or say **"go"** to let Claude choose the strongest.

### Step 4 — Write Full Article

Generate the complete article using the 5-part structure from `references/writing-framework.md`:

1. **Personal Confession Opening** (2-3 sentences) — the selected opening
2. **Named Problem with Framework Name** (200-300 words) — name the problem, give it a proper noun, unpack with 2-3 sub-dimensions
3. **Agitate with Counterintuitive Reframe** (200-300 words) — challenge conventional wisdom, use anti-hype positioning
4. **Prescribe from Experience** (300-400 words) — actionable guidance from practice, stacked single-sentence paragraphs
5. **Philosophical Expansion Closing** (100-200 words) — zoom out, do not summarize, end with a quotable standalone line

**Format rules:**
- Target 800-1500 words total
- Use `##` headers for sections (Roman numerals: I, II, III, IV)
- No bullet points or numbered listicles — stack single-sentence paragraphs instead
- Include at least one anaphora sequence per article
- Include at least one physical metaphor for an abstract concept
- Include at least one rhetorical question as a section transition
- 30-40% of paragraphs should be a single sentence
- Every section must contain at least one standalone sentence that works as a shareable quote on X

**Platform-specific additions:**
- Generate a **hook tweet** (max 280 chars) that would link to the article on X — vulnerability or provocation, not a summary
- Generate a **Substack subject line** (max 60 chars) — curiosity-driven, not clickbait

### Step 5 — Auto-Humanize

Apply these rules automatically without asking:

- **Non-contracted English always.** "do not" never "don't", "I am" never "I'm", "cannot" never "can't". Every contraction must be expanded.
- **No "hey"** anywhere. No context-setting openings. No title restatement.
- **First sentence = the confession.** Already enforced but verify again.
- **Personal stakes > abstract advice.** If any sentence reads like generic advice, rewrite with a concrete scenario.
- **Tone: practitioner-grounded, accessible-educational, strategic-executive.**
- Remove banned phrases: "game-changer", "unlock", "leverage" (as verb), "deep dive", "at the end of the day", "let that sink in", "here is the thing", "in today's world", "without further ado", "landscape", "delve", "tapestry", "it is important to note", "let us dive in", "navigate".
- **No profanity** — use blunt truths instead ("That is not a strategy. That is a wish.").
- Verify zero contractions remain after humanizing.

### Step 6 — Save to Content Vault

Determine the next entry number by globbing `C:\Users\fatih\.claude\builds\outputs\content\vault\*\*.md` (one level deep — vault flattened 30/04/2026) to count existing files and use the next sequential number (zero-padded to 3 digits).

Save the file to `C:\Users\fatih\.claude\builds\outputs\content\vault\x\` with `status: draft` in YAML frontmatter (no drafts/ subfolder).

Create the file with filename format: `[NNN]-[DD-MM-YYYY]-x-article-[topic-slug].md`

File structure:

```
---
entry: [NNN]
date: [DD-MM-YYYY]
platform: x-article / substack
topic: [TOPIC]
status: DRAFT
---

[Full article here]

**Hook tweet:** [hook tweet]
**Substack subject line:** [subject line]
```

Do NOT overwrite or modify any existing vault files.

### Step 7 — Show Final Output

Display:
- The full article
- Word count
- Hook tweet
- Substack subject line
- Confirmation that it was saved to the content vault with its entry number
- The file path of the new vault file

---

## Quick Usage

Invoke with topic:

> /dan-koe-article "Why most AI strategies fail within 6 months"

Or with topic and seed moment:

> /dan-koe-article "AI confidence gap" --seed "A CEO told me last week he had been paying for 3 AI tools for 6 months and nobody on his team had logged in"

Or just:

> /dan-koe-article

And the skill will ask for topic and seed moment.
