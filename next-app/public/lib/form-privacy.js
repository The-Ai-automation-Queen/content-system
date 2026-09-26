// Shared admission checks. Origin checks are defence in depth, not rate limiting.
function validateRequest(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); response.status(405).json({error:'Method not allowed.'}); return false; }
  const origin = request.headers?.origin;
  const allowed = ['https://www.shiftandlead.com', 'https://shiftandlead.com'];
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV === 'development') allowed.push('http://localhost:3092','http://127.0.0.1:3092');
  if (origin && !allowed.includes(origin)) { response.status(403).json({error:'Request not allowed.'}); return false; }
  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) { response.status(400).json({error:'Invalid form data.'}); return false; }
  if (JSON.stringify(request.body).length > 16000) { response.status(413).json({error:'Please shorten your message.'}); return false; }
  return true;
}
module.exports = { validateRequest };
