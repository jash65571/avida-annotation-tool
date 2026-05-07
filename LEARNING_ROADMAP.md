# 📚 Complete Learning Roadmap for Interview Prep

This guide breaks down **everything** you need to learn to understand and build the annotation tool from scratch.

---

# PHASE 1: JavaScript Fundamentals
*Foundation - You MUST know this*

## 1.1 Variables & Constants
**Search for**: "JavaScript const vs let vs var"

**What to learn**:
- [ ] What is `const` and why use it by default
- [ ] What is `let` and when to use instead of `const`
- [ ] The difference between reassignment and mutation
- [ ] Why `const arr = []` can still modify the array

**Example in your project**:
```javascript
const [annotations, setAnnotations] = useState([]); // const - can't reassign
// But we CAN change what's inside with setAnnotations()
```

**Key insight**: `const` doesn't mean "unchangeable", it means "can't be reassigned"

---

## 1.2 Functions - The Basics
**Search for**: "JavaScript functions explained" AND "arrow functions in JavaScript"

**What to learn**:
- [ ] How to write regular functions: `function name() {}`
- [ ] How to write arrow functions: `const name = () => {}`
- [ ] Parameters and arguments
- [ ] Return statement
- [ ] Implicit return (one-liner arrow functions)

**Example in your project** (`App.tsx`):
```javascript
// Regular function
function createId() {
  return crypto.randomUUID();
}

// Arrow function (same thing)
const createId = () => crypto.randomUUID();
```

**Practice**: Write a function that takes a name and returns "Hello [name]"

---

## 1.3 Objects & Arrays
**Search for**: "JavaScript objects" AND "JavaScript arrays"

**What to learn**:
- [ ] Creating objects: `{ name: "John", age: 30 }`
- [ ] Accessing properties: `obj.name` or `obj["name"]`
- [ ] Creating arrays: `[1, 2, 3]`
- [ ] Array methods: `.map()`, `.filter()`, `.find()`, `.includes()`
- [ ] Spread operator: `...` (copying/merging)

**Example in your project**:
```typescript
const annotation = {
  id: "123",
  type: "camera",
  x: 100,
  y: 200,
  color: "green",
  groupId: null,
};

// Spread operator - copy and modify
const updatedAnnotation = {
  ...annotation,
  color: "red", // Override color
};
```

**Practice**: Create an array of 3 objects, use `.map()` to extract one property

---

## 1.4 Array Methods (CRITICAL!)
**Search for**: "JavaScript array methods map filter find includes"

**What to learn**:
- [ ] `.map()` - transform each item
- [ ] `.filter()` - keep only items that match
- [ ] `.find()` - get first item that matches
- [ ] `.includes()` - check if item exists
- [ ] `.forEach()` - loop through items

**Why this is CRITICAL for your project**:
Your entire app uses these to update annotations!

**Examples in your project**:
```typescript
// Find one annotation
const annotation = annotations.find(item => item.id === "123");

// Filter annotations
const selected = annotations.filter(item => 
  selectedIds.includes(item.id)
);

// Transform all annotations
const updatedAnnotations = annotations.map(item => {
  if (item.id === "123") {
    return { ...item, color: "red" };
  }
  return item;
});
```

**Practice**: Given array of users, use `.filter()` to find all "active" users

---

## 1.5 Template Literals & String Interpolation
**Search for**: "JavaScript template literals backticks"

**What to learn**:
- [ ] Using backticks: `` `text ${variable} text` ``
- [ ] Why it's better than `"text " + variable + " text"`

**Example in your project**:
```javascript
return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
// Output: "id-1234567890-abc123def"
```

**Practice**: Create greeting string with name and age variables

---

## 1.6 Event Handling Basics
**Search for**: "JavaScript event handling click events"

**What to learn**:
- [ ] What are events (click, hover, submit, etc.)
- [ ] Event handlers: `onClick`, `onChange`, `onSubmit`
- [ ] `event.target` (what was clicked)
- [ ] `event.preventDefault()`
- [ ] `event.stopPropagation()`

**Example in your project**:
```javascript
function handleMediaUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]; // Get the file from input
}

function handleWorkspaceClick(event: React.MouseEvent<HTMLDivElement>) {
  const x = event.clientX; // Get mouse position
}
```

