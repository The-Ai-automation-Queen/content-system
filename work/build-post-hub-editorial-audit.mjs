import fs from "node:fs";
import path from "node:path";

const repo = process.cwd();
const inspectPath =
  "/Users/fatiha/sandbox/Codex/projects/shift-and-lead-guide-library/outputs/guide-editorial-review/shift-and-lead-guide-portfolio-review.xlsx.inspect.ndjson";

const inspectLines = fs.readFileSync(inspectPath, "utf8").trim().split("\n");
let inventoryValues;
for (const line of inspectLines) {
  const item = JSON.parse(line);
  if (item.kind === "table" && item.sheet === "Guide Inventory") {
    inventoryValues = item.values;
    break;
  }
}

if (!inventoryValues) throw new Error("Guide Inventory table was not found.");

const headers = inventoryValues[4];
const inventory = inventoryValues
  .slice(5)
  .filter((row) => row[0] !== null && row[0] !== undefined)
  .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]])))
  .map((row) => ({ ...row, workbookRow: Number(row["Priority rank"]) + 5 }));

const catalogueRaw = JSON.parse(
  fs.readFileSync(path.join(repo, "next-app/content/guides.json"), "utf8"),
);
const catalogue = catalogueRaw.guides ?? catalogueRaw;
const currentBySlug = new Map(catalogue.map((guide) => [guide.slug, guide]));

const routes = {
  "ai-essentials": "/guides/ai-essentials.html",
  "better-prompts-and-answers": "/guides/better-prompts-and-answers.html",
  "which-ai-tool-for-what": "/guides/which-ai-tool-for-what.html",
  "content-and-creative-work": "/guides/content-and-creative-work.html",
  "workflows-and-automation": "/guides/workflows-and-automation.html",
  "ai-agents": "/guides/ai-agents.html",
  "business-operations": "/guides/business-operations.html",
  "follow-up-setup": "/guides/follow-up-setup.html",
  "stack-3-tool-ai-stack": "/guides/stack-3-tool-ai-stack.html",
  "24-7-operations-system": "/guides/24-7-operations-system.html",
  "first-ai-employee": "/guides/first-ai-employee.html",
  "meta-ai": "/guides/meta-ai.html",
  manus: "/guides/manus.html",
  claude: "/guides/claude.html",
  "research-to-content-workflow": "/guides/research-to-content-workflow.html",
  "get-better-at-ai": "/guides/get-better-at-ai.html",
  "check-ai-answers": "/guides/check-ai-answers.html",
  "make-ai-clear-and-concise": "/guides/make-ai-clear-and-concise.html",
  "build-taste-with-ai": "/guides/build-taste-with-ai.html",
  "show-up-in-ai-search": "/guides/show-up-in-ai-search.html",
  "build-a-business-dashboard-with-ai": "/guides/build-a-business-dashboard-with-ai.html",
};

const hubs = {
  "AI essentials": "ai-essentials",
  "Better prompts and answers": "better-prompts-and-answers",
  "AI tools": "which-ai-tool-for-what",
  "Content and creative work": "content-and-creative-work",
  "Workflows and automation": "workflows-and-automation",
  "AI agents": "ai-agents",
  "Business operations": "business-operations",
};

const rewriteRoutes = new Map();
const mapRewrite = (slugs, canonical, status, hub, use, risk = "") => {
  for (const slug of slugs) {
    if (rewriteRoutes.has(slug)) throw new Error(`Duplicate rewrite map for ${slug}`);
    rewriteRoutes.set(slug, { canonical, status, hub, use, risk });
  }
};

