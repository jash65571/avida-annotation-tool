export type MediaKind = "image" | "video" | null;

export type AnnotationType =
  | "camera"
  | "car"
  | "person"
  | "tree"
  | "rectangle"
  | "circle"
  | "line";

export type AnnotationColor = "green" | "red" | "gray";

export type Annotation = {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  color: AnnotationColor;
  groupId: string | null;
  size: number;
};

export type DragState = {
  id: string;
  startPointerX: number;
  startPointerY: number;
  startPositions: Record<string, { x: number; y: number }>;
} | null;

export const colorMap: Record<AnnotationColor, string> = {
  green: "#22c55e",
  red: "#ef4444",
  gray: "#94a3b8",
};