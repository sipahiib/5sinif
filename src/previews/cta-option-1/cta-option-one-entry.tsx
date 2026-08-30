import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {CtaOptionOne, CtaOptionOneConfig} from './CtaOptionOne';

const Root: React.FC = () => <Composition
  id={CtaOptionOneConfig.id}
  component={CtaOptionOne}
  durationInFrames={CtaOptionOneConfig.durationInFrames}
  fps={CtaOptionOneConfig.fps}
  width={CtaOptionOneConfig.width}
  height={CtaOptionOneConfig.height}
/>;

registerRoot(Root);
