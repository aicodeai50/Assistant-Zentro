"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href:"/pricing", label:"Pricing" },
  { href:"/docs",    label:"Docs"    },
  { href:"/contact", label:"Contact" },
  { href:"/search",  label:"Search"  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const tick=()=>setTime(new Date().toISOString().slice(11,19));
    tick();
    const id=setInterval(tick,1000);
    return()=>clearInterval(id);
  },[]);

  useEffect(()=>{ setOpen(false); },[pathname]);

  return (
    <>
      <style>{`
        .shn-link {
          font-family: var(--font-space-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          padding: 2px 0;
          transition: color 0.15s;
          line-height: 1;
        }
        .shn-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00e5ff;
          transition: width 0.18s;
        }
        .shn-link:hover { color: rgba(255,255,255,0.9); }
        .shn-link:hover::after, .shn-link.act::after { width: 100%; }
        .shn-link.act { color: #00e5ff; }
      `}</style>

      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 80,
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.1)" : "1px solid transparent",
        background: scrolled ? "rgba(2,5,8,0.96)" : "rgba(2,5,8,0.8)",
        backdropFilter: "blur(20px)",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {/* HUD strip */}
        <div style={{
          borderBottom: "1px solid rgba(0,229,255,0.05)",
          padding: "3px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:"rgba(0,229,255,0.38)",letterSpacing:"0.14em",textTransform:"uppercase"}}>
            SHYNVO · STRUCTURED AI PLATFORM
          </span>
          <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:"rgba(0,229,255,0.3)",letterSpacing:"0.1em"}}>
            {time} UTC
          </span>
        </div>

        {/* ── MAIN NAV ROW — everything in one flex line, no wrap ── */}
        <nav style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          height: 50,
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: 0,
          overflow: "hidden",
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontFamily: "var(--font-syne,sans-serif)",
            fontWeight: 800,
            fontSize: 16,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: 7,
            flexShrink: 0,
            marginRight: 28,
            whiteSpace: "nowrap",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#00e5ff",boxShadow:"0 0 9px rgba(0,229,255,0.9)",display:"inline-block",flexShrink:0}}/>
            Shynvo
          </Link>

          {/* Nav links — hidden on mobile */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flex: 1,
            flexWrap: "nowrap",
          }} className="hidden md:flex">
            {NAV.map(l=>(
              <Link key={l.href} href={l.href} className={`shn-link ${pathname===l.href?"act":""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side — sign in + get started, always one line */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
            marginLeft: "auto",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
          }} className="hidden md:flex">
            <Link href="/sign-in" style={{
              fontFamily: "var(--font-space-mono,monospace)",
              fontSize: 10,
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              padding: "6px 10px",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}>
              Sign in
            </Link>
            <Link href="/docs" style={{
              fontFamily: "var(--font-space-mono,monospace)",
              fontSize: 10,
              fontWeight: 700,
              color: "#020508",
              background: "#00e5ff",
              padding: "7px 13px",
              borderRadius: 3,
              textDecoration: "none",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              lineHeight: 1,
              boxShadow: "0 0 14px rgba(0,229,255,0.25)",
            }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={()=>setOpen(p=>!p)}
            className="flex md:hidden"
            style={{
              fontFamily: "var(--font-space-mono,monospace)",
              background: "none",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: 3,
              padding: "6px 10px",
              cursor: "pointer",
              color: "#00e5ff",
              fontSize: 11,
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            {open ? "✕" : "≡"}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed",
          inset: 0,
          top: 73,
          background: "#020508",
          zIndex: 90,
          padding: 20,
          borderTop: "1px solid rgba(0,229,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          overflowY: "auto",
        }} className="md:hidden">
          {[...NAV,
            {href:"/university", label:"University Hub"},
            {href:"/frontier",   label:"Frontier Lab"},
            {href:"/robot",      label:"Robot"},
          ].map(l=>(
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--font-space-mono,monospace)",
              fontSize: 13,
              color: pathname===l.href ? "#00e5ff" : "rgba(255,255,255,0.7)",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>
            <Link href="/sign-in" style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:12,color:"rgba(255,255,255,0.6)",textDecoration:"none",textAlign:"center",padding:"12px",border:"1px solid rgba(255,255,255,0.08)",borderRadius:3,letterSpacing:"0.07em",textTransform:"uppercase"}}>
              Sign In
            </Link>
            <Link href="/docs" style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:12,fontWeight:700,color:"#020508",background:"#00e5ff",textDecoration:"none",textAlign:"center",padding:"12px",borderRadius:3,letterSpacing:"0.07em",textTransform:"uppercase"}}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
