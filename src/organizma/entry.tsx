import React from "react";
import {Composition, registerRoot} from "remotion";
import timings from "./timings.json";
import {Main, Kurz, Short, mainDuration, kurzDuration} from "./Video";

const Root=()=> <>
  <Composition id="Organel" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
  <Composition id="OrganelKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
  <Composition id="OrganelShorts" component={Short} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[0].frames}/>
</>;
registerRoot(Root);
