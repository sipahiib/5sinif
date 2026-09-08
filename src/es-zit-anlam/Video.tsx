import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import data from "../../content/es_zit_anlam.json";
import timings from "./timings.json";
import {GifCharacter} from "../GifCharacter";
import {CtaOptionOne} from "../previews/cta-option-1/CtaOptionOne";
import {ChannelLowerThird} from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const navy="#173B66", blue="#2876C7", violet="#7456B8", coral="#E65068",
  mint="#25A98E", amber="#F6BC46", ink="#172638";
const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const pop=(f:number,delay=0,stiffness=115)=>spring({frame:f-delay,fps:30,config:{damping:18,stiffness,mass:.8}});
const sceneStart=(i:number)=>timings.main.slice(0,i).reduce((n,s)=>n+s.frames,0);
export const mainDuration=()=>sceneStart(timings.main.length)+210;
const kurzStart=(i:number)=>timings.kurz.slice(0,i).reduce((n,s)=>n+s.frames,0);
export const kurzDuration=()=>kurzStart(timings.kurz.length);

const Canvas=({children}:{children:React.ReactNode})=><div style={{position:"absolute",width:960,height:540,transform:"scale(2)",transformOrigin:"top left"}}>{children}</div>;

const Bg=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"linear-gradient(145deg,#EFF8FF 0%,#FFFFFF 52%,#FFF1ED 100%)",overflow:"hidden"}}>
  <div style={{position:"absolute",width:370,height:370,borderRadius:"50%",left:-185,top:130,background:"#2876C710",transform:`translateY(${Math.sin(f/24)*7}px)`}}/>
  <div style={{position:"absolute",width:330,height:330,borderRadius:"50%",right:-170,top:-100,background:"#7456B814",transform:`translateY(${Math.cos(f/29)*6}px)`}}/>
  {Array.from({length:12}).map((_,i)=><span key={i} style={{position:"absolute",left:35+(i*157)%900,top:25+(i*109)%490,width:3+(i%3),height:3+(i%3),borderRadius:"50%",background:i%2?blue:coral,opacity:.13,transform:`translateY(${Math.sin(f/17+i)*4}px)`}}/>)}
</AbsoluteFill>};

const Pill=({children,color=blue}:{children:React.ReactNode;color?:string})=><div style={{display:"inline-flex",alignItems:"center",padding:"7px 12px",borderRadius:999,background:color,color:"white",fontSize:12,fontWeight:900,letterSpacing:.7,boxShadow:"0 6px 15px #173B6620"}}>{children}</div>;

const WordCard=({text,color=blue,x,y,w=126,delay=0}:{text:string;color?:string;x:number;y:number;w?:number;delay?:number})=>{const f=useCurrentFrame(),p=pop(f,delay);return <div style={{position:"absolute",left:x,top:y,width:w,height:48,borderRadius:16,background:"white",border:`3px solid ${color}`,boxShadow:"0 10px 22px #173B6618",display:"flex",alignItems:"center",justifyContent:"center",fontSize:text.length>13?16:20,fontWeight:950,color,opacity:p,transform:`translateY(${(1-p)*18}px) scale(${.88+p*.12})`}}>{text}</div>};

const SynonymCore=()=>{const f=useCurrentFrame(),draw=interpolate(f,[16,58],[0,1],clamp);return <div style={{position:"relative",width:680,height:240}}>
  <svg width="680" height="240" style={{position:"absolute"}}><path d="M175 105 C270 105 278 64 340 64 C402 64 410 105 505 105" fill="none" stroke="#BCD5E9" strokeWidth="6" strokeDasharray="340" strokeDashoffset={340*(1-draw)} strokeLinecap="round"/><circle cx="340" cy="64" r="45" fill="#F6BC4630" stroke={amber} strokeWidth="4"/><text x="340" y="59" textAnchor="middle" fill={navy} fontSize="16" fontWeight="900">AYNI</text><text x="340" y="80" textAnchor="middle" fill={navy} fontSize="16" fontWeight="900">ANLAM</text></svg>
  <WordCard text="YIL" x={65} y={80} color={blue} delay={5}/><WordCard text="SENE" x={489} y={80} color={violet} delay={11}/>
  <div style={{position:"absolute",left:228,top:160,width:225,textAlign:"center",fontSize:17,fontWeight:850,color:ink,opacity:pop(f,45)}}>Yazılış ve okunuş farklıdır.<br/><b style={{color:mint}}>Anlam bağı aynıdır.</b></div>
</div>};

