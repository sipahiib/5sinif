import React from "react";
import {Composition,registerRoot} from "remotion";
import timings from "./timings.json";
import {Main,Kurz,Short1,Short2,Short3,mainDuration,kurzDuration} from "./Video";
const Root=()=> <>
 <Composition id="CevresorunlarimizAfetler" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
 <Composition id="CevresorunlarimizAfetlerKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
 <Composition id="CevresorunlarimizAfetlerShorts1" component={Short1} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[0].frames}/>
 <Composition id="CevresorunlarimizAfetlerShorts2" component={Short2} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[1].frames}/>
 <Composition id="CevresorunlarimizAfetlerShorts3" component={Short3} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[2].frames}/>
 </>;
registerRoot(Root);
