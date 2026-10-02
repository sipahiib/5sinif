import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, delayRender, continueRender, cancelRender} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import {CtaOptionOne} from '../previews/cta-option-1/CtaOptionOne';
import {ChannelLowerThird} from '../previews/channel-lower-third/ChannelLowerThirdPreview';
import timeline from './timeline.json';

const C = {ink:'#101820', paper:'#F3EFE6', mint:'#3AD6C5', amber:'#FFB454'};
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const, easing:Easing.inOut(Easing.cubic)};
type Scene = typeof timeline.scenes[number];

const Font: React.FC = () => {
  const [handle] = useState(() => delayRender('Load licensed Inter'));
  useEffect(() => {
    const face = new FontFace('LessonInter', `url(${staticFile('fonts/inter/Inter.ttf')})`, {weight:'100 900'});
    face.load().then(font => {document.fonts.add(font); continueRender(handle);}).catch(cancelRender);
  }, [handle]);
  return null;
};

const Label: React.FC<{children:React.ReactNode; dark?:boolean}> = ({children,dark}) => <div style={{fontSize:28,fontWeight:650,lineHeight:1.35,color:dark?C.paper:C.ink,opacity:.8}}>{children}</div>;
const Result: React.FC<{children:React.ReactNode; from:number; amber?:boolean}> = ({children,from,amber}) => {
  const f=useCurrentFrame();
  return <div style={{marginTop:28,padding:'20px 24px',borderRadius:18,background:amber?C.amber:C.mint,color:C.ink,fontSize:34,fontWeight:750,lineHeight:1.3,opacity:interpolate(f,[from,from+12],[0,1],clamp),transform:`translateY(${interpolate(f,[from,from+16],[18,0],clamp)}px)`}}>{children}</div>;
};

const Intro: React.FC<{scene:Scene}> = ({scene}) => {
  const f=useCurrentFrame(); const p1=scene.parts[1].from; const p2=scene.parts[2].from;
  const mode=f<p1?0:f<p2?1:2;
  return <>
    <div style={{fontSize:32,fontWeight:600,marginBottom:38}}>Cümle tamamlama</div>
    <div style={{display:'flex',gap:18,alignItems:'center',height:100}}>
      {['Başta','Ortada','Sonda'].map((word,i)=><div key={word} style={{flex:1,padding:'25px 16px',textAlign:'center',fontSize:34,fontWeight:750,borderRadius:18,background:i===Math.floor(f/65)%3?C.mint:'transparent',border:`2px solid ${C.ink}`,transform:`translateY(${Math.sin(f/25+i)*3}px)`}}>{word}</div>)}
    </div>
    <Result from={p1}>{mode===2?'Anlam + deyim + sözcük türü':'Sözcük veya sözcük öbeği'}</Result>
    <div style={{marginTop:22}}><Label>{mode===0?'Eksik parça nerede?':'İki kontrol: Anlama uygun mu? Yapıya uygun mu?'}</Label></div>
  </>;
};

const Fill:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const reveal=scene.parts[1].from;
  const t=interpolate(f,[reveal,reveal+22],[0,1],clamp);
  return <>
    <Label dark={scene.theme==='dark'}>{scene.hint}</Label>
    <div style={{marginTop:30,fontSize:36,lineHeight:1.65,fontWeight:650,whiteSpace:'pre-line'}}>
      {scene.before && <span>{scene.before} </span>}
      <span style={{display:'inline-block',minWidth:scene.id==='calismak'?245:175,padding:'0 14px',margin:'0 5px',borderRadius:12,border:`2px dashed ${scene.theme==='dark'?C.mint:C.ink}`,background:t?C.mint:'transparent',color:t?C.ink:'inherit',transform:`translateY(${(1-t)*-4}px)`}}>{f<reveal?'…':scene.answer}</span>
      {scene.after && <span> {scene.after}</span>}
    </div>
    {scene.id==='renk'&&<div style={{display:'flex',gap:14,marginTop:26}}>{[C.mint,C.amber,'#CB7788','#97B6DD'].map((color,i)=><div key={color} style={{height:22,borderRadius:12,width:100+Math.sin(f/25+i)*15,background:color}}/>)}</div>}
    <div style={{marginTop:24,fontSize:28,fontWeight:700,opacity:t}}>{scene.id==='mucit'?'Dil bilgisi örneği': '✓ Anlam ve yapı tamamlandı'}</div>
  </>;
};

