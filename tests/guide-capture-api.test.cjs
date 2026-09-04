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

  assert.equal(publication.approved.length, 20);
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

test("guide capture requires a first name", async () => {
  const { response, calls } = await invoke({
    firstName: " ",
    email: "amina@example.com",
    guideSlug: "what-is-ai",
    source: "/guides/what-is-ai.html",
    consent: true,
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Enter your first name.");
  assert.equal(calls.length, 0);
});

test("guide capture sends name and consent evidence without forced resubscription", async () => {
  const timestamp = "2026-09-03T20:00:00.000Z";
  const { response, calls } = await invoke({
    firstName: " Amina ",
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
  assert.equal(payload.name, "Amina");
  assert.equal(payload.resubscribe, false);
  assert.equal(payload.triggerWorkflows, true);
  assert.equal(payload.fields.consent, "true");
  assert.equal(payload.fields.consent_version, "guide-access-v1");
  assert.equal(payload.fields.consent_timestamp, timestamp);
  assert.equal(payload.fields.utm_source, "linkedin");
  assert.equal(payload.fields.referring_site, "https://www.linkedin.com/");
});
