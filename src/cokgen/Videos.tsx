import React from 'react';
import {AbsoluteFill,Audio,Sequence,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import {Lumi} from '../isik-yayilmasi/Visuals';
import {CtaOptionOne} from '../previews/cta-option-1/CtaOptionOne';
import {ChannelLowerThird} from '../previews/channel-lower-third/ChannelLowerThirdPreview';
import {Font} from '../isik-yayilmasi/Font';
import timeline from './timeline.json';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const poly=(n:number,cx:number,cy:number,r:number)=>Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+r*Math.cos(a),cy+r*Math.sin(a)] as const});
const points=(p:readonly (readonly number[])[])=>p.map(x=>x.join(',')).join(' ');
const shape=(n:number,cx:number,cy:number,r:number,fill:string,stroke:string,progress:number,key:string)=>{const p=poly(n,cx,cy,r);return <g key={key}><polygon points={points(p)} fill={fill} opacity={progress*.75}/><polygon points={points(p)} pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress} fill="none" stroke={stroke} strokeWidth="7" strokeLinejoin="round"/>{p.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6" fill="#F17069" opacity={progress}/>)}</g>};
const Visual:React.FC<{kind:string;dark?:boolean}>=({kind,dark=false})=>{
 const f=useCurrentFrame(),p=interpolate(f,[0,65],[0,1],clamp),ink=dark?'#FFFFFF':'#173B66',line=dark?'#FFCC45':'#1178E8',fill=dark?'#00BCA9':'#DFF5F2';
 const label=(x:number,y:number,s:string,size=30)=><text x={x} y={y} textAnchor="middle" fill={ink} fontSize={size} fontWeight="800">{s}</text>;
 const t:readonly (readonly number[])[]=[[450,28],[315,245],[585,245]];
 if(kind==='points'||kind==='triangle'||kind==='parts')return <svg viewBox="0 0 900 300" width="100%" height="100%">
  {kind!=='points'&&<><polygon points={points(t)} fill={fill} opacity={p*.75}/><polygon points={points(t)} pathLength="1" fill="none" stroke={line} strokeWidth="8" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset={1-p}/></>}
  {t.map(([x,y],i)=><g key={i} opacity={interpolate(f,[i*12,i*12+12],[0,1],clamp)}><circle cx={x} cy={y} r="10" fill="#F17069"/>{label(x+(i===1?-24:i===2?24:0),y+(i===0?-12:26),['A','B','C'][i],25)}</g>)}
  {kind==='parts'&&<>{label(715,135,'3 kenar',30)}{label(715,180,'3 köşe',30)}</>}
 </svg>;
 if(kind==='names')return <svg viewBox="0 0 900 300" width="100%" height="100%">{[3,4,6,8].map((n,i)=><g key={n} opacity={interpolate(f,[i*20,i*20+20],[0,1],clamp)}>{shape(n,120+i*215,125,82,fill,line,1,`s${n}`)}{label(120+i*215,260,["Üçgen","Dörtgen","Altıgen","Sekizgen"][i],26)}</g>)}</svg>;
 if(kind==='sixeight')return <svg viewBox="0 0 900 300" width="100%" height="100%">{shape(6,250,135,108,fill,line,p,'six')}{shape(8,650,135,108,fill,line,p,'eight')}{label(250,280,'6 kenar · Altıgen',29)}{label(650,280,'8 kenar · Sekizgen',29)}</svg>;
 if(kind==='regular'||kind==='examples')return <svg viewBox="0 0 900 300" width="100%" height="100%">{shape(3,245,145,113,fill,line,p,'tri')}{shape(4,655,145,113,fill,line,p,'square')}{label(245,298,'Eşkenar üçgen',29)}{label(655,298,'Kare',29)}</svg>;
 const n=Math.min(32,Math.max(5,5+Math.floor(f/20)));return <svg viewBox="0 0 900 300" width="100%" height="100%">{shape(n,275,132,98,fill,line,1,'many')}<circle cx="645" cy="132" r="98" fill="none" stroke={dark?'#FF6C82':'#E85B69'} strokeWidth="8"/>{label(275,285,`${n} kenarlı çokgen`,26)}{label(645,285,'Çember · eğri',28)}</svg>;
};
const KurzVisual:React.FC<{kind:string}>=({kind})=>{
 const f=useCurrentFrame();const ease=interpolate(f,[0,65],[0,1],clamp);const ink='#FFFFFF';const active=Math.floor(f/24);
 const polygon=(n:number,cx:number,cy:number,r:number)=>{const pts=poly(n,cx,cy,r);return <g><polygon points={points(pts)} fill="#147B87" opacity={.65*ease}/>{pts.map(([x,y],i)=>{const [x2,y2]=pts[(i+1)%n];return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={active%n===i?'#FFCD38':'#54DCCC'} strokeWidth={active%n===i?12:7} strokeLinecap="round" opacity={interpolate(f,[i*7,i*7+15],[0,1],clamp)}/>})}{pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="8" fill="#FF7882" opacity={ease}/>)}</g>};
 const text=(x:number,y:number,t:string,size=30)=><text x={x} y={y} textAnchor="middle" fill={ink} fontSize={size} fontWeight="800">{t}</text>;
 if(kind==='triangle')return <svg viewBox="0 0 900 300" width="100%" height="100%">{polygon(3,455,150,132)}{text(120,105,'3 NOKTA',32)}{text(750,105,'3 KENAR',32)}{text(450,292,'KAPALI ŞEKİL',27)}</svg>;
 if(kind==='sixeight')return <svg viewBox="0 0 900 300" width="100%" height="100%"><g transform={`translate(${(1-ease)*-100} 0)`}>{polygon(6,230,130,107)}</g><g transform={`translate(${(1-ease)*100} 0)`}>{polygon(8,665,130,107)}</g>{text(230,280,'6 · ALTIGEN',31)}{text(665,280,'8 · SEKİZGEN',31)}</svg>;
 if(kind==='regular')return <svg viewBox="0 0 900 300" width="100%" height="100%">{polygon(5,450,130,105)}<rect x="18" y="76" width="210" height="86" rx="20" fill="#E94575"/>{text(123,128,'EŞİT KENAR',25)}<rect x="670" y="76" width="210" height="86" rx="20" fill="#1178E8"/>{text(775,128,'EŞİT AÇI',25)}{text(450,295,'İKİ KOŞUL BİRLİKTE',27)}</svg>;
 if(kind==='examples')return <svg viewBox="0 0 900 300" width="100%" height="100%"><g transform={`rotate(${(1-ease)*45} 440 145)`}>{polygon(4,440,145,133)}</g>{text(160,80,'4 KENAR',32)}{text(160,120,'EŞİT',32)}{text(730,80,'4 DİK AÇI',32)}{text(730,120,'EŞİT',32)}</svg>;
 if(kind==='parts')return <svg viewBox="0 0 900 300" width="100%" height="100%">{polygon(3,350,150,130)}<g opacity={interpolate(f,[20,45],[0,1],clamp)}>{text(705,100,'3 KENAR',34)}</g><g opacity={interpolate(f,[75,105],[0,1],clamp)}>{text(705,160,'3 KÖŞE',34)}</g><g opacity={interpolate(f,[140,170],[0,1],clamp)}>{text(705,222,'KAPALI',34)}</g></svg>;
 const n=Math.min(32,5+Math.floor(f/12));return <svg viewBox="0 0 900 300" width="100%" height="100%">{polygon(n,245,130,100)}<circle cx="660" cy="130" r="100" fill="none" stroke="#FF718A" strokeWidth="9"/>{text(245,290,`${n} KENAR`,28)}{text(660,290,'ÇEMBER',28)}</svg>;
};
type Scene=typeof timeline.main.scenes[number];
const MainScene:React.FC<{scene:Scene}>=({scene})=>{const f=useCurrentFrame();const filiz=scene.speaker==='filiz';const card=scene.from+f>=900&&scene.from+f<1050;return <AbsoluteFill style={{background:'white',fontFamily:'LessonInter, Arial, sans-serif',color:'#101820',overflow:'hidden'}}><Font/>
 {!card&&<div style={{position:'absolute',left:64,top:48,fontSize:27,fontWeight:800,color:'#287B76',letterSpacing:1}}>MATEMATİK · ÇOKGENLER</div>}
 {!card&&<div style={{position:'absolute',left:64,top:100,right:64,fontSize:54,lineHeight:1.1,fontWeight:850}}>{scene.title}</div>}
 <div style={{position:'absolute',left:filiz?300:64,top:205,width:900,height:300}}><Visual kind={scene.visual}/></div>
 <div style={{position:'absolute',left:filiz?300:64,top:537,width:900,boxSizing:'border-box',padding:'17px 20px',borderLeft:'8px solid #3AD6C5',background:'#EAF9F6',fontSize:30,fontWeight:750,lineHeight:1.25}}>{scene.caption}</div>
 <GifCharacter name={filiz?'filiz':'ibrahim'} x={filiz?155:1100} y={250} scale={1} flip={!filiz} animate={f<scene.audioFrames}/><Audio src={staticFile(scene.audio)}/>
 </AbsoluteFill>};