mapRewrite(
  ["satya-learning-loop", "ai-at-work", "train-your-brain-for-ai", "use-ai-where-youre-already-good"],
  "get-better-at-ai",
  "net-new",
  "AI essentials",
  "Combine the durable practice mechanics into one beginner learning loop; remove CEO, job-security and replacement framing.",
  "Career and performance claims must be stripped.",
);
mapRewrite(
  ["stop-ai-hallucinations", "devils-advocate", "honest-ai-prompt"],
  "check-ai-answers",
  "net-new",
  "Better prompts and answers",
  "One verification guide: challenge the answer, trace evidence, test uncertainty and decide whether it is safe to use.",
  "Do not promise prompts can stop hallucinations; anti-sycophancy claims need careful wording.",
);
mapRewrite(
  ["make-ai-get-to-the-point"],
  "make-ai-clear-and-concise",
  "net-new",
  "Better prompts and answers",
  "Turn rambling output into concise reader-ready writing with a before, instruction, revision and quality check.",
  "Named writing frameworks may require attribution; do not copy source skill text.",
);
mapRewrite(
  ["ai-taste-pick-check-finish"],
  "build-taste-with-ai",
  "net-new",
  "Content and creative work",
  "Teach selection, critique and finishing as human editorial judgments using Shift & Lead examples.",
  "Avoid the unsupported claim that taste is the one skill AI cannot replace.",
);
mapRewrite(
  ["robots-took-over-internet", "yelp-ai-local-optimization"],
  "show-up-in-ai-search",
  "net-new",
  "Content and creative work",
  "Combine site clarity, crawlability, factual consistency, structured evidence and local profile hygiene into one AI-search visibility guide.",
  "Search citation statistics, bot behavior and platform ranking claims are volatile and require primary verification.",
);
mapRewrite(
  ["codex-dashboards"],
  "build-a-business-dashboard-with-ai",
  "net-new",
  "Business operations",
  "Build one decision dashboard from approved business data, with a data dictionary, quality check and named decision owner.",
  "Codex features are volatile; make the method tool-flexible and verify current behavior before publication.",
);

mapRewrite(
  ["getting-started-ai", "7-chatgpt-modes"],
  "ai-essentials",
  "existing",
  "AI essentials",
  "Research support for the current start-here sequence; no new card.",
);
mapRewrite(
  ["productivity-audit", "8-ai-prompts-cheat-sheet", "intent-engineering"],
  "better-prompts-and-answers",
  "existing",
  "Better prompts and answers",
  "Research support for task framing, context, constraints and answer review; no prompt-list page.",
);
mapRewrite(
  ["emails-that-make-people-buy", "email-marketing-agent"],
  "follow-up-setup",
  "existing",
  "Workflows and automation",
  "Use only message purpose, approval, stop rules and handoff mechanics; remove revenue and vendor claims.",
);
mapRewrite(
  ["manus-shopify"],
  "manus",
  "existing",
  "AI tools",
  "Use as a bounded multi-step commerce test inside the full Manus verdict, not as a Shopify setup page.",
  "Pricing, Shopify integration and current feature claims require primary verification.",
);
mapRewrite(
  ["meta-business-agent", "meta-ai-for-marketers"],
  "meta-ai",
  "existing",
  "AI tools",
  "Use as task examples and privacy boundaries inside the full Meta AI verdict.",
  "Availability, training-data and performance claims require primary verification.",
);
mapRewrite(
  ["claude-small-business"],
  "claude",
  "existing",
  "AI tools",
  "Use only the setup decision, permissions and privacy checks inside the Claude verdict; governance curriculum remains deferred.",
  "Plugin, Cowork, plan and timing claims are volatile.",
);
mapRewrite(
  ["notion-agents", "multi-agent-framework", "social-media-agent", "agent-guardrails-template", "ai-safety-playbook"],
  "ai-agents",
  "existing",
  "AI agents",
  "Use the durable role, permissions, evidence, checkpoint, failure and stop mechanics in the current agent learning path.",
  "Vendor setups and claims of continuous unsupervised work are volatile or unsafe.",
);
mapRewrite(
  ["15-hours-week"],
  "24-7-operations-system",
  "existing",
  "Workflows and automation",
  "Use as boundary and use-case catalogue only; current source brief also routes small-stack mechanics to stack-3-tool-ai-stack.",
  "Time-saving claim and Cowork setup are excluded.",
);
mapRewrite(
  ["creator-retainer-side-hustle"],
  "research-to-content-workflow",
  "existing",
  "Content and creative work",
  "Use only the source-to-channel workflow and approval mechanics; remove income, scraping and creator-outreach framing.",
  "Income claim and third-party content rights are high risk.",
);
mapRewrite(
  ["ai-task-audit-prompt", "proprietary-data-ai-moat", "ai-feedback-loop"],
  "business-operations",
  "existing",
  "Business operations",
  "Use the transformed task inventory, source-of-truth and controlled improvement mechanics already locked in the Business Operations source brief.",
  "Original statistics, moat and self-improvement claims are excluded.",
);
mapRewrite(
  ["ai-harness-architect", "ai-stack-replace-saas"],
  "stack-3-tool-ai-stack",
  "existing",
  "AI tools",
  "Use the need, overlap, build-versus-buy and skip decisions in the current small-stack guide.",
  "Do not promise that an AI stack replaces production SaaS.",
);
mapRewrite(
  ["co-founder-agent", "ai-sandwich-tasks"],
  "first-ai-employee",
  "existing",
  "AI agents",
  "Use the 1-job specification, context, human review and bounded handoff pattern; call it an AI teammate, not a person or co-founder.",
  "Personhood, autonomy and task-count claims are excluded.",
);
mapRewrite(
  ["vibe-working"],
  "workflows-and-automation",
  "existing",
  "Workflows and automation",
  "Use only the durable task-to-workflow method; remove the trend label and time-saving promise.",
);

