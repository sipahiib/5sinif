import React from "react";
import {Composition, registerRoot} from "remotion";
import timings from "./timings.json";
import {Kurz, KurzCover, Main, Short1, Short2, kurzDuration, mainDuration} from "./Video";

const Root=()=> <>
  <Composition id="Cevremiz" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
  <Composition id="CevremizKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
  <Composition id="CevremizShorts1" component={Short1} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[0].frames}/>
  <Composition id="CevremizShorts2" component={Short2} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[1].frames}/>
  <Composition id="CevremizKurzKapak" component={KurzCover} width={1920} height={1080} fps={30} durationInFrames={1}/>
</>;
registerRoot(Root);
