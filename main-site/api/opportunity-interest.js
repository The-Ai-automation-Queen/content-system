const { validateRequest } = require("../lib/form-privacy");
const OFFERS = new Set(["ai-opportunity-map", "ai-decision-lab"]);

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "The interest list is not configured yet." });

  const { email, firstName, offer, source, website, consent, marketingConsent } = request.body || {};
  if (website) return response.status(200).json({ success: true });
  if (consent !== true) return response.status(400).json({ error: "Consent is required." });
  if (!OFFERS.has(offer)) return response.status(400).json({ error: "This offer is not configured." });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        name: typeof firstName === "string" ? firstName.trim().slice(0, 100) : "",
        tags: ["shift-and-lead-opportunity", offer],
        fields: {
          consent: "true",
          consent_version: "opportunity-request-v2-2026-09-20",
          consent_timestamp: new Date().toISOString(),
          opportunity_marketing_choice: marketingConsent === true ? "true" : "false",
          ...(marketingConsent === true ? { marketing_consent: "true", marketing_consent_version: "optional-marketing-v1-2026-09-20", marketing_consent_timestamp: new Date().toISOString() } : {}),
          source: "/ai-opportunity-map.html",
          offer,
        },
        replaceTags: false,
        resubscribe: false,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error("Lumail opportunity interest failed", { status: lumailResponse.status, offer });
      return response.status(502).json({ error: "We could not register your interest. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail opportunity interest request failed", { offer });
    return response.status(502).json({ error: "We could not register your interest. Please try again." });
  }
};
