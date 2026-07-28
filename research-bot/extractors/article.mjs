export async function extractArticle(url) {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const res = await fetch(jinaUrl, {
    headers: { Accept: "text/plain", "User-Agent": "research-bot" },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) return { error: `Jina Reader failed: ${res.status}` };

  const text = await res.text();
  let title = "Untitled Article";
  const titleMatch = text.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  } else {
    const firstLine = text.split("\n").find((l) => l.trim().length > 0);
    if (firstLine) title = firstLine.slice(0, 100).trim();
  }

  return {
    title,
    content: text,
    metadata: { extractedAt: new Date().toISOString(), wordCount: text.split(/\s+/).length },
  };
}
