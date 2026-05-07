# ⚡ 2-DAY CRASH COURSE - Interview Prep

**You only need to know 20% of concepts to answer 80% of questions.**

This skips everything not essential. Focus ONLY on this.

---

# DAY 1: Morning (2-3 hours)

## 1️⃣ JavaScript: The 5 Things You Need

**Search & watch (15-20 min total)**:
- "const vs let JavaScript" (5 min video)
- "JavaScript arrow functions" (5 min video)

**That's it. You just need to know**:

```javascript
const x = 5;        // Can't change x
let y = 5;          // Can change y (use const by default!)

const add = (a, b) => a + b;  // Arrow function - MEMORIZE THIS SYNTAX

// SPREAD OPERATOR - SUPER IMPORTANT
const arr = [1, 2, 3];
const newArr = [...arr, 4];   // [1, 2, 3, 4] - copy and add
```

**That's all. Seriously.**

---

## 2️⃣ Array Methods: The 2 You MUST Know

**Watch (10 min)**:
- "JavaScript .map() and .filter() explained" (one video)

**MEMORIZE these exact patterns**:

```javascript
// .map() - CHANGE each item
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);  // [2, 4, 6]

// .filter() - KEEP only matching items
const filtered = numbers.filter(n => n > 1);  // [2, 3]

// COMBINED - CHANGE some items (what your project does!)
const updated = numbers.map(n => {
  if (n === 2) return 99;
  return n;
});  // [1, 99, 3]
```

**That's the core of your entire annotation tool.**

---

## 3️⃣ TypeScript: The Bare Minimum

**Skip long tutorials. Just know**:

```typescript
// Type = restriction on what values allowed
type Color = "green" | "red" | "gray";
// Only these 3 values allowed!

const myColor: Color = "green"; // ✅ OK
const myColor: Color = "blue";  // ❌ ERROR!

// Object type
type Annotation = {
  id: string;
  x: number;
  y: number;
  color: Color;
};
```

**Understand one thing**: Types are just rules preventing mistakes.

---

# DAY 1: Afternoon (2-3 hours)

## 4️⃣ React Basics: What You MUST Understand

**Watch (20 min)**:
- "React components explained" - just first 10 min
- "React useState hook" - 10 min

**Know these cold**:

```typescript
// COMPONENT = function that returns HTML
function MyButton() {
  return <button>Click me</button>;
}

// STATE = component's memory
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);  // Start at 0
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

// PROPS = inputs to component
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}

// Use it:
<Greeting name="John" />
```

**That's React in a nutshell.**

---

## 5️⃣ Rendering Lists (CRITICAL for your project)

**Watch (5 min)**:
- "React rendering lists with .map()"

**Memorize this pattern**:

