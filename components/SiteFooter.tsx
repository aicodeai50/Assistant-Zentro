import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold">Shynvo</div>
            <p className="mt-2 text-sm text-white/60">
              AI learning + upskilling for students, professionals, and teams.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Contact:{" "}
              <a
                className="underline hover:text-white"
                href="mailto:sandraherbert50.sh@gmail.com"
              >
                sandraherbert50.sh@gmail.com
              </a>
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/80">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link className="hover:text-white" href="/demo">
                  Demo
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/robot">
                  Robot Assistant
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/docs">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/os">
                  Shynvo OS (2050)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/80">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link className="hover:text-white" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} Shynvo. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}