const SynonymOrbits=()=>{const f=useCurrentFrame();const groups=[{icon:"♥",words:["KALP","YÜREK","GÖNÜL"],x:35,c:coral},{icon:"⌂",words:["EV","HANE"],x:252,c:blue},{icon:"◷",words:["YAŞLI","İHTİYAR"],x:469,c:violet}];return <div style={{position:"relative",width:680,height:245}}>{groups.map((g,gi)=><div key={g.x} style={{position:"absolute",left:g.x,top:12,width:190,height:210,opacity:pop(f,gi*8),transform:`translateY(${Math.sin(f/18+gi)*3}px)`}}>
  <div style={{position:"absolute",left:60,top:38,width:70,height:70,borderRadius:"50%",background:`${g.c}20`,border:`3px solid ${g.c}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:42,color:g.c}}>{g.icon}</div>
  <svg width="190" height="150" style={{position:"absolute",top:0}}><ellipse cx="95" cy="73" rx="84" ry="58" fill="none" stroke={g.c} strokeWidth="2" strokeDasharray="6 6" strokeDashoffset={-f*.35}/></svg>
  {g.words.map((w,i)=><div key={w} style={{position:"absolute",left:i===0?3:i===1?92:45,top:i===0?8:i===1?116:151,padding:"6px 9px",borderRadius:10,background:"white",border:`2px solid ${g.c}`,fontSize:12,fontWeight:900,color:g.c,transform:`scale(${.88+pop(f,14+gi*7+i*5)*.12})`}}>{w}</div>)}
</div>)}</div>};

const SentenceSwap=()=>{const f=useCurrentFrame(),swap=Math.floor(f/55)%2;const rows=[{a:"yıl",b:"sene",text:"Bu {x} çok kitap okudum.",c:blue},{a:"sınav",b:"imtihan",text:"{x} için hazırlık yaptım.",c:violet}];return <div style={{position:"relative",width:680,height:245}}>{rows.map((r,i)=>{const word=swap?r.b:r.a;return <div key={r.a} style={{position:"absolute",left:25,right:25,top:18+i*105,height:82,borderRadius:21,background:"white",border:"2px solid #D7E6F2",boxShadow:"0 10px 26px #173B6614",display:"flex",alignItems:"center",padding:"0 25px",fontSize:22,fontWeight:850,color:ink,opacity:pop(f,8+i*9)}}>{r.text.split("{x}")[0]}<span style={{margin:"0 7px",padding:"8px 14px",borderRadius:12,background:`${r.c}18`,color:r.c,border:`2px solid ${r.c}`,transform:`scale(${1+Math.sin(f/8+i)*.025})`}}>{word}</span>{r.text.split("{x}")[1]}<span style={{marginLeft:"auto",fontSize:28,color:mint}}>✓</span></div>})}</div>};

const ContextWarning=()=>{const f=useCurrentFrame();const rows=[{top:0,good:true,a:"BEYAZ PEYNİR",b:"AK PEYNİR",sub:"Renk anlamı korunur."},{top:102,good:false,a:"KAFAM BOZULDU",b:"BAŞIM BOZULDU",sub:"Deyimdeki anlam korunmaz."}];return <div style={{position:"relative",width:680,height:220}}>{rows.map((r,i)=><div key={r.a} style={{position:"absolute",left:12,right:12,top:r.top,height:90,borderRadius:20,background:r.good?"#EAF9F4":"#FFF0F2",border:`3px solid ${r.good?mint:coral}`,display:"grid",gridTemplateColumns:"1fr 50px 1fr 48px",alignItems:"center",padding:"0 18px",opacity:pop(f,8+i*14),boxSizing:"border-box"}}>
  <b style={{fontSize:17,color:navy,textAlign:"center"}}>{r.a}</b><b style={{fontSize:25,color:r.good?mint:coral,textAlign:"center"}}>→</b><b style={{fontSize:17,color:navy,textAlign:"center"}}>{r.b}</b><b style={{fontSize:29,color:r.good?mint:coral,textAlign:"center"}}>{r.good?"✓":"×"}</b><span style={{gridColumn:"1 / 5",fontSize:13,color:"#637388",textAlign:"center",marginTop:-12}}>{r.sub}</span>
</div>)}</div>};

const MatchingLab=()=>{const f=useCurrentFrame();const pairs=[["yıl","sene"],["imkân","olanak"],["deprem","zelzele"],["ivedi","acil"],["çetin","zor"],["anı","hatıra"],["fakir","yoksul"],["ak","beyaz"],["bilim insanı","bilgin"],["sınav","imtihan"]];return <div style={{position:"relative",width:680,height:245,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"repeat(5,1fr)",gap:"7px 18px",padding:"5px 12px",boxSizing:"border-box"}}>{pairs.map((p,i)=><div key={p[0]} style={{borderRadius:13,background:"white",border:"2px solid #D5E5F2",boxShadow:"0 6px 14px #173B6610",display:"grid",gridTemplateColumns:"1fr 34px 1fr",alignItems:"center",padding:"0 10px",fontSize:p[0].length>10?13:15,fontWeight:900,color:navy,opacity:pop(f,5+i*3),transform:`translateX(${(1-pop(f,5+i*3))*(i%2?-16:16)}px)`}}><span style={{textAlign:"right"}}>{p[0]}</span><span style={{textAlign:"center",color:i%2?violet:mint}}>↔</span><span>{p[1]}</span></div>)}</div>};

const AntonymAxis=()=>{const f=useCurrentFrame(),draw=interpolate(f,[12,50],[0,1],clamp);return <div style={{position:"relative",width:680,height:240}}>
  <svg width="680" height="240"><line x1="105" y1="110" x2={105+470*draw} y2="110" stroke="#BED3E5" strokeWidth="8" strokeLinecap="round"/><path d="M85 110l26-19v38Z" fill={blue}/><path d="M595 110l-26-19v38Z" fill={coral}/><circle cx="340" cy="110" r="11" fill={amber}/></svg>
  <WordCard text="KALIN" x={32} y={84} color={blue} delay={6}/><WordCard text="İNCE" x={522} y={84} color={coral} delay={12}/>
  <div style={{position:"absolute",left:206,top:157,width:268,textAlign:"center",fontSize:18,fontWeight:900,color:navy,opacity:pop(f,40)}}>KARŞIT ANLAM YÖNLERİ</div>
</div>};

const AntonymExamples=()=>{const f=useCurrentFrame();const pairs=[["KALIN","İNCE"],["ZAYIF","ŞİŞMAN"],["AKILLI","DELİ"],["GÜL","AĞLA"],["YAZ","KIŞ"]];return <div style={{position:"relative",width:680,height:242}}><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,padding:"5px 8px"}}>{pairs.map((p,i)=><div key={p[0]} style={{height:82,borderRadius:17,background:"white",border:"2px solid #D6E5F1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:950,color:navy,opacity:pop(f,5+i*5)}}><span style={{color:blue}}>{p[0]}</span><span style={{color:coral,fontSize:21,lineHeight:1}}>↕</span><span style={{color:coral}}>{p[1]}</span></div>)}</div>
  <div style={{position:"absolute",left:22,right:22,top:112,height:105,borderRadius:19,background:"#F7FAFD",border:"2px solid #D6E5F1",padding:"14px 22px",boxSizing:"border-box",fontSize:17,fontWeight:850,color:ink,opacity:pop(f,40)}}><span style={{color:blue}}>KIŞ • SOĞUK</span><span style={{margin:"0 16px",color:"#94A8BA"}}>↔</span><span style={{color:coral}}>YAZ • SICAK</span><div style={{marginTop:12,fontSize:14,color:"#67788B"}}>“Akıllı köprü arayıncaya dek deli suyu geçer.”</div></div>
</div>};

const NegativeTable=()=>{const f=useCurrentFrame();const rows=[["GÜZEL","GÜZEL DEĞİL","ÇİRKİN"],["SULU","SUSUZ","KURU"],["TATLI","TATSIZ","ACI"]];return <div style={{position:"relative",width:680,height:220}}>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1.15fr 1fr",gap:7,marginBottom:7}}>{["SÖZCÜK","OLUMSUZU","ZIDDI"].map((x,i)=><div key={x} style={{height:34,borderRadius:10,background:[blue,amber,coral][i],color:i===1?navy:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:950}}>{x}</div>)}</div>
  {rows.map((r,ri)=><div key={r[0]} style={{display:"grid",gridTemplateColumns:"1fr 1.15fr 1fr",gap:7,marginBottom:7,opacity:pop(f,8+ri*8)}}>{r.map((x,i)=><div key={x} style={{height:47,borderRadius:12,background:i===1?"#FFF5D9":"white",border:`2px solid ${i===1?amber:i===2?coral:"#D5E5F2"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:navy}}>{x}</div>)}</div>)}