**Practice**: Create a button with onClick that logs "clicked"

---

## 1.7 Conditional Logic (if/else, ternary)
**Search for**: "JavaScript if else statements" AND "JavaScript ternary operator"

**What to learn**:
- [ ] `if`, `else if`, `else` statements
- [ ] Comparison operators: `===`, `!==`, `<`, `>`, `&&`, `||`
- [ ] Ternary operator: `condition ? true : false`

**Example in your project**:
```typescript
// if/else
const isImage = file.type.startsWith("image/");
if (!isImage && !isVideo) {
  alert("Please upload valid file");
  return;
}

// ternary
const mediaKind = isVideo ? "video" : "image";

// conditional rendering
{annotation.type === "rectangle" ? (
  <div className="rectangle" />
) : (
  <div className="circle" />
)}
```

**Practice**: Write logic to check if age is 18+, return "Adult" or "Minor"

---

# PHASE 2: TypeScript Basics
*Type Safety - Makes your code more reliable*

## 2.1 Basic Types
**Search for**: "TypeScript basic types" AND "TypeScript type annotations"

**What to learn**:
- [ ] `string`, `number`, `boolean` types
- [ ] `any` type (avoid using this!)
- [ ] Optional types with `?`
- [ ] Type annotations: `: string`, `: number`

**Example in your project**:
```typescript
function addNumbers(a: number, b: number): number {
  return a + b;
}

const mediaKind: string = "video";
const count: number = 5;
const isPlaying: boolean = true;
```

**Key difference from JavaScript**:
- JavaScript: `function add(a, b) { return a + b; }`
- TypeScript: `function add(a: number, b: number): number { return a + b; }`

---

## 2.2 Union Types
**Search for**: "TypeScript union types"

**What to learn**:
- [ ] Union types: `type X = "a" | "b" | "c"`
- [ ] How it restricts valid values

**Example in your project**:
```typescript
// This type can ONLY be one of these 3 colors
type AnnotationColor = "green" | "red" | "gray";

// This type can ONLY be one of these tools
type AnnotationType = 
  | "camera"
  | "car"
  | "person"
  | "tree"
  | "rectangle"
  | "circle"
  | "line";

const color: AnnotationColor = "green"; // ✅ OK
const color: AnnotationColor = "blue";  // ❌ ERROR!
```

---

## 2.3 Interfaces & Types
**Search for**: "TypeScript interfaces" AND "TypeScript type vs interface"

**What to learn**:
- [ ] `interface` - defines shape of an object
- [ ] `type` - can be more flexible
- [ ] Properties and their types
- [ ] Optional properties with `?`

**Example in your project**:
```typescript
// Define what an Annotation looks like
type Annotation = {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  color: AnnotationColor;
  groupId: string | null;
};

// Now you can use it:
const myAnnotation: Annotation = {
  id: "123",
  type: "camera",
  x: 100,
  y: 200,
  color: "green",
  groupId: null,
};
```

---

## 2.4 Function Types
**Search for**: "TypeScript function types"

**What to learn**:
- [ ] Typing function parameters
- [ ] Typing return values
- [ ] Function types as variables

**Example in your project**:
```typescript
// Function with typed parameters and return
function handleSelectAnnotation(
  event: React.MouseEvent<HTMLDivElement>,
  annotationId: string
): void {
  console.log(annotationId);
}

// Type for a callback function
type OnSelectCallback = (
  event: React.MouseEvent<HTMLDivElement>,
  annotationId: string
) => void;
```

---

# PHASE 3: React Fundamentals
*How to build interactive UIs*

## 3.1 JSX - Writing HTML in JavaScript
**Search for**: "React JSX explained" AND "JSX syntax"

**What to learn**:
- [ ] What is JSX (`<div>Hello</div>` in JavaScript)
- [ ] JSX is not HTML - it's syntax sugar for function calls
- [ ] Curly braces `{}` for JavaScript inside JSX
- [ ] Class names in JSX (`className` not `class`)
- [ ] Self-closing tags

**Example in your project**:
```jsx
// This JSX:
<div className="annotation">
  <i className={iconClass} />
</div>

// Gets compiled to:
React.createElement("div", { className: "annotation" },
  React.createElement("i", { className: iconClass })
)
```

