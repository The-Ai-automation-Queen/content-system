sudo python3 - <<'FIXEOF'
import ast, shutil, subprocess, sys
from datetime import datetime
from pathlib import Path
S = datetime.now().strftime("%Y%m%d-%H%M%S"); R = []

def pych(p):
    try: ast.parse(p.read_text(encoding="utf-8")); return None
    except SyntaxError as e: return str(e)

def jsch(p):
    try:
        r = subprocess.run(["node","--check",str(p)],capture_output=True,text=True,timeout=30)
        return None if r.returncode==0 else (r.stderr.strip().splitlines() or ["failed"])[-1][:150]
    except Exception: return None

def patch(path, marker, edits, label, check):
    p = Path(path)
    if not p.exists(): R.append(("SKIP",label,"not found")); return
    t = p.read_text(encoding="utf-8")
    if marker in t: R.append(("ALREADY",label,"already patched")); return
    u = t
    for old,new in edits:
        if old not in u: R.append(("FAIL",label,"code not found; NOT modified")); return
        u = u.replace(old,new,1)
    b = p.with_name(p.name+f".bak-{S}"); shutil.copy2(p,b); p.write_text(u,encoding="utf-8")
    err = check(p)
    if err: shutil.copy2(b,p); R.append(("FAIL",label,f"syntax fail, rolled back: {err}")); return
    R.append(("FIXED",label,f"backup: {b.name}"))

patch("/opt/research-hermes-bridge/research_to_hermes.py","_paid_allowed",[('''def structured_json(role: str, prompt: str) -> tuple[dict, str]:
    try:
        return groq_json(role, prompt), "groq"
    except Exception as groq_error:
        return anthropic_json(role, prompt), f"anthropic-fallback:{type(groq_error).__name__}"''','''def _paid_allowed() -> bool:
    """FREE-FIRST GATE: paid Anthropic only when HERMES_ALLOW_PAID=1."""
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
        return anthropic_json(role, prompt), f"anthropic-fallback:{type(groq_error).__name__}"''')],"hermes bridge: gate paid Anthropic",pych)

patch("/opt/hermes-autonomous/autonomous_bridge.py",'"failures"',[('''        except Exception as error:
            notify(bridge, f"Autonomous chain stopped safely for {file.name}: {error}")''','''        except Exception as error:
            fails = state.setdefault("failures", {})
            attempts = fails.get(str(file), 0) + 1
            fails[str(file)] = attempts
            if attempts >= 3:
                processed[str(file)] = {"at": datetime.now(timezone.utc).isoformat(), "failed": True, "error": str(error)[:200]}
            bridge.save_state(state)
            if attempts <= 3:
                notify(bridge, f"Autonomous chain stopped safely for {file.name} (attempt {attempts}/3): {error}")''')],"autonomous bridge: cap retries at 3",pych)

patch("/root/research-bot/config.mjs","allowPaid",[('''  repoLocalPath: process.env.REPO_LOCAL_PATH || "/root/research-inbox",
};''','''  repoLocalPath: process.env.REPO_LOCAL_PATH || "/root/research-inbox",
  // FREE-FIRST GATE: paid Haiku only when RESEARCH_ALLOW_PAID=1
  allowPaid: process.env.RESEARCH_ALLOW_PAID === "1",
};''')],"research-bot config: allowPaid flag",jsch)

patch("/root/research-bot/analyzer.mjs","config.allowPaid",[('''  } catch (groqErr) {
    console.log(`Groq analysis failed: ${groqErr.message} — falling back to Haiku`);
    try {''','''  } catch (groqErr) {
    console.log(`Groq analysis failed: ${groqErr.message}`);
    if (!config.allowPaid) {
      console.warn("Paid Haiku fallback DISABLED (set RESEARCH_ALLOW_PAID=1 to enable). Saving stub.");
      return failureAnalysis(`Free engines unavailable and paid fallback disabled. Last free error: ${groqErr.message}`);
    }
    try {''')],"research-bot analyzer: gate paid Haiku",jsch)

patch("/root/research-bot/extractors/twitter.mjs","expandTco",[("function loadCookies() {",'''async function expandTco(text) {
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
    } catch {}
  }
  return out;
}

function loadCookies() {'''),('''  return {
    title: `@${parsed.handle}: ${parsed.text.slice(0, 80)}...`,
    content: parsed.text,''','''  const expandedText = await expandTco(parsed.text);

  return {
    title: `@${parsed.handle}: ${expandedText.slice(0, 80)}...`,
    content: expandedText,''')],"research-bot twitter: expand t.co",jsch)

w = max(len(l) for _,l,_ in R)
print("\nResearch Inbox drain repair\n" + "="*66)
for st,l,d in R: print(f"  [{st:<7}] {l:<{w}}  {d}")
bad = [x for x in R if x[0]=="FAIL"]
if bad: print("\nSome patches did not apply; those files are untouched or rolled back.")
else:
    print("\nAll patched. Paid Anthropic is now OFF unless you set")
    print("RESEARCH_ALLOW_PAID=1 / HERMES_ALLOW_PAID=1. Free-only by default.")
if any(x[0]=="FIXED" for x in R):
    subprocess.run(["systemctl","daemon-reload"],timeout=30)
    r = subprocess.run(["systemctl","enable","--now","research-bot.service"],capture_output=True,text=True,timeout=60)
    print("\nresearch-bot.service:", "restarted" if r.returncode==0 else r.stderr.strip()[:150])
print("\nThe 5-min chain stays OFF until you want it:")
print("  sudo systemctl enable --now hermes-autonomous-bridge.timer")
sys.exit(1 if bad else 0)
FIXEOF
