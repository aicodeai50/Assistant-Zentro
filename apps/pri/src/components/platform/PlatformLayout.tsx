"use client";
import PlatformSidebar from "./PlatformSidebar";
import PlatformTopbar from "./PlatformTopbar";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PlatformLayout({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen text-white" style={{ background: "#010508" }}>
      {/* Stars */}
      <div className="stars" />
      {/* Grid */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.6 }} />

      <div className="flex min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        <PlatformSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <PlatformTopbar title={title} subtitle={subtitle} />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-[1880px] px-6 py-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
