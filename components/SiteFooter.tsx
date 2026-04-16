import Link from "next/link";

const COLS = [
  { label:"Product",  links:[{href:"/docs",label:"Docs"},{href:"/pricing",label:"Pricing"},{href:"/search",label:"Search"}] },
  { label:"Platform", links:[{href:"/university",label:"University Hub"},{href:"/frontier",label:"Frontier Lab"},{href:"/enterprise",label:"Enterprise"},{href:"/robot",label:"Robot"}] },
  { label:"Company",  links:[{href:"/contact",label:"Contact"}] },
];
const LEGAL=[{href:"/terms",label:"Terms"},{href:"/privacy",label:"Privacy"},{href:"/refund",label:"Refund"}];
const TAGS=["AI-guided","Modular","Structured"];
const mono={fontFamily:"var(--font-space-mono,monospace)"} as React.CSSProperties;
const sans={fontFamily:"var(--font-syne,sans-serif)"} as React.CSSProperties;

export default function SiteFooter() {
  return (
    <footer style={{position:"relative",borderTop:"1px solid rgba(0,229,255,0.08)",background:"#010306"}}>
      <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.35),transparent)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"48px 20px 0"}}>
        <div style={{display:"grid",gap:36,marginBottom:36,gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))"}}>
          {/* Brand */}
          <div style={{gridColumn:"span 1"}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#00e5ff",boxShadow:"0 0 8px rgba(0,229,255,0.8)",display:"inline-block"}}/>
              <span style={{...sans,fontWeight:800,fontSize:16,color:"#fff",letterSpacing:"-0.02em"}}>Shynvo</span>
            </div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.38)",lineHeight:1.7,maxWidth:200}}>
              Structured AI platform for learning, building, and guided digital work.
            </p>
            <div style={{display:"flex",gap:5,marginTop:12,flexWrap:"wrap"}}>
              {TAGS.map(t=>(
                <span key={t} style={{...mono,fontSize:8,color:"#00e5ff",border:"1px solid rgba(0,229,255,0.18)",borderRadius:3,padding:"2px 7px",letterSpacing:"0.1em",textTransform:"uppercase"}}>{t}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col=>(
            <div key={col.label}>
              <div style={{...mono,fontSize:8,color:"rgba(0,229,255,0.45)",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:14}}>{col.label}</div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {col.links.map(l=>(
                  <Link key={l.href} href={l.href} style={{...mono,fontSize:11,color:"rgba(255,255,255,0.45)",textDecoration:"none",letterSpacing:"0.03em",transition:"color 0.15s"}}
                    onMouseEnter={e=>(e.currentTarget.style.color="#00e5ff")}
                    onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:"16px 0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{...mono,fontSize:9,color:"rgba(255,255,255,0.22)",letterSpacing:"0.07em"}}>
            © {new Date().getFullYear()} Shynvo. All rights reserved.
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {LEGAL.map(l=>(
              <Link key={l.href} href={l.href} style={{...mono,fontSize:9,color:"rgba(255,255,255,0.28)",textDecoration:"none",letterSpacing:"0.07em",transition:"color 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.28)")}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
