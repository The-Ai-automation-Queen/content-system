const { validateRequest } = require("../lib/form-privacy");
const WORKBOOKS = new Set([
  "find-your-zone-of-genius",
  "your-human-evidence",
  "use-what-is-unique-about-you",
]);

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "The waitlist is not configured yet." });

  const { email, firstName, product, source, website, consent, marketingConsent } = request.body || {};
  if (website) return response.status(200).json({ success: true });
  if (consent !== true) return response.status(400).json({ error: "Consent is required." });
  if (!WORKBOOKS.has(product)) return response.status(400).json({ error: "This workbook is not configured." });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        name: typeof firstName === "string" ? firstName.trim().slice(0, 100) : "",
        tags: ["book-waitlist-ai-empowerment", `workbook-${product}`],
        fields: {
          consent: "true",
          consent_version: "workbook-request-v2-2026-09-20",
          consent_timestamp: new Date().toISOString(),
          workbook_marketing_choice: marketingConsent === true ? "true" : "false",
          ...(marketingConsent === true ? { marketing_consent: "true", marketing_consent_version: "optional-marketing-v1-2026-09-20", marketing_consent_timestamp: new Date().toISOString() } : {}),
          source: `workbook-waitlist-${product}`,
          product,
        },
        replaceTags: false,
        resubscribe: false,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error("Lumail workbook waitlist failed", {
        status: lumailResponse.status,
        product,

      });
      return response.status(502).json({ error: "We could not join the waitlist. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail workbook waitlist request failed", { product });
    return response.status(502).json({ error: "We could not join the waitlist. Please try again." });
  }
};
