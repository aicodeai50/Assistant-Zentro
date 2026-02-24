export default function DemoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Demo</h1>

      <p className="mt-4 text-neutral-700">
        Demo video coming soon. For now, you can explore the product pages:
      </p>

      <div className="mt-6 flex gap-4">
        <a className="underline" href="/pricing">Pricing</a>
        <a className="underline" href="/privacy">Privacy</a>
        <a className="underline" href="/terms">Terms</a>
      </div>

      <a className="mt-10 inline-block underline" href="/">
        ← Back
      </a>
    </main>
  );
}