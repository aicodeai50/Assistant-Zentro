import Link from "next/link";

export default function AIBotLab() {
  return (
    <section className="py-12">

      <Link href="/frontier" className="text-white/70 hover:text-white">
        ← Back to Frontier Lab
      </Link>

      <h1 className="mt-6 text-4xl text-white font-semibold">
        AI Bot Lab
      </h1>

      <p className="mt-4 text-white/70 max-w-2xl">
        Experiment with decision logic and AI behaviour models.
      </p>

    </section>
  );
}
