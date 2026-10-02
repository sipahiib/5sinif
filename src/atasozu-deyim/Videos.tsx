import React from 'react';
import {AbsoluteFill,Audio,Sequence,interpolate,Easing,staticFile,useCurrentFrame} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import {CtaOptionOne} from '../previews/cta-option-1/CtaOptionOne';
import {ChannelLowerThird} from '../previews/channel-lower-third/ChannelLowerThirdPreview';
import {Font} from './Font';
import {ConceptVisual,Lumi} from './Visuals';
import {KurzVisual} from './KurzVisual';
import data from './timeline.json';
const C={ink:'#101820',blue:'#1178E8',cyan:'#00CDB8',amber:'#FFC400',purple:'#7429E8'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.inOut(Easing.cubic)};
const mainKinds=['isim','turuygulama','soru','unlem','noktalama'];
const subject=(id:string)=>mainKinds.includes(id)?'SÖZCÜK TÜRLERİ VE NOKTALAMA':'ATASÖZÜ VE DEYİM';

export const MainScene:React.FC<{index:number}>=({index})=>{
 const scene=data.main.scenes[index];const f=useCurrentFrame();
 const part=scene.parts.find(p=>f>=p.from&&f<p.from+p.frames+6)??scene.parts[scene.parts.length-1];
 const active=f<part.from+part.frames;const filiz=part.speaker==='filiz';const global=scene.from+f;
 const card=global>=900&&global<1050;
 const phase=scene.parts.indexOf(part);
 const perPart:Record<string,string[]>={atasozu:['heritage','seed'],anlam:['grapes','budget'],eslesme1:['clock','listen'],eslesme2:['balance','choices','budget'],deyim:['speech','watch'],deyimanlam:['targets','speech'],deyimeslesme1:['arrow','reject'],deyimeslesme2:['panic','secret'],noktalama:['question','exclaim','punctuation','question']};
 const visual=perPart[scene.id]?.[phase]??scene.kind;
 const headline=part.headline;const detail=part.detail;
 return <AbsoluteFill style={{background:'#FFFFFF',color:C.ink,fontFamily:'LessonInter, sans-serif',overflow:'hidden'}}>
  <Font/>
  {!card&&<><div style={{position:'absolute',left:64,top:48,fontSize:28,fontWeight:700,color:'#28564F',letterSpacing:1.2}}>TÜRKÇE · {subject(scene.id)}</div><div style={{position:'absolute',left:64,right:64,top:98,fontSize:54,lineHeight:1.12,fontWeight:800,letterSpacing:-1.5}}>{scene.title}</div></>}
  <div style={{position:'absolute',left:filiz?310:64,top:195,width:900,height:230}}><ConceptVisual kind={visual} phase={phase}/></div>
  <div style={{position:'absolute',left:filiz?310:64,top:450,width:900}}>
   <div key={part.from} style={{fontSize:34,fontWeight:750,lineHeight:1.27,whiteSpace:'pre-line',opacity:interpolate(f,[part.from,part.from+10],[.5,1],clamp)}}>{headline}</div>
   <div style={{marginTop:18,fontSize:28,lineHeight:1.35,padding:'13px 20px',borderRadius:14,background:scene.id==='soru'&&phase===1?'#FFF1C7':'#E9FAF6',fontWeight:600}}>{detail}</div>
  </div>
  <GifCharacter name={filiz?'filiz':'ibrahim'} x={filiz?173:1107} y={235} scale={1.08} flip={!filiz} animate={active}/>
  <div style={{position:'absolute',left:64,right:64,bottom:48,height:3,background:'#E1E8E5'}}><div style={{width:`${f/scene.frames*100}%`,height:3,background:C.cyan}}/></div>
  {scene.parts.map(p=><Sequence key={p.audio} from={p.from} durationInFrames={p.frames}><Audio src={staticFile(p.audio)}/></Sequence>)}
 </AbsoluteFill>;
};
export const Main:React.FC=()=> <AbsoluteFill>
 {data.main.scenes.map((s,i)=><Sequence name={s.title} key={s.id} from={s.from} durationInFrames={s.frames}><MainScene index={i}/></Sequence>)}
 <Sequence name="Kanal kartı" from={870} durationInFrames={180}><div style={{position:'absolute',left:64,top:-438,width:960,height:540,transform:'scale(1.2)',transformOrigin:'top left',fontFamily:'LessonInter, sans-serif'}}><ChannelLowerThird/></div></Sequence>
 <Sequence name="Kapanış" from={data.main.lessonFrames} durationInFrames={210}><div style={{position:'absolute',width:960,height:540,transform:'scale(1.3333333333)',transformOrigin:'top left'}}><CtaOptionOne whiteBackground/></div></Sequence>
