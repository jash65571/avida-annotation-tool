import type { RefObject } from "react";
import type { Annotation, MediaKind } from "../types";
import AnnotationItem from "./AnnotationItem";

type WorkspaceProps = {
  mediaUrl: string | null;
  mediaKind: MediaKind;
  videoRef: RefObject<HTMLVideoElement | null>;
  annotations: Annotation[];
  selectedIds: string[];
  onWorkspaceClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onSelectAnnotation: (
    event: React.MouseEvent<HTMLDivElement>,
    annotationId: string
  ) => void;
  onPointerDown: (
    event: React.PointerEvent<HTMLDivElement>,
    annotation: Annotation
  ) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onVideoPlay: () => void;
  onVideoPause: () => void;
};

function Workspace({
  mediaUrl,
  mediaKind,
  videoRef,
  annotations,
  selectedIds,
  onWorkspaceClick,
  onSelectAnnotation,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onVideoPlay,
  onVideoPause,
}: WorkspaceProps) {
  return (
    <section className="workspace">
      {!mediaUrl && (
        <div className="empty-state">
          <h2>No media loaded yet</h2>
          <p>Upload an image or video to begin.</p>
        </div>
      )}

      {mediaUrl && (
        <>
          <div className="media-layer">
            {mediaKind === "image" && (
              <img
                src={mediaUrl}
                alt="Uploaded media"
                className="media-preview"
              />
            )}

            {mediaKind === "video" && (
              <video
                ref={videoRef}
                src={mediaUrl}
                className="media-preview"
                onPlay={onVideoPlay}
                onPause={onVideoPause}
              />
            )}
          </div>

          <div className="annotation-layer" onClick={onWorkspaceClick}>
            {annotations.map((annotation) => (
              <AnnotationItem
                key={annotation.id}
                annotation={annotation}
                isSelected={selectedIds.includes(annotation.id)}
                onSelect={onSelectAnnotation}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Workspace;