import { config } from "./config.mjs";
import { CONTEXT_VERSION, POSITIONING_CONTEXT } from "./context/positioning.mjs";

const AGENT_OS_URL = process.env.AGENT_OS_RUN_URL || "http://127.0.0.1:4322/api/company/run";
const ICPS = ["Corporate_Escapee", "Capability_Buyer", "Low_Relevance"];
const PILLARS = [
  "Business_OS",
  "AI_Agents",
  "Corporate_Escape",
  "Time_Freedom",
  "AI_Capability",
  "Behind_the_Build",
  "Unassigned",
];
const SOURCE_QUALITY = ["primary", "credible_secondary", "commentary", "unverified"];
const CONTENT_STATUS = ["content_candidate", "research_more", "archive"];

const SYSTEM_INSTRUCTION = `You are the evidence-first research analyst for The AI Automation Queen.

${POSITIONING_CONTEXT}

Analyze source material for strategic usefulness. This is research classification, not public-facing copy.

NON-NEGOTIABLE RULES:
- Use only facts present in the supplied source. Never invent numbers, timelines, quotes, outcomes, personal anecdotes, client results, or certainty.
- Distinguish what the source says from your inference. Evidence items must be traceable to the supplied text.
- Primary ICP: Corporate_Escapee. Secondary ICP: Capability_Buyer. Use Low_Relevance when neither fits.
- Relevance measures strategic topic fit, not whether the claim is ready to publish. A source may be highly relevant but still require more research.
- AI agents, practical automation, Business OS design, building in public, time leverage, and AI capability are direct brand pillars. They do not need to mention the audience by name to be relevant.
- Use contentStatus and riskFlags, rather than a low relevance score, to quarantine weakly supported or speculative claims.
- A social post expressing an opinion or prediction is commentary, even when it is the primary evidence of what its author said. Reserve primary for first-party data, documented demonstrations, official records, or original research.
- Never revive the retired Women_Entrepreneurs or Corporate_Teams lanes.
- Never invent or publish an offer price. Name an offer only when the fit is explicit; otherwise use "none".
- Content directions are strategic directions, not finished hooks or fabricated stories.
- Flag hype, weak evidence, missing context, disputed claims, and anything requiring verification.
- Return only valid JSON.`;

function buildUserPrompt(extracted, type) {
  const thread = extracted.metadata?.thread?.length
    ? `\nThread context:\n${extracted.metadata.thread.join("\n")}`
    : "";
  return `Analyze this ${type} source using context version ${CONTEXT_VERSION}.

Title: ${extracted.title}

SOURCE CONTENT:
${extracted.content.slice(0, 14000)}
${thread}

Return exactly this JSON shape:
{
  "summary": "2-4 factual sentences",
  "highlights": ["3-5 factual points"],
  "icp": "Corporate_Escapee | Capability_Buyer | Low_Relevance",
  "pillar": "Business_OS | AI_Agents | Corporate_Escape | Time_Freedom | AI_Capability | Behind_the_Build | Unassigned",
  "relevance": 1,
  "reasoning": "why it is useful or not",
  "sourceQuality": "primary | credible_secondary | commentary | unverified",
  "evidence": ["specific source-grounded evidence"],
  "offerFit": "none or an offer name only, never a price",
  "funnelStage": "awareness | consideration | conversion | retention | none",
  "contentStatus": "content_candidate | research_more | archive",
  "riskFlags": ["claims or gaps to verify before publishing"],
  "contentDirections": [
    {"format": "LinkedIn text post", "angle": "specific grounded direction", "evidenceRefs": ["supporting evidence"]}
  ]
}`;
}

