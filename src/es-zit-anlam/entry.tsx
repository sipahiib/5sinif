import React from "react";
import {Composition,registerRoot} from "remotion";
import {Kurz,Main,kurzDuration,mainDuration} from "./Video";
const Root=()=> <>
  <Composition id="EsZitAnlam" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
  <Composition id="EsZitAnlamKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
</>;
registerRoot(Root);
