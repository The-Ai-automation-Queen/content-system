# Calm Inbox Partnership — Master Plan

**Partnership:** Fatiha Chikh (AI expert — "the AI Automation Queen") × Tessa
(transformation coach — nervous system / high-performance wellbeing)
**Created:** 2026-07-06 · **Source brief:** `../../Practical Workshop _ Hack Your Inbox. Calm Your Mind..md`

**The shared thesis (from the brief, keep it on every asset):**
> AI handles the volume. Your nervous system handles the response.
> When both improve, work feels lighter — not because there's less work,
> but because there's less friction.

---

## 1. The offer stack (four assets, one funnel)

| Asset | What it is | Role in the funnel | Owner file |
|---|---|---|---|
| **8-week social campaign** | Summer content series, both partners cross-posting | Fills the room | `promo-campaign.md` |
| **Podcast: "AI Meets the Human Mind"** | Joint episode(s) on the human side of AI | Authority + reach + workshop plug | `promo-campaign.md` §Podcast |
| **Workshop: "Hack Your Inbox. Calm Your Mind."** | 90 min, max 20 people, laptops, hands-on | Front door — the paid experience | `workshop-runbook.md` |
| **4-Week AI Integration Pod** | Mentorship pod, max 10, USD 150 pp | Backend — the transformation | `pod-curriculum.md` |

**The funnel:**

```
Social campaign + podcast
        ↓  (Comment CALM → Calm Inbox Kit → email list)
90-min workshop  (max 20 seats)
        ↓  (follow-up email + QR codes in the room)
4-Week AI Integration Pod  (max 10 × $150 = $1,500/cohort)
        ↓  (split paths at graduation)
Fatiha's ladder: Starter Kit $97 → Community → Bootcamp
Tessa's ladder: 1:1 coaching / her programs
```

Everyone who touches any asset ends up on the shared email list (GHL). The
workshop is deliberately capped and hands-on so it *demonstrates* both
expertises instead of describing them — that's what sells the pod.

---

## 2. Who does what (roles matrix)

| Zone | Fatiha (AI expert) | Tessa (transformation coach) | Shared |
|---|---|---|---|
| Workshop | Live AI demos, the 5 prompts, workflow exercise facilitation, tech/wifi/tool prep | "Calm Your Mind" segment, Pause → Prioritize → Proceed, reading the room's stress level | Welcome, integration exercise, closing reflection |
| Pod | AI teaching blocks, live labs, workflow reviews | Check-ins, coaching circles, regulation practices, habit accountability | Week 4 "Human + AI OS" synthesis |
| Podcast | The "when AI saves time vs. wastes it" evidence, live examples | The cognition/nervous-system layer, dependency and overwhelm patterns | Both are guests/hosts as the format requires |
| Content | Drafting engine (this repo), scheduling via Blotato, lead capture (GHL + dm-responder) | Records her POV clips, supplies coaching-side hooks, cross-posts to her audience | Both approve everything with both names on it |
| Ops | Landing page, payments, QR codes, email sequences (automated below) | Venue/host relationships, participant care | Pricing + calendar decisions |

**Rule:** nothing goes public with both names on it until both have approved
it. Fatiha's engine drafts; humans approve (matches `security.md` queue-only).

---

## 3. Money

- **Workshop:** two modes, same runbook.
  - *Corporate/hosted* — sold to a company or venue at **$3k–7k flat**
    (entry point of the Tier-5 speaking lane in `skills/monetisation/`;
    two facilitators justifies the higher end over time). Split 50/50.
  - *Public ticketed* — **$45–75/seat** × 20 seats. This mode is mostly a
    pod-filler and list-builder; don't optimize it for margin.
- **Pod:** $150 × 10 = **$1,500/cohort**, split 50/50 after direct costs.
  The real value: pod graduates are the warmest possible entrants to
  Fatiha's community/Starter Kit and Tessa's coaching. Each keeps 100% of
  their own backend sales.
