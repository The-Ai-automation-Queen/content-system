# Today's unblock — UNB-002 (15 min)

## First live checkout: The Judge's Prompts ($27) on Whop

**Why today:** three products sit READY TO SELL with zero dollars flowing.
Your own standing rule says no new SKUs until one existing SKU has a live
checkout — this is that checkout. Every field below is paste-ready; the copy
comes verbatim from `products/deliverables/the-judges-prompts-listing.md`
(already written, no em-dashes, on-law).

---

### Part A — Have the PDF ready (2 min, once)

The ebook is `products/deliverables/the-judges-prompts-ebook.html`.
If you don't already have the PDF export: open that file in Chrome →
Ctrl+P → "Save as PDF" → save as `The-Judges-Prompts.pdf`.

### Part B — Create the Whop product (8 min)

1. Go to **whop.com** → log in (or create the seller account — takes 2 min).
2. Dashboard → **New product** → type: **Digital download**.
3. Paste each field:

**Title**
```
The Judge's Prompts: 42 Ways to Make AI Prove Its Work
```

**Subtitle / short description**
```
42 copy-paste prompts that force AI to verify itself, so you stop guessing and start judging. Tool-agnostic. Redaction-safe.
```

**Price:** `$27` one-time · **Delivery:** upload `The-Judges-Prompts.pdf`

**Full description** — copy the whole block from
`products/deliverables/the-judges-prompts-listing.md` § "Full Description"
(starts "Every AI guru sells you speed…", ends "…hands you the gavel."),
then the 5 "What You Get" bullets and the 3 FAQ entries from the same file.

4. Publish → **copy the product URL** (looks like `https://whop.com/...`).

### Part C — Paste the link into the store (4 min)

On your local machine, in `site/store.html` (run `git pull origin main`
first — GitHub `main` is the source of truth since 2026-07-08):

1. Find `var PRODUCTS = [` (~line 96).
2. In the entry for **The Judge's Prompts**, paste your Whop URL into the
   empty `url: ''` field. The button flips from "Coming soon" to "Buy now"
   automatically — nothing else to edit.
3. Commit and push: `git add site/store.html && git commit -m "Judge's Prompts: live Whop URL" && git push origin main`.
   (`sync-to-github.bat` is retired — never bulk-overwrite `main`.)

*(Reference if anything looks different: `docs/PRODUCTS-LAUNCH-CHECKLIST.md`.)*

### Part D — Tell me (30 sec)

Reply **✅** — or don't; I'll see the URL land in store.html on tomorrow's
scan and mark it done myself.

---

**What happens next:** tomorrow's unblock is the VPS pull (UNB-003, 10 min)
so the site and your first Buy button go live to the world. Then the Prompt
Menu and Time Audit checkouts ride the same warm Whop flow (10 min each).
By Thursday: three SKUs live, store deployed, money rails done.
