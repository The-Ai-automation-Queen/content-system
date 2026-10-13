// Owner-approved plain titles (13/10/2026): the question a business owner would type,
// plus one line saying exactly what they get. Used for the page H1, browser title,
// social title and hero line of every listed guide.
export const guideTitles: Record<string, { title: string; subtitle: string }> = {
  "start-using-ai-in-your-business": { title: "How to Start Using AI in Your Business When You Don't Know Where to Begin", subtitle: "Pick one task, open one tool, and get it done today." },
  "what-is-ai": { title: "What Can I Use AI For in My Business?", subtitle: "A list of the jobs AI can do for you, and the 3 to try first." },
  "what-should-you-never-share-with-ai": { title: "Is It Safe to Put Client Information Into ChatGPT?", subtitle: "What you can paste, what you can't, and the setting to turn off." },
  "catch-ai-making-things-up": { title: "How to Check if ChatGPT Is Wrong Before You Send It to a Client", subtitle: "A 2-minute check for names, numbers and facts." },
  "which-ai-tool-for-what": { title: "ChatGPT, Claude or Gemini: Which One Should I Pay For?", subtitle: "How to pick one and cancel the others." },
  "what-is-agentic": { title: "Do I Need an AI Agent for My Business?", subtitle: "What an agent is, and how to know if you need one." },
  "show-up-in-ai-search": { title: "How to Get ChatGPT to Recommend My Business", subtitle: "Check what it says about you and fix it." },
  "brand-brain-guide": { title: "How to Teach Claude About My Business So I Stop Repeating Myself", subtitle: "Set it up once, in 5 steps." },
  "ai-jargon-guide": { title: "What Do AI Words Like \"Agent\" and \"Hallucination\" Mean?", subtitle: "6 words in plain English, and what each one means for your business." },
  "what-is-a-prompt": { title: "What Do I Type Into ChatGPT?", subtitle: "A fill-in-the-blanks template that works for any task." },
  "stop-ai-agreeing-with-you": { title: "How to Get ChatGPT to Tell Me What's Wrong With My Idea", subtitle: "Stop it agreeing with everything you say." },
  "ai-skills-worth-learning-for-work": { title: "Why Are My ChatGPT Answers So Average?", subtitle: "The 3 things to do differently to get better answers." },
  "make-chatgpt-answers-shorter": { title: "How to Make ChatGPT Give Shorter Answers", subtitle: "One instruction, saved once, so it stops writing essays." },
  "stop-chatgpt-forgetting-context": { title: "How to Stop Explaining My Business to ChatGPT Every Time", subtitle: "Save your details once in a ChatGPT Project." },
  "claude": { title: "How to Use Claude to Do My Admin", subtitle: "Meeting notes, long documents and emails, one prompt each." },
  "gemini-cannot-find-drive-file": { title: "How to Get Gemini to Find Things in My Google Drive", subtitle: "Ask a question and get the answer with the exact line it came from." },
  "gemini-google-tasks-limits": { title: "How to Plan My Week With Gemini", subtitle: "Turn a messy to-do list into tasks with dates." },
  "connect-ai-to-email-files-calendar": { title: "Is It Safe to Connect ChatGPT to My Gmail?", subtitle: "What it can see, and how to give it as little access as possible." },
  "what-is-an-ai-browser": { title: "What Is an AI Browser and Should I Use One?", subtitle: "What it does, and 3 safe ways to try it." },
  "weekend-projects-with-claude": { title: "How to Build Simple Tools for My Business With Claude (No Coding)", subtitle: "A client checklist, a price calculator, a content calendar and more." },
  "instagram-content-dashboard": { title: "How to See My Instagram Numbers for Free", subtitle: "Build your own dashboard with Claude Code. Advanced." },
  "chatgpt-customer-research-with-evidence": { title: "How to Use ChatGPT to Understand What My Clients Want", subtitle: "Turn reviews, messages and survey answers into clear decisions." },
  "test-business-idea-with-ai": { title: "How to Test My Business Idea With ChatGPT Before I Build It", subtitle: "Find the problems early and check if people will pay." },
  "launch-your-product-in-30-days": { title: "How to Launch My Product in 30 Days", subtitle: "A day-by-day checklist, with AI doing the planning." },
  "marketing-emails-that-sell": { title: "How to Write Sales Emails With ChatGPT That Don't Sound Like AI", subtitle: "Write to one real client, with proof instead of promises." },
  "chatgpt-scheduled-tasks": { title: "How to Make ChatGPT Do a Task for Me Every Week", subtitle: "Set it once and it runs on its own." },
  "teach-claude-a-repeatable-workflow": { title: "How to Get Claude to Do the Same Weekly Task Without Explaining It Again", subtitle: "Write the steps once, test them, save them." },
  "chatgpt-screen-recording-to-process-guide": { title: "How to Turn a Screen Recording Into Step-by-Step Instructions With ChatGPT", subtitle: "Record a task once and get instructions someone else can follow." },
  "make-work-tracker-with-kimi": { title: "How to Make a Client Tracker in Excel With AI", subtitle: "AI builds the spreadsheet, then you test it with real mistakes." },
  "test-meta-muse-money-saving-task": { title: "How to Find and Cancel Business Subscriptions I Don't Use", subtitle: "AI finds the repeat payments; you decide what to cancel." },
};

// H1 styling: the last two words carry the italic accent.
export function splitH1(title: string): { title: string; accent: string } {
  const words = title.split(" ");
  return { title: words.slice(0, -2).join(" "), accent: words.slice(-2).join(" ") };
}
