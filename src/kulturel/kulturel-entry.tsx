import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Kulturel,KulturelConfig} from './Kulturel';
const Root=()=> <Composition id={KulturelConfig.id} component={Kulturel} durationInFrames={KulturelConfig.durationInFrames} fps={KulturelConfig.fps} width={KulturelConfig.width} height={KulturelConfig.height}/>;
registerRoot(Root);