</AbsoluteFill>;

export const KurzScene:React.FC<{index:number}>=({index})=>{
 const scene=data.kurz.scenes[index];const f=useCurrentFrame();const p=scene.parts[0];const left=index%2===0;const global=scene.from+f;const card=global>=900&&global<1050;
 const progress=interpolate(f,[0,Math.min(scene.frames*.4,180)],[0,1],clamp);
 return <AbsoluteFill style={{background:['#101C55','#142B4D','#351656','#073C48','#28205C','#102F50','#32183F','#0B3448'][index],color:'#FFFFFF',fontFamily:'LessonInter, sans-serif',overflow:'hidden'}}>
  <Font/>
  {!card&&<><div style={{position:'absolute',left:64,top:48,fontSize:28,fontWeight:750,color:C.amber,letterSpacing:2}}>LUMİ İLE TÜRKÇE</div><div style={{position:'absolute',left:64,right:64,top:100,fontSize:54,fontWeight:850,lineHeight:1.12}}>{scene.title}</div></>}
  <div style={{position:'absolute',left:left?280:64,top:215,width:900,height:290,transform:`translateY(${(1-progress)*9}px)`}}><KurzVisual index={index}/></div>
  <div style={{position:'absolute',left:left?280:64,top:535,width:900,fontSize:32,fontWeight:750,lineHeight:1.35,padding:'17px 22px',borderLeft:`8px solid ${index%2?C.amber:C.cyan}`}}>{scene.caption}</div>
  <Lumi x={left?72:1040} y={367} flip={!left}/>
  <Audio src={staticFile(p.audio)}/>
 </AbsoluteFill>;
};
export const Kurz:React.FC=()=> <AbsoluteFill>
 {data.kurz.scenes.map((s,i)=><Sequence name={s.title} key={s.id} from={s.from} durationInFrames={s.frames}><KurzScene index={i}/></Sequence>)}
 <Sequence name="Kanal kartı" from={870} durationInFrames={180}><div style={{position:'absolute',left:64,top:-438,width:960,height:540,transform:'scale(1.2)',transformOrigin:'top left',fontFamily:'LessonInter, sans-serif'}}><ChannelLowerThird/></div></Sequence>
</AbsoluteFill>;

