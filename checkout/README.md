# Find Your Zone of Genius checkout handoff

Checkout is intentionally disabled in `main-site/checkout/config.json`. The repository fails closed until the unresolved owner decisions and provider checks below are complete.

## Existing integration evidence

Repository history and the current legacy Terms pages name **Whop** as the checkout and protected-delivery platform. No live payment URL or verified seller account is present in the public site source. The legacy Terms and Refund pages describe Fast Forward, not Find Your Zone of Genius, so they are not approval for this product.

Do not select, create, or authenticate a seller account from this handoff. Fatiha must confirm the exact approved account before setup continues.

## Approved non-secret values

Fatiha has approved the following values for this product. They are enforced exactly by the build validator:

- Payout currency: `USD`
- Refund terms: no refunds are available because this is a downloadable product
- Refund terms URL: `https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html`
- Monitored support and sender address: `Fatiha@shiftandlead.ai`

The checkout provider and seller account are not approved. Repository history suggests Whop, but that historical evidence is not authorization to select or authenticate an account.

## Protected provider setup

Only after the account decision is approved:

1. Create one one-time Whop product named **Find Your Zone of Genius** at **US$39**.
2. Configure a hard purchase limit of 12. Confirm the thirteenth purchase cannot complete before setting `CHECKOUT_BETA_CAP_VERIFIED=true`.
3. Upload `find-your-zone-of-genius-workbook-v2.pdf` and `find-your-zone-of-genius-private-agent.zip` to the provider's protected purchase area. Do not put either file in main-site, a public object store, or an indexable URL.
4. Set the successful-purchase redirect to `https://www.shiftandlead.com/purchase/confirmed.html`.
5. Paste `checkout/delivery-email.md` into the transactional delivery email and verify both protected files are available to the buyer.
6. Set `CHECKOUT_DELIVERY_VERIFIED=true` only after a buyer account can open the PDF and ZIP while a logged-out browser cannot.

## Safe test gate

Use test mode only if the already-approved Whop account is authenticated and the provider offers a safe non-financial test path. Never run a real transaction. Verify checkout amount, charge currency, 12-sale cap, redirect, email, both downloads, file opening, and logged-out denial. Then set `CHECKOUT_TEST_PURCHASE_VERIFIED=true`.

If a safe test mode is not available, stop and ask Fatiha before any financial transaction.

## Required configuration

The validator accepts no alternate price, charge currency, quantity, provider, or delivery mode.

```text
CHECKOUT_ENABLED=true
CHECKOUT_PRICE_CENTS=3900
CHECKOUT_CURRENCY=USD
CHECKOUT_BETA_LIMIT=12
CHECKOUT_PROVIDER=whop
CHECKOUT_ACCOUNT_REFERENCE=<approved non-secret account label>
CHECKOUT_PAYMENT_URL=<approved HTTPS whop.com payment URL>
CHECKOUT_PAYOUT_CURRENCY=USD
CHECKOUT_REFUND_TERMS_URL=https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html
CHECKOUT_REFUND_TERMS_APPROVED=true
CHECKOUT_SUPPORT_EMAIL=Fatiha@shiftandlead.ai
CHECKOUT_BETA_CAP_VERIFIED=true
CHECKOUT_DELIVERY_VERIFIED=true
CHECKOUT_TEST_PURCHASE_VERIFIED=true
```

`CHECKOUT_ACCOUNT_REFERENCE` and payout configuration are build-time gates only. They must never be written to `main-site/checkout/config.json` or browser code.

Run `npm run checkout:validate`. The command must pass before replacing the disabled public config with the approved public payment URL. Do not merge or deploy production from this handoff.
