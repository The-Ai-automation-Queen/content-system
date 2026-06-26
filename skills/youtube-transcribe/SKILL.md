# Skill: youtube-transcribe

Transcribe a YouTube video (or any public video URL) to text using Reap, with word-level timestamps and speaker diarization where available.

## When to use

Run this skill when the user provides a YouTube or video URL and wants the spoken content as text — for repurposing into content, research notes, vault entries, or analysis.

## How to run

1. **Receive** the video URL from the user.
2. **Call** `mcp__Reap__transcribe` with `sourceUrl` set to the video URL. Leave `language` blank for auto-detect unless the user specifies a language.
3. **Poll** `mcp__Reap__get_status` with the returned `projectId` every 15–30 seconds until `status === "completed"`.
4. **Fetch** the transcript via `mcp__Reap__get_results` with the `projectId`.
5. **Return** the full transcript text to the user, and optionally save it as a research note (`research-notes.md` entry) or vault draft if the content is relevant to the brand.

## Output

- Full transcript text with speaker labels (if diarization succeeded)
- Optionally: a new `## RESEARCH NNN` entry in `research-notes.md` summarising key insights from the video

## Notes

- Reap emails the user (fatiha.chikh001@gmail.com) when processing completes.
- Long videos (>30 min) may take several minutes — poll patiently.
- Do not re-submit a URL that is already processing.
