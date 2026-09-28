# Launch plan — five workstreams (28 September 2026)

Internal plan for Fatiha's review. Every public word below is a **draft for
approval**, following `COMMERCIAL-REBUILD-BRIEF-2026-09-28.md`: text first, then
build. Nothing here is published.

## Order of work (revenue first, then scale)

| Week | Workstream | Why this order |
|---|---|---|
| 1 | **A. Release Profile Insight Report** | Already built, with Stripe wired. Testing is all that stands between it and the first sales. |
| 1 | **E. Choose 3 team workshop topics** | Lets company conversations start while the rest is built. |
| 2 | **B. Workbook 01 check and launch** | The 37-page PDF exists. Needs your approval, a price and a Stripe checkout. |
| 2–3 | **C. Pattern Finder agent page** | Turns the workbook's AI prompt into an easy online tool and a lead magnet. |
| 2–6 | **D. Rebuild the guides in batches of 5**, then industry kits | The biggest job. It runs alongside the others once the library plan below is approved. |

---

## A. Profile Insight Report — release checklist

Repo: `The-Ai-automation-Queen/emergent-`. The app, sign-in, Stripe checkout
($79 launch / $147 standard, one-time) and refunds are built. Its own
`DEPLOY.md` lists the release gates.

**What only Fatiha can do**
1. Give the support email, the legal name or business name, and the governing
   law for the Terms.
2. Confirm the 7-day refund policy.
3. Put the Stripe **test** keys and test prices into the Vercel Preview settings.
4. Point Supabase email sign-in at Lumail SMTP (the steps are in `DEPLOY.md`).

**What an agent can do next**
1. Run the automated checks (`yarn check`).
2. Walk through the 15 sandbox journeys in `DEPLOY.md` on the Preview (free
   report, both sign-in routes, test card, failed card, refund, phone width),
   then report each one as passed or failed.
3. Write the sales page copy for shiftandlead.com (for approval) and link it to
   the live app.

**Then:** switch to live Stripe keys, make one real purchase, refund it, and
launch to the workbook waitlist first.

---

## B. Workbook 01 — "Find the Strengths You Overlook"

From the Notion Product Hub: the First Edition is complete (37-page A4 PDF plus
an editable HTML source, with an AI synthesis prompt and a privacy note). It is
waiting on:
1. Your read-through and approval of the PDF.
2. A price.
3. Checkout: **Stripe**, replacing the Whop plan. The Whop account is not
   verified and has 0 products.
4. Delivery: after payment, a Lumail email with a private download link.
5. Terms, refund and licence wording.
6. One test purchase.

Workbooks 02 and 03: check their status in the Product Hub before promising
them.

