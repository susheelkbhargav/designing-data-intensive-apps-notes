# DDIA Visual Guides

Illustrated, interview-ready visual companions for **Designing Data-Intensive Applications** (Martin Kleppmann). One guide per chapter — diagrams, analogies, worked examples, anti-patterns, and system-design mappings.

**Not a book replacement.** Use alongside the book (or the skill files in `skills/`) when you want the visual, condensed version.

---

## Quick start

```bash
cd ~/Projects/ddia-visual-guides
npm install
npm run export:all          # build all PDFs → output/
open output/ch05-replication.pdf
```

No Chrome bundled? Script auto-falls back to system Google Chrome at `/Applications/Google Chrome.app/...`.

---

## What’s in here

| Part | Chapters | Topics |
|------|----------|--------|
| **I — Foundations** | 1–4 | Reliability/scaling, data models, storage engines, encoding |
| **II — Distributed Data** | 5–9 | Replication, partitioning, transactions, distributed faults, consensus |
| **III — Derived Data** | 10–11 | Batch processing, stream processing / CDC |

Each guide includes:
- Core idea + frameworks (When / How / Why / Failure mode)
- Key concepts, mental models, anti-patterns
- Worked example with diagrams
- **Problems each mechanism solves** (mapped to system-design examples)
- Cross-chapter connections
- Junior SWE checkpoint quizzes + glossary

---

## Repo layout

```
ddia-visual-guides/
├── README.md                 ← you are here
├── package.json              ← npm scripts
├── skills/                   ← source markdown (from claude-skills DDIA pack)
│   ├── SKILL.md              ← master index + core frameworks
│   └── ch01-*.md … ch11-*.md
├── chapters/                 ← HTML visual guides (editable source)
│   ├── ch01-reliable-scalable-maintainable.html
│   ├── ch02-data-models-query-languages.html
│   └── … ch11-stream-processing.html
├── assets/
│   └── styles.css            ← shared print-friendly styling
├── scripts/
│   └── export-pdf.js         ← HTML → PDF via Puppeteer
└── output/                   ← generated PDFs (gitignored if you add .gitignore)
    ├── ch01-reliable-scalable-maintainable.pdf
    └── …
```

---

## Usage

### View in browser (fastest)

```bash
open chapters/ch07-transactions.html
```

Works offline. Best for editing — refresh after changes.

### Export one chapter to PDF

```bash
npm run export -- chapters/ch07-transactions.html
# → output/ch07-transactions.pdf
```

### Export all chapters

```bash
npm run export:all
```

Exports every `chapters/*.html` file to `output/` in sorted order (ch01 → ch11).

### Force a specific Chrome binary

```bash
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run export:all
```

### Install Puppeteer’s bundled Chrome (optional)

Only needed if you don’t have Google Chrome installed:

```bash
npm run install:browser
```

---

## Prerequisites

- **Node.js** 18+ (for PDF export)
- **Google Chrome** (system install) *or* Puppeteer bundled Chrome via `npm run install:browser`
- **npm** (comes with Node)

PDF export is optional — HTML guides work without Node if you only read in browser.

---

## Editing a guide

1. Edit the HTML in `chapters/chNN-*.html`
2. Shared styles live in `assets/styles.css` — changes apply to all chapters
3. Re-export: `npm run export -- chapters/chNN-*.html`
4. Content source of truth: matching file in `skills/chNN-*.md`

**Diagrams** are inline SVG inside each HTML file. Edit the `<svg>` blocks directly.

**Adding a section:** copy a `<section id="...">` block from an existing chapter and match the callout/table patterns in `styles.css`.

---

## Skill files (reference layer)

Markdown summaries live in `skills/`. Originally from:

`~/Downloads/claude-skills-main/designing-data-intensive-apps/`

Use these when you want text-only reference or to regenerate/update HTML content. The master index is `skills/SKILL.md` — topic lookup, core frameworks, chapter index.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Could not find Chrome` | Install Google Chrome, or run `npm run install:browser`, or set `PUPPETEER_EXECUTABLE_PATH` |
| PDF missing styles | Ensure `assets/styles.css` exists; export script loads it via relative path from `chapters/` |
| Blank diagrams in PDF | Puppeteer needs `printBackground: true` (already set in export script) |
| `npm install` fails | Check Node version; delete `node_modules` and retry |

---

## Chapter index

| Ch | HTML | PDF output |
|----|------|------------|
| 1 | `ch01-reliable-scalable-maintainable.html` | `output/ch01-reliable-scalable-maintainable.pdf` |
| 2 | `ch02-data-models-query-languages.html` | `output/ch02-data-models-query-languages.pdf` |
| 3 | `ch03-storage-and-retrieval.html` | `output/ch03-storage-and-retrieval.pdf` |
| 4 | `ch04-encoding-and-evolution.html` | `output/ch04-encoding-and-evolution.pdf` |
| 5 | `ch05-replication.html` | `output/ch05-replication.pdf` |
| 6 | `ch06-partitioning.html` | `output/ch06-partitioning.pdf` |
| 7 | `ch07-transactions.html` | `output/ch07-transactions.pdf` |
| 8 | `ch08-trouble-with-distributed-systems.html` | `output/ch08-trouble-with-distributed-systems.pdf` |
| 9 | `ch09-consistency-and-consensus.html` | `output/ch09-consistency-and-consensus.pdf` |
| 10 | `ch10-batch-processing.html` | `output/ch10-batch-processing.pdf` |
| 11 | `ch11-stream-processing.html` | `output/ch11-stream-processing.pdf` |

---

## Suggested study flow

1. **Skim** the PDF for a chapter before reading the book — get the map
2. **Read** the book chapter for depth
3. **Drill** the checkpoint quizzes at the end of each guide
4. **Cross-link** via "Connects To" sections when jumping between chapters (e.g. Ch 5 replication log → Ch 11 CDC)

For interviews: Part II (Ch 5–9) + stream/batch (Ch 10–11) are highest yield.

---

## License / attribution

Visual guides based on concepts from *Designing Data-Intensive Applications* by Martin Kleppmann (O'Reilly). Skill file content derived from the DDIA claude-skills pack. For personal study use.
# designing-data-intensive-apps-notes
