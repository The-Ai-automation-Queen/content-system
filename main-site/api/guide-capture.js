const GUIDE_TAGS = {
  "ai-jargon-guide": "guide-ai-jargon",
  "what-is-ai": "guide-what-is-ai",
};

const GUIDE_FILES = {
  "ai-jargon-guide": "https://www.shiftandlead.com/downloads/10-ai-words-you-need-to-know.pdf",
  "what-is-ai": "https://www.shiftandlead.com/guides/what-is-ai.html",
};

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Email delivery is not configured yet." });

  const { email, website, guideSlug, source } = request.body || {};
  if (website) return response.status(200).json({ success: true });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  const guideTag = GUIDE_TAGS[guideSlug];
  if (!guideTag) return response.status(400).json({ error: "This guide is not configured for email delivery." });

  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        tags: ["shift-and-lead-guide", guideTag],
        fields: {
          source: typeof source === "string" ? source.slice(0, 200) : `/guides/${guideSlug}.html`,
          guide_url: GUIDE_FILES[guideSlug],
        },
        replaceTags: false,
        resubscribe: true,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      return response.status(lumailResponse.status).json({ error: result.message || "Unable to send the guide right now." });
    }
    return response.status(200).json({ success: true });
  } catch {
    return response.status(502).json({ error: "Unable to reach the email service right now." });
  }
};
