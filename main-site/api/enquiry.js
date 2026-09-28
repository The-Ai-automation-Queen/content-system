const { validateRequest } = require("../lib/form-privacy");

// Paid-work enquiries from /work-with-fatiha/. Lumail is the only form provider:
// the enquiry is stored on the contact with enquiry tags so a Lumail workflow can
// notify Fatiha. Marketing consent is not given here, so no marketing fields are set.
const INTERESTS = new Set(["custom-project", "team-session", "not-sure"]);

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

module.exports = async function handler(request, response) {
  if (!validateRequest(request, response)) return;

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: "Enquiries are not available right now. Please try again later." });

  const body = request.body || {};
  if (body._gotcha || body.website) return response.status(200).json({ success: true });

  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name, 120);
  const business = clean(body.business, 160);
  const industry = clean(body.industry, 120);
  const task = clean(body.task, 1500);
  const interest = INTERESTS.has(body.interest) ? body.interest : "not-sure";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response.status(400).json({ error: "Enter a valid email address." });
  if (!name || !business || !task) return response.status(400).json({ error: "Please complete your name, business and what you are working on." });

  const submittedAt = new Date().toISOString();
  try {
    const lumailResponse = await fetch("https://lumail.io/api/v1/subscribers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: name.split(/\s+/)[0] || "",
        tags: ["shift-and-lead-enquiry", `enquiry-${interest}`],
        fields: {
          source: "/work-with-fatiha/",
          enquiry_name: name,
          enquiry_business: business,
          enquiry_industry: industry,
          enquiry_interest: interest,
          enquiry_message: task,
          enquiry_timestamp: submittedAt,
          enquiry_consent: "reply-only",
        },
        replaceTags: false,
        resubscribe: false,
        triggerWorkflows: true,
      }),
    });
    if (!lumailResponse.ok) {
      console.error("Lumail enquiry failed", { status: lumailResponse.status, interest });
      return response.status(502).json({ error: "Your enquiry did not send. Please try again." });
    }
  } catch (error) {
    console.error("Lumail enquiry request failed", { interest });
    return response.status(502).json({ error: "Your enquiry did not send. Please try again." });
  }

  return response.status(200).json({ success: true });
};
