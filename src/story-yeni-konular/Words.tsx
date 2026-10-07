import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Eyebrow,Footer,Headline,Scene,Voice} from './shared';
export const Words:React.FC=()=>{const f=useCurrentFrame();return <Scene><Backdrop accent={C.red}/><Eyebrow subject="TÜRKÇE"/><Headline>Somut–soyut<br/>ifadeler</Headline>
<div style={{position:'absolute',left:58,top:502,width:604,height:350,background:'#FFF0EC',borderRadius:38,padding:'41px 34px',display:'flex',flexDirection:'column',gap:34}}>
{[['Kalem','SOMUT',C.blue],['Sevgi','SOYUT',C.red]].map(([word,type,color],i)=><div key={word} style={{display:'flex',alignItems:'center',gap:21,height:112,opacity:interpolate(f,[i*8,i*8+12],[.75,1],clamp)}}><span style={{width:163,fontSize:43,fontWeight:750,color:C.ink,letterSpacing:-1.5}}>{word}</span><svg width="59" height="28" viewBox="0 0 59 28"><path d="M0 14H45" stroke={color} strokeWidth="4"/><path d="M59 14L43 4V24Z" fill={color}/></svg><span style={{background:color,color:'#fff',borderRadius:17,padding:'15px 21px',fontSize:32,fontWeight:750}}>{type}</span></div>)}
</div><Footer accent={C.red}>Sözcükleri ayırt et</Footer><Voice index={4}/></Scene>;};
