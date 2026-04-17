"use client";

type Props = {
  name: string;
  purpose: string;
  onChangeName: (value: string) => void;
  onChangePurpose: (value: string) => void;
};

export default function ApiDefinitionPanel({
  name,
  purpose,
  onChangeName,
  onChangePurpose,
}: Props) {
  return (
    <section className="builder-card">
      <div className="builder-card-header">
        <h2>API Definition</h2>
        <span className="builder-badge">Builder</span>
      </div>

      <label className="builder-label">
        API Name
        <input
          className="builder-input"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Warehouse Flow API"
        />
      </label>

      <label className="builder-label">
        Purpose
        <textarea
          className="builder-textarea"
          value={purpose}
          onChange={(e) => onChangePurpose(e.target.value)}
          placeholder="Pick and place workflow for warehouse items"
          rows={4}
        />
      </label>
    </section>
  );
}
