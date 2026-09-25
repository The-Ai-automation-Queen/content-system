const { validateRequest } = require("../lib/form-privacy");
const publication = require("../../data/guide-publication.json");
const rebuildPlan = require("../../data/guide-rebuild-plan.json");
const preview = require("../../data/guide-preview.json");

const APPROVED_GUIDES = new Map(
  publication.approved.map((guide) => [guide.slug, guide]),
);
const REBUILT_APPROVED_SLUGS = new Set(
  rebuildPlan.guides.filter((guide) => guide.status === "approved").map((guide) => guide.slug),
);

const GUIDE_ORIGIN = "https://www.shiftandlead.com";

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email delivery is not configured yet." });

  const {
    attribution,
    consent,
    consentVersion,
    email,
    firstName,
    lastName,
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

  const givenName = cleanText(firstName, 100);
  const familyName = cleanText(lastName, 100);
  const name = [givenName, familyName].filter(Boolean).join(" ");
  if (consent !== true) return response.status(400).json({ error: "Consent is required." });

  // Draft forms work on local development and verified Vercel preview deployments.
  // Publication remains controlled by the approved registry, never a client flag.
  const allowPreview = process.env.VERCEL_ENV === "preview" ||
    (process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV);
  const guide = APPROVED_GUIDES.get(guideSlug) ||
    (allowPreview ? preview.guides.find((item) => item.slug === guideSlug) : undefined);
  if (!guide?.lumailTag) return response.status(400).json({ error: "This guide is not configured for email delivery." });
  if (REBUILT_APPROVED_SLUGS.has(guideSlug) && (!givenName || !familyName)) {
    return response.status(400).json({ error: "Enter your first and last name." });
  }

  const consentTimestamp = new Date().toISOString();
  const consentTextVersion = "guide-request-v2-2026-09-20";
  const sourcePage = `/guides/${guideSlug}/`;

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
          ...(givenName ? { first_name: givenName } : {}),
          ...(familyName ? { last_name: familyName } : {}),
          source: sourcePage,
          guide_url: `${GUIDE_ORIGIN}/guides/${guideSlug}/`,
          consent: "true",
          consent_version: consentTextVersion,
          consent_timestamp: consentTimestamp,
          guide_marketing_choice: marketingConsent === true ? "true" : "false",
          ...(marketingConsent === true ? { marketing_consent: "true", marketing_consent_version: "optional-marketing-v1-2026-09-20", marketing_consent_timestamp: consentTimestamp } : {}),

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

      });
      return response.status(502).json({ error: "We could not open the guide. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail guide capture request failed", { guideSlug });
    return response.status(502).json({ error: "We could not open the guide. Please try again." });
  }
};
