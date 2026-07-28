import { config } from "../config.mjs";

function extractVideoId(url) {
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/shorts\/([^?\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function getYouTubeTitle(videoId) {
  // oEmbed API - free, no key needed, returns video title and author
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const data = await res.json();
      return { title: data.title || "", author: data.author_name || "" };
    }
  } catch {}
  return { title: "", author: "" };
}

export async function extractYouTube(url) {
  const videoId = extractVideoId(url);
  if (!videoId) {
    return { error: "Could not extract YouTube video ID" };
  }

  // Fetch transcript via Supadata
  const transcriptUrl = `https://api.supadata.ai/v1/youtube/transcript?videoId=${videoId}&text=true`;
  const transcriptRes = await fetch(transcriptUrl, {
    headers: { "x-api-key": config.supadataKey },
  });
  if (!transcriptRes.ok) {
    return { error: `Supadata transcript failed: ${transcriptRes.status}` };
  }
  const transcriptData = await transcriptRes.json();

  // Fetch video info via Supadata
  const infoUrl = `https://api.supadata.ai/v1/youtube/video?videoId=${videoId}`;
  const infoRes = await fetch(infoUrl, {
    headers: { "x-api-key": config.supadataKey },
  });

  let title = "";
  let channelName = "";
  let duration = "";
  let publishedAt = "";

  if (infoRes.ok) {
    const info = await infoRes.json();
    title = info.title || "";
    channelName = info.channelName || "";
    duration = info.duration || "";
    publishedAt = info.publishedAt || "";
  }

  // Fallback: oEmbed for title and channel if Supadata missed them
  if (!title || title === videoId) {
    const oembed = await getYouTubeTitle(videoId);
    if (oembed.title) title = oembed.title;
    if (!channelName && oembed.author) channelName = oembed.author;
  }

  // Last resort
  if (!title) title = `YouTube ${videoId}`;

  const transcript = transcriptData.content || transcriptData.text || "";

  return {
    title,
    content: transcript,
    metadata: { channelName, duration, publishedAt, videoId },
  };
}
