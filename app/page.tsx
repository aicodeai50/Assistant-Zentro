"use client";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import PreviewTypingLoop from "./components/PreviewTypingLoop";
import WelcomeRobot from "./components/WelcomeRobot";

const VALUES = [
  { tag:"01", title:"AI-Guided Intelligence Layer", desc:"Shynvo understands your intent and adapts to you. It recommends the right direction, adjusts guidance as you progress, and gives you clarity instead of chaos.", href:"/ai-guided-intelligence", glyph:"◈", color:"#00e5ff" },
  { tag:"02", title:"Modular Environment Architecture", desc:"Purpose-built environments for learning, building, and exploration — all connected through unified workflows.", href:"/modular-architecture", glyph:"⬡", color:"#00ff88" },
  { tag:"03", title:"Structured Progression System", desc:"Clear steps, guided paths, and AI-supported progression so users always know what to do next.", href:"/structured-progression", glyph:"◎", color:"#a855f7" },
];

const ENVS = [
  { id:"robot", title:"Shynvo Robot", sub:"Guide ready", desc:"AI guidance to navigate the platform.", href:"/robot", color:"#00e5ff", variant:"robot" as const, lines:["Analyzing your path...","Shynvo Robot ready...","Choose where to begin..."] },
  { id:"university", title:"University Hub", sub:"Faculty ready", desc:"Advanced learning and study areas.", href:"/university", color:"#00ff88", variant:"university" as const, lines:["Opening University Hub...","Study systems online...","Learning environments ready..."] },
  { id:"frontier", title:"Frontier Lab", sub:"System live", desc:"Innovative tech and engineering workflows.", href:"/frontier", color:"#a855f7", variant:"frontier" as const, lines:["Booting Frontier Lab...","Engineering mode active...","Research workflow ready..."] },
];

