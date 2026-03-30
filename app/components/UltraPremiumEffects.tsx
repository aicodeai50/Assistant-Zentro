"use client";

import { useEffect, useState } from "react";

export default function UltraPremiumEffects() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    }

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* mouse-follow spotlight */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-70 transition-all duration-300"
        style={{
          background: `
            radial-gradient(460px circle at ${mouse.x}% ${mouse.y}%, rgba(95,116,255,0.12), transparent 38%),
            radial-gradient(300px circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.04), transparent 24%)
          `,
        }}
      />

      {/* large cinematic gradients */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 sh-ambient-pan"
        style={{
          background: `
            radial-gradient(1000px 560px at 10% 0%, rgba(95,116,255,0.10), transparent 60%),
            radial-gradient(800px 520px at 90% 10%, rgba(45,183,109,0.07), transparent 60%),
            radial-gradient(1200px 760px at 50% 100%, rgba(95,116,255,0.06), transparent 68%)
          `,
        }}
      />

      {/* cinematic haze */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 sh-slow-float opacity-60"
        style={{
          background:
            "radial-gradient(600px 220px at 50% 12%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      {/* subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.22) 100%)",
        }}
      />
    </>
  );
}