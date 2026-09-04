const publication = require("../../data/guide-publication.json");

const APPROVED_GUIDES = new Map(
  publication.approved.map((guide) => [guide.slug, guide]),
);

const GUIDE_ORIGIN = "https://www.shiftandlead.com";

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email delivery is not configured yet." });

  const {
    attribution,
    consent,
    consentVersion,
    email,
    firstName,
    guideSlug,
    marketingConsent,
    source,
    timestamp,
    website,
  } = request.body || {};
  if (website) return response.status(200).json({ success: true });
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  const name = cleanText(firstName, 100);
  if (!name) return response.status(400).json({ error: "Enter your first name." });
  if (consent !== true) return response.status(400).json({ error: "Consent is required." });

  const guide = APPROVED_GUIDES.get(guideSlug);
  if (!guide?.lumailTag) return response.status(400).json({ error: "This guide is not configured for email delivery." });

  const consentTimestamp = cleanText(timestamp, 40) || new Date().toISOString();
  const consentTextVersion = cleanText(consentVersion, 80) || "guide-access-v1";
  const sourcePage = cleanText(source, 200) || `/guides/${guideSlug}.html`;
  const campaign = attribution && typeof attribution === "object" ? attribution : {};

  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        name,
        tags: ["shift-and-lead-guide", guide.lumailTag],
        fields: {
          source: sourcePage,
          guide_url: `${GUIDE_ORIGIN}/guides/${guideSlug}.html`,
          consent: "true",
          consent_version: consentTextVersion,
          consent_timestamp: consentTimestamp,
          marketing_consent: marketingConsent === true ? "true" : "false",
          utm_source: cleanText(campaign.utmSource, 100),
          utm_medium: cleanText(campaign.utmMedium, 100),
          utm_campaign: cleanText(campaign.utmCampaign, 100),
          utm_content: cleanText(campaign.utmContent, 100),
          referring_site: cleanText(campaign.referrer, 300),
        },
        replaceTags: false,
        resubscribe: false,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error("Lumail guide capture failed", {
        status: lumailResponse.status,
        guideSlug,
        detail: result.message || result.error || "Unknown Lumail error",
      });
      return response.status(502).json({ error: "We could not open the guide. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail guide capture request failed", { guideSlug, error });
    return response.status(502).json({ error: "We could not open the guide. Please try again." });
  }
};