const Pill:React.FC<{children:React.ReactNode;color:string}>=({children,color})=><div style={{padding:'9px 17px',borderRadius:30,background:color,color:'white',fontSize:24,fontWeight:800}}>{children}</div>;
export const Short:React.FC<{index:number}>=({index})=>{
 const s=data.shorts[index];const f=useCurrentFrame();const waiting=f>=s.qEnd&&f<s.reveal;const reveal=f>=s.reveal;const congrats=f>=s.answerEnd;
 const speaking=f<s.qEnd||(f>=s.reveal&&f<s.answerEnd);const progress=interpolate(f,[s.qEnd,s.reveal],[0,1],clamp);const count=Math.max(1,5-Math.floor((f-s.qEnd)/30));const circum=2*Math.PI*52;
 return <AbsoluteFill style={{background:'#FFFFFF',fontFamily:'LessonInter, sans-serif',color:'#173B66',overflow:'hidden'}}>
  <Font/>
  <div style={{position:'absolute',left:42,right:42,top:56,display:'flex',alignItems:'center',gap:12}}><Pill color="#173B66">5. SINIF</Pill><Pill color="#1178E8">TÜRKÇE</Pill><div style={{height:3,flex:1,background:'#D1E6F6'}}/></div>
  <div style={{position:'absolute',left:42,right:42,top:132,height:266,borderRadius:28,border:'3px solid #D1E6F6',background:'#FFFFFF',boxShadow:'0 12px 28px rgba(23,59,102,.09)',padding:'24px 25px',boxSizing:'border-box'}}>
   <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:43,height:43,borderRadius:13,background:'#FFC400',fontSize:32,fontWeight:850,textAlign:'center',flexShrink:0}}>?</div><div style={{fontSize:21,fontWeight:800,color:'#1178E8'}}>HIZLI SORU • {s.topic}</div></div>
   <div style={{marginTop:16,fontSize:34,lineHeight:1.17,fontWeight:800,color:'#172638'}}>{s.question}</div>
   <div style={{position:'absolute',bottom:19,left:25,right:25,fontSize:20,fontWeight:650,background:'#EFF7FE',borderRadius:10,padding:'8px 11px'}}>Dört seçeneği karşılaştır.</div>
  </div>
  <div style={{position:'absolute',left:42,right:42,top:423,height:235}}><ConceptVisual kind={s.visual} revealed={reveal}/></div>
  {f>=s.qEnd&&<div style={{position:'absolute',left:42,top:710,width:422,display:'flex',flexDirection:'column',gap:11}}>{s.choices.map((c,i)=>{const correct=reveal&&i===s.correct;return <div key={c} style={{height:60,boxSizing:'border-box',borderRadius:16,padding:'7px 12px',display:'flex',alignItems:'center',gap:12,border:`3px solid ${correct?'#24A96E':'#C6DDED'}`,background:correct?'#E1F9EC':'#FFFFFF',boxShadow:'0 5px 12px rgba(23,59,102,.07)'}}><div style={{width:37,height:37,borderRadius:10,flexShrink:0,background:correct?'#24A96E':'#EAF3FC',color:correct?'#FFFFFF':'#173B66',fontWeight:850,fontSize:25,display:'flex',alignItems:'center',justifyContent:'center'}}>{correct?'✓':String.fromCharCode(65+i)}</div><div style={{fontSize:c.length>25?22:25,lineHeight:1.06,fontWeight:750}}>{c}</div></div>;})}</div>}
  <GifCharacter name="ibrahim" x={589} y={698} scale={.95} flip animate={speaking}/>
  {waiting&&<div style={{position:'absolute',left:274,top:1030,width:140,height:140}}><svg width="140" height="140" viewBox="0 0 140 140" style={{position:'absolute',transform:'rotate(-90deg)'}}><circle cx="70" cy="70" r="52" fill="none" stroke="#E3EDF7" strokeWidth="10"/><circle cx="70" cy="70" r="52" fill="none" stroke="#FFC400" strokeWidth="10" strokeDasharray={circum} strokeDashoffset={circum*progress} strokeLinecap="round"/></svg><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><strong style={{fontSize:48,lineHeight:1}}>{count}</strong><span style={{fontSize:18,fontWeight:850,marginTop:7}}>DÜŞÜN!</span></div></div>}
  {reveal&&!congrats&&<div style={{position:'absolute',left:42,right:42,top:1047,borderLeft:'6px solid #24A96E',padding:'13px 20px',fontSize:28,fontWeight:800,color:'#157C51'}}>Doğru cevap: {String.fromCharCode(65+s.correct)}</div>}
  {congrats&&<div style={{position:'absolute',left:42,right:42,top:1040,height:144,borderRadius:26,background:'#EFFAF6',border:'3px solid #24A96E',display:'flex',alignItems:'center',justifyContent:'center',fontSize:52,fontWeight:850,transform:`scale(${interpolate(f,[s.answerEnd,s.answerEnd+12],[.96,1],clamp)})`}}>Tebrikler!</div>}
  <Sequence durationInFrames={s.q.frames}><Audio src={staticFile(s.q.audio)}/></Sequence><Sequence from={s.reveal} durationInFrames={s.a.frames}><Audio src={staticFile(s.a.audio)}/></Sequence>
 </AbsoluteFill>;
};
