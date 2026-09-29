const { validateRequest } = require("../lib/form-privacy");

// Kit waitlist: each kit gets its own Lumail tag so launch emails reach only the people who asked.
const KIT_TAGS = {
  "content-agent": "kit-waitlist-content-agent",
  "customer-reply-agent": "kit-waitlist-customer-reply-agent",
  "admin-inbox-agent": "kit-waitlist-admin-inbox-agent",
};

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const { email, firstName, marketingConsent, website, kits } = request.body;
  // Do not add bot submissions to Lumail.
  if (website) return response.status(200).json({ success: true });

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }
  if (marketingConsent !== true) {
    return response.status(400).json({ error: "Please agree to receive emails before joining." });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email signup is not available right now." });

  // Kits are optional: the one homepage sign-up adds a waitlist tag for each kit ticked.
  const kitTags = Array.isArray(kits) ? [...new Set(kits.filter((kit) => Object.hasOwn(KIT_TAGS, kit)).map((kit) => KIT_TAGS[kit]))] : [];
  const waitlist = kitTags.length > 0;
  const consentVersion = waitlist ? "homepage-signup-with-kits-v1-2026-09-28" : "homepage-newsletter-v1-2026-09-26";

  const timestamp = new Date().toISOString();
  const name = typeof firstName === "string" ? firstName.trim().slice(0, 100) : "";

  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizedEmail,
        name,
        tags: waitlist ? ["shift-and-lead-newsletter", "shift-and-lead-kit-waitlist", ...kitTags] : ["shift-and-lead-newsletter"],
        fields: {
          source: "/",
          consent: "true",
          consent_version: consentVersion,
          consent_timestamp: timestamp,
          marketing_consent: "true",
          marketing_consent_version: consentVersion,
          marketing_consent_timestamp: timestamp,
        },
        replaceTags: false,
        resubscribe: false,
        triggerWorkflows: true,
      }),
    });

    if (!lumailResponse.ok) {
      console.error("Lumail newsletter signup failed", { status: lumailResponse.status });
      return response.status(502).json({ error: "We could not add you right now. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail newsletter signup request failed");
    return response.status(502).json({ error: "We could not add you right now. Please try again." });
  }
};
