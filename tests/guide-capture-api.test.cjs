const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const handler = require("../main-site/api/guide-capture.js");

test("approved guide registry is the API capture metadata source", () => {
  const publicationPath = path.resolve(__dirname, "../data/guide-publication.json");
  const apiPath = path.resolve(__dirname, "../main-site/api/guide-capture.js");
  const publication = JSON.parse(fs.readFileSync(publicationPath, "utf8"));
  const apiSource = fs.readFileSync(apiPath, "utf8");

  assert.ok(publication.approved.length > 0);
  assert.equal(new Set(publication.approved.map((guide) => guide.slug)).size, publication.approved.length);
  for (const guide of publication.approved) {
    assert.match(guide.lumailTag || "", /^guide-[a-z0-9-]+$/);
  }
  assert.doesNotMatch(apiSource, /const GUIDE_TAGS\s*=/);
  assert.doesNotMatch(apiSource, /const GUIDE_FILES\s*=/);
});

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

async function invoke(body, fetchImpl = async () => ({ ok: true, status: 200, json: async () => ({}) })) {
  const originalFetch = global.fetch;
  const originalToken = process.env.LUMAIL_API_TOKEN;
  const calls = [];
  process.env.LUMAIL_API_TOKEN = "test-token";
  global.fetch = async (...args) => {
    calls.push(args);
    return fetchImpl(...args);
  };
  const response = responseRecorder();
  try {
    await handler({ method: "POST", body }, response);
    return { response, calls };
  } finally {
    global.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.LUMAIL_API_TOKEN;
    else process.env.LUMAIL_API_TOKEN = originalToken;
  }
}

test("guide capture requires explicit consent", async () => {
  const { response, calls } = await invoke({
    firstName: "Amina",
    email: "amina@example.com",
    guideSlug: "what-is-ai",
    source: "/guides/what-is-ai.html",
    consent: false,
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Consent is required.");
  assert.equal(calls.length, 0);
});

test("legacy guide capture accepts an omitted optional first name", async () => {
  const { response, calls } = await invoke({
    firstName: " ",
    email: "amina@example.com",
    guideSlug: "ai-jargon-guide",
    source: "/guides/ai-jargon-guide.html",
    consent: true,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(calls[0][1].body).name, "");
});

test("entry guide capture sends both name fields and consent evidence without forced resubscription", async () => {
  const timestamp = "2026-09-03T20:00:00.000Z";
  const { response, calls } = await invoke({
    firstName: " Amina ",
    lastName: " Example ",
    email: " AMINA@EXAMPLE.COM ",
    guideSlug: "what-is-ai",
    source: "/guides/what-is-ai.html?utm_source=linkedin",
    consent: true,
    consentVersion: "guide-access-v1",
    timestamp,
    attribution: {
      utmSource: "linkedin",
      utmMedium: "social",
      utmCampaign: "ai-guides",
      referrer: "https://www.linkedin.com/",
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(calls.length, 1);
  const [url, request] = calls[0];
  assert.equal(url, "https://lumail.io/api/v1/subscribers");
  const payload = JSON.parse(request.body);
  assert.equal(payload.email, "amina@example.com");
  assert.equal(payload.name, "Amina Example");
  assert.equal(payload.fields.first_name, "Amina");
  assert.equal(payload.fields.last_name, "Example");
  assert.equal(payload.resubscribe, false);
  assert.equal(payload.triggerWorkflows, true);
  assert.equal(payload.fields.consent, "true");
  assert.equal(payload.fields.consent_version, "guide-request-v2-2026-09-20");
  assert.notEqual(payload.fields.consent_timestamp, timestamp);
  assert.ok(Date.parse(payload.fields.consent_timestamp));
  assert.equal(payload.fields.utm_source, undefined);
  assert.equal(payload.fields.referring_site, undefined);
  assert.equal(payload.fields.source, "/guides/what-is-ai.html");
  assert.equal(payload.fields.marketing_consent, undefined);
});

test("Instagram gate requires both name fields before sending to Lumail", async () => {
  const { response, calls } = await invoke({ firstName: "Reader", email: "reader@example.com", consent: true, guideSlug: "instagram-content-dashboard" });
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Enter your first and last name.");
  assert.equal(calls.length, 0);
});

test("What AI entry gate requires both name fields before sending to Lumail", async () => {
  const { response, calls } = await invoke({ firstName: "Reader", email: "reader@example.com", consent: true, guideSlug: "what-is-ai" });
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Enter your first and last name.");
  assert.equal(calls.length, 0);
});


test("published guide capture uses its approved slug and rejects unknown slugs", async () => {
  const oldEnv = process.env.VERCEL_ENV;
  const oldNode = process.env.NODE_ENV;
  const input = { firstName: "Reader", lastName: "Example", email: "reader@example.com", consent: true, guideSlug: "instagram-content-dashboard" };
  try {
    process.env.VERCEL_ENV = "production";
    process.env.NODE_ENV = "production";
    const production = await invoke(input);
    assert.equal(production.response.statusCode, 200);
    const productionPayload = JSON.parse(production.calls[0][1].body);
    assert.deepEqual(productionPayload.tags, ["shift-and-lead-guide", "guide-instagram-content-dashboard"]);
    assert.equal(productionPayload.name, "Reader Example");
    assert.equal(productionPayload.fields.first_name, "Reader");
    assert.equal(productionPayload.fields.last_name, "Example");
    process.env.VERCEL_ENV = "preview";
    const allowed = await invoke(input);
    assert.equal(allowed.response.statusCode, 200);
    const payload = JSON.parse(allowed.calls[0][1].body);
    assert.deepEqual(payload.tags, ["shift-and-lead-guide", "guide-instagram-content-dashboard"]);
    assert.equal(payload.fields.guide_url, "https://www.shiftandlead.com/guides/instagram-content-dashboard.html");
    const blocked = await invoke({ ...input, guideSlug: "not-an-approved-guide" });
    assert.equal(blocked.response.statusCode, 400);
    assert.equal(blocked.calls.length, 0);
    const failed = await invoke(input, async () => ({ ok: false, status: 502, json: async () => ({ error: "provider failure" }) }));
    assert.equal(failed.response.statusCode, 502);
    assert.equal(failed.response.body.error, "We could not open the guide. Please try again.");
  } finally {
    if (oldEnv === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = oldEnv;
    if (oldNode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = oldNode;
  }
});
