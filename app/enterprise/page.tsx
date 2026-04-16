"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const C = "#00ff88";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const SECTORS = [
  { key:"dashboard", title:"Command Center",  signal:"Executive overview",      subtitle:"Company-wide operational overview and quick access.",        href:"/enterprise/dashboard", tags:["Status","Overview","Access"] },
  { key:"teams",     title:"Teams",            signal:"Org structure",           subtitle:"Departments, members, and role structure.",                  href:"/enterprise/teams",     tags:["Departments","Roles","Members"] },
  { key:"rooms",     title:"Rooms",            signal:"Collaboration layer",     subtitle:"Team spaces for communication and collaboration.",           href:"/enterprise/rooms",     tags:["Meetings","Workspaces","Rooms"] },
  { key:"missions",  title:"Missions",         signal:"Execution engine",        subtitle:"Execution flows tied to company goals.",                    href:"/enterprise/missions",  tags:["Goals","Phases","Delivery"] },
  { key:"skills",    title:"Skill Matrix",     signal:"Capability mapping",      subtitle:"Capability mapping and growth visibility.",                 href:"/enterprise/skills",    tags:["Skills","Growth","Coverage"] },
  { key:"strategy",  title:"AI Strategy",      signal:"Decision intelligence",   subtitle:"Structured reasoning for leadership decisions.",            href:"/enterprise/strategy",  tags:["Leadership","Planning","AI"] },
  { key:"analytics", title:"Analytics",        signal:"Performance visibility",  subtitle:"Operational insight into progress and output.",             href:"/enterprise/analytics", tags:["Progress","Workload","Output"] },
  { key:"directory", title:"Directory",        signal:"People index",            subtitle:"Browse company members across roles and teams.",            href:"/enterprise/directory", tags:["People","Roles","Directory"] },
  { key:"schedule",  title:"Schedule",         signal:"Coordination layer",      subtitle:"Track meetings, room sessions, and team coordination.",     href:"/enterprise/schedule",  tags:["Meetings","Calendar","Flow"] },
  { key:"chat",      title:"Company Chat",     signal:"Internal comms",          subtitle:"Internal communication layer for the organization.",        href:"/enterprise/chat",      tags:["Chat","Messages","Updates"] },
  { key:"os",        title:"OS Core",          signal:"Operating layer",         subtitle:"Execution systems, robots, timelines, and cognitive flow.", href:"/enterprise/os",        tags:["Focus","Robots","Timeline"] },
];

function suggestSector(p:string){
  const t=p.toLowerCase();
  if(t.includes("team")||t.includes("department")) return SECTORS.find(s=>s.key==="teams")!;
  if(t.includes("room")||t.includes("meeting")) return SECTORS.find(s=>s.key==="rooms")!;
  if(t.includes("mission")||t.includes("goal")) return SECTORS.find(s=>s.key==="missions")!;
  if(t.includes("skill")||t.includes("capability")) return SECTORS.find(s=>s.key==="skills")!;
  if(t.includes("strategy")||t.includes("decision")) return SECTORS.find(s=>s.key==="strategy")!;
  if(t.includes("analytics")||t.includes("performance")) return SECTORS.find(s=>s.key==="analytics")!;
  return SECTORS.find(s=>s.key==="dashboard")!;
}

export default function EnterprisePage() {
  const router = useRouter();
  const [command,setCommand]=useState("");
  const [selected,setSelected]=useState("dashboard");
  const selectedSector=SECTORS.find(s=>s.key===selected)??SECTORS[0];
  const suggested=useMemo(()=>command.trim()?suggestSector(command):selectedSector,[command,selectedSector]);

  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>
      <EnterpriseNav label="Enterprise Layer: Online"/>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <span className="env-dot" style={{background:C,boxShadow:`0 0 6px ${C}`,animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
              <span className="env-label" style={{color:C}}>Shynvo Enterprise · Operating Layer</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>
              Unified Enterprise Environment
            </h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75}}>
              Team coordination, missions, strategy, analytics, and OS intelligence in one enterprise workspace.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:200}}>
            {[{l:"Workspace",v:"Enterprise"},{l:"Current Sector",v:selectedSector.title},{l:"Status",v:"Ready"}].map(x=>(
              <div key={x.l} style={{background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.1)",borderRadius:4,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Command + routing */}
      <div style={{display:"grid",gap:14,marginTop:14}} className="lg:grid-cols-[1.2fr_0.8fr]">
        <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
          <div className="env-label" style={{color:C,marginBottom:8}}>Enterprise Command</div>
          <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:6}}>What does the company need next?</div>
          <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.7,marginBottom:12}}>Type a request and the system routes you to the right sector.</p>
          <input value={command} onChange={e=>setCommand(e.target.value)}
            placeholder="Example: review team workload and prepare a leadership decision"
            style={{...mono,width:"100%",height:42,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(0,255,136,0.1)",borderRadius:4,padding:"0 12px",fontSize:11,color:"rgba(255,255,255,0.85)",outline:"none"}}
          />
          <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
            <button onClick={()=>router.push(suggested.href)}
              style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"8px 16px",borderRadius:3,border:"none",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"}}
            >Open Suggested Sector</button>
            <Link href="/enterprise/help" style={{...mono,fontSize:10,color:"rgba(255,255,255,0.55)",border:"1px solid rgba(255,255,255,0.1)",padding:"8px 14px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Support</Link>
          </div>
        </div>

        <Link href={suggested.href} className="env-panel" style={{"--env-color":C,textDecoration:"none",display:"block"} as React.CSSProperties}>
          <div className="env-label" style={{color:C,marginBottom:8}}>Suggested Routing</div>
          <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:6}}>{suggested.title}</div>
          <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.65,marginBottom:10}}>{suggested.subtitle}</p>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
            {suggested.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
          </div>
          <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Open sector →</div>
        </Link>
      </div>

      {/* Quick sectors */}
      <div style={{display:"grid",gap:10,marginTop:14,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))"}}>
        {SECTORS.slice(0,4).map(s=>(
          <Link key={s.key} href={s.href} className="env-card" onMouseEnter={()=>setSelected(s.key)}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.2,pointerEvents:"none"}}/>
            <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{s.title}</div>
            <div style={{...mono,fontSize:10,color:"rgba(255,255,255,0.42)",marginBottom:6}}>{s.subtitle}</div>
            <div style={{...mono,fontSize:8,color:C,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.signal}</div>
          </Link>
        ))}
      </div>

      {/* All sectors */}
      <div style={{marginTop:28}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(0,255,136,0.25),transparent)`}}/>
          <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.65}}>All Enterprise Sectors</span>
          <div style={{flex:1,height:1,background:`linear-gradient(270deg,rgba(0,255,136,0.25),transparent)`}}/>
        </div>
        <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))"}}>
          {SECTORS.map(s=>(
            <Link key={s.key} href={s.href} className="env-card">
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.15,pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
                <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{s.title}</div>
                <span style={{...mono,fontSize:8,color:C,border:`1px solid rgba(0,255,136,0.2)`,borderRadius:3,padding:"2px 6px",letterSpacing:"0.06em",textTransform:"uppercase",flexShrink:0}}>Active</span>
              </div>
              <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.42)",lineHeight:1.6,marginBottom:8}}>{s.subtitle}</p>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                {s.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
              </div>
              <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Open sector →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
