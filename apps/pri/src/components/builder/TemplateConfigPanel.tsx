"use client";

import { TemplateOption } from "@/lib/types";

type Props = {
  templates: TemplateOption[];
  selectedTemplate: string;
  configText: string;
  onChangeTemplate: (value: string) => void;
  onChangeConfigText: (value: string) => void;
};

export default function TemplateConfigPanel({
  templates,
  selectedTemplate,
  configText,
  onChangeTemplate,
  onChangeConfigText,
}: Props) {
  return (
    <section className="builder-card">
      <div className="builder-card-header">
        <h2>Template + Config</h2>
        <span className="builder-badge">Execution Model</span>
      </div>

      <label className="builder-label">
        Template
        <select
          className="builder-input"
          value={selectedTemplate}
          onChange={(e) => onChangeTemplate(e.target.value)}
        >
          {templates.map((tpl) => (
            <option key={tpl.name} value={tpl.name}>
              {tpl.name} — {tpl.description}
            </option>
          ))}
        </select>
      </label>

      <label className="builder-label">
        Config JSON
        <textarea
          className="builder-codearea"
          value={configText}
          onChange={(e) => onChangeConfigText(e.target.value)}
          rows={10}
          spellCheck={false}
        />
      </label>
    </section>
  );
}
