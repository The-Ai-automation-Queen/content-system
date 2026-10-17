// Looks up a Stripe Checkout session and works out which workbook PDFs it paid for.
// Each Stripe product carries metadata `file`: strengths | experience | sell | bundle.
const WORKBOOKS = {
  strengths: { title: "Find the Strengths You Overlook", filename: "find-the-strengths-you-overlook.pdf", env: "WORKBOOK_URL_STRENGTHS" },
  experience: { title: "Put Your Experience Into Words", filename: "put-your-experience-into-words.pdf", env: "WORKBOOK_URL_EXPERIENCE" },
  sell: { title: "Find What You Can Sell", filename: "find-what-you-can-sell.pdf", env: "WORKBOOK_URL_SELL" },
};
const BUNDLE = ["strengths", "experience", "sell"];

function validSessionId(id) {
  return typeof id === "string" && /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id);
}

async function getPurchase(sessionId) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { error: "not-configured" };
  if (!validSessionId(sessionId)) return { error: "invalid" };
  const url = `https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items.data.price.product`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
  if (!res.ok) return { error: res.status === 404 ? "invalid" : "stripe" };
  const session = await res.json();
  if (session.payment_status !== "paid") return { error: "unpaid" };
  const files = new Set();
  for (const item of session.line_items?.data || []) {
    const tag = item.price?.product?.metadata?.file;
    if (tag === "bundle") BUNDLE.forEach((f) => files.add(f));
    else if (WORKBOOKS[tag]) files.add(tag);
  }
  if (!files.size) return { error: "no-files" };
  const details = session.customer_details || {};
  return {
    email: details.email || session.customer_email || "",
    name: (details.name || "").split(" ")[0],
    files: [...files],
  };
}

module.exports = { WORKBOOKS, getPurchase, validSessionId };

if (require.main === module) {
  // Self-check: node main-site/lib/stripe-purchase.js
  const assert = require("assert");
  process.env.STRIPE_SECRET_KEY = "rk_test_x";
  const id = "cs_test_a1B2c3D4e5F6g7H8";
  const make = (status, files) => async () => ({
    ok: true,
    json: async () => ({
      payment_status: status,
      customer_details: { email: "a@b.co", name: "Sam Lee" },
      line_items: { data: files.map((f) => ({ price: { product: { metadata: { file: f } } } })) },
    }),
  });
  (async () => {
    global.fetch = make("paid", ["bundle"]);
    assert.deepStrictEqual((await getPurchase(id)).files, ["strengths", "experience", "sell"]);
    global.fetch = make("paid", ["sell"]);
    const one = await getPurchase(id);
    assert.deepStrictEqual(one.files, ["sell"]);
    assert.strictEqual(one.name, "Sam");
    global.fetch = make("unpaid", ["sell"]);
    assert.strictEqual((await getPurchase(id)).error, "unpaid");
    assert.strictEqual((await getPurchase("../etc")).error, "invalid");
    global.fetch = make("paid", ["other"]);
    assert.strictEqual((await getPurchase(id)).error, "no-files");
    console.log("stripe-purchase: ok");
  })();
}
