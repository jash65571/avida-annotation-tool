import type { Annotation } from "../types";
import { colorMap } from "../types";

type AnnotationItemProps = {
  annotation: Annotation;
  isSelected: boolean;
  onSelect: (
    event: React.MouseEvent<HTMLDivElement>,
    annotationId: string
  ) => void;
  onPointerDown: (
    event: React.PointerEvent<HTMLDivElement>,
    annotation: Annotation
  ) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
};

const iconMap: Record<string, string> = {
  camera: "fa-solid fa-camera",
  car: "fa-solid fa-car",
  person: "fa-solid fa-user",
  tree: "fa-solid fa-tree",
};

function AnnotationItem({
  annotation,
  isSelected,
  onSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: AnnotationItemProps) {
  const color = colorMap[annotation.color];
  const size = annotation.size || 1;

  const sharedStyle = {
    left: annotation.x,
    top: annotation.y,
    color,
    borderColor: color,
    backgroundColor:
      annotation.type === "rectangle" || annotation.type === "circle"
        ? `${color}22`
        : "transparent",
    transform: `translate(-50%, -50%) scale(${size})`,
  };

  const commonProps = {
    onClick: (event: React.MouseEvent<HTMLDivElement>) =>
      onSelect(event, annotation.id),
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) =>
      onPointerDown(event, annotation),
    onPointerMove,
    onPointerUp,
  };

  if (annotation.type === "rectangle") {
    return (
      <div
        className={`annotation rectangle ${isSelected ? "selected" : ""}`}
        style={sharedStyle}
        {...commonProps}
      />
    );
  }

  if (annotation.type === "circle") {
    return (
      <div
        className={`annotation circle ${isSelected ? "selected" : ""}`}
        style={sharedStyle}
        {...commonProps}
      />
    );
  }

  if (annotation.type === "line") {
    return (
      <div
        className={`annotation line ${isSelected ? "selected" : ""}`}
        style={{
          ...sharedStyle,
          backgroundColor: color,
          transform: `translate(-50%, -50%) rotate(-20deg) scale(${size})`,
        }}
        {...commonProps}
      />
    );
  }

  return (
    <div
      className={`annotation icon ${isSelected ? "selected" : ""}`}
      style={sharedStyle}
      {...commonProps}
    >
      <i className={iconMap[annotation.type]} />
    </div>
  );
}

export default AnnotationItem;