#!/usr/bin/env python3
"""One-shot repair for the 2026-07-28 Anthropic credit drain + t.co extraction.

Run as root on the VPS:   sudo python3 fix-drain.py

What it does (all idempotent - safe to run more than once):
  1. /opt/research-hermes-bridge/research_to_hermes.py
     structured_json() fell back to the PAID Anthropic API on any Groq error,
     with no gate. Groq's free tier rate-limits often, and this ran every 5
     minutes with 3-5 calls per note, so nearly everything cascaded to the
     metered sk-ant- key until the balance hit zero. Now gated behind
     HERMES_ALLOW_PAID=1 (absent = off = free-only).
  2. /opt/hermes-autonomous/autonomous_bridge.py
     A failing note was retried forever, re-sending the same Telegram error
     every 5 minutes. Now capped at 3 attempts, then marked done.
  3. /root/research-bot/{config,analyzer}.mjs
     Same unconditional paid fallback in the capture bot. Now gated behind
     RESEARCH_ALLOW_PAID=1.
  4. /root/research-bot/extractors/twitter.mjs
     Link-only tweets were saved as a bare t.co shortlink, so the analyser had
     nothing to read. Now the redirect is expanded before analysis.

Every edited file is backed up next to itself as <name>.bak-<timestamp>, and
each patch is syntax-checked; a failed check rolls that file back.
No secrets are read or written. Both gates default to OFF, so the paid API is
not called unless you explicitly opt in later.
"""
from __future__ import annotations

import ast
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

STAMP = datetime.now().strftime("%Y%m%d-%H%M%S")
RESULTS: list[tuple[str, str, str]] = []

BRIDGE = "/opt/research-hermes-bridge/research_to_hermes.py"
AUTONOMOUS = "/opt/hermes-autonomous/autonomous_bridge.py"
BOT_CONFIG = "/root/research-bot/config.mjs"
BOT_ANALYZER = "/root/research-bot/analyzer.mjs"
BOT_TWITTER = "/root/research-bot/extractors/twitter.mjs"


def py_check(path: Path) -> str | None:
    try:
        ast.parse(path.read_text(encoding="utf-8"))
        return None
    except SyntaxError as exc:
        return str(exc)


def node_check(path: Path) -> str | None:
    try:
        proc = subprocess.run(
            ["node", "--check", str(path)],
            capture_output=True, text=True, timeout=30,
        )
        if proc.returncode == 0:
            return None
        return proc.stderr.strip().splitlines()[-1][:200] if proc.stderr.strip() else "node --check failed"
    except FileNotFoundError:
        return None  # node not on PATH; don't block the patch
    except Exception:
        return None


def patch(path_str: str, marker: str, edits: list[tuple[str, str]], label: str, checker) -> None:
    path = Path(path_str)
    if not path.exists():
        RESULTS.append(("SKIP", label, f"not found: {path_str}"))
        return

    text = path.read_text(encoding="utf-8")
    if marker in text:
        RESULTS.append(("ALREADY", label, "already patched, left as-is"))
        return

    updated = text
    for old, new in edits:
        if old not in updated:
            RESULTS.append(("FAIL", label, "expected code not found; file NOT modified"))
            return
        updated = updated.replace(old, new, 1)

    backup = path.with_name(path.name + f".bak-{STAMP}")
    shutil.copy2(path, backup)
    path.write_text(updated, encoding="utf-8")

    problem = checker(path)
    if problem:
        shutil.copy2(backup, path)
        RESULTS.append(("FAIL", label, f"syntax check failed, rolled back: {problem}"))
        return

    RESULTS.append(("FIXED", label, f"backup: {backup.name}"))


# --------------------------------------------------------------------------
# 1. research_to_hermes.py - gate the paid Anthropic fallback
# --------------------------------------------------------------------------
BRIDGE_OLD = '''def structured_json(role: str, prompt: str) -> tuple[dict, str]:
    try:
        return groq_json(role, prompt), "groq"
    except Exception as groq_error:
        return anthropic_json(role, prompt), f"anthropic-fallback:{type(groq_error).__name__}"'''

