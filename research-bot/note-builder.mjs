function yaml(value) {
  return JSON.stringify(String(value ?? ""));
}

export function buildNote(extracted, analysis, type, url) {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toISOString().slice(11, 16);
  const riskFlags = analysis.riskFlags || [];

  const frontmatter = [
    "---",
    `source: ${yaml(type)}`,
    `url: ${yaml(url)}`,
    `date: ${dateStr}`,
    `time: ${yaml(timeStr)}`,
    `context_version: ${yaml(analysis.contextVersion || "unknown")}`,
    `analysis_engine: ${yaml(analysis.analysisEngine || "unknown")}`,
    `icp: ${yaml(analysis.icp || "Low_Relevance")}`,
    `lane: ${yaml(analysis.icp || analysis.lane || "Low_Relevance")}`,
    `pillar: ${yaml(analysis.pillar || "Unassigned")}`,
    `relevance: ${Number(analysis.relevance) || 0}`,
    `source_quality: ${yaml(analysis.sourceQuality || "unverified")}`,
    `content_status: ${yaml(analysis.contentStatus || "research_more")}`,
    `offer_fit: ${yaml(analysis.offerFit || "none")}`,
    `funnel_stage: ${yaml(analysis.funnelStage || "none")}`,
    `risk_flags: ${JSON.stringify(riskFlags.map(String))}`,
    `tags: [research-inbox, ${type}, hermes-ready]`,
    "---",
  ].join("\n");

  let body = `# ${extracted.title}\n\n`;

  if (type === "youtube" && extracted.metadata?.videoId) {
    body += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${extracted.metadata.videoId}" frameborder="0" allowfullscreen></iframe>\n\n`;
  }

  body += `## Summary\n${analysis.summary}\n\n`;

  if (analysis.highlights?.length) {
    body += "## Key Highlights\n";
    for (const item of analysis.highlights) body += `- ${item}\n`;
    body += "\n";
  }

  body += "## Strategic Fit\n";
  body += `- **ICP:** ${analysis.icp}\n`;
  body += `- **Pillar:** ${analysis.pillar}\n`;
  body += `- **Relevance:** ${analysis.relevance}/10\n`;
  body += `- **Source quality:** ${analysis.sourceQuality}\n`;
  body += `- **Content status:** ${analysis.contentStatus}\n`;
  body += `- **Offer fit:** ${analysis.offerFit}\n`;
  body += `- **Funnel stage:** ${analysis.funnelStage}\n`;
  body += `- **Why:** ${analysis.reasoning}\n\n`;

  if (analysis.evidence?.length) {
    body += "## Evidence From Source\n";
    for (const item of analysis.evidence) body += `- ${item}\n`;
    body += "\n";
  }

  if (riskFlags.length) {
    body += "## Risks / Verify Before Publishing\n";
    for (const item of riskFlags) body += `- ${item}\n`;
    body += "\n";
  }

  if (analysis.contentDirections?.length) {
    body += "## Content Directions\n";
    for (const direction of analysis.contentDirections) {
      body += `### ${direction.format}\n`;
      body += `${direction.angle}\n`;
      if (direction.evidenceRefs?.length) {
        body += `**Ground in:** ${direction.evidenceRefs.join("; ")}\n`;
      }
      body += "\n";
    }
  }

  body += "## Metadata\n";
  if (extracted.metadata?.channelName) body += `- **Channel:** ${extracted.metadata.channelName}\n`;
  if (extracted.metadata?.handle) body += `- **Author:** @${extracted.metadata.handle} (${extracted.metadata.user})\n`;
  if (extracted.metadata?.duration) body += `- **Duration:** ${extracted.metadata.duration}\n`;
  if (extracted.metadata?.stars !== undefined) body += `- **Stars:** ${extracted.metadata.stars} | Forks: ${extracted.metadata.forks}\n`;
  if (extracted.metadata?.wordCount) body += `- **Word count:** ${extracted.metadata.wordCount}\n`;
  if (extracted.metadata?.images?.length) {
    body += "- **Images:**\n";
    for (const img of extracted.metadata.images) body += `  - ![](${img})\n`;
  }
  body += `- **Source URL:** ${url}\n\n`;

  body += "## Full Content\n\n";
  body += "> [!note]- Raw extracted content (click to expand)\n";
  for (const line of extracted.content.split("\n")) body += `> ${line}\n`;

  return `${frontmatter}\n\n${body}`;
}
