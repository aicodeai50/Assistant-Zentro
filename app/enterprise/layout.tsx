import type { ReactNode } from "react";

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07130F]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_18%_18%,rgba(16,185,129,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_82%_20%,rgba(52,211,153,0.09),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_78%,rgba(255,255,255,0.05),transparent_34%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="absolute inset-0 bg-[#07130F]/82" />
      </div>

      {children}
    </div>
  );
}
