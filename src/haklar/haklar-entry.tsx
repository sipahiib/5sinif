import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Haklar, HaklarConfig} from './Haklar';

const Root = () => <Composition id={HaklarConfig.id} component={Haklar} durationInFrames={HaklarConfig.durationInFrames} fps={HaklarConfig.fps} width={HaklarConfig.width} height={HaklarConfig.height}/>;

registerRoot(Root);
