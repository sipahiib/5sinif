import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Roller, RollerConfig} from './Roller';

const Root = () => <Composition id={RollerConfig.id} component={Roller} durationInFrames={RollerConfig.durationInFrames} fps={RollerConfig.fps} width={RollerConfig.width} height={RollerConfig.height}/>;

registerRoot(Root);
