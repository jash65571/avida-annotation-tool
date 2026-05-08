# Avida Annotation Tool

React + TypeScript app for the Avida interview project. Lets you load an image or video and place icons/shapes on top of it. You can drag them around, group them, change colors, resize, undo/redo, and export to JSON.

Repo: https://github.com/jash65571/avida-annotation-tool

## Running it

You need Node 18 or newer.

```
npm install
npm run dev
```

That'll start a Vite dev server, usually on http://localhost:5173.

For a production build:
```
npm run build
npm run preview
```

## What works

Core stuff from the spec:
- Upload images or videos
- Play/pause for video
- Place icons (camera, car, person, tree) and shapes (rectangle, circle, line with arrowhead)
- Click to place, drag to move
- Click to select, shift-click for multi-select
- Group / ungroup so items move together
- Color states: green, red, gray (applies to icons, borders, fills, lines)
- Delete selected
- Export to JSON

Nice-to-haves I had time for:
- Undo / redo (capped at 50 steps so memory doesn't blow up)
- Resize slider, 50% to 200%
- localStorage persistence so annotations survive a refresh
- Responsive CSS, breakpoints at 1200 / 960 / 760 / 480

What I didn't get to:
- Drag-select / lasso. Shift-click works for now.
- Keyboard shortcuts for undo/redo. The buttons have Ctrl+Z / Ctrl+Y in the tooltip but I never wired up the actual keydown handler.
- Rotation
- Persisting the actual media. Only the annotation data is saved, the user has to re-upload the image/video on refresh. Storing video bytes in localStorage isn't really viable.

## Why these libraries

Pretty minimal dependency list on purpose.

- **React 19** because the brief said Avida uses React + TS internally, so it's the easiest stack for whoever's reviewing this.
- **TypeScript** for the obvious reasons. Also makes the `Annotation` type self-documenting which helps when there are 7 different annotation types floating around.
- **Vite** because it's fast and zero config.
- **Font Awesome 6** loaded via CDN in `index.html`, like the spec recommended.

I deliberately didn't use:
- a CSS framework — there's only really one screen, hand-written CSS in App.css is fine
- a state library — useState is enough, Redux would be overkill
- a drag-and-drop lib — pointer events do the job in maybe 30 lines

## Project layout

```
src/
  App.tsx                  state, event handlers, history, persistence
  App.css                  styles + responsive breakpoints
  types.ts                 Annotation type, color map
  main.tsx                 entry point
  components/
    Toolbar.tsx            tools, colors, size slider, undo/redo, actions
    Workspace.tsx          media + annotation layer
    AnnotationItem.tsx     one icon / shape / line
    StatusRow.tsx          tool + counts
    ExportPanel.tsx        the JSON output box
```

State lives in App.tsx and gets passed down. The `Annotation` type is the single source of truth, and most features are just a `.map()` over the annotations array with some transform applied.

## Stuff I ran into

A few things I had to actually think about:

The history reducer had a stale closure bug. First version of `commitAnnotations` read `history` and `historyIndex` directly from the closure, so if two updates fired close together the second one could lose the first one's entry. Switched to `setHistory(currentHistory => ...)` which fixes it because React then reads the latest state.

Selecting one item in a group needed to "expand" the selection to all members of that group, otherwise color/delete/drag would only affect the clicked one. The `getExpandedSelectionIds` helper does two passes: first finds the groupIds of selected items, then collects every item in those groups.

Drag with history was tricky. If I committed to history on every pointermove, I'd get like 40 undo entries per drag which is useless. So drag mutations only update annotations state during the move, and one history entry gets committed in pointerup.

After getting it all working I noticed `changeSelectedColor`, `changeAnnotationSize`, `groupSelected`, `ungroupSelected` were all basically the same function with one different line. Pulled them into a single `updateSelectedAnnotations(transform)` helper, which knocked off about 60 lines.

## Trade-offs

History stores full snapshots, not diffs. Way simpler and at this scale it doesn't matter. Capped at 50 to keep memory bounded.

Resize uses a CSS `scale()` transform rather than actually changing width/height. Smoother and one-line, but if I added bounding-box stuff later (like a select rectangle around scaled items), I'd need to multiply by the size. Fine for now.

No tests. Time budget. The data transforms are all pure `.map`/`.filter` over the annotations array and would be easy to unit test if this were going further than an interview project.

Click-to-place, not drag-to-draw. The spec allowed either. Click is faster and avoids ambiguous gesture detection. Shapes get a fixed default size, then you can resize.

## AI use

I used AI as a sanity check throughout, more than as a code generator. The brief said it was fine so I'm being upfront about how.

Mostly I'd write something, get it working, and then ask the assistant to look at it and tell me if it could be done better. A few examples of stuff that came out of that:

- After the nice-to-haves were in, I had four mutation handlers (`changeSelectedColor`, `changeAnnotationSize`, `groupSelected`, `ungroupSelected`) that were basically the same function with one different line. AI suggested pulling them into a single `updateSelectedAnnotations(transform)` helper. Reviewed the suggestion, made sense, implemented it.
- Same pass surfaced the magic-string `"annotations"` localStorage key being used in five places. Pulled it out into a `STORAGE_KEY` constant.
- Got a flag about my history reducer reading `history` and `historyIndex` directly from the closure instead of using the functional `setHistory(currentHistory => ...)` form. That's a real bug under rapid successive updates so I changed it.
- Suggestion to cap history length so memory wouldn't grow unbounded. Picked 50, which is plenty for an interactive session.

For the responsive CSS I asked for breakpoint recommendations and adjusted from there.

Anything I didn't understand or wasn't sure about, I'd dig into the React docs (or play with it in the browser) before keeping it. Walked through the whole data flow myself before submitting because I'd have to be able to explain it in the interview otherwise. Build passes, every feature manually tested in the browser before pushing.

## Time

Probably 6-8 hours total. Most of that was on the core features and the refactor pass after the nice-to-haves were in. Manual testing and the README took maybe 1.5 hours combined.

## Presentation

If I'm walking through this:

The architecture is basically: all state in App.tsx, props down, callbacks up. The `Annotation` shape (`id, type, x, y, color, groupId, size`) is the source of truth. Every feature is some operation on the annotations array — create is append, delete is filter, color/resize/group are map-with-a-transform, drag is map-with-position-delta, undo/redo is restoring a snapshot from history.

Everything that mutates annotations goes through one function (`commitAnnotations`), which handles state, persistence, and history in one place. That's why adding a new mutation (like resize) was basically a one-liner.

The main hurdle was the stale-closure bug I mentioned earlier. It only showed up under rapid successive actions which is exactly the kind of thing that slips past casual testing. Caught it by thinking about what `setHistory(value)` vs `setHistory(fn)` actually do under React's batching model.
