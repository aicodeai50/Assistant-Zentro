"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

const C = "#00e5ff";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const LABS = [
  { key:"debate",     title:"Debate Lab",        signal:"Decision intelligence",   subtitle:"Challenge decisions and arguments from multiple angles.",      href:"/experiments/debate",     tags:["Arguments","Reasoning","Counterpoints"] },
  { key:"simulation", title:"Simulation Lab",     signal:"Scenario modeling",       subtitle:"Explore likely futures and trade-offs before acting.",         href:"/experiments/simulation", tags:["Scenarios","Risk","Forecast"] },
  { key:"concept",    title:"Concept Forge",      signal:"Concept development",     subtitle:"Turn vague ideas into clear concepts and next steps.",         href:"/experiments/concept",    tags:["Ideas","Strategy","Innovation"] },
  { key:"practice",   title:"Practice Arena",     signal:"Performance rehearsal",   subtitle:"Rehearse interviews, presentations, and hard conversations.",  href:"/experiments/practice",   tags:["Interviews","Speaking","Preparation"] },
  { key:"rooms",      title:"Experiment Rooms",   signal:"Collaborative sessions",  subtitle:"Group testing, debate, and guided AI sessions.",              href:"/experiments/rooms",      tags:["Rooms","Collaboration","AI"] },
];

function suggestLab(p:string){
  const t=p.toLowerCase();
  if(t.includes("interview")||t.includes("practice")||t.includes("rehearse")) return LABS.find(l=>l.key==="practice")!;
  if(t.includes("idea")||t.includes("concept")||t.includes("build")) return LABS.find(l=>l.key==="concept")!;
  if(t.includes("risk")||t.includes("future")||t.includes("scenario")) return LABS.find(l=>l.key==="simulation")!;
  if(t.includes("team")||t.includes("group")||t.includes("room")) return LABS.find(l=>l.key==="rooms")!;
  return LABS.find(l=>l.key==="debate")!;
}

export default function ExperimentsPage() {
  const [prompt,setPrompt]=useState("");
  const [selected,setSelected]=useState("debate");
  const selectedLab=LABS.find(l=>l.key===selected)??LABS[0];
  const suggested=useMemo(()=>prompt.trim()?suggestLab(prompt):selectedLab,[prompt,selectedLab]);

  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>
      <style>{`:root{--env-color:${C}}`}</style>
      <ExperimentsNav/>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <span className="env-dot" style={{background:C,boxShadow:`0 0 6px ${C}`,animation:"sh-pulse-c 2s ease-in-out infinite"}}/>
              <span className="env-label" style={{color:C}}>Experiments · AI Exploration Layer</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>
              Experiment Command Center
            </h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75}}>
              Test ideas before committing. Challenge decisions, simulate outcomes, shape concepts, rehearse real situations.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:200}}>
            {[{l:"Layer",v:"Experiment"},{l:"Active Lab",v:selectedLab.title},{l:"Status",v:"Online"}].map(x=>(
              <div key={x.l} style={{background:"rgba(0,229,255,0.04)",border:"1px solid rgba(0,229,255,0.1)",borderRadius:4,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{display:"grid",gap:14,marginTop:14}} className="xl:grid-cols-[1.3fr_0.7fr]">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>

          {/* Command input */}
          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:8}}>Experiment Command</div>
            <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:6}}>What do you want to test?</div>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.7,marginBottom:14}}>
              Describe your goal. The system routes you to the right lab.
            </p>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
              placeholder="Example: I want to decide whether to focus on exams or continue building my app."
              style={{...mono,width:"100%",minHeight:100,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(0,229,255,0.1)",borderRadius:4,padding:"10px 12px",fontSize:11,color:"rgba(255,255,255,0.85)",outline:"none",resize:"vertical",lineHeight:1.7}}
            />
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
              {LABS.map(l=>(
                <button key={l.key} onClick={()=>setSelected(l.key)}
                  style={{...mono,fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",padding:"6px 12px",borderRadius:3,cursor:"pointer",border:`1px solid ${selected===l.key?C:"rgba(255,255,255,0.1)"}`,background:selected===l.key?`rgba(0,229,255,0.1)`:"transparent",color:selected===l.key?C:"rgba(255,255,255,0.5)",transition:"all 0.15s"}}
                >{l.title}</button>
              ))}
            </div>
          </div>

          {/* Suggested routing */}
          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:8}}>Suggested Routing</div>
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12}}>
              <div>
                <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>{suggested.title}</div>
                <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.65,maxWidth:340}}>{suggested.subtitle}</p>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:8}}>
                  {suggested.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
                </div>
              </div>
              <Link href={prompt.trim()?`${suggested.href}?prompt=${encodeURIComponent(prompt)}`:`${suggested.href}`}
                style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"9px 16px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap",boxShadow:`0 0 16px rgba(0,229,255,0.25)`}}
              >Enter Lab →</Link>
            </div>
          </div>

          {/* Labs grid */}
          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:12}}>Available Labs</div>
            <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))"}}>
              {LABS.map(l=>(
                <Link key={l.key} href={l.href} className="env-card">
                  <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.2,pointerEvents:"none"}}/>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{l.title}</div>
                    <span style={{...mono,fontSize:8,color:C,border:`1px solid rgba(0,229,255,0.2)`,borderRadius:3,padding:"2px 6px",letterSpacing:"0.08em",textTransform:"uppercase"}}>Active</span>
                  </div>
                  <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.42)",lineHeight:1.65,marginBottom:10}}>{l.subtitle}</p>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                    {l.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
                  </div>
                  <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Enter Lab →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:12}}>Live Context</div>
            {[{l:"Selected Lab",v:selectedLab.title},{l:"Signal Type",v:selectedLab.signal},{l:"Layer",v:"Experiment"},{l:"Status",v:"Online"}].map(x=>(
              <div key={x.l} style={{borderBottom:"1px solid rgba(255,255,255,0.04)",padding:"8px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:"rgba(255,255,255,0.75)"}}>{x.v}</span>
              </div>
            ))}
          </div>

          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:12}}>System Layers</div>
            {[{l:"Reasoning Layer",v:"Ready"},{l:"Scenario Layer",v:"Ready"},{l:"Practice Layer",v:"Ready"},{l:"Collaboration",v:"Available"}].map(x=>(
              <div key={x.l} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <span style={{...mono,fontSize:10,color:"rgba(255,255,255,0.55)"}}>{x.l}</span>
                <span style={{...mono,fontSize:9,color:C,opacity:0.7,letterSpacing:"0.08em",textTransform:"uppercase"}}>{x.v}</span>
              </div>
            ))}
          </div>

          <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div className="env-label" style={{color:C,marginBottom:12}}>Best Used For</div>
            {selectedLab.tags.map((t,i)=>(
              <div key={i} style={{...mono,fontSize:10,color:"rgba(255,255,255,0.5)",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <span style={{color:C,marginRight:6}}>›</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
