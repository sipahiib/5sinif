import React from 'react';
import {Easing,interpolate,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Eyebrow,Footer,Headline,Scene,Voice} from './shared';
export const Force:React.FC=()=>{const f=useCurrentFrame();const x=interpolate(f,[5,45],[250,360],{...clamp,easing:Easing.bezier(.4,0,.2,1)});const tip=x-12;return <Scene><Backdrop/><Eyebrow subject="FEN BİLİMLERİ"/><Headline>Kuvvet</Headline>
<svg width="604" height="350" viewBox="0 0 604 350" style={{position:'absolute',left:58,top:502,background:C.pale,borderRadius:38}} aria-label="Uygulanan sağa yönlü kuvvet kutuyu sağa hareket ettirir">
<path d="M36 239H568" stroke="#B3C8E7" strokeWidth="4" strokeLinecap="round"/>
<rect x={x} y="117" width="155" height="120" rx="19" fill={C.blue}/><rect x={x+19} y="135" width="117" height="82" rx="10" fill="none" stroke="#73A1F8" strokeWidth="2"/>
<line x1="60" y1="172" x2={tip-22} y2="172" stroke={C.red} strokeWidth="7" strokeLinecap="round"/><path d={`M${tip} 172L${tip-25} 155V189Z`} fill={C.red}/>
<text x="60" y="77" fontFamily="StoryInter,Arial" fontSize="27" fontWeight="650" fill={C.ink}>Uygulanan kuvvet</text>
<text x="302" y="310" textAnchor="middle" fontFamily="StoryInter,Arial" fontSize="32" fontWeight="750" fill={C.ink}>İtme</text>
</svg><Footer>Kuvvet hareket ettirebilir</Footer><Voice index={1}/></Scene>;};
