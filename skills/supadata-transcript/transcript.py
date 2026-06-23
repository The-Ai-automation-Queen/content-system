"""SupaData Transcript — pull full transcripts from any video URL."""

import argparse
import json
import os
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests")
    sys.exit(1)

# ── Config ──────────────────────────────────────────────────────────────
API_BASE = "https://api.supadata.ai/v1"


def load_api_key():
    """Load API key from env var or .env file."""
    key = os.environ.get("SUPADATA_API_KEY")
    if key:
        return key
    # Fallback: check common locations
    for candidate in [
        Path.home() / ".config" / "supadata" / ".env",
        Path("C:/Secrets/supadata.env"),
        Path.home() / ".config" / "supadata.env",
    ]:
        if candidate.exists():
            for line in candidate.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line.startswith("SUPADATA_API_KEY="):
                    return line.split("=", 1)[1].strip()
    print("ERROR: SUPADATA_API_KEY not found in env or config files")
    sys.exit(1)


def detect_platform(url):
    """Detect video platform from URL."""
    host = urlparse(url).hostname or ""
    host = host.lower().replace("www.", "")
    if any(h in host for h in ["youtube.com", "youtu.be"]):
        return "youtube"
    if "tiktok.com" in host:
        return "tiktok"
    if "instagram.com" in host:
        return "instagram"
    if "twitter.com" in host or "x.com" in host:
        return "twitter"
    if "facebook.com" in host or "fb.watch" in host:
        return "facebook"
    return "unknown"


def extract_youtube_id(url):
    """Extract video ID from YouTube URL."""
    parsed = urlparse(url)
    if "youtu.be" in (parsed.hostname or ""):
        return parsed.path.lstrip("/")
    qs = parse_qs(parsed.query)
    if "v" in qs:
        return qs["v"][0]
    return None


def get_transcript(url, text_mode=True, lang=None):
    """Fetch transcript from SupaData API."""
    api_key = load_api_key()
    platform = detect_platform(url)
    headers = {"x-api-key": api_key}

    if platform == "youtube":
        endpoint = f"{API_BASE}/youtube/transcript"
        video_id = extract_youtube_id(url)
        params = {"url": url, "text": str(text_mode).lower()}
        if video_id:
            params["videoId"] = video_id
    else:
        endpoint = f"{API_BASE}/transcript"
        params = {"url": url, "text": str(text_mode).lower()}

    if lang:
        params["lang"] = lang

    resp = requests.get(endpoint, headers=headers, params=params, timeout=30)

    if resp.status_code != 200:
        print(f"ERROR [{resp.status_code}]: {resp.text}")
        sys.exit(1)

    return resp.json(), platform


def format_chunks(chunks):
    """Format timestamped chunks into readable text."""
    lines = []
    for c in chunks:
        offset_sec = c.get("offset", 0) / 1000
        mins = int(offset_sec // 60)
        secs = int(offset_sec % 60)
        lines.append(f"[{mins:02d}:{secs:02d}] {c['text']}")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Pull video transcripts via SupaData API")
    parser.add_argument("url", help="Video URL (YouTube, TikTok, Instagram, X, Facebook)")
    parser.add_argument("--chunks", action="store_true", help="Return timestamped chunks instead of plain text")
    parser.add_argument("--lang", default=None, help="Language code (ISO 639-1, e.g. en, es, ar)")
    parser.add_argument("--json", action="store_true", dest="raw_json", help="Output raw JSON response")
    args = parser.parse_args()

    text_mode = not args.chunks
    data, platform = get_transcript(args.url, text_mode=text_mode, lang=args.lang)

    if args.raw_json:
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return

    print(f"\n{'='*60}")
    print(f"  PLATFORM: {platform.upper()}")
    if data.get("lang"):
        print(f"  LANGUAGE: {data['lang']}")
    if data.get("availableLangs"):
        print(f"  AVAILABLE: {', '.join(data['availableLangs'])}")
    print(f"{'='*60}\n")

    content = data.get("content", "")
    if isinstance(content, str):
        print(content)
    elif isinstance(content, list):
        print(format_chunks(content))
    else:
        print(json.dumps(data, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