mapRewrite(
  [
    "ai-certifications-resume",
    "ai-career-maxxing",
    "ai-job-pivot",
    "linkedin-magnet",
    "context-engineer",
    "laidoff-30-day",
    "new-hiring-criteria",
    "career-ladder",
    "interview-coach",
    "10-free-ai-certifications",
    "3-ai-certifications-career-switchers",
    "ai-moves-that-get-you-hired",
  ],
  "future-career-project",
  "deferred",
  "Deferred career project",
  "Keep as research for a later capability-evidence and career-navigation curriculum; do not place cards in the current 7-hub library.",
  "Certification availability, hiring claims, salaries, recruiter behavior and career-outcome claims are volatile.",
);
mapRewrite(
  ["salary-to-wealth-prompts", "robinhood-ai-trading", "smart-money-app", "perplexity-bank"],
  "internal-high-stakes-reference",
  "internal",
  "Internal only",
  "Do not publish in the current guide library.",
  "Financial advice, account access, trading and banking data create high-stakes and privacy risk.",
);
mapRewrite(
  [
    "15-books-money-business-mindset",
    "local-ai-business",
    "million-dollar-ai-company",
    "1m-business-ai-tools",
    "30-day-launch-checklist",
    "business-validator",
    "make-money-ai",
    "ai-invention-ideas",
    "ai-insurance-business",
  ],
  "future-founder-project",
  "deferred",
  "Deferred founder project",
  "Keep only as research for a later founder curriculum; do not turn revenue, launch or idea lists into current library cards.",
  "Income, market-size, pricing, legal, launch-speed and tool claims require evidence and careful reframing.",
);
mapRewrite(
  ["fable-5-before-july-7", "fable-5-usage-limit-fix", "lovable-launch"],
  "internal-volatile-tool-reference",
  "internal",
  "Internal only",
  "Retain for mechanics only; do not publish a page tied to a dated model, plan limit or product launch.",
  "Dated product naming, plan access, limits and launch behavior are volatile.",
);
mapRewrite(
  ["odyssey-plan", "outfit-picker-skill", "vivid-vision"],
  "internal-personal-reference",
  "internal",
  "Internal only",
  "Outside the current business learning journey; do not create public cards.",
  "Personal-life scope and borrowed framework risk.",
);
mapRewrite(
  ["fish-audio-voice-clone"],
  "internal-creative-rights-reference",
  "internal",
  "Internal only",
  "Keep only as optional research for future accessible-content production.",
  "Voice consent, source rights, vendor behavior and impersonation risk require a separate policy-led project.",
);

const rewriteRows = inventory.filter((row) => row.Recommendation === "Rewrite & differentiate");
const unmappedRewrites = rewriteRows.filter((row) => !rewriteRoutes.has(row.Slug));
const extraRewriteMaps = [...rewriteRoutes.keys()].filter(
  (slug) => !rewriteRows.some((row) => row.Slug === slug),
);
if (unmappedRewrites.length || extraRewriteMaps.length) {
  throw new Error(
    `Rewrite mapping mismatch. Unmapped: ${unmappedRewrites.map((row) => row.Slug)}. Extra: ${extraRewriteMaps}`,
  );
}

