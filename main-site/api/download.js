// GET /api/download?session_id=…&file=strengths → streams the PDF, only for a paid order that includes it.
// The PDFs sit in private storage; their addresses live in Vercel env vars and never reach the browser.
const { WORKBOOKS, getPurchase } = require("../lib/stripe-purchase");

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") return response.status(405).send("Method not allowed.");
  const { session_id: sessionId, file } = request.query;
  const workbook = WORKBOOKS[file];
  if (!workbook) return response.status(404).send("Workbook not found.");
  try {
    const purchase = await getPurchase(sessionId);
    if (purchase.error || !purchase.files.includes(file)) {
      return response.redirect(302, `/thank-you/?session_id=${encodeURIComponent(sessionId || "")}`);
    }
    const source = process.env[workbook.env];
    if (!source) return response.status(503).send("This download is not switched on yet. Please email fatiha.chikh@shiftandlead.ai.");
    const pdf = await fetch(source);
    if (!pdf.ok) throw new Error(`storage ${pdf.status}`);
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", `attachment; filename="${workbook.filename}"`);
    response.setHeader("X-Robots-Tag", "noindex");
    return response.status(200).send(Buffer.from(await pdf.arrayBuffer()));
  } catch (error) {
    console.error("Workbook download failed", { file, message: error?.message });
    return response.status(502).send("The download did not start. Please try again, or email fatiha.chikh@shiftandlead.ai.");
  }
};
