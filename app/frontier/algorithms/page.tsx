import Link from "next/link";

export default function AlgorithmChallenges() {
  return (
    <section className="py-12">

      <Link href="/frontier" className="text-white/70 hover:text-white">
        ← Back to Frontier Lab
      </Link>

      <h1 className="mt-6 text-4xl text-white font-semibold">
        Algorithm Challenges
      </h1>

      <p className="mt-4 text-white/70 max-w-2xl">
        Solve optimization problems, graphs, and algorithm puzzles.
      </p>

    </section>
  );
}
