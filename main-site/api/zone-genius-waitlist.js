module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const token = process.env.LUMAIL_API_TOKEN;
  if (!token) return response.status(503).json({ error: 'The waitlist is not configured yet.' });

  const { email, website, consent, source } = request.body || {};
  if (website) return response.status(200).json({ success: true });
  if (consent !== true) return response.status(400).json({ error: 'Please confirm that we may email you about the beta.' });
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    const lumailResponse = await fetch('https://lumail.io/api/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        tags: ['shift-and-lead', 'zone-genius-beta-waitlist'],
        fields: {
          source: typeof source === 'string' ? source.slice(0, 200) : 'zone-genius-product-page',
          product: 'Find Your Zone of Genius',
        },
        replaceTags: false,
        resubscribe: true,
        triggerWorkflows: true,
      }),
    });

    const result = await lumailResponse.json().catch(() => ({}));
    if (!lumailResponse.ok) {
      console.error('Lumail Zone of Genius waitlist failed', {
        status: lumailResponse.status,
        detail: result.message || result.error || 'Unknown Lumail error',
      });
      return response.status(502).json({ error: 'We could not add you to the waitlist. Please try again.' });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Lumail Zone of Genius waitlist request failed', { error });
    return response.status(502).json({ error: 'We could not add you to the waitlist. Please try again.' });
  }
};
