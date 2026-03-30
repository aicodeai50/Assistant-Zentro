import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShynvoGuideChat from "@/components/ShynvoGuideChat";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";
import PathTracker from "./components/PathTracker";
import UltraPremiumEffects from "./components/UltraPremiumEffects";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Structured intelligence platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-[#04070d] text-white">
        <LanguageProvider>
          <PathTracker />
          <UltraPremiumEffects />

          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteNav />

            <main className="relative z-10 flex-1">
              <AIBackground />
              {children}
            </main>

            <div className="relative z-20">
              <SiteFooter />
            </div>

            <ShynvoGuideChat />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}