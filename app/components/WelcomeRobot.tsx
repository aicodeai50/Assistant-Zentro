"use client";

import { useEffect, useState } from "react";

type ThemeName = "cyan" | "violet" | "emerald" | "rose";

type Theme = {
  shellTop: string;
  shellBottom: string;
  shellBorder: string;
  face: string;
  glow: string;
  accent: string;
  core: string;
};

const THEMES: Record<ThemeName, Theme> = {
  cyan: {
    shellTop: "#f8fbff",
    shellBottom: "#d8ebff",
    shellBorder: "rgba(255,255,255,0.22)",
    face: "#09111f",
    glow: "rgba(103,232,249,0.95)",
    accent: "#67e8f9",
    core: "#9be7ff",
  },
  violet: {
    shellTop: "#fcf9ff",
    shellBottom: "#eadcff",
    shellBorder: "rgba(255,255,255,0.22)",
    face: "#140f24",
    glow: "rgba(196,181,253,0.95)",
    accent: "#a78bfa",
    core: "#c8b7ff",
  },
  emerald: {
    shellTop: "#f5fff9",
    shellBottom: "#d7ffe8",
    shellBorder: "rgba(255,255,255,0.22)",
    face: "#091712",
    glow: "rgba(74,222,128,0.95)",
    accent: "#4ade80",
    core: "#aaf7c4",
  },
  rose: {
    shellTop: "#fff8fa",
    shellBottom: "#ffdbe4",
    shellBorder: "rgba(255,255,255,0.22)",
    face: "#1a1015",
    glow: "rgba(251,113,133,0.95)",
    accent: "#fb7185",
    core: "#ffc0cd",
  },
};

const ORDER: ThemeName[] = ["cyan", "violet", "emerald", "rose"];

const MESSAGES = [
  "Hello! Welcome to Shynvo.",
  "Choose your direction and begin.",
  "Here you can learn, build, and explore with AI.",
  "You made the right choice coming to Shynvo.",
  "Create your account and enter the Shynvo world.",
  "This will be fun 🤩",
  "See you soon inside Shynvo.",
];

