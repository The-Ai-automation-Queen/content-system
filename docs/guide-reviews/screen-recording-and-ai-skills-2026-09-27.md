# Screen-recording and AI-skills guides — editorial review

Status: held for review. These changes do not alter the live publication list.

## Turn a ChatGPT screen recording into a process guide

- Reader result: turn a short, clean recording of a repeatable task into instructions another person can follow and test.
- The page shows a concrete three-action task-list example before asking for email. Readers then choose an agent-guided or manual route; the agent route and first step are selected by default.
- The inline form sits after the example and route choice, before either complete instruction. All prompt text is visible after access, with Copy in the prompt block. No entry popup is used.
- Existing cover is reused. Related links point only to approved, public guides.
- Product caveat: video handling depends on the ChatGPT account and attachment method. The guide offers still frames or a transcript if direct video review is unavailable, and tells readers to verify missing actions rather than guessing them.
- Rechecked OpenAI's current [video attachment guidance](https://help.openai.com/en/articles/8400551-chatgpt-image-inputs-faq) on 27 September. It confirms uploads through supported methods, including Files when Photos cannot select the video, and warns that analysis may miss parts of the video or audio.
- Removed a duplicated instruction from the agent prompt. It now asks for the intended reader and result before the source, names the fallback once, and gives a single sequence for observing, drafting and testing. The page and copied instruction contain no production, editorial or release directions.

## Which AI skill should you practise first?

- Reader result: choose one skill to practise on one familiar work task, with a simple check of the output.
- A weekly-update example shows the difference between an open pricing decision in the notes and a false approval in an AI draft. The matching “Check the result” choice is selected by default.
- Readers can select a different issue and optionally name one task. The complete instruction adapts to that choice and appears after the inline form. It is visible without expanding anything, with Copy in the prompt block.
- Existing cover is reused. Related links point only to approved, public guides.

## Verification

- Guide validator and Next.js static build passed.
- Desktop and 390px phone render, access boundary and unlocked prompt inspected for both pages. Copy and selector behavior checked in browser. No horizontal overflow at 390px.
- No live Lumail submission was made for these held pages; guide-specific delivery remains to be tested before publication.
- The screen-recording page was rechecked at 320px after this revision: no horizontal overflow, the route choice and step selector work, step 2 receives focus, and the revised agent instruction copies correctly.

Remaining: owner copy approval, a live Lumail delivery test, and a production link check. Keep both pages out of the public library until those are complete.
