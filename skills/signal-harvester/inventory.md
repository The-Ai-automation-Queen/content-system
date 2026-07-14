# Signal Harvester — RSS Feed Inventory

Curated primary-source feeds for slot 6 (RSS/blogs). Operator can add/remove rows.
Signal harvester fetches these via WebFetch on each run and picks the freshest post
published within the last 7 days.

| Source | Feed / URL to fetch | Priority |
|---|---|---|
| Anthropic News | https://www.anthropic.com/news | High |
| OpenAI Blog | https://openai.com/news/ | High |
| Hugging Face Blog | https://huggingface.co/blog | High |
| Google DeepMind | https://deepmind.google/discover/blog/ | Medium |
| a16z AI | https://a16z.com/tag/ai/ | Medium |
| Lenny's Newsletter | https://www.lennysnewsletter.com/archive | Low — when it covers AI/automation |

## Notes
- Fetch the page, extract titles + dates, pick the most recent post ≤7 days old.
- If nothing is fresh on first-priority feeds, fall down to Medium, then Low.
- If all feeds are stale (nothing ≤7 days), log `(no fresh RSS signal)` and fill
  slot 6 from Tavily news search instead.
- Do not hallucinate article URLs. Only use exact URLs returned by the fetch.
