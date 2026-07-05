# Products Launch Checklist — run once per product, then forget about it

> Created: 2026-07-05 · Status: LIVING CHECKLIST
> All 4 store products now have finished, buyer-ready content (see
> `products/`). What's left for each is 100% yours: a Gumroad listing takes
> about 10 minutes. This doc gives you the exact copy to paste so there's no
> deciding left to do — just clicking.
>
> The Voice Clone Pipeline (audio narration) was retired from the portfolio
> entirely on 2026-07-05 — it doesn't belong here. The writing-voice method
> survives as "Writing Style Clone Lite," now a bonus playbook inside the
> Starter Kit below, not a standalone SKU.
>
> After each product: paste the resulting Gumroad URL into
> `site/store.html` → the matching `url: ""` field → the button flips from
> "Coming soon" to "Buy now" automatically. Nothing else on the page changes.

## The one-time flow, per product (repeat 4 times)

1. Gumroad → **New product** → **Digital product**.
2. Paste the **Title**, **Price**, **Summary**, and **Description** from the
   tables below.
3. Upload the file: export the matching `products/*.md` to PDF (or paste it
   into a Notion page and share the link, for the two that reference a
   Notion template) and attach it as the product file.
4. Turn on **"Send buyers automatic updates"** — you're allowed to improve
   these products silently forever without a re-launch.
5. Publish. Copy the product URL.
6. Paste that URL into `site/store.html`, into the matching product's `url`
   field. Commit and push (or ask me to do it — paste me the 4 links and
   I'll wire them all in one pass).

---

## 1. The Judge's Prompts

| Field | Paste this |
|---|---|
| Title | The Judge's Prompts |
| Price | $27 |
| Summary | 42 prompts that make AI prove its work before you trust it. |
| Description | Every AI guru sells you speed. This is the part they don't show you: how to check the work. 42 tested prompts across 5 categories — get AI to disagree with you before you build, prove its own output, absorb your real context, and grade itself against a goal you set. Tool-agnostic: works in Claude, ChatGPT, Gemini, Copilot, anything. Free updates included. |
| File | Export `products/the-judges-prompts.md` to PDF |
| Cover image | Reuse the Portrait or a plain electric-blue (#2C4BE0) card with the title in Playfair Display — ask me to generate one via Canva/Gamma if you want a designed cover |

---

## 2. The AI Time Audit

| Field | Paste this |
|---|---|
| Title | The AI Time Audit |
| Price | $47 |
| Summary | Map your week, find the hours AI can take, pick your first AI employee — in one sitting. |
| Description | Stop guessing where AI fits in your business. This worksheet takes you from "I know I should automate something" to "here's my first AI employee, doing real work, this week." Five parts: the Time Bleed Map, the AI Employee Filter, the Hire Sheet (with a copy-paste setup prompt), the Freedom Math, and your next 3 hires. One sitting, one plan. |
| File | Export `products/ai-time-audit-template.md` to PDF, or copy into a fillable Notion page and share that link instead |
| Cover image | Same approach as above |

---

## 3. Business OS Starter Kit

| Field | Paste this |
|---|---|
| Title | The Business OS Starter Kit |
| Price | $97 |
| Summary | Build the AI system I use to run my content, leads, and pipeline — in a weekend. No coding. |
| Description | Everything I built, simplified for a non-technical weekend build: a Brain Template (Notion-ready), four plain-English playbooks (clone your writing voice, write in it using AI, schedule everywhere, turn comments into leads), and a bonus 5-email nurture template. Copy the structure into your own Notion, follow the guides, done by Sunday. |
| File | Copy `products/business-os-starter-kit.md` into a Notion page, share the link, AND export it to PDF as a backup download |
| Extra step | Record the 25-minute walkthrough video mentioned in the kit (a screen recording of you setting up the template + running Guide 1 once, live) and attach the Loom/video link to the Gumroad delivery. This is the one product that needs a short recording — everything else is ready as-is. |
| Cover image | Same approach as above |

---

## 4. The Prompt Menu

| Field | Paste this |
|---|---|
| Title | The Prompt Menu: copy-paste prompts for every AI tool |
| Price | $19 |
| Summary | Which AI for which job, plus 30 bonus prompts (3 per tool) not in the free guides. |
| Description | The free Kitchen Map guides show you what's behind each AI's door. This is the menu card: a decision matrix for which of the 10 major AI tools to use for which job, plus 3 prompts per tool that aren't in the free guides. Keep it open in a tab — check it before you default to the same tool out of habit. |
| File | Export `products/the-prompt-menu.md` to PDF |
| Cover image | Same approach as above |

---

## Also on the launch list: the webinar page

`webinar-page/webinar-registration.html` is your live webinar registration
page — just rebranded to the current electric-blue system (was the older
purple/beige design). Two things still need YOUR input before you share it:

- [ ] Replace the `[SET DATE] · [SET TIME]` placeholder (in the hero meta
      pill) with the real next date/time.
- [ ] Regenerate `webinar-page/webinar.ics`: its `DTSTART`/`DTEND`/`UID`
      still point at a past date (17 June 2026) — update to match, or ask me
      to generate a fresh one once you give me the real date/time.

## After all 4 products are live

- [ ] Update `skills/monetisation/SKILL.md` Tier 0/1 status rows from
      "🔴 Build" to "🟢 Live", with the real URLs.
- [ ] Add each product's link to its matching free lead magnet / guide as a
      soft upsell line (one sentence, bottom of the page).
- [ ] Tell `content-engine` these are live — it can now write P-posts (per
      the ACP ratio rule: max 1 in every 10) linking to each.
- [ ] Nothing else. You do not have to touch this again unless you improve a
      product's content — Gumroad's auto-update setting handles the rest.
