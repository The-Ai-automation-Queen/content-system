const BASE_PUBLIC_CONFIG = Object.freeze({
  enabled: false,
  provider: null,
  paymentUrl: null,
  price: Object.freeze({ amountCents: 3900, currency: 'USD' }),
  betaLimit: 12,
  refundTermsUrl: null,
  confirmationUrl: 'https://www.shiftandlead.com/purchase/confirmed.html',
  deliveryMode: 'provider-protected',
});

function isApprovedHttpsUrl(value, allowedHost) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === allowedHost || url.hostname.endsWith(`.${allowedHost}`));
  } catch {
    return false;
  }
}

function looksLikeEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateCheckoutConfiguration(env = process.env) {
  const requested = env.CHECKOUT_ENABLED === 'true';
  if (!requested) {
    return {
      enabled: false,
      errors: [],
      publicConfig: {
        ...BASE_PUBLIC_CONFIG,
        price: { ...BASE_PUBLIC_CONFIG.price },
      },
    };
  }

  const errors = [];
  if (env.CHECKOUT_PRICE_CENTS !== '3900') errors.push('CHECKOUT_PRICE_CENTS must be 3900');
  if (env.CHECKOUT_CURRENCY !== 'USD') errors.push('CHECKOUT_CURRENCY must be USD');
  if (env.CHECKOUT_BETA_LIMIT !== '12') errors.push('CHECKOUT_BETA_LIMIT must be 12');
  if (env.CHECKOUT_PROVIDER !== 'whop') errors.push('CHECKOUT_PROVIDER must be whop for the existing protected-delivery integration');
  if (!env.CHECKOUT_ACCOUNT_REFERENCE?.trim()) errors.push('CHECKOUT_ACCOUNT_REFERENCE is required');
  if (!isApprovedHttpsUrl(env.CHECKOUT_PAYMENT_URL, 'whop.com')) errors.push('CHECKOUT_PAYMENT_URL must be an HTTPS whop.com URL');
  if (!/^[A-Z]{3}$/.test(env.CHECKOUT_PAYOUT_CURRENCY || '')) errors.push('CHECKOUT_PAYOUT_CURRENCY must be a three-letter currency code');
  if (!isApprovedHttpsUrl(env.CHECKOUT_REFUND_TERMS_URL, 'shiftandlead.com')) errors.push('CHECKOUT_REFUND_TERMS_URL must be an HTTPS shiftandlead.com URL');
  if (env.CHECKOUT_REFUND_TERMS_APPROVED !== 'true') errors.push('CHECKOUT_REFUND_TERMS_APPROVED must be true');
  if (!looksLikeEmail(env.CHECKOUT_SUPPORT_EMAIL)) errors.push('CHECKOUT_SUPPORT_EMAIL is required');
  if (env.CHECKOUT_BETA_CAP_VERIFIED !== 'true') errors.push('CHECKOUT_BETA_CAP_VERIFIED must be true');
  if (env.CHECKOUT_DELIVERY_VERIFIED !== 'true') errors.push('CHECKOUT_DELIVERY_VERIFIED must be true');
  if (env.CHECKOUT_TEST_PURCHASE_VERIFIED !== 'true') errors.push('CHECKOUT_TEST_PURCHASE_VERIFIED must be true');

  const enabled = errors.length === 0;
  return {
    enabled,
    errors,
    publicConfig: {
      ...BASE_PUBLIC_CONFIG,
      enabled,
      provider: enabled ? 'whop' : null,
      paymentUrl: enabled ? env.CHECKOUT_PAYMENT_URL : null,
      price: { ...BASE_PUBLIC_CONFIG.price },
      refundTermsUrl: enabled ? env.CHECKOUT_REFUND_TERMS_URL : null,
    },
  };
}
