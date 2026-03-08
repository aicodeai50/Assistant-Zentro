import Link from "next/link";

export default function LogicPuzzles() {
  return (
    <section className="py-12">

      <Link href="/frontier" className="text-white/70 hover:text-white">
        ← Back to Frontier Lab
      </Link>

      <h1 className="mt-6 text-4xl text-white font-semibold">
        Logic Puzzles
      </h1>

      <p className="mt-4 text-white/70 max-w-2xl">
        Train deep reasoning through engineering-style logic puzzles.
      </p>

    </section>
  );
}
