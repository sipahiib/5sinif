import React from 'react';
import {spring,useCurrentFrame} from 'remotion';
import {Backdrop,C,Eyebrow,Scene,Voice} from './shared';
export const Opening:React.FC=()=>{const f=useCurrentFrame();return <Scene><Backdrop/><Eyebrow/>
<div style={{position:'absolute',left:58,right:58,top:278,fontSize:76,fontWeight:800,lineHeight:1.07,letterSpacing:-3.5,color:C.ink}}>Yeni konular<br/><span style={{color:C.blue}}>eklendi</span></div>
<div style={{position:'absolute',left:62,top:505,fontSize:48,fontWeight:700,lineHeight:1.16,color:C.ink,letterSpacing:-1.8}}>YouTube’dan<br/>takip edin</div>
<div style={{position:'absolute',left:58,right:58,top:713,display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>{[['FEN','KUVVET'],['MATEMATİK','AÇILAR'],['SOSYAL','KÜLTÜREL ÖZELLİKLER'],['TÜRKÇE','SOMUT / SOYUT']].map(([lesson,topic],i)=>{const p=spring({frame:f-4-i*3,fps:30,config:{damping:20,stiffness:180}});return <div key={lesson} style={{height:106,background:i%2===0?C.pale:'#FFF0EC',borderRadius:24,padding:'20px 20px',translate:`0 ${(1-p)*12}px`}}><div style={{fontSize:16,fontWeight:700,letterSpacing:1,color:C.muted}}>{lesson}</div><div style={{marginTop:10,fontSize:topic.length>16?17:21,fontWeight:750,color:C.ink}}>{topic}</div></div>;})}</div><Voice index={0}/>
</Scene>;};
