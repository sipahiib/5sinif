import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Dogru, DogruConfig} from './Dogru';

const Root = () => <Composition id={DogruConfig.id} component={Dogru} durationInFrames={DogruConfig.durationInFrames} fps={DogruConfig.fps} width={DogruConfig.width} height={DogruConfig.height}/>;

registerRoot(Root);
