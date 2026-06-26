# Content OS — Architecture Overview

How the system works, how it's wired, and what each piece does.

---

## The Big Picture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        YOUR VPS (always on)                            │
│                                                                        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │  CRONS   │───>│  SKILLS  │───>│  FILES   │───>│    PLATFORMS     │  │
│  │(schedule)│    │ (engine) │    │ (brain)  │    │   (audience)     │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────────────┘  │
│       │                                                │               │
│       v                                                v               │
│  ┌──────────┐                                    ┌──────────┐         │
│  │ TELEGRAM │ <── failure alerts only            │ BLOTATO  │         │
│  │  (you)   │                                    │ (queue)  │         │
│  └──────────┘                                    └──────────┘         │
│                                                        │               │
│                                              YOU REVIEW & RELEASE      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## The 7-Machine Loop (runs daily + weekly)

```
  20:00                02:00              02:30              03:00
    │                    │                  │                  │
    v                    v                  v                  v
┌────────┐  ┌───────────────┐  ┌───────────────┐  ┌──────────────────┐
│  M00   │  │     M01       │  │     M01       │  │      M06         │
│ BRAIN  │  │   SIGNALS     │  │   SCRIPTS     │  │   PERFORMANCE    │
│MANAGER │  │  HARVESTER    │  │   ENGINE      │  │    TRACKER       │
│        │  │               │  │               │  │                  │
│ Asks   │  │ Scrapes web   │  │ Writes 5      │  │ Scrapes metrics  │
│ you    │  │ for trends,   │  │ draft scripts │  │ from all your    │
│ 5-7    │  │ news, signals │  │ using your    │  │ platforms.       │
│ Qs via │  │ from Apify,   │  │ brain +       │  │ Logs follower    │
│Telegram│  │ Tavily, RSS   │  │ signals +     │  │ counts + post    │
│        │  │               │  │ brand voice   │  │ engagement.      │
│ Your   │  │               │  │               │  │                  │
│answers │  │     Writes    │  │   Writes      │  │     Writes       │
│  go to │  │      to:      │  │    to:        │  │      to:         │
│   |    │  │      |        │  │     |         │  │       |          │
│   v    │  │      v        │  │     v         │  │       v          │
│personal│  │  research-    │  │  content-     │  │  performance-    │
│-brain  │  │  notes.md     │  │  vault.md     │  │  log.md          │
│ .md    │  │               │  │               │  │                  │
└────────┘  └───────────────┘  └───────────────┘  └──────────────────┘
    │                │                  │
    │    FEEDS       │     FEEDS        │
    └────────────────┘─────────>  CONTENT ENGINE reads brain + signals
                                  to write personal, relevant scripts


  WEEKLY (Monday 06:00)                    EVERY 5 MIN (when active)
         │                                        │
         v                                        v
┌──────────────────┐                    ┌──────────────────┐
│   WEEKLY-OPS     │                    │   DM-RESPONDER   │
│  (orchestrator)  │                    │     M05          │
│                  │                    │                  │
│ Runs the FULL    │                    │ Watches for      │
│ pipeline:        │                    │ comment keywords │
│                  │                    │ (e.g. "STACK")   │
│ signals ->       │                    │                  │
│ scripts ->       │                    │ IG: GHL sends DM │
│ visuals ->       │                    │ LI: Unipile DM   │
│ queue ->         │                    │ FB/YT: API reply │
│ measure          │                    │                  │
│                  │                    │ Captures lead to │
│ Full end-to-end  │                    │ reports/leads    │
│ content cycle    │                    │                  │
└──────────────────┘                    └──────────────────┘
```

---

## Content Flow: From Idea to Published Post

