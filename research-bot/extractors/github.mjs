function parseGitHubUrl(url) {
  const m = url.match(/github\.com\/([^/\s]+)\/([^/\s?#]+)/);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

export async function extractGitHub(url) {
  const parsed = parseGitHubUrl(url);
  if (!parsed) return { error: "Could not parse GitHub URL" };

  const apiUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const res = await fetch(apiUrl, {
    headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "research-bot" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return { error: `GitHub API error: ${res.status}` };

  const data = await res.json();
  const content = [
    `**${data.full_name}**`,
    "",
    data.description || "No description.",
    "",
    `Stars: ${data.stargazers_count} | Forks: ${data.forks_count} | Language: ${data.language || "N/A"}`,
    data.topics?.length ? `Topics: ${data.topics.join(", ")}` : "",
    data.homepage ? `Homepage: ${data.homepage}` : "",
  ].filter(Boolean).join("\n");

  return {
    title: data.full_name,
    content,
    metadata: {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  };
}