**Key rules**:
- Use `className` instead of `class`
- Use `{}` for variables: `<div>{name}</div>`
- Return only one root element or wrap in fragment `<>`

---

## 3.2 Components - The Building Blocks
**Search for**: "React components explained" AND "React functional components"

**What to learn**:
- [ ] Components are functions that return JSX
- [ ] Component names must start with capital letter
- [ ] How to structure a component
- [ ] Default exports vs named exports

**Example in your project**:
```typescript
// A component
function Toolbar(props: ToolbarProps) {
  return (
    <section className="tool-panel">
      {/* JSX goes here */}
    </section>
  );
}

export default Toolbar;
```

**In your project**: You have 6 components
- `App.tsx` - main component
- `Toolbar.tsx` - tools and buttons
- `Workspace.tsx` - canvas
- `AnnotationItem.tsx` - individual annotation
- `StatusRow.tsx` - info display
- `ExportPanel.tsx` - JSON output

---

## 3.3 Props - Component Communication
**Search for**: "React props explained" AND "prop drilling"

**What to learn**:
- [ ] Props are inputs to components
- [ ] How to pass props: `<Component name="John" />`
- [ ] How to receive props: `function Component(props) {}`
- [ ] Destructuring props: `function Component({ name }) {}`
- [ ] Props are read-only

**Example in your project**:
```typescript
// Parent passing props
<Toolbar
  activeTool={activeTool}
  selectedCount={selectedIds.length}
  onToolChange={setActiveTool}
/>

// Child receiving props
function Toolbar({ activeTool, selectedCount, onToolChange }: ToolbarProps) {
  return (
    <button onClick={() => onToolChange("camera")}>
      Camera
    </button>
  );
}
```

**Key concept**: Props are how parent components talk to children

---

## 3.4 State with `useState` Hook
**Search for**: "React useState hook explained"

**This is CRITICAL for understanding your project!**

