import React from "react";
import {Composition, registerRoot} from "remotion";
import {Kurz, kurzDuration, Main, mainDuration, Short} from "./Video";
import timings from "./timings.json";
const Root=()=> <><Composition id="Mezopotamya" component={Main} width={960} height={540} fps={30} durationInFrames={mainDuration()}/><Composition id="MezopotamyaKurz" component={Kurz} width={960} height={540} fps={30} durationInFrames={kurzDuration()}/><Composition id="MezopotamyaShorts" component={Short} width={1080} height={1920} fps={30} durationInFrames={timings.shorts[0].frames}/></>;
registerRoot(Root);
