#!/usr/bin/env python3
"""RVD daily checklist, date-aware. No deps. Run: py today.py
Prints whether today is a Gulf posting day (Tue/Wed/Thu) and the right list."""
from datetime import datetime

now = datetime.now()
wd = now.weekday()  # Mon=0 .. Sun=6
day = now.strftime("%A %d/%m/%Y")
posting_days = {1, 2, 3}  # Tue, Wed, Thu (Gulf working week, mid-week core)
is_post = wd in posting_days
weekend_gulf = wd in {5, 6}  # Sat, Sun = Gulf weekend

print(f"== RVD LinkedIn :: {day} ==")
print("Region target: GULF/MENA (EDR-014). Window: publish 10:00-14:00 Dubai, "
      "never after 16:00. Contractions OK on LinkedIn.\n")

if weekend_gulf:
    print("Gulf weekend. Light touch only:")
    print("  [ ] Optional: 2-3 comments on Gulf ICP posts (keep fingerprint warm)")
    print("  [ ] Re-enter any live post's thread if day 2-3 (Builder/Grower reward)")
    print("  [ ] No new post (Gulf audience off; save it for Tue-Thu)")
    raise SystemExit

print("Daily baseline (every weekday, ~40 min):")
print("  [ ] 5 substantive comments on GULF/MENA ICP posts only")
print("      (UAE/KSA leaders, Dubai/GCC founders, MENA L&D/transformation)")
print("  [ ] Warm-list: up to 5 personalised requests to Gulf 2nd/3rd-deg engagers")
print("  [ ] Comment only inside the 3 anchors (judgment / vendor-trap / readiness)")
print("  [ ] Check any live post at its day 3 / 7 / 10 mark\n")

if is_post:
    print(">>> POSTING DAY <<<")
    print("  [ ] Pre-post: 5 comments on Gulf ICP posts in the hour before publish")
    print("  [ ] Publish 10:00-14:00 Dubai. No in-post link. 0-3 hashtags. Format")
    print("      != yesterday's format. Document if it can be (saveable).")
    print("  [ ] 0-30 min: reply to EVERY comment")
    print("  [ ] First 2 hrs: 2 of your own value-add comments on the post")
    print("  [ ] 4-6 hrs: self-repost ONCE (once only)")
    print("  [ ] Set reminder: re-enter this thread day 2 and day 3")
else:
    print("Not a posting day (post Tue/Wed/Thu). Today = engine + nurture only.")
    print("  [ ] If a recent post is live, run its day 2-3 thread re-entry")

print("\nGoverning metric: saves + DMs per impression, NOT reach or likes.")
