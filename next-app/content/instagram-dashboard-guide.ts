import type { GuidePage } from "./guide-page";

export const instagramDashboardGuide = {
  "slug": "instagram-content-dashboard",
  "title": "Build Your Own Instagram Dashboard",
  "promise": "Connect Claude Code directly to Instagram’s API and build a live analytics dashboard that shows you more than any paid tool — for free.",
  "cover": "/images/guides/instagram-content-dashboard.webp",
  "coverAlt": "The blue robot princess feeds a post card into an engraved brass console displaying content performance charts",
  "seoDescription": "Build your own Instagram dashboard with Claude Code, a Node.js proxy, an HTML dashboard and Python token refresh.",
  "lumailTag": "guide-instagram-content-dashboard",
  "sourceNotes": [
    {
      "label": "Instructions restored from the screenshot supplied by the user on 20 September 2026; dashboard colours and fonts adapted to Shift & Lead. Technical concerns recorded separately.",
      "url": "https://go.tenfoldmarketing.com/contentdashboardwalkthrough"
    }
  ],
  "answer": {
    "paragraphs": [
      "You need a Creator or Business account. Personal accounts don’t have API access to insights. Switch in Instagram → Settings → Account → Switch to Professional Account. It’s free."
    ]
  },
  "sections": [
    {
      "kind": "cards",
      "heading": "What you will build",
      "items": [
        {
          "title": "📊 Live metrics",
          "body": "Reach, saves, shares, watch time — straight from Instagram."
        },
        {
          "title": "⏱ Reel watch time",
          "body": "Avg and total watch time across every reel you’ve posted."
        },
        {
          "title": "🔖 Algorithm signals",
          "body": "Saves rate and shares rate — the metrics that move the needle."
        },
        {
          "title": "📅 Best timing",
          "body": "Which days and times drive the most engagement from YOUR data."
        },
        {
          "title": "#️⃣ Hashtag performance",
          "body": "Which tags show up in your top posts vs your flops."
        },
        {
          "title": "🏆 Top & bottom posts",
          "body": "Side-by-side view of what’s working and what isn’t."
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "What you need",
      "paragraphs": [
        "Instagram Creator or Business account · Claude Code installed · Node.js installed · Python 3 installed"
      ]
    }
  ],
  "gateTeaser": {
    "heading": "Create Your Meta Developer App",
    "body": "This gives you access to Instagram’s API. You’ll create an app, add yourself as a test user, and generate a long-lived access token. Takes about 8 minutes."
  },
  "tutorial": [
    {
      "kind": "walkthrough",
      "heading": "1. Create Your Meta Developer App",
      "introduction": "This gives you access to Instagram’s API. You’ll create an app, add yourself as a test user, and generate a long-lived access token. Takes about 8 minutes.",
      "blocks": [
        {
          "kind": "heading",
          "text": "1.1 — Create the App"
        },
        {
          "kind": "list",
          "items": [
            "Go to developers.facebook.com and log in with your Facebook account.",
            "Click My Apps → Create App",
            "Filter by ALL, then select Manage Messaging & content on Instagram → click Next",
            "Select a business portfolio if you have one — if not, choose \"I don’t want to connect a business portfolio yet\" → click Next",
            "No requirements needed — just click Next and then Create App"
          ]
        },
        {
          "kind": "heading",
          "text": "1.2 — Add Instagram Basic Display"
        },
        {
          "kind": "list",
          "items": [
            "In your app dashboard, find Instagram Basic Display → click Set Up",
            "Scroll down and click Create New App",
            "For all three URI fields, enter: https://localhost",
            "Click Save Changes"
          ]
        },
        {
          "kind": "heading",
          "text": "1.3 — Add Yourself as a Test User"
        },
        {
          "kind": "note",
          "text": "Don’t skip this. If you do, nothing will work and you’ll lose your mind figuring out why.",
          "icon": "⚠️"
        },
        {
          "kind": "list",
          "items": [
            "In the left sidebar: Roles → Roles",
            "Under Instagram Testers → Add Instagram Testers → search your username → send invite",
            "On your phone: Instagram → Settings → Apps and Websites → Tester Invites → Accept"
          ]
        },
        {
          "kind": "heading",
          "text": "1.4 — Get your short-lived token"
        },
        {
          "kind": "list",
          "items": [
            "In your Meta app dashboard go to Instagram → API Setup with Instagram Login",
            "Click Generate Access Token → log in and authorize → copy the token"
          ]
        },
        {
          "kind": "heading",
          "text": "1.5 — Get your App ID and App Secret"
        },
        {
          "kind": "list",
          "items": [
            "In your app dashboard go to Settings → Basic",
            "Copy your App ID and click Show to reveal your App Secret — save both"
          ]
        },
        {
          "kind": "heading",
          "text": "1.6 — Verify token + get your User ID"
        },
        {
          "kind": "paragraph",
          "text": "Paste this URL in your browser — replace the placeholder with your short-lived token:"
        },
        {
          "kind": "code",
          "label": "Browser URL",
          "text": "https://graph.instagram.com/v21.0/me?fields=id,username&access_token=YOUR_SHORT_TOKEN"
        },
        {
          "kind": "note",
          "text": "Save the id and username values from the response.",
          "icon": "✅"
        },
        {
          "kind": "heading",
          "text": "1.7 — Get your long-lived token (60 days)"
        },
        {
          "kind": "paragraph",
          "text": "Paste this URL in your browser — replace the placeholder with your short-lived token:"
        },
        {
          "kind": "code",
          "label": "Browser URL",
          "text": "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_SHORT_TOKEN"
        },
        {
          "kind": "note",
          "text": "Save the access_token from the response. This is your long-lived token — it lasts 60 days.",
          "icon": "✅"
        },
        {
          "kind": "heading",
          "text": "1.8 — Test pulling your posts"
        },
        {
          "kind": "paragraph",
          "text": "Confirm everything is working — paste this in your browser:"
        },
        {
          "kind": "code",
          "label": "Browser URL",
          "text": "https://graph.instagram.com/v21.0/me/media?fields=id,caption,media_type,timestamp,like_count,comments_count&access_token=YOUR_LONG_LIVED_TOKEN"
        },
        {
          "kind": "note",
          "text": "You should see a JSON list of your recent posts. If you do, the API connection is working.",
          "icon": "✅"
        },
        {
          "kind": "paragraph",
          "text": "📋 Save all four values before moving on — you’ll need them in Step 2:"
        },
        {
          "kind": "code",
          "label": "Credentials",
          "text": "IG_ACCESS_TOKEN=your_long_lived_token\nIG_USER_ID=your_id_from_step_1.6\nIG_APP_ID=your_app_id_from_step_1.5\nIG_APP_SECRET=your_app_secret_from_step_1.5"
        }
      ]
    },
    {
      "kind": "walkthrough",
      "heading": "2. Set Up Your Project",
      "introduction": "Create a folder, add your credentials, and build the backend server. Claude Code writes all of this — just paste the prompts.",
      "blocks": [
        {
          "kind": "heading",
          "text": "Create the project folder and .env file"
        },
        {
          "kind": "code",
          "label": "📋 Prompt 1 — paste into Claude Code",
          "text": "Create a folder called ig-dashboard in my current directory. Inside it, create a .env file with these four variables:\n\nIG_ACCESS_TOKEN=\nIG_USER_ID=\nIG_APP_ID=\nIG_APP_SECRET=\n\nLeave the values blank — I'll fill them in."
        },
        {
          "kind": "note",
          "text": "Open the .env file and paste all four values from Step 1 before continuing. On Mac, press Command + Shift + . to reveal hidden files if you can’t see it.",
          "icon": "⚠️"
        },
        {
          "kind": "heading",
          "text": "Build the proxy server"
        },
        {
          "kind": "paragraph",
          "text": "This Node.js server sits between your browser and Instagram’s API — no npm packages needed."
        },
        {
          "kind": "code",
          "label": "📋 Prompt 2 — paste into Claude Code",
          "text": "Inside the ig-dashboard folder, create a Node.js file called proxy.js that:\n\n- Serves static HTML files from the same directory on port 3001\n- Loads IG_ACCESS_TOKEN and IG_USER_ID from the .env file in the same folder\n- Has a GET /api/ig/account endpoint that calls https://graph.instagram.com/me with fields: id, username, biography, followers_count, media_count, profile_picture_url\n- Has a GET /api/ig/media endpoint that fetches the last 50 posts with fields: id, caption, media_type, timestamp, like_count, comments_count, media_url, thumbnail_url, permalink — then for each post fetches insights from /{id}/insights. For VIDEO posts use metrics: reach,saved,views,shares,total_interactions,ig_reels_avg_watch_time,ig_reels_video_view_total_time. For IMAGE and CAROUSEL_ALBUM posts use metrics: impressions,reach,saved,shares,total_interactions\n- Uses only built-in Node.js modules — no npm installs\n- Adds CORS headers to all responses"
        },
        {
          "kind": "note",
          "text": "Why separate metrics by post type? Instagram’s API throws an error if you request video metrics on a photo post or vice versa. The prompt above already has the correct metric names for each type.",
          "icon": "💡"
        }
      ]
    },
    {
      "kind": "walkthrough",
      "heading": "3. Build the Dashboard",
      "introduction": "One prompt. Claude Code writes the entire dashboard — all sections, all charts, all styling. Pure HTML, CSS, and JavaScript. No frameworks, no dependencies.",
      "blocks": [
        {
          "kind": "note",
          "text": "Paste the full prompt as-is — don’t break it up. Claude Code handles the whole thing in one shot.",
          "icon": "💡"
        },
        {
          "kind": "code",
          "label": "📋 Prompt 3 — the full dashboard",
          "text": "Create a file called content-dashboard.html in the ig-dashboard folder. It fetches from http://localhost:3001/api/ig/account and http://localhost:3001/api/ig/media on load. Pure HTML, CSS, JavaScript — no external libraries.\n\nDesign system:\nCSS variables: --bg #FFFFFF, --bg2 #FAF7F2, --bg3 #F2F4FF, --bg4 #E8EDFF, --accent #2C4BE0, --green #18794E, --blue #2C4BE0, --purple #6547A5, --text #24211D, --text2 #57534E, --text3 #78716C, --border rgba(36,33,29,0.16). Load Playfair Display, Source Serif 4, Inter and Space Mono from Google Fonts. Use Playfair Display for headings, Source Serif 4 for reading text, Inter for controls and Space Mono for compact labels. Use #FF5733 for heading accents.\n\nLayout:\nSticky left sidebar (200px) + scrollable main content. Sidebar has a logo mark, section labels, nav links with active state (cobalt left border + cobalt text) driven by IntersectionObserver scroll-spy. Refresh Data button and last-updated timestamp at the bottom of the sidebar.\n\nEngagement rate formula: (likes + comments + saves + shares) / reach x 100. Use reach for VIDEO posts, impressions for IMAGE/CAROUSEL as fallback. Color tiers: ≥5% green, ≥2% cobalt, below grey.\n\nSection 1 — Profile bar (id=\"overview\"):\nAvatar image (or 📸 placeholder), @username in large bold, biography, then 3 stat blocks: Followers, Posts, Reach Rate (avgReach / followers x 100 shown as %).\n\nSection 2 — Summary Stats:\n6 stat cards in one row: Avg Likes (color #FF5733), Avg Comments (blue), Avg Reach (purple), Avg Saves (green), Avg Engagement Rate (cobalt, 2 decimal places), Total Reel Views. Each shows \"per post\" or relevant subtext.\n\nSection 3 — Reel Watch Time (id=\"watchtime\", only if VIDEO posts have ig_reels_avg_watch_time data):\n4 cards with colored top borders: Avg Watch Time in seconds (purple) — ig_reels_avg_watch_time is in ms so divide by 1000, Total Watch Time in minutes (cobalt) — sum ig_reels_video_view_total_time / 60000, Total Views (green), Best Watch Time (blue) showing the reel with highest avg watch time and first 28 chars of its caption.\n\nSection 4 — Algorithm Signals (id=\"signals\"):\n2 large cards side by side. Saves Rate: total saves / total reach x 100 in green, show \"X total saves · Y% of likes become saves\", note \"Saves = strongest signal to the algorithm. Anything above 2% is solid.\" Shares Rate: total shares / total reach x 100 in blue, show total shares count, note \"Shares push content beyond your audience. 1%+ on reach is strong.\"\n\nSection 5 — Top & Bottom Performers (id=\"best\"):\nTwo columns. Left: Top 3 (cobalt header). Right: Bottom 3 (grey header). Each row: rank number, thumbnail (or emoji placeholder), caption truncated to one line, time ago + post type below, like count and engagement rate on the right.\n\nSection 6 — Engagement Over Time (id=\"timeline\"):\nBar chart of the last 20 posts in chronological order. Each bar = likes + comments. Bar gradient from cobalt (#2C4BE0) at top to transparent at bottom. Show value above bar, date (M/D) below. Height proportional to max value, minimum 3px.\n\nSection 7 — Best Time to Post (id=\"timing\"):\nTwo side-by-side horizontal bar charts. Left: By Day of week — cobalt bars, best day highlighted green with bold label. Right: By Time bucket (6–9am, 9–12pm, 12–3pm, 3–6pm, 6–9pm, 9pm+, Late 0–5am) — blue bars, best time highlighted green. Each row shows avg engagement % and post count. Only show time buckets that have at least 1 post.\n\nSection 8 — Hashtag Performance (id=\"hashtags\", only if any hashtag used 2+ times):\nCard with header row (Tag / Uses / Avg Eng / Avg Likes). Each hashtag row: tag name in blue, proportional bar, use count, avg engagement %, avg likes. Sorted by avg engagement descending. Max 12 tags.\n\nSection 9 — All Posts Grid (id=\"allposts\"):\nSort pills: Likes, Comments, Reach, Eng, Saves, Views, Recent. Grid of cards, auto-fill columns min 220px. Each card: thumbnail image (or emoji placeholder), post type badge (Reel=purple, Photo=blue, Carousel=orange), caption with 2-line clamp, 4 metric chips (Likes in #FF5733, Comments in blue, Reach in purple, 4th chip = Views in cobalt for VIDEO or Saves in green for IMAGE/CAROUSEL). For reels with watch time: show avg watch time and saves below metrics. Footer: engagement rate pill (colored by tier), time ago, link to open post on Instagram. Top 3 cards (after current sort) get a cobalt border. Clicking the card opens the post permalink in a new tab."
        },
        {
          "kind": "paragraph",
          "text": "After Claude finishes, extend it with follow-up prompts like:"
        },
        {
          "kind": "list",
          "items": [
            "\"Change the accent color to blue\"",
            "\"Add a section showing my most used words across all captions\"",
            "\"Make the post cards bigger and show more of the caption\""
          ]
        }
      ]
    },
    {
      "kind": "walkthrough",
      "heading": "4. Token Auto-Refresh",
      "introduction": "Instagram tokens expire after 60 days. This step makes refresh fully automatic — set it once, forget it forever.",
      "blocks": [
        {
          "kind": "note",
          "text": "Don’t skip this. In 60 days your dashboard returns \"Invalid OAuth 2.0 Access Token\" and you have to regenerate everything. Takes 2 minutes now.",
          "icon": "⚠️"
        },
        {
          "kind": "heading",
          "text": "Build the refresh script"
        },
        {
          "kind": "code",
          "label": "📋 Prompt 4 — token refresh script",
          "text": "Inside the ig-dashboard folder, create a Python script called refresh_token.py that:\n\n- Reads IG_ACCESS_TOKEN from the .env file in the same directory\n- Calls https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=CURRENT_TOKEN\n- Gets the new token from the JSON response\n- Overwrites the IG_ACCESS_TOKEN value in the .env file with the new token\n- Logs each refresh with a timestamp to token_refresh.log in the same folder\n- If the refresh fails: logs a FAILED entry AND sends a macOS desktop notification using osascript\n- Uses only Python standard library — no pip installs"
        },
        {
          "kind": "heading",
          "text": "Set up the cron job"
        },
        {
          "kind": "paragraph",
          "text": "Find your Python path first:"
        },
        {
          "kind": "code",
          "label": "Terminal",
          "text": "which python3"
        },
        {
          "kind": "code",
          "label": "📋 Prompt 5 — cron job",
          "text": "Set up a cron job that runs refresh_token.py every 58 days at 9am. Use the absolute path to Python (from `which python3`) and the absolute path to the script. Verify the cron entry was created and show it to me."
        },
        {
          "kind": "heading",
          "text": "Test it now"
        },
        {
          "kind": "code",
          "label": "Terminal",
          "text": "python3 /absolute/path/to/ig-dashboard/refresh_token.py"
        },
        {
          "kind": "note",
          "text": "You should see a timestamp log entry confirming the token was refreshed and .env was updated.",
          "icon": "✅"
        },
        {
          "kind": "note",
          "text": "macOS cron permission issue: If cron can’t access your files, go to System Settings → Privacy & Security → Full Disk Access → add /usr/sbin/cron.",
          "icon": "⚠️"
        }
      ]
    },
    {
      "kind": "walkthrough",
      "heading": "5. Run It",
      "introduction": "Start the server, open the browser, you’re live.",
      "blocks": [
        {
          "kind": "code",
          "label": "Terminal",
          "text": "cd ig-dashboard\nnode proxy.js"
        },
        {
          "kind": "code",
          "label": "Then open this in your browser",
          "text": "http://localhost:3001/content-dashboard.html"
        },
        {
          "kind": "note",
          "text": "Your dashboard is live with real Instagram data. Use the sidebar to navigate, click any post to open it on Instagram, and use the sort buttons to rank by any metric.",
          "icon": "🎉"
        },
        {
          "kind": "heading",
          "text": "Common errors"
        },
        {
          "kind": "table",
          "rows": [
            [
              "Invalid OAuth 2.0 Access Token",
              "Token expired. Run refresh_token.py manually."
            ],
            [
              "does not support metric X",
              "Don’t change the metrics in proxy.js — the ones in Prompt 2 are already correct for each post type."
            ],
            [
              "Insights show \"—\" everywhere",
              "Your account is Personal. Switch to Creator in Instagram Settings → Account."
            ],
            [
              "Cron job not running",
              "Add /usr/sbin/cron to System Settings → Privacy → Full Disk Access."
            ],
            [
              "Port 3001 already in use",
              "Run lsof -ti :3001 | xargs kill -9 then restart."
            ]
          ]
        }
      ]
    }
  ],
  "conclusion": {
    "heading": "🎯 You’re done.",
    "paragraphs": [
      "Free Instagram analytics dashboard. Direct API connection. No subscriptions, no middlemen, no monthly fees."
    ],
    "finishLine": "",
    "extensions": [
      "YouTube integration — same dashboard, add a YouTube tab via YouTube Data API",
      "TikTok integration — pull TikTok analytics the same way",
      "Email alerts — get notified when a post is over or underperforming",
      "Weekly PDF report — auto-generated every Sunday"
    ]
  },
  "related": [
    {
      "slug": "claude",
      "title": "Should you use Claude?",
      "reason": "Understand where Claude Code fits alongside Claude’s everyday tools.",
      "cover": "/images/guides/claude.webp"
    },
    {
      "slug": "what-should-you-never-share-with-ai",
      "title": "The 3-Question Check Before You Paste Anything Into AI",
      "reason": "Check what stays private before working with account data or credentials.",
      "cover": "/images/guides/learn-master.webp"
    },
    {
      "slug": "what-is-a-prompt",
      "title": "The 4-Line Prompt That Works in Any AI",
      "reason": "Give your coding tool clearer follow-up instructions when you extend the dashboard.",
      "cover": "/images/guides/what-is-a-prompt.webp"
    }
  ]
} as const satisfies GuidePage;
