# Plain words pass (owner request 13/10/2026)

The owner wants every guide in the simplest words possible: a reader who struggles
with reading, or reads English as a second language, must understand every line
on the first read. Structure stays exactly as it is. Only the words change.

## Rules
1. **Short sentences.** Aim for 12 words or fewer. Never more than 18. One idea per sentence.
2. **Everyday words.** If a 10-year-old would not know a word, swap it. Use the swap list below.
3. **Explain every tool word** the first time it appears, in plain words in brackets.
   Example: "Open a Project (a folder in ChatGPT that remembers your files)."
4. **Say who does what.** "Click Save." not "Saving is recommended."
5. **No idioms or clever phrases.** Write what you mean.
6. **Lead paragraphs:** two or three short sentences, not one long one.
7. **Lists and table cells:** short phrases, not long sentences.
8. Keep **bold** asset names, but make them plain (for example "Your AI access list").

## Do not change
- `slug`, `lumailTag`, `title`, `h1`, `cover`, `coverAlt`, `hero.src`, `hero.alt`, `hero.kind`,
  `openSteps`, `cta.href`, step `num`, any URL, the order or number of steps and blocks, block kinds.
- Facts, menu names in **bold** (ChatGPT's real labels), dollar amounts, [brackets] placeholders.
- Inside `prompt` blocks: keep the structure, rules, output format and [CHECK] lines so the AI
  still gives a good answer. Only swap a hard word for an easy one where it means the same.
- Step 01 must still have no `prompt` block.

## Still banned
No em dashes or en dashes. No hype words. None of: Lumail, review mode, editorial, approval,
template, validator, community, course, kit, Map. British spelling (organise, summarise).
No "It is not X. It is Y." slogans.

## Swap list (use the plain word)
access → what it can see / use · accurate → right · additional → more · adjust → change ·
assistant → helper · assess → check · capability → what it can do · communicate → tell / talk ·
comprehensive → full · confidential → private · configure → set up · consistent → the same each time ·
context → background / details · demonstrate → show · determine → decide / find out ·
eliminate → remove · ensure → make sure · essential → needed · evaluate → check ·
evidence → proof · existing → you already have · facilitate → help · feature → tool / button ·
functionality → what it does · identify → find · implement → set up / start · indicate → show ·
information → details / info · initial → first · instructions → steps / rules · interface → screen ·
leverage → use · maintain → keep · modify → change · numerous → many · obtain → get ·
optimise → improve · output → answer / result · permissions → what it is allowed to do ·
prioritise → put first · prior to → before · purchase → buy · regarding → about ·
relevant → that matters · repetitive → the same again and again · require → need · respond → reply ·
review → check / read · specific → exact · sufficient → enough · utilise → use · verify → check ·
workflow → steps you repeat · via → through / in.

## Your job
Rewrite only the reader-facing text in your files (intro, step text, lists, tables, tips, honest
blocks, gate, cta, conclusion, hero.line, seoDescription stays under 160 characters and keeps its
search phrase at the start). After each file, run `npx tsc --noEmit -p next-app` from
`/home/user/content-system` (fix only your files) and check for `—` or `–`. Do NOT edit any other
file, do NOT build, do NOT commit.