The public page title differs from the Notion name ("Find the Strengths You
Overlook" vs "Find Your Zone of Genius"). Pick one before launch.

---

## C. Pattern Finder — interactive agent page (content spec, for approval)

**What the visitor gets:** they paste or type their answers from the workbook
or quiz. An AI assistant reads across them and returns the patterns, the
repeated strengths and the crossroads, then asks one follow-up question. It
never decides for them.

**Draft page copy (for approval)**
- Title: *See the pattern in your own story.*
- Line: *Paste your answers. The assistant looks across them and shows you what
  keeps coming back. You decide what it means.*
- Steps: 1. Answer the prompts, or paste your workbook answers. 2. Get your
  patterns, strengths and crossroads. 3. Ask follow-up questions.
- Privacy line: *Your answers are used only to create your result. They are not
  saved or used to train AI.*

**How it would work (one-time setup)**
- A page on shiftandlead.com and a server route that calls Claude with a fixed
  set of instructions: find patterns, quote the person's own words, never
  diagnose, ask before concluding.
- Nothing is stored. The API key stays on the server.
- **Free version:** the first result, unlocked with the same library sign-up
  (Lumail, Option A). That makes it a lead magnet.
- **Full version:** unlimited follow-ups and a downloadable summary, included
  with the workbook purchase.
- Needs: an Anthropic API key in Vercel, a spending limit, and your approval of
  the assistant's instructions before build.

**Question for you:** which "quiz" should feed it? The workbook prompts, or a
new short quiz (8–10 questions) on the page itself? A short quiz on the page is
recommended, as it is the easiest start for newcomers.

---

## D. Guides — rebuild with Saadia-level clarity

### The page format every guide will follow

1. **Title that names the reader's problem**, for example *"Your meeting notes
   never turn into actions. Fix it in 15 minutes."*
2. **Info row:** level · time · what you will have at the end · tool needed.
3. **In this guide:** 3–5 named steps.
4. **Why it matters:** 2–3 sentences.
5. **Demo:** a real-looking input and result (the existing cover and images
   stay).
6. **Exercise:** numbered steps on the reader's own work.
7. **Library sign-up** (Option A), then the **correction:** the full prompt, how
   to check the result, common mistakes.
8. **Next step:** the matching paid product or industry kit, plus 3 related
   guides.

> **Superseded 28/09:** Fatiha decided to restart the guides from scratch. The keep/merge/park list below is kept only as input for choosing which topics to cover again and which old addresses to redirect. See `BIG-PICTURE-2026-09-28.md`, section 6b.

### Library plan for the 37 published guides (proposal)

**Keep and rewrite: core "use AI at work, keep your judgement" (15)**
what-is-ai · ai-jargon-guide · what-is-a-prompt · what-should-you-never-share-with-ai ·
which-ai-tool-for-what · what-is-agentic · connect-ai-to-email-files-calendar ·
ai-skills-worth-learning-for-work · make-chatgpt-answers-shorter ·
stop-chatgpt-forgetting-context · claude · teach-claude-a-repeatable-workflow ·
chatgpt-screen-recording-to-process-guide · chatgpt-customer-research-with-evidence ·
instagram-content-dashboard

**Keep and rewrite: work-tool guides that company teams need (8)**
claude-projects · check-copilot-excel-edits · what-can-copilot-see-at-work ·
gemini-cannot-find-drive-file · what-is-an-ai-browser · show-up-in-ai-search ·
chatgpt-scheduled-tasks · mistral-multilingual-research

**Merge into one "Is this tool worth it?" guide per tool (8 → 3)**
- Grok: review-grok-suggestions + get-better-professional-writing-from-grok +
  verify-grok-current-research + test-grok-repeated-image-edits → one Grok
  guide
- Kimi: is-kimi-worth-paying-for + make-work-tracker-with-kimi → one Kimi guide
- DeepSeek: test-deepseek-v4-document-work + protect-a-long-deepseek-project →
  one DeepSeek guide

**Park (off-audience; keep as drafts, with a redirect to the nearest guide) (6)**
fix-deepseek-wall-of-text, edit-long-writing-with-deepseek (fiction editing) ·
test-meta-muse-money-saving-task, meta-ai (consumer shopping) · manus-browser-workflow ·
gemini-google-tasks-limits

**Result:** about 26 strong guides instead of 37 uneven ones.

**New guides tied to the paid offers (first 6)**
1. How I publish more with my AI twin (and keep my voice)
2. Find the strengths you overlook (free taster of Workbook 01)
3. What your LinkedIn history says about you (free taster of Profile Insight)
4. Check an AI answer before you use it (the drafted guide already exists)
5. Choose and improve AI creative work (building taste; drafted)
6. Your first week of AI at work: a plan for your team

**Batches of 5, each approved as text first:** batch 1 is what-is-ai, what-is-a-prompt,
what-should-you-never-share-with-ai, which-ai-tool-for-what and new guide #2.

---

## D2. Industry use cases → paid industry kits

The same method with examples from each field. The pages follow the pattern of
Saadia's Sprint pages: 3 jobs per industry, then what you leave with. Delivered
as a **self-paced kit** (videos, prompts, worked examples) and as a **company
workshop**. Draft, for approval:

| Industry | Job 1 | Job 2 | Job 3 | Fatiha's proof |
|---|---|---|---|---|
| **Fashion & retail** | Tell a collection's story | Plan launch visuals and video | Answer customer questions consistently | LeLabPlus, Nike Re-Creation |
| **Tech & B2B marketing** | Turn a product brief into a partner campaign | Prepare sales enablement content | Summarise market research with sources | Dell, Intel, Microsoft partner marketing |
| **Consultants & professional services** | Explain your offer clearly | Turn expertise into guides and posts | Prepare routine client replies for review | Your own guides and content system |
| **Beauty & wellness** | Explain a treatment simply | Plan a visual campaign | Answer common client questions | — (needs a case or partner) |
| **Education & training** | Adapt one lesson for different levels | Make a concept visible | Draft exercises with answer keys | Your guides are the example |
| **Property** | Make a project easy to picture | Plan a walkthrough sequence | Draft follow-ups from project facts | — (needs a case or partner) |

**Recommendation:** launch the first three, where you have direct proof.

---

## E. Company workshop topics — choose 3

All run online, 2–3 hours or as a short series, in English, French or Spanish.
Each uses the team's own work.

| # | Topic (working title) | What the team leaves with | Built from |
|---|---|---|---|
| 1 | **AI at work, done well** | A shared way to brief AI, check answers and know what never to paste in | 15 core guides |
| 2 | **Your team's content engine** | A repeatable process for turning expertise into posts, emails and videos in the brand's voice | Your Content Factory and AI twin |
| 3 | **The human edge** | Each person sees what they bring that AI cannot replace, and uses AI around it. Answers the team's fear of being replaced. | Workbooks + Pattern Finder |
| 4 | **Capture what your people know** | Recordings and repeat tasks turned into process guides the whole team can reuse | Screen-recording and Claude workflow guides |
| 5 | **Copilot / Gemini in practice** | Hands-on use of the tool the company already pays for, safely | Copilot and Gemini guides, plus Microsoft background |
| 6 | **Responsible AI at work** | Plain-English rules: privacy, EU AI Act basics, approvals | AIGP study. **Only once certified.** |

**Recommendation:** 1, 2 and 3. Together they are foundations, output and
people, and they tell your story end to end. Add 6 after AIGP certification.

---

## Decisions needed from Fatiha

1. Profile Insight: the four owner items in section A.
2. Workbook 01: approve the PDF, choose its name, set a price.
3. Pattern Finder: feed it from workbook answers or a new short quiz?
4. Guides: approve the library plan (keep, merge, park, new).
5. Industries: confirm the first three.
6. Company workshops: choose 3 topics.
