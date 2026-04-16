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
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const tick=()=>setTime(new Date().toISOString().slice(11,19));
    tick();
    const id=setInterval(tick,1000);
    return ()=>clearInterval(id);
  },[]);

  useEffect(()=>{ setOpen(false); },[pathname]);

  const mono={fontFamily:"var(--font-space-mono,monospace)"} as React.CSSProperties;
  const sans={fontFamily:"var(--font-syne,sans-serif)"} as React.CSSProperties;

  return (
    <>
      <style>{`
        .shn-link{font-family:var(--font-space-mono,monospace);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-decoration:none;padding:4px 0;position:relative;transition:color 0.15s;white-space:nowrap;}
        .shn-link::after{content:'';position:absolute;bottom:-1px;left:0;width:0;height:1px;background:#00e5ff;transition:width 0.18s;}
        .shn-link:hover{color:rgba(255,255,255,0.9);}
        .shn-link:hover::after,.shn-link.act::after{width:100%;}
        .shn-link.act{color:#00e5ff;}
      `}</style>

      <header style={{position:"sticky",top:0,zIndex:80,borderBottom:scrolled?"1px solid rgba(0,229,255,0.1)":"1px solid transparent",background:scrolled?"rgba(2,5,8,0.96)":"rgba(2,5,8,0.75)",backdropFilter:"blur(20px)",transition:"background 0.3s,border-color 0.3s"}}>
        {/* HUD strip */}
        <div style={{borderBottom:"1px solid rgba(0,229,255,0.05)",padding:"3px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{...mono,fontSize:8,color:"rgba(0,229,255,0.38)",letterSpacing:"0.14em",textTransform:"uppercase"}}>SHYNVO · STRUCTURED AI PLATFORM</span>
          <span style={{...mono,fontSize:8,color:"rgba(0,229,255,0.3)",letterSpacing:"0.1em"}}>{time} UTC</span>
        </div>

        {/* Main nav */}
        <nav style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",height:48,display:"flex",alignItems:"center",gap:0}}>
          {/* Logo — fixed width */}
          <Link href="/" style={{...sans,fontWeight:800,fontSize:16,color:"#fff",textDecoration:"none",letterSpacing:"-0.02em",display:"flex",alignItems:"center",gap:7,flexShrink:0,marginRight:32}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#00e5ff",boxShadow:"0 0 9px rgba(0,229,255,0.9)",display:"inline-block",animation:"sh-pulse-c 2s ease-in-out infinite"}}/>
            Shynvo
          </Link>

          {/* Center links */}
          <div style={{display:"flex",alignItems:"center",gap:22,flex:1}} className="hidden md:flex">
            {NAV.map(l=><Link key={l.href} href={l.href} className={`shn-link ${pathname===l.href?"act":""}`}>{l.label}</Link>)}
          </div>

          {/* Right — always in one row, no wrap */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:"auto"}} className="hidden md:flex">
            <Link href="/sign-in" style={{...mono,fontSize:10,color:"rgba(255,255,255,0.5)",textDecoration:"none",letterSpacing:"0.07em",textTransform:"uppercase",padding:"6px 10px",whiteSpace:"nowrap"}}>Sign in</Link>
            <Link href="/docs" style={{...mono,fontSize:10,fontWeight:700,color:"#040810",background:"#00e5ff",padding:"7px 14px",borderRadius:3,textDecoration:"none",letterSpacing:"0.07em",textTransform:"uppercase",boxShadow:"0 0 16px rgba(0,229,255,0.28)",whiteSpace:"nowrap"}}>Get Started</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={()=>setOpen(p=>!p)} className="flex md:hidden" style={{...mono,background:"none",border:"1px solid rgba(0,229,255,0.2)",borderRadius:3,padding:"6px 10px",cursor:"pointer",color:"#00e5ff",fontSize:11,marginLeft:"auto"}}>
            {open?"✕":"≡"}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{position:"fixed",inset:0,top:75,background:"#020508",zIndex:90,padding:20,borderTop:"1px solid rgba(0,229,255,0.1)",display:"flex",flexDirection:"column",gap:0,overflowY:"auto"}} className="md:hidden">
          {[...NAV,{href:"/university",label:"University Hub"},{href:"/frontier",label:"Frontier Lab"},{href:"/robot",label:"Robot"}].map(l=>(
            <Link key={l.href} href={l.href} style={{...mono,fontSize:13,color:pathname===l.href?"#00e5ff":"rgba(255,255,255,0.7)",textDecoration:"none",padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",letterSpacing:"0.07em",textTransform:"uppercase"}}>{l.label}</Link>
          ))}
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>
            <Link href="/sign-in" style={{...mono,fontSize:12,color:"rgba(255,255,255,0.6)",textDecoration:"none",textAlign:"center",padding:"12px",border:"1px solid rgba(255,255,255,0.08)",borderRadius:3,letterSpacing:"0.07em",textTransform:"uppercase"}}>Sign In</Link>
            <Link href="/docs" style={{...mono,fontSize:12,fontWeight:700,color:"#040810",background:"#00e5ff",textDecoration:"none",textAlign:"center",padding:"12px",borderRadius:3,letterSpacing:"0.07em",textTransform:"uppercase"}}>Get Started</Link>
          </div>
        </div>
      )}
    </>
  );
}
