import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { validateCheckoutConfiguration } from '../tools/checkout-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const approvedCheckoutEnv = (overrides = {}) => ({
  CHECKOUT_ENABLED: 'true',
  CHECKOUT_PRICE_CENTS: '3900',
  CHECKOUT_CURRENCY: 'USD',
  CHECKOUT_BETA_LIMIT: '12',
  CHECKOUT_PROVIDER: 'whop',
  CHECKOUT_ACCOUNT_REFERENCE: 'test-approved-account',
  CHECKOUT_APPROVED_ACCOUNT_REFERENCE: 'test-approved-account',
  CHECKOUT_PAYMENT_URL: 'https://whop.com/checkout/plan_test123',
  CHECKOUT_APPROVED_PAYMENT_URL: 'https://whop.com/checkout/plan_test123',
  CHECKOUT_PAYOUT_CURRENCY: 'USD',
  CHECKOUT_REFUND_TERMS_URL: 'https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html',
  CHECKOUT_REFUND_TERMS_APPROVED: 'true',
  CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED: 'true',
  CHECKOUT_SUPPORT_EMAIL: 'Fatiha@shiftandlead.ai',
  CHECKOUT_BETA_CAP_VERIFIED: 'true',
  CHECKOUT_DELIVERY_VERIFIED: 'true',
  CHECKOUT_TEST_PURCHASE_VERIFIED: 'true',
  ...overrides,
});

test('checkout remains safely disabled when no approved account configuration is present', () => {
  const result = validateCheckoutConfiguration({});

  assert.deepEqual(result, {
    enabled: false,
    errors: [],
    publicConfig: {
      enabled: false,
      provider: null,
      paymentUrl: null,
      price: { amountCents: 3900, currency: 'USD' },
      betaLimit: 12,
      refundTermsUrl: null,
      confirmationUrl: 'https://www.shiftandlead.com/purchase/confirmed.html',
      deliveryMode: 'provider-protected',
    },
  });
});

test('checkout fails closed when enablement is requested without every approved value', () => {
  const result = validateCheckoutConfiguration({ CHECKOUT_ENABLED: 'true' });

  assert.equal(result.enabled, false);
  assert.deepEqual(result.errors, [
    'CHECKOUT_PRICE_CENTS must be 3900',
    'CHECKOUT_CURRENCY must be USD',
    'CHECKOUT_BETA_LIMIT must be 12',
    'CHECKOUT_PROVIDER must be whop for the existing protected-delivery integration',
    'CHECKOUT_ACCOUNT_REFERENCE is required',
    'CHECKOUT_ACCOUNT_REFERENCE must match CHECKOUT_APPROVED_ACCOUNT_REFERENCE',
    'CHECKOUT_PAYMENT_URL must be an exact HTTPS whop.com/checkout/plan_<id> URL',
    'CHECKOUT_PAYMENT_URL must match CHECKOUT_APPROVED_PAYMENT_URL',
    'CHECKOUT_PAYOUT_CURRENCY must be USD',
    'CHECKOUT_REFUND_TERMS_URL must be https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html',
    'CHECKOUT_REFUND_TERMS_APPROVED must be true',
    'CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED must be true',
    'CHECKOUT_SUPPORT_EMAIL must be Fatiha@shiftandlead.ai',
    'CHECKOUT_BETA_CAP_VERIFIED must be true',
    'CHECKOUT_DELIVERY_VERIFIED must be true',
    'CHECKOUT_TEST_PURCHASE_VERIFIED must be true',
  ]);
  assert.equal(result.publicConfig.enabled, false);
  assert.equal(result.publicConfig.paymentUrl, null);
});

test('checkout rejects any configured price, charge currency, or beta limit other than the approved values', () => {
  const result = validateCheckoutConfiguration({
    CHECKOUT_ENABLED: 'true',
    CHECKOUT_PRICE_CENTS: '9900',
    CHECKOUT_CURRENCY: 'EUR',
    CHECKOUT_BETA_LIMIT: '99',
  });

  assert.ok(result.errors.includes('CHECKOUT_PRICE_CENTS must be 3900'));
  assert.ok(result.errors.includes('CHECKOUT_CURRENCY must be USD'));
  assert.ok(result.errors.includes('CHECKOUT_BETA_LIMIT must be 12'));
  assert.equal(result.enabled, false);
});

