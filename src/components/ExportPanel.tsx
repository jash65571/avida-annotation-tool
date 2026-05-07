type ExportPanelProps = {
  exportedJson: string;
};

function ExportPanel({ exportedJson }: ExportPanelProps) {
  if (!exportedJson) {
    return null;
  }

  return (
    <section className="export-panel">
      <h2>Exported annotation JSON</h2>
      <textarea value={exportedJson} readOnly />
    </section>
  );
}

export default ExportPanel;