const businessOperationsRetainedMerge = new Set([
  "60-30-10-framework",
  "self-improving-setup",
  "ai-risk-score",
  "expert-knowledge-file",
  "is-claude-safe",
  "3-step-ai-cost-audit",
  "sunday-reset",
]);
const toolSelectionMerge = new Set(["5-ai-tools", "ai-tools-worth-the-money"]);

function mergeDestination(row) {
  if (businessOperationsRetainedMerge.has(row.Slug)) {
    return {
      hub: "Business operations",
      canonical: "business-operations",
      use: "Retained transformed mechanic in the current Business Operations source brief; never a separate card.",
    };
  }
  if (toolSelectionMerge.has(row.Slug)) {
    return {
      hub: "AI tools",
      canonical: row.Slug === "5-ai-tools" || row.Slug === "ai-tools-worth-the-money" ? "stack-3-tool-ai-stack" : "which-ai-tool-for-what",
      use: "Tool-selection support; no separate card and no copied ranking, pricing or savings claim.",
    };
  }
  const sourceHub = row["Consolidation hub"];
  if (sourceHub === "AI foundations and learning") {
    return { hub: "AI essentials", canonical: "ai-essentials", use: "Foundation support; no separate card." };
  }
  if (sourceHub === "AI career advantage") {
    return {
      hub: "AI essentials",
      canonical: "ai-essentials",
      use: "Research-only support for transferable AI fluency; strip career, salary, hiring and replacement framing; no card.",
    };
  }
  if (["Prompting for better work", "Prompting Claude well", "Context, projects and memory"].includes(sourceHub)) {
    return {
      hub: "Better prompts and answers",
      canonical: "better-prompts-and-answers",
      use: "Prompt/context support; consolidate mechanics and do not publish a source-shaped prompt-list card.",
    };
  }
  if (["AI creative workflows", "AI for marketing and sales"].includes(sourceHub)) {
    return {
      hub: "Content and creative work",
      canonical: "content-and-creative-work",
      use: "Creative/content research support; strip product novelty, growth and performance claims; no card.",
    };
  }
  if (sourceHub === "Agents that earn their autonomy") {
    return {
      hub: "AI agents",
      canonical: "ai-agents",
      use: "Agent mechanic support; retain boundaries, checkpoints and tests, never a separate card.",
    };
  }
  if (sourceHub === "AI for founders and operators") {
    return {
      hub: "Business operations",
      canonical: "business-operations",
      use: "Business-operations boundary research. The current source brief decides whether a mechanic is retained, child-routed or excluded; no card.",
    };
  }
  if (sourceHub === "Claude Code and technical workflows") {
    return row.Topic === "Workflows"
      ? {
          hub: "Workflows and automation",
          canonical: "workflows-and-automation",
          use: "Technical workflow support; generalize beyond Claude Code and verify current behavior; no card.",
        }
      : {
          hub: "AI agents",
          canonical: "ai-agents",
          use: "Advanced agent-system support; keep permissions, tests and rollback, not setup novelty; no card.",
        };
  }
  if (sourceHub === "Practical AI workflows") {
    return row.Topic === "Agents & Automation"
      ? {
          hub: "AI agents",
          canonical: "ai-agents",
          use: "Agent-related support; no separate card.",
        }
      : {
          hub: "Workflows and automation",
          canonical: "workflows-and-automation",
          use: "Workflow support; retain trigger, input, owner, output, exception and test mechanics; no card.",
        };
  }
  if (sourceHub === "Skills, plugins and connectors") {
    const workflowSignal = /(workflow|email|calendar|dashboard|content|youtube|research|file|slide|document|slack|meeting|brief|report|linkedin|spreadsheet|pdf)/i.test(
      `${row.Slug} ${row["Original title"]}`,
    );
    return workflowSignal
      ? {
          hub: "Workflows and automation",
          canonical: "workflows-and-automation",
          use: "Workflow-relevant skill/connector support; preserve the job and test, not installation novelty; no card.",
        }
      : {
          hub: "AI agents",
          canonical: "ai-agents",
          use: "Agent/permission skill support; preserve boundaries and testing, not installation novelty; no card.",
        };
  }
  throw new Error(`No merge destination for ${row.Slug} (${sourceHub})`);
}

