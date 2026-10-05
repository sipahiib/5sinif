import React,{useEffect,useState} from 'react';
import {delayRender,continueRender,cancelRender,staticFile} from 'remotion';
export const Font:React.FC=()=>{
 const [handle]=useState(()=>delayRender('Inter font'));
 useEffect(()=>{const font=new FontFace('LessonInter',`url(${staticFile('fonts/inter/Inter.ttf')})`,{weight:'100 900'});font.load().then(f=>{document.fonts.add(f);continueRender(handle);}).catch(cancelRender);},[handle]);
 return null;
};
