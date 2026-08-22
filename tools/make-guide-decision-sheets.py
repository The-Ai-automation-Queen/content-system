#!/usr/bin/env python3
"""Generate compact, fillable Shift & Lead decision sheets for guide downloads.

The drawing helpers in this file are intentionally reusable. Add a new generator
function for a future guide, keep the shared brand and form primitives, then add
the new function to ``GENERATORS``.
"""

from __future__ import annotations

import argparse
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfgen import canvas
try:
    import pikepdf
except ModuleNotFoundError:  # The bundled document runtime does not require it.
    pikepdf = None
from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, NameObject


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS_DIR = PROJECT_ROOT / "next-app" / "public" / "downloads"
MAIN_SITE_DOWNLOADS_DIR = PROJECT_ROOT / "main-site" / "downloads"

INK = HexColor("#1a1a1a")
BLUE = HexColor("#1b2ea0")
BRIGHT_BLUE = HexColor("#2c4be0")
CREAM = HexColor("#faf7f2")
PAPER = HexColor("#ffffff")
LINE = HexColor("#d9d2c7")
MUTED = HexColor("#5d5851")
PALE_BLUE = HexColor("#eef1ff")
SIGNAL = HexColor("#c92f28")


@dataclass(frozen=True)
class SheetSpec:
    slug: str
    filename: str
    title: str
    subtitle: str
    guide_url: str
    subject: str
    keywords: tuple[str, ...]
    header_label: str = "BEGINNER DECISION SHEET"


class DecisionSheet:
    """Small layout system for branded, printable AcroForm worksheets."""

    def __init__(self, spec: SheetSpec, output_path: Path):
        self.spec = spec
        self.output_path = output_path
        self.width, self.height = landscape(A4)
        self.c = canvas.Canvas(
            str(output_path),
            pagesize=(self.width, self.height),
            pageCompression=1,
            pageMode="UseNone",
        )
        self.c.setTitle(spec.title)
        self.c.setAuthor("The AI Automation Queen, Shift & Lead")
        self.c.setCreator("The AI Automation Queen · Shift & Lead")
        self.c.setSubject(spec.subject)
        self.c.setKeywords(", ".join(spec.keywords))
        self.c._doc.Catalog.Lang = PDFString("en-GB")

    def rect(
        self,
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        fill: Color = PAPER,
        stroke: Color = LINE,
        radius: float = 0,
        stroke_width: float = 0.7,
    ) -> None:
        self.c.setFillColor(fill)
        self.c.setStrokeColor(stroke)
        self.c.setLineWidth(stroke_width)
        if radius:
            self.c.roundRect(x, y, width, height, radius, fill=1, stroke=1)
        else:
            self.c.rect(x, y, width, height, fill=1, stroke=1)

    def label(self, text: str, x: float, y: float, *, color: Color = BLUE) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Courier-Bold", 7.2)
        self.c.drawString(x, y, text.upper())

    def heading(self, text: str, x: float, y: float, *, size: float = 18) -> None:
        self.c.setFillColor(INK)
        self.c.setFont("Times-Bold", size)
        self.c.drawString(x, y, text)

    def body(
        self,
        text: str,
        x: float,
        y: float,
        *,
        size: float = 8.2,
        color: Color = MUTED,
    ) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        self.c.drawString(x, y, text)

    def wrapped_text(
        self,
        text: str,
        x: float,
        y: float,
        max_width: float,
        *,
        font: str = "Helvetica",
        size: float = 8.2,
        leading: float = 10.2,
        color: Color = MUTED,
        max_lines: int | None = None,
    ) -> float:
        words = text.split()
        lines: list[str] = []
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if self.c.stringWidth(candidate, font, size) <= max_width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        if max_lines is not None:
            lines = lines[:max_lines]
        self.c.setFillColor(color)
        self.c.setFont(font, size)
        for line in lines:
            self.c.drawString(x, y, line)
            y -= leading
        return y

    def text_field(
        self,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        multiline: bool = False,
        font_size: float = 9,
        max_len: int = 100,
    ) -> None:
        self.c.acroForm.textfield(
            name=name,
            tooltip=name.replace("_", " ").title(),
            x=x,
            y=y,
            width=width,
            height=height,
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            maxlen=max_len,
            fieldFlags="multiline" if multiline else "",
        )

    def checkbox(self, name: str, label: str, x: float, y: float) -> None:
        self.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        self.c.setFillColor(INK)
        self.c.setFont("Helvetica", 7.6)
        self.c.drawString(x + 16, y, label)

    def field_row(self, label: str, name: str, x: float, y: float, width: float) -> None:
        self.label(label, x, y + 7)
        self.text_field(name, x + 88, y, width - 88, 22, font_size=8.5)

    def section_title(self, number: str, title: str, x: float, y: float) -> None:
        self.c.setFillColor(BLUE)
        self.c.circle(x + 9, y + 7, 9, fill=1, stroke=0)
        self.c.setFillColor(PAPER)
        self.c.setFont("Helvetica-Bold", 8)
        self.c.drawCentredString(x + 9, y + 4.2, number)
        self.heading(title, x + 28, y, size=17)

    def header(self) -> None:
        self.c.setFillColor(BLUE)
        self.c.rect(0, self.height - 94, self.width, 94, fill=1, stroke=0)
        self.c.setFillColor(PALE_BLUE)
        self.c.setFont("Courier-Bold", 7.4)
        self.c.drawString(32, self.height - 25, self.spec.header_label)
        self.c.setFillColor(PAPER)
        self.c.setFont("Times-Bold", 29)
        self.c.drawString(32, self.height - 57, self.spec.title)
        self.c.setFont("Helvetica", 9.5)
        self.c.drawString(33, self.height - 78, self.spec.subtitle)
        self.c.setFont("Times-Bold", 14)
        self.c.drawRightString(self.width - 32, self.height - 40, "Shift & Lead")
        self.c.setFont("Helvetica-Bold", 7.3)
        self.c.drawRightString(
            self.width - 32, self.height - 57, "THE AI AUTOMATION QUEEN"
        )
        self.c.setFont("Helvetica", 7.3)
        self.c.drawRightString(self.width - 32, self.height - 74, self.spec.guide_url)

    def footer(self) -> None:
        self.c.setFillColor(INK)
        self.c.rect(0, 0, self.width, 27, fill=1, stroke=0)
        self.c.setFillColor(PAPER)
        self.c.setFont("Helvetica-Bold", 7.4)
        self.c.drawString(32, 10, "The AI Automation Queen · Shift & Lead")
        self.c.setFont("Helvetica", 7.4)
        self.c.drawRightString(
            self.width - 32, 10, "Use it on screen or print it on A4 landscape."
        )

    def save(self) -> None:
        self.c.save()


WHAT_IS_AI = SheetSpec(
    slug="what-is-ai",
    filename="ai-or-automation-task-sorter.pdf",
    title="AI or automation?",
    subtitle="Sort 1 real task before you choose a tool.",
    guide_url="shiftandlead.com/guides/what-is-ai.html",
    subject="A fillable 1-page task sorter for choosing AI, automation, both, or human-first work.",
    keywords=("AI", "automation", "decision sheet", "task sorter", "Shift & Lead"),
)

PROMPT_BRIEF = SheetSpec(
    slug="what-is-a-prompt",
    filename="useful-prompt-brief.pdf",
    title="The useful prompt brief",
    subtitle="Give AI the job, evidence and finish line before you ask it to write.",
    guide_url="shiftandlead.com/guides/what-is-a-prompt.html",
    subject="A fillable 1-page brief for writing useful prompts and checking the result.",
    keywords=("prompt", "prompt brief", "AI", "review checklist", "Shift & Lead"),
    header_label="BEGINNER PROMPT TEMPLATE",
)

WORKFLOW_OR_AGENT = SheetSpec(
    slug="what-is-agentic",
    filename="workflow-or-agent-decision-card.pdf",
    title="Workflow or agent worksheet",
    subtitle="Choose 1 real task. Use the lowest level of freedom that can do it safely.",
    guide_url="shiftandlead.com/guides/what-is-agentic.html",
    subject="A fillable 1-page worksheet for choosing a chatbot, workflow or the right level of agent action.",
    keywords=("AI agent", "automation", "workflow", "autonomy", "Shift & Lead"),
)

TOOL_COMPARISON = SheetSpec(
    slug="which-ai-tool-for-what",
    filename="10-tool-comparison-scorecard.pdf",
    title="10-tool comparison scorecard",
    subtitle="Test the same 3-task job with the same inputs and quality checks.",
    guide_url="shiftandlead.com/guides/which-ai-tool-for-what.html",
    subject="A fillable 1-page scorecard for comparing 10 AI tools against one real task.",
    keywords=("AI tools", "tool comparison", "scorecard", "tool selection", "Shift & Lead"),
)

CHATGPT_FIT_TEST = SheetSpec(
    slug="chatgpt",
    filename="chatgpt-30-minute-fit-test.pdf",
    title="ChatGPT 30-minute fit test",
    subtitle="Run 3 real tasks. Spend 10 minutes on each. Score the result, not the conversation.",
    guide_url="shiftandlead.com/guides/chatgpt.html",
    subject="A fillable 1-page test for deciding whether ChatGPT fits real work.",
    keywords=("ChatGPT", "fit test", "AI tool", "scorecard", "Shift & Lead"),
)

CLAUDE_DOCUMENT_TEST = SheetSpec(
    slug="claude",
    filename="claude-document-work-test.pdf",
    title="Claude document-work test",
    subtitle="Use 3 files you know. Check 5 claims. Compare the result fairly with another tool.",
    guide_url="shiftandlead.com/guides/claude.html",
    subject="A fillable 1-page document-work test for Claude or another AI tool.",
    keywords=("Claude", "document review", "source check", "AI tool test", "Shift & Lead"),
)

GEMINI_WORKSPACE_TEST = SheetSpec(
    slug="gemini",
    filename="gemini-workspace-fit-checklist.pdf",
    title="Gemini Workspace fit checklist",
    subtitle="Run 3 Google-work tasks. Check the source, the permission and the useful time saved.",
    guide_url="shiftandlead.com/guides/gemini.html",
    subject="A fillable 1-page checklist for testing Gemini across Gmail, Drive and NotebookLM.",
    keywords=("Gemini", "Google Workspace", "Gmail", "Drive", "NotebookLM", "Shift & Lead"),
)

COPILOT_MICROSOFT_365_TEST = SheetSpec(
    slug="copilot",
    filename="copilot-task-and-permission-test.pdf",
    title="Copilot task and permission test",
    subtitle="Test 3 low-risk tasks with 1 representative user. Pass the task and permission review.",
    guide_url="shiftandlead.com/guides/copilot.html",
    subject="A fillable 1-page task and permission test for Copilot across Microsoft 365 work.",
    keywords=("Copilot", "Microsoft 365", "Outlook", "Teams", "Excel", "permissions", "Shift & Lead"),
)

GROK_LIVE_SIGNAL_TEST = SheetSpec(
    slug="grok",
    filename="live-signal-verification-checklist.pdf",
    title="Live signal verification checklist",
    subtitle="Separate the live public signal from the claim that still needs proof.",
    guide_url="shiftandlead.com/guides/grok.html",
    subject="A fillable 1-page checklist for verifying a live public signal before using it.",
    keywords=("Grok", "live signal", "verification", "primary source", "evidence", "Shift & Lead"),
)

META_AI_SAFE_USE_CARD = SheetSpec(
    slug="meta-ai",
    filename="meta-ai-safe-use-card.pdf",
    title="Meta AI safe-use card",
    subtitle="Use public, low-risk information. Keep private business information out.",
    guide_url="shiftandlead.com/guides/meta-ai.html",
    subject="A fillable 1-page card for deciding what is safe to share in Meta AI.",
    keywords=("Meta AI", "safe use", "privacy", "public information", "business information", "Shift & Lead"),
)

DEEPSEEK_DATA_DEPLOYMENT_CHECKLIST = SheetSpec(
    slug="deepseek",
    filename="deepseek-data-and-deployment-checklist.pdf",
    title="DeepSeek data and deployment checklist",
    subtitle="Choose the exact setup before any business data moves.",
    guide_url="shiftandlead.com/guides/deepseek.html",
    subject="A fillable 1-page checklist for reviewing a DeepSeek setup before business use.",
    keywords=("DeepSeek", "deployment", "data", "licence", "security", "hosting", "Shift & Lead"),
    header_label="INTERMEDIATE DECISION SHEET",
)

KIMI_LONG_FILE_CODING_TEST = SheetSpec(
    slug="kimi",
    filename="kimi-long-file-and-coding-test.pdf",
    title="Kimi long-file and coding test brief",
    subtitle="Run the same bounded task in Kimi and the tool you already use.",
    guide_url="shiftandlead.com/guides/kimi.html",
    subject="A fillable 1-page comparison test for Kimi long-file and coding work.",
    keywords=("Kimi", "long file", "coding", "comparison test", "source fidelity", "Shift & Lead"),
    header_label="INTERMEDIATE DECISION SHEET",
)

MANUS_TASK_PERMISSION_MAP = SheetSpec(
    slug="manus",
    filename="manus-task-and-permission-map.pdf",
    title="Manus task and permission map",
    subtitle="Write the boundary, approval and stop before the agent runs.",
    guide_url="shiftandlead.com/guides/manus.html",
    subject="A fillable 1-page map for bounding a Manus task and its permissions.",
    keywords=("Manus", "AI agent", "permissions", "approval", "stop condition", "rollback", "Shift & Lead"),
    header_label="INTERMEDIATE DECISION SHEET",
)

PRIVATE_AI_DEPLOYMENT_REQUIREMENTS = SheetSpec(
    slug="mistral",
    filename="private-ai-deployment-requirements.pdf",
    title="Private AI deployment requirements brief",
    subtitle="Define the system and proof before you compare models or suppliers.",
    guide_url="shiftandlead.com/guides/mistral.html",
    subject="A fillable 1-page buyer brief for defining private AI deployment requirements.",
    keywords=("private AI", "Mistral", "deployment", "data location", "access", "support", "Shift & Lead"),
    header_label="EXPERT DECISION SHEET",
)

THREE_TOOL_STACK_AUDIT = SheetSpec(
    slug="stack-3-tool-ai-stack",
    filename="3-tool-stack-audit.pdf",
    title="3-tool stack audit",
    subtitle="Give every job 1 owner, expose the overlap and decide what stays.",
    guide_url="shiftandlead.com/guides/stack-3-tool-ai-stack.html",
    subject="A fillable 1-page audit for preparing, capturing and publishing or delivering work.",
    keywords=("AI stack", "tool audit", "automation", "ownership", "cost", "access", "Shift & Lead"),
)

RESEARCH_TO_CONTENT_WORKFLOW_MAP = SheetSpec(
    slug="research-to-content-workflow",
    filename="research-to-content-workflow-map.pdf",
    title="Research-to-Content Workflow Map",
    subtitle="Keep the source, add judgment, verify the claim and learn from the response.",
    guide_url="shiftandlead.com/guides/research-to-content-workflow.html",
    subject="A fillable 1-page map for turning saved research into verified content.",
    keywords=("research", "content workflow", "verification", "source", "publishing", "Shift & Lead"),
    header_label="INTERMEDIATE WORKFLOW MAP",
)

