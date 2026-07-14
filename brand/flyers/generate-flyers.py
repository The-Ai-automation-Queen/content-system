#!/usr/bin/env python3
"""Flyers v2: full-bleed B&W photo, dark gradient, electric accents. HTML -> PNG."""
import os, subprocess, base64

SCRATCH = "/tmp/claude-0/-home-user/12fcd399-7ad0-5f79-b19d-82d8017bf564/scratchpad/flyers"
OUT = "/home/user/content-system/brand/flyers"
IMG = "/home/user/content-system/main-site"
os.makedirs(SCRATCH, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

FLYERS = [
    {
        "name": "masterclass",
        "photo": f"{IMG}/Portrait.jpeg", "pos": "center 20%",
        "kicker": "LIVE MASTERCLASS · 90 MINUTES",
        "h1": ['Leave with an', 'AI employee.', '<span class="acc">Running.</span>'],
        "bullets": ["One real task, off your plate for good",
                    "Set up live, step by step, with me",
                    "No code. No jargon. No homework."],
        "cta": "SEATS LIMITED · LINK IN BIO",
    },
    {
        "name": "bootcamp",
        "photo": f"{IMG}/fatiha-desk.jpg", "pos": "72% center",
        "kicker": "LIVE BOOTCAMP · 2 DAYS",
        "h1": ['Two days.', 'Then it runs', '<span class="acc">without you.</span>'],
        "bullets": ["Day 1: your AI sounds like you, inbox handled",
                    "Day 2: a month of content, one system live",
                    "Replays and every template included"],
        "cta": "THE WAITLIST HEARS THE DATE FIRST · LINK IN BIO",
    },
    {
        "name": "get-it-done",
        "photo": f"{IMG}/fatiha-studio.jpg", "pos": "center 30%",
        "kicker": "GET IT DONE DAY · MAX 10 SEATS",
        "h1": ['Built', '<span class="acc">before dinner.</span>'],
        "bullets": ["The half-finished automation finally works",
                    "You build it, I am beside you",
                    "Nobody leaves with a to-do list"],
        "cta": "TEN SEATS ONLY · LINK IN BIO",
    },
]

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:100vw;height:100vh;overflow:hidden}}
.stage{{position:relative;width:100vw;height:100vh;background:#0C0C10}}
.photo{{position:absolute;inset:0;background-image:url(data:image/jpeg;base64,{photo_b64});
  background-size:cover;background-position:{pos};filter:grayscale(1) contrast(1.05)}}
.shade{{position:absolute;inset:0;background:linear-gradient(to top,
  rgba(10,10,14,0.96) 0%, rgba(10,10,14,0.82) 30%, rgba(10,10,14,0.35) 58%, rgba(10,10,14,0.05) 80%)}}
.topline{{position:absolute;top:0;left:0;right:0;height:16px;background:#2C4BE0}}
.kicker{{position:absolute;top:56px;left:64px;background:#2C4BE0;color:#fff;
  font-family:'Space Mono',monospace;font-size:24px;letter-spacing:5px;padding:14px 22px;border-radius:4px}}
.block{{position:absolute;left:64px;right:64px;bottom:150px}}
h1{{font-family:'Playfair Display',Georgia,serif;font-weight:400;color:#fff;
  font-size:108px;line-height:1.04;letter-spacing:-1px;margin-bottom:34px}}
h1 .acc{{color:#8FA6FF;font-style:italic}}
.rule{{width:220px;height:7px;background:#2C4BE0;margin-bottom:34px}}
.bullets div{{font-family:'Inter',Arial,sans-serif;font-weight:500;color:#EDEDF2;
  font-size:34px;line-height:1.45;margin-bottom:14px}}
.bullets span{{color:#8FA6FF;font-weight:700;margin-right:14px}}
.who{{margin-top:30px;font-family:'Space Mono',monospace;color:#A9A9B4;font-size:23px;letter-spacing:2px}}
.who b{{color:#fff;font-weight:700}}
.cta{{position:absolute;left:0;right:0;bottom:0;height:96px;background:#2C4BE0;display:flex;
  align-items:center;justify-content:center;font-family:'Inter',Arial,sans-serif;
  font-weight:700;color:#fff;font-size:31px;letter-spacing:3px}}
</style></head><body>
<div class="stage">
  <div class="photo"></div>
  <div class="shade"></div>
  <div class="topline"></div>
  <div class="kicker">{kicker}</div>
  <div class="block">
    <h1>{h1}</h1>
    <div class="rule"></div>
    <div class="bullets">{bullets}</div>
    <div class="who"><b>FATIHA CHIKH</b> · SHIFT &amp; LEAD · RUNS HER BUSINESS ON AI EMPLOYEES SHE BUILT HERSELF</div>
  </div>
  <div class="cta">{cta}</div>
</div>
</body></html>"""

for f in FLYERS:
    h1 = "<br>".join(f["h1"])
    bullets = "".join(f'<div><span>&#8594;</span>{b}</div>' for b in f["bullets"])
    page = TEMPLATE.format(photo_b64=b64(f["photo"]), pos=f["pos"], kicker=f["kicker"],
                           h1=h1, bullets=bullets, cta=f["cta"])
    src = os.path.join(SCRATCH, f["name"] + ".html")
    with open(src, "w") as fh:
        fh.write(page)
    png = os.path.join(OUT, f["name"] + "-flyer.png")
    r = subprocess.run([
        "/opt/pw-browsers/chromium", "--headless=new", "--no-sandbox",
        "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
        f"--screenshot={png}", "--window-size=1080,1430",
        "--virtual-time-budget=12000", "--proxy-server=" + os.environ.get("HTTPS_PROXY",""), f"file://{src}",
    ], capture_output=True, text=True, timeout=120)
    subprocess.run(["/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux", "-y", "-i", png,
                    "-vf", "crop=1080:1350:0:0", png + ".c.png"],
                   capture_output=True)
    if os.path.exists(png + ".c.png"):
        os.replace(png + ".c.png", png)
    ok = os.path.exists(png) and os.path.getsize(png) > 50000
    print(f["name"], "->", "OK" if ok else f"FAILED: {r.stderr[-300:]}")