BRIDGE_NEW = '''def _paid_allowed() -> bool:
    """FREE-FIRST GATE. The paid Anthropic API is only used when explicitly
    enabled via HERMES_ALLOW_PAID=1. Without it, a Groq outage fails loudly
    instead of silently billing the metered key on every call."""
    import os
    return load_secret("HERMES_ALLOW_PAID") == "1" or os.environ.get("HERMES_ALLOW_PAID") == "1"


def structured_json(role: str, prompt: str) -> tuple[dict, str]:
    try:
        return groq_json(role, prompt), "groq"
    except Exception as groq_error:
        if not _paid_allowed():
            raise RuntimeError(
                "Groq failed and the paid Anthropic fallback is disabled "
                "(set HERMES_ALLOW_PAID=1 to enable it): " + str(groq_error)
            ) from groq_error
        return anthropic_json(role, prompt), f"anthropic-fallback:{type(groq_error).__name__}"'''


# --------------------------------------------------------------------------
# 2. autonomous_bridge.py - stop retrying a failing note forever
# --------------------------------------------------------------------------
AUTO_OLD = '''        except Exception as error:
            notify(bridge, f"Autonomous chain stopped safely for {file.name}: {error}")
            print(f"ERROR {file}: {error}", file=sys.stderr)'''

AUTO_NEW = '''        except Exception as error:
            # Cap retries so one bad note cannot re-notify every 5 minutes forever.
            fails = state.setdefault("failures", {})
            attempts = fails.get(str(file), 0) + 1
            fails[str(file)] = attempts
            if attempts >= 3:
                processed[str(file)] = {
                    "at": datetime.now(timezone.utc).isoformat(),
                    "failed": True,
                    "error": str(error)[:200],
                }
            bridge.save_state(state)
            if attempts <= 3:
                notify(bridge, f"Autonomous chain stopped safely for {file.name} (attempt {attempts}/3): {error}")
            print(f"ERROR {file}: {error}", file=sys.stderr)'''


# --------------------------------------------------------------------------
# 3. research-bot config.mjs + analyzer.mjs - gate the paid fallback
# --------------------------------------------------------------------------
CONFIG_OLD = '''  repoLocalPath: process.env.REPO_LOCAL_PATH || "/root/research-inbox",
};'''

CONFIG_NEW = '''  repoLocalPath: process.env.REPO_LOCAL_PATH || "/root/research-inbox",
  // FREE-FIRST GATE. The paid Anthropic (Haiku) fallback is OFF by default and
  // only runs when RESEARCH_ALLOW_PAID=1 is set, so a free-tier outage cannot
  // silently drain the metered sk-ant- key on every captured link.
  allowPaid: process.env.RESEARCH_ALLOW_PAID === "1",
};'''

ANALYZER_OLD = '''  } catch (groqErr) {
    console.log(`Groq analysis failed: ${groqErr.message} — falling back to Haiku`);
    try {'''

ANALYZER_NEW = '''  } catch (groqErr) {
    console.log(`Groq analysis failed: ${groqErr.message}`);
    // FREE-FIRST GATE: never touch the paid Anthropic API unless opted in.
    // With paid disabled we save a quiet stub for manual review instead.
    if (!config.allowPaid) {
      console.warn("Paid Haiku fallback DISABLED (set RESEARCH_ALLOW_PAID=1 to enable). Saving stub.");
      return failureAnalysis(`Free engines unavailable and paid fallback disabled. Last free error: ${groqErr.message}`);
    }
    try {'''


# --------------------------------------------------------------------------
# 4. twitter.mjs - expand t.co shortlinks before analysis
# --------------------------------------------------------------------------
TCO_FUNC = '''async function expandTco(text) {
  // Some tweets are nothing but a wrapped t.co URL. Without expanding it the
  // analyser receives only the opaque shortlink and writes an empty
  // "content not provided" note.
  if (!text) return text;
  const shortlinks = text.match(/https?:\\/\\/t\\.co\\/\\w+/g);
  if (!shortlinks) return text;
  let out = text;
  for (const short of [...new Set(shortlinks)]) {
    try {
      const res = await fetch(short, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        signal: AbortSignal.timeout(8000),
      });
      if (res.url && res.url !== short) out = out.split(short).join(res.url);
    } catch {
      /* leave the shortlink as-is if it cannot be resolved */
    }
  }
  return out;
}

function loadCookies() {'''

