---
name: employee-stories
version: 1.0.0
description: |
  The 99 Employees story engine. Turns one agent-os employee file into one
  relatable, dead-simple story post (LinkedIn text, carousel script, or
  reel script) in the house format: Hassid-simple reading level, her voice
  laws, one receipt, one first win, one keyword CTA. This is the flagship
  serialized content format of the brand.
argument-hint: "[employee file path or role name] [post|carousel|reel]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# Employee Stories (The 99)

The brand story: Fatiha is hiring 99 AI employees, one at a time, in
public. Tagline family: "99 employees, but a payroll ain't one." Each
story = one employee = one founder problem killed. The public counter
only counts employees with receipts (ran in the last 7 days, output
linkable). The internal roster (137 files in
agent-os-company-dashboard/company/departments/) is the source material;
99 is the public story arc. Never claim an employee works until it does.

## The two modes

1. **PROOF mode**: "Meet Employee #N, she started this week." Only for
   employees actually running, with a receipt (screenshot, log, output).
   These advance the public counter.
2. **PLAYBOOK mode**: "Hire this employee yourself." A how-to the reader
   can build (Gmail triage, invoice chaser). Allowed before her own
   instance runs, but the demo must have been genuinely built and tested
   once. Free tier rules apply: understand + one first win, never the
   full system.

## Reading level (the Hassid rules, adapted)

- One idea per line. Max 12 words per sentence where possible.
- No jargon. "It reads your email and sorts it" not "it leverages LLM
  classification."
- Numbers over adjectives. "43 emails sorted before 9am" beats
  "massive time savings."
- Every claim is followed by its receipt or it gets cut (Law 7).
- Voice laws: plain English, NO em-dashes, redaction modeled in any
  shown prompt, Traffic Light Rule in every playbook.

## The episode skeleton (all formats follow this spine)

1. **HOOK. The problem, felt.** One line, second person, specific.
   "You answer email for 90 minutes a day. That is 22 working days a year."
2. **THE SCENE.** 2-3 short lines making it visceral. Morning, coffee,
   47 unread.
3. **THE HIRE.** Introduce the employee. Role card: name, job title,
   department, one-line job description, "Salary: $0. Never sleeps."
   RULE: employees may have human names but are ALWAYS explicitly AI in
   the same breath. "Nadia is not a person. Nadia is a workflow." Never
   a fake human presented as real (M02 law).
4. **HOW SHE WORKS.** 3-5 numbered steps, plain words, no tool worship.
   Tools get named once (n8n, Claude, Gmail) so it is real, not magic.
5. **THE RECEIPT** (PROOF mode) or **THE DEMO** (PLAYBOOK mode).
   One number traced to proof.md / run logs, or one honest screenshot.
6. **THE SAFETY LINE.** One Traffic Light beat. "Red: she never reads
   attachments from unknown senders. Client data never leaves the vault."
   This is the safe-AI educator differentiator; do not skip it.
7. **THE FIRST WIN.** One thing the reader can do in 10 minutes today,
   free, complete in itself.
8. **CTA.** Comment KEYWORD from an ACTIVE lead-magnets.csv row. Verify
   the row the same run (Engine Law 2).

## Format variants

- **LinkedIn post**: the skeleton as ~18-25 short lines. Hook is line 1,
  no "I'm excited to share."
- **Carousel** (via carousel-factory): slide 1 hook, slide 2 scene,
  slide 3 role card (use slide--quote as the card), slides 4-5 how she
  works, slide 6 receipt, slide 7 CTA. Role card slide reuses the same
  layout every episode so the series is instantly recognizable.
- **Reel script** (talking head + captions skill): 30-45s, hook in first
  3 seconds, role card as on-screen text, receipt as screenshot cutaway.
- **Hiring-post ritual** (announcement variant): job-ad parody.
  "Now hiring: Inbox Manager. Salary: $0. Interviews Friday." Posted 2-3
  days before the PROOF story ships. Creates the serial cliffhanger.

## The playbook law (non-negotiable)

Every PLAYBOOK episode ships its complete setup asset THE SAME RUN the
copy is written. No copy without its deliverable. Concretely, before the
episode can enter the vault, all four must exist:

1. `lead-magnets/<slug>.md`: the full setup guide, every step, the exact
   prompt with blanks, the Traffic Light rules. Complete enough that a
   reader needs nothing else.
2. `site/guides/<slug>.html`: the public guide page (use the standard
   guide template head/CSS).
3. An entry in the opt-in catalog in `site/opt-in.html` (chip, title,
   desc, 4 bullets).
4. An ACTIVE row in `lead-magnets.csv` with the keyword the episode's
   CTA uses.

Fatiha is never in the middle asking for the asset. The machine builds
the promise before it makes the promise. (First example: INBOX /
inbox-manager-setup, shipped 2026-07-07.)

## Names

Every employee gets a first name, not just a function. The name appears
with the role card and always with the AI-honesty beat ("She is not a
person. She is a workflow."). Names are assigned at activation and are
permanent. Assigned so far:

| # | Name | Role | Department |
|---|---|---|---|
| 001 | Nour | Board Secretary | Back Office |
| 002 | Rashid | Head of Research | Intelligence |
| 003 | Zeina | Design Studio | Marketing |
| 004 | Nadia | Inbox Manager (interviewing) | Operations |

New names: short, warm, easy to say in English and French, no name
reuse, never the name of a real client or contact. Log new assignments
in this table and on site/99.html in the same run.

## Series mechanics

- Numbering = order of activation, permanent. Employee #1 is the Board
  Secretary (receipt: queen-brain/board/). The number appears in every
  asset: "Employee #7 of 99."
- Each episode lands in the vault as a normal entry (ACP ratio applies;
  these are A-posts).
- The public tracker page (site/99.html, live) is the canonical
  counter; stories link to it. Update it in the same run as any hire,
  name, or receipt change.
- Source material: read the employee's file in
  agent-os-company-dashboard/company/departments/<dept>/<name>.md for
  the real job description. Do not invent capabilities the file does
  not describe.

## What this skill never does

- Never claims a count above the receipts. The counter can be small.
  Small and true beats big and hollow, permanently.
- Never publishes. Queue only; Fatiha releases.
- Never turns an episode into a sales page. One CTA, one keyword, done.
