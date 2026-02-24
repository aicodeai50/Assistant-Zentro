import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-semibold text-white">Shynvo</div>
            <p className="mt-2 max-w-sm text-sm text-white/60">
              AI learning + upskilling platform for students, professionals, and
              teams. Fast practice, better interviews, smarter plans.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            <div>
              <div className="font-semibold text-white/80">Product</div>
              <div className="mt-3 flex flex-col gap-2 text-white/60">
                <Link className="hover:text-white" href="/demo">
                  Demo
                </Link>
                <Link className="hover:text-white" href="/pricing">
                  Pricing
                </Link>
                <Link className="hover:text-white" href="/robot">
                  Robot
                </Link>
              </div>
            </div>

            <div>
              <div className="font-semibold text-white/80">Company</div>
              <div className="mt-3 flex flex-col gap-2 text-white/60">
                <Link className="hover:text-white" href="/privacy">
                  Privacy
                </Link>
                <Link className="hover:text-white" href="/terms">
                  Terms
                </Link>
                <Link className="hover:text-white" href="/contact">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <div className="font-semibold text-white/80">Support</div>
              <div className="mt-3 flex flex-col gap-2 text-white/60">
                <a className="hover:text-white" href="mailto:sandraherbert50.sh@gmail.com">
                  sandraherbert50.sh@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Shynvo. All rights reserved.</div>
          <div className="text-white/40">
            Built with Next.js + Tailwind. Backend on Railway.
          </div>
        </div>
      </div>
    </footer>
  );
}