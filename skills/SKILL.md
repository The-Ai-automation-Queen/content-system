---
name: creative-strategy
description: "Systematic framework for generating messaging angles, audience mappings, awareness-stage variations, and format matrices from a single topic. Turns one idea into 30-150 distinct content executions. Use when the user wants to 'brainstorm angles,' 'map messaging,' 'creative strategy,' 'angle generation,' 'messaging matrix,' 'awareness funnel content,' 'multiply content ideas,' 'pain vs desire mapping,' 'audience mapping,' 'messaging angles,' or wants to go deeper on a topic before writing. Also use when the user says 'run creative strategy on [topic]' or '/creative-strategy'. For writing the actual content pieces, hand off to content-factory, linkedin-video, instagram-reel, or content-repurpose. For ad-specific creative, see ad-creative."
---

# Creative Strategy Engine

Systematic framework for generating direct response content variations. Turns one topic into a structured grid of messaging angles, awareness-stage scripts, and format options — producing 30-150 distinct creative executions from a single idea.

Based on the Creative Strategy Engine by @alyshafrommotion, adapted for organic content and personal brand building.

---

## When to Use This Skill

- Before a content batch session, to generate a deep angle library for a topic
- When a topic feels "done" but still has untapped angles
- When content feels repetitive and needs fresh messaging directions
- When teaching someone how to think about creative strategy systematically
- When planning ad creative or direct response campaigns

This skill produces the **strategy grid**. Hand off to content-factory, linkedin-video, instagram-reel, or content-repurpose for actual script writing.

---

## Before Starting

Load these context files silently (do not display contents):

1. `C:\Users\fatih\.claude\skills\positioning\SKILL.md` — voice, brand, audience
2. `C:\Users\fatih\.claude\context\hook-bank.md` — proven hook skeletons + mechanism taxonomy. Angles in Step 3 must be writable as Bank skeletons so winners can be promoted back to the Bank.
3. `C:\Users\fatih\.claude\skills\inspiration-library\SKILL.md` — FORMAT patterns only (hook STRUCTURE comes from hook-bank.md)
4. `C:\Users\fatih\.claude\builds\outputs\content\vault\` — recursively glob `vault\**\*.md` and read recent entries to avoid duplicating angles already used

If running for someone other than the skill owner (teaching mode), skip these files and ask the user for their product/service, audience, and voice instead.

---

## Step 1: Identify the Primary Organizing Principle

Every product, service, or topic gets discovered one of two ways. Classify first — this determines the emotional register for all messaging.

### Pain-First

People are actively searching for a solution to a specific, felt problem. They know something is wrong. Lead with the pain, then introduce the resolution.

**Test question:** "What problem are people Googling right now?"

Examples: AI strategy consulting (CEO confusion), cybersecurity training, productivity tools

### Desire-First

People are not searching for a fix — they are drawn to an identity, aesthetic, or aspiration. Lead with the vision, then introduce the vehicle.

**Test question:** "What lifestyle or identity does this unlock?"

Examples: executive coaching (status), luxury travel, thought leadership positioning

**Output:** State whether the topic is pain-first or desire-first (or both — some topics have dual entry points). If dual, note which is primary and which is secondary.

---

## Step 2: Map Pain/Desire to Audiences

One pain point resonates with multiple audiences. One audience experiences multiple pains. Map these connections — this is where messaging angles multiply.

**Format:** Present as a grid.

| Pain Point or Desire | Audience 1 | Audience 2 | Audience 3 |
|---|---|---|---|
| Pain/desire A | How A hits this audience | How A hits this audience | How A hits this audience |
| Pain/desire B | How B hits this audience | How B hits this audience | How B hits this audience |

Generate at least 3 pain points or desires and at least 3 distinct audiences. Ask the user to confirm, add, or remove before proceeding.

---

## Step 3: Generate Messaging Angles (10-Lens System)

For each pain/desire x audience intersection, generate angles through these 10 lenses:

| Lens | Question to Ask |
|---|---|
| Desired Outcome | What transformation do they fantasize about? |
| Objections | What stops them from buying or acting right now? |
| Features/Benefits | What about the product or idea actually matters to them? |
| Use Case | How do they experience the pain in daily life? |
| Consequences | What gets worse if they do not address it? |
| Misconceptions | What do they get wrong about the problem? |
| Education | What do they not know about the problem? |
| Acceptance | What have they normalized that should not be normal? |
| Failed Solutions | What have they tried that did not work? |
| Identity | Who do they look at and think "I want to be like that"? |

**Output format:** For each pain x audience intersection, produce 5 angles (pick the 5 strongest lenses for that intersection). Present as a table:

| Pain x Audience | Angle 1 | Angle 2 | Angle 3 | Angle 4 | Angle 5 |
|---|---|---|---|---|---|
| [intersection] | "quote-style angle" | "quote-style angle" | "quote-style angle" | "quote-style angle" | "quote-style angle" |

Each angle should be written as a hook-ready line — something that could open a video, ad, or post. Not a description of the angle, but the actual line.

**Bank compatibility (required).** Every generated angle must be writable as a Bank skeleton (mechanism-tagged, body-swappable). Tag each angle with its mechanism (`curiosity-gap` / `shock-swap` / `confession` / `contrarian` / `list-promise` / `villain-named` / `before-after` / `specificity` / `insider-reveal` / `relatable-moment` / `reframe` / `frustration` / `subject-line`) so winners can be promoted to `context/hook-bank.md` Section A after performance.

---

## Step 4: Deploy Through the Awareness Funnel

Every messaging angle communicates differently depending on how aware the audience is. Map the strongest angles across all five stages.

| Stage | Definition | Tone |
|---|---|---|
| Unaware | They do not know they have the problem | Pattern-interrupt, education, "wait what?" |
| Problem Aware | They know the problem, not the solution | Empathy, validation, "I see you" |
| Solution Aware | Actively exploring types of solutions | Comparison, authority, "here is what works" |
| Product Aware | Evaluating your specific offering against others | Proof, differentiation, "here is why this one" |
| Most Aware | Ready to act, just need a final push | Social proof, urgency, "this is your sign" |

**Output format:** Take the top 3-5 angles from Step 3 and write a one-line script opening for each awareness stage:

| Angle | Unaware | Problem Aware | Solution Aware | Product Aware | Most Aware |
|---|---|---|---|---|---|
| [angle] | "..." | "..." | "..." | "..." | "..." |

Each cell should read like the first 1-2 sentences of a real piece of content — conversational, platform-native, not marketing-speak.

---

## Step 5: Format Matrix

Each angle x awareness combination can be executed in multiple creative formats. This step maps which formats fit which awareness stages.

### Format Options by Awareness Stage

| Format | Best For | Description |
|---|---|---|
| Storytelling | Unaware, Problem Aware | Personal narrative that surfaces the problem |
| Before/After | Problem Aware, Product Aware | Transformation evidence |
| Founder/Expert Story | Solution Aware | Origin story that builds authority |
| Us vs Them | Solution Aware, Product Aware | Direct contrast with alternatives |
| Social Proof Mashup | Product Aware, Most Aware | Multiple proof points compiled |
| Meme/Trend | Unaware | Cultural moment as entry point |
| Listicle | Problem Aware, Solution Aware | Numbered value delivery |
| Feature/Benefit Pointout | Solution Aware, Product Aware | Specific capability spotlight |
| Testimonial | Product Aware, Most Aware | Customer voice as proof |
| Street Interview/Vox Pop | Unaware, Problem Aware | "Real people" reactions |
| POV | Unaware, Problem Aware | "POV: you just..." immersive frame |
| Demo/How-To | Solution Aware, Product Aware | Show do not tell |
| Unboxing | Product Aware | First experience reveal |
| ASMR | Unaware | Sensory hook |
| Skit/Duet | Unaware, Problem Aware | Entertainment-first delivery |
| Comment Response | Any | Reactive content from real engagement |
| Comparison | Solution Aware | Side-by-side evaluation |
| Green Screen | Any | React to data, headlines, or screenshots |

**Output format:** For the top 3 angles, recommend 3 formats per angle with a one-line rationale:

| Angle | Format 1 | Format 2 | Format 3 |
|---|---|---|---|
| [angle] | [format]: [why] | [format]: [why] | [format]: [why] |

---

## Step 6: Compile the Strategy Grid

Combine all outputs into a single strategy document. Save to:
`C:\Users\fatih\.claude\builds\outputs\creative-strategy\[topic-slug]-strategy.md`

The document structure:

```
# Creative Strategy: [Topic]
Date: [DD/MM/YYYY]