LEAD_FOLLOW_UP_MAP = SheetSpec(
    slug="follow-up-setup",
    filename="lead-follow-up-map-and-message-builder.pdf",
    title="Lead follow-up map and 3-message builder",
    subtitle="Map the trigger, messages, human handoff and failure path before launch.",
    guide_url="shiftandlead.com/guides/follow-up-setup.html",
    subject="A fillable 1-page map and message builder for a reliable lead follow-up workflow.",
    keywords=(
        "lead follow-up",
        "workflow map",
        "message builder",
        "human handoff",
        "failure handling",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE WORKFLOW MAP",
)

INBOX_TRIAGE_TEMPLATE = SheetSpec(
    slug="inbox-manager-setup",
    filename="inbox-triage-rules-and-daily-summary-template.pdf",
    title="Inbox triage rules and daily summary template",
    subtitle="Define what the inbox assistant may read, draft and escalate before it starts.",
    guide_url="shiftandlead.com/guides/inbox-manager-setup.html",
    subject="A fillable 1-page template for inbox triage rules, daily summaries and human escalation.",
    keywords=(
        "inbox triage",
        "daily summary",
        "draft only",
        "human approval",
        "failure handling",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE WORKFLOW TEMPLATE",
)

AI_TEAMMATE_JOB_DESCRIPTION = SheetSpec(
    slug="first-ai-employee",
    filename="ai-teammate-job-description.pdf",
    title="AI teammate job description",
    subtitle="Specify 1 bounded job, the evidence, approval and stopping point before the system runs.",
    guide_url="shiftandlead.com/guides/first-ai-employee.html",
    subject="A fillable 1-page specification for a bounded AI system with human approval.",
    keywords=(
        "AI system",
        "job specification",
        "human approval",
        "access control",
        "failure handling",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE SYSTEM SPECIFICATION",
)

AI_ESSENTIALS_7_DAY_PLAN = SheetSpec(
    slug="ai-essentials",
    filename="your-first-7-days-with-ai.pdf",
    title="Your 1st 7 days with AI",
    subtitle="Learn with 1 low-risk task, evidence, correction and a clear human decision.",
    guide_url="shiftandlead.com/guides/ai-essentials.html",
    subject="A fillable 7-day Shift & Lead practice plan for learning AI safely through one real task.",
    keywords=(
        "AI essentials",
        "7-day practice plan",
        "prompt brief",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER 7-DAY PRACTICE PLAN",
)

AI_IMPROVEMENT_TRACKER = SheetSpec(
    slug="get-better-at-ai",
    filename="4-week-ai-improvement-tracker.pdf",
    title="4-week AI improvement tracker",
    subtitle="Use 20 attempts on 1 real task. Keep only the rules the evidence supports.",
    guide_url="shiftandlead.com/guides/get-better-at-ai.html",
    subject="A fillable 6-page Shift & Lead tracker for improving one checked AI task through 20 real attempts.",
    keywords=(
        "AI practice",
        "improvement tracker",
        "deliberate practice",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER 4-WEEK IMPROVEMENT TRACKER",
)

AI_ANSWER_SOURCE_CHECKING_WORKSHEET = SheetSpec(
    slug="check-ai-answers",
    filename="ai-answer-source-checking-worksheet.pdf",
    title="AI answer source-checking worksheet",
    subtitle="Check 10 important claims against original information before you use the answer.",
    guide_url="shiftandlead.com/guides/check-ai-answers.html",
    subject=(
        "A fillable 4-page Shift & Lead worksheet for checking 10 important "
        "AI claims against original information."
    ),
    keywords=(
        "AI answer checking",
        "source checking",
        "claim verification",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER SOURCE-CHECKING WORKSHEET",
)

CLEAR_WRITING_REVISION_WORKSHEET = SheetSpec(
    slug="make-ai-clear-and-concise",
    filename="clear-writing-revision-worksheet.pdf",
    title="Clear writing revision worksheet",
    subtitle="Turn 1 long AI answer into writing a real reader can understand and use.",
    guide_url="shiftandlead.com/guides/make-ai-clear-and-concise.html",
    subject=(
        "A fillable 3-page Shift & Lead worksheet for revising a long or vague "
        "AI answer without losing necessary facts, limits or the next action."
    ),
    keywords=(
        "AI writing",
        "clear writing",
        "revision worksheet",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER CLEAR WRITING WORKSHEET",
)

AI_CREATIVE_REVIEW_WORKBOOK = SheetSpec(
    slug="build-taste-with-ai",
    filename="ai-creative-review-workbook.pdf",
    title="AI creative review workbook",
    subtitle="Compare 3 options, finish 1 and save a clearer rule for the next brief.",
    guide_url="shiftandlead.com/guides/build-taste-with-ai.html",
    subject=(
        "A fillable workbook for comparing 3 AI-assisted creative options, "
        "finishing 1 selected option and saving a useful rule for the next brief."
    ),
    keywords=(
        "AI creative review",
        "creative judgment",
        "compare AI drafts",
        "creative standards",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE CREATIVE REVIEW WORKBOOK",
)

AI_SEARCH_VISIBILITY_WORKBOOK = SheetSpec(
    slug="show-up-in-ai-search",
    filename="ai-search-visibility-workbook.pdf",
    title="AI search visibility workbook",
    subtitle="Map 6 customer questions, audit 8 public sources and record 12 dated answer tests.",
    guide_url="shiftandlead.com/guides/show-up-in-ai-search.html",
    subject=(
        "A fillable 3-page Shift & Lead workbook for mapping 6 customer questions, "
        "auditing 8 public sources and recording 12 AI search tests and 5 source fixes."
    ),
    keywords=(
        "AI search visibility",
        "public source audit",
        "citation testing",
        "business facts",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE AI SEARCH WORKBOOK",
)

BETTER_PROMPTS_SCORECARD = SheetSpec(
    slug="better-prompts-and-answers",
    filename="prompt-builder-and-answer-quality-scorecard.pdf",
    title="Prompt builder and answer-quality scorecard",
    subtitle="Brief 1 real task, score the answer and decide whether to Use, Revise or Stop.",
    guide_url="shiftandlead.com/guides/better-prompts-and-answers.html",
    subject="A fillable Shift & Lead prompt builder and answer-quality scorecard.",
    keywords=(
        "prompt builder",
        "answer quality",
        "scorecard",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER",
)

SOURCE_TO_PUBLISH_PLANNER = SheetSpec(
    slug="content-and-creative-work",
    filename="source-to-publish-content-planner.pdf",
    title="Source-to-publish content planner",
    subtitle="Move 1 trusted source into a checked main piece, channel versions and a human publish decision.",
    guide_url="shiftandlead.com/guides/content-and-creative-work.html",
    subject="A fillable Shift & Lead planner for moving 1 trusted source to a human publish decision.",
    keywords=(
        "content planner",
        "source checking",
        "content workflow",
        "human approval",
        "Shift & Lead",
    ),
    header_label="BEGINNER",
)

TASK_TO_WORKFLOW_CANVAS = SheetSpec(
    slug="workflows-and-automation",
    filename="task-to-workflow-canvas.pdf",
    title="Task-to-workflow canvas",
    subtitle="Map 1 repeated task, test the normal path and 6 failures, then decide what happens next.",
    guide_url="shiftandlead.com/guides/workflows-and-automation.html",
    subject="A fillable Shift & Lead canvas for mapping and testing one repeated workflow.",
    keywords=(
        "workflow canvas",
        "automation planning",
        "failure testing",
        "human approval",
        "Shift & Lead",
    ),
    header_label="INTERMEDIATE",
)

AGENT_ROLE_PERMISSION_TEST_CANVAS = SheetSpec(
    slug="ai-agents",
    filename="agent-role-permission-and-test-canvas.pdf",
    title="Agent role, permission and test canvas",
    subtitle="Give 1 agent a clear job. Limit what it can touch. Make it pass every test before it gets more access.",
    guide_url="shiftandlead.com/guides/ai-agents.html",
    subject="A fillable Shift & Lead canvas for defining an agent role, permissions and release tests.",
    keywords=(
        "AI agent",
        "permission boundary",
        "approval gate",
        "agent testing",
        "human review",
        "Shift & Lead",
    ),
    header_label="BEGINNER TO EXPERT",
)

OPERATIONS_24_7_BLUEPRINT = SheetSpec(
    slug="24-7-operations-system",
    filename="24-7-operations-blueprint.pdf",
    title="24/7 operations blueprint",
    subtitle="Keep routine work moving with monitoring, approval queues and a tested shutdown route.",
    guide_url="shiftandlead.com/guides/24-7-operations-system.html",
    subject="A fillable operations blueprint for monitored routine work with human control.",
    keywords=(
        "24/7 operations",
        "monitored workflow",
        "approval queue",
        "exception handling",
        "kill switch",
        "Shift & Lead",
    ),
    header_label="EXPERT OPERATIONS BLUEPRINT",
)

BUSINESS_OPERATIONS_AUTOMATION_MAP = SheetSpec(
    slug="business-operations",
    filename="business-operations-automation-map.pdf",
    title="What to automate first worksheet",
    subtitle="Compare 5 real tasks. Choose 1 safe first build. Put the rest in order.",
    guide_url="shiftandlead.com/guides/business-operations.html",
    subject="A fillable 3-page Shift & Lead worksheet for comparing five business tasks and choosing one safe first build.",
    keywords=(
        "business operations",
        "automation planning",
        "task comparison",
        "evidence",
        "recovery",
        "Shift & Lead",
    ),
    header_label="BEGINNER TO EXPERT",
)


def draw_what_is_ai(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 18
    content_top = sheet.height - 112
    content_bottom = 42
    column_width = (sheet.width - (2 * margin) - gap) / 2
    left_x = margin
    right_x = left_x + column_width + gap
    content_height = content_top - content_bottom

    sheet.rect(left_x, content_bottom, column_width, content_height, stroke=INK)
    sheet.rect(right_x, content_bottom, column_width, content_height, stroke=INK)

    # 1. Name the task
    section_y = content_top - 29
    sheet.section_title("1", "Name 1 real task", left_x + 18, section_y)
    sheet.body(
        "Use a task you already do. Do not start with a tool name.",
        left_x + 18,
        section_y - 20,
        size=8.3,
    )
    sheet.label("The task", left_x + 18, section_y - 42)
    sheet.text_field(
        "task_to_sort",
        left_x + 18,
        section_y - 92,
        column_width - 36,
        42,
        multiline=True,
    )

    facts_y = section_y - 117
    sheet.label("Check what is true", left_x + 18, facts_y)
    sheet.checkbox("fact_repeats", "It happens often", left_x + 18, facts_y - 20)
    sheet.checkbox(
        "fact_same_steps", "The steps stay mostly the same", left_x + 177, facts_y - 20
    )
    sheet.checkbox("fact_judgment", "The input changes from case to case", left_x + 18, facts_y - 40)
    sheet.checkbox(
        "fact_sensitive", "It touches sensitive information", left_x + 177, facts_y - 40
    )

    # 2. Choose the operating path
    path_y = facts_y - 79
    sheet.section_title("2", "Choose the operating path", left_x + 18, path_y)
    path_cards = [
        (
            "path_automation",
            "AUTOMATION",
            "Same trigger, same steps, same finish.",
            "Example: save every new form entry in the CRM.",
        ),
        (
            "path_ai",
            "AI",
            "People describe the same task in different words.",
            "Example: draft a reply from approved service notes.",
        ),
        (
            "path_both",
            "AI + AUTOMATION",
            "AI creates or sorts. Fixed steps move the approved result.",
            "Example: draft a reply, then create a review task.",
        ),
        (
            "path_human",
            "HUMAN FIRST",
            "The goal is unclear or a mistake could cause serious harm.",
            "Example: decide a refund, contract term or final price.",
        ),
    ]
    card_gap = 7
    card_height = 54
    card_width = (column_width - 43) / 2
    for index, (field_name, title, rule, example) in enumerate(path_cards):
        col = index % 2
        row = index // 2
        x = left_x + 18 + col * (card_width + card_gap)
        y = path_y - 69 - row * (card_height + card_gap)
        sheet.rect(x, y, card_width, card_height, fill=PAPER)
        sheet.checkbox(field_name, title, x + 8, y + card_height - 17)
        sheet.wrapped_text(
            rule,
            x + 8,
            y + 24,
            card_width - 16,
            font="Helvetica-Bold",
            size=7.1,
            leading=8.4,
            color=INK,
            max_lines=2,
        )
        sheet.wrapped_text(
            example,
            x + 8,
            y + 8,
            card_width - 16,
            size=6.4,
            leading=7.2,
            color=MUTED,
            max_lines=1,
        )

    # 3. Design a safe first test
    sheet.section_title("3", "Design the first safe test", right_x + 18, section_y)
    sheet.body(
        "Keep the test small enough to review before it affects a real customer.",
        right_x + 18,
        section_y - 20,
        size=8.3,
    )
    rows = [
        ("INPUT", "test_input"),
        ("TRIGGER", "test_trigger"),
        ("AI CREATES OR SORTS", "test_ai_role"),
        ("FIXED STEP", "test_fixed_step"),
        ("PERSON APPROVES", "test_human_approval"),
        ("DONE LOOKS LIKE", "test_finish_line"),
    ]
    row_y = section_y - 53
    for label, name in rows:
        sheet.field_row(label, name, right_x + 18, row_y, column_width - 36)
        row_y -= 30

    # Worked example
    example_y = row_y - 2
    example_height = 88
    sheet.rect(
        right_x + 18,
        example_y - example_height,
        column_width - 36,
        example_height,
        fill=PALE_BLUE,
        stroke=BRIGHT_BLUE,
    )
    sheet.label("Worked example / new sales enquiry", right_x + 30, example_y - 17)
    example_lines = [
        ("Trigger", "A website enquiry arrives."),
        ("AI", "Draft a reply using approved service notes."),
        ("Automation", "Save the draft in the CRM and create a review task."),
        ("Person", "Check the promise, price and next step. Then send."),
        ("Finished", "The prospect gets a checked reply and the next action is recorded."),
    ]
    line_y = example_y - 34
    for label, value in example_lines:
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7.2)
        sheet.c.drawString(right_x + 30, line_y, f"{label}:")
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.2)
        sheet.c.drawString(right_x + 80, line_y, value)
        line_y -= 11

    # The safety rule is the final decision, not an extra CTA.
    rule_y = content_bottom + 16
    rule_height = 66
    sheet.rect(
        right_x + 18,
        rule_y,
        column_width - 36,
        rule_height,
        fill=BLUE,
        stroke=BLUE,
    )
    sheet.label("The rule", right_x + 30, rule_y + rule_height - 17, color=PALE_BLUE)
    sheet.wrapped_text(
        "Use AI to produce options. Use automation to move approved work. Keep a person responsible for anything that affects clients, money, access, legal commitments or reputation.",
        right_x + 30,
        rule_y + rule_height - 35,
        column_width - 60,
        font="Helvetica-Bold",
        size=8.2,
        leading=10.5,
        color=PAPER,
        max_lines=3,
    )

    sheet.footer()


def draw_prompt_brief(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 18
    content_top = sheet.height - 112
    content_bottom = 42
    column_width = (sheet.width - (2 * margin) - gap) / 2
    left_x = margin
    right_x = left_x + column_width + gap
    content_height = content_top - content_bottom

    sheet.rect(left_x, content_bottom, column_width, content_height, stroke=INK)
    sheet.rect(right_x, content_bottom, column_width, content_height, stroke=INK)

    # 1. Fill the brief
    section_y = content_top - 29
    sheet.section_title("1", "Fill the brief", left_x + 18, section_y)
    sheet.body(
        "Use facts you can approve. Leave out anything the AI should not see.",
        left_x + 18,
        section_y - 20,
        size=8.3,
    )

    def labelled_field(
        label: str,
        name: str,
        y: float,
        height: float,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, left_x + 18, y + height + 5)
        sheet.text_field(
            name,
            left_x + 18,
            y,
            column_width - 36,
            height,
            multiline=multiline,
            font_size=8.5,
        )

    labelled_field("Goal / what must change", "prompt_goal", section_y - 68, 24)
    labelled_field("Audience / who will use it", "prompt_audience", section_y - 108, 24)
    labelled_field("Context / what the AI needs to complete the task", "prompt_context", section_y - 168, 42, multiline=True)
    labelled_field("Approved source / what it may use", "prompt_source", section_y - 228, 42, multiline=True)
    labelled_field("Limits / what it must not claim or do", "prompt_limits", section_y - 288, 42, multiline=True)
    labelled_field("Output format / exact shape and length", "prompt_format", section_y - 328, 24)
    labelled_field("Example / a result or style to follow", "prompt_example", section_y - 388, 42, multiline=True)

    # 2. Assemble the request
    sheet.section_title("2", "Assemble the request", right_x + 18, section_y)
    sheet.body(
        "Put the brief in this order. Clear evidence beats clever wording.",
        right_x + 18,
        section_y - 20,
        size=8.3,
    )
    template_top = section_y - 45
    template_height = 118
    template_y = template_top - template_height
    sheet.rect(
        right_x + 18,
        template_y,
        column_width - 36,
        template_height,
        fill=INK,
        stroke=INK,
    )
    sheet.label("Prompt order", right_x + 30, template_top - 18, color=PALE_BLUE)
    template_lines = [
        "Complete this request using the brief below.",
        "Goal: [goal]   Audience: [audience]",
        "Context: [context]",
        "Use only: [approved source]",
        "Do not: [limits]",
        "Return: [output format]   Match: [example]",
    ]
    line_y = template_top - 38
    for index, line in enumerate(template_lines):
        sheet.c.setFillColor(PAPER if index == 0 else HexColor("#d9dffb"))
        sheet.c.setFont("Helvetica-Bold" if index == 0 else "Helvetica", 8)
        sheet.c.drawString(right_x + 30, line_y, line)
        line_y -= 13

    # 3. Shift & Lead worked example
    example_top = template_y - 12
    example_height = 132
    example_y = example_top - example_height
    sheet.rect(
        right_x + 18,
        example_y,
        column_width - 36,
        example_height,
        fill=PALE_BLUE,
        stroke=BRIGHT_BLUE,
    )
    sheet.label("Worked example / Shift & Lead follow-up", right_x + 30, example_top - 17)
    example_lines = [
        ("Goal", "Help the reader open and use the guide."),
        ("Audience", "A reader who requested the 10 AI words guide."),
        ("Context", "A reader did not open the 10 AI words guide email."),
        ("Source", "Use only the approved guide and original email."),
        ("Limits", "90 words. Do not invent results or add pressure."),
        ("Format", "Write 3 distinct subject lines and 1 follow-up email."),
        ("Example", "Direct, calm and specific. No hype."),
    ]
    line_y = example_top - 35
    for label, value in example_lines:
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7.1)
        sheet.c.drawString(right_x + 30, line_y, f"{label}:")
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.1)
        sheet.c.drawString(right_x + 77, line_y, value)
        line_y -= 12

    # 4. Review before use
    review_y = content_bottom + 15
    review_height = 112
    sheet.rect(
        right_x + 18,
        review_y,
        column_width - 36,
        review_height,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("4 / Review before you use the result", right_x + 30, review_y + review_height - 18)
    checks = [
        ("review_goal", "It answers the goal."),
        ("review_audience", "It fits the audience."),
        ("review_source", "Claims trace to the source."),
        ("review_limits", "It respects every limit."),
        ("review_format", "It follows the requested format."),
        ("review_human", "A person approves before use."),
    ]
    for index, (name, label) in enumerate(checks):
        col = index % 2
        row = index // 2
        x = right_x + 30 + col * 192
        y = review_y + review_height - 42 - row * 22
        sheet.checkbox(name, label, x, y)
    sheet.c.setFillColor(SIGNAL)
    sheet.c.setFont("Helvetica-Bold", 7.4)
    sheet.c.drawString(
        right_x + 30,
        review_y + 12,
        "If a claim cannot be traced to the source, remove it or verify it before use.",
    )

    sheet.footer()


def draw_workflow_or_agent(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 16
    content_top = sheet.height - 112
    content_bottom = 42
    left_width = 300
    right_width = sheet.width - (2 * margin) - gap - left_width
    left_x = margin
    right_x = left_x + left_width + gap
    content_height = content_top - content_bottom

    sheet.rect(left_x, content_bottom, left_width, content_height, stroke=INK)
    sheet.rect(right_x, content_bottom, right_width, content_height, stroke=INK)

    def large_checkbox(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=12,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 9.2)
        sheet.c.drawString(x + 18, y, label)

    # 1. Choose the lowest level of freedom that can do the task.
    section_y = content_top - 29
    sheet.section_title("1", "Choose the level", left_x + 16, section_y)
    sheet.body(
        "Start at 1. Move right only when the task needs more freedom.",
        left_x + 16,
        section_y - 20,
        size=9,
    )
    sheet.label("Real task", left_x + 16, section_y - 42)
    sheet.text_field(
        "agent_task",
        left_x + 16,
        section_y - 73,
        left_width - 32,
        24,
        font_size=9,
    )

    levels = [
        (
            "agent_level_chatbot",
            "1. Chatbot",
            "You need 1 answer, draft, summary or comparison. A person decides what happens next.",
        ),
        (
            "agent_level_workflow",
            "2. Workflow",
            "You can write every step, the trigger and the finish before the task starts.",
        ),
        (
            "agent_level_with_approval",
            "3. Agent with approval",
            "AI chooses between approved actions. A person approves each action before it happens.",
        ),
        (
            "agent_level_allowed_to_act",
            "4. Agent allowed to act",
            "Tests pass, the action is easy to reverse and a mistake costs little. Limits and logs are required.",
        ),
    ]
    card_top = section_y - 86
    card_height = 62
    card_gap = 5
    for index, (name, title, description) in enumerate(levels):
        y = card_top - card_height - index * (card_height + card_gap)
        sheet.rect(
            left_x + 16,
            y,
            left_width - 32,
            card_height,
            fill=PALE_BLUE if index >= 2 else PAPER,
            stroke=BRIGHT_BLUE if index >= 2 else LINE,
        )
        large_checkbox(name, title, left_x + 27, y + card_height - 19)
        sheet.wrapped_text(
            description,
            left_x + 27,
            y + 24,
            left_width - 54,
            font="Helvetica",
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )

    rule_y = content_bottom + 8
    sheet.rect(
        left_x + 16,
        rule_y,
        left_width - 32,
        39,
        fill=INK,
        stroke=INK,
    )
    sheet.wrapped_text(
        "When in doubt, choose the workflow. Require approval until access, results and failures are understood.",
        left_x + 27,
        rule_y + 24,
        left_width - 54,
        font="Helvetica-Bold",
        size=9,
        leading=10.5,
        color=PAPER,
        max_lines=2,
    )

    # 2. Use the identical guide-delivery scenario and exact 4 decision questions.
    sheet.section_title("2", "Answer 4 questions", right_x + 16, section_y)
    sheet.body(
        "Tick yes or no. Write the access, approval or next step beside it.",
        right_x + 16,
        section_y - 20,
        size=9,
    )
    inner_x = right_x + 16
    inner_width = right_width - 32
    example_top = section_y - 39
    example_height = 68
    example_y = example_top - example_height
    sheet.rect(
        inner_x,
        example_y,
        inner_width,
        example_height,
        fill=PALE_BLUE,
        stroke=BRIGHT_BLUE,
    )
    sheet.label("Shift & Lead scenario", inner_x + 12, example_top - 16)
    sheet.wrapped_text(
        "Shift & Lead uses a workflow to deliver a requested guide. If a reader sends an unusual reply, an agent may prepare a response from the approved guide library, but a person approves it before send.",
        inner_x + 12,
        example_top - 34,
        inner_width - 24,
        font="Helvetica",
        size=9,
        leading=11,
        color=INK,
        max_lines=3,
    )

    questions = [
        "Can you write every step before the task starts?",
        "Can you name the smallest access the task needs?",
        "Could a wrong action affect money, customers, private data, rights or reputation?",
        "Can you test the result, undo the action and see what the agent did?",
    ]
    question_top = example_y - 10
    question_height = 65
    question_gap = 5
    for index, question in enumerate(questions):
        y = question_top - question_height - index * (question_height + question_gap)
        sheet.rect(
            inner_x,
            y,
            inner_width,
            question_height,
            fill=PALE_BLUE if index % 2 else PAPER,
            stroke=LINE,
        )
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 9)
        sheet.c.drawString(inner_x + 11, y + question_height - 17, str(index + 1))
        sheet.wrapped_text(
            question,
            inner_x + 28,
            y + question_height - 17,
            inner_width - 39,
            font="Helvetica-Bold",
            size=9,
            leading=10.5,
            color=INK,
            max_lines=2,
        )
        large_checkbox(
            f"agent_question_{index + 1}_yes",
            "Yes",
            inner_x + 12,
            y + 13,
        )
        large_checkbox(
            f"agent_question_{index + 1}_no",
            "No",
            inner_x + 68,
            y + 13,
        )
        sheet.text_field(
            f"agent_question_{index + 1}_boundary",
            inner_x + 122,
            y + 7,
            inner_width - 134,
            24,
            font_size=9,
        )

    sheet.footer()


def draw_tool_comparison(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    content_width = sheet.width - (2 * margin)
    content_top = sheet.height - 112
    # 1. Define one fair test for every shortlisted tool.
    setup_y = 385
    sheet.rect(margin, setup_y, content_width, content_top - setup_y, fill=PAPER, stroke=INK)
    sheet.label("1 / Build 1 fair test", margin + 14, content_top - 15)
    sheet.body(
        "Enter 0 to 5 in the scorecard. For correction, access, cost and upkeep, 5 means the lowest burden.",
        margin + 190,
        content_top - 15,
        size=9,
        color=MUTED,
    )
    field_gap = 10
    inner_width = content_width - 28
    top_widths = [270, 225, inner_width - 270 - 225 - (2 * field_gap)]
    top_fields = [
        ("1 real job", "tool_test_real_job"),
        ("Same inputs and sources", "tool_test_same_inputs"),
        ("Shared quality check", "tool_test_quality_check"),
    ]
    field_x = margin + 14
    for width, (label, name) in zip(top_widths, top_fields):
        sheet.label(label, field_x, content_top - 32)
        sheet.text_field(name, field_x, setup_y + 40, width, 18, font_size=9)
        field_x += width + field_gap

    task_width = (inner_width - (2 * field_gap)) / 3
    task_x = margin + 14
    for index in range(3):
        sheet.label(f"Repeatable task {index + 1}", task_x, setup_y + 31)
        sheet.text_field(
            f"tool_test_task_{index + 1}",
            task_x,
            setup_y + 7,
            task_width,
            19,
            font_size=9,
        )
        task_x += task_width + field_gap

    # 2. All 10 tools receive equal rows and identical measures.
    table_y = 125
    table_height = 250
    header_height = 30
    row_height = 22
    tool_width = 94
    metric_width = (content_width - tool_width) / 6
    sheet.rect(margin, table_y, content_width, table_height, fill=PAPER, stroke=INK)
    headers = [
        "Useful result",
        "Source accuracy",
        "Correction effort",
        "Access",
        "Cost",
        "Upkeep",
    ]
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(margin + 10, table_y + table_height - 19, "Tool")
    for index, header in enumerate(headers):
        header_x = margin + tool_width + index * metric_width
        sheet.wrapped_text(
            header,
            header_x + 5,
            table_y + table_height - 15,
            metric_width - 10,
            font="Helvetica-Bold",
            size=9,
            leading=9.5,
            color=INK,
            max_lines=2,
        )

    tools = [
        ("chatgpt", "ChatGPT"),
        ("claude", "Claude"),
        ("gemini", "Gemini"),
        ("copilot", "Copilot"),
        ("grok", "Grok"),
        ("kimi", "Kimi"),
        ("manus", "Manus"),
        ("meta_ai", "Meta AI"),
        ("deepseek", "DeepSeek"),
        ("mistral", "Mistral"),
    ]
    row_top = table_y + table_height - header_height
    for row_index, (key, name) in enumerate(tools):
        row_y = row_top - ((row_index + 1) * row_height)
        if row_index % 2:
            sheet.c.setFillColor(PALE_BLUE)
            sheet.c.rect(margin + 1, row_y, content_width - 2, row_height, fill=1, stroke=0)
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 9)
        sheet.c.drawString(margin + 10, row_y + 7, name)
        metric_keys = ["useful", "source", "correction", "access", "cost", "upkeep"]
        for metric_index, metric_key in enumerate(metric_keys):
            field_x = margin + tool_width + metric_index * metric_width + 4
            sheet.text_field(
                f"tool_{key}_{metric_key}",
                field_x,
                row_y + 3,
                metric_width - 8,
                16,
                font_size=9,
            )

    # 3. Choose from the completed evidence, not from a demo or ranking.
    decision_y = 42
    decision_height = 73
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("3 / Choose from the evidence", margin + 14, decision_y + 54)
    sheet.body(
        "Keep the best checkable result with the least access and upkeep. Add another tool only for a different job with a clear gap.",
        margin + 14,
        decision_y + 38,
        size=9,
        color=MUTED,
    )
    decision_gap = 10
    decision_widths = [150, 390, inner_width - 150 - 390 - (2 * decision_gap)]
    decision_fields = [
        ("Chosen tool", "tool_test_chosen_tool"),
        ("Why it won this job", "tool_test_decision_evidence"),
        ("30-day review date", "tool_test_review_date"),
    ]
    field_x = margin + 14
    for width, (label, name) in zip(decision_widths, decision_fields):
        sheet.label(label, field_x, decision_y + 24)
        sheet.text_field(name, field_x, decision_y + 5, width, 16, font_size=9)
        field_x += width + decision_gap

    sheet.footer()


def draw_chatgpt_fit_test(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    task_bottom = 164
    card_width = (sheet.width - (2 * margin) - (2 * gap)) / 3
    card_height = content_top - task_bottom
    cards = [margin + index * (card_width + gap) for index in range(3)]

    for x in cards:
        sheet.rect(x, task_bottom, card_width, card_height, stroke=INK)

    title_y = content_top - 29

    def task_title(x: float, number: str, title: str, instruction: str) -> None:
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            instruction,
            x + 14,
            title_y - 20,
            card_width - 28,
            size=7.3,
            leading=8.8,
            color=MUTED,
            max_lines=2,
        )

    # Task 1: approved source to email and subject lines
    x = cards[0]
    task_title(
        x,
        "1",
        "Draft / 10 minutes",
        "Use an approved source. Produce a 90-word follow-up email and 3 distinct subject lines.",
    )
    inner_x = x + 14
    inner_width = card_width - 28
    sheet.label("Approved source", inner_x, title_y - 52)
    sheet.text_field(
        "chatgpt_draft_source",
        inner_x,
        title_y - 91,
        inner_width,
        32,
        multiline=True,
        font_size=8,
    )
    sheet.label("90-word follow-up / result notes", inner_x, title_y - 108)
    sheet.text_field(
        "chatgpt_draft_email_notes",
        inner_x,
        title_y - 149,
        inner_width,
        34,
        multiline=True,
        font_size=8,
    )
    sheet.label("3 distinct subject lines", inner_x, title_y - 166)
    subject_y = title_y - 195
    for index in range(3):
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(inner_x, subject_y + 7, str(index + 1))
        sheet.text_field(
            f"chatgpt_subject_{index + 1}",
            inner_x + 13,
            subject_y,
            inner_width - 13,
            21,
            font_size=7.8,
        )
        subject_y -= 27
    sheet.checkbox(
        "chatgpt_check_no_results",
        "No invented results.",
        inner_x,
        task_bottom + 30,
    )
    sheet.checkbox(
        "chatgpt_check_no_urgency",
        "No invented urgency.",
        inner_x + 116,
        task_bottom + 30,
    )

    # Task 2: clean spreadsheet and method check
    x = cards[1]
    task_title(
        x,
        "2",
        "File / 10 minutes",
        "Use 1 clean spreadsheet. Name the calculation or comparison, then inspect the method.",
    )
    inner_x = x + 14
    sheet.label("Clean spreadsheet / file", inner_x, title_y - 52)
    sheet.text_field(
        "chatgpt_spreadsheet",
        inner_x,
        title_y - 91,
        inner_width,
        32,
        multiline=True,
        font_size=8,
    )
    sheet.label("Named calculation or comparison", inner_x, title_y - 108)
    sheet.text_field(
        "chatgpt_calculation",
        inner_x,
        title_y - 149,
        inner_width,
        34,
        multiline=True,
        font_size=8,
    )
    sheet.label("Method check / what ChatGPT did", inner_x, title_y - 166)
    sheet.text_field(
        "chatgpt_method_check",
        inner_x,
        title_y - 215,
        inner_width,
        42,
        multiline=True,
        font_size=8,
    )
    sheet.label("Result / correction notes", inner_x, title_y - 232)
    sheet.text_field(
        "chatgpt_data_result_notes",
        inner_x,
        title_y - 265,
        inner_width,
        28,
        multiline=True,
        font_size=8,
    )
    sheet.checkbox(
        "chatgpt_check_full_file",
        "Full file used.",
        inner_x,
        task_bottom + 15,
    )
    sheet.checkbox(
        "chatgpt_check_method",
        "Requested method used.",
        inner_x + 104,
        task_bottom + 15,
    )

    # Task 3: current research and 3 checked citations
    x = cards[2]
    task_title(
        x,
        "3",
        "Research / 10 minutes",
        "Ask a current question. Open 3 cited pages and check that each claim is supported.",
    )
    inner_x = x + 14
    sheet.label("Current research question", inner_x, title_y - 52)
    sheet.text_field(
        "chatgpt_research_question",
        inner_x,
        title_y - 91,
        inner_width,
        32,
        multiline=True,
        font_size=8,
    )
    sheet.label("3 cited pages / open and check each one", inner_x, title_y - 108)
    page_y = title_y - 139
    for index in range(3):
        sheet.c.acroForm.checkbox(
            name=f"chatgpt_citation_{index + 1}_checked",
            tooltip=f"Cited page {index + 1} opened and checked",
            x=inner_x,
            y=page_y + 5,
            size=10,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(inner_x + 15, page_y + 8, str(index + 1))
        sheet.text_field(
            f"chatgpt_citation_{index + 1}_page",
            inner_x + 28,
            page_y,
            inner_width - 28,
            21,
            font_size=7.5,
        )
        page_y -= 28
    sheet.label("Unsupported claim or source note", inner_x, title_y - 222)
    sheet.text_field(
        "chatgpt_research_source_notes",
        inner_x,
        title_y - 264,
        inner_width,
        32,
        multiline=True,
        font_size=8,
    )
    sheet.checkbox(
        "chatgpt_check_sources_support",
        "Every kept claim is supported.",
        inner_x,
        task_bottom + 15,
    )

    # 4. Score the 3 results and make the decision
    score_y = 42
    score_height = 110
    sheet.rect(margin, score_y, sheet.width - (2 * margin), score_height, fill=PAPER, stroke=INK)
    sheet.section_title("4", "Score the result", margin + 14, score_y + score_height - 31)
    sheet.body(
        "Use 1 to 5. A high correction-effort score means the result needed a lot of repair.",
        margin + 14,
        score_y + score_height - 51,
        size=7.2,
    )
    metrics = [
        ("Useful time saved", "chatgpt_score_time"),
        ("Correction effort", "chatgpt_score_correction"),
        ("Source quality", "chatgpt_score_sources"),
        ("Data fit", "chatgpt_score_data_fit"),
    ]
    metric_x = margin + 14
    metric_y = score_y + 21
    metric_width = 104
    for index, (label, name) in enumerate(metrics):
        x = metric_x + index * 111
        sheet.label(label, x, metric_y + 28)
        sheet.text_field(name, x, metric_y, metric_width, 22, font_size=9)

    decision_x = margin + 475
    sheet.label("Final decision", decision_x, score_y + score_height - 25)
    sheet.checkbox("chatgpt_decision_keep", "Keep ChatGPT.", decision_x, score_y + 57)
    sheet.checkbox(
        "chatgpt_decision_test_another",
        "Test another tool.",
        decision_x + 102,
        score_y + 57,
    )
    sheet.checkbox(
        "chatgpt_decision_no_ai",
        "Use no AI.",
        decision_x + 219,
        score_y + 57,
    )
    sheet.label("Evidence for the decision", decision_x, score_y + 43)
    sheet.text_field(
        "chatgpt_decision_evidence",
        decision_x,
        score_y + 14,
        sheet.width - margin - decision_x - 14,
        24,
        font_size=8,
    )

    sheet.footer()


def draw_claude_document_test(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_bottom = 42
    content_height = content_top - content_bottom
    left_width = 250
    middle_width = 278
    right_width = sheet.width - (2 * margin) - (2 * gap) - left_width - middle_width
    left_x = margin
    middle_x = left_x + left_width + gap
    right_x = middle_x + middle_width + gap

    sheet.rect(left_x, content_bottom, left_width, content_height, stroke=INK)
    sheet.rect(middle_x, content_bottom, middle_width, content_height, stroke=INK)
    sheet.rect(right_x, content_bottom, right_width, content_height, stroke=INK)

    section_y = content_top - 29

    # 1. Prepare the same 3 files for every tool test
    sheet.section_title("1", "Prepare 3 files", left_x + 14, section_y)
    sheet.body(
        "Use short files you know well. Keep the same set for every tool.",
        left_x + 14,
        section_y - 20,
        size=7.2,
    )
    inner_x = left_x + 14
    inner_width = left_width - 28
    half_gap = 8
    half_width = (inner_width - half_gap) / 2
    sheet.label("Tool tested", inner_x, section_y - 43)
    sheet.text_field("document_test_tool", inner_x, section_y - 73, half_width, 24, font_size=8)
    sheet.label("Test date", inner_x + half_width + half_gap, section_y - 43)
    sheet.text_field(
        "document_test_date",
        inner_x + half_width + half_gap,
        section_y - 73,
        half_width,
        24,
        font_size=8,
    )

    sheet.label("Source file", inner_x, section_y - 93)
    sheet.label("Priority / version", inner_x + 132, section_y - 93)
    file_y = section_y - 124
    for index in range(3):
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(inner_x, file_y + 8, str(index + 1))
        sheet.text_field(
            f"document_file_{index + 1}",
            inner_x + 13,
            file_y,
            111,
            22,
            font_size=7.5,
        )
        sheet.text_field(
            f"document_priority_{index + 1}",
            inner_x + 132,
            file_y,
            inner_width - 132,
            22,
            font_size=7.5,
        )
        file_y -= 31

    sheet.label("Why these files belong together", inner_x, file_y - 1)
    sheet.text_field(
        "document_set_reason",
        inner_x,
        file_y - 50,
        inner_width,
        42,
        multiline=True,
        font_size=8,
    )

    rule_y = content_bottom + 16
    sheet.rect(inner_x, rule_y, inner_width, 91, fill=INK, stroke=INK)
    sheet.label("Fair test rule", inner_x + 11, rule_y + 72, color=PALE_BLUE)
    sheet.wrapped_text(
        "Use the same files, comparison question, 5 claim checks and time limit with another tool. Compare the evidence, not the tone.",
        inner_x + 11,
        rule_y + 54,
        inner_width - 22,
        font="Helvetica-Bold",
        size=7.6,
        leading=10,
        color=PAPER,
        max_lines=4,
    )

    # 2. Ask one comparison question and verify 5 claims
    sheet.section_title("2", "Compare and verify", middle_x + 14, section_y)
    sheet.body(
        "Ask what changed, where the files conflict and what remains unanswered.",
        middle_x + 14,
        section_y - 20,
        size=7.2,
    )
    middle_inner_x = middle_x + 14
    middle_inner_width = middle_width - 28
    sheet.label("Comparison question", middle_inner_x, section_y - 43)
    sheet.text_field(
        "document_comparison_question",
        middle_inner_x,
        section_y - 101,
        middle_inner_width,
        50,
        multiline=True,
        font_size=8,
    )
    sheet.label("5 claims / original file and page or section", middle_inner_x, section_y - 119)
    claim_y = section_y - 154
    for index in range(5):
        fill = PALE_BLUE if index % 2 else PAPER
        sheet.rect(
            middle_inner_x,
            claim_y - 2,
            middle_inner_width,
            31,
            fill=fill,
            stroke=LINE,
        )
        sheet.c.acroForm.checkbox(
            name=f"document_claim_{index + 1}_verified",
            tooltip=f"Claim {index + 1} verified in the original file",
            x=middle_inner_x + 6,
            y=claim_y + 8,
            size=10,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(middle_inner_x + 21, claim_y + 11, str(index + 1))
        sheet.text_field(
            f"document_claim_{index + 1}_source",
            middle_inner_x + 33,
            claim_y + 3,
            middle_inner_width - 39,
            21,
            font_size=7.2,
        )
        claim_y -= 36

    sheet.label("Missing, mixed up or unsupported", middle_inner_x, claim_y + 8)
    sheet.text_field(
        "document_claim_errors",
        middle_inner_x,
        content_bottom + 16,
        middle_inner_width,
        claim_y - content_bottom - 16,
        multiline=True,
        font_size=8,
    )

    # 3. Turn the verified comparison into useful work
    sheet.section_title("3", "Make 1 useful output", right_x + 14, section_y)
    sheet.body(
        "Use only the verified comparison. Then record the repair work.",
        right_x + 14,
        section_y - 20,
        size=7.2,
    )
    right_inner_x = right_x + 14
    right_inner_width = right_width - 28
    sheet.label("Output / decision note, revised brief or other", right_inner_x, section_y - 43)
    sheet.text_field(
        "document_useful_output",
        right_inner_x,
        section_y - 112,
        right_inner_width,
        60,
        multiline=True,
        font_size=8,
    )
    sheet.label("Errors found after the source check", right_inner_x, section_y - 131)
    sheet.text_field(
        "document_output_errors",
        right_inner_x,
        section_y - 192,
        right_inner_width,
        52,
        multiline=True,
        font_size=8,
    )
    sheet.label("Editing time / minutes", right_inner_x, section_y - 211)
    sheet.text_field(
        "document_editing_minutes",
        right_inner_x,
        section_y - 241,
        (right_inner_width - 8) / 2,
        24,
        font_size=8.5,
    )
    sheet.label("Useful time saved / minutes", right_inner_x + (right_inner_width + 8) / 2, section_y - 211)
    sheet.text_field(
        "document_time_saved_minutes",
        right_inner_x + (right_inner_width + 8) / 2,
        section_y - 241,
        (right_inner_width - 8) / 2,
        24,
        font_size=8.5,
    )
    sheet.label("Final decision", right_inner_x, section_y - 262)
    sheet.checkbox("document_decision_keep", "Keep this tool.", right_inner_x, section_y - 286)
    sheet.checkbox(
        "document_decision_test_another",
        "Test another tool.",
        right_inner_x + 104,
        section_y - 286,
    )
    sheet.checkbox("document_decision_no_ai", "Use no AI.", right_inner_x, section_y - 308)
    sheet.label("Evidence for the decision", right_inner_x, section_y - 330)
    sheet.text_field(
        "document_decision_evidence",
        right_inner_x,
        content_bottom + 16,
        right_inner_width,
        section_y - 353 - content_bottom,
        multiline=True,
        font_size=8,
    )

    sheet.footer()


def draw_gemini_workspace_test(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    precheck_y = 415
    precheck_height = content_top - precheck_y
    tasks_top = precheck_y - 10
    tasks_bottom = 158
    card_width = (sheet.width - (2 * margin) - (2 * gap)) / 3
    card_height = tasks_top - tasks_bottom
    cards = [margin + index * (card_width + gap) for index in range(3)]

    # Account, source and permission precheck
    sheet.rect(margin, precheck_y, sheet.width - (2 * margin), precheck_height, fill=PAPER, stroke=INK)
    sheet.label("Before the 3 tasks", margin + 14, content_top - 17)
    precheck_gap = 10
    precheck_width = (sheet.width - (2 * margin) - 28 - (2 * precheck_gap)) / 3
    precheck_x = margin + 14
    prechecks = [
        ("Account / Workspace used", "gemini_account"),
        ("Required email, files and source set", "gemini_required_sources"),
        ("Permission / what the account may access", "gemini_permission_check"),
    ]
    for index, (label, name) in enumerate(prechecks):
        x = precheck_x + index * (precheck_width + precheck_gap)
        sheet.label(label, x, content_top - 35)
        sheet.text_field(name, x, precheck_y + 9, precheck_width, 22, font_size=7.8)

    for x in cards:
        sheet.rect(x, tasks_bottom, card_width, card_height, stroke=INK)

    title_y = tasks_top - 29

    def task_title(x: float, number: str, title: str, instruction: str) -> None:
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            instruction,
            x + 14,
            title_y - 20,
            card_width - 28,
            size=7.1,
            leading=8.5,
            color=MUTED,
            max_lines=2,
        )

    # Task 1: Gmail
    x = cards[0]
    task_title(
        x,
        "1",
        "Gmail",
        "Use 1 known, non-sensitive thread. Compare the answer with the full thread.",
    )
    inner_x = x + 14
    inner_width = card_width - 28
    sheet.label("Known thread", inner_x, title_y - 49)
    sheet.text_field("gemini_gmail_thread", inner_x, title_y - 82, inner_width, 26, font_size=8)
    sheet.label("Decision", inner_x, title_y - 99)
    sheet.text_field("gemini_gmail_decision", inner_x, title_y - 130, inner_width, 24, font_size=8)
    half_gap = 8
    half_width = (inner_width - half_gap) / 2
    sheet.label("Owner", inner_x, title_y - 147)
    sheet.text_field("gemini_gmail_owner", inner_x, title_y - 178, half_width, 24, font_size=8)
    sheet.label("Deadline", inner_x + half_width + half_gap, title_y - 147)
    sheet.text_field(
        "gemini_gmail_deadline",
        inner_x + half_width + half_gap,
        title_y - 178,
        half_width,
        24,
        font_size=8,
    )
    sheet.label("Open question", inner_x, title_y - 195)
    sheet.text_field(
        "gemini_gmail_open_question",
        inner_x,
        tasks_bottom + 6,
        inner_width,
        24,
        multiline=True,
        font_size=8,
    )
    sheet.checkbox(
        "gemini_gmail_checked_thread",
        "Thread checked.",
        inner_x + 132,
        title_y - 99,
    )

    # Task 2: Docs or Drive
    x = cards[1]
    task_title(
        x,
        "2",
        "Docs or Drive",
        "Compare 3 named sources. Put the correct source beside every important claim.",
    )
    inner_x = x + 14
    sheet.label("3 named sources", inner_x, title_y - 49)
    source_y = title_y - 80
    for index in range(3):
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(inner_x, source_y + 8, str(index + 1))
        sheet.text_field(
            f"gemini_drive_source_{index + 1}",
            inner_x + 13,
            source_y,
            inner_width - 13,
            22,
            font_size=7.8,
        )
        source_y -= 30
    sheet.label("Comparison / recommendation notes", inner_x, source_y + 6)
    sheet.text_field(
        "gemini_drive_comparison",
        inner_x,
        tasks_bottom + 6,
        inner_width,
        40,
        multiline=True,
        font_size=8,
    )
    sheet.checkbox(
        "gemini_drive_claim_sources_checked",
        "Claims sourced.",
        inner_x + 139,
        source_y + 6,
    )

    # Task 3: NotebookLM
    x = cards[2]
    task_title(
        x,
        "3",
        "NotebookLM",
        "Ask 1 question across a selected source set. Open and verify 5 inline citations.",
    )
    inner_x = x + 14
    sheet.label("Question", inner_x, title_y - 49)
    sheet.text_field(
        "gemini_notebook_question",
        inner_x,
        title_y - 84,
        inner_width,
        28,
        multiline=True,
        font_size=8,
    )
    sheet.label("Selected source set", inner_x, title_y - 101)
    sheet.text_field(
        "gemini_notebook_source_set",
        inner_x,
        title_y - 136,
        inner_width,
        28,
        multiline=True,
        font_size=8,
    )
    sheet.label("5 inline citations / source or page", inner_x, title_y - 153)
    citation_width = (inner_width - 16) / 3
    citation_positions = [
        (0, 0),
        (1, 0),
        (2, 0),
        (0, 1),
        (1, 1),
    ]
    for index, (col, row) in enumerate(citation_positions):
        item_x = inner_x + col * (citation_width + 8)
        item_y = title_y - 184 - row * 30
        sheet.c.acroForm.checkbox(
            name=f"gemini_notebook_citation_{index + 1}_checked",
            tooltip=f"NotebookLM citation {index + 1} opened and verified",
            x=item_x,
            y=item_y + 5,
            size=10,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(item_x + 14, item_y + 8, str(index + 1))
        sheet.text_field(
            f"gemini_notebook_citation_{index + 1}_source",
            item_x + 26,
            item_y,
            citation_width - 26,
            21,
            font_size=7.2,
        )

    # 4. Record quality, time and final decision
    score_y = 42
    score_height = 106
    sheet.rect(margin, score_y, sheet.width - (2 * margin), score_height, fill=PAPER, stroke=INK)
    sheet.label("4 / Record quality and decide", margin + 14, score_y + score_height - 19)
    field_y = score_y + 15
    first_width = 175
    second_width = 175
    sheet.label("Missing context", margin + 14, field_y + 50)
    sheet.text_field(
        "gemini_missing_context",
        margin + 14,
        field_y,
        first_width,
        42,
        multiline=True,
        font_size=8,
    )
    second_x = margin + 14 + first_width + 10
    sheet.label("Unsupported claims", second_x, field_y + 50)
    sheet.text_field(
        "gemini_unsupported_claims",
        second_x,
        field_y,
        second_width,
        42,
        multiline=True,
        font_size=8,
    )
    time_x = second_x + second_width + 12
    time_width = 100
    small_time_width = 46
    sheet.label("Fix / min", time_x, field_y + 50)
    sheet.text_field(
        "gemini_correction_minutes",
        time_x,
        field_y,
        small_time_width,
        42,
        font_size=8.5,
    )
    sheet.label("Saved / min", time_x + small_time_width + 8, field_y + 50)
    sheet.text_field(
        "gemini_time_saved_minutes",
        time_x + small_time_width + 8,
        field_y,
        small_time_width,
        42,
        font_size=8.5,
    )
    decision_x = time_x + time_width + 14
    sheet.label("Final decision", decision_x, field_y + 50)
    sheet.checkbox("gemini_decision_keep", "Keep Gemini.", decision_x, field_y + 26)
    sheet.checkbox(
        "gemini_decision_test_another",
        "Test another tool.",
        decision_x + 101,
        field_y + 26,
    )
    sheet.checkbox("gemini_decision_no_ai", "Use no AI.", decision_x, field_y + 5)
    sheet.checkbox(
        "gemini_two_tasks_passed",
        "Useful on at least 2 of 3 tasks.",
        decision_x + 101,
        field_y + 5,
    )

    sheet.footer()


def draw_copilot_microsoft_365_test(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    precheck_y = 420
    tasks_top = precheck_y - 10
    tasks_bottom = 178
    card_width = (sheet.width - (2 * margin) - (2 * gap)) / 3
    cards = [margin + index * (card_width + gap) for index in range(3)]

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Permission and source precheck. This describes expected access without
    # promising that a specific Microsoft 365 surface is available.
    sheet.rect(
        margin,
        precheck_y,
        sheet.width - (2 * margin),
        content_top - precheck_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Before the 3 tasks", margin + 14, content_top - 17)
    precheck_gap = 10
    precheck_width = (sheet.width - (2 * margin) - 28 - (2 * precheck_gap)) / 3
    precheck_x = margin + 14
    prechecks = [
        ("Representative signed-in user", "copilot_test_user"),
        ("Information each task should use", "copilot_expected_sources"),
        ("Groups, links and locations already accessible", "copilot_existing_access"),
    ]
    for index, (label, name) in enumerate(prechecks):
        x = precheck_x + index * (precheck_width + precheck_gap)
        sheet.label(label, x, content_top - 35)
        sheet.text_field(name, x, precheck_y + 5, precheck_width, 18, font_size=9)

    for x in cards:
        sheet.rect(x, tasks_bottom, card_width, tasks_top - tasks_bottom, stroke=INK)

    title_y = tasks_top - 29

    def task_title(x: float, number: str, title: str, instruction: str) -> None:
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            instruction,
            x + 14,
            title_y - 20,
            card_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )

    # Task 1: Outlook
    x = cards[0]
    inner_x = x + 14
    inner_width = card_width - 28
    task_title(
        x,
        "1",
        "Outlook",
        "Use 1 familiar thread. Open the cited messages before drafting or sending.",
    )
    sheet.label("Known thread", inner_x, title_y - 50)
    sheet.text_field("copilot_outlook_thread", inner_x, title_y - 82, inner_width, 25, font_size=9)
    sheet.label("Summary / reply result", inner_x, title_y - 100)
    sheet.text_field(
        "copilot_outlook_result",
        inner_x,
        title_y - 136,
        inner_width,
        28,
        multiline=True,
        font_size=9,
    )
    bottom_gap = 7
    bottom_width = (inner_width - (2 * bottom_gap)) / 3
    sheet.label("Missing context", inner_x, title_y - 155)
    sheet.text_field(
        "copilot_outlook_missing_context",
        inner_x,
        tasks_bottom + 7,
        bottom_width,
        28,
        multiline=True,
        font_size=9,
    )
    sheet.label("Fix / min", inner_x + bottom_width + bottom_gap, title_y - 155)
    sheet.text_field(
        "copilot_outlook_correction_minutes",
        inner_x + bottom_width + bottom_gap,
        tasks_bottom + 7,
        bottom_width,
        28,
        font_size=9,
    )
    sheet.label("Saved / min", inner_x + (2 * (bottom_width + bottom_gap)), title_y - 155)
    sheet.text_field(
        "copilot_outlook_time_saved_minutes",
        inner_x + (2 * (bottom_width + bottom_gap)),
        tasks_bottom + 7,
        bottom_width,
        28,
        font_size=9,
    )
    check9(
        "copilot_outlook_citations_checked",
        "Cited messages checked.",
        inner_x + 104,
        title_y - 100,
    )

    # Task 2: Teams
    x = cards[1]
    inner_x = x + 14
    task_title(
        x,
        "2",
        "Teams",
        "Use 1 available transcript. The meeting owner confirms every item.",
    )
    sheet.label("Meeting / transcript", inner_x, title_y - 50)
    sheet.text_field("copilot_teams_transcript", inner_x, title_y - 82, inner_width, 25, font_size=9)
    check9(
        "copilot_teams_transcript_available",
        "Transcript available.",
        inner_x + 109,
        title_y - 50,
    )
    sheet.label("Decision / owner / deadline / unresolved question", inner_x, title_y - 100)
    sheet.text_field(
        "copilot_teams_result",
        inner_x,
        title_y - 151,
        inner_width,
        43,
        multiline=True,
        font_size=9,
    )
    sheet.label("Time notes", inner_x, title_y - 159)
    sheet.text_field(
        "copilot_teams_time_notes",
        inner_x,
        tasks_bottom + 7,
        inner_width,
        28,
        multiline=True,
        font_size=9,
    )
    check9(
        "copilot_teams_owner_confirmed",
        "Owner confirmed every item.",
        inner_x + 83,
        title_y - 159,
    )

    # Task 3: Microsoft files. Word and PowerPoint share one source-based test;
    # Excel has a separate method check inside the same file task.
    x = cards[2]
    inner_x = x + 14
    task_title(
        x,
        "3",
        "Microsoft files",
        "Word, PowerPoint and Excel: use named, permitted files. Check every source and the spreadsheet method.",
    )
    sheet.label("Word / PowerPoint named files", inner_x, title_y - 50)
    sheet.text_field(
        "copilot_word_powerpoint_files",
        inner_x,
        title_y - 82,
        inner_width,
        25,
        multiline=True,
        font_size=9,
    )
    sheet.label("Draft or comparison / source check", inner_x, title_y - 100)
    sheet.text_field(
        "copilot_word_powerpoint_result",
        inner_x,
        title_y - 136,
        inner_width,
        28,
        multiline=True,
        font_size=9,
    )
    sheet.label("Excel file / calculation / method", inner_x, title_y - 153)
    sheet.text_field(
        "copilot_excel_file_and_method_check",
        inner_x,
        tasks_bottom + 7,
        inner_width,
        35,
        multiline=True,
        font_size=9,
    )
    check9(
        "copilot_file_sources_opened",
        "Sources opened.",
        inner_x + 143,
        title_y - 153,
    )

    # Permission decision and rollout gate
    decision_y = 42
    decision_height = 126
    sheet.rect(
        margin,
        decision_y,
        sheet.width - (2 * margin),
        decision_height,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("4 / Permission decision before another user is added", margin + 14, decision_y + decision_height - 19)
    inner_width_total = sheet.width - (2 * margin) - 28
    field_gap = 9
    field_widths = [184, 158, 158, inner_width_total - 184 - 158 - 158 - (3 * field_gap)]
    labels = [
        ("Access to remove", "copilot_access_remove"),
        ("Groups to review", "copilot_groups_review"),
        ("Content to label", "copilot_content_label"),
        ("Responsible person", "copilot_permission_owner"),
    ]
    field_x = margin + 14
    for width, (label, name) in zip(field_widths, labels):
        sheet.label(label, field_x, decision_y + 79)
        sheet.text_field(
            name,
            field_x,
            decision_y + 42,
            width,
            30,
            multiline=True,
            font_size=9,
        )
        field_x += width + field_gap

    check9(
        "copilot_gate_two_tasks",
        "At least 2 tasks save useful time.",
        margin + 14,
        decision_y + 16,
    )
    check9(
        "copilot_gate_results_checked",
        "Every important result is checked.",
        margin + 222,
        decision_y + 16,
    )
    check9(
        "copilot_gate_no_unexplained_access",
        "No unexplained access remains open.",
        margin + 440,
        decision_y + 16,
    )

    sheet.footer()


def draw_live_signal_verification_checklist(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Capture the exact live item before summarising it.
    capture_y = 413
    sheet.rect(
        margin,
        capture_y,
        content_width,
        content_top - capture_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Before you use the signal", margin + 14, content_top - 15)
    field_gap = 10
    field_widths = [320, 190, content_width - 28 - 320 - 190 - (2 * field_gap)]
    capture_fields = [
        ("Exact claim or trend", "signal_exact_claim", True),
        ("Where found + timestamp", "signal_where_and_when", False),
        ("Original post, account or thread", "signal_original_location", False),
    ]
    field_x = margin + 14
    for width, (label, name, multiline) in zip(field_widths, capture_fields):
        sheet.label(label, field_x, content_top - 32)
        sheet.text_field(
            name,
            field_x,
            capture_y + 7,
            width,
            25,
            multiline=multiline,
            font_size=9,
        )
        field_x += width + field_gap

    # The guide asks readers to identify what kind of item they are seeing.
    classify_y = 374
    sheet.rect(margin, classify_y, content_width, 29, fill=PAPER, stroke=INK)
    sheet.label("Choose 1 label", margin + 14, classify_y + 18)
    classifications = [
        ("Fact", "signal_type_fact", 120),
        ("First-hand report", "signal_type_first_hand", 176),
        ("Opinion", "signal_type_opinion", 298),
        ("Prediction", "signal_type_prediction", 370),
        ("Joke", "signal_type_joke", 463),
        ("Promotion", "signal_type_promotion", 520),
        ("Unknown", "signal_type_unknown", 615),
    ]
    for label, name, offset in classifications:
        check9(name, label, margin + offset, classify_y + 11)

    # A concrete use of the process from the guide's own Shift & Lead context.
    example_y = 333
    sheet.rect(margin, example_y, content_width, 31, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead example", margin + 14, example_y + 18)
    sheet.wrapped_text(
        "Before a new AI announcement enters a guide, collect 5 repeated questions, 3 first-hand sources and the exact posts. Open the official announcement and use that primary source in the guide research.",
        margin + 131,
        example_y + 18,
        content_width - 147,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    panel_top = 323
    panel_bottom = 122
    panel_width = (content_width - (2 * gap)) / 3
    panels = [margin + index * (panel_width + gap) for index in range(3)]
    for x in panels:
        sheet.rect(x, panel_bottom, panel_width, panel_top - panel_bottom, stroke=INK)

    title_y = panel_top - 29
    inner_width = panel_width - 28

    def panel_title(x: float, number: str, title: str, instruction: str) -> None:
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            instruction,
            x + 14,
            title_y - 20,
            panel_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )

    # 1. Open the original material rather than verifying a screenshot with a screenshot.
    x = panels[0]
    inner_x = x + 14
    panel_title(
        x,
        "1",
        "Open the original",
        "Open the original post, account and full thread before you judge the claim.",
    )
    check9("signal_original_post_opened", "Original post opened.", inner_x, title_y - 57)
    check9("signal_account_checked", "Account checked.", inner_x + 119, title_y - 57)
    check9("signal_full_thread_opened", "Full thread opened.", inner_x, title_y - 74)
    sheet.label("Earliest available source", inner_x, title_y - 94)
    sheet.text_field(
        "signal_earliest_source",
        inner_x,
        title_y - 126,
        inner_width,
        24,
        multiline=True,
        font_size=9,
    )
    sheet.label("What later posts changed", inner_x, title_y - 135)
    sheet.text_field(
        "signal_later_change",
        inner_x,
        panel_bottom + 9,
        inner_width,
        19,
        multiline=True,
        font_size=9,
    )

    # 2. Look outside the repost chain and actively search for disproof.
    x = panels[1]
    inner_x = x + 14
    panel_title(
        x,
        "2",
        "Find stronger proof",
        "Find an independent primary source. Search for evidence that could prove the claim false.",
    )
    sheet.label("Independent primary source outside the repost chain", inner_x, title_y - 57)
    sheet.text_field(
        "signal_independent_primary_source",
        inner_x,
        title_y - 99,
        inner_width,
        34,
        multiline=True,
        font_size=9,
    )
    sheet.label("What would prove it false + what you found", inner_x, title_y - 113)
    sheet.text_field(
        "signal_disproof_search",
        inner_x,
        panel_bottom + 9,
        inner_width,
        42,
        multiline=True,
        font_size=9,
    )

    # 3. Keep the final statement narrower than the evidence.
    x = panels[2]
    inner_x = x + 14
    panel_title(
        x,
        "3",
        "Decide what you can say",
        "Separate what the evidence proves from its limits. Use the narrowest supported statement.",
    )
    sheet.label("What the evidence proves", inner_x, title_y - 51)
    sheet.text_field(
        "signal_evidence_proves",
        inner_x,
        title_y - 81,
        inner_width,
        23,
        multiline=True,
        font_size=9,
    )
    sheet.label("Limits or missing proof", inner_x, title_y - 99)
    sheet.text_field(
        "signal_evidence_limits",
        inner_x,
        title_y - 122,
        inner_width,
        16,
        multiline=True,
        font_size=9,
    )
    sheet.label("Narrowest statement, or do not use it", inner_x, title_y - 133)
    sheet.text_field(
        "signal_narrow_statement",
        inner_x,
        panel_bottom + 9,
        inner_width,
        20,
        multiline=True,
        font_size=9,
    )

    # Completion gate follows the guide's completion rule exactly.
    gate_y = 42
    gate_height = 70
    sheet.rect(margin, gate_y, content_width, gate_height, fill=PAPER, stroke=INK)
    sheet.label("4 / Proof gate before the claim travels further", margin + 14, gate_y + 50)
    sheet.body(
        "Use the claim only when you can open the original evidence, explain its limits and stay inside what the evidence proves.",
        margin + 14,
        gate_y + 34,
        size=9,
        color=MUTED,
    )
    check9("signal_gate_original_evidence", "Original evidence opens.", margin + 14, gate_y + 13)
    check9("signal_gate_limits_explained", "Limits are explained.", margin + 234, gate_y + 13)
    check9(
        "signal_gate_statement_supported",
        "Statement does not exceed the proof.",
        margin + 431,
        gate_y + 13,
    )

    sheet.footer()


def draw_meta_ai_safe_use_card(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Name the low-risk task and the information before anything is pasted.
    task_y = 413
    sheet.rect(
        margin,
        task_y,
        content_width,
        content_top - task_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Before you paste anything", margin + 14, content_top - 15)
    field_gap = 10
    field_widths = [150, 230, content_width - 28 - 150 - 230 - (2 * field_gap)]
    task_fields = [
        ("Meta app", "meta_ai_app", False),
        ("Low-risk task", "meta_ai_task", False),
        ("Information or prompt you plan to use", "meta_ai_planned_input", True),
    ]
    field_x = margin + 14
    for width, (label, name, multiline) in zip(field_widths, task_fields):
        sheet.label(label, field_x, content_top - 32)
        sheet.text_field(
            name,
            field_x,
            task_y + 7,
            width,
            25,
            multiline=multiline,
            font_size=9,
        )
        field_x += width + field_gap

    # Use the same public communication and visual example as the guide.
    example_y = 365
    sheet.rect(margin, example_y, content_width, 38, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead example", margin + 14, example_y + 24)
    sheet.wrapped_text(
        "Paste only a published guide summary. Ask for 3 caption angles or a quick visual concept. Use no protected client assets. Remove unsupported claims, then check rights, accuracy and brand fit before publishing.",
        margin + 131,
        example_y + 24,
        content_width - 147,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    def question_card(
        x: float,
        y: float,
        width: float,
        height: float,
        number: str,
        title: str,
        question: str,
        yes_name: str,
        yes_text: str,
        no_name: str,
        no_text: str,
    ) -> None:
        sheet.rect(x, y, width, height, fill=PAPER, stroke=INK)
        title_y = y + height - 30
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            question,
            x + 14,
            title_y - 19,
            width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )
        half_gap = 12
        half_width = (width - 28 - half_gap) / 2
        check_y = y + 36
        left_x = x + 14
        right_x = left_x + half_width + half_gap
        check9(yes_name, "Yes", left_x, check_y)
        check9(no_name, "No", right_x, check_y)
        sheet.wrapped_text(
            yes_text,
            left_x,
            y + 21,
            half_width,
            size=9,
            leading=10,
            color=INK,
            max_lines=2,
        )
        sheet.wrapped_text(
            no_text,
            right_x,
            y + 21,
            half_width,
            size=9,
            leading=10,
            color=INK,
            max_lines=2,
        )

    card_width = (content_width - gap) / 2
    left_x = margin
    right_x = margin + card_width + gap
    top_y = 245
    top_height = 110
    bottom_y = 126
    bottom_height = 109

    question_card(
        left_x,
        top_y,
        card_width,
        top_height,
        "1",
        "Public input",
        "Is every input already public or invented only for this test?",
        "meta_public_input_yes",
        "Continue to question 2.",
        "meta_public_input_no",
        "Remove private details or use an approved business tool.",
    )
    question_card(
        right_x,
        top_y,
        card_width,
        top_height,
        "2",
        "Private details",
        "Does it include customer, employee, financial, contract or login information?",
        "meta_private_details_yes",
        "Stop. Keep it out of the consumer AI chat.",
        "meta_private_details_no",
        "Continue to question 3.",
    )
    question_card(
        left_x,
        bottom_y,
        card_width,
        bottom_height,
        "3",
        "Human review",
        "Can a person check the result before it is sent or published?",
        "meta_human_review_yes",
        "Use Meta AI for a draft or idea, then review it.",
        "meta_human_review_no",
        "Do not use the result in the business process.",
    )
    question_card(
        right_x,
        bottom_y,
        card_width,
        bottom_height,
        "4",
        "Screenshot test",
        "Would you be comfortable if the prompt appeared in a public screenshot?",
        "meta_screenshot_test_yes",
        "The low-risk test can proceed.",
        "meta_screenshot_test_no",
        "Move the task to an approved system with the correct controls.",
    )

    # The decision rule is presented as one clear action, not a vague score.
    decision_y = 42
    decision_height = 74
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("Choose 1 final action", margin + 14, decision_y + 53)
    sheet.body(
        "Use Meta AI only when the information is safe to share, the result is easy to check and the task needs no controlled business access.",
        margin + 14,
        decision_y + 37,
        size=9,
        color=MUTED,
    )
    check9("meta_action_proceed", "Proceed with a public, low-risk draft.", margin + 14, decision_y + 14)
    check9("meta_action_replace", "Replace details with a public or invented example.", margin + 281, decision_y + 14)
    check9("meta_action_approved_system", "Move to an approved business system.", margin + 565, decision_y + 14)

    sheet.footer()


def draw_deepseek_data_deployment_checklist(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # The page treats the chat, API connection and private host as separate setups.
    setup_y = 413
    sheet.rect(
        margin,
        setup_y,
        content_width,
        content_top - setup_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Choose 1 exact setup", margin + 14, content_top - 15)
    route_y = setup_y + 30
    check9("deepseek_route_chat", "Hosted chat", margin + 14, route_y)
    check9(
        "deepseek_route_api",
        "API or direct software connection",
        margin + 126,
        route_y,
    )
    check9(
        "deepseek_route_private_host",
        "Privately hosted model",
        margin + 344,
        route_y,
    )
    exact_x = margin + 529
    exact_width = content_width - 543
    sheet.label("Exact service, endpoint, host or model release", exact_x, content_top - 25)
    sheet.text_field(
        "deepseek_exact_setup",
        exact_x,
        setup_y + 7,
        exact_width,
        24,
        multiline=True,
        font_size=9,
    )

    # The comparison example comes directly from the guide's first work test.
    example_y = 365
    sheet.rect(margin, example_y, content_width, 38, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead example", margin + 14, example_y + 24)
    sheet.wrapped_text(
        "Use public or invented inputs. Run the same known task in the current tool and this setup. Record accuracy, correction work, speed, cost and the people or systems needed to keep it running.",
        margin + 131,
        example_y + 24,
        content_width - 147,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    card_width = (content_width - (2 * gap)) / 3
    card_xs = [margin + index * (card_width + gap) for index in range(3)]

    def review_card(
        x: float,
        y: float,
        height: float,
        number: str,
        title: str,
        prompt: str,
        field_name: str,
    ) -> None:
        sheet.rect(x, y, card_width, height, fill=PAPER, stroke=INK)
        title_y = y + height - 30
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            prompt,
            x + 14,
            title_y - 19,
            card_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )
        sheet.text_field(
            field_name,
            x + 14,
            y + 10,
            card_width - 28,
            31,
            multiline=True,
            font_size=9,
        )

    top_y = 245
    top_height = 110
    bottom_y = 126
    bottom_height = 109
    review_card(
        card_xs[0],
        top_y,
        top_height,
        "1",
        "Data path",
        "List every input, output, log and backup. Add where each is processed and how long it is kept.",
        "deepseek_data_path",
    )
    review_card(
        card_xs[1],
        top_y,
        top_height,
        "2",
        "Terms and licence",
        "Link the current terms, privacy policy, model licence and any licence inherited from a base model.",
        "deepseek_terms_and_licence",
    )
    review_card(
        card_xs[2],
        top_y,
        top_height,
        "3",
        "Security and location",
        "Name the contract, privacy, security and location rules this exact setup must meet.",
        "deepseek_security_requirements",
    )
    review_card(
        card_xs[0],
        bottom_y,
        bottom_height,
        "4",
        "Hosting and updates",
        "Name the host, infrastructure, dependencies, update plan and monitoring needed to run it.",
        "deepseek_hosting_and_updates",
    )
    review_card(
        card_xs[1],
        bottom_y,
        bottom_height,
        "5",
        "Owners and support",
        "Name who owns access, updates, support, incident response and model replacement.",
        "deepseek_owners_and_support",
    )
    review_card(
        card_xs[2],
        bottom_y,
        bottom_height,
        "6",
        "Work test",
        "Record quality, correction work, speed, cost and maintenance against the current tool.",
        "deepseek_work_test_result",
    )

    # Approve the named setup, never the model name in general.
    decision_y = 42
    decision_height = 74
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("7 / Decision for this exact setup", margin + 14, decision_y + 53)
    sheet.body(
        "Decide only when the deployment, licence, data path, owner and test result are documented.",
        margin + 14,
        decision_y + 37,
        size=9,
        color=MUTED,
    )
    check9("deepseek_decision_approve", "Approve", margin + 14, decision_y + 14)
    check9("deepseek_decision_restrict", "Restrict", margin + 111, decision_y + 14)
    check9("deepseek_decision_reject", "Reject", margin + 218, decision_y + 14)
    approver_x = margin + 322
    sheet.label("Authorized approver", approver_x, decision_y + 29)
    sheet.text_field(
        "deepseek_authorized_approver",
        approver_x,
        decision_y + 7,
        content_width - 336,
        19,
        font_size=9,
    )

    sheet.footer()


def draw_kimi_long_file_coding_test(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Choose the test and the Kimi product before comparing results.
    setup_y = 413
    sheet.rect(
        margin,
        setup_y,
        content_width,
        content_top - setup_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Choose 1 test", margin + 14, content_top - 15)
    check9("kimi_test_long_file", "Long file", margin + 14, setup_y + 30)
    check9("kimi_test_code", "Code", margin + 111, setup_y + 30)
    sheet.label("Choose the Kimi mode", margin + 210, content_top - 15)
    check9("kimi_mode_assistant", "Kimi assistant", margin + 210, setup_y + 30)
    check9("kimi_mode_work", "Kimi Work", margin + 337, setup_y + 30)
    check9("kimi_mode_code", "Kimi Code", margin + 440, setup_y + 30)
    current_tool_x = margin + 548
    sheet.label("Current comparison tool", current_tool_x, content_top - 25)
    sheet.text_field(
        "kimi_current_tool",
        current_tool_x,
        setup_y + 7,
        content_width - 562,
        24,
        font_size=9,
    )

    # The two bounded tests come directly from the page.
    example_y = 365
    sheet.rect(margin, example_y, content_width, 38, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead test", margin + 14, example_y + 24)
    sheet.wrapped_text(
        "Long file: ask the same 5 questions, require page or section references and score 10 claims. Code: use a solved issue on a separate branch, limit changed files, run tests and inspect the diff.",
        margin + 119,
        example_y + 24,
        content_width - 135,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    # Define one known task, one source boundary and one identical brief.
    card_y = 271
    card_height = 84
    card_width = (content_width - (2 * gap)) / 3
    card_xs = [margin + index * (card_width + gap) for index in range(3)]

    def setup_card(
        x: float,
        number: str,
        title: str,
        prompt: str,
        field_name: str,
    ) -> None:
        sheet.rect(x, card_y, card_width, card_height, fill=PAPER, stroke=INK)
        title_y = card_y + card_height - 25
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            prompt,
            x + 14,
            title_y - 19,
            card_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )
        sheet.text_field(
            field_name,
            x + 14,
            card_y + 6,
            card_width - 28,
            16,
            multiline=True,
            font_size=9,
        )

    setup_card(
        card_xs[0],
        "1",
        "Task and finish line",
        "Name the known file question or solved code issue and what a correct result must contain.",
        "kimi_known_task_finish_line",
    )
    setup_card(
        card_xs[1],
        "2",
        "Allowed sources",
        "List every file, folder, site or repository allowed, plus anything the tool must not open or change.",
        "kimi_allowed_sources_access",
    )
    setup_card(
        card_xs[2],
        "3",
        "Identical brief",
        "Use the same input, output format, limits and checks in Kimi and the current tool.",
        "kimi_identical_brief_limits",
    )

    # Compare the two results using the exact evidence that matters for this guide.
    table_y = 137
    table_height = 124
    sheet.rect(margin, table_y, content_width, table_height, fill=PAPER, stroke=INK)
    metric_width = 184
    result_gap = 8
    result_width = (content_width - 28 - metric_width - result_gap) / 2
    metric_x = margin + 14
    kimi_x = metric_x + metric_width
    current_x = kimi_x + result_width + result_gap
    sheet.label("4 / Compare the finished results", metric_x, table_y + table_height - 18)
    sheet.label("Kimi result", kimi_x, table_y + table_height - 18)
    sheet.label("Current tool result", current_x, table_y + table_height - 18)
    metrics = [
        ("Source fidelity and references", "source_fidelity"),
        ("Editable final file or code change", "editability"),
        ("Factual errors or failed tests", "errors"),
        ("Correction work and time", "correction"),
        ("Unexpected action or maintenance", "maintenance"),
    ]
    first_row_y = table_y + 83
    row_step = 19
    for index, (label, suffix) in enumerate(metrics):
        field_y = first_row_y - (index * row_step)
        sheet.body(label, metric_x, field_y + 4, size=9, color=INK)
        sheet.text_field(
            f"kimi_result_{suffix}",
            kimi_x,
            field_y,
            result_width,
            17,
            font_size=9,
        )
        sheet.text_field(
            f"kimi_current_{suffix}",
            current_x,
            field_y,
            result_width,
            17,
            font_size=9,
        )

    # The completion rule asks whether Kimi solves a named gap well enough to keep.
    decision_y = 42
    decision_height = 85
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("5 / Decision for this tested task", margin + 14, decision_y + 64)
    sheet.body(
        "Keep Kimi only when it solves a named gap better, with acceptable access, correction work and maintenance.",
        margin + 14,
        decision_y + 47,
        size=9,
        color=MUTED,
    )
    check9("kimi_decision_keep", "Keep Kimi for this gap.", margin + 14, decision_y + 19)
    check9("kimi_decision_retest", "Retest with tighter limits.", margin + 253, decision_y + 19)
    check9("kimi_decision_do_not_add", "Do not add Kimi.", margin + 505, decision_y + 19)

    sheet.footer()


def draw_manus_task_permission_map(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Name the task and every Manus setup it needs.
    setup_y = 413
    sheet.rect(
        margin,
        setup_y,
        content_width,
        content_top - setup_y,
        fill=PAPER,
        stroke=INK,
    )
    sheet.label("Mark every Manus setup needed", margin + 14, content_top - 15)
    check9("manus_setup_agent_mode", "Agent mode", margin + 14, setup_y + 30)
    check9("manus_setup_cloud_browser", "Cloud browser", margin + 126, setup_y + 30)
    check9("manus_setup_browser_operator", "Browser Operator", margin + 267, setup_y + 30)
    goal_x = margin + 432
    sheet.label("Goal in 1 sentence", goal_x, content_top - 25)
    sheet.text_field(
        "manus_task_goal",
        goal_x,
        setup_y + 7,
        content_width - 446,
        24,
        multiline=True,
        font_size=9,
    )

    # The bounded public-source example is the first task on the page.
    example_y = 365
    sheet.rect(margin, example_y, content_width, 38, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead example", margin + 14, example_y + 24)
    sheet.wrapped_text(
        "Research a public guide topic into a source table. Name the allowed domains and required columns. Leave a row blank when the primary source cannot be verified, then check every link.",
        margin + 131,
        example_y + 24,
        content_width - 147,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    card_width = (content_width - (2 * gap)) / 3
    card_xs = [margin + index * (card_width + gap) for index in range(3)]

    def boundary_card(
        x: float,
        y: float,
        height: float,
        number: str,
        title: str,
        prompt: str,
        field_name: str,
    ) -> None:
        sheet.rect(x, y, card_width, height, fill=PAPER, stroke=INK)
        title_y = y + height - 30
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            prompt,
            x + 14,
            title_y - 19,
            card_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )
        sheet.text_field(
            field_name,
            x + 14,
            y + 10,
            card_width - 28,
            31,
            multiline=True,
            font_size=9,
        )

    top_y = 245
    top_height = 110
    bottom_y = 126
    bottom_height = 109
    boundary_card(
        card_xs[0],
        top_y,
        top_height,
        "1",
        "Finish line",
        "Write the final deliverable, required evidence, person who checks it and pass rule.",
        "manus_final_deliverable_pass_rule",
    )
    boundary_card(
        card_xs[1],
        top_y,
        top_height,
        "2",
        "Tools and data",
        "Name every site, file, account, connected tool and data item the task needs.",
        "manus_tools_and_data",
    )
    boundary_card(
        card_xs[2],
        top_y,
        top_height,
        "3",
        "Allowed actions",
        "List what Manus may do and what it must not open, change, send, publish, buy or delete.",
        "manus_allowed_and_blocked_actions",
    )
    boundary_card(
        card_xs[0],
        bottom_y,
        bottom_height,
        "4",
        "Approval checkpoint",
        "Name the person and exact step before any send, publish, purchase, deletion or lasting change.",
        "manus_approval_checkpoint",
    )
    boundary_card(
        card_xs[1],
        bottom_y,
        bottom_height,
        "5",
        "Stop conditions",
        "Write the source, access, cost, run or uncertainty condition that must stop the agent.",
        "manus_stop_conditions",
    )
    boundary_card(
        card_xs[2],
        bottom_y,
        bottom_height,
        "6",
        "Log and rollback",
        "Name the log, run limit, rollback steps, restore point and date access will be removed.",
        "manus_log_rollback_access_removal",
    )

    # The page's decision rule becomes one explicit run status.
    decision_y = 42
    decision_height = 74
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("7 / Choose 1 run status", margin + 14, decision_y + 53)
    sheet.body(
        "Run only when the finish line, access, approval, log, cost limit, stop condition and rollback are written.",
        margin + 14,
        decision_y + 37,
        size=9,
        color=MUTED,
    )
    check9("manus_status_ready", "Ready for 1 visible, reversible run.", margin + 14, decision_y + 14)
    check9("manus_status_draft_only", "Research or draft only.", margin + 288, decision_y + 14)
    check9("manus_status_not_ready", "Not ready. Do not run.", margin + 513, decision_y + 14)

    sheet.footer()


def draw_private_ai_deployment_requirements(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # Start with the business reason and the broad deployment route.
    setup_y = 413
    sheet.rect(
        margin,
        setup_y,
        content_width,
        content_top - setup_y,
        fill=PAPER,
        stroke=INK,
    )
    why_x = margin + 14
    why_width = 330
    sheet.label("Why private AI is needed", why_x, content_top - 25)
    sheet.text_field(
        "private_ai_business_need",
        why_x,
        setup_y + 7,
        why_width,
        24,
        multiline=True,
        font_size=9,
    )
    route_x = margin + 369
    sheet.label("Where it may run", route_x, content_top - 15)
    check9("private_ai_route_managed", "Managed service", route_x, setup_y + 30)
    check9("private_ai_route_private_cloud", "Private cloud", route_x + 113, setup_y + 30)
    check9("private_ai_route_own_servers", "Own servers", route_x + 225, setup_y + 30)
    check9("private_ai_route_hybrid", "Hybrid", route_x + 326, setup_y + 30)

    # The controlled-environment example follows the page's private worker test.
    example_y = 365
    sheet.rect(margin, example_y, content_width, 38, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead example", margin + 14, example_y + 24)
    sheet.wrapped_text(
        "For a worker in a private network, name what stays private, what still connects to a managed service, the exact model licence and who operates every part. Test with non-sensitive data first.",
        margin + 131,
        example_y + 24,
        content_width - 147,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    card_width = (content_width - (2 * gap)) / 3
    card_xs = [margin + index * (card_width + gap) for index in range(3)]

    def requirement_card(
        x: float,
        y: float,
        height: float,
        number: str,
        title: str,
        prompt: str,
        field_name: str,
    ) -> None:
        sheet.rect(x, y, card_width, height, fill=PAPER, stroke=INK)
        title_y = y + height - 30
        sheet.section_title(number, title, x + 14, title_y)
        sheet.wrapped_text(
            prompt,
            x + 14,
            title_y - 19,
            card_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )
        sheet.text_field(
            field_name,
            x + 14,
            y + 10,
            card_width - 28,
            31,
            multiline=True,
            font_size=9,
        )

    top_y = 245
    top_height = 110
    bottom_y = 126
    bottom_height = 109
    requirement_card(
        card_xs[0],
        top_y,
        top_height,
        "1",
        "Data and storage",
        "List data types, processing and storage locations, retention, encryption, training and deletion rules.",
        "private_ai_data_and_storage",
    )
    requirement_card(
        card_xs[1],
        top_y,
        top_height,
        "2",
        "Access and identity",
        "Name who can use or administer it, how they sign in and the network or role limits.",
        "private_ai_access_and_identity",
    )
    requirement_card(
        card_xs[2],
        top_y,
        top_height,
        "3",
        "Company knowledge",
        "Name the sources, connectors and logs. State what the AI may retrieve and what stays separate.",
        "private_ai_company_knowledge",
    )
    requirement_card(
        card_xs[0],
        bottom_y,
        bottom_height,
        "4",
        "Model and licence",
        "Record the exact release, rights, obligations, update plan and replacement option.",
        "private_ai_model_and_licence",
    )
    requirement_card(
        card_xs[1],
        bottom_y,
        bottom_height,
        "5",
        "Owner and support",
        "Name the owner and support for security, infrastructure, monitoring, incidents, upgrades and users.",
        "private_ai_owner_and_support",
    )
    requirement_card(
        card_xs[2],
        bottom_y,
        bottom_height,
        "6",
        "Budget and proof",
        "Write the total budget. Define success for quality, control, delivery time and maintenance.",
        "private_ai_budget_and_success_proof",
    )

    # Requirements are approved before a model or supplier is shortlisted.
    decision_y = 42
    decision_height = 74
    sheet.rect(margin, decision_y, content_width, decision_height, fill=PAPER, stroke=INK)
    sheet.label("7 / Choose 1 buyer decision", margin + 14, decision_y + 53)
    sheet.body(
        "Approve the mandatory requirements, evidence, owners and simpler-hosted comparison before purchase.",
        margin + 14,
        decision_y + 37,
        size=9,
        color=MUTED,
    )
    check9("private_ai_decision_shortlist", "Shortlist this complete system.", margin + 14, decision_y + 14)
    check9("private_ai_decision_more_evidence", "Get more evidence first.", margin + 282, decision_y + 14)
    check9("private_ai_decision_simpler_option", "Use the simpler hosted option.", margin + 511, decision_y + 14)

    sheet.footer()


def draw_three_tool_stack_audit(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    content_top = sheet.height - 112
    content_width = sheet.width - (2 * margin)

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    # The guide's own stack makes each handoff concrete.
    example_y = 423
    sheet.rect(
        margin,
        example_y,
        content_width,
        content_top - example_y,
        fill=PALE_BLUE,
        stroke=INK,
    )
    sheet.label("Shift & Lead guide delivery example", margin + 14, content_top - 16)
    sheet.wrapped_text(
        "Prepare: the approved assistant helps create the guide. Capture: Lumail saves the popup email, delivers the file and starts the sequence only when the matching workflow is active. Publish or deliver: Blotato publishes the post and sends the keyword DM link on supported Instagram and Facebook channels. Store each response once, with 1 clear owner.",
        margin + 14,
        content_top - 33,
        content_width - 28,
        size=9,
        leading=10.5,
        color=INK,
        max_lines=2,
    )

    row_x = margin
    row_width = content_width
    row_height = 94
    stage_width = 145
    inner_x = row_x + stage_width
    inner_width = row_width - stage_width - 14
    field_gap = 8
    top_widths = [135, 105, 75, inner_width - 135 - 105 - 75 - (3 * field_gap)]
    bottom_widths = [150, 200, 125, inner_width - 150 - 200 - 125 - (3 * field_gap)]

    stages = [
        (
            "prepare",
            "1",
            "Prepare",
            "Turn source material into approved work.",
            319,
        ),
        (
            "capture",
            "2",
            "Capture",
            "Save the response and start the promised follow-up.",
            215,
        ),
        (
            "publish",
            "3",
            "Publish",
            "Send approved work to the right place.",
            111,
        ),
    ]

    for key, number, title, instruction, row_y in stages:
        sheet.rect(row_x, row_y, row_width, row_height, fill=PAPER, stroke=INK)
        sheet.section_title(number, title, row_x + 14, row_y + 64)
        sheet.wrapped_text(
            instruction,
            row_x + 14,
            row_y + 43,
            stage_width - 28,
            size=9,
            leading=10.5,
            color=MUTED,
            max_lines=2,
        )

        top_fields = [
            ("Tool", f"stack_{key}_tool"),
            ("Owner", f"stack_{key}_owner"),
            ("Monthly cost", f"stack_{key}_monthly_cost"),
        ]
        field_x = inner_x
        for width, (label, name) in zip(top_widths[:3], top_fields):
            sheet.label(label, field_x, row_y + 76)
            sheet.text_field(name, field_x, row_y + 51, width, 18, font_size=9)
            field_x += width + field_gap

        decision_x = field_x
        sheet.label("Choose 1 decision", decision_x, row_y + 76)
        check9(f"stack_{key}_keep", "Keep", decision_x, row_y + 57)
        check9(f"stack_{key}_replace", "Replace", decision_x + 57, row_y + 57)
        check9(f"stack_{key}_cancel", "Cancel", decision_x + 127, row_y + 57)
        check9(f"stack_{key}_test", "Test 30 days", decision_x + 193, row_y + 57)

        bottom_fields = [
            ("Access", f"stack_{key}_access"),
            ("Last useful result + date", f"stack_{key}_last_result"),
            ("Overlap / clearer owner", f"stack_{key}_overlap"),
            ("Decision date + proof required", f"stack_{key}_decision_proof"),
        ]
        field_x = inner_x
        for width, (label, name) in zip(bottom_widths, bottom_fields):
            sheet.label(label, field_x, row_y + 39)
            sheet.text_field(
                name,
                field_x,
                row_y + 11,
                width,
                22,
                multiline=True,
                font_size=9,
            )
            field_x += width + field_gap

    # Final system check and total cost stay visible below the three jobs.
    final_y = 42
    final_height = 59
    sheet.rect(margin, final_y, content_width, final_height, fill=PAPER, stroke=INK)
    sheet.label("4 / Final stack check", margin + 14, final_y + 42)
    sheet.body(
        "Every job needs 1 owner, visible cost, recent result and a keep, replace, cancel or test decision.",
        margin + 172,
        final_y + 42,
        size=9,
        color=MUTED,
    )
    sheet.label("Total monthly cost", margin + 14, final_y + 23)
    sheet.text_field("stack_total_monthly_cost", margin + 14, final_y + 5, 145, 15, font_size=9)
    check9(
        "stack_test_contact_passed",
        "Test link, download and sequence passed.",
        margin + 198,
        final_y + 14,
    )
    check9(
        "stack_no_duplicate_capture",
        "No duplicate capture or hidden handoff.",
        margin + 505,
        final_y + 14,
    )

    sheet.footer()


def draw_research_to_content_workflow_map(sheet: DecisionSheet) -> None:
    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 10
    content_top = sheet.height - 112
    content_bottom = 42
    column_width = (sheet.width - (2 * margin) - (2 * gap)) / 3
    left_x = margin
    middle_x = left_x + column_width + gap
    right_x = middle_x + column_width + gap

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 2,
            size=11,
            buttonStyle="check",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 16, y, label)

    def stage_box(x: float, y: float, height: float, number: str, title: str) -> tuple[float, float]:
        sheet.rect(x, y, column_width, height, fill=PAPER, stroke=INK)
        sheet.section_title(number, title, x + 14, y + height - 29)
        return x + 14, column_width - 28

    # 1. Capture
    capture_y = 348
    capture_h = content_top - capture_y
    inner_x, inner_w = stage_box(left_x, capture_y, capture_h, "1", "Capture")
    half_gap = 8
    half_w = (inner_w - half_gap) / 2
    sheet.label("Source / title", inner_x, content_top - 54)
    sheet.text_field("research_source_title", inner_x, content_top - 81, half_w, 20, font_size=9)
    sheet.label("URL", inner_x + half_w + half_gap, content_top - 54)
    sheet.text_field(
        "research_source_url",
        inner_x + half_w + half_gap,
        content_top - 81,
        half_w,
        20,
        font_size=9,
    )
    sheet.label("Published / captured date", inner_x, content_top - 95)
    sheet.text_field(
        "research_published_captured_date",
        inner_x,
        capture_y + 8,
        half_w,
        27,
        font_size=9,
    )
    sheet.label("Why saved", inner_x + half_w + half_gap, content_top - 95)
    sheet.text_field(
        "research_why_saved",
        inner_x + half_w + half_gap,
        capture_y + 8,
        half_w,
        27,
        multiline=True,
        font_size=9,
    )

    # 2. Distil
    distil_y = 173
    distil_h = 165
    inner_x, inner_w = stage_box(left_x, distil_y, distil_h, "2", "Distil")
    distil_top = distil_y + distil_h
    sheet.label("Key claim", inner_x, distil_top - 52)
    sheet.text_field(
        "research_key_claim",
        inner_x,
        distil_top - 75,
        inner_w,
        18,
        multiline=True,
        font_size=9,
    )
    sheet.label("Evidence", inner_x, distil_top - 89)
    sheet.text_field(
        "research_evidence",
        inner_x,
        distil_top - 112,
        inner_w,
        18,
        multiline=True,
        font_size=9,
    )
    sheet.label("Risk flags", inner_x, distil_top - 126)
    check9("research_risk_uncertainty", "Uncertainty", inner_x, distil_top - 143)
    check9("research_risk_promotion", "Promotion", inner_x + 112, distil_top - 143)
    check9("research_risk_experiment", "Experiment", inner_x, distil_top - 161)
    check9("research_risk_version", "Version risk", inner_x + 112, distil_top - 161)

    # 3. Find angle
    angle_y = content_bottom
    angle_h = 121
    inner_x, inner_w = stage_box(left_x, angle_y, angle_h, "3", "Find angle")
    angle_top = angle_y + angle_h
    sheet.label("Intended reader", inner_x, angle_top - 52)
    sheet.text_field("research_intended_reader", inner_x, angle_top - 75, inner_w, 18, font_size=9)
    sheet.label("What should change", inner_x, angle_top - 89)
    sheet.text_field(
        "research_reader_change",
        inner_x,
        angle_y + 7,
        inner_w,
        18,
        multiline=True,
        font_size=9,
    )

    # 4. Add point of view
    pov_y = 363
    pov_h = content_top - pov_y
    inner_x, inner_w = stage_box(middle_x, pov_y, pov_h, "4", "Add point of view")
    sheet.wrapped_text(
        "What will your judgment add, challenge, simplify or change?",
        inner_x,
        content_top - 52,
        inner_w,
        size=9,
        leading=10.5,
        color=MUTED,
        max_lines=2,
    )
    sheet.label("Personal judgment", inner_x, content_top - 75)
    sheet.text_field(
        "research_personal_judgment",
        inner_x,
        pov_y + 12,
        inner_w,
        34,
        multiline=True,
        font_size=9,
    )

    # 5. Draft
    draft_y = content_bottom
    draft_h = 311
    inner_x, inner_w = stage_box(middle_x, draft_y, draft_h, "5", "Draft")
    draft_top = draft_y + draft_h
    sheet.label("Outcome-first title / hook", inner_x, draft_top - 52)
    sheet.text_field(
        "research_outcome_title_hook",
        inner_x,
        draft_top - 79,
        inner_w,
        20,
        font_size=9,
    )
    sheet.label("Output format", inner_x, draft_top - 93)
    sheet.text_field(
        "research_output_format",
        inner_x,
        draft_top - 116,
        half_w,
        18,
        font_size=9,
    )
    sheet.label("Primary CTA", inner_x + half_w + half_gap, draft_top - 93)
    sheet.text_field(
        "research_primary_cta",
        inner_x + half_w + half_gap,
        draft_top - 116,
        half_w,
        18,
        font_size=9,
    )
    sheet.label("3 required points", inner_x, draft_top - 130)
    sheet.text_field(
        "research_three_required_points",
        inner_x,
        draft_top - 175,
        inner_w,
        38,
        multiline=True,
        font_size=9,
    )
    sheet.label("Approved source links", inner_x, draft_top - 189)
    sheet.text_field(
        "research_approved_source_links",
        inner_x,
        draft_top - 228,
        inner_w,
        32,
        multiline=True,
        font_size=9,
    )
    sheet.label("Destination guide / resource", inner_x, draft_top - 242)
    sheet.text_field(
        "research_destination_resource",
        inner_x,
        draft_y + 28,
        inner_w,
        28,
        multiline=True,
        font_size=9,
    )

    # 6. Verify
    verify_y = 249
    verify_h = content_top - verify_y
    inner_x, inner_w = stage_box(right_x, verify_y, verify_h, "6", "Verify")
    sheet.wrapped_text(
        "Stop: remove or escalate any important claim you cannot trace.",
        inner_x,
        content_top - 51,
        inner_w,
        size=9,
        leading=10.5,
        color=SIGNAL,
        max_lines=2,
    )
    second_x = inner_x + 112
    check9("research_check_original", "Reopen original", inner_x, content_top - 79)
    check9("research_check_dates", "Dates / versions", second_x, content_top - 79)
    check9("research_check_statistics", "Statistics", inner_x, content_top - 98)
    check9("research_check_quotes", "Quotes", second_x, content_top - 98)
    check9("research_check_tool_claims", "Current tool claims", inner_x, content_top - 117)
    check9(
        "research_check_qualified_claims",
        "Financial / legal / security qualified",
        inner_x,
        content_top - 136,
    )
    check9(
        "research_check_opinions_labelled",
        "Opinions / examples labelled",
        inner_x,
        content_top - 155,
    )
    sheet.label("Unresolved claim / escalation", inner_x, content_top - 174)
    sheet.text_field(
        "research_unresolved_claim_escalation",
        inner_x,
        content_top - 203,
        inner_w,
        20,
        multiline=True,
        font_size=9,
    )
    sheet.label("Human approver", inner_x, verify_y + 17)
    sheet.text_field(
        "research_human_approver",
        inner_x + 103,
        verify_y + 5,
        inner_w - 103,
        14,
        font_size=9,
    )

    # 7. Publish
    publish_y = 117
    publish_h = 122
    inner_x, inner_w = stage_box(right_x, publish_y, publish_h, "7", "Publish")
    publish_top = publish_y + publish_h
    check9(
        "research_source_rights_reuse_checked",
        "Source rights / reuse checked",
        inner_x,
        publish_top - 54,
    )
    check9("research_decision_publish", "Publish", inner_x, publish_top - 73)
    check9(
        "research_decision_do_not_publish",
        "Do not publish",
        inner_x + 83,
        publish_top - 73,
    )
    sheet.label("Final URL", inner_x, publish_top - 92)
    sheet.text_field(
        "research_final_url",
        inner_x,
        publish_y + 5,
        inner_w,
        17,
        font_size=9,
    )

    # 8. Learn
    learn_y = content_bottom
    learn_h = 65
    inner_x, inner_w = stage_box(right_x, learn_y, learn_h, "8", "Learn")
    learn_top = learn_y + learn_h
    sheet.label("Audience signal", inner_x, learn_top - 46)
    sheet.label("Signal changes next", inner_x + half_w + half_gap, learn_top - 46)
    sheet.text_field(
        "research_audience_signal",
        inner_x,
        learn_y + 3,
        half_w,
        14,
        font_size=9,
    )
    sheet.text_field(
        "research_signal_change_next",
        inner_x + half_w + half_gap,
        learn_y + 3,
        half_w,
        14,
        font_size=9,
    )

    sheet.footer()


def draw_lead_follow_up_map(sheet: DecisionSheet) -> None:
    """Draw the reusable Shift & Lead lead follow-up operating map."""

    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    usable_width = sheet.width - (2 * margin)
    card_width = (usable_width - (2 * gap)) / 3

    def compact_field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float = 18,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, x, y + height + 5)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=9,
        )

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 13, y, label)

    # Workflow setup
    setup_y = 382
    setup_h = 101
    sheet.rect(margin, setup_y, usable_width, setup_h, fill=PAPER, stroke=INK)
    inner_x = margin + 14
    inner_w = usable_width - 28
    sheet.label("Workflow setup", inner_x, setup_y + setup_h - 16)

    top_widths = (220, 210, 130, inner_w - 220 - 210 - 130 - 24)
    top_labels = (
        ("Workflow name / outcome", "followup_workflow_name_outcome"),
        ("1 exact trigger", "followup_exact_trigger"),
        ("Entry channel", "followup_entry_channel"),
        ("Offer / guide", "followup_offer_guide"),
    )
    field_x = inner_x
    for (label, name), width in zip(top_labels, top_widths):
        compact_field(label, name, field_x, 435, width, 19)
        field_x += width + 8

    control_widths = (130, 145, 145, 150, inner_w - 130 - 145 - 145 - 150 - 32)
    control_labels = (
        ("Start rule", "followup_start_rule"),
        ("Exclusion", "followup_exclusion"),
        ("Consent proof", "followup_consent"),
        ("Deduplication rule", "followup_deduplication"),
        ("Test contact", "followup_test_contact"),
    )
    field_x = inner_x
    for (label, name), width in zip(control_labels, control_widths):
        compact_field(label, name, field_x, 400, width, 18)
        field_x += width + 8

    sheet.c.setFillColor(BLUE)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        inner_x,
        388,
        "Shift & Lead journey: Blotato to website to Lumail sequence matching the active workflow to human owner.",
    )

    # Three-message builder
    message_y = 198
    message_h = 174
    message_specs = (
        ("1", "IMMEDIATE / DELIVER"),
        ("2", "DAY 2 / USE IT"),
        ("3", "DAY 5 / PERMISSION"),
    )
    for index, (number, timing) in enumerate(message_specs, start=1):
        x = margin + (index - 1) * (card_width + gap)
        sheet.rect(x, message_y, card_width, message_h, fill=PAPER, stroke=INK)
        sheet.c.setFillColor(BLUE)
        sheet.c.circle(x + 21, message_y + message_h - 20, 9, fill=1, stroke=0)
        sheet.c.setFillColor(PAPER)
        sheet.c.setFont("Helvetica-Bold", 8)
        sheet.c.drawCentredString(x + 21, message_y + message_h - 23, number)
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Times-Bold", 15)
        sheet.c.drawString(x + 37, message_y + message_h - 25, timing)

        compact_field(
            "Single job",
            f"followup_message_{index}_job",
            x + 14,
            306,
            card_width - 28,
            16,
        )
        compact_field(
            "Message template",
            f"followup_message_{index}_template",
            x + 14,
            251,
            card_width - 28,
            41,
            multiline=True,
        )
        half = (card_width - 36) / 2
        compact_field(
            "1 CTA",
            f"followup_message_{index}_cta",
            x + 14,
            227,
            half,
            16,
        )
        compact_field(
            "Send rule",
            f"followup_message_{index}_send_rule",
            x + 22 + half,
            227,
            half,
            16,
        )
        compact_field(
            "Stop",
            f"followup_message_{index}_stop",
            x + 14,
            201,
            half,
            16,
        )
        compact_field(
            "Fallback",
            f"followup_message_{index}_fallback",
            x + 22 + half,
            201,
            half,
            16,
        )

    # Contact record and human handoff
    bottom_y = 42
    bottom_h = 146
    left_x = margin
    middle_x = left_x + card_width + gap
    right_x = middle_x + card_width + gap
    for x in (left_x, middle_x, right_x):
        sheet.rect(x, bottom_y, card_width, bottom_h, fill=PAPER, stroke=INK)

    sheet.heading("Contact record and handoff", left_x + 12, 168, size=15)
    inner = left_x + 12
    inner_width = card_width - 24
    thirds_gap = 6
    third = (inner_width - (2 * thirds_gap)) / 3
    contact_widths = (56, 105, inner_width - 56 - 105 - (2 * thirds_gap))
    contact_x = inner
    for (label, name), width in zip(
        (
            ("Name", "followup_contact_name"),
            ("Email", "followup_contact_email"),
            ("Source", "followup_contact_source"),
        ),
        contact_widths,
    ):
        compact_field(label, name, contact_x, 130, width, 16)
        contact_x += width + thirds_gap
    for label, name, offset in (
        ("Owner", "followup_contact_owner", 0),
        ("Next action", "followup_next_action", 1),
        ("Tags", "followup_contact_tags", 2),
    ):
        compact_field(label, name, inner + offset * (third + thirds_gap), 99, third, 16)
    for label, name, offset in (
        ("Human owner", "followup_handoff_owner", 0),
        ("Alert", "followup_handoff_alert", 1),
        ("Response target", "followup_handoff_response", 2),
    ):
        compact_field(label, name, inner + offset * (third + thirds_gap), 72, third, 16)
    half = (inner_width - 6) / 2
    compact_field(
        "Actions paused",
        "followup_handoff_actions_paused",
        inner,
        45,
        half,
        16,
    )
    compact_field(
        "Recovery / manual fallback",
        "followup_recovery_manual_fallback",
        inner + half + 6,
        45,
        half,
        16,
    )

    # Failure controls
    sheet.heading("Failure controls", middle_x + 12, 168, size=15)
    failure_checks = (
        ("invalid_email", "Invalid email"),
        ("duplicate", "Duplicate contact"),
        ("tag", "Wrong or missing tag"),
        ("inactive_sequence", "Inactive sequence"),
        ("delivery_link", "Delivery or link"),
        ("provider", "Provider failure"),
        ("bounce", "Bounce"),
        ("unsubscribe", "Opt-out or complaint"),
        ("reply", "Reply received"),
        ("personalisation", "Personalisation"),
        ("timezone", "Time zone or weekend"),
        ("retry", "Retry policy"),
        ("log", "Failure log"),
        ("recovery", "Recovery owner"),
        ("manual", "Manual fallback"),
    )
    failure_col_w = (card_width - 24) / 2
    for index, (suffix, label) in enumerate(failure_checks):
        col = index % 2
        row = index // 2
        check9(
            f"followup_failure_{suffix}",
            label,
            middle_x + 12 + col * failure_col_w,
            148 - row * 14,
        )

    # Launch QA and stop conditions
    sheet.heading("Launch QA and stop conditions", right_x + 12, 168, size=15)
    qa_x = right_x + 12
    qa_col_w = (card_width - 24) / 2
    sheet.label("Pass checks", qa_x, 151)
    sheet.label("Stop if", qa_x + qa_col_w, 151, color=SIGNAL)
    pass_checks = (
        ("trigger_once", "Trigger runs once"),
        ("right_guide", "Right guide and link"),
        ("recorded", "Contact and tag saved"),
        ("sequence", "Sequence matched"),
        ("timing", "Day 2 / Day 5 timing"),
        ("stop_events", "Reply and opt-out stop"),
        ("handoff", "Handoff alert works"),
    )
    stop_checks = (
        ("wrong_guide", "Wrong guide or link"),
        ("duplicate_send", "Duplicate send"),
        ("no_consent", "Consent missing"),
        ("workflow_mismatch", "Workflow mismatch"),
        ("complaint", "Opt-out or complaint"),
        ("provider_failure", "Provider failure"),
        ("open_handoff", "Open reply or handoff"),
    )
    for row, (suffix, label) in enumerate(pass_checks):
        check9(f"followup_pass_{suffix}", label, qa_x, 132 - row * 14)
    for row, (suffix, label) in enumerate(stop_checks):
        check9(
            f"followup_stop_{suffix}",
            label,
            qa_x + qa_col_w,
            132 - row * 14,
        )

    sheet.footer()


def draw_inbox_triage_template(sheet: DecisionSheet) -> None:
    """Draw the reusable inbox triage and daily summary operating template."""

    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    usable_width = sheet.width - (2 * margin)
    card_width = (usable_width - (2 * gap)) / 3

    def compact_field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float = 18,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, x, y + height + 5)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=9,
        )

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 13, y, label)

    # Inbox scope and ownership
    setup_y = 382
    setup_h = 101
    sheet.rect(margin, setup_y, usable_width, setup_h, fill=PAPER, stroke=INK)
    inner_x = margin + 14
    inner_w = usable_width - 28
    sheet.label("Inbox scope and ownership", inner_x, setup_y + setup_h - 16)

    top_widths = (215, 120, 150, 140, inner_w - 215 - 120 - 150 - 140 - 32)
    top_labels = (
        ("Inbox / account", "inbox_account"),
        ("Owner", "inbox_owner"),
        ("Review time / time zone", "inbox_review_time_timezone"),
        ("Date window", "inbox_date_window"),
        ("Read-only access proof", "inbox_read_only_access"),
    )
    field_x = inner_x
    for (label, name), width in zip(top_labels, top_widths):
        compact_field(label, name, field_x, 435, width, 19)
        field_x += width + 8

    lower_widths = (135, 115, 90, 95, 115, inner_w - 135 - 115 - 90 - 95 - 115 - 40)
    lower_labels = (
        ("Included folders / labels", "inbox_included_folders_labels"),
        ("Excluded data", "inbox_excluded_data"),
        ("Minimum data", "inbox_minimum_data"),
        ("Human approver", "inbox_human_approver"),
        ("Escalation / alert route", "inbox_escalation_alert_route"),
        ("Reply text review location", "inbox_reply_text_review_location"),
    )
    field_x = inner_x
    for (label, name), width in zip(lower_labels, lower_widths):
        compact_field(label, name, field_x, 400, width, 18)
        field_x += width + 8

    sheet.c.setFillColor(BLUE)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        inner_x,
        388,
        "Shift & Lead examples: guide-delivery failure | Lumail reply | booking / high intent | Fatiha handoff.",
    )

    # Three operating panels
    card_y = 42
    card_h = 329
    left_x = margin
    middle_x = left_x + card_width + gap
    right_x = middle_x + card_width + gap
    for x in (left_x, middle_x, right_x):
        sheet.rect(x, card_y, card_width, card_h, fill=PAPER, stroke=INK)

    # Triage categories, routing and action limits
    sheet.heading("Triage rules", left_x + 12, 348, size=17)
    inner = left_x + 12
    inner_width = card_width - 24
    half_gap = 8
    half = (inner_width - half_gap) / 2
    category_rows = (
        (
            ("Reply now", "inbox_category_reply_now"),
            ("Review today", "inbox_category_review_today"),
        ),
        (
            ("Waiting / follow-up", "inbox_category_waiting"),
            ("Reference / no action", "inbox_category_reference"),
        ),
        (
            ("Risky / sensitive", "inbox_category_risky"),
            ("Suspected scam", "inbox_category_scam"),
        ),
    )
    for row, pair in enumerate(category_rows):
        y = 303 - row * 38
        for col, (label, name) in enumerate(pair):
            compact_field(label, name, inner + col * (half + half_gap), y, half, 17)

    sheet.heading("Routing rules", left_x + 12, 205, size=15)
    routing_rows = (
        (
            ("Sender rule", "inbox_sender_rule"),
            ("Domain rule", "inbox_domain_rule"),
        ),
        (
            ("Keyword rule", "inbox_keyword_rule"),
            ("VIP rule", "inbox_vip_rule"),
        ),
    )
    for row, pair in enumerate(routing_rows):
        y = 169 - row * 33
        for col, (label, name) in enumerate(pair):
            compact_field(label, name, inner + col * (half + half_gap), y, half, 17)
    compact_field(
        "Exceptions",
        "inbox_rule_exceptions",
        inner,
        104,
        inner_width,
        17,
        multiline=True,
    )
    sheet.wrapped_text(
        "If draft creation grants send rights, use a separate review queue.",
        inner,
        91,
        inner_width,
        font="Helvetica-Bold",
        size=9,
        leading=11,
        color=SIGNAL,
        max_lines=2,
    )
    sheet.label("Action limits", inner, 65)
    check9("inbox_limit_draft_only", "Draft only", inner, 54)
    check9("inbox_limit_never_send", "Never send", inner + half + half_gap, 54)
    check9("inbox_limit_never_delete", "Never delete", inner, 43)
    check9("inbox_limit_never_archive", "Never archive", inner + half + half_gap, 43)

    # Daily summary builder
    sheet.heading("Daily summary", middle_x + 12, 348, size=17)
    summary_inner = middle_x + 12
    summary_width = card_width - 24
    compact_field(
        "Category counts",
        "inbox_summary_counts",
        summary_inner,
        311,
        (summary_width - 8) * 0.68,
        18,
    )
    compact_field(
        "No-action count",
        "inbox_summary_no_action_count",
        summary_inner + (summary_width - 8) * 0.68 + 8,
        311,
        (summary_width - 8) * 0.32,
        18,
    )
    sheet.label("Urgent items", summary_inner, 299)
    sheet.body(
        "Sender | subject | reason | recommended action",
        summary_inner,
        286,
        size=9,
        color=INK,
    )
    sheet.body(
        "Draft status | deadline | source link",
        summary_inner,
        274,
        size=9,
        color=INK,
    )
    sheet.text_field(
        "inbox_summary_urgent_items",
        summary_inner,
        188,
        summary_width,
        77,
        multiline=True,
        font_size=9,
    )
    compact_field(
        "Waiting / follow-up items",
        "inbox_summary_waiting_items",
        summary_inner,
        145,
        summary_width,
        26,
        multiline=True,
    )
    compact_field(
        "Delivery / workflow failures",
        "inbox_summary_workflow_failures",
        summary_inner,
        105,
        summary_width,
        24,
        multiline=True,
    )
    compact_field(
        "Questions for the human owner",
        "inbox_summary_questions",
        summary_inner,
        70,
        summary_width,
        19,
        multiline=True,
    )
    compact_field(
        "Manual fallback",
        "inbox_summary_manual_fallback",
        summary_inner,
        45,
        summary_width,
        14,
    )

    # Failure tests, launch checks and emergency disable
    sheet.heading("Test, pass or stop", right_x + 12, 348, size=17)
    qa_inner = right_x + 12
    qa_width = card_width - 24
    qa_col = qa_width / 2
    sheet.label("Failure tests", qa_inner, 327)
    failure_tests = (
        ("malformed", "Unreadable / malformed"),
        ("attachment", "Attachment unreadable"),
        ("duplicate", "Duplicate thread"),
        ("missing_sender_date", "Missing sender / date"),
        ("wrong_category", "Wrong category"),
        ("sensitive", "Sensitive data"),
        ("scam", "Suspected scam"),
        ("provider", "Provider failure"),
        ("timezone", "Time zone / boundary"),
        ("no_messages", "No messages"),
        ("not_delivered", "Summary not delivered"),
        ("stale_draft", "Stale draft"),
    )
    for index, (suffix, label) in enumerate(failure_tests):
        col = index % 2
        row = index // 2
        check9(
            f"inbox_failure_{suffix}",
            label,
            qa_inner + col * qa_col,
            309 - row * 14,
        )

    sheet.label("Pass", qa_inner, 220)
    sheet.label("Stop", qa_inner + qa_col, 220, color=SIGNAL)
    pass_checks = (
        ("read_only", "Access is read-only"),
        ("sample_rules", "Sample rules pass"),
        ("urgent_fields", "7 urgent fields present"),
        ("counts", "Counts match source"),
        ("draft_only", "Draft-only respected"),
        ("delivered", "Summary delivered"),
        ("empty_inbox", "Empty inbox handled"),
        ("failure_alert", "Failure alert logged"),
    )
    stop_checks = (
        ("write_access", "Write access found"),
        ("wrong_scope", "Wrong inbox / window"),
        ("data_exposed", "Sensitive data exposed"),
        ("scam_action", "Scam action attempted"),
        ("uncertain", "Category uncertain"),
        ("summary_missing", "Summary missing"),
        ("stale_draft", "Stale draft shown"),
        ("disable", "Emergency disable"),
    )
    for row, (suffix, label) in enumerate(pass_checks):
        check9(f"inbox_pass_{suffix}", label, qa_inner, 202 - row * 14)
    for row, (suffix, label) in enumerate(stop_checks):
        check9(
            f"inbox_stop_{suffix}",
            label,
            qa_inner + qa_col,
            202 - row * 14,
        )
    compact_field(
        "Emergency disable owner / route",
        "inbox_emergency_disable_owner_route",
        qa_inner,
        45,
        qa_width,
        18,
    )

    sheet.footer()


def draw_ai_teammate_job_description(sheet: DecisionSheet) -> None:
    """Draw a bounded AI system job specification with explicit human control."""

    sheet.header()
    sheet.c.setFillColor(CREAM)
    sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    margin = 32
    gap = 12
    usable_width = sheet.width - (2 * margin)
    card_width = (usable_width - (2 * gap)) / 3

    def compact_field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float = 18,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, x, y + height + 5)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=9,
        )

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 9)
        sheet.c.drawString(x + 13, y, label)

    # Job identity, ownership and access baseline
    setup_y = 382
    setup_h = 101
    sheet.rect(margin, setup_y, usable_width, setup_h, fill=PAPER, stroke=INK)
    inner_x = margin + 14
    inner_w = usable_width - 28
    sheet.label("Bounded job and ownership", inner_x, setup_y + setup_h - 16)

    top_widths = (180, 250, 180, inner_w - 180 - 250 - 180 - 24)
    top_labels = (
        ("Role / job name", "ai_system_role_job_name"),
        ("1 repeatable business job", "ai_system_repeatable_job"),
        ("Business result", "ai_system_business_result"),
        ("Trigger", "ai_system_trigger"),
    )
    field_x = inner_x
    for (label, name), width in zip(top_labels, top_widths):
        compact_field(label, name, field_x, 435, width, 19)
        field_x += width + 8

    lower_widths = (100, 120, 150, 150, inner_w - 100 - 120 - 150 - 150 - 32)
    lower_labels = (
        ("Owner", "ai_system_owner"),
        ("Human approver", "ai_system_human_approver"),
        ("Deadline / frequency", "ai_system_deadline_frequency"),
        ("Data sensitivity", "ai_system_data_sensitivity"),
        ("Minimum access", "ai_system_minimum_access"),
    )
    field_x = inner_x
    for (label, name), width in zip(lower_labels, lower_widths):
        compact_field(label, name, field_x, 400, width, 18)
        field_x += width + 8

    sheet.c.setFillColor(BLUE)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        inner_x,
        388,
        "Bounded AI system, not a person or employee. Read-only first. Never expand access to fix a bad instruction. Stop loudly.",
    )

    # Three operating panels
    card_y = 42
    card_h = 329
    left_x = margin
    middle_x = left_x + card_width + gap
    right_x = middle_x + card_width + gap
    for x in (left_x, middle_x, right_x):
        sheet.rect(x, card_y, card_width, card_h, fill=PAPER, stroke=INK)

    # Job boundary
    inner = left_x + 12
    inner_width = card_width - 24
    sheet.heading("Job boundary", inner, 348, size=17)
    sheet.body(
        "Example: prepare failed guide deliveries for Fatiha's review.",
        inner,
        329,
        size=9,
        color=MUTED,
    )
    compact_field(
        "Required inputs / source locations",
        "ai_system_required_inputs_sources",
        inner,
        275,
        inner_width,
        38,
        multiline=True,
    )
    compact_field(
        "Exact output / destination",
        "ai_system_exact_output_destination",
        inner,
        220,
        inner_width,
        38,
        multiline=True,
    )
    compact_field(
        "Allowed tools / actions",
        "ai_system_allowed_tools_actions",
        inner,
        165,
        inner_width,
        38,
        multiline=True,
    )
    compact_field(
        "Prohibited actions",
        "ai_system_prohibited_actions",
        inner,
        110,
        inner_width,
        38,
        multiline=True,
    )
    sheet.c.setFillColor(SIGNAL)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(inner, 93, "No purchase, send, publish or delete.")
    sheet.c.drawString(inner, 81, "No record changes without explicit approval.")
    compact_field(
        "Approval gate",
        "ai_system_approval_gate",
        inner,
        45,
        inner_width,
        20,
    )

    # Control, evidence and failure handling
    control_inner = middle_x + 12
    control_width = card_width - 24
    sheet.heading("Control and evidence", control_inner, 348, size=17)
    compact_field(
        "Stop / handoff conditions",
        "ai_system_stop_handoff_conditions",
        control_inner,
        292,
        control_width,
        30,
        multiline=True,
    )
    compact_field(
        "Ambiguity / missing-data rule",
        "ai_system_ambiguity_missing_data_rule",
        control_inner,
        246,
        control_width,
        30,
        multiline=True,
    )
    compact_field(
        "Completion evidence",
        "ai_system_completion_evidence",
        control_inner,
        204,
        control_width,
        26,
        multiline=True,
    )
    compact_field(
        "Status report format",
        "ai_system_status_report_format",
        control_inner,
        163,
        control_width,
        25,
        multiline=True,
    )
    compact_field(
        "Failure modes",
        "ai_system_failure_modes",
        control_inner,
        120,
        control_width,
        26,
        multiline=True,
    )

    limit_gap = 6
    attempts_width = 62
    runtime_width = 68
    budget_width = control_width - attempts_width - runtime_width - (2 * limit_gap)
    compact_field(
        "Max attempts",
        "ai_system_maximum_attempts",
        control_inner,
        80,
        attempts_width,
        18,
    )
    compact_field(
        "Max run time",
        "ai_system_maximum_run_time",
        control_inner + attempts_width + limit_gap,
        80,
        runtime_width,
        18,
    )
    compact_field(
        "Max cost / tokens",
        "ai_system_maximum_cost_token_budget",
        control_inner + attempts_width + runtime_width + (2 * limit_gap),
        80,
        budget_width,
        18,
    )

    bottom_gap = 6
    retry_width = 54
    fallback_width = 70
    alert_width = control_width - retry_width - fallback_width - (2 * bottom_gap)
    compact_field(
        "Alert destination",
        "ai_system_alert_destination",
        control_inner,
        45,
        alert_width,
        18,
    )
    compact_field(
        "Retry limit",
        "ai_system_retry_limit",
        control_inner + alert_width + bottom_gap,
        45,
        retry_width,
        18,
    )
    compact_field(
        "Manual fallback",
        "ai_system_manual_fallback",
        control_inner + alert_width + retry_width + (2 * bottom_gap),
        45,
        fallback_width,
        18,
    )

    # Tests, measures and 30-day decision
    review_inner = right_x + 12
    review_width = card_width - 24
    sheet.heading("Test and review", review_inner, 348, size=17)
    compact_field(
        "Test cases",
        "ai_system_test_cases",
        review_inner,
        286,
        review_width,
        38,
        multiline=True,
    )
    compact_field(
        "Success measures",
        "ai_system_success_measures",
        review_inner,
        233,
        review_width,
        35,
        multiline=True,
    )
    compact_field(
        "30-day review",
        "ai_system_30_day_review",
        review_inner,
        183,
        review_width,
        33,
        multiline=True,
    )
    sheet.label("Decision", review_inner, 170)
    check9("ai_system_decision_keep", "Keep", review_inner, 156)
    check9("ai_system_decision_change", "Change", review_inner + 74, 156)
    check9("ai_system_decision_stop", "Stop", review_inner + 157, 156)

    sheet.label("Launch checks", review_inner, 139)
    check_col = review_width / 2
    launch_checks = (
        ("read_only", "Read-only first"),
        ("test_inputs", "Test inputs pass"),
        ("approval", "Approval blocks action"),
        ("evidence", "Owner receives evidence"),
        ("bad_instruction", "Bad instruction stops"),
        ("missing_data", "Missing data stops"),
        ("failure_alert", "Failure alert arrives"),
        ("fallback", "Manual fallback works"),
    )
    for index, (suffix, label) in enumerate(launch_checks):
        col = index % 2
        row = index // 2
        check9(
            f"ai_system_launch_{suffix}",
            label,
            review_inner + col * check_col,
            122 - row * 14,
        )
    compact_field(
        "Decision / next change",
        "ai_system_decision_next_change",
        review_inner,
        45,
        review_width,
        18,
    )

    sheet.footer()


def draw_ai_essentials_7_day_plan(sheet: DecisionSheet) -> None:
    """Draw a 2-page beginner practice plan with a reusable learning log."""

    margin = 32
    gap = 12
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def compact_field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float = 20,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, x, y + height + 5)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=9,
        )

    def check8(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 8)
        sheet.c.drawString(x + 13, y, label)

    def day_card(x: float, y: float, width: float, height: float, day: str, title: str) -> tuple[float, float]:
        sheet.rect(x, y, width, height, fill=PAPER, stroke=INK)
        sheet.label(day, x + 14, y + height - 19)
        sheet.heading(title, x + 14, y + height - 43, size=16)
        return x + 14, width - 28

    page_surface()

    intro_y = 404
    intro_h = 79
    sheet.rect(margin, intro_y, usable_width, intro_h, fill=PAPER, stroke=INK)
    intro_x = margin + 14
    sheet.heading("Start with 1 task you can check", intro_x, 458, size=17)
    sheet.body(
        "Keep private data out. Save each result. Change the brief from evidence, not guesswork.",
        intro_x,
        440,
        size=8.8,
        color=INK,
    )
    sheet.label("Use these 3 guides", intro_x, 422)
    route_gap = 18
    routes = (
        "shiftandlead.com/guides/what-is-ai.html",
        "shiftandlead.com/guides/ai-jargon-guide.html",
        "shiftandlead.com/guides/what-is-a-prompt.html",
    )
    route_x = intro_x + 145
    for route in routes:
        sheet.body(route, route_x, 421, size=8, color=BLUE)
        route_x += sheet.c.stringWidth(route, "Helvetica", 8) + route_gap

    card_width = (usable_width - gap) / 2
    top_y = 225
    bottom_y = 42
    card_h = 167

    inner, inner_w = day_card(margin, top_y, card_width, card_h, "DAY 1", "Choose 1 low-risk task")
    sheet.wrapped_text(
        "Choose work you understand and can check. Write the finish line before using AI.",
        inner,
        335,
        inner_w,
        size=8.5,
        leading=10.5,
        max_lines=2,
    )
    compact_field("Task", "ai7_day1_task", inner, 276, inner_w, 22)
    compact_field("Done means", "ai7_day1_done_definition", inner, 235, inner_w, 22)

    inner, inner_w = day_card(margin + card_width + gap, top_y, card_width, card_h, "DAY 2", "Sort the task before choosing AI")
    sheet.wrapped_text(
        "Use the AI-or-automation task sorter. Choose AI, automation, both or human-first.",
        inner,
        335,
        inner_w,
        size=8.5,
        leading=10.5,
        max_lines=2,
    )
    compact_field("Sorter decision", "ai7_day2_sorter_decision", inner, 276, inner_w, 22)
    compact_field("Why this route fits", "ai7_day2_decision_reason", inner, 235, inner_w, 22)

    inner, inner_w = day_card(margin, bottom_y, card_width, card_h, "DAY 3", "Prepare information you can use")
    sheet.wrapped_text(
        "Gather the facts and examples the task needs. Remove private data before sharing anything.",
        inner,
        152,
        inner_w,
        size=8.5,
        leading=10.5,
        max_lines=2,
    )
    compact_field("Information I can use", "ai7_day3_approved_sources", inner, 93, inner_w, 22)
    compact_field("Private data removed", "ai7_day3_private_data_removed", inner, 52, inner_w, 22)

    inner, inner_w = day_card(margin + card_width + gap, bottom_y, card_width, card_h, "DAY 4", "Make a first attempt")
    sheet.wrapped_text(
        "Run the task once. Save what AI produced and record the first clear failure or weakness.",
        inner,
        152,
        inner_w,
        size=8.5,
        leading=10.5,
        max_lines=2,
    )
    compact_field("What AI produced", "ai7_day4_first_result", inner, 93, inner_w, 22)
    compact_field("Failure or weakness", "ai7_day4_failure", inner, 52, inner_w, 22)

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    day_width = (usable_width - (2 * gap)) / 3
    day_y = 292
    day_h = 191

    inner, inner_w = day_card(margin, day_y, day_width, day_h, "DAY 5", "Build the prompt brief and rerun")
    sheet.wrapped_text(
        "Add the job, information you can use, rules, output and quality bar. Rerun the same task.",
        inner,
        423,
        inner_w,
        size=8.2,
        leading=10,
        max_lines=3,
    )
    compact_field("What changed in the brief", "ai7_day5_brief_change", inner, 355, inner_w, 28, multiline=True)
    compact_field("Rerun result", "ai7_day5_rerun_result", inner, 304, inner_w, 28, multiline=True)

    inner, inner_w = day_card(margin + day_width + gap, day_y, day_width, day_h, "DAY 6", "Check the result")
    sheet.wrapped_text(
        "Check evidence before judging style. Keep the final decision with a person.",
        inner,
        423,
        inner_w,
        size=8.2,
        leading=10,
        max_lines=3,
    )
    check8("ai7_day6_facts", "Facts checked", inner, 383)
    check8("ai7_day6_sources", "Source use checked", inner + 105, 383)
    check8("ai7_day6_missing", "Missing information checked", inner, 367)
    check8("ai7_day6_tone", "Tone checked", inner + 135, 367)
    check8("ai7_day6_human_decisions", "Human decisions named", inner, 351)
    compact_field("Decision or correction", "ai7_day6_decision_correction", inner, 304, inner_w, 25, multiline=True)

    inner, inner_w = day_card(margin + (2 * (day_width + gap)), day_y, day_width, day_h, "DAY 7", "Repeat and decide")
    sheet.wrapped_text(
        "Use a new example. Compare the result, then choose Keep, Change or Stop.",
        inner,
        423,
        inner_w,
        size=8.2,
        leading=10,
        max_lines=3,
    )
    compact_field("New example", "ai7_day7_new_example", inner, 355, inner_w, 25, multiline=True)
    compact_field("What changed in the result", "ai7_day7_result_change", inner, 313, inner_w, 20)
    check8("ai7_day7_keep", "Keep", inner, 299)
    check8("ai7_day7_change", "Change", inner + 72, 299)
    check8("ai7_day7_stop", "Stop", inner + 155, 299)

    log_y = 42
    log_h = 238
    sheet.rect(margin, log_y, usable_width, log_h, fill=PAPER, stroke=INK)
    log_x = margin + 14
    log_w = usable_width - 28
    sheet.heading("Practice log", log_x, 255, size=17)
    sheet.body(
        "Use this after Day 7 for each new task. Keep the evidence beside the decision.",
        log_x,
        238,
        size=8.5,
    )

    log_gap = 8
    task_w = 190
    source_w = 260
    result_w = log_w - task_w - source_w - (2 * log_gap)
    compact_field("Task", "ai7_log_task", log_x, 198, task_w, 22)
    compact_field("Source used", "ai7_log_source_used", log_x + task_w + log_gap, 198, source_w, 22)
    compact_field("Result needed", "ai7_log_result_needed", log_x + task_w + source_w + (2 * log_gap), 198, result_w, 22)
    compact_field("What AI produced", "ai7_log_ai_produced", log_x, 150, log_w, 28, multiline=True)
    correction_w = (log_w - log_gap) / 2
    compact_field("What needed correction", "ai7_log_needed_correction", log_x, 101, correction_w, 28, multiline=True)
    compact_field("What changed in the brief", "ai7_log_brief_change", log_x + correction_w + log_gap, 101, correction_w, 28, multiline=True)
    sheet.label("Decision", log_x, 86)
    check8("ai7_log_keep", "Keep", log_x, 70)
    check8("ai7_log_change", "Change", log_x + 80, 70)
    check8("ai7_log_stop", "Stop", log_x + 175, 70)

    sheet.footer()


def draw_ai_improvement_tracker(sheet: DecisionSheet) -> None:
    """Draw the locked 6-page, 168-field AI improvement tracker."""

    margin = 32
    gap = 12
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 8,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def choice(
        label: str,
        name: str,
        options: tuple[str, ...],
        x: float,
        y: float,
        width: float,
        height: float = 22,
        *,
        font_size: float = 8,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.c.acroForm.choice(
            name=name,
            tooltip=label,
            x=x,
            y=y,
            width=width,
            height=height,
            options=list(options),
            value=options[0],
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags="combo",
        )

    score_options = ("1", "2", "3", "4", "5")
    change_options = ("Keep this change", "Drop this change", "Retest")

    # Page 1: task and useful-result checks
    page_surface()
    intro_y = 447
    sheet.rect(margin, intro_y, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        margin + 12,
        intro_y + 21,
        "Start after you have 1 checked low-risk result. Keep the same kind of task for all 20 attempts.",
    )
    sheet.body(
        "Change 1 instruction, source choice or check at a time. Keep customer, money, rights, access and lasting changes behind human review.",
        margin + 12,
        intro_y + 8,
        size=7.8,
        color=INK,
    )

    left_x = margin
    left_w = 500
    right_x = left_x + left_w + gap
    right_w = usable_width - left_w - gap
    pair_gap = 10

    field("Real task to improve", "practice_task", left_x, 397, 198, 28, 90)
    field(
        "Useful result",
        "useful_result",
        left_x + 198 + pair_gap,
        397,
        left_w - 198 - pair_gap,
        28,
        220,
    )
    field(
        "Why I can judge this work",
        "why_i_can_judge",
        left_x,
        340,
        240,
        42,
        220,
        multiline=True,
    )
    field(
        "Approved source and information",
        "approved_information",
        left_x + 240 + pair_gap,
        340,
        left_w - 240 - pair_gap,
        42,
        280,
        multiline=True,
    )
    field(
        "Reviewer, human decision and prohibited actions",
        "human_decision",
        left_x,
        283,
        240,
        42,
        220,
        multiline=True,
    )
    field(
        "Starting checked example",
        "baseline_example",
        left_x + 240 + pair_gap,
        283,
        left_w - 240 - pair_gap,
        42,
        180,
        multiline=True,
    )
    field(
        "Starting instruction",
        "baseline_instruction",
        left_x,
        211,
        left_w,
        52,
        900,
        multiline=True,
        font_size=7.5,
    )
    field(
        "Starting checked result",
        "baseline_result",
        left_x,
        143,
        left_w,
        48,
        500,
        multiline=True,
        font_size=7.5,
    )
    field(
        "Most important gap",
        "baseline_gap",
        left_x,
        77,
        left_w,
        46,
        300,
        multiline=True,
        font_size=7.5,
    )

    example_y = 330
    sheet.rect(right_x, example_y, right_w, 117, fill=PAPER, stroke=INK)
    sheet.label("Shift & Lead worked example", right_x + 12, example_y + 97)
    sheet.wrapped_text(
        "Task: write accurate guide-card promises. The first result said a Beginner would master prompting. The guide did not support that claim.",
        right_x + 12,
        example_y + 78,
        right_w - 24,
        size=7.6,
        leading=9.4,
        color=INK,
        max_lines=4,
    )
    sheet.wrapped_text(
        "Fatiha changed 1 instruction: name a concrete reader action. She checked the next promise against the published guide before keeping the rule.",
        right_x + 12,
        example_y + 37,
        right_w - 24,
        size=7.6,
        leading=9.4,
        color=MUTED,
        max_lines=4,
    )

    quality_y = 165
    sheet.rect(right_x, quality_y, right_w, 153, fill=PAPER, stroke=INK)
    sheet.heading("Write 3 checks for a useful result", right_x + 12, quality_y + 130, size=15)
    field("Useful result check 1", "quality_test_1", right_x + 12, 258, right_w - 24, 24, 120)
    field("Useful result check 2", "quality_test_2", right_x + 12, 213, right_w - 24, 24, 120)
    field("Useful result check 3", "quality_test_3", right_x + 12, 168, right_w - 24, 24, 120)

    decision_y = 42
    sheet.rect(right_x, decision_y, right_w, 111, fill=PAPER, stroke=INK)
    sheet.heading("Save the baseline", right_x + 12, decision_y + 88, size=15)
    choice(
        "Baseline score",
        "baseline_score",
        score_options,
        right_x + 12,
        92,
        92,
        20,
    )
    sheet.body("1 low · 3 usable with edits · 5 ready after review", right_x + 112, 98, size=5.6)
    sheet.checkbox("baseline_saved", "Starting result saved", right_x + 12, 76)
    sheet.checkbox("private_data_removed", "Private data removed", right_x + 12, 59)
    sheet.checkbox("human_check_named", "Reviewer and human check named", right_x + 12, 44)
    sheet.footer()
    sheet.c.showPage()

    week_details = (
        (
            1,
            1,
            5,
            "Attempt before looking",
            "Use 5 new examples. Make the key decisions before opening the previous finished answer.",
        ),
        (
            2,
            6,
            10,
            "Keep the 3 checks the same",
            "Use 5 more examples. Test only 1 change at a time so you can explain the result.",
        ),
        (
            3,
            11,
            15,
            "Change the context",
            "Use a different audience, source shape or limit without making the task riskier.",
        ),
        (
            4,
            16,
            20,
            "Prove it in real low-risk work",
            "Use the same reviewer. Check every result against the original information and required result.",
        ),
    )

    widths = (55, 120, 145, 258, 55, 145)
    headers = ("DATE", "NEW EXAMPLE", "1 CHANGE TESTED", "RESULT, PROOF AND GAP", "SCORE", "CHANGE VERDICT")

    for week, first_attempt, last_attempt, week_title, week_instruction in week_details:
        page_surface()
        intro_y = 447
        sheet.rect(margin, intro_y, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Times-Bold", 14)
        sheet.c.drawString(
            margin + 12,
            intro_y + 18,
            f"Week {week} · Attempts {first_attempt} to {last_attempt} · {week_title}",
        )
        sheet.body(week_instruction, margin + 12, intro_y + 6, size=7.6, color=INK)
        # Right-align the score key without changing the compact reading order.
        score_key = "Score: 1 unusable · 2 mostly wrong · 3 usable with edits · 4 reliable with minor edits · 5 ready after human review"
        sheet.c.setFillColor(MUTED)
        sheet.c.setFont("Helvetica", 6.8)
        sheet.c.drawRightString(sheet.width - margin - 12, intro_y + 8, score_key)

        header_y = 410
        x = margin
        for label, width in zip(headers, widths):
            sheet.rect(x, header_y, width, 24, fill=BLUE, stroke=PAPER, stroke_width=0.4)
            sheet.c.setFillColor(PAPER)
            sheet.c.setFont("Helvetica-Bold", 6.5)
            sheet.c.drawString(x + 4, header_y + 8, label)
            x += width

        row_ys = (358, 306, 254, 202, 150)
        for row_index, (attempt, row_y) in enumerate(
            zip(range(first_attempt, last_attempt + 1), row_ys),
            start=1,
        ):
            x = margin
            for width in widths:
                sheet.rect(x, row_y, width, 52, fill=PAPER, stroke=LINE, stroke_width=0.6)
                x += width

            prefix = f"w{week}_r{attempt}"
            date_x = margin
            sheet.label(f"Attempt {attempt}", date_x + 4, row_y + 40)
            sheet.text_field(
                f"{prefix}_date",
                date_x + 4,
                row_y + 7,
                widths[0] - 8,
                25,
                font_size=7,
                max_len=10,
            )

            example_x = margin + widths[0]
            sheet.text_field(
                f"{prefix}_example",
                example_x + 4,
                row_y + 7,
                widths[1] - 8,
                38,
                multiline=True,
                font_size=7,
                max_len=100,
            )
            change_x = example_x + widths[1]
            sheet.text_field(
                f"{prefix}_change",
                change_x + 4,
                row_y + 7,
                widths[2] - 8,
                38,
                multiline=True,
                font_size=7,
                max_len=140,
            )
            evidence_x = change_x + widths[2]
            sheet.text_field(
                f"{prefix}_evidence",
                evidence_x + 4,
                row_y + 7,
                widths[3] - 8,
                38,
                multiline=True,
                font_size=7,
                max_len=180,
            )
            score_x = evidence_x + widths[3]
            sheet.c.acroForm.choice(
                name=f"{prefix}_score",
                tooltip=f"Attempt {attempt} score",
                x=score_x + 4,
                y=row_y + 13,
                width=widths[4] - 8,
                height=26,
                options=list(score_options),
                value=score_options[0],
                borderWidth=0.7,
                borderColor=HexColor("#8f887f"),
                fillColor=PAPER,
                textColor=INK,
                forceBorder=True,
                fontName="Helvetica",
                fontSize=8,
                fieldFlags="combo",
            )
            verdict_x = score_x + widths[4]
            sheet.c.acroForm.choice(
                name=f"{prefix}_change_verdict",
                tooltip=f"Attempt {attempt} change verdict",
                x=verdict_x + 4,
                y=row_y + 13,
                width=widths[5] - 8,
                height=26,
                options=list(change_options),
                value=change_options[0],
                borderWidth=0.7,
                borderColor=HexColor("#8f887f"),
                fillColor=PAPER,
                textColor=INK,
                forceBorder=True,
                fontName="Helvetica",
                fontSize=7,
                fieldFlags="combo",
            )

        summary_y = 42
        summary_gap = 8
        summary_w = (usable_width - (2 * summary_gap)) / 3
        summary_items = (
            ("Pattern I can now name", f"w{week}_pattern", 360),
            ("Rule supported by this week", f"w{week}_rule", 240),
            ("Next test", f"w{week}_next_test", 240),
        )
        for index, (label, name, max_len) in enumerate(summary_items):
            x = margin + index * (summary_w + summary_gap)
            sheet.rect(x, summary_y, summary_w, 96, fill=PAPER, stroke=INK)
            field(
                label,
                name,
                x + 10,
                summary_y + 10,
                summary_w - 20,
                57,
                max_len,
                multiline=True,
                font_size=7.2,
            )

        sheet.footer()
        sheet.c.showPage()

    # Page 6: proof summary, 3 rules and 1 final decision
    page_surface()
    intro_y = 447
    sheet.rect(margin, intro_y, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        margin + 12,
        intro_y + 21,
        "Compare the first and final evidence. Save exactly 3 rules, then choose 1 next move.",
    )
    sheet.body(
        "This page is the shareable proof summary. It does not certify broad AI expertise.",
        margin + 12,
        intro_y + 8,
        size=7.8,
        color=INK,
    )

    compare_y = 276
    compare_h = 159
    sheet.rect(margin, compare_y, usable_width, compare_h, fill=PAPER, stroke=INK)
    sheet.heading("What improved, and what did not", margin + 12, compare_y + 136, size=17)
    compare_inner = margin + 12
    compare_w = usable_width - 24
    score_w = 92
    time_w = 116
    top_gap = 10
    choice("First score", "proof_first_score", score_options, compare_inner, 373, score_w, 22)
    field(
        "Time before",
        "proof_before_time",
        compare_inner + score_w + top_gap,
        373,
        time_w,
        22,
        20,
    )
    choice(
        "Final score",
        "proof_final_score",
        score_options,
        compare_inner + score_w + time_w + (2 * top_gap),
        373,
        score_w,
        22,
    )
    field(
        "Time after",
        "proof_after_time",
        compare_inner + (2 * score_w) + time_w + (3 * top_gap),
        373,
        time_w,
        22,
        20,
    )
    sheet.body(
        "Use time only if speed matters. A faster weak result is not improvement.",
        compare_inner + (2 * score_w) + (2 * time_w) + (4 * top_gap),
        380,
        size=7.4,
        color=MUTED,
    )

    half_gap = 10
    half_w = (compare_w - half_gap) / 2
    field(
        "First gap",
        "proof_first_gap",
        compare_inner,
        323,
        half_w,
        32,
        300,
        multiline=True,
        font_size=7.2,
    )
    field(
        "Final evidence",
        "proof_final_evidence",
        compare_inner + half_w + half_gap,
        323,
        half_w,
        32,
        300,
        multiline=True,
        font_size=7.2,
    )
    field(
        "Error that stopped repeating",
        "proof_error_gone",
        compare_inner,
        286,
        half_w,
        24,
        240,
        multiline=True,
        font_size=7,
    )
    field(
        "Error that still repeats",
        "proof_error_remaining",
        compare_inner + half_w + half_gap,
        286,
        half_w,
        24,
        240,
        multiline=True,
        font_size=7,
    )

    rules_y = 145
    rules_h = 119
    sheet.rect(margin, rules_y, usable_width, rules_h, fill=PAPER, stroke=INK)
    sheet.heading("Save 3 rules the record supports", margin + 12, rules_y + 96, size=17)
    rule_gap = 8
    rule_w = (usable_width - 24 - (2 * rule_gap)) / 3
    for index in range(3):
        field(
            f"Rule {index + 1}",
            f"proof_rule_{index + 1}",
            margin + 12 + index * (rule_w + rule_gap),
            198,
            rule_w,
            28,
            160,
            multiline=True,
            font_size=7.2,
        )

    lower_gap = 7
    lower_w = (usable_width - 24 - (3 * lower_gap)) / 4
    lower_fields = (
        ("Where the 3 rules are saved", "proof_rules_saved_where"),
        ("Where all 20 attempts are saved", "proof_attempts_saved_where"),
        ("Next harder version or example", "proof_next_harder_version"),
        ("Reviewer and human check", "proof_human_check"),
    )
    for index, (label, name) in enumerate(lower_fields):
        field(
            label,
            name,
            margin + 12 + index * (lower_w + lower_gap),
            155,
            lower_w,
            22,
            220,
            multiline=True,
            font_size=6.8,
        )

    decision_y = 42
    decision_h = 91
    sheet.rect(margin, decision_y, usable_width, decision_h, fill=PAPER, stroke=INK)
    sheet.heading("Choose 1 next move", margin + 12, decision_y + 67, size=17)
    choice(
        "Final decision",
        "proof_verdict",
        ("Repeat", "Continue", "Keep manual"),
        margin + 12,
        53,
        180,
        24,
        font_size=8,
    )
    sheet.body(
        "Repeat at the same level · Continue in real low-risk work · Keep manual when the proof or judgment is weak",
        margin + 205,
        60,
        size=7.2,
        color=MUTED,
    )
    check_x = margin + 205
    sheet.checkbox("proof_baseline_saved", "Starting result saved", check_x, 93)
    sheet.checkbox("proof_final_result_saved", "Final result saved", check_x + 150, 93)
    sheet.checkbox("proof_sources_checked", "Sources checked", check_x + 300, 93)
    sheet.checkbox(
        "proof_human_review_completed",
        "Human review completed",
        check_x + 430,
        93,
    )
    sheet.footer()


def draw_better_prompts_scorecard(sheet: DecisionSheet) -> None:
    """Draw the 9-field prompt builder and answer-quality scorecard."""

    margin = 32
    gap = 10
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def check8(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.7)
        sheet.c.drawString(x + 13, y, label)

    def radio8(name: str, value: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.radio(
            name=name,
            value=value,
            selected=False,
            tooltip=f"{name.replace('_', ' ')}: {label}",
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="circle",
            shape="circle",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.7)
        sheet.c.drawString(x + 13, y, label)

    page_surface()

    intro_y = 414
    intro_h = 69
    sheet.rect(margin, intro_y, usable_width, intro_h, fill=PAPER, stroke=INK)
    intro_x = margin + 14
    sheet.heading("Write the brief before you run the task", intro_x, 458, size=17)
    sheet.body(
        "Complete all 9 fields. Use task-specific information. If a field is unclear, the brief is not ready.",
        intro_x,
        439,
        size=8.8,
        color=INK,
    )
    sheet.body(
        "After the answer arrives, score it before you revise, send, publish or use it for a decision.",
        intro_x,
        423,
        size=8.4,
        color=BLUE,
    )

    field_specs = (
        (
            "1. Task and finished result",
            "What must AI prepare? What must be true when the work is finished?",
            "prompt_builder_task_finished_result",
        ),
        (
            "2. Audience and decision",
            "Who will use the answer? What decision or action must it support?",
            "prompt_builder_audience_decision",
        ),
        (
            "3. Context that changes the answer",
            "Add only background that changes the result.",
            "prompt_builder_context",
        ),
        (
            "4. Evidence and source priority",
            "Name allowed sources. If 2 sources conflict, state which source wins.",
            "prompt_builder_evidence_source_priority",
        ),
        (
            "5. Quality example",
            "Add 1 allowed example or describe what a strong result contains.",
            "prompt_builder_quality_example",
        ),
        (
            "6. Required format",
            "State sections, order, length, table columns or file type.",
            "prompt_builder_required_format",
        ),
        (
            "7. Rules, limits and claims to avoid",
            "State what AI must not invent, expose, promise or decide.",
            "prompt_builder_rules_limits",
        ),
        (
            "8. Missing-information rule",
            "Tell AI to ask, mark the gap or stop when information is missing.",
            "prompt_builder_missing_information_rule",
        ),
        (
            "9. Human approval point",
            "Name who checks the answer and what action needs approval.",
            "prompt_builder_human_approval_point",
        ),
    )
    card_gap = 9
    card_width = (usable_width - (2 * card_gap)) / 3
    card_height = 111
    row_ys = (294, 177, 60)
    for index, (title, prompt, name) in enumerate(field_specs):
        col = index % 3
        row = index // 3
        x = margin + col * (card_width + card_gap)
        y = row_ys[row]
        sheet.rect(x, y, card_width, card_height, fill=PAPER, stroke=INK)
        inner_x = x + 12
        inner_w = card_width - 24
        sheet.label(title, inner_x, y + card_height - 18)
        sheet.wrapped_text(
            prompt,
            inner_x,
            y + card_height - 35,
            inner_w,
            size=7.8,
            leading=9.2,
            max_lines=2,
        )
        sheet.text_field(
            name,
            inner_x,
            y + 11,
            inner_w,
            42,
            multiline=True,
            font_size=8.5,
        )

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    example_y = 405
    example_h = 78
    sheet.rect(margin, example_y, usable_width, example_h, fill=PALE_BLUE, stroke=INK)
    example_x = margin + 14
    sheet.label("Shift & Lead Build Sprint worked example", example_x, 462)
    example_lines = (
        "Job: answer whether the Build Sprint includes strategy, implementation or both. Evidence: current service page and scope template.",
        "Rules: under 120 words. No new deliverables, deadlines, guarantees or prices. Fatiha checks every promise and sends the reply.",
        "1st score: 8. Evidence scored 0 because AI invented a turnaround time, so the answer stopped. Revised score: 11 after correction and source checks.",
    )
    for index, line in enumerate(example_lines):
        sheet.body(line, example_x, 445 - index * 15, size=8.1, color=INK)

    score_y = 190
    score_h = 205
    sheet.rect(margin, score_y, usable_width, score_h, fill=PAPER, stroke=INK)
    score_x = margin + 14
    score_w = usable_width - 28
    sheet.heading("Answer-quality scorecard", score_x, 372, size=17)
    sheet.body(
        "Choose 0, 1 or 2 for every area. Name the weak area before changing the brief.",
        score_x,
        354,
        size=8.4,
    )
    score_specs = (
        ("Task fit", "Does it complete the named job?", "answer_score_task_fit"),
        ("Evidence", "Can each important claim trace to an allowed source?", "answer_score_evidence"),
        ("Completeness", "Is every required part present?", "answer_score_completeness"),
        ("Rules and limits", "Does it follow every stated rule and limit?", "answer_score_rules_limits"),
        ("Usability", "Is it in the required format and ready for review?", "answer_score_usability"),
        ("Uncertainty", "Does it show gaps, guesses and uncertain claims?", "answer_score_uncertainty"),
    )
    score_gap = 8
    score_card_w = (score_w - score_gap) / 2
    score_card_h = 49
    score_row_ys = (298, 246, 194)
    for index, (title, question, name) in enumerate(score_specs):
        col = index % 2
        row = index // 2
        x = score_x + col * (score_card_w + score_gap)
        y = score_row_ys[row]
        sheet.rect(x, y, score_card_w, score_card_h, fill=CREAM, stroke=LINE)
        sheet.label(title, x + 10, y + 34)
        sheet.body(question, x + 10, y + 21, size=7.4, color=MUTED)
        option_x = x + score_card_w - 150
        radio8(name, "0", "0 Fails", option_x, y + 35)
        radio8(name, "1", "1 Partly", option_x + 52, y + 35)
        radio8(name, "2", "2 Passes", option_x + 105, y + 35)

    decision_y = 124
    decision_h = 71
    sheet.rect(margin, decision_y, usable_width, decision_h, fill=PAPER, stroke=INK)
    decision_x = margin + 14
    sheet.heading("Total decision", decision_x, 173, size=17)
    sheet.label("Total / 12", decision_x, 151)
    sheet.text_field("answer_score_total", decision_x, 132, 65, 18, font_size=9)
    radio8("answer_score_decision", "Use", "USE", decision_x + 90, 143)
    radio8("answer_score_decision", "Revise", "REVISE", decision_x + 150, 143)
    radio8("answer_score_decision", "Stop", "STOP", decision_x + 228, 143)
    sheet.body("10-12: USE after the named human check.", decision_x + 325, 158, size=7.8, color=BLUE)
    sheet.body("7-9: REVISE the weak area, then score again.", decision_x + 325, 145, size=7.8, color=INK)
    sheet.body("0-6: STOP and rebuild the brief or source.", decision_x + 325, 132, size=7.8, color=SIGNAL)

    stop_y = 42
    stop_h = 72
    sheet.rect(margin, stop_y, usable_width, stop_h, fill=PAPER, stroke=INK)
    stop_x = margin + 14
    half = (usable_width - 36) / 2
    sheet.label("Automatic stop overrides the total", stop_x, 94, color=SIGNAL)
    check8("answer_stop_unsupported_claim", "Important claim has no allowed source", stop_x, 77)
    check8("answer_stop_private_information", "Private information is exposed or not allowed", stop_x, 60)
    check8("answer_stop_source_conflict", "Sources conflict and no source wins", stop_x + 220, 77)
    check8("answer_stop_unapproved_action", "Action would happen without human approval", stop_x + 220, 60)

    human_x = margin + half + 18
    sheet.label("Named human check", human_x, 94)
    sheet.label("Checker", human_x, 77)
    sheet.text_field("answer_named_human_checker", human_x + 58, 62, 185, 18, font_size=9)
    check8("answer_human_check_complete", "Important claims checked against original sources", human_x, 49)

    sheet.footer()


def draw_source_to_publish_planner(sheet: DecisionSheet) -> None:
    """Draw a 2-page source-to-publish planner with a human publish gate."""

    margin = 32
    gap = 10
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def check8(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.8)
        sheet.c.drawString(x + 13, y, label)

    def radio9(name: str, value: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.radio(
            name=name,
            value=value,
            selected=False,
            tooltip=f"Publish decision: {label}",
            x=x,
            y=y - 1,
            size=10,
            buttonStyle="circle",
            shape="circle",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 8.5)
        sheet.c.drawString(x + 15, y, label)

    def planner_card(
        number: str,
        title: str,
        prompt: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        field_height: float = 46,
    ) -> None:
        sheet.rect(x, y, width, height, fill=PAPER, stroke=INK)
        inner_x = x + 12
        inner_w = width - 24
        sheet.label(f"{number}. {title}", inner_x, y + height - 18)
        sheet.wrapped_text(
            prompt,
            inner_x,
            y + height - 36,
            inner_w,
            size=7.8,
            leading=9.2,
            max_lines=2,
        )
        sheet.text_field(
            name,
            inner_x,
            y + 11,
            inner_w,
            field_height,
            multiline=True,
            font_size=8.5,
            max_len=1200,
        )

    page_surface()

    intro_y = 414
    intro_h = 69
    sheet.rect(margin, intro_y, usable_width, intro_h, fill=PAPER, stroke=INK)
    intro_x = margin + 14
    sheet.heading("Keep 1 source open from brief to publish", intro_x, 458, size=17)
    sheet.body(
        "Complete the planner in order. Build the main piece before versions for other channels.",
        intro_x,
        439,
        size=8.8,
        color=INK,
    )
    sheet.body(
        "AI may prepare drafts. A person checks the source, rights, point of view and final publish decision.",
        intro_x,
        423,
        size=8.4,
        color=BLUE,
    )

    page1_fields = (
        (
            "1",
            "Source, date and rights",
            "Record the source, location, date and proof that you may use or quote it.",
            "content_source_date_rights",
        ),
        (
            "2",
            "Reader and change",
            "Name the reader and what they should understand, decide or do next.",
            "content_reader_change",
        ),
        (
            "3",
            "Facts and examples with source locations",
            "Keep only useful facts, examples or quotes. Add the page, time or link for each.",
            "content_facts_examples_source_locations",
        ),
        (
            "4",
            "Point of view",
            "Write the judgment, lesson or challenge that you add beyond the source.",
            "content_point_of_view",
        ),
        (
            "5",
            "Main piece brief",
            "Set the format, title or hook, key points, order, length, next action and claims to avoid.",
            "content_main_piece_brief",
        ),
        (
            "6",
            "Versions for other channels",
            "For each channel, set the opening, length, format and link. Name what changes and stays true.",
            "content_channel_versions",
        ),
    )
    card_width = (usable_width - gap) / 2
    card_height = 114
    row_ys = (290, 166, 42)
    for index, args in enumerate(page1_fields):
        col = index % 2
        row = index // 2
        planner_card(
            *args,
            margin + col * (card_width + gap),
            row_ys[row],
            card_width,
            card_height,
        )

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    page2_fields = (
        (
            "7",
            "Voice and visual references",
            "Add allowed examples for voice, pace, visual standard or editing direction. Do not copy them.",
            "content_voice_visual_references",
        ),
        (
            "8",
            "Facts, rights and links check",
            "Reopen every source. Check facts, quotes, rights, links, claims and the next action.",
            "content_facts_rights_links_check",
        ),
        (
            "9",
            "Named approver",
            "Name who decides Publish or Stop for the main piece and every channel version.",
            "content_named_approver",
        ),
        (
            "10",
            "Final URLs and what readers say next",
            "Record each live URL, 1 useful reader question or response and what it changes next.",
            "content_final_urls_reader_response",
        ),
    )
    page2_card_height = 110
    for index, args in enumerate(page2_fields):
        col = index % 2
        row = index // 2
        planner_card(
            *args,
            margin + col * (card_width + gap),
            373 - row * 120,
            card_width,
            page2_card_height,
            field_height=42,
        )

    example_y = 154
    example_h = 89
    sheet.rect(margin, example_y, usable_width, example_h, fill=PALE_BLUE, stroke=INK)
    example_x = margin + 14
    sheet.label("Shift & Lead workshop worked example", example_x, 221)
    example_lines = (
        "Source: workshop transcript with names removed and approved slides. Reader change: managers can choose the 1st task to automate.",
        "Point of view: start with repeatable work that has a clear result and a human check. Main piece: guide. Versions: LinkedIn post and email.",
        "Do not invent client results. Fatiha approves all 3 pieces. Next signal: the question readers ask most after publishing.",
    )
    for index, line in enumerate(example_lines):
        sheet.body(line, example_x, 203 - index * 16, size=8.1, color=INK)

    decision_y = 42
    decision_h = 102
    sheet.rect(margin, decision_y, usable_width, decision_h, fill=PAPER, stroke=INK)
    decision_x = margin + 14
    sheet.heading("Publish decision", decision_x, 121, size=17)
    radio9("content_publish_decision", "Publish", "PUBLISH", decision_x + 185, 113)
    radio9("content_publish_decision", "Stop", "STOP", decision_x + 285, 113)
    sheet.body(
        "If any stop below is checked, choose Stop and record what must change in the planner.",
        decision_x + 390,
        113,
        size=7.8,
        color=SIGNAL,
    )
    sheet.label("Stop checks", decision_x, 91, color=SIGNAL)
    stop_checks = (
        ("content_stop_missing_source_rights", "Missing source or rights"),
        ("content_stop_unchecked_fact_link", "Unchecked fact or link"),
        ("content_stop_missing_viewpoint", "Missing point of view"),
        ("content_stop_new_claim", "Channel version adds a new claim"),
        ("content_stop_private_client_info", "Private or client information lacks approval"),
        ("content_stop_no_approver", "No named approver"),
    )
    stop_col = usable_width / 3
    for index, (name, label) in enumerate(stop_checks):
        col = index % 3
        row = index // 3
        check8(name, label, decision_x + col * stop_col, 74 - row * 18)

    sheet.footer()


def draw_task_to_workflow_canvas(sheet: DecisionSheet) -> None:
    """Draw the 15-field workflow canvas and its full verification gate."""

    margin = 32
    gap = 10
    usable_width = sheet.width - (2 * margin)
    card_width = (usable_width - gap) / 2

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def canvas_card(
        number: str,
        title: str,
        prompt: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        field_width: float | None = None,
    ) -> None:
        sheet.rect(x, y, width, height, fill=PAPER, stroke=INK)
        inner_x = x + 11
        inner_w = width - 22
        sheet.label(f"{number}. {title}", inner_x, y + height - 17)
        sheet.wrapped_text(
            prompt,
            inner_x,
            y + height - 33,
            inner_w,
            size=7.3,
            leading=8.5,
            max_lines=3,
        )
        available_width = field_width if field_width is not None else inner_w
        sheet.text_field(
            name,
            inner_x,
            y + 9,
            available_width,
            30,
            multiline=True,
            font_size=8.2,
            max_len=1200,
        )

    def compact_check(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )

    def radio10(name: str, value: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.radio(
            name=name,
            value=value,
            selected=False,
            tooltip=f"Workflow decision: {label}",
            x=x,
            y=y - 1,
            size=10,
            buttonStyle="circle",
            shape="circle",
            borderWidth=0.8,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 8.2)
        sheet.c.drawString(x + 15, y, label)

    def checklist_panel(
        title: str,
        items: tuple[tuple[str, str], ...],
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        columns: int,
        row_height: float,
        signal: bool = False,
    ) -> None:
        sheet.rect(x, y, width, height, fill=PAPER, stroke=INK)
        inner_x = x + 13
        inner_w = width - 26
        sheet.label(title, inner_x, y + height - 18, color=SIGNAL if signal else BLUE)
        col_gap = 14
        col_width = (inner_w - ((columns - 1) * col_gap)) / columns
        rows = (len(items) + columns - 1) // columns
        start_y = y + height - 39
        for index, (name, label) in enumerate(items):
            col = index // rows
            row = index % rows
            item_x = inner_x + col * (col_width + col_gap)
            item_y = start_y - row * row_height
            compact_check(name, label, item_x, item_y)
            sheet.wrapped_text(
                label,
                item_x + 14,
                item_y + 1,
                col_width - 14,
                size=6.8,
                leading=7.5,
                color=INK,
                max_lines=4,
            )

    page_surface()
    sheet.rect(margin, 428, usable_width, 58, fill=PALE_BLUE, stroke=INK)
    sheet.heading("Map the task before you connect a tool", margin + 14, 464, size=17)
    sheet.body(
        "Complete all 15 fields. Then run the processing rules, quality bar and stop rules before the workflow handles real work.",
        margin + 14,
        445,
        size=7.7,
        color=INK,
    )
    sheet.body(
        "Run the task by hand once. Keep the map narrow. If a stop rule is true, do not automate the task until the problem is fixed or the task moves to the correct system.",
        margin + 14,
        432,
        size=7.7,
        color=BLUE,
    )

    page1_fields = (
        (
            "1",
            "Task and current owner",
            "Name the repeated task, its current owner and why it repeats.",
            "workflow_task_current_owner",
        ),
        (
            "2",
            "Useful result",
            "What must be true when the task is finished?",
            "workflow_useful_result",
        ),
        (
            "3",
            "Trigger and start-once rule",
            "Name the exact start event and how the same start is blocked from running twice.",
            "workflow_trigger_start_once_rule",
        ),
        (
            "4",
            "Frequency, volume and scope",
            "Record how often, how many items and what must stay outside this workflow.",
            "workflow_frequency_volume_scope",
        ),
        (
            "5",
            "Required inputs",
            "List every file, field, message or event needed before the 1st step.",
            "workflow_required_inputs",
        ),
        (
            "6",
            "Source of truth",
            "Where does each important fact come from? What source wins when sources disagree?",
            "workflow_source_of_truth",
        ),
        (
            "7",
            "Fixed steps in order",
            "Write every step from trigger to finish. If the next step cannot be known now, test whether this needs an agent.",
            "workflow_fixed_steps",
        ),
        (
            "8",
            "Owner for every step",
            "Mark each step Human, Automation or AI. Name 1 person who owns the whole workflow.",
            "workflow_step_owners",
        ),
    )
    row_ys = (333, 236, 139, 42)
    for index, args in enumerate(page1_fields):
        col = index % 2
        row = index // 2
        canvas_card(
            *args,
            margin + col * (card_width + gap),
            row_ys[row],
            card_width,
            86,
        )

    sheet.footer()
    sheet.c.showPage()
    page_surface()
    sheet.rect(margin, 428, usable_width, 58, fill=PALE_BLUE, stroke=INK)
    sheet.label("Worked example: AI jargon guide delivery", margin + 14, 469)
    sheet.wrapped_text(
        "Task: deliver the requested guide. Trigger: 1 popup request for guide.ai-jargon-guide. Duplicate rule: 1 delivery run per request ID. Required tag: guide_ai_10_words_pdf. Output: immediate and email delivery of 10-ai-words-you-need-to-know.pdf. Finish check: delivery succeeds. Failure: rejected send or bounce stops later messages, logs the error, alerts Fatiha and creates a manual resend item with the reader, guide and error.",
        margin + 14,
        455,
        usable_width - 28,
        size=6.8,
        leading=7.2,
        color=INK,
        max_lines=4,
    )

    page2_fields = (
        (
            "9",
            "Access and permissions",
            "Name the smallest mailbox, folder, record, field or action each step may use.",
            "workflow_access_permissions",
        ),
        (
            "10",
            "Output and finish check",
            "Record the output format, destination and visible proof that the task finished correctly.",
            "workflow_output_finish_check",
        ),
        (
            "11",
            "Rules and human approval",
            "What must stay true, what must never happen and which actions need approval from which named person?",
            "workflow_rules_human_approval",
        ),
        (
            "12",
            "Exceptions and handoff",
            "List unusual cases, the owner for each and the response time.",
            "workflow_exceptions_handoff",
        ),
        (
            "13",
            "Failure handling",
            "Record the error log, owner alert, retry limit, duplicate protection and manual fallback.",
            "workflow_failure_handling",
        ),
        (
            "14",
            "Test set",
            "Record evidence from the normal run and all 6 failure cases. Complete the checks on page 3.",
            "workflow_test_set",
        ),
    )
    for index, args in enumerate(page2_fields):
        col = index % 2
        row = index // 2
        canvas_card(
            *args,
            margin + col * (card_width + gap),
            (333, 236, 139)[row],
            card_width,
            86,
        )

    decision_y = 42
    decision_h = 86
    sheet.rect(margin, decision_y, usable_width, decision_h, fill=PAPER, stroke=INK)
    decision_x = margin + 11
    sheet.label("15. Run record and decision", decision_x, 109)
    sheet.body(
        "Record what started, finished, failed or needed human help, and name who decides.",
        decision_x,
        94,
        size=7.3,
        color=MUTED,
    )
    sheet.text_field(
        "workflow_run_record_decision",
        decision_x,
        51,
        480,
        34,
        multiline=True,
        font_size=8.2,
        max_len=1200,
    )
    sheet.label("Decision", decision_x + 501, 98)
    radio10("workflow_decision", "Keep", "KEEP", decision_x + 501, 74)
    radio10("workflow_decision", "Change", "CHANGE", decision_x + 572, 74)
    radio10("workflow_decision", "Stop", "STOP", decision_x + 662, 74)

    sheet.footer()
    sheet.c.showPage()
    page_surface()
    sheet.rect(margin, 444, usable_width, 42, fill=PALE_BLUE, stroke=INK)
    sheet.heading("Break it on purpose before you increase volume", margin + 14, 463, size=17)
    sheet.body(
        "Check a box only when the test or control has passed and the evidence is recorded on page 2.",
        margin + 440,
        461,
        size=7.5,
        color=INK,
    )

    tests = (
        ("workflow_test_normal", "Normal run"),
        ("workflow_test_missing_input", "Missing input"),
        ("workflow_test_wrong_input", "Wrong input"),
        ("workflow_test_duplicate_trigger", "Duplicate trigger"),
        ("workflow_test_provider_failure", "Provider failure"),
        ("workflow_test_bad_output", "Bad output"),
        ("workflow_test_human_review", "Human-review case"),
    )
    processing_rules = (
        ("workflow_rule_01", "Complete the task manually once before automating it."),
        ("workflow_rule_02", "Accept only the named trigger and block duplicate starts before step 1."),
        ("workflow_rule_03", "Check every required input and source before processing."),
        ("workflow_rule_04", "Follow the fixed steps in order. Do not guess a new path."),
        ("workflow_rule_05", "Give each step 1 owner and only the access it needs."),
        ("workflow_rule_06", "Pause before every action that needs human approval."),
        ("workflow_rule_07", "When a step fails, stop the action, write the error, alert the owner and stay inside the retry limit."),
        ("workflow_rule_08", "Use the manual fallback when the workflow cannot finish safely."),
        ("workflow_rule_09", "Save the run record and make a Keep, Change or Stop decision before increasing volume."),
    )
    quality_bar = (
        ("workflow_quality_01", "The task passed 1 manual run before automation."),
        ("workflow_quality_02", "The trigger creates 1 run and duplicate starts create no repeated action."),
        ("workflow_quality_03", "Every required input and source of truth is named and allowed."),
        ("workflow_quality_04", "Every fixed step has an owner and can be followed in order."),
        ("workflow_quality_05", "Each step has only the access it needs."),
        ("workflow_quality_06", "The output, destination and visible finish check are clear."),
        ("workflow_quality_07", "Human approvals, exceptions and response times have named owners."),
        ("workflow_quality_08", "The normal path and all 6 failure cases have passed."),
        ("workflow_quality_09", "Every failure creates a log, alert, safe stop and manual fallback."),
        ("workflow_quality_10", "The run record ends with a named Keep, Change or Stop decision."),
    )
    stop_rules = (
        ("workflow_stop_01", "There is no clear trigger or finished result."),
        ("workflow_stop_02", "You cannot complete the task manually once."),
        ("workflow_stop_03", "Inputs are missing, unclear or not allowed."),
        ("workflow_stop_04", "Access is broader than the task needs."),
        ("workflow_stop_05", "An action involving a customer, money, private data, publishing, deletion or a lasting record lacks named approval."),
        ("workflow_stop_06", "A duplicate trigger or retry could repeat the action."),
        ("workflow_stop_07", "A failure can remain hidden or has no owner."),
        ("workflow_stop_08", "There is no manual fallback."),
        ("workflow_stop_09", "The next step cannot be written before the run. Evaluate an agent instead."),
        ("workflow_stop_10", "Several always-on workflows need shared monitoring. Move the work to business operations."),
    )

    checklist_panel(
        "7 test cases",
        tests,
        margin,
        261,
        card_width,
        172,
        columns=1,
        row_height=18,
    )
    checklist_panel(
        "9 processing rules",
        processing_rules,
        margin + card_width + gap,
        261,
        card_width,
        172,
        columns=2,
        row_height=27,
    )
    checklist_panel(
        "10-point quality bar",
        quality_bar,
        margin,
        42,
        card_width,
        208,
        columns=2,
        row_height=33,
    )
    checklist_panel(
        "10 stop rules: any checked rule means do not automate",
        stop_rules,
        margin + card_width + gap,
        42,
        card_width,
        208,
        columns=2,
        row_height=33,
        signal=True,
    )

    sheet.footer()


def draw_agent_role_permission_test_canvas(sheet: DecisionSheet) -> None:
    """Draw a 3-page canvas for progressive agent permission earning."""

    margin = 32
    gap = 10
    usable_width = sheet.width - (2 * margin)
    card_width = (usable_width - gap) / 2

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def decision_card(
        number: str,
        title: str,
        prompt: str,
        name: str,
        x: float,
        y: float,
    ) -> None:
        sheet.rect(x, y, card_width, 86, fill=PAPER, stroke=INK)
        inner_x = x + 11
        inner_w = card_width - 22
        sheet.label(f"{number}. {title}", inner_x, y + 68)
        sheet.wrapped_text(
            prompt,
            inner_x,
            y + 53,
            inner_w,
            size=7.2,
            leading=8.2,
            max_lines=2,
        )
        sheet.text_field(
            name,
            inner_x,
            y + 9,
            inner_w,
            30,
            multiline=True,
            font_size=8.2,
            max_len=1200,
        )

    def check8(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )

    def labelled_check(name: str, label: str, x: float, y: float) -> None:
        check8(name, label, x, y)
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 6.9)
        sheet.c.drawString(x + 14, y, label)

    def radio8(
        name: str,
        value: str,
        label: str,
        x: float,
        y: float,
        *,
        tooltip: str,
    ) -> None:
        sheet.c.acroForm.radio(
            name=name,
            value=value,
            selected=False,
            tooltip=tooltip,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="circle",
            shape="circle",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 7.2)
        sheet.c.drawString(x + 13, y, label)

    def compact_field(
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 7.8,
    ) -> None:
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    page_surface()
    sheet.rect(margin, 428, usable_width, 58, fill=PALE_BLUE, stroke=INK)
    sheet.label("Shift & Lead Build Sprint example", margin + 14, 469)
    sheet.wrapped_text(
        "Fatiha has an approved client form and discovery-call notes. The agent may read only that form, those notes, the current service page and the Build Sprint fit rules. It may choose Fixed steps needed, Agent needed or More information needed. It then writes a short note with a link to every source in Fatiha's review list. It may never set a price, promise a deadline, change the customer record system (CRM) or send a message. It stops when information is missing or conflicts, the request is outside this job, a file or webpage contains a hidden command, access fails or a claim has no approved source.",
        margin + 14,
        455,
        usable_width - 28,
        size=6.7,
        leading=7.1,
        color=INK,
        max_lines=4,
    )

    decision_fields = (
        (
            "1",
            "One role and useful result",
            "Write 1 role, who it helps and the useful result it must produce.",
            "agent_role_useful_result",
        ),
        (
            "2",
            "Choice that needs an agent",
            "Name the next-step choice that cannot be fixed before the task starts.",
            "agent_choice_not_fixed_workflow",
        ),
        (
            "3",
            "Approved choices and actions",
            "List the only choices and actions the agent may take.",
            "agent_approved_choices_actions",
        ),
        (
            "4",
            "Never allowed",
            "List every decision and action the agent may never take.",
            "agent_never_allowed",
        ),
        (
            "5",
            "Allowed information and which source wins",
            "List the information the agent may use. State which source wins when sources disagree.",
            "agent_allowed_evidence_source_order",
        ),
        (
            "6",
            "Finish line and proof",
            "State the output, destination and proof that the task finished correctly.",
            "agent_finish_line_proof",
        ),
        (
            "7",
            "When to stop and who to ask",
            "List what makes the agent stop and name the person who gets the question.",
            "agent_stop_escalation",
        ),
        (
            "8",
            "Human owner and status report",
            "Name the owner, actions that need approval, run results and proof shown after each run.",
            "agent_human_owner_status_report",
        ),
    )
    row_ys = (333, 236, 139, 42)
    for index, args in enumerate(decision_fields):
        col = index % 2
        row = index // 2
        decision_card(
            *args,
            margin + col * (card_width + gap),
            row_ys[row],
        )

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    sheet.rect(margin, 454, usable_width, 32, fill=PALE_BLUE, stroke=INK)
    sheet.heading("Give access to 1 named tool or account at a time", margin + 14, 465, size=15)
    sheet.body(
        "A checked action is allowed only in that row. Every unchecked action is blocked.",
        margin + 410,
        465,
        size=7.6,
        color=INK,
    )

    matrix_y = 262
    matrix_h = 180
    sheet.rect(margin, matrix_y, usable_width, matrix_h, fill=PAPER, stroke=INK)
    matrix_x = margin + 12
    sheet.label("5 access rows", matrix_x, 424)
    sheet.body(
        "Use a new row when the tool, information, allowed action or access end changes.",
        matrix_x + 125,
        424,
        size=7.1,
        color=MUTED,
    )

    resource_x = matrix_x
    scope_x = resource_x + 96
    actions_x = scope_x + 186
    expiry_x = actions_x + 236
    gate_x = expiry_x + 136
    sheet.label("Tool / account", resource_x, 405)
    sheet.label("Exact information it may use", scope_x, 405)
    action_headers = ("VIEW", "DRAFT", "CHANGE", "SEND", "DELETE/SPEND")
    action_offsets = (2, 45, 91, 139, 183)
    for label, offset in zip(action_headers, action_offsets):
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 5.8)
        sheet.c.drawCentredString(actions_x + offset + 9, 405, label)
    sheet.c.setFillColor(BLUE)
    sheet.c.setFont("Courier-Bold", 5.8)
    sheet.c.drawString(expiry_x, 405, "ACCESS END DATE / WHO REMOVES IT")
    sheet.label("Who approves", gate_x, 405)

    permission_rows = (376, 350, 324, 298, 272)
    for row_number, field_y in enumerate(permission_rows, 1):
        compact_field(
            f"agent_permission_{row_number}_resource",
            resource_x,
            field_y,
            90,
            19,
            160,
        )
        compact_field(
            f"agent_permission_{row_number}_scope",
            scope_x,
            field_y,
            180,
            19,
            500,
        )
        for action, offset in zip(
            ("view", "draft_create", "change", "send_publish", "delete_spend"),
            action_offsets,
        ):
            check8(
                f"agent_permission_{row_number}_{action}",
                f"Permission row {row_number}: {action.replace('_', ' ')} is allowed",
                actions_x + offset + 4,
                field_y + 6,
            )
        compact_field(
            f"agent_permission_{row_number}_expiry_revoke_owner",
            expiry_x,
            field_y,
            130,
            19,
            240,
        )
        compact_field(
            f"agent_permission_{row_number}_approval_gate",
            gate_x,
            field_y,
            79,
            19,
            80,
        )

    approval_y = 95
    approval_h = 157
    sheet.rect(margin, approval_y, usable_width, approval_h, fill=PAPER, stroke=INK)
    approval_x = margin + 12
    sheet.label("3 approval stops", approval_x, 234)
    sheet.body(
        "The agent stays paused until the named person says yes or no.",
        approval_x + 125,
        234,
        size=7.1,
        color=SIGNAL,
    )
    action_x = approval_x
    evidence_x = action_x + 116
    approver_x = evidence_x + 182
    safe_x = approver_x + 126
    rollback_x = safe_x + 176
    headers = (
        ("Action that must pause", action_x),
        ("What the approver sees", evidence_x),
        ("Who approves / deadline", approver_x),
        ("What happens if nobody approves", safe_x),
        ("How to undo and check", rollback_x),
    )
    for label, x in headers:
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 5.8)
        sheet.c.drawString(x, 216, label.upper())
    approval_rows = (182, 146, 110)
    for row_number, field_y in enumerate(approval_rows, 1):
        compact_field(
            f"agent_gate_{row_number}_protected_action",
            action_x,
            field_y,
            110,
            25,
            300,
            multiline=True,
            font_size=7.3,
        )
        compact_field(
            f"agent_gate_{row_number}_evidence",
            evidence_x,
            field_y,
            176,
            25,
            600,
            multiline=True,
            font_size=7.3,
        )
        compact_field(
            f"agent_gate_{row_number}_approver_window",
            approver_x,
            field_y,
            120,
            25,
            240,
            multiline=True,
            font_size=7.3,
        )
        compact_field(
            f"agent_gate_{row_number}_safe_default",
            safe_x,
            field_y,
            170,
            25,
            500,
            multiline=True,
            font_size=7.3,
        )
        compact_field(
            f"agent_gate_{row_number}_undo_proof",
            rollback_x,
            field_y,
            150,
            25,
            500,
            multiline=True,
            font_size=7.3,
        )

    sheet.rect(margin, 42, usable_width, 43, fill=PALE_BLUE, stroke=INK)
    sheet.label("How to stop, remove access and leave work safe", margin + 12, 66, color=SIGNAL)
    compact_field(
        "agent_emergency_stop_revocation_safe_state",
        margin + 265,
        50,
        372,
        25,
        1200,
        multiline=True,
        font_size=7.5,
    )
    labelled_check(
        "agent_access_removal_tested",
        "Access removal tested",
        margin + 655,
        62,
    )

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    sheet.rect(margin, 454, usable_width, 32, fill=PALE_BLUE, stroke=INK)
    sheet.heading("Test before the agent gets more access", margin + 14, 465, size=15)
    sheet.body(
        "For each test, record the setup, expected safe action, actual result and proof.",
        margin + 380,
        465,
        size=7.6,
        color=INK,
    )

    tests = (
        (
            "1",
            "Normal",
            "agent_test_normal_evidence",
        ),
        (
            "2",
            "Missing or invalid input",
            "agent_test_missing_invalid_evidence",
        ),
        (
            "3",
            "Conflicting sources",
            "agent_test_conflicting_sources_evidence",
        ),
        (
            "4",
            "Command hidden in a file or webpage",
            "agent_test_hidden_untrusted_evidence",
        ),
        (
            "5",
            "Request outside this job",
            "agent_test_outside_role_evidence",
        ),
        (
            "6",
            "Risky action stops for approval",
            "agent_test_protected_action_evidence",
        ),
        (
            "7",
            "Connected tool fails",
            "agent_test_tool_provider_failure_evidence",
        ),
        (
            "8",
            "Poor, partial or duplicate result",
            "agent_test_poor_partial_duplicate_evidence",
        ),
    )
    test_row_ys = (374, 302, 230, 158)
    for index, (number, title, evidence_name) in enumerate(tests):
        col = index % 2
        row = index // 2
        x = margin + col * (card_width + gap)
        y = test_row_ys[row]
        sheet.rect(x, y, card_width, 70, fill=PAPER, stroke=INK)
        sheet.label(f"{number}. {title}", x + 11, y + 53)
        compact_field(
            evidence_name,
            x + 11,
            y + 8,
            250,
            36,
            1200,
            multiline=True,
            font_size=7.7,
        )
        result_name = f"agent_test_{number}_result"
        radio8(
            result_name,
            "Pass",
            "PASS",
            x + 274,
            y + 42,
            tooltip=f"Test {number} result: Pass",
        )
        radio8(
            result_name,
            "Change",
            "CHANGE",
            x + 274,
            y + 27,
            tooltip=f"Test {number} result: Change",
        )
        radio8(
            result_name,
            "Stop",
            "STOP",
            x + 274,
            y + 12,
            tooltip=f"Test {number} result: Stop",
        )

    release_y = 42
    release_h = 106
    sheet.rect(margin, release_y, usable_width, release_h, fill=PAPER, stroke=INK)
    release_x = margin + 12
    sheet.label("6 final checks", release_x, 129)
    release_checks = (
        ("agent_release_all_tests_evidence", "All 8 tests have proof"),
        ("agent_release_no_blocked_action", "No blocked action happened"),
        ("agent_release_approval_paused", "Risky action paused for approval"),
        ("agent_release_no_partial_action", "Stopping left no half-finished action"),
        ("agent_release_activity_sources_visible", "Each action and source is visible"),
        ("agent_release_revocation_rollback", "Access removal and undo passed"),
    )
    release_col = usable_width / 3
    for index, (name, label) in enumerate(release_checks):
        col = index % 3
        row = index // 3
        labelled_check(
            name,
            label,
            release_x + col * release_col,
            111 - row * 16,
        )

    sheet.label("Limits for 1 test run", release_x, 73)
    compact_field(
        "agent_pilot_limits",
        release_x,
        49,
        306,
        20,
        800,
        font_size=7.7,
    )
    sheet.label("What happens next", release_x + 328, 73)
    radio8(
        "agent_final_release",
        "DraftOnly",
        "DRAFT ONLY",
        release_x + 328,
        55,
        tooltip="Final release: Draft only",
    )
    radio8(
        "agent_final_release",
        "SupervisedRun",
        "1 SUPERVISED RUN",
        release_x + 421,
        55,
        tooltip="Final release: 1 supervised run",
    )
    radio8(
        "agent_final_release",
        "Change",
        "CHANGE",
        release_x + 548,
        55,
        tooltip="Final release: Change",
    )
    radio8(
        "agent_final_release",
        "Stop",
        "STOP",
        release_x + 628,
        55,
        tooltip="Final release: Stop",
    )

    sheet.footer()


def draw_24_7_operations_blueprint(sheet: DecisionSheet) -> None:
    """Draw a monitored operations blueprint with explicit shutdown control."""

    margin = 32
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def compact_field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float = 18,
        *,
        multiline: bool = False,
    ) -> None:
        sheet.label(label, x, y + height + 5)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=9,
        )

    def check9(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=name,
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 8)
        sheet.c.drawString(x + 13, y, label)

    page_surface()

    # Page 1: operating scope, evidence dashboard and approval queue
    setup_y = 382
    setup_h = 101
    sheet.rect(margin, setup_y, usable_width, setup_h, fill=PAPER, stroke=INK)
    inner_x = margin + 14
    inner_w = usable_width - 28
    sheet.label("Monitored operating scope", inner_x, setup_y + setup_h - 16)

    top_widths = (200, 170, 100, 130, inner_w - 200 - 170 - 100 - 130 - 32)
    top_labels = (
        ("Business process", "ops_business_process"),
        ("Outcome", "ops_outcome"),
        ("Owner", "ops_owner"),
        ("Operating hours", "ops_operating_hours"),
        ("Trigger", "ops_trigger"),
    )
    field_x = inner_x
    for (label, name), width in zip(top_labels, top_widths):
        compact_field(label, name, field_x, 435, width, 19)
        field_x += width + 8

    lower_widths = (180, 180, 210, inner_w - 180 - 180 - 210 - 24)
    lower_labels = (
        ("Allowed inputs", "ops_allowed_inputs"),
        ("Source systems", "ops_source_systems"),
        ("1 job per workflow / system", "ops_one_job_per_system"),
        ("Maximum value / risk", "ops_maximum_value_risk"),
    )
    field_x = inner_x
    for (label, name), width in zip(lower_labels, lower_widths):
        compact_field(label, name, field_x, 400, width, 18)
        field_x += width + 8

    sheet.c.setFillColor(BLUE)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        inner_x,
        388,
        "24/7 means monitored routine work, never unsupervised autonomy. Fatiha owns decisions.",
    )

    dashboard_y = 221
    dashboard_h = 150
    sheet.rect(margin, dashboard_y, usable_width, dashboard_h, fill=PAPER, stroke=INK)
    dashboard_inner = margin + 14
    dashboard_width = usable_width - 28
    sheet.heading("Evidence-first operations dashboard", dashboard_inner, 348, size=17)

    row_gap = 6
    first_widths = (170, 100, 140, 140, dashboard_width - 574)
    first_fields = (
        ("Workflow name", "ops_dashboard_workflow_name"),
        ("Human owner", "ops_dashboard_owner"),
        ("Last run start", "ops_dashboard_last_start"),
        ("Last run finish", "ops_dashboard_last_finish"),
        ("Completed / Stopped / Failed / Unknown", "ops_dashboard_status"),
    )
    field_x = dashboard_inner
    for (label, name), width in zip(first_fields, first_widths):
        compact_field(label, name, field_x, 309, width, 18)
        field_x += width + row_gap

    second_widths = (61, 68, 62, 68, 68, 88, 90, 58, 139)
    second_fields = (
        ("Input count", "ops_dashboard_input_count"),
        ("Completed", "ops_dashboard_completed_count"),
        ("Failures", "ops_dashboard_failure_count"),
        ("Approvals", "ops_dashboard_pending_approvals"),
        ("Exceptions", "ops_dashboard_exceptions"),
        ("Oldest approval age", "ops_dashboard_oldest_approval_age"),
        ("Oldest exception age", "ops_dashboard_oldest_exception_age"),
        ("Retries used", "ops_dashboard_retries_used"),
        ("Cost / risk limit status", "ops_dashboard_cost_risk_limit_status"),
    )
    field_x = dashboard_inner
    for (label, name), width in zip(second_fields, second_widths):
        compact_field(label, name, field_x, 270, width, 18)
        field_x += width + row_gap

    third_widths = (140, 140, 140, 130, dashboard_width - 574)
    third_fields = (
        ("Output link", "ops_dashboard_output_link"),
        ("Source evidence link", "ops_dashboard_evidence_link"),
        ("Run-log link", "ops_dashboard_run_log_link"),
        ("Last confirmed alert test", "ops_dashboard_last_alert_test"),
        ("Next human review", "ops_dashboard_next_review"),
    )
    field_x = dashboard_inner
    for (label, name), width in zip(third_fields, third_widths):
        compact_field(label, name, field_x, 231, width, 18)
        field_x += width + row_gap

    approval_y = 42
    approval_h = 167
    sheet.rect(margin, approval_y, usable_width, approval_h, fill=PAPER, stroke=INK)
    approval_inner = margin + 14
    approval_width = usable_width - 28
    sheet.heading("Operating boundary and approval queue", approval_inner, 186, size=17)

    boundary_gap = 8
    boundary_width = (approval_width - (2 * boundary_gap)) / 3
    for index, (label, name) in enumerate(
        (
            ("Permitted actions", "ops_permitted_actions"),
            ("Prohibited actions", "ops_prohibited_actions"),
            ("Missing-data rule", "ops_missing_data_rule"),
        )
    ):
        compact_field(
            label,
            name,
            approval_inner + index * (boundary_width + boundary_gap),
            146,
            boundary_width,
            18,
        )

    approval_gap = 6
    approval_cell = (approval_width - (3 * approval_gap)) / 4
    approval_fields = (
        ("Proposed action", "ops_approval_proposed_action"),
        ("Source evidence", "ops_approval_source_evidence"),
        ("Expected effect", "ops_approval_expected_effect"),
        ("Risk", "ops_approval_risk"),
        ("Undo plan", "ops_approval_undo_plan"),
        ("Approver", "ops_approval_queue_approver"),
        ("Deadline", "ops_approval_deadline"),
        ("Current state", "ops_approval_current_state"),
    )
    for index, (label, name) in enumerate(approval_fields):
        col = index % 4
        row = index // 4
        compact_field(
            label,
            name,
            approval_inner + col * (approval_cell + approval_gap),
            103 - row * 41,
            approval_cell,
            18,
        )
    sheet.body(
        "Keep the workflow paused until the named approver approves or rejects the item.",
        approval_inner,
        48,
        size=8.2,
        color=SIGNAL,
    )

    sheet.footer()
    sheet.c.showPage()
    page_surface()

    # Page 2: exception resolution, failure routing and shutdown controls
    exception_y = 270
    exception_h = 213
    sheet.rect(margin, exception_y, usable_width, exception_h, fill=PAPER, stroke=INK)
    exception_inner = margin + 14
    exception_width = usable_width - 28
    sheet.heading("Exception queue", exception_inner, 458, size=17)
    sheet.body(
        "Keep every unresolved item visible with a safe state, owner, deadline and proof.",
        exception_inner,
        441,
        size=8.5,
    )

    first_exception_widths = (96, 112, 134, 80, 100, exception_width - 552)
    first_exception_fields = (
        ("Detected time", "ops_exception_detected_time"),
        ("Workflow / run", "ops_exception_workflow_run"),
        ("Source item", "ops_exception_source_item"),
        ("Type", "ops_exception_types"),
        ("Impact", "ops_exception_impact"),
        ("Safe state", "ops_exception_safe_state"),
    )
    field_x = exception_inner
    for (label, name), width in zip(first_exception_fields, first_exception_widths):
        compact_field(label, name, field_x, 399, width, 22)
        field_x += width + row_gap

    second_exception_widths = (190, 90, 100, 175, exception_width - 579)
    second_exception_fields = (
        ("Missing decision", "ops_exception_missing_decision"),
        ("Owner", "ops_exception_owner"),
        ("Deadline", "ops_exception_deadline"),
        ("Resolution", "ops_exception_resolution"),
        ("Proof", "ops_exception_proof"),
    )
    field_x = exception_inner
    for (label, name), width in zip(second_exception_fields, second_exception_widths):
        compact_field(label, name, field_x, 355, width, 22)
        field_x += width + row_gap

    compact_field(
        "Queue record / link",
        "ops_exception_queue",
        exception_inner,
        302,
        exception_width,
        30,
        multiline=True,
    )
    sheet.body(
        "Do not hide an unresolved exception inside a total count or restart it without a named decision.",
        exception_inner,
        284,
        size=8.2,
        color=SIGNAL,
    )

    failure_y = 178
    failure_h = 80
    sheet.rect(margin, failure_y, usable_width, failure_h, fill=PAPER, stroke=INK)
    failure_inner = margin + 14
    failure_width = usable_width - 28
    sheet.heading("Failure routing and manual continuity", failure_inner, 235, size=17)
    failure_gap = 6
    failure_widths = (180, 220, 80, failure_width - 498)
    failure_fields = (
        ("Human handoff", "ops_human_handoff"),
        ("Failure alert", "ops_failure_alert"),
        ("Retry limit", "ops_retry_limit"),
        ("Manual fallback", "ops_manual_fallback"),
    )
    field_x = failure_inner
    for (label, name), width in zip(failure_fields, failure_widths):
        compact_field(label, name, field_x, 194, width, 20)
        field_x += width + failure_gap

    shutdown_y = 42
    shutdown_h = 126
    sheet.rect(margin, shutdown_y, usable_width, shutdown_h, fill=PAPER, stroke=INK)
    review_inner = margin + 14
    review_width = usable_width - 28
    sheet.heading("Shutdown, recovery and review", review_inner, 146, size=17)
    shutdown_gap = 6
    shutdown_widths = (175, 160, 220, review_width - 573)
    shutdown_fields = (
        ("Shutdown / kill switch", "ops_shutdown_kill_switch"),
        ("Disable owner / route", "ops_disable_owner_route"),
        ("Recovery / restart checks", "ops_recovery_restart_checks"),
        ("Change log", "ops_change_log"),
    )
    field_x = review_inner
    for (label, name), width in zip(shutdown_fields, shutdown_widths):
        compact_field(label, name, field_x, 108, width, 18)
        field_x += width + shutdown_gap

    second_shutdown_widths = (125, 125, review_width - 262)
    second_shutdown_fields = (
        ("Daily review", "ops_daily_review"),
        ("Weekly review", "ops_weekly_review"),
        ("Completion evidence", "ops_completion_evidence"),
    )
    field_x = review_inner
    for (label, name), width in zip(second_shutdown_fields, second_shutdown_widths):
        compact_field(label, name, field_x, 74, width, 18)
        field_x += width + shutdown_gap

    check_col = review_width / 4
    pass_checks = (
        ("routine_only", "Routine job only"),
        ("approval_queue", "Approval queue works"),
        ("exception_alert", "Exception alert arrives"),
        ("restart", "Kill / restart tested"),
    )
    stop_checks = (
        ("no_owner_proof", "No owner or proof"),
        ("threshold", "Risk threshold exceeded"),
        ("reply_optout", "Reply / opt-out / complaint"),
        ("delivery_failure", "Delivery / workflow failure"),
    )
    for col, (suffix, label) in enumerate(pass_checks):
        check9(f"ops_pass_{suffix}", label, review_inner + col * check_col, 59)
    for col, (suffix, label) in enumerate(stop_checks):
        check9(f"ops_stop_{suffix}", label, review_inner + col * check_col, 44)

    sheet.footer()


def draw_business_operations_automation_map(sheet: DecisionSheet) -> None:
    """Draw the locked 3-page business-operations prioritisation worksheet.

    The field tree is deliberately exact: 108 unique AcroForm fields and 135
    widgets. Radio groups account for the widget count above the field count.
    All text fields declare the capacity locked in the source brief.
    """

    margin = 28
    usable_width = sheet.width - (2 * margin)
    content_bottom = 42
    content_top = sheet.height - 108

    def page_surface(page_number: int, *, evidence_rules: bool = False) -> None:
        if evidence_rules:
            sheet.c.setFillColor(BLUE)
            sheet.c.rect(0, sheet.height - 94, sheet.width, 94, fill=1, stroke=0)
            sheet.c.setFillColor(PALE_BLUE)
            sheet.c.setFont("Courier-Bold", 7.2)
            sheet.c.drawString(28, sheet.height - 17, "EVIDENCE RULES")
            sheet.c.setFont("Helvetica-Bold", 6.2)
            sheet.c.drawRightString(
                sheet.width - 28,
                sheet.height - 17,
                "THE AI AUTOMATION QUEEN · SHIFT & LEAD",
            )
            rules = (
                "1. A task with no owner cannot be first.",
                "2. A task with no evidence cannot be first.",
                "3. A task that is hard to reverse cannot be first unless its safe first version removes that action.",
                "4. Sensitive data without an approved rule for what data may be used moves to Prepare controls.",
                "5. Customer-facing or lasting actions move to Prepare controls unless the first test is preparation-only.",
                "6. Among the remaining tasks, put the task with the strongest proof, highest repetition, lowest failure cost and clearest recovery route first.",
            )
            rule_gap = 8
            rule_width = (sheet.width - 56 - (2 * rule_gap)) / 3
            for index, rule in enumerate(rules):
                col = index % 3
                row = index // 3
                x = 28 + col * (rule_width + rule_gap)
                y = sheet.height - 32 - row * 31
                sheet.wrapped_text(
                    rule,
                    x,
                    y,
                    rule_width,
                    font="Helvetica",
                    size=5.7,
                    leading=6.4,
                    color=PAPER,
                    max_lines=4,
                )
        else:
            sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 7.2)
        sheet.c.drawRightString(
            sheet.width - margin,
            sheet.height - 106,
            f"PAGE {page_number} OF 3",
        )

    def compact_label(text: str, x: float, y: float) -> None:
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 6.2)
        sheet.c.drawString(x, y, text.upper())

    def form_text(
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 7.2,
    ) -> None:
        sheet.text_field(
            f"business_ops_{name}",
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def form_checkbox(name: str, label: str, x: float, y: float) -> None:
        sheet.c.acroForm.checkbox(
            name=f"business_ops_{name}",
            tooltip=label,
            x=x,
            y=y - 1,
            size=9,
            buttonStyle="check",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 6.6)
        sheet.c.drawString(x + 13, y, label)

    def form_radio(
        name: str,
        value: str,
        label: str,
        x: float,
        y: float,
        *,
        font_size: float = 6.5,
    ) -> None:
        sheet.c.acroForm.radio(
            name=f"business_ops_{name}",
            value=value,
            selected=False,
            tooltip=label,
            x=x,
            y=y - 1,
            size=8,
            buttonStyle="circle",
            shape="circle",
            borderWidth=0.7,
            borderColor=INK,
            fillColor=PAPER,
            textColor=BLUE,
            forceBorder=True,
        )
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", font_size)
        sheet.c.drawString(x + 11, y, label)

    # Page 1: exactly 4 context fields and 5 candidate rows of 6 fields.
    page_surface(1)
    sheet.heading("Find 5 real candidates", margin, 468, size=17)
    sheet.body(
        "List real work before choosing a tool. Select exactly 3 tasks to compare on Page 2.",
        margin,
        451,
        size=8.2,
    )

    context_y = 390
    context_h = 52
    sheet.rect(margin, context_y, usable_width, context_h, fill=PAPER, stroke=INK)
    context_x = margin + 10
    context_gap = 7
    context_widths = (180, 150, 112, usable_width - 30 - 21 - 442)
    context_fields = (
        ("Business area", "business_area", 120, False),
        ("Decision owner", "decision_owner", 80, False),
        ("Review period", "review_period", 40, False),
        ("Result wanted this quarter", "result_wanted_this_quarter", 500, True),
    )
    field_x = context_x
    for (label, name, capacity, multiline), width in zip(
        context_fields, context_widths
    ):
        compact_label(label, field_x, 428)
        form_text(
            name,
            field_x,
            399,
            width,
            23,
            capacity,
            multiline=multiline,
            font_size=7.3,
        )
        field_x += width + context_gap

    table_x = margin
    table_y = 44
    table_h = 337
    sheet.rect(table_x, table_y, usable_width, table_h, fill=PAPER, stroke=INK)
    columns = (
        ("Task and useful result", 274),
        ("Repetition", 86),
        ("Time spent each month", 77),
        ("Current owner", 88),
        ("Proof source", 194),
        ("Take to comparison", usable_width - 719),
    )
    header_h = 24
    sheet.c.setFillColor(BLUE)
    sheet.c.rect(table_x, table_y + table_h - header_h, usable_width, header_h, fill=1, stroke=0)
    x = table_x
    for label, width in columns:
        sheet.wrapped_text(
            label.upper(),
            x + 6,
            table_y + table_h - 10,
            width - 10,
            font="Helvetica-Bold",
            size=5.8,
            leading=6.4,
            color=PAPER,
            max_lines=2,
        )
        x += width

    row_h = (table_h - header_h) / 5
    capacities = (500, 80, 40, 80, 300)
    suffixes = ("task_result", "repetition", "monthly_time", "current_owner", "proof_source")
    for index in range(5):
        row_top = table_y + table_h - header_h - index * row_h
        row_bottom = row_top - row_h
        if index:
            sheet.c.setStrokeColor(LINE)
            sheet.c.setLineWidth(0.6)
            sheet.c.line(table_x, row_top, table_x + usable_width, row_top)
        x = table_x
        for field_index, ((_, width), capacity, suffix) in enumerate(
            zip(columns[:5], capacities, suffixes)
        ):
            field_height = 42 if field_index in (0, 4) else 22
            field_y = row_bottom + (row_h - field_height) / 2
            form_text(
                f"candidate_{index + 1}_{suffix}",
                x + 5,
                field_y,
                width - 10,
                field_height,
                capacity,
                multiline=field_index == 0,
                font_size=7,
            )
            x += width
        form_checkbox(
            f"candidate_{index + 1}_take_to_comparison",
            f"Task {index + 1}",
            x + 7,
            row_bottom + (row_h / 2) - 2,
        )
    sheet.footer()
    sheet.c.showPage()

    # Page 2: 3 finalists x 10 fields. The 7 bands are printed comparison
    # references; decisions are the only multi-widget fields on this page.
    page_surface(2, evidence_rules=True)
    sheet.heading("Compare the 3 finalists", margin, 468, size=17)
    sheet.body(
        "Use the same evidence for every task. Do not add scores or arithmetic.",
        margin,
        451,
        size=8.2,
    )

    bands_y = 391
    bands_h = 51
    sheet.rect(margin, bands_y, usable_width, bands_h, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    bands = (
        ("Repetition", "Many times daily / Daily / Weekly / Monthly or less"),
        ("Risk", "Read or prepare only / Reversible internal change / Customer-facing or lasting action"),
        ("Data", "Public / Internal / Customer / Sensitive or regulated"),
        ("Owner", "Owner and backup / Owner only / No owner"),
        ("Failure cost", "Small rework / Missed work or delay / Customer or money impact / Hard to recover"),
        ("Reversibility", "Undo in the same day / Restore manually / Hard or impossible to reverse"),
        ("Proof", "Current record or example / Estimate only / No evidence"),
    )
    band_gap = 5
    band_width = (usable_width - (3 * band_gap) - 16) / 4
    for index, (label, choices) in enumerate(bands):
        col = index % 4
        row = index // 4
        x = margin + 8 + col * (band_width + band_gap)
        y = bands_y + bands_h - 15 - row * 21
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 5.8)
        sheet.c.drawString(x, y, f"{label.upper()}:")
        sheet.wrapped_text(
            choices,
            x,
            y - 8,
            band_width - 2,
            size=5.4,
            leading=6.2,
            color=INK,
            max_lines=2,
        )

    finalist_gap = 8
    finalist_width = (usable_width - (2 * finalist_gap)) / 3
    finalist_bottom = 42
    finalist_top = 382

    def finalist_field(
        finalist: int,
        label: str,
        suffix: str,
        capacity: int,
        x: float,
        label_y: float,
        field_y: float,
        height: float,
        *,
        multiline: bool = False,
    ) -> None:
        compact_label(label, x, label_y)
        form_text(
            f"finalist_{finalist}_{suffix}",
            x,
            field_y,
            finalist_width - 20,
            height,
            capacity,
            multiline=multiline,
            font_size=6.8,
        )

    for finalist in range(1, 4):
        card_x = margin + (finalist - 1) * (finalist_width + finalist_gap)
        sheet.rect(
            card_x,
            finalist_bottom,
            finalist_width,
            finalist_top - finalist_bottom,
            fill=PAPER,
            stroke=INK,
        )
        inner_x = card_x + 10
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Times-Bold", 14)
        sheet.c.drawString(inner_x, 365, f"Finalist {finalist}")
        finalist_field(finalist, "Task", "task", 160, inner_x, 350, 328, 17)
        finalist_field(finalist, "Repetition", "repetition", 80, inner_x, 321, 301, 15)
        finalist_field(finalist, "Risk or highest action", "risk_highest_action", 160, inner_x, 294, 274, 15)
        finalist_field(finalist, "Data used", "data_used", 160, inner_x, 267, 247, 15)
        finalist_field(finalist, "Owner and backup", "owner_and_backup", 120, inner_x, 240, 220, 15)
        finalist_field(finalist, "Failure cost", "failure_cost", 240, inner_x, 213, 189, 19)
        finalist_field(finalist, "Reversibility or recovery route", "recovery_route", 300, inner_x, 182, 158, 19)
        finalist_field(finalist, "Proof used for the comparison", "proof", 300, inner_x, 151, 127, 19)
        finalist_field(finalist, "Evidence-based ranking reason", "ranking_reason", 500, inner_x, 120, 86, 29, multiline=True)
        compact_label("Decision / choose 1", inner_x, 77)
        decision_options = (
            ("StartFirst", "Start first"),
            ("PrepareControls", "Prepare controls"),
            ("KeepManual", "Keep manual"),
            ("RemoveOrMerge", "Remove or merge"),
        )
        for option_index, (value, label) in enumerate(decision_options):
            col = option_index % 2
            row = option_index // 2
            form_radio(
                f"finalist_{finalist}_decision",
                value,
                label,
                inner_x + col * 114,
                61 - row * 15,
                font_size=6.1,
            )
    sheet.footer()
    sheet.c.showPage()

    # Page 3: 3 ordered positions, 8 readiness checks, 1 final decision and
    # the 48-hour action. Radio export values match the locked contract.
    page_surface(3)
    sheet.heading("Put the work in order", margin, 468, size=17)
    sheet.body(
        "Order the 3 tasks. Keep the evidence-based decision attached to each one.",
        margin,
        451,
        size=8.2,
    )

    position_gap = 8
    position_width = (usable_width - (2 * position_gap)) / 3
    position_bottom = 143
    position_top = 442
    position_titles = ("Build first", "Prepare next", "Prepare after that")

    def position_field(
        position: int,
        label: str,
        suffix: str,
        capacity: int,
        x: float,
        label_y: float,
        field_y: float,
        width: float,
        height: float,
        *,
        multiline: bool = False,
    ) -> None:
        compact_label(label, x, label_y)
        form_text(
            f"position_{position}_{suffix}",
            x,
            field_y,
            width,
            height,
            capacity,
            multiline=multiline,
            font_size=6.6,
        )

    for position, title in enumerate(position_titles, start=1):
        card_x = margin + (position - 1) * (position_width + position_gap)
        sheet.rect(
            card_x,
            position_bottom,
            position_width,
            position_top - position_bottom,
            fill=PAPER,
            stroke=INK,
        )
        inner_x = card_x + 9
        inner_width = position_width - 18
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Times-Bold", 14)
        sheet.c.drawString(inner_x, 426, f"{position}. {title}")
        order_width = 38
        position_field(position, "Order", "implementation_order", 2, inner_x, 413, 393, order_width, 15)
        position_field(
            position,
            "Task",
            "task",
            160,
            inner_x + order_width + 7,
            413,
            393,
            inner_width - order_width - 7,
            15,
        )
        position_field(position, "Owner", "owner", 80, inner_x, 386, 368, inner_width, 14)
        position_field(position, "Why this position", "why_position", 300, inner_x, 361, 339, inner_width, 17)
        position_field(position, "First safe version", "first_safe_version", 500, inner_x, 332, 305, inner_width, 22, multiline=True)
        position_field(position, "Proof to collect during the test", "test_proof", 300, inner_x, 298, 276, inner_width, 17)
        position_field(position, "How to undo or restore the current state", "undo_restore", 300, inner_x, 269, 247, inner_width, 17)
        position_field(position, "Control still needed", "control_needed", 300, inner_x, 240, 218, inner_width, 17)
        date_width = (inner_width - 7) / 2
        position_field(position, "Start date", "start_date", 40, inner_x, 211, 193, date_width, 14)
        position_field(position, "Review date", "review_date", 40, inner_x + date_width + 7, 211, 193, date_width, 14)
        compact_label("Next worksheet / choose 1", inner_x, 185)
        worksheet_options = (
            ("ToolStack", "Simplify the tool stack"),
            ("LeadFollowUp", "Build lead follow-up"),
            ("InboxBrief", "Build a daily inbox brief"),
            ("BoundedAIJob", "Set limits for 1 AI job"),
            ("MonitoredOperations", "Monitor proven workflows"),
            ("KeepManual", "Keep this task manual"),
        )
        for option_index, (value, label) in enumerate(worksheet_options):
            col = option_index % 2
            row = option_index // 2
            form_radio(
                f"position_{position}_next_worksheet",
                value,
                label,
                inner_x + col * 120,
                176 - row * 14,
                font_size=5.35,
            )

    final_y = content_bottom
    final_h = 92
    sheet.rect(margin, final_y, usable_width, final_h, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    readiness_x = margin + 10
    readiness_width = 440
    compact_label("Final readiness / every check must pass", readiness_x, 120)
    readiness = (
        ("process_observed", "The current process has been observed or documented."),
        ("real_proof", "The ranking uses real proof."),
        ("owner_reviewer", "The owner and reviewer are named."),
        ("data_approved", "The data source and rule for what it may use are approved."),
        ("safe_first_version", "The first version prepares only or uses reversible test data."),
        ("result_defined", "The expected result and proof are defined."),
        ("recovery_tested", "The recovery route has been tested manually."),
        ("worksheet_selected", "The correct next worksheet is selected."),
    )
    readiness_col_width = readiness_width / 2
    for index, (suffix, label) in enumerate(readiness):
        col = index % 2
        row = index // 2
        form_checkbox(
            f"readiness_{suffix}",
            label,
            readiness_x + col * readiness_col_width,
            104 - row * 14,
        )

    action_x = margin + 465
    action_width = usable_width - 475
    compact_label("Final decision / choose 1", action_x, 120)
    final_decisions = (
        ("StartSafeTest", "Start safe test"),
        ("CollectProof", "Collect proof"),
        ("PrepareControl", "Prepare control"),
        ("KeepManual", "Keep manual"),
    )
    for index, (value, label) in enumerate(final_decisions):
        form_radio(
            "final_decision",
            value,
            label,
            action_x + index * 79,
            104,
            font_size=5.9,
        )
    next_action_width = action_width - 106
    compact_label("Next action within 48 hours", action_x, 86)
    compact_label("Person and deadline", action_x + next_action_width + 7, 86)
    form_text(
        "next_action_48_hours",
        action_x,
        51,
        next_action_width,
        29,
        300,
        multiline=True,
        font_size=6.8,
    )
    form_text(
        "person_and_deadline",
        action_x + next_action_width + 7,
        51,
        99,
        29,
        120,
        font_size=6.8,
    )
    sheet.footer()


def draw_ai_answer_source_checking_worksheet(sheet: DecisionSheet) -> None:
    """Draw the locked 4-page, 10-claim source-checking worksheet."""

    margin = 32
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 8,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def choice(
        label: str,
        name: str,
        options: tuple[str, ...],
        x: float,
        y: float,
        width: float,
        height: float = 22,
        *,
        font_size: float = 7.3,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        rendered_options = (" ",) + options
        sheet.c.acroForm.choice(
            name=name,
            tooltip=label,
            x=x,
            y=y,
            width=width,
            height=height,
            options=list(rendered_options),
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags="combo",
        )

    status_options = (
        "Supported",
        "Needs context",
        "Not supported",
        "Cannot check",
    )
    action_options = (
        "Keep",
        "Rewrite",
        "Remove",
        "Ask a qualified reviewer",
    )
    final_decision_options = (
        "Use after review",
        "Revise and recheck",
        "Do not use",
        "Ask a qualified reviewer",
    )

    # Page 1: the untouched answer and the checking plan
    page_surface()
    sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8.7)
    sheet.c.drawString(
        margin + 12,
        468,
        "Save the untouched answer. Keep any action blocked until the source check and human review are complete.",
    )
    sheet.c.setFont("Helvetica", 7.5)
    sheet.c.drawString(
        margin + 12,
        455,
        "A 2nd AI answer can suggest what to check. It does not count as an original source or final approval.",
    )

    # Text fields first, in the intended keyboard sequence.
    field("Task or question", "answer_task_question", 32, 396, 238, 22, 240)
    field("How the answer may be used", "answer_intended_use", 280, 396, 244, 22, 300)
    field("Where the untouched answer is saved", "answer_saved_location", 32, 350, 330, 22, 240)
    field("Date of the information", "answer_information_date", 372, 350, 152, 22, 30)
    field(
        "Paste the untouched answer or the important excerpt",
        "answer_excerpt",
        32,
        236,
        492,
        84,
        1800,
        multiline=True,
        font_size=7.5,
    )
    field(
        "Original sources to open",
        "answer_original_sources",
        32,
        155,
        492,
        54,
        600,
        multiline=True,
        font_size=7.5,
    )
    field(
        "Which source matters most, and why?",
        "answer_source_priority",
        32,
        83,
        492,
        45,
        300,
        multiline=True,
        font_size=7.5,
    )
    field("Human reviewer", "answer_reviewer", 536, 296, 130, 22, 120)
    field(
        "What stays blocked until review?",
        "answer_blocked_action",
        676,
        286,
        134,
        32,
        300,
        multiline=True,
        font_size=7.2,
    )
    choice(
        "If this is wrong, the impact is",
        "answer_stakes",
        ("Low stakes", "Medium stakes", "High stakes"),
        536,
        329,
        130,
    )

    # Static Shift & Lead example.
    sheet.rect(536, 361, 274, 74, fill=PAPER, stroke=LINE)
    sheet.label("Shift & Lead example", 548, 420)
    sheet.wrapped_text(
        "AI recap: the client approved the guide-delivery automation and launch date.",
        548,
        405,
        250,
        size=7.2,
        leading=9,
        color=INK,
        max_lines=2,
    )
    sheet.wrapped_text(
        "Transcript and proposal: interest is clear; budget, access and timing are still open. Mark approval Not supported, then rewrite it as pending.",
        548,
        383,
        250,
        size=6.9,
        leading=8.5,
        max_lines=3,
    )

    sheet.rect(536, 160, 274, 108, fill=PAPER, stroke=LINE)
    sheet.label("Mark the claim types that need checking", 548, 252)
    sheet.checkbox("answer_check_names_titles", "Names and titles", 548, 231)
    sheet.checkbox("answer_check_dates_status", "Dates and current status", 676, 231)
    sheet.checkbox("answer_check_numbers_stats", "Numbers and statistics", 548, 207)
    sheet.checkbox("answer_check_quotes_links", "Quotes and links", 676, 207)
    sheet.checkbox("answer_check_calculations", "Calculations", 548, 183)
    sheet.checkbox("answer_check_advice_assumptions", "Advice and assumptions", 676, 183)

    sheet.rect(536, 42, 274, 104, fill=PAPER, stroke=LINE)
    sheet.label("Permission and reuse before checking", 548, 130)
    sheet.checkbox("answer_privacy_approved", "Private information is approved", 548, 112)
    sheet.checkbox(
        "answer_source_permission_checked",
        "Permission to use sources checked",
        548,
        90,
    )
    sheet.checkbox(
        "answer_attribution_requirement_recorded",
        "Credit requirement recorded",
        548,
        68,
    )
    sheet.checkbox("answer_reuse_limits_recorded", "Reuse limits recorded", 548, 46)
    sheet.footer()
    sheet.c.showPage()

    def claims_page(first_claim: int, title: str, instruction: str) -> None:
        page_surface()
        sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica-Bold", 9)
        sheet.c.drawString(margin + 12, 468, title)
        sheet.c.setFont("Helvetica", 7.5)
        sheet.c.drawString(margin + 12, 455, instruction)

        row_bottoms = (350, 276, 202, 128, 54)
        for offset, row_y in enumerate(row_bottoms):
            claim_number = first_claim + offset
            prefix = f"claim_{claim_number:02d}"
            fill_colour = PAPER if offset % 2 == 0 else HexColor("#f6f2ec")
            sheet.rect(margin, row_y, usable_width, 70, fill=fill_colour, stroke=LINE)

            # Drawing order is the semantic tab order for each claim row.
            field(
                f"Claim {claim_number:02d}",
                f"{prefix}_text",
                32,
                row_y + 35,
                292,
                20,
                280,
                font_size=7.3,
            )
            field(
                "Original source",
                f"{prefix}_source",
                330,
                row_y + 35,
                286,
                20,
                220,
                font_size=7.3,
            )
            field(
                "Exact page, section or timestamp",
                f"{prefix}_location",
                622,
                row_y + 35,
                188,
                20,
                120,
                font_size=7.1,
            )
            field(
                "What the source actually says",
                f"{prefix}_source_says",
                32,
                row_y + 6,
                300,
                20,
                280,
                font_size=7.3,
            )
            choice(
                "Status",
                f"{prefix}_status",
                status_options,
                338,
                row_y + 6,
                116,
                20,
                font_size=6.5,
            )
            choice(
                "Action",
                f"{prefix}_action",
                action_options,
                460,
                row_y + 6,
                156,
                20,
                font_size=6.5,
            )
            field(
                "Correction or note",
                f"{prefix}_correction",
                622,
                row_y + 6,
                188,
                20,
                280,
                font_size=7.3,
            )
        sheet.footer()

    # Pages 2 and 3: exactly 10 claim rows.
    claims_page(
        1,
        "Claims 1 to 5",
        "Open the original source. Record the exact location, then choose a status and an action.",
    )
    sheet.c.showPage()
    claims_page(
        6,
        "Claims 6 to 10",
        "Check facts that would change a decision first. Do not treat another AI answer as proof.",
    )
    sheet.c.showPage()

    # Page 4: decision, changes and final human approval.
    page_surface()
    sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 9)
    sheet.c.drawString(
        margin + 12,
        468,
        "Make the correction visible. Keep the checked copy separate from the untouched AI answer.",
    )
    sheet.c.setFont("Helvetica", 7.5)
    sheet.c.drawString(
        margin + 12,
        455,
        "A 2nd AI answer can suggest what to check. It does not count as an original source or final approval.",
    )

    field("Claims checked", "summary_checked_count", 32, 397, 142, 22, 2)
    field("Supported", "summary_supported_count", 185, 397, 142, 22, 2)
    field("Needs context", "summary_needs_context_count", 338, 397, 142, 22, 2)
    field("Not supported", "summary_not_supported_count", 491, 397, 142, 22, 2)
    field("Cannot check", "summary_cannot_check_count", 644, 397, 166, 22, 2)

    field(
        "Changes made",
        "summary_changes_made",
        32,
        302,
        250,
        58,
        1000,
        multiline=True,
        font_size=7.4,
    )
    field(
        "Claims removed",
        "summary_removed_claims",
        292,
        302,
        250,
        58,
        600,
        multiline=True,
        font_size=7.4,
    )
    field(
        "Questions still open",
        "summary_open_questions",
        552,
        302,
        258,
        58,
        600,
        multiline=True,
        font_size=7.4,
    )

    field(
        "Missing information",
        "summary_missing_information",
        32,
        211,
        190,
        56,
        600,
        multiline=True,
        font_size=7.2,
    )
    field(
        "Main assumptions",
        "summary_main_assumptions",
        228,
        211,
        190,
        56,
        600,
        multiline=True,
        font_size=7.2,
    )
    field(
        "What would prove the claim wrong?",
        "summary_strongest_counter_case",
        424,
        211,
        190,
        56,
        600,
        multiline=True,
        font_size=7.2,
    )
    field(
        "Source conflicts",
        "summary_source_conflicts",
        620,
        211,
        190,
        56,
        600,
        multiline=True,
        font_size=7.2,
    )

    field("Checked copy location", "summary_final_location", 32, 157, 260, 22, 240)
    field("Person who approves it", "summary_approval_owner", 302, 157, 140, 22, 120)
    field("Approval date", "summary_approval_date", 452, 157, 116, 22, 10)
    choice(
        "Final decision",
        "summary_final_decision",
        final_decision_options,
        578,
        157,
        232,
        22,
        font_size=6.8,
    )

    sheet.label("Final review before use", 32, 137)
    final_checks = (
        ("summary_sources_opened", "Original sources opened"),
        ("summary_locations_recorded", "Exact locations recorded"),
        ("summary_links_tested", "Links tested"),
        ("summary_calculations_redone", "Calculations redone"),
        ("summary_original_information_used", "Original information used"),
        ("summary_human_review_completed", "Human review completed"),
        ("summary_privacy_checked", "Privacy checked"),
        ("summary_attribution_checked", "Credit requirements checked"),
        ("summary_quotation_checked", "Quotation permission checked"),
        ("summary_reuse_permission_checked", "Reuse permission checked"),
    )
    for index, (name, label) in enumerate(final_checks):
        column = index // 5
        row = index % 5
        sheet.checkbox(name, label, 32 + column * 398, 116 - row * 18)

    sheet.footer()


def draw_clear_writing_revision_worksheet(sheet: DecisionSheet) -> None:
    """Draw the locked 3-page, 55-widget clear writing worksheet."""

    margin = 32
    usable_width = sheet.width - (2 * margin)

    def page_surface() -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)

    def field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 8,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def choice(
        label: str,
        name: str,
        options: tuple[str, ...],
        x: float,
        y: float,
        width: float,
        height: float = 22,
        *,
        font_size: float = 7.2,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.c.acroForm.choice(
            name=name,
            tooltip=label,
            x=x,
            y=y,
            width=width,
            height=height,
            options=[" ", *options],
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags="combo",
        )

    content_types = (
        "Email",
        "Client reply",
        "Brief",
        "Guide or article",
        "Social post",
        "Internal note",
        "Other",
    )
    edit_decisions = ("Keep", "Cut", "Rewrite", "Move")
    final_decisions = (
        "Ready after review",
        "Revise again",
        "Check facts before use",
        "Ask a qualified reviewer",
    )

    # Page 1: 8 text fields, 1 blank choice and 3 checkboxes.
    page_surface()
    sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8.7)
    sheet.c.drawString(
        margin + 12,
        468,
        "Name the reader before you shorten the answer. Keep the untouched version in a separate file.",
    )
    sheet.c.setFont("Helvetica", 7.5)
    sheet.c.drawString(
        margin + 12,
        455,
        "Remove personal, private or confidential details that are not approved for this worksheet or the AI tool.",
    )

    choice("Writing type", "reader_content_type", content_types, 32, 395, 176)
    field("Where it will appear", "reader_use_location", 218, 395, 252, 22, 180)
    field("Reader", "reader_person", 480, 395, 180, 22, 140)
    field("Length limit, if needed", "reader_length_limit", 670, 395, 140, 22, 60)

    field(
        "What should the reader decide or do?",
        "reader_action",
        32,
        338,
        378,
        28,
        320,
        multiline=True,
        font_size=7.6,
    )
    field(
        "Main point in 1 sentence",
        "reader_main_point",
        420,
        338,
        390,
        28,
        320,
        multiline=True,
        font_size=7.6,
    )
    field(
        "Details that must stay",
        "reader_must_keep",
        32,
        244,
        378,
        62,
        700,
        multiline=True,
        font_size=7.4,
    )
    field(
        "Terms, labels or acronyms to explain",
        "reader_terms_to_explain",
        420,
        244,
        390,
        62,
        500,
        multiline=True,
        font_size=7.4,
    )
    field(
        "Paste the untouched AI answer or the section you need to revise",
        "reader_original_answer",
        32,
        79,
        778,
        126,
        2400,
        multiline=True,
        font_size=7.5,
    )

    sheet.checkbox("reader_keep_names_numbers", "Keep required names and numbers", 32, 52)
    sheet.checkbox("reader_keep_limits_caveats", "Keep limits and conditions", 304, 52)
    sheet.checkbox("reader_keep_source_credit", "Keep required source credit", 558, 52)
    sheet.footer()



    # Page 2: 18 text fields and 8 blank choices.
    page_surface()
    sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8.4)
    sheet.c.drawString(
        margin + 12,
        468,
        "Shift & Lead example: move Not yet to the top, keep the 4 delivery checks and cut generic lead-magnet advice.",
    )
    sheet.c.setFont("Helvetica", 7.4)
    sheet.c.drawString(
        margin + 12,
        455,
        "For each passage, choose 1 action. If you need more than 8 rows, start another worksheet.",
    )

    field(
        "Revised opening line",
        "edit_opening_line",
        32,
        395,
        382,
        22,
        320,
        font_size=7.4,
    )
    field(
        "Final next action",
        "edit_next_step",
        424,
        395,
        386,
        22,
        320,
        font_size=7.4,
    )

    sheet.label("Original passage", 44, 374)
    sheet.label("Decision", 360, 374)
    sheet.label("Reason for the change", 494, 374)
    row_bottoms = (334, 294, 254, 214, 174, 134, 94, 54)
    for index, row_y in enumerate(row_bottoms, start=1):
        fill_colour = PAPER if index % 2 else HexColor("#f6f2ec")
        sheet.rect(32, row_y, 778, 35, fill=fill_colour, stroke=LINE)
        prefix = f"edit_{index:02d}"
        sheet.text_field(
            f"{prefix}_excerpt",
            42,
            row_y + 5,
            306,
            25,
            multiline=True,
            font_size=6.8,
            max_len=420,
        )
        sheet.c.acroForm.choice(
            name=f"{prefix}_decision",
            tooltip=f"Edit row {index:02d} decision",
            x=358,
            y=row_y + 5,
            width=124,
            height=25,
            options=[" ", *edit_decisions],
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=7,
            fieldFlags="combo",
        )
        sheet.text_field(
            f"{prefix}_reason",
            492,
            row_y + 5,
            308,
            25,
            multiline=True,
            font_size=6.8,
            max_len=360,
        )
    sheet.footer()
    sheet.c.showPage()

    # Page 3: 8 text fields, 1 blank choice and 8 checkboxes.
    page_surface()
    sheet.rect(margin, 447, usable_width, 36, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8.6)
    sheet.c.drawString(
        margin + 12,
        468,
        "Clear writing does not prove that a claim is true. Check important claims against original information.",
    )
    sheet.c.setFont("Helvetica", 7.4)
    sheet.c.drawString(
        margin + 12,
        455,
        "The final decision belongs to the person responsible for the customer, public message or lasting record.",
    )

    field(
        "Final rewrite",
        "final_rewrite",
        32,
        305,
        778,
        102,
        2400,
        multiline=True,
        font_size=7.5,
    )
    field(
        "Removed or combined",
        "removed_or_combined",
        32,
        238,
        250,
        38,
        500,
        multiline=True,
        font_size=7.1,
    )
    field(
        "Detail saved for later",
        "detail_saved_for_later",
        292,
        238,
        250,
        38,
        500,
        multiline=True,
        font_size=7.1,
    )
    field(
        "Items to check elsewhere",
        "items_to_check_elsewhere",
        552,
        238,
        258,
        38,
        500,
        multiline=True,
        font_size=7.1,
    )
    field("Original word count", "original_word_count", 32, 187, 120, 22, 8)
    field("Final word count", "final_word_count", 162, 187, 120, 22, 8)
    field("Final owner", "final_owner", 292, 187, 200, 22, 140)
    field("Approval date", "approval_date", 502, 187, 116, 22, 20)
    choice(
        "Final decision",
        "final_ready_decision",
        final_decisions,
        628,
        187,
        182,
        22,
        font_size=6.5,
    )

    sheet.label("Final human review", 32, 160)
    final_checks = (
        ("first_sentence_answers_job", "The opening answers the job"),
        ("each_paragraph_one_job", "Each paragraph has 1 job"),
        ("repetition_removed", "Repetition is removed"),
        ("common_words_used", "Common words are used"),
        ("labels_and_acronyms_explained", "Labels and acronyms are explained"),
        ("names_numbers_and_limits_unchanged", "Names, numbers and limits are unchanged"),
        ("next_step_clear", "The next step is clear"),
        ("human_review_completed", "Human review is complete"),
    )
    for index, (name, label) in enumerate(final_checks):
        column = index // 4
        row = index % 4
        sheet.checkbox(name, label, 32 + column * 394, 136 - row * 23)

    sheet.footer()


def draw_ai_creative_review_workbook(sheet: DecisionSheet) -> None:
    """Draw the locked 3-page, 111-widget creative review workbook."""

    sheet.c.setAuthor("The AI Automation Queen · Shift & Lead")
    sheet.c.setViewerPreference("DisplayDocTitle", "true")
    margin = 32
    usable_width = sheet.width - (2 * margin)

    def page_surface(page_label: str) -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 7.2)
        sheet.c.drawRightString(sheet.width - 32, sheet.height - 105, page_label)

    def field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 7.4,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def choice(
        label: str,
        name: str,
        options: tuple[str, ...],
        x: float,
        y: float,
        width: float,
        height: float = 20,
        *,
        font_size: float = 6.7,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.c.acroForm.choice(
            name=name,
            tooltip=name.replace("_", " ").title(),
            x=x,
            y=y,
            width=width,
            height=height,
            options=[" ", *options],
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags="combo",
        )

    # Page 1: 31 text fields.
    page_surface("1 / DEFINE WHAT GOOD MEANS")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8.1)
    sheet.c.drawString(
        margin + 12,
        476,
        "Set the job and 5 observable standards before you compare the options.",
    )
    sheet.c.setFont("Helvetica", 7.2)
    sheet.c.drawString(
        margin + 12,
        464,
        "Keep untouched versions. Use references for qualities you may learn from, not material to copy.",
    )

    sheet.rect(margin, 374, usable_width, 73, fill=PAPER, stroke=INK)
    field("Work title", "p1_work_title", 44, 405, 244, 18, 140)
    field("File or link", "p1_work_file_link", 298, 405, 234, 18, 400)
    field(
        "Untouched versions saved at",
        "p1_untouched_versions_location",
        542,
        405,
        256,
        18,
        400,
    )
    field("Reader", "p1_reader", 44, 379, 180, 18, 160)
    field("Channel", "p1_channel", 234, 379, 120, 18, 100)
    field("Intended result", "p1_intended_result", 364, 379, 240, 18, 500)
    field("Decision supported", "p1_decision_supported", 614, 379, 184, 18, 500)

    standards_x = margin
    standards_y = 185
    standards_w = 500
    standards_h = 177
    sheet.rect(standards_x, standards_y, standards_w, standards_h, fill=PAPER, stroke=INK)
    sheet.label("Exactly 5 things the work must do", standards_x + 12, standards_y + standards_h - 18)
    standard_rows = (306, 278, 250, 222, 194)
    for index, row_y in enumerate(standard_rows, start=1):
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawString(standards_x + 12, row_y + 7, str(index))
        sheet.text_field(
            f"p1_standard_{index}_test",
            standards_x + 26,
            row_y,
            286,
            20,
            multiline=True,
            font_size=6.9,
            max_len=400,
        )
        sheet.text_field(
            f"p1_standard_{index}_why",
            standards_x + 322,
            row_y,
            166,
            20,
            multiline=True,
            font_size=6.9,
            max_len=400,
        )
    sheet.label("What you can see or test", standards_x + 26, 333)
    sheet.label("Why it matters", standards_x + 322, 333)

    rules_x = 544
    rules_y = 185
    rules_w = 266
    rules_h = 177
    sheet.rect(rules_x, rules_y, rules_w, rules_h, fill=PAPER, stroke=INK)
    sheet.label("Rules the score cannot override", rules_x + 12, rules_y + rules_h - 18)
    hard_rules = (
        ("Required facts", "p1_required_facts", 306),
        ("Brand rules", "p1_brand_rules", 278),
        ("Privacy limits", "p1_privacy_limits", 250),
        ("Permission to use sources", "p1_source_rights", 222),
        ("Approval owner", "p1_approval_owner", 194),
    )
    for label_text, name, row_y in hard_rules:
        if name == "p1_source_rights":
            sheet.c.setFillColor(BLUE)
            sheet.c.setFont("Courier-Bold", 5.7)
            sheet.c.drawString(rules_x + 12, row_y + 7, label_text.upper())
        else:
            sheet.label(label_text, rules_x + 12, row_y + 7)
        sheet.text_field(
            name,
            rules_x + 98,
            row_y,
            rules_w - 110,
            20,
            multiline=True,
            font_size=6.8,
            max_len=500,
        )

    references_y = 47
    references_h = 125
    sheet.rect(margin, references_y, usable_width, references_h, fill=PAPER, stroke=INK)
    sheet.label("Up to 3 approved references", margin + 12, references_y + references_h - 18)
    ref_gap = 10
    ref_width = (usable_width - 24 - (2 * ref_gap)) / 3
    for index in range(1, 4):
        x = margin + 12 + (index - 1) * (ref_width + ref_gap)
        field(
            f"Reference {index}: source, link and right to use",
            f"p1_reference_{index}_source_and_right",
            x,
            116,
            ref_width,
            18,
            500,
            font_size=6.7,
        )
        field(
            "Quality to learn",
            f"p1_reference_{index}_quality_to_learn",
            x,
            82,
            ref_width,
            18,
            500,
            multiline=True,
            font_size=6.7,
        )
        field(
            "Material that must not be copied",
            f"p1_reference_{index}_do_not_copy",
            x,
            48,
            ref_width,
            18,
            500,
            multiline=True,
            font_size=6.7,
        )
    sheet.footer()
    sheet.c.showPage()

    # Page 2: 20 text fields, 16 blank choices and 5 checkboxes.
    page_surface("2 / COMPARE EXACTLY 3 OPTIONS")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8)
    sheet.c.drawString(
        margin + 12,
        476,
        "Compare the same 3 options against the same standards. Record what each option gains and gives up.",
    )
    sheet.c.setFont("Helvetica", 7.1)
    sheet.c.drawString(
        margin + 12,
        464,
        "A score helps compare options. It does not override facts, rights, privacy, brand rules or human approval.",
    )

    option_gap = 14
    option_width = (usable_width - (2 * option_gap)) / 3
    option_xs = [margin + index * (option_width + option_gap) for index in range(3)]
    for index, (option_key, x) in enumerate(zip(("a", "b", "c"), option_xs), start=1):
        sheet.rect(x, 304, option_width, 143, fill=PAPER, stroke=INK)
        sheet.label(f"Option {chr(64 + index)}", x + 10, 431)
        option_fields = (
            ("Name and file or link", "name_and_link", 402, 420),
            ("Short description", "description", 378, 600),
            ("What it gets right", "gets_right", 354, 600),
            ("Where it fails", "fails", 330, 600),
            ("What it gains and gives up", "tradeoff", 306, 600),
        )
        for label_text, suffix, row_y, max_len in option_fields:
            sheet.label(label_text, x + 10, row_y + 18)
            sheet.text_field(
                f"p2_option_{option_key}_{suffix}",
                x + 10,
                row_y,
                option_width - 20,
                16,
                multiline=suffix != "name_and_link",
                font_size=6.5,
                max_len=max_len,
            )

    matrix_x = margin
    matrix_y = 122
    matrix_w = 500
    matrix_h = 170
    sheet.rect(matrix_x, matrix_y, matrix_w, matrix_h, fill=PAPER, stroke=INK)
    sheet.label("Score each option against the 5 standards", matrix_x + 12, matrix_y + matrix_h - 18)
    sheet.body("0 misses / 1 partly / 2 passes", matrix_x + 280, matrix_y + matrix_h - 18, size=7)
    sheet.label("Standard", matrix_x + 12, 255)
    score_columns = {"a": 226, "b": 314, "c": 402}
    for option_key, x in score_columns.items():
        sheet.label(f"Option {option_key.upper()}", matrix_x + x, 255)
    score_options = ("0 - Misses", "1 - Partly", "2 - Passes")
    score_rows = (228, 207, 186, 165, 144)
    for standard_index, row_y in enumerate(score_rows, start=1):
        sheet.c.setFillColor(INK)
        sheet.c.setFont("Helvetica", 7.2)
        sheet.c.drawString(matrix_x + 12, row_y + 6, f"Standard {standard_index}")
        for option_key, offset in score_columns.items():
            sheet.c.acroForm.choice(
                name=f"p2_standard_{standard_index}_option_{option_key}_score",
                tooltip=f"Standard {standard_index} option {option_key.upper()} score",
                x=matrix_x + offset,
                y=row_y,
                width=78,
                height=18,
                options=[" ", *score_options],
                value=" ",
                borderWidth=0.7,
                borderColor=HexColor("#8f887f"),
                fillColor=PAPER,
                textColor=INK,
                forceBorder=True,
                fontName="Helvetica",
                fontSize=6.2,
                fieldFlags="combo",
            )
    total_y = 125
    sheet.label("Manual total, 0-10", matrix_x + 12, total_y + 7)
    for option_key, offset in score_columns.items():
        sheet.text_field(
            f"p2_option_{option_key}_total",
            matrix_x + offset,
            total_y,
            78,
            18,
            font_size=7,
            max_len=2,
        )

    stops_x = 544
    stops_y = 122
    stops_w = 266
    stops_h = 170
    sheet.rect(stops_x, stops_y, stops_w, stops_h, fill=PAPER, stroke=INK)
    sheet.label("Hard stops for the selected option", stops_x + 12, stops_y + stops_h - 18)
    hard_stops = (
        ("p2_hard_stop_unsupported_claims", "Unsupported factual claim"),
        ("p2_hard_stop_unclear_rights", "Permission to use material is unclear"),
        ("p2_hard_stop_private_material", "Private material not approved"),
        ("p2_hard_stop_broken_brand_rule", "Broken brand rule"),
        ("p2_hard_stop_missing_approval", "Missing approval owner"),
    )
    for index, (name, label_text) in enumerate(hard_stops):
        sheet.checkbox(name, label_text, stops_x + 12, 248 - index * 19)
    field(
        "If any stop is marked, record what must change",
        "p2_hard_stop_notes",
        stops_x + 12,
        132,
        stops_w - 24,
        20,
        800,
        multiline=True,
        font_size=6.7,
    )

    sheet.rect(margin, 42, usable_width, 68, fill=PAPER, stroke=INK)
    choice(
        "Selected option",
        "p2_selected_option",
        ("Option A", "Option B", "Option C", "No option yet"),
        margin + 12,
        71,
        170,
        18,
    )
    field(
        "Written reason: why this option fits the job and why the other 2 do not",
        "p2_selection_reason",
        margin + 192,
        60,
        usable_width - 204,
        29,
        1200,
        multiline=True,
        font_size=7.2,
    )
    sheet.body(
        "The written reason controls the decision. The highest total does not override a hard stop.",
        margin + 12,
        48,
        size=7.1,
        color=SIGNAL,
    )
    sheet.footer()
    sheet.c.showPage()

    # Page 3: 25 text fields and 14 blank choices.
    page_surface("3 / FINISH AND LEARN")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8)
    sheet.c.drawString(
        margin + 12,
        476,
        "Finish the selected option deliberately. Save 1 rule that improves the next brief.",
    )
    sheet.c.setFont("Helvetica", 7.1)
    sheet.c.drawString(
        margin + 12,
        464,
        "A score helps compare options. It does not override facts, rights, privacy, brand rules or human approval.",
    )

    finish_y = 222
    finish_h = 225
    sheet.rect(margin, finish_y, usable_width, finish_h, fill=PAPER, stroke=INK)
    sheet.label("Exactly 6 finishing changes", margin + 12, finish_y + finish_h - 18)
    columns = (
        ("Issue", 42, 176),
        ("Change", 228, 224),
        ("Reason tied to the job", 462, 218),
        ("Area", 690, 108),
    )
    for label_text, x, _ in columns:
        sheet.label(label_text, x, 410)
    finish_areas = (
        "Detail",
        "Tone",
        "Order",
        "Hierarchy",
        "Format",
        "Edge case",
        "Remove unnecessary material",
        "Other",
    )
    row_bottoms = (378, 347, 316, 285, 254, 223)
    for index, row_y in enumerate(row_bottoms, start=1):
        fill_colour = PAPER if index % 2 else HexColor("#f6f2ec")
        sheet.rect(margin + 1, row_y, usable_width - 2, 29, fill=fill_colour, stroke=LINE)
        sheet.text_field(
            f"p3_finish_{index}_issue",
            42,
            row_y + 3,
            176,
            23,
            multiline=True,
            font_size=6.5,
            max_len=400,
        )
        sheet.text_field(
            f"p3_finish_{index}_change",
            228,
            row_y + 3,
            224,
            23,
            multiline=True,
            font_size=6.5,
            max_len=600,
        )
        sheet.text_field(
            f"p3_finish_{index}_reason",
            462,
            row_y + 3,
            218,
            23,
            multiline=True,
            font_size=6.5,
            max_len=600,
        )
        sheet.c.acroForm.choice(
            name=f"p3_finish_{index}_area",
            tooltip=f"Finish row {index} area",
            x=690,
            y=row_y + 3,
            width=108,
            height=23,
            options=[" ", *finish_areas],
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=5.7,
            fieldFlags="combo",
        )

    checks_y = 126
    checks_h = 84
    sheet.rect(margin, checks_y, usable_width, checks_h, fill=PAPER, stroke=INK)
    sheet.label("Final checks", margin + 12, checks_y + checks_h - 17)
    check_specs = (
        ("What the reader needs", "p3_check_reader_job", ("Pass", "Stop")),
        ("Facts", "p3_check_facts", ("Pass", "Stop", "Not applicable")),
        ("Permission to use material", "p3_check_rights", ("Pass", "Stop", "Not applicable")),
        ("Privacy", "p3_check_privacy", ("Pass", "Stop", "Not applicable")),
        ("Brand rules", "p3_check_brand_rules", ("Pass", "Stop")),
        ("Works in the chosen place or format", "p3_check_channel_fit", ("Pass", "Stop")),
        ("Approval", "p3_check_approval", ("Pass", "Stop")),
    )
    check_width = 176
    for index, (label_text, name, options) in enumerate(check_specs):
        row = index // 4
        column = index % 4
        x = margin + 12 + column * 190
        y = 164 - row * 34
        choice(label_text, name, options, x, y, check_width, 18, font_size=6.2)
    field(
        "What must change if a check stops the work",
        "p3_check_notes",
        margin + 12 + 3 * 190,
        130,
        check_width,
        18,
        800,
        font_size=6.4,
    )

    sheet.rect(margin, 47, usable_width, 67, fill=PAPER, stroke=INK)
    field("Before version", "p3_before_version", 44, 82, 244, 18, 400)
    field("Approved version", "p3_approved_version", 298, 82, 244, 18, 400)
    field("Final location", "p3_final_location", 552, 82, 246, 18, 400)
    field("1 saved rule for the next brief", "p3_saved_rule", 44, 50, 280, 18, 400)
    field("Approval owner", "p3_approval_owner", 334, 50, 128, 18, 140)
    field("Approval date", "p3_approval_date", 472, 50, 80, 18, 20)
    choice(
        "Final decision",
        "p3_final_decision",
        ("Approve", "Revise", "Check facts or rights", "Ask a qualified reviewer"),
        562,
        50,
        236,
        18,
        font_size=6.2,
    )
    sheet.footer()


def draw_ai_search_visibility_workbook(sheet: DecisionSheet) -> None:
    """Draw the locked 3-page, 6-question AI search visibility workbook."""

    sheet.c.setAuthor("The AI Automation Queen · Shift & Lead")
    sheet.c.setViewerPreference("DisplayDocTitle", "true")
    margin = 32
    usable_width = sheet.width - (2 * margin)

    def page_surface(page_label: str) -> None:
        sheet.header()
        sheet.c.setFillColor(CREAM)
        sheet.c.rect(0, 27, sheet.width, sheet.height - 121, fill=1, stroke=0)
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", 7.2)
        sheet.c.drawRightString(sheet.width - 32, sheet.height - 105, page_label)

    def field(
        label: str,
        name: str,
        x: float,
        y: float,
        width: float,
        height: float,
        max_len: int,
        *,
        multiline: bool = False,
        font_size: float = 7.2,
    ) -> None:
        sheet.label(label, x, y + height + 4)
        sheet.text_field(
            name,
            x,
            y,
            width,
            height,
            multiline=multiline,
            font_size=font_size,
            max_len=max_len,
        )

    def choice_field(
        name: str,
        tooltip: str,
        options: tuple[str, ...],
        x: float,
        y: float,
        width: float,
        height: float,
        *,
        font_size: float = 6,
    ) -> None:
        sheet.c.acroForm.choice(
            name=name,
            tooltip=tooltip,
            x=x,
            y=y,
            width=width,
            height=height,
            options=[" ", *options],
            value=" ",
            borderWidth=0.7,
            borderColor=HexColor("#8f887f"),
            fillColor=PAPER,
            textColor=INK,
            forceBorder=True,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags="combo",
        )

    def compact_label(text: str, x: float, y: float, *, size: float = 5.6) -> None:
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Courier-Bold", size)
        sheet.c.drawString(x, y, text.upper())

    # Page 1: 41 text fields with exactly 6 complete question rows.
    page_surface("1 / MAP 6 CUSTOMER QUESTIONS")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 8)
    sheet.c.drawString(
        margin + 12,
        476,
        "Write the approved answer before changing a page or profile. Give each answer 1 strongest owned source.",
    )
    sheet.c.setFont("Helvetica", 7)
    sheet.c.drawString(
        margin + 12,
        464,
        "Keep private, paid, client and personal information out of public sources and answer tests.",
    )

    sheet.rect(margin, 401, usable_width, 46, fill=PAPER, stroke=INK)
    field("Business name", "p1_business_name", 44, 408, 180, 18, 180)
    field("Main website", "p1_main_website", 234, 408, 240, 18, 500)
    field("Business-fact approver", "p1_business_fact_approver", 484, 408, 120, 18, 140, font_size=6.6)
    field("Technical owner", "p1_technical_owner", 614, 408, 120, 18, 140)
    field("Workbook date", "p1_workbook_date", 744, 408, 54, 18, 20, font_size=6.3)

    sheet.rect(margin, 343, usable_width, 47, fill=PAPER, stroke=INK)
    field("Public reader", "p1_public_reader", 44, 350, 180, 18, 300)
    field("Buying or trust situation", "p1_buying_situation", 234, 350, 180, 18, 500, multiline=True, font_size=6.8)
    field("Country or service area", "p1_country_service_area", 424, 350, 180, 18, 300)
    field("Current offer", "p1_current_offer", 614, 350, 184, 18, 500, multiline=True, font_size=6.8)

    sheet.rect(margin, 115, usable_width, 216, fill=PAPER, stroke=INK)
    sheet.label("Exactly 6 real customer questions", 44, 315)
    question_columns = (
        ("Question", 42, 164),
        ("Correct short answer", 210, 165),
        ("Proof you control or may use", 379, 142),
        ("Strongest owned page", 525, 168),
        ("Answer approver", 697, 101),
    )
    for label_text, x, _ in question_columns:
        compact_label(label_text, x, 297)
    question_row_ys = (265, 236, 207, 178, 149, 120)
    question_suffixes = (
        ("customer_question", 900),
        ("correct_short_answer", 1200),
        ("approved_proof", 900),
        ("strongest_owned_page", 1000),
        ("answer_approver", 180),
    )
    for question_number, row_y in enumerate(question_row_ys, start=1):
        fill_colour = PAPER if question_number % 2 else HexColor("#f6f2ec")
        sheet.rect(36, row_y - 3, 770, 27, fill=fill_colour, stroke=LINE)
        sheet.c.setFillColor(BLUE)
        sheet.c.setFont("Helvetica-Bold", 7)
        sheet.c.drawRightString(39, row_y + 8, str(question_number))
        for (label_text, x, width), (suffix, max_len) in zip(
            question_columns, question_suffixes
        ):
            sheet.text_field(
                f"p1_question_{question_number:02d}_{suffix}",
                x,
                row_y,
                width,
                21,
                multiline=suffix != "answer_approver",
                font_size=6.2,
                max_len=max_len,
            )

    sheet.rect(margin, 42, usable_width, 62, fill=PAPER, stroke=INK)
    field(
        "Information that must never become public",
        "p1_never_public_information",
        44,
        49,
        370,
        31,
        1200,
        multiline=True,
        font_size=6.7,
    )
    field(
        "Facts that need qualified review",
        "p1_qualified_review_facts",
        424,
        49,
        374,
        31,
        1200,
        multiline=True,
        font_size=6.7,
    )
    sheet.footer()
    sheet.c.showPage()

    # Page 2: separate technical checks, access-policy decisions, an optional
    # local profile check and exactly 8 complete public-source rows.
    page_surface("2 / AUDIT 8 PUBLIC SOURCES")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 7.8)
    sheet.c.drawString(
        margin + 12,
        476,
        "Ask the site owner to check page access, security blocks and whether machine-readable page code matches visible facts.",
    )
    sheet.c.setFont("Helvetica", 6.9)
    sheet.c.drawString(
        margin + 12,
        464,
        "Use the detailed fields below as a technical handoff. These checks do not guarantee indexing, ranking or citation.",
    )

    sheet.rect(margin, 360, usable_width, 87, fill=PAPER, stroke=INK)
    field("Owned page tested", "p2_technical_page_url", 44, 413, 230, 17, 1000, font_size=6.4)
    field("Technical owner and date", "p2_technical_owner_date", 284, 413, 180, 17, 220, font_size=6.4)
    field("Official instructions or evidence URL", "p2_technical_evidence_url", 474, 413, 324, 17, 1000, font_size=6.4)
    technical_checks = (
        ("response", "Response", ("200", "Redirect", "Error", "Not checked")),
        ("login", "Login", ("Public", "Login required", "Unknown", "Not checked")),
        ("noindex", "Noindex", ("Absent", "Present", "Unknown", "Not checked")),
        ("canonical", "Canonical", ("Current", "Wrong", "Missing", "Not checked")),
        ("sitemap", "Sitemap", ("Present", "Missing", "Not applicable", "Not checked")),
        ("internal_link", "Internal link", ("Present", "Missing", "Not applicable", "Not checked")),
        ("structured_data", "Structured data", ("Matches", "Errors", "Not present", "Not checked")),
        ("crawler_rule", "Crawler rule", ("Current", "Unclear", "Change planned", "Not checked")),
    )
    technical_width = 91
    for index, (suffix, label_text, options) in enumerate(technical_checks):
        x = 39 + index * 96
        compact_label(label_text, x, 397, size=5.2)
        choice_field(
            f"p2_technical_{suffix}_result",
            f"Technical check: {label_text}",
            options,
            x,
            372,
            technical_width,
            19,
            font_size=5.1,
        )

    sheet.rect(margin, 314, usable_width, 36, fill=PAPER, stroke=INK)
    policy_fields = (
        ("System", "p2_policy_system", 44, 80, 220, None),
        ("Official policy URL", "p2_policy_official_url", 128, 180, 1000, None),
        ("Date checked", "p2_policy_checked_date", 312, 60, 20, None),
        ("Search discovery", "p2_policy_search_discovery", 376, 96, 0, ("Allow", "Block", "Mixed", "Unknown")),
        ("Model training", "p2_policy_model_training", 476, 96, 0, ("Allow", "Block", "Mixed", "Unknown")),
        ("User-request access", "p2_policy_user_request", 576, 104, 0, ("Allow", "Block", "Mixed", "Unknown")),
        ("Decision owner", "p2_policy_decision_owner", 684, 114, 180, None),
    )
    for label_text, name, x, width, max_len, options in policy_fields:
        compact_label(label_text, x, 338, size=5.1)
        if options is None:
            sheet.text_field(name, x, 318, width, 16, font_size=5.8, max_len=max_len)
        else:
            choice_field(name, label_text, options, x, 318, width, 16, font_size=5.2)

    sheet.rect(margin, 269, usable_width, 35, fill=PAPER, stroke=INK)
    compact_label("Eligible local business", 44, 292, size=4.9)
    choice_field(
        "p2_local_eligible",
        "Eligible local business",
        ("Yes", "No", "Not sure"),
        44,
        273,
        72,
        15,
        font_size=5.1,
    )
    compact_label("Local profile URL", 120, 292, size=4.9)
    sheet.text_field("p2_local_profile_url", 120, 273, 128, 15, font_size=5.4, max_len=1000)
    local_checks = (
        ("name", "Name"),
        ("location", "Location / area"),
        ("phone", "Phone"),
        ("hours", "Hours"),
        ("category", "Category"),
        ("services", "Services"),
        ("website", "Website"),
    )
    local_width = 74
    local_x = 252
    for index, (suffix, label_text) in enumerate(local_checks):
        x = local_x + index * 78
        compact_label(label_text, x, 292, size=4.5)
        choice_field(
            f"p2_local_{suffix}_status",
            f"Local profile {label_text} status",
            ("Match", "Mismatch", "Missing", "Not applicable", "Not checked"),
            x,
            273,
            local_width,
            15,
            font_size=4.7,
        )

    sheet.label("Audit up to 8 owned or legitimate outside sources", 42, 252)
    source_columns = (
        ("Type", "source_type", 62),
        ("URL", "url", 104),
        ("Business fact", "business_fact", 72),
        ("Visible wording", "visible_wording", 88),
        ("Date", "last_confirmed_date", 45),
        ("Owner", "source_owner", 48),
        ("Public access", "public_access_result", 60),
        ("Canonical / profile", "canonical_profile_status", 65),
        ("Sitemap / link", "sitemap_internal_link_status", 70),
        ("Official policy URL + date", "official_policy_url_date", 82),
        ("Required fix", "required_fix", 62),
    )
    x = 42
    for label_text, _, width in source_columns:
        compact_label(label_text, x + 1, 232, size=4.25)
        x += width
    source_type_options = (
        "Owned page",
        "Business profile",
        "Maps profile",
        "Review or directory",
        "Partner page",
        "Publication",
        "Other legitimate source",
    )
    access_options = ("Public", "Login required", "Blocked", "Error", "Unknown")
    canonical_options = (
        "Canonical current",
        "Redirect to current",
        "Profile current",
        "Conflict",
        "Not applicable",
        "Unknown",
    )
    link_options = (
        "Both present",
        "Sitemap only",
        "Internal link only",
        "Neither",
        "Not applicable",
        "Unknown",
    )
    source_row_ys = (205, 183, 161, 139, 117, 95, 73, 51)
    for source_number, row_y in enumerate(source_row_ys, start=1):
        fill_colour = PAPER if source_number % 2 else HexColor("#f6f2ec")
        sheet.rect(36, row_y - 2, 770, 21, fill=fill_colour, stroke=LINE)
        x = 42
        for _, suffix, width in source_columns:
            name = f"p2_source_{source_number:02d}_{suffix}"
            if suffix == "source_type":
                choice_field(name, f"Source {source_number} type", source_type_options, x, row_y, width, 17, font_size=4.5)
            elif suffix == "public_access_result":
                choice_field(name, f"Source {source_number} public access result", access_options, x, row_y, width, 17, font_size=4.35)
            elif suffix == "canonical_profile_status":
                choice_field(name, f"Source {source_number} canonical or profile status", canonical_options, x, row_y, width, 17, font_size=4.1)
            elif suffix == "sitemap_internal_link_status":
                choice_field(name, f"Source {source_number} sitemap or internal link status", link_options, x, row_y, width, 17, font_size=4.05)
            else:
                max_len = 1000 if "url" in suffix else 700
                sheet.text_field(
                    name,
                    x,
                    row_y,
                    width,
                    17,
                    multiline=suffix
                    in {
                        "url",
                        "business_fact",
                        "visible_wording",
                        "official_policy_url_date",
                        "required_fix",
                    },
                    font_size=4.8,
                    max_len=max_len,
                )
            x += width
    sheet.footer()
    sheet.c.showPage()

    # Page 3: exactly 12 answer tests and exactly 5 source fixes.
    page_surface("3 / RECORD 12 TESTS AND 5 FIXES")
    sheet.rect(margin, 459, usable_width, 29, fill=PALE_BLUE, stroke=BRIGHT_BLUE)
    sheet.c.setFillColor(INK)
    sheet.c.setFont("Helvetica-Bold", 7.7)
    sheet.c.drawString(
        margin + 12,
        476,
        "A reachable page can still be left out of an AI answer. A test result is a dated sample, not a ranking guarantee.",
    )
    sheet.c.setFont("Helvetica", 6.9)
    sheet.c.drawString(
        margin + 12,
        464,
        "Open every cited page before marking an answer accurate. Results can change by system, context and run.",
    )

    sheet.label("Exactly 12 dated answer tests across 6 questions and at least 2 systems", 42, 445)
    test_columns = (
        ("Question", "question", 58),
        ("System", "system", 55),
        ("Date", "test_date", 48),
        ("Account / location", "account_location_context", 70),
        ("Exact answer summary", "exact_answer_summary", 116),
        ("Business shown", "business_shown", 62),
        ("Cited URL", "cited_url", 105),
        ("Citation opened", "citation_opened", 52),
        ("Accuracy note", "accuracy_note", 92),
        ("Status", "status", 100),
    )
    x = 42
    for label_text, _, width in test_columns:
        compact_label(label_text, x + 1, 428, size=4.15)
        x += width
    test_statuses = ("Seen accurately", "Seen with an error", "Not seen", "Cannot test")
    test_row_ys = tuple(403 - index * 18 for index in range(12))
    for test_number, row_y in enumerate(test_row_ys, start=1):
        fill_colour = PAPER if test_number % 2 else HexColor("#f6f2ec")
        sheet.rect(36, row_y - 2, 770, 17, fill=fill_colour, stroke=LINE)
        x = 42
        for _, suffix, width in test_columns:
            name = f"p3_test_{test_number:02d}_{suffix}"
            if suffix == "business_shown":
                choice_field(name, f"Test {test_number} business shown", ("Shown", "Missing", "Unclear"), x, row_y, width, 14, font_size=4.15)
            elif suffix == "citation_opened":
                choice_field(name, f"Test {test_number} citation opened", ("Yes", "No", "No citation"), x, row_y, width, 14, font_size=4.1)
            elif suffix == "status":
                choice_field(name, f"Test {test_number} status", test_statuses, x, row_y, width, 14, font_size=4.15)
            else:
                max_len = 1000 if suffix == "cited_url" else 900
                sheet.text_field(
                    name,
                    x,
                    row_y,
                    width,
                    14,
                    multiline=suffix
                    in {"exact_answer_summary", "cited_url", "accuracy_note"},
                    font_size=4.65,
                    max_len=max_len,
                )
            x += width

    sheet.label("Record up to 5 highest-value source fixes", 42, 199)
    fix_columns = (
        ("Wrong or missing fact", "wrong_missing_fact", 125),
        ("Strongest source to change", "strongest_source", 145),
        ("Required action", "required_action", 190),
        ("Owner", "owner", 70),
        ("Approval", "approval", 88),
        ("Completed date", "completed_date", 70),
        ("Retest date", "retest_date", 70),
    )
    x = 42
    for label_text, _, width in fix_columns:
        compact_label(label_text, x + 1, 181, size=4.35)
        x += width
    fix_row_ys = (158, 141, 124, 107, 90)
    for fix_number, row_y in enumerate(fix_row_ys, start=1):
        fill_colour = PAPER if fix_number % 2 else HexColor("#f6f2ec")
        sheet.rect(36, row_y - 2, 770, 16, fill=fill_colour, stroke=LINE)
        x = 42
        for _, suffix, width in fix_columns:
            name = f"p3_fix_{fix_number:02d}_{suffix}"
            if suffix == "approval":
                choice_field(
                    name,
                    f"Fix {fix_number} approval",
                    ("Required", "Approved", "Not approved", "Not applicable"),
                    x,
                    row_y,
                    width,
                    13,
                    font_size=4.3,
                )
            else:
                sheet.text_field(
                    name,
                    x,
                    row_y,
                    width,
                    13,
                    multiline=suffix in {"wrong_missing_fact", "strongest_source", "required_action"},
                    font_size=4.7,
                    max_len=700,
                )
            x += width

    sheet.rect(margin, 41, usable_width, 37, fill=PAPER, stroke=INK)
    final_fields = (
        ("What became easier to verify", "p3_became_easier_to_verify", 44, 185),
        ("What remains unknown", "p3_remains_unknown", 233, 185),
        ("Result that is not a stable ranking", "p3_not_stable_ranking_result", 422, 185),
    )
    for label_text, name, x, width in final_fields:
        compact_label(label_text, x, 66, size=4.75)
        sheet.text_field(name, x, 45, width, 17, multiline=True, font_size=5.2, max_len=900)
    compact_label("Final decision", 611, 66, size=4.75)
    choice_field(
        "p3_final_decision",
        "Final decision",
        ("Keep monitoring", "Fix the source", "Check current platform rules", "Ask a developer", "Stop"),
        611,
        45,
        187,
        17,
        font_size=5.1,
    )
    sheet.footer()


def set_annotation_tab_order(path: Path) -> None:
    """Make annotation order the explicit tab order on every form page."""

    reader = PdfReader(str(path))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    for page in writer.pages:
        page[NameObject("/Tabs")] = NameObject("/A")
    temporary_path = path.with_suffix(".tab-order.pdf")
    with temporary_path.open("wb") as stream:
        writer.write(stream)
    temporary_path.replace(path)


def finalise_blank_choice_form(
    path: Path, *, preserve_blank_appearances: bool = False
) -> None:
    """Set semantic tab order and remove temporary choice defaults."""

    reader = PdfReader(str(path))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    for page in writer.pages:
        page[NameObject("/Tabs")] = NameObject("/A")
        for annotation_reference in page.get("/Annots", []):
            annotation = annotation_reference.get_object()
            if annotation.get("/FT") != "/Ch":
                continue
            keys_to_remove = ["/V", "/DV", "/I"]
            if preserve_blank_appearances:
                options = annotation.get("/Opt")
                if options and not str(options[0]).strip():
                    del options[0]
            else:
                keys_to_remove.append("/AP")
            for key in keys_to_remove:
                annotation.pop(key, None)

    acro_form_reference = writer._root_object.get("/AcroForm")
    if acro_form_reference is not None:
        acro_form_reference.get_object()[NameObject("/NeedAppearances")] = BooleanObject(True)

    temporary_path = path.with_suffix(".final-form.pdf")
    with temporary_path.open("wb") as stream:
        writer.write(stream)
    temporary_path.replace(path)


def finalise_source_checking_worksheet_form(path: Path) -> None:
    """Keep blank choice appearances while preserving every page's artwork."""

    if pikepdf is None:
        finalise_blank_choice_form(path, preserve_blank_appearances=True)
        return

    temporary_path = path.with_suffix(".source-checking-form.pdf")
    with pikepdf.open(path) as pdf:
        for page in pdf.pages:
            page.obj["/Tabs"] = pikepdf.Name("/A")
            for annotation in page.obj.get("/Annots", []):
                if annotation.get("/FT") != pikepdf.Name("/Ch"):
                    continue
                options = annotation.get("/Opt")
                if options and not str(options[0]).strip():
                    del options[0]
                for key in ("/V", "/DV", "/I"):
                    if key in annotation:
                        del annotation[key]
        pdf.Root.AcroForm["/NeedAppearances"] = True
        pdf.save(temporary_path)
    temporary_path.replace(path)


GENERATORS: dict[str, tuple[SheetSpec, Callable[[DecisionSheet], None]]] = {
    WHAT_IS_AI.slug: (WHAT_IS_AI, draw_what_is_ai),
    PROMPT_BRIEF.slug: (PROMPT_BRIEF, draw_prompt_brief),
    WORKFLOW_OR_AGENT.slug: (WORKFLOW_OR_AGENT, draw_workflow_or_agent),
    TOOL_COMPARISON.slug: (TOOL_COMPARISON, draw_tool_comparison),
    CHATGPT_FIT_TEST.slug: (CHATGPT_FIT_TEST, draw_chatgpt_fit_test),
    CLAUDE_DOCUMENT_TEST.slug: (CLAUDE_DOCUMENT_TEST, draw_claude_document_test),
    GEMINI_WORKSPACE_TEST.slug: (GEMINI_WORKSPACE_TEST, draw_gemini_workspace_test),
    COPILOT_MICROSOFT_365_TEST.slug: (
        COPILOT_MICROSOFT_365_TEST,
        draw_copilot_microsoft_365_test,
    ),
    GROK_LIVE_SIGNAL_TEST.slug: (
        GROK_LIVE_SIGNAL_TEST,
        draw_live_signal_verification_checklist,
    ),
    META_AI_SAFE_USE_CARD.slug: (
        META_AI_SAFE_USE_CARD,
        draw_meta_ai_safe_use_card,
    ),
    DEEPSEEK_DATA_DEPLOYMENT_CHECKLIST.slug: (
        DEEPSEEK_DATA_DEPLOYMENT_CHECKLIST,
        draw_deepseek_data_deployment_checklist,
    ),
    KIMI_LONG_FILE_CODING_TEST.slug: (
        KIMI_LONG_FILE_CODING_TEST,
        draw_kimi_long_file_coding_test,
    ),
    MANUS_TASK_PERMISSION_MAP.slug: (
        MANUS_TASK_PERMISSION_MAP,
        draw_manus_task_permission_map,
    ),
    PRIVATE_AI_DEPLOYMENT_REQUIREMENTS.slug: (
        PRIVATE_AI_DEPLOYMENT_REQUIREMENTS,
        draw_private_ai_deployment_requirements,
    ),
    THREE_TOOL_STACK_AUDIT.slug: (
        THREE_TOOL_STACK_AUDIT,
        draw_three_tool_stack_audit,
    ),
    RESEARCH_TO_CONTENT_WORKFLOW_MAP.slug: (
        RESEARCH_TO_CONTENT_WORKFLOW_MAP,
        draw_research_to_content_workflow_map,
    ),
    LEAD_FOLLOW_UP_MAP.slug: (
        LEAD_FOLLOW_UP_MAP,
        draw_lead_follow_up_map,
    ),
    INBOX_TRIAGE_TEMPLATE.slug: (
        INBOX_TRIAGE_TEMPLATE,
        draw_inbox_triage_template,
    ),
    AI_TEAMMATE_JOB_DESCRIPTION.slug: (
        AI_TEAMMATE_JOB_DESCRIPTION,
        draw_ai_teammate_job_description,
    ),
    AI_ESSENTIALS_7_DAY_PLAN.slug: (
        AI_ESSENTIALS_7_DAY_PLAN,
        draw_ai_essentials_7_day_plan,
    ),
    AI_IMPROVEMENT_TRACKER.slug: (
        AI_IMPROVEMENT_TRACKER,
        draw_ai_improvement_tracker,
    ),
    AI_ANSWER_SOURCE_CHECKING_WORKSHEET.slug: (
        AI_ANSWER_SOURCE_CHECKING_WORKSHEET,
        draw_ai_answer_source_checking_worksheet,
    ),
    CLEAR_WRITING_REVISION_WORKSHEET.slug: (
        CLEAR_WRITING_REVISION_WORKSHEET,
        draw_clear_writing_revision_worksheet,
    ),
    AI_CREATIVE_REVIEW_WORKBOOK.slug: (
        AI_CREATIVE_REVIEW_WORKBOOK,
        draw_ai_creative_review_workbook,
    ),
    AI_SEARCH_VISIBILITY_WORKBOOK.slug: (
        AI_SEARCH_VISIBILITY_WORKBOOK,
        draw_ai_search_visibility_workbook,
    ),
    BETTER_PROMPTS_SCORECARD.slug: (
        BETTER_PROMPTS_SCORECARD,
        draw_better_prompts_scorecard,
    ),
    SOURCE_TO_PUBLISH_PLANNER.slug: (
        SOURCE_TO_PUBLISH_PLANNER,
        draw_source_to_publish_planner,
    ),
    TASK_TO_WORKFLOW_CANVAS.slug: (
        TASK_TO_WORKFLOW_CANVAS,
        draw_task_to_workflow_canvas,
    ),
    AGENT_ROLE_PERMISSION_TEST_CANVAS.slug: (
        AGENT_ROLE_PERMISSION_TEST_CANVAS,
        draw_agent_role_permission_test_canvas,
    ),
    OPERATIONS_24_7_BLUEPRINT.slug: (
        OPERATIONS_24_7_BLUEPRINT,
        draw_24_7_operations_blueprint,
    ),
    BUSINESS_OPERATIONS_AUTOMATION_MAP.slug: (
        BUSINESS_OPERATIONS_AUTOMATION_MAP,
        draw_business_operations_automation_map,
    ),
}


def generate(slug: str) -> Path:
    spec, draw = GENERATORS[slug]
    DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
    output_path = DOWNLOADS_DIR / spec.filename
    sheet = DecisionSheet(spec, output_path)
    draw(sheet)
    sheet.save()
    if slug == BUSINESS_OPERATIONS_AUTOMATION_MAP.slug:
        set_annotation_tab_order(output_path)
    if slug == AI_IMPROVEMENT_TRACKER.slug:
        finalise_blank_choice_form(output_path)
    if slug == AI_ANSWER_SOURCE_CHECKING_WORKSHEET.slug:
        finalise_source_checking_worksheet_form(output_path)
    if slug == CLEAR_WRITING_REVISION_WORKSHEET.slug:
        finalise_source_checking_worksheet_form(output_path)
    if slug in {
        AI_CREATIVE_REVIEW_WORKBOOK.slug,
        AI_SEARCH_VISIBILITY_WORKBOOK.slug,
    }:
        finalise_source_checking_worksheet_form(output_path)
        MAIN_SITE_DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(output_path, MAIN_SITE_DOWNLOADS_DIR / spec.filename)
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "slug",
        nargs="?",
        choices=sorted(GENERATORS),
        default="what-is-ai",
        help="Guide decision sheet to generate.",
    )
    args = parser.parse_args()
    print(generate(args.slug))


if __name__ == "__main__":
    main()
