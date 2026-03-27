"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03040a]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.42] animate-[wallpaperFloat_20s_ease-in-out_infinite]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ filter: "brightness(1.18) contrast(1.08) saturate(1.05)" }}
      >
        <source src="/shynvo-wallpaper.mp4" type="video/mp4" />
      </video>

      {/* top and middle glow to make wallpaper more visible */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.09),transparent_24%),radial-gradient(circle_at_78%_24%,rgba(167,139,250,0.10),transparent_26%),radial-gradient(circle_at_50%_42%,rgba(96,165,250,0.08),transparent_24%)]" />

      {/* subtle grid for tech feel */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* floating light sweep */}
      <div className="absolute inset-y-0 left-[-18%] w-[18%] bg-white/8 blur-2xl animate-[wallpaperSweep_16s_linear_infinite]" />

      {/* readability veil */}
      <div className="absolute inset-0 bg-black/18" />

      {/* darker lower section so footer and lower text stay readable */}
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/46 via-black/24 to-transparent" />

      <style jsx>{`
        @keyframes wallpaperFloat {
          0%, 100% {
            transform: scale(1.02) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.08) translate3d(0, -10px, 0);
          }
        }

        @keyframes wallpaperSweep {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(760%);
          }
        }
      `}</style>
    </div>
  );
}
