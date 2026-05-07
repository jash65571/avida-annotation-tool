# 🧪 Testing Plan - New Features

## ✅ Features Implemented

1. **Undo / Redo** - Full history tracking
2. **Resizable Elements** - Size slider (0.5x to 2x)
3. **localStorage Persistence** - Annotations survive reload
4. **Responsive Design** - Desktop, tablet, mobile support

---

## 📋 Test Checklist

### 1️⃣ Undo/Redo Testing

**Setup:**
- Open app in browser
- Upload an image

**Test Undo:**
- [ ] Click canvas 3 times to create 3 annotations
- [ ] Click "Undo" button → last annotation disappears ✅
- [ ] Click "Undo" again → another disappears ✅
- [ ] Undo button becomes disabled when at start ✅

**Test Redo:**
- [ ] After undoing, click "Redo" → annotation comes back ✅
- [ ] Click "Redo" again → another comes back ✅
- [ ] Redo button becomes disabled when at end ✅

**Test Undo/Redo with Other Actions:**
- [ ] Create annotation → undo → check it's gone ✅
- [ ] Change color of annotation → undo → color reverts ✅
- [ ] Group 2 annotations → undo → ungroup ✅
- [ ] Delete annotation → undo → comes back ✅
- [ ] Move annotation by dragging → undo → goes back ✅

**Edge Cases:**
- [ ] Make change → undo → undo again (go back in history)
- [ ] Undo some changes, then make a NEW change (should clear redo history)
  - Create A → Create B → Undo (B goes away) → Create C
  - Should only see A, C (not be able to redo B)

---

### 2️⃣ Size Control Testing

**Setup:**
- Upload image
- Create some annotations

**Test Size Slider:**
- [ ] Slider only enabled when annotation selected ✅
- [ ] Move slider to 50% → annotation shrinks ✅
- [ ] Move slider to 150% → annotation grows ✅
- [ ] Move slider back to 100% → normal size ✅

**Test Size with Different Types:**
- [ ] Icon (camera) resizes ✅
- [ ] Rectangle resizes ✅
- [ ] Circle resizes ✅
- [ ] Line resizes ✅

**Test Size with Multiple Selected:**
- [ ] Select 2 annotations
- [ ] Change size → BOTH change size ✅

**Test Size Persistence:**
- [ ] Create annotation
- [ ] Change size to 150%
- [ ] Refresh page
- [ ] Size should still be 150% (from localStorage) ✅

---

### 3️⃣ Persistence Testing (localStorage)

**Setup:**
- Open app
- Upload image

**Test Annotations Persist:**
- [ ] Create 3 annotations with different colors
- [ ] Refresh page (F5)
- [ ] All 3 annotations should still be there ✅
- [ ] Colors should be correct ✅

**Test Persistence with Changes:**
- [ ] Create annotation → size it to 120% → color it red
- [ ] Refresh page
- [ ] Annotation should still be size 120% and red ✅

**Test New Media Clears Old:**
- [ ] Create annotations on image 1
- [ ] Upload image 2
- [ ] Annotations should disappear ✅
- [ ] Refresh page
- [ ] Still gone (cleared in localStorage) ✅

**Test Grouping Persists:**
- [ ] Create 2 annotations → group them
- [ ] Refresh page
- [ ] They should still be grouped (groupId preserved) ✅

---

### 4️⃣ Responsive Design Testing

**Desktop (1920px wide):**
- [ ] All 4 tool groups visible in row
- [ ] Workspace and media display properly
- [ ] No horizontal scrolling
- [ ] Buttons properly sized

**Tablet (iPad - 768px wide):**
- [ ] Tool groups stack to 2 columns or less
- [ ] Workspace resizes appropriately
- [ ] Annotations still visible and draggable
- [ ] Touch controls work (tap to create, drag to move)

**Mobile (iPhone - 375px wide):**
- [ ] Tool groups stack to 1 column
- [ ] Description text hidden (takes space)
- [ ] All buttons readable and tappable
- [ ] Workspace fits on screen
- [ ] Annotations still visible

**Test Annotation Sizes on Mobile:**
- [ ] Annotations don't overflow canvas
- [ ] Icons are appropriately sized
- [ ] Shapes are proportional

**Test on Different Devices:**
- [ ] Chrome DevTools responsive mode - tablet size ✅
- [ ] Chrome DevTools responsive mode - mobile size ✅

---

### 5️⃣ Interaction Testing

**Create & Undo Flow:**
- [ ] Create annotation → Undo → Create different annotation
  - Should work smoothly
  - Redo should show the first one, not the second

**Drag & Undo Flow:**
- [ ] Create annotation → Drag it → Undo
  - Position should go back to original
  - Redo should move it back

**Color & Size Combinations:**
- [ ] Create annotation → Change color → Change size → Undo once
  - Size should revert, color stays ✅ (Last change undone)
- [ ] Undo again → Color reverts too ✅

**Group & Undo:**
- [ ] Create A → Create B → Group them → Undo
  - Ungroups (groupId removed) ✅
- [ ] Undo again → B disappears

**Delete & Undo:**
- [ ] Create A, B, C → Delete B → Undo
  - B comes back ✅
- [ ] Delete A and C together → Undo
  - Both come back ✅

---

## 🎯 Demo Flow (Show Everything Works)

**Recommended demo sequence:**

1. **Upload image** (shows responsive layout)
2. **Create 3 annotations** with different tools (camera, car, rectangle)
3. **Demonstrate undo** - click undo, one disappears, click undo again
4. **Demonstrate redo** - click redo, it comes back
5. **Select one annotation** - show size slider works
6. **Drag annotation** - show movement, then undo to show it reverts
7. **Change color** - show color changes and undo works
8. **Resize browser window** - show responsive design adapts
9. **Refresh page** - show annotations persist in localStorage
10. **Export JSON** - show all data includes size property

---

## 🐛 Known Behaviors to Verify

- [ ] Undo/Redo doesn't trigger export (no JSON shown unless clicked)
- [ ] Size slider only works when selection > 0
- [ ] localStorage only stores annotations, not UI state
- [ ] When uploading new media, old annotations are cleared and history reset
- [ ] Responsive design CSS applies at breakpoints: 1200px, 960px, 760px, 480px

---

## ✨ Nice Touches

- [ ] Undo/Redo buttons have titles: "Undo (Ctrl+Z)" and "Redo (Ctrl+Y)"
- [ ] Size slider shows percentage: "75%", "100%", "150%"
- [ ] Disabled buttons are visually dimmed
- [ ] History works with all operations (create, delete, color, group, size)
- [ ] Empty state shows "No media loaded yet"
- [ ] Annotations scale smoothly with size slider

---

## 📊 Expected Results

### All Tests Should Pass ✅
- Undo/Redo works for all operations
- Size changes persist on reload
- Annotations saved to localStorage
- Responsive layout works on all screen sizes
- No TypeScript errors
- No console errors

### Performance
- Undo/Redo actions are instant
- No lag when dragging with history tracking
- Size slider smooth transition (no jank)

---

**Happy Testing! 🚀**
