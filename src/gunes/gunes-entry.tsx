import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Gunes, GunesConfig} from './Gunes';

const Root = () => <Composition id={GunesConfig.id} component={Gunes} durationInFrames={GunesConfig.durationInFrames} fps={GunesConfig.fps} width={GunesConfig.width} height={GunesConfig.height}/>;
registerRoot(Root);