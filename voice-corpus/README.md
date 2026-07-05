# Voice Corpus

Raw material only. Drop in anything Fatiha actually wrote or said **before the
AI existed** — this is what the `voice-file` skill compiles down into
`voice-file.md`. The AI has never produced anything in this folder; if it did,
it doesn't belong here (that's a closed loop, not a voice clone).

## What goes here

- Old LinkedIn/IG/X posts (copy-pasted text, one file per post or a batch file)
- Emails or newsletters she wrote herself
- DMs or Slack/Telegram messages (hers only — strip the other side of the conversation)
- Transcripts of her actually talking (a podcast guest spot, a voice memo,
  a recorded call) — speech patterns count as voice too
- Notes, journal entries, anything unedited and in her own words

## What does NOT go here

- Anything drafted by `content-engine` or any other AI, ever — including old
  drafts from before this rule existed. Check `content-vault-archive.md` is not
  a source; those entries may already be AI-assisted.
- Polished/edited copy where an editor or AI touched the wording
- Other people's writing, even if she liked it (that belongs in `inspiration-library`)

## Format

Plain `.md` or `.txt`, one piece of writing per file (or clearly delimited
if batched). Add a one-line header if it helps: platform, rough date, context.
No strict schema — `voice-file compile` reads everything in this folder.

## Minimum for a useful compile

10–15 real pieces gets a workable first voice file. 30+ is where it gets
genuinely reliable. Below 10, `voice-file compile` will warn that the file is
low-confidence and should be treated as a draft, not a locked reference.