</div>};

const DecisionSummary=()=>{const f=useCurrentFrame();return <div style={{position:"relative",width:680,height:220}}>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>{[["ÇIKMAK","ÇIKMAMAK","İNMEK"],["GÜLMEK","GÜLMEMEK","AĞLAMAK"]].map((r,i)=><div key={r[0]} style={{height:88,borderRadius:18,background:"white",border:"2px solid #D5E5F2",padding:"10px",boxSizing:"border-box",opacity:pop(f,5+i*8)}}><div style={{fontSize:15,fontWeight:950,color:navy,textAlign:"center"}}>{r[0]}</div><div style={{display:"flex",justifyContent:"space-around",marginTop:10,fontSize:13,fontWeight:900}}><span style={{color:amber}}>Olumsuz: {r[1]}</span><span style={{color:coral}}>Zıt: {r[2]}</span></div></div>)}</div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginTop:14}}>{["Aynı anlam mı?","Karşıt anlam mı?","Yalnız olumsuz mu?"].map((q,i)=><div key={q} style={{height:72,borderRadius:16,background:[blue,violet,mint][i],color:"white",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontSize:15,fontWeight:950,padding:8,boxSizing:"border-box",opacity:pop(f,30+i*6),transform:`translateY(${Math.sin(f/15+i)*2}px)`}}>{q}</div>)}</div>
</div>};

