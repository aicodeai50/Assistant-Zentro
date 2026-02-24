export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-900 bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <div className="text-white font-semibold">Shynvo</div>
          <p className="mt-2 text-sm text-neutral-400">
            AI learning + upskilling for students, professionals, and teams.
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            Contact: <a className="underline" href="mailto:sandraherbert50.sh@gmail.com">sandraherbert50.sh@gmail.com</a>
          </p>
        </div>

        <div className="text-sm">
          <div className="text-neutral-200 font-semibold">Product</div>
          <div className="mt-2 space-y-2 text-neutral-400">
            <a className="block hover:text-white" href="/demo">Demo</a>
            <a className="block hover:text-white" href="/robot">Robot Assistant</a>
            <a className="block hover:text-white" href="/pricing">Pricing</a>
            <a className="block hover:text-white" href="/docs">Docs</a>
          </div>
        </div>

        <div className="text-sm">
          <div className="text-neutral-200 font-semibold">Legal</div>
          <div className="mt-2 space-y-2 text-neutral-400">
            <a className="block hover:text-white" href="/privacy">Privacy</a>
            <a className="block hover:text-white" href="/terms">Terms</a>
            <a className="block hover:text-white" href="/contact">Contact</a>
          </div>
          <div className="mt-6 text-xs text-neutral-600">
            © {new Date().getFullYear()} Shynvo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}