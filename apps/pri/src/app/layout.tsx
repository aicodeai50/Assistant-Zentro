import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHYNVO PRI — Planetary Robot Interface",
  description: "The operating system for robot intelligence. Generate APIs, deploy agents, simulate digital twins, and orchestrate your entire robotics stack.",
  metadataBase: new URL("https://assistant.zentro.run"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "https://assistant.zentro.run/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "https://assistant.zentro.run/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "https://assistant.zentro.run/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "https://assistant.zentro.run/icons/icon-192.png",
  },
  keywords: "robotics, AI, API generation, robot platform, digital twin, automation",
  openGraph: {
    title: "SHYNVO PRI — Planetary Robot Interface",
    description: "The operating system for robot intelligence.",
    url: "https://assistant.zentro.run",
    siteName: "Shynvo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SHYNVO PRI — Planetary Robot Interface",
    description: "The operating system for robot intelligence.",
    images: ["https://assistant.zentro.run/icons/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
