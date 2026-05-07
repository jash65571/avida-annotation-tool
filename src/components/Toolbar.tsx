import type {
  AnnotationColor,
  AnnotationType,
  MediaKind,
} from "../types";

type ToolbarProps = {
  activeTool: AnnotationType;
  mediaKind: MediaKind;
  selectedCount: number;
  canGroup: boolean;
  isVideoPlaying: boolean;
  annotationSize: number;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: AnnotationType) => void;
  onMediaUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (color: AnnotationColor) => void;
  onSizeChange: (size: number) => void;
  onGroupSelected: () => void;
  onUngroupSelected: () => void;
  onDeleteSelected: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onToggleVideoPlayback: () => void;
};

const tools: Array<{
  type: AnnotationType;
  label: string;
  iconClass?: string;
}> = [
  { type: "camera", label: "Camera", iconClass: "fa-solid fa-camera" },
  { type: "car", label: "Car", iconClass: "fa-solid fa-car" },
  { type: "person", label: "Person", iconClass: "fa-solid fa-user" },
  { type: "tree", label: "Tree", iconClass: "fa-solid fa-tree" },
  { type: "rectangle", label: "Rectangle" },
  { type: "circle", label: "Circle" },
  { type: "line", label: "Line" },
];

function Toolbar({
  activeTool,
  mediaKind,
  selectedCount,
  canGroup,
  isVideoPlaying,
  annotationSize,
  canUndo,
  canRedo,
  onToolChange,
  onMediaUpload,
  onColorChange,
  onSizeChange,
  onGroupSelected,
  onUngroupSelected,
  onDeleteSelected,
  onUndo,
  onRedo,
  onExport,
  onToggleVideoPlayback,
}: ToolbarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <section className="tool-panel">
      <div className="tool-group">
        <span>Tools</span>

        {tools.map((tool) => (
          <button
            key={tool.type}
            className={activeTool === tool.type ? "active" : ""}
            onClick={() => onToolChange(tool.type)}
          >
            {tool.iconClass && <i className={tool.iconClass} />}
            {tool.label}
          </button>
        ))}
      </div>

      <div className="tool-group">
        <span>Color state</span>
        <button
          disabled={!hasSelection}
          onClick={() => onColorChange("green")}
        >
          Green
        </button>
        <button disabled={!hasSelection} onClick={() => onColorChange("red")}>
          Red
        </button>
        <button disabled={!hasSelection} onClick={() => onColorChange("gray")}>
          Gray
        </button>
      </div>

      <div className="tool-group">
        <span>Actions</span>
        <button disabled={!canGroup} onClick={onGroupSelected}>
          Group
        </button>
        <button disabled={!hasSelection} onClick={onUngroupSelected}>
          Ungroup
        </button>
        <button disabled={!hasSelection} onClick={onDeleteSelected}>
          Delete
        </button>
        <button onClick={onExport}>Export JSON</button>
      </div>

      <div className="tool-group">
        <span>Size</span>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={annotationSize}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          disabled={!hasSelection}
          title="Adjust size of selected annotations"
          style={{ width: "100%" }}
        />
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
          {(annotationSize * 100).toFixed(0)}%
        </span>
      </div>

      <div className="tool-group">
        <span>History</span>
        <button disabled={!canUndo} onClick={onUndo} title="Undo (Ctrl+Z)">
          ↶ Undo
        </button>
        <button disabled={!canRedo} onClick={onRedo} title="Redo (Ctrl+Y)">
          ↷ Redo
        </button>
      </div>

      <div className="tool-group">
        <span>Media</span>
        <label className="upload-button">
          Upload image/video
          <input
            type="file"
            accept="image/*,video/*"
            onChange={onMediaUpload}
          />
        </label>

        {mediaKind === "video" && (
          <button onClick={onToggleVideoPlayback}>
            {isVideoPlaying ? "Pause Video" : "Play Video"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Toolbar;