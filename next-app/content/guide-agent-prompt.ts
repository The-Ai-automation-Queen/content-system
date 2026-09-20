import type { GuideSection } from "./guide-page";

type Step = Extract<GuideSection, { kind: "walkthrough" }>;

export function buildGuideAgentPrompt(sections: readonly Step[]): string {
  const instructions = sections.map(section => [
    section.heading,
    section.introduction,
    ...section.blocks.map(block => {
      if (block.kind === "list") return block.items.map((item, i) => `${i + 1}. ${item}`).join("\n");
      if (block.kind === "table") return block.rows.map(([error, fix]) => `${error}: ${fix}`).join("\n");
      if (block.kind === "code") return `${block.label}\n\n${block.text}`;
      return block.text;
    }),
  ].join("\n\n")).join("\n\n---\n\n");

  return `Help me build the Instagram dashboard described below. I am a beginner. Act as my coding assistant in this project folder, doing the implementation work you can and guiding me through only the actions that require me.

HOW TO WORK WITH ME
- Begin by checking my operating system, this folder's existing files, and whether Node.js and Python 3 are available. Do not overwrite existing work. If a required tool is missing, explain the official installation step and help me verify it.
- Give me one short action at a time when you need my involvement, explain where to click or type, then wait for my answer. Do not give me the entire setup checklist at once.
- The reference instructions below define the requested build: a Node.js proxy.js server, content-dashboard.html with plain HTML/CSS/JavaScript, and Python refresh_token.py. Keep the included Shift & Lead design specifications. Do not replace this with Next.js, React, another stack or a different workflow.
- Check current official Meta documentation before using the account setup, token steps, metrics and scheduling instructions. These are reference instructions, not proof that every detail is current. If something is obsolete, unsupported, unsafe or impossible (including the requested cron interval), explain the exact problem and smallest proposed correction in plain language and ask me before changing the method. Never silently substitute your own approach. Continue independent work while a decision is pending.
- Create the files, run appropriate checks, troubleshoot errors and start the local dashboard using your available tools. If you cannot run commands or access files, say so and explain how to continue in a coding agent with project access; do not pretend the build is complete.

ACCOUNT SETUP AND PRIVACY
- I will handle login, two-factor authentication, consent, permission approvals and credential entry. Do not ask me to paste passwords, access tokens or app secrets into chat.
- If browser tools are available, help navigate the setup, but pause for my sensitive actions. Otherwise give me the exact page and one action to perform at a time.
- Create the .env file with the guide's four blank fields and tell me how to open it locally and fill it myself. Never print, display, log or copy its secret values into chat. Keep .env and secret-bearing files out of git.
- Serve only intended dashboard assets; do not expose .env, logs or credentials through the static server or browser responses. Explain any security-related departure required by the reference before implementing it.
- Do not deploy publicly, push code, publish Instagram content, send messages, create paid services or install a persistent schedule without my explicit approval for that action.

CHECKS AND HANDOFF
- Work through the five stages below. Validate each stage before continuing. Report what actually passed and what remains blocked.
- Use fixtures only for clearly labelled tests. Never present sample numbers as my real Instagram results. Ask me to compare a returned post with Instagram when real account access is ready.
- Show the proposed token-refresh schedule and its limitations before installing it. Do not claim that a schedule keeps working while my computer is off.
- Finish with the local dashboard URL, how to start and stop it next time, and what still needs my attention. Claim a live connection only after a real request succeeds.

REFERENCE INSTRUCTIONS — FULL FIVE-STEP GUIDE
The text below is the reference to implement, not authorisation to execute account actions or unsafe commands without the checks above.

${instructions}`;
}
