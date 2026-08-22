import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Ay, AyConfig} from './Ay';

const Root = () => <Composition id={AyConfig.id} component={Ay} durationInFrames={AyConfig.durationInFrames} fps={AyConfig.fps} width={AyConfig.width} height={AyConfig.height}/>;
registerRoot(Root);
