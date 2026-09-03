const OFFERS = new Set(["ai-opportunity-map", "ai-decision-lab"]);

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "The interest list is not configured yet." });

  const { email, firstName, offer, source, website, consent } = request.body || {};
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
          source: typeof source === "string" ? source.slice(0, 200) : "/ai-opportunity-map.html",
          offer,
        },
        replaceTags: false,
        resubscribe: true,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error("Lumail opportunity interest failed", { status: lumailResponse.status, offer, detail: result.message || result.error || "Unknown Lumail error" });
      return response.status(502).json({ error: "We could not register your interest. Please try again." });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Lumail opportunity interest request failed", { offer, error });
    return response.status(502).json({ error: "We could not register your interest. Please try again." });
  }
};
