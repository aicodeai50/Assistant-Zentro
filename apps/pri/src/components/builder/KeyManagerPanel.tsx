"use client";

type Props = {
  apiKey: string;
  onChangeApiKey: (value: string) => void;
  onClearApiKey: () => void;
};

export default function KeyManagerPanel({
  apiKey,
  onChangeApiKey,
  onClearApiKey,
}: Props) {
  const hasKey = !!apiKey.trim();

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-6 transition hover:border-white/[0.14]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Key Manager</h2>
          <p className="mt-1 text-sm leading-6 text-white/50">
            Connect your user key once — used across generation, saving, and
            execution.
          </p>
        </div>

        <span
          className={[
            "mt-1 shrink-0 rounded-full px-3 py-1 text-xs transition",
            hasKey
              ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border border-red-400/20 bg-red-400/10 text-red-200",
          ].join(" ")}
        >
          {hasKey ? "● Connected" : "○ No Key"}
        </span>
      </div>

      <div className="space-y-3">
        <input
          className="w-full rounded-3xl border border-white/10 bg-[#08110d] px-5 py-4 text-sm text-emerald-100 outline-none transition placeholder:text-white/30 focus:border-emerald-400/40"
          value={apiKey}
          onChange={(e) => onChangeApiKey(e.target.value)}
          placeholder="sk-shynvo-••••••••••••••••••••••••"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClearApiKey}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
          >
            Clear Key
          </button>
        </div>

        <div
          className={[
            "rounded-2xl border px-4 py-3.5 text-sm leading-6 transition",
            hasKey
              ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-200/70"
              : "border-white/10 bg-white/[0.03] text-white/45",
          ].join(" ")}
        >
          {hasKey
            ? "Key stored locally in this browser. Used automatically for generation, save, and run."
            : "Paste a valid user API key to unlock real backend generation and endpoint creation."}
        </div>
      </div>
    </section>
  );
}
