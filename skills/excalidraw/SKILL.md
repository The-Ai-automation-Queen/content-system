---
name: excalidraw
description: Generate branded Excalidraw (.excalidraw) diagram files from text, URLs, or concepts. Use when the user says /excalidraw, "make a diagram," "draw this," "excalidraw," "visualize this," "explain this visually," or pastes text/URL and asks for a visual explanation. Produces hand-drawn style .excalidraw JSON files with brand-consistent styling.
---

# Excalidraw Diagram Generator

Generate branded `.excalidraw` diagram files that explain concepts visually using a consistent hand-drawn style with brand colors.

## When to Use

- User types `/excalidraw` followed by text, a URL, or a topic
- User asks to "make a diagram," "draw this," "visualize this," or "explain this visually"
- User pastes text or a URL and wants a visual/diagrammatic explanation
- User asks for a flowchart, mind map, comparison, or any visual breakdown

## Input Handling

Input can be any of:

1. **Pasted text** — structure the content into a visual layout
2. **A URL** — fetch the page content with WebFetch, extract key concepts, then diagram
3. **A topic/concept** — research if needed, then diagram
4. **Raw instructions** — "compare X vs Y", "explain how X works", "show the flow of X"

## Brand Color System

All diagrams use a strict 3-color palette. Never deviate from these colors.

| Role | Hex | Usage |
|------|-----|-------|
| **Primary text & shapes** | `#000000` | Body text, shape outlines, descriptions, examples |
| **Accent** | `#7B2FBE` | Section titles, arrows, divider lines, key labels, highlighted boxes, TL;DR borders |
| **Background** | `#ffffff` | Canvas background (appState.viewBackgroundColor) |

### Accent Color Rules

Apply `#7B2FBE` to these elements:
- All section heading text (fontSize 20+)
- The main title text
- All divider lines between sections
- All arrow connectors
- Step number labels (e.g., "1. Ask", "Step 1")
- Safety/highlight callout box borders and text
- Scale/spectrum labels
- TL;DR box border
- The "hero" element border (e.g., the recommended option in a comparison)
- Option subtitles in how-to sections

Keep `#000000` for:
- Body/description text
- Example lists
- Shape outlines (rectangles, ellipses) except hero elements
- Source attribution text

## Diagram Structure Template

Every diagram follows this vertical layout:

```
1. TITLE (accent color, fontSize 28, fontFamily 1)
2. Subtitle (black, fontSize 16)
3. Divider line (accent)
4. [Optional: Context/intro box]
5. Main content sections (side-by-side or stacked)
6. Divider line (accent)
7. How-to / step-by-step flow (horizontal boxes with arrows)
8. Divider line (accent)
9. TL;DR summary box (accent border, black text inside)
10. Source attribution (if from URL)
```

## Excalidraw JSON Defaults

Every element must include these base properties:

```json
{
  "version": 1,
  "versionNonce": 1,
  "isDeleted": false,
  "boundElements": null,
  "updated": 1,
  "link": null,
  "locked": false
}
```

### Element Defaults by Type

**Text:**
```json
{
  "type": "text",
  "fontFamily": 1,
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "fillStyle": "solid",
  "backgroundColor": "transparent"
}
```

**Shapes (rectangle, ellipse, diamond):**
```json
{
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "roundness": { "type": 3 }
}
```

Use `"fillStyle": "cross-hatch"` for blocked/negative elements.
Use `"fillStyle": "hachure"` with accent strokeColor for highlighted/hero elements.

**Arrows:**
```json
{
  "type": "arrow",
  "strokeColor": "#7B2FBE",
  "strokeWidth": 2,
  "roughness": 1,
  "endArrowhead": "arrow",
  "startArrowhead": null
}
```

**Lines (dividers):**
```json
{
  "type": "line",
  "strokeColor": "#7B2FBE",
  "strokeWidth": 2,
  "roughness": 1
}
```

### Canvas Settings

```json
{
  "appState": {
    "gridSize": null,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
```

## Writing Style

- Beginner-friendly language for non-technical people
- Use analogies (e.g., "like a bouncer at a club", "like texting a smart friend")
- Short, punchy text — no paragraphs inside diagrams
- Use "->" prefix for list items inside shapes
- Use "X" prefix for blocked/negative items
- Include a TL;DR section at the bottom with a plain-English summary
- Never use the phrase "for a 15-year-old" — just write simply

## Output

- Save to: `C:\Users\fatih\.claude\builds\outputs\diagrams\<slug>.excalidraw`
- Filename: kebab-case slug derived from the topic (e.g., `claude-auto-mode.excalidraw`)
- Always display the full file path after saving
- File format: valid Excalidraw JSON with `"type": "excalidraw"` and `"version": 2`

## Process

1. **Parse input**: Determine if text, URL, or topic
2. **If URL**: Fetch with WebFetch, extract all key concepts
3. **Plan layout**: Decide sections, comparisons, flows needed
4. **Generate**: Build the full Excalidraw JSON with all elements
5. **Save**: Write to the diagrams output folder
6. **Confirm**: Display the file path