const Lumi=({task=0}:{task?:number})=>{const f=useCurrentFrame(),wave=Math.sin(f/15+task);return <svg width="150" height="165" viewBox="0 0 180 180" style={{filter:"drop-shadow(0 18px 22px #05081788)",transform:`translateY(${wave*4}px) rotate(${wave*1.3}deg)`}}>
  <ellipse cx="90" cy="169" rx="49" ry="7" fill="#0006"/>
  <path d="M47 82 16 61v48l31-12M133 82l31-21v48l-31-12" fill="#56D8D2" stroke="#15172F" strokeWidth="6"/>
  <rect x="39" y="43" width="102" height="104" rx="45" fill="#7257E8" stroke="#15172F" strokeWidth="7"/>
  <path d="M43 79Q90 9 138 79" fill="#A897FF"/>
  <rect x="54" y="69" width="72" height="54" rx="23" fill="#EFFFFE" stroke="#15172F" strokeWidth="6"/>
  <ellipse cx="75" cy="94" rx="7" ry={f%137<4?2:12} fill="#15172F"/><ellipse cx="106" cy="94" rx="7" ry={f%137<4?2:12} fill="#15172F"/>
  <path d="M78 110q12 8 24 0M90 43V24" fill="none" stroke="#15172F" strokeWidth="5" strokeLinecap="round"/>
  <circle cx="90" cy="18" r="9" fill="#FF6B6B"/><circle cx="57" cy="142" r="9" fill="#FFD166"/><circle cx="123" cy="142" r="9" fill="#FFD166"/>
</svg>};

const MeaningGalaxy=()=>{const f=useCurrentFrame(),scan=(f*3)%520;return <svg width="900" height="350" viewBox="0 0 900 350">
  <defs><radialGradient id="yg" cx=".35" cy=".3"><stop stopColor="#A897FF"/><stop offset="1" stopColor="#4933B7"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <circle cx="420" cy="170" r={72+Math.sin(f/12)*3} fill="url(#yg)" stroke="#D5CBFF" strokeWidth="4" filter="url(#glow)"/><text x="420" y="181" textAnchor="middle" fill="white" fontSize="34" fontWeight="900">YÜZ</text>
  {[{x:145,y:80,t:"İNSAN YÜZÜ",icon:"☺",c:"#FFB36B"},{x:675,y:70,t:"YÜZ SAYISI",icon:"100",c:"#6CE5D0"},{x:675,y:255,t:"HAVUZDA YÜZ",icon:"≈",c:"#78A8FF"}].map((o,i)=>{const p=pop(f,10+i*8);return <g key={o.t} opacity={p} transform={`translate(${(1-p)*(i?35:-35)} 0)`}><rect x={o.x-100} y={o.y-40} width="200" height="80" rx="28" fill="#FFFFFF0E" stroke={o.c} strokeWidth="3"/><text x={o.x} y={o.y+5} textAnchor="middle" fill={o.c} fontSize={i===1?28:36} fontWeight="900">{o.icon}</text><text x={o.x} y={o.y+62} textAnchor="middle" fill="white" fontSize="15" fontWeight="850">{o.t}</text></g>})}
  <path d={`M420 170 C${scan} 35 ${scan} 305 ${Math.min(830,scan+180)} 170`} fill="none" stroke="#6CE5D0" strokeWidth="3" opacity=".45" strokeDasharray="10 9"/>
</svg>};

