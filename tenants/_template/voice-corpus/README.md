# Voice Corpus — [CLIENT NAME]

Raw material only. Drop in anything the client actually wrote or said **before
the AI existed** — this is what `voice-file compile --tenant <slug>` reads.
The AI has never produced anything in this folder; if it did, it doesn't
belong here (that's a closed loop, not a voice clone).

## What goes here

- Old LinkedIn/IG/X posts (copy-pasted text)
- Emails or newsletters they wrote themselves
- DMs or messages (their side only)
- Transcripts of them actually talking (a podcast appearance, a voice memo)
- Notes, journal entries — anything unedited and in their own words

## What does NOT go here

- Anything drafted by `content-engine` or any other AI, ever
- Polished/edited copy where an editor or AI touched the wording
- Other people's writing, even if the client liked it

## Minimum for a useful compile

10–15 real pieces gets a workable first voice file. Below 10, `voice-file
compile` will mark the output `LOW-CONFIDENCE DRAFT`.