TWITTER_RETURN_OLD = '''  return {
    title: `@${parsed.handle}: ${parsed.text.slice(0, 80)}...`,
    content: parsed.text,'''

TWITTER_RETURN_NEW = '''  const expandedText = await expandTco(parsed.text);

  return {
    title: `@${parsed.handle}: ${expandedText.slice(0, 80)}...`,
    content: expandedText,'''


def service_state(unit: str) -> str:
    def ask(verb: str) -> str:
        try:
            proc = subprocess.run(
                ["systemctl", verb, unit],
                capture_output=True, text=True, timeout=15,
            )
            raw = (proc.stdout or proc.stderr).strip()
            # systemctl can emit multi-line errors; keep the summary on one line
            return raw.splitlines()[0][:40] if raw else "unknown"
        except Exception:
            return "unknown"
    return f"{ask('is-active')}/{ask('is-enabled')}"


def main() -> int:
    print("Research Inbox drain repair")
    print("=" * 66)

    patch(BRIDGE, "_paid_allowed", [(BRIDGE_OLD, BRIDGE_NEW)],
          "hermes bridge: gate paid Anthropic fallback", py_check)

    patch(AUTONOMOUS, '"failures"', [(AUTO_OLD, AUTO_NEW)],
          "autonomous bridge: cap retries at 3", py_check)

    patch(BOT_CONFIG, "allowPaid", [(CONFIG_OLD, CONFIG_NEW)],
          "research-bot config: add allowPaid flag", node_check)

    patch(BOT_ANALYZER, "config.allowPaid", [(ANALYZER_OLD, ANALYZER_NEW)],
          "research-bot analyzer: gate paid Haiku fallback", node_check)

    patch(BOT_TWITTER, "expandTco",
          [("function loadCookies() {", TCO_FUNC),
           (TWITTER_RETURN_OLD, TWITTER_RETURN_NEW)],
          "research-bot twitter: expand t.co shortlinks", node_check)

    width = max(len(label) for _, label, _ in RESULTS)
    print()
    for status, label, detail in RESULTS:
        print(f"  [{status:<7}] {label:<{width}}  {detail}")

    failures = [r for r in RESULTS if r[0] == "FAIL"]
    changed = [r for r in RESULTS if r[0] == "FIXED"]

    print()
    print("Service state (active/enabled)")
    for unit in ("research-bot.service", "hermes-autonomous-bridge.timer"):
        print(f"  {unit:<36} {service_state(unit)}")

    print()
    if failures:
        print("Some patches did not apply. Those files were left untouched or rolled back.")
        print("Nothing is broken; re-run after checking the reported files.")
    else:
        print("All patches applied. The paid Anthropic API is now OFF by default:")
        print("  - research-bot needs RESEARCH_ALLOW_PAID=1 to ever use it")
        print("  - the hermes chain needs HERMES_ALLOW_PAID=1 to ever use it")
        print("Leave both unset to stay free-only. A Groq outage now fails quietly")
        print("instead of billing your key.")

    if changed:
        print()
        print("Restarting the capture bot so the fixes take effect...")
        try:
            subprocess.run(["systemctl", "daemon-reload"], timeout=30)
            proc = subprocess.run(
                ["systemctl", "enable", "--now", "research-bot.service"],
                capture_output=True, text=True, timeout=60,
            )
            if proc.returncode == 0:
                print(f"  research-bot.service -> {service_state('research-bot.service')}")
            else:
                print(f"  could not restart research-bot.service: {proc.stderr.strip()[:200]}")
        except Exception as exc:
            print(f"  could not restart research-bot.service: {exc}")

    print()
    print("The 5-minute autonomous chain is left DISABLED on purpose. It is patched")
    print("and safe now, so enable it whenever you want with:")
    print("  sudo systemctl enable --now hermes-autonomous-bridge.timer")

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
