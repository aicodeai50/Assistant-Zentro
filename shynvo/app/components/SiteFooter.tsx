import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const LINKS: FooterLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "Research", href: "/research" },
  { label: "University Hub", href: "/university" },
  { label: "Contact", href: "mailto:hi@shynvo.app", external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Shynvo</div>
            <div className="text-sm text-white/60 max-w-sm">
              A multi-environment AI platform for learning, execution, and teams.
            </div>
            <div className="text-sm text-white/60">
              Contact:{" "}
              <a className="text-white underline underline-offset-4" href="mailto:hi@shynvo.app">
                hi@shynvo.app
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {LINKS.map((x) =>
              x.external ? (
                <a
                  key={x.label}
                  href={x.href}
                  className="text-sm text-white/70 hover:text-white transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  {x.label}
                </a>
              ) : (
                <Link
                  key={x.label}
                  href={x.href}
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  {x.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Shynvo</div>
          <div>Built for international users · Language switch on top bar</div>
        </div>
      </div>
    </footer>
  );
}
