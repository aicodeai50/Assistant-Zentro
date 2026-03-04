export default function ContactPage() {
  return (
    <div className="py-14">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-3 text-white/70">
        For support or business inquiries:
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm text-white/70">Email</div>
        <a
          href="mailto:hi@shynvo.app"
          className="mt-1 block text-lg font-semibold text-white underline underline-offset-4"
        >
          hi@shynvo.app
        </a>
      </div>
    </div>
  );
}