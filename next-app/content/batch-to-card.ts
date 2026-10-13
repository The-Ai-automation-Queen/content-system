import { guideTitles, splitH1 } from "./guide-titles";
import type { BatchBlock, BatchGuide } from "./guide-batch-one";
import type { CardBlock, CardGuide, CardStep } from "./card-guides";

// Renders a guide written for the earlier batch layout in the card layout,
// without changing its approved copy. Lesson and examples stay open; every
// prompt sits behind the sign-up card, as before.

function splitTitle(title: string, accent?: string) {
  const colon = title.indexOf(": ");
  if (colon > 0) return { head: title.slice(0, colon), accent: `${title.slice(colon + 2)}.` };
  return { head: title, accent: accent ?? "" };
}

function convertBlocks(blocks: readonly BatchBlock[], guide: BatchGuide): CardBlock[] {
  const out: CardBlock[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const next = blocks[index + 1];
    if (block.kind === "example" && next?.kind === "result") {
      out.push({ kind: "papers", left: { label: block.label, text: block.text }, right: { label: next.label, lines: next.lines } });
      index++;
      continue;
    }
    if (block.kind === "locked") {
      const preview = block.prompt === undefined ? "" : guide.prompts[block.prompt]?.text ?? "";
      out.push({ kind: "teaser", label: block.label, preview: preview.slice(0, 180) });
      continue;
    }
    out.push(block);
  }
  return out;
}

export function batchToCard(guide: BatchGuide): CardGuide {
  const steps: CardStep[] = guide.sections.map((section, index) => {
    const title = splitTitle(section.title, section.accent);
    const blocks = convertBlocks(section.blocks, guide);
    if (guide.illustration?.afterSection === index) {
      blocks.push({ kind: "image", src: guide.illustration.src, alt: guide.illustration.alt, caption: guide.illustration.caption });
    }
    return { num: String(index + 1).padStart(2, "0"), title: title.head, accent: title.accent, blocks };
  });
  steps.push({ num: String(steps.length + 1).padStart(2, "0"), title: "The honest part", accent: "Check before you use it.", blocks: [{ kind: "honest", text: guide.honest }] });

  const promptWord = guide.prompts.length > 1 ? `${guide.prompts.length} prompts.` : "prompt.";
  const unlocked: CardBlock[] = guide.prompts.map((prompt) => ({ kind: "prompt", label: prompt.title, text: prompt.text }));
  if (guide.pass) unlocked.push({ kind: "pass", text: guide.pass });
  if (guide.checks) unlocked.push({ kind: "checks", ...guide.checks });
  if (guide.paths) unlocked.push({ kind: "paths", ...guide.paths });
  steps.push({ num: "✓", title: "Your prompts", accent: "Ready to copy.", blocks: unlocked });

  return {
    slug: guide.slug,
    lumailTag: "",
    title: guideTitles[guide.slug]?.title ?? guide.title,
    cover: guide.hero.art.src,
    coverAlt: guide.hero.art.alt,
    seoDescription: guide.seoDescription,
    tool: guide.hero.tool,
    minutes: guide.minutes,
    h1: guideTitles[guide.slug] ? splitH1(guideTitles[guide.slug].title) : { title: guide.hero.title, accent: guide.hero.accent },
    hero: { kind: guide.hero.art.kind, src: guide.hero.art.src, alt: guide.hero.art.alt, line: guideTitles[guide.slug]?.subtitle ?? guide.hero.line },
    intro: {
      heading: guide.question,
      lead: guide.answer,
      blocks: [
        { kind: "h3", text: "What you leave with" },
        { kind: "p", text: guide.leaveWith },
        { kind: "tip", text: `**How to use this guide:** ${guide.howTo}` },
      ],
    },
    openSteps: steps.length - 1,
    gate: { heading: "Unlock the", accent: promptWord, promise: /^\d+ prompts?\.$/.test(guide.gate.promise) ? "Enter your name and email. The prompts open straight away, and I'll email you the link so you can come back to them later." : guide.gate.promise, action: guide.gate.action },
    steps,
    cta: {
      eyebrow: "Free AI guides",
      heading: "One job done.",
      accent: "Pick the next one.",
      body: "The free guides library has more step-by-step guides like this one, each built around one job you can finish in a sitting.",
      label: "Browse the free guides →",
      href: "/guides/",
    },
    kit: { heading: guide.kit.heading, body: guide.kit.body },
    conclusion: { heading: "The honest part", paragraph: guide.honest, finishLine: "" },
  };
}
