import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Architecture of Applied Intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F14] text-white">
        {/* Top Utility Bar: Search + Language */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14]/70 backdrop-blur">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 py-2">
              {/* Left: compact brand label */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
                <span>Shynvo</span>
              </div>

              {/* Center: Search */}
              <div className="flex-1">
                <label className="sr-only" htmlFor="site-search">
                  Search
                </label>
                <input
                  id="site-search"
                  type="search"
                  placeholder="Search Shynvo…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                />
              </div>

              {/* Right: Language */}
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-xs text-white/50">Language</span>
                <label className="sr-only" htmlFor="lang">
                  Language
                </label>
                <select
                  id="lang"
                  defaultValue="en"
                  className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-sm text-white outline-none focus:border-white/20"
                >
                  <option value="en">EN</option>
                  <option value="no">NO</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <SiteNav />

        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
