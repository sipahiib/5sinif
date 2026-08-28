import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {RollerShorts, RollerShortsConfig} from './RollerShorts';

const Root = () => (
  <Composition
    id={RollerShortsConfig.id}
    component={RollerShorts}
    durationInFrames={RollerShortsConfig.durationInFrames}
    fps={RollerShortsConfig.fps}
    width={RollerShortsConfig.width}
    height={RollerShortsConfig.height}
  />
);

registerRoot(Root);
