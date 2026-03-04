import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "./components/SiteNav";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Architecture of Applied Intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F14] text-white">
        {/* IMPORTANT: Nav rendered ONCE here */}
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
