"""
mark-used.py — flip inbox note status READY -> USED, add vault_entry backref.

Usage:
    py mark-used.py <inbox-filename> <vault-relative-path>

Example:
    py mark-used.py 2026-04-18-article-i-accidentally...md linkedin/088-02-05-2026-linkedin-post-foo.md
"""
import re
import sys
from datetime import datetime
from pathlib import Path

INBOX = Path(r"C:\Users\fatih\OneDrive\Obsidian Mind\research-inbox")


def main():
    if len(sys.argv) < 3:
        print("Usage: py mark-used.py <inbox-filename> <vault-relative-path>")
        sys.exit(1)

    note_name, vault_path = sys.argv[1], sys.argv[2]
    note_fp = INBOX / note_name
    if not note_fp.exists():
        print(f"ERROR: not found: {note_fp}")
        sys.exit(1)

    text = note_fp.read_text(encoding="utf-8", errors="ignore")
    today = datetime.now().strftime("%Y-%m-%d")

    if re.search(r"^status:\s*READY", text, flags=re.MULTILINE):
        text = re.sub(r"^status:\s*READY", "status: USED", text, count=1, flags=re.MULTILINE)
    elif re.search(r"^status:", text, flags=re.MULTILINE):
        text = re.sub(r"^status:.*$", "status: USED", text, count=1, flags=re.MULTILINE)
    else:
        text = text.replace("---\n", f"---\nstatus: USED\n", 1)

    if "vault_entry:" in text:
        text = re.sub(r"^vault_entry:.*$", f"vault_entry: {vault_path}", text, count=1, flags=re.MULTILINE)
    else:
        text = re.sub(
            r"^status: USED$",
            f"status: USED\nvault_entry: {vault_path}\nused_date: {today}",
            text,
            count=1,
            flags=re.MULTILINE,
        )

    note_fp.write_text(text, encoding="utf-8")
    print(f"OK: {note_name} -> USED, vault_entry={vault_path}")


if __name__ == "__main__":
    main()
