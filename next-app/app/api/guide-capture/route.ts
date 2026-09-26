import { approvedGuideSlugs } from "@/content/guides";
import publication from "../../../../data/guide-publication.json";
import guideInventory from "@/content/guides.json";

export const runtime = "nodejs";
const approved = new Map(publication.approved.map((guide) => [guide.slug, guide]));
const details = new Map(guideInventory.guides.map((guide) => [guide.slug, guide]));
const origin = "https://www.shiftandlead.com";
const endpoint = "https://lumail.io";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const pageOrigin = request.headers.get("origin");
  const requestHost = request.headers.get("host");
  const allowed = [origin, "https://shiftandlead.com", new URL(request.url).origin];
  if (process.env.NODE_ENV === "development") allowed.push("http://localhost:3092", "http://127.0.0.1:3092", "http://localhost:3000", "http://127.0.0.1:3000");
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  if (requestHost) allowed.push(`http://${requestHost}`, `https://${requestHost}`);
  if (pageOrigin && !allowed.includes(pageOrigin)) return Response.json({ error: "Request not allowed." }, { status: 403, headers });
  const raw = await request.text();
  if (raw.length > 16000) return Response.json({ error: "Please shorten your message." }, { status: 413, headers });
  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("Invalid data"); }
  catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  if (body.website) return Response.json({ success: true }, { headers });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 100) : "";
  const slug = typeof body.guideSlug === "string" ? body.guideSlug : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return Response.json({ error: "Enter a valid email address." }, { status: 400, headers });
  if (body.consent !== true) return Response.json({ error: "Guide delivery requires your request." }, { status: 400, headers });
  if (!approvedGuideSlugs.includes(slug) || !approved.get(slug)?.lumailTag) return Response.json({ error: "This guide is not available." }, { status: 400, headers });
  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return Response.json({ error: "Guide delivery is not configured yet." }, { status: 503, headers });
  const guide = details.get(slug);
  const base = process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : origin;
  const guideUrl = `${base}/guides/${slug}/`;
  const title = guide?.title || "your Shift & Lead guide";
  const summary = guide?.summary || "A practical guide to help you take the next step.";
  try {
    // A requested return link is transactional; it does not require marketing subscription.
    const sent = await fetch(`${endpoint}/api/v2/emails`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({
      from: "fatiha@email.shiftandlead.com", to: email, subject: `Your guide: ${title}`,
      markdown: `Hi ${firstName || "there"},\n\nHere is the guide you asked for.\n\n**${title}**\n${summary}\n\n[Return to your guide](${guideUrl})\n\nYou can also explore the [35 free guides](${base}/guides/). Keep this link for another device.\n\nFatiha · Shift & Lead`,
    }) });
    if (!sent.ok) { console.error("Guide email failed", { status: sent.status, slug }); return Response.json({ error: "We could not send your guide. Please try again." }, { status: 502, headers }); }
    let marketingEnrolled = false;
    if (body.marketingConsent === true) {
      const subscribed = await fetch(`${endpoint}/api/v1/subscribers`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({
        email, name: firstName, tags: ["shift-and-lead-guide", approved.get(slug)!.lumailTag],
        fields: { first_name: firstName, source: `/guides/${slug}/`, guide_url: guideUrl, guide_marketing_choice: "true", marketing_consent_version: "optional-marketing-v1-2026-09-20", marketing_consent_timestamp: new Date().toISOString() },
        replaceTags: false, resubscribe: false, triggerWorkflows: true,
      }) });
      marketingEnrolled = subscribed.ok;
      if (!subscribed.ok) console.error("Optional guide marketing signup failed", { status: subscribed.status, slug });
    }
    return Response.json({ success: true, marketingEnrolled }, { headers });
  } catch (error) {
    console.error("Guide delivery failed", { slug, error: error instanceof Error ? error.name : "unknown" });
    return Response.json({ error: "We could not send your guide. Please try again." }, { status: 502, headers });
  }
}
