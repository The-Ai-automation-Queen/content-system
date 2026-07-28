export async function extractGoogleDoc(url) {
  // Extract the document ID from various Google Docs URL formats
  const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!idMatch) return { error: "Could not extract Google Doc ID from URL." };

  const docId = idMatch[1];
  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;

  const res = await fetch(exportUrl, {
    signal: AbortSignal.timeout(30000),
    redirect: "follow",
  });

  if (!res.ok) {
    return { error: `Google Docs export failed (${res.status}). Is the doc set to "Anyone with the link"?` };
  }

  const text = await res.text();
  if (!text || text.trim().length === 0) {
    return { error: "Google Doc appears to be empty." };
  }

  // First non-empty line as title
  const firstLine = text.split("\n").find((l) => l.trim().length > 0);
  const title = firstLine ? firstLine.slice(0, 120).trim() : "Google Doc";

  return {
    title,
    content: text,
    metadata: {
      docId,
      extractedAt: new Date().toISOString(),
      wordCount: text.split(/\s+/).length,
    },
  };
}