const ContextPrism=()=>{const f=useCurrentFrame(),beam=interpolate(f,[8,55],[0,1],clamp),flow=(f*3)%150,bend=Math.sin(f/18)*8;return <svg width="900" height="350" viewBox="0 0 900 350">
  <defs><linearGradient id="beamA"><stop stopColor="#6CE5D0" stopOpacity=".1"/><stop offset="1" stopColor="#6CE5D0" stopOpacity=".7"/></linearGradient><linearGradient id="beamB"><stop stopColor="#FFB36B" stopOpacity=".1"/><stop offset="1" stopColor="#FFB36B" stopOpacity=".7"/></linearGradient></defs>
  <polygon points="455,70 540,175 455,280 370,175" fill="#FFFFFF18" stroke="#B9C8FF" strokeWidth="4"/><text x="455" y="183" textAnchor="middle" fill="white" fontSize="28" fontWeight="900">İNCE</text>
  <polygon points={`70,95 ${370*beam},150 ${370*beam},200 70,255`} fill="url(#beamA)"/><polygon points={`540,150 ${540+(290*beam)},80 ${540+(290*beam)},150 540,200`} fill="url(#beamB)"/>
  <path d="M75 177H365" fill="none" stroke="#B7FFF8" strokeWidth="5" strokeDasharray="26 124" strokeDashoffset={-flow} opacity={beam*.8}/><path d="M545 175H830" fill="none" stroke="#FFD3A2" strokeWidth="5" strokeDasharray="26 124" strokeDashoffset={-flow} opacity={beam*.8}/>
  <g opacity={pop(f,20)}><path d={`M105 220q70-${130+bend} 145 0`} fill="none" stroke="#6CE5D0" strokeWidth="12" strokeLinecap="round"/><text x="177" y="267" textAnchor="middle" fill="#6CE5D0" fontSize="18" fontWeight="900">İNCE DAL</text></g>
  <g opacity={pop(f,34)} transform={`translate(0 ${Math.sin(f/16)*4})`}><circle cx="745" cy="105" r={44+Math.sin(f/13)*2} fill="#FFB36B22" stroke="#FFB36B" strokeWidth="4"/><path d="M720 105q25 28 50 0" fill="none" stroke="#FFB36B" strokeWidth="5" strokeLinecap="round"/><text x="745" y="183" textAnchor="middle" fill="#FFB36B" fontSize="18" fontWeight="900">NAZİK DAVRANIŞ</text></g>
</svg>};

const ConceptDoors=()=>{const f=useCurrentFrame();const open=Math.sin(Math.min(1,f/55)*Math.PI/2),breath=Math.sin(f/22)*4,glow=.82+Math.sin(f/18)*.12;return <svg width="900" height="350" viewBox="0 0 900 350">
  <defs><linearGradient id="room" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFDF8A"/><stop offset="1" stopColor="#D76B64"/></linearGradient></defs>
  <g transform={`translate(0 ${breath*.35})`}><rect x="295" y="45" width="310" height="245" rx="28" fill="url(#room)" opacity={glow}/><circle cx="450" cy="125" r={38+Math.sin(f/20)*3} fill="#FFF4C6"/><path d="M365 245V160l85-55 85 55v85Z" fill="#493C69" stroke="#FFF" strokeWidth="4"/><rect x="430" y="185" width="40" height="60" rx="6" fill="#FFB36B"/></g>
  <g transform={`translate(${-118*open} ${breath}) skewY(${-8*open})`}><rect x="295" y="45" width="150" height="245" rx="22" fill="#7257E8" stroke="#BEB1FF" strokeWidth="4"/><text x="370" y="178" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">DOKTOR</text></g>
  <g transform={`translate(${118*open} ${-breath}) skewY(${8*open})`}><rect x="455" y="45" width="150" height="245" rx="22" fill="#238F89" stroke="#6CE5D0" strokeWidth="4"/><text x="530" y="178" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">HEKİM</text></g>
  <text x="450" y="328" textAnchor="middle" fill="#C9D7EC" fontSize="17" fontWeight="850" opacity={pop(f,46)}>UYGUN BAĞLAMDA AYNI KAVRAM SAHNESİ</text>
</svg>};

const ContrastWorld=()=>{const f=useCurrentFrame(),phase=(Math.sin(f/45)+1)/2;return <svg width="900" height="350" viewBox="0 0 900 350">
  <defs><linearGradient id="sky" x1="0" x2="1"><stop stopColor="#173D73"/><stop offset={phase} stopColor="#6AB7E8"/><stop offset="1" stopColor="#FFB36B"/></linearGradient></defs>
  <rect x="25" y="30" width="850" height="260" rx="38" fill="url(#sky)"/><circle cx={110+phase*680} cy="92" r="38" fill={phase>.45?"#FFD166":"#D7E8FF"} opacity=".95"/>
  {Array.from({length:7}).map((_,i)=><path key={i} d={`M${75+i*120} 290v-${50+i*phase*22}q25-${35+i*4} 50 0v${50+i*phase*22}`} fill={i%2?"#3FA66B":"#236B55"} opacity={pop(f,8+i*4)}/>)}
  <text x="90" y="328" fill="#A9D5FF" fontSize="20" fontWeight="900">SOĞUK</text><text x="730" y="328" fill="#FFD39B" fontSize="20" fontWeight="900">SICAK</text>
  <rect x="385" y="58" width="130" height="48" rx="24" fill="#10172DDD" stroke="#FFF4" strokeWidth="2"/><text x="450" y="89" textAnchor="middle" fill="white" fontSize="15" fontWeight="900">SICAKLIK EKSENİ</text>
  <path d="M285 322H615" stroke="#6CE5D0" strokeWidth="7" strokeLinecap="round"/><path d={`M${340+phase*220} 307v30`} stroke="#FFD166" strokeWidth="8" strokeLinecap="round"/><text x="245" y="328" textAnchor="end" fill="#6CE5D0" fontSize="16" fontWeight="900">KISA</text><text x="655" y="328" fill="#FFD166" fontSize="16" fontWeight="900">UZUN</text>
</svg>};

