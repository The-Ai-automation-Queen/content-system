# Can Gemini see which Google Tasks list a task is in? — editorial review

Status: held for review; not in the live guide library.

- Reader: a professional who separates tasks by project list and wants to know whether Gemini preserves that information.
- Result: make two harmless lists and three tasks, request the list and due date for each, compare with Google Tasks and choose the appropriate next step.
- The title now describes the actual test rather than promising that Gemini will organise projects. The demo and numbered setup are visible before the inline email form; the complete prompt and Copy button are behind it. All steps start expanded.
- [Google’s Workspace connection help](https://support.google.com/gemini/answer/15229592?hl=en) confirms that Gemini can get, add and edit Google Tasks when Workspace is connected, subject to account settings and availability. It does not guarantee that a reply exposes the list name; this guide makes that the question to test.
- Replaced non-verifying checkboxes with a result choice: all three match, a list is missing or a task is wrong. Each choice gives the reader a concrete next action. Related cards point only to approved guides. Existing cover reused.
- Browser checks: normal route shows the inline form and hides the complete request; review route shows the full prompt and Copy transfers it. The missing-list choice displays the appropriate advice. Desktop, 390px phone and 768px tablet have no horizontal overflow. Next.js build and guide validation passed.

Before approval: verify this guide’s Lumail tag and emailed return link. Keep it out of the public library until then.
