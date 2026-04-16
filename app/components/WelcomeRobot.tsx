"use client";
import { useEffect, useState } from "react";

type ThemeName = "cyan"|"violet"|"emerald"|"rose";
type Theme = { shellTop:string; shellBottom:string; shellBorder:string; face:string; glow:string; accent:string; core:string; };

const THEMES: Record<ThemeName,Theme> = {
  cyan:    { shellTop:"#f8fbff", shellBottom:"#d8ebff", shellBorder:"rgba(255,255,255,0.22)", face:"#09111f", glow:"rgba(103,232,249,0.95)", accent:"#67e8f9", core:"#9be7ff" },
  violet:  { shellTop:"#fcf9ff", shellBottom:"#eadcff", shellBorder:"rgba(255,255,255,0.22)", face:"#140f24", glow:"rgba(196,181,253,0.95)", accent:"#a78bfa", core:"#c8b7ff" },
  emerald: { shellTop:"#f5fff9", shellBottom:"#d7ffe8", shellBorder:"rgba(255,255,255,0.22)", face:"#091712", glow:"rgba(74,222,128,0.95)",  accent:"#4ade80", core:"#aaf7c4" },
  rose:    { shellTop:"#fff8fa", shellBottom:"#ffdbe4", shellBorder:"rgba(255,255,255,0.22)", face:"#1a1015", glow:"rgba(251,113,133,0.95)", accent:"#fb7185", core:"#ffc0cd" },
};

const ORDER: ThemeName[] = ["cyan","violet","emerald","rose"];

const MESSAGES = [
  "Hello! Welcome to Shynvo.",
  "Choose your direction and begin.",
  "Here you can learn, build, and explore with AI.",
  "You made the right choice coming to Shynvo.",
  "Create your account and enter the Shynvo world.",
  "See you soon inside Shynvo.",
];

