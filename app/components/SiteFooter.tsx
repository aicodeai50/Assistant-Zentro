"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type FooterLink = {
  label: string;
  href: string;
};

export default function SiteFooter() {
  const { t } = useLanguage();

  const LINKS: FooterLink[] = [
    { label: t("nav.docs"), href: "/docs" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="mt-14 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-semibold">Shynvo</div>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              {t("footer.description")}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3" aria-label="Footer">
            {LINKS.map((x) => (
              <Link
                key={x.label}
                href={x.href}
                className="text-sm text-white/70 hover:text-white"
              >
                {x.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 text-xs text-white/50">
          © {new Date().getFullYear()} Shynvo. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
