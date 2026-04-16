import Link from "next/link";

const C = "#a855f7";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const LABS = [
  { href:"/frontier/coding",     title:"Coding Arena",         desc:"AI-assisted workspace for products, websites, tools, and Python.", tags:["Build","AI","Projects"],    status:"Adaptive"   },
  { href:"/frontier/algorithms", title:"Algorithm Challenges", desc:"Reasoning chamber for system problems, graphs, and structured logic.", tags:["Graphs","Logic","Systems"], status:"Reasoning"  },
  { href:"/frontier/ai-bots",    title:"AI Bot Lab",           desc:"Experiment with AI mode, tone, purpose, and response behavior.",    tags:["AI","Modes","Prompting"],  status:"Simulation" },
  { href:"/frontier/puzzles",    title:"Logic Puzzles",        desc:"Train deduction with layered hints and guided reasoning.",          tags:["Puzzles","Hints","Logic"],  status:"Training"   },
];

export default function FrontierLabPage() {
  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 8px ${C}`,display:"inline-block",flexShrink:0}}/>
              <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.75}}>Frontier Lab · Engineering Layer</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>
              Engineering District
            </h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75,marginBottom:14}}>
              Build with code, solve technical problems, and explore structured system thinking. Each lab guides — it does not just display.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Link href="/" style={{...mono,fontSize:9,color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:3,padding:"5px 10px",textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase"}}>← Home</Link>
              <Link href="/docs" style={{...mono,fontSize:9,color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:3,padding:"5px 10px",textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase"}}>Docs</Link>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:180}}>
            {[{l:"Layer",v:"Frontier"},{l:"Mode",v:"Engineering"},{l:"Status",v:"Online"},{l:"Labs",v:`${LABS.length} Active`}].map(x=>(
              <div key={x.l} style={{background:"rgba(168,85,247,0.04)",border:"1px solid rgba(168,85,247,0.12)",borderRadius:4,padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Labs */}
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0 12px"}}>
        <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(168,85,247,0.25),transparent)`}}/>
        <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.6}}>Active Labs</span>
        <div style={{flex:1,height:1,background:`linear-gradient(270deg,rgba(168,85,247,0.25),transparent)`}}/>
      </div>
      <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))"}}>
        {LABS.map(lab=>(
          <Link key={lab.href} href={lab.href} className="env-card" style={{textDecoration:"none"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.25,pointerEvents:"none"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{lab.title}</div>
              <span style={{...mono,fontSize:8,color:C,border:`1px solid rgba(168,85,247,0.22)`,borderRadius:3,padding:"2px 6px",letterSpacing:"0.08em",textTransform:"uppercase",flexShrink:0}}>{lab.status}</span>
            </div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.44)",lineHeight:1.68,marginBottom:10}}>{lab.desc}</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {lab.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
            </div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Enter Lab →</div>
          </Link>
        ))}
      </div>

      {/* Signal readouts */}
      <div style={{display:"grid",gap:10,marginTop:14,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))"}}>
        {[
          {l:"AI Guidance",v:"Active",d:"Every lab route responds as an interactive AI workspace."},
          {l:"User Direction",v:"Improved",d:"Each area interprets, guides, and continues your workflow."},
          {l:"Lab Feel",v:"Future-facing",d:"Frontier is a living AI environment, not a static menu."},
        ].map(s=>(
          <div key={s.l} className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
              <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.l}</span>
              <span style={{...mono,fontSize:8,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>{s.v}</span>
            </div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.42)",lineHeight:1.65}}>{s.d}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="env-panel" style={{"--env-color":C,marginTop:14} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:6}}>Start Here</div>
            <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>New to Frontier Lab?</div>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",maxWidth:380,lineHeight:1.7}}>
              Start with Coding Arena, move into Algorithm Challenges, then explore AI Bot Lab for advanced behavior.
            </p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Link href="/frontier/coding" style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"9px 16px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:`0 0 16px rgba(168,85,247,0.3)`}}>Start Coding Arena</Link>
            <Link href="/frontier/algorithms" style={{...mono,fontSize:10,color:C,border:`1px solid rgba(168,85,247,0.28)`,padding:"9px 14px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Algorithms</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
