# One-command guide workflow

In the Codex chat composer, use:

```text
/prompts:build-guide TOPIC="Your guide topic or working title"
```

Example:

```text
/prompts:build-guide TOPIC="How to check an AI answer before you use it"
```

This is a Codex slash command, not a terminal command. It uses the
`shift-lead-guide-builder` skill and the current Shift & Lead guide repository.
It advances through the complete workflow and pauses only for:

1. full-copy approval;
2. complete-page approval;
3. an explicit `publish` instruction.

Use `approved` only after reading the complete copy or page. Approval never means
publish. Restart Codex after installing or changing the command so it is reloaded
into the slash menu.
