# Avida Video / Image Annotation Tool

A React + TypeScript web tool that lets users load an image or video and place interactive icons, shapes, and lines on top of it. Annotations can be selected, dragged, grouped, recolored, resized, undone/redone, and exported as JSON. Annotations persist across page reloads via `localStorage`.

Built for the Avida Full Stack Engineer interview project.

**Live demo (run locally):** see *How to run locally* below.
**Repository:** https://github.com/jash65571/avida-annotation-tool

---

## Features

### Core requirements
- Upload images and videos (file input)
- Basic video play/pause control
- Place Font Awesome icons (camera, car, person, tree)
- Place shapes (rectangle, circle, line with arrowhead)
- Click to place, drag to reposition
- Single-click select, shift-click for multi-select
- Group / ungroup selected annotations — grouped items move and recolor together
- Color states: green / red / gray (active / alert / muted)
- Color applies to icons, shape borders, shape fills, and lines

### Nice-to-haves implemented
- **Undo / redo** — full history of every action (create, delete, color, group, drag, resize), capped at 50 entries
- **Resize** — slider (50%–200%) scales selected annotations
- **Persistence** — annotations survive page reload via `localStorage`
- **Delete** selected annotations
- **Export** annotations as JSON
- **Responsive layout** — adapts at 1200 / 960 / 760 / 480 px breakpoints

