import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {CumleGenelDesign} from './Lesson';
import timeline from './timeline.json';

const Root:React.FC=()=> <Composition id="CumleGenelDesign" component={CumleGenelDesign} width={1280} height={720} fps={30} durationInFrames={timeline.durationInFrames}/>;
registerRoot(Root);