```jsx
const items = [
  { id: "1", name: "Camera" },
  { id: "2", name: "Car" },
];

function ItemList() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Key**: `key={item.id}` is CRITICAL - tells React which item is which

---

# DAY 1: Night (1 hour)

## 6️⃣ Your Project Code - Line by Line

**READ ONLY these 2 files** (don't memorize, just UNDERSTAND):

### Read: `src/types.ts`

```typescript
export type Annotation = {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  color: AnnotationColor;
  groupId: string | null;
};
```

**Understand**: This defines the shape of ONE annotation. Every annotation has these 6 properties.

---

### Read: First 120 lines of `App.tsx`

**Focus on these sections ONLY**:

```typescript
// LINE 24-33: STATE VARIABLES
const [mediaUrl, setMediaUrl] = useState<string | null>(null);
const [annotations, setAnnotations] = useState<Annotation[]>([]);
const [selectedIds, setSelectedIds] = useState<string[]>([]);
```

**Understand**: 
- `mediaUrl` stores the image/video
- `annotations` is the array of all annotations (like [Annotation, Annotation, ...])
- `selectedIds` stores which ones are selected

---

```typescript
// LINE 65-90: CREATE ANNOTATION
function handleMediaUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  const url = URL.createObjectURL(file);
  setMediaUrl(url);  // Show the image
  setAnnotations([]);  // Clear old annotations
}
```

**Understand**: When user uploads, we store the URL and reset annotations.

---

```typescript
// LINE 92-119: CLICK TO CREATE
function handleWorkspaceClick(event: React.MouseEvent<HTMLDivElement>) {
  if (!mediaUrl) return;

  const newAnnotation: Annotation = {
    id: createId(),
    type: activeTool,  // camera, car, etc.
    x: event.clientX - rect.left,  // Position on canvas
    y: event.clientY - rect.top,
    color: "green",
    groupId: null,
  };

  setAnnotations([...annotations, newAnnotation]);  // ADD to list
}
```

**Understand**: 
1. Create object with all annotation properties
2. Use spread operator to copy array and add new annotation
3. This is THE CORE of your app

---

```typescript
// LINE 227-245: CHANGE COLOR
function changeSelectedColor(color: AnnotationColor) {
  setAnnotations((currentAnnotations) =>
    currentAnnotations.map((item) => {
      if (!idsToChange.includes(item.id)) {
        return item;  // Don't change this one
      }
      return { ...item, color };  // Change this one
    })
  );
}
```

**Understand**: This is the `.map()` pattern!
- Loop through annotations
- If it's selected, copy it but change color
- If not selected, return unchanged

---

```typescript
// LINE 247-271: GROUPING
function groupSelected() {
  const groupId = createId();
  setAnnotations((currentAnnotations) =>
    currentAnnotations.map((item) => {
      if (!idsToGroup.includes(item.id)) {
        return item;
      }
      return { ...item, groupId };  // Add group ID
    })
  );
}
```

**Understand**: Same pattern. Mark selected items with same groupId so they move together.

---

**THAT'S IT FOR DAY 1.** Don't read more. You have enough.

---

# DAY 2: Morning (1 hour)

## Review & Practice Explaining

**Talk out loud** (seriously!):

1. "Show me your `types.ts` file - what does Annotation look like?"
   - Answer: "It has 6 properties: id, type, x, y, color, groupId"

2. "How does a user create an annotation?"
   - Answer: "They click canvas → handleWorkspaceClick creates new Annotation object → we use spread operator to add it to annotations array → component re-renders"

3. "How does color change work?"
   - Answer: "User clicks color button → changeSelectedColor → we .map() over annotations → for selected ones, we return {...item, color: newColor} → rest unchanged"

4. "How does grouping work?"
   - Answer: "Select multiple items → give them same groupId → now when you click one, all with same groupId get selected"

5. "What's the spread operator and why use it?"
   - Answer: "const newArr = [...oldArr, newItem] creates a copy and adds item. We use it because React needs new reference to know something changed"

---

# DAY 2: Afternoon (2 hours)

## Practice Building Something Simple From Scratch

**Build a "Simple Color Box Selector" (mimics annotation tool)**

```typescript
// This is similar to annotation tool but simpler
import { useState } from "react";

type Box = {
  id: string;
  color: "red" | "green" | "blue";
};

