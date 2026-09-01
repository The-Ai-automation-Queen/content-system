(function () {
  'use strict';

  function setStatus(button, message) {
    var container = button.parentElement;
    var status = container && container.querySelector('[data-checkout-status]');
    if (!status && container && container.parentElement) {
      status = container.parentElement.querySelector('[data-checkout-status]');
    }
    if (status) status.textContent = message || '';
  }

  function disable(button, message) {
    button.removeAttribute('href');
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('role', 'link');
    setStatus(button, message || 'Checkout is not open yet');
  }

  function approvedUrl(value, hostname) {
    try {
      var url = new URL(value);
      return url.protocol === 'https:' && (url.hostname === hostname || url.hostname.endsWith('.' + hostname));
    } catch (error) {
      return false;
    }
  }

  function valid(config) {
    return config &&
      config.enabled === true &&
      config.provider === 'whop' &&
      config.price &&
      config.price.amountCents === 3900 &&
      config.price.currency === 'USD' &&
      config.betaLimit === 12 &&
      config.deliveryMode === 'provider-protected' &&
      approvedUrl(config.paymentUrl, 'whop.com') &&
      approvedUrl(config.refundTermsUrl, 'shiftandlead.com');
  }

  async function init() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-checkout-button]'));
    if (!buttons.length) return;
    buttons.forEach(function (button) { disable(button, 'Checking checkout...'); });

    try {
      var response = await fetch('/checkout/config.json', { credentials: 'same-origin', cache: 'no-store' });
      if (!response.ok) throw new Error('Checkout configuration unavailable');
      var config = await response.json();
      if (config.enabled !== true || !valid(config)) throw new Error('Checkout is disabled');
      buttons.forEach(function (button) {
        button.href = config.paymentUrl;
        button.removeAttribute('aria-disabled');
        setStatus(button, '');
      });
    } catch (error) {
      buttons.forEach(function (button) { disable(button, 'Checkout is not open yet'); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
