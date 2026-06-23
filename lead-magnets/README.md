# Lead Magnets — the resources behind the comment-keyword CTAs

These are the actual resources the DM responder (Machine M05) hands out when
someone comments a keyword. Three are written and ready:

| Keyword | Resource | Pillar | Source file |
|---|---|---|---|
| `STACK` | The 3-Tool AI Stack I Actually Use | What's Worth It | `stack-3-tool-ai-stack.md` |
| `FOLLOW UP` | The Lead Follow-Up Setup | Stop Doing That by Hand | `follow-up-setup.md` |
| `TEAM` | How to Set Up Your First AI Employee | The Freedom Business | `first-ai-employee.md` |

The text is the deliverable. What's missing is a **public URL** for each — that's
the only thing blocking the DM machine. You host them; the loop does the rest.

---

## Host them in GoHighLevel (you already have it)

GHL is the cleanest home because it hosts the page **and** captures the lead
**and** runs your existing follow-up flow — one tool, no ManyChat needed.

For each of the three resources:

1. **Build a page.** GHL → *Sites → Funnels → New Funnel* (or a single page).
   Paste the resource text from the matching `.md` file as the page content.
2. **Add an opt-in.** Put an email field at the top ("Where should I send it?").
   On submit → reveal the resource (or email the PDF).
   - *Optional:* export the `.md` to PDF and attach it to the delivery email.
3. **Tag the lead.** On opt-in, apply a tag like `lm-stack` / `lm-followup` /
   `lm-team` so you know which offer each person wanted.
4. **Trigger your existing flow.** Drop them into your current GHL nurture
   workflow (the *Follow-Up Setup* resource is literally the blueprint for it).
5. **Copy the page URL** (e.g. `https://your.ghl.domain/stack`).

Then paste that URL into `lead-magnets.csv` → `resource_url`, and set
`active` to `yes`. The moment a row is active, the DM responder will hand it out.

> **Quick path if you're in a hurry:** any public link works — a Google Doc set
> to "anyone with the link," a Notion page, a Gumroad freebie. GHL is just the
> best because it captures the email too. You can start with a Google Doc and
> upgrade to a GHL page later without changing anything else.

---

## How the comment → DM → lead loop runs on GHL

Once IG is connected to GHL (Settings → Integrations → Facebook/Instagram):

```
Comment contains "STACK"  →  GHL workflow fires
   →  auto-DM: "Sending it! 👉 <resource_url>"
   →  they open the page + opt in  →  email captured, tagged lm-stack
   →  your nurture flow runs automatically
```

The `dm-responder` skill watches for keyword comments, logs every lead to
`reports/leads-YYYY-MM.md`, and flags any vault keyword that has no active row
here (a leak). The actual DM-send + capture can run **natively in GHL** — see
`skills/dm-responder/SKILL.md`.

---

## Keep these in voice

Each file was written through `positioning/SKILL.md` (casual, warm, a little
provocative; the win-back-your-time promise; one pillar each). If you edit them,
keep that voice — and keep the cross-links at the bottom (each magnet points to
the next keyword, so one lead magnet feeds the next).
