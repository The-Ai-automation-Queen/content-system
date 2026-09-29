// Guides moved onto the shared batch design from their original content
// (29/09/2026). Same steps and prompts, reorganised into the batch sections.
// Inline marks: **bold**, *italic*, [label](https://link).
import type { BatchGuide } from "./guide-batch-one";

const instagramDashboard: BatchGuide = {
  slug: "instagram-content-dashboard",
  seoTitle: "Build your own Instagram dashboard with Claude Code",
  seoDescription: "Build your own Instagram dashboard with Claude Code, a Node.js proxy, an HTML dashboard and Python token refresh.",
  title: "Build Your Own Instagram Dashboard",
  question: "Can I see my real Instagram numbers without paying for a tool?",
  answer: "Yes. Connect Claude Code directly to Instagram's API and build a live analytics dashboard for your own account, for free. You need a Creator or Business account: personal accounts don't have API access to insights. Switch in Instagram, Settings, Account, Switch to Professional Account. It's free.",
  level: "Intermediate",
  minutes: 15,
  tool: "Claude Code",
  leaveWith: "a live dashboard of your own Instagram account (reach, saves, shares, watch time, best times and hashtags), the 5 prompts that build it, and a token that refreshes itself.",
  howTo: "Work through the steps in order. Step 1 happens in Meta's developer dashboard and takes about 8 minutes. Steps 2 to 5 happen in Claude Code: you paste the prompts and it writes the code. Keep your tokens and App Secret out of any chat (see [The 3-Question Check Before You Paste Anything Into AI](/guides/what-should-you-never-share-with-ai/)).",
  hero: { title: "Build your own Instagram", accent: "dashboard.", line: "Connect Claude Code to Instagram's API and see your reach, saves, shares and watch time on one page, for free.", tool: "Claude Code", art: { kind: "scene", src: "/images/guides/instagram-content-dashboard.webp", alt: "The blue robot princess feeds a post card into an engraved brass console displaying content performance charts" } },
  flow: [
    { icon: "key", label: "Connect Instagram", note: "A Meta developer app and a token" },
    { icon: "sparkle", label: "Claude Code builds it", note: "5 prompts, no frameworks" },
    { icon: "eye", label: "You read your numbers", note: "Live, from your own account" },
  ],
  sections: [
    {
      title: "What you'll build",
      accent: "Your numbers, on one page.",
      icon: "target",
      blocks: [
        { kind: "fields", items: [
          { label: "Live metrics", text: "reach, saves, shares and watch time, straight from Instagram." },
          { label: "Reel watch time", text: "average and total watch time across every reel you've posted." },
          { label: "Algorithm signals", text: "saves rate and shares rate, the metrics that move the needle." },
          { label: "Best timing", text: "which days and times drive the most engagement, from your own data." },
          { label: "Hashtag performance", text: "which tags show up in your top posts and which in your flops." },
          { label: "Top and bottom posts", text: "a side-by-side view of what's working and what isn't." },
        ] },
        { kind: "example", label: "What you need", text: "An Instagram Creator or Business account, Claude Code, Node.js and Python 3, all installed." },
      ],
    },
    {
      title: "Step 1: Create your Meta developer app",
      icon: "key",
      blocks: [
        { kind: "p", text: "This gives you access to Instagram's API. You'll create an app, add yourself as a tester, and generate an access token that lasts 60 days. It takes about 8 minutes." },
        { kind: "p", text: "**Create the app**" },
        { kind: "list", ordered: true, items: [
          "Go to [developers.facebook.com](https://developers.facebook.com/) and log in with your Facebook account.",
          "Click **My Apps**, then **Create App**.",
          "Filter by **All**, select **Manage messaging & content on Instagram**, then click **Next**.",
          "Select a business portfolio if you have one. If not, choose \"I don't want to connect a business portfolio yet\" and click **Next**.",
          "No requirements are needed: click **Next**, then **Create App**.",
        ] },
        { kind: "shot", src: "/images/guides/instagram-steps/meta-app-setup.png", alt: "The Create an app screen in Meta for Developers, on the App details step", caption: "Create an app in Meta for Developers. You go through App details, Use cases, Business and Requirements. Personal details removed.", width: 994, height: 400 },
        { kind: "p", text: "**Add yourself as an Instagram tester.** Don't skip this: while your app is in development, only testers can connect, and without it nothing works." },
        { kind: "list", ordered: true, items: [
          "In your app dashboard, go to **App roles**, then **Roles**.",
          "Click **Add People**, choose **Instagram Tester**, enter your Instagram username and send the invite.",
          "Log in to Instagram, go to **Settings**, **Website permissions**, **Tester invites**, and accept.",
        ] },
        { kind: "p", text: "**Get your token, app ID and app secret**" },
        { kind: "shot", src: "/images/guides/instagram-steps/meta-instagram-use-case.png", alt: "The Use cases panel with Manage messaging and content on Instagram and a Customize button", caption: "Your app dashboard, under Use cases. Click Customize next to Manage messaging & content on Instagram.", width: 825, height: 170 },
        { kind: "list", ordered: true, items: [
          "In your app dashboard, open **Use cases** and click **Customize** next to **Manage messaging & content on Instagram**. Then open **API setup with Instagram business login**.",
          "Under **Generate access tokens**, click **Add account**, log in with your Instagram account and allow the permissions.",
          "Click **Generate token** next to your account and copy it. This token already lasts 60 days.",
        ] },
        { kind: "shot", src: "/images/guides/instagram-steps/meta-generate-token.png", alt: "The Token column with a Generate token link", caption: "The Generate token link sits in the Token column, next to the account you added.", width: 157, height: 119 },
        { kind: "p", text: "Then, on the same page, copy your **Instagram app ID** and **Instagram app secret**, and save both." },
        { kind: "p", text: "Then paste two addresses into your browser: the first checks your token and gives you your user ID, and the second shows a list of your recent posts. If you see the list, the connection works." },
        { kind: "locked", label: "The two browser addresses and the four values to save", prompt: 0 },
      ],
    },
    {
      title: "Step 2: Set up your project",
      icon: "folder",
      blocks: [
        { kind: "p", text: "Create a folder, add your credentials and build the backend server. Claude Code writes all of this: you paste the prompts." },
        { kind: "locked", label: "Prompt 1: the project folder and .env file", prompt: 1 },
        { kind: "p", text: "Open the .env file and paste your four values from step 1 before you continue. On a Mac, press Command + Shift + . to show hidden files if you can't see it." },
        { kind: "p", text: "Next, the proxy server. This Node.js file sits between your browser and Instagram's API, with no npm packages needed." },
        { kind: "locked", label: "Prompt 2: the proxy server", prompt: 2 },
        { kind: "fields", items: [
          { label: "Why separate metrics by post type", text: "Instagram's API returns an error if you ask for video metrics on a photo post, or the other way round. Prompt 2 already has the right metric names for each type." },
        ] },
      ],
    },
    {
      title: "Step 3: Build the dashboard",
      icon: "sparkle",
      blocks: [
        { kind: "p", text: "One prompt. Claude Code writes the whole dashboard: every section, every chart and all the styling, in plain HTML, CSS and JavaScript with no frameworks. Paste the full prompt as it is, without breaking it up." },
        { kind: "locked", label: "Prompt 3: the full dashboard", prompt: 3 },
        { kind: "p", text: "When Claude has finished, extend it with follow-up prompts like:" },
        { kind: "list", items: [
          "\"Change the accent colour to blue.\"",
          "\"Add a section showing my most used words across all captions.\"",
          "\"Make the post cards bigger and show more of the caption.\"",
        ] },
      ],
    },
    {
      title: "Step 4: Refresh the token automatically",
      icon: "clock",
      blocks: [
        { kind: "p", text: "Instagram tokens expire after 60 days. Don't skip this step: without it, in 60 days your dashboard shows \"Invalid OAuth 2.0 Access Token\" and you have to set everything up again. It takes 2 minutes now." },
        { kind: "locked", label: "Prompt 4: the token refresh script", prompt: 4 },
        { kind: "p", text: "Then set up a cron job that runs the script every 58 days. Find your Python path first, then paste prompt 5, then test the refresh once. Meta only refreshes a token that is at least 24 hours old, so run the test the day after you generated it. You should see a log entry with the time, confirming the token was refreshed and .env was updated." },
        { kind: "locked", label: "Prompt 5: the cron job", prompt: 5 },
        { kind: "fields", items: [
          { label: "On a Mac", text: "if cron can't access your files, go to System Settings, Privacy & Security, Full Disk Access, and add /usr/sbin/cron." },
        ] },
      ],
    },
    {
      title: "Step 5: Run it",
      icon: "power",
      blocks: [
        { kind: "p", text: "Start the server, open the page in your browser, and you're live with real Instagram data. Use the sidebar to move around, click any post to open it on Instagram, and use the sort buttons to rank posts by any metric." },
        { kind: "locked", label: "The commands to start it and test the refresh", prompt: 6 },
      ],
    },
  ],
  honest: "This dashboard runs on your own computer and reads only your own account. Your token and App Secret give access to that account: keep them in the .env file, never paste them into a chat, and don't share the folder. Meta also renames menus in its developer dashboard from time to time, so if a button in step 1 has a different name, look for the API setup with Instagram business login.",
  gate: { promise: "The 5 prompts, the browser addresses and the terminal commands.", action: "Unlock" },
  prompts: [
    { title: "Step 1: The browser addresses and the four values to save", text: "1. Check your token and get your user ID:\nhttps://graph.instagram.com/v21.0/me?fields=id,username&access_token=YOUR_TOKEN\n\n2. Test pulling your posts:\nhttps://graph.instagram.com/v21.0/me/media?fields=id,caption,media_type,timestamp,like_count,comments_count&access_token=YOUR_TOKEN\n\nSave these four values for step 2:\nIG_ACCESS_TOKEN=your_token\nIG_USER_ID=your_id_from_address_1\nIG_APP_ID=your_instagram_app_id\nIG_APP_SECRET=your_instagram_app_secret" },
    { title: "Prompt 1: The project folder and .env file", text: "Create a folder called ig-dashboard in my current directory. Inside it, create a .env file with these four variables:\n\nIG_ACCESS_TOKEN=\nIG_USER_ID=\nIG_APP_ID=\nIG_APP_SECRET=\n\nLeave the values blank. I'll fill them in." },
    { title: "Prompt 2: The proxy server", text: "Inside the ig-dashboard folder, create a Node.js file called proxy.js that:\n\n- Serves static HTML files from the same directory on port 3001\n- Loads IG_ACCESS_TOKEN and IG_USER_ID from the .env file in the same folder\n- Has a GET /api/ig/account endpoint that calls https://graph.instagram.com/me with fields: id, username, biography, followers_count, media_count, profile_picture_url\n- Has a GET /api/ig/media endpoint that fetches the last 50 posts with fields: id, caption, media_type, timestamp, like_count, comments_count, media_url, thumbnail_url, permalink, then for each post fetches insights from /{id}/insights. For VIDEO posts use metrics: reach,saved,views,shares,total_interactions,ig_reels_avg_watch_time,ig_reels_video_view_total_time. For IMAGE and CAROUSEL_ALBUM posts use metrics: impressions,reach,saved,shares,total_interactions\n- Uses only built-in Node.js modules, no npm installs\n- Adds CORS headers to all responses" },
    { title: "Prompt 3: The full dashboard", text: "Create a file called content-dashboard.html in the ig-dashboard folder. It fetches from http://localhost:3001/api/ig/account and http://localhost:3001/api/ig/media on load. Pure HTML, CSS, JavaScript, no external libraries.\n\nDesign system:\nCSS variables: --bg #FFFFFF, --bg2 #FAF7F2, --bg3 #F2F4FF, --bg4 #E8EDFF, --accent #2C4BE0, --green #18794E, --blue #2C4BE0, --purple #6547A5, --text #24211D, --text2 #57534E, --text3 #78716C, --border rgba(36,33,29,0.16). Load Playfair Display, Source Serif 4, Inter and Space Mono from Google Fonts. Use Playfair Display for headings, Source Serif 4 for reading text, Inter for controls and Space Mono for compact labels. Use #FF5733 for heading accents.\n\nLayout:\nSticky left sidebar (200px) + scrollable main content. Sidebar has a logo mark, section labels, nav links with active state (cobalt left border + cobalt text) driven by IntersectionObserver scroll-spy. Refresh Data button and last-updated timestamp at the bottom of the sidebar.\n\nEngagement rate formula: (likes + comments + saves + shares) / reach x 100. Use reach for VIDEO posts, impressions for IMAGE/CAROUSEL as fallback. Color tiers: ≥5% green, ≥2% cobalt, below grey.\n\nSection 1: Profile bar (id=\"overview\"):\nAvatar image (or 📸 placeholder), @username in large bold, biography, then 3 stat blocks: Followers, Posts, Reach Rate (avgReach / followers x 100 shown as %).\n\nSection 2: Summary Stats:\n6 stat cards in one row: Avg Likes (color #FF5733), Avg Comments (blue), Avg Reach (purple), Avg Saves (green), Avg Engagement Rate (cobalt, 2 decimal places), Total Reel Views. Each shows \"per post\" or relevant subtext.\n\nSection 3: Reel Watch Time (id=\"watchtime\", only if VIDEO posts have ig_reels_avg_watch_time data):\n4 cards with colored top borders: Avg Watch Time in seconds (purple), ig_reels_avg_watch_time is in ms so divide by 1000, Total Watch Time in minutes (cobalt), sum ig_reels_video_view_total_time / 60000, Total Views (green), Best Watch Time (blue) showing the reel with highest avg watch time and first 28 chars of its caption.\n\nSection 4: Algorithm Signals (id=\"signals\"):\n2 large cards side by side. Saves Rate: total saves / total reach x 100 in green, show \"X total saves · Y% of likes become saves\", note \"Saves = strongest signal to the algorithm. Anything above 2% is solid.\" Shares Rate: total shares / total reach x 100 in blue, show total shares count, note \"Shares push content beyond your audience. 1%+ on reach is strong.\"\n\nSection 5: Top & Bottom Performers (id=\"best\"):\nTwo columns. Left: Top 3 (cobalt header). Right: Bottom 3 (grey header). Each row: rank number, thumbnail (or emoji placeholder), caption truncated to one line, time ago + post type below, like count and engagement rate on the right.\n\nSection 6: Engagement Over Time (id=\"timeline\"):\nBar chart of the last 20 posts in chronological order. Each bar = likes + comments. Bar gradient from cobalt (#2C4BE0) at top to transparent at bottom. Show value above bar, date (M/D) below. Height proportional to max value, minimum 3px.\n\nSection 7: Best Time to Post (id=\"timing\"):\nTwo side-by-side horizontal bar charts. Left: By Day of week, cobalt bars, best day highlighted green with bold label. Right: By Time bucket (6–9am, 9–12pm, 12–3pm, 3–6pm, 6–9pm, 9pm+, Late 0–5am), blue bars, best time highlighted green. Each row shows avg engagement % and post count. Only show time buckets that have at least 1 post.\n\nSection 8: Hashtag Performance (id=\"hashtags\", only if any hashtag used 2+ times):\nCard with header row (Tag / Uses / Avg Eng / Avg Likes). Each hashtag row: tag name in blue, proportional bar, use count, avg engagement %, avg likes. Sorted by avg engagement descending. Max 12 tags.\n\nSection 9: All Posts Grid (id=\"allposts\"):\nSort pills: Likes, Comments, Reach, Eng, Saves, Views, Recent. Grid of cards, auto-fill columns min 220px. Each card: thumbnail image (or emoji placeholder), post type badge (Reel=purple, Photo=blue, Carousel=orange), caption with 2-line clamp, 4 metric chips (Likes in #FF5733, Comments in blue, Reach in purple, 4th chip = Views in cobalt for VIDEO or Saves in green for IMAGE/CAROUSEL). For reels with watch time: show avg watch time and saves below metrics. Footer: engagement rate pill (colored by tier), time ago, link to open post on Instagram. Top 3 cards (after current sort) get a cobalt border. Clicking the card opens the post permalink in a new tab." },
    { title: "Prompt 4: The token refresh script", text: "Inside the ig-dashboard folder, create a Python script called refresh_token.py that:\n\n- Reads IG_ACCESS_TOKEN from the .env file in the same directory\n- Calls https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=CURRENT_TOKEN\n- Gets the new token from the JSON response\n- Overwrites the IG_ACCESS_TOKEN value in the .env file with the new token\n- Logs each refresh with a timestamp to token_refresh.log in the same folder\n- If the refresh fails: logs a FAILED entry AND sends a macOS desktop notification using osascript\n- Uses only Python standard library, no pip installs" },
    { title: "Prompt 5: The cron job", text: "Set up a cron job that runs refresh_token.py every 58 days at 9am. Use the absolute path to Python (from `which python3`) and the absolute path to the script. Verify the cron entry was created and show it to me." },
    { title: "Terminal: The commands for steps 4 and 5", text: "Find your Python path (before prompt 5):\nwhich python3\n\nTest the refresh (at least 24 hours after you generated the token):\npython3 /absolute/path/to/ig-dashboard/refresh_token.py\n\nStart your dashboard:\ncd ig-dashboard\nnode proxy.js\n\nThen open this in your browser:\nhttp://localhost:3001/content-dashboard.html" },
  ],
  checks: { title: "If something breaks", items: [
    "\"Invalid OAuth 2.0 Access Token\": the token expired. Run refresh_token.py manually.",
    "\"Does not support metric X\": don't change the metrics in proxy.js. The ones in prompt 2 are already right for each post type.",
    "Insights show a dash everywhere: your account is Personal. Switch to Creator in Instagram, Settings, Account.",
    "The cron job isn't running: add /usr/sbin/cron in System Settings, Privacy, Full Disk Access.",
    "Port 3001 is already in use: run lsof -ti :3001 | xargs kill -9, then start again.",
  ] },
  pass: "**You're done.** A free Instagram analytics dashboard on a direct API connection, with no subscription and no monthly fee. Next, you could add a YouTube tab with the YouTube Data API, pull TikTok analytics the same way, get an email when a post over- or underperforms, or have a PDF report made every Sunday.",
  kit: { name: "Content Agent", heading: "Want the content itself, too?", body: "The *Content Agent* kit (coming soon) writes posts, emails and descriptions in your voice, every week." },
};

export const convertedGuides: readonly BatchGuide[] = [instagramDashboard];
