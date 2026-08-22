const captureRegistry = require("./guide-capture-registry.json");

const LUMAIL_SUBSCRIBERS_URL = "https://lumail.io/api/v1/subscribers";
const DEFAULT_SITE_URL = "https://www.shiftandlead.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistry(registry) {
  if (!registry || typeof registry !== "object" || !registry.audience || !registry.guides) {
    throw new Error("The guide capture registry is invalid.");
  }

  const guideIds = new Set();
  const lumailTags = new Set();

  for (const [guideSlug, config] of Object.entries(registry.guides)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guideSlug)) {
      throw new Error(`Invalid guide capture slug: ${guideSlug}`);
    }
    if (!config.guideId || guideIds.has(config.guideId)) {
      throw new Error(`Missing or duplicate guide ID for ${guideSlug}.`);
    }
    if (!config.lumailTag || lumailTags.has(config.lumailTag)) {
      throw new Error(`Missing or duplicate Lumail tag for ${guideSlug}.`);
    }
    if (!config.deliverable || !/^[a-z0-9][a-z0-9.-]*$/.test(config.deliverable.file)) {
      throw new Error(`Invalid deliverable file for ${guideSlug}.`);
    }
    if (!config.deliverable.name || !config.deliverable.successCopy || !config.deliverable.downloadLabel) {
      throw new Error(`Incomplete deliverable copy for ${guideSlug}.`);
    }
    guideIds.add(config.guideId);
    lumailTags.add(config.lumailTag);
  }
}

validateRegistry(captureRegistry);

function getGuideCaptureConfig(guideSlug) {
  if (typeof guideSlug !== "string") return null;
  return Object.prototype.hasOwnProperty.call(captureRegistry.guides, guideSlug)
    ? captureRegistry.guides[guideSlug]
    : null;
}

function getSiteUrl() {
  return (process.env.SHIFT_AND_LEAD_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

function getDownloadPath(config) {
  return `/downloads/${config.deliverable.file}`;
}

function getClientDeliverable(config) {
  return {
    name: config.deliverable.name,
    format: config.deliverable.format,
    downloadHref: getDownloadPath(config),
    downloadLabel: config.deliverable.downloadLabel,
    successCopy: config.deliverable.successCopy,
  };
}

async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const { email, website, guideSlug, source } = request.body || {};

  // Quietly accept bot submissions without calling Lumail or exposing configuration.
  if (website) return response.status(200).json({ success: true });

  const guideConfig = getGuideCaptureConfig(guideSlug);
  if (!guideConfig) {
    return response.status(400).json({ error: "This guide is not configured for email delivery." });
  }
  if (!guideConfig.active) {
    return response.status(409).json({ error: "This guide download is not ready yet." });
  }
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email delivery is not configured yet." });

  const downloadPath = getDownloadPath(guideConfig);

  try {
    const lumailResponse = await fetch(LUMAIL_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        tags: [captureRegistry.audience.lumailTag, guideConfig.lumailTag],
        fields: {
          source: typeof source === "string" ? source.slice(0, 200) : `/guides/${guideSlug}.html`,
          guide_url: `${getSiteUrl()}${downloadPath}`,
        },
        replaceTags: false,
        resubscribe: true,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      return response.status(lumailResponse.status).json({
        error: result.message || result.error || "Unable to send the guide right now.",
      });
    }

    return response.status(200).json({
      success: true,
      guideId: guideConfig.guideId,
      deliverable: getClientDeliverable(guideConfig),
    });
  } catch {
    return response.status(502).json({ error: "Unable to reach the email service right now." });
  }
}

module.exports = handler;
module.exports.getGuideCaptureConfig = getGuideCaptureConfig;
module.exports.getClientDeliverable = getClientDeliverable;
module.exports.validateRegistry = validateRegistry;
