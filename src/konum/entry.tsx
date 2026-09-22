import React from "react";
import {Composition,Still,registerRoot} from "remotion";
import {KurzCover} from "../components/KurzCover";
import {Kurz,Main,Short,kurzDuration,mainDuration} from "./Video";
import timings from "./timings.json";
const Root=()=> <><Composition id="Konum" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/><Composition id="KonumKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/><Still id="KonumKurzCover" component={KurzCover} defaultProps={{subject:"SOSYAL BİLGİLER",title:"KONUM",accent:"#6ce5d0",secondary:"#ffb36b"}} width={1280} height={720}/>{timings.shorts.map((t,i)=><Composition key={i} id={`KonumShorts${i+1}`} component={Short} defaultProps={{index:i}} width={1080} height={1920} fps={30} durationInFrames={t.frames}/>)}</>;
registerRoot(Root);
