import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import t from './timing.json';

const choices=['Beşgen','Altıgen','Yedigen','Sekizgen'];
export const Short=()=>{
 const f=useCurrentFrame(), show=f>=t.qEnd, reveal=f>=t.reveal, done=f>=t.answerEnd;
 const progress=Math.min(1,Math.max(0,(f-t.qEnd)/150));
 const count=Math.max(1,5-Math.floor((f-t.qEnd)/30));
 const draw=interpolate(f,[0,38],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'#fff',fontFamily:'Arial, sans-serif',color:'#173B66',overflow:'hidden'}}>
  <div style={{position:'absolute',left:42,right:42,top:56,display:'flex',alignItems:'center',gap:12}}><span style={{padding:'9px 17px',borderRadius:30,background:'#173B66',color:'white',fontSize:24,fontWeight:800}}>5. SINIF</span><span style={{padding:'9px 17px',borderRadius:30,background:'#1178E8',color:'white',fontSize:24,fontWeight:800}}>MATEMATİK</span><div style={{height:3,flex:1,background:'#D1E6F6'}}/></div>
  <div style={{position:'absolute',left:42,right:42,top:132,height:250,borderRadius:28,border:'3px solid #D1E6F6',background:'white',boxShadow:'0 12px 28px rgba(23,59,102,.09)',padding:'24px 25px',boxSizing:'border-box'}}>
   <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:43,height:43,borderRadius:13,background:'#FFC400',fontSize:32,fontWeight:850,textAlign:'center'}}>?</div><div style={{fontSize:21,fontWeight:800,color:'#1178E8'}}>HIZLI SORU • ÇOKGENLER</div></div>
   <div style={{marginTop:18,fontSize:36,lineHeight:1.18,fontWeight:800,color:'#172638'}}>Şekildeki çokgenin adı nedir?</div>
   <div style={{position:'absolute',bottom:19,left:25,right:25,fontSize:20,fontWeight:650,background:'#EFF7FE',borderRadius:10,padding:'8px 11px'}}>Şekli incele, seçenekleri karşılaştır.</div>
  </div>
  <div style={{position:'absolute',left:130,top:410,width:460,height:258,display:'grid',placeItems:'center'}}><svg width="380" height="250" viewBox="0 0 380 250" style={{transform:`translateY(${Math.sin(f/24)*3}px)`}}><polygon points="190,12 288,69 288,181 190,238 92,181 92,69" fill="#EAF5FF" opacity={draw}/><polygon points="190,12 288,69 288,181 190,238 92,181 92,69" fill="none" stroke="#1178E8" strokeWidth="9" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw}/>{[[190,12],[288,69],[288,181],[190,238],[92,181],[92,69]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="7" fill="#F16B6C" opacity={draw}/>)}</svg></div>
  {show&&<div style={{position:'absolute',left:42,top:708,width:422,display:'flex',flexDirection:'column',gap:11}}>{choices.map((c,i)=>{const correct=reveal&&i===1;return <div key={c} style={{height:60,boxSizing:'border-box',borderRadius:16,padding:'7px 12px',display:'flex',alignItems:'center',gap:12,border:`3px solid ${correct?'#24A96E':'#C6DDED'}`,background:correct?'#E1F9EC':'#FFFFFF',boxShadow:'0 5px 12px rgba(23,59,102,.07)'}}><div style={{width:37,height:37,borderRadius:10,background:correct?'#24A96E':'#EAF3FC',color:correct?'white':'#173B66',fontWeight:850,fontSize:25,display:'grid',placeItems:'center'}}>{correct?'✓':String.fromCharCode(65+i)}</div><div style={{fontSize:25,fontWeight:750}}>{c}</div></div>})}</div>}
  <GifCharacter name="ibrahim" x={589} y={698} scale={.95} flip animate={f<t.qEnd||(reveal&&!done)}/>
  {show&&!reveal&&<div style={{position:'absolute',left:274,top:1010,width:140,height:140}}><svg width="140" height="140" viewBox="0 0 140 140" style={{position:'absolute',transform:'rotate(-90deg)'}}><circle cx="70" cy="70" r="52" fill="none" stroke="#E3EDF7" strokeWidth="10"/><circle cx="70" cy="70" r="52" fill="none" stroke="#FFC400" strokeWidth="10" strokeDasharray={2*Math.PI*52} strokeDashoffset={2*Math.PI*52*progress} strokeLinecap="round"/></svg><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><strong style={{fontSize:48,lineHeight:1}}>{count}</strong><span style={{fontSize:18,fontWeight:850,marginTop:7}}>DÜŞÜN!</span></div></div>}
  {reveal&&!done&&<div style={{position:'absolute',left:42,top:1040,borderLeft:'6px solid #24A96E',padding:'13px 20px',fontSize:28,fontWeight:800,color:'#157C51'}}>6 kenar → altıgen</div>}
  {done&&<div style={{position:'absolute',left:42,right:42,top:1040,height:144,borderRadius:26,background:'#EFFAF6',border:'3px solid #24A96E',display:'flex',alignItems:'center',justifyContent:'center',fontSize:52,fontWeight:850}}>Tebrikler!</div>}
  <Audio src={staticFile('audio/matematik/cokgen/question.mp3')}/><Sequence from={t.answerFrom}><Audio src={staticFile('audio/matematik/cokgen/answer.mp3')}/></Sequence>
 </AbsoluteFill>;
};
