# Project: Video / Image Annotation Tool

## Goal

Build a simple web-based annotation tool that lets users load an image or video and place interactive icons, lines, and shapes on top of it.

The annotations should be movable, groupable, and support color state changes via buttons.

## Core Requirements

### 1. Media Loading

- Allow the user to load either:
  - An image, for example drag-and-drop or file input
  - A video, using the provided short `.mp4` file, about 30 to 60 seconds
- The media should display as the background or canvas content.
- For video:
  - Basic playback controls, play/pause, should be available.
  - Annotations should remain visible and correctly positioned during playback.

### 2. Placing Icons and Shapes

- Users can add the following elements on top of the media.

#### Icons

- Use Font Awesome icons.
- Font Awesome can be included via CDN or npm.
- Good icon choices include:
  - Camera, `fa-camera`
  - Car, `fa-car`
  - Leaf or tree, `fa-leaf` or `fa-tree`
  - Person, `fa-user`

#### Shapes

At minimum, support:

- Rectangle
- Circle / ellipse
- Line / arrow, with arrowhead optional but nice

#### Placement and Editing

- Each element should be placed by clicking or dragging on the canvas.
- Elements should be draggable after placement.
- Elements can optionally be resizable after placement.

### 3. Grouping

- Allow the user to select multiple elements.
- Possible selection methods include:
  - Shift-click
  - Drag-select box
  - Lasso
- Group selected elements so they can be moved together as a single unit.
- Provide a way to ungroup if desired.

### 4. Activation / Color States

- Add a simple toolbar or set of buttons that let the user change the visual state of selected element(s) or group(s).
- At minimum, support 2 to 3 states, for example:
  - Green, active / normal
  - Red, alert / warning
  - Gray / muted, inactive
- The color change should apply to:
  - Icons
  - Shape borders
  - Shape fills
  - Lines

## Nice-to-Haves

Optional, only if time allows.

- Undo / redo
- Delete selected element(s)
- Change icon size or shape stroke width
- Export the current annotation state as JSON
- Persist annotations across media reload, in-memory is fine
- Responsive layout, works reasonably on desktop and tablet

## Technical Guidelines

- You may use any modern web stack you are comfortable with, such as:
  - React
  - Vue
  - Svelte
  - Plain JavaScript plus TypeScript
- Avida heavily uses React plus TypeScript internally, so a React-based solution would be easiest for them to review.
- Use whatever showcases your strengths best.
- Use Font Awesome for icons.
- CDN link is acceptable:

```html
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css
```

- You do not need to build any backend. This is a pure front-end exercise.
- Focus on:
  - Clean code structure
  - Good state management
  - Thoughtful UX

## AI Use

AI use is okay. Please include how it was used in your presentation.
