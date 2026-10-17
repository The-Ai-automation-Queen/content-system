// GET /api/purchase?session_id=… → which workbooks this paid Stripe checkout unlocked (for the thank-you page).
const { WORKBOOKS, getPurchase } = require("../lib/stripe-purchase");

const MESSAGES = {
  "not-configured": [503, "Downloads are not switched on yet. Please email fatiha.chikh@shiftandlead.ai and we will send your workbook."],
  invalid: [404, "We could not find this order. Please use the link in your email."],
  unpaid: [402, "Your payment is not confirmed yet. Please wait a minute and refresh this page."],
  "no-files": [404, "We could not match this order to a workbook. Please email fatiha.chikh@shiftandlead.ai."],
  stripe: [502, "We could not check your order just now. Please refresh this page."],
};

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });
  try {
    const purchase = await getPurchase(request.query.session_id);
    if (purchase.error) {
      const [status, message] = MESSAGES[purchase.error];
      return response.status(status).json({ error: message });
    }
    return response.status(200).json({
      name: purchase.name,
      email: purchase.email,
      workbooks: purchase.files.map((key) => ({ key, title: WORKBOOKS[key].title })),
    });
  } catch (error) {
    console.error("Purchase lookup failed", { message: error?.message });
    return response.status(502).json({ error: MESSAGES.stripe[1] });
  }
};