function parseJsonObject(value) {
  if (value && typeof value === "object") return value;
  const text = String(value || "").replace(/```json?/gi, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("No JSON object in model response");
    return JSON.parse(text.slice(start, end + 1));
  }
}

function cleanStrings(value, max = 8) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, max);
}

function normalize(raw, engine, extracted = {}, type = "") {
  let relevance = Math.max(0, Math.min(10, Number(raw.relevance) || 0));
  let icp = ICPS.includes(raw.icp) ? raw.icp : "Low_Relevance";
  let pillar = PILLARS.includes(raw.pillar) ? raw.pillar : "Unassigned";
  let sourceQuality = SOURCE_QUALITY.includes(raw.sourceQuality) ? raw.sourceQuality : "unverified";
  const sourceText = `${extracted.title || ""}\n${extracted.content || ""}`.toLowerCase();
  const pillarRules = [
    ["AI_Agents", /\b(ai[- ]?)?agents?\b|\bagentic\b/],
    ["Business_OS", /\bbusiness os\b|operating system|automated workflow|business automation/],
    ["Corporate_Escape", /corporate escape|leave corporate|quit.*job|career transition/],
    ["Time_Freedom", /time freedom|reclaim.*time|time leverage|save.*hours/],
    ["AI_Capability", /ai capability|ai literacy|learn.*ai|ai skill/],
    ["Behind_the_Build", /building in public|behind the build|what i built|how i built/],
  ];
  const deterministicPillar = pillarRules.find(([, pattern]) => pattern.test(sourceText))?.[0];
  if (pillar === "Unassigned" && deterministicPillar) pillar = deterministicPillar;
  if (pillar !== "Unassigned" && relevance < 7) relevance = 7;
  if (icp === "Low_Relevance" && pillar !== "Unassigned") icp = "Corporate_Escapee";
  if (type === "twitter" && sourceQuality === "primary") sourceQuality = "commentary";
  let contentStatus = CONTENT_STATUS.includes(raw.contentStatus)
    ? raw.contentStatus
    : relevance >= 7 ? "content_candidate" : relevance >= 4 ? "research_more" : "archive";
  const normalizedRisks = cleanStrings(raw.riskFlags, 8);
  if (["commentary", "unverified"].includes(sourceQuality) && normalizedRisks.length) {
    contentStatus = "research_more";
  }
  const contentDirections = Array.isArray(raw.contentDirections)
    ? raw.contentDirections.slice(0, 4).map((item) => ({
        format: String(item?.format || "LinkedIn text post").trim(),
        angle: String(item?.angle || "").trim(),
        evidenceRefs: cleanStrings(item?.evidenceRefs, 5),
      })).filter((item) => item.angle)
    : [];

  return {
    summary: String(raw.summary || "Analysis unavailable.").trim(),
    highlights: cleanStrings(raw.highlights, 5),
    icp,
    lane: icp,
    pillar,
    relevance,
    reasoning: String(raw.reasoning || "No reasoning returned.").trim(),
    sourceQuality,
    evidence: cleanStrings(raw.evidence, 8),
    offerFit: String(raw.offerFit || "none").replace(/\$[\d,.]+/g, "[price removed]").trim(),
    funnelStage: String(raw.funnelStage || "none").trim(),
    contentStatus,
    riskFlags: normalizedRisks,
    contentDirections,
    contextVersion: CONTEXT_VERSION,
    analysisEngine: engine,
  };
}

async function analyzeWithAgentOS(userPrompt) {
  const res = await fetch(AGENT_OS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agentId: "intelligence-audience-insights",
      input: userPrompt,
      context: "Evidence-first Research Inbox classification. Do not write public content.",
      responseFormat: "json",
    }),
    signal: AbortSignal.timeout(120000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(`Agent OS ${res.status}: ${data.error || "unknown error"}`);
  return parseJsonObject(data.output);
}

async function analyzeWithGroq(userPrompt) {
  if (!config.groqKey) throw new Error("No GROQ_API_KEY configured");
  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.groqKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: 2500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          { role: "user", content: userPrompt },
        ],
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return parseJsonObject(data.choices?.[0]?.message?.content);
    }
    if ([429, 500, 502, 503].includes(res.status) && attempt < maxRetries) {
      const retryAfter = Number(res.headers.get("retry-after"));
      const waitMs = retryAfter ? Math.min(retryAfter * 1000, 15000) : Math.min(3000 * 2 ** attempt, 15000);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }
    throw new Error(`Groq ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  throw new Error("Groq retries exhausted");
}

async function analyzeWithHaiku(userPrompt) {
  if (!config.anthropicKey) throw new Error("No ANTHROPIC_API_KEY configured");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      system: SYSTEM_INSTRUCTION,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!res.ok) throw new Error(`Haiku ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return parseJsonObject(data.content?.[0]?.text);
}

function failureAnalysis(message) {
  return normalize({
    summary: "AI analysis failed; the source was saved for manual review.",
    highlights: [],
    icp: "Low_Relevance",
    pillar: "Unassigned",
    relevance: 0,
    reasoning: message.slice(0, 180),
    sourceQuality: "unverified",
    evidence: [],
    offerFit: "none",
    funnelStage: "none",
    contentStatus: "research_more",
    riskFlags: ["Automated analysis failed; review the raw source before use."],
    contentDirections: [],
  }, "failed");
}

export async function analyzeContent(extracted, type) {
  const userPrompt = buildUserPrompt(extracted, type);
  try {
    return normalize(await analyzeWithAgentOS(userPrompt), "agent-os:intelligence-audience-insights", extracted, type);
  } catch (agentErr) {
    console.log(`Agent OS analysis failed: ${agentErr.message} — falling back to Groq`);
  }
  try {
    return normalize(await analyzeWithGroq(userPrompt), "groq:llama-3.3-70b-versatile", extracted, type);
  } catch (groqErr) {
    console.log(`Groq analysis failed: ${groqErr.message}`);
    // FREE-FIRST GATE: never call the paid Anthropic API unless the operator
    // has explicitly opted in (RESEARCH_ALLOW_PAID=1). This is the guard that
    // stops a free-tier outage from silently draining the sk-ant- key on every
    // link. When paid is disabled we save a quiet stub for manual review instead.
    if (!config.allowPaid) {
      console.warn("Paid Haiku fallback DISABLED (set RESEARCH_ALLOW_PAID=1 to enable). Saving stub.");
      return failureAnalysis(`Free engines unavailable and paid fallback disabled. Last free error: ${groqErr.message}`);
    }
    if (!config.anthropicKey) {
      return failureAnalysis(`Free engines unavailable; RESEARCH_ALLOW_PAID=1 but no ANTHROPIC_API_KEY. Last error: ${groqErr.message}`);
    }
    console.log("RESEARCH_ALLOW_PAID=1 — attempting paid Haiku fallback");
    try {
      return normalize(await analyzeWithHaiku(userPrompt), "anthropic:haiku", extracted, type);
    } catch (haikuErr) {
      console.error(`All analysis engines failed: ${haikuErr.message}`);
      return failureAnalysis(`Agent OS, Groq, and Haiku failed: ${haikuErr.message}`);
    }
  }
}
