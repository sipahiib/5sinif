import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Eyebrow,Footer,Headline,Scene,Voice} from './shared';
export const Culture:React.FC=()=>{const f=useCurrentFrame();return <Scene><Backdrop accent={C.mint}/><Eyebrow subject="SOSYAL BİLGİLER"/><Headline>Kültürel<br/>özellikler</Headline>
<div style={{position:'absolute',left:58,top:502,width:604,height:350,display:'flex',gap:20}}>
<div style={{width:292,height:350,borderRadius:32,background:'#EDF8F4',position:'relative'}}>
<svg width="292" height="220" viewBox="0 0 292 220" aria-label="Birlikte bayram kutlayan kişiler"><circle cx="95" cy="69" r="24" fill={C.blue}/><circle cx="195" cy="69" r="24" fill={C.red}/><path d="M66 176V119Q94 99 119 118V176Z" fill={C.blue}/><path d="M170 176V119Q196 99 224 118V176Z" fill={C.red}/><path d="M109 126L145 148L180 126" fill="none" stroke={C.ink} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/><g opacity={interpolate(f,[0,16],[.2,1],clamp)}><path d="M137 56L146 42L154 56M140 72H153" stroke={C.mint} strokeWidth="4" fill="none" strokeLinecap="round"/></g></svg>
<div style={{textAlign:'center',fontSize:32,fontWeight:750,color:C.ink}}>Bayramlar</div><div style={{textAlign:'center',fontSize:21,color:C.muted,marginTop:18}}>Birlikte kutlarız</div>
</div>
<div style={{width:292,height:350,borderRadius:32,background:'#FFF0EC',position:'relative'}}>
<svg width="292" height="220" viewBox="0 0 292 220" aria-label="Geleneksel el sanatlarına örnek geometrik kilim deseni"><rect x="75" y="44" width="143" height="149" rx="8" fill={C.red}/><rect x="89" y="58" width="115" height="121" fill="none" stroke="white" strokeWidth="3"/><g style={{transformOrigin:'146px 119px',scale:interpolate(f,[0,20],[.85,1],clamp)}}><path d="M146 69L185 119L146 169L107 119Z" fill={C.ink}/><path d="M146 91L168 119L146 146L124 119Z" fill="#FFD05B"/></g>{[85,107,129,151,173,195,211].map(x=><path key={x} d={`M${x} 37V44M${x} 193V201`} stroke={C.red} strokeWidth="4"/>)}</svg>
<div style={{textAlign:'center',fontSize:32,fontWeight:750,color:C.ink}}>Gelenekler</div><div style={{textAlign:'center',fontSize:21,color:C.muted,marginTop:18}}>El sanatları</div>
</div>
</div><Footer>Kültürümüzü keşfet</Footer><Voice index={3}/></Scene>;};