## Organizing Principle
[Pain-first / Desire-first / Dual]

## Pain/Desire x Audience Map
[Grid from Step 2]

## Messaging Angles (Top 15-20)
[Table from Step 3]

## Awareness Funnel Deployment (Top 5 Angles)
[Table from Step 4]

## Format Recommendations
[Table from Step 5]

## Execution Priority
[Rank the top 5 angles x format combos to produce first, based on:
 - Alignment with current positioning
 - Platform fit (LinkedIn, Instagram, X)
 - Novelty vs what has already been posted (check content vault)]

## Content Lane
[CEO lane / Community lane / Bridge topic — per the two-lane brand rule]
```

---

## Teaching Mode

When the user says "teach creative strategy" or "walk me through this for a client," switch to instructional mode:

1. Explain each step conceptually before executing it
2. Use the user's product/service as the working example
3. Pause after each step for questions
4. At the end, offer to save the completed strategy as a reusable template

When teaching, frame each step with:
- **What** — what this step produces
- **Why** — why it matters (what goes wrong if you skip it)
- **How** — the specific questions to ask
- **Example** — one worked example before the user tries

---

## Integration with Other Skills

After running creative-strategy, the user can:
- `/content-factory [angle]` — write a specific piece from the strategy grid
- `/content-repurpose [entry]` — take one piece across all platforms
- `/one-to-all [angle]` — full multi-format plan from one angle
- `/ad-creative` — turn angles into paid ad variations
- `/instagram-reel` or `/linkedin-video` — produce platform-specific scripts from any angle

The strategy grid is the upstream input that makes all downstream content skills more effective.
