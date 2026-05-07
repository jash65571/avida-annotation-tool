import { useEffect, useRef, useState } from "react";
import "./App.css";
import ExportPanel from "./components/ExportPanel";
import StatusRow from "./components/StatusRow";
import Toolbar from "./components/Toolbar";
import Workspace from "./components/Workspace";
import type {
  Annotation,
  AnnotationColor,
  AnnotationType,
  DragState,
  MediaKind,
} from "./types";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaKind, setMediaKind] = useState<MediaKind>(null);
  const [activeTool, setActiveTool] = useState<AnnotationType>("camera");
  const [annotations, setAnnotations] = useState<Annotation[]>(() => {
    const saved = localStorage.getItem("annotations");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dragState, setDragState] = useState<DragState>(null);
  const [exportedJson, setExportedJson] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [annotationSize, setAnnotationSize] = useState(1);
  const [history, setHistory] = useState<Annotation[][]>(() => {
    const saved = localStorage.getItem("annotations");
    const initial = saved ? JSON.parse(saved) : [];
    return [initial];
  });
  const [historyIndex, setHistoryIndex] = useState(0);

  function updateAnnotationsWithHistory(newAnnotations: Annotation[]) {
    setAnnotations(newAnnotations);
    localStorage.setItem("annotations", JSON.stringify(newAnnotations));
    setExportedJson("");
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }

  function undo() {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const prevState = history[newIndex];
      setAnnotations(prevState);
      localStorage.setItem("annotations", JSON.stringify(prevState));
      setExportedJson("");
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextState = history[newIndex];
      setAnnotations(nextState);
      localStorage.setItem("annotations", JSON.stringify(nextState));
      setExportedJson("");
    }
  }

  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  function getExpandedSelectionIds(
    sourceSelectedIds = selectedIds,
    sourceAnnotations = annotations
  ) {
    const expandedIds = new Set(sourceSelectedIds);
    const selectedGroupIds = new Set<string>();

    sourceAnnotations.forEach((item) => {
      if (expandedIds.has(item.id) && item.groupId) {
        selectedGroupIds.add(item.groupId);
      }
    });

    sourceAnnotations.forEach((item) => {
      if (item.groupId && selectedGroupIds.has(item.groupId)) {
        expandedIds.add(item.id);
      }
    });

    return Array.from(expandedIds);
  }

  function handleMediaUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file.");
      return;
    }

    const url = URL.createObjectURL(file);

    setMediaUrl(url);
    setMediaKind(isVideo ? "video" : "image");
    const emptyAnnotations: Annotation[] = [];
    setAnnotations(emptyAnnotations);
    setHistory([emptyAnnotations]);
    setHistoryIndex(0);
    setSelectedIds([]);
    setExportedJson("");
    setIsVideoPlaying(false);
    localStorage.setItem("annotations", JSON.stringify(emptyAnnotations));

    event.target.value = "";
  }

  function handleWorkspaceClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!mediaUrl) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const newAnnotation: Annotation = {
      id: createId(),
      type: activeTool,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      color: "green",
      groupId: null,
      size: annotationSize,
    };

    updateAnnotationsWithHistory([...annotations, newAnnotation]);
    setSelectedIds([newAnnotation.id]);
  }

  function handleSelectAnnotation(
    event: React.MouseEvent<HTMLDivElement>,
    annotationId: string
  ) {
    event.stopPropagation();

    const clickedAnnotation = annotations.find(
      (item) => item.id === annotationId
    );

    const idsToSelect = clickedAnnotation?.groupId
      ? annotations
          .filter((item) => item.groupId === clickedAnnotation.groupId)
          .map((item) => item.id)
      : [annotationId];

    if (event.shiftKey) {
      setSelectedIds((currentSelectedIds) => {
        const nextSelectedIds = new Set(currentSelectedIds);
        const allAlreadySelected = idsToSelect.every((id) =>
          nextSelectedIds.has(id)
        );

        if (allAlreadySelected) {
          idsToSelect.forEach((id) => nextSelectedIds.delete(id));
        } else {
          idsToSelect.forEach((id) => nextSelectedIds.add(id));
        }

        return Array.from(nextSelectedIds);
      });

      return;
    }

    setSelectedIds(idsToSelect);
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    annotation: Annotation
  ) {
    event.stopPropagation();

    const idsToMove = annotation.groupId
      ? annotations
          .filter((item) => item.groupId === annotation.groupId)
          .map((item) => item.id)
      : selectedIds.includes(annotation.id)
        ? getExpandedSelectionIds()
        : [annotation.id];

    const startPositions: Record<string, { x: number; y: number }> = {};

    annotations.forEach((item) => {
      if (idsToMove.includes(item.id)) {
        startPositions[item.id] = {
          x: item.x,
          y: item.y,
        };
      }
    });

    setSelectedIds(idsToMove);

    setDragState({
      id: annotation.id,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startPositions,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState) {
      return;
    }

    const deltaX = event.clientX - dragState.startPointerX;
    const deltaY = event.clientY - dragState.startPointerY;

    setAnnotations((currentAnnotations) =>
      currentAnnotations.map((item) => {
        const startPosition = dragState.startPositions[item.id];

        if (!startPosition) {
          return item;
        }

        return {
          ...item,
          x: startPosition.x + deltaX,
          y: startPosition.y + deltaY,
        };
      })
    );
  }

  function handlePointerUp() {
    if (dragState) {
      updateAnnotationsWithHistory(annotations);
    }
    setDragState(null);
  }

  function changeSelectedColor(color: AnnotationColor) {
    const idsToChange = getExpandedSelectionIds();

    const updated = annotations.map((item) => {
      if (!idsToChange.includes(item.id)) {
        return item;
      }

      return {
        ...item,
        color,
      };
    });

    updateAnnotationsWithHistory(updated);
    setSelectedIds(idsToChange);
  }

  function changeAnnotationSize(size: number) {
    const idsToChange = getExpandedSelectionIds();

    const updated = annotations.map((item) => {
      if (!idsToChange.includes(item.id)) {
        return item;
      }

      return {
        ...item,
        size,
      };
    });

    updateAnnotationsWithHistory(updated);
    setSelectedIds(idsToChange);
    setAnnotationSize(size);
  }

  function groupSelected() {
    const idsToGroup = getExpandedSelectionIds();

    if (idsToGroup.length < 2) {
      return;
    }

    const groupId = createId();

    const updated = annotations.map((item) => {
      if (!idsToGroup.includes(item.id)) {
        return item;
      }

      return {
        ...item,
        groupId,
      };
    });

    updateAnnotationsWithHistory(updated);
    setSelectedIds(idsToGroup);
  }

  function ungroupSelected() {
    const idsToUngroup = getExpandedSelectionIds();

    const updated = annotations.map((item) => {
      if (!idsToUngroup.includes(item.id)) {
        return item;
      }

      return {
        ...item,
        groupId: null,
      };
    });

    updateAnnotationsWithHistory(updated);
    setSelectedIds(idsToUngroup);
  }

  function deleteSelected() {
    const idsToDelete = getExpandedSelectionIds();

    const updated = annotations.filter(
      (item) => !idsToDelete.includes(item.id)
    );

    updateAnnotationsWithHistory(updated);
    setSelectedIds([]);
  }

  function exportAnnotations() {
    const json = JSON.stringify(annotations, null, 2);
    setExportedJson(json);
  }

  function toggleVideoPlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  return (
    <main className="app-shell">
      <section className="top-bar">
        <div>
          <p className="eyebrow">Avida interview project</p>
          <h1>Video / Image Annotation Tool</h1>
          <p>
            Upload media, place icons and shapes, drag annotations, group items,
            and change their visual state.
          </p>
        </div>
      </section>

      <Toolbar
        activeTool={activeTool}
        mediaKind={mediaKind}
        selectedCount={selectedIds.length}
        canGroup={selectedIds.length >= 2}
        isVideoPlaying={isVideoPlaying}
        annotationSize={annotationSize}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onToolChange={setActiveTool}
        onMediaUpload={handleMediaUpload}
        onColorChange={changeSelectedColor}
        onSizeChange={changeAnnotationSize}
        onGroupSelected={groupSelected}
        onUngroupSelected={ungroupSelected}
        onDeleteSelected={deleteSelected}
        onUndo={undo}
        onRedo={redo}
        onExport={exportAnnotations}
        onToggleVideoPlayback={toggleVideoPlayback}
      />

      <StatusRow
        activeTool={activeTool}
        selectedCount={selectedIds.length}
        totalAnnotations={annotations.length}
      />

      <Workspace
        mediaUrl={mediaUrl}
        mediaKind={mediaKind}
        videoRef={videoRef}
        annotations={annotations}
        selectedIds={selectedIds}
        onWorkspaceClick={handleWorkspaceClick}
        onSelectAnnotation={handleSelectAnnotation}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onVideoPlay={() => setIsVideoPlaying(true)}
        onVideoPause={() => setIsVideoPlaying(false)}
      />

      <ExportPanel exportedJson={exportedJson} />
    </main>
  );
}

export default App;