// POST /api/purchase-email {session_id} → emails the buyer their download links (Lumail transactional email).
// Called once by the thank-you page. Links point back to /api/download, which re-checks the payment each time.
const { validateRequest } = require("../lib/form-privacy");
const { WORKBOOKS, getPurchase } = require("../lib/stripe-purchase");

const ORIGIN = "https://www.shiftandlead.com";

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;
  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email is not configured." });
  try {
    const { session_id: sessionId } = request.body;
    const purchase = await getPurchase(sessionId);
    if (purchase.error || !purchase.email) return response.status(400).json({ error: "Order not confirmed." });

    const links = purchase.files
      .map((key) => `- [Download ${WORKBOOKS[key].title}](${ORIGIN}/api/download?session_id=${encodeURIComponent(sessionId)}&file=${key})`)
      .join("\n");
    const several = purchase.files.length > 1;
    const markdown = `Hi ${purchase.name || "there"},

Thank you for your order. Here ${several ? "are your workbooks" : "is your workbook"}:

${links}

Keep this email. The ${several ? "links work" : "link works"} whenever you need to download again, on your phone or your laptop.

You can print the pages or fill them in on screen. Take your time: one exercise at a time is enough.

Want to work through it with others? Join my free community: [Simple AI for Non-Techies](https://www.skool.com/simple-ai-for-non-tech-8652)

Fatiha`;

    const sent = await fetch("https://lumail.io/api/v2/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.GUIDE_EMAIL_FROM || "fatiha@email.shiftandlead.com",
        to: purchase.email,
        subject: several ? "Your Shift & Lead workbooks" : `Your workbook: ${WORKBOOKS[purchase.files[0]].title}`,
        markdown,
      }),
    });
    if (!sent.ok) {
      console.error("Purchase email failed", { status: sent.status });
      return response.status(502).json({ error: "Email not sent." });
    }
    return response.status(200).json({ success: true, email: purchase.email });
  } catch (error) {
    console.error("Purchase email request failed", { message: error?.message });
    return response.status(502).json({ error: "Email not sent." });
  }
};
