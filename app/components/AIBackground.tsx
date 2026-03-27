"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#03040a]" />

      {/* stronger floating blobs */}
      <div className="absolute -left-32 top-[-20px] h-[680px] w-[680px] rounded-full bg-violet-400/22 blur-[120px] animate-[floatA_16s_ease-in-out_infinite]" />
      <div className="absolute right-[-160px] top-[40px] h-[760px] w-[760px] rounded-full bg-blue-400/20 blur-[130px] animate-[floatB_20s_ease-in-out_infinite]" />
      <div className="absolute left-[18%] bottom-[-220px] h-[700px] w-[700px] rounded-full bg-fuchsia-400/14 blur-[130px] animate-[floatC_18s_ease-in-out_infinite]" />
      <div className="absolute left-[40%] top-[22%] h-[360px] w-[360px] rounded-full bg-cyan-300/10 blur-[100px] animate-[floatD_14s_ease-in-out_infinite]" />

      {/* brighter layered glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(167,139,250,0.18),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(96,165,250,0.16),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(217,70,239,0.12),transparent_22%),radial-gradient(circle_at_48%_42%,rgba(103,232,249,0.10),transparent_18%)]" />

      {/* more visible floating sweep */}
      <div className="absolute inset-y-0 left-[-20%] w-[20%] bg-white/10 blur-2xl animate-[sweep_14s_linear_infinite]" />
      <div className="absolute inset-y-0 right-[-18%] w-[18%] bg-violet-300/10 blur-2xl animate-[sweepReverse_18s_linear_infinite]" />

      {/* slightly stronger grid */}
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* brighter nodes */}
      <div className="absolute left-[14%] top-[16%] h-3.5 w-3.5 rounded-full bg-violet-300/95 shadow-[0_0_28px_rgba(196,181,253,0.98)] animate-pulse" />
      <div className="absolute left-[76%] top-[52%] h-3.5 w-3.5 rounded-full bg-blue-300/95 shadow-[0_0_28px_rgba(147,197,253,0.98)] animate-pulse" />
      <div className="absolute left-[48%] top-[40%] h-3 w-3 rounded-full bg-fuchsia-300/90 shadow-[0_0_24px_rgba(240,171,252,0.95)] animate-pulse" />
      <div className="absolute left-[58%] top-[24%] h-2.5 w-2.5 rounded-full bg-cyan-300/90 shadow-[0_0_22px_rgba(103,232,249,0.95)] animate-pulse" />

      {/* lighter readability veil so wallpaper stays visible */}
      <div className="absolute inset-0 bg-black/6" />

      <style jsx>{`
        @keyframes floatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(120px, 56px, 0) scale(1.12); }
        }

        @keyframes floatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-140px, 70px, 0) scale(1.14); }
        }

        @keyframes floatC {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(100px, -72px, 0) scale(1.10); }
        }

        @keyframes floatD {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-70px, 48px, 0) scale(1.08); }
        }

        @keyframes sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(760%); }
        }

        @keyframes sweepReverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(-760%); }
        }
      `}</style>
    </div>
  );
}