const Definition:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const reveal=scene.parts[1].from;
  return <>
    <div style={{fontSize:32,lineHeight:1.5}}>Düşünce · duygu · dilek · istek<br/>Haber · öneri</div>
    <Result from={0}>Cümle → tam bir yargı</Result>
    <div style={{display:'flex',alignItems:'center',gap:20,marginTop:34,opacity:interpolate(f,[reveal,reveal+12],[0,1],clamp)}}>
      <div style={{fontSize:40,fontWeight:800,borderBottom:`5px solid ${C.amber}`}}>Geldim.</div>
      <div style={{fontSize:32}}>Bugün okula <strong>geldim.</strong></div>
    </div>
  </>;
};

const Topic:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const p1=scene.parts[1].from;const p2=scene.parts[2].from;
  return <>
    <Label>Neyden söz ediliyor?</Label>
    <div style={{fontSize:34,fontWeight:600,lineHeight:1.5,marginTop:20,opacity:interpolate(f,[p1,p1+12],[0,1],clamp)}}>“Çocuğa küçük şeylerden zevk almasını öğreten, ona büyük bir servet bırakmış olur.”</div>
    <Result from={p2}>Küçük şeylerle mutlu olmanın önemi</Result>
    <div style={{fontSize:28,marginTop:18,opacity:f>=p2?1:0}}>KONU · Sözcük veya sözcük öbeği</div>
  </>;
};

const Message:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const p1=scene.parts[1].from;const p2=scene.parts[2].from;
  return <>
    <Label dark>Verilmek istenen mesaj nedir?</Label>
    <div style={{fontSize:38,lineHeight:1.5,marginTop:28,opacity:interpolate(f,[p1,p1+12],[0,1],clamp)}}>“<span style={{color:C.mint}}>Düşünmediğim</span> zaman,<br/><span style={{color:C.amber}}>yaşamadığım</span> zamandır.”</div>
    <Result from={p2}>Düşünmek hayati önem taşır.</Result>
    <div style={{fontSize:28,marginTop:18,opacity:f>=p2?1:0}}>ANA DÜŞÜNCE · Yargı bildirir</div>
  </>;
};

const Compare:React.FC<{scene:Scene}>=({scene})=><>
  <Label>Aynı cümle, iki farklı soru</Label>
  <Result from={0}>KONU<br/><span style={{fontWeight:550}}>Düşünmenin önemi</span></Result>
  <Result from={scene.parts[1].from} amber>ANA DÜŞÜNCE<br/><span style={{fontWeight:550}}>Düşünmek hayati önem taşır.</span></Result>
</>;

const Predicate:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const p1=scene.parts[1].from;const p2=scene.parts[2].from;
  return <>
    <Label>Anlam bağlarını koru → yüklemi sona getir.</Label>
    <div style={{marginTop:30,fontSize:34,lineHeight:1.65,opacity:interpolate(f,[p1,p1+12],[0,1],clamp)}}>
      <div>Ödevlerini unutunca arkadaşını <strong style={{background:C.mint,padding:'4px 8px',borderRadius:8}}>aradı.</strong></div>
      <div style={{marginTop:18}}>Değerlerine her zaman sahip çıkan <strong style={{background:C.amber,padding:'4px 8px',borderRadius:8}}>biridir.</strong></div>
    </div>
    <Result from={p2}>Bu alıştırmalarda hedef: kurallı cümle.</Result>
  </>;
};

function positions(words:string[],order:number[]) {
  let x=0,y=0; const result:{x:number;y:number;width:number}[]=[];
  order.forEach(i=>{const width=words[i].length*17+32;if(x+width>885){x=0;y+=108;}result[i]={x,y,width};x+=width+12;});
  return result;
}
const Order:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const words=scene.words!;const order=scene.order!;
  const start=scene.parts[1].from;const a=positions(words,words.map((_,i)=>i));const b=positions(words,order);
  const dark=scene.theme==='dark';
  return <>
    <Label dark={dark}>{f<start?'Karışık sözcükler':'Anlamlı ve kurallı cümle'}</Label>
    <div style={{position:'relative',height:320,marginTop:20}}>
      {words.map((word,i)=>{const arrived=f>=start+14;const t=arrived?1:0;const visibility=arrived?interpolate(f,[start+14+order.indexOf(i)*5,start+26+order.indexOf(i)*5],[0,1],clamp):interpolate(f,[start,start+12],[1,0],clamp);const pred=i===order[order.length-1];return <div key={word} style={{position:'absolute',opacity:visibility,transform:`translateY(${arrived?(1-visibility)*14:0}px) scale(${.92+.08*visibility})`,left:a[i].x+(b[i].x-a[i].x)*t,top:a[i].y+(b[i].y+95-a[i].y)*t,width:a[i].width,height:68,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:13,background:pred&&t>.8?C.amber:C.mint,color:C.ink,fontSize:30,fontWeight:750,boxShadow:'0 8px 0 rgba(0,0,0,.12)'}}>
        <span style={{position:'absolute',top:-23,left:8,fontSize:19,fontWeight:650,color:dark?C.paper:C.ink}}>{i+1}</span>
        {t>.8&&i===order[0]?word[0].toLocaleUpperCase('tr')+word.slice(1):word}{t>.8&&pred?'.':''}
      </div>;})}
    </div>
    <div style={{fontSize:30,fontWeight:700,opacity:interpolate(f,[start+36,start+48],[0,1],clamp)}}>{order.map(i=>i+1).join('  →  ')} <span style={{marginLeft:30,color:dark?C.amber:'#80500F'}}>Yüklem sonda.</span></div>
  </>;
};

