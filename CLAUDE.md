# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run lint      # ESLint (JS/JSX, react-hooks, react-refresh)
npm run preview   # Preview production build

# Playwright verification scripts (dev server must be running)
node verify-flow.mjs
node verify-confirm.mjs
node verify-interactive.mjs
node verify-layout.mjs
node verify-last.mjs
node verify-final.mjs
node verify-prototype.mjs
```

No test runner is configured. The `verify-*.mjs` scripts use Playwright for visual/smoke checks and save screenshots to `/tmp/`.

## What This Is

Mobile-first UI prototype of a foreman's AI-assisted clock-out correction flow for PeopleForce (workforce management). Target user: foreman on a factory floor — one thumb, gloves, poor lighting, 5-minute task. The prototype renders inside a fixed 390×844 phone frame on a desktop page.

See [PRODUCT.md](PRODUCT.md) for brand voice, design principles, and accessibility constraints (56px min tap targets, WCAG AA, no color-only state signaling).

## Architecture

### App Shell ([src/App.jsx](src/App.jsx))

Desktop wrapper that is **not** part of the mobile prototype:
- Sticky nav bar with dark/light toggle (`[data-theme="dark"]` on `<html>`)
- Sticky sidebar: `<Flowchart />` — a prototype navigation panel
- Fixed phone frame (390×844) that contains all `<Routes>`

### Routing

| Route | Screen |
|---|---|
| `/` | `ShiftSummary` — list of flagged workers |
| `/corrections` | `CorrectionFlow` — bulk approve + manual queue |
| `/correction/:workerId` | `PerWorkerCard` — single worker detail/decision |
| `/confirm` | `Confirmation` — submission result |
| `/hr-request` | `HrRequest` — HR bounce-back detail screen |

### Demo State System

Every screen reads `?demo=<state>` from the URL query string to render specific prototype scenarios (offline, edge cases, loading skeletons, etc.). The `<Flowchart>` sidebar lists all valid demo states and navigates between them. This is how all prototype states are explored — never hardcoded conditionals in unrelated components.

Key demo states:
- `ShiftSummary`: `default`, `single`, `empty`, `offline`, `multi-line`
- `CorrectionFlow`: `bulk`, `undo`, `offline`
- `PerWorkerCard`: `high-confidence`, `low-confidence`, `conflict`, `dispute`, `full-conflict`, `loading`
- `Confirmation`: `partial`, `offline`, `partial-sync`

### Data ([src/data/workers.js](src/data/workers.js))

Single static export `workers` — 3 workers with confidence scores, anomaly types, clock-in/out times, reasoning strings, and optional `conflict`/`badgeScan` fields. No backend, no state management library.

### Confidence Threshold

`HIGH_THRESHOLD = 85` (defined in `CorrectionFlow`). Workers at ≥85% are grouped for one-tap bulk approval; below 85% require individual review.

### CSS Architecture

Two CSS files, both use custom properties only (no CSS modules, no Tailwind, all styles are inline in JSX):

- **[src/tokens.css](src/tokens.css)** — design tokens split into two layers:
  - Phone-internal (`--bg`, `--surface`, `--text-primary`, `--accent`, etc.) — used inside the phone frame
  - Page-level (`--page-bg`, `--page-nav-bg`, etc.) — used for the desktop chrome
  - Dark mode overrides via `[data-theme="dark"]` on `<html>`
  - Keyframe animations: `screenEnter`, `fadeSlideDown`, `scaleIn`, `fadeIn`, `shimmer`
- **[src/index.css](src/index.css)** — global resets (box-sizing, tap highlight, button font) and reduced-motion media query

### Component Roles

- `StickyActions` — sticky bottom bar with primary (accent) + optional secondary CTA; handles disabled state, `onDisabledTap` callback for validation hints
- `ConfidenceBar` — visual bar + label; color/label change at the 85% threshold
- `AnomalyChip` — amber warning badge for anomaly type labels
- `ReasonPills` — radio-style pill selection for correction reason (`Schedule default`, `Dispute – follow up`, `Other`); `Other` requires non-empty comment to be valid
- `TimeStepper` — ±5 min stepper for adjusting clock-out time; clamped to `[minMins, 23:55]`
- `Flowchart` — desktop sidebar only; defines all NODES with their demo substates; drives prototype navigation
