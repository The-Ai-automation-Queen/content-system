import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { validateCheckoutConfiguration } from '../tools/checkout-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

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
    'CHECKOUT_PAYMENT_URL must be an HTTPS whop.com URL',
    'CHECKOUT_PAYOUT_CURRENCY must be a three-letter currency code',
    'CHECKOUT_REFUND_TERMS_URL must be an HTTPS shiftandlead.com URL',
    'CHECKOUT_REFUND_TERMS_APPROVED must be true',
    'CHECKOUT_SUPPORT_EMAIL is required',
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
  assert.match(email, /\{\{SUPPORT_EMAIL\}\}/);
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
  assert.match(setup, /CHECKOUT_PAYOUT_CURRENCY/);
  assert.match(setup, /CHECKOUT_REFUND_TERMS_APPROVED/);
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

test('a fully approved configuration exposes only public checkout values', () => {
  const accountReference = 'approved-account-label';
  const result = validateCheckoutConfiguration({
    CHECKOUT_ENABLED: 'true',
    CHECKOUT_PRICE_CENTS: '3900',
    CHECKOUT_CURRENCY: 'USD',
    CHECKOUT_BETA_LIMIT: '12',
    CHECKOUT_PROVIDER: 'whop',
    CHECKOUT_ACCOUNT_REFERENCE: accountReference,
    CHECKOUT_PAYMENT_URL: 'https://whop.com/checkout/example',
    CHECKOUT_PAYOUT_CURRENCY: 'AED',
    CHECKOUT_REFUND_TERMS_URL: 'https://www.shiftandlead.com/refund-policy.html',
    CHECKOUT_REFUND_TERMS_APPROVED: 'true',
    CHECKOUT_SUPPORT_EMAIL: 'support@example.com',
    CHECKOUT_BETA_CAP_VERIFIED: 'true',
    CHECKOUT_DELIVERY_VERIFIED: 'true',
    CHECKOUT_TEST_PURCHASE_VERIFIED: 'true',
  });

  assert.equal(result.enabled, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.publicConfig.paymentUrl, 'https://whop.com/checkout/example');
  assert.doesNotMatch(JSON.stringify(result.publicConfig), new RegExp(accountReference));
  assert.doesNotMatch(JSON.stringify(result.publicConfig), /AED|support@example\.com/);
});

test('the approved beta price is registered in canonical offer data', () => {
  const site = JSON.parse(read('data/site.json'));
  const offer = site.offers.find((item) => item.id === 'find-your-zone-of-genius');

  assert.ok(offer);
  assert.equal(offer.priceBand, 'US$39');
  assert.equal(offer.url, 'https://www.shiftandlead.com/workbooks/find-your-zone-of-genius.html');
});
