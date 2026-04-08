import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShynvoGuideChat from "@/components/ShynvoGuideChat";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";
import PathTracker from "./components/PathTracker";
import UltraPremiumEffects from "./components/UltraPremiumEffects";
import CapacitorKeyboardFix from "@/components/CapacitorKeyboardFix";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Structured intelligence platform",
  applicationName: "Shynvo",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shynvo",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-[100dvh] overflow-x-hidden bg-[#04070d] text-white">
        <LanguageProvider>
          <CapacitorKeyboardFix />
          <PathTracker />
          <UltraPremiumEffects />

          <div className="relative z-10 flex min-h-[100dvh] flex-col">
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
