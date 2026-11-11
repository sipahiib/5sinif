import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Main,Kurz,Short} from './Videos';
import data from './timeline.json';
const Root=()=> <><Composition id="NoktalamaMain" component={Main} width={1280} height={720} fps={30} durationInFrames={data.duration}/><Composition id="NoktalamaKurz" component={Kurz} width={1280} height={720} fps={30} durationInFrames={data.kurzFrames}/><Composition id="NoktalamaShort" component={Short} width={720} height={1280} fps={30} durationInFrames={data.short.duration}/></>;
registerRoot(Root);
