"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const C = "#f59e0b";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const STORAGE_KEY="shynvo_arcade_player_name";
const XP_KEY="shynvo_arcade_xp";
const STREAK_KEY="shynvo_arcade_streak";

const ZONES = [
  { href:"/arcade/drill",         title:"Drill Arena",       desc:"Fast challenge rounds for focus, reflex, and logic training.",             tags:["Drills","Speed","Practice"]   },
  { href:"/arcade/interview",     title:"Interview Quest",   desc:"Gamified interview practice with progress-style challenge flow.",          tags:["Interview","Questions","XP"]  },
  { href:"/arcade/score",         title:"Score Chamber",     desc:"Track performance, streaks, levels, and XP flow.",                        tags:["Scores","Levels","Ranking"]   },
  { href:"/arcade/achievements",  title:"Achievements Hall", desc:"Unlock badges, milestones, trophies, and visible player progress.",       tags:["Badges","Milestones","XP"]    },
  { href:"/arcade/ranks",         title:"Rank Ladder",       desc:"See your current rank and climb the challenge ladder.",                   tags:["Bronze","Silver","Gold"]      },
  { href:"/arcade/daily",         title:"Daily Challenge",   desc:"Rotating daily quests for bonus XP, streak growth, and rewards.",         tags:["Daily","Bonus","Rewards"]     },
];

const BADGES = ["Logic Rookie","Speed Thinker","Quest Starter","Daily Streak"];

function getLevelFromXp(xp:number){return Math.max(1,Math.floor(xp/150)+1);}
function getXpProgress(xp:number){return xp%150;}

export default function ArcadePage() {
  const [name,setName]=useState("Operator");
  const [xp,setXp]=useState(0);
  const [streak,setStreak]=useState(0);

  useEffect(()=>{
    setName(localStorage.getItem(STORAGE_KEY)||"Operator");
    setXp(Number(localStorage.getItem(XP_KEY)||0));
    setStreak(Number(localStorage.getItem(STREAK_KEY)||0));
  },[]);

  const level=getLevelFromXp(xp);
  const xpProgress=getXpProgress(xp);
  const xpPct=Math.round((xpProgress/150)*100);

  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:480}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 8px ${C}`,display:"inline-block",flexShrink:0}}/>
              <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.75}}>Arcade Sim · Challenge Layer</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>
              Arcade Sim
            </h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75}}>
              Skill training through challenge mode. Drills, interview quests, rankings, and gamified progression.
            </p>
          </div>

          {/* Player card */}
          <div style={{background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:6,padding:14,minWidth:200}}>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:10,opacity:0.7}}>Player Profile</div>
            <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:10}}>{name}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[{l:"Level",v:`${level}`},{l:"XP",v:`${xp}`},{l:"Streak",v:`${streak} days`},{l:"Rank",v:"Silver Engineer"}].map(x=>(
                <div key={x.l} style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{x.l}</span>
                  <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
                </div>
              ))}
            </div>
            {/* XP bar */}
            <div style={{marginTop:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{...mono,fontSize:8,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",textTransform:"uppercase"}}>XP to next level</span>
                <span style={{...mono,fontSize:8,color:C}}>{xpProgress}/150</span>
              </div>
              <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${xpPct}%`,background:C,borderRadius:2,transition:"width 0.3s"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"14px 0"}}>
        {BADGES.map(b=>(
          <span key={b} style={{...mono,fontSize:9,color:C,border:`1px solid rgba(245,158,11,0.25)`,borderRadius:3,padding:"4px 10px",letterSpacing:"0.08em",textTransform:"uppercase",background:"rgba(245,158,11,0.04)"}}>{b}</span>
        ))}
      </div>

      {/* Zones */}
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"4px 0 12px"}}>
        <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(245,158,11,0.25),transparent)`}}/>
        <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.6}}>Challenge Zones</span>
        <div style={{flex:1,height:1,background:`linear-gradient(270deg,rgba(245,158,11,0.25),transparent)`}}/>
      </div>
      <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))"}}>
        {ZONES.map(z=>(
          <Link key={z.href} href={z.href} className="env-card" style={{textDecoration:"none"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C},transparent)`,opacity:0.22,pointerEvents:"none"}}/>
            <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff",marginBottom:6}}>{z.title}</div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.44)",lineHeight:1.65,marginBottom:10}}>{z.desc}</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {z.tags.map(t=><span key={t} className="env-tag">{t}</span>)}
            </div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.08em",textTransform:"uppercase"}}>Enter Zone →</div>
          </Link>
        ))}
      </div>

      {/* Start CTA */}
      <div className="env-panel" style={{"--env-color":C,marginTop:14} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:6}}>Start Here</div>
            <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>New to Arcade Sim?</div>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",maxWidth:380,lineHeight:1.7}}>
              Start with Drill Arena, move into Interview Quest, use Score Chamber to track growth.
            </p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Link href="/arcade/drill" style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"9px 16px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:`0 0 16px rgba(245,158,11,0.3)`}}>Start Drill Arena</Link>
            <Link href="/arcade/daily" style={{...mono,fontSize:10,color:C,border:`1px solid rgba(245,158,11,0.28)`,padding:"9px 14px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Daily Challenge</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
