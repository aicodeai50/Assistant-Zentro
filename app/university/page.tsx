import Link from "next/link";
import UniversityNav from "@/components/university/UniversityNav";
import { FACULTIES } from "@/_lib/university/data";

const C = "#3b82f6";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

export default function UniversityHubPage() {
  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>
      <UniversityNav/>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 6px ${C}`,display:"inline-block",flexShrink:0}}/>
              <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.75}}>University Hub · Academic Layer</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>
              Select a Faculty
            </h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75}}>
              Structured academic environment. Each faculty has a dedicated AI Teacher, Tutor, and Assistant — strict to its own domain.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:180}}>
            {[{l:"Environment",v:"University Hub"},{l:"Mode",v:"Academic"},{l:"Status",v:"Online"},{l:"Faculties",v:`${FACULTIES.length} Active`}].map(x=>(
              <div key={x.l} style={{background:"rgba(59,130,246,0.04)",border:"1px solid rgba(59,130,246,0.12)",borderRadius:4,padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0 12px"}}>
        <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(59,130,246,0.25),transparent)`}}/>
        <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.6}}>Available Faculties</span>
        <div style={{flex:1,height:1,background:`linear-gradient(270deg,rgba(59,130,246,0.25),transparent)`}}/>
      </div>

      {/* Faculty grid */}
      <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))"}}>
        {FACULTIES.map((f:any)=>(
          <Link key={f.key} href={`/university/${f.key}`} className="env-card" style={{textDecoration:"none"}} aria-label={`Open ${f.title}`}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.2,pointerEvents:"none"}}/>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10,gap:8}}>
              <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{f.title}</div>
              <span style={{...mono,fontSize:8,color:C,border:`1px solid rgba(59,130,246,0.22)`,borderRadius:3,padding:"2px 6px",letterSpacing:"0.06em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap"}}>Faculty</span>
            </div>
            {f.subtitle && <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.44)",lineHeight:1.65,marginBottom:10}}>{f.subtitle}</p>}
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {f.areas.slice(0,4).map((a:string)=><span key={a} className="env-tag">{a}</span>)}
            </div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Open faculty →</div>
          </Link>
        ))}
      </div>

      {/* Info strip */}
      <div style={{display:"grid",gap:10,marginTop:14,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))"}}>
        {[
          {l:"Academic AI",v:"Strict domain only — no cross-faculty bleed."},
          {l:"Tutor Mode",v:"Dedicated Teacher, Tutor, and Assistant per faculty."},
          {l:"Progression",v:"Structured paths from beginner to advanced."},
        ].map(s=>(
          <div key={s.l} className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,opacity:0.7}}>{s.l}</div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.44)",lineHeight:1.65}}>{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