const NegativeTunnel=()=>{const f=useCurrentFrame(),lid=interpolate(Math.sin(f/28),[-1,1],[8,55]),speed=(Math.sin(f/35)+1)/2;return <svg width="900" height="350" viewBox="0 0 900 350">
  {Array.from({length:5}).map((_,i)=><rect key={i} x={90+i*65} y={30+i*22} width={720-i*130} height={280-i*44} rx="24" fill="none" stroke={i%2?"#7257E8":"#334B78"} strokeWidth="5" opacity={.8-i*.1}/>)}
  <g opacity={interpolate(f,[0,35,390,440],[0,1,1,.25],clamp)} transform={`translate(0 ${Math.sin(f/19)*3})`}><rect x="120" y="132" width="220" height="120" rx="20" fill="#263B61" stroke="#6CE5D0" strokeWidth="5"/><path d={`M112 132h236l-30-${lid}H142Z`} fill="#6CE5D044" stroke="#6CE5D0" strokeWidth="5"/><text x="230" y="285" textAnchor="middle" fill="#6CE5D0" fontSize="18" fontWeight="900">AÇIK DEĞİL ≠ KAPALI</text></g>
  <g opacity={interpolate(f,[300,380],[0,1],clamp)}><path d="M470 245a145 145 0 0 1 290 0" fill="#1D3154" stroke="#FFB36B" strokeWidth="6"/><path d={`M615 245l${Math.cos(Math.PI-speed*Math.PI)*105} ${-Math.sin(Math.PI-speed*Math.PI)*105}`} stroke="#FFD166" strokeWidth="10" strokeLinecap="round"/><circle cx="615" cy="245" r="17" fill="#FFD166"/><text x="505" y="287" fill="#A9D5FF" fontSize="16" fontWeight="900">YAVAŞ</text><text x="681" y="287" fill="#FFD39B" fontSize="16" fontWeight="900">HIZLI</text><text x="615" y="90" textAnchor="middle" fill="white" fontSize="20" fontWeight="900">HIZLI DEĞİL: ARA DEĞER DE OLABİLİR</text></g>
</svg>};

const MeaningMap=()=>{const f=useCurrentFrame(),pulse=1+Math.sin(f/12)*.025;return <svg width="900" height="350" viewBox="0 0 900 350">
  <path d="M50 70Q190 0 330 80T610 75Q770 15 850 105L830 300H55Z" fill="#1B3255" stroke="#486B99" strokeWidth="4"/>
  <path d="M75 105Q210 20 350 115L330 280H65Z" fill="#238F8955"/><path d="M545 88Q730 15 840 128L825 285H560Z" fill="#D94D6250"/><path d="M320 165Q450 85 585 170L555 310H335Z" fill="#FFD16640"/>
  <g transform={`translate(0 0) scale(${pulse})`}><circle cx="215" cy="160" r="56" fill="#6CE5D0" opacity=".9"/><text x="215" y="168" textAnchor="middle" fill="#102039" fontSize="22" fontWeight="950">CESUR</text><text x="130" y="245" fill="#6CE5D0" fontSize="18" fontWeight="900">YİĞİT • YAKIN</text></g>
  <circle cx="705" cy="160" r="54" fill="#FF6F78" opacity=".9"/><text x="705" y="168" textAnchor="middle" fill="white" fontSize="21" fontWeight="950">KORKAK</text>
  <path d="M390 250q60-90 120 0q-60 55-120 0" fill="#FFD166" opacity=".85"/><text x="450" y="267" textAnchor="middle" fill="#102039" fontSize="16" fontWeight="950">CESUR DEĞİL</text>
  <path d="M270 160C405 80 545 85 650 160" fill="none" stroke="#FFFFFF55" strokeWidth="3" strokeDasharray="10 10" strokeDashoffset={-f*.8}/>
</svg>};

