import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {DogruParcasi, DogruParcasiConfig} from './DogruParcasi';

const Root = () => <Composition id={DogruParcasiConfig.id} component={DogruParcasi} durationInFrames={DogruParcasiConfig.durationInFrames} fps={DogruParcasiConfig.fps} width={DogruParcasiConfig.width} height={DogruParcasiConfig.height}/>;

registerRoot(Root);
