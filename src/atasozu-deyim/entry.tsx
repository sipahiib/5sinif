import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Main,Kurz,Short} from './Videos';
import data from './timeline.json';
const Root:React.FC=()=> <>
 <Composition id="AtasozuDeyimMain" component={Main} width={1280} height={720} fps={30} durationInFrames={data.main.durationInFrames}/>
 <Composition id="AtasozuDeyimKurz" component={Kurz} width={1280} height={720} fps={30} durationInFrames={data.kurz.durationInFrames}/>
 <Composition id="AtasozuDeyimShort1" component={Short} defaultProps={{index:0}} width={720} height={1280} fps={30} durationInFrames={data.shorts[0].durationInFrames}/>
 <Composition id="AtasozuDeyimShort2" component={Short} defaultProps={{index:1}} width={720} height={1280} fps={30} durationInFrames={data.shorts[1].durationInFrames}/>
</>;
registerRoot(Root);
