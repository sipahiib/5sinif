import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Main,Kurz} from './Videos';
import t from './timeline.json';
registerRoot(()=><><Composition id="CokgenMain" component={Main} width={1280} height={720} fps={30} durationInFrames={t.main.durationInFrames}/><Composition id="CokgenKurz" component={Kurz} width={1280} height={720} fps={30} durationInFrames={t.kurz.durationInFrames}/></>);
