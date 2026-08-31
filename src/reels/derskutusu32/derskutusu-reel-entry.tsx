import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {DersKutusuReel, DersKutusuReelConfig} from './DersKutusuReel';

const Root: React.FC = () => <Composition
  id={DersKutusuReelConfig.id}
  component={DersKutusuReel}
  durationInFrames={DersKutusuReelConfig.durationInFrames}
  fps={DersKutusuReelConfig.fps}
  width={DersKutusuReelConfig.width}
  height={DersKutusuReelConfig.height}
/>;

registerRoot(Root);
