export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl py-16">
      <div className="rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-white/80">
          Reach out for general questions, business inquiries, or support.
        </p>

        <div className="mt-6 space-y-4 text-lg">
          <p>
            General:{" "}
            <a className="underline hover:opacity-80" href="mailto:hi@zentro.run">
              hi@zentro.run
            </a>
          </p>

          <p>
            Support:{" "}
            <a className="underline hover:opacity-80" href="mailto:support@zentro.run">
              support@zentro.run
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