const sourceMap = inventory.map((row) => {
  const base = {
    workbookRow: row.workbookRow,
    priorityRank: row["Priority rank"],
    sourceSlug: row.Slug,
    originalTitle: row["Original title"],
    sourceUrl: row["Source URL"],
    workbookRecommendation: row.Recommendation,
    workbookHub: row["Consolidation hub"],
    workbookLevel: row.Level,
    workbookPathway: row.Pathway,
    workbookTopic: row.Topic,
    workbookTool: row.Tool,
  };

  if (row.Recommendation === "Publish standalone") {
    return {
      ...base,
      finalDisposition: "deferred",
      finalHub: "Deferred Lead and governance project",
      canonicalSlug: row.Slug,
      canonicalRoute: null,
      canonicalStatus: currentBySlug.has(row.Slug) ? "existing" : "net-new-deferred",
      use: "Exact workbook standalone candidate, but outside the current phase. Do not publish or create a card now.",
      risk: "Lead and governance is explicitly deferred; several titles also overlap prompt, career or volatile tool material.",
    };
  }

  if (row.Recommendation === "Archive / reference only") {
    return {
      ...base,
      finalDisposition: "archive/internal",
      finalHub: "Internal only",
      canonicalSlug: null,
      canonicalRoute: null,
      canonicalStatus: "internal",
      use: "Keep only for research provenance or redirect review. Do not create a public card.",
      risk: "Workbook archive decision: duplicate, dated, volatile, personal or low-value public scope.",
    };
  }

  if (row.Recommendation === "Rewrite & differentiate") {
    const mapped = rewriteRoutes.get(row.Slug);
    const route = routes[mapped.canonical] ?? null;
    return {
      ...base,
      finalDisposition: mapped.status,
      finalHub: mapped.hub,
      canonicalSlug: mapped.canonical,
      canonicalRoute: route,
      canonicalStatus: mapped.status,
      use: mapped.use,
      risk: mapped.risk,
    };
  }

  if (row.Recommendation === "Merge into hub") {
    const mapped = mergeDestination(row);
    return {
      ...base,
      finalDisposition: "hub/support research",
      finalHub: mapped.hub,
      canonicalSlug: mapped.canonical,
      canonicalRoute: routes[mapped.canonical],
      canonicalStatus: currentBySlug.has(mapped.canonical) ? "existing" : "planned-hub",
      use: mapped.use,
      risk:
        row.Tool !== "Tool-agnostic"
          ? "Tool-specific claims must be reverified at production time; source wording and examples are not reused."
          : "Source wording, distinctive examples and unsupported claims are not reused.",
    };
  }

  throw new Error(`Unexpected recommendation ${row.Recommendation}`);
});

const expectedCounts = {
  "Publish standalone": 13,
  "Rewrite & differentiate": 70,
  "Merge into hub": 253,
  "Archive / reference only": 31,
};
for (const [recommendation, expected] of Object.entries(expectedCounts)) {
  const actual = sourceMap.filter((row) => row.workbookRecommendation === recommendation).length;
  if (actual !== expected) throw new Error(`${recommendation}: expected ${expected}, got ${actual}`);
}

const standalone = sourceMap.filter((row) => row.workbookRecommendation === "Publish standalone");
const rewrites = sourceMap.filter((row) => row.workbookRecommendation === "Rewrite & differentiate");
const merged = sourceMap.filter((row) => row.workbookRecommendation === "Merge into hub");
const archived = sourceMap.filter((row) => row.workbookRecommendation === "Archive / reference only");

const mergeGroups = Object.fromEntries(
  Object.keys(hubs).map((hub) => [hub, merged.filter((row) => row.finalHub === hub)]),
);
if (Object.values(mergeGroups).flat().length !== 253) {
  throw new Error("The 253 merged rows were not assigned exactly once across the 7 hubs.");
}

