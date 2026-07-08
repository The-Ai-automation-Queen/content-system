import { readFileSync, writeFileSync, existsSync } from 'fs';

// ---------------------------------------------------------------------------
// State persistence — tracks last_checked per source
// ---------------------------------------------------------------------------

function loadState(statePath) {
  if (!existsSync(statePath)) return {};
  try {
    return JSON.parse(readFileSync(statePath, 'utf-8'));
  } catch {
    return {};
  }
}

function saveState(statePath, state) {
  writeFileSync(statePath, JSON.stringify(state, null, 2));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const UA = 'AI-Insider-Brief-Crawler/1.0';
const FETCH_TIMEOUT_MS = 10_000;
// Raised from 500 -> 4000. At 500 chars, cards were being synthesized from a
// truncated opening fragment (often just the lede), which is most of why
// scraping quality was weak: the LLM never saw the substance of the article.
const MAX_CONTENT_CHARS = 4000;
const MAX_SCRAPE_ARTICLES = 5;
// Tier-2 sources are lower-trust / higher-noise. Cap how many of them can
// occupy a run's card budget so one noisy tier-2 feed can't crowd out tier-1
// signal. Expressed as a fraction of MAX_CARDS_PER_RUN (passed in from
// run.mjs); default used only if the caller does not supply a cap.
const DEFAULT_TIER2_FRACTION = 0.4;

// AI keyword gate — applied at fetch layer to non-AI-pure sources (source.ai_filter === true).
// Item must contain at least one match in title OR content to pass.
const AI_PATTERN = /\b(AI|A\.I\.|LLM|GPT|Claude|Gemini|ChatGPT|Copilot|machine learning|generative|neural net|algorithm|chatbot|automation|deepfake|agentic)\b/i;

function passesAIKeywordGate(item) {
  const haystack = (item.title || '') + ' ' + (item.content || '');
  return AI_PATTERN.test(haystack);
}

function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, {
    ...opts,
    signal: controller.signal,
    headers: { 'User-Agent': UA, ...(opts.headers || {}) },
  }).finally(() => clearTimeout(timer));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cap(text, max) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s\S*$/, '') + '...';
}

function extractTagContent(block, tagName) {
  // Try CDATA first
  const cdataRe = new RegExp(
    '<' + tagName + '[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</' + tagName + '>',
    'i'
  );
  const cdataMatch = block.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  // Regular tag content
  const re = new RegExp('<' + tagName + '[^>]*>([\\s\\S]*?)</' + tagName + '>', 'i');
  const m = block.match(re);
  return m ? m[1].trim() : '';
}

function extractLink(block) {
  // Atom-style self-closing link with href — prefer rel="alternate"
  const altLink = block.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["'][^>]*\/?>/i);
  if (altLink) return altLink[1].trim();

  const atomLink = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/?>/i);
  if (atomLink) return atomLink[1].trim();

  // RSS-style <link>text</link>
  const rssLink = extractTagContent(block, 'link');
  return rssLink || '';
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

// ---------------------------------------------------------------------------
// Article body extraction — dependency-free "readability lite".
// Prefers <article>, then <main>, then falls back to every <p> in the
// document. Strips <script>/<style>/<nav>/<header>/<footer> first so
// boilerplate (menus, cookie banners, related-articles rails) never leaks
// into the text the LLM sees.
// ---------------------------------------------------------------------------

function extractArticleText(html) {
  if (!html) return '';

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  let scope = null;

  const articleMatch = cleaned.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch && articleMatch[1].trim().length > 0) {
    scope = articleMatch[1];
  }

  if (!scope) {
    const mainMatch = cleaned.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch && mainMatch[1].trim().length > 0) {
      scope = mainMatch[1];
    }
  }

  if (!scope) {
    scope = cleaned;
  }

  const paragraphs = [];
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pMatch;
  while ((pMatch = pRe.exec(scope)) !== null) {
    const pText = stripHtml(pMatch[1]).trim();
    if (pText.length > 40) paragraphs.push(pText);
  }

  return paragraphs.join(' ');
}