export default function WelcomeRobot() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [lookX, setLookX] = useState(0);
  const [lookY, setLookY] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const theme = THEMES[ORDER[themeIndex]];

  useEffect(() => {
    const id = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2400);

    return () => window.clearInterval(id);
  }, []);

  function updateLook(clientX: number, clientY: number, rect: DOMRect) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

    setLookX(Math.round(nx * 15));
    setLookY(Math.round(ny * 12));
  }

  function cycleTheme() {
    setThemeIndex((prev) => (prev + 1) % ORDER.length);
  }

  return (
    <div className="relative w-full max-w-[370px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${theme.glow.replace(
            "0.95",
            "0.20"
          )}, transparent 62%)`,
        }}
      />

      <div className="relative min-h-[430px]">
        {/* automatic side bubble */}
        <div className="absolute right-1 top-0 z-30 max-w-[170px] rounded-[1rem] border border-white/10 bg-[rgba(8,12,20,0.94)] px-3 py-2 text-[12px] leading-5 text-white/88 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur">
          {MESSAGES[messageIndex]}
          <div className="absolute bottom-4 left-[-6px] h-3 w-3 rotate-45 border-b border-l border-white/10 bg-[rgba(8,12,20,0.94)]" />
        </div>

        {/* stage */}
        <div
          className="relative ml-2 mt-20 flex h-[340px] items-end justify-center rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_24px_60px_rgba(0,0,0,0.30)] backdrop-blur"
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            updateLook(e.clientX, e.clientY, rect);
          }}
          onPointerDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            updateLook(e.clientX, e.clientY, rect);
            cycleTheme();
          }}
          onPointerLeave={() => {
            setLookX(0);
            setLookY(0);
          }}
        >
          <div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_top_left,rgba(97,114,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(42,199,140,0.06),transparent_40%)]" />
          <div className="absolute inset-5 rounded-[1.7rem] border border-white/8" />
          <div className="absolute inset-9 rounded-[1.3rem] border border-white/6" />

          {/* floor glow */}
          <div
            className="absolute bottom-9 h-8 w-36 rounded-full blur-2xl"
            style={{
              background: theme.glow.replace("0.95", "0.18"),
            }}
          />
          <div className="absolute bottom-8 h-5 w-32 rounded-full bg-white/10 blur-md" />

          {/* floating robot */}
          <div className="relative mb-8 flex flex-col items-center animate-float">
            {/* antenna */}
            <div className="relative mb-2 flex flex-col items-center">
              <div className="h-8 w-[3px] rounded-full bg-white/25" />
              <div
                className="h-3.5 w-3.5 rounded-full"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 18px ${theme.glow}`,
                }}
              />
            </div>

            {/* arms layer */}
            <div className="pointer-events-none absolute left-1/2 top-[102px] h-[126px] w-[260px] -translate-x-1/2">
              {/* left arm down */}
              <div
                className="absolute left-[40px] top-[46px] transition-transform duration-200"
                style={{
                  transform: `rotate(${-24 - lookX * 0.05}deg)`,
                }}
              >
                <div className="relative h-[102px] w-[36px]">
                  <div
                    className="absolute left-3 top-0 h-[50px] w-[16px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                  <div
                    className="absolute left-[15px] top-[42px] h-[40px] w-[16px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                  <div
                    className="absolute left-[17px] top-[80px] h-[14px] w-[18px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                </div>
              </div>

              {/* right arm raised and waving */}
              <div className="absolute right-[18px] top-[-4px] origin-[14px_88px] animate-wave">
                <div className="relative h-[116px] w-[40px]">
                  <div
                    className="absolute left-3 top-0 h-[52px] w-[16px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                  <div
                    className="absolute left-[1px] top-[38px] h-[46px] w-[16px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                  <div
                    className="absolute left-[-1px] top-[80px] h-[16px] w-[18px] rounded-full border"
                    style={{
                      background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                      borderColor: theme.shellBorder,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* head */}
            <div
              className="relative flex h-[98px] w-[120px] items-center justify-center rounded-[999px] border shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition-transform duration-200"
              style={{
                background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                borderColor: theme.shellBorder,
                transform: `translate(${lookX * 0.22}px, ${lookY * 0.18}px)`,
              }}
            >
              <div
                className="absolute inset-[10px] rounded-[999px]"
                style={{ backgroundColor: theme.face }}
              />

              <div
                className="relative z-10 flex gap-5 transition-transform duration-200"
                style={{
                  transform: `translate(${lookX * 0.36}px, ${lookY * 0.32}px)`,
                }}
              >
                <span
                  className="block h-4 w-4 rounded-full animate-blink"
                  style={{
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 18px ${theme.glow}`,
                  }}
                />
                <span
                  className="block h-4 w-4 rounded-full animate-blink"
                  style={{
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 18px ${theme.glow}`,
                  }}
                />
              </div>

              <div
                className="absolute bottom-4 h-[4px] w-9 rounded-full transition-transform duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.25)",
                  transform: `translateX(${lookX * 0.14}px)`,
                }}
              />
            </div>

            {/* neck */}
            <div
              className="mt-1 h-3 w-5 rounded-full border"
              style={{
                background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                borderColor: theme.shellBorder,
              }}
            />

            {/* torso */}
            <div
              className="relative mt-1 flex h-[138px] w-[120px] items-center justify-center rounded-[999px] border shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition-transform duration-200"
              style={{
                background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                borderColor: theme.shellBorder,
                transform: `translate(${lookX * 0.08}px, 0px)`,
                boxShadow: `0 0 42px ${theme.glow.replace("0.95", "0.16")}, 0 18px 36px rgba(0,0,0,0.18)`,
              }}
            >
              <div className="absolute inset-[10px] rounded-[999px] bg-[rgba(255,255,255,0.12)]" />

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.10)]">
                <span
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: theme.core,
                    boxShadow: `0 0 18px ${theme.glow}`,
                  }}
                />
              </div>
            </div>

            {/* legs */}
            <div className="mt-2 flex gap-5">
              <div
                className="h-[58px] w-[16px] rounded-full border"
                style={{
                  background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                  borderColor: theme.shellBorder,
                }}
              />
              <div
                className="h-[58px] w-[16px] rounded-full border"
                style={{
                  background: `linear-gradient(180deg, ${theme.shellTop}, ${theme.shellBottom})`,
                  borderColor: theme.shellBorder,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 text-center text-xs font-medium text-white/62">
          Welcome Robot
        </div>
      </div>
    </div>
  );
}