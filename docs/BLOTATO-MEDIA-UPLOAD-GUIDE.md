# Blotato Media Upload — Beginner's Guide

> Last updated: 2026-08-10. Explains Blotato's Media Upload API and maps it onto
> this repo's pipeline (M02 visuals → M04 distribution). Internal reference,
> not customer-facing.

## The one-sentence version

You almost never have to "upload" media to Blotato anymore. If your image or
video already sits at a public web address, hand Blotato that address and it
fetches it itself. Only a file that lives on a disk somewhere with no public
address needs the two-step upload.

## Words this guide uses

- **URL** — a web address like `https://example.com/image.jpg`. "Public" means
  anyone with the link can open it, no login required.
- **Endpoint** — one specific address Blotato's API listens on, e.g. `/v2/posts`.
- **POST / PUT** — two ways of sending data to an endpoint. POST means
  "create/do something." PUT here means "upload these exact bytes."
- **Presigned URL** — a temporary, one-time upload address Blotato hands you.
  It expires within minutes, so you upload right after you get it.
- **`blotato-api-key` header** — how every call proves it's really us. In this
  repo the real key lives in Doppler and is injected at runtime; it is never
  written into a file (see `security.md` §1).

## The three ways to get media into a post

| # | Method | Use it when | Steps | Output |
|---|---|---|---|---|
| 1 | **Direct URL** (new default) | The file is already public somewhere (Blotato-hosted, Canva/Gamma export, S3, Dropbox, the site itself) | None — put the URL straight into `mediaUrls` on the post | Blotato fetches it at publish time |
| 2 | **Presigned Upload** | The file only exists locally (a VPS render, an export on your machine) with no public URL | 1) ask for a presigned URL 2) PUT the file to it immediately 3) use the returned `publicUrl` | A new Blotato-hosted URL, used exactly like #1 |
| 3 | **Legacy `/media` endpoint** | You already have a public URL but want Blotato to keep a permanent hosted copy, or you're sending base64 image data | POST the URL (or base64) to `/v2/media` | A new Blotato-hosted URL |

Quick test: **do you already have a link you could paste into a browser and see
the file?** Use method 1. Just a file on disk? Method 2.

## Method 1: Direct URL (the new default)

Nothing to build. Wherever the post gets assembled, put the public URL
straight into `mediaUrls`:

```json
{
  "post": {
    "accountId": "16438",
    "content": {
      "text": "New post",
      "mediaUrls": ["https://example.com/image.jpg"],
      "platform": "linkedin"
    },
    "target": { "targetType": "linkedin" }
  }
}
```

Blotato downloads the file itself at publish time. No rate limit to manage, no
expiry to race.

## Method 2: Presigned Upload (for local files)

Three calls, in order, and step 2 has to happen right after step 1:

**Step 1 — ask for an upload slot**
```bash
curl -X POST https://backend.blotato.com/v2/media/uploads \
  -H "Content-Type: application/json" \
  -H "blotato-api-key: YOUR_API_KEY" \
  -d '{"filename": "product-photo.jpg"}'
```
Returns:
```json
{
  "presignedUrl": "https://database.blotato.com/storage/.../upload/sign/...",
  "publicUrl": "https://database.blotato.com/storage/.../product-photo.jpg"
}
```

**Step 2 — upload the actual bytes, immediately**
```bash
curl -X PUT "PRESIGNED_URL_FROM_STEP_1" \
  -H "Content-Type: image/jpeg" \
  --data-binary @product-photo.jpg
```
Match `Content-Type` to the real file (`image/png`, `video/mp4`, etc). The
presigned URL expires fast — don't sit on it between steps 1 and 2.

**Step 3 — publish using the `publicUrl`**
```bash
curl -X POST https://backend.blotato.com/v2/posts \
  -H "Content-Type: application/json" \
  -H "blotato-api-key: YOUR_API_KEY" \
  -d '{
    "post": {
      "accountId": "YOUR_ACCOUNT_ID",
      "content": {
        "text": "Check out this product!",
        "mediaUrls": ["PUBLIC_URL_FROM_STEP_1"],
        "platform": "instagram"
      },
      "target": { "targetType": "instagram" }
    }
  }'
```

Limit: 120 requests/minute on the presigned endpoint. Max file size depends on
the Blotato plan — check the billing/plan page in the Blotato dashboard for
the current cap rather than assuming a number.

## Method 3: the legacy `/media` endpoint

```bash
curl -X POST https://backend.blotato.com/v2/media \
  -H "Content-Type: application/json" \
  -H "blotato-api-key: YOUR_API_KEY" \
  -d '{"url": "https://example.com/image.jpg"}'
```
Returns `{"url": "https://database.blotato.com/....jpg"}`. Still works, but
it's a slower round-trip than just passing a public URL straight into
`mediaUrls` (Method 1). Two real reasons to still reach for it: you're on
n8n's "Binary Data" upload option (capped at 15MB there), or you specifically
want Blotato to keep a permanent hosted copy. Rate limit: 30 requests/minute.

