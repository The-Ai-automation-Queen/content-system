from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


OUT = Path(__file__).resolve().parents[1] / "next-app/public/downloads/10-ai-words-you-need-to-know.pdf"

TERMS = [
    ("01", "AI", "Software that recognises patterns, creates content or recommends an answer.", "Ask what task it performs, what information it uses and who approves the result."),
    ("02", "Generative AI", "AI that creates new text, images, audio, video or code from an instruction.", "Treat the output as a draft. Check facts, tone, rights and confidential information."),
    ("03", "LLM", "The language engine inside tools such as ChatGPT and Claude.", "Judge the tool on accurate work, not the model name in the sales pitch."),
    ("04", "Prompt", "The request and information you give an AI so it knows what to produce.", "Include the goal, evidence, limits and required format."),
    ("05", "Context window", "The limit on how much conversation and source material AI can consider at once.", "Start a clean chat with the current brief when the work begins to drift."),
    ("06", "Hallucination", "A name, number, quote or source that AI invents and presents as true.", "Verify every important claim in the original source before using it."),
    ("07", "AI agent", "AI that works through several steps and uses tools to pursue a goal.", "Require approval before it sends, deletes, spends, publishes or changes records."),
    ("08", "Automation", "A rule that makes software complete a step when a specific event happens.", "Define the trigger, expected result and what happens when it fails."),
    ("09", "Connector", "A link that lets AI read from another app or take an action inside it.", "Grant only the access required for the task and remove it when finished."),
    ("10", "RAG", "Retrieval-Augmented Generation lets AI search information you choose before answering.", "Keep sources current and require the answer to show which document it used."),
]


def wrap(text, font, size, max_width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, font, size) <= max_width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


OUT.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
width, height = A4
ink, blue, cream, muted = map(HexColor, ["#1a1a1a", "#1b2ea0", "#f3efe8", "#5d5851"])

c.setFillColor(cream)
c.rect(0, 0, width, height, fill=1, stroke=0)
c.setFillColor(blue)
c.rect(0, height - 126, width, 126, fill=1, stroke=0)
c.setFillColor(HexColor("#ffffff"))
c.setFont("Times-Bold", 26)
c.drawString(38, height - 62, "10 AI words you need to know")
c.setFont("Helvetica", 9.5)
c.drawString(38, height - 88, "The 1-page reference for tool demos, proposals and meetings")
c.setFont("Helvetica-Bold", 9)
c.drawRightString(width - 38, height - 62, "SHIFT & LEAD")

margin, gap = 38, 24
column_width = (width - 2 * margin - gap) / 2
top = height - 154
row_height = 119

for index, (number, term, meaning, action) in enumerate(TERMS):
    column = index // 5
    row = index % 5
    x = margin + column * (column_width + gap)
    y = top - row * row_height
    c.setStrokeColor(HexColor("#c9c1b5"))
    c.line(x, y, x + column_width, y)
    c.setFillColor(blue)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x, y - 18, number)
    c.setFillColor(ink)
    c.setFont("Times-Bold", 15)
    c.drawString(x + 25, y - 20, term)
    body_y = y - 38
    c.setFont("Helvetica", 8.2)
    c.setFillColor(muted)
    for line in wrap(meaning, "Helvetica", 8.2, column_width - 25):
        c.drawString(x + 25, body_y, line)
        body_y -= 10.5
    body_y -= 3
    c.setFillColor(ink)
    c.setFont("Helvetica-Bold", 8.2)
    for line in wrap(action, "Helvetica-Bold", 8.2, column_width - 25):
        c.drawString(x + 25, body_y, line)
        body_y -= 10.5

c.setFillColor(ink)
c.rect(0, 0, width, 44, fill=1, stroke=0)
c.setFillColor(HexColor("#ffffff"))
c.setFont("Helvetica-Bold", 8.5)
c.drawString(38, 17, "The rule: let AI produce. Keep people responsible for approval.")
c.setFont("Helvetica", 7.5)
c.drawRightString(width - 38, 17, "shiftandlead.com/guides/ai-jargon-guide.html")
c.save()
print(OUT)
