const { validateRequest } = require("../lib/form-privacy");

// Paid-work enquiries from /work-with-fatiha/. Forwards to the existing lead webhook
// server-side so visitors get a clear confirmation or retry message. Enquirers are
// not added to the email list: they have not given marketing consent here.
const DEFAULT_WEBHOOK = "https://auto.shiftandlead.com/webhook/formspree-lead";
const INTERESTS = new Set(["custom-project", "team-session", "not-sure"]);

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const body = request.body || {};
  if (body._gotcha || body.website) return response.status(200).json({ success: true });

  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name, 120);
  const business = clean(body.business, 160);
  const industry = clean(body.industry, 120);
  const task = clean(body.task, 3000);
  const interest = INTERESTS.has(body.interest) ? body.interest : "not-sure";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response.status(400).json({ error: "Enter a valid email address." });
  if (!name || !business || !task) return response.status(400).json({ error: "Please complete your name, business and what you are working on." });

  const lead = { name, email, business, industry, interest, task, source: "www-work-with-me-apply", submittedAt: new Date().toISOString() };

  try {
    const hook = await fetch(process.env.ENQUIRY_WEBHOOK_URL || DEFAULT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!hook.ok) throw new Error(`webhook ${hook.status}`);
  } catch (error) {
    console.error("Enquiry webhook failed", { interest });
    return response.status(502).json({ error: "Your enquiry did not send. Please try again." });
  }

  return response.status(200).json({ success: true });
};