const productionQueue = [
  {
    priority: 1,
    title: "Get better at AI with 1 real task",
    slug: "get-better-at-ai",
    route: routes["get-better-at-ai"],
    hub: "AI essentials",
    level: "Beginner",
    readerJob: "Practise AI on real work and improve without collecting random tips or courses.",
    outcome: "A 4-week practice tracker with 20 attempts, 3 reusable rules and a Repeat, Continue or Keep manual decision.",
    sourceRows: [30, 58, 85, 87],
    sourceSlugs: ["satya-learning-loop", "ai-at-work", "train-your-brain-for-ai", "use-ai-where-youre-already-good"],
    duplicateBoundary: "AI essentials tells the reader where to start; this child guide owns deliberate practice and proof of improvement.",
    volatilityRisk: "Strip CEO, job-security, replacement and performance claims.",
  },
  {
    priority: 2,
    title: "Check an AI answer before you use it",
    slug: "check-ai-answers",
    route: routes["check-ai-answers"],
    hub: "Better prompts and answers",
    level: "Beginner",
    readerJob: "Decide whether an AI answer is trustworthy enough to use, share or act on.",
    outcome: "A repeatable evidence, uncertainty and consequence check using a real Shift & Lead task.",
    sourceRows: [56, 65, 83],
    sourceSlugs: ["stop-ai-hallucinations", "devils-advocate", "honest-ai-prompt"],
    duplicateBoundary: "Better prompts improves the request; this child guide owns verification after the answer arrives.",
    volatilityRisk: "Never claim a prompt stops hallucinations or guarantees honesty.",
  },
  {
    priority: 3,
    title: "Make AI clear and concise",
    slug: "make-ai-clear-and-concise",
    route: routes["make-ai-clear-and-concise"],
    hub: "Better prompts and answers",
    level: "Beginner",
    readerJob: "Turn a long or vague AI answer into useful writing a reader can understand quickly.",
    outcome: "A before-and-after editing method with a clarity check, not another prompt collection.",
    sourceRows: [71],
    sourceSlugs: ["make-ai-get-to-the-point"],
    duplicateBoundary: "The prompt hub owns briefing; this guide owns concise revision for a real reader.",
    volatilityRisk: "Attribute established writing methods where used and do not copy the source skill.",
  },
  {
    priority: 4,
    title: "Choose and improve AI creative work",
    slug: "build-taste-with-ai",
    route: routes["build-taste-with-ai"],
    hub: "Content and creative work",
    level: "Intermediate",
    readerJob: "Choose, critique and finish AI-assisted work without handing the final judgment to the tool.",
    outcome: "Three practice drills using Shift & Lead copy and visuals, with visible selection criteria.",
    sourceRows: [66],
    sourceSlugs: ["ai-taste-pick-check-finish"],
    duplicateBoundary: "The content hub routes source-to-publish work; this child guide owns editorial judgment and finishing quality.",
    volatilityRisk: "Remove the absolute claim that taste is uniquely irreplaceable.",
  },
  {
    priority: 5,
    title: "Show up in AI search",
    slug: "show-up-in-ai-search",
    route: routes["show-up-in-ai-search"],
    hub: "Content and creative work",
    level: "Intermediate",
    readerJob: "Make a business easier for search engines and AI answer systems to find, understand and cite accurately.",
    outcome: "A site and local-profile evidence checklist with clear owners and recheck dates.",
    sourceRows: [32, 67],
    sourceSlugs: ["robots-took-over-internet", "yelp-ai-local-optimization"],
    duplicateBoundary: "This is discoverability and factual consistency, not the existing source-to-content production workflow.",
    volatilityRisk: "Current bot rules, platform behavior and citation statistics require primary-source verification and dated checks.",
  },
  {
    priority: 6,
    title: "Build a business dashboard with AI",
    slug: "build-a-business-dashboard-with-ai",
    route: routes["build-a-business-dashboard-with-ai"],
    hub: "Business operations",
    level: "Expert",
    readerJob: "Turn approved business data into one dashboard that supports a named decision.",
    outcome: "A working dashboard brief, data dictionary, quality test and decision-owner sign-off.",
    sourceRows: [26],
    sourceSlugs: ["codex-dashboards"],
    duplicateBoundary: "Business Operations prioritises processes; this child guide owns one advanced decision-dashboard build.",
    volatilityRisk: "Make the method tool-flexible and verify Codex behavior; protect customer data and remove premium-output claims.",
  },
];

for (const item of productionQueue) {
  item.productionStatus = currentBySlug.has(item.slug) ? "live" : "queued";
}

