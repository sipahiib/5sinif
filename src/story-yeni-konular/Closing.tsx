import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Eyebrow,Scene,Voice} from './shared';
export const Closing:React.FC=()=>{const f=useCurrentFrame();return <Scene><Backdrop accent="#E62117"/><Eyebrow/>
<div style={{position:'absolute',left:58,top:272,width:118,height:83,borderRadius:25,background:'#E62117',display:'flex',alignItems:'center',justifyContent:'center',scale:interpolate(f,[0,13],[.94,1],clamp)}}><svg width="38" height="40" viewBox="0 0 38 40"><path d="M4 3L36 20L4 37Z" fill="white"/></svg></div>
<div style={{position:'absolute',left:58,top:406,fontSize:103,fontWeight:850,lineHeight:1.03,letterSpacing:-5,color:C.ink}}>DERS<br/><span style={{color:'#E62117'}}>KUTUSU</span></div>
<div style={{position:'absolute',left:62,top:648,fontSize:30,fontWeight:550,color:C.muted}}>5. sınıf ders videoları</div>
<div style={{position:'absolute',left:62,top:729,fontSize:29,fontWeight:750,color:C.ink,letterSpacing:-.6}}>youtube.com/@derskutusu32</div>
<div style={{position:'absolute',left:58,right:58,top:831,height:110,borderRadius:27,background:'#E62117',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:38,fontWeight:750,boxShadow:'0 18px 36px rgba(230,33,23,.13)',overflow:'hidden'}}><span>YouTube’da abone ol</span><div style={{position:'absolute',top:-35,width:55,height:185,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)',rotate:'22deg',left:interpolate(f,[20,61],[-110,710],clamp)}}/></div><Voice index={5}/>
</Scene>;};