function BoxApp() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function addBox() {
    const newBox: Box = {
      id: Date.now().toString(),
      color: "red",
    };
    setBoxes([...boxes, newBox]);  // ← SAME PATTERN AS ANNOTATION TOOL
  }

  function changeColor(newColor: Box["color"]) {
    setBoxes(
      boxes.map((box) => {
        if (box.id === selectedId) {
          return { ...box, color: newColor };  // ← SAME PATTERN
        }
        return box;
      })
    );
  }

  return (
    <div>
      <button onClick={addBox}>Add Box</button>
      
      <div>
        {boxes.map((box) => (  // ← SAME PATTERN
          <div
            key={box.id}
            style={{ background: box.color, width: 50, height: 50 }}
            onClick={() => setSelectedId(box.id)}
          />
        ))}
      </div>

      {selectedId && (
        <div>
          <button onClick={() => changeColor("red")}>Red</button>
          <button onClick={() => changeColor("green")}>Green</button>
          <button onClick={() => changeColor("blue")}>Blue</button>
        </div>
      )}
    </div>
  );
}
```

**Build this and run it** (copy into your project, test it works)

**Then explain to yourself**: "This is basically a simplified annotation tool. Instead of annotations on canvas, we have boxes in a list. Instead of moving them, we change colors. But the patterns are IDENTICAL."

---

# DAY 2: Evening (1 hour before bed)

## Mock Interview Practice

**Have someone ask you these (or ask yourself)**:

### EASY Questions (You should answer instantly):

1. "What's a React component?"
   - Answer: "A function that returns HTML/JSX"

2. "What's state?"
   - Answer: "Component's memory. Changes with setState cause re-render"

3. "What's a prop?"
   - Answer: "Data passed from parent to child component"

4. "What's the spread operator?"
   - Answer: "... copies array or object"

---

### MEDIUM Questions (You should know cold):

5. "Walk me through how annotations get created in your project"
   - Answer: Talk through handleWorkspaceClick function

6. "How does color change work?"
   - Answer: Talk through changeSelectedColor using .map()

7. "What's the difference between state and props?"
   - Answer: Props come from parent (read-only), state is component's own memory (can change)

8. "Why use .map() to update annotations instead of mutating?"
   - Answer: React needs new reference to know it changed

---

### HARD Questions (Can you figure out the answer?):

9. "How would you add an undo button?"
   - Hint: Keep array of previous states, go back when clicked

10. "How would you persist annotations when user reloads page?"
    - Hint: Save to localStorage on every change

---

# LAST RESORT: 30 Minutes Before Interview

If you're nervous, **reread ONLY these lines**:

**File: App.tsx**
- Lines 15-21: createId function
- Lines 24-33: State variables (MEMORIZE THESE)
- Lines 92-119: handleWorkspaceClick (THE CORE)
- Lines 227-245: changeSelectedColor (THE PATTERN)
- Lines 247-271: groupSelected (SAME PATTERN)

**File: src/types.ts**
- Lines 14-21: Annotation type definition

**That's 50 lines of code. You can read in 5 minutes.**

---

# Interview Talking Points

When they ask "Tell me about your project":

**Say this**:

> "I built a React annotation tool. Users can upload images or videos, then click to place annotations like cameras, cars, etc. or draw shapes like rectangles and circles. 
>
> The core is state management - I have an `annotations` array that stores all annotations with properties like id, position, color, type, and groupId for grouping.
>
> When user clicks canvas, I create a new Annotation object and add it using the spread operator: `[...annotations, newAnnotation]`. 
>
> To change color or group items, I use `.map()` to loop through the array - if the annotation matches, I return a modified copy using spread operator, otherwise return unchanged.
>
> The interesting parts were handling multiple selections, implementing grouping so items move together, and managing drag state to track mouse position for smooth dragging.
>
> Key learnings: state management, why you can't mutate state directly, the spread operator, and .map() pattern for updating arrays immutably."

**That's literally all you need to say.**

---

# Emergency Cheat Sheet

**If your mind goes blank**:

```javascript
// SPREAD OPERATOR - Copy and add/change
const arr = [1, 2, 3];
const newArr = [...arr, 4];           // Add
const changed = arr.map(x => x === 2 ? 99 : x);  // Change

// COMPONENT - Function returning JSX
function MyComponent(props) {
  return <div>{props.name}</div>;
}

// STATE - Memory
const [count, setCount] = useState(0);
setCount(count + 1);

// PROPS - Input
<MyComponent name="John" color="red" />

// RENDERING LIST - .map()
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// TYPES - Restrictions
type Color = "red" | "green" | "blue";
```

Print this out. Have it with you.

---

# Final Checklist

- [ ] Watch "const vs let" (5 min)
- [ ] Watch "arrow functions" (5 min)
- [ ] Watch ".map() and .filter()" (10 min)
- [ ] Watch "React useState" (10 min)
- [ ] Read types.ts
- [ ] Read first 120 lines of App.tsx
- [ ] Explain out loud (color change, annotation creation, grouping)
- [ ] Build the "Box App" and test it
- [ ] Answer mock interview questions
- [ ] Print cheat sheet

**You can do this. Focus on what matters.**

Good luck! 💪
