import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Space_Mono, Syne } from "next/font/google";
import ZentroSiteNav from "@/components/ZentroSiteNav";
import ZentroSiteFooter from "@/components/ZentroSiteFooter";
import ZentroRobotChat from "@/components/robot/ZentroRobotChat";
import { ZentroRobotProvider } from "@/lib/robot/context";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";
import PathTracker from "./components/PathTracker";
import UltraPremiumEffects from "./components/UltraPremiumEffects";
import CapacitorKeyboardFix from "@/components/CapacitorKeyboardFix";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/site";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070a12",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Operations`,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_SHORT_NAME,
  keywords: [
    "AI assistant",
    "IT operations",
    "incident copilot",
    "automation",
    "zentro",
    "devops",
  ],
  authors: [{ name: SITE_SHORT_NAME }],
  creator: SITE_SHORT_NAME,
  publisher: SITE_SHORT_NAME,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_SHORT_NAME,
    title: `${SITE_NAME} — AI Operations`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: SITE_SHORT_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — AI Operations`,
    description: SITE_DESCRIPTION,
    images: ["/icons/icon-512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_SHORT_NAME,
    startupImage: "/icons/icon-512.png",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="msapplication-TileImage" content="/icons/icon-512.png" />
        <meta name="msapplication-TileColor" content="#070a12" />
      </head>
      <body className="relative min-h-[100dvh] overflow-x-hidden text-white">
        <LanguageProvider>
          <ZentroRobotProvider>
            <CapacitorKeyboardFix />
            <PathTracker />
            <UltraPremiumEffects />
            <div className="relative z-10 flex min-h-[100dvh] flex-col">
              <ZentroSiteNav />
              <AIBackground />
              <main className="relative z-10 flex-1">
                {children}
              </main>
              <div className="relative z-20" style={{ background: "transparent" }}>
                <ZentroSiteFooter />
              </div>
              <ZentroRobotChat />
            </div>
          </ZentroRobotProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
