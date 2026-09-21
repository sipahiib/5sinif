import React from "react";
import {Composition,registerRoot} from "remotion";
import timings from "./timings.json";
import {Main,Kurz,Short1,Short2,mainDuration,kurzDuration} from "./Video";
const Root=()=> <>
 <Composition id="Komsularimiz" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
 <Composition id="KomsularimizKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
 <Composition id="KomsularimizShorts1" component={Short1} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[0].frames}/>
 <Composition id="KomsularimizShorts2" component={Short2} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[1].frames}/>
 </>;
registerRoot(Root);
