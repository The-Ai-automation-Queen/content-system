const GUIDE_TAGS = {
  "ai-jargon-guide": "guide-ai-jargon",
  "what-is-ai": "guide-what-is-ai",
  "what-is-agentic": "guide-what-is-agentic",
  "what-should-you-never-share-with-ai": "guide-what-not-to-share-with-ai",
  "which-ai-tool-for-what": "guide-which-ai-tool-for-what",
  "chatgpt": "guide-chatgpt",
  "claude": "guide-claude",
  "gemini": "guide-gemini",
  "copilot": "guide-copilot",
  "meta-ai": "guide-meta-ai",
  "grok": "guide-grok",
  "deepseek": "guide-deepseek",
  "kimi": "guide-kimi",
  "manus": "guide-manus",
  "mistral": "guide-mistral",
  "what-is-a-prompt": "guide-what-is-a-prompt",
  "what-is-an-ai-browser": "guide-what-is-an-ai-browser",
  "connect-ai-to-email-files-calendar": "guide-connect-ai-to-email-files-calendar",
  "ai-skills-worth-learning-for-work": "guide-ai-skills-worth-learning-for-work",
  "show-up-in-ai-search": "guide-show-up-in-ai-search",
};

const GUIDE_FILES = {
  "ai-jargon-guide": "https://www.shiftandlead.com/guides/ai-jargon-guide.html",
  "what-is-ai": "https://www.shiftandlead.com/guides/what-is-ai.html",
  "what-is-agentic": "https://www.shiftandlead.com/guides/what-is-agentic.html",
  "what-should-you-never-share-with-ai": "https://www.shiftandlead.com/guides/what-should-you-never-share-with-ai.html",
  "which-ai-tool-for-what": "https://www.shiftandlead.com/guides/which-ai-tool-for-what.html",
  "chatgpt": "https://www.shiftandlead.com/guides/chatgpt.html",
  "claude": "https://www.shiftandlead.com/guides/claude.html",
  "gemini": "https://www.shiftandlead.com/guides/gemini.html",
  "copilot": "https://www.shiftandlead.com/guides/copilot.html",
  "meta-ai": "https://www.shiftandlead.com/guides/meta-ai.html",
  "grok": "https://www.shiftandlead.com/guides/grok.html",
  "deepseek": "https://www.shiftandlead.com/guides/deepseek.html",
  "kimi": "https://www.shiftandlead.com/guides/kimi.html",
  "manus": "https://www.shiftandlead.com/guides/manus.html",
  "mistral": "https://www.shiftandlead.com/guides/mistral.html",
  "what-is-a-prompt": "https://www.shiftandlead.com/guides/what-is-a-prompt.html",
  "what-is-an-ai-browser": "https://www.shiftandlead.com/guides/what-is-an-ai-browser.html",
  "connect-ai-to-email-files-calendar": "https://www.shiftandlead.com/guides/connect-ai-to-email-files-calendar.html",
  "ai-skills-worth-learning-for-work": "https://www.shiftandlead.com/guides/ai-skills-worth-learning-for-work.html",
  "show-up-in-ai-search": "https://www.shiftandlead.com/guides/show-up-in-ai-search.html",
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
