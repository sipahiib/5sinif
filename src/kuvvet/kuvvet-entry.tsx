import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Kuvvet,KuvvetConfig} from './Kuvvet';
const Root=()=> <Composition id={KuvvetConfig.id} component={Kuvvet} durationInFrames={KuvvetConfig.durationInFrames} fps={KuvvetConfig.fps} width={KuvvetConfig.width} height={KuvvetConfig.height}/>;
registerRoot(Root);