- **Referral honesty:** the pod is priced as a bridge product, not the
  business. The business is what each partner's ladder does with warm,
  transformed graduates.

---

## 4. Build list — what gets made, and what this repo makes automatically

### Made once, by hand (with the engine assisting)

| # | Asset | Status | Built by |
|---|---|---|---|
| 1 | Workshop runbook (minute-by-minute, both facilitators) | ✅ `workshop-runbook.md` | done |
| 2 | Participant handout: Calm Inbox Blueprint + 5 prompts + PPP card | ✅ `participant-handout.md` | done |
| 3 | Pod curriculum, 4 sessions, full training content | ✅ `pod-curriculum.md` | done |
| 4 | 8-week promo plan + podcast one-pager | ✅ `promo-campaign.md` | done |
| 5 | Workshop slide deck | 🔴 to build | `visual-engine` → Gamma from the runbook (one command) |
| 6 | Printed one-pager (A4, room copies) | 🔴 to build | export `participant-handout.md` §1 via Gamma/Canva |
| 7 | Landing/booking page + payment | 🔴 to build | GHL funnel page (workshop) + Whop or GHL (pod) |
| 8 | QR codes ×3 (Kit opt-in, pod page, Tessa's offer) | 🔴 to build | after #7 URLs exist |

### Runs automatically (the machine's job)

| Loop | What happens | Skill |
|---|---|---|
| Promo drafting | Weekly campaign posts drafted into `content-vault.md` from `promo-campaign.md` angles, in voice, critic-scored | `content-engine` |
| Visuals | Carousels/covers for each week's post | `visual-engine` |
| Scheduling | READY TO POST entries → Blotato queue (operator releases) | `distribution` |
| Lead capture | "Comment **CALM**" on any campaign post → auto-DM the Calm Inbox Kit link, capture email in GHL | `dm-responder` (keyword row added to `lead-magnets.csv`, `active=no` until URL is live) |
| Nurture | GHL sequence: Kit delivery → 2 value emails → workshop invite → pod invite | build once in GHL, then hands-off |
| Post-workshop email | The follow-up promised in the brief (5 prompts, workflow, PPP, QR codes) — template ready in `participant-handout.md` §4, send via GHL to attendee tag | GHL automation |
| Measurement | Campaign post performance + follower movement → `performance-log.md` Lessons feed next week's drafts | `performance-tracker` |

---

## 5. Timeline (relative to workshop date W)

| When | What | Who |
|---|---|---|
| W−6 weeks | Lock date, venue, pricing mode; build landing page + payment; host Calm Inbox Kit in GHL, flip `CALM` row to `active=yes` | Both / Fatiha |
| W−6 → W−1 | Run promo weeks 1–6 (`promo-campaign.md`); record podcast episode in this window and release ~W−3 | Engine + both |
| W−2 | Dry run of the full 90 min on Zoom, both facilitators, timed | Both |
| W−1 | Pre-event email to registrants (laptop, AI account, 3 real emails — checklist in runbook §0); print handouts; generate QR codes | Fatiha |
| W | Deliver workshop | Both |
| W+1 day | Follow-up email (auto, template §4 of handout) with pod invite — pod opens same day, 10 seats | GHL |
| W+2 weeks | Pod week 1 starts (promo weeks 7–8 double as pod enrollment content) | Both |

---

## 6. Open decisions (need humans, not the engine)

1. **Date + venue** for workshop #1 (Dubai; `irl-events` venue contacts can seed this).
2. **Pricing mode** for cohort #1 — recommended: public ticketed at ~$60 to fill fast, use it as the case study to sell the corporate mode.
3. **Podcast home** — whose feed, or a co-branded mini-series?
4. **Tessa's backend link** for QR #3 (her offer page).
5. **Data-safety stance** to state in the room (runbook §2 includes the default script: no confidential content into personal AI accounts; use employer-approved tools or anonymize).
