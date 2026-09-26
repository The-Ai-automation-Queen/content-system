export const runtime = "nodejs";
const workbookSlugs = new Set(["find-your-zone-of-genius", "your-human-evidence", "use-what-is-unique-about-you"]);
const offerSlugs = new Set(["ai-opportunity-map", "ai-decision-lab"]);

export async function POST(request: Request, { params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;
  if (form !== "opportunity-interest" && form !== "workbook-waitlist") return Response.json({ error: "Not found" }, { status: 404 });
  const headers = { "Cache-Control": "no-store" };
  const allowed = ["https://www.shiftandlead.com", "https://shiftandlead.com", new URL(request.url).origin];
  if (process.env.NODE_ENV === "development") allowed.push("http://localhost:3092", "http://127.0.0.1:3092", "http://localhost:3000", "http://127.0.0.1:3000");
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  const pageOrigin = request.headers.get("origin");
  const requestHost = request.headers.get("host");
  if (requestHost) allowed.push(`http://${requestHost}`, `https://${requestHost}`);
  if (pageOrigin && !allowed.includes(pageOrigin)) return Response.json({ error: "Request not allowed." }, { status: 403, headers });
  const raw = await request.text();
  if (raw.length > 16000) return Response.json({ error: "Please shorten your message." }, { status: 413, headers });
  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("Invalid data"); }
  catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  if (body.website) return Response.json({ success: true }, { headers });
  const id = form === "workbook-waitlist" ? body.product : body.offer;
  const valid = typeof id === "string" && (form === "workbook-waitlist" ? workbookSlugs.has(id) : offerSlugs.has(id));
  if (!valid) return Response.json({ error: "This offer is not configured." }, { status: 400, headers });
  if (body.consent !== true) return Response.json({ error: "Consent is required." }, { status: 400, headers });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return Response.json({ error: "Enter a valid email address." }, { status: 400, headers });
  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return Response.json({ error: "The interest list is not configured yet." }, { status: 503, headers });
  try {
    const isWorkbook = form === "workbook-waitlist";
    const source = isWorkbook ? `workbook-waitlist-${id}` : "/ai-opportunity-map.html";
    const consentVersion = isWorkbook ? "workbook-request-v2-2026-09-20" : "opportunity-request-v2-2026-09-20";
    const response = await fetch("https://lumail.io/api/v1/subscribers", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({
      email, name: typeof body.firstName === "string" ? body.firstName.trim().slice(0, 100) : "",
      tags: isWorkbook ? ["book-waitlist-ai-empowerment", `workbook-${id}`] : ["shift-and-lead-opportunity", id],
      fields: { consent: "true", consent_version: consentVersion, consent_timestamp: new Date().toISOString(), source, ...(isWorkbook ? { product: id } : { offer: id }), ...(body.marketingConsent === true ? { marketing_consent: "true", marketing_consent_timestamp: new Date().toISOString() } : {}) },
      replaceTags: false, resubscribe: false, triggerWorkflows: true,
    }) });
    if (!response.ok) { console.error("Lumail interest capture failed", { form, status: response.status }); return Response.json({ error: "We could not register your interest. Please try again." }, { status: 502, headers }); }
    return Response.json({ success: true }, { headers });
  } catch { return Response.json({ error: "We could not register your interest. Please try again." }, { status: 502, headers }); }
}
