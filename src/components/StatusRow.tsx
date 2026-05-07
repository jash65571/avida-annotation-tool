import type { AnnotationType } from "../types";

type StatusRowProps = {
  activeTool: AnnotationType;
  selectedCount: number;
  totalAnnotations: number;
};

function StatusRow({
  activeTool,
  selectedCount,
  totalAnnotations,
}: StatusRowProps) {
  return (
    <section className="status-row">
      <p>
        Active tool: <strong>{activeTool}</strong>
      </p>
      <p>
        Selected: <strong>{selectedCount}</strong>
      </p>
      <p>
        Total annotations: <strong>{totalAnnotations}</strong>
      </p>
      <p className="hint">
        Tip: click to place, drag to move, shift-click for multi-select.
      </p>
    </section>
  );
}

export default StatusRow;