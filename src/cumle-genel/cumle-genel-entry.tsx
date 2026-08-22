import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {CumleGenel, CumleGenelConfig} from './CumleGenel';

const Root = () => <Composition id={CumleGenelConfig.id} component={CumleGenel} durationInFrames={CumleGenelConfig.durationInFrames} fps={CumleGenelConfig.fps} width={CumleGenelConfig.width} height={CumleGenelConfig.height}/>;

registerRoot(Root);