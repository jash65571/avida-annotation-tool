# Avida Video / Image Annotation Tool

This is a React + TypeScript annotation tool built for the Avida Full Stack Engineer interview project.

## Overview

The tool lets users upload an image or video and place interactive annotations on top of it.

Users can add icons, rectangles, circles, and lines. Annotations can be selected, dragged, grouped, ungrouped, deleted, recolored, and exported as JSON.

## Features

- Upload image files
- Upload video files
- Basic video play/pause control
- Add Font Awesome icons:
  - camera
  - car
  - person
  - tree
- Add shapes:
  - rectangle
  - circle
  - line / arrow
- Click to place annotations
- Drag annotations
- Click to select one annotation
- Shift-click to select multiple annotations
- Group selected annotations
- Ungroup selected annotations
- Move grouped annotations together
- Change selected annotations or groups to:
  - green
  - red
  - gray
- Delete selected annotations or groups
- Export annotation state as JSON
- Responsive layout for desktop and smaller screens

## How to run locally

Install dependencies:

```bash
npm install