## Errors worth knowing before they surprise you

| Error | Meaning | Fix |
|---|---|---|
| `429 Too many requests` | Hit the rate limit (30/min legacy, 120/min presigned) | Wait the number of seconds the error names, then retry |
| `500` / code `9999` | Unknown server-side error | Retry once; if it repeats, it's Blotato-side |
| Presigned PUT fails with a sandbox/network error, in Claude Cowork or Desktop | Cowork's sandbox is blocking the outbound request, not a Blotato bug | Allowlist `database.blotato.io` in Cowork's network egress settings |
| Same PUT failure in Claude Code sessions (like this one) | This sandbox isn't user-configurable | Skip the local-upload step entirely — pass a public URL straight into `mediaUrls` (Method 1) |

## Google Drive as a media source (avoid when you can)

Share links open a preview page, not the raw file, so Blotato can't read them
directly.

- **Folder links (`/drive/folders/...`) never work.** Share the specific file.
- **Preview links (`/view?...`) don't work reliably.**
- **The fix** — pull the file ID out of the share link and build a
  direct-download URL:
  ```
  https://drive.usercontent.google.com/download?id={FILE_ID}&export=download&confirm=t
  ```
  So `https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view` becomes
  `https://drive.usercontent.google.com/download?id=1aBcDeFgHiJkLmNoPqRsTuVwXyZ&export=download&confirm=t`.
- **Permissions** — the file (or its parent folder, for automations) needs to
  be "Anyone with the link" → Viewer.
- **Large videos (100MB+)** trigger Drive's "can't scan this file for
  viruses" popup, which blocks Blotato outright. No workaround — use Dropbox,
  S3, or Google Cloud Storage for big video instead.

Given all of that, Drive should be this pipeline's last choice for hosting
media, not the default.

## How this maps onto this repo

Media in this system comes from two kinds of places, and each needs a
different method.

**Already has a public URL — use Method 1, no upload at all:**
- `blotato_create_visual` output from `visual-engine` (AI images/video) —
  Blotato already hosts these; the `mediaUrl` / `imageUrls` it returns can go
  straight into the post.
- Canva and Gamma exports — their export links are already public.

**Local file, no public URL — needs Method 2 (Presigned Upload):**
- `carousel-factory` PNGs (rendered locally via headless Chromium)
- `hyperframes` / `remotion` MP4 renders
- Higgsfield/HeyGen talking-head exports, once they've been through the
  mandatory `captions` burn-in pass
- Anything that's currently just a file path on the VPS

`skills/distribution/SKILL.md` (M04) already calls
`blotato_create_presigned_upload_url` for these, which is the right tool for
that job. The one change worth making now that upload is optional: **before
reaching for presigned upload, check whether the entry's `**Visual:**` line
already records a public URL** (a Blotato/Canva/Gamma link) instead of a local
path. If it does, skip straight to Method 1 — there's no reason to round-trip
an already-public asset through an upload. (`skills/distribution/SKILL.md` has
been updated to make this the first check.)

## One thing worth confirming before the next distribution run

The Blotato MCP tools actually connected in this session are all
automation/inbox/analytics tools (`blotato_list_automations`,
`blotato_get_comment`, `blotato_get_credits`, and similar). None of the
posting/upload tools that `skills/distribution/SKILL.md` and
`skills/visual-engine/SKILL.md` list in their `allowed-tools`
(`blotato_create_post`, `blotato_create_presigned_upload_url`,
`blotato_list_accounts`, `blotato_get_user`, `blotato_create_visual`) showed up
here. That may just be this session's connection — worth checking on the VPS
/ the environment that actually runs M04 before trusting it. If those tools
genuinely aren't wired in somewhere, the three REST calls in this guide
(Methods 1-3, called with plain HTTP instead of an MCP tool) are the working
fallback — the same approach the account's `publish` skill already uses.

## Checklist for queuing a post with media

- [ ] Public URL, or just a local file?
- [ ] If URL: does it open in an incognito tab with no login? (A Google Drive
      `/view` or `/folders` link will fail — convert it first.)
- [ ] If local file: request the presigned URL, then PUT the file
      **immediately** — it expires fast.
- [ ] Large video (100MB+) currently on Google Drive? Move it to
      Dropbox/S3/GCS first.
- [ ] Final URL goes into `mediaUrls` on the `/v2/posts` call (or the
      equivalent MCP tool).
- [ ] Never put the real API key in a committed file — it comes from
      Doppler/MCP env config only (`security.md` §1).