const MeaningScanner=()=>{const f=useCurrentFrame(),x=80+(f*4)%730;const items=[{x:145,t:"DOKTOR / HEKİM",r:"EŞ",c:"#6CE5D0"},{x:390,t:"ERKEN / GEÇ",r:"ZIT",c:"#FF6F78"},{x:635,t:"ERKEN DEĞİL",r:"OLUMSUZ",c:"#FFD166"}];return <svg width="900" height="350" viewBox="0 0 900 350">
  <rect x="55" y="55" width="790" height="220" rx="34" fill="#142441" stroke="#496A98" strokeWidth="4"/><path d="M90 225H810" stroke="#496A98" strokeWidth="10" strokeLinecap="round"/>
  {items.map((o,i)=><g key={o.t} opacity={pop(f,8+i*9)}><rect x={o.x-92} y="120" width="184" height="72" rx="22" fill="#FFFFFF0D" stroke={o.c} strokeWidth="3"/><text x={o.x} y="149" textAnchor="middle" fill="white" fontSize="14" fontWeight="850">{o.t}</text><text x={o.x} y="178" textAnchor="middle" fill={o.c} fontSize="22" fontWeight="950">{o.r}</text></g>)}
  <rect x={x} y="75" width="8" height="175" rx="4" fill="#B7FFF8" opacity=".8"/><path d={`M${x-45} 75h98l-20 175h-58Z`} fill="#6CE5D018"/>
  <text x="450" y="320" textAnchor="middle" fill="#C8D6EA" fontSize="17" fontWeight="900">BAĞLAM → YÖN → OLUMSUZLUK KONTROLÜ</text>
</svg>};

const KurzVisual=({kind}:{kind:string})=>{switch(kind){case"meaningGalaxy":return <MeaningGalaxy/>;case"contextPrism":return <ContextPrism/>;case"conceptDoors":return <ConceptDoors/>;case"contrastWorld":return <ContrastWorld/>;case"negativeTunnel":return <NegativeTunnel/>;case"meaningMap":return <MeaningMap/>;default:return <MeaningScanner/>}};

const LessonVisual=({kind}:{kind:string})=>{switch(kind){case"synonymCore":return <SynonymCore/>;case"synonymOrbits":return <SynonymOrbits/>;case"sentenceSwap":return <SentenceSwap/>;case"contextWarning":return <ContextWarning/>;case"matchingLab":return <MatchingLab/>;case"antonymAxis":return <AntonymAxis/>;case"antonymExamples":return <AntonymExamples/>;case"negativeTableA":return <NegativeTable/>;default:return <DecisionSummary/>}};

const MainScene=({index}:{index:number})=>{const f=useCurrentFrame(),scene=data.main[index],last=index===data.main.length-1,right=index%2===0;const enter=interpolate(f,[0,18],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});const panel=last?{left:115,width:730}:{left:right?205:25,width:730};return <AbsoluteFill style={{fontFamily:"Trebuchet MS,Arial",color:ink}}><Bg/>
  <div style={{position:"absolute",left:panel.left,top:45,width:panel.width,height:455,borderRadius:30,background:"#FFFFFFF2",border:"2px solid #D7E6F2",boxShadow:"0 20px 55px #173B6620",overflow:"hidden",transform:`translateY(${(1-enter)*18}px)`}}>
    <div style={{position:"absolute",right:-45,top:-55,width:185,height:185,borderRadius:"50%",background:`${index<5?violet:coral}16`}}/>
    <div style={{position:"absolute",left:28,top:23}}><Pill color={index<5?violet:coral}>5. SINIF • TÜRKÇE</Pill></div>
    <div style={{position:"absolute",left:28,right:25,top:66,fontSize:27,fontWeight:950,color:navy}}>{scene.title}</div>
    <div style={{position:"absolute",left:29,right:25,top:103,fontSize:15,color:"#64778A",fontWeight:750}}>{scene.lead}</div>
    <div style={{position:"absolute",left:25,right:25,top:139,height:245}}><LessonVisual kind={scene.kind}/></div>
    {scene.note&&<div style={{position:"absolute",left:26,right:26,bottom:18,minHeight:61,borderRadius:16,background:"#FFF7D9",border:`3px solid ${amber}`,boxShadow:"0 9px 20px #F6BC4625",display:"flex",alignItems:"center",padding:"9px 16px",boxSizing:"border-box",fontSize:scene.note.length>125?13:14,fontWeight:850,color:navy,opacity:pop(f,38),transform:`translateY(${(1-pop(f,38))*15}px)`}}><span style={{alignSelf:"stretch",display:"flex",alignItems:"center",marginRight:12,paddingRight:12,borderRight:`2px solid ${amber}`,fontSize:13,fontWeight:950,color:"#A96D00"}}>NOT<br/>ÖNEMLİ</span>{scene.note}</div>}
  </div>
  {!last&&<GifCharacter name={scene.speaker as "filiz"|"ibrahim"} x={right?103:857} y={208} scale={1.05} flip={!right} animate/>}
  {last&&<><GifCharacter name="filiz" x={76} y={255} scale={.75} animate/><GifCharacter name="ibrahim" x={885} y={255} scale={.75} flip animate={false}/></>}
  <Audio src={staticFile(`audio/turkce/es-zit-anlam/main/${scene.id}.mp3`)}/>
</AbsoluteFill>};

const ChannelCard=()=> <Sequence from={900} durationInFrames={150}><div style={{position:"absolute",width:960,height:540,transform:"translate(-200px,10px) scale(.65)",transformOrigin:"bottom right"}}><ChannelLowerThird/></div></Sequence>;

const KurzBg=({index}:{index:number})=>{const f=useCurrentFrame();const palettes=["#08142E","#151033","#092B36","#171C3A","#10162F","#092832","#16122F"];return <AbsoluteFill style={{background:`radial-gradient(circle at ${22+index*9}% 18%,#7257E833,transparent 30%),linear-gradient(145deg,${palettes[index]},#050914)`,overflow:"hidden"}}>
  {Array.from({length:34}).map((_,i)=><i key={i} style={{position:"absolute",left:(i*173+index*47)%955,top:(i*97+31)%535,width:2+i%4,height:2+i%4,borderRadius:"50%",background:i%3===0?"#6CE5D0":"#FFFFFF",opacity:.12+(i%5)*.035,transform:`translate(${Math.sin(f/35+i)*4}px,${Math.cos(f/29+i)*5}px)`}}/>)}
  <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",right:-125,bottom:-170,background:"#FFB36B12",filter:"blur(3px)"}}/>
</AbsoluteFill>};

const KurzScene=({index}:{index:number})=>{const f=useCurrentFrame(),scene=data.kurz[index],enter=interpolate(f,[0,22],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});return <AbsoluteFill style={{fontFamily:"Trebuchet MS,Arial",color:"white"}}><KurzBg index={index}/>
  <div style={{position:"absolute",left:46,top:38,padding:"8px 14px",borderRadius:999,background:index%2?"#238F89":"#7257E8",fontSize:12,fontWeight:950,letterSpacing:1}}>5. SINIF • TÜRKÇE • ANLAM LABORATUVARI</div>
  <div style={{position:"absolute",left:46,right:46,top:84,opacity:enter,transform:`translateY(${(1-enter)*16}px)`}}>
    <div style={{fontSize:31,fontWeight:950,letterSpacing:-.6}}>{scene.title}</div>
    <div style={{fontSize:16,fontWeight:750,color:"#BFD0E8",marginTop:5}}>{scene.lead}</div>
  </div>
  <div style={{position:"absolute",left:29,top:153,width:835,height:325,display:"flex",alignItems:"center",justifyContent:"center",transform:"scale(.9)",transformOrigin:"center"}}><KurzVisual kind={scene.kind}/></div>
  <div style={{position:"absolute",right:22,bottom:18,transform:"scale(.72)",transformOrigin:"bottom right"}}><Lumi task={index}/></div>
  <div style={{position:"absolute",left:47,bottom:24,width:160,height:4,borderRadius:4,background:"#FFFFFF1A",overflow:"hidden"}}><div style={{height:"100%",width:`${interpolate(f,[0,timings.kurz[index].frames],[0,100],clamp)}%`,background:index%2?"#6CE5D0":"#A897FF"}}/></div>
  <Audio src={staticFile(`audio/turkce/es-zit-anlam/kurz/${scene.id}.mp3`)}/>
</AbsoluteFill>};

export const Main=()=> <AbsoluteFill><Canvas>
  {data.main.map((_,i)=><Sequence key={i} from={sceneStart(i)} durationInFrames={timings.main[i].frames}><MainScene index={i}/></Sequence>)}
  <ChannelCard/>
  <Sequence from={sceneStart(data.main.length)} durationInFrames={210}><CtaOptionOne/></Sequence>
</Canvas></AbsoluteFill>;

export const Kurz=()=> <AbsoluteFill><Canvas>
  {data.kurz.map((_,i)=><Sequence key={i} from={kurzStart(i)} durationInFrames={timings.kurz[i].frames}><KurzScene index={i}/></Sequence>)}
  <ChannelCard/>
</Canvas></AbsoluteFill>;
