import Link from "next/link";

const mono={fontFamily:"var(--font-space-mono,monospace)"} as React.CSSProperties;
const sans={fontFamily:"var(--font-syne,sans-serif)"} as React.CSSProperties;
const CYAN="#00e5ff";

export default function SiteFooter() {
  return (
    <footer style={{position:"relative",borderTop:"1px solid rgba(0,229,255,0.08)",background:"#010306"}}>
      <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.35),transparent)",pointerEvents:"none"}}/>
      <div style={{maxWidth:960,margin:"0 auto",padding:"48px 20px 0"}}>

        {/* 4 column grid — explicit, never collapses */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:32}} className="max-sm:grid-cols-2">

          {/* Brand */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:CYAN,boxShadow:"0 0 8px rgba(0,229,255,0.8)",display:"inline-block",flexShrink:0}}/>
              <span style={{...sans,fontWeight:800,fontSize:15,color:"#fff",letterSpacing:"-0.02em"}}>Shynvo</span>
            </div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.36)",lineHeight:1.7,marginBottom:12,maxWidth:200}}>
              Structured AI platform for learning, building, and guided digital work.
            </p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {["AI-guided","Modular","Structured"].map(t=>(
                <span key={t} style={{...mono,fontSize:8,color:CYAN,border:"1px solid rgba(0,229,255,0.18)",borderRadius:3,padding:"2px 7px",letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{t}</span>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <div style={{...mono,fontSize:8,color:"rgba(0,229,255,0.45)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Product</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{href:"/docs",l:"Docs"},{href:"/pricing",l:"Pricing"},{href:"/search",l:"Search"}].map(x=>(
                <Link key={x.href} href={x.href} style={{...mono,fontSize:11,color:"rgba(255,255,255,0.45)",textDecoration:"none",display:"block",transition:"color 0.15s"}}
                  onMouseEnter={e=>(e.currentTarget.style.color=CYAN)}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
                >{x.l}</Link>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{...mono,fontSize:8,color:"rgba(0,229,255,0.45)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Platform</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{href:"/university",l:"University Hub"},{href:"/frontier",l:"Frontier Lab"},{href:"/enterprise",l:"Enterprise"},{href:"/robot",l:"Robot"}].map(x=>(
                <Link key={x.href} href={x.href} style={{...mono,fontSize:11,color:"rgba(255,255,255,0.45)",textDecoration:"none",display:"block",transition:"color 0.15s"}}
                  onMouseEnter={e=>(e.currentTarget.style.color=CYAN)}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
                >{x.l}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{...mono,fontSize:8,color:"rgba(0,229,255,0.45)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Company</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <Link href="/contact" style={{...mono,fontSize:11,color:"rgba(255,255,255,0.45)",textDecoration:"none",display:"block",transition:"color 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.color=CYAN)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
              >Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:"16px 0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{...mono,fontSize:9,color:"rgba(255,255,255,0.22)",letterSpacing:"0.06em"}}>
            © {new Date().getFullYear()} Shynvo. All rights reserved.
          </div>
          <div style={{display:"flex",gap:16}}>
            {[{href:"/terms",l:"Terms"},{href:"/privacy",l:"Privacy"},{href:"/refund",l:"Refund"}].map(x=>(
              <Link key={x.href} href={x.href} style={{...mono,fontSize:9,color:"rgba(255,255,255,0.28)",textDecoration:"none",whiteSpace:"nowrap",transition:"color 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.28)")}
              >{x.l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
