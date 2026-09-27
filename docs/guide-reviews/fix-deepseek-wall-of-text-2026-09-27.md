# DeepSeek wall of text — editorial review

Status: held for review; do not add to the public library without current editorial approval.

- Reader: someone using DeepSeek to format a dense scene while keeping the wording they chose. This is a focused writing use case, rather than a general DeepSeek introduction.
- Result: see the exact same scene as one paragraph and three paragraphs, copy a complete formatting prompt, then compare DeepSeek's answer with the original text on the page.
- Level: beginner. The sample scene is provided before the inline Lumail form; no prior DeepSeek setup or coding is needed.
- Current product step: [DeepSeek's official site](https://www.deepseek.com/en/) links to its web chat. The exercise uses only a new text chat and makes no model, plan or feature claim.
- Change: the copyable prompt now asks for only the reformatted scene. An on-page checker compares wording and punctuation after whitespace is collapsed, so a reader can distinguish changed text from new paragraph breaks. The checker keeps text in page state and makes no network request.
- Boundary: the checker does not decide if paragraph placement is good or if a rewrite is semantically sound. The page says this plainly and asks the reader to review the breaks.
- Capture: the complete prompt and checker follow the inline first-name, last-name and email form. Marketing consent remains optional. No production note appears in reader copy.
- Browser: checked the gate hides both prompt and checker, the before/after switch changes the visible scene, a matching response passes, a changed response flags the mismatch, Copy places the complete prompt on the clipboard, and 390px and 320px phone views have no horizontal overflow. Existing cover reused. The Next.js build, guide validation, output-contract tests and diff check passed.

Before approval: verify the guide-specific Lumail tag and emailed return link with an authorised test address, then check the public deployment. Do not treat a successful local review bypass as a capture test.