test('the committed browser checkout config and button fail closed', () => {
  const config = JSON.parse(read('main-site/checkout/config.json'));
  const browserScript = read('main-site/assets/checkout.js');

  assert.equal(config.enabled, false);
  assert.equal(config.paymentUrl, null);
  assert.deepEqual(config.price, { amountCents: 3900, currency: 'USD' });
  assert.equal(config.betaLimit, 12);
  assert.match(browserScript, /button\.removeAttribute\('href'\)/);
  assert.match(browserScript, /button\.setAttribute\('aria-disabled', 'true'\)/);
  assert.match(browserScript, /config\.enabled !== true/);
});

test('confirmation and delivery email name both protected files and set the privacy boundary', () => {
  const confirmation = read('main-site/purchase/confirmed.html');
  const email = read('checkout/delivery-email.md');
  const combined = `${confirmation}\n${email}`;
  const privacy = 'Shift & Lead does not receive your answers, analysis or final page. ChatGPT still processes and stores what you enter according to your account, workspace and data-control settings.';

  for (const content of [confirmation, email]) {
    assert.match(content, /find-your-zone-of-genius-workbook-v2\.pdf/);
    assert.match(content, /find-your-zone-of-genius-private-agent\.zip/);
    assert.match(content, /open the workbook PDF first/i);
    assert.ok(content.replaceAll('&amp;', '&').includes(privacy));
  }
  assert.match(email, /Fatiha@shiftandlead\.ai/);
  assert.match(confirmation, /<!-- chrome:nav -->[\s\S]*<!-- \/chrome:nav -->/);
  assert.match(confirmation, /<!-- chrome:footer -->[\s\S]*<!-- \/chrome:footer -->/);
  assert.doesNotMatch(combined, /send (?:me |us )?your (?:answers|reflection)|reply with your (?:answers|reflection)/i);
  assert.doesNotMatch(combined, /public\/downloads|href=["'][^"']+\.(?:pdf|zip)/i);
});

test('handoff requires provider-protected files, a hard 12-sale cap, and a test purchase before enablement', () => {
  const setup = read('checkout/README.md');

  assert.match(setup, /Whop/i);
  assert.match(setup, /do not put either file in main-site/i);
  assert.match(setup, /hard purchase limit of 12/i);
  assert.match(setup, /US\$39/i);
  assert.match(setup, /test mode/i);
  assert.match(setup, /never run a real transaction/i);
  assert.match(setup, /CHECKOUT_ACCOUNT_REFERENCE/);
  assert.match(setup, /CHECKOUT_PAYMENT_URL must exactly match CHECKOUT_APPROVED_PAYMENT_URL/i);
  assert.doesNotMatch(setup, /CHECKOUT_(?:APPROVED_)?PRODUCT_ID/);
  assert.match(setup, /CHECKOUT_PAYOUT_CURRENCY/);
  assert.match(setup, /CHECKOUT_REFUND_TERMS_APPROVED/);
});

test('approved operational values are explicit in the non-secret handoff and delivery email', () => {
  const setup = read('checkout/README.md');
  const email = read('checkout/delivery-email.md');

  assert.match(setup, /CHECKOUT_PAYOUT_CURRENCY=USD/);
  assert.match(setup, /CHECKOUT_SUPPORT_EMAIL=Fatiha@shiftandlead\.ai/);
  assert.match(setup, /CHECKOUT_REFUND_TERMS_URL=https:\/\/www\.shiftandlead\.com\/workbooks\/find-your-zone-of-genius-refund-terms\.html/);
  assert.match(email, /Fatiha@shiftandlead\.ai/);
  assert.doesNotMatch(email, /\{\{SUPPORT_EMAIL\}\}/);
});

test('the publish build validates checkout configuration before serving committed files', () => {
  const result = spawnSync(process.execPath, ['tools/validate-checkout-config.mjs'], {
    cwd: root,
    env: {},
    encoding: 'utf8',
  });
  const vercel = JSON.parse(read('main-site/vercel.json'));

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checkout is safely disabled/);
  assert.match(vercel.buildCommand, /checkout:validate/);
});

test('the product page exposes only the fail-closed checkout control at US$39 for 12 buyers', () => {
  const productPage = read('main-site/workbooks/find-your-zone-of-genius.html');

  assert.match(productPage, /src="\/assets\/checkout\.js"/);
  assert.match(productPage, /data-checkout-button/);
  assert.match(productPage, /US\$39/);
  assert.match(productPage, /12 beta buyers/);
  assert.doesNotMatch(productPage, /https:\/\/(?:www\.)?whop\.com/i);
});

test('the product has clear product-specific no-refund terms linked from its sales page', () => {
  const productPage = read('main-site/workbooks/find-your-zone-of-genius.html');
  const refundTerms = read('main-site/workbooks/find-your-zone-of-genius-refund-terms.html');
  const approvedTerms = 'No refunds are available because this is a downloadable product.';

  assert.match(productPage, /href="\/workbooks\/find-your-zone-of-genius-refund-terms\.html"/);
  assert.ok(refundTerms.includes(approvedTerms));
  assert.match(refundTerms, /Find Your Zone of Genius/);
  assert.match(refundTerms, /Fatiha@shiftandlead\.ai/);
  assert.doesNotMatch(refundTerms, /—/);
});

test('checkout accepts only the approved payout currency, support identity, and product refund page', () => {
  const result = validateCheckoutConfiguration(approvedCheckoutEnv({
    CHECKOUT_PAYOUT_CURRENCY: 'AED',
    CHECKOUT_REFUND_TERMS_URL: 'https://www.shiftandlead.com/refund-policy.html',
    CHECKOUT_SUPPORT_EMAIL: 'support@example.com',
  }));

  assert.equal(result.enabled, false);
  assert.deepEqual(result.errors, [
    'CHECKOUT_PAYOUT_CURRENCY must be USD',
    'CHECKOUT_REFUND_TERMS_URL must be https://www.shiftandlead.com/workbooks/find-your-zone-of-genius-refund-terms.html',
    'CHECKOUT_SUPPORT_EMAIL must be Fatiha@shiftandlead.ai',
  ]);
  assert.equal(result.publicConfig.paymentUrl, null);
});

test('a fully approved configuration exposes only public checkout values', () => {
  const accountReference = 'test-approved-account';
  const result = validateCheckoutConfiguration(approvedCheckoutEnv());

  assert.equal(result.enabled, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.publicConfig.paymentUrl, 'https://whop.com/checkout/plan_test123');
  assert.doesNotMatch(JSON.stringify(result.publicConfig), new RegExp(accountReference));
  assert.doesNotMatch(JSON.stringify(result.publicConfig), /AED|support@example\.com/);
});

test('checkout rejects generic Whop pages and binds enablement to approved account and checkout values', () => {
  for (const paymentUrl of [
    'https://whop.com',
    'https://whop.com/discover',
    'https://example.whop.com/checkout/plan_test123',
    'https://whop.com/checkout/example',
    'https://whop.com/checkout/plan_test123/extra',
    'https://whop.com/checkout/plan_test123?affiliate=unknown',
  ]) {
    const result = validateCheckoutConfiguration(approvedCheckoutEnv({
      CHECKOUT_PAYMENT_URL: paymentUrl,
      CHECKOUT_APPROVED_PAYMENT_URL: paymentUrl,
    }));
    assert.equal(result.enabled, false, paymentUrl);
    assert.ok(result.errors.includes('CHECKOUT_PAYMENT_URL must be an exact HTTPS whop.com/checkout/plan_<id> URL'), paymentUrl);
  }

  const mismatched = validateCheckoutConfiguration(approvedCheckoutEnv({
    CHECKOUT_APPROVED_ACCOUNT_REFERENCE: 'different-account',
    CHECKOUT_APPROVED_PAYMENT_URL: 'https://whop.com/checkout/plan_different',
  }));
  assert.ok(mismatched.errors.includes('CHECKOUT_ACCOUNT_REFERENCE must match CHECKOUT_APPROVED_ACCOUNT_REFERENCE'));
  assert.ok(mismatched.errors.includes('CHECKOUT_PAYMENT_URL must match CHECKOUT_APPROVED_PAYMENT_URL'));
});

test('an unrelated plan URL fails even when matching product IDs are supplied', () => {
  const unrelatedUrl = validateCheckoutConfiguration(approvedCheckoutEnv({
    CHECKOUT_PAYMENT_URL: 'https://whop.com/checkout/plan_unrelated',
    CHECKOUT_PRODUCT_ID: 'prod_test123',
    CHECKOUT_APPROVED_PRODUCT_ID: 'prod_test123',
  }));
  assert.equal(unrelatedUrl.enabled, false);
  assert.ok(unrelatedUrl.errors.includes('CHECKOUT_PAYMENT_URL must match CHECKOUT_APPROVED_PAYMENT_URL'));

  const productIdsOnly = validateCheckoutConfiguration(approvedCheckoutEnv({
    CHECKOUT_APPROVED_PAYMENT_URL: undefined,
    CHECKOUT_PRODUCT_ID: 'prod_test123',
    CHECKOUT_APPROVED_PRODUCT_ID: 'prod_test123',
  }));
  assert.equal(productIdsOnly.enabled, false);
  assert.ok(productIdsOnly.errors.includes('CHECKOUT_PAYMENT_URL must match CHECKOUT_APPROVED_PAYMENT_URL'));
});

test('provider checkout terms gate and handoff require visible product-specific terms', () => {
  const result = validateCheckoutConfiguration(approvedCheckoutEnv({ CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED: 'false' }));
  const handoff = read('checkout/README.md');
  assert.equal(result.enabled, false);
  assert.ok(result.errors.includes('CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED must be true'));
  assert.match(handoff, /display[^\n]*No refunds are available because this is a downloadable product/i);
  assert.match(handoff, /before (?:the buyer pays|payment)/i);
  assert.match(handoff, /CHECKOUT_PROVIDER_REFUND_TERMS_VERIFIED=true/);
});

test('privacy, refund scope, confirmation boundary, and artifact hashes are explicit', () => {
  const privacy = read('main-site/privacy.html');
  const refund = read('main-site/refund-policy.html');
  const confirmation = read('main-site/purchase/confirmed.html');
  const handoff = read('checkout/README.md');
  assert.match(privacy, /Whop/);
  assert.match(privacy, /purchaser|purchase information/i);
  assert.match(privacy, /transaction/i);
  assert.match(privacy, /does not receive your answers, analysis or final page/i);
  assert.match(refund, /Fast Forward/);
  assert.match(refund, /Find Your Zone of Genius/);
  assert.match(refund, /find-your-zone-of-genius-refund-terms\.html/);
  assert.match(confirmation, /informational only/i);
  assert.match(confirmation, /not proof of (?:purchase|entitlement)/i);
  assert.match(confirmation, /does not (?:grant|provide) (?:access|entitlement)/i);
  assert.match(handoff, /8061cfe8ec8b2061e6990bf115eaca3533ddf2654e1b374e37374588672b0194/);
  assert.match(handoff, /7cf7ee4788c57cb8872c32cb60f576da50f34cd84a2e4a88f71c91a81f19766b/);
});

test('publish verifier rejects protected PDF and ZIP filenames anywhere below main-site', () => {
  const nested = path.join(root, 'main-site', '.checkout-guard-test', 'nested');
  fs.mkdirSync(nested, { recursive: true });
  try {
    for (const filename of ['find-your-zone-of-genius-workbook-v2.pdf', 'find-your-zone-of-genius-private-agent.zip']) {
      const target = path.join(nested, filename);
      fs.writeFileSync(target, 'must never publish');
      const result = spawnSync(process.execPath, ['tools/verify-publish-source.mjs'], { cwd: root, encoding: 'utf8' });
      assert.notEqual(result.status, 0, filename);
      assert.match(result.stderr, new RegExp(filename.replaceAll('.', '\\.')));
      fs.unlinkSync(target);
    }
  } finally {
    fs.rmSync(path.join(root, 'main-site', '.checkout-guard-test'), { recursive: true, force: true });
  }
});

test('the approved beta price is registered in canonical offer data', () => {
  const site = JSON.parse(read('data/site.json'));
  const offer = site.offers.find((item) => item.id === 'find-your-zone-of-genius');

  assert.ok(offer);
  assert.equal(offer.priceBand, 'US$39');
  assert.equal(offer.url, 'https://www.shiftandlead.com/workbooks/find-your-zone-of-genius.html');
});
