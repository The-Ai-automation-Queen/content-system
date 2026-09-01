# Find Your Zone of Genius checkout handoff

Checkout is intentionally disabled in `main-site/checkout/config.json`. It must remain disabled until Fatiha supplies an approved Whop account reference and the exact approved checkout URL. Do not invent, infer, create or select the account or checkout link.

## Existing integration evidence

Repository history and the current legacy Terms pages name **Whop** as the checkout and protected-delivery platform. No live payment URL or verified seller account is present in the public site source. Historical evidence is not authorization to select or authenticate an account.

## Approved non-secret values

These values are approved and enforced exactly by the build validator:

- Price: `US$39`
- Charge and payout currency: `USD`
- Beta purchase cap: `12`
- Refund terms: `No refunds are available because this is a downloadable product.`
- Refund terms URL: `https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html`
- Monitored support and sender address: `Fatiha@shiftandlead.ai`
- Delivery mode: provider-protected

The Whop seller account and checkout URL are **not supplied or approved in this repository**. Keep checkout disabled until the owner supplies the approval values described below.

## Protected provider setup

Only after the exact account decision is approved:

1. Create one one-time Whop product named **Find Your Zone of Genius** at **US$39**, or select it only if the owner explicitly approves the exact checkout URL.
2. Record the approved non-secret account reference in both `CHECKOUT_ACCOUNT_REFERENCE` and `CHECKOUT_APPROVED_ACCOUNT_REFERENCE`. They must match exactly.
3. Obtain the hosted URL in the exact shape `https://whop.com/checkout/plan_<id>`. Generic Whop pages, subdomains, extra path segments, query strings and fragments fail validation.
4. Set `CHECKOUT_APPROVED_PAYMENT_URL` to the exact owner-approved URL. CHECKOUT_PAYMENT_URL must exactly match CHECKOUT_APPROVED_PAYMENT_URL.
5. Configure a hard purchase limit of 12. Confirm the thirteenth purchase cannot complete before setting `CHECKOUT_BETA_CAP_VERIFIED=true`.
6. Upload the protected artifacts listed below to the provider's protected purchase area. Do not put either file in main-site, a public object store or an indexable URL.
7. In the provider checkout, display the exact sentence **“No refunds are available because this is a downloadable product.”** and link `https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html` before the buyer pays. Verify the visible wording and link in both desktop and mobile checkout, then set `CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED=true`.
8. Set the successful-purchase redirect to `https://www.shiftandlead.com/purchase/confirmed.html`. That public page is informational only; it is not proof of purchase or entitlement and grants no file access.
9. Paste `checkout/delivery-email.md` into the transactional delivery email and verify both protected files are available to the buyer.
10. Set `CHECKOUT_DELIVERY_VERIFIED=true` only after a buyer account can open the PDF and ZIP while a logged-out browser cannot.

## Protected artifacts and expected hashes

Verify the exact files before provider upload. A mismatch blocks handoff:

| Protected artifact | Expected SHA-256 |
| --- | --- |
| `find-your-zone-of-genius-workbook-v2.pdf` | `8061cfe8ec8b2061e6990bf115eaca3533ddf2654e1b374e37374588672b0194` |
| `find-your-zone-of-genius-private-agent.zip` | `7cf7ee4788c57cb8872c32cb60f576da50f34cd84a2e4a88f71c91a81f19766b` |

The publish-source verifier rejects either protected filename anywhere below `main-site/`, at any nesting depth.

## Safe test gate

Use test mode only if the already-approved Whop account is authenticated and the provider offers a safe non-financial test path. Never run a real transaction. Verify checkout amount, charge currency, account and exact checkout URL binding, visible no-refund terms and link, 12-sale cap, redirect, email, both downloads, artifact hashes, file opening and logged-out denial. Then set `CHECKOUT_TEST_PURCHASE_VERIFIED=true`.

If a safe test mode is not available, stop and ask Fatiha before any financial transaction.

## Required configuration

The validator accepts no alternate price, charge currency, quantity, provider, checkout URL shape or delivery mode. Placeholders below document required inputs; they are not actual approvals.

```text
CHECKOUT_ENABLED=true
CHECKOUT_PRICE_CENTS=3900
CHECKOUT_CURRENCY=USD
CHECKOUT_BETA_LIMIT=12
CHECKOUT_PROVIDER=whop
CHECKOUT_ACCOUNT_REFERENCE=<approved non-secret account reference supplied by owner>
CHECKOUT_APPROVED_ACCOUNT_REFERENCE=<same approved account reference supplied by owner>
CHECKOUT_PAYMENT_URL=https://whop.com/checkout/plan_<approved-id>
CHECKOUT_APPROVED_PAYMENT_URL=<exact same owner-approved checkout URL>
CHECKOUT_PAYOUT_CURRENCY=USD
CHECKOUT_REFUND_TERMS_URL=https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html
CHECKOUT_REFUND_TERMS_APPROVED=true
CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED=true
CHECKOUT_SUPPORT_EMAIL=Fatiha@shiftandlead.ai
CHECKOUT_BETA_CAP_VERIFIED=true
CHECKOUT_DELIVERY_VERIFIED=true
CHECKOUT_TEST_PURCHASE_VERIFIED=true
```

Account references and approval values are build-time gates only. They must never be written to `main-site/checkout/config.json` or browser code.

Run `npm run checkout:validate`. The command must pass before replacing the disabled public config with the approved public payment URL. Do not merge or deploy production from this handoff.