**What to learn**:
- [ ] What is state (component's memory)
- [ ] How `useState` works
- [ ] Updating state with setter function
- [ ] Why you can't mutate state directly
- [ ] State triggers re-render

**Example in your project**:
```typescript
const [annotations, setAnnotations] = useState<Annotation[]>([]);
const [activeTool, setActiveTool] = useState<AnnotationType>("camera");
const [selectedIds, setSelectedIds] = useState<string[]>([]);

// Update state
setAnnotations([...annotations, newAnnotation]); // Add to list
setActiveTool("car"); // Change tool
setSelectedIds(["id1", "id2"]); // Change selection
```

**Critical rule**: Never mutate state directly!
```javascript
// ❌ WRONG - mutating state
annotations.push(newAnnotation);
selectedIds.push("newId");

// ✅ RIGHT - creating new state
setAnnotations([...annotations, newAnnotation]);
setSelectedIds([...selectedIds, "newId"]);
```

**Why?** React only re-renders if state reference changes

---

## 3.5 Conditional Rendering
**Search for**: "React conditional rendering"

**What to learn**:
- [ ] `&&` operator for conditional render
- [ ] Ternary operator: `condition ? true : false`
- [ ] `if` statements inside render

**Example in your project**:
```jsx
// Show/hide based on condition
{!mediaUrl && (
  <div className="empty-state">
    <h2>No media loaded</h2>
  </div>
)}

{mediaUrl && mediaKind === "video" && (
  <button onClick={togglePlayback}>
    {isVideoPlaying ? "Pause" : "Play"}
  </button>
)}
```

---

## 3.6 Rendering Lists
**Search for**: "React rendering lists" AND "React key prop"

**What to learn**:
- [ ] `.map()` to render arrays
- [ ] The `key` prop (IMPORTANT!)
- [ ] Why keys matter for performance

**Example in your project**:
```jsx
// Render all annotations
{annotations.map((annotation) => (
  <AnnotationItem
    key={annotation.id}  // ← CRITICAL!
    annotation={annotation}
    isSelected={selectedIds.includes(annotation.id)}
  />
))}
```

**Key concept**: `key` helps React identify which items changed

---

## 3.7 Event Handling in React
**Search for**: "React event handling" AND "React onClick"

**What to learn**:
- [ ] `onClick`, `onChange`, `onSubmit` handlers
- [ ] Passing arguments to handlers
- [ ] Arrow functions in handlers
- [ ] `event` object

**Example in your project**:
```jsx
<button onClick={() => onToolChange("camera")}>
  Camera
</button>

<input onChange={(event) => handleMediaUpload(event)} />

<div onClick={(event) => handleWorkspaceClick(event)}>
  Canvas
</div>
```

---

## 3.8 Forms in React
**Search for**: "React forms" AND "React controlled components"

**What to learn**:
- [ ] Controlled vs uncontrolled inputs
- [ ] `onChange` handler
- [ ] File input handling

**Example in your project**:
```jsx
<input
  type="file"
  accept="image/*,video/*"
  onChange={handleMediaUpload}
/>
```

---

## 3.9 useEffect Hook
**Search for**: "React useEffect hook explained"

**What to learn**:
- [ ] What is `useEffect` (side effects)
- [ ] When code runs (render, mount, unmount)
- [ ] Dependency array `[]`
- [ ] Cleanup function

**Example in your project**:
```typescript
useEffect(() => {
  return () => {
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl); // Cleanup
    }
  };
}, [mediaUrl]);
```

**Key rule**: Clean up resources when component unmounts

---

## 3.10 Refs with `useRef`
**Search for**: "React useRef hook explained"

**What to learn**:
- [ ] What is a ref (reference to DOM element)
- [ ] Why you need refs
- [ ] Accessing DOM directly

**Example in your project**:
```typescript
const videoRef = useRef<HTMLVideoElement | null>(null);

// Later, access the video element
<video ref={videoRef} src={mediaUrl} />

videoRef.current?.play(); // Play video
```

---

# PHASE 4: Understanding Your Project's Architecture

## 4.1 Data Flow Overview
**Read this first**: How data moves through your app

```
User uploads image
  ↓
handleMediaUpload() sets mediaUrl state
  ↓
App re-renders with mediaUrl
  ↓
Workspace component receives mediaUrl as prop
  ↓
Workspace displays the image
```

---

## 4.2 Key State Variables in App.tsx
**Search for**: "React state management"

| State Variable | What It Stores | Used By |
|---|---|---|
| `mediaUrl` | URL of uploaded image/video | Workspace |
| `mediaKind` | "image" or "video" | Toolbar, Workspace |
| `activeTool` | Selected tool ("camera", "car", etc.) | Toolbar, Workspace |
| `annotations` | Array of all annotations | Workspace, AnnotationItem |
| `selectedIds` | IDs of selected annotations | Toolbar, Workspace |
| `dragState` | Info about current drag operation | Workspace |
| `isVideoPlaying` | Is video playing? | Toolbar |

---

## 4.3 How Annotations Work
**Read the flow**:

1. **Create**: User clicks canvas
   ```typescript
   // handleWorkspaceClick creates new annotation
   const newAnnotation = {
     id: createId(),
     type: activeTool,
     x: event.clientX - rect.left,
     y: event.clientY - rect.top,
     color: "green",
     groupId: null,
   };
   setAnnotations([...annotations, newAnnotation]);
   ```

2. **Render**: Map over annotations array
   ```jsx
   {annotations.map((annotation) => (
     <AnnotationItem key={annotation.id} annotation={annotation} />
   ))}
   ```

3. **Update**: AnnotationItem renders based on type
   ```typescript
   if (annotation.type === "rectangle") {
     return <div className="rectangle" style={style} />;
   }
   ```

4. **Modify**: Change color, position, group, etc.
   ```typescript
   setAnnotations(currentAnnotations =>
     currentAnnotations.map(item => {
       if (item.id === selectedId) {
         return { ...item, color: "red" };
       }
       return item;
     })
   );
   ```

---

## 4.4 Selection and Grouping Logic
**How multi-select works**:

```typescript
// Single click: select one (or its group)
selectedIds = [annotationId];

// Shift+click: toggle selection
if (allAlreadySelected) {
  remove from selectedIds;
} else {
  add to selectedIds;
}

// Group: add groupId to all selected
annotations.forEach(ann => {
  if (selectedIds.includes(ann.id)) {
    ann.groupId = groupId;
  }
});
```

---

## 4.5 Drag and Drop Logic
**How dragging works**:

```
1. User presses down on annotation
   → Save start position and mouse position

2. User moves mouse
   → Calculate delta (how far moved)
   → Update annotation position: newPos = oldPos + delta

3. User releases mouse
   → Clear drag state
```

---

# PHASE 5: Simple Practice Projects

## Practice 1: Todo List App
**Build without copying your annotation tool**

**Features**:
- [ ] Input field to add todos
- [ ] Display list of todos
- [ ] Mark todo as complete (strikethrough)
- [ ] Delete todo button

**Concepts you'll practice**:
- State management
- Rendering lists
- Event handlers
- Conditional rendering

**Steps**:
1. Create `function TodoApp()`
2. Add state: `const [todos, setTodos] = useState([])`
3. Create input with onChange handler
4. Map over todos to render list
5. Add delete button

---

## Practice 2: Simple Counter with Color
**Build to practice state and conditionals**

**Features**:
- [ ] Display count
- [ ] +1 and -1 buttons
- [ ] Color changes: green (positive), gray (zero), red (negative)

**Concepts you'll practice**:
- State
- Conditional rendering
- Styling based on state

---

## Practice 3: Mini Image Annotation Tool
**Build to practice everything**

**Features**:
- [ ] Upload image
- [ ] Click to place red dots
- [ ] Drag dots around
- [ ] Delete dot button
- [ ] Show total count

**Concepts you'll practice**:
- All of the above
- Event coordinates
- Array mapping
- State updates

---

# Interview Prep Checklist

## Before Your Interview, You Should Understand:

- [ ] What `const` is and why to use it
- [ ] How functions work (regular and arrow)
- [ ] Array methods: `.map()`, `.filter()`, `.find()`
- [ ] What TypeScript types are
- [ ] What JSX is
- [ ] Components are functions
- [ ] Props are inputs to components
- [ ] `useState` hook and why state matters
- [ ] How to render lists
- [ ] Event handling in React
- [ ] How your annotation tool creates annotations
- [ ] How grouping works
- [ ] How dragging works
- [ ] How color/state changes work
- [ ] Be able to build a simple Todo app from scratch

## Questions They'll Likely Ask:

1. "Walk me through how an annotation gets created when user clicks"
2. "Why do we use spread operator `...` instead of direct mutation?"
3. "Explain how grouping works - what changes in the data?"
4. "How does drag and drop work? What state changes?"
5. "Why is the `key` prop important when rendering lists?"
6. "What's the difference between passing data with props vs state?"
7. "How would you add an 'undo' feature?"
8. "Explain the flow from user clicking tool button to it being active"

---

# Resources to Watch/Read

## Videos:
- [ ] "JavaScript Fundamentals for Beginners" - Web Dev Simplified
- [ ] "Learn React in 30 Minutes" - Web Dev Simplified
- [ ] "React Hooks Explained" - Traversy Media
- [ ] "TypeScript Tutorial" - Academind

## Documentation:
- [ ] https://javascript.info/ - JavaScript guide
- [ ] https://react.dev/ - Official React docs (use new version!)
- [ ] https://www.typescriptlang.org/docs/ - TypeScript docs

## Practice:
- [ ] Build the 3 practice projects above
- [ ] Try building annotation tool WITHOUT looking at code
- [ ] Explain each line of code to yourself

---

# Quick Reference: Your Project's Key Files

## App.tsx (Main Logic)
- State management (23 lines of state variables)
- Event handlers (click, drag, select, color, group, etc.)
- Passes everything to child components

## Workspace.tsx (Canvas)
- Receives media and annotations as props
- Renders image/video
- Maps over annotations to render each one

## AnnotationItem.tsx (Individual Item)
- Receives one annotation
- Renders it as icon or shape based on type
- Applies color styling

## Toolbar.tsx (Controls)
- Buttons to change tool
- Buttons to change color
- Buttons for actions (group, delete, export)

## types.ts (Definitions)
- Defines all TypeScript types
- Color map (string to hex color)

---

**Good luck with your interview! Remember: understanding is more important than memorizing code.**
