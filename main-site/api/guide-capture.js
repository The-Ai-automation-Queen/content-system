const GUIDE_TAGS = {
  "24-7-operations-system": "guide-24-7-operations-system",
  "ai-jargon-guide": "guide-ai-jargon",
  "chatgpt": "guide-chatgpt",
  "claude": "guide-claude",
  "copilot": "guide-copilot",
  "first-ai-employee": "guide-first-ai-employee",
  "follow-up-setup": "guide-follow-up-setup",
  "gemini": "guide-gemini",
  "inbox-manager-setup": "guide-inbox-manager-setup",
  "stack-3-tool-ai-stack": "guide-stack-3-tool-ai-stack",
  "what-is-a-prompt": "guide-what-is-a-prompt",
  "what-is-agentic": "guide-what-is-agentic",
  "what-is-ai": "guide-what-is-ai"
};

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email delivery is not configured yet." });

  const body = request.body || {};
  if (body.website) return response.status(200).json({ success: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }
  const guideTag = GUIDE_TAGS[body.guideSlug];
  if (!guideTag) return response.status(400).json({ error: "This guide is not configured for email delivery." });

  const guideUrl = `https://www.shiftandlead.com/guides/${body.guideSlug}.html`;
  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        tags: ["shift-and-lead-guide", guideTag],
        fields: {
          first_name: typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "",
          source: typeof body.source === "string" ? body.source.slice(0, 200) : `/guides/${body.guideSlug}.html`,
          guide_slug: body.guideSlug,
          guide_url: guideUrl,
          consent: body.consent === true ? "guide-access-and-updates" : "guide-access",
          captured_at: typeof body.timestamp === "string" ? body.timestamp.slice(0, 40) : new Date().toISOString(),
          utm_source: typeof body.utmSource === "string" ? body.utmSource.slice(0, 100) : "",
          utm_medium: typeof body.utmMedium === "string" ? body.utmMedium.slice(0, 100) : "",
          utm_campaign: typeof body.utmCampaign === "string" ? body.utmCampaign.slice(0, 100) : "",
          utm_content: typeof body.utmContent === "string" ? body.utmContent.slice(0, 100) : ""
        },
        replaceTags: false,
        resubscribe: true,
        triggerWorkflows: true
      })
    });
    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error("Lumail guide capture failed", { status: lumailResponse.status, guideSlug: body.guideSlug, detail: result.message || result.error || "Unknown error" });
      return response.status(502).json({ error: "We could not open the guide. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail guide capture request failed", { guideSlug: body.guideSlug, error });
    return response.status(502).json({ error: "We could not open the guide. Please try again." });
  }
};