// ---------------------------------------------------------------------------
// Dedupe helpers — cross-source near-duplicate detection on normalized
// titles. Several tier-1 and tier-2 sources cover the same wire story; we
// keep whichever copy is encountered first in an already tier-sorted list
// (tier 1 first), so the tier-1 source's version survives.
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  'a', 'an', 'the', 'of', 'in', 'on', 'for', 'to', 'and', 'or', 'with', 'is',
  'are', 'as', 'at', 'by', 'from', 'this', 'that', 'it', 'its', 'be', 'has',
  'have', 'after', 'over', 'amid', 'into', 'than', 'new', 'says', 'say',
  'will', 'not', 'their', 'about',
]);

export function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
}

function overlapScore(aWords, bWords) {
  const setA = new Set(aWords);
  const setB = new Set(bWords);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const w of setA) if (setB.has(w)) intersection++;
  const union = setA.size + setB.size - intersection;
  const jaccard = union === 0 ? 0 : intersection / union;
  const containment = intersection / Math.min(setA.size, setB.size);
  // Containment catches "X" being a strict subset of "X: the longer version"
  // (common when a tier-2 aggregator rewrites a tier-1 headline). Jaccard
  // catches two independently-written headlines about the same story.
  return Math.max(jaccard, containment);
}

const DUP_THRESHOLD = 0.6;

export function dedupeNearDuplicateTitles(items) {
  const kept = [];
  const keptWords = [];
  for (const item of items) {
    const words = normalizeTitle(item.title);
    let isDup = false;
    for (const kw of keptWords) {
      if (overlapScore(words, kw) >= DUP_THRESHOLD) {
        isDup = true;
        break;
      }
    }
    if (isDup) continue;
    kept.push(item);
    keptWords.push(words);
  }
  return kept;
}

// Caps how many tier-2 items can occupy the run, expressed as a fraction of
// maxCardsPerRun. Assumes items are already tier-sorted (tier 1 first) so
// the tier-1 items are never the ones dropped.
export function capTier2Items(items, maxCardsPerRun, fraction = DEFAULT_TIER2_FRACTION) {
  if (!maxCardsPerRun || maxCardsPerRun <= 0) return items;
  const capCount = Math.max(1, Math.floor(maxCardsPerRun * fraction));
  let tier2Count = 0;
  const result = [];
  for (const item of items) {
    if (item.sourceTier === 2) {
      if (tier2Count >= capCount) continue;
      tier2Count++;
    }
    result.push(item);
  }
  return result;
}

// ---------------------------------------------------------------------------
// RSS / Atom feed fetcher
// ---------------------------------------------------------------------------

