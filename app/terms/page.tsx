export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Terms of Service</h1>

      <p className="mt-4 text-neutral-700">
        By using Shynvo, you agree to use the service lawfully. The service is
        provided “as-is” during beta and may change over time.
      </p>

      <p className="mt-4 text-neutral-700">
        You are responsible for the content you submit and how you use any AI
        output. Do not upload sensitive personal data.
      </p>

      <p className="mt-4 text-neutral-700">
        Contact:{" "}
        <span className="font-semibold">sandraherbert50.sh@gmail.com</span>
      </p>

      <a className="mt-10 inline-block underline" href="/">
        ← Back
      </a>
    </main>
  );
}