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
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* mouse-follow spotlight — subtle, not darkening */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] transition-all duration-300"
        style={{background:`radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, rgba(0,229,255,0.05), transparent 35%)`}}
      />

      {/* ambient color gradients — top corners only, not blocking text */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
        style={{background:`
          radial-gradient(800px 400px at 8% 0%, rgba(0,229,255,0.07), transparent 55%),
          radial-gradient(600px 350px at 92% 5%, rgba(0,255,136,0.05), transparent 50%),
          radial-gradient(900px 500px at 50% 110%, rgba(124,58,237,0.06), transparent 60%)
        `}}
      />

      {/* subtle grid — full visibility, no fade at edges */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:"linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)",
          backgroundSize:"48px 48px",
        }}
      />
    </>
  );
}
