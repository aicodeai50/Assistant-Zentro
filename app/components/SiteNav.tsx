import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import TrialGate from "@/components/TrialGate";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Architecture of Applied Intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F14] text-white">
        <SiteNav />
        {/* TrialGate wraps the app but we will configure it to ONLY gate /robot */}
        <TrialGate>
          <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
        </TrialGate>
        <SiteFooter />
      </body>
    </html>
  );
}