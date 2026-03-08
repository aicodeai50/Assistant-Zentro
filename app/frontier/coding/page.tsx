import Link from "next/link";

export default function CodingArena() {
  return (
    <section className="py-12">

      <Link href="/frontier" className="text-white/70 hover:text-white">
        ← Back to Frontier Lab
      </Link>

      <h1 className="mt-6 text-4xl text-white font-semibold">
        Coding Arena
      </h1>

      <p className="mt-4 text-white/70 max-w-2xl">
        Practice programming logic, functions, and real engineering challenges.
      </p>

    </section>
  );
}
