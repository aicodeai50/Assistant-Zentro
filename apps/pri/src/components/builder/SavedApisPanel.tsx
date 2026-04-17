"use client";

type SavedApi = {
  id: number;
  name: string;
  purpose: string;
  template: string;
  slug?: string;
  created_at?: string;
};

type Props = {
  items: SavedApi[];
  activeSlug?: string;
  onSelect: (slug: string) => void;
  onRefresh: () => void;
};

function fallbackSlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "_");
}

export default function SavedApisPanel({
  items,
  activeSlug,
  onSelect,
  onRefresh,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/20 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Saved APIs</h2>
          <p className="text-sm text-white/45">Registry of reusable workflow endpoints</p>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
          Registry
        </span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center text-sm text-white/45">
            No saved APIs yet.
          </div>
        ) : (
          items.map((item) => {
            const resolvedSlug = item.slug || fallbackSlug(item.name);
            const isActive = activeSlug === resolvedSlug;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(resolvedSlug)}
                className={[
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  isActive
                    ? "border-emerald-400/30 bg-emerald-400/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="mt-1 text-xs text-white/50">{resolvedSlug}</div>
                    <div className="mt-2 text-sm text-white/60">{item.template}</div>
                    {item.purpose ? (
                      <div className="mt-2 line-clamp-2 text-xs text-white/40">
                        {item.purpose}
                      </div>
                    ) : null}
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                    Use
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.08]"
          onClick={onRefresh}
        >
          Refresh APIs
        </button>
      </div>
    </section>
  );
}