const audit = {
  generatedAt: new Date().toISOString(),
  authority: {
    workbook: inspectPath.replace(/\.inspect\.ndjson$/, ""),
    workbookInspectDump: inspectPath,
    repositoryCatalogue: "next-app/content/guides.json",
    migrationMatrix: "docs/GUIDE-MIGRATION-MATRIX.md",
    businessOperationsBrief: "next-app/content/guides/business-operations.source.md",
  },
  invariants: {
    sourceRows: sourceMap.length,
    recommendationCounts: expectedCounts,
    leadAndGovernanceDeferred: true,
    toolGuidesRetained: ["chatgpt", "claude", "gemini", "copilot", "grok", "meta-ai", "deepseek", "kimi", "manus", "mistral"],
    automationSetupIsInternal: true,
    n8nPublic: false,
  },
  standaloneCandidates: standalone,
  rewriteSources: rewrites,
  mergedSupportByHub: mergeGroups,
  archiveInternal: archived,
  productionQueueAfterBusinessOperations: productionQueue,
  allSourceRows: sourceMap,
};

fs.mkdirSync(path.join(repo, "work"), { recursive: true });
fs.writeFileSync(
  path.join(repo, "work/post-hub-editorial-audit.json"),
  `${JSON.stringify(audit, null, 2)}\n`,
);

const mergeCountLines = Object.entries(mergeGroups)
  .map(([hub, rows]) => `- ${hub}: ${rows.length}`)
  .join("\n");
const queueLines = productionQueue
  .map(
    (item) =>
      `${item.priority}. **${item.title}** — ${item.level}, ${item.hub}; rows ${item.sourceRows.join(", ")}; \`${item.route}\`\n   Status: ${item.productionStatus}\n   Reader job: ${item.readerJob}\n   Boundary: ${item.duplicateBoundary}\n   Risk: ${item.volatilityRisk}`,
  )
  .join("\n");
const standaloneLines = standalone
  .map(
    (row) =>
      `- Row ${row.workbookRow}: \`${row.sourceSlug}\` — ${row.originalTitle} — ${row.canonicalStatus}`,
  )
  .join("\n");
const rewriteGroups = new Map();
for (const row of rewrites) {
  const key = `${row.canonicalStatus} | ${row.canonicalSlug}`;
  if (!rewriteGroups.has(key)) rewriteGroups.set(key, []);
  rewriteGroups.get(key).push(`row ${row.workbookRow} \`${row.sourceSlug}\``);
}
const rewriteLines = [...rewriteGroups.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([destination, rows]) => `- **${destination}** (${rows.length}): ${rows.join(", ")}`)
  .join("\n");
const archiveLines = archived
  .map((row) => `- Row ${row.workbookRow}: \`${row.sourceSlug}\` — ${row.originalTitle}`)
  .join("\n");

const markdown = `# Post-hub editorial audit\n\n## Reconciliation\n\n- 367 workbook rows reconciled.\n- 13 standalone candidates: 0 existing, 13 net-new but deferred with the Lead/governance project.\n- 70 rewrite sources: each mapped to one existing guide, one proposed guide, or an explicit deferred/internal destination.\n- 253 merge sources: assigned exactly once as research support under the 7 public hubs. None becomes a card.\n- 31 archive/reference sources: internal only.\n\n## The 13 exact standalone candidates\n\n${standaloneLines}\n\n## Exact destination of the 70 rewrite sources\n\n${rewriteLines}\n\n## The 253 merged sources by final public hub\n\n${mergeCountLines}\n\n## The 31 archive/internal sources\n\n${archiveLines}\n\n## Production queue after Business Operations\n\n${queueLines}\n\n## Deferred phases\n\n- Career sources remain a separate future career curriculum, not hidden cards in AI essentials.\n- Founder, income, launch and business-idea sources remain a separate future founder curriculum or internal evidence.\n- All 13 Lead/governance standalone candidates remain deferred.\n- Finance, banking, trading, voice cloning, personal-life and dated product-launch sources remain internal.\n\nThe auditable row-level decisions are in \`work/post-hub-editorial-audit.json\`.\n`;
fs.writeFileSync(path.join(repo, "work/post-hub-editorial-queue.md"), markdown);

console.log(
  JSON.stringify(
    {
      total: sourceMap.length,
      standalone: standalone.length,
      rewrites: rewrites.length,
      merged: merged.length,
      archived: archived.length,
      mergedByHub: Object.fromEntries(Object.entries(mergeGroups).map(([hub, rows]) => [hub, rows.length])),
      productionQueue: productionQueue.map((item) => item.slug),
    },
    null,
    2,
  ),
);
