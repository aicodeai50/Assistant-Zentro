import Link from "next/link";
import RobotTypingLine from "@/components/RobotTypingLine";
import { QRCodeSVG } from "qrcode.react";
import {
  BookOpen,
  GraduationCap,
  Building2,
  FlaskConical,
  Cpu,
  Gamepad2,
} from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENVIRONMENTS = [
  {
    key: "university",
    title: "University Hub", icon: "U",
    subtitle: "Structured Academic Campus",
    desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
    tags: ["Study", "Exams", "Career"],
    href: "/university",
    Icon: BookOpen,
  },
  {
    key: "academy",
    title: "Shynvo Academy", icon: "A",
    subtitle: "School Learning World",
    desc: "Junior and senior high school learning, subject rooms, tutors, and classroom workshops.",
    tags: ["School", "Subjects", "Badges"],
    href: "/academy",
    Icon: GraduationCap,
  },
  {
    key: "enterprise",
    title: "Shynvo Enterprise", icon: "E",
    subtitle: "Unified Operating Environment",
    desc: "Missions, teams, analytics, strategy, automation, support, and OS intelligence in one enterprise environment.",
    tags: ["Missions", "Teams", "Analytics"],
    href: "/enterprise",
    Icon: Building2,
  },
  {
    key: "experiments",
    title: "Experiments", icon: "X",
    subtitle: "AI Exploration Worlds",
    desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
    tags: ["Debate", "Simulation", "Concepts"],
    href: "/experiments",
    Icon: FlaskConical,
  },
  {
    key: "frontier",
    title: "Frontier Lab", icon: "F",
    subtitle: "Engineering District",
    desc: "Code, systems, logic, and build-focused engineering practice for all levels.",
    tags: ["Code", "Build", "Puzzles"],
    href: "/frontier",
    Icon: Cpu,
  },
  {
    key: "arcade",
    title: "Arcade Sim", icon: "G",
    subtitle: "Interactive Skill Arena",
    desc: "Game-based drills, challenge rooms, reflex loops, and simulation-based practice.",
    tags: ["Games", "Challenge", "Levels"],
    href: "/arcade",
    Icon: Gamepad2,
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-[#070B11]" />

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-28 lg:pt-6">
        <div className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">

          {/* HERO LEFT */}
          <div className="rounded-[2rem] border border-white/5 p-4 sm:p-5 lg:p-6">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Structured AI Platform
            </div>

            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Shynvo
            </h1>

            <p className="mt-3 max-w-4xl text-xl text-white/92 sm:text-2xl lg:text-[2.5rem]">
              Structured AI environments for learning, training, and team execution
            </p>

            <p className="mt-5 max-w-3xl text-base text-white/78 sm:text-lg">
              Shynvo turns AI into guided environments with workflows, drills, simulations, and real outcomes for students, educators, and teams.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/university" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black">
                For Students
              </Link>

              <Link href="/academy" className="rounded-2xl border border-white/10 px-6 py-3 text-sm text-white">
                For Teachers
              </Link>

              <Link href="/enterprise" className="rounded-2xl border border-white/10 px-6 py-3 text-sm text-white">
                For Teams & Enterprise
              </Link>
            </div>

            <div className="mt-4">
              <Link href="/robot" className="text-sm text-white/70 underline">
                Watch 60s demo
              </Link>
            </div>

          </div>

          {/* KEEP YOUR RIGHT SIDE (ROBOT) */}
          <div>
            <RobotTypingLine />
          </div>

        </div>
      </section>
    </main>
  );
}
