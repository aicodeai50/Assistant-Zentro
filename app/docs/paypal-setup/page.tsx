import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import { ButtonLink } from "@/components/ui/Button";
import { PageShell } from "@/components/ui/PageShell";

export const metadata = {
  title: "PayPal Setup",
  description: "Operator guide for configuring PayPal billing on Zentro Assistant.",
};

function loadPayPalGuide() {
  try {
    const path = join(process.cwd(), "docs", "PAYPAL_SETUP.md");
    return readFileSync(path, "utf8");
  } catch {
    return "PayPal setup guide not found. See docs/PAYPAL_SETUP.md in the repository.";
  }
}

export default function PayPalSetupPage() {
  const content = loadPayPalGuide();

  return (
    <PageShell
      eyebrow="Admin"
      title="PayPal billing setup"
      description="Configure subscription plans, webhooks, and environment variables for Zentro Assistant."
      actions={
        <ButtonLink href="/docs" variant="secondary" size="sm">
          All docs
        </ButtonLink>
      }
    >
      <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
        <pre className="whitespace-pre-wrap text-sm leading-7 text-white/75 font-sans">
          {content}
        </pre>
      </article>

      <p className="text-sm text-white/50">
        Need help?{" "}
        <Link href="/contact" className="text-cyan-200 hover:text-cyan-100">
          Contact support
        </Link>
      </p>
    </PageShell>
  );
}
