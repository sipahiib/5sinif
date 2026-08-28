import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {HaklarShorts, HaklarShortsConfig} from './HaklarShorts';

const Root = () => <Composition id={HaklarShortsConfig.id} component={HaklarShorts} durationInFrames={HaklarShortsConfig.durationInFrames} fps={HaklarShortsConfig.fps} width={HaklarShortsConfig.width} height={HaklarShortsConfig.height}/>;

registerRoot(Root);