const mono:React.CSSProperties = {fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties = {fontFamily:"var(--font-syne,sans-serif)"};
const CYAN="#00e5ff", GREEN="#00ff88", PURPLE="#a855f7";

function Counter({to,suffix=""}:{to:number;suffix?:string}) {
  const [val,setVal]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return;obs.disconnect();
      let n=0;const step=()=>{n+=Math.ceil(to/40);if(n>=to){setVal(to);return;}setVal(n);requestAnimationFrame(step);};
      requestAnimationFrame(step);
    },{threshold:0.5});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function HomePage() {
  const [activeEnv,setActiveEnv]=useState(0);
  const [scanY,setScanY]=useState(0);
  useEffect(()=>{
    let f:number,s:number|null=null;
    const r=(ts:number)=>{if(!s)s=ts;setScanY(((ts-s)%3200)/3200*100);f=requestAnimationFrame(r);};
    f=requestAnimationFrame(r);
    return()=>cancelAnimationFrame(f);
  },[]);

  return (
    <main style={{position:"relative",overflow:"hidden",color:"#fff"}}>
      <style>{`
        @keyframes sh-pulse-g{0%,100%{opacity:1;box-shadow:0 0 8px #00ff88,0 0 20px rgba(0,255,136,.3)}50%{opacity:.6;box-shadow:0 0 4px #00ff88}}
        @keyframes sh-pulse-c{0%,100%{opacity:1;box-shadow:0 0 8px #00e5ff,0 0 20px rgba(0,229,255,.3)}50%{opacity:.6;box-shadow:0 0 4px #00e5ff}}
        .sh-val-card{background:#060c14;border:1px solid rgba(0,229,255,0.1);border-radius:6px;padding:24px;height:100%;position:relative;overflow:hidden;transition:border-color 0.2s,transform 0.2s;cursor:pointer;display:block;text-decoration:none;}
        .sh-val-card:hover{transform:translateY(-4px);}
        .sh-env-card{background:#060c14;border-radius:6px;padding:20px;position:relative;overflow:hidden;transition:all 0.2s;display:block;text-decoration:none;}
        .sh-tab-btn{font-family:var(--font-space-mono,monospace);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;border-radius:3px;padding:7px 14px;cursor:pointer;transition:all 0.2s;border:1px solid;}
      `}</style>

      {/* Ambient */}
      <div aria-hidden style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 90% 55% at 5% 0%,rgba(0,229,255,0.08),transparent 60%),radial-gradient(ellipse 70% 45% at 95% 5%,rgba(0,255,136,0.06),transparent 55%),radial-gradient(ellipse 80% 50% at 50% 105%,rgba(124,58,237,0.07),transparent 55%)"}}/>

      {/* ══ HERO ══ */}
      <section style={{maxWidth:1320,margin:"0 auto",padding:"56px 20px 72px",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:40,alignItems:"center"}} className="lg:grid-cols-[1fr_360px]">

          {/* Left copy */}
          <div>
            {/* Status pill */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(0,229,255,0.18)",borderRadius:20,padding:"5px 14px",marginBottom:24,background:"rgba(0,229,255,0.04)"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:GREEN,boxShadow:`0 0 8px ${GREEN}`,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
              <span style={{...mono,fontSize:10,color:GREEN,letterSpacing:"0.12em",textTransform:"uppercase"}}>Structured AI Platform · Online</span>
            </div>

            {/* Headline — controlled size */}
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.75rem,3.2vw,3rem)",lineHeight:1.1,letterSpacing:"-0.025em",color:"#fff",margin:"0 0 18px",maxWidth:560}}>
              One platform for{" "}
              <span style={{color:CYAN}}>learning,</span>{" "}
              building, and{" "}
              <span style={{color:GREEN}}>AI-guided</span>{" "}
              work
            </h1>

            <p style={{...mono,fontSize:12,color:"rgba(255,255,255,0.52)",lineHeight:1.85,marginBottom:30,maxWidth:440}}>
              Clear environments. Guided AI. Structured progress.
            </p>

            {/* CTAs */}
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
              <Link href="/docs" style={{...mono,fontSize:11,fontWeight:700,color:"#020508",background:CYAN,padding:"12px 24px",borderRadius:4,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:`0 0 28px rgba(0,229,255,0.32)`}}>
                Start Your Journey →
              </Link>
              <Link href="#platform-preview" style={{...mono,fontSize:11,color:"rgba(255,255,255,0.65)",border:"1px solid rgba(255,255,255,0.12)",padding:"12px 20px",borderRadius:4,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",background:"rgba(255,255,255,0.03)"}}>
                Explore Worlds
              </Link>
            </div>

            <p style={{...mono,fontSize:9,color:"rgba(255,255,255,0.22)",letterSpacing:"0.1em",marginBottom:32}}>
              NO SETUP REQUIRED · START INSTANTLY · ALL ENVIRONMENTS
            </p>

            {/* Stats */}
            <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
              {[{to:7,s:"",l:"Environments"},{to:4,s:" plans",l:"Pricing tiers"},{to:100,s:"%",l:"AI-guided"}].map(x=>(
                <div key={x.l}>
                  <div style={{...sans,fontWeight:800,fontSize:24,color:CYAN,lineHeight:1}}><Counter to={x.to} suffix={x.s}/></div>
                  <div style={{...mono,fontSize:9,color:"rgba(255,255,255,0.32)",marginTop:4,letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Robot prominently in hero */}
          <div className="hidden lg:block">
            <div style={{position:"relative",maxWidth:340,margin:"0 auto"}}>
              <div aria-hidden style={{position:"absolute",inset:-40,background:"radial-gradient(circle at 50% 45%,rgba(0,229,255,0.13),transparent 62%)",pointerEvents:"none",zIndex:0}}/>
              {/* Panel frame */}
              <div style={{position:"relative",zIndex:1,background:"rgba(6,12,20,0.7)",border:"1px solid rgba(0,229,255,0.15)",borderRadius:8,padding:16,backdropFilter:"blur(8px)"}}>
                {/* Panel header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,paddingBottom:10,borderBottom:"1px solid rgba(0,229,255,0.08)"}}>
                  <span style={{...mono,fontSize:9,color:CYAN,opacity:0.6,letterSpacing:"0.12em",textTransform:"uppercase"}}>SH-ROBOT · UNIT-01</span>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:GREEN,boxShadow:`0 0 6px ${GREEN}`,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                    <span style={{...mono,fontSize:8,color:GREEN,letterSpacing:"0.1em",textTransform:"uppercase"}}>Standby</span>
                  </div>
                </div>
                <WelcomeRobot/>
                <div style={{...mono,fontSize:9,color:CYAN,opacity:0.4,letterSpacing:"0.12em",textAlign:"center",marginTop:10}}>
                  Hello! Welcome to Shynvo.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile robot — shown below hero text on small screens */}
        <div className="lg:hidden" style={{marginTop:32,display:"flex",justifyContent:"center"}}>
          <div style={{maxWidth:280,width:"100%",background:"rgba(6,12,20,0.7)",border:"1px solid rgba(0,229,255,0.15)",borderRadius:8,padding:14}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,paddingBottom:8,borderBottom:"1px solid rgba(0,229,255,0.08)"}}>
              <span style={{...mono,fontSize:8,color:CYAN,opacity:0.6,letterSpacing:"0.1em",textTransform:"uppercase"}}>SH-ROBOT · UNIT-01</span>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{width:5,height:5,borderRadius:"50%",background:GREEN,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                <span style={{...mono,fontSize:8,color:GREEN,letterSpacing:"0.08em",textTransform:"uppercase"}}>Standby</span>
              </div>
            </div>
            <WelcomeRobot/>
            <div style={{...mono,fontSize:8,color:CYAN,opacity:0.4,letterSpacing:"0.1em",textAlign:"center",marginTop:8}}>Hello! Welcome to Shynvo.</div>
          </div>
        </div>
      </section>

      {/* ══ WHAT SHYNVO IS ══ */}
      <section style={{maxWidth:1320,margin:"0 auto",padding:"0 20px 80px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:36}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.28),transparent)"}}/>
          <span style={{...mono,fontSize:9,color:CYAN,letterSpacing:"0.2em",textTransform:"uppercase",opacity:0.65}}>What Shynvo Is</span>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.28),transparent)"}}/>
        </div>
        <div style={{display:"grid",gap:14,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,280px),1fr))"}}>
          {VALUES.map(item=>(
            <Link key={item.tag} href={item.href} className="sh-val-card"
              style={{"--hover-border":item.color} as React.CSSProperties}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${item.color}55`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(0,229,255,0.1)";}}
            >
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${item.color},transparent)`,opacity:0.35,pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <span style={{...mono,fontSize:9,color:item.color,opacity:0.55,letterSpacing:"0.12em"}}>_{item.tag}</span>
                <span style={{fontSize:22,color:item.color,opacity:0.55}}>{item.glyph}</span>
              </div>
              <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:10,lineHeight:1.35}}>{item.title}</div>
              <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.46)",lineHeight:1.75,marginBottom:18}}>{item.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{...mono,fontSize:9,color:item.color,letterSpacing:"0.1em",textTransform:"uppercase"}}>Learn more</span>
                <span style={{color:item.color,fontSize:14}}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ PLATFORM PREVIEW ══ */}
      <section id="platform-preview" style={{maxWidth:1320,margin:"0 auto",padding:"0 20px 80px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.28),transparent)"}}/>
          <span style={{...mono,fontSize:9,color:CYAN,letterSpacing:"0.2em",textTransform:"uppercase",opacity:0.65}}>Platform Environments</span>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.28),transparent)"}}/>
        </div>
        <h2 style={{...sans,fontWeight:800,fontSize:"clamp(1.3rem,2.8vw,2.2rem)",letterSpacing:"-0.02em",textAlign:"center",color:"#fff",marginBottom:28}}>
          What the platform looks like
        </h2>

        {/* Tabs */}
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
          {ENVS.map((env,i)=>(
            <button key={env.id} onClick={()=>setActiveEnv(i)} className="sh-tab-btn"
              style={{color:activeEnv===i?"#020508":"rgba(255,255,255,0.5)",background:activeEnv===i?env.color:"transparent",borderColor:activeEnv===i?env.color:"rgba(255,255,255,0.1)",boxShadow:activeEnv===i?`0 0 18px ${env.color}45`:"none"}}
            >{env.title}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{display:"grid",gap:14,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))"}}>
          {ENVS.map((env,i)=>(
            <Link key={env.id} href={env.href} className="sh-env-card"
              style={{border:`1px solid ${activeEnv===i?env.color+"45":"rgba(0,229,255,0.08)"}`,transform:activeEnv===i?"translateY(-4px)":"none",boxShadow:activeEnv===i?`0 8px 28px rgba(0,0,0,0.45),0 0 0 1px ${env.color}18`:"none"}}
            >
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${env.color},transparent)`,opacity:activeEnv===i?0.55:0.12,pointerEvents:"none"}}/>
              {/* Card corners */}
              {[{top:5,left:5,borderTop:`1px solid ${env.color}`,borderLeft:`1px solid ${env.color}`},{top:5,right:5,borderTop:`1px solid ${env.color}`,borderRight:`1px solid ${env.color}`},{bottom:5,left:5,borderBottom:`1px solid ${env.color}`,borderLeft:`1px solid ${env.color}`},{bottom:5,right:5,borderBottom:`1px solid ${env.color}`,borderRight:`1px solid ${env.color}`}].map((s,ci)=>(
                <div key={ci} aria-hidden style={{position:"absolute",width:9,height:9,opacity:activeEnv===i?0.65:0.18,...s as any}}/>
              ))}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{env.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:GREEN,boxShadow:`0 0 6px ${GREEN}`,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                  <span style={{...mono,fontSize:8,color:GREEN,letterSpacing:"0.1em",textTransform:"uppercase"}}>System Live</span>
                </div>
              </div>
              <div style={{...mono,fontSize:9,color:env.color,opacity:0.65,marginBottom:8,letterSpacing:"0.08em"}}>{env.sub}</div>
              <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.46)",lineHeight:1.68,marginBottom:12}}>{env.desc}</p>
              <div style={{background:"#020508",border:"1px solid rgba(0,229,255,0.07)",borderRadius:3,padding:10,position:"relative",overflow:"hidden"}}>
                {activeEnv===i&&<div aria-hidden style={{position:"absolute",left:0,right:0,height:2,top:`${scanY}%`,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.28),transparent)",pointerEvents:"none",zIndex:5}}/>}
                <div style={{...mono,fontSize:8,color:env.color,opacity:0.42,marginBottom:5,letterSpacing:"0.1em"}}>local loop ▌</div>
                <PreviewTypingLoop variant={env.variant} lines={env.lines}/>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.32)",letterSpacing:"0.07em",textTransform:"uppercase"}}>Open preview</span>
                <span style={{color:env.color,fontSize:13}}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ FEATURE STRIP ══ */}
      <section style={{position:"relative",zIndex:1,margin:"0 0 72px",borderTop:"1px solid rgba(0,229,255,0.06)",borderBottom:"1px solid rgba(0,229,255,0.06)",background:"rgba(0,229,255,0.018)",padding:"28px 20px"}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"flex",gap:0,flexWrap:"wrap",justifyContent:"space-around"}}>
          {[{l:"Multi-environment",d:"One login, every world"},{l:"AI-native",d:"Guided from first click"},{l:"Modular by design",d:"Only what you need"},{l:"Structured paths",d:"Always know next step"},{l:"Mobile-ready",d:"iOS & Android apps"}].map(f=>(
            <div key={f.l} style={{textAlign:"center",padding:"8px 16px",minWidth:140}}>
              <div style={{...sans,fontSize:12,fontWeight:600,color:"#fff",marginBottom:3}}>{f.l}</div>
              <div style={{...mono,fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.02em"}}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ QR MOBILE ══ */}
      <section style={{maxWidth:1320,margin:"0 auto",padding:"0 20px 80px",position:"relative",zIndex:1}}>
        <div style={{background:"#060c14",border:"1px solid rgba(0,229,255,0.12)",borderRadius:6,padding:"36px 28px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.4),transparent)",pointerEvents:"none"}}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,textAlign:"center"}} className="md:flex-row md:text-left md:justify-between">
            <div>
              <div style={{...mono,fontSize:9,color:CYAN,opacity:0.55,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10}}>Mobile Access</div>
              <div style={{...sans,fontWeight:800,fontSize:"clamp(1.2rem,2.5vw,1.7rem)",color:"#fff",marginBottom:8}}>Scan to explore Shynvo</div>
              <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.4)",maxWidth:300,lineHeight:1.7}}>Continue your journey on mobile. Same environments, same AI guidance.</p>
            </div>
            <div style={{background:"#fff",padding:12,borderRadius:4,boxShadow:"0 0 32px rgba(0,229,255,0.14)",flexShrink:0}}>
              <QRCodeSVG value="https://shynvo.app" size={96} bgColor="#ffffff" fgColor="#020508"/>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{maxWidth:1320,margin:"0 auto",padding:"0 20px 100px",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{...mono,fontSize:9,color:CYAN,opacity:0.42,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:14}}>Begin Now</div>
        <h2 style={{...sans,fontWeight:800,fontSize:"clamp(1.5rem,3.5vw,2.8rem)",letterSpacing:"-0.02em",color:"#fff",marginBottom:12,lineHeight:1.08}}>
          Hello! Welcome to Shynvo.
        </h2>
        <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.4)",maxWidth:360,margin:"0 auto 28px",lineHeight:1.8}}>
          Choose your starting environment and let the Robot guide you from there.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/docs" style={{...mono,fontSize:11,fontWeight:700,color:"#020508",background:CYAN,padding:"12px 26px",borderRadius:4,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:`0 0 32px rgba(0,229,255,0.35)`}}>
            Start Your Journey
          </Link>
          <Link href="/robot" style={{...mono,fontSize:11,color:CYAN,border:`1px solid rgba(0,229,255,0.28)`,padding:"12px 20px",borderRadius:4,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",background:"rgba(0,229,255,0.04)"}}>
            Open Robot
          </Link>
        </div>
      </section>
    </main>
  );
}
