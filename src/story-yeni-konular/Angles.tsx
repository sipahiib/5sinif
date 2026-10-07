import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Eyebrow,Footer,Headline,Scene,Voice} from './shared';
export const Angles:React.FC=()=>{const f=useCurrentFrame();const p=interpolate(f,[4,24],[0,1],clamp);return <Scene><Backdrop/><Eyebrow subject="MATEMATİK"/><Headline>Açılar</Headline>
<svg width="604" height="350" viewBox="0 0 604 350" style={{position:'absolute',left:58,top:502,background:C.pale,borderRadius:38}} aria-label="Ortak başlangıçlı dik iki ışın 90 derecelik açı oluşturur">
<path d="M176 254V61M176 254H463" fill="none" stroke={C.blue} strokeWidth="8" strokeLinecap="round"/>
<path d="M176 42L166 65H186Z M485 254L461 244V264Z" fill={C.blue}/>
<path d="M176 217H213V254" fill="none" stroke={C.red} strokeWidth="5" opacity={p}/><circle cx="176" cy="254" r="8" fill={C.ink}/>
<text x="280" y="183" fontFamily="StoryInter,Arial" fontWeight="800" fontSize="65" fill={C.ink} opacity={p}>90°</text>
<text x="302" y="319" textAnchor="middle" fontFamily="StoryInter,Arial" fontWeight="650" fontSize="30" fill={C.ink}>Dik açı</text>
</svg><Footer>Açıları görerek öğren</Footer><Voice index={2}/></Scene>;};
