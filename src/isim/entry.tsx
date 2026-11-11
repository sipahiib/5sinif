import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Main,Short} from './Videos';
import data from './timeline.json';
const Root=()=> <><Composition id="IsimMain" component={Main} width={1280} height={720} fps={30} durationInFrames={data.duration}/><Composition id="IsimShort" component={Short} width={720} height={1280} fps={30} durationInFrames={data.short.duration}/></>;
registerRoot(Root);