```
STEP 1: RESEARCH              STEP 2: WRITE                STEP 3: REVIEW
(automated daily)             (automated daily)            (YOU — 5 min)

┌─────────────┐          ┌─────────────────┐         ┌─────────────────┐
│ signal-     │          │ content-engine  │         │ YOU review in:  │
│ harvester   │─────────>│                 │────────>│                 │
│             │ signals  │ + brand voice   │ drafts  │ • GitHub        │
│ Apify       │          │ + your brain    │         │ • VS Code (SSH) │
│ Tavily      │          │ + inspiration   │         │ • Dashboard     │
│ RSS feeds   │          │   library       │         │                 │
│ Web scrapes │          │ + critic score  │         │ Clear flags:    │
└─────────────┘          └─────────────────┘         │ PERSONALIZE     │
                                                     │ VERIFY          │
                                                     │ PREP            │
                                                     │                 │
                                                     │ Mark as:        │
                                                     │ READY TO POST   │
                                                     └────────┬────────┘
                                                              │
STEP 6: MEASURE              STEP 5: DM/LEAD             STEP 4: PUBLISH
(automated daily)            (automated)                  (queue + you release)

┌─────────────────┐     ┌─────────────────┐         ┌─────────────────┐
│ performance-    │     │ dm-responder    │         │ distribution    │
│ tracker         │     │                 │         │                 │
│                 │     │ Someone         │<────────│ Queues post in  │
│ Scrapes your    │     │ comments        │ post    │ Blotato with    │
│ platforms for   │     │ keyword on      │ goes    │ future time.    │
│ engagement      │     │ your post       │ live    │                 │
│ data.           │     │     │           │         │ YOU release it  │
│                 │     │     v           │         │ in Blotato      │
│ Updates:        │     │ GHL/Unipile    │         │ dashboard.      │
│ performance-    │     │ auto-sends DM   │         │                 │
│ log.md          │     │ with lead       │         │ Never instant.  │
│                 │     │ magnet link     │         │ Never auto.     │
│ Feeds back to   │     │                 │         │ You approve.    │
│ content-engine  │     │ Lead captured   │         │                 │
│ (what works)    │     │ in GHL/reports  │         │ 6 platforms:    │
│                 │     │                 │         │ IG LI FB YT     │
│                 │     │                 │         │ Threads X       │
└─────────────────┘     └─────────────────┘         └─────────────────┘
```

---

## The Brain Layer (what makes it personal)

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR BRAND BRAIN                            │
│                                                                 │
│  ┌─────────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │  positioning/   │  │ inspiration-  │  │ personal-brain   │  │
│  │                 │  │ library/      │  │ .md              │  │
│  │ WHO you are     │  │               │  │                  │  │
│  │ WHO you serve   │  │ 21 creators   │  │ YOUR stories     │  │
│  │ Your promise    │  │ 15 hook       │  │ YOUR opinions    │  │
│  │ 6 pillars       │  │ patterns      │  │ YOUR projects    │  │
│  │ Voice & tone    │  │ Format rules  │  │ YOUR numbers     │  │
│  │                 │  │               │  │ YOUR life events │  │
│  │ NEVER changes   │  │ Reference     │  │                  │  │
│  │ unless you      │  │ only — not    │  │ Updated DAILY    │  │
│  │ rebrand         │  │ copied        │  │ by brain-manager │  │
│  └────────┬────────┘  └───────┬───────┘  └────────┬─────────┘  │
│           │                   │                    │            │
│           └───────────────────┴────────────────────┘            │
│                               │                                 │
│              EVERY DRAFT MUST PASS THROUGH ALL THREE            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files = Database

```
┌─────────────────────────────────────────────────────┐
│                  YOUR REPO FILES                     │
│                                                      │
│  content-vault.md ──── All content drafts + status   │
│  research-notes.md ─── Research findings + signals   │
│  personal-brain.md ─── Your living memory            │
│  performance-log.md ── Engagement metrics             │
│  lead-magnets.csv ──── Keywords + URLs + active flag │
│  inventory.md ──────── Tools, channels, connections  │
│  reports/ ──────────── Dated audit & run reports     │
│  deploy/logs/ ──────── Full run transcripts          │
│                                                      │
│  Git = version history. Every cron run = a commit.   │
│  Rollback any bad run: git revert <sha>              │
└─────────────────────────────────────────────────────┘
```

---

## Security Model

