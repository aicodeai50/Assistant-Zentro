"use client";

type Props = {
  inputText: string;
  apiKey: string;
  slug: string;
  isSaving: boolean;
  isRunning: boolean;
  statusText: string;
  onChangeApiKey: (value: string) => void;
  onChangeInputText: (value: string) => void;
  onSaveApi: () => void;
  onRunApi: () => void;
};

export default function ExecutionPanel({
  inputText,
  slug,
  isSaving,
  isRunning,
  statusText,
  onChangeInputText,
  onSaveApi,
  onRunApi,
}: Props) {
  const canSave = !isSaving && !isRunning;
  const canRun = !isSaving && !isRunning && !!slug;

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Publish + Run</h2>
        <p className="mt-1 text-sm leading-6 text-white/50">
          Save the generated draft as a real endpoint, then execute it.
        </p>
      </div>

      <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
        This workspace now uses the platform backend connection automatically.
      </div>

      <div className="space-y-4">
        <label className="block">
          <div className="mb-2 text-sm font-medium text-white/80">Input JSON</div>
          <textarea
            className="min-h-[220px] w-full rounded-3xl border border-white/10 bg-[#08110d] px-5 py-4 font-mono text-sm text-emerald-100 outline-none transition placeholder:text-white/30 focus:border-emerald-400/40"
            value={inputText}
            onChange={(e) => onChangeInputText(e.target.value)}
            spellCheck={false}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onSaveApi}
            disabled={!canSave}
            className={[
              "rounded-2xl px-4 py-3 text-sm font-medium transition",
              canSave
                ? "border border-emerald-400/30 bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/20"
                : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/30",
            ].join(" ")}
          >
            {isSaving ? "Saving..." : "Save API"}
          </button>

          <button
            type="button"
            onClick={onRunApi}
            disabled={!canRun}
            className={[
              "rounded-2xl px-4 py-3 text-sm font-medium transition",
              canRun
                ? "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.08]"
                : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/30",
            ].join(" ")}
          >
            {isRunning ? "Running..." : "Run API"}
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Endpoint slug</span>
            <span className="text-right text-white">{slug || "Not created yet"}</span>
          </div>
          <div className="mt-3 flex justify-between gap-4">
            <span className="text-white/50">Status</span>
            <span className="text-right text-white">{statusText || "Idle"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