export default function WelcomeRobot() {
  const [themeIndex,setThemeIndex] = useState(0);
  const [lookX,setLookX] = useState(0);
  const [lookY,setLookY] = useState(0);
  const [messageIndex,setMessageIndex] = useState(0);
  const theme = THEMES[ORDER[themeIndex]];

  useEffect(()=>{
    const id = window.setInterval(()=>setMessageIndex(p=>(p+1)%MESSAGES.length),2400);
    return ()=>window.clearInterval(id);
  },[]);

  function updateLook(clientX:number,clientY:number,rect:DOMRect) {
    const dx=clientX-(rect.left+rect.width/2);
    const dy=clientY-(rect.top+rect.height/2);
    setLookX(Math.round(Math.max(-1,Math.min(1,dx/(rect.width/2)))*15));
    setLookY(Math.round(Math.max(-1,Math.min(1,dy/(rect.height/2)))*12));
  }

  return (
    <div style={{position:"relative",width:"100%"}}>
      {/* Single message bubble — inside the panel, above robot */}
      <div style={{
        position:"relative",
        marginBottom:8,
        display:"inline-block",
        maxWidth:180,
        marginLeft:"auto",
        marginRight:"auto",
        left:"50%",
        transform:"translateX(-50%)",
        background:"rgba(8,12,20,0.92)",
        border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:10,
        padding:"7px 12px",
        fontSize:11,
        lineHeight:1.5,
        color:"rgba(255,255,255,0.88)",
        textAlign:"center",
        zIndex:2,
      }}>
        {MESSAGES[messageIndex]}
      </div>

      {/* Robot stage — contained, no overflow */}
      <div
        style={{
          position:"relative",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"flex-end",
          height:280,
          borderRadius:20,
          border:"1px solid rgba(255,255,255,0.08)",
          background:"linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",
          overflow:"hidden",
          cursor:"pointer",
        }}
        onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();updateLook(e.clientX,e.clientY,r);}}
        onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();updateLook(e.clientX,e.clientY,r);setThemeIndex(p=>(p+1)%ORDER.length);}}
        onPointerLeave={()=>{setLookX(0);setLookY(0);}}
      >
        {/* floor glow */}
        <div style={{position:"absolute",bottom:24,width:120,height:20,borderRadius:"50%",background:theme.glow.replace("0.95","0.15"),filter:"blur(12px)"}}/>
        <div style={{position:"absolute",bottom:20,width:100,height:12,borderRadius:"50%",background:"rgba(255,255,255,0.08)",filter:"blur(8px)"}}/>

        {/* floating robot */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24,animation:"sh-float 4.6s ease-in-out infinite",position:"relative"}}>

          {/* antenna */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:6}}>
            <div style={{width:3,height:22,borderRadius:2,background:"rgba(255,255,255,0.2)"}}/>
            <div style={{width:10,height:10,borderRadius:"50%",background:theme.accent,boxShadow:`0 0 14px ${theme.glow}`}}/>
          </div>

          {/* arms layer — absolutely positioned */}
          <div style={{position:"absolute",top:70,left:"50%",transform:"translateX(-50%)",width:220,height:100,pointerEvents:"none"}}>
            {/* left arm */}
            <div style={{position:"absolute",left:22,top:32,transform:`rotate(${-24-lookX*0.05}deg)`}}>
              <div style={{position:"relative",width:28,height:80}}>
                <div style={{position:"absolute",left:8,top:0,width:13,height:38,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`}}/>
                <div style={{position:"absolute",left:10,top:34,width:13,height:30,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`}}/>
              </div>
            </div>
            {/* right arm waving */}
            <div style={{position:"absolute",right:12,top:-4,transformOrigin:"12px 70px",animation:"wave 2s ease-in-out infinite"}}>
              <div style={{position:"relative",width:30,height:90}}>
                <div style={{position:"absolute",left:8,top:0,width:13,height:40,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`}}/>
                <div style={{position:"absolute",left:2,top:30,width:13,height:36,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`}}/>
              </div>
            </div>
          </div>

          {/* head */}
          <div style={{
            position:"relative",width:88,height:72,borderRadius:999,
            border:`1px solid ${theme.shellBorder}`,
            background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            transform:`translate(${lookX*0.2}px,${lookY*0.16}px)`,
            transition:"transform 0.15s",
            boxShadow:"0 12px 28px rgba(0,0,0,0.22)",
          }}>
            <div style={{position:"absolute",inset:8,borderRadius:999,background:theme.face}}/>
            <div style={{position:"relative",zIndex:1,display:"flex",gap:14,transform:`translate(${lookX*0.3}px,${lookY*0.28}px)`,transition:"transform 0.15s"}}>
              {[0,1].map(i=>(
                <span key={i} style={{display:"block",width:12,height:12,borderRadius:"50%",background:theme.accent,boxShadow:`0 0 14px ${theme.glow}`,animation:"animate-blink2 4s infinite"}}/>
              ))}
            </div>
            <div style={{position:"absolute",bottom:10,width:28,height:3,borderRadius:999,background:"rgba(255,255,255,0.22)",transform:`translateX(${lookX*0.12}px)`,transition:"transform 0.15s"}}/>
          </div>

          {/* neck */}
          <div style={{width:14,height:8,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`,marginTop:2}}/>

          {/* torso */}
          <div style={{
            position:"relative",width:92,height:104,borderRadius:999,marginTop:2,
            border:`1px solid ${theme.shellBorder}`,
            background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            transform:`translateX(${lookX*0.06}px)`,transition:"transform 0.15s",
            boxShadow:`0 0 32px ${theme.glow.replace("0.95","0.12")},0 14px 28px rgba(0,0,0,0.15)`,
          }}>
            <div style={{position:"absolute",inset:8,borderRadius:999,background:"rgba(255,255,255,0.10)"}}/>
            <div style={{position:"relative",zIndex:1,width:44,height:44,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{width:16,height:16,borderRadius:"50%",background:theme.core,boxShadow:`0 0 14px ${theme.glow}`,display:"block"}}/>
            </div>
          </div>

          {/* legs */}
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[0,1].map(i=>(
              <div key={i} style={{width:13,height:42,borderRadius:999,border:`1px solid ${theme.shellBorder}`,background:`linear-gradient(180deg,${theme.shellTop},${theme.shellBottom})`}}/>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:6,textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:"var(--font-space-mono,monospace)",letterSpacing:"0.06em"}}>
        Click to change theme
      </div>
    </div>
  );
}