const Recap:React.FC<{scene:Scene}>=({scene})=>{
  const f=useCurrentFrame();const second=f>=scene.parts[1].from;
  return <>
    {(second?[['ANA DÜŞÜNCE','Verilmek istenen mesaj'],['CÜMLE OLUŞTURMA','Anlam ilişkisi + yüklem sonda']]:[['TAMAMLAMA','Anlam + yapı'],['KONU','Neyden söz ediliyor?']]).map(([a,b],i)=><div key={a} style={{borderLeft:`6px solid ${i?C.amber:C.mint}`,padding:'16px 26px',marginBottom:30}}><div style={{fontSize:28,color:i?C.amber:C.mint,fontWeight:750}}>{a}</div><div style={{fontSize:38,fontWeight:650,marginTop:12}}>{b}</div></div>)}
  </>;
};

const visuals:Record<string,React.FC<{scene:Scene}>>={intro:Intro,fill:Fill,definition:Definition,topic:Topic,message:Message,compare:Compare,predicate:Predicate,order:Order,recap:Recap};
export const LessonScene:React.FC<{index:number}>=({index})=>{
  const scene=timeline.scenes[index];const f=useCurrentFrame();const dark=scene.theme==='dark';const filiz=scene.speaker==='filiz';const Visual=visuals[scene.kind];
  const active=scene.parts.some(p=>f>=p.from&&f<p.from+p.frames-3);
  return <AbsoluteFill style={{background:dark?C.ink:C.paper,color:dark?C.paper:C.ink,fontFamily:'LessonInter, sans-serif',overflow:'hidden'}}>
    <Font/>
    <div style={{position:'absolute',width:550,height:550,borderRadius:'50%',right:-290,bottom:-300,border:`50px solid ${dark?'#213B40':'#E6E3D8'}`,transform:`rotate(${f/8}deg)`}}/>
    <div style={{position:'absolute',left:64,top:48,fontSize:28,fontWeight:700,letterSpacing:2,color:dark?C.mint:'#28564F'}}>TÜRKÇE · CÜMLE</div>
    <div style={{position:'absolute',left:64,top:96,right:64,fontSize:54,fontWeight:800,lineHeight:1.15,letterSpacing:-1.7}}>{scene.title}</div>
    <div style={{position:'absolute',left:filiz?310:64,top:210,width:900}}><Visual scene={scene}/></div>
    <GifCharacter name={filiz?'filiz':'ibrahim'} x={filiz?173:1107} y={235} scale={1.08} flip={!filiz} animate={active}/>
    <div style={{position:'absolute',left:64,right:64,bottom:48,height:3,background:dark?'#344147':'#D3D3C9'}}><div style={{height:3,width:`${100*f/scene.frames}%`,background:dark?C.mint:'#317C70'}}/></div>
    {scene.parts.map(p=><Sequence key={p.audio} from={p.from} durationInFrames={p.frames}><Audio src={staticFile(p.audio)}/></Sequence>)}
  </AbsoluteFill>;
};

export const CumleGenelDesign:React.FC=()=> <AbsoluteFill>
  {/* One data-driven lesson template; each source scene has measured narration. */}
  {timeline.scenes.map((s,i)=><Sequence key={s.id} name={s.title} from={s.from} durationInFrames={s.frames}><LessonScene index={i}/></Sequence>)}
  <Sequence from={870} durationInFrames={180} name="Kanal kartı 00:30–00:35"><div style={{position:'absolute',left:64,top:42,width:960,height:540,transform:'scale(1.2)',transformOrigin:'top left',fontFamily:'LessonInter, sans-serif'}}><ChannelLowerThird/></div></Sequence>
  <Sequence from={timeline.lessonFrames} durationInFrames={210} name="Kapanış"><div style={{position:'absolute',width:960,height:540,transform:'scale(1.3333333333)',transformOrigin:'top left'}}><CtaOptionOne/></div></Sequence>
</AbsoluteFill>;
