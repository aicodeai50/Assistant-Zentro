"use client";
import { useEffect, useRef } from "react";

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Particles
    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? "#00e5ff" : Math.random() > 0.5 ? "#00ff88" : "#ffffff",
    }));

    const CONNECTION_DIST = 140;

    function draw(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);

      // Deep space base
      const bg = ctx.createRadialGradient(w * 0.15, h * 0.1, 0, w * 0.5, h * 0.5, w * 0.9);
      bg.addColorStop(0, "rgba(0,20,40,1)");
      bg.addColorStop(0.4, "rgba(2,5,12,1)");
      bg.addColorStop(1, "rgba(1,2,6,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Ambient cyan glow top-left
      const g1 = ctx.createRadialGradient(w * 0.05, h * 0.05, 0, w * 0.05, h * 0.05, w * 0.55);
      g1.addColorStop(0, "rgba(0,229,255,0.06)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Ambient green glow top-right
      const g2 = ctx.createRadialGradient(w * 0.92, h * 0.08, 0, w * 0.92, h * 0.08, w * 0.45);
      g2.addColorStop(0, "rgba(0,255,136,0.05)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Ambient purple glow bottom
      const g3 = ctx.createRadialGradient(w * 0.5, h * 1.1, 0, w * 0.5, h * 1.1, w * 0.6);
      g3.addColorStop(0, "rgba(124,58,237,0.07)");
      g3.addColorStop(1, "transparent");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(0,229,255,0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Horizontal scan line sweep
      const sweep = (t * 0.00004) % 1;
      const sweepY = sweep * h;
      const sweepGrad = ctx.createLinearGradient(0, sweepY - 60, 0, sweepY + 2);
      sweepGrad.addColorStop(0, "transparent");
      sweepGrad.addColorStop(1, "rgba(0,229,255,0.04)");
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, sweepY - 60, w, 62);

      // Move + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.opacity})`).replace("rgb", "rgba").replace("#00e5ff", `rgba(0,229,255,${p.opacity})`).replace("#00ff88", `rgba(0,255,136,${p.opacity})`).replace("#ffffff", `rgba(255,255,255,${p.opacity})`);
        ctx.fill();
      }

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Bottom fade to black
      const bottomFade = ctx.createLinearGradient(0, h * 0.7, 0, h);
      bottomFade.addColorStop(0, "transparent");
      bottomFade.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
