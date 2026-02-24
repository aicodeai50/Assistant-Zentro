import React from "react";

export default function Pricing() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-neutral-700">Simple plans. Upgrade anytime.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Plan title="Free" price="NOK 0">
          <ul className="list-disc pl-5 text-neutral-700">
            <li>Limited AI generations</li>
            <li>Basic quizzes & flashcards</li>
            <li>Community support</li>
          </ul>
        </Plan>

        <Plan title="Pro" price="NOK 299 / month">
          <ul className="list-disc pl-5 text-neutral-700">
            <li>Higher limits</li>
            <li>Interview simulator</li>
            <li>Resume + skill prep</li>
          </ul>
        </Plan>

        <Plan title="Team" price="NOK 999 / month">
          <ul className="list-disc pl-5 text-neutral-700">
            <li>Company admin tools</li>
            <li>Seats (managed per team)</li>
            <li>Skill matrix + upskill plans</li>
          </ul>
        </Plan>
      </div>

      <a className="mt-10 inline-block underline" href="/">
        ← Back
      </a>
    </main>
  );
}

type PlanProps = {
  title: string;
  price: string;
  children: React.ReactNode;
};

function Plan({ title, price, children }: PlanProps) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2 text-2xl font-bold">{price}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}