export const Main=()=> <AbsoluteFill>{timeline.main.scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.frames}><MainScene scene={s}/></Sequence>)}
 <Sequence from={900} durationInFrames={150}><div style={{position:'absolute',left:64,top:-438,width:960,height:540,transform:'scale(1.2)',transformOrigin:'top left',fontFamily:'LessonInter, sans-serif'}}><ChannelLowerThird/></div></Sequence>
 <Sequence from={timeline.main.lessonFrames} durationInFrames={210}><div style={{position:'absolute',width:960,height:540,transform:'scale(1.3333333333)',transformOrigin:'top left'}}><CtaOptionOne whiteBackground/></div></Sequence></AbsoluteFill>;
const KurzScene:React.FC<{scene:Scene;index:number}>=({scene,index})=>{const f=useCurrentFrame();const card=scene.from+f>=900&&scene.from+f<1050;const colors=['#10265C','#39165B','#073D4C','#382260','#123E53','#24205D'];return <AbsoluteFill style={{background:colors[index],fontFamily:'LessonInter, Arial, sans-serif',color:'white',overflow:'hidden'}}><Font/>
 {!card&&<div style={{position:'absolute',left:64,top:48,fontSize:27,fontWeight:800,color:'#FFC400',letterSpacing:2}}>LUMİ İLE MATEMATİK</div>}
 {!card&&<div style={{position:'absolute',left:64,top:102,right:64,fontSize:51,fontWeight:850,lineHeight:1.1}}>{scene.title}</div>}
 <div style={{position:'absolute',left:265,top:208,width:900,height:300,transform:`translateY(${Math.sin(f/35)*3}px)`}}><KurzVisual kind={scene.visual}/></div>
 <div style={{position:'absolute',left:280,top:540,width:870,fontSize:30,fontWeight:750,lineHeight:1.25,padding:'16px 20px',borderLeft:'8px solid #FFC400',background:'rgba(0,0,0,.15)',boxSizing:'border-box'}}>{scene.caption}</div>
 <Lumi x={72} y={340}/><Audio src={staticFile(scene.audio)}/></AbsoluteFill>};
export const Kurz=()=> <AbsoluteFill>{timeline.kurz.scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.frames}><KurzScene scene={s} index={i}/></Sequence>)}<Sequence from={900} durationInFrames={150}><div style={{position:'absolute',left:64,top:-438,width:960,height:540,transform:'scale(1.2)',transformOrigin:'top left',fontFamily:'LessonInter, sans-serif'}}><ChannelLowerThird/></div></Sequence></AbsoluteFill>;
