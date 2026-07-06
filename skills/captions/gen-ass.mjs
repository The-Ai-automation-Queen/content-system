#!/usr/bin/env node
// Whisper word timestamps -> brand-styled karaoke ASS captions.
// Usage: node gen-ass.mjs <whisper.json> <out.ass> [wordsPerLine]
// Accepts whisper JSON with segments[].words[] = {word, start, end}
// (openai-whisper --word_timestamps True, whisper.cpp, or faster-whisper).
import { readFileSync, writeFileSync } from 'node:fs';

const [, , inFile, outFile = 'captions.ass', wplArg] = process.argv;
if (!inFile) {
  console.error('Usage: node gen-ass.mjs <whisper.json> <out.ass> [wordsPerLine]');
  process.exit(1);
}
const wordsPerLine = Number(wplArg) > 0 ? Number(wplArg) : 3;

const data = JSON.parse(readFileSync(inFile, 'utf8'));
const words = (data.segments ?? []).flatMap(s => s.words ?? [])
  .map(w => ({ text: String(w.word).trim(), start: w.start, end: w.end }))
  .filter(w => w.text);
if (!words.length) {
  console.error('No words with timestamps found. Run whisper with word timestamps enabled.');
  process.exit(1);
}

const ts = t => {
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60);
  const s = (t % 60).toFixed(2).padStart(5, '0');
  return `${h}:${String(m).padStart(2, '0')}:${s}`;
};

// Brand karaoke style: white fill, electric #2C4BE0 pre-highlight (ASS is
// BGR: &H00E04B2C), heavy outline, bottom-centered for 1080x1920.
const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Karaoke,Inter,110,&H00FFFFFF,&H00E04B2C,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,6,0,2,60,60,320,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

const lines = [];
for (let i = 0; i < words.length; i += wordsPerLine) {
  const chunk = words.slice(i, i + wordsPerLine);
  const start = chunk[0].start, end = chunk[chunk.length - 1].end;
  const text = chunk.map(w => {
    const cs = Math.max(1, Math.round((w.end - w.start) * 100));
    return `{\\k${cs}}${w.text.toUpperCase()}`;
  }).join(' ');
  lines.push(`Dialogue: 0,${ts(start)},${ts(end)},Karaoke,,0,0,0,,${text}`);
}

writeFileSync(outFile, header + lines.join('\n') + '\n');
console.log(`${outFile}: ${lines.length} caption lines from ${words.length} words.`);
