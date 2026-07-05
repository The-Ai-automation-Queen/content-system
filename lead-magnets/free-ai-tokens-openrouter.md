# Stop Paying for AI Tokens

*From Fatiha — the AI Automation Queen*

You hit a usage limit mid-task. Again. So you wait, or you upgrade, or you
open a second tool and start over. None of those are the actual fix.

Here's the actual fix: point Claude Code at a free model instead of the paid
one. Same tool, same interface, zero bill. Three steps, five minutes, done
once.

---

## Step 1: Get a free OpenRouter key

OpenRouter is a single API key that gives you access to dozens of AI models —
including several that are completely free to use.

1. Go to **openrouter.ai** and create an account (free)
2. In your dashboard, click **API Keys**
3. Generate a new key and copy it — it starts with `sk-or-v1-...`

**Result:** you have a free key ready to use.

## Step 2: Tell Claude Code to use it

Claude Code talks to Anthropic's servers by default. You're going to
redirect it to OpenRouter instead — the interface doesn't change, only where
the requests go.

Swap in your real key, then paste this into Claude Code:

```
Configure Claude Code to use OpenRouter with this key: sk-or-v1-YOUR-KEY
and this model: google/gemini-2.5-flash.
Add ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, and an empty ANTHROPIC_API_KEY
to my shell profile, reload it, then add the same variables to the env
block in ~/.claude/settings.json.
```

**Result:** Claude Code now sends its requests to a free model through
OpenRouter, with the same interface you already know.

## Step 3: Check it actually switched

Restart Claude Code and ask it directly:

```
What model are you running right now?
```

If it names the free model you configured, you're done. No more limits on
that model — run it as much as you want, for free.

---

## The free models worth knowing

Swap the model name in Step 2 for whichever of these matches your task:

- `google/gemini-2.5-flash` — fast, all-purpose, the best starting point
- `deepseek/deepseek-chat-v3-0324:free` — strong on anything code-related
- `meta-llama/llama-4-maverick:free` — better for writing and brainstorming
- `microsoft/phi-4:free` — light and quick for simple tasks

Keep your paid Anthropic access for the work that genuinely needs the best
model. Route everything else — research, drafts, quick checks — through the
free one. That's the actual win-back-your-time move: stop treating every
task like it needs your most expensive tool.

---

Want the next layer — which AI tool to reach for and when, so you're never
guessing? Comment **STACK** and I'll send you the 3-tool setup I actually run.

👑 *Win back your time. Let the free models do the boring parts.*
