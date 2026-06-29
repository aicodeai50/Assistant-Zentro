export const metadata = {
  title: "Refund & Billing",
  description: "Refund, billing, and cancellation information for Zentro Assistant.",
};

export default function RefundPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Billing
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Refund &amp; Billing
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Last updated: March 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-white/80">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Payments</h2>
            <p className="mt-2">
              Payments for Zentro Assistant are processed through PayPal Subscriptions
              for Pro and Team plans.
            </p>
            <p className="mt-2">
              You can manage or cancel subscriptions from your PayPal account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Cancellations</h2>
            <p className="mt-2">
              You may cancel your subscription at any time. If you cancel, your
              access will continue until the end of the current billing period,
              unless otherwise stated.
            </p>
          </section>

          
          <section>
            <h2 className="text-lg font-semibold text-white">3. Refunds</h2>
            <p className="mt-2">
              Refunds are handled fairly and reviewed on a case-by-case basis.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Duplicate or incorrect charges may be eligible for a refund.</li>
              <li>If you experience a technical issue that prevents access, we will review your case.</li>
              <li>Refunds are generally not provided for unused time or forgotten cancellations.</li>
            </ul>

            <p className="mt-2">
              To request a refund, contact:
            </p>

            <p className="mt-2">
              <a
                href="mailto:support@zentro.run"
                className="text-white underline underline-offset-4"
              >
                support@zentro.run
              </a>
            </p>
          </section>


          <section>
            <h2 className="text-lg font-semibold text-white">4. Billing questions</h2>
            <p className="mt-2">
              For billing issues, failed payments, duplicate charges, or access
              problems after payment, please contact us and include the email
              used for your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Contact</h2>
            <p className="mt-2">
              We typically respond within 24 hours.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
