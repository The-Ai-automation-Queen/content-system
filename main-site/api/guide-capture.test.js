const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");

const handler = require("./guide-capture.js");
const registry = require("./guide-capture-registry.json");

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

async function run(body, method = "POST") {
  const response = createResponse();
  await handler({ method, body }, response);
  return response;
}

test("registry contains unique metadata for every planned guide and hub", () => {
  handler.validateRegistry(registry);
  const captures = Object.values(registry.guides);
  assert.equal(captures.length, 33);
  assert.equal(captures.filter((capture) => capture.active).length, 33);
  assert.deepEqual(
    handler.getClientDeliverable(registry.guides["ai-jargon-guide"]),
    {
      name: "10 AI words you need to know",
      format: "PDF",
      downloadHref: "/downloads/10-ai-words-you-need-to-know.pdf",
      downloadLabel: "Download the PDF",
      successCopy: "Your 1-page PDF is ready. We have also sent the reference to your inbox.",
    },
  );
});

test("Guide 5 page and registry share the approved AI search capture contract", () => {
  const guideSource = fs.readFileSync(
    path.join(__dirname, "../../next-app/content/guides/show-up-in-ai-search.ts"),
    "utf8",
  );
  const capture = registry.guides["show-up-in-ai-search"];

  assert.equal(capture.guideId, "guide.show-up-in-ai-search");
  assert.equal(capture.active, true);
  assert.equal(capture.lumailTag, "guide_ai_search_visibility_workbook");
  assert.deepEqual(handler.getClientDeliverable(capture), {
    name: "AI search visibility workbook",
    format: "PDF",
    downloadHref: "/downloads/ai-search-visibility-workbook.pdf",
    downloadLabel: "Download the AI search workbook",
    successCopy:
      "Your AI search visibility workbook is ready. We have also sent it to your inbox.",
  });
  assert.match(guideSource, /guideSlug: "show-up-in-ai-search"/);
  assert.match(guideSource, /guideId: "guide\.show-up-in-ai-search"/);
  assert.match(guideSource, /lumailTag: "guide_ai_search_visibility_workbook"/);
  assert.match(guideSource, /buttonLabel: "Send me the workbook"/);
  assert.match(guideSource, /modalTitle: "Get the AI search visibility workbook"/);
  assert.match(
    guideSource,
    /downloadHref: "\/downloads\/ai-search-visibility-workbook\.pdf"/,
  );
});

test("Guide 6 page and registry share the approved business dashboard capture contract", () => {
  const guideSource = fs.readFileSync(
    path.join(__dirname, "../../next-app/content/guides/build-a-business-dashboard-with-ai.ts"),
    "utf8",
  );
  const capture = registry.guides["build-a-business-dashboard-with-ai"];

  assert.equal(capture.guideId, "guide.build-a-business-dashboard-with-ai");
  assert.equal(capture.active, true);
  assert.equal(capture.lumailTag, "guide_business_dashboard_workbook");
  assert.deepEqual(handler.getClientDeliverable(capture), {
    name: "Business dashboard build workbook",
    format: "XLSX",
    downloadHref: "/downloads/business-dashboard-build-workbook.xlsx",
    downloadLabel: "Download the dashboard workbook",
    successCopy:
      "Your business dashboard workbook is ready. We have also sent it to your inbox.",
  });
  assert.match(guideSource, /guideSlug: "build-a-business-dashboard-with-ai"/);
  assert.match(guideSource, /guideId: "guide\.build-a-business-dashboard-with-ai"/);
  assert.match(guideSource, /lumailTag: "guide_business_dashboard_workbook"/);
  assert.match(guideSource, /buttonLabel: "Send me the dashboard workbook"/);
  assert.match(guideSource, /modalTitle: "Get the business dashboard build workbook"/);
  assert.match(guideSource, /format: "XLSX"/);
  assert.match(
    guideSource,
    /downloadHref: "\/downloads\/business-dashboard-build-workbook\.xlsx"/,
  );
});

test("every active capture has a downloadable file in both publish targets", () => {
  for (const capture of Object.values(registry.guides).filter((entry) => entry.active)) {
    const file = capture.deliverable.file;
    assert.equal(fs.existsSync(path.join(__dirname, "../../next-app/public/downloads", file)), true);
    assert.equal(fs.existsSync(path.join(__dirname, "../downloads", file)), true);
  }
});

test("rejects unsupported methods", async () => {
  const response = await run({}, "GET");
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, "POST");
});

test("accepts the honeypot without calling Lumail", async () => {
  const originalFetch = global.fetch;
  global.fetch = () => {
    throw new Error("Lumail should not be called for honeypot submissions.");
  };
  try {
    const response = await run({ website: "bot-value" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { success: true });
  } finally {
    global.fetch = originalFetch;
  }
});

test("rejects unknown and invalid capture requests", async () => {
  assert.equal((await run({ guideSlug: "missing", email: "reader@example.com" })).statusCode, 400);
  assert.equal((await run({ guideSlug: "ai-jargon-guide", email: "not-an-email" })).statusCode, 400);
});

test("returns a configuration error when the Lumail token is missing", async () => {
  const originalToken = process.env.LUMAIL_API_TOKEN;
  delete process.env.LUMAIL_API_TOKEN;
  try {
    const response = await run({ guideSlug: "ai-jargon-guide", email: "reader@example.com" });
    assert.equal(response.statusCode, 503);
  } finally {
    if (originalToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = originalToken;
  }
});

test("sends the approved tags and returns the canonical deliverable", async () => {
  const originalFetch = global.fetch;
  const originalToken = process.env.LUMAIL_API_TOKEN;
  const originalSiteUrl = process.env.SHIFT_AND_LEAD_SITE_URL;
  let request;

  process.env.LUMAIL_API_TOKEN = "test-token";
  process.env.SHIFT_AND_LEAD_SITE_URL = "https://preview.shiftandlead.com/";
  global.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };

  try {
    const response = await run({
      guideSlug: "ai-jargon-guide",
      email: " Reader@Example.com ",
      source: "/guides/ai-jargon-guide.html",
    });

    assert.equal(response.statusCode, 200);
    assert.equal(request.url, "https://lumail.io/api/v1/subscribers");
    assert.equal(request.options.headers.Authorization, "Bearer test-token");

    const body = JSON.parse(request.options.body);
    assert.equal(body.email, "reader@example.com");
    assert.deepEqual(body.tags, ["shift-and-lead-guide", "guide_ai_10_words_pdf"]);
    assert.equal(
      body.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/10-ai-words-you-need-to-know.pdf",
    );
    assert.equal(body.triggerWorkflows, true);
    assert.equal(response.body.guideId, "guide.ai-jargon-guide");
    assert.equal(response.body.deliverable.downloadLabel, "Download the PDF");

    const taskSorterResponse = await run({
      guideSlug: "what-is-ai",
      email: "reader@example.com",
      source: "/guides/what-is-ai.html",
    });
    const taskSorterBody = JSON.parse(request.options.body);
    assert.equal(taskSorterResponse.statusCode, 200);
    assert.deepEqual(taskSorterBody.tags, ["shift-and-lead-guide", "guide_ai_essentials_task_sorter"]);
    assert.equal(
      taskSorterBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/ai-or-automation-task-sorter.pdf",
    );
    assert.equal(taskSorterResponse.body.guideId, "guide.what-is-ai");
    assert.equal(taskSorterResponse.body.deliverable.downloadLabel, "Download the task sorter");

    const improvementTrackerResponse = await run({
      guideSlug: "get-better-at-ai",
      email: "reader@example.com",
      source: "/guides/get-better-at-ai.html",
    });
    const improvementTrackerBody = JSON.parse(request.options.body);
    assert.equal(improvementTrackerResponse.statusCode, 200);
    assert.deepEqual(improvementTrackerBody.tags, [
      "shift-and-lead-guide",
      "guide_get_better_at_ai_4_week_tracker",
    ]);
    assert.equal(
      improvementTrackerBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/4-week-ai-improvement-tracker.pdf",
    );
    assert.equal(improvementTrackerResponse.body.guideId, "guide.get-better-at-ai");
    assert.equal(
      improvementTrackerResponse.body.deliverable.downloadLabel,
      "Download the 4-week tracker",
    );

    const sourceCheckingResponse = await run({
      guideSlug: "check-ai-answers",
      email: "reader@example.com",
      source: "/guides/check-ai-answers.html",
    });
    const sourceCheckingBody = JSON.parse(request.options.body);
    assert.equal(sourceCheckingResponse.statusCode, 200);
    assert.deepEqual(sourceCheckingBody.tags, [
      "shift-and-lead-guide",
      "guide_check_ai_answers_source_check",
    ]);
    assert.equal(
      sourceCheckingBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/ai-answer-source-checking-worksheet.pdf",
    );
    assert.equal(sourceCheckingResponse.body.guideId, "guide.check-ai-answers");
    assert.equal(
      sourceCheckingResponse.body.deliverable.downloadLabel,
      "Download the worksheet",
    );

    const clearWritingResponse = await run({
      guideSlug: "make-ai-clear-and-concise",
      email: "reader@example.com",
      source: "/guides/make-ai-clear-and-concise.html",
    });
    const clearWritingBody = JSON.parse(request.options.body);
    assert.equal(clearWritingResponse.statusCode, 200);
    assert.deepEqual(clearWritingBody.tags, [
      "shift-and-lead-guide",
      "guide_clear_concise_revision_worksheet",
    ]);
    assert.equal(
      clearWritingBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/clear-writing-revision-worksheet.pdf",
    );
    assert.equal(clearWritingResponse.body.guideId, "guide.make-ai-clear-and-concise");
    assert.equal(
      clearWritingResponse.body.deliverable.downloadLabel,
      "Download the worksheet",
    );

    const creativeReviewResponse = await run({
      guideSlug: "build-taste-with-ai",
      email: "reader@example.com",
      source: "/guides/build-taste-with-ai.html",
    });
    const creativeReviewBody = JSON.parse(request.options.body);
    assert.equal(creativeReviewResponse.statusCode, 200);
    assert.deepEqual(creativeReviewBody.tags, [
      "shift-and-lead-guide",
      "guide_ai_taste_practice_workbook",
    ]);
    assert.equal(
      creativeReviewBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/ai-creative-review-workbook.pdf",
    );
    assert.equal(creativeReviewResponse.body.guideId, "guide.build-taste-with-ai");
    assert.equal(
      creativeReviewResponse.body.deliverable.downloadLabel,
      "Download the creative review workbook",
    );

    const aiSearchResponse = await run({
      guideSlug: "show-up-in-ai-search",
      email: "reader@example.com",
      source: "/guides/show-up-in-ai-search.html",
    });
    const aiSearchBody = JSON.parse(request.options.body);
    assert.equal(aiSearchResponse.statusCode, 200);
    assert.deepEqual(aiSearchBody.tags, [
      "shift-and-lead-guide",
      "guide_ai_search_visibility_workbook",
    ]);
    assert.equal(
      aiSearchBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/ai-search-visibility-workbook.pdf",
    );
    assert.equal(aiSearchResponse.body.guideId, "guide.show-up-in-ai-search");
    assert.equal(
      aiSearchResponse.body.deliverable.downloadLabel,
      "Download the AI search workbook",
    );

    const dashboardWorkbookResponse = await run({
      guideSlug: "build-a-business-dashboard-with-ai",
      email: "reader@example.com",
      source: "/guides/build-a-business-dashboard-with-ai.html",
    });
    const dashboardWorkbookBody = JSON.parse(request.options.body);
    assert.equal(dashboardWorkbookResponse.statusCode, 200);
    assert.deepEqual(dashboardWorkbookBody.tags, [
      "shift-and-lead-guide",
      "guide_business_dashboard_workbook",
    ]);
    assert.equal(
      dashboardWorkbookBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/business-dashboard-build-workbook.xlsx",
    );
    assert.equal(
      dashboardWorkbookResponse.body.guideId,
      "guide.build-a-business-dashboard-with-ai",
    );
    assert.equal(
      dashboardWorkbookResponse.body.deliverable.downloadLabel,
      "Download the dashboard workbook",
    );

    const promptBriefResponse = await run({
      guideSlug: "what-is-a-prompt",
      email: "reader@example.com",
      source: "/guides/what-is-a-prompt.html",
    });
    const promptBriefBody = JSON.parse(request.options.body);
    assert.equal(promptBriefResponse.statusCode, 200);
    assert.deepEqual(promptBriefBody.tags, ["shift-and-lead-guide", "guide_prompt_brief"]);
    assert.equal(
      promptBriefBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/useful-prompt-brief.pdf",
    );
    assert.equal(promptBriefResponse.body.guideId, "guide.what-is-a-prompt");
    assert.equal(promptBriefResponse.body.deliverable.downloadLabel, "Download the prompt brief");

    const agentCardResponse = await run({
      guideSlug: "what-is-agentic",
      email: "reader@example.com",
      source: "/guides/what-is-agentic.html",
    });
    const agentCardBody = JSON.parse(request.options.body);
    assert.equal(agentCardResponse.statusCode, 200);
    assert.deepEqual(agentCardBody.tags, ["shift-and-lead-guide", "guide_agent_or_workflow_card"]);
    assert.equal(
      agentCardBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/workflow-or-agent-decision-card.pdf",
    );
    assert.equal(agentCardResponse.body.guideId, "guide.what-is-agentic");
    assert.equal(agentCardResponse.body.deliverable.downloadLabel, "Download the worksheet");

    const agentCanvasResponse = await run({
      guideSlug: "ai-agents",
      email: "reader@example.com",
      source: "/guides/ai-agents.html",
    });
    const agentCanvasBody = JSON.parse(request.options.body);
    assert.equal(agentCanvasResponse.statusCode, 200);
    assert.deepEqual(agentCanvasBody.tags, ["shift-and-lead-guide", "hub_agent_role_permission_canvas"]);
    assert.equal(
      agentCanvasBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/agent-role-permission-and-test-canvas.pdf",
    );
    assert.equal(agentCanvasResponse.body.guideId, "hub.ai-agents");
    assert.equal(agentCanvasResponse.body.deliverable.downloadLabel, "Download the agent canvas");

    const operationsWorksheetResponse = await run({
      guideSlug: "business-operations",
      email: "reader@example.com",
      source: "/guides/business-operations.html",
    });
    const operationsWorksheetBody = JSON.parse(request.options.body);
    assert.equal(operationsWorksheetResponse.statusCode, 200);
    assert.deepEqual(operationsWorksheetBody.tags, [
      "shift-and-lead-guide",
      "hub_business_operations_map",
    ]);
    assert.equal(
      operationsWorksheetBody.fields.guide_url,
      "https://preview.shiftandlead.com/downloads/business-operations-automation-map.pdf",
    );
    assert.equal(operationsWorksheetResponse.body.guideId, "hub.business-operations");
    assert.equal(
      operationsWorksheetResponse.body.deliverable.downloadLabel,
      "Download the worksheet",
    );
  } finally {
    global.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = originalToken;
    if (originalSiteUrl === undefined) delete process.env.SHIFT_AND_LEAD_SITE_URL;
    else process.env.SHIFT_AND_LEAD_SITE_URL = originalSiteUrl;
  }
});

test("every guide unlock sends its own Lumail tag and resource", async () => {
  const originalFetch = global.fetch;
  const originalToken = process.env.LUMAIL_API_TOKEN;
  const originalSiteUrl = process.env.SHIFT_AND_LEAD_SITE_URL;
  let request;

  process.env.LUMAIL_API_TOKEN = "test-token";
  process.env.SHIFT_AND_LEAD_SITE_URL = "https://preview.shiftandlead.com";
  global.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };

  try {
    for (const [guideSlug, capture] of Object.entries(registry.guides)) {
      const response = await run({
        guideSlug,
        email: "reader@example.com",
        source: `/guides/${guideSlug}.html`,
      });
      const body = JSON.parse(request.options.body);

      assert.equal(response.statusCode, 200, `${guideSlug} must be accepted.`);
      assert.equal(request.url, "https://lumail.io/api/v1/subscribers");
      assert.deepEqual(
        body.tags,
        [registry.audience.lumailTag, capture.lumailTag],
        `${guideSlug} must send only the audience tag and its own guide tag.`,
      );
      assert.equal(body.fields.source, `/guides/${guideSlug}.html`);
      assert.equal(
        body.fields.guide_url,
        `https://preview.shiftandlead.com/downloads/${capture.deliverable.file}`,
        `${guideSlug} must send its own resource URL.`,
      );
      assert.equal(body.triggerWorkflows, true);
      assert.equal(body.replaceTags, false);
      assert.equal(response.body.guideId, capture.guideId);
      assert.equal(
        response.body.deliverable.downloadHref,
        `/downloads/${capture.deliverable.file}`,
      );
    }
  } finally {
    global.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = originalToken;
    if (originalSiteUrl === undefined) delete process.env.SHIFT_AND_LEAD_SITE_URL;
    else process.env.SHIFT_AND_LEAD_SITE_URL = originalSiteUrl;
  }
});

test("passes a useful Lumail error back to the form", async () => {
  const originalFetch = global.fetch;
  const originalToken = process.env.LUMAIL_API_TOKEN;
  process.env.LUMAIL_API_TOKEN = "test-token";
  global.fetch = async () => ({
    ok: false,
    status: 429,
    json: async () => ({ message: "Try again in a minute." }),
  });

  try {
    const response = await run({ guideSlug: "ai-jargon-guide", email: "reader@example.com" });
    assert.equal(response.statusCode, 429);
    assert.deepEqual(response.body, { error: "Try again in a minute." });
  } finally {
    global.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = originalToken;
  }
});
