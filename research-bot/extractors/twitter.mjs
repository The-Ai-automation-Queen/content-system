import { readFileSync } from "fs";
import { config } from "../config.mjs";

function extractTweetId(url) {
  const m = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  return m ? m[1] : null;
}

// Expand t.co shortlinks to their real destinations. Some tweets are nothing
// but a wrapped t.co URL; without this the analyzer receives only the opaque
// shortlink and produces an empty "content not provided" note.
async function expandTco(text) {
  if (!text) return text;
  const shortlinks = text.match(/https?:\/\/t\.co\/\w+/g);
  if (!shortlinks) return text;
  let out = text;
  for (const short of [...new Set(shortlinks)]) {
    try {
      const res = await fetch(short, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        signal: AbortSignal.timeout(8000),
      });
      if (res.url && res.url !== short) out = out.split(short).join(res.url);
    } catch {
      /* leave the shortlink as-is if it can't be resolved */
    }
  }
  return out;
}

function loadCookies() {
  try {
    const raw = readFileSync(config.birdCookiePath, "utf-8");
    const cookies = JSON.parse(raw);
    if (Array.isArray(cookies)) {
      return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    }
    return Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join("; ");
  } catch (err) {
    console.error("Failed to load Bird cookies:", err.message);
    return "";
  }
}

function extractCsrfToken(cookieStr) {
  const m = cookieStr.match(/ct0=([^;]+)/);
  return m ? m[1] : "";
}

async function fetchTweet(tweetId, cookieStr) {
  // Try syndication API first (no auth needed)
  try {
    const syndicationUrl = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=0`;
    const res = await fetch(syndicationUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return { data: await res.json(), source: "syndication" };
  } catch {}

  // Fallback: authenticated API via Bird cookies
  const csrf = extractCsrfToken(cookieStr);
  const variables = JSON.stringify({ tweetId, withCommunity: false, includePromotedContent: false, withVoice: false });
  const features = JSON.stringify({
    creator_subscriptions_tweet_preview_api_enabled: true,
    freedom_of_speech_not_reach_fetch_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
    longform_notetweets_consumption_enabled: true,
    longform_notetweets_rich_text_read_enabled: true,
    responsive_web_graphql_exclude_directive_enabled: true,
    responsive_web_graphql_timeline_navigation_enabled: true,
    responsive_web_media_download_video_enabled: false,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    verified_phone_label_enabled: false,
    view_counts_everywhere_api_enabled: true,
  });

  const res = await fetch(
    `https://x.com/i/api/graphql/TweetResultByRestId?variables=${encodeURIComponent(variables)}&features=${encodeURIComponent(features)}`,
    {
      headers: {
        authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        cookie: cookieStr,
        "x-csrf-token": csrf,
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(10000),
    }
  );
  if (!res.ok) return null;
  return { data: await res.json(), source: "graphql" };
}

function parseSyndication(data) {
  const text = data.text || "";
  const user = data.user?.name || "";
  const handle = data.user?.screen_name || "";
  const images = (data.mediaDetails || []).filter((m) => m.media_url_https).map((m) => m.media_url_https);
  const thread = data.parent ? [data.parent.text] : [];
  return { text, user, handle, images, thread };
}

function parseGraphql(data) {
  try {
    const tweet = data?.data?.tweetResult?.result?.legacy || data?.data?.tweetResult?.result?.tweet?.legacy;
    const userObj = data?.data?.tweetResult?.result?.core?.user_results?.result?.legacy;
    if (!tweet) return null;
    const text = tweet.full_text || "";
    const user = userObj?.name || "";
    const handle = userObj?.screen_name || "";
    const images = (tweet.extended_entities?.media || []).filter((m) => m.media_url_https).map((m) => m.media_url_https);
    return { text, user, handle, images, thread: [] };
  } catch { return null; }
}

export async function extractTweet(url) {
  const tweetId = extractTweetId(url);
  if (!tweetId) return { error: "Could not extract tweet ID from URL" };

  const cookieStr = loadCookies();
  const result = await fetchTweet(tweetId, cookieStr);
  if (!result) return { error: "Could not fetch tweet. Cookies may need refresh." };

  let parsed = result.source === "syndication" ? parseSyndication(result.data) : parseGraphql(result.data);
  if (!parsed || !parsed.text) {
    parsed = result.source === "syndication" ? parseGraphql(result.data) : parseSyndication(result.data);
  }
  if (!parsed || !parsed.text) return { error: "Could not parse tweet content." };

  // Expand any t.co shortlinks so link-only tweets yield real content.
  const expandedText = await expandTco(parsed.text);

  return {
    title: `@${parsed.handle}: ${expandedText.slice(0, 80)}...`,
    content: expandedText,
    metadata: { user: parsed.user, handle: parsed.handle, images: parsed.images, thread: parsed.thread, tweetId },
  };
}
