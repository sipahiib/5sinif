import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Isin, IsinConfig} from './Isin';

const Root = () => <Composition id={IsinConfig.id} component={Isin} durationInFrames={IsinConfig.durationInFrames} fps={IsinConfig.fps} width={IsinConfig.width} height={IsinConfig.height}/>;

registerRoot(Root);