async function fetchRSS(sourceUrl, lastChecked) {
  const lastDate = new Date(lastChecked);
  const res = await fetchWithTimeout(sourceUrl);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const xml = await res.text();

  const items = [];

  // Match both <item>...</item> (RSS) and <entry>...</entry> (Atom)
  const blockRe = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi;
  let match;

  while ((match = blockRe.exec(xml)) !== null) {
    const block = match[0];

    const title = stripHtml(extractTagContent(block, 'title'));
    const url = extractLink(block);

    // Content: prefer content:encoded, then description, then content, then summary
    let rawContent =
      extractTagContent(block, 'content:encoded') ||
      extractTagContent(block, 'description') ||
      extractTagContent(block, 'content') ||
      extractTagContent(block, 'summary') ||
      '';
    const content = cap(stripHtml(rawContent), MAX_CONTENT_CHARS);

    // Date: pubDate (RSS), published (Atom), updated (Atom), dc:date
    const dateStr =
      extractTagContent(block, 'pubDate') ||
      extractTagContent(block, 'published') ||
      extractTagContent(block, 'updated') ||
      extractTagContent(block, 'dc:date') ||
      '';
    const publishedAt = parseDate(dateStr);

    if (!title || !url) continue;

    // Filter by date — only items newer than lastChecked
    if (publishedAt && publishedAt <= lastDate) continue;

    items.push({
      title,
      url,
      content,
      source: sourceUrl,
      publishedAt: publishedAt ? publishedAt.toISOString() : new Date().toISOString(),
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Web page scraper (for sources without RSS)
// ---------------------------------------------------------------------------

async function scrapePage(sourceUrl, lastChecked) {
  const res = await fetchWithTimeout(sourceUrl);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const html = await res.text();

  // Extract article links — look for <a> tags with hrefs that look like articles
  const linkRe = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const candidates = [];
  const seenUrls = new Set();

  while ((match = linkRe.exec(html)) !== null) {
    let href = match[1];
    const text = stripHtml(match[2]).trim();

    // Filter for article-like URLs
    if (
      !href.match(/\/article[s]?\//i) &&
      !href.match(/\/20[2-3][0-9]\//i) &&
      !href.match(/\/blog\//i) &&
      !href.match(/\/news\//i) &&
      !href.match(/\/post[s]?\//i) &&
      !href.match(/\/story\//i)
    ) {
      continue;
    }

    // Skip navigation, pagination, tag links
    if (href.match(/\/page\/\d+/i) || href.match(/\/tag\//i) || href.match(/\/category\//i)) continue;

    // Require meaningful title text (at least 15 chars)
    if (!text || text.length < 15) continue;

    // Resolve relative URLs
    if (href.startsWith('/')) {
      const base = new URL(sourceUrl);
      href = base.origin + href;
    } else if (!href.startsWith('http')) {
      continue;
    }

    if (seenUrls.has(href)) continue;
    seenUrls.add(href);

    candidates.push({ title: text, url: href });
  }

  // Limit to MAX_SCRAPE_ARTICLES to be respectful
  const toFetch = candidates.slice(0, MAX_SCRAPE_ARTICLES);
  const items = [];

  for (const candidate of toFetch) {
    try {
      const articleRes = await fetchWithTimeout(candidate.url);
      if (!articleRes.ok) continue;
      const articleHtml = await articleRes.text();

      // Prefer <article>, then <main>, then all <p> — see extractArticleText.
      const content = cap(extractArticleText(articleHtml), MAX_CONTENT_CHARS);

      // Try to extract a date from meta tags
      let publishedAt = null;
      const dateMeta = articleHtml.match(
        /(?:property|name)=["'](?:article:published_time|date|pubdate|publish_date|datePublished)["'][^>]*content=["']([^"']+)["']/i
      );
      if (dateMeta) publishedAt = parseDate(dateMeta[1]);

      // Also try reverse attribute order (content before name)
      if (!publishedAt) {
        const dateMetaRev = articleHtml.match(
          /content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:article:published_time|date|pubdate|publish_date|datePublished)["']/i
        );
        if (dateMetaRev) publishedAt = parseDate(dateMetaRev[1]);
      }

      // Skip if article is older than lastChecked and we have a date
      if (publishedAt && publishedAt <= new Date(lastChecked)) continue;

      items.push({
        title: candidate.title,
        url: candidate.url,
        content,
        source: sourceUrl,
        publishedAt: publishedAt ? publishedAt.toISOString() : new Date().toISOString(),
      });

      // Small delay between article fetches
      await sleep(500);
    } catch {
      // Skip individual article failures silently
      continue;
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Main crawl orchestrator
// ---------------------------------------------------------------------------

// opts:
//   pendingCards    — cards already queued for approval (cards-pending.json).
//                     Their source_url is excluded, same as published briefs.
//   maxCardsPerRun  — used to cap tier-2 items to at most `tier2Fraction` of
//                     the run's card budget (default 40%).
//   tier2Fraction   — override the tier-2 cap fraction (0-1). Optional.
export async function crawlSources(sources, statePath, existingBriefs, opts) {
  opts = opts || {};
  var pendingCards = opts.pendingCards || [];
  var maxCardsPerRun = opts.maxCardsPerRun || 0;
  var tier2Fraction = opts.tier2Fraction || DEFAULT_TIER2_FRACTION;

  var state = loadState(statePath);
  var allItems = [];
  var existingUrls = new Set();

  // Build set of existing URLs for dedup — published briefs AND anything
  // already sitting in the approval queue. Without the pending check, the
  // crawler would re-fetch and re-queue the same still-unapproved story
  // every 12 hours.
  if (existingBriefs) {
    existingBriefs.forEach(function (b) {
      if (b.source_url) existingUrls.add(b.source_url);
    });
  }
  pendingCards.forEach(function (c) {
    if (c.source_url) existingUrls.add(c.source_url);
  });

  for (var source of sources) {
    var lastChecked = state[source.url] ? state[source.url].last_checked : null;
    // Default to 24 hours ago if never checked
    if (!lastChecked) {
      lastChecked = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    }

    try {
      var items;
      if (source.type === 'rss') {
        items = await fetchRSS(source.url, lastChecked);
      } else if (source.type === 'scrape') {
        items = await scrapePage(source.url, lastChecked);
      } else {
        console.warn('[CRAWL] Unknown source type "' + source.type + '" for ' + source.name + ', skipping');
        continue;
      }

      // Add source metadata to each item
      items.forEach(function (item) {
        item.sourceName = source.name;
        item.sourceTier = source.tier;
        item.categoryAffinity = source.category_affinity;
      });

      // AI keyword gate. Applied to non-AI-pure feeds (source.ai_filter === true)
      // as before, AND now to every tier-2 source regardless of ai_filter —
      // tier matters: a lower-trust feed has to clear the keyword bar before
      // it ever reaches the (expensive, permissive) LLM filter.
      var beforeGate = items.length;
      if (source.ai_filter === true || source.tier === 2) {
        items = items.filter(passesAIKeywordGate);
        if (beforeGate !== items.length) {
          console.log('[AI-GATE] ' + source.name + ': ' + (beforeGate - items.length) + ' items dropped (not AI-related)');
        }
      }

      // Deduplicate against existing briefs + pending queue
      items = items.filter(function (item) {
        return !existingUrls.has(item.url);
      });

      allItems = allItems.concat(items);

      // Update state
      state[source.url] = {
        last_checked: new Date().toISOString(),
        items_found: items.length,
      };

      console.log('[CRAWL] ' + source.name + ': ' + items.length + ' new items');
    } catch (err) {
      console.error('[CRAWL ERROR] ' + source.name + ': ' + err.message);
      // Continue with other sources — never let one bad source kill the whole crawl
    }

    // Rate limiting: 1-second delay between source fetches
    await sleep(1000);
  }

  saveState(statePath, state);

  // Sort by tier (tier 1 first) then by date (newest first). Tier ordering
  // matters downstream: it puts tier-1 items first in the filter queue, and
  // it means dedupe keeps the tier-1 copy of any story covered twice.
  allItems.sort(function (a, b) {
    if (a.sourceTier !== b.sourceTier) return a.sourceTier - b.sourceTier;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  var beforeDedup = allItems.length;
  allItems = dedupeNearDuplicateTitles(allItems);
  if (beforeDedup !== allItems.length) {
    console.log('[DEDUPE] ' + (beforeDedup - allItems.length) + ' near-duplicate title(s) dropped, tier-1 copy kept');
  }

  var beforeCap = allItems.length;
  allItems = capTier2Items(allItems, maxCardsPerRun, tier2Fraction);
  if (beforeCap !== allItems.length) {
    console.log('[TIER-CAP] ' + (beforeCap - allItems.length) + ' tier-2 item(s) dropped over the ' + Math.round(tier2Fraction * 100) + '% cap');
  }

  console.log('[CRAWL] Total: ' + allItems.length + ' new items from ' + sources.length + ' sources');
  return allItems;
}
