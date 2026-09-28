import React from "react";
import {Composition,Still,registerRoot} from "remotion";
import {KurzCover} from "../components/KurzCover";
import timings from "./timings.json";
import {Kurz,Main,Short,kurzDuration,mainDuration} from "./Video";

const Root=()=> <>
 <Composition id="DestekHareketSistemi" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
 <Composition id="DestekHareketSistemiKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
 <Still id="DestekHareketSistemiKurzCover" component={KurzCover} defaultProps={{subject:"FEN BİLİMLERİ",title:"HAREKET ŞEHRİ",accent:"#42D6B5",secondary:"#F15B64"}} width={1280} height={720}/>
 {timings.shorts.map((t,i)=><Composition key={i} id={`DestekHareketSistemiShorts${i+1}`} component={Short} defaultProps={{index:i}} width={1080} height={1920} fps={30} durationInFrames={t.frames}/>)}</>;
registerRoot(Root);
