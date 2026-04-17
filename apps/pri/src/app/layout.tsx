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
  metadataBase: new URL("https://shynvo.app"),
  alternates: {
    canonical: "/",
  },
  keywords: "robotics, AI, API generation, robot platform, digital twin, automation",
  openGraph: {
    title: "SHYNVO PRI — Planetary Robot Interface",
    description: "The operating system for robot intelligence.",
    url: "https://shynvo.app",
    siteName: "Shynvo",
    type: "website",
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