```
┌──────────────────────────────────────────────────┐
│                   SECURITY                        │
│                                                   │
│  SECRETS ──── Doppler (encrypted, auditable)      │
│               Never in repo. Never in markdown.   │
│                                                   │
│  PUBLISHING ── Queue-only. Never instant.         │
│                You release in Blotato.             │
│                                                   │
│  BRAND ────── Every draft passes through          │
│               positioning + inspiration library.  │
│               Critic scores gate quality.          │
│                                                   │
│  VPS ──────── SSH key-only, UFW firewall,         │
│               fail2ban, auto security updates.    │
│               Dashboard private via SSH tunnel.   │
└──────────────────────────────────────────────────┘
```

---

## Multi-Client Architecture (for resale)

```
┌───────────────────────────────────────────────────────────────┐
│                     SAME ENGINE (shared)                       │
│  skills/ ─── All 14 skills (the machine logic)                │
│  inspiration-library/ ─── Format & hook reference             │
│  dashboard/ ─── One UI serves all tenants                     │
│  deploy/ ─── Same cron/VPS infrastructure                     │
└───────────────────────────┬───────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            v               v               v
   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │  YOU (root)  │ │  CLIENT A    │ │  CLIENT B    │
   │              │ │  tenants/    │ │  tenants/    │
   │ positioning/ │ │  acme/       │ │  jones/      │
   │ brain.md     │ │              │ │              │
   │ vault.md     │ │ positioning/ │ │ positioning/ │
   │ research.md  │ │ brain.md     │ │ brain.md     │
   │ leads.csv    │ │ vault.md     │ │ vault.md     │
   │ inventory.md │ │ leads.csv    │ │ leads.csv    │
   │              │ │ tenant.json  │ │ tenant.json  │
   │ GHL + IG     │ │ HubSpot+LI  │ │ Kajabi+IG    │
   └──────────────┘ └──────────────┘ └──────────────┘

   Same skills, different brain, different tools per client.
   Onboard in ~10 minutes: copy template, fill brain, connect.
```

---

## Setup Steps (for a new operator)

```
PHASE 1 ─── VPS Bootstrap ────────── clone repo, run install.sh
     │
PHASE 2 ─── Telegram Bot ─────────── @BotFather token + @userinfobot ID
     │
PHASE 3 ─── Doppler Secrets ──────── encrypted key storage
     │
PHASE 4 ─── Claude Code Auth ─────── claude login (Max subscription)
     │
PHASE 5 ─── API Keys ─────────────── HeyGen, GHL, Unipile (as needed)
     │
PHASE 6 ─── VPS Hardening ────────── SSH lockdown, firewall, fail2ban
     │
PHASE 7 ─── Install Crons ────────── automated daily/weekly schedule
     │
PHASE 8 ─── Seed Your Brain ──────── /brain-manager seed (10 min)
     │
PHASE 9 ─── GHL Workflows ────────── one per lead-magnet keyword
     │
PHASE 10 ── Connect Platforms ─────── TikTok in Blotato, etc.
     │
PHASE 11 ── Verify End to End ─────── run full loop, check dashboard
     │
     v
   LIVE & AUTONOMOUS
   ─────────────────
   Morning: 5 scripts waiting. Pick 1-3. Release in Blotato.
   Evening: Brain-manager asks 5 Qs on Telegram. Answer in 2 min.
   Weekly:  Check performance dashboard. Glance at Blotato queue.
   Breaks:  Telegram alerts you. Fix and re-run.
```

---

## Your Daily Routine (once live)

```
  MORNING (scripts ready by 03:00)
  ├── Open dashboard or content-vault.md
  ├── 5 new scripts waiting
  ├── Pick 1-3 to post today
  ├── Clear any flags (PERSONALIZE/VERIFY)
  └── Release from Blotato queue

  EVENING (20:00 — brain-manager pings)
  ├── Answer 5-7 questions on Telegram
  ├── Takes 2-3 minutes on your phone
  └── Answers feed tomorrow's scripts

  WEEKLY (Monday — full loop runs 06:00)
  ├── Check weekly-ops report
  ├── Review Blotato queue
  └── Glance at performance dashboard

  WHEN SOMETHING BREAKS
  ├── Telegram alerts you immediately
  ├── Check deploy/logs/ for the transcript
  └── Fix and re-run: ./deploy/run-machine.sh "/skill-name" 0 0
```