### Not implemented (time-permitting items)
- Drag-select / lasso multi-select (shift-click works, but no rubber-band)
- Keyboard shortcuts for undo/redo (the buttons say "Ctrl+Z / Ctrl+Y" in tooltips, but the handlers aren't wired)
- Annotation rotation
- Saving the uploaded media itself (only the annotation data persists; user must re-upload media after refresh)

---

## How to run locally

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (default: `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

---

## Libraries used and why

The project intentionally has a tiny dependency footprint — only React itself is a runtime dependency.

| Library | Purpose | Why this one |
|---|---|---|
| **React 19** | UI framework | Avida uses React internally per the brief, so it's the most readable stack for the reviewer. Hooks (`useState`, `useEffect`, `useRef`) cover everything this app needs without extra state libraries. |
| **TypeScript** | Static typing | Catches mistakes early (e.g. invalid annotation `type` strings) and makes the data shape (the `Annotation` type) self-documenting. |
| **Vite** | Dev server + bundler | Near-instant cold start, fast HMR, no config required. |
| **Font Awesome 6** (CDN) | Icon set | Specified in the brief. Loaded via `<link>` in `index.html` so there's no npm install / icon-library trade-off to manage. |

Deliberately **not** used:
- No CSS framework (Tailwind, MUI, etc.) — the UI is small enough that hand-written CSS in `App.css` is clearer.
- No state library (Redux, Zustand) — `useState` is sufficient; adding a store would be premature.
- No drag-and-drop library — pointer events handle drag in ~30 lines.

---

## Project structure

```
src/
├── App.tsx                    # State, event handlers, history, persistence
├── App.css                    # Styles + responsive breakpoints
├── types.ts                   # Annotation, AnnotationType, AnnotationColor, colorMap
├── main.tsx                   # React entry point
└── components/
    ├── Toolbar.tsx            # Tools, color buttons, size slider, undo/redo, actions
    ├── Workspace.tsx          # Media display + annotation rendering layer
    ├── AnnotationItem.tsx     # Renders one icon / rectangle / circle / line
    ├── StatusRow.tsx          # Active tool + counts
    └── ExportPanel.tsx        # JSON output textarea
```

State lives in `App.tsx` and flows down via props. The `Annotation` shape is the single source of truth — every feature (color, group, drag, resize, undo) is just a transformation of the `annotations` array.

---

## Challenges

1. **Stale closures in the history reducer.** My first version of `commitAnnotations` read `history` and `historyIndex` from the function's closure, which meant rapid successive calls could overwrite each other's history entries. Fixed by switching to the functional updater form: `setHistory(currentHistory => …)`.

2. **Keeping grouped items in sync.** Selecting one item in a group needed to "expand" the selection to all members of that group, otherwise color/delete/drag would only affect the clicked item. The `getExpandedSelectionIds` helper walks the array twice — once to find the group ids of currently selected items, then again to gather every member of those groups.

3. **Drag + history.** Updating history on every `pointermove` would create dozens of useless undo entries per drag. Instead, drag mutations only update `annotations` state during the move, and a single history entry is committed in `pointerup`.

4. **Refactor pass.** After the initial implementation, four mutation handlers (`changeSelectedColor`, `changeAnnotationSize`, `groupSelected`, `ungroupSelected`) had near-identical bodies. I extracted `updateSelectedAnnotations(transform)` to take any per-annotation transform, which collapsed ~60 lines into ~10.

---

## Trade-offs and intentional limitations

- **History stores full snapshots, not diffs.** Simpler to reason about and fast at this scale; would be wasteful if annotations grew to thousands. Capped at 50 entries to keep memory bounded.
- **Only annotations persist, not the media.** Storing video/image bytes in `localStorage` would blow past the 5–10 MB quota. The media URL is created with `URL.createObjectURL` and revoked on cleanup; the user must re-upload after a refresh.
- **Shape sizes use a CSS `scale()` transform.** This scales the visual but not the underlying width/height — it's smooth and one-line, but means hit-testing and bounding-box math (if added later) would need to multiply by `size`. Acceptable for this scope.
- **No tests.** Given the time budget and the visual nature of the app, I prioritized a working interactive demo over unit tests. The data transformations (`map`/`filter` over `annotations`) are pure and would be straightforward to test.
- **Click-to-place, not drag-to-draw.** The brief allowed either; click-to-place is faster to use and avoids ambiguous gesture detection. Shapes have fixed default dimensions, then resize via the slider.

---

## AI assistance

I used Claude (Anthropic) heavily during this build. Being transparent about it:

**What AI generated:**
- Initial scaffolding of `App.tsx`, the components, and `types.ts` — Claude produced the first working version of the core features (upload, click-to-place, drag, group, recolor, export) from the spec.
- Most of the CSS, including the responsive breakpoints in `App.css`.
- The four nice-to-haves (undo/redo, resize, persistence, responsive design) were added in a second pass.
- A code-quality refactor pass that introduced `STORAGE_KEY` / `MAX_HISTORY` constants, the `updateSelectedAnnotations` helper, and fixed a stale-closure bug in the history reducer.

**How I validated and modified it:**
- Read every file and confirmed the data flow (props down, callbacks up — no hidden state).
- Verified the build passes (`npm run build`) after every significant change.
- Manually exercised every feature in the browser: upload → place → drag → group → recolor → resize → undo → redo → export → refresh-and-verify-persistence → resize-window-to-test-responsive.
- Caught and removed a chunk of unnecessary scratch documentation files Claude generated during the session that didn't belong in the repo.
- Pushed back when a change introduced duplication or magic strings, and had it refactored before committing.

**What I did not just accept:**
- I rejected an early suggestion to store everything (including media URLs and UI state) in `localStorage` — only annotation data needs to persist.
- I removed the keyboard-shortcut tooltip text initially, then added it back as a TODO marker since the handlers aren't wired (noted under "Not implemented" above).

I treated Claude as a fast pair-programmer, not as a substitute for understanding the code. Every commit was reviewed before pushing.

---

## Estimated total time spent

Roughly **6–8 hours**, broken down approximately as:

- 2 hrs — initial scaffolding, core features (upload, place, drag, group, recolor, export)
- 1 hr — CSS / layout / responsive breakpoints
- 1.5 hrs — nice-to-haves (undo/redo, resize, persistence)
- 1 hr — refactor / cleanup pass (extracting helpers, removing duplication, fixing stale closure)
- 0.5–1 hr — manual testing and verifying every feature in browser
- 1 hr — README and presentation prep

---

## Presentation notes

**Why this stack?** The brief said Avida uses React + TypeScript heavily, so picking that minimizes friction for the reviewer. Vite is the modern default for spinning up a React+TS app. No state library because hooks are enough; no UI library because there are ~15 controls total.

**How the architecture works:** All state lives in `App.tsx`. The `Annotation` type in `types.ts` is the single source of truth — each annotation has `id, type, x, y, color, groupId, size`. Every feature is just a transformation of the `annotations` array:
- **Create** = append
- **Delete** = filter
- **Recolor / resize / group / ungroup** = map with a transform
- **Drag** = map with a position delta (in `pointermove`), commit one history entry on `pointerup`
- **Undo / redo** = restore a prior snapshot from the `history` array

Centralizing this through `commitAnnotations()` means persistence (`localStorage`), history tracking, and clearing the export buffer all happen in one place — every mutation goes through it.

**Biggest hurdle:** the stale-closure bug in `commitAnnotations` (described under Challenges). It only showed up under fast successive actions, which is exactly the kind of bug that would slip past casual manual testing — caught by reasoning about what `setHistory(value)` vs `setHistory(fn)` actually does in React's batching model.

---

## License

Built for interview purposes. No license attached.
