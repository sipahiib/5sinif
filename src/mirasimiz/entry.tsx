import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Kurz, KurzCover, Main, Shorts1, Shorts2, kurzDuration, mainDuration} from './Video';
import timings from './timings.json';
const Root=()=> <><Composition id="Mirasimiz" component={Main} durationInFrames={mainDuration()} fps={30} width={1920} height={1080}/><Composition id="MirasimizKurz" component={Kurz} durationInFrames={kurzDuration()} fps={30} width={1920} height={1080}/><Composition id="MirasimizKurzCover" component={KurzCover} durationInFrames={1} fps={30} width={1280} height={720}/><Composition id="MirasimizShorts1" component={Shorts1} durationInFrames={timings.shorts[0].frames} fps={30} width={1080} height={1920}/><Composition id="MirasimizShorts2" component={Shorts2} durationInFrames={timings.shorts[1].frames} fps={30} width={1080} height={1920}/></>;
registerRoot(